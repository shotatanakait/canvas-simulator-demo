(function () {
  var canvasA = document.getElementById("canvasA");
  var ctxA = canvasA.getContext("2d");

  var offsetX = canvasA.getBoundingClientRect().left;
  var offsetY = canvasA.getBoundingClientRect().top;

  var interactObj = interact("#canvasA");
  var htmlObj = null;

  class DrawCanvas {
    constructor(canvasElement, width, height, font, textBaseline, fillStyle) {
      this.width = width;
      this.height = height;
      this.isDrag = false;
      this.positionX = 0;
      this.positionY = 0;
      // this.interactObj = null;
      this.canvasElement = canvasElement;
      this.ctx = canvasElement.getContext("2d");
      this.ctxFont = font;
      this.ctxTextBaseline = textBaseline;
      this.ctxFillStyle = fillStyle;
    }
    setContext(font, textBaseline, fillStyle) {
      this.ctx.font = font;
      this.ctx.textBaseline = textBaseline;
      this.ctx.fillStyle = fillStyle;
    }
  }

  // global
  var drawCanvasList = [];

  document.getElementById("text-up-button").addEventListener("click", (e) => {
    // init
    var drawcanvas = new DrawCanvas(document.createElement("canvas"), 100, 20);
    drawcanvas.setContext("bold 24px serif", "middle", "green");

    // draw text
    drawcanvas.ctx.fillText(document.getElementById("text-up").value, 0, 12);
    ctxA.drawImage(
      drawcanvas.canvasElement,
      drawcanvas.positionX,
      drawcanvas.positionY
    );

    drawcanvas.ctx.draggable({ scroll: false });

    // drawCanvasList.push(drawcanvas);

    // same as demo2.js
    htmlObj = document.documentElement;
    // if (interactObj) {
    //   interactObj.unset();
    //   interactObj = null;
    // }

    // interactObj = interact("#canvasA");
    // interactObj.draggable({
    //   listeners: {
    //     start(e) {
    //       drawcanvas.isDrag = false;
    //       if (
    //         e.clientX - offsetX >= drawcanvas.positionX &&
    //         e.clientX - offsetX <= drawcanvas.positionX + drawcanvas.width &&
    //         e.clientY - offsetY >= drawcanvas.positionY &&
    //         e.clientY - offsetY <= drawcanvas.positionY + drawcanvas.height
    //       ) {
    //         drawcanvas.isDrag = true;
    //       }
    //     },
    //     move(e) {
    //       if (!drawcanvas.isDrag) {
    //         if (htmlObj.classList.contains("is-dragging")) {
    //           htmlObj.classList.remove("is-dragging");
    //         }
    //         return;
    //       }

    //       if (!htmlObj.classList.contains("is-dragging")) {
    //         htmlObj.classList.add("is-dragging");
    //       }

    //       drawcanvas.positionX = drawcanvas.positionX + e.dx;
    //       drawcanvas.positionY = drawcanvas.positionY + e.dy;

    //       ctxA.save();
    //       ctxA.clearRect(0, 0, canvasA.width, canvasA.height);

    //       ctxA.drawImage(
    //         drawcanvas.canvasElement,
    //         drawcanvas.positionX,
    //         drawcanvas.positionY
    //       );
    //       ctxA.restore();
    //     },
    //     end() {
    //       if (htmlObj.classList.contains("is-dragging")) {
    //         htmlObj.classList.remove("is-dragging");
    //       }
    //     },
    //   },
    // });
  });
})();
