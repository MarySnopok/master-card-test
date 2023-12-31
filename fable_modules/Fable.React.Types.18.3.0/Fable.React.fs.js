import { Record } from "../fable-library.4.2.1/Types.js";
import { record_type, string_type } from "../fable-library.4.2.1/Reflection.js";

export class FragmentProps extends Record {
    constructor(key) {
        super();
        this.key = key;
    }
}

export function FragmentProps_$reflection() {
    return record_type("Fable.React.FragmentProps", [], FragmentProps, () => [["key", string_type]]);
}

