// ==UserScript==
// @name           OkCupid responsive compare page
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/22491.user.js
// @description    Replaces OkCupid's sluggish HTML bell curves with a much faster canvas implementation
// @include        http://www.okcupid.com/compare?*
// ==/UserScript==

var OkCupidStyle = false; // set to true for closer to original looks

location.href = "javascript:void(draw_bell_objects_when_ready = "+
  "draw_bell_objects = function(){})";
init( unsafeWindow.BELLS_TO_DRAW );

function init( bells ) {
  function render(bell, no) {
    var mean = Math.floor(100 * (bell.min + bell.max) / 2);
    var dev = Math.floor(100 * (bell.max - bell.min) / 2);
    var dtc = 1, x1 = 2, x2 = 100, w = 130, h = 23, barheight = 2;
    return canvas_bell(bell.dest, mean, dev, dtc, x1, x2, w, h, barheight);
  }
  return bells.map(function(bell) { setTimeout(render, 0, bell); });
}

function calc_it(x, mean, dev) {
  numerator = Math.exp(-(x-mean)*(x-mean)/(2*dev*dev));
  denominator = dev*Math.sqrt(2*Math.PI);
  return numerator / denominator;
}

function canvas_bell(dest, mean, dev, devstocolor, x1, x2, width, height, bh) {
  function bar(x, h1, h2, c1, c2) {
    var y = height - h1 - h2;
    if (bh) x += 5;
    ctx.fillStyle = c1; ctx.fillRect(x, y, 1, h1);
    if (h2 < 1) return;
    ctx.fillStyle = c2; ctx.fillRect(x, y+h1, 1, h2);
  }

  var node = document.getElementById(dest);

  // OkCupid trashes innerHTML with progress info; compensate:
  var junk = document.createElement("div");
  junk.style.display = "none";
  junk.id = node.id;
  node.removeAttribute("id");
  node.appendChild(junk);

  var canvas = document.createElement("canvas");
  canvas.setAttribute("height", height + (OkCupidStyle ? 6 + bh : 0));
  canvas.setAttribute("width", width + (bh ? 10 : 0));
  canvas.style.margin = OkCupidStyle ? "10px 11px 7px 8px" : "3px 0 6px 0";
  canvas.style.border = "0";
  node.innerHTML = "";
  node.appendChild(canvas);
  var ctx = canvas.getContext("2d");

  var cutoff1 = mean - dev*devstocolor;
  var cutoff2 = mean + dev*devstocolor;

  var xTab = [], yTab = [], yMax = -Infinity, x, y;
  for (var i = 0; i < width; i++) {
    xTab.push(x = x1 + (x2-x1) * i/(width - 2));
    yTab.push(y = calc_it(x, mean, dev));
    yMax = Math.max(yMax, y);
  }

  var yMul = (height - 2) / yMax;
  for (i = 0; i < width; i++)
    yTab[i] = Math.round(yTab[i] * yMul);

  var h1, h2, lastY, nextY, mid;
  for (i = 0; i < width; i++) {
    lastY = y;
    x = xTab[i];
    y = yTab[i];
    nextY = yTab[i+1];

    h1 = 1;
    if (i > 0 && i < width - 1)
      h1 = Math.round(Math.max(1, Math.abs(y-lastY), Math.abs(y-nextY)));
    h2 = Math.max(0, y - h1);

    var mid = x >= cutoff1 && x <= cutoff2;
    bar(i, h1, h2,
        mid ? "green" : "darkgray",
        mid ? "lightgreen" : "lightgray");
  }

  if (bh) {
    var r = Math.min(255, Math.round((100-(mean-dev))*255/100));
    var g = Math.min(255, Math.round(dev*5.3));
    var b = Math.min(255, Math.round((mean+dev)*255/100));
    var c = "rgb("+ r +","+ g +","+ b +")";

    if (OkCupidStyle) {
      ctx.fillStyle = c;
      ctx.fillRect(0, height + 6, width + 10, bh);
    } else { // much nicer!
      var td = node.previousSibling.previousSibling;
      var name = td.textContent.match(/^[^:]+/)[0];
      td.innerHTML = '<span style="border-bottom:'+ bh +'px solid '+ c +'">' +
        name + '</span>:';
    }
  }
  return yTab;
}
