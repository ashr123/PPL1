// import {map, union} from 'ramda'

declare const require: any;
const assert=require('assert');

interface BinTree
{
	root: number;
	left?: BinTree;
	right?: BinTree;
}

const tree1: BinTree={
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
	},
	tree2: BinTree={
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
	},
	tree3: BinTree=undefined,
	GTree1: GBinTree<string | number | boolean>={
		root: true,
		left: {
			root: 'a',
			left: {
				root: 'Java',
				right: {
					root: 'Scheme'
				}
			}
		},
		right: {
			root: 'b',
			left: {
				root: 8
			}
		}
	},
	GTree2: GBinTree<string>={
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
	},
	GTree3=undefined,
	TreePreArray: (tree: BinTree) => number[]=tree =>
	{
		if (!tree)
			return [];
		return [tree.root].concat(TreePreArray(tree.left)).concat(TreePreArray(tree.right)) //union(union([tree.root], TreePreArray(tree.left)), TreePreArray(tree.right));
	},
	TreeInArray: (tree: BinTree) => number[]=tree =>
	{
		if (!tree)
			return [];
		return TreeInArray(tree.left).concat([tree.root]).concat(TreeInArray(tree.right)) //union(union(TreeInArray(tree.left), [tree.root]), TreeInArray(tree.right));
	},
	TreePostArray: (tree: BinTree) => number[]=tree =>
	{
		if (!tree)
			return [];
		return TreePostArray(tree.left).concat(TreePostArray(tree.right)).concat([tree.root]) //union(union(TreePostArray(tree.left), TreePostArray(tree.right)), [tree.root]);
	};

function testTreePreArray(): void
{
	assert.deepStrictEqual(TreePreArray(tree1), [5, -3, 23, 3, 8, 12]);
	assert.deepStrictEqual(TreePreArray(tree2), [1, 2, 3, 4, 5, 6, 7, 8]);
	assert.deepStrictEqual(TreePreArray(tree3), []);
}

function testTreeInArray(): void
{
	assert.deepStrictEqual(TreeInArray(tree1), [23, -3, 5, 8, 3, 12]);
	assert.deepStrictEqual(TreeInArray(tree2), [1, 2, 3, 4, 5, 6, 7, 8]);
	assert.deepStrictEqual(TreeInArray(tree3), []);
}

function testTreePostArray(): void
{
	assert.deepStrictEqual(TreePostArray(tree1), [23, -3, 8, 12, 3, 5]);
	assert.deepStrictEqual(TreePostArray(tree2), [8, 7, 6, 5, 4, 3, 2, 1]);
	assert.deepStrictEqual(TreePostArray(tree3), []);
}

testTreePreArray();
testTreeInArray();
testTreePostArray();

// console.log(TreePreArray(tree1));
// console.log(TreeInArray(tree1));
// console.log(TreePostArray(tree1));

interface GBinTree<T>
{
	root: T;
	left?: GBinTree<T>;
	right?: GBinTree<T>;
}

function GTreePreArray<T>(tree: GBinTree<T>): T[]
{
	if (!tree)
		return [];
	return [tree.root].concat(GTreePreArray(tree.left)).concat(GTreePreArray(tree.right)) //union(union([tree.root], GTreePreArray(tree.left)), GTreePreArray(tree.right));
}

function GTreeInArray<T>(tree: GBinTree<T>): T[]
{
	if (!tree)
		return [];
	return GTreeInArray(tree.left).concat([tree.root]).concat(GTreeInArray(tree.right)) //union(union(GTreeInArray(tree.left), [tree.root]), GTreeInArray(tree.right));
}

function GTreePostArray<T>(tree: GBinTree<T>): T[]
{
	if (!tree)
		return [];
	return GTreePostArray(tree.left).concat(GTreePostArray(tree.right)).concat([tree.root]) //union(union(GTreePostArray(tree.left), GTreePostArray(tree.right)), [tree.root]);
}

// console.log(GTreePreArray(GTree1));
// console.log(GTreeInArray(GTree1));
// console.log(GTreePostArray(GTree1));

function testGTreePreArray(): void
{
	assert.deepStrictEqual(GTreePreArray(GTree1), [true, 'a', 'Java', 'Scheme', 'b', 8]);
	assert.deepStrictEqual(GTreePreArray(GTree2), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
	assert.deepStrictEqual(GTreePreArray(GTree3), []);
}

function testGTreeInArray(): void
{
	assert.deepStrictEqual(GTreeInArray(GTree1), ['Java', 'Scheme', 'a', true, 8, 'b']);
	assert.deepStrictEqual(GTreeInArray(GTree2), ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
	assert.deepStrictEqual(GTreeInArray(GTree3), []);
}

function testGTreePostArray(): void
{
	assert.deepStrictEqual(GTreePostArray(GTree1), ['Scheme', 'Java', 'a', 8, 'b', true]);
	assert.deepStrictEqual(GTreePostArray(GTree2), ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']);
	assert.deepStrictEqual(GTreePostArray(GTree3), []);
}

testGTreePreArray();
testGTreeInArray();
testGTreePostArray();

function KSubsets<T>(A: T[], k: number): T[][]
{
	function fork(i: number, acc: T[]): T[][]
	{
		if (acc.length===k)
			return [acc];
		if (i===A.length)
			return [];
		return fork(i+1, acc.concat([A[i]])).concat(fork(i+1, acc));
	}

	return fork(0, [])
}

function AllSubsets<T>(A: T[]): T[][]
{
	function temp(i: number): T[][]
	{
		if (i===A.length)
			return KSubsets(A, i);
		return KSubsets(A, i).concat(temp(i+1));
	}

	return temp(0);
}

const num: number[]=[1, 2, 3];
// console.log(KSubsets([], 2));
// console.log(KSubsets([[1], [2], [3]], 2));
// console.log(AllSubsets(num));
// console.log(AllSubsets([[1], [2], [3]]));

function testKSubsets(): void
{
	assert.deepStrictEqual(KSubsets(num, 2), [[1, 2], [1, 3], [2, 3]]);
	assert.deepStrictEqual(KSubsets(num, 0), [[]]);
	assert.deepStrictEqual(KSubsets(num, 3), [[1, 2, 3]]);
}

function testAllSubsets(): void
{
	assert.deepStrictEqual(AllSubsets(num), [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]);
	assert.deepStrictEqual(AllSubsets([[1], [2], [3]]),
		[[], [[1]], [[2]], [[3]], [[1], [2]], [[1], [3]], [[2], [3]], [[1], [2], [3]]]);
	assert.deepStrictEqual(AllSubsets([]), [[]]);
}

testKSubsets();
testAllSubsets();

function Flatmap<T, R>(f: (x: T) => R[], A: T[]): R[]
{
	function temp(i: number): R[]
	{
		if (i===A.length)
			return [];
		return f(A[i]).concat(temp(i+1));
	}

	return temp(0);
}

// console.log(Flatmap(x => x, [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]));

function testFlatmap(): void
{
	assert.deepStrictEqual(Flatmap(x => x[0], [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]), [1, 2, 5, 6]);
	assert.deepStrictEqual(Flatmap(x => [x, x+1], [1, 2, 3, 4]), [1, 2, 2, 3, 3, 4, 4, 5]);
	assert.deepStrictEqual(Flatmap(x => x, [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]),
		[[1, 2], [3, 4], [5, 6], [7, 8]]);
}

testFlatmap();

type Boxart={ width: number, height: number, url: string };
type Video={
	id: number,
	title: string,
	boxarts: Boxart[],
	url: string,
	rating: number,
	bookmark: { id: number, time: number }[]
}
type BoxArtRet={ id: number, title: string, boxart: string };

interface Movie
{
	name: string,
	videos: Video[]
}

const movieLists: Movie[]=[
	{
		name: "Instant Queue",
		videos: [
			{
				"id": 70111470,
				"title": "Die Hard",
				"boxarts": [
					{width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"},
					{width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg"}
				],
				"url": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 4.0,
				"bookmark": []
			},
			{
				"id": 654356453,
				"title": "Bad Boys",
				"boxarts": [
					{width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg"},
					{width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg"}

				],
				"url": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 5.0,
				"bookmark": [{id: 432534, time: 65876586}]
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
					{width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg"},
					{width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg"}
				],
				"url": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 4.0,
				"bookmark": []
			},
			{
				"id": 675465,
				"title": "Fracture",
				"boxarts": [
					{width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg"},
					{width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg"},
					{width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg"}
				],
				"url": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 5.0,
				"bookmark": [{id: 432534, time: 65876586}]
			}
		]
	}
];

function getBoxArts(movieLists: Movie[]): BoxArtRet[]
{
	return Flatmap((x: Movie): Video[] => x.videos, movieLists).map((y: Video): BoxArtRet =>
	{
		return {
			id: y.id,
			title: y.title,
			boxart: Flatmap((z: Boxart): string[] => [z.url], y.boxarts.filter((u: Boxart): boolean => u.width===150 && u.height===200)).reduce((acc: string): string => acc)
		}
	});
}

// console.log(getBoxArts([{name: "Empty", videos: []}]));

function testGetBoxArts()
{
	assert.deepStrictEqual(getBoxArts(movieLists), [{
		id: 70111470,
		title: 'Die Hard',
		boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg'
	},
		{
			id: 654356453,
			title: 'Bad Boys',
			boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg'
		},
		{
			id: 65432445,
			title: 'The Chamber',
			boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg'
		},
		{
			id: 675465,
			title: 'Fracture',
			boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg'
		}]);
	assert.deepStrictEqual(getBoxArts([{name: "Empty", videos: []}]), []);
	assert.deepStrictEqual(getBoxArts([]), []);
}

testGetBoxArts();