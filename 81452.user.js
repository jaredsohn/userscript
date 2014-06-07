// ==UserScript==
// @name           RedRedditAuthor
// @namespace      asmw.de
// @description    Marks comments by the author of a topic on a reddit thread 
// @include        http://www.reddit.com/*/comments/*
// @include        http://reddit.com/*/comments/*

// Inspired by: http://userscripts.org/scripts/review/66932

// ==/UserScript==

function redRedditAuthor() {
	// Configuration begin
	var bgColor = '#33ffff';
	var fgColor = '#000000';
	// Configuration end

	var alreadyLoaded = false;

	// Check if jQuery's loaded
	function GM_wait() {
		if (typeof $ != 'undefined') { setup(); } //Opera
		else if (typeof this.jQuery != 'undefined') { $ = this.jQuery; setup(); } //Chrome
		else if (typeof unsafeWindow != 'undefined' && typeof unsafeWindow.jQuery != 'undefined') { $ = unsafeWindow.jQuery; setup(); } //Firefox
		else window.setTimeout(GM_wait, 100);
	}

	GM_wait();

	function paintTownRed(author) {
		$('.entry .author').filter(function(index) {
		  return this.text == author;
		}).css('backgroundColor', bgColor).css('color', fgColor);
	}

	function setup() {
		//Set so this only loads once
		alreadyLoaded = true;
		//Get all entries from the page
		var author = $("#siteTable .entry .author").html();
		paintTownRed(author);
	}

}


//Load it into the window so we can use local vars
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + redRedditAuthor + ")();";
document.body.appendChild(script);
