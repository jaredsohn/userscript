// ==UserScript==
// @name        No ytWarning
// @namespace   http://userscripts.org/users/548715
// @description Removes the annoying orange location warning from youtube
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1
// @grant       none
// ==/UserScript==

var element = document.getElementById("alerts");
if(element){
    element.style.display = 'none';
}
