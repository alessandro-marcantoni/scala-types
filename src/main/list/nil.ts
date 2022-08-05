import {list, List} from "./list"

export class Nil<T> {
    readonly size: () => number = () => 0

    readonly equals: (other: List<T>) => boolean = other => other instanceof Nil

    readonly reverse: () => List<T> = () => new Nil()

    readonly appended: (element: T) => List<T> = (e) => list(e)

    readonly get: (index: number) => undefined = () => undefined
}
