// ==UserScript==
// @name           Popmundo Forum Navlinks
// @namespace      http://popodeus.com
// @description    A Popmundo.com script that shows extra navigation links in the forums.
// @include        http://www*.popmundo.com/Common/cn.asp?*
// @include        http://popodeus.com/*
// @require        http://updater.usotools.co.cc/30910.js
// @author         Seppo Vuolteenaho, aka Photodeus
// @copyright      Seppo Vuolteenaho
// ==/UserScript==

function elem(name, attrs, style, text) {
	var e = document.createElement(name);
	var key;
	if (attrs) {
		for (key in attrs) {
			if (key == 'class') e.className = attrs[key];
			else if (key == 'id') e.id = attrs[key];
			else e.setAttribute(key, attrs[key]);
		}
	}
	if (style) for (key in style) e.style[key] = style[key];
	if (text) e.appendChild(document.createTextNode(text));
	return e;
}

function getElementsByClass(searchClass, node, tag) {
	var classElements = [];
	if (node === null)  node = document;
	if (tag === null) tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
	var i,j;
	for (i = 0, j = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className)) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function duplicateNavBars() {
	var div = document.getElementById('cn');

	var navs = getElementsByClass('threadNav', div, 'div');
	if (navs.length == 1) {
		var newdiv = elem('div', {'class':'threadNav x-added', style:'margin-top: 0.8em'});
		newdiv.innerHTML = navs[0].innerHTML;
		var table = div.getElementsByTagName('table')[1];
		div.insertBefore(newdiv, table);
	}

}
function duplicatePrioButtons() {
	var div = document.getElementById('cn');
	var pri = getElementsByClass('threadPrio', document, 'div')[0];
	var didi = elem('div', null, {cssFloat:'right', position:'relative',right:'4px'});
	didi.innerHTML = pri.innerHTML;
	var n = didi.childNodes;
	for (var i=0; i<n.length; i++) {
		var node = n[i];
		if (node.tagName == 'IMG') {
			didi.removeChild(node);
			--i;
		}
	}
	div.getElementsByTagName('table')[0].rows[1].cells[1].appendChild(didi);
	// Also modify the original
	pri.innerHTML = didi.innerHTML;
}

duplicateNavBars();
duplicatePrioButtons();