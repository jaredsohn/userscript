// ==UserScript==
// @name           Hide linkbait opinion articles in HackerNews
// @namespace      http://lhorie.blogspot.com
// @description    Hides articles with titles that contain the words "why" or "dead" in HackerNews
// @include       http://news.ycombinator.com/*
// ==/UserScript==
(function() {var as=document.getElementsByTagName("a");for(var i=0;i<as.length;i++)if(as[i].innerHTML.match(/why|dead/gim)){var tr=as[i].parentNode.parentNode;tr.style.display="none";tr.nextSibling.style.display="none";tr.nextSibling.nextSibling.style.display="none"}})()