import { Option, some } from "../option"
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

    /**
     * Tests whether a predicate holds for at least one element of this list.
     * @param predicate the predicate used to test elements.
     * @returns true if the given predicate p is satisfied by at least one element of this list, otherwise false.
     */
    readonly exists: (predicate: Predicate<T>) => boolean = (predicate) =>
        predicate(this.value) || this.tail.exists(predicate)

    /**
     * Finds the first element of the list satisfying a predicate, if any.
     * @param predicate the predicate used to test elements.
     * @returns an option value containing the first element in the list that satisfies p, or None if none exists.
     */
    readonly find: (predicate: Predicate<T>) => Option<T> = (predicate) =>
        predicate(this.value) ? some(this.value) : this.tail.find(predicate)

    /**
     * Finds the last element of the list satisfying a predicate, if any.
     * @param predicate the predicate used to test elements.
     * @returns an option value containing the last element in the list that satisfies p, or None if none exists.
     */
    readonly findLast: (predicate: Predicate<T>) => Option<T> = (predicate) =>
        this.reverse().find(predicate)

    /**
     * Finds index of first occurrence of some value in this list.
     * @param element the element value to search for.
     * @returns the index >= 0 of the first element of this list that is equal (as determined by ===) to elem, or -1, if none exists.
     */
    readonly indexOf: (element: T) => number = (element) => {
        const _indexOf: (e: T, l: List<T>, i: number) => number = (e, l, i) =>
            l instanceof Cons ? (l.value === e ? i : _indexOf(e, l.tail, i + 1)) : -1
        return _indexOf(element, this, 0)
    }

    /**
     * Builds a new list by applying a mapper function to all elements of this list on which one of the predicates holds.
     * @param p The list of predicates.
     * @param f The list of mapper functions.
     * @returns a new list resulting from applying the mapper corresponding to the predicate that holds for each element collecting the results.
     * The order of the elements is preserved.
     */
    readonly collect: <U>(p: List<Predicate<T>>, f: List<Mapper<T, U>>) => List<U> = (p, f) =>
        p.exists(pred => pred(this.value))
            ? new Cons(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (f.get(p.indexOf(p.find(pred => pred(this.value)).get())) as Mapper<T, U>)(this.value),
                this.tail.collect(p, f))
            : this.tail.collect(p, f)

    /**
     * Finds the first element of the list for which the predicate holds, and applies the mapper to it.
     * @param p The predicate to test the elements with.
     * @param f The mapper function.
     * @returns an option value containing the mapper function applied to the first value for which the predicate holds, or None if none exists.
     */
    readonly collectFirst: <U>(p: Predicate<T>, f: Mapper<T, U>) => Option<U> = (p, f) =>
        this.find(e => p(e)).map(f)

    /**
     * Counts the number of elements in the list which satisfy a predicate.
     * @param predicate the predicate used to test elements.
     * @returns the number of elements satisfying the predicate p.
     */
    readonly count: (predicate: Predicate<T>) => number = (predicate) =>
        (predicate(this.value) ? 1 : 0) + this.tail.count(predicate)

    /**
     * Builds a new list by applying a function to all elements of this list and using the elements of the resulting collections.
     * @param f the function to apply to each element.
     * @returns a new list resulting from applying the given collection-valued function f to each element of this list and concatenating the results.
     */
    readonly flatMap: (f: (element: T) => List<T>) => List<T> = (f) =>
        f(this.value).appendedAll(this.tail.flatMap(f))

    /**
     * Tests whether a predicate holds for all elements of this list.
     * @param p the predicate used to test elements.
     * @returns true if this list is empty or the given predicate p holds for all elements of this list, otherwise false.
     */
    readonly forall: (p: Predicate<T>) => boolean = (p) =>
        p(this.value) && this.tail.forall(p)

    /**
     * Apply f to each element for its side effects.
     * @param f the side effect to apply to each element.
     */
    readonly foreach: (f: (element: T) => void) => void = (f) => {
        f(this.value)
        this.tail.foreach(f)
    }

    /**
     * Tests whether this list is empty.
     */
    readonly isEmpty: () => boolean = () => false
}
