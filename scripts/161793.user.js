// ==UserScript==
// @name           JournalStar.com Paywall Blocker
// @version        2013.05.15
// @author         tbush
// @namespace      https://userscripts.org/users/509004
// @description    Yet another paywall blocker for a local paper.
// @include        http://*.journalstar.com/*
// @include        http://journalstar.com/*
// @include        http://huskerextra.com/*
// ==/UserScript==

paywall = document.getElementById('paywall-code');
mask = document.getElementById('exposeMask');

paywall.parentNode.removeChild(paywall);
mask.parentNode.removeChild(mask);