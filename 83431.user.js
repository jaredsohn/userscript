// ==UserScript==
// @name           BOB STOP SHOWING YOUR MOOBS JEEZ
// @namespace      I still have no idea what this is supposed to be
// @description    FUCKING HELL
// @include        http://*.forumwarz.com/discussions/view/*
// @include        http://forumwarz.com/discussions/view/*
// ==/UserScript==

//HAHA I'M JUST STEALING RICKETS CODE (OH GOD I HOPE YOU DON'T MIND)

var h1 = document.getElementsByTagName("h1");
var karlKoch = new Array();

for(var i=0;i<h1.length;i++) {
  if(h1[i].children[0].innerHTML.replace("-<br>","") == "bobdisgea") {
   karlKoch[karlKoch.length] = h1[i];
  }
}

for(var i = 0; i<karlKoch.length;i++) {
var karledText = karlKoch[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[1];
karledText.innerHTML = karledText.innerHTML.replace(/src=".*?imageshack.*?"/,'src="http://pressthebuttons.typepad.com/photos/uncategorized/wariokart.jpg"');
}

var blockQuotes = document.getElementsByTagName("blockquote");

for(var i = 0; i<blockQuotes.length;i++) {
 if(blockQuotes[i].children.length > 0) {
  if(blockQuotes[i].children[0].innerHTML == "bobdisgea Posted:" && blockQuotes[i].children[0].tagName == "STRONG") {
   blockQuotes[i].innerHTML = blockQuotes[i].innerHTML.replace(/src=".*?imageshack.*?"/,'src="http://pressthebuttons.typepad.com/photos/uncategorized/wariokart.jpg"');
  }
 }
}
