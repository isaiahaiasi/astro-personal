import { h } from 'preact';
import { useState } from "preact/hooks";

type NodeName = string | number;
interface Node {
	name: NodeName;
	adj: NodeName[];
}

interface Graph {
	[key: NodeName]: Node;
}

interface GraphAnimState {
	current: NodeName | null;
	marked: NodeName[];
	queued: NodeName[];
}

const node = (name: NodeName, adj: NodeName[] = []) => ({ name, adj });

const graph: Graph = {
	A: node("A", ["B", "C", "D"]),
	B: node("B", ["C", "E"]),
	C: node("C", ["A", "E"]),
	D: node("D", ["C", "E"]),
	E: node("E")
};

// TODO: make it startingNodes array
const startingNode: NodeName = "A";

const initState = {
	current: startingNode,
	marked: [startingNode, ...graph[startingNode].adj],
	queued: [...graph[startingNode].adj]
};

export default function GraphAnim() {
	const [state, setState] = useState<GraphAnimState>({ ...initState });
	const { current, marked, queued } = state;

	function stepAnim() {
		if (state.queued.length === 0) {
			setState({ ...initState });
			return;
		}

		setState((prevState) => {
			const current = prevState.queued.at(0) as NodeName;

			const unvisitedAdj: NodeName[] = graph[current].adj.filter(
				(n) => !prevState.marked.includes(n)
			);

			const marked = [...unvisitedAdj, ...prevState.marked];
			const queued = [...unvisitedAdj, ...prevState.queued.slice(1)];

			return { current, marked, queued };
		});
	}

	return (
		<div>
			<div>Current Node: {current}</div>
			<div>Visited: {marked.filter(n => !queued.includes(n))}</div>
			<div>Queued: {queued}</div>
			<button onClick={stepAnim}>{queued.length > 0 ? "Next" : "Restart"}</button>
		</div>
	);
}
