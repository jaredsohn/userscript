// ==UserScript==
// @name           Zooomr Fanmail Compose Fix
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Fixes the the Fanmail Compose screen to fill in the 'To' field
// @include        http://*.zooomr.com/fanmail/compose/to-*/
// ==/UserScript==

(function() {

	var url = window.location.href;
	var toName = (url.substr(url.indexOf('-')+1)).replace('/','');
	//GM_log('Name: ' + toName);
	var inputMsg = document.evaluate(
					'//input[@id="message_to"]'
					, document
					,null
					,XPathResult.FIRST_ORDERED_NODE_TYPE
					,null).singleNodeValue;
					
	if (inputMsg.value == '') {
		inputMsg.value = toName;
	}
	
})()