// ==UserScript==
// @name           lsg-photo
// @namespace      lsg-photo
// @include        http://*lsgmodels.com/mainpages/*
// ==/UserScript==

var imageTags = document.getElementsByTagName("img");
var i;
for ( i in imageTags) {
  if (imageTags[i].src.match(/\/mainthumbs\/p\/l\/(.*)\.jpg/)) {
    var downloadLink = document.createElement("a");
    downloadLink.innerHTML = '<span class="photopagetext"> download zip </span>';
	downloadLink.href = "http://lsgmodels.com/zipdir.php?dir=/protected/p/" + RegExp.$1 + "&sz=l";
	// the table cell that the image is in
	var tableCellNode = imageTags[i].parentNode.parentNode;
	var nodes = tableCellNode.childNodes;
	tableCellNode.insertBefore(downloadLink, nodes[0]);
  }
}