// Show Short Link
// v0.1

// Copyright (C) 2010  Jeffery To (jeffery.to @gmail.com)

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ==UserScript==
// @name           Show Short Link
// @namespace      http://www.thingsthemselves.com/greasemonkey/
// @description    Shows short links for pages that have this metadata in the bottom left corner of the window
// @include        http://*
// ==/UserScript==

// Todo:
// - Sexy animations, perhaps

// Changelog:

// v0.1 (2010-05-28)
// - Initial version

(function() {
	var bugcss = {
			background: '#fff',
			border: '2px solid #333',
			'border-bottom': 0,
			'-moz-border-radius-topleft': '5px',
			'-webkit-top-left-border-radius': '5px',
			'border-top-left-radius': '5px',
			'-moz-border-radius-topright': '5px',
			'-webkit-top-right-border-radius': '5px',
			'border-top-right-radius': '5px',
			bottom: 0,
			display: 'block',
			left: '20px',
			margin: 0,
			overflow: 'hidden',
			padding: '5px 10px',
			position: 'fixed',
			visibility: 'visible',
			'z-index': 9999
		},
		textcss = {
			background: '#fff',
			color: '#333',
			font: '16px/16px helvetica,arial,sans-serif'
		},
		linkcss = {
			color: '#00f',
			'text-decoration': 'underline'
		},
		spancss = {
			display: 'none',
			'margin-left': '10px',
			'margin-right': '12px'
		},
		closecss = {
			color: '#333',
			display: 'none',
			position: 'absolute',
			right: '5px',
			'text-decoration': 'none',
			top: 0
		},
		rels = [
			// do we need to consider spaces ("short link") ?
			/\bshortlink\b/, /\bshort_link\b/, /\bshort-link\b/,
			/\bshorturl\b/, /\bshort_url\b/, /\bshort-url\b/,
			/\bshorturi\b/, /\bshort_uri\b/, /\bshort-uri\b/
		],
		shortlink, div, a, span, x, timeoutId;

	// find short link

	each(['link', 'a'], function (i, tag) {
		each(document.getElementsByTagName(tag), function (j, link) {
			// look at link.rel
			each(rels, function (k, rel) {
				if (rel.test(link.rel)) {
					shortlink = link.href;
				}
				return !shortlink;
			});
			// then try rev="canonical"
			if (!shortlink && /\bcanonical\b/.test(link.rev)) {
				shortlink = link.href;
			}
			return !shortlink;
		});
		return !shortlink;
	});

	if (!shortlink) {
		return;
	}



	// add bug

	a = document.createElement('a');
	a.href = shortlink;
	a.target = '_blank';
	applyCSS(a, textcss, linkcss);
	a.appendChild(document.createTextNode('Short\u00a0Link'));

	a.addEventListener('focus', focus, false);
	a.addEventListener('blur', blur, false);

	span = document.createElement('span');
	applyCSS(span, textcss, spancss);
	span.appendChild(document.createTextNode(shortlink));

	x = document.createElement('a');
	x.href = '#';
	x.title = 'Close';
	applyCSS(x, textcss, closecss);
	x.appendChild(document.createTextNode('\u00d7'));

	x.addEventListener('focus', focus, false);
	x.addEventListener('blur', blur, false);
	x.addEventListener('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		div.parentNode.removeChild(div);
	}, false);

	div = document.createElement('div');
	applyCSS(div, bugcss, textcss);
	div.appendChild(a);
	div.appendChild(span);
	div.appendChild(x);

	div.addEventListener('mouseover', function (e) {
		var from = e.relatedTarget;
		e.preventDefault();
		e.stopPropagation();
		if (from && (from == this || contains(this, from))) {
			return;
		}
		show();
	}, false);

	div.addEventListener('mouseout', function (e) {
		var to = e.relatedTarget;
		e.preventDefault();
		e.stopPropagation();
		if (to && (to == this || contains(this, to))) {
			return;
		}
		hide();
	}, false);

	document.body.appendChild(div);



	function focus() {
		if (timeoutId != null) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		show();
	}

	function blur() {
		if (timeoutId != null) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(hide, 100);
	}

	function show() {
		span.style.display = 'inline';
		x.style.display = 'block';
	}

	function hide() {
		span.style.display = 'none';
		x.style.display = 'none';
	}

	function each(a, fn) {
		var i, l, r, v;
		for (i = 0, l = a.length; i < l; i++) {
			v = a[i];
			r = fn.call(v, i, v);
			if (r === false) {
				break;
			}
		}
		return r;
	}

	function applyCSS(el) {
		var s = el.style, css, prop, i, l, p;
		for (i = 1, l = arguments.length; i < l; i++) {
			css = arguments[i];
			for (p in css) {
				prop = p.replace(/-\w/g, function (s) { return s.charAt(1).toUpperCase(); });
				s[prop] = css[p];
			}
		}
	}

	// http://ejohn.org/blog/comparing-document-position/
	function contains(a, b) {
		return a.contains ?
			a != b && a.contains(b) :
			!!(a.compareDocumentPosition(b) & 16);
	}
})();
