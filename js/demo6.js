(function () {
  var width = 300;
  var height = 300;

  var MAX_WIDTH = 300;

  // 現在選択中の要素
  var selected = [];

  var stage = new Konva.Stage({
    container: "container",
    width: width,
    height: height,
  });

  var layer = new Konva.Layer({});
  stage.add(layer);

  var group1 = new Konva.Group();
  layer.add(group1);
  var group2 = new Konva.Group();
  layer.add(group2);
  var group3 = new Konva.Group();
  layer.add(group3);

  // 円形 test
  // var circle = new Konva.Circle({
  //   x: width / 2,
  //   y: height / 2,
  //   radius: Math.min(width, height) / 2,
  //   fill: "#fff",
  // });
  // layer.add(circle);
  // stage.add(layer);
  // 円形 test end

  // text
  document.getElementById("text-up").addEventListener("click", () => {
    var text = document.getElementById("text-input").value;
    drawText(text);
    document.getElementById("text-input").value = "";
  });

  // image
  document.getElementById("img-select").addEventListener("change", (e) => {
    var img = new Image();
    var selectImg = e.target.files[0];

    var urlObj = window.URL || window.webkitURL;
    var url = urlObj.createObjectURL(selectImg);

    img.src = url;

    img.onload = () => {
      drawImage(img);
    };
  });

  // stamp
  document.getElementById("stamp-select").addEventListener("change", (e) => {
    var img = new Image();
    var selectImg = e.target.files[0];

    var urlObj = window.URL || window.webkitURL;
    var url = urlObj.createObjectURL(selectImg);

    img.src = url;

    img.onload = () => {
      drawStamp(img);
    };
  });

  function drawText(textContent) {
    var text = new Konva.Text({
      x: stage.width() / 2,
      y: stage.height() / 2,
      fontSize: 20,
      text: textContent,
      draggable: true,
      fill: "#000000",
      // fontFamily: "serif", // todo
    });
    text.offsetX(text.width() / 2);
    text.offsetY(text.height() / 2);

    group3.add(text);

    var tr = setTransformer(text);

    group3.add(tr);

    // mouse cursor
    text.on("mouseover", () => {
      document.body.style.cursor = "pointer";
    });
    text.on("mouseout", () => {
      document.body.style.cursor = "default";
    });
  }

  function drawImage(imageObj) {
    var myImg = new Konva.Image({
      image: imageObj,
      // width: imageObj.width,
      // height: imageObj.height,
      x: stage.width() / 2,
      y: stage.height() / 2,
      // offsetX: imageObj.width / 2,
      // offsetY: imageObj.height / 2,
      width: 300,
      height: 300,
      offsetX: 300 / 2,
      offsetY: 300 / 2,
      draggable: true,
      name: "image",
    });
    group1.add(myImg);

    var tr = setTransformer(myImg);

    group1.add(tr);

    // mouse cursor
    myImg.on("mouseover", () => {
      document.body.style.cursor = "pointer";
    });
    myImg.on("mouseout", () => {
      document.body.style.cursor = "default";
    });

    document.getElementById("img-select").disabled = true;
  }

  var myStamp = null;

  function drawStamp(imageObj) {
    if (myStamp) {
      myStamp.remove();
    }
    myStamp = new Konva.Image({
      image: imageObj,
      // width: imageObj.width,
      // height: imageObj.height,
      x: stage.width() / 2,
      y: stage.height() / 2,
      // offsetX: imageObj.width / 2,
      // offsetY: imageObj.height / 2,
      width: 300,
      height: 300,
      offsetX: 300 / 2,
      offsetY: 300 / 2,
      draggable: true,
      name: "stamp",
    });
    // group2.remove();
    group2.add(myStamp);

    var tr = setTransformer(myStamp);

    group2.add(tr);

    // mouse cursor
    myStamp.on("mouseover", () => {
      document.body.style.cursor = "pointer";
    });
    myStamp.on("mouseout", () => {
      document.body.style.cursor = "default";
    });

    // document.getElementById("stamp-select").disabled = true;
  }

  function setTransformer(targetObj) {
    var tr = new Konva.Transformer({
      nodes: [targetObj],
      centeredScaling: true,
      enabledAnchors: ["top-right", "bottom-right", "bottom-left", "top-left"],
      rotationSnaps: [0, 90, 180, 270],
      resizeEnabled: false,
      rotateEnabled: false,
      borderEnabled: false,
      boundBoxFunc: (oldBoundBox, newBoundBox) => {
        if (Math.abs(newBoundBox.width) > MAX_WIDTH) {
          return oldBoundBox;
        }
        return newBoundBox;
      },
    });

    // resize/rotate is on/off
    targetObj.on("click touchstart", () => {
      // off
      if (selected.length > 0) {
        // selected[0].resizeEnabled(false); // todo
        // selected[0].rotateEnabled(false); // todo
        selected[0].borderEnabled(false);
        selected = [];
      }
      selected.push(tr);
      // on
      // tr.resizeEnabled(true); // todo
      // tr.rotateEnabled(true); // todo
      tr.borderEnabled(true);
      tr.borderStrokeWidth(3);

      if (!tr.nodes()[0].getAttr("image")) {
        var color = tr.nodes()[0].fill();
        document.getElementById("text-color").value = color;
      }
    });

    stage.on("click touchstart", (e) => {
      if (e.target === stage && selected.length > 0) {
        // off
        // selected[0].resizeEnabled(false); // todo
        // selected[0].rotateEnabled(false); // todo
        selected[0].borderEnabled(false);
        selected = [];
      }
    });
    // resize/rotate end

    return tr;
  }

  // カラー
  document.getElementById("text-color").addEventListener("change", (e) => {
    if (selected.length > 0) {
      selected[0].nodes()[0].fill(e.target.value);
    }
  });

  // 左回転
  document.getElementById("left-rotate").addEventListener("click", () => {
    if (selected.length > 0) {
      selected[0].nodes()[0].rotate(-15);
    }
  });

  // 右回転
  document.getElementById("right-rotate").addEventListener("click", () => {
    if (selected.length > 0) {
      selected[0].nodes()[0].rotate(15);
    }
  });

  // 拡大
  document.getElementById("large").addEventListener("click", () => {
    if (selected.length > 0) {
      if (!!selected[0].nodes()[0].getAttr("image")) {
        var newWidth = selected[0].nodes()[0].width() * 1.05;
        var newHeight = selected[0].nodes()[0].height() * 1.05;

        selected[0].nodes()[0].width(newWidth);
        selected[0].nodes()[0].height(newHeight);
      } else {
        var fontSize = selected[0].nodes()[0].fontSize();
        selected[0].nodes()[0].fontSize(fontSize + 4);

        var newWidth = selected[0].nodes()[0].width();
        var newHeight = selected[0].nodes()[0].height();
      }
      selected[0].nodes()[0].offsetX(newWidth / 2);
      selected[0].nodes()[0].offsetY(newHeight / 2);
    }
  });

  // 縮小
  document.getElementById("small").addEventListener("click", () => {
    if (selected.length > 0) {
      if (!!selected[0].nodes()[0].getAttr("image")) {
        var newWidth = selected[0].nodes()[0].width() * 0.95;
        var newHeight = selected[0].nodes()[0].height() * 0.95;

        selected[0].nodes()[0].width(newWidth);
        selected[0].nodes()[0].height(newHeight);
      } else {
        var fontSize = selected[0].nodes()[0].fontSize();
        if (fontSize - 4 < 10) {
          selected[0].nodes()[0].fontSize(10);
        } else {
          selected[0].nodes()[0].fontSize(fontSize - 4);
        }

        var newWidth = selected[0].nodes()[0].width();
        var newHeight = selected[0].nodes()[0].height();
      }
      selected[0].nodes()[0].offsetX(newWidth / 2);
      selected[0].nodes()[0].offsetY(newHeight / 2);
    }
  });

  // 削除
  document.getElementById("destroy").addEventListener("click", () => {
    if (selected.length > 0) {
      if (selected[0].nodes()[0].name() === "image") {
        document.getElementById("img-select").value = "";
        document.getElementById("img-select").disabled = false;
      } else {
        document.getElementById("stamp-select").value = "";
        document.getElementById("stamp-select").disabled = false;
      }
      selected[0].resizeEnabled(false);
      selected[0].rotateEnabled(false);
      selected[0].borderEnabled(false);
      selected[0].nodes()[0].remove();
      selected = [];
    }
  });

  // 保存
  document.getElementById("save").addEventListener(
    "click",
    () => {
      if (selected.length > 0) {
        selected[0].resizeEnabled(false);
        selected[0].rotateEnabled(false);
        selected[0].borderEnabled(false);
        selected = [];
      }

      var dataURL = stage.toDataURL({
        // pixelRatio: 300 / 72,
        pixelRatio: 550 / 300,
      });
      downloadURI(dataURL, "canvas-download.png");
    },
    false
  );

  var downloadURI = (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  };
})();
