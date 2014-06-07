// ==UserScript==
// @name        Sort-by-Score Button & No "Scope" Crap
// @namespace   Selbi
// @include     http*://*derpiboo.ru/*
// @include     http*://*derpibooru.org/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

// Sort by Score
unsafeWindow.ForScore = function() {
	var tags = $("#sbq").val();
	var newurl = "//www.derpibooru.org/search?utf8=%E2%9C%93&q=" + tags + "&min_score=&max_score=&sf=score&sd=desc&commit=Search";
	window.location.href = newurl;
}
$("input[value='Go']").after('<input type="button" value="Score" onclick="ForScore();" />');

// Remove "Scope" Crap
var allA = document.getElementsByTagName("a");
for (var i=0; i<allA.length; i++) {
	allA[i].href = allA[i].href.replace(/[?]{1}scope=scpe{1}\w+/g,"");
}