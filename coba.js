class GraphMatrix {
    constructor(directed = false) {
        this.count = 0;
        this.matrix = [];
        this.type = directed;
    }

    add_vertex() {
        for (var row, _pj_c = 0, _pj_a = this.matrix, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
            row = _pj_a[_pj_c];
            row.append(0);
        }

        this.matrix.append(function () {
            var _pj_a = [],
                _pj_b = range(this.count + 1);

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
                console.log(edge);
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
        distance = [sys.maxsize] * this.count;
        distance[this.vertices[src]] = 0;
        path = [null] * this.count;
        explore = [false] * this.count;
        path[this.vertices[src]] = -1;

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



let graph = GraphMatrix();
