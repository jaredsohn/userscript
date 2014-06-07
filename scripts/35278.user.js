// ==UserScript==
// @name           NYT Financial Charts
// @namespace      http://ifelse.org
// @description    Update financial charts every 10 seconds in 'real time'
// @include        http://www.nytimes.com/
// @include        http://www.nytimes.com/pages/business/index.html
// @include        http://www.nytimes.com/*/business/*.html
// ==/UserScript==

function refreshChart() {
	var imgs = document.getElementsByTagName('img');
	var imgSrc = "";
	for (var i = 0; i < imgs.length; i++) {
		imgSrc = imgs[i].src;
		if (imgSrc.indexOf("markets.on.nytimes.com/research/tools/builder")>-1) {
			var isCached = imgSrc.indexOf("&cache");
			if (isCached>-1) {
				imgs[i].src = imgSrc.substr(0, isCached) + '&cache=' + (new Date()).getTime();
			} else {
				imgs[i].src = imgSrc + '&cache=' + (new Date()).getTime();
			}
			setTimeout(refreshChart, 10000);
		}
	}
}

window.addEventListener('load', refreshChart(), false);
