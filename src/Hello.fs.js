import { createElement } from "react";
import React from "react";
import { singleton } from "../fable_modules/fable-library.4.2.1/List.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.6.0/./Interop.fs.js";

export function Hello() {
    const children = singleton(createElement("h1", {
        className: "title",
        children: "Hello Poke World!",
    }));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

