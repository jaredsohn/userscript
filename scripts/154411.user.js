// ==UserScript==
// @name           Load client library on any website
// @description    Load the client library!
// @author         mgnb
// @version        1.5
// @include        http://*carsales.com.au*
// @include        https://*carsales.com.au*
// @include        http://*motoring.com.au*
// @include        https://*motoring.com.au*

// ==/UserScript==

(function() {
var pips = document.createElement('script'); pips.type = 'text/javascript'; pips.async = true;
pips.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + '//d2ruodrkdzylns.cloudfront.net/pipclient/current/client-library/pips.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pips, s);
})();