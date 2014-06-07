// ==UserScript==
// @name           F.F.S.Coinfinder below the belt
// @namespace      FriendsForSale
// @description    CoinFinder
// @include        http://apps.facebook.com/friendsforsale/users/show/*
// Friends For Sale Coin Bot
// ==/UserScript==
//i've just edited some of the scripts and added it here. Original post was from "morizuki" thanks for the script, i just want to get higher cash so i edited your script. hahaha thanks again.

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
	
// All your GM code must be inside this function
    function letsJQuery() {
		// Find out if the coin on the website.
		// Note that querySelectorAll is only available in Firefox 3.5 and above
        var coin = document.querySelectorAll("#app7019261521_hover_container > [id^=app7019261521_the_coin]");
		if (coin.length == 1) {
			var c = coin[0].firstChild;
			var value = parseInt($(c).text());
			// 500k - 999k is a mock value, FFS use it to detect bots
			//But i want large cash so i'll just take the risk haha
			if (value >= 800 && value <= 999) {
				window.location.reload();
			} else {
				window.location = c.href;
			}
		} else if (coin.length == 0) {
			window.location.reload();
		}
		window.setTimeout("window.location.reload();", 1000);
    }