
objects = [];
detectou = "";
objetosDetectados = new Set();
//um conjunto Set() armazena valores e não permite elementos duplicados

function preload() {
  video = createVideo('videoObjetos2.mp4');
}


function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video.hide();
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}

function modelLoaded() {
  console.log("Modelo Carregado!")
  detectou = true;
  video.loop();
  video.speed(1);
  video.volume(0);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);

  // Percorra os resultados e adicione os nomes dos objetos ao conjunto
  for (let i = 0; i < results.length; i++) {
    objetosDetectados.add(results[i].label);
  }

  // Atualize a lista de objetos na interface
  atualizarListaObjetos();
  objects = results;
}

function atualizarListaObjetos() {
  // Converta o conjunto em um array para exibição
  let listaObjetos = Array.from(objetosDetectados);

  // Exiba a lista na interface (por exemplo, em um elemento HTML)
  let listaHTML = listaObjetos.join(", ");
  document.getElementById("listaObjetos").innerHTML = "Objetos Detectados: " + listaHTML;
}


function draw() {
  image(video, 0, 0, 480, 380);
  if (detectou != "") {
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status: Objetos Detectados";
      document.getElementById("numberOfObjects").innerHTML = "Quantidade de Objetos Detectados: " + objects.length;

      fill("#FF0000");
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }

    // Atualize a lista de objetos após cada detecção
    atualizarListaObjetos();
  }
}
