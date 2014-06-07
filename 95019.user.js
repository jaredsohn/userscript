// ==UserScript==
// @name           Recaptcha Reload
// @author         bob23646
// @namespace      http://bob23646.deviantart.com/
// @description    reloads captcha using backspace, removes captcha buttons
// @include        http*://boards.4chan.org/*

// @include        http*://sys.4chan.org/*/*mode=report*
// ==/UserScript==

(function() {
	var onlyWhenEmpty = true;
	function onKeyDown(ke) {
		if(ke.which == 8 && !(onlyWhenEmpty && ke.target.value.length > 0)) {
			try {
				unsafeWindow.Recaptcha.reload();
			} catch(ex) {
				var ce = document.createEvent('HTMLEvents');
				ce.initEvent('click', true, true);
				document.getElementById('recaptcha_reload_btn').dispatchEvent(ce);
			}
			ke.target.value = '';
		}
	}
	function addListener(cx) {
		var input = document.evaluate('.//input[@name="recaptcha_response_field"][1]', cx, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if(input != undefined) {
			input.addEventListener('keydown', onKeyDown, true);
		}
	}
	function onNodeInserted(e) {
		if(e.target.nodeType == 1) {
			addListener(e.target);
		}
	}
	addListener(document);
	document.addEventListener('DOMNodeInserted', onNodeInserted, true);
})();

(function() {
var css = "img[src*=\"http://www.google.com/recaptcha/api/img/clean/refresh.png\"], img[src*=\"http://www.google.com/recaptcha/api/img/clean/audio.png\"], img[src*=\"http://www.google.com/recaptcha/api/img/clean/help.png\"] { display: none !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();