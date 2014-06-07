// ==UserScript==
// @name           Gmail Logout Redirector
// @namespace      something
// @include        http://www.google.com/mail/help/intl/en_us/logout.html#hl=en&c=us
// @include        http://www.google.com/mail/help/intl/en_us/logout.html#hl=en&c=us
// @run-at         document-start
// ==/UserScript==

location.href=location.href.replace("help/intl/en_us/logout.html#hl=en&c=us","");