// ==UserScript==
// @name           Skip lmgtfy
// @namespace      http://userscripts.org/users/501085
// @description    bypass lmgtfy.com and go straight to Google Search.
// @include        http://lmgtfy.com/?q=*
// @include        http://*.lmgtfy.com/?q=*
// @match          http://lmgtfy.com/?q=*
// @match          http://*.lmgtfy.com/?q=*
// @run-at         document-start
// @version        1.0
// ==/UserScript==

// would rather not lose lmgtfy from back button.
// helps curiosity and debugging, allows recovering from fails
// it's not important enough to die if pushState is not available
if (history && history.pushState) { history.pushState(); }

// if you need to change both .host and .pathname
// you can't do it directly to location.
// changing one in a single statement will stop script execution and redirect the page
var a = document.createElement('a');
with(a) {
	href = location.href;
	host = "google.com";
	pathname = "/search";
}
location.href = a.href;
