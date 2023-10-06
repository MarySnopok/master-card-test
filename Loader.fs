module Loader

open Feliz
open Feliz.Style

let loaderElement =
    Html.div [
        prop.className "loader"
        prop.style [
            style.display.flex
            style.justifyContent.center
            style.alignItems.center
            style.height (length.vh 100)
        ]
    ] [
        Html.div [
            prop.className "spinner"
            prop.style [
                style.borderTop "4px solid rgba(255, 255, 255, 0.3)"
                style.borderRight "4px solid rgba(255, 255, 255, 0.3)"
                style.borderBottom "4px solid rgba(255, 255, 255, 0.3)"
                style.borderLeft "4px solid #ffffff"
                style.borderRadius (length.px 50)
                style.width (length.px 40)
                style.height (length.px 40)
                style.animation "spin 1s linear infinite"
            ]
        ] []
    ]
