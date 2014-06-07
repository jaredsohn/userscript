// ==UserScript==

// @namespace     http://buggeddebugger.wordpress.com

// @name          Google in Wikipedia

// @description   Inserts links to Google web and images searches related to the Wikipedia Articles

// @include       http://*.wikipedia.org/wiki/*

// ==/UserScript==

var para=document.getElementsByTagName('p');

var head=document.getElementsByTagName('h1');

para[0].innerHTML='<br><a href="http://www.google.com/search?hl=en&lr=&q='+head[0].innerHTML+'&btnG=Search">Google Search for '+head[0].innerHTML+'</a><br><a href="http://images.google.com/images?svnum=10&hl=en&lr=&q='+head[0].innerHTML+'&btnG=Search">Google Images Search for '+head[0].innerHTML+'</a><br><a href="http://search.live.com/images/results.aspx?q='+head[0].innerHTML+'">Live Images Search for '+head[0].innerHTML+'</a><br><br>'+para[0].innerHTML;