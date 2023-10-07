import * as main from "./src/styles/main.sass";
import { createElement } from "react";
import React from "react";
import { ChunksList } from "./src/ChunkFetcher.fs.js";
import { singleton } from "./fable_modules/fable-library.4.2.1/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.6.0/./Interop.fs.js";
import { render } from "react-dom";


export function Body() {
    const children = singleton(createElement(ChunksList, null));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

render(createElement(Body, null), document.getElementById("root"));

