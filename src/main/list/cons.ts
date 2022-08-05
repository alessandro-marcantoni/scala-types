import {fromArray, List, toArray} from "./list"

export class Cons<T> {
    readonly value: T
    readonly tail: List<T>

    constructor(value: T, tail: List<T>) {
        this.value = value
        this.tail = tail
    }

    readonly size: () => number = () => 1 + this.tail.size()

    readonly equals: (other: List<T>) => boolean = (other) =>
        other instanceof Cons && this.value === other.value && this.tail.equals(other.tail)

    readonly reverse: () => List<T> = () => fromArray(toArray(this).reverse())

    readonly appended: (element: T) => List<T> = (e) => fromArray(toArray(this).concat([e]))

    readonly get: (index: number) => T | undefined = (i) => i >= this.size() ? undefined : toArray(this)[i]

}
