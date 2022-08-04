import {none, NoSuchElementError, Option, some} from "./option";

export class None {
    /**
     * Returns true if the option is an instance of Some, false otherwise
     */
    readonly isDefined: () => boolean = () => false

    /**
     * Returns true if the option is None, false otherwise
     */
    readonly isEmpty: () => boolean = () => !this.isDefined()

    /**
     * Returns the option's value.
     */
    readonly get: () => void = () => {
        throw new NoSuchElementError()
    }

    /**
     * Compares two Options.
     * @param other The other Option to compare.
     */
    readonly equals: <T>(other: Option<T>) => boolean = other => !other.isDefined()

    /**
     * Returns this Option if it is nonempty, otherwise return the result of evaluating alternative.
     * @param alternative The alternative expression.
     */
    readonly orElse: <T>(alternative: T) => T = (alternative) => alternative

    /**
     * Returns the option's value if the option is nonempty, otherwise return the result of evaluating value.
     * @param value The default expression.
     */
    readonly getOrElse: <T>(value: T) => T = (value) => value

    /**
     * Returns a Some containing the result of applying f to this Option's value if this Option is nonempty. Otherwise, return None.
     * @param f The function to apply,
     */
    readonly map: <T>(f: (v: any) => T) => Option<T> = () => none()

    /**
     * Returns the result of applying f to this Option's value if this Option is nonempty. Returns None if this Option is empty.
     * Slightly different from map in that f is expected to return an Option (which could be None).
     * @param f The function to apply.
     */
    readonly flatMap: <T>(f: (v: any) => Option<T>) => Option<T> = () => none()

    /**
     * Tests whether the option contains a given value as an element.
     * @param value The value to test.
     */
    readonly contains: <T>(value: T) => boolean = () => false

    /**
     * Returns a Some containing the result of applying f to this Option's contained value,
     * if this option is nonempty and p holds for that value. Returns None otherwise.
     * @param p The predicate to test the value with.
     * @param f The function to apply.
     */
    readonly collect: <T>(p: (v: any) => boolean, f: (v: any) => T) => Option<T> = () => none()

    /**
     * Returns a Some formed from this option and another option by combining the corresponding elements in a pair.
     * If either of the two options is empty, None is returned.
     * @param other Tho option which is going to be zipped.
     * @param f The function that combines to two options.
     */
    readonly zip: <T, U>(other: Option<any>, f: (v1: T, v2: any) => U) => Option<U> = () => none()

    /**
     * Apply the given procedure f to the option's value, if it is nonempty. Otherwise, do nothing.
     * @param f The procedure to apply.
     */
        // tslint:disable-next-line:no-empty
    readonly apply: <T>(f: (v: T) => void) => void = () => {
    }

    readonly toString: () => string = () =>  "None"

}
