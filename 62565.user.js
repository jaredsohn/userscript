// ==UserScript==
// @name           Friends For Sale Coin Finder
// @namespace      FriendsForSale
// @description    CoinFinder
// @include        http://apps.facebook.com/friendsforsale/users/show/*
// Friends For Sale Coin Bot
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);


// Check if jQuery's loaded

    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
	
	window.setTimeout(GM_wait,5000);
	// All your GM code must be inside this function
    function letsJQuery() {
		if(window.location == "http://apps.facebook.com/friendsforsale/users/show/null")
		{
			window.location = "http://apps.facebook.com/friendsforsale/users/show/139739423";
		}
		else
		{
			// Find out if the coin on the website.
			// Note that querySelectorAll is only available in Firefox 3.5 and above
			var coin = document.querySelectorAll("#app7019261521_hover_container > [id^=app7019261521_the_coin]");
			if (coin.length == 1) {
				var c = coin[0].firstChild;
				var value = parseInt($(c).text());
				// 500k - 999k is a mock value, FFS use it to detect bots
				if (value >= 700 && value <= 999) {
					var prev = document.querySelector("a.prev");
					window.location = prev;
				} else {
					window.location = c.href;
				}
			} else if (coin.length == 0) {
				var prev = document.querySelector("a.prev");
				window.location = prev;
			}
		}
    }