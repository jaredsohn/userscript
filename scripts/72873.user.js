// ==UserScript==
// @name         Zend Framework Component Navigation
// @namespace    http://cmorrell.com
// @description  Adds a page-level navigation element to the ZF documentation
// @version      0.1
// @include      http://framework.zend.com/manual/*
// @author       Chris Morrell <http://cmorrell.com>
// @homepage     http://cmorrell.com/
// ==/UserScript==

var dojo = unsafeWindow.dojo;
var sections = dojo.query('.section');
var toc = '<h2>Page Navigation</h2><div class="block-in"><ul class="manual toc">';

var depthModifier = sections[0].id.split('.').length;
for (var i = 1, len = sections.length; i < len; ++i) {
	depth = sections[i].id.split('.').length - depthModifier;
	toc += '<li class="'
	if (0 == depth) {
		toc += 'header home'
	} else if (1 == depth) {
		toc += 'header up';
	}
	toc += '"><a href="#' + sections[i].id + '">';
	toc += dojo.query('h1', sections[i]).innerHTML();
	toc += '</a></li>';
}
toc += '</ul></div>';

var block = dojo.create('div', {className: 'block', innerHTML: toc});
dojo.query(block).place(dojo.query('div.right-nav'), 'first');