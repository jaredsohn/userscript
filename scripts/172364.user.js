// ==UserScript==
// @name        Pantip Filter and All Comments Loader
// @namespace   http://shelling.in.th
// @description Load all comments automatically, Optional to remove all comments except topic owner's one.
// @include     http://pantip.com/topic/*
// @version     0.2.2
// @grant       none
// ==/UserScript==

var timer = 2500;  // delay time to check any clickable node. slow but sure.
var owner = true;  // enable "only topic owner filter" option.

function c(obj){return document.getElementsByClassName(obj);}
x=setInterval(function(){t=c("loadmore-bar-paging");if(t.length==0){clearInterval(x);if(owner){a=c("display-post-wrapper section-comment");for(j=0;j<a.length;j++){k=/altcolor05/;if(k.test(a[j].className)==false){a[j].style.display="none";}}}}for(i=0;i<t.length;i++){t[i].getElementsByTagName("A")[0].click();}}, timer);