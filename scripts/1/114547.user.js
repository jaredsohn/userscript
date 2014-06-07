// ==UserScript==
// @name          Fieldgulls Declutter
// @include       http://fieldgulls.com/*
// @include       http://www.fieldgulls.com/*
// ==/UserScript==

var link = document.createElement('LINK');
link.rel = 'stylesheet';
link.href = 'danielgenser.com/fieldgulls-restyle.css';
link.type = 'text/css';
document.body.insertBefore(link, null);