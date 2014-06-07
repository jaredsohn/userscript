// ==UserScript==
// @author 	   azafel - riominho@gmail.com
// @name           No ads in seriesyonkis
// @description    This script removes ads from seriesyonkis web page
// @include        http://www.seriesyonkis.com/* 
// ==/UserScript==

function clean () {
	iframes = document.getElementsByTagName("iframe"); 
	for (i = 0; i < iframes.length; i++) { 
		if (iframes[i].src.indexOf("http://ads.staticyonkis.com") >= 0) {
			iframes[i].src="about:blank";
		} 
	}
}
clean();
