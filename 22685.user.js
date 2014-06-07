// ==UserScript==
// @name           immersion
// @namespace      rcrowley.org
// @description    Show the source page within Google Reader
// @include        http://google.com/reader*
// @include        http://*.google.com/reader*
// ==/UserScript==

// $Id$

var immersion = function(entry) {
	if (!(entry && entry.className &&
		entry.className.match(/(^|\s)entry($|\s)/))) {
		return;
	}

	// Hide Reader's scrollbars
	document.getElementById('sub-tree').style.overflowY = 'hidden';
	document.getElementById('entries').style.overflowY = 'hidden';

	// Get the link to the page
	var link = entry.firstChild.firstChild.firstChild
		.nextSibling.firstChild.nextSibling.firstChild.firstChild
		.nextSibling.firstChild.nextSibling.firstChild.getAttribute('href');

	// Start to get the page in an <iframe>
	var iframe = document.createElement('iframe');
	iframe.src = link;
	iframe.style.display = 'none';
	iframe.style.width = (window.innerWidth - 50) + 'px';
	iframe.style.height = window.innerHeight + 'px';
	iframe.style.zIndex = '999999997';
	iframe.style.margin = '0 auto';
	iframe.style.border = '0';
	if (document.getElementById('readelicious')) {
		iframe.style.overflow = 'hidden';
	}

	// Add a close button
	var a = document.createElement('a');
	a.href = 'javascript:;';
	a.addEventListener('click', function() {
		var node = document.getElementById('immersion');
		node.parentNode.removeChild(node);
		if (!document.getElementById('readelicious')) {
			document.getElementById('sub-tree').style.overflowY = 'auto';
			document.getElementById('entries').style.overflowY = 'auto';
		}
	}, true);
	a.style.position = 'absolute';
	a.style.top = '5px';
	a.style.right = '5px';
	a.style.zIndex = '999999998';
	a.style.padding = '0 3px';
	a.style.border = '1px solid white';
	a.style.background = 'black';
	a.style.color = 'white';
	a.style.textDecoration = 'none';
	a.style.fontWeight = 'bold';
	a.appendChild(document.createTextNode(String.fromCharCode(215)));

	// Darken everything at first
	var div = document.createElement('div');
	div.id = 'immersion';
	div.style.width = window.innerWidth + 'px';
	div.style.height = window.innerHeight + 'px';
	div.style.position = 'absolute';
	div.style.top = '0';
	div.style.left = '0';
	div.style.zIndex = '999999996';
	div.style.backgroundImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAG0lEQVQ4jWMICgraQClmGDVk1JBRQ0YNCdoAAHYawHDC5WlcAAAAAElFTkSuQmCC)';
	div.style.textAlign = 'center';
	div.appendChild(iframe);
	div.appendChild(a);
	document.getElementsByTagName('body')[0].appendChild(div);

	// After the delay, show the <iframe>
	unsafeWindow.setTimeout(function() {
		iframe.style.display = 'block';
	}, 500);

};

(function() {

	// The text link in each entry
	document.getElementById('entries').addEventListener(
		'DOMNodeInserted', function(e) {

		// We only care when the entry divs are inserted
		if (!(e.target && e.target.className &&
			e.target.className.match(/(^|\s)entry($|\s)/))) {
			return;
		}

		// Get the entry-actions div
		var actions = e.target.firstChild.firstChild.firstChild
			.nextSibling.nextSibling.firstChild.nextSibling.firstChild;

		// The link for saving directly to del.icio.us
		var a = document.createElement('a');
		a.style.paddingRight = '10px';
		a.style.fontWeight = 'bold';
		a.href = 'javascript:;';
		a.addEventListener('click', function() {
			immersion(e.target);
		}, true);
		a.appendChild(document.createTextNode('Immerse!'));
		actions.appendChild(document.createTextNode(' '));
		actions.appendChild(a);

	}, true);

	// A keyboard shortcut
	unsafeWindow.addEventListener('keypress', function(e) {
		var node = e.target;
		var name = node.nodeName.toLowerCase();
		if ('input' == name &&
			('text' == node.type || 'password' == node.type) ||
			'textarea' == name) {
			return true;
		} else if ('i' == String.fromCharCode(e.which) && !e.ctrlKey) {

			// First try for the marked current entry
			var entry = document.getElementById('current-entry');
			if (entry) {
				immersion(entry);
				try {
					event.preventDefault();
				} catch (err) {}
				return false;
			}

			// If not just go for the first entry
			var entries = document.getElementById('entries');
			if (entries) {
				entry = entries.firstChild;
				if (entry) {
					immersion(entry);
					try {
						event.preventDefault();
					} catch (err) {}
					return false;
				}
			}

		} else {
			return true;
		}
	}, true);

})();

