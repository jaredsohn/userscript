// ==UserScript==
// @name           LinkTalk Banner Remover
// @namespace      Oliver
// @description    Removes that annoying pink banner with the huge useless picture, as well as the huge logo at the top.
// @include        http://linktalk.ihiphop.com/forums/*
// ==/UserScript==

var wrap = document.getElementById("wrap");
var divs = wrap.getElementsByTagName("div");
var head = document.getElementById("page-header");
var body = document.getElementById("page-body");

var image = head.getElementsByTagName("img")[0];
var pink = body.getElementsByClassName("rules")[0];

image.src = "";
body.removeChild(pink);
wrap.removeChild(divs[7]);