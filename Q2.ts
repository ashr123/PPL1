import {map, union} from 'ramda'

interface BinTree {
	root: number;
	left?: BinTree;
	right?: BinTree;
}

let tree: BinTree = {
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

let Tree2: GBinTree<any> = {
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

let TreePreArray: (tree: BinTree) => number[] = tree => {
	if (!tree)
		return [];
	return union([tree.root], union(TreePreArray(tree.left), TreePreArray(tree.right)));
};

let TreeInArray: (tree: BinTree) => number[] = tree => {
	if (!tree)
		return [];
	return union(TreeInArray(tree.left), union([tree.root], TreeInArray(tree.right)));
};

let TreePostArray: (tree: BinTree) => number[] = tree => {
	if (!tree)
		return [];
	return union(union(TreePostArray(tree.left), TreePostArray(tree.right)), [tree.root]);
};

console.log(TreePreArray(tree));
console.log(TreeInArray(tree));
console.log(TreePostArray(tree));

interface GBinTree<T> {
	root: T;
	left?: GBinTree<T>;
	right?: GBinTree<T>;
}

let GTreePreArray: <T>(tree: GBinTree<T>) => T[] = tree => {
	if (!tree)
		return [];
	return union([tree.root], union(GTreePreArray(tree.left), GTreePreArray(tree.right)));
};

let GTreeInArray: <T>(tree: GBinTree<T>) => T[] = tree => {
	if (!tree)
		return [];
	return union(GTreeInArray(tree.left), union([tree.root], GTreeInArray(tree.right)));
};

let GTreePostArray: <T>(tree: GBinTree<T>) => T[] = tree => {
	if (!tree)
		return [];
	return union(union(GTreePostArray(tree.left), GTreePostArray(tree.right)), [tree.root]);
};

console.log(GTreePreArray(Tree2));
console.log(GTreeInArray(Tree2));
console.log(GTreePostArray(Tree2));