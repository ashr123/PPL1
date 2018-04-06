interface T1 {
	a: number[];
}

interface T2 {
	b: string;
}

let T3: T1 & T2={
	a: [4, 5],
	b: "gghhg"
};