import { IComparer, IEqualityComparer, IDisposable, IEnumerator } from "./Util.js";
import { TypeInfo } from "./Reflection.js";
import { Option } from "./Option.js";
import { FSharpList } from "./List.js";
import { int32 } from "./Int32.js";
export declare const SR_enumerationAlreadyFinished = "Enumeration already finished.";
export declare const SR_enumerationNotStarted = "Enumeration has not started. Call MoveNext.";
export declare const SR_inputSequenceEmpty = "The input sequence was empty.";
export declare const SR_inputSequenceTooLong = "The input sequence contains more than one element.";
export declare const SR_keyNotFoundAlt = "An index satisfying the predicate was not found in the collection.";
export declare const SR_notEnoughElements = "The input sequence has an insufficient number of elements.";
export declare const SR_resetNotSupported = "Reset is not supported on this enumerator.";
export declare function Enumerator_noReset<$a>(): $a;
export declare function Enumerator_notStarted<$a>(): $a;
export declare function Enumerator_alreadyFinished<$a>(): $a;
export declare class Enumerator_Seq<T> implements Iterable<T> {
    readonly f: (() => IEnumerator<T>);
    constructor(f: (() => IEnumerator<T>));
    toString(): string;
    GetEnumerator(): IEnumerator<T>;
    [Symbol.iterator](): Iterator<T>;
    "System.Collections.IEnumerable.GetEnumerator"(): IEnumerator<any>;
}
export declare function Enumerator_Seq_$reflection(gen0: TypeInfo): TypeInfo;
export declare function Enumerator_Seq_$ctor_673A07F2<T>(f: (() => IEnumerator<T>)): Enumerator_Seq<T>;
export declare class Enumerator_FromFunctions$1<T> implements IEnumerator<T>, IDisposable {
    readonly next: (() => boolean);
    readonly dispose: (() => void);
    readonly current: (() => T);
    constructor(current: (() => T), next: (() => boolean), dispose: (() => void));
    "System.Collections.Generic.IEnumerator`1.get_Current"(): T;
    "System.Collections.IEnumerator.get_Current"(): any;
    "System.Collections.IEnumerator.MoveNext"(): boolean;
    "System.Collections.IEnumerator.Reset"(): void;
    Dispose(): void;
}
export declare function Enumerator_FromFunctions$1_$reflection(gen0: TypeInfo): TypeInfo;
export declare function Enumerator_FromFunctions$1_$ctor_58C54629<T>(current: (() => T), next: (() => boolean), dispose: (() => void)): Enumerator_FromFunctions$1<T>;
export declare function Enumerator_cast<T>(e: IEnumerator<T>): IEnumerator<T>;
export declare function Enumerator_concat<T, U extends Iterable<T>>(sources: Iterable<U>): IEnumerator<T>;
export declare function Enumerator_enumerateThenFinally<T>(f: (() => void), e: IEnumerator<T>): IEnumerator<T>;
export declare function Enumerator_generateWhileSome<T, U>(openf: (() => T), compute: ((arg0: T) => Option<U>), closef: ((arg0: T) => void)): IEnumerator<U>;
export declare function Enumerator_unfold<State, T>(f: ((arg0: State) => Option<[T, State]>), state: State): IEnumerator<T>;
export declare function indexNotFound<$a>(): $a;
export declare function checkNonNull<$a>(argName: string, arg: $a): void;
export declare function mkSeq<T>(f: (() => IEnumerator<T>)): Iterable<T>;
export declare function ofSeq<T>(xs: Iterable<T>): IEnumerator<T>;
export declare function delay<T>(generator: (() => Iterable<T>)): Iterable<T>;
export declare function concat<Collection extends Iterable<T>, T>(sources: Iterable<Collection>): Iterable<T>;
export declare function unfold<State, T>(generator: ((arg0: State) => Option<[T, State]>), state: State): Iterable<T>;
export declare function empty<T>(): Iterable<T>;
export declare function singleton<T>(x: T): Iterable<T>;
export declare function ofArray<T>(arr: T[]): Iterable<T>;
export declare function toArray<T>(xs: Iterable<T>): T[];
export declare function ofList<T>(xs: FSharpList<T>): Iterable<T>;
export declare function toList<T>(xs: Iterable<T>): FSharpList<T>;
export declare function generate<$a, $b>(create: (() => $a), compute: ((arg0: $a) => Option<$b>), dispose: ((arg0: $a) => void)): Iterable<$b>;
export declare function generateIndexed<$a, $b>(create: (() => $a), compute: ((arg0: int32, arg1: $a) => Option<$b>), dispose: ((arg0: $a) => void)): Iterable<$b>;
export declare function append<T>(xs: Iterable<T>, ys: Iterable<T>): Iterable<T>;
export declare function cast<T>(xs: Iterable<T>): Iterable<T>;
export declare function choose<T, U>(chooser: ((arg0: T) => Option<U>), xs: Iterable<T>): Iterable<U>;
export declare function compareWith<T>(comparer: ((arg0: T, arg1: T) => int32), xs: Iterable<T>, ys: Iterable<T>): int32;
export declare function contains<T>(value: T, xs: Iterable<T>, comparer: IEqualityComparer<T>): boolean;
export declare function enumerateFromFunctions<$a, $b>(create: (() => $a), moveNext: ((arg0: $a) => boolean), current: ((arg0: $a) => $b)): Iterable<$b>;
export declare function enumerateThenFinally<T>(source: Iterable<T>, compensation: (() => void)): Iterable<T>;
export declare function enumerateUsing<T extends IDisposable, $a extends Iterable<U>, U>(resource: T, source: ((arg0: T) => $a)): Iterable<U>;
export declare function enumerateWhile<T>(guard: (() => boolean), xs: Iterable<T>): Iterable<T>;
export declare function filter<T>(f: ((arg0: T) => boolean), xs: Iterable<T>): Iterable<T>;
export declare function exists<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): boolean;
export declare function exists2<T1, T2>(predicate: ((arg0: T1, arg1: T2) => boolean), xs: Iterable<T1>, ys: Iterable<T2>): boolean;
export declare function exactlyOne<T>(xs: Iterable<T>): T;
export declare function tryExactlyOne<T>(xs: Iterable<T>): Option<T>;
export declare function tryFind<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Option<T>;
export declare function find<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): T;
export declare function tryFindBack<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Option<T>;
export declare function findBack<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): T;
export declare function tryFindIndex<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Option<int32>;
export declare function findIndex<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): int32;
export declare function tryFindIndexBack<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Option<int32>;
export declare function findIndexBack<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): int32;
export declare function fold<T, State>(folder: ((arg0: State, arg1: T) => State), state: State, xs: Iterable<T>): State;
export declare function foldBack<T, State>(folder: ((arg0: T, arg1: any) => any), xs: Iterable<T>, state: any): any;
export declare function fold2<T1, T2, State>(folder: ((arg0: State, arg1: T1, arg2: T2) => State), state: State, xs: Iterable<T1>, ys: Iterable<T2>): State;
export declare function foldBack2<T1, T2, State>(folder: ((arg0: T1, arg1: T2, arg2: State) => State), xs: Iterable<T1>, ys: Iterable<T2>, state: State): State;
export declare function forAll<$a>(predicate: ((arg0: $a) => boolean), xs: Iterable<$a>): boolean;
export declare function forAll2<$a, $b>(predicate: ((arg0: $a, arg1: $b) => boolean), xs: Iterable<$a>, ys: Iterable<$b>): boolean;
export declare function tryHead<T>(xs: Iterable<T>): Option<T>;
export declare function head<T>(xs: Iterable<T>): T;
export declare function initialize<$a>(count: int32, f: ((arg0: int32) => $a)): Iterable<$a>;
export declare function initializeInfinite<$a>(f: ((arg0: int32) => $a)): Iterable<$a>;
export declare function isEmpty<T>(xs: Iterable<T>): boolean;
export declare function tryItem<T>(index: int32, xs: Iterable<T>): Option<T>;
export declare function item<T>(index: int32, xs: Iterable<T>): T;
export declare function iterate<$a>(action: ((arg0: $a) => void), xs: Iterable<$a>): void;
export declare function iterate2<$a, $b>(action: ((arg0: $a, arg1: $b) => void), xs: Iterable<$a>, ys: Iterable<$b>): void;
export declare function iterateIndexed<$a>(action: ((arg0: int32, arg1: $a) => void), xs: Iterable<$a>): void;
export declare function iterateIndexed2<$a, $b>(action: ((arg0: int32, arg1: $a, arg2: $b) => void), xs: Iterable<$a>, ys: Iterable<$b>): void;
export declare function tryLast<T>(xs: Iterable<T>): Option<T>;
export declare function last<T>(xs: Iterable<T>): T;
export declare function length<T>(xs: Iterable<T>): int32;
export declare function map<T, U>(mapping: ((arg0: T) => U), xs: Iterable<T>): Iterable<U>;
export declare function mapIndexed<T, U>(mapping: ((arg0: int32, arg1: T) => U), xs: Iterable<T>): Iterable<U>;
export declare function indexed<T>(xs: Iterable<T>): Iterable<[int32, T]>;
export declare function map2<T1, T2, U>(mapping: ((arg0: T1, arg1: T2) => U), xs: Iterable<T1>, ys: Iterable<T2>): Iterable<U>;
export declare function mapIndexed2<T1, T2, U>(mapping: ((arg0: int32, arg1: T1, arg2: T2) => U), xs: Iterable<T1>, ys: Iterable<T2>): Iterable<U>;
export declare function map3<T1, T2, T3, U>(mapping: ((arg0: T1, arg1: T2, arg2: T3) => U), xs: Iterable<T1>, ys: Iterable<T2>, zs: Iterable<T3>): Iterable<U>;
export declare function readOnly<T>(xs: Iterable<T>): Iterable<T>;
export declare class CachedSeq$1<T> implements Iterable<T>, IDisposable {
    readonly res: Iterable<T>;
    readonly cleanup: (() => void);
    constructor(cleanup: (() => void), res: Iterable<T>);
    Dispose(): void;
    GetEnumerator(): IEnumerator<T>;
    [Symbol.iterator](): Iterator<T>;
    "System.Collections.IEnumerable.GetEnumerator"(): IEnumerator<any>;
}
export declare function CachedSeq$1_$reflection(gen0: TypeInfo): TypeInfo;
export declare function CachedSeq$1_$ctor_Z7A8347D4<T>(cleanup: (() => void), res: Iterable<T>): CachedSeq$1<T>;
export declare function CachedSeq$1__Clear<T>(_: CachedSeq$1<T>): void;
export declare function cache<T>(source: Iterable<T>): Iterable<T>;
export declare function allPairs<T1, T2>(xs: Iterable<T1>, ys: Iterable<T2>): Iterable<[T1, T2]>;
export declare function mapFold<State, T, Result>(mapping: ((arg0: State, arg1: T) => [Result, State]), state: State, xs: Iterable<T>): [Iterable<Result>, State];
export declare function mapFoldBack<T, State, Result>(mapping: ((arg0: T, arg1: State) => [Result, State]), xs: Iterable<T>, state: State): [Iterable<Result>, State];
export declare function tryPick<T, $a>(chooser: ((arg0: T) => Option<$a>), xs: Iterable<T>): Option<$a>;
export declare function pick<T, $a>(chooser: ((arg0: T) => Option<$a>), xs: Iterable<T>): $a;
export declare function reduce<T>(folder: ((arg0: T, arg1: T) => T), xs: Iterable<T>): T;
export declare function reduceBack<T>(folder: ((arg0: T, arg1: T) => T), xs: Iterable<T>): T;
export declare function replicate<$a>(n: int32, x: $a): Iterable<$a>;
export declare function reverse<T>(xs: Iterable<T>): Iterable<T>;
export declare function scan<State, T>(folder: ((arg0: State, arg1: T) => State), state: State, xs: Iterable<T>): Iterable<State>;
export declare function scanBack<T, State>(folder: ((arg0: T, arg1: State) => State), xs: Iterable<T>, state: State): Iterable<State>;
export declare function skip<T>(count: int32, source: Iterable<T>): Iterable<T>;
export declare function skipWhile<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Iterable<T>;
export declare function tail<T>(xs: Iterable<T>): Iterable<T>;
export declare function take<T>(count: int32, xs: Iterable<T>): Iterable<T>;
export declare function takeWhile<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Iterable<T>;
export declare function truncate<T>(count: int32, xs: Iterable<T>): Iterable<T>;
export declare function zip<T1, T2>(xs: Iterable<T1>, ys: Iterable<T2>): Iterable<[T1, T2]>;
export declare function zip3<T1, T2, T3>(xs: Iterable<T1>, ys: Iterable<T2>, zs: Iterable<T3>): Iterable<[T1, T2, T3]>;
export declare function collect<T, Collection extends Iterable<U>, U>(mapping: ((arg0: T) => Collection), xs: Iterable<T>): Iterable<U>;
export declare function where<T>(predicate: ((arg0: T) => boolean), xs: Iterable<T>): Iterable<T>;
export declare function pairwise<T>(xs: Iterable<T>): Iterable<[T, T]>;
export declare function splitInto<T>(chunks: int32, xs: Iterable<T>): Iterable<T[]>;
export declare function windowed<T>(windowSize: int32, xs: Iterable<T>): Iterable<T[]>;
export declare function transpose<$a extends Iterable<T>, T>(xss: Iterable<$a>): Iterable<Iterable<T>>;
export declare function sortWith<T>(comparer: ((arg0: T, arg1: T) => int32), xs: Iterable<T>): Iterable<T>;
export declare function sort<T>(xs: Iterable<T>, comparer: IComparer<T>): Iterable<T>;
export declare function sortBy<T, U>(projection: ((arg0: T) => U), xs: Iterable<T>, comparer: IComparer<U>): Iterable<T>;
export declare function sortDescending<T>(xs: Iterable<T>, comparer: IComparer<T>): Iterable<T>;
export declare function sortByDescending<T, U>(projection: ((arg0: T) => U), xs: Iterable<T>, comparer: IComparer<U>): Iterable<T>;
export declare function sum<T>(xs: Iterable<T>, adder: any): T;
export declare function sumBy<T, U>(f: ((arg0: T) => U), xs: Iterable<T>, adder: any): U;
export declare function maxBy<T, U>(projection: ((arg0: T) => U), xs: Iterable<T>, comparer: IComparer<U>): T;
export declare function max<T>(xs: Iterable<T>, comparer: IComparer<T>): T;
export declare function minBy<T, U>(projection: ((arg0: T) => U), xs: Iterable<T>, comparer: IComparer<U>): T;
export declare function min<T>(xs: Iterable<T>, comparer: IComparer<T>): T;
export declare function average<T>(xs: Iterable<T>, averager: any): T;
export declare function averageBy<T, U>(f: ((arg0: T) => U), xs: Iterable<T>, averager: any): U;
export declare function permute<T>(f: ((arg0: int32) => int32), xs: Iterable<T>): Iterable<T>;
export declare function chunkBySize<T>(chunkSize: int32, xs: Iterable<T>): Iterable<T[]>;
export declare function insertAt<T>(index: int32, y: T, xs: Iterable<T>): Iterable<T>;
export declare function insertManyAt<T>(index: int32, ys: Iterable<T>, xs: Iterable<T>): Iterable<T>;
export declare function removeAt<T>(index: int32, xs: Iterable<T>): Iterable<T>;
export declare function removeManyAt<T>(index: int32, count: int32, xs: Iterable<T>): Iterable<T>;
export declare function updateAt<T>(index: int32, y: T, xs: Iterable<T>): Iterable<T>;
