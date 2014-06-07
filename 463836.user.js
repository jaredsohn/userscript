// ==UserScript==
// @name		Yahoo sign up for iranian
// @description	This script is for sign up iranian to the yahoo and to bypass sanctions on Iran by the yahoo site. After install you can select Iran country and set cell phone to receive sms for activation account.
// @version		3.0
// @createdate	2013-09-05
// @update		2017-01-03
// @namespace	
// @author		respina7 (from Iran)
// @homepage	http://respina7.ir/
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 
// @include		https://edit.yahoo.com/registration*
// @include		https://eu.edit.yahoo.com/registration*
// @include		https://na.edit.yahoo.com/registration*
// @include		https://sa.edit.yahoo.com/registration*
// @include             https://kr.edit.yahoo.com/registration*
// @include             https://tw.edit.yahoo.com/registration*
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
newNode.setAttribute('style', 'display:block; direction:rtl; text-align:right; font:13px Algerian; color:#bbb;');
newNode.innerHTML = ' hale bezan hal kon codo ... www.respina7.ir';
referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
