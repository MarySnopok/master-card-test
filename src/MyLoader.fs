module MyLoader

open Feliz
open Fable.Core


[<ReactComponent>]
let loaderElement () =
    Html.div [
        prop.className "loader"
        prop.style [
            style.alignItems.center
            style.justifyContent.spaceBetween
        ]
    ]

