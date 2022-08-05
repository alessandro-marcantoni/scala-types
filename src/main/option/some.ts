import {none, Option, some} from "./option"

export class Some<T> {
    private readonly value: T

    constructor(value: T) {
        this.value = value
    }

    /**
     * Returns true if the option is an instance of Some, false otherwise
     */
    readonly isDefined: () => boolean = () => true

    /**
     * Returns true if the option is None, false otherwise
     */
    readonly isEmpty: () => boolean = () => !this.isDefined()

    /**
     * Returns the option's value.
     */
    readonly get: () => T = () => this.value

    /**
     * Compares two Options.
     * @param other The other Option to compare.
     */
    readonly equals: <U>(other: Option<U>) => boolean = <U>(other: Option<U>) => {
        return other.isDefined() && (other as Some<T>).get() === this.get()
    }

    /**
     * Returns this Option if it is nonempty, otherwise return the result of evaluating alternative.
     * @param alternative The alternative expression.
     */
    readonly orElse: <U>(alternative: U) => Option<T> = () => this

    /**
     * Returns the option's value if the option is nonempty, otherwise return the result of evaluating value.
     * @param value The default expression.
     */
    readonly getOrElse: <U>(value: U) => T = () => this.get()

    /**
     * Returns a Some containing the result of applying f to this Option's value if this Option is nonempty. Otherwise, return None.
     * @param f The function to apply.
     */
    readonly map: <U>(f: (v: T) => U) => Option<U> = (f) => some(f(this.get()))

    /**
     * Returns the result of applying f to this Option's value if this Option is nonempty. Returns None if this Option is empty.
     * Slightly different from map in that f is expected to return an Option (which could be None).
     * @param f The function to apply.
     */
    readonly flatMap: <U>(f: (v: T) => Option<U>) => Option<U> = (f) => f(this.get())

    /**
     * Tests whether the option contains a given value as an element.
     * @param value The value to test.
     */
    readonly contains: (value: T) => boolean = (value) => this.get() === value

    /**
     * Returns a Some containing the result of applying f to this Option's contained value,
     * if this option is nonempty and p holds for that value. Returns None otherwise.
     * @param p The predicate to test the value with.
     * @param f The function to apply.
     */
    readonly collect: <U>(p: (v: T) => boolean, f: (v: T) => U) => Option<U> =
        (p, f) => p(this.get()) ? some(f(this.get())) : none()

    /**
     * Returns a Some formed from this option and another option by combining the corresponding elements in a pair.
     * If either of the two options is empty, None is returned.
     * @param other Tho option which is going to be zipped.
     * @param f The function that combines to two options.
     */
    readonly zip: <U, V>(other: Option<U>, f: (v1: T, v2: U) => V) => Option<V> =
        <U, V>(other: Option<U>, f: (arg0: T, arg1: U) => V) => other.isDefined() ? some(f(this.get(), (other as Some<U>).get())) : none()

    /**
     * Apply the given procedure f to the option's value, if it is nonempty. Otherwise, do nothing.
     * @param f The procedure to apply.
     */
    readonly apply: (f: (v: T) => void) => void = (f) => f(this.get())

    readonly toString: () => string = () => `Some(${this.value})`

}
