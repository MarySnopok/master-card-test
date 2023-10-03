import { value as value_1 } from "../fable-library.4.2.1/Option.js";
import { class_type } from "../fable-library.4.2.1/Reflection.js";

/**
 * Creates AsyncIterable. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of#specifications
 */
export function create(onNext) {
    return {
    [Symbol.asyncIterator]() {
        return {
            next: (() => {
        const pr = onNext();
        return pr.then((_arg) => {
            if (_arg == null) {
                return {
                    done: true,
                };
            }
            else {
                const value = value_1(_arg);
                return {
                    value: value,
                    done: false,
                };
            }
        });
    }),
            return: (() => ({
        done: true,
    }))
        }
    }
};
}

/**
 * Creates AsyncIterable with a cleaning function for cancellation (JS caller invokes `break` or `return` during iteration)
 */
export function createCancellable(onCancel, onNext) {
    return {
    [Symbol.asyncIterator]() {
        return {
            next: (() => {
        const pr = onNext();
        return pr.then((_arg) => {
            if (_arg == null) {
                return {
                    done: true,
                };
            }
            else {
                const value = value_1(_arg);
                return {
                    value: value,
                    done: false,
                };
            }
        });
    }),
            return: (() => {
        onCancel();
        return {
            done: true,
        };
    })
        }
    }
};
}

export class CancellationToken {
    constructor() {
    }
}

export function CancellationToken_$reflection() {
    return class_type("AsyncIterable.CancellationToken", void 0, CancellationToken);
}

export function CancellationToken_$ctor() {
    return new CancellationToken();
}

export function CancellationToken__Cancel(this$) {
    throw this$;
}

/**
 * Iterates AsyncIterable. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
 */
export function iter(action, iterable) {
    const token = CancellationToken_$ctor();
    return (async () => {
    for await (const value of iterable) {
        try {
            action(token, value)
        } catch (err) {
            if (err instanceof token.constructor) {
                break;
            }
            throw(err);
        }
    }
})();
}

