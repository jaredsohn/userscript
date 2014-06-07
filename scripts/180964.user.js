// ==UserScript==
// @name		Yahoo sign up for iranian
// @description	This script is for sign up iranian to the yahoo and to bypass sanctions on Iran by the yahoo site. After install you can select Iran country and set cell phone to receive sms for activation account.
// @version		1.0
// @date		2013-09-05
// @namespace	http://userscripts.org/scripts/review/177253
// @author		Nabi KaramAlizadeh (from Iran)
// @homepage	http://Nabi.ir/
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include		https://edit.yahoo.com/registration?intl=xe&src=maktoob&done=https%3A%2F%2Flogin.yahoo.com%2Fconfig%2Fvalidate%3F.src%3Dmaktoob_reg%26.pc%3D3784%26.intl%3Dxe%26.done%3Dhttps%3A%2F%2Flogin.maktoob.com%2Fylogin.php%3Fjump%3DYTo0OntzOjY6IkNoTmFtZSI7czo4OiJob21lcGFnZSI7czo1OiJDaFVSTCI7czoyODoiaHR0cDovL2VuLW1ha3Rvb2IueWFob28uY29tLyI7czo0OiJMYW5nIjtzOjI6ImVuIjtzOjU6InltcmVnIjtzOjE6IjEiO30-%26.intl%3Dxe%26.done%3Dhttp%253A%252F%252Fen-maktoob.yahoo.com%252F*
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
