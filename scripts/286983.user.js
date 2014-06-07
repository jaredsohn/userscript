// ==UserScript==
// @name		Yahoo Signup for iran (By Ata Shahi)
// @description	This script is for sign up iranian on the yahoo, After install you can select Iran country and set  your mobile phone number to receive sms for activation account.
// @version		1.1
// @date		2013-12-04
// @author		Ata Shahi
// @homepage	http://banehnights.ir/
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include		https://edit.yahoo.com/registration*
// ==/UserScript==

["", "_alt"].forEach(function(entry) {

		var parent = document.getElementById('country-code'+entry);
		var child = parent.children[94];
		var node = document.createElement("option");
		
		node.value = '98';
		node.setAttribute('data-country-code', 'ir');
		node.setAttribute('aria-label', 'Iran');
		node.innerHTML = 'Iran (+98) (By Ata Shahi)';
		
		parent.insertBefore(node, child);
	
		var obj = document.getElementById('replaceContainerCountryMenu'+entry);
});