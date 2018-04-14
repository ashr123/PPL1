interface T4
{
	a: { b: number }
}

interface T5
{
	a: { c: string }
}

let T6: T4 & T5={
	a: {
		b: 5,
		c: "vvv"
	}
};