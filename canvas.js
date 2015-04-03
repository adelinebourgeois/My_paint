/*jslint browser:true, node: true */
/*jslint indent: 2*/
/*jshint strict: true*/
"use strict";

document.addEventListener('DOMContentLoaded', function () {

  var Paint = function (canvas, context) {
    this.canvas = canvas;
    this.context = context;

    this.click = false;
    this.counter = 0;
    this.cursor = [];
    var that = this;
    this.actualTool = "";
    this.curColor = "";
    this.curSize = 1;
    this.curFill = false;
    this.curShadow = false;

    function pixel(x, y) {
      context.fillRect(x, y, that.curSize, that.curSize);
      that.context.fillStyle = that.curColor;
    }
    this.pixelDown = function (e) {
      var x = e.pageX - that.canvas.offsetLeft,
        y = e.pageY - that.canvas.offsetTop;
      that.click = true;
      pixel(x, y);
    };
    this.pixelUp = function () {
      that.click = false;
    };
    this.pixelMove = function (e) {
      if (that.click === true) {
        var x = e.pageX - that.canvas.offsetLeft,
          y = e.pageY - that.canvas.offsetTop;
        pixel(x, y);
      }
    };
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    this.lineDown = function (e) {
      var x = e.pageX - that.canvas.offsetLeft,
        y = e.pageY - that.canvas.offsetTop;
      that.counter += 1;
      that.cursor.push(x);
      that.cursor.push(y);
      if (that.counter === 2) {
        that.context.beginPath();
        that.context.lineWidth = 1;
        that.context.moveTo(that.cursor[0], that.cursor[1]);
        that.context.lineTo(x, y);
        that.context.strokeStyle = that.curColor;
        that.context.lineWidth = that.curSize;
        that.context.stroke();
        that.context.closePath();
        that.counter = 0;
        that.cursor = [];
      }
    };
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    this.rectDown = function (e) {
      var x = e.pageX - that.canvas.offsetLeft,
        y = e.pageY - that.canvas.offsetTop,
        width,
        height;
      that.counter += 1;
      that.cursor.push(x);
      that.cursor.push(y);
      if (that.counter === 2) {
        width   = that.cursor[2] - that.cursor[0];
        height  = that.cursor[3] - that.cursor[1];
        that.context.beginPath();
        that.context.strokeStyle = that.curColor;
        that.context.lineWidth = that.curSize;
        that.context.rect(that.cursor[0], that.cursor[1], width, height);
        that.context.closePath();
        if (that.curFill === true) {
          that.context.fillStyle = that.curColor;
          that.context.fill();
        } else {
          that.context.stroke();
        }
        that.counter = 0;
        that.cursor = [];
      }
    };
    //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
    this.cercleDown = function (e) {
      var x = e.pageX - that.canvas.offsetLeft,
        y = e.pageY - that.canvas.offsetTop,
        rad = "";
      that.counter += 1;
      that.cursor.push(x);
      that.cursor.push(y);
      if (that.counter === 2) {
        that.context.beginPath();
        that.context.strokeStyle = that.curColor;
        that.context.lineWidth = that.curSize;
        rad = Math.sqrt(Math.pow(that.cursor[2] - that.cursor[0], 2) + Math.pow(that.cursor[3] - that.cursor[1], 2));
        that.context.arc(that.cursor[0], that.cursor[1], rad, 0, Math.PI * 2, false);
        that.context.closePath();
        if (that.curFill === true) {
          that.context.fillStyle = that.curColor;
          that.context.fill();
        } else {
          that.context.stroke();
        }
        that.counter = 0;
        that.cursor = [];
      }
    };
    this.changerCouleur = function (couleur) {
      that.curColor = couleur;
    };
    this.changerSize = function (newSize) {
      that.curSize = newSize;
    };
    this.activateFill = function (checkbox) {
      if (checkbox.checked) {
        that.curFill = true;
      } else {
        that.curFill = false;
      }
    };
    this.clean = function () {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };
    this.activateShadow = function (checkbox) {
      if (checkbox.checked) {
        that.curShadow = true;
        that.context.shadowColor = '#000';
        that.context.shadowBlur = 15;
        that.context.shadowOffsetX = that.context.shadowOffsetY = 12;
      } else {
        that.curShadow = false;
        that.context.shadowColor = '#000';
        that.context.shadowBlur = 0;
        that.context.shadowOffsetX = that.context.shadowOffsetY = 0;
      }
    };
    this.uploadImg  = function () {
      var image = new Image();
      image.src = document.getElementById('file').value;
      image.onload = function () {
        context.drawImage(image, 10, 10, 500, 500);
      };
    };
  },
    paint = new Paint(document.getElementById('canvas'), document.getElementById('canvas').getContext('2d'));

  document.getElementById('crayon').addEventListener('click', function () {
    if (paint.actualTool === "crayon") {
      paint.canvas.removeEventListener('mousedown', paint.pixelDown);
      paint.canvas.removeEventListener('mouseup', paint.pixelUp);
      paint.canvas.removeEventListener('mousemove', paint.pixelMove);
    } else if (paint.actualTool === "ligne") {
      paint.canvas.removeEventListener('mousedown', paint.lineDown);
    } else if (paint.actualTool === "rectangle") {
      paint.canvas.removeEventListener('mousedown', paint.rectDown);
    } else if (paint.actualTool === "cercle") {
      paint.canvas.removeEventListener('mousedown', paint.cercleDown);
    }
    paint.actualTool = "crayon";
    paint.canvas.addEventListener('mousedown', paint.pixelDown);
    paint.canvas.addEventListener('mouseup', paint.pixelUp);
    paint.canvas.addEventListener('mousemove', paint.pixelMove);
  });


  document.getElementById('ligne').addEventListener('click', function () {
    if (paint.actualTool === "crayon") {
      paint.canvas.removeEventListener('mousedown', paint.pixelDown);
      paint.canvas.removeEventListener('mouseup', paint.pixelUp);
      paint.canvas.removeEventListener('mousemove', paint.pixelMove);
    } else if (paint.actualTool === "ligne") {
      paint.canvas.removeEventListener('mousedown', paint.lineDown);
    } else if (paint.actualTool === "rectangle") {
      paint.canvas.removeEventListener('mousedown', paint.rectDown);
    } else if (paint.actualTool === "cercle") {
      paint.canvas.removeEventListener('mousedown', paint.cercleDown);
    }
    paint.actualTool = "ligne";
    paint.canvas.addEventListener('mousedown', paint.lineDown);
  });

  document.getElementById('rectangle').addEventListener('click', function () {
    if (paint.actualTool === "crayon") {
      paint.canvas.removeEventListener('mousedown', paint.pixelDown);
      paint.canvas.removeEventListener('mouseup', paint.pixelUp);
      paint.canvas.removeEventListener('mousemove', paint.pixelMove);
    } else if (paint.actualTool === "ligne") {
      paint.canvas.removeEventListener('mousedown', paint.lineDown);
    } else if (paint.actualTool === "rectangle") {
      paint.canvas.removeEventListener('mousedown', paint.rectDown);
    } else if (paint.actualTool === "cercle") {
      paint.canvas.removeEventListener('mousedown', paint.cercleDown);
    }
    paint.actualTool = "rectangle";
    paint.canvas.addEventListener('mousedown', paint.rectDown);
  });

  document.getElementById('cercle').addEventListener('click', function () {
    if (paint.actualTool === "crayon") {
      paint.canvas.removeEventListener('mousedown', paint.pixelDown);
      paint.canvas.removeEventListener('mouseup', paint.pixelUp);
      paint.canvas.removeEventListener('mousemove', paint.pixelMove);
    } else if (paint.actualTool === "ligne") {
      paint.canvas.removeEventListener('mousedown', paint.lineDown);
    } else if (paint.actualTool === "rectangle") {
      paint.canvas.removeEventListener('mousedown', paint.rectDown);
    } else if (paint.actualTool === "cercle") {
      paint.canvas.removeEventListener('mousedown', paint.cercleDown);
    }
    paint.actualTool = "cercle";
    paint.canvas.addEventListener('mousedown', paint.cercleDown);
  });

  document.getElementById('color').addEventListener('change', function () {
    paint.changerCouleur(document.getElementById('color').value);
  });

  document.getElementById('size').addEventListener('change', function () {
    paint.changerSize(document.getElementById('size').value);
  });
  document.getElementById('remplissage').addEventListener('change', function () {
    paint.activateFill(document.getElementById('remplissage'));
  });
  document.getElementById('clear').addEventListener('click', function () {
    paint.clean(document.getElementById('clear'));
  });
  document.getElementById('shadow').addEventListener('change', function () {
    paint.activateShadow(document.getElementById('shadow'));
  });
  document.getElementById('confirm').addEventListener('click', paint.uploadImg);
});
