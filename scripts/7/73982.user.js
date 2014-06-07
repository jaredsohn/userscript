// ==UserScript==
// @name           Hide Google news in HackerNews
// @namespace      http://lhorie.blogspot.com
// @description    Hides news about Google in HackerNews
// @include       http://news.ycombinator.com/*
// ==/UserScript==
(function() {var as=document.getElementsByTagName("a");for(var i=0;i<as.length;i++)if(as[i].innerHTML.match(/Google|Schmidt/gim)){var tr=as[i].parentNode.parentNode;tr.style.display="none";tr.nextSibling.style.display="none";tr.nextSibling.nextSibling.style.display="none"}})()