module ChunkFetcher

open Feliz
open Feliz.UseDeferred

open Fable.Core.JsInterop
open Fable.Import.Browser
open Fable.Core

open Thoth.Fetch
open Thoth.Json
open System

type ChunksResponse = { Chunks: string list }

let rec isValid (exp: string) (openBrackets: char list) (index: int) =
    if index = String.length exp then
        openBrackets = []
    else
        let currentChar = exp.[index]
        match openBrackets with
        | [] when currentChar = '[' || currentChar = '<' || currentChar = '{' ->
            isValid exp [currentChar] (index + 1)
        | '['::rest when currentChar = ']' ->
            isValid exp rest (index + 1)
        | '<'::rest when currentChar = '>' ->
            isValid exp rest (index + 1)
        | '{'::rest when currentChar = '}' ->
            isValid exp rest (index + 1)
        | _ ->
            false

let getChunks () : JS.Promise<ChunksResponse> =
    promise {
        try
            let url = "http://localhost:5020/api/v1/challenge"
            let! response = Fetch.get(url)
            let text = response.body
            JS.console.log text
            let chunks = JS.parse<Result<ChunkDto, string>> text
            match chunks with
            | Ok chunks ->
                let validatedChunks = chunks.Chunks |> List.filter (isValid >> not)
                return { Chunks = validatedChunks }
            | Error error ->
                return { Chunks = [error] }
        with ex ->
            return { Chunks = [ex.Message] }
    }


[<ReactComponent>]
let ChunksList () =
    let loadData = async {
        let! chunks = getChunks() |> Async.AwaitPromise
        return chunks.Chunks
    }

    let data = React.useDeferred(loadData, [| |])

    match data with
    | Deferred.HasNotStartedYet -> Html.none
    | Deferred.InProgress -> MyLoader.loaderElement()
    | Deferred.Failed error -> Html.div error.Message
    | Deferred.Resolved chunks ->
        Html.div [
            prop.className "chunks"
            prop.children [
                for chunk in chunks do
                    Html.div [ 
                        prop.text chunk
                        prop.className "chunk"
                    ]
            ]
        ]
