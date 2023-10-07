module Validator

open Feliz
open Feliz.UseDeferred

open Fable.Core.JsInterop
open Fable.Import.Browser
open Fable.Core

open Thoth.Fetch
open Thoth.Json
open System


let rec isValid (exp: string) (openBrackets: char list) (index: int) =
    if index = String.length exp then
        openBrackets = []
    else
        let currentChar = exp.[index]
        match openBrackets with
        | [] when currentChar = '['  currentChar = '<'  currentChar = '{' ->
            isValid exp [currentChar] (index + 1)
        | '['::rest when currentChar = ']' ->
            isValid exp rest (index + 1)
        | '<'::rest when currentChar = '>' ->
            isValid exp rest (index + 1)
        | '{'::rest when currentChar = '}' ->
            isValid exp rest (index + 1)
        | _ ->
            false

let parse (exp: string) =
    isValid exp [] 0

printfn "%b" (parse "[<{}>]")   // true
printfn "%b" (parse "[[<><><><<<{}>>>]]")  // true
printfn "%b" (parse "[[<><]]")  // false