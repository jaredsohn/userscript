// ==UserScript==
// @name          TF2R old-style add friend button
// @namespace     http://userscripts.org/
// @description	  Adds the "add friend" button with the old style link
// @version 1.1
// @include       http://tf2r.com/user/*
// @include       http://tf2r.com/k*
// ==/UserScript==
var pcont = document.getElementById("content");
var links234 = pcont.getElementsByTagName("a");
var index = 0;

while(!(links234[index]["href"].match("AddFriend"))) index++;
var mynode = links234[index];
var link = "steam://friends/add" + mynode["href"].substr(43);
var r = document.createElement("a");
r.setAttribute("href",link);
var b = document.createElement("img");
b.setAttribute("width","16");
b.setAttribute("height","16");
b.setAttribute("src",mynode.getElementsByTagName("img")[0]["src"]);
r.appendChild(b);
mynode.parentNode.insertBefore(r,mynode);

