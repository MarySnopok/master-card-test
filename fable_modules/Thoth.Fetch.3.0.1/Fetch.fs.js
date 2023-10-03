import { Union } from "../fable-library.4.2.1/Types.js";
import { union_type, string_type, class_type } from "../fable-library.4.2.1/Reflection.js";
import { keyValueList } from "../fable-library.4.2.1/MapUtil.js";
import { Types_HttpRequestHeaders } from "../Fable.Fetch.2.1.0/Fetch.fs.js";
import { append, cons } from "../fable-library.4.2.1/List.js";
import { map, defaultArg } from "../fable-library.4.2.1/Option.js";
import { int32ToString } from "../fable-library.4.2.1/Util.js";

export class FetchError extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["PreparingRequestFailed", "DecodingFailed", "FetchFailed", "NetworkError"];
    }
}

export function FetchError_$reflection() {
    return union_type("Thoth.Fetch.FetchError", [], FetchError, () => [[["Item", class_type("System.Exception")]], [["Item", string_type]], [["Item", class_type("Fetch.Types.Response")]], [["Item", class_type("System.Exception")]]]);
}

export function Helper_fetch(url, init) {
    return fetch(url, keyValueList(init, 1));
}

export function Helper_withContentTypeJson(data, headers) {
    if (data != null) {
        return cons(new Types_HttpRequestHeaders(11, ["application/json"]), headers);
    }
    else {
        return headers;
    }
}

export function Helper_withProperties(custom, properties) {
    return defaultArg(map((list) => append(properties, list), custom), properties);
}

export function Helper_message(error) {
    switch (error.tag) {
        case 1: {
            const msg = error.fields[0];
            return "[Thoth.Fetch] Error while decoding the response:\n\n" + msg;
        }
        case 2: {
            const response = error.fields[0];
            return (((("[Thoth.Fetch] Request failed:\n\n" + int32ToString(response.status)) + " ") + (response.statusText)) + " for URL ") + (response.url);
        }
        case 3: {
            const exn_1 = error.fields[0];
            return "[Thoth.Fetch] A network error occured:\n\n" + exn_1.message;
        }
        default: {
            const exn = error.fields[0];
            return "[Thoth.Fetch] Request preparation failed:\n\n" + exn.message;
        }
    }
}

export class Fetch {
    constructor() {
    }
}

export function Fetch_$reflection() {
    return class_type("Thoth.Fetch.Fetch", void 0, Fetch);
}

