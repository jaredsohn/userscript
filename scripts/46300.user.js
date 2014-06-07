// ==UserScript==
// @name           fuqEE
// @description  This script will get the page from Expert Excchange without any user intervention. It works like a charm :-)
// @include        http://www.experts-exchange.com/*.html
// @author    Saurabh Minni
// ==/UserScript==
var loc = window.location.toString();
GM_xmlhttpRequest({
    method: 'GET',
    url: loc,
    headers: {
        'User-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': '*//*',
		'From':'googlebot(at)googlebot.com',
    },
    onload: function(responseDetails) {
		var holder = document.getElementsByTagName('html')[0];
		holder.innerHTML = responseDetails.responseText;

    }
});
