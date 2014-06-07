// ==UserScript==
// @name		Yahoo sign up for iranian
// @description	This script is for sign up iranian to the yahoo mail. After install this script, when you try to signup, automaticaly selecte iran for country and need insert tell number for activation account.
// @version		2.1
// @createdate	2014-01-04
// @update		2014-01-04
// @author		Nabi KaramAlizadeh (Edit by seiedali seiedlarfatemy)
// @homepage	http://ZER01.ir/
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 
// @include		https://*yahoo.com/registration*
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
newNode.setAttribute('style', 'display:block; direction:rtl; text-align:right; font:20px tahoma; color:#00F;');
newNode.innerHTML = 'دنیای صفر و یک ZER01.ir';
referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
