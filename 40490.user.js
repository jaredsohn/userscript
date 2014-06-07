// ==UserScript==
// @name         XNXX Video Link
// @namespace    http://userscripts.org/users/77868
// @description  Adds links to the video file on XNXX video pages, so that the videos can be viewed without Flash.
// @include      http://video.xnxx.com/*
// ==/UserScript==

// extract the part we want
var pl = document.getElementById("player");
var viewer=pl.getElementsByTagName("embed")[0];
var flashvars=viewer.getAttribute("flashvars");
var matcher = /flv_url=([^&]*)\&/;
var video = unescape(matcher.exec(flashvars)[1]);
// write a link to the video into the document
var div = document.createElement("div");
div.setAttribute("style","padding:1em;background-color:darkred;");
div.innerHTML='<a href="'+video+'">'+video+'</a>';
pl.parentNode.insertBefore(div,pl);
