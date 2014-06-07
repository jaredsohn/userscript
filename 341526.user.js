// ==UserScript==
// @name Se7ensins animated logo
// @author Pepe Le Pew
// @homepage http://se7ensins.com
// @match http://www.se7ensins.com/*
// @version 1.0
// ==/UserScript==
var s = document.getElementById("logo");
var t = s.getElementsByTagName("img");
t[0].src = "http://i.imgur.com/B5XHW2a.gif";
