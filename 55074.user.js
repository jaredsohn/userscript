// ==UserScript==
// @name           Xat Link Validator
// @namespace      T-Dub
// @include        http://linkvalidator.net/warn.php?p=*
// ==/UserScript==

title = document.getElementsByTagName("TITLE");
title[0].innerHTML = "Skipping Link Validator";
frames = document.getElementsByTagName("FRAME");
newurl = frames[1].src;
html = document.getElementsByTagName("HTML");
html[0].innerHTML = "<center>Redirecting to your link</center>";
window.location = newurl;