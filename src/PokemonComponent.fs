module PokemonComponent

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

let getPokemonById (id : int) : JS.Promise<PokemonType> =
    promise {
        let url = sprintf "https://pokeapi.co/api/v2/pokemon/%i" id
        return! Fetch.get(url)
    }
        
[<ReactComponent>]
let PokeImg (imageUrl: string) =
        Html.div [
            Html.img [
                prop.src imageUrl
                prop.className "pokeImage"
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
    | Deferred.InProgress -> MyLoader.loaderElement()
    | Deferred.Failed error -> Html.div error.Message
    | Deferred.Resolved content -> PokeImg content.sprites.front_default


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
        prop.className "container"
        prop.children  
            pokemonComponents
    ]
