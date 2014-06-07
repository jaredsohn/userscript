// ==UserScript==
// @name           Craigslist wikifier
// @namespace      nemik.net
// @description    converts craiglists stuff into format that can be pasted into dokuwiki
// @include        http://*.craigslist.org/*
// ==/UserScript==

var title = document.getElementsByTagName("h2")[0].firstChild.nodeValue;
var text = "  * [["+document.location+"|"+title+"]]";

var input = document.createElement("input");
input.setAttribute("type","text");
input.setAttribute("id","wikified");
input.setAttribute("size","100");
input.setAttribute("value",text);
//input.onClick = "this.focus();this.select();alert('moo');";
input.setAttribute("readonly","readonly");
input.setAttribute("onFocus","this.select()");

document.getElementById("tsb").appendChild(input);
