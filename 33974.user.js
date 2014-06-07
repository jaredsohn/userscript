/*
 *	Name:		Hacker News Comments Footer
 *	Version:	1
 *  Author:		Tim Dupree
 *				http://www.tdupree.com
 *				email: tim [AT] tdupree [DOT] com
 * 
 *	License:	Hacker News Comments Footer is released under the Open Source MIT License
 *				(c) 2008 Tim Dupree
 *
 *	Date:		July 24, 2008
 *
 *	Summary:	Adds a footer to the end of the comments pages to give a visual cue of the end of page.
 *
 */

// ==UserScript==
// @name          Hacker News Comments Footer
// @namespace     http://www.tdupree.com/
// @description   Adds a footer to the end of the comments pages to give a visual cue of the end of page.
// @include       http://news.ycombinator.com/item?id=*
// ==/UserScript==
 
(function() {
	// Uncomment line below to enable debugging IO in firebug console
	//console = unsafeWindow['console'];	 //example: console.log("ouput: " + myOutputVar);
	
	var tables = document.getElementsByTagName('tbody');
	var tbody = tables[0];
	var tChildren = tbody.childNodes;
	
	var emptyTr = document.createElement("tr");
	var emptyTd = document.createElement("td");
	var br = document.createElement("br");
	
	emptyTd.appendChild(br);
	emptyTd.appendChild(br);
	
	emptyTr.appendChild(emptyTd);
	tbody.appendChild(emptyTr);
	
	var footerTr  = document.createElement("tr");
	var footerTd = document.createElement("td");
	
	footerTd.style.borderTop = "2px solid #FF6600";
	footerTd.style.textAlign = "center";
	footerTd.style.paddingTop = "15px";
	footerTd.style.paddingBottom = "25px";
	
	footerTd.innerHTML = '<span class="yclinks"><a href="http://news.ycombinator.com/">Hacker News</a> | <a href="lists">Lists</a> | <a href="rss">RSS</a> | <a href="http://ycombinator.com/bookmarklet.html">Bookmarklet</a> | <a href="http://ycombinator.com/newsguidelines.html">Guidelines</a> | <a href="http://ycombinator.com/newsfaq.html">FAQ</a> | <a href="http://ycombinator.com/newsnews.html">News News</a> | <a href="item?id=363">Feature Requests</a> | <a href="http://ycombinator.com">Y Combinator</a> | <a href="http://ycombinator.com/w2009.html">Apply</a> | <a href="http://ycombinator.com/lib.html">Library</a>';
	
	footerTr.appendChild(footerTd);
	tbody.appendChild(footerTr);


})();