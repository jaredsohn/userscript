// ==UserScript==
// @name           Karl Koch is a terrible poster
// @namespace      Karl Koch is a terrible poster
// @description    Karl Koch is a terrible poster
// @include        http://*.forumwarz.com/discussions/view/*
// @include        http://forumwarz.com/discussions/view/*
// ==/UserScript==

var h1 = document.getElementsByTagName("h1");
var karlKoch = new Array();

for(var i=0;i<h1.length;i++) {
 if(h1[i].className == "donated") {
  if(h1[i].children[0].pathname == "/profiles/Karl%20Koch") {
   karlKoch[karlKoch.length] = h1[i];
  }
 }
}

for(var i = 0; i<karlKoch.length;i++) {
var karledText = karlKoch[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[1];
karledText.innerHTML = "I'm a gigantic faggot.";
}

var blockQuotes = document.getElementsByTagName("blockquote");

for(var i = 0; i<blockQuotes.length;i++) {
 if(blockQuotes[i].children.length > 0) {
  if(blockQuotes[i].children[0].innerHTML == "Karl Koch Posted:" && blockQuotes[i].children[0].tagName == "STRONG") {
   blockQuotes[i].innerHTML = "<strong>Karl Koch Posted:</strong><p></p><p>I'm a gigantic faggot.</p>"
  }
 }
}
