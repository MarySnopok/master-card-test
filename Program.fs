module App

open Feliz
open Feliz.UseDeferred

open Fable.Core.JsInterop
open Fable.Import.Browser
open Fable.Core


open Thoth.Fetch
open Thoth.Json
open System

importAll "./src/styles/main.sass"

open MyLoader
open Hello
open PokemonComponent
//open ChunkFetcher



[<ReactComponent>]
let Body() =
    Html.div [
        Hello() 
        PokemonListComponent()
        //ChunksList()
        
    ]

open Browser.Dom

ReactDOM.render(Body(), document.getElementById "root")
