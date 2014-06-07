// ==UserScript==
// @namespace     http://www.splintor.com/userscript
// @name          Prepare Eric Sink articles for print
// @description   Prepare Eric Sink articles for print, by hiding the side bar and making the main part wider
// @include       http://software.ericsink.com/entries/*
// @include       http://software.ericsink.com/articles/*
// ==/UserScript==

var d = document;
var mainTR = document.getElementsByTagName("tbody")[1].getElementsByTagName("tr")[0];
mainTR.getElementsByTagName("td")[0].style.display = "none";
mainTR.getElementsByTagName("td")[2].width = "100%";
