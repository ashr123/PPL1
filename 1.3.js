"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
let v1 = { name: "peter", age: 20 }, v2 = { children: [{ name: "john" }, { age: 12 }] }, v3 = (x) => x + 2, v4 = (f, l) => ramda_1.map((x) => f(f(x)), l);
// type T1={ a: number, b: {} }[]
// type T2={ a: number }[]
//
// let check: T2=[{a: 5, b: {}}],
// 	check2: T1=[{a: 5}];
//# sourceMappingURL=1.3.js.map