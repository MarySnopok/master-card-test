import { class_type } from "../fable-library.4.2.1/Reflection.js";
import { value as value_1, defaultArg } from "../fable-library.4.2.1/Option.js";
import { ReactElementTypeModule_memoWith } from "./Fable.React.Helpers.fs.js";
import * as react from "react";
import { int32ToString } from "../fable-library.4.2.1/Util.js";

export class Cache {
    constructor() {
    }
}

export function Cache_$reflection() {
    return class_type("Fable.React.Cache", void 0, Cache);
}

export function Cache_$ctor() {
    return new Cache();
}

(() => {
    let cache;
    Cache.cache = ((cache = (new Map()), (typeof module === 'object'
&& typeof module.hot === 'object'
&& typeof module.hot.addStatusHandler === 'function'
? module.hot.addStatusHandler(status => { if (status === 'apply') (() => {
        cache.clear();
    })(); })
: void 0, cache)));
})();

export function Cache_GetOrAdd_Z3AD3E68D(key, valueFactory) {
    if (Cache.cache.has(key)) {
        return Cache.cache.get(key);
    }
    else {
        const v = valueFactory(key);
        Cache.cache.set(key, v);
        return v;
    }
}

export class FunctionComponent {
    constructor() {
    }
}

export function FunctionComponent_$reflection() {
    return class_type("Fable.React.FunctionComponent", void 0, FunctionComponent);
}

/**
 * Creates a function React component that can use hooks to manage the component's life cycle,
 * and is displayed in React dev tools (use `displayName` to customize the name).
 * Uses React.memo if `memoizeWith` is specified (check `equalsButFunctions` and `memoEqualsButFunctions` helpers).
 * When you need a key to optimize collections in React you can use `withKey` argument or define a `key` field in the props object.
 */
export function FunctionComponent_Of_60E46241(render, displayName, memoizeWith, withKey, __callingMemberName, __callingSourceFile, __callingSourceLine) {
    const prepareRenderFunction = (_arg) => {
        const displayName_1 = defaultArg(displayName, value_1(__callingMemberName));
        render.displayName = displayName_1;
        let elemType;
        if (memoizeWith == null) {
            elemType = render;
        }
        else {
            const areEqual = memoizeWith;
            const areEqual_1 = (x, y) => {
                if (!(typeof module === 'object'
&& typeof module.hot === 'object'
&& typeof module.hot.status === 'function'
&& module.hot.status() === 'apply')) {
                    return areEqual(x, y);
                }
                else {
                    return false;
                }
            };
            const memoElement = ReactElementTypeModule_memoWith(areEqual_1, render);
            memoElement.displayName = (("Memo(" + displayName_1) + ")");
            elemType = memoElement;
        }
        return (props) => {
            let props_1;
            if (withKey == null) {
                props_1 = props;
            }
            else {
                const f_1 = withKey;
                props.key = f_1(props);
                props_1 = props;
            }
            return react.createElement(elemType, props_1);
        };
    };
    const cacheKey = (value_1(__callingSourceFile) + "#L") + int32ToString(value_1(__callingSourceLine));
    return Cache_GetOrAdd_Z3AD3E68D(cacheKey, prepareRenderFunction);
}

