#r "nuget: Suave"

open System

module ChunksGenerator =
  type Bracket =
    | C
    | B
    | P
    | A

  type Chunk = { Bracket : Bracket; Chunks : Chunk list }

  let genChunk () =
    let rand = System.Random()

    match rand.NextDouble() with
    | x when x < 0.25 -> { Bracket = C; Chunks = [] }
    | x when x < 0.50 -> { Bracket = B; Chunks = [] }
    | x when x < 0.75 -> { Bracket = P; Chunks = [] }
    | _ -> { Bracket = A; Chunks = [] }

  let rec combineChunks (chunk : Chunk) (newChunk : Chunk) : Chunk =
    let rand = System.Random()
    let numChunks = List.length chunk.Chunks

    // Either put the new chunk into a child chunk, or as a child chunk to the current chunk. All options has same probability.
    match rand.NextDouble() * (numChunks + 1 |> float) |> int with
    | x when x < numChunks ->
      let chunkToUpdate = List.item x chunk.Chunks
      let updatedChunk = combineChunks chunkToUpdate newChunk
      { chunk with Chunks = (chunk.Chunks |> List.updateAt x updatedChunk) }
    | _ -> { chunk with Chunks = (chunk.Chunks @ [ newChunk ]) }

  let insertError (str : string) =
    // change somewhere between 1/4 and 3/4 of the string
    let positionToChange =
      (str.Length / 4) + (System.Random().NextDouble() * (str.Length / 2 |> float) |> int)

    let error = str.Substring(positionToChange, 3)
    str.Substring(0, positionToChange) + error + str.Substring(positionToChange)

  let rec printChunk chunk : string =
    let opening, closing =
      match chunk.Bracket with
      | C -> "{", "}"
      | B -> "[", "]"
      | P -> "(", ")"
      | A -> "<", ">"

    let chunks = chunk.Chunks |> List.map printChunk |> List.fold (+) ""

    opening + chunks + closing

  let chunks n =
    List.unfold
      (fun (x, g) ->
        match x with
        | x when x >= n -> None
        | x -> Some(g (), (x + 1, g))
      )
      (0, genChunk)

  let challenge = chunks >> List.reduce combineChunks >> printChunk >> insertError

module Server =
  open Suave
  open Suave.Filters
  open Suave.Operators
  open System.Text.Json

  let encode a =
    let options = JsonSerializerOptions()
    options.PropertyNamingPolicy <- JsonNamingPolicy.CamelCase
    options.Encoder <- System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
    JsonSerializer.Serialize(a, options)

  type ChunksDto = { Chunks : string list }

  let n =
    fsi.CommandLineArgs
    |> Array.tail
    |> function
      | [| x |] -> x |> int
      | _ -> 100

  let chunks n l = { Chunks = [ for _ in 0..l -> ChunksGenerator.challenge n ] }

  let router =
    GET
    >=> path "/api/v1/challenge"
    >=> warbler (fun _ -> Random().Next(1, 10) |> chunks n |> encode |> Successful.OK)
    >=> Writers.setMimeType "application/json; charset=utf-8"

  startWebServer { defaultConfig with bindings = [ HttpBinding.createSimple HTTP "0.0.0.0" 5020 ] } router
