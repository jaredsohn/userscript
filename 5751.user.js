// ==UserScript==
// @name          Demonoid Searching Remover
// @description	  Gets rid of the Searching.com bar on the right margin of demonoid.com
// @include       http://www.demonoid.com/*
// @include       http://demonoid.com/*
// ==/UserScript==


var O1=document.getElementById('smn').parentNode;O1.parentNode.removeChild(O1);