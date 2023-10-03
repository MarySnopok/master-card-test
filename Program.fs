module App

open Feliz
open Feliz.UseDeferred
open Fable.Core.JsInterop

open Fable.Import.Browser

open Fable.Core
open Thoth.Fetch
open Thoth.Json
open System

type PokemonSpritesType = 
    { front_default: string }

type PokemonType = 
    { 
      height: int
      name: string
      sprites : PokemonSpritesType 
    }

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
let PokemonComponent (pokemonId: int) =
    // https://zaid-ajaj.github.io/Feliz/#/Hooks/UseDeferred
    let loadData = async {
        let! item = getPokemonById pokemonId |> Async.AwaitPromise
        JS.console.log item
        return item
    }

    let data = React.useDeferred(loadData, [| |])
    JS.console.log data
    match data with
    | Deferred.HasNotStartedYet -> Html.none
    | Deferred.InProgress -> Html.i "loading"
    | Deferred.Failed error -> Html.div error.Message
    | Deferred.Resolved content -> HeroImg content.sprites.front_default


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
        PokemonComponent(123)
        PokemonComponent(124)
        Hello()  
    ]

open Browser.Dom

ReactDOM.render(Body(), document.getElementById "root")
