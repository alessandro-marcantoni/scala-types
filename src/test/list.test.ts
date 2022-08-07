import {fromArray, list, toArray} from "../main/list/list"
import {Nil} from "../main/list/nil"
import {Cons} from "../main/list/cons"

const emptyArray: any[] = []
const fullArray = Array.of(1, 2, 3, 4, 5)
const fullList = new Cons(1, new Cons(2, new Cons(3, new Cons(4, new Cons(5, new Nil())))))

describe("Test list creation", () => {
    test("List creation from array", () => {
        expect(fromArray(emptyArray).size()).toBe(0)
        expect(fromArray(emptyArray).equals(new Nil())).toBeTruthy()
        expect(fromArray(fullArray).size()).toBe(fullArray.length)
        expect(fromArray(fullArray).equals(fullList)).toBeTruthy()
    })
    test("List creation from values", () => {
        expect(list().size()).toBe(0)
        expect(list().equals(new Nil())).toBeTruthy()
        expect(list(1, 2, 3, 4, 5).size()).toBe(fullList.size())
        expect(list(1, 2, 3, 4, 5).equals(fullList)).toBeTruthy()
    })
})

describe("Test equality", () => {
    test("Empty lists should be equals", () => {
        expect(fromArray([]).equals(fromArray([]))).toBeTruthy()
        expect(fromArray([]).equals(new Nil())).toBeTruthy()
    })
    test("Lists with same elements should be equals", () => {
        expect(fromArray(fullArray).equals(fromArray(fullArray))).toBeTruthy()
        expect(fromArray(fullArray).equals(fullList)).toBeTruthy()
        expect(fromArray(fullArray.map(toString)).equals(fromArray(fullArray.map(toString)))).toBeTruthy()
    })
    test("Different lists should not be equal", () => {
        expect(fromArray(emptyArray).equals(fullList)).toBeFalsy()
        expect(fullList.equals(fromArray(emptyArray))).toBeFalsy()
        expect(fullList.equals(fromArray([0, 0, 0, 0, 0]))).toBeFalsy()
        expect(fullList.equals(fromArray([1, 0, 0, 0, 0]))).toBeFalsy()
    })
})

describe("Test toArray", () => {
    test("Empty list should be an empty array", () => {
        expect(toArray(list())).toStrictEqual([])
        expect(toArray(list()).length).toBe(0)
    })
    test("Full lists should give the corresponding array", () => {
        expect(toArray(fullList)).toStrictEqual(fullArray)
        expect(toArray(fullList).length).toBe(fullList.size())
    })
})

describe("Test reverse", () => {
    test("Empty list should be an empty list", () => {
        expect(list().reverse().equals(list())).toBeTruthy()
    })
    test("Full list should be the reversed full list", () => {
        const arr = JSON.parse(JSON.stringify(fullArray))
        expect(fullList.reverse().equals(fromArray(arr.reverse()))).toBeTruthy()
    })
})

describe("Test get", () => {
    test("Empty list should get undefined", () => {
        expect(list().get(0)).toBeUndefined()
    })
    test("Empty list should get undefined", () => {
        fullArray.forEach(i => expect(fullList.get(i)).toBe(i < fullList.size() ? i + 1 : undefined))
    })
})

describe("Test appended", () => {
    test("Empty list should contain only the appended element", () => {
        expect(list<number>().appended(0).equals(list(0))).toBeTruthy()
    })
    test("Full list should append the element", () => {
        expect(fullList.appended(6).get(5)).toBe(6)
    })
})

describe("Test appendedAll", () => {
    test("Empty list should contain only the appended elements", () => {
        expect(list<number>().appendedAll(fullArray).equals(fullList)).toBeTruthy()
        expect(list<number>().appendedAll(fullList).equals(fullList)).toBeTruthy()
    })
    test("Full list should append the element", () => {
        expect(fullList.appendedAll([6]).get(5)).toBe(6)
        expect(fullList.appendedAll(list(6)).get(5)).toBe(6)
    })
})

describe("Test prepended", () => {
    test("Empty list should contain only the prepended elements", () => {
        expect(list<number>().prepended(0).equals(list(0))).toBeTruthy()
    })
    test("Full list should prepend the element", () => {
        expect(fullList.prepended(0).equals(fromArray([0].concat(fullArray)))).toBeTruthy()
    })
})
