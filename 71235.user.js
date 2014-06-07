// ==UserScript==
// @name           	WebsenseAutoRedirect
// @namespace     Websense AutoRedirect
// @description    Auto Redirects
// @include        	http://10.0.100.5:15871/cgi-bin/block_message.cgi?ws-session=*
//@author		Tubutas
// ==/UserScript==

var elem = document.getElementById('url-text').innerHTML;
document.location.href="http://tubutas.gotdns.com/Browse/?q=" + elem;
