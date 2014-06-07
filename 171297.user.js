// ==UserScript==
// @name        piratenpad converteer naar forum
// @namespace   armeagle.nl
// @include     https://pad.piratenpartij.nl/p/*
// @version     1.1
// ==/UserScript==

//
// Changelog:
// Version 1.1: 
//  - make < and > work
//

var barul = document.querySelector("#editbar ul.menu_left");
var li = document.createElement("li");
var a = document.createElement("a");
a.textContent = "Converteer naar forum";
a.setAttribute("style", "color: black");
li.appendChild(a);

barul.appendChild(li);

a.addEventListener("click", function(event) {

event.stopPropagation();

var source = document.querySelector("iframe").contentWindow.document.querySelector("iframe").contentWindow.document.querySelector("body#innerdocbody").innerHTML;
source = source.replace(/&amp;/g, "&").replace(/&nbsp;/g, " ");
//source = source.replace(/<br>/g, "\n")
source = source.replace(/<\/div>/g, "\n");
source = source.replace(/<([\/]*)([b|u])+>/g, "[$1$2]");
source = source.replace(/<[^>]+>/g, "");
source = source.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

var ta = document.createElement("textarea");
ta.setAttribute("style", "position: absolute; z-index: 100; top: 50px; left: 50px; width: 600px; height: 600px;");
ta.value = source;

var box = document.querySelector("#editorcontainerbox");
box.parentNode.insertBefore(ta, box.nextSibling);

ta.addEventListener("click", function() {
this.focus(); this.select();
});

ta.addEventListener("blur", function() {
this.parentNode.removeChild(this);
});

return false;
});