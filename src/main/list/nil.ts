import { Option, none } from "../option"
import { Predicate, Mapper } from "../utils"
import {fromArray, list, List} from "./list"

export class Nil<T> {
    /**
     * The size of this list.
     * @returns {number} the number of elements in this list.
     */
    readonly size: () => number = () => 0

    /**
     * Compares the equality of two lists.
     * @param {List} other The list to compare with this list.
     * @returns {boolean} true if the two lists are equals, false otherwise.
     */
    readonly equals: (other: List<T>) => boolean = other => other instanceof Nil

    /**
     * A new list with elements in reversed order.
     * @returns {List} a new list with all elements of this list in reversed order.
     */
    readonly reverse: () => List<T> = () => new Nil()

    /**
     * A copy of this list with an element appended.
     * @param element The appended element.
     * @returns {List} a new list consisting of all elements of this list followed by element.
     */
    readonly appended: (element: T) => List<T> = (element) => list(element)

    /**
     * A copy of this list with an element prepended.
     * @param element The prepended element.
     * @returns {List} a new list consisting of element followed by all elements of this list.
     */
    readonly prepended: (element: T) => List<T> = (element) => this.appended(element)

    /**
     * Returns a new list containing the elements from the list followed by the elements of the given iterable.
     * @param {List | Array} iterable the iterable to append.
     * @returns {List} a new list which contains all elements of this list followed by all elements of iterable.
     */
    readonly appendedAll: (iterable: List<T> | T[]) => List<T> = (iterable) => {
        return iterable instanceof Array ? fromArray(iterable) : iterable
    }

    /**
     * Get the element at the specified index (corresponds to the apply method).
     * @returns the index-th element of the list, if existing.
     */
    readonly get: (index: number) => undefined = () => undefined

    /**
     * Tests whether this list contains a given value as an element.
     * @returns {boolean} true if this list has an element that is equal (as determined by ===) to elem, false otherwise.
     */
    readonly contains: (element: T) => boolean = () => false

    /**
     * Selects all elements of this list which satisfy a predicate.
     * @returns a new list consisting of all elements of this list that satisfy the given predicate.
     * The order of the elements is preserved.
     */
    readonly filter: (predicate: Predicate<T>) => List<T> = () => list()

    /**
     * Builds a new list by applying a function to all elements of this list.
     * @returns a new list resulting from applying the given function f to each element of this list and collecting the results.
     */
    readonly map: <U>(f: (element: T) => U) => List<U> = () => list()

    readonly exists: (predicate: Predicate<T>) => boolean = () => false

    readonly find: (predicate: Predicate<T>) => Option<T> = () => none()

    readonly indexOf: (element: T) => number = () => -1

    readonly collect: <U>(p: List<Predicate<T>>, f: List<Mapper<T, U>>) => List<U> = () => list()

}
