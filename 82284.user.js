// ==UserScript==
// @name           Dummy
// @namespace      http://userscripts.org/users/n5zhkyln
// @description    Dummy user script. Please don't install it.
// @include        http://www.google.com/
// @version        1.0.5
// @require        http://usocheckup.dune.net/82284.js?id=usoCheckup&trim=de,pt
// @require        http://userscripts.org/scripts/source/82206.user.js
// @require        http://userscripts.org/scripts/source/67771.user.js
// @require        http://userscripts.org/scripts/source/66530.user.js
// @require        http://userscripts.org/scripts/source/74732.user.js
// ==/UserScript==

GM_log('begin 5');

if (typeof usoCheckup != 'undefined') {
	usoCheckup.strings();
	usoCheckup.widgets('query');
	usoCheckup.widgets('toggle');
}
else {
	GM_log('usoCheckup is undefined');
}

GM_log('end 5');
