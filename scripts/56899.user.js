// ==UserScript==
// @name           BBC News Sport Headline Hider
// @description    Hides the sport headlines from the BBC News home page
// @include        http://news.bbc.co.uk/
// @include        http://news.bbc.co.uk/1/hi/default.stm
// @include        http://news.bbc.co.uk/1/hi/world/*default.stm
// @include        http://news.bbc.co.uk/1/hi/uk/default.stm
// @include        http://news.bbc.co.uk/1/hi/england/default.stm
// @include        http://news.bbc.co.uk/1/hi/northern_ireland/default.stm
// @include        http://news.bbc.co.uk/1/hi/scotland/default.stm
// @include        http://news.bbc.co.uk/1/hi/wales/default.stm
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(function() {
	$("a:contains('SPORT')").parent().hide().next().hide().next().hide();
	// I can't figure out how to manipulate the animated ticker items, so we
	// hide the fancy ticker and show the non-Javascript version which is easier
	// to mess with.
	var noscript = $("noscript:first");
	if (noscript.size() > 0) {
		var replacement = $(noscript.text());
		replacement.find("[href*='sport']").parent().parent().remove();
		noscript.replaceWith(replacement);
	}
	
	// We want to remove the #tickerHolder element, but the style it
	// has is important for making sure that the element after it
	// (our replacement above) is placed correctly.
	var holder = $("#tickerHolder");
	if (holder.size() > 0) {
		var empty = $("<div/>");
		empty.css("height", holder.css("height"));
		empty.css("position", holder.css("position"));
		holder.replaceWith(empty);
	}
});
