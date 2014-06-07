// ==UserScript==
// @name          [BFG]evo+
// @description	  makes evo easier for BFG members
// @include       http://ev5.neondragon.net/*
// ==/UserScript==

var author, newElement3;
author = document.getElementById('openpanel');
if (author) {
    newElement3 = document.createElement("font");
    author.parentNode.insertBefore(newElement3, author);
}

newElement3.innerHTML = '<div align="right"><font size="1" color="white">[BFG]evo+ beta Created By [BFG]Baktar</font>'

var bg1, newElement1;
bg1 = document.getElementById('openhelppanel');
if (bg1) {
    newElement1 = document.createElement("a");
    bg1.parentNode.insertBefore(newElement1, bg1);
}

newElement1.innerHTML = '<a href="http://ev5.neondragon.net/_/53391-Bulletin-Board">Team Badass</a> | '

var bg2, newElement2;
bg2 = document.getElementById('openhelppanel');
if (bg2) {
    newElement2 = document.createElement("a");
    bg2.parentNode.insertBefore(newElement2, bg2);
}

newElement2.innerHTML = '<a href="http://ev5.neondragon.net/_/53407-Warmongering">L33t Fl33ts</a> | '
