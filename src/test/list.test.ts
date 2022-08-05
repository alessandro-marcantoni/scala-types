import {fromArray, list} from "../main/list/list"
import {Nil} from "../main/list/nil"
import {Cons} from "../main/list/cons"

const emptyArray: any[] = []
const fullArray = [1, 2, 3, 4, 5]
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
})
