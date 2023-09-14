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

  file.addEventListener(
    "change",
    (e) => {
      // img = new Image();
      var selectImg = e.target.files[0];

      var urlObj = window.URL || window.webkitURL;
      var url = urlObj.createObjectURL(selectImg);

      img.src = url;

      // var wrapper = document.getElementById("canvas-image-wrapper");
      // var newImgElement = document.createElement("img");
      // newImgElement.src = url;
      // wrapper.appendChild(newImgElement);

      img.onload = () => {
        /* draw image */
        position.x = imageCanvas.width / 2 - img.width / 2;
        position.y = imageCanvas.height / 2 - img.height / 2;

        imgWidth = img.width;
        imgHeight = img.height;

        imageCanvasContext.clearRect(
          0,
          0,
          imageCanvas.width,
          imageCanvas.height
        );
        imageCanvasContext.drawImage(
          img,
          position.x,
          position.y,
          imgWidth,
          imgHeight
        );

        /* apply interact js */
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
                e.clientX - offsetX <= position.x + imgWidth &&
                e.clientY - offsetY >= position.y &&
                e.clientY - offsetY <= position.y + imgHeight
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

              imageCanvasContext.drawImage(
                img,
                position.x,
                position.y,
                imgWidth,
                imgHeight
              );
            },
            end() {
              if (htmlObj.classList.contains("is-dragging")) {
                htmlObj.classList.remove("is-dragging");
              }
            },
          },
        });
      };
    },
    false
  );

  var button = document.getElementById("rotate");
  button.addEventListener("click", () => {
    console.log("clicked");
    imageCanvasContext.rotate((30 * Math.PI) / 180);
    imageCanvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    imageCanvasContext.drawImage(
      img,
      position.x,
      position.y,
      imgWidth,
      imgHeight
    );
  });
})();
