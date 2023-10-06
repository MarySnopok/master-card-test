module App

open Feliz
open Feliz.UseDeferred

open Fable.Core.JsInterop
open Fable.Import.Browser
open Fable.Core


open Thoth.Fetch
open Thoth.Json
open System

//open Loader
//open Hero


type PokemonSpritesType = 
    { front_default: string }

type PokemonType = 
    { 
      height: int
      name: string
      sprites : PokemonSpritesType 
    }

let getPokemonById (id : int) : JS.Promise<PokemonType> =
    promise {
        let url = sprintf "https://pokeapi.co/api/v2/pokemon/%i" id
        return! Fetch.get(url)
    }
        
[<ReactComponent>]
let PokeImg (imageUrl: string) =
        Html.div [
            Html.img [
                prop.style [
                    style.width 150
                    style.height 150
                    style.padding 10
                ]
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
    | Deferred.Resolved content -> PokeImg content.sprites.front_default


[<ReactComponent>]
let Hello() =
    Html.div [
        Html.h1 [    
            prop.className "title"
            prop.text "Hello Poke World!"
            prop.style [
                style.color "goldenrod"
                style.fontSize 40
                style.textAlign.center
                style.marginTop 100
                style.fontWeight.bold
                ]
            ]

    ]

let rec generateUniqueRandomPokemonIds (count : int) (acc : int list) =
    let random = System.Random()
    if count = 0 then
        acc
    else
        let randomId = random.Next(1, 1011)
        if List.contains randomId acc then
            generateUniqueRandomPokemonIds count acc
        else
            generateUniqueRandomPokemonIds (count - 1) (randomId :: acc)

let renderPokemonComponents () =
    generateUniqueRandomPokemonIds 4 []
    |> List.map (fun id -> PokemonComponent id)

[<ReactComponent>]
let PokemonListComponent () =
    let pokemonComponents = renderPokemonComponents()
    Html.div [
        prop.style [
            style.display.flex
            style.alignItems.center
            style.justifyContent.center
            style.marginTop 100
        ]
        prop.children  
            pokemonComponents
    ]


[<ReactComponent>]
let Body() =
    Html.div [
        Hello() 
        PokemonListComponent()
    ]

open Browser.Dom

ReactDOM.render(Body(), document.getElementById "root")
