// ==UserScript==
// @name Joemonster.org Nie Bangla! Changer
// @description Zmienia obrazek 'Nie Bangla!' na JM
// @include http://joemonster.org/*
// @include http://www.joemonster.org/*
// @version	1.0b
// ==/UserScript==

//zmiana obrazków
var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    img=ilist[i]
    if(img.src == "http://error.dreamhosters.com/503.gif") {
         img.src = "http://img17.imageshack.us/img17/1993/78717022.png";
    }
    if(img.src == "http://www.joemonster.org/i/503.gif") {
         img.src = "http://img17.imageshack.us/img17/1993/78717022.png";
    }
}