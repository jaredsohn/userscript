// ==UserScript==
// @name        text/plain monospace font for Gmail
// @description Displays text/plain Gmail messages in monospace font for enhanced readability.
// @namespace   http://code406.com/GmailTextPlainMonospace
// @grant       GM_addStyle
// @include     http://mail.google.com/*
// @include     https://mail.google.com/*
// @version     1

// ==/UserScript==

GM_addStyle(".ii { font-family: monospace !important; font-size: small !important; }; .Ak { font-family: monospace !important; font-size: small !important; }; table tbody tbody tr td font { font-family: monospace !important; font-size: small !important; }");