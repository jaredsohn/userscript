// ==UserScript==
// @name        NetD IP Engeli Asma
// @namespace   tv.netd.ipengel
// @description netd.com'da ABD için ülkeye göre IP bloklamasi engelini asmak icin.
// @include     http://*netd.com/*
// @include     https://*netd.com/*
// @author      sanilunlu
// @version		1.4
// ==/UserScript==

var runOnce = false;

document.body.onload = function() {
	if(!runOnce) {
		runOnce = true;
		setTimeout(function() {
			var scrs = document.getElementsByTagName('script');
			for (var i = 0; i < scrs.length; i++) {
				if (scrs[i].innerHTML.indexOf('allowedCountries') != -1) {
					var scr = scrs[i].innerHTML;
					scr = scr.replace("'tr'", "'tr','us'");
					var e = document.createElement('script');
					e.type = 'text/javascript';
					e.innerHTML = scr;
					document.body.appendChild(e);
					break;
				}
			}
		}, 1000);
	}
}
