// ==UserScript==
// @name           Google UK to Global
// @namespace      google_uk2global@snakehole.net
// @description    Redirects you from Google UK to Google's global site while keeping your search intact.
// @include        http://*google.com*
// @include        http://*google.co.uk*
// ==/UserScript==

var re=/google.co.uk/;
if (location.href=="http://www.google.co.uk/"){
		window.location='http://www.google.com/ncr';
}else if (location.host.match(re)){
		var newHost=location.host.replace(re,'google.com');
		window.location='http://' + newHost + location.pathname + location.search;
}
