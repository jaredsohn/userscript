// ==UserScript==
// @name           HTML Google Reload
// @namespace      http://userscripts.org/users/343879
// @description    Reloads the basic HTML version of Gmail every minute
// @include        https://mail.google.com/mail/u/0/h/*
// @exclude        https://mail.google.com/mail/u/0/h/*/?v*
// ==/UserScript==

setTimeout(function(){document.location.reload();} , 60 * 1000);