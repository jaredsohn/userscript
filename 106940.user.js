// ==UserScript==
// @name          Windows Live Smartscreen Redirecter 2012
// @namespace     -
// @description   A script which automatically redirects the window to the link on the smartscreen.
// @include       http://link.smartscreen.live.com/*
// ==/UserScript==
var cleanlink = document.getElementById("ilink").innerHTML;
cleanlink = cleanlink.replace("<span class=\"HighlightDomain\">","");
cleanlink = cleanlink.replace("</span>","");
cleanlink = cleanlink.replace(/\u200b/g,"");
try{window.location.href = cleanlink;}catch(err){alert(err);}