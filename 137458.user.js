// ==UserScript==
// @name        Redirect Labnol
// @namespace   http://domain.com/directory
// @description Redirect Labnol to Google Cache of Labnol
// @include     http://www.labnol.org/*
// ==/UserScript==

var newurl = window.location.href.replace(/^http?:\/\/(www\.)?labnol.org/, 'http://webcache.googleusercontent.com/search?q=cache:labnol.org');
newurl = newurl.replace(/#!\/(.*)/, '$1');
window.location.href = newurl;