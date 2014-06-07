// ==UserScript==
// @name		ساخت یاهو
// @description
// @version		1.0
// @createdate	2013-09-05
// @update		2014-01-03
// @namespace	http://userscripts.org/scripts/show/408293
// @author		hossein halaj (from Iran)
// @include		https://edit.yahoo.com/registration*
// ==/UserScript==
["", "-rec"].forEach(function(entry) {
	var parent = document.getElementById('country-code'+entry);
	var child = parent.children[0];
	var node = document.createElement("option");
	node.value = '98';
	node.setAttribute('data-country-code', 'ir');
	node.setAttribute('aria-label', 'Iran');
	if (parent.value == '1')
		node.setAttribute('selected', 'selected');
	node.innerHTML = 'Iran (+98)';
	parent.insertBefore(node, child);
});
var referenceNode = document.getElementById('general-message');
var newNode = document.createElement("span");
newNode.setAttribute('style', 'display:block; direction:rtl; text-align:right; font:12px tahoma; color:#bbb;');
newNode.innerHTML = 'Eng.halaj@yahoo.com حسین حلاج';
referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
