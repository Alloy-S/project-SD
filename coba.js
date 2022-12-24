

function minDistance(dist, sptSet, V) {
  // Initialize min value
  let min = Number.MAX_VALUE;
  let min_index = -1;

  for (let v = 0; v < V; v++) {
    if (sptSet[v] == false && dist[v] <= min) {
      min = dist[v];
      min_index = v;
    }
  }
  return min_index;
}

// A utility function to print
// the constructed distance array
function printSolution(dist, path, src, dest, V) {
  document.write("Vertex \t\t Distance from Source<br>");
  for (let i = 0; i < V; i++) {
    document.write(i + " \t\t " + dist[i] + "<br>");
  }

  for (let i = 0; i < V; i++) {
    // if (i == dest) {
    document.write("distance to " + i + ":" + dist[i] + "<br>");
    document.write("path: ");

    printPath(i, path);

    document.write("<br>");
    // }
  }
}

function delEdge(adj, u, v) {
  adj[u][v] = 0;
  adj[v][u] = 0;
}

function printPath(current, path) {
  if (current == -1) {
    return;
  }

  printPath(path[current], path);
  document.write(current + "-->");
}

// Function that implements Dijkstra's
// single source shortest path algorithm
// for a graph represented using adjacency
// matrix representation
function dijkstra(graph, src) {
  console.log(graph.length);
  let V = graph.length;
  let dist = new Array(V);
  let sptSet = new Array(V);
  let path = new Array(V);
  // Initialize all distances as
  // INFINITE and stpSet[] as false
  for (let i = 0; i < V; i++) {
    dist[i] = Number.MAX_VALUE;
    sptSet[i] = false;
    path[i] = null;
  }

  path[src] = -1;

  // Distance of source vertex
  // from itself is always 0
  dist[src] = 0;

  // Find shortest path for all vertices
  for (let count = 0; count < V - 1; count++) {
    // Pick the minimum distance vertex
    // from the set of vertices not yet
    // processed. u is always equal to
    // src in first iteration.
    let u = minDistance(dist, sptSet, V);

    // Mark the picked vertex as processed
    sptSet[u] = true;

    // Update dist value of the adjacent
    // vertices of the picked vertex.
    for (let v = 0; v < V; v++) {
      // Update dist[v] only if is not in
      // sptSet, there is an edge from u
      // to v, and total weight of path
      // from src to v through u is smaller
      // than current value of dist[v]
      if (
        !sptSet[v] &&
        graph[u][v] != 0 &&
        dist[u] != Number.MAX_VALUE &&
        dist[u] + graph[u][v] < dist[v]
      ) {
        dist[v] = dist[u] + graph[u][v];
        path[v] = u;
      }
    }
  }

  console.log(path);
  let index = 0;
  var min = Number.MAX_VALUE;

  for (let i = 0; i < dist.length; i++) {
    // console.log(i, end.includes(i));
    if (i != src) {
      if (dist[i] < min && end.includes(i)) {
        min = dist[i];
        index = i;
      }
    }
  }

  // Print the constructed distance array
  printSolution(dist, path, src, index, V);

  return index;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let end = [1, 2, 3, 4, 5, 6, 7];
let V = 8;

let vertex = 16;
let max = 4;
let matrix = new Array(vertex);

for (let i = 0; i < vertex; i++) {
  let row = new Array(vertex);
  for (let j = 0; j < vertex; j++) {
    row[j] = 0;
  }
  matrix[i] = row;
}

let level = 0;

// make edge
let count = 0;
for (let i = 0; i < vertex; i++) {
  if (i + 1 < level + max) {
    console.log(i, level);
    if (i + 1 < vertex) {
      matrix[i][i + 1] = 1;
      matrix[i + 1][i] = 1;
    }
  }

  if (i + 4 < vertex) {
    matrix[i + 4][i] = 1;
    matrix[i][i + 4] = 1;
  }

  count++;
  if (count >= max) {
    level += max;
    count = 0;
  }
}
// while (level > 0) {
//     let row = getRandomInt(vertex);
//     let col = getRandomInt(vertex);

//     if (matrix[row][col] != 0) {
//         matrix[row][col] = 0
//         level--;
//     }
// }

console.log("sebelum delete");
console.log(matrix);

delEdge(matrix, 6,7);
let hasil = dijkstra(matrix, 5);

// console.log(hasil);

console.log("setelah delete");
console.log(matrix);
