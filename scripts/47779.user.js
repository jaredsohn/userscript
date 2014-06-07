// ==UserScript==
// @version 1.0
// @name LinkColour
// @author Graeme Sheppard
// @namespace http://www.rillion.net/
// @description Revert links to standard web colours
// @include http://www.rillion.net/*
// ==/UserScript==

(function () {
  var root = document.getElementsByTagName("body")[0];
  var ns = "A:link{color:blue!important;}A:active{color:red!important;}A:visited{color:purple!important;};";
  var ss = document.createElement("style");
  var tn = document.createTextNode(ns);
  ss.appendChild(tn);
  root.appendChild(ss);
})();
