// ==UserScript==
// @name           FileServe Download Helper
// @namespace      FileServe
// @descript       FileServer Download Helper automaticly open recaptcha window and automaticly download new file where time is over. Conceive to skip the stupid 30sec-link-expired rule. Only for non-premium user. Warning : this script doesn't help you to download speeder or without waiting. It's just a click assistant.
// @include        http://www.fileserve.com/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var state = 0;


function tmp() {
	if (state == 0) {
		$("#regularBtn").unbind('click');
		$("#recaptcha_response_field").focus();
		unsafeWindow.Landing.checkDownload();
		state = 1;
		return;
	}

	if (state == 1) {

		var diov = document.getElementById('regularBtn2');
		if (diov != null && diov.style.display != "none")
		{
			$("#regularForm").submit();
		}
	}
}

window.setInterval(tmp, 1000); 
