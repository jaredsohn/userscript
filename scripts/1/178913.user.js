// ==UserScript==
// @name		yahoo ======== 
// @description	This script is for sign up iranian to the yahoo and to bypass sanctions on Iran by the yahoo site. After install you can select Iran country and set cell phone to receive sms for activation account.
// @version		1.0
// @date		2013-08-05
// @namespace	
// @author		amir SArtipzadeh
// @homepage	http://amirsartipzadeh.ir
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
		obj.innerHTML = obj.innerHTML + '<span aria-live="assertive" class="zimar.ir" id="replaceContainerCountryMenu'+entry+'"><span id="selectCountryCode'+entry+'" aria-label="Selected Country - Iran" aria-live="assertive">+98</span><div class="arrow-container"><div class="bottom-dd-arrow"></div></div> </span>';
		document.getElementById('country-code'+entry).value = '98';
	}
	
	var obj = document.getElementById('country-code'+entry);
	if (obj.value == '1') {
		obj.value = '98';
		document.getElementById('replaceContainerCountryMenu'+entry).className = "zimar.ir";
		document.getElementById('selectCountryCode'+entry).setAttribute('aria-label', 'Selected Country - Iran ');
		document.getElementById('selectCountryCode'+entry).innerHTML = '+98'
	}
	
});