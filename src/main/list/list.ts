import { Cons } from "./cons"
import { Nil } from "./nil"

/**
 * A list is made up of either a Cons or Nil.
 */
export type List<T> =
    | Cons<T>
    | Nil<T>

export const fromArray: <T>(array: T[]) => List<T> = (array) => {
    return array.length > 0
        ? new Cons(array[0], fromArray(array.slice(1)))
        : new Nil()
}

export const list: <T>(...elements: T[]) => List<T> = (...elements) => {
    return fromArray(elements)
}

export const toArray: <T>(list: List<T>) => T[] = (l) => {
    return l instanceof Cons ? [l.value].concat(toArray(l.tail)) : []
}
