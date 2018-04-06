"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var tree = {
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
};
var Tree2 = {
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
};
var TreePreArray = function (tree) {
    if (!tree)
        return [];
    return ramda_1.union([tree.root], ramda_1.union(TreePreArray(tree.left), TreePreArray(tree.right)));
};
var TreeInArray = function (tree) {
    if (!tree)
        return [];
    return ramda_1.union(TreeInArray(tree.left), ramda_1.union([tree.root], TreeInArray(tree.right)));
};
var TreePostArray = function (tree) {
    if (!tree)
        return [];
    return ramda_1.union(ramda_1.union(TreePostArray(tree.left), TreePostArray(tree.right)), [tree.root]);
};
console.log(TreePreArray(tree));
console.log(TreeInArray(tree));
console.log(TreePostArray(tree));
function GTreePreArray(tree) {
    if (!tree)
        return [];
    return ramda_1.union([tree.root], ramda_1.union(GTreePreArray(tree.left), GTreePreArray(tree.right)));
}
function GTreeInArray(tree) {
    if (!tree)
        return [];
    return ramda_1.union(GTreeInArray(tree.left), ramda_1.union([tree.root], GTreeInArray(tree.right)));
}
function GTreePostArray(tree) {
    if (!tree)
        return [];
    return ramda_1.union(ramda_1.union(GTreePostArray(tree.left), GTreePostArray(tree.right)), [tree.root]);
}
console.log(GTreePreArray(Tree2));
console.log(GTreeInArray(Tree2));
console.log(GTreePostArray(Tree2));
//# sourceMappingURL=Q2.js.map