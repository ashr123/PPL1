"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const assert = require('assert');
let tree1 = {
    root: 5,
    left: {
        root: -3,
        left: {
            root: 23
        }
    },
    right: {
        root: 3,
        left: {
            root: 8
        },
        right: {
            root: 12
        }
    }
}, tree2 = {
    root: 1,
    right: {
        root: 2,
        right: {
            root: 3,
            right: {
                root: 4,
                right: {
                    root: 5,
                    right: {
                        root: 6,
                        right: {
                            root: 7,
                            right: {
                                root: 8
                            }
                        }
                    }
                }
            }
        }
    }
}, tree3 = undefined;
let GTree1 = {
    root: true,
    left: {
        root: 'a',
        left: {
            root: 'mayer',
            right: {
                root: 'theMargiz'
            }
        }
    },
    right: {
        root: 'b',
        left: {
            root: 8
        }
    }
}, GTree2 = {
    root: "a",
    right: {
        root: "b",
        right: {
            root: "c",
            right: {
                root: "d",
                right: {
                    root: "e",
                    right: {
                        root: "f",
                        right: {
                            root: "g",
                            right: {
                                root: "h"
                            }
                        }
                    }
                }
            }
        }
    }
}, GTree3 = undefined;
let TreePreArray = tree => {
    if (!tree)
        return [];
    return ramda_1.union(ramda_1.union([tree.root], TreePreArray(tree.left)), TreePreArray(tree.right));
};
let TreeInArray = tree => {
    if (!tree)
        return [];
    return ramda_1.union(ramda_1.union(TreeInArray(tree.left), [tree.root]), TreeInArray(tree.right));
};
let TreePostArray = tree => {
    if (!tree)
        return [];
    return ramda_1.union(ramda_1.union(TreePostArray(tree.left), TreePostArray(tree.right)), [tree.root]);
};
function testTreePreArray() {
    assert.deepStrictEqual(TreePreArray(tree1), [5, -3, 23, 3, 8, 12]);
    assert.deepStrictEqual(TreePreArray(tree2), [1, 2, 3, 4, 5, 6, 7, 8]);
    assert.deepStrictEqual(TreePreArray(tree3), []);
}
function testTreeInArray() {
    assert.deepStrictEqual(TreeInArray(tree1), [23, -3, 5, 8, 3, 12]);
    assert.deepStrictEqual(TreeInArray(tree2), [1, 2, 3, 4, 5, 6, 7, 8]);
    assert.deepStrictEqual(TreeInArray(tree3), []);
}
function testTreePostArray() {
    assert.deepStrictEqual(TreePostArray(tree1), [23, -3, 8, 12, 3, 5]);
    assert.deepStrictEqual(TreePostArray(tree2), [8, 7, 6, 5, 4, 3, 2, 1]);
    assert.deepStrictEqual(TreePostArray(tree3), []);
}
testTreePreArray();
testTreeInArray();
testTreePostArray();
console.log(TreePreArray(tree1));
console.log(TreeInArray(tree1));
console.log(TreePostArray(tree1));
function GTreePreArray(tree) {
    if (!tree)
        return [];
    return ramda_1.union(ramda_1.union([tree.root], GTreePreArray(tree.left)), GTreePreArray(tree.right));
}
function GTreeInArray(tree) {
    if (!tree)
        return [];
    return ramda_1.union(ramda_1.union(GTreeInArray(tree.left), [tree.root]), GTreeInArray(tree.right));
}
function GTreePostArray(tree) {
    if (!tree)
        return [];
    return ramda_1.union(ramda_1.union(GTreePostArray(tree.left), GTreePostArray(tree.right)), [tree.root]);
}
console.log(GTreePreArray(GTree2));
console.log(GTreeInArray(GTree2));
console.log(GTreePostArray(GTree2));
function testGTreePreArray() {
    assert.deepStrictEqual(GTreePreArray(GTree1), [true, 'a', 'mayer', 'theMargiz', 'b', 8]);
    assert.deepStrictEqual(GTreePreArray(GTree2), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
    assert.deepStrictEqual(GTreePreArray(GTree3), []);
}
function testGTreeInArray() {
    assert.deepStrictEqual(GTreeInArray(GTree1), ['mayer', 'theMargiz', 'a', true, 8, 'b']);
    assert.deepStrictEqual(GTreeInArray(GTree2), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
    assert.deepStrictEqual(GTreeInArray(GTree3), []);
}
function testGTreePostArray() {
    assert.deepStrictEqual(GTreePostArray(GTree1), ['theMargiz', 'mayer', 'a', 8, 'b', true]);
    assert.deepStrictEqual(GTreePostArray(GTree2), ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']);
    assert.deepStrictEqual(GTreePostArray(GTree3), []);
}
testGTreePreArray();
testGTreeInArray();
testGTreePostArray();
function KSubsets(A, k) {
    function fork(i, acc) {
        if (acc.length === k)
            return [acc];
        if (i === A.length)
            return [];
        return fork(i + 1, acc.concat([A[i]])).concat(fork(i + 1, acc));
    }
    return fork(0, []);
}
function AllSubsets(A) {
    function temp(i) {
        if (i === A.length)
            return KSubsets(A, i);
        return KSubsets(A, i).concat(temp(i + 1));
    }
    return temp(0);
}
const num = [1, 2, 3];
console.log(KSubsets(num, 2));
console.log(KSubsets([[1], [2], [3]], 2));
console.log(AllSubsets(num));
console.log(AllSubsets([[1], [2], [3]]));
function testKSubsets() {
    assert.deepStrictEqual(KSubsets(num, 2), [[1, 2], [1, 3], [2, 3]]);
    assert.deepStrictEqual(KSubsets(num, 0), [[]]);
    assert.deepStrictEqual(KSubsets(num, 3), [[1, 2, 3]]);
}
function testAllSubsets() {
    assert.deepStrictEqual(AllSubsets(num), [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]);
    assert.deepStrictEqual(AllSubsets([[1], [2], [3]]), [[], [[1]], [[2]], [[3]], [[1], [2]], [[1], [3]], [[2], [3]], [[1], [2], [3]]]);
    assert.deepStrictEqual(AllSubsets([]), [[]]);
}
testKSubsets();
testAllSubsets();
function Flatmap(f, A) {
    function temp(i) {
        if (i === A.length)
            return [];
        return f(A[i]).concat(temp(i + 1));
    }
    return temp(0);
}
console.log(Flatmap(x => [x, x + 1], [1, 2, 3, 4]));
function testFlatmap() {
    assert.deepStrictEqual(Flatmap(x => x[0], [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]), [1, 2, 5, 6]);
    assert.deepStrictEqual(Flatmap(x => [x, x + 1], [1, 2, 3, 4]), [1, 2, 2, 3, 3, 4, 4, 5]);
    assert.deepStrictEqual(Flatmap(x => x, [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]), [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]);
}
let movieLists = [
    {
        name: "Instant Queue",
        videos: [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "New Releases",
        videos: [
            {
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    }
];
function getBoxArts(movieLists) {
    return Flatmap((x) => x.videos, movieLists).map((y) => {
        return {
            id: y.id,
            title: y.title,
            boxart: Flatmap((z) => [z.url], y.boxarts.filter((u) => u.width === 150 && u.height === 200)).reduce((acc) => acc)
        };
    });
}
console.log(getBoxArts(movieLists));
//# sourceMappingURL=Q2.js.map