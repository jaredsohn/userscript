// ==UserScript==
// @name        fillH
// @namespace   magicmom
// @include     https://www.magicmomentsprom.com/*
// @include     https://www.magicmomentscollections.com/*
// @include     https://www.magicmomentschristening.com/*
// @version     1
// @grant metadata
// ==/UserScript==

var labels = document.getElementsByTagName('input'); //get the labels
for (var i = 0; i < labels.length; ++i) { //loop through the labels
    if (labels[i].value == "height") { //check label text
        labels[i].checked=true; //if correct text, click the label
    }
   if (labels[i].name =="gallery_large_image_RESIZETO[0]") { //check label text
        labels[i].value="120"; //if correct text, click the label
    }
  if (labels[i].name =="gallery_large_image_RESIZETO[1]") { //check label text
        labels[i].value="120"; //if correct text, click the label
    }
  if (labels[i].name =="gallery_large_image_RESIZETO[2]") { //check label text
        labels[i].value="120"; //if correct text, click the label
    }
  if (labels[i].name =="gallery_large_image_RESIZETO[3]") { //check label text
        labels[i].value="120"; //if correct text, click the label
    }
 if (labels[i].name =="full_size_image_RESIZETO1") { //check label text
        labels[i].value="500"; //if correct text, click the label
    }
 if (labels[i].name =="full_size_image_RESIZETO2") { //check label text
        labels[i].value="200"; //if correct text, click the label
    }
}