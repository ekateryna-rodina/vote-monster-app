// idea is to keep track of nodes which loose to other nodes
// remove node which looses to every other and put it in ordered
// remove all its dependencies
export function sort(items: Array<number>, deps: number[][]) {
  // Write your code here.
  const rankGraph = createRankGraph(items, deps);
  return getOrderedItems(rankGraph);
}

function getOrderedItems(graph: RankGraph) {
  let ordered = [];
  const nodesWithNoPrereq = graph.nodes.filter((n: ItemNode) => !n.numOfWins);
  while (nodesWithNoPrereq.length) {
    const node = nodesWithNoPrereq.pop() as ItemNode;
    ordered.unshift(node.id);
    removeDeps(node, nodesWithNoPrereq);
  }
  const graphHasEdges = graph.nodes.some((n: ItemNode) => n.numOfWins);
  console.log(graphHasEdges ? "cycle" : "");
  return graphHasEdges ? [] : ordered;
}
function removeDeps(node: ItemNode, nodesWithNoPrereq: Array<ItemNode>) {
  while (node.deps.length) {
    let dep = node.deps.pop() as ItemNode;
    dep.numOfWins--;
    if (!dep.numOfWins) {
      nodesWithNoPrereq.push(dep);
    }
  }
}
function createRankGraph(items: Array<number>, deps: number[][]) {
  let graph = new RankGraph(items);
  for (let __ of deps) {
    // 		add edges
    const [item, dep] = __;
    graph.addDeps(item, dep);
  }
  return graph;
}

class RankGraph {
  nodes: ItemNode[];
  graph: {
    [key: string]: ItemNode;
  };
  constructor(items: Array<number>) {
    this.nodes = [];
    this.graph = {};
    for (let item of items) {
      this.addNode(item);
    }
  }
  addDeps(item: number, dep: number) {
    const itemNode = this.getNode(item);
    const depNode = this.getNode(dep);
    itemNode.deps.push(depNode);
    depNode.numOfWins++;
  }
  addNode(title: number) {
    this.graph[title] = new ItemNode(title);
    this.nodes.push(this.graph[title]);
  }

  getNode(id: number) {
    if (!(id in this.graph)) {
      this.addNode(id);
    }
    return this.graph[id];
  }
}

class ItemNode {
  id: number;
  deps: ItemNode[];
  numOfWins: number;
  constructor(title: number) {
    this.id = title;
    this.deps = [];
    this.numOfWins = 0;
  }
}
