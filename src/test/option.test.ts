import {Option, some, none, NoSuchElementError} from "../main/option/option"
import * as console from "console"

const value: number = 0
const mapper: (v: typeof value) => number = (v) => v.toString().length
const flatMapper: (v: typeof value) => Option<number> = (v) => some(mapper(v))
// tslint:disable-next-line:no-console
const logger: (v: any) => void = (v) => console.log(v)
const combiner: (a: any, b: string) => string = (a, b) => a.toString() + b
const dummyValue = "dummy"
const simpleSome: Option<typeof value> = some(value)
const simpleNone: Option<any> = none()

describe("Test equality", () => {
    test("Some with same values should be equals", () => {
        expect(simpleSome.equals(simpleSome)).toBeTruthy()
    })
    test("Some with different values should NOT be equals", () => {
        expect(simpleSome.equals(some(1))).toBeFalsy()
        expect(simpleSome.equals(some("1"))).toBeFalsy()
    })
    test("Some and None should NOT be equals", () => {
        expect(simpleSome.equals(simpleNone)).toBeFalsy()
        expect(simpleNone.equals(simpleSome)).toBeFalsy()
    })
    test("None should always be equals", () => {
        expect(simpleNone.equals(simpleNone)).toBeTruthy()
    })
})

describe("Test Option definition", () => {
    test("Some should be defined", () => {
        expect(simpleSome.isDefined()).toBeTruthy()
        expect(simpleSome.isEmpty()).toBeFalsy()
    })
    test("None should NOT be defined", () => {
        expect(simpleNone.isDefined()).toBeFalsy()
        expect(simpleNone.isEmpty()).toBeTruthy()
    })
})

describe("Test Option get", () => {
    test("Some should return its value", () => {
        expect(simpleSome.get()).toBe(value)
    })
    test("None should raise an error", () => {
        expect(() => simpleNone.get()).toThrow(new NoSuchElementError())
    })
})

describe("Test orElse", () => {
    test("Some should return itself", () => {
        expect(simpleSome.orElse(dummyValue)).toBe(simpleSome)
    })
    test("None should return else value", () => {
        expect(simpleNone.orElse(dummyValue)).toBe(dummyValue)
    })
})

describe("Test getOrElse", () => {
    test("Some should return its value", () => {
        expect(simpleSome.getOrElse(dummyValue)).toBe(value)
    })
    test("None should return else value", () => {
        expect(simpleNone.getOrElse(dummyValue)).toBe(dummyValue)
    })
})

describe("Test map", () => {
    test("Some should apply the function to its value", () => {
        expect(simpleSome.map(mapper).equals(flatMapper((value)))).toBeTruthy()
    })
    test("None should return another None", () => {
        expect(simpleNone.map(mapper).equals(none())).toBeTruthy()
    })
})

describe("Test flatMap", () => {
    test("Some should apply the function to its value", () => {
        expect(simpleSome.flatMap(flatMapper).equals(flatMapper(value))).toBeTruthy()
    })
    test("None should return another None", () => {
        expect(simpleNone.flatMap(flatMapper).equals(none())).toBeTruthy()
    })
})

describe("Test contains", () => {
    test("Some should contain its value", () => {
        expect(simpleSome.contains(value)).toBeTruthy()
    })
    test("Some should NOT contain another value", () => {
        expect(simpleSome.contains(mapper(value))).toBeFalsy()
    })
    test("None should not contain any value", () => {
        expect(simpleNone.contains(value)).toBeFalsy()
    })
})

describe("Test collect", () => {
    test("Some with predicate that holds should apply the function to its value", () => {
        expect(simpleSome.collect(() => true, mapper).equals(flatMapper(value)))
    })
    test("Some with predicate that does NOT hold should return None", () => {
        expect(simpleSome.collect(() => false, mapper).equals(none()))
    })
    test("None should return None", () => {
        expect(simpleNone.collect(() => true, mapper).equals(none()))
    })
})

describe("Test zip", () => {
    test("Two Some should be zipped together", () => {
        expect(simpleSome.zip(some(value.toString()), combiner)
            .equals(some(combiner(value, value.toString())))).toBeTruthy()
    })
    test("A Some and a None should return None", () => {
        expect(simpleSome.zip(simpleNone, combiner).equals(none())).toBeTruthy()
    })
    test("A None should always return None", () => {
        expect(simpleNone.zip(simpleSome.map(toString), combiner).equals(none())).toBeTruthy()
    })
})

describe("Test apply", () => {
    test("Some should apply the function to its value", () => {
        simpleSome.apply(logger)
    })
    test("None should not apply the function", () => {
        simpleNone.apply(logger)
    })
})

describe("Test toString", () => {
    test("Some should print the value", () => {
        logger(simpleSome.toString())
    })
    test("Nome should print the none type", () => {
        logger(simpleNone.toString())
    })
})
