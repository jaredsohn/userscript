// ==UserScript==
// @name       Steam market license auto-agree
// @namespace  http://fb.com/LoLzoolt4n
// @version    0.1
// @description	Auto checks the agreement box
// @include	http://steamcommunity.com/market*
// @match      http://steamcommunity.com/market*
// @copyright  avenhil aka zoolt4n
// ==/UserScript==
	
unsafeWindow.document.getElementById('market_buynow_dialog_accept_ssa').checked = true;
