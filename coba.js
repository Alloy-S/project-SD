class GraphMatrix {
    constructor(directed = false) {
        this.count = 0;
        this.matrix = [];
        this.type = directed;
    }

    add_vertex() {
        for (var row, _pj_c = 0, _pj_a = this.matrix, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
            row = _pj_a[_pj_c];
            row.push(0);
        }

        this.matrix.push(function () {
            var _pj_a = [],
                _pj_b = this.count + 1;

            for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
                var _ = _pj_b[_pj_c];

                _pj_a.push(0);
            }

            return _pj_a;
        }.call(this));
        this.count += 1;
    }

    add_edge(v1, v2) {
        this.matrix[v1][v2] = 1;

        if (this.type === false) {
            this.matrix[v2][v1] = 1;
        }
    }

    print_adjacency_matrix() {
        for (var vertex, _pj_c = 0, _pj_a = this.matrix, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
            vertex = _pj_a[_pj_c];

            for (var edge, _pj_f = 0, _pj_d = vertex, _pj_e = _pj_d.length; _pj_f < _pj_e; _pj_f += 1) {
                edge = _pj_d[_pj_f];
                // console.log(edge);
                process.stdout.write(edge);
            }

            console.log();
        }
    }

    printSolution(dist, path, src, end) {
        var des;
        end = this.vertices[end];

        for (var node = 0, _pj_a = this.count; node < _pj_a; node += 1) {
            if (node === end) {
                des = list(this.vertices.keys())[list(this.vertices.values()).index(node)];
                console.log("distance to", des, ":", dist[node]);
                console.log("path :");
                this.printPath(node, path);
                console.log();
            }
        }
    }

    printPath(current, path) {
        var vertex;

        if (current === -1) {
            return;
        }

        this.printPath(path[current], path);
        vertex = list(this.vertices.keys())[list(this.vertices.values()).index(current)];
        console.log(vertex);
    }

    minDistance(dist, explore) {
        var min, min_index;
        min = sys.maxsize;

        for (var u = 0, _pj_a = this.count; u < _pj_a; u += 1) {
            if (dist[u] < min && explore[u] === false) {
                min = dist[u];
                min_index = u;
            }
        }

        return min_index;
    }

    dijkstra(src, end) {
        var distance, explore, path, x;
        distance = [Number.MAX_VALUE] * this.count;
        distance[src] = 0;
        path = [null] * this.count;
        explore = [false] * this.count;
        path[src] = -1;

        for (var cout = 0, _pj_a = this.count; cout < _pj_a; cout += 1) {
            x = this.minDistance(distance, explore);
            explore[x] = true;

            for (var y = 0, _pj_b = this.count; y < _pj_b; y += 1) {
                if (this.matrix[x][y] > 0 && explore[y] === false && distance[y] > distance[x] + this.matrix[x][y]) {
                    path[y] = x;
                    distance[y] = distance[x] + this.matrix[x][y];
                }
            }
        }

        this.printSolution(distance, path, src, end);
    }


}
let V = 4;
function minDistance(dist, sptSet) {

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
function printSolution(dist, path, src, dest) {
    // document.write("Vertex \t\t Distance from Source<br>");
    // for (let i = 0; i < V; i++) {
    //     document.write(i + " \t\t " +
    //         dist[i] + "<br>");
    // }

    for (let i = 0; i < V; i++) {
        if (i == dest) {
            document.write(
                "distance to" + dest + ":" + dist[i] + "<br>"
            );
            document.write(
                "path :"
            );

            printPath(i, path);
        }
    }
}

function printPath(current, path) {
    if (current == -1) {
        return;
    }
    document.write(
        current + "-->"
    );

    printPath(path[current], path);

}

// Function that implements Dijkstra's
// single source shortest path algorithm
// for a graph represented using adjacency
// matrix representation
function dijkstra(graph, src) {
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

    path[src] = -1

    
    // Distance of source vertex
    // from itself is always 0
    dist[src] = 0;

    // Find shortest path for all vertices
    for (let count = 0; count < V - 1; count++) {

        // Pick the minimum distance vertex
        // from the set of vertices not yet
        // processed. u is always equal to
        // src in first iteration.
        let u = minDistance(dist, sptSet);

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
            if (!sptSet[v] && graph[u][v] != 0 &&
                dist[u] != Number.MAX_VALUE &&
                dist[u] + graph[u][v] < dist[v]) {
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
        if (dist[i] < min && end.includes(i)) {

            min = dist[i];
            index = i;
        }
        // const element = hasil[i];
    }

    // Print the constructed distance array
    printSolution(dist, path, src, index);

    return index;
}



let graph = new GraphMatrix();
let end = [2]
graph.matrix = [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 0, 0]
]

let hasil = dijkstra(graph.matrix, 0);

console.log(hasil);
