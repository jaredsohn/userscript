// ==UserScript==
// @name           Invelos Image Shrink
// @namespace      muckl.com
// @description    Auto resize images posted in the Forums to fit computer screen. Invelos hosts and develops DVD Profiler.
// @include        http*://*invelos.com/Forums.aspx?task=viewtopic&*
// @include        http*://*invelos.com/Forums.aspx?task=todaysactive
// @include        http*://*invelos.com/MessagePost.aspx?task=*
// @include        http*://*invelos.com/MyProfiler.aspx?display=repv
// @copyright      2010, Muckl (http://userscripts.org/users/Muckl)
// @license        (CC) Attribution-Noncommercial-Share Alike 3.0 Unported; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version        0.0.2
// ==/UserScript==

/**

   ChangeLog       [REL] v0.0.2 [2010-05-19]
                   [ADD] New include URL for list of submitted reputation votes
                   [FIX] Moved resizing to function, called by window's onload event
                   [REL] v0.0.1 (initial release) [2010-03-31]

   DevLog          [ADD] Info area with buttons (switch size & open in new window) and original image dimensions
                   [ADD] window.onresize --> resize Images, if necessary

**/

// define global variables
var maxW, adjust;

// retrieve all posted images and, if necessary, resize them
function resizeImgs() {
	var posts, menu, imgs, t, p, i;
	if (document.location.href.indexOf('task=todaysactive') > -1) {
		maxW = window.innerWidth - 360;
		posts = $C('messagepreview', document, 'div');
	} else if (document.location.href.indexOf('display=repv') > -1) {
		maxW = window.innerWidth - 420;
		posts = $C('mainsectionbody(alt)?', document, 'tr');
		menu = document.getElementById('ctl00_cphMain_pnlOptions');
		menu.style.width = '140px';
		menu.parentNode.nextSibling.nextSibling.innerHTML = '<div style="width: 15px"> </div>';
	} else {
		maxW = window.innerWidth - 275;
		posts = $C('MessageContent', document, 'td');
	}
	for (p = 0; p < posts.length; p += 1) {
		if (document.location.href.indexOf('display=repv') > -1) {
			imgs = posts[p].childNodes[0].getElementsByTagName('img');
		} else {
			imgs = posts[p].getElementsByTagName('img');
		}
		for (i = 0; i < imgs.length; i++) {
			adjust = quoted(imgs[i]);
			if (imgs[i].width > (maxW - adjust)) {
				resize(imgs[i]);
				if ($P(imgs[i]) !== 'A') {
					imgs[i].addEventListener('click', resize, false);
					imgs[i].style.cursor = 'pointer';
				}
			}
		}
	}
}
function quoted(node, c) {
	if (c === undefined || c === null) {
		var c = 0;
	}
	if ($P(node) === 'BLOCKQUOTE') {
		return quoted(node.parentNode, c + 1);
	} else {
		return c * 50;
	}
}
function resize(node) {
	if (node.nodeName !== 'IMG') {
		var node = this;
	}
	if (node.style.maxWidth !== '') {
		node.style.maxWidth = node.style.maxHeight = '';
	} else {
		node.style.maxWidth = (maxW - adjust) + 'px';
		node.style.maxHeight = 'auto';
	}
}

// helper functions
function $P(node) {
	return node.parentNode.nodeName;
}
function $C(s, p, t, x) {
	if ((p || document).getElementsByClassName && t == null) {
		var r = (p || document).getElementsByClassName(s);
	} else {
		var o = (p || document).getElementsByTagName(t || '*'), 
			rx = new RegExp('\\b' + s + '\\b'), 
			r = [], i = -1, e, cName;
		while ((e = o.item(i += 1))) {
			cName = e.getAttributeNode('class');
			if (cName && cName.specified && rx.test(cName.value)) {
				r.push(e);
			}
		}
	}
	return (typeof x === 'number') ? r[x - 1] : r;
}

// add event
window.addEventListener('load', resizeImgs, false);
