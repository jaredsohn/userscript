// ==UserScript==
// @name           wklej.to
// @namespace      http://wklej.to/
// @description    rozszerza strone wklej.to na cala szerokosc ekranu, zwieksza to wygode
// @include        https://wklej.to/*
// @include        http://wklej.to/*
// ==/UserScript==
document.getElementById("topmenu").style.margin = "0 auto";
document.getElementById("footer").style.margin = "0 auto";
document.getElementById("content").style.width = "100%";
document.getElementById("main").style.width = "100%";
document.getElementById("main").style.clear = "both";
document.getElementById("reply").style.width = "100%";
document.getElementById("reply").style.padding = "0";
document.getElementById("reply").style.margin = "0";
document.getElementById("paste-post").style.background = "none";
document.getElementById("paste-post").style.height = "auto";
document.getElementById("reply").style.height = "450px";
document.getElementById("reply").style.background = "#cccccc";
document.getElementById("reply").style.border = "solid 1px #463A20";
