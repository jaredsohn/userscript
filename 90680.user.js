// ==UserScript==
// @name           fc2web hide ads
// @revision       2
// @author         KID a.k.a. blueberrystream
// @description    fc2webの広告を隠します
// @namespace      http://kid0725.usamimi.info
// @include        http://*.fc2web.com/*
// ==/UserScript==

void(function() {

document.getElementById('fc2_footer_menu').style.display = 'none';

var as = document.getElementsByTagName('a');
for (i = 0; i < as.length; i++) {
	if (as[i].getAttribute('href') == 'http://fc2.com/') {
		as[i].parentNode.parentNode.parentNode.parentNode.style.display = 'none';
	}
}

var iframes = document.getElementsByTagName('iframe');
for (i = 0; i < iframes.length; i++) {
	if (iframes[i].getAttribute('src') == 'http://news.fc2.com/fc2web.html') {
		iframes[i].width = 0;
		iframes[i].height = 0;
	}
}

})();