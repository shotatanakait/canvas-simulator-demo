var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var objX, objY;
var objWidth, objHeight;

// 修正1
window.onload = () => {
  init();
};

function init() {
  // オブジェクトの大きさを定義
  objWidth = 50;
  objHeight = 50;

  // オブジェクトの座標を定義(キャンバスの中央に表示)
  objX = canvas.width / 2 - objWidth / 2;
  objY = canvas.height / 2 - objHeight / 2;

  // 修正2
  context.fillStyle = "blue";

  // オブジェクトを描画
  drawRect();
}

var x, y, relX, relY;
var dragging = false;

function onDown(e) {
  // キャンバスの左上端の座標を取得
  var offsetX = canvas.getBoundingClientRect().left;
  var offsetY = canvas.getBoundingClientRect().top;

  // マウスが押された座標を取得
  x = e.clientX - offsetX;
  y = e.clientY - offsetY;

  // オブジェクト上の座標かどうかを判定
  if (objX < x && objX + objWidth > x && objY < y && objY + objHeight > y) {
    dragging = true; // ドラッグ開始
    relX = objX - x;
    relY = objY - y;
  }
}

function onMove(e) {
  // キャンバスの左上端の座標を取得
  var offsetX = canvas.getBoundingClientRect().left;
  var offsetY = canvas.getBoundingClientRect().top;

  // マウスが移動した先の座標を取得
  x = e.clientX - offsetX;
  y = e.clientY - offsetY;

  // ドラッグが開始されていればオブジェクトの座標を更新して再描画
  if (dragging) {
    objX = x + relX;
    objY = y + relY;
    drawRect();
  }
}

function onUp(e) {
  dragging = false; // ドラッグ終了
}

function drawRect() {
  context.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
  context.fillRect(objX, objY, objWidth, objHeight);
}

canvas.addEventListener("mousemove", onMove, false);
canvas.addEventListener("mouseup", onUp, false);
canvas.addEventListener("mousedown", onDown, false);
