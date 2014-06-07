// ==UserScript==
// @name        4chan hoverover image enlarger
// @namespace   4chan_hoverover_image_enlarger
// @description When you hover over an image posted on a board, the thumbnail will be replaced by the original image.
// @version     1.0
// @include     http://boards.4chan.org/*
// @include     https://boards.4chan.org/*
// @run-at      document-end
// ==/UserScript==
var thumbs = document.getElementsByClassName("fileThumb");
for (i=0; i<thumbs.length; i++)
	quick(i);
function quick(ii){
	var thumbs = document.getElementsByClassName("fileThumb");
	var thumbss = thumbs[ii].src;
	thumbs[ii].setAttribute("id", "idis" + ii);
	thumbs[ii].addEventListener("mouseover",function(){myFunction(ii);},false);
}
function myFunction(z){
	var element = document.getElementById("idis" + z);
	var inner = element.innerHTML;
	element.innerHTML = "<img src='" + element.href + "'/>";
}