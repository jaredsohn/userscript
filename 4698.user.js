// ==UserScript==
// @name           Search Accessibility
// @namespace      http://www.arantius.com/misc/greasemonkey/
// @description    Enhance Google and Yahoo search results to be accessible from the keyboard.
// @require        http://arantius.com/misc/greasemonkey/imports/dollarx.js
// @include        https://encrypted.google.tld/search?*
// @include        https://www.google.tld/search?*
// @include        https://www.google.tld/custom?*
// @include        http://www.google.tld/search?*
// @include        http://www.google.tld/custom?*
// @include        http://search.yahoo.tld/search?*
// ==/UserScript==

var results=null, input=null;
if (document.location.host.match('yahoo')) {
	results=$x("//a[@class='yschttl']");
	input=document.getElementById('yschsp');
} else {
	results=$x(
		"//*[@class='g' or starts-with(@class, 'g ')]"
		+"//h3/a[@class='l' or starts-with(@class, 'l ')]"
	);
	input=$x('//input[@name="q"]')[0];
}

// set tabindex for search box
input.tabIndex=5;

// set tabindex for the search results
for (var i=0, el; el=results[i]; i++) {
	el.tabIndex=i+10;
}

// focus the first search result
results[0].focus();
// do a fake request, to the first result, to prime DNS and page cache
GM_xmlhttpRequest({
	'method': 'GET',
	'url': results[0].href,
});
