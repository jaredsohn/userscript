// ==UserScript==
// @name	            Disable the Google Docs Conversion Nag
// @namespace    http://userscripts.org/users/378364
// @description    Automatically dismisses the wretched "Would you like to see this document in the latest version of the editor?" prompt.
// @include          https://docs.google.com/Doc*
// @copyright       Chris Franson, 2011
// @version          1.1
// @license           Released under the MIT, BSD, and GPL Licenses.
// ==/UserScript==

var removeButter = function() {

	var butter = window.document.getElementById('GDS_pageButter');

	if (butter) {
		var dismiss = butter.getElementsByClassName('closebox')[0];
		if (dismiss) {
			dismiss = dismiss.parentNode;
			if (dismiss) {
				if (dismiss.click) dismiss.click();
				else if (dismiss.onclick) dismiss.onclick();
			}
		}
	}

	if (butter) butter.parentNode.removeChild(butter);

};

setTimeout(removeButter, 100);
