// ==UserScript==
// @name           Auto Reload every 10 seconds, used for Stock Quotation refresh
// @description    Auto reload a webpage, usually used for stock quotation pages 
// @author        dialox
// @namespace     http://userscripts.org/scripts/show/112519
// @version       20110923
// @include       http://www.etnet.com.hk/www/sc/stocks/realtime/quote.php?code=00700
// ==/UserScript==

(function () 
{
	setTimeout(window.location.reload,10000);
})();