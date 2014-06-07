// ==UserScript==
// @name		Yahoo sign up for iranian V3(ZANA_FN)
// @description	This script is for sign up iranian to the yahoo and to bypass sanctions on Iran by the yahoo site. After install you can select Iran country and set cell phone to receive sms for activation account.
// @version		2.0
// @createdate	2013-09-05
// @update		2014-04-15
// @namespace	http://userscripts.org/scripts/review/438611
// @author		Eghbal Safaie (from Iran)
// @homepage	http://forum.soft98.ir/member77546.html
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 
// @include		https://edit.europe.yahoo.com/registration*
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
newNode.innerHTML = 'http://forum.soft98.ir/member77546.html  ویرایش توسط ٰZANA_FN ';
referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);