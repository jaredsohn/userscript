// ==UserScript==
// @name          MTS.UA Ad's Killer (Opera version)
// @description	  mts.com.ua without ads (eg. Send SMS: http://www.mts.com.ua/misc/print_version.php)
// @author        vady <me@vady.kiev.ua>
// @include       http://*mts.com.ua/*
// ==/UserScript==

(function() {
	// corrects html (show the form, hide ad frame)
	window.opera.addEventListener('BeforeEvent.load', function() {
		var ads; if (ads = document.getElementById('smsAdvert')) ads.parentNode.removeChild(ads);
		if(document.getElementById('pageContent')) document.getElementById('pageContent').style.visibility='visible';
	}, false);
	// prevents of junk loading
	window.opera.addEventListener('BeforeExternalScript', function(e) {
		if(e.element.getAttribute('src').match(/(sms\.adv\.js|banner_block)/i)) {
			e.preventDefault();
		}
	}, false);
})();