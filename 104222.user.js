// Google Reader Preview Enhanced
// version 1.2.1
// 2011-11-01

// Copyright (c) 2007-2008, Julien CAROSI (jcarosi@gmail.com)
// Copyright (c) 2011, kroimon (userscripts@kroimon.de)

// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html

// --------------------------------------------------------------------
// ==UserScript==
// @name            Google Reader Preview Enhanced
// @namespace       http://userscripts.org/scripts/show/104222
// @description     Adds a "Preview button" to Google Reader that allows you to view the actual article in a frame. Clicking again on that button goes back to RSS view.
// @include         http://www.google.com/reader/*
// @include         https://www.google.com/reader/*
// @include         http://www.google.tld/reader/*
// @include         https://www.google.tld/reader/*
// @version         1.2.1
// @icon            https://www.google.com/reader/ui/352024653-app-icon-32.png
// ==/UserScript==
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// Changelog:
// v1.2.1 : (by kroimon) Fixed automatic iframe sizing for feeds with only a few shown items.
// v1.2   : (by kroimon) Enhanced automatic iframe sizing. Fixed scrolling. Added shortcut 'X' in addition to 'Shift+V'.
// v1.1   : (by kroimon) Fixes for Firefox 5. Code cleanup. Configurable iframe height.
// v1.07g : Fixed scrolling to top of article and Shift-V shortcut to open preview.
//          Now doesn't rely on Google's code at all. So scrolling to top of article and Shift-V will still work even if Google's code changes.
// v1.07f : fixes a bug introduced by v1.07e
// v1.07e : fixes compatiblity with Google's new code
// v1.07d : makes scrolling to top of article work again because google's code was changed. Same for shortcut
// v1.07c : fixes problem with Shift V shortcut that prevented typing capital V in GR's dialog boxes
//          added support for https urls
// v1.07b : makes scrolling to top of article work again because google's code was changed. Same for shortcut
// v1.07a : makes the script work again because google's code was changed.
//          added a try/catch statement in order to make the script work even if the code changes again, though not scrolling to the top of article
//          so people can still use the script until an upgrade is released
// v1.07  : allows clicking on an article's title to show the preview, so you don't need to scroll it down to preview it (was opening the article in a new window previously, now not needed with preview functionnality)
// v1.06a : fixes compatibility with "find as you type" firefox functionality
// v1.06  : adds a keyboard shortcut for previewing an article. Now you can press Shift-V to go to preview mode or go back to rss view.
// v1.05a : adds better support for Better GReader extension.
// v1.05  : makes the script work again because offline functionnality broke it when it was added by Google.
// v1.0   : initial release.
// --------------------------------------------------------------------


// --------------------------------------------------------------------
// DOM helper methods

function findParentNode(el, tag, clazz) {
	el = el.parentNode;
	if (arguments.length == 3) {
		// Find first element's parent node matching tag and className
		while (el.nodeName.toLowerCase() != 'body' && (el.nodeName.toLowerCase() != tag || (el.className != clazz && el.className.indexOf(clazz + ' ') == -1))) {
			el = el.parentNode;
		}
	} else {
		// Find first element's parent node matching tag
		while (el.nodeName.toLowerCase() != 'body' && el.nodeName.toLowerCase() != tag) {
			el = el.parentNode;
		}
	}
	return ((el.nodeName.toLowerCase() != 'body') ? el : false);
}

function getFirstElementMatchingClassName(root, tag, clazz) {
	var elements = root.getElementsByTagName(tag);
	var i = 0;
	while (elements[i] && !elements[i].className.match(clazz)) {
		i++;
	}
	return ((!elements[i]) ? null : elements[i]);
}


// --------------------------------------------------------------------
// Add preview buttons

function handleEntryAdded(e) {
	var el = e.target;
	if (el.nodeName == 'DIV' && el.className.indexOf('entry') > -1) {
		if (el.className.indexOf('entry-actions') > -1) {
			// Expanding article in list view
			addPreviewButton(el);
		} else if (getFirstElementMatchingClassName(el, 'div', 'card-bottom')) {
			// Adding article in expanded view
			addPreviewButton(getFirstElementMatchingClassName(el, 'div', 'entry-actions'));
		}
	}
}

function addPreviewButton(el) {
	// Title link
	var entry = findParentNode(el, 'div', 'entry');
	var link = getFirstElementMatchingClassName(entry, 'a', 'entry-title-link');
	link.addEventListener('click', previewMouseClick, false);

	// Bottom button
	var preview = document.createElement('span');
	preview.className = 'item-preview preview link';
	preview.innerHTML = 'Preview';
	el.appendChild(preview);
	preview.addEventListener('click', previewMouseClick, false);
}


// --------------------------------------------------------------------
// Show the preview iframe

function previewMouseClick(e) {
	var entry = findParentNode(e.target, 'div', 'entry');
	preview(entry);
	e.preventDefault();
}

function handleKeypress(e) {
	if (e.target.nodeName.toLowerCase() != 'input') {
		if ((e.shiftKey && e.keyCode == 86) || (e.keyCode == 88)) {
			// Shift-V or X
			preview(document.getElementById('current-entry'))
			e.preventDefault();
		}
	}
}

function preview(entry) {
	var entryBody = getFirstElementMatchingClassName(entry, 'div', 'entry-body');
	var itemBody = getFirstElementMatchingClassName(entryBody, 'div', 'item-body');
	var iframe = getFirstElementMatchingClassName(entryBody, 'iframe', 'preview');

	if (!iframe || (iframe.style.display != 'block')) {
		// classic mode -> preview mode
		entry.className += ' preview';

		// hide rss item
		itemBody.style.display = 'none';

		// show preview iframe
		if (!iframe) {
			// find iframe height
			var iframeHeight = GM_getValue('iframeHeight', 0);
			if (iframeHeight <= 0) {
				iframeHeight = document.getElementById('viewer-container').clientHeight - entry.clientHeight;
				if (iframeHeight < 300)
					iframeHeight = 300;
			}

			// iframe not in document, create it
			iframe = document.createElement('iframe');
			iframe.setAttribute('src', getFirstElementMatchingClassName(entry, 'a', 'entry-title-link'));
			iframe.setAttribute('width', '100%');
			iframe.setAttribute('height', iframeHeight + 'px');
			iframe.className = 'preview';
			entryBody.appendChild(iframe);
		}
		iframe.style.display = 'block';

		// Scale article container to fullwidth
		entryBody.setAttribute('style', 'max-width: 100%');

		// Scroll entry into view after we added the preview iframe
		entry.scrollIntoView();

	} else {
		// preview mode -> classic mode
		entry.className = entry.className.replace('preview', '');

		// hide iframe
		if (iframe)
			iframe.style.display = 'none';

		// show rss item
		itemBody.style.display = 'block';

		// Go back to initial width
		entryBody.removeAttribute('style', '');
	}
}


// --------------------------------------------------------------------
// Script settings

function changeIframeHeight() {
	var iframeHeight = GM_getValue('iframeHeight', 0);
	do {
		iframeHeight = parseInt(prompt('Enter the preview frame\' height in pixels or 0 for auto-sizing:', iframeHeight));
	} while (isNaN(iframeHeight));
	if (iframeHeight < 0)
		GM_deleteValue('iframeHeight');
	else
		GM_setValue('iframeHeight', iframeHeight);
}


// --------------------------------------------------------------------
// Styling functions, executed once the page finished loading

function fixBetterGReaderStyles() {
	// Overwrites Better GReader extension css modifications regarding entry-actions class.
	// Indeed, entry-actions was set to "float : right", thus div was not in document flow.
	// Then, clicking on preview button let entry actions div in place instead of going down automatically when iframe was added.
	// That's why I use here text-align: right. That has the same effect, but keeps div in document flow.
	// restyle() is called after document load, in order to ensure that Better GReader has already added its styles modifications
	var styles = document.getElementsByTagName('head')[0].getElementsByTagName('style');
	var i = 0;

	while (i < styles.length) {
		if (styles[i].innerHTML.indexOf('.entry-actions { float:right !important; }') >- 1) {
			styles[i].innerHTML = styles[i].innerHTML.replace('.entry-actions { float:right !important; }', '.entry-actions { text-align: right; !important; }');
		}
		i++;
	}
}

function addStyles() {
	var head = document.getElementsByTagName('head')[0];
	if (head) {
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML =
			'span.item-preview {' +
			' background: url("data:image/gif,GIF89a%10%00%10%00%D5%13%00%D8%D8%D8%FA%FA%FA%CB%CB%CB%C8%C8%C8%D2%D2%D2%BA%BA%BA%C6%C6%C6%A1%A1%A1%9C%9C%9C%BD%BD%BD%C9%C9%C9%AB%AB%AB%F4%F4%F4%BF%BF%BF%FC%FC%FC%DB%DB%DB%AD%AD%AD%FF%FF%FF%CC%CC%CC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%13%00%2C%00%00%00%00%10%00%10%00%00%06I%C0%89pH%2C%1A%8F%C8d%F1!i%3A%9F%8F%E1%03B%ADZ%A9%D1%89%04%12%E9z%BF%10%89p%FB-G%C2c%AE%D9%8B%D6%AA%03_%F8Y%EC%8E%C8%E3%F3%F4%9AM\'%7B%1D%0E%60t%00W%85%10%00RO%8A%12YJ%8E%8EA%00%3B") no-repeat;' +
			' padding: 1px 8px 1px 16px;' +
			' white-space: nowrap;' +
			'} ' +
			'div.entry.preview span.item-preview {' +
			' background: url("data:image/gif,GIF89a%10%00%10%00%A2%05%00%D8%D8%D8%DB%DB%DB%AD%AD%AD%CC%CC%CC%FE%9A%20%FF%FF%FF%00%00%00%00%00%00!%F9%04%01%00%00%05%00%2C%00%00%00%00%10%00%10%00%00%03%3BX%BA%DC%FE0%B60%AA%BDa%05%C1%BB%E7Y1%08Di%9E%C2%A0%8C%A6%D7%AA%22Y%CA2%91%AE%B5%3B%C3%EC%7C%EE%B8%D6%CF%C6%AB%0D%89%0A%C0g)%00h.%D0AHB%A5%26%00%00%3B") no-repeat;' +
			'}';
		head.appendChild(style);
	}
}

function init() {
	fixBetterGReaderStyles();
	addStyles();
}


// --------------------------------------------------------------------
// Register listeners
window.addEventListener('load', init, false);
document.body.addEventListener('DOMNodeInserted', handleEntryAdded, false);
document.addEventListener('keydown', handleKeypress, false);
GM_registerMenuCommand('Change "Google Reader Preview" iframe height', changeIframeHeight, 'h');
