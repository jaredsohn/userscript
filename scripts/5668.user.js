// ==UserScript==
// @name           Your del.icio.us bookmarks first
// @namespace      http://www.planb-security.net/userscripts
// @description    Ensure that your bookmarks is the default search scope for del.icio.us.
// @include        http://del.icio.us/*
// ==/UserScript==

// Note: Change * to your user name to limit the scope of this script.

(function () {
	document.forms[0].elements[2].selectedIndex = 0;
})();
