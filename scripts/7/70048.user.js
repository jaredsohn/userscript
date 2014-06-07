// ==UserScript==
// @name Stop Stephen's Madness!
// @namespace NicolasZN
// @description Stops Stephen's red notice madness
// @include http://if.invisionfree.com/*
// ==/UserScript==

$ = unsafeWindow.jQuery;
jQ_ready();

function jQ_ready() {
$("#shoutwrap tbody tr:first").remove();
}