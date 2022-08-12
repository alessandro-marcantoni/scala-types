import { fromArray, list, toArray, List } from "../main/list/list"
import { Nil } from "../main/list/nil"
import { Cons } from "../main/list/cons"
import { Predicate, Mapper } from "../main/utils"

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

describe("Test contains", () => {
    test("Empty list should not contain any element", () => {
        expect(list().contains(0)).toBeFalsy()
    })
    test("Full list should contain only its elements", () => {
        expect(fullList.contains(1)).toBeTruthy()
        expect(fullList.contains(6)).toBeFalsy()
    })
})

describe("Test filter", () => {
    const even: Predicate<number> = e => e % 2 === 0
    test("Empty list should be an empty list", () => {
        expect(list<number>().filter(even).equals(list())).toBeTruthy()
    })
    test("Full list should contain only the elements that satisfy the predicate", () => {
        expect(fullList.filter(even).equals(fromArray(fullArray.filter(even)))).toBeTruthy()
    })
})

describe("Test map", () => {
    test("Empty list should be an empty list", () => {
        expect(list<number>().map(toString).equals(list())).toBeTruthy()
    })
    test("Full list should contain the mapped elements", () => {
        expect(fullList.map(toString).equals(fromArray(fullArray.map(toString)))).toBeTruthy()
    })
})

describe("Test exists", () => {
    const even: Predicate<number> = e => e % 2 === 0
    test("Empty list should always return false", () => {
        expect(list<number>().exists(even)).toBeFalsy()
    })
    test("Full list should tell whether the predicate is satisfied by an element", () => {
        expect(fullList.exists(even)).toBeTruthy()
        expect(fullList.exists(e => e > 10)).toBeFalsy()
    })
})

describe("Test find", () => {
    const even: Predicate<number> = e => e % 2 === 0
    test("Empty list should always return None", () => {
        expect(list<number>().find(even).isDefined()).toBeFalsy()
    })
    test("Full list should tell whether the predicate is satisfied by an element", () => {
        expect(fullList.find(even).isDefined()).toBeTruthy()
        expect(fullList.find(even).get()).toBe(2)
        expect(fullList.find(e => e > 10).isDefined()).toBeFalsy()
    })
})

describe("Test indexOf", () => {
    test("Empty list should return -1", () => {
        expect(list().indexOf(0)).toBe(-1)
    })
    test("Full list should return the index of the element if present", () => {
        expect(fullList.indexOf(0)).toBe(-1)
        expect(fullList.indexOf(1)).toBe(0)
        expect(fullList.indexOf(5)).toBe(4)
    })
})

describe("Test collect", () => {
    const predicates: List<Predicate<number>> = fromArray([i => i % 2 === 0, i => i >= 5])
    const mappers: List<Mapper<number, number>> = fromArray([i => i * 10, i => i * 100])
    test("Empty list should return an empty list", () => {
        expect(list<number>().collect(predicates, mappers).equals(list())).toBeTruthy()
    })
    test("Full list should return the mapped elements that satisfy the any predicate", () => {
        expect(fullList.collect(list(), list<Mapper<number, number>>()).equals(list())).toBeTruthy()
        expect(fullList.collect(predicates, mappers).equals(list(20, 40, 500))).toBeTruthy()
    })
})

describe("Test collectFirst", () => {
    const predicate: Predicate<number> = i => i % 2 === 0
    const mapper: Mapper<number, number> = i => i* 10
    test("Empty list should return a None", () => {
        expect(list<number>().collectFirst(predicate, mapper).isDefined()).toBeFalsy()
    })
    test("Full list should return an option with the mapped value", () => {
        expect(fullList.collectFirst(predicate, mapper).get()).toBe(20)
    })
})

describe("Test count", () => {
    const predicate: Predicate<number> = i => i % 2 === 0
    test("Empty list should return 0", () => {
        expect(list<number>().count(predicate)).toBe(0)
    })
    test("Full list should return the number of elements that satisfy the predicate", () => {
        expect(fullList.count(predicate)).toBe(2)
    })
})

describe("Test flatMap", () => {
    const f: <T>(elem: T) => List<T> = x => list(x, x)
    test("Empty list should return empty list", () => {
        expect(list<number>().flatMap(f).equals(list())).toBeTruthy()
    })
    test("Full list should contain all the elements of the generated lists", () => {
        expect(fullList.flatMap(f).equals(list(1, 1, 2, 2, 3, 3, 4, 4, 5, 5))).toBeTruthy()
    })
})