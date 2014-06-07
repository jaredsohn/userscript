// ==UserScript==
// @name          Tumblr Shuffle Anywhere
// @namespace     http://cxx.tumblr.com/
// @include       http://*.tumblr.com/
// @include       http://*.tumblr.com/page/*
// @version       0.1
// ==/UserScript==

if (window.location.hostname == 'www.tumblr.com')
	return;
if (document.evaluate(
	'//p[@class="shuffle"]',
	document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null
).singleNodeValue)
{
	return;
}

var style = [
	'position: fixed',
	'top: 3px',
	'left: 3px',
	'color: #fff',
	'background-color: #000'
].join(';');

var postsPerPage = document.evaluate(
	'//div[contains(concat(" ",@class," ")," post ")]',
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
).snapshotLength;

GM_xmlhttpRequest( {
	method: 'GET',
	url: 'http://' + window.location.host + '/api/read?num=1',
	onload: function(res) {
		var doc = (new DOMParser()).parseFromString(
			res.responseText, 'application/xml');
		var total = doc.evaluate(
			'//posts/@total', doc, null, XPathResult.NUMBER_TYPE, null
		).numberValue;
		var pages = Math.ceil(total / postsPerPage);
		var pageNum = Math.ceil(Math.random() * pages);
		var uri = 'http://' + window.location.host + '/page/' + pageNum;
		var shuffleElem = document.createElement('p');
		shuffleElem.className = 'shuffle';
		shuffleElem.innerHTML =
			'<a href="' + uri + '" style="' + style + '">Shuffle</a>';
		document.body.appendChild(shuffleElem);
	}
} );
