// ==UserScript==
// @name          YouTube Persian
// @description	  Persian Tahoma font, RTL enhancement and tweaked CSS for YouTube Persian interface
// @version       1.0.0
// @author        Ehsan
// @include       http://youtube.com/*
// @include       https://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://*.youtube.com/*
// ==/UserScript==


fontFamily = "tahoma, arial, sans-serif";

document.body.style.fontFamily = fontFamily;

elements = document.getElementsByTagName('textarea');
for(i = 0 ; i < elements.length ; i++) {
    elements[i].style.fontFamily = fontFamily;
}

elements = document.getElementsByTagName('input');
for(i = 0 ; i < elements.length ; i++) {
    elements[i].style.fontFamily = fontFamily;
}

elements = document.getElementsByTagName('button');
for(i = 0 ; i < elements.length ; i++) {
    elements[i].style.fontFamily = fontFamily;
}
