module Hello

open Feliz
open Fable.Core


[<ReactComponent>]
let Hello() =
    Html.div [
        Html.h1 [    
            prop.className "title"
            prop.text "Hello Poke World!"
            ]

    ]