open Feliz
open Fable.Core.JsInterop
open Fable.Http

// TODO complete a new feature - hero image at the header with a 
// random pokemon related pictures fetched from unslapsh

type ApiResponse = {
    url: string
}

module Hero =

    let apiUrl = "https://source.unsplash.com/random/900×700/?forest"


    [<ReactComponent>]
    let Hero (apiUrl: string) =
                Html.div [
                    Html.img [
                       prop.src apiUrl
                       prop.className "heroImage"
                    ]
                ]

    let fetchData () =
        fetch apiUrl
        |> Json.Async.parseAs<ApiResponse>

    let heroComponent () =
        async {
            let! response = fetchData()
            return HeroImg response.url
        }