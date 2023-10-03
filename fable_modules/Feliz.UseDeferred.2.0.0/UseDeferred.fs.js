import { Union } from "../fable-library.4.2.1/Types.js";
import { union_type, class_type } from "../fable-library.4.2.1/Reflection.js";
import { useReact_useCallback_1CA17B65, React_useStateWithUpdater_1505, useReact_useCallbackRef_7C4B0DD6, React_createDisposable_3A5B6456 as React_createDisposable_3A5B6456_1, useReact_useEffectOnce_Z5ECA432F as useReact_useEffectOnce_Z5ECA432F_1, useReact_useRef_1505 as useReact_useRef_1505_1, useReact_useEffect_311B4086, useFeliz_React__React_useState_Static_1505 } from "../Feliz.2.6.0/React.fs.js";
import { React_createDisposable_3A5B6456, useReact_useEffectOnce_Z5ECA432F, useReact_useRef_1505 } from "../Feliz.2.6.0/./React.fs.js";
import { parallel, ignore, isCancellationRequested, startImmediate, cancel, createCancellationToken } from "../fable-library.4.2.1/Async.js";
import { singleton } from "../fable-library.4.2.1/AsyncBuilder.js";
import { some } from "../fable-library.4.2.1/Option.js";
import { toList as toList_1, add, empty } from "../fable-library.4.2.1/Map.js";
import { compare } from "../fable-library.4.2.1/Util.js";
import { singleton as singleton_1, collect, delay, toList } from "../fable-library.4.2.1/Seq.js";

export class Deferred$1 extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["HasNotStartedYet", "InProgress", "Resolved", "Failed"];
    }
}

export function Deferred$1_$reflection(gen0) {
    return union_type("Feliz.UseDeferred.Deferred`1", [gen0], Deferred$1, () => [[], [], [["Item", gen0]], [["Item", class_type("System.Exception")]]]);
}

/**
 * Returns whether the `Deferred<'T>` value has been started or not.
 */
export function Deferred_hasNotStartedYet(_arg) {
    if (_arg.tag === 0) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Returns whether the `Deferred<'T>` value has been resolved or not.
 */
export function Deferred_resolved(_arg) {
    if (_arg.tag === 2) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Returns whether the `Deferred<'T>` value is in progress or not.
 */
export function Deferred_inProgress(_arg) {
    if (_arg.tag === 1) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Transforms the underlying value of the input deferred value when it exists from type to another
 */
export function Deferred_map(transform, deferred) {
    switch (deferred.tag) {
        case 1:
            return new Deferred$1(1, []);
        case 3: {
            const error = deferred.fields[0];
            return new Deferred$1(3, [error]);
        }
        case 2: {
            const value = deferred.fields[0];
            try {
                return new Deferred$1(2, [transform(value)]);
            }
            catch (error_1) {
                return new Deferred$1(3, [error_1]);
            }
        }
        default:
            return new Deferred$1(0, []);
    }
}

export function Deferred_iter(perform, deferred) {
    if (deferred.tag === 2) {
        const value = deferred.fields[0];
        perform(value);
    }
}

/**
 * Verifies that a `Deferred<'T>` value is resolved and the resolved data satisfies a given requirement.
 */
export function Deferred_exists(predicate, _arg) {
    if (_arg.tag === 2) {
        const value = _arg.fields[0];
        return predicate(value);
    }
    else {
        return false;
    }
}

/**
 * Like `map` but instead of transforming just the value into another type in the `Resolved` case, it will transform the value into potentially a different case of the the `Deferred<'T>` type.
 */
export function Deferred_bind(transform, deferred) {
    switch (deferred.tag) {
        case 1:
            return new Deferred$1(1, []);
        case 3: {
            const error = deferred.fields[0];
            return new Deferred$1(3, [error]);
        }
        case 2: {
            const value = deferred.fields[0];
            try {
                return transform(value);
            }
            catch (error_1) {
                return new Deferred$1(3, [error_1]);
            }
        }
        default:
            return new Deferred$1(0, []);
    }
}

export function useFeliz_React__React_useDeferred_Static_Z241A641(operation, dependencies) {
    const patternInput = useFeliz_React__React_useState_Static_1505(new Deferred$1(0, []));
    const setDeferred = patternInput[1];
    const deferred = patternInput[0];
    let token_1;
    const cts = useReact_useRef_1505(createCancellationToken());
    const token = useReact_useRef_1505(cts.current);
    useReact_useEffectOnce_Z5ECA432F(() => React_createDisposable_3A5B6456(() => {
        cancel(cts.current);
    }));
    token_1 = token;
    const executeOperation = singleton.Delay(() => singleton.TryWith(singleton.Delay(() => {
        setDeferred(new Deferred$1(1, []));
        return singleton.Bind(operation, (_arg) => {
            const output = _arg;
            setDeferred(new Deferred$1(2, [output]));
            return singleton.Zero();
        });
    }), (_arg_1) => {
        const error = _arg_1;
        console.log(some(error));
        setDeferred(new Deferred$1(3, [error]));
        return singleton.Zero();
    }));
    useReact_useEffect_311B4086(() => {
        startImmediate(executeOperation, token_1.current);
    }, dependencies);
    return deferred;
}

export function useFeliz_React__React_useDeferredCallback_Static_7088D81D(operation, setDeferred) {
    const cancellationToken = useReact_useRef_1505_1(createCancellationToken());
    const executeOperation = (arg) => singleton.Delay(() => singleton.TryWith(singleton.Delay(() => {
        setDeferred(new Deferred$1(1, []));
        return singleton.Bind(operation(arg), (_arg) => {
            const output = _arg;
            setDeferred(new Deferred$1(2, [output]));
            return singleton.Zero();
        });
    }), (_arg_1) => {
        const error = _arg_1;
        console.log(some(error));
        setDeferred(new Deferred$1(3, [error]));
        return singleton.Zero();
    }));
    useReact_useEffectOnce_Z5ECA432F_1(() => React_createDisposable_3A5B6456_1(() => {
        cancel(cancellationToken.current);
    }));
    const start = useReact_useCallbackRef_7C4B0DD6((arg_1) => {
        if (!isCancellationRequested(cancellationToken.current)) {
            startImmediate(executeOperation(arg_1), cancellationToken.current);
        }
    });
    return start;
}

export function useFeliz_React__React_useDeferredParallel_Static_19020D46(deferred, map) {
    const patternInput = React_useStateWithUpdater_1505(empty({
        Compare: compare,
    }));
    const setData = patternInput[1];
    const data = patternInput[0];
    const addData = useReact_useCallbackRef_7C4B0DD6((tupledArg) => {
        const key = tupledArg[0];
        const value = tupledArg[1];
        setData((prev) => add(key, value, prev));
    });
    let token_1;
    const cts = useReact_useRef_1505(createCancellationToken());
    const token = useReact_useRef_1505(cts.current);
    useReact_useEffectOnce_Z5ECA432F(() => React_createDisposable_3A5B6456(() => {
        cancel(cts.current);
    }));
    token_1 = token;
    const mapKeyedOperatons = (operations) => toList(delay(() => collect((matchValue) => {
        const operation = matchValue[1];
        const key_1 = matchValue[0];
        return singleton_1(singleton.Delay(() => singleton.TryWith(singleton.Delay(() => {
            addData([key_1, new Deferred$1(1, [])]);
            return singleton.Bind(operation, (_arg) => {
                const output = _arg;
                addData([key_1, new Deferred$1(2, [output])]);
                return singleton.Zero();
            });
        }), (_arg_1) => {
            const error = _arg_1;
            console.log(some(error));
            addData([key_1, new Deferred$1(3, [error])]);
            return singleton.Zero();
        })));
    }, operations)));
    const start = useReact_useCallback_1CA17B65((operations_1) => {
        setTimeout(() => {
            startImmediate(ignore(parallel(mapKeyedOperatons(operations_1))), token_1.current);
        }, 0);
    });
    useReact_useEffect_311B4086(() => {
        Deferred_iter((data_1) => {
            start(map(data_1));
        }, deferred);
    }, [deferred]);
    return toList_1(data);
}

