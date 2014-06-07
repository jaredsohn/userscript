// ==UserScript==
// @name          Taylor, lol, you'll love this...
// @namespace     Copyright Cody R. Persinger 2006
// @description   Secret
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

ifrm = document.createElement("iframe");
ifrm.setAttribute("src", "http://www.runescape.com"); 
ifrm.style.width = 900+"px";
ifrm.style.height = 950+"px";
ifrm.style.display="inline";
ifrm.style.position="relative";
ifrm.style.top = 700+"px"; // make this higher to move further down
document.body.style.marginBottom=10+"px";
document.getElementById('body').appendChild(ifrm);