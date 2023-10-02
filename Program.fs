module App

open Feliz

[<ReactComponent>]
let Hello() =
    Html.div [
        Html.h1 "Hello world!"

    ]

open Browser.Dom

ReactDOM.render(Hello(), document.getElementById "root")