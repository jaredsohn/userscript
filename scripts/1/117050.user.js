// ==UserScript==
// @name       Last.FM -> Yea.FM
// @namespace  http://google.com
// @version    0.1.1
// @include    http://www.last.fm/music/*
// ==/UserScript==


var h = document.getElementsByTagName("h1")[0];
var ht = h.innerHTML;
h.innerHTML = "<a target='_BLANK' href='http://yea.fm/#/search/clips/global!q="+ht.replace(/ /g,"+").replace(/&amp;/g,"and")+"'>"+ht+"</a><img src='http://i.imgur.com/TDgsB.jpg' />";
