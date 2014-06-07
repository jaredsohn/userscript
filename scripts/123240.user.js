// ==UserScript==
// @name Brain: Hiding clear button
// @author gera_b
// @description Hiding clear
// @include http://brain.lviv.ua/*
// @match http://brain.lviv.ua/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
// ==/UserScript==

var clearLink = document.getElementsByClassName('rBlD3');
var clearLinkM = document.getElementsByClassName('rBlD2');

// for(i=0;i<clearLink.length;i++)
// GM_log(clearLink[i].value);
clearLink[1].parentNode.removeChild(clearLink[1]);
clearLinkM[1].parentNode.removeChild(clearLinkM[1]);