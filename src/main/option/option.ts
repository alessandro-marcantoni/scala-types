import { Some } from "./some"
import { None } from "./none"

export type Option<T> =
    | Some<T>
    | None

/**
 * Creates a new instance of Some.
 * @param value The value to be put inside the Some.
 */
export const some: <T>(value: T) => Option<T> = (value) => {
    return new Some(value)
}

/**
 * Creates a new None.
 */
export const none: () => Option<any> = () => new None()

export class NoSuchElementError extends Error {
    readonly message: string = "No value to get"
}
