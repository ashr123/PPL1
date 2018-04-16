import {map} from 'ramda'

const v1: { name: string, age: number }={name: "peter", age: 20},
	v2: { children: ({ name: string } | { age: number })[] }={children: [{name: "john"}, {age: 12}]},
	v3: (x: number) => number=(x) => x+2,
	v4: <T, Y>(f: (x: T | Y) => T | Y, l: (T | Y)[]) => (T | Y)[]=(f, l) => map((x) => f(f(x)), l);