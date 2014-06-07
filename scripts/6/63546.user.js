// ==UserScript==
// @name           Friends For Sale Coin Finder(ProxyServer 1)
// @namespace      FriendsForSale
// @description    CoinFinder
// @include        http://server1.kproxy.com/servlet/redirect.srv/sruj/styznrqpv/skijv/p1/friendsforsale/users/show/*
// @author		   Raymond Go Ho
// Friends For Sale Coin Bot
// Buy me to thank me:: http://apps.facebook.com/friendsforsale/users/show/133485519
// Thank you for using this!!
// jQuery Loader is authored by Joan Piedra: http://joanpiedra.com/jquery/greasemonkey/
// Thanks Joan for making the wonderful script
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
    GM_wait();
	
// All your GM code must be inside this functio
    function letsJQuery() {
		// Find out if the coin on the website.
		// Note that querySelectorAll is only available in Firefox 3.5 and above
        var coin = document.querySelectorAll("#app7019261521_hover_container > [id^=app7019261521_the_coin]");
		if (coin.length == 1) {
			var c = coin[0].firstChild;
			var value = parseInt($(c).text());
			// 500k - 999k is a mock value, FFS use it to detect bots
			if (value >= 500 && value <= 999) {
				window.location.reload();
			} else {
				window.location = c.href;
			}
		} else if (coin.length == 0) {
			window.location.reload();
		}
		window.setTimeout("window.location.reload();", 1000);
    }
	
