/*globals document */

// ==UserScript==

// @name           Remove Mandatory Fun Day
// @namespace      http://jmillikin.selfip.org/greasemonkey/

// @description    It is cancer

// @include        http://thedailywtf.com/*
// @include        http://www.thedailywtf.com/*

// ==/UserScript==



(function() {


var mfd = document.getElementsByClassName ('Mandatory_Fun_Day_Outer');
var articles = [];
var ii, article;
for (ii = 0; ii < mfd.length; ii++)
{
	article = mfd[ii].parentNode;
	articles.push (article);
}

for (ii = 0; ii < articles.length; ii++)
{
	article = articles[ii];
	article.parentNode.removeChild (article);
}


})();
