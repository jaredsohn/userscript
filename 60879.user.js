// ==UserScript==
// @name           Orange Send SMS Defaults
// @namespace      http://userscripts.org/users/71721
// @description    Automatically fills in user defaults
// @include        https://services.orange.co.uk/wps/myportal/*
// ==/UserScript==

(function() {

	var usr_pref = GM_getValue('orange_usr', 0);

	var anchors = document.getElementsByTagName('a');
	var inputs = document.getElementsByTagName('input');
	
	for (var i = 0; i < anchors.length; i++) {
	
		//page 3
		if (anchors[i].innerHTML == "send another message?") {
			document.location.href = anchors[i].href;
		}
		
		//page 1
		if (anchors[i].href == "javascript:resetform()") {
			unsafeWindow.document.smsform.sms_from_rad[usr_pref].checked = true;
			unsafeWindow.update_allowed(120+(usr_pref*40));
		}

	}
	for (var j = 0; j < inputs.length; j++) {
		
		//page 2
		if (inputs[j].name == "request2") {
			GM_setValue('orange_usr', unsafeWindow.document.smsform.sms_from_rad.value);
			inputs[j].click();
		}
		
	}
		
		
})();