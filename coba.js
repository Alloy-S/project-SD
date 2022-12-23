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

}



let graph = GraphMatrix();
