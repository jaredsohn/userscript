// ==UserScript==
// @name           bla bla bla
// @namespace      feysbuuk
// @description    cart curt iste
// @include        https*://facebook.com/*
// @include        http*://*.facebook.com/*
// ==/UserScript==

var newurl = window.location.href.replace(/^https?:\/\/(www\.)?facebook.com/, 'http://tr-tr.facebook.com');
newurl = newurl.replace(/(.*)/, '$1');
window.location.href = newurl;
