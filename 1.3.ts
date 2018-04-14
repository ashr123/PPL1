import {map} from 'ramda'

const v1: { name: string, age: number }={name: "peter", age: 20},
	v2: { children: ({ name: string } | { age: number })[] }={children: [{name: "john"}, {age: 12}]},
	v3: (x: number) => number=(x) => x+2,
	v4: <T, Y>(f: (x: T | Y) => T | Y, l: (T | Y)[]) => (T | Y)[]=(f, l) => map((x) => f(f(x)), l);
let a=[
	[1, 2],
	[3, 4],
];
let b=[
	[9, 9],
	[8, 7],
];
a.concat(b);
console.log(b);