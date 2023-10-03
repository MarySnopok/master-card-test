import { toString as toString_1, Record } from "./fable_modules/fable-library.4.2.1/Types.js";
import { class_type, obj_type, record_type, string_type } from "./fable_modules/fable-library.4.2.1/Reflection.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "./fable_modules/Fable.Promise.3.2.0/Promise.fs.js";
import { printf, toText } from "./fable_modules/fable-library.4.2.1/String.js";
import { promise } from "./fable_modules/Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { PromiseBuilder__Delay_62FBFDE1 as PromiseBuilder__Delay_62FBFDE1_1, PromiseBuilder__Run_212F1D4B as PromiseBuilder__Run_212F1D4B_1 } from "./fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/Promise.fs.js";
import { promise as promise_1 } from "./fable_modules/Thoth.Fetch.3.0.1/../Fable.Promise.3.2.0/PromiseImpl.fs.js";
import { FetchError } from "./fable_modules/Thoth.Fetch.3.0.1/Fetch.fs.js";
import { FSharpResult$2 } from "./fable_modules/fable-library.4.2.1/Choice.js";
import { Helper_message, Helper_fetch, Helper_withContentTypeJson, Helper_withProperties } from "./fable_modules/Thoth.Fetch.3.0.1/./Fetch.fs.js";
import { Types_RequestProperties } from "./fable_modules/Fable.Fetch.2.1.0/Fetch.fs.js";
import { keyValueList } from "./fable_modules/fable-library.4.2.1/MapUtil.js";
import { singleton, cons, ofArray, empty } from "./fable_modules/fable-library.4.2.1/List.js";
import { unwrap, map, defaultArg } from "./fable_modules/fable-library.4.2.1/Option.js";
import { Auto_generateBoxedEncoderCached_437914C6 } from "./fable_modules/Thoth.Json.10.2.0/./Encode.fs.js";
import { toString } from "./fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Encode.fs.js";
import { Auto_generateBoxedDecoderCached_Z6670B51 } from "./fable_modules/Thoth.Json.10.2.0/./Decode.fs.js";
import { fromString } from "./fable_modules/Thoth.Fetch.3.0.1/../Thoth.Json.10.2.0/Decode.fs.js";
import { uncurry2 } from "./fable_modules/fable-library.4.2.1/Util.js";
import { createElement } from "react";
import React from "react";
import { Interop_reactApi } from "./fable_modules/Feliz.2.6.0/./Interop.fs.js";
import { singleton as singleton_1 } from "./fable_modules/fable-library.4.2.1/AsyncBuilder.js";
import { awaitPromise } from "./fable_modules/fable-library.4.2.1/Async.js";
import { useFeliz_React__React_useDeferred_Static_Z241A641 } from "./fable_modules/Feliz.UseDeferred.2.0.0/UseDeferred.fs.js";
import { defaultOf } from "./fable_modules/Feliz.2.6.0/../fable-library.4.2.1/Util.js";
import { render } from "react-dom";

export class PokemonSpritesType extends Record {
    constructor(front_default) {
        super();
        this.front_default = front_default;
    }
}

export function PokemonSpritesType_$reflection() {
    return record_type("App.PokemonSpritesType", [], PokemonSpritesType, () => [["front_default", string_type]]);
}

export const apiUrl = "https://pokeapi.co/api/v2/pokemon/ditto";

export function getPokemonById(id) {
    return PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => {
        const url = toText(printf("https://pokeapi.co/api/v2/pokemon/%i"))(id);
        return PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => {
            let data_2, caseStrategy_2, extra_2;
            return ((data_2 = void 0, (caseStrategy_2 = void 0, (extra_2 = void 0, (() => {
                let properties_4;
                try {
                    const properties_3 = Helper_withProperties(void 0, (properties_4 = ofArray([new Types_RequestProperties(0, ["GET"]), new Types_RequestProperties(1, [keyValueList(Helper_withContentTypeJson(data_2, empty()), 0)])]), defaultArg(map((data_1_1) => {
                        let encoder;
                        return cons(new Types_RequestProperties(2, [(encoder = Auto_generateBoxedEncoderCached_437914C6(obj_type, caseStrategy_2, extra_2), toString(0, encoder(data_1_1)))]), properties_4);
                    }, data_2), properties_4)));
                    const pr = PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Helper_fetch(url, properties_3).then((_arg) => {
                        let response_1, decoder_1_1, decode;
                        const response = _arg;
                        return ((response_1 = response, (decoder_1_1 = defaultArg(void 0, Auto_generateBoxedDecoderCached_Z6670B51(class_type("App.PokemonType"), unwrap(caseStrategy_2), unwrap(extra_2))), (decode = ((body_1) => fromString(uncurry2(decoder_1_1), body_1)), PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (((response_1.ok) ? PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (response_1.text().then((_arg_1) => {
                            let matchValue, msg, value_1_1;
                            const body_1_1 = _arg_1;
                            return Promise.resolve((matchValue = decode(body_1_1), (matchValue.tag === 1) ? ((msg = matchValue.fields[0], new FSharpResult$2(1, [new FetchError(1, [msg])]))) : ((value_1_1 = matchValue.fields[0], new FSharpResult$2(0, [value_1_1])))));
                        })))) : (Promise.resolve(new FSharpResult$2(1, [new FetchError(2, [response_1])])))).then((_arg_1_1) => {
                            const result = _arg_1_1;
                            return Promise.resolve(result);
                        }))))))));
                    }))));
                    return pr.catch((arg_4) => (new FSharpResult$2(1, [new FetchError(3, [arg_4])])));
                }
                catch (exn) {
                    return PromiseBuilder__Run_212F1D4B_1(promise_1, PromiseBuilder__Delay_62FBFDE1_1(promise_1, () => (Promise.resolve(new FSharpResult$2(1, [new FetchError(0, [exn])])))));
                }
            })())))).then((_arg_2) => {
                const result_1 = _arg_2;
                let response_1_1;
                if (result_1.tag === 1) {
                    const error = result_1.fields[0];
                    throw new Error(Helper_message(error));
                }
                else {
                    const response_2 = result_1.fields[0];
                    response_1_1 = response_2;
                }
                return Promise.resolve(response_1_1);
            });
        }));
    }));
}

export function HeroImg(heroImgInputProps) {
    const imageUrl = heroImgInputProps.imageUrl;
    const children = singleton(createElement("img", {
        src: imageUrl,
        className: "heroImage",
    }));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

export function PokemonComponent() {
    const loadData = singleton_1.Delay(() => singleton_1.Bind(awaitPromise(getPokemonById(123)), (_arg) => {
        const item = _arg;
        return singleton_1.Zero();
    }));
    const data = useFeliz_React__React_useDeferred_Static_Z241A641(loadData, []);
    switch (data.tag) {
        case 1:
            return createElement("i", {
                children: ["loading"],
            });
        case 3: {
            const error = data.fields[0];
            return createElement("div", {
                children: [error.message],
            });
        }
        case 2: {
            const content = data.fields[0];
            return createElement(HeroImg, {
                imageUrl: toString_1(),
            });
        }
        default:
            return defaultOf();
    }
}

export function Hello() {
    const children = singleton(createElement("h1", {
        className: "title",
        children: "Hello world!",
    }));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

export function Body() {
    const children = ofArray([createElement(PokemonComponent, null), createElement(Hello, null)]);
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

render(createElement(Body, null), document.getElementById("root"));

