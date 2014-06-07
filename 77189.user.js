// ==UserScript==
// @name           Remora?
// @namespace      https://addons.mozilla.org/
// @include        https://*.addons.mozilla.org/*
// ==/UserScript==

if (document.doctype.publicId == '-//W3C//DTD XHTML 1.0 Strict//EN') {

    document.getElementById('title').innerHTML += '<blink>REMORA</blink>';

}
