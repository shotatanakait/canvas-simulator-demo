var canvas = document.getElementById("canvas");
var canvasContext = canvas.getContext("2d"); // 2Dグラフィック

var textObj1 = document.getElementById("text1");
var textContext1 = textObj1.getContext("2d");

function init() {
  // オブジェクトを描画
  drawText();
}

window.onload = () => {
  init();
};

var textObjWidth1, textObjHeight1;

function drawText() {
  textObjWidth1 = textObj1.clientWidth;
  textObjHeight1 = textObj1.clientHeight;

  var text1 = "hello world";
  textContext1.font = "42px sans-serif";
  textContext1.textAlign = "center";
  textContext1.textBaseline = "middle";

  textContext1.fillText(text1, textObj1.width / 2, 70);
}

// ----------

var x;
var y;
var relX;
var relY;
var textObjOffsetX;
var textObjOffsetY;

var dragging = false;

// キャンバスの左上端の座標を取得
var canvasOffsetX = canvas.getBoundingClientRect().left;
var canvasOffsetY = canvas.getBoundingClientRect().top;

function onDown(e) {
  // text1の左上端の座標を取得
  textObjOffsetX = textObj1.getBoundingClientRect().left;
  textObjOffsetY = textObj1.getBoundingClientRect().top;

  console.log({ canvasOffsetX, canvasOffsetY, textObjOffsetX, textObjOffsetY });

  // マウスが押された座標を取得(キャンバス内の座標x, y)
  x = e.clientX - canvasOffsetX;
  y = e.clientY - canvasOffsetY;
  // オブジェクト上の座標かどうかを判定
  // if (
  //   textObjOffsetX - canvasOffsetX < x && // X軸について
  //   textObjOffsetX - canvasOffsetX + objWidth > x &&
  //   textObjOffsetY - canvasOffsetY < y && // Y軸について
  //   textObjOffsetY - canvasOffsetY + objHeight > y
  // ) {
  //   dragging = true; // ドラッグ開始
  //   relX = textObjOffsetX - canvasOffsetX - x;
  //   relY = textObjOffsetY - canvasOffsetY - y;
  //   console.log({ x, y, relX, relY });
  // }
  dragging = true;
  relX = textObjOffsetX - x;
  relY = textObjOffsetY - y;

  textObj1.style.left = x;
  textObj1.style.top = y;

  console.log({ left: textObj1.style.left, top: textObj1.style.top });
}

text1.addEventListener("mousedown", onDown);

// ----------

function onMove(e) {
  // マウスが移動した先の座標を取得(キャンバス内の座標x, y)
  x = e.clientX - canvasOffsetX;
  y = e.clientY - canvasOffsetY;
  // // ドラッグが開始されていればオブジェクトの座標を更新して再描画
  if (dragging) {
    textObjOffsetX = x + relX;
    textObjOffsetY = y + relY;
    drawText();
  }
}

function onUp(e) {
  dragging = false; // ドラッグ終了
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mouseup", onUp);

// -------------------------------------------------------
var design = document.querySelector("#design-area");

// document.querySelector("#apply").addEventListener("click", () => {
//   var newCanvas = document.createElement("canvas");
//   var newContext = newCanvas.getContext("2d");

//   newCanvas.style.border = "1px solid #222";
//   // newCanvas.style.width = "100px";
//   // newCanvas.style.height = "40px";
//   // newCanvas.style.position = "absolute";

//   let inputText = document.getElementById("input-text").value;

//   newContext.font = "40px sans-serif";
//   newContext.textBaseline = "middle";
//   let measure = newContext.measureText(inputText);

//   objX = newCanvas.width / 2 - measure.width / 2;
//   objY =
//     newCanvas.height / 2 -
//     (measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent) / 2;

//   newCanvas.style.left = measure.width / 2;
//   console.log({ objX, objY });

//   newContext.fillText(inputText, 0, 0);

//   design.appendChild(newCanvas);
// });
