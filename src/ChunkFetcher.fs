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

let isValid (exp: string) =
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
    isValid exp [] 0


let fetchAPI () : JS.Promise<ChunksResponse> =
    promise {
        let url = "http://localhost:5020/api/v1/challenge"
        return! Fetch.get(url)
    }

[<ReactComponent>]
let ChunksList () =
    let loadData = async {
        try
            let! response = fetchAPI() |> Async.AwaitPromise
            JS.console.log response
            let validatedChunks = response.Chunks |> List.filter (isValid >> not)
            return validatedChunks
        with ex ->
            return [ex.Message]
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
