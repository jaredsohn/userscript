// ==UserScript==
// @name          Shrink wide images
// @namespace      http://serezhka.livejournal.com/gmscripts
// @include        http://*.livejournal.com/friends/*
// ==/UserScript==

function restoreImage(e) {
  if (this.innerHTML == "(restore image size)") {
    var img = this.previousSibling;
    img.removeAttribute("height");
    img.removeAttribute("width");
    this.innerHTML = "(shrink image)";
  } 
  else if (this.innerHTML == "(shrink image)") {
    var img = this.previousSibling;
    var new_width = screen.width - img.x - PADDING_MAGIC;
    var coeff = new_width / img.width;
    img.width = new_width;
    this.innerHTML = "(restore image size)";
  }
}

function shrinkImages() {
  var images = document.images;
  for (var i=0; i < images.length; i++) {
    if (images[i].x + images[i].width > screen.width - PADDING_MAGIC) {
      var img = images[i];
      var new_width = screen.width - img.x - PADDING_MAGIC;
      var coeff = new_width / img.width;
      img.width = new_width;
      img.height *= coeff;

      var resized = document.createElement("div");
      resized.setAttribute("style", "text-align: center; font-size: 80%;");
      img.parentNode.replaceChild(resized, img);
      resized.appendChild(img);
      var restore = document.createElement("a");
      restore.setAttribute("href", "javascript:void(0);");
      resized.appendChild(restore);
      restore.innerHTML = "(restore image size)";
      restore.addEventListener('click', restoreImage, false);
    }
  }
}

/* 
Right padding value to keep when shrinking the images.
Modify this value according to your browser and display layout.
*/
var PADDING_MAGIC = 40;

shrinkImages();
