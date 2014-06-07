// ==UserScript==
// @name           Facebook Full-Size Link Highlighter
// @codename       Big-O Image Links
// @namespace      http://localhost
// @author         Scott Dobart
// @copyright      Creative Commons (CC BY-SA)
// @description    Turns the download link red on _o.jpg images @ facebook.com
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*

// ==/UserScript==

document.addEventListener("DOMNodeInserted", function (event) {
var idd = event.target.id;
linkHighlight(idd);
}, false);

function linkHighlight(node) {

  var links = document.getElementsByTagName('a');
  var element;

   for (var i=0;i<links.length;i++){
      element = links[ i ];

      if (element.href.indexOf("_o.jpg")>=0){ 
          element.style.color = "#ff0000";
      }
  }
}