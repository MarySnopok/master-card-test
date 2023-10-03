module App

open Feliz
open Feliz.UseDeferred
open Fable.Core.JsInterop


open Fable.Core
open Thoth.Fetch
open System

type PokemonSpritesType = {
  front_default: string;
}

type PokemonType = 
    abstract sprites: PokemonSpritesType;
    abstract name: string;

let apiUrl = "https://pokeapi.co/api/v2/pokemon/ditto"

let getPokemonById (id : int) : JS.Promise<PokemonType> =
    promise {
        let url = sprintf "https://pokeapi.co/api/v2/pokemon/%i" id
        return! Fetch.get(url)
    }

[<ReactComponent>]
let HeroImg (imageUrl: string) =
            Html.div [
                Html.img [
                    prop.src imageUrl
                    prop.className "heroImage"
                ]
            ]
        

[<ReactComponent>]
let PokemonComponent () =
    let loadData = async {
        
        //let! response = 
        //  fetch "https://api.github.com/user" [
        //  requestHeaders [
        //     
        //  ] ] |> Async.AwaitPromise
        let! item = getPokemonById 123 |> Async.AwaitPromise
        item
    }

    let data = React.useDeferred(loadData, [| |])
    match data with
    | Deferred.HasNotStartedYet -> Html.none
    | Deferred.InProgress -> Html.i "loading"
    | Deferred.Failed error -> Html.div error.Message
    | Deferred.Resolved content -> HeroImg (content.ToString())


[<ReactComponent>]
let Hello() =
    Html.div [
        Html.h1 [    
            prop.className "title"
            prop.text "Hello world!"
            ]

    ]

[<ReactComponent>]
let Body() =
    Html.div [
        PokemonComponent()
        Hello()  
    ]

open Browser.Dom

ReactDOM.render(Body(), document.getElementById "root")
