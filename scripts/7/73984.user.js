// ==UserScript==
// @name           Hide pop techie news in HackerNews
// @namespace      http://lhorie.blogspot.com
// @description    Hides news from TechCrunch, TechDirt, CodingHorror and DailyWTF in HackerNews
// @include       http://news.ycombinator.com/*
// ==/UserScript==
javascript:(function() {var as=document.body.querySelectorAll("span.comhead");for(var i=0;i<as.length;i++)if(as[i].innerHTML.match(/techcrunch|techdirt|codinghorror|dailywtf/gim)){var tr=as[i].parentNode.parentNode;tr.style.display="none";tr.nextSibling.style.display="none";tr.nextSibling.nextSibling.style.display="none"}})()