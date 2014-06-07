// ==UserScript==
// @name           thisishome.sg Voting Captcha Copier
// @namespace      http://www.thisishome.sg
// @include        http://www.thisishome.sg/video.php?*
// ==/UserScript==

function performClick(node) {
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, false);
	node.dispatchEvent(evt);
}

function one() {
	captchaDiv = document.getElementById('vote_catcha');
	if(captchaDiv && captchaDiv.style.display == "block") {
		code = captchaDiv.getElementsByTagName('font')[1].innerHTML;
		tbox = captchaDiv.getElementsByTagName('input')[0];
		sbtn = captchaDiv.getElementsByTagName('input')[1];
		if(code && code.length == 6 && tbox && sbtn && sbtn.type == "image") {
			tbox.value = code;
			performClick(sbtn);
			setTimeout(two, 1000);
		}
	}
}

function two() {
	success = document.getElementById('vote_success').getElementsByTagName('img')[0];
	if(success) performClick(success);
}

(function() {
	voteBtn = document.getElementById('vote').getElementsByTagName('img')[0];
	if(voteBtn) performClick(voteBtn);
	setTimeout(one, 200);
})();