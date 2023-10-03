import { FSharpRef, Record } from "../fable-library.4.2.1/Types.js";
import { lambda_type, class_type, record_type, bool_type } from "../fable-library.4.2.1/Reflection.js";
import { defaultOf } from "../fable-library.4.2.1/Util.js";
import { Component } from "react";
import * as react from "react";

export class Components_HybridState extends Record {
    constructor(isClient) {
        super();
        this.isClient = isClient;
    }
}

export function Components_HybridState_$reflection() {
    return record_type("Fable.React.Isomorphic.Components.HybridState", [], Components_HybridState, () => [["isClient", bool_type]]);
}

export class Components_HybridProps$1 extends Record {
    constructor(clientView, serverView, model) {
        super();
        this.clientView = clientView;
        this.serverView = serverView;
        this.model = model;
    }
}

export function Components_HybridProps$1_$reflection(gen0) {
    return record_type("Fable.React.Isomorphic.Components.HybridProps`1", [gen0], Components_HybridProps$1, () => [["clientView", lambda_type(gen0, class_type("Fable.React.ReactElement"))], ["serverView", lambda_type(gen0, class_type("Fable.React.ReactElement"))], ["model", gen0]]);
}

export class Components_HybridComponent$1 extends Component {
    constructor(initProps) {
        super(initProps);
        this.this = (new FSharpRef(defaultOf()));
        this.this.contents = this;
        this["init@12"] = 1;
        this.state = (new Components_HybridState(false));
    }
    componentDidMount() {
        const __ = this;
        __.this.contents.setState((_arg, _arg_1) => (new Components_HybridState(true)));
    }
    render() {
        const x = this;
        return (x.state).isClient ? (x.props).clientView((x.props).model) : (x.props).serverView((x.props).model);
    }
}

export function Components_HybridComponent$1_$reflection(gen0) {
    return class_type("Fable.React.Isomorphic.Components.HybridComponent`1", [gen0], Components_HybridComponent$1, class_type("Fable.React.Component`2", [Components_HybridProps$1_$reflection(gen0), Components_HybridState_$reflection()], Component));
}

export function Components_HybridComponent$1_$ctor_Z3CAAB1FA(initProps) {
    return new Components_HybridComponent$1(initProps);
}

export function isomorphicView(clientView, serverView, model) {
    const props = new Components_HybridProps$1(clientView, serverView, model);
    return react.createElement(Components_HybridComponent$1, props);
}

