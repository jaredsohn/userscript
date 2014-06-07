// ==UserScript==
// @name          iFrame on homepage
// @namespace     Copyright Cody R. Persinger 2006
// @description   places an iframe at the bottom of your homepage
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

ifrm = document.createElement("iframe");
ifrm.setAttribute("src", "http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewCategory&CategoryID=68"); 
ifrm.style.width = 830+"px";
ifrm.style.height = 480+"px";
ifrm.style.display="inline";
ifrm.style.position="relative";
ifrm.style.top = 617+"px"; // make this higher to move further down
document.body.style.marginBottom=10+"px";
document.getElementById('body').appendChild(ifrm);