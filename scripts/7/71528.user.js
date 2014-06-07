// ==UserScript==
// @name         Foreign Policy Single Page Articles
// @namespace    fpSinglePageArticles
// @include      http://www.foreignpolicy.com/articles/*
// @include      https://www.foreignpolicy.com/articles/*
// @match        http://www.foreignpolicy.com/articles/*
// @match        https://www.foreignpolicy.com/articles/*
// @datecreated  2010-03-15
// @lastupdated  2010-03-15
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript automatically redirects you to the single page version of any Foreign Policy article you read.
// ==/UserScript==

(function(d){
	if(window.location.href.match(/\?.*page=full/i)) return;

	var toolbar=d.getElementById("tool-bar");
	if(!toolbar) return;

	var spLink=d.evaluate(".//a[contains(text(),'SINGLE PAGE')]",toolbar,null,9,null).singleNodeValue;
	if(!spLink) return;

	window.location.replace(spLink.href);
})(document);