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

     static member Decoder =
        Decode.object (fun get ->
            { front_default = get.Required.Field "front_default" Decode.string }
        )

type PokemonType = 
    { 
      height: int
      name: string
      sprites : PokemonSpritesType 
    }
     
    // https://thoth-org.github.io/Thoth.Fetch/#Define-your-decoder-encoder-and-extracoder
    static member Decoder =
        Decode.object (fun get ->
            { name = get.Required.Field "name" Decode.string
              height = get.Required.Field "height" Decode.int
              sprites = get.Required.Field "sprites" PokemonSpritesType.Decoder }
        )



let apiUrl = "https://pokeapi.co/api/v2/pokemon/ditto"

let getPokemonById (id : int) : JS.Promise<PokemonType> =
    promise {
        let url = sprintf "https://pokeapi.co/api/v2/pokemon/%i" id
        return! Fetch.get(url)//, decoder = PokemonType.Decoder)
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
    // https://zaid-ajaj.github.io/Feliz/#/Hooks/UseDeferred
    let loadData2 = async {
        let! item = getPokemonById 123 |> Async.AwaitPromise
        JS.console.log item
        return item
    }

    let loadData = async {
        do! Async.Sleep 1000
        return "Hello!"
    }

    let data = React.useDeferred(loadData2, [| |])
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
        PokemonComponent()
        Hello()  
    ]

open Browser.Dom

ReactDOM.render(Body(), document.getElementById "root")
