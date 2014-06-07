// ==UserScript==
// @name           Multi-column (Google)
// @namespace      yqbd.multicolumn.google
// @description    Multi-column view for Google.
// @include        http://www.google.com/*
// ==/UserScript==
(function multicolumngoogle() {

var divres = document.getElementById("res").getElementsByTagName("div")[0];
divres.style.MozColumnWidth = "30em";
divres.style.MozColumnGap = "1em";

})()