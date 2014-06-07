// ==UserScript==
// @name           Random PhD
// @namespace      pm
// @include        http://*phdcomics.com/*
// ==/UserScript==

var r=Math.floor(Math.random()*1180)+1;
var link = "http://www.phdcomics.com/comics/archive.php?comicid="+r;

var x = document.createElement("a");
x.setAttribute("href", link);
x.innerHTML = "Random Comic";

var y = document.createElement("div");
y.setAttribute("style", "background-color:pink; padding: 10px; height: 28px; width: 100px; position: absolute; top: 0px; right: 0px;");

y.appendChild(x);

document.getElementsByTagName("body")[0].appendChild(y);