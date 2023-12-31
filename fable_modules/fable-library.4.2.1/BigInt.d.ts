import { FSharpRef } from "./Types.js";
import { int8, uint8, int16, uint16, int32, uint32, float16, float32, float64 } from "./Int32.js";
import { decimal } from "./Decimal.js";
export type int64 = bigint;
export type uint64 = bigint;
export type int128 = bigint;
export type uint128 = bigint;
export type nativeint = bigint;
export type unativeint = bigint;
export declare function isBigInt(x: any): boolean;
export declare function hash(x: bigint): int32;
export declare function equals(x: bigint, y: bigint): boolean;
export declare function compare(x: bigint, y: bigint): int32;
export declare function abs(x: bigint): bigint;
export declare function sign(x: bigint): int32;
export declare function max(x: bigint, y: bigint): bigint;
export declare function min(x: bigint, y: bigint): bigint;
export declare function maxMagnitude(x: bigint, y: bigint): bigint;
export declare function minMagnitude(x: bigint, y: bigint): bigint;
export declare function clamp(x: bigint, min: bigint, max: bigint): bigint;
export declare function add(x: bigint, y: bigint): bigint;
export declare function subtract(x: bigint, y: bigint): bigint;
export declare function multiply(x: bigint, y: bigint): bigint;
export declare function divide(x: bigint, y: bigint): bigint;
export declare function remainder(x: bigint, y: bigint): bigint;
export declare function negate(x: bigint): bigint;
export declare function op_UnaryNegation(x: bigint): bigint;
export declare function op_LogicalNot(x: bigint): bigint;
export declare function op_UnaryPlus(x: bigint): bigint;
export declare function op_Addition(x: bigint, y: bigint): bigint;
export declare function op_Subtraction(x: bigint, y: bigint): bigint;
export declare function op_Multiply(x: bigint, y: bigint): bigint;
export declare function op_Division(x: bigint, y: bigint): bigint;
export declare function op_Modulus(x: bigint, y: bigint): bigint;
export declare function op_RightShift(x: bigint, n: int32): bigint;
export declare function op_LeftShift(x: bigint, n: int32): bigint;
export declare function op_BitwiseAnd(x: bigint, y: bigint): bigint;
export declare function op_BitwiseOr(x: bigint, y: bigint): bigint;
export declare function op_ExclusiveOr(x: bigint, y: bigint): bigint;
export declare function op_LessThan(x: bigint, y: bigint): boolean;
export declare function op_LessThanOrEqual(x: bigint, y: bigint): boolean;
export declare function op_GreaterThan(x: bigint, y: bigint): boolean;
export declare function op_GreaterThanOrEqual(x: bigint, y: bigint): boolean;
export declare function op_Equality(x: bigint, y: bigint): boolean;
export declare function op_Inequality(x: bigint, y: bigint): boolean;
export declare function get_Zero(): bigint;
export declare function get_One(): bigint;
export declare function get_MinusOne(): bigint;
export declare function get_IsZero(x: bigint): boolean;
export declare function get_IsOne(x: bigint): boolean;
export declare function get_IsEven(x: bigint): boolean;
export declare function get_IsPowerOfTwo(x: bigint): boolean;
export declare function get_Sign(x: bigint): int32;
export declare function isNegative(x: bigint): boolean;
export declare function isPositive(x: bigint): boolean;
export declare function isEvenInteger(x: bigint): boolean;
export declare function isOddInteger(x: bigint): boolean;
export declare function isPow2(x: bigint): boolean;
export declare function fromZero(): bigint;
export declare function fromOne(): bigint;
export declare function fromInt8(n: int8): bigint;
export declare function fromUInt8(n: uint8): bigint;
export declare function fromInt16(n: int16): bigint;
export declare function fromUInt16(n: uint16): bigint;
export declare function fromInt32(n: int32): bigint;
export declare function fromUInt32(n: uint32): bigint;
export declare function fromInt64(n: int64): bigint;
export declare function fromUInt64(n: uint64): bigint;
export declare function fromInt128(n: int128): bigint;
export declare function fromUInt128(n: uint128): bigint;
export declare function fromNativeInt(n: nativeint): bigint;
export declare function fromUNativeInt(n: unativeint): bigint;
export declare function fromFloat16(n: float16): bigint;
export declare function fromFloat32(n: float32): bigint;
export declare function fromFloat64(n: float64): bigint;
export declare function fromDecimal(d: decimal): bigint;
export declare function fromBigInt(x: bigint): bigint;
export declare function fromBoolean(b: boolean): bigint;
export declare function fromChar(c: string): bigint;
export declare function fromString(s: string): bigint;
export declare function fromByteArray(bytes: ArrayLike<uint8>): bigint;
export declare function toByteArray(value: bigint): number[];
export declare function toInt8(x: bigint): int8;
export declare function toUInt8(x: bigint): uint8;
export declare function toInt16(x: bigint): int16;
export declare function toUInt16(x: bigint): uint16;
export declare function toInt32(x: bigint): int32;
export declare function toUInt32(x: bigint): uint32;
export declare function toInt64(x: bigint): int64;
export declare function toUInt64(x: bigint): uint64;
export declare function toInt128(x: bigint): int128;
export declare function toUInt128(x: bigint): uint128;
export declare function toNativeInt(x: bigint): nativeint;
export declare function toUNativeInt(x: bigint): unativeint;
export declare function toFloat16(x: bigint): float32;
export declare function toFloat32(x: bigint): float32;
export declare function toFloat64(x: bigint): float64;
export declare function toDecimal(x: bigint): decimal;
export declare function toBigInt(x: bigint): bigint;
export declare function toBoolean(x: bigint): boolean;
export declare function toChar(x: bigint): string;
export declare function toString(x: bigint): string;
export declare function tryParse(s: string, res: FSharpRef<bigint>): boolean;
export declare function parse(s: string): bigint;
export declare function pow(x: bigint, n: int32): bigint;
export declare function modPow(x: bigint, e: bigint, m: bigint): bigint;
export declare function divRem(x: bigint, y: bigint): [bigint, bigint];
export declare function divRem(x: bigint, y: bigint, out: FSharpRef<bigint>): bigint;
export declare function greatestCommonDivisor(x: bigint, y: bigint): bigint;
export declare function getBitLength(x: bigint): int64;
export declare function log2(x: bigint): float64;
export declare function log10(x: bigint): float64;
export declare function ln(x: bigint): float64;
export declare function log(x: bigint, base: float64): float64;
export declare function ilog2(x: bigint): bigint;
