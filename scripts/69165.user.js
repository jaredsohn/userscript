// ==UserScript==
// @name           Change Yahoo! Finance link to go to Google Finance
// @namespace      http://intranet-v.volition.net/
// @description    The link on the intranet goes to Yahoo!, which has a terrible interface
// @include        http://intranet-v.volition.net/
// ==/UserScript==

function changeYahooFinanceToGoogleFinance() {
	var yahooLink = "http://finance.yahoo.com/q?s=THQI";
	var googleLink = "http://finance.google.com/finance?q=NASDAQ:THQI";
	var links = document.getElementsByTagName("a");
	for (i = 0; i < links.length; i++) {
		if (links[i].href == yahooLink) {
			links[i].href = googleLink;
		}
	}
}

changeYahooFinanceToGoogleFinance();
