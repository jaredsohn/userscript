// ==UserScript==
// @name           Devoilation
// @namespace      Devoilation
// @include        http://www.facebook.com/pages/*
// ==/UserScript==

javascript:(function(){varspans=document.getElementsByTagName('span');
for(var i=0;i<spans.length;i++){spans[i].style.visibility='visible';}})(); 