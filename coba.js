var graphMatrix, position;
var win = false;
let end = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 17, 26, 35, 44, 53, 62, 71, 80, 79, 78, 77, 76, 75,
  74, 73, 73, 72, 63, 54, 45, 36, 27, 18, 9,
];
let V = 8;

$(".green").click(function () {
  let btn = $(this);
  if (btn.attr("id") != position) {
    btn.css("background", "#748404");
    btn.prop("disabled", true);
    delEdge(graphMatrix, btn.attr("id"));
    movePlayer();
  }
});

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

function printSolution(dist, path, src, dest, V) {
  // document.write("Vertex \t\t Distance from Source<br>");
  $("tbody").html("");
  var check = true;
  var count = 0;
  for (let i = 0; i < V; i++) {
    if (end.includes(i)) {
      if (dist[i] == Number.MAX_VALUE) {
        check = false;
        count = count + 1;
      }
      $("tbody").append("<tr><td>" + i + "</td><td>" + dist[i] + "</td></tr>");
    }
  }
  
  if (check == false && count == end.length-1) {
      var delayInMilliseconds = 500; //0.5 second
        setTimeout(function () {
          newGame(9, 5);
        }, delayInMilliseconds);
      return;
  }

  let finalPath = [];

  for (let i = 0; i < V; i++) {
    if (i == dest) {
      // document.write("distance to " + i + ":" + dist[i] + "<br>");
      // document.write("path: ");
    
      printPath(i, path, finalPath);

      // document.write("<br>");
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

function printPath(current, path, finalPath) {
  if (current == -1) {
    return;
  }
  // console.log(finalPath);
  printPath(path[current], path, finalPath);
  finalPath.push(current);
  // document.write(current + "-->");
}

function dijkstra(graph, src) {
  console.log(graph.length);
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
      if (
        !explore[v] &&
        graph[u][v] != 0 &&
        dist[u] != Number.MAX_VALUE &&
        dist[u] + graph[u][v] < dist[v]
      ) {
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

  return printSolution(dist, path, src, index, V);
}

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }

function newGame(max, wall) {
  $(".green").css("background", "#ccff00");
  $("#40").css("background", "red");
  document.getElementById('40').style.backgroundImage="url('idle.png')";
  document.getElementById('40').style.backgroundSize="58px 62px";
  document.getElementById('40').style.backgroundPosition="center";
  document.getElementById('40').style.backgroundRepeat= "no-repeat";
  $(".green").prop("disabled", false);
  let vertex = Math.pow(max, 2);
  //   let max = 4;
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
        console.log("edge + 1", i);
        matrix[i][i + 1] = 1;
        matrix[i + 1][i] = 1;
      }
    }

    if (i + max < vertex) {
      console.log("edge + 9", i);
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
  // wall = 5;
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
  // for (let i = 0; i < wall; i++) {
  //   let random = getRandomInt(vertex);
  // let col = getRandomInt(vertex);
  //   if (random != 40) {
  // delEdge(matrix, random);
  // if (matrix[row][col] != 0) {
  //   matrix[row][col] = 0
  //   level--;
  // }
  // btn.css('background', '#748404');
  // btn.prop("disabled", true);
  //     console.log(random)
  //     id = "#" + random;
  //     $(id).css('background', '#748404');
  //     $(id).prop("disabled", true);
  //   } else {
  //     i--;
  //   }
  // }
  position = 40;
  graphMatrix = matrix;
  // return matrix;
}

function movePlayer() {
  let hasil = dijkstra(graphMatrix, position);

  var str;
  for (let i = 0; i < hasil.length; i++) {
    str += hasil[i] + "->";
  }

  let id = "#" + position;
  let from = position;
  $(id).css("background", "#ccff00");
  $(".path").html(str);
  $(".position").html(position);
  position = hasil[1];
  let next = hasil[1];
  id = "#" + position;
  $(id).css("background", "red");
  
  if(from - next == 1) {
    document.getElementById('character').className = 'robber-left';
  } else if (from - next == -1) {
    document.getElementById('character').className = 'robber-right';
  } else if (from - next == 9) {
    document.getElementById('character').className = 'robber-up';
  } else if (from - next == -9) {
    document.getElementById('character').className = 'robber-down';
  }

  $(".character").css("position", "absolute");
  document.getElementById(position).style.backgroundImage="url('idle.png')";
  document.getElementById(position).style.backgroundSize="58px 62px";
  document.getElementById(position).style.backgroundPosition="center";
  document.getElementById(position).style.backgroundRepeat= "no-repeat";
  // document.getElementById(position).style.textIndent="-999px";
  // document.getElementById(position).style.fontSize="0";
  console.log(graphMatrix);
  var delayInMilliseconds = 500; //0.5 second
  if (end.includes(position)) {
    setTimeout(function () {
      newGame(9, 5);
    }, delayInMilliseconds);
  }
}

//   console.log("sebelum delete");

//   delEdge(matrix, 6,7);

// let matrix = newGame(9)
// let position = 8;
newGame(9, 5);
console.log(graphMatrix);
// let hasil = dijkstra(graphMatrix, position);
// position = hasil[1];
