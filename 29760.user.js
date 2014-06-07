// ==UserScript==
// @name           TwitterReplies
// @namespace      http://eden.com
// @include        http://twitter.com/home*
// ==/UserScript==\

var sideElem = document.getElementById('side');
if (!sideElem) return;
var sectionHeaderElem = sideElem.getElementsByTagName('div')[0].getElementsByTagName('div')[0];
if (!sectionHeaderElem) return;
var m = /http:\/\/twitter.com\/(.*)$/.exec(sectionHeaderElem.getElementsByTagName('a')[0].getAttribute('href'));
if (!m) return;

var contentElem = document.getElementById('content');
if (!contentElem) return;
var hrefElem = contentElem.getElementsByTagName('li')[1].firstChild;
hrefElem.setAttribute('href', 'http://summize.com/search?q=%40' + m[1]);