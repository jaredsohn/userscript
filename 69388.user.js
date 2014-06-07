// ==UserScript==
// @name           Secure connections on sites (sans facebook)
// @namespace      http://userscripts.org/users/74740
// @description   http://userscripts.org/scripts/show/69388
// @description    Forces known sites to use a secure connection
// @include        http://*paypal.com/*
// @include        http://www.google.com/accounts/ServiceLogin?service=mail*
// @include        http://addons.mozilla.org/*
// @include        http://*isohunt.com/*
// @include        http://*evernote.com/*
// @include        http://*binsearch.info/*
// @include        http://*binsearch.net/*
// @include        http://mail.google.com/*
// @include        http://www.google.com/calendar/*
// @include        http://docs.google.com/*
// @include        http://spreadsheets.google.com/*
// @include        http://www.google.com/reader/*
// @include        http://www.google.com/bookmarks/*
// @include        http://www.google.com/history/*
// @include        http://www.google.com/notebook/*
// @include        http://groups.google.com/*
// @include        http://sites.google.com/*
// @include        http://*amazon.com/*
// @include        https://*amazon.com/*
// @include        http://*amazon.co.uk/*
// @include        https://*amazon.co.uk/*
// @include        http://www.opendns.com/*
// @include        http://eztv.it/*
// @include        http://orkut.com/*
// @include        http://www.orkut.co.in/*
// @include        http://*twitter.com/*
// @include        http://thepiratebay.org/*
// @include        http://*.zoho.com/*
// @include        http://*.wikileaks.org/*
// @include        http://alipay.com/*
// @include        http://*.xmarks.com/*
// @include        http://*friendfeed.com/*
// @include        http://twitpic.com/*
// @include        https://*
// @copyright      NJA
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

(function(){
var url = window.location.href;

if(url.indexOf("http://")==0) {
window.location.replace(location.href.replace(url.substring(0,7), "https://"));
}

if(url.indexOf("https://")==0) {
for(var i=0,link; (link=document.links[i]); i++) {
if(link.href.indexOf("http://")==0) link.href = link.href.replace(link.href.substring(0,7), "https://");
}
}
})();