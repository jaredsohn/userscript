// ==UserScript==
// @name		Yahoo sign up for dear iranian
// @description	This script is for sign up iranian to the yahoo and to bypass sanctions on Iran by the yahoo site. After install you can select Iran country and set cell phone to receive sms for activation account.
// @version		1.3
// @date		2013-10-04
// @namespace	
// @author		Nabi KaramAlizadeh (from Iran)
// @homepage	http://Nabi.ir/  And http://www.farsimeeting.com
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 
// @include		https://au.edit.yahoo.com/registration?.pd=&intl=au&origIntl=&done=http%3A%2F%2Fwww.yahoo.com%2F&wl=&wlcr=&_asdk_embedded=&create_alias=&.scrumb=&src=fpctx&last=&partner=yahoo_default&domain=yahoo.com&yahooid=&lang=en-AU
// ==/UserScript==

["", "_alt"].forEach(function(entry) {
	var parent = document.getElementById('countryMenu'+entry);
	var child = parent.children[1];
	var node = document.createElement("option");
	node.value = '+98';
	node.setAttribute('data-country-code', 'au');
	node.setAttribute('aria-label', 'Austuralia');
	node.innerHTML = 'Austuralia(+98)';
	parent.insertBefore(node, child);
	
	var obj = document.getElementById('replaceContainerCountryMenu'+entry);
	if (obj == null) {
		var obj = document.getElementById('countryMenuAnchor'+entry);
		obj.innerHTML = obj.innerHTML + '<span aria-live="assertive" class="famfamfam-flag-au" id="replaceContainerCountryMenu'+entry+'"><span id="selectCountryCode'+entry+'" aria-label="Selected Country - Austuralia" aria-live="assertive">+98</span><div class="arrow-container"><div class="bottom-dd-arrow"></div></div> </span>';
		document.getElementById('country-code'+entry).value = '98';
	}
	
	var obj = document.getElementById('country-code'+entry);
	if (obj.value == '61') {
		obj.value = '98';
		document.getElementById('replaceContainerCountryMenu'+entry).className = "famfamfam-flag-au";
		document.getElementById('selectCountryCode'+entry).setAttribute('aria-label', 'Selected Country - Austuralia');
		document.getElementById('selectCountryCode'+entry).innerHTML = '+98'
	}
	
});
