// ==UserScript==
// @name          iFrame on homepage
// @namespace     Copyright Cody R. Persinger 2006
// @description   places the customization forum at the bottom of your homepage
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// ==/UserScript==

 forum = document.createElement("[[iframe]]");
forum.setAttribute("src", "http://forum.myspace.com/index.cfm?fuseaction=messageboard.viewCategory&CategoryID=68");
forum.style.width = 750+"px";
forum.style.height = 460+"px";
forum.style.display="inline";
forum.style.position="relative";
forum.style.top = 320+"px";
forum.style.left = 0+"px";
document.body.style.marginBottom=10+"px";
document.getElementById('main').appendChild(forum);