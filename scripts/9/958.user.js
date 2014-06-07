// BBC News Width Adjust
// v3 25 May 2005
// Increases the width of the main text column of BBC News website stories. Useful for wider resolutions, ie. 1280 and above.
// Applies itself to BBC News text story pages - but not index pages as it makes them look naff.
// If you want the stories even wider, just change the two '800' figures.
// Post suggestions here: http://www.ianferguson.me.uk/greasemonkey.asp

// ==UserScript==

// @name        BBC News Width Adjust
// @namespace   http://www.ianferguson.me.uk/greasemonkey.asp
// @description Increases the width of the main text column of BBC News website stories
// @include http://news.bbc.co.uk/1/hi/*
// @include http://news.bbc.co.uk/2/hi/*
// @exclude http://news.bbc.co.uk/1/hi/default.stm
// @exclude http://news.bbc.co.uk/1/hi/*/default.stm
// @exclude http://news.bbc.co.uk/2/hi/default.stm
// @exclude http://news.bbc.co.uk/2/hi/*/default.stm

// ==/UserScript==

(function() {
 var blah = window._content.document.getElementsByTagName("td");
 for (var blip = 0; blip < blah.length; blip++) { if (blah[blip].width == "416") blah[blip].width = "800" }
 var blah = window._content.document.getElementsByTagName("table");
 for (var blip = 0; blip < blah.length; blip++) { if (blah[blip].width == "416") blah[blip].width = "800" }
})();