// ==UserScript==
// @name        bartend baby
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

$(function() {
	if (window.top != window.self)  //-- Don't run on frames or iframes
  		return;
  	var link = $("a:contains('Bartenders')").add("a:contains('Bartender')").add("a:contains('Sign Up Now')");
  	var linkLength = link.length;
    for (var i = 0; i < linkLength; i++) {
        var linkURL = $(link[i]).attr('href');
        window.open(location.protocol + "//" + location.host + "/" + linkURL);
    }
});