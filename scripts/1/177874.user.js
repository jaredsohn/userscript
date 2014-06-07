// ==UserScript==
// @name		Add (+98) in sign up yahoo mail service
// @description	This script is used for add (+98) in yahoo website for register iranian people in mail service for yahoo. enjoy that.
// @version		1.0
// @date		2013-09-4
// @namespace	http://userscripts.org/users/532278
// @author		Pooria Toosi
// @homepage	http://userscripts.org/users/532278
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 
// @include		https://edit.yahoo.com/registration*
// ==/UserScript==

["", "_alt"].forEach(function(entry) {
	var parent = document.getElementById('countryMenu'+entry);
	var child = parent.children[1];
	var node = document.createElement("option");
	node.value = '+98';
	node.setAttribute('data-country-code', 'ir');
	node.setAttribute('aria-label', 'Iran');
	node.innerHTML = 'Iran (+98)';
	parent.insertBefore(node, child);
	
	var obj = document.getElementById('replaceContainerCountryMenu'+entry);
	if (obj == null) {
		var obj = document.getElementById('countryMenuAnchor'+entry);
		obj.innerHTML = obj.innerHTML + '<span aria-live="assertive" class="famfamfam-flag-ir" id="replaceContainerCountryMenu'+entry+'"><span id="selectCountryCode'+entry+'" aria-label="Selected Country - Iran" aria-live="assertive">+98</span><div class="arrow-container"><div class="bottom-dd-arrow"></div></div> </span>';
		document.getElementById('country-code'+entry).value = '98';
	}
	
	var obj = document.getElementById('country-code'+entry);
	if (obj.value == '1') {
		obj.value = '98';
		document.getElementById('replaceContainerCountryMenu'+entry).className = "famfamfam-flag-ir";
		document.getElementById('selectCountryCode'+entry).setAttribute('aria-label', 'Selected Country - Iran');
		document.getElementById('selectCountryCode'+entry).innerHTML = '+98'
	}
	
});