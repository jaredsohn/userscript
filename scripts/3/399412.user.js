// ==UserScript==
// @name        FlappyBot
// @namespace   Bot
// @description FlapBot
// @include     http://flapmmo.com/
// @version     1
// @grant       none
// ==/UserScript==
(function() {
  'use strict';
  var drawBars = true;
  var birdBar;
  var poleBar;
  var birdInterval;
  var poleInterval;
  var canvas = document.getElementById('canvas');

  var msg = document.createElement('div');
  msg.innerText = 'Press "s" to start, "x" to stop';
  msg.setAttribute('style', 'padding: 5px; top: 10px; ' +
    'left: 10px; background-color: red; position: absolute;');
  document.body.appendChild(msg);

  if (drawBars) {
    birdBar = document.createElement('span');
    birdBar.setAttribute('style', 'width: 50px; height: 2px; ' +
      'margin-top: 3px; margin-left: 76px; background-color: red; ' +
      'position: absolute;');
    canvas.parentNode.insertBefore(birdBar, canvas);

    poleBar = document.createElement('span');
    poleBar.setAttribute('style', 'width: 50px; height: 2px; ' +
      'margin-top: 3px; margin-left: 136px; background-color: blue; ' +
      'position: absolute;');
    canvas.parentNode.insertBefore(poleBar, canvas);
  }

  var stopBot = function() {
    clearInterval(birdInterval);
    clearInterval(poleInterval);
  };

  var startBot = function() {
    var pole;
    var jump;
    var bird;
    var birdFound;
    var birdX = 94;
    var birdWidth = 12;
    var birdHeight = 512;
    var jumpOffset = 25;
    var poleX = 115;
    var poleWidth = 180;
    var poleHeight = 512;
    var ctx = canvas.getContext('2d');

    stopBot();

    birdInterval = setInterval(function() {
      var i;
      var row;
      var col;
      var lBirdWidth = birdWidth;
      var lBirdHeight = birdHeight;
      var data = ctx.getImageData(birdX, 0, lBirdWidth, lBirdHeight).data;

      row = birdFound ? bird - 6 : 0;
      if (jump) {
        row -= 9;
      }
      birdFound = false;

      for (; row < lBirdHeight; row++) {
        for (col = 0; col < lBirdWidth; col++) {
          i = (row * lBirdWidth * 4) + (col * 4);
          if ((data[i] >= 190 && data[i] <= 215) &&
              (data[i + 1] >= 40 && data[i + 1] <= 60) &&
              (data[i + 2] >= 20 && data[i + 2] <= 30) &&
              data[i + 3] === 255) {
            bird = row;
            birdFound = true;
            break;
          }
        }
      }

      if (drawBars) {
        birdBar.style.marginTop = (3 + bird) + 'px';
      }
      if (!jump && bird + jumpOffset > (pole || 256)) {
        jump = true;
        setTimeout(function() {
          jump = false;
        }, 250);
        document.body.onkeydown();
      }
    }, 4);

    poleInterval = setInterval(function() {
      var i;
      var j;
      var row;
      var col;
      var lPoleWidth = poleWidth;
      var lPoleHeight = poleHeight;
      var data = ctx.getImageData(poleX, 0, lPoleWidth, lPoleHeight).data;

      for (row = 100; row < lPoleHeight; row++) {
        for (col = 0; col < lPoleWidth; col++) {
          i = (row * lPoleWidth * 4) + (col * 4);
          j = ((row + 1) * lPoleWidth * 4) + (col * 4);
          if (data[i] === 3 && data[i + 1] === 3 &&
              data[i + 2] === 3 && data[i + 3] === 255 &&
              data[j] === 0 && data[j + 1] === 117 &&
              data[j + 2] === 0 && data[j + 3] === 255) {
            pole = row;
            break;
          }
        }
      }
      if (drawBars) {
        poleBar.style.marginTop = (3 + pole) + 'px';
      }
    }, 500);
  };

  document.body.onkeyup = function(evt) {
    if (evt.which === 83) {
      startBot();
    }
    else if (evt.which === 88) {
      stopBot();
    }
  };
}());