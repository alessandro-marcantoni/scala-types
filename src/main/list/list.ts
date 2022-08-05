import {Cons} from "./cons"
import {Nil} from "./nil"

export type List<T> =
    | Cons<T>
    | Nil

export const fromArray: <T>(array: T[]) => List<T> = (array) => {
    return array.length > 0
        ? new Cons(array[0], fromArray(array.slice(1)))
        : new Nil()
}

export const list: <T>(...elements: T[]) => List<T> = (...elements) => {
    return fromArray(elements)
}
