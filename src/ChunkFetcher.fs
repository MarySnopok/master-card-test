module ChunkFetcher

open Feliz
open Feliz.UseDeferred

open Fable.Core.JsInterop
open Fable.Import.Browser
open Fable.Core

open Thoth.Fetch
open Thoth.Json
open System

type ChunksResponse = { Chunks : string list }



let isValidChunk (chunk : string) : bool =
    let rec isValidChunkInner (stack : char list) (index : int) : bool =
        match (stack, index < String.length chunk) with
        | ([], true) when chunk.[index] = '(' || chunk.[index] = '[' || chunk.[index] = '{' || chunk.[index] = '<' -> isValidChunkInner [chunk.[index]] (index + 1)
        | ([], true) when chunk.[index] = ')' || chunk.[index] = ']' || chunk.[index] = '}' || chunk.[index] = '>' -> false
        | ([], true) -> isValidChunkInner stack (index + 1)
        | (_, true) when chunk.[index] = '(' || chunk.[index] = '[' || chunk.[index] = '{' || chunk.[index] = '<' -> isValidChunkInner (chunk.[index] :: stack) (index + 1)
        | (_, true) when (chunk.[index] = ')' && List.head stack = Some '(') ||
                         (chunk.[index] = ']' && List.head stack = Some '[') ||
                         (chunk.[index] = '}' && List.head stack = Some '{') ||
                         (chunk.[index] = '>' && List.head stack = Some '<') ->
                          isValidChunkInner (List.tail stack) (index + 1)
        | _ -> false
    isValidChunkInner [] 0


let getChunks () : JS.Promise<ChunksResponse> =
    promise {
        let url = "http://localhost:5020/api/v1/challenge"
        let! response = Fetch.get(url)
        return response.json
    }

[<ReactComponent>]
let ChunksList () =
    let loadData = async {
        let! result = getChunks() |> Async.AwaitPromise
        match result with
        | Ok chunks ->
            let validatedChunks = chunks.Chunks |> List.filter isValidChunk
            return (Ok validatedChunks)
        | Error error -> return (Error error)
    }

    let data = React.useDeferred(loadData, [| |])

    match data with
    | Deferred.HasNotStartedYet -> Html.none
    | Deferred.InProgress -> MyLoader.loaderElement()
    | Deferred.Failed error -> Html.div error.Message
    | Deferred.Resolved (Ok chunks) ->
        Html.div [
            prop.className "chunks"
            prop.children [
                for chunk in chunks do
                    Html.div [ 
                        prop.children chunk
                        prop.className "chunk"
                    ]
            ]
        ]
    | Deferred.Resolved (Error errorMessage) ->
        Html.div [
            prop.className "error-message"
            prop.children errorMessage
        ]


