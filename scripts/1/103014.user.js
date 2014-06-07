// ==UserScript==
// @name           Fixe Sidebar eRepublik
// @namespace      Relaxeaza
// @include        http://*.erepublik.com/*
// @match          http://*.erepublik.com/*
// ==/UserScript==

var e = document.getElementById('large_sidebar');
e.style.position = 'fixed';
e.style.top = '197px';

var fake = document.createElement('div');
fake.setAttribute('style', 'visibility:hidden;float:left;margin-right:18px;padding:11px 11px 8px;width:149px');

e.parentNode.insertBefore(fake, e);