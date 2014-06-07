// ==UserScript==
// @name           Bookmarkable Schedule Lookup
// @namespace      http://freecog.net/2008/
// @description    Converts the POST form to a GET, which makes the result pages bookmarkable.
// @include        https://prodweb.rose-hulman.edu/regweb-cgi/reg-sched.pl*
// ==/UserScript==

Array.forEach(document.getElementsByName('InputForm'), function(form) {
	form.method = 'GET';
});

