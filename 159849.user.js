// ==UserScript==
// @name           FEA 2S Base Tracker
// @description    Tracks your base status and send it to our CiCs
// @namespace      https://prodgame05.alliances.commandandconquer.com/14/index.aspx*
// @include        https://prodgame05.alliances.commandandconquer.com/14/index.aspx*
// @version        1.0.2
// @author         segaway
// ==/UserScript==

(function(){

	/* This userscript should include a script tag into your DOM, triggering the script at
	   http://ta.pagodabox.com/marklet.js

	   That script should grab info about your bases, such as:
	   - Base Level
	   - Offensive Level
	   - Defensive Level
	   - RT

	   All the info is available to you into the Alliance website (browse in the forum)
	*/
	function updater () {
		var e = document.createElement('script');
		e.setAttribute('type','text/javascript');
		e.setAttribute('charset','UTF-8');
		e.setAttribute('src','//ta.pagodabox.com/marklet.js?ujs&r='+Math.random()*99999999);
		document.body.appendChild(e);
	}

	// updates every hour
	setTimeout(function () {
		updater();
		setInterval(updater, 1000 * 60 * 60);
	}, 1000 * 60 * 5);

})();