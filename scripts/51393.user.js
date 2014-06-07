// ==UserScript==
// @name           Clean'n'Readable
// @namespace      http://onyxstone.stumbleupon.com/
// @description    Very small script that solves the problem of low-contrast, overstyled and plain unreadable su blogs. It collapses all custom backgrounds, sets bg color to white and font color to black.
// @include        http://*.stumbleupon.com/*
// @license        (c) ONYXSTONE ( http://onyxstone.stumbleupon.com/ )
// ==/UserScript==


$ = window.wrappedJSObject.$;

$('#stylepreview').attr('disabled', 'true');
$('#blogEntries ul.submenu').attr('style','display:none !important;');
$('table.bcard ul.submenu').attr('style','display:none !important;');

$('#blogEntries font').attr('color', '#1A1A1A !important;');
//$('div.nav').attr('style','display:none;');
