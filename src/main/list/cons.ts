import {fromArray, List, toArray} from "./list"

export class Cons<T> {
    constructor(public value: T, public tail: List<T>) {}

    readonly size: () => number = () => 1 + this.tail.size()

    readonly equals: (other: List<T>) => boolean = (other) =>
        other instanceof Cons && this.value === other.value && this.tail.equals(other.tail)

    readonly reverse: () => List<T> = () => fromArray(toArray(this).reverse())

    readonly appended: (element: T) => List<T> = (e) => new Cons(this.value, this.tail.appended(e))

    readonly prepended: (element: T) => List<T> = (e) => new Cons(e, this)

    readonly appendedAll: (iterable: List<T> | T[]) => List<T> = (it) => {
        if (it instanceof Array) { it = fromArray(it) }
        return it.size() === 0 ? this : this.appended(it.get(0) as T).appendedAll((it as Cons<T>).tail)
    }

    readonly get: (index: number) => T | undefined = (i) =>
        i === 0 ? this.value : this.tail.get(i - 1)

}
