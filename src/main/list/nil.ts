import {List} from "./list"

export class Nil {
    readonly size: () => number = () => 0

    readonly equals: <T>(other: List<T>) => boolean = other => {
        return other instanceof Nil
    }
}
