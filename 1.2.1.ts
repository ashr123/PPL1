import {map} from 'ramda'

let v1: { name: string, age: number }={name: "peter", age: 20},
	v2: { children: ({ name: string } | { age: number })[] }={children: [{name: "john"}, {age: 12}]},
	v3: (x: number) => number=(x) => x+2,
	v4: <T, Y, Z>(f: (x: T | Y) => T | Y, l: (T | Y)[]) => Z[]=(f, l) => map((x) => f(f(x)), l);