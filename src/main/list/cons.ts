import { Option, some, none } from "../option"
import { Mapper, Predicate } from "../utils"
import { fromArray, list, List } from "./list"

export class Cons<T> {
    constructor(public value: T, public tail: List<T>) { }

    /**
     * The size of this list.
     * @returns {number} the number of elements in this list.
     */
    readonly size: () => number = () => 1 + this.tail.size()

    /**
     * Compares the equality of two lists.
     * @param {List} other The list to compare with this list.
     * @returns {boolean} true if the two lists are equals, false otherwise.
     */
    readonly equals: (other: List<T>) => boolean = (other) =>
        other instanceof Cons && this.value === other.value && this.tail.equals(other.tail)

    /**
     * A new list with elements in reversed order.
     * @returns {List} a new list with all elements of this list in reversed order.
     */
    readonly reverse: () => List<T> = () => {
        const _reverse: (l: List<T>, result: List<T>) => List<T> = (l, r) =>
            l instanceof Cons ? _reverse(l.tail, new Cons(l.value, r)) : r
        return _reverse(this, list())
    }

    /**
     * A copy of this list with an element appended.
     * @param element The appended element.
     * @returns {List} a new list consisting of all elements of this list followed by element.
     */
    readonly appended: (element: T) => List<T> = (element) => new Cons(this.value, this.tail.appended(element))

    /**
     * A copy of this list with an element prepended.
     * @param element The prepended element.
     * @returns {List} a new list consisting of element followed by all elements of this list.
     */
    readonly prepended: (element: T) => List<T> = (element) => new Cons(element, this)

    /**
     * Returns a new list containing the elements from the list followed by the elements of the given iterable.
     * @param {List | Array} iterable the iterable to append.
     * @returns {List} a new list which contains all elements of this list followed by all elements of iterable.
     */
    readonly appendedAll: (iterable: List<T> | T[]) => List<T> = (iterable) => {
        if (iterable instanceof Array) { iterable = fromArray(iterable) }
        return iterable.size() === 0 ? this : this.appended(iterable.get(0) as T).appendedAll((iterable as Cons<T>).tail)
    }

    /**
     * Get the element at the specified index (corresponds to the apply method).
     * @param {number} index the index of the element to get.
     * @returns the index-th element of the list, if existing.
     */
    readonly get: (index: number) => T | undefined = (index) =>
        index === 0 ? this.value : this.tail.get(index - 1)

    /**
     * Tests whether this list contains a given value as an element.
     * @param element the element to test.
     * @returns {boolean} true if this list has an element that is equal (as determined by ===) to elem, false otherwise.
     */
    readonly contains: (element: T) => boolean = (element) =>
        this.value === element || this.tail.contains(element)

    /**
     * Selects all elements of this list which satisfy a predicate.
     * @param predicate the predicate used to test elements.
     * @returns a new list consisting of all elements of this list that satisfy the given predicate.
     * The order of the elements is preserved.
     */
    readonly filter: (predicate: Predicate<T>) => List<T> = predicate =>
        predicate(this.value) ? new Cons(this.value, this.tail.filter(predicate)) : this.tail.filter(predicate)

    /**
     * Builds a new list by applying a function to all elements of this list.
     * @param f the function to apply to each element.
     * @returns a new list resulting from applying the given function f to each element of this list and collecting the results.
     */
    readonly map: <U>(f: Mapper<T, U>) => List<U> = (f) =>
        new Cons(f(this.value), this.tail.map(f))

    readonly exists: (predicate: Predicate<T>) => boolean = (predicate) =>
        predicate(this.value) || this.tail.exists(predicate)

    readonly find: (predicate: Predicate<T>) => Option<T> = (predicate) =>
        this.exists(predicate) ? predicate(this.value) ? some(this.value) : this.tail.find(predicate) : none()

    readonly indexOf: (element: T) => number = (element) => {
        const _indexOf: (e: T, l: List<T>, i: number) => number = (e, l, i) =>
            l instanceof Cons ? (l.value === e ? i : _indexOf(e, l.tail, i + 1)) : -1
        return _indexOf(element, this, 0)
    }

    readonly collect: <U>(p: List<Predicate<T>>, f: List<Mapper<T, U>>) => List<U> = (p, f) =>
        p.exists(pred => pred(this.value))
            ? new Cons(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (f.get(p.indexOf(p.find(pred => pred(this.value)).get())) as Mapper<T, U>)(this.value),
                this.tail.collect(p, f))
            : this.tail.collect(p, f)

    

}
