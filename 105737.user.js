// ==UserScript==
// @name page-conspirer
// @description Script for page conspircy
// @include        http://download.oracle.com/javase/tutorial/*
// ==/UserScript==

(function() {
document.title = "Google Search";
document.getElementById("TopBar").style.display="none";
document.getElementById("Footer2").style.display="none";
})();