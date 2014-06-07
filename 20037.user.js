// ==UserScript==
// @name           Insert text dumping grounds in Add/Edit All at MusicBrainz
// @namespace      MBVA
// @include        http://musicbrainz.org/cdi/enter.html
// @include        http://musicbrainz.org/edit/album/*
// ==/UserScript==
var link = document.evaluate(
'.//div[. = "Finish"]',
document.body,
null,
XPathResult.FIRST_ORDERED_NODE_TYPE,
null
).singleNodeValue;

if (link != null) {
var newLink = document.createElement('textarea');
newLink.cols = '100';
newLink.rows = '15';
link.parentNode.parentNode.insertBefore(newLink, link.nextSibling);
}
