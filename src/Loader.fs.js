import { createElement } from "react";
import React from "react";
import { createObj } from "./fable_modules/fable-library.4.2.1/Util.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.6.0/./Interop.fs.js";
import { ofArray } from "./fable_modules/fable-library.4.2.1/List.js";

export function loaderElement() {
    let elems;
    return createElement("div", createObj(ofArray([["className", "loader"], ["style", {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 100 + "vh",
    }], (elems = [createElement("div", {
        className: "spinner",
        style: {
            borderTop: (((4 + "px ") + "solid") + " ") + "#FF0000",
            borderRight: (((4 + "px ") + "solid") + " ") + "#FF0000",
            borderBottom: (((4 + "px ") + "solid") + " ") + "#FF0000",
            borderLeft: (((4 + "px ") + "solid") + " ") + "#FFFFFF",
            borderRadius: 50 + "px",
            width: 40 + "px",
            height: 40 + "px",
        },
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

