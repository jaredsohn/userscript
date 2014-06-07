// ==UserScript==
// @name           MegaUpload / Porn AutoWait
// @namespace      megauplorn.com
// @include        http://www.megaporn.com/?d=*
// @include        http://www.megaupload.com/?d=*
// ==/UserScript==

var MegaUploadAutoWait = {
	init: function() {
		document.title = 'Mega AutoWait';
		this.cleanLook();
		if ( document.location.href.indexOf('c=premium') > 0 ) {
			document.title = 'Go back!';			
		}else if (document.getElementById('captchafield')) {
			this.pageCaptcha();
		} else if (document.getElementById('countdown')) {
			this.pageCount();
		}
	},
	cleanLook: function() {
		if (document.getElementById('tabs')) {
			var elem = document.getElementById('tabs');
			elem.parentNode.removeChild(elem);
		}
		try {
			elem = document.getElementsByTagName('img')[0].parentNode;
			if (elem.tagName == "A") {
				elem.parentNode.removeChild(elem);
			}
			elem = document.getElementsByTagName('img')[0].parentNode;
			if (elem.tagName == "A" && elem.parentNode.tagName == "TD" && elem.parentNode.parentNode.offsetParent.tagName == 'TABLE') {
				elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
			}
			elem = document.getElementsByTagName('img')[document.getElementsByTagName('img').length-1].parentNode;
			if  (elem.tagName == "A" && elem.parentNode.tagName == "TD" && elem.parentNode.parentNode.offsetParent.tagName == 'TABLE') {
				elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
			}
		} catch (e) { ; }
	},
	pageCaptcha: function() {
		document.title = 'Mega Waiting for Captcha';
		document.getElementById('captchafield').setAttribute('autocomplete','off');
	},
	pageCount: function() {
		document.title = 'Mega Waiting..';
		this.waiting();
	},
	waiting: function () {
		document.title = 'Mega Waiting... '+document.getElementById('countdown').textContent;
		if (document.getElementById('downloadlink').style.display === "") {
		document.title = 'Mega Success... ';
			document.location = document.getElementById('downloadlink').getElementsByTagName('a')[0].href;
		} else {
			setTimeout(MegaUploadAutoWait.waiting, 500);
		}
	}
};

MegaUploadAutoWait.init();