// ==UserScript==
// @name			GTAMotorcycle.com - Verbose Search Results in vBulletin
// @namespace		http://grabka.org/
// @description		Expands the texts of the search results in vBulletin forums
// @include			http://www.gtamotorcycle.com/vbforum/search.php*
// @version 0.0.1
// ==/UserScript==


// The require keyword didn't work, so we have to manually add jQuery
// thanks to http://joanpiedra.com/jquery/greasemonkey/

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery;
		doStuff();
	}
}

GM_wait();

// actual page stuff goes here

function doStuff() {

	$(document).ready(function() {

		var divs = $("#threadslist .alt1 div.smallfont");

		for (i = 0;i < divs.length ; i++)
		{
			var d = divs.slice(i,i+1);			
			var uname = d.text().replace(/^\s*|\s*$/g,'');
			var title = d.parent().attr("title");
			d.text(uname + " says " + title);
		}

	});
}