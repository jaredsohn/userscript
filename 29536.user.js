// ==UserScript==
// @name Facebook Share
// @description Share a page on Facebook
// @include http*://*
// ==/UserScript==

var linkhref = 'http://www.facebook.com/sharer.php?u=' +
encodeURIComponent(window.location.href);
var b = document.body.firstChild;
var a = document.createElement('a');
a.href = linkhref;
a.appendChild(document.createTextNode('Share on Facebook!'));
document.body.insertBefore(a,b);
