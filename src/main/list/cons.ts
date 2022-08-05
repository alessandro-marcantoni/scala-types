import {List} from "./list"

export class Cons<T> {
    private readonly value: T
    private readonly tail: List<T>

    constructor(value: T, tail: List<T>) {
        this.value = value
        this.tail = tail
    }

    readonly size: () => number = () => {
        return 1 + this.tail.size()
    }

    readonly equals: (other: List<T>) => boolean = (other) => {
        return other instanceof Cons
            && this.value === other.value
            && this.tail.equals(other.tail)
    }


}
