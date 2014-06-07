// ==UserScript==
// @name           Facebook Article Fixer
// @description    Makes Facebook news articles lead to the right spot.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @version        1beta
// @include        http://facebook.com*
// @include        http://www.facebook.com*
// @include        https://facebook.com*
// @include        https://www.facebook.com*
// ==/UserScript==
// Code by Aerobit

fixLinks("#content");
$(".UIStream").bind("DOMNodeInserted", function(event) { 
    fixLinks(event.target);
});	

function fixLinks(search) {
	$(search).find(".newsReadsNormalItemContent a").each(function() {
			var header = $(this).attr("header");
			var newsname = $(this).attr("data-newsname");
			$(this).parent().css("color", "#3B5998");
			$(this).parent().mouseover(function() {
				$(this).css({
					"text-decoration" : "underline",
					"cursor" : "pointer"
				});
			});
			$(this).parent().mouseout(function() {
				$(this).css({
					"text-decoration" : "none",
					"cursor" : "auto"
				});
			});
			$(this).parent().click(function(event) {
				if (newsname != "The Guardian") {
					window.open('http://www.google.com/search?q=' + header + ' ' + newsname + '&btnI=I\'m Feeling Lucky');
				}
				else {
					window.open('http://www.google.com/search?q=' + header + ' ' + newsname);
				}
			});
			$(this).parent().html(header);
		});
}