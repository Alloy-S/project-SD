var graphMatrix, position, wall;
var win = false;
let end = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 17, 26, 35, 44, 53, 62, 71, 80, 79, 78, 77, 76, 75,
  74, 73, 73, 72, 63, 54, 45, 36, 27, 18, 9,
];


// untuk mendekteksi tiles di click
$(".green").click(function () {
  let btn = $(this);
  if (btn.attr("id") != position) {
    btn.css("background", "#748404");
    btn.prop("disabled", true);
    delEdge(graphMatrix, btn.attr("id"));
    movePlayer();
  }
});

function minDistance(dist, explore, V) {
  let min = Number.MAX_VALUE;
  let min_index = -1;

  for (let v = 0; v < V; v++) {
    if (explore[v] == false && dist[v] <= min) {
      min = dist[v];
      min_index = v;
    }
  }
  return min_index;
}

function getSolution(dist, path, dest, V) {
  // $("tbody").html("");
  var count = 0;
  for (let i = 0; i < V; i++) {
    if (end.includes(i)) {
      // jika semua isi dari array distance berisi max value berarti tidak ada shortest path menuju keluar
      if (dist[i] == Number.MAX_VALUE) {
        count = count + 1;
      }
      // $("tbody").append("<tr><td>" + i + "</td><td>" + dist[i] + "</td></tr>");
    }
  }
  
  // pengecekan untuk menang
  if (count == end.length-1) {
      setTimeout(function () {
        // setTimeout(function () {
          // $("#win").css("display", "block");
          
        // }, 500);
        newGame(9, wall);
        $("#win").css("display", "block");
        setTimeout(function () {
          $("#win").css("display", "none");
        }, 1000);
      }, 500);

      return 0;
  }

  let finalPath = [];

  for (let i = 0; i < V; i++) {
    if (i == dest) {
      getPath(i, path, finalPath);
    }
  }
  return finalPath;
}

function delEdge(adj, vertex) {
  for (let i = 0; i < adj.length; i++) {
    adj[i][vertex] = 0;
    adj[vertex][i] = 0;
  }
}

function getPath(current, path, finalPath) {
  if (current == -1) {
    return;
  }
  getPath(path[current], path, finalPath);
  finalPath.push(current);
  // document.write(current + "-->");
}

function dijkstra(graph, src) {
  // console.log(graph.length);
  let V = graph.length;
  let dist = new Array(V);
  let explore = new Array(V);
  let path = new Array(V);

  for (let i = 0; i < V; i++) {
    dist[i] = Number.MAX_VALUE;
    explore[i] = false;
    path[i] = null;
  }

  path[src] = -1;
  dist[src] = 0;


  for (let count = 0; count < V - 1; count++) {
    let u = minDistance(dist, explore, V);
    explore[u] = true;

    for (let v = 0; v < V; v++) {
      if (!explore[v] && graph[u][v] != 0 && dist[u] != Number.MAX_VALUE && dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v];
        path[v] = u;
      }
    }
  }

  // console.log(path);
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

  return getSolution(dist, path, index, V);
}

function newGame(max, setWall) {
  wall = setWall;
  $(".green").css("background", "#ccff00");
  $("#40").css("background", "red");
  document.getElementById('40').style.backgroundImage = "url('assets/idle.png')";
  document.getElementById('40').style.backgroundSize = "58px 62px";
  document.getElementById('40').style.backgroundPosition = "center";
  document.getElementById('40').style.backgroundRepeat = "no-repeat";

  $(".green").prop("disabled", false);
  let vertex = Math.pow(max, 2);
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
      if (i + 1 < vertex) {
        matrix[i][i + 1] = 1;
        matrix[i + 1][i] = 1;
      }
    }

    if (i + max < vertex) {
      matrix[i][i + max] = 1;
      matrix[i + max][i] = 1;
    }

    count++;
    if (count >= max) {
      level += max;
      count = 0;
    }
  }

  // untuk mengatur jumlah wall
  for (let i = 0; i < wall; i++) {
    var id_random = Math.floor(Math.random() * 81);
    if (id_random != 40) {
      delEdge(matrix, id_random);
      document.getElementById(id_random).style.background = "#748404";
      document.getElementById(id_random).setAttribute("disabled", "");
    } else {
      i--;
    }
  }

  // set posisi mula-mula dan set graphnya
  position = 40;
  graphMatrix = matrix;
  // return matrix;
}

function movePlayer() {
  // menjalan kan algoritma djikstra dan mereturn path paling pendek
  let hasil = dijkstra(graphMatrix, position);
  console.log(hasil);
  if (hasil != 0) {
  // var str;
  // for (let i = 0; i < hasil.length; i++) {
  //   str += hasil[i] + "->";
  // }

  let id = "#" + position;
  let from = position;
  $(id).css("background", "#ccff00");
  // $(".path").html(str);
  $(".position").html(position);
  position = hasil[1];
  let next = hasil[1];
  id = "#" + position;
  $(id).css("background", "red");

  $(".character").css("position", "absolute");
  if (from - next == 1) {
    document.getElementById(position).style.backgroundImage = "url('assets/char_kiri_fix.png')";
  } else if (from - next == -1) {
    document.getElementById(position).style.backgroundImage = "url('assets/char_kanan_fix.png')";
  } else if (from - next == 9) {
    document.getElementById(position).style.backgroundImage = "url('assets/char_mundur_fix.png')";
  } else if (from - next == -9) {
    document.getElementById(position).style.backgroundImage = "url('assets/char_maju_fix.png')";
  }

  document.getElementById(position).style.backgroundSize = "58px 62px";
  document.getElementById(position).style.backgroundPosition = "center";
  document.getElementById(position).style.backgroundRepeat = "no-repeat";

  //mengecek apakah thief berada di pinggir map
  if (end.includes(position)) {
    setTimeout(function () {
      // setTimeout(function () {
        // $("#lose").css("display", "block");
      // }, 500);
      newGame(9, wall);
      $("#lose").css("display", "block");
      setTimeout(function () {
        $("#lose").css("display", "none");
      }, 1000);
    }, 500);
  }
}
};

// inisialisasi awal
newGame(9, 5);
console.log(graphMatrix);
