// ==UserScript==
// @name           go to top
// @namespace      http://sayson.blogbus.com/
// @description    create an anchor to go to top
// @include        http://*
// ==/UserScript==

var toTop=document.createElement("a");
toTop.setAttribute('id','saysonA');
toTop.setAttribute('href','javascript:scroll(0,0);');
document.body.appendChild(toTop);
var saysonStyle=document.createElement("link");
saysonStyle.setAttribute('href','http://k.min.us/inpg5w.css');
saysonStyle.setAttribute('type','text/css');
saysonStyle.setAttribute('rel','stylesheet');
document.body.appendChild(saysonStyle);