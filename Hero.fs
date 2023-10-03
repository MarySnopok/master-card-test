open Feliz
open Fable.Core.JsInterop
open Fable.Http


type ApiResponse = {
    url: string
}

module Hero =

    let apiUrl = "https://source.unsplash.com/random/900×700/?forest"

    let fetchData () =
        fetch apiUrl
        |> Json.Async.parseAs<ApiResponse>

    [<ReactComponent>]
    let HeroImg (imageUrl: string) =
        Html.div [
            Html.img [
                prop.src imageUrl
                prop.className "title"
            ]
        ]

    let heroComponent () =
        async {
            let! response = fetchData()
            return HeroImg response.url
        }