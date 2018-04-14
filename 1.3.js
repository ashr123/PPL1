"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const v1 = { name: "peter", age: 20 }, v2 = { children: [{ name: "john" }, { age: 12 }] }, v3 = (x) => x + 2, v4 = (f, l) => ramda_1.map((x) => f(f(x)), l);
let a = [
    [1, 2],
    [3, 4],
];
let b = [
    [9, 9],
    [8, 7],
];
a.concat(b);
console.log(a.concat(b));
//# sourceMappingURL=1.3.js.map