// ==UserScript==
// @name          Last Search
// @namespace     http://badcheese.com
// @description   script to detect search clicks
// @include       *
// ==/UserScript==

if (/^http:\/\/www\.google\.com\/search/.test(document.referrer)) {
	var myurl = document.URL;
	if (/^http:\/\/www\.google\.com/.test(myurl)) {
		// second search page - ignore it
	} else {
		var thequery = document.referrer.match(/q=([\s%'"\w\n\+\.-]*)\&/);
		var thequery2 = thequery[1].replace(/\+/g," ");
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://badcheese.com/~steve/lastsearch.php?query='+thequery2+'&url='+myurl,
			headers: {
				'User-agent': 'Greasemonkey LastSearch script',
				'Accept': 'application/atom+xml,application/xml,text/xml'
			},
			onload: function(responseDetails) {
//				GM_log('Sent query to server: '+thequery2+'('+thequery[1]+')');
			}
		});
	}
}
