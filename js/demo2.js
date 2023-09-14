(function () {
  var file = document.getElementById("file");
  var imageCanvas = document.getElementById("image-canvas");
  var imageCanvasContext = imageCanvas.getContext("2d");

  var offsetX = imageCanvas.getBoundingClientRect().left;
  var offsetY = imageCanvas.getBoundingClientRect().top;

  var isDrag = false;

  var position = {
    x: 0,
    y: 0,
  };

  var imgWidth = 0;
  var imgHeight = 0;

  var htmlObj = null;
  var interactObj = null;
  var img = new Image();

  // global
  var otherCanvas = document.createElement("canvas");
  var otherCanvasContext = otherCanvas.getContext("2d");
  var otherCanvasObj = {
    width: 0,
    height: 0,
  };

  // add attribute
  otherCanvas.setAttribute("id", "other-canvas");
  otherCanvas.setAttribute("class", "other-canvas");

  var otherCanvasPut = document.getElementById("other-canvas-put");
  otherCanvasPut.addEventListener("click", () => {
    // define other canvas object info
    otherCanvasObj.width = 100;
    otherCanvasObj.height = 100;

    otherCanvas.width = otherCanvasObj.width;
    otherCanvas.height = otherCanvasObj.height;

    // create other canvas
    otherCanvasContext.fillStyle = "black"; // おまけ
    otherCanvasContext.fillRect(
      0,
      0,
      otherCanvasObj.width * 1,
      otherCanvasObj.height * 1
    );

    // draw other canvas
    imageCanvasContext.drawImage(otherCanvas, position.x, position.y);

    htmlObj = document.documentElement;
    if (interactObj) {
      interactObj.unset();
      interactObj = null;
    }

    interactObj = interact("#image-canvas");
    interactObj.draggable({
      listeners: {
        start(e) {
          isDrag = false;
          if (
            e.clientX - offsetX >= position.x &&
            e.clientX - offsetX <= position.x + otherCanvasObj.width &&
            e.clientY - offsetY >= position.y &&
            e.clientY - offsetY <= position.y + otherCanvasObj.height
          ) {
            isDrag = true;
          }
        },
        move(e) {
          if (!isDrag) {
            if (htmlObj.classList.contains("is-dragging")) {
              htmlObj.classList.remove("is-dragging");
            }
            return;
          }

          if (!htmlObj.classList.contains("is-dragging")) {
            htmlObj.classList.add("is-dragging");
          }

          position.x = position.x + e.dx;
          position.y = position.y + e.dy;

          imageCanvasContext.clearRect(
            0,
            0,
            imageCanvas.width,
            imageCanvas.height
          );

          imageCanvasContext.drawImage(otherCanvas, position.x, position.y);
        },
        end() {
          if (htmlObj.classList.contains("is-dragging")) {
            htmlObj.classList.remove("is-dragging");
          }
        },
      },
    });
  });

  var great = document.getElementById("great");
  great.addEventListener("click", () => {
    // clear other canvas
    imageCanvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    // modify other canvas object info
    otherCanvasObj.width = Math.round(otherCanvasObj.width * 1.2);
    otherCanvasObj.height = Math.round(otherCanvasObj.height * 1.2);

    otherCanvas.width = otherCanvasObj.width;
    otherCanvas.height = otherCanvasObj.height;

    otherCanvasContext.fillStyle = "blue";
    otherCanvasContext.fillRect(
      0,
      0,
      otherCanvasObj.width,
      otherCanvasObj.height
    );

    // draw other canvas
    imageCanvasContext.drawImage(otherCanvas, position.x, position.y);
  });

  var less = document.getElementById("less");
  less.addEventListener("click", () => {
    // clear other canvas
    imageCanvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    // modify other canvas object info
    otherCanvasObj.width = Math.round(otherCanvasObj.width * 0.8);
    otherCanvasObj.height = Math.round(otherCanvasObj.height * 0.8);

    otherCanvas.width = otherCanvasObj.width;
    otherCanvas.height = otherCanvasObj.height;

    otherCanvasContext.fillStyle = "red";
    otherCanvasContext.fillRect(
      0,
      0,
      otherCanvasObj.width,
      otherCanvasObj.height
    );

    // draw other canvas
    imageCanvasContext.drawImage(otherCanvas, position.x, position.y);
  });

  // file.addEventListener(
  //   "change",
  //   (e) => {
  //     // img = new Image();
  //     var selectImg = e.target.files[0];

  //     var urlObj = window.URL || window.webkitURL;
  //     var url = urlObj.createObjectURL(selectImg);

  //     img.src = url;

  //     img.onload = () => {
  //       /* draw image */
  //       position.x = imageCanvas.width / 2 - img.width / 2;
  //       position.y = imageCanvas.height / 2 - img.height / 2;

  //       imgWidth = img.width;
  //       imgHeight = img.height;

  //       imageCanvasContext.clearRect(
  //         0,
  //         0,
  //         imageCanvas.width,
  //         imageCanvas.height
  //       );
  //       imageCanvasContext.drawImage(
  //         img,
  //         position.x,
  //         position.y,
  //         imgWidth,
  //         imgHeight
  //       );

  //       /* apply interact js */
  //       htmlObj = document.documentElement;

  //       if (interactObj) {
  //         interactObj.unset();
  //         interactObj = null;
  //       }

  //       interactObj = interact("#image-canvas");

  // start draggable
  // interactObj.draggable({
  //   listeners: {
  //     start(e) {
  //       isDrag = false;
  //       if (
  //         e.clientX - offsetX >= position.x &&
  //         e.clientX - offsetX <= position.x + imgWidth &&
  //         e.clientY - offsetY >= position.y &&
  //         e.clientY - offsetY <= position.y + imgHeight
  //       ) {
  //         isDrag = true;
  //       }
  //     },
  //     move(e) {
  //       if (!isDrag) {
  //         if (htmlObj.classList.contains("is-dragging")) {
  //           htmlObj.classList.remove("is-dragging");
  //         }
  //         return;
  //       }

  //       if (!htmlObj.classList.contains("is-dragging")) {
  //         htmlObj.classList.add("is-dragging");
  //       }

  //       position.x = position.x + e.dx;
  //       position.y = position.y + e.dy;

  //       imageCanvasContext.clearRect(
  //         0,
  //         0,
  //         imageCanvas.width,
  //         imageCanvas.height
  //       );

  //       imageCanvasContext.drawImage(
  //         img,
  //         position.x,
  //         position.y,
  //         imgWidth,
  //         imgHeight
  //       );
  //     },
  //     end() {
  //       if (htmlObj.classList.contains("is-dragging")) {
  //         htmlObj.classList.remove("is-dragging");
  //       }
  //     },
  //   },
  // });
  // draggable end
  //     };
  //   },
  //   false
  // );

  // var leftRotate = document.getElementById("left-rotate");
  // var rightRotate = document.getElementById("right-rotate");

  // rightRotate.addEventListener("click", () => {
  //   imageCanvasContext.save();
  //   imageCanvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  //   imageCanvasContext.translate(
  //     position.x + imgWidth / 2,
  //     position.y + imgHeight / 2
  //   );
  //   imageCanvasContext.rotate((15 * Math.PI) / 180);
  //   imageCanvasContext.drawImage(img, -(imgWidth / 2), -(imgHeight / 2));
  //   imageCanvasContext.restore();

  // });

  // leftRotate.addEventListener("click", () => {
  //   imageCanvasContext.save();
  //   imageCanvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  //   imageCanvasContext.translate(
  //     position.x + imgWidth / 2,
  //     position.y + imgHeight / 2
  //   );
  //   imageCanvasContext.rotate((-15 * Math.PI) / 180);
  //   imageCanvasContext.drawImage(img, -(imgWidth / 2), -(imgHeight / 2));
  //   imageCanvasContext.restore();
  // });
})();
