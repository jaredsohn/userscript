// ==UserScript==
// @name          Twends
// @namespace     http://www.dweebsonduty.com
// @description	  Add Information To Twitter Trends (Thanks to http://whatthetrend.com/)
// @author        Shane Burgess
// @homepage      http://www.dweebsonduty.com
// @include       http://www.twitter.com/*
// @include       http://twitter.com/*
// ==/UserScript==

//var stuff = xmlhttpPost("http://dweebsonduty.com/twends.php");

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://dweebsonduty.com/twends.php',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        document.getElementById("trends").innerHTML=responseDetails.responseText;
    }
});