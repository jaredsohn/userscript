// ==UserScript==

// @name           Don't LMGTFY

// @namespace      http://userscripts.org/users/Logg

// @description    Skips over LMGTFY page, and redirects you to the relevant Google Search.

// @include        http://lmgtfy.com/?q=*
// @include        http://www.lmgtfy.com/?q=*

// @version        0.4

// ==/UserScript==

if (location.href.substr(7,3)=="www") {

	window.location = "http://www.google.com/search?hl=en&q=" + location.href.substr(25, location.href.length)

} else {

	window.location = "http://www.google.com/search?hl=en&q=" + location.href.substr(21, location.href.length)

	}