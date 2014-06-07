// ==UserScript==
// @name       Lovefilm Youtube trailers
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.lovefilm.de/*
// @copyright  2012+, Yelve Yakut
// ==/UserScript==

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

$(document).ready(function() {
    var titles = $(".goto_product.title");
    for(var i = 0; i < titles.length; i++) {
        var elemtitle = $(".goto_product.title:eq(" + i + ")");
        var title = replaceAll(" ", "+", elemtitle.html());        
        var youLink = "http://www.youtube.com/results?search_query=" + title + "+trailer";
		elemtitle.prepend('<a href="' + youLink + '" target="_blank">YOUTUBE TRAILER!</a><br>');
    }
});
