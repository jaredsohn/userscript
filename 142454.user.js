// ==UserScript==
// @name        Weave MetaCPAN into search.cpan.org results
// @namespace   http://plasmasturm.org/
// @include     http://search.cpan.org/search?*
// @version     2
// @grant       none
// ==/UserScript==

var _rx = new RegExp('^/~([^/]+)(.*)');
var urx = new RegExp('^https://metacpan.org/module/([^/]+)/$');
var rrx = new RegExp('^https://metacpan.org/module/([^/]+/[^/]+)/$');
var anchors = Array.prototype.slice.call(document.querySelectorAll('a[href^="/~"]'));
anchors.forEach(function(anchor){
	var href = anchor.getAttribute('href');
	href = href.replace(_rx, function (m,p1,p2) { return 'https://metacpan.org/module/' + p1.toUpperCase() + p2 });
	href = href.replace(urx, 'https://metacpan.org/author/$1');
	href = href.replace(rrx, 'https://metacpan.org/release/$1');
	anchor.href = href;
});

var query = document.querySelector('input[type=text]').value;
if (query) {
	document.querySelector('.t4 small').insertAdjacentHTML('beforeend',' <a id="goto-metacpan">&#x2192; MetaCPAN</a>');
	var link = document.getElementById('goto-metacpan');
	var href = 'https://metacpan.org/search?q=' + encodeURIComponent(query);
	link.href = href.replace(/%20/g,'+');
	link.style.setProperty('float','right');
	link.style.setProperty('padding-right','.4em');
	link.style.setProperty('color','inherit');
}