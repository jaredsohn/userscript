// ==UserScript==
// @name           Add Feedbooks to Bookworm
// @namespace      http://userscripts.org/scripts/show/55655
// @description    Adds EPUBs from FeedBooks to O'Reilly Bookworm
// @include        http://www.feedbooks.com/book/*
// @include        http://www.feedbooks.com/userbook/*
// @include        http://feedbooks.com/book/*
// @include        http://feedbooks.com/userbook/*
// ==/UserScript==
(function () {	
	link = document.createElement("div");
	link.innerHTML = '<p><a href="http://bookworm.oreilly.com/add/?epub='+document.location+'.epub" style=""><img src="http://www.graphxkingdom.com/graphics/books/book01.gif" height="10px" width="10px">Add to Bookworm</a></p>'; 
	link.style.textAlign = "left";
	link.style.height = "9.6px";
	link.style.marginBottom = "4px";
	link.style.marginTop = "-5px";
	document.getElementById("actions").appendChild(link);

})();



