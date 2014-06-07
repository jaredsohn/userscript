// ==UserScript==
// @name           Science snippet expander
// @namespace      geological-supplies.com
// @description    Expands summeries of articles, if you have permission
// @include        http://www.sciencemag.org*/cgi/content/summary/*
// ==/UserScript==

window.location.href = window.location.href.replace('summary', 'full');