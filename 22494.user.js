// ==UserScript==
// @name           readelicious
// @namespace      rcrowley.org
// @description    Post to del.icio.us links in Google Reader
// @include        http://google.com/reader*
// @include        http://*.google.com/reader*
// ==/UserScript==

// $Id$

// Show a window to save the entry passed to this function into del.icio.us
//   This function is left in the global namespace for others to attach to
var readelicious = function(entry) {
	if (!(entry && entry.className &&
		entry.className.match(/(^|\s)entry($|\s)/))) {
		return;
	}

	// Hide Reader's and Immersion's scrollbars
	document.getElementById('sub-tree').style.overflowY = 'hidden';
	document.getElementById('entries').style.overflowY = 'hidden';
	var immersion = document.getElementById('immersion');
	if (immersion) {
		immersion.getElementsByTagName('iframe')[0].style.overflow = 'hidden';
	}

	// Get the title and link for the entry
	var node = entry.firstChild.firstChild.firstChild
		.nextSibling.firstChild.nextSibling.firstChild.firstChild
		.nextSibling.firstChild.nextSibling.firstChild;
	var title = node.firstChild.nodeValue;
	var link = node.getAttribute('href');

	// TODO: Resolve Feedburner's indirection URLs
	//   From my preliminary research it seems XMLHttpRequest is
	//   required to transparently follow a 302 thus never giving me
	//   an opportunity to snoop the Location header
	//   http://www.w3.org/TR/XMLHttpRequest/

	// Field labels
	var labels = [];
	for (var i = 0; i < 3; ++i) {
		labels[i] = document.createElement('label');
		labels[i].style.display = 'block';
		labels[i].style.margin = '0 10px';
	}
	labels[0].appendChild(document.createTextNode('Title:'));
	labels[1].appendChild(document.createTextNode('Note:'));
	labels[2].appendChild(document.createTextNode('Tags:'));

	// Title and tags
	var inputs = [];
	for (var i = 0; i < 2; ++i) {
		inputs[i] = document.createElement('input');
		inputs[i].setAttribute('type', 'text');
		inputs[i].setAttribute('size', 255);
		inputs[i].style.margin = '0 10px 10px 10px';
		inputs[i].style.width = '400px';
	}
	inputs[0].setAttribute('id', 'title');
	inputs[0].setAttribute('name', 'title');
	inputs[0].setAttribute('value', title);
	inputs[1].setAttribute('id', 'tags');
	inputs[1].setAttribute('name', 'tags');

	// Note
	var textarea = document.createElement('textarea');
	textarea.setAttribute('id', 'note');
	textarea.setAttribute('name', 'note');
	textarea.setAttribute('rows', 3);
	textarea.setAttribute('cols', 48);
	textarea.style.width = '400px';
	textarea.style.margin = '0 10px 10px 10px';
	textarea.appendChild(document.createTextNode(
		window.getSelection().toString()));

	// Post button
	var button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('value', 'Post');
	button.style.fontWeight = 'bold';
	var post = function() {
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'https://api.del.icio.us/v1/posts/add?url=' +
				encodeURIComponent(document.getElementById('link').value) +
				'&description=' +
				encodeURIComponent(document.getElementById('title').value) +
				'&extended=' +
				encodeURIComponent(document.getElementById('note').value) +
				'&tags=' +
				encodeURIComponent(document.getElementById('tags').value)
		});
		var node = document.getElementById('readelicious');
			node.parentNode.removeChild(node);
		var immersion = document.getElementById('immersion');
		if (immersion) {
			immersion.getElementsByTagName('iframe')[0].style.overflow = 'auto';
		} else {
			document.getElementById('sub-tree').style.overflowY = 'auto';
			document.getElementById('entries').style.overflowY = 'auto';
		}
	};
	button.addEventListener('click', post, true);
	unsafeWindow.addEventListener('keypress', function(e) {
		if (13 == e.which && 'note' != e.target.id) {
			post();
		}
	}, true);

	// Cancel link
	var a = document.createElement('a');
	a.appendChild(document.createTextNode('Cancel'));
	a.href = 'javascript:;';
	a.addEventListener('click', function() {
		var node = document.getElementById('readelicious');
		node.parentNode.removeChild(node);
		var immersion = document.getElementById('immersion');
		if (immersion) {
			immersion.getElementsByTagName('iframe')[0].style.overflow = 'auto';
		} else {
			document.getElementById('sub-tree').style.overflowY = 'auto';
			document.getElementById('entries').style.overflowY = 'auto';
		}
	}, true);

	// Button and link
	var p = document.createElement('p');
	p.style.margin = '0 10px';
	p.appendChild(button);
	p.appendChild(document.createTextNode(' or '));
	p.appendChild(a);

	// Hidden link field
	var hidden = document.createElement('input');
	hidden.setAttribute('type', 'hidden');
	hidden.setAttribute('id', 'link');
	hidden.setAttribute('name', 'link');
	hidden.setAttribute('value', link);

	// Put 'em in the form
	var form = document.createElement('form');
	form.style.width = '422px';
	form.style.margin = '200px auto 0 auto';
	form.style.padding = '10px';
	form.style.textAlign = 'left';
	form.style.background = '#eee';
	form.style.border = '1px solid #444';
	form.appendChild(labels[0]);
	form.appendChild(inputs[0]);
	form.appendChild(labels[1]);
	form.appendChild(textarea);
	form.appendChild(labels[2]);
	form.appendChild(inputs[1]);
	form.appendChild(p);
	form.appendChild(hidden);

	// Display centered and dimmed and pretty
	var div = document.createElement('div');
	div.id = 'readelicious';
	div.style.width = window.innerWidth + 'px';
	div.style.height = window.innerHeight + 'px';
	div.style.position = 'absolute';
	div.style.top = '0';
	div.style.left = '0';
	div.style.zIndex = '999999999';
	div.style.textAlign = 'center';
	div.style.backgroundImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAG0lEQVQ4jWMICgraQClmGDVk1JBRQ0YNCdoAAHYawHDC5WlcAAAAAElFTkSuQmCC)';
	div.appendChild(form);
	document.getElementsByTagName('body')[0].appendChild(div);

	// Focus the tags field
	inputs[1].focus();

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
			readelicious(e.target);
		}, true);
		a.appendChild(document.createTextNode('Post to del.icio.us'));
		actions.appendChild(a);

	}, true);

	// A keyboard shortcut
	//   Based on a patch from Mike Malone
	//   http://immike.net/scripts/readelicious.user.js
	unsafeWindow.addEventListener('keypress', function(e) {
		var node = e.target;
		var name = node.nodeName.toLowerCase();
		if ('input' == name &&
			('text' == node.type || 'password' == node.type) ||
			'textarea' == name) {
			return true;
		} else if ('d' == String.fromCharCode(e.which) && !e.ctrlKey) {

			// First try for the marked current entry
			var entry = document.getElementById('current-entry');
			if (entry) {
				readelicious(entry);
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
					readelicious(entry);
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

