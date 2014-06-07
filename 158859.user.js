// ==UserScript==
// @name        GetRidOfMessageBox
// @namespace   http://userscripts.org/users/411522
// @description Get Rid of Message Boxes on Algermeiner
// @include     http://www.algemeiner.com/*
// @grant       none
// @version     1
// ==/UserScript==


window.onload=function(){
var annoyances = document.getElementById("messagebox");
annoyances.setAttribute('style', "visibility:hidden;");

}