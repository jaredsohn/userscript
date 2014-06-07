// SecureTorrents
// Version 0.2
// Started 2010-04-16
// Author DrMacinyasha
//
//
// ==UserScript==
// @name          SecureTorrents
// @description   Forces ThePirateBay and Torrentz to use secure connections.
// @include       http://thepiratebay.org/*
// @include       http://www.thepiratebay.org/*
// @include       http://torrentz.com/*
// @include       http://www.torrentz.com/*
// @include       https://www.thepiratebay.org/*
// @include       https://torrentz.com/*

// ==/UserScript==

var url = window.location.href;

// Switch to the right domain...

// Torrentz to www.
if (url.substring(7,15) == 'torrentz') {
window.location.replace(url.replace(url.substring(7,15), 'www.torrentz'));
}
// Same as above, SSL'd.
if (url.substring(8,16) == 'torrentz') {
window.location.replace(url.replace(url.substring(8,16), 'www.torrentz'));
}

// www. to TPB
if (url.substring(7,23) == 'www.thepiratebay') {
window.location.replace(url.replace(url.substring(7,23), 'thepiratebay'));
}
// Again...
if (url.substring(8,24) == 'www.thepiratebay') {
window.location.replace(url.replace(url.substring(8,24), 'thepiratebay'));
}

// The main course: Switch to SSL!
if (url.substring(0,7) == 'http://') { 
window.location.replace(url.replace(url.substring(0,7), 'https://')); 
}

//
// ChangeLog
// 0.1 - 2010-04-16 - Used Google Secure Pro 1.5 Greasemonkey script as basis, modified for TPB and Torrentz.
// 0.2 - 2010-04-16 - Modified, redirects to domain which matches the SSL certificate in order to avoid SSL mismatch errors.