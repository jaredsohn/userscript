// ==UserScript==
// @name           Time Warner Cable Network Status Page Format Fixer
// @namespace      trparky
// @description    This script modifies the page output of the Time Warner Cable Network Status Page so that it's easier to read by putting spaces in between table lines for network events.
// @include        http://help.rr.com/HMSLogic/network_status.aspx
// @Version        1.07
// ==/UserScript==

(function () {
 	documentBody = document.body.innerHTML;

	// If the browser is Google Chrome and the page contains evidence of the Google
	// Chrome Toolbar extension installed, this code is executed to fix a conflict
	// with this script and the Google Chrome Roboform Toolbar extension.
	if ( (/roboform-adapter/i.test(documentBody)) && (/Chrome/i.test(navigator.userAgent)) ) {
		documentBody = documentBody.replace(/ sourceindex="[0-9]+"/ig, "");
	}

 	documentBody = documentBody.replace(/<\/tr><tr>/ig, '</tr><tr><td colspan="3">&nbsp;</td></tr><tr>');
 	document.body.innerHTML = documentBody;
})();