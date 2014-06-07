// ==UserScript==
// @name        GetRidOfVideoBox
// @namespace   http://userscripts.org/users/411522
// @description Get Rid of video box
// @include     http://www.jpost.com/*
// @version     1
// @grant       none
// ==/UserScript==



window.onload=function(){
var annoyances = document.getElementById("taboola-horizontal-toolbar");
annoyances.setAttribute('style', "visibility:hidden;");

}