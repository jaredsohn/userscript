// ==UserScript==
// @name Google Voice SMS Expander FIXED
// @description Expands the "more messages" link in all Google Voice SMS conversations.  Taken from http://userscripts.org/scripts/show/69215 and adapted the include path to exclude the last slash.
// @include https://www.google.com/voice*
// ==/UserScript==

GM_addStyle(".gc-message-sms-old { display: block !important; } .gc-message-sms-more { display: none !important; }");