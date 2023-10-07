import { createElement } from "react";
import React from "react";

export function loaderElement() {
    return createElement("div", {
        className: "loader",
        style: {
            alignItems: "center",
            justifyContent: "space-between",
        },
    });
}

