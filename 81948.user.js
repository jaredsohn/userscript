// ==UserScript==
// @name           RedditPaintball
// @namespace      asmw.de
// @description    Enables marking usernames in comment threads
// @include        http://www.reddit.com/*/comments/*
// @include        http://reddit.com/*/comments/*
// ==/UserScript==

function paintball() {
	var alreadyLoaded = false;

	// Check if jQuery's loaded
	function GM_wait() {
		if (typeof $ != 'undefined') { setup(); } //Opera
		else if (typeof this.jQuery != 'undefined') { $ = this.jQuery; setup(); } //Chrome
		else if (typeof unsafeWindow != 'undefined' && typeof unsafeWindow.jQuery != 'undefined') { $ = unsafeWindow.jQuery; setup(); } //Firefox
		else window.setTimeout(GM_wait, 100);
	}

	GM_wait();

	function randomColor() {
		// Borrowed from itsnotlups from reddit, please give it back if you meet him
		function r(r){return ("0"+Math.floor(Math.random()*r).toString(16)).substr(-2)}
		return '#'+r(200)+r(200)+r(200);
	}

	function setup() {
		// Set so this only loads once
		alreadyLoaded = true;
		// Add the paint-knob on all authors
		$('a.author').each(function(idx) {
				var pbClass = 'pb' + $(this).text()
				$(this).addClass(pbClass).after("<a>[pb]</a>").next().click(function(){
			                $('.'+pbClass).css('color', randomColor());
				});
			}
		);
			
	}

}

//Load it into the window so we can use local vars
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + paintball + ")();";
document.body.appendChild(script);
