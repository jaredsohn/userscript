// ==UserScript==
// @name           DirectPic
// @version        1.1.1
// @author         Leon_-
// @copyright      2009, Leon_-
// @licence        GNU General Public License; http://www.opensource.org/licenses/gpl-2.0.php
// @namespace      http://sotw.onpw.de/greasemonkey/namsespaces/direct.pic
// @description    Bypass the image result pages of Google Images and open directly the pictures
// @include        http://images.google.*/*
// ==/UserScript==

if (typeof GM_getValue('directpicActive') == 'undefined') {
	GM_setValue('directpicActive', true)
}

if (document.URL.indexOf('preferences') > -1) {
	var tableDOM = document.getElementsByTagName('form')[0].getElementsByTagName('table')[10].getElementsByTagName('td')[3];
	var font = document.createElement('font');
	var checkbox = document.createElement('input');
	var label = document.createElement('label');
	
	font.setAttribute('size', '-1');
	font.setAttribute('face', 'arial,sans-serif');
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', 'directpic');
	checkbox.checked = GM_getValue('directpicActive');
	label.setAttribute('for', 'directpic');
	label.innerHTML = '&nbsp;&nbsp;Bypass image result pages';
	
	font.appendChild(checkbox);
	font.appendChild(label);
	tableDOM.replaceChild(font, tableDOM.lastChild);
	
	document.getElementsByTagName('form')[0].addEventListener('submit', function() {
		GM_setValue('directpicActive', document.getElementById('directpic').checked);
	}, true);
} else if (document.URL.indexOf('images?') > -1 && GM_getValue('directpicActive')) {
	var linksDOM = document.getElementById('imgtb').getElementsByTagName('a');
	
	for (i in linksDOM) {
		linksDOM[i].href = decodeURIComponent(linksDOM[i].href.slice(linksDOM[i].href.indexOf('?imgurl=')+8, linksDOM[i].href.indexOf('&imgrefurl=')));
	}
}