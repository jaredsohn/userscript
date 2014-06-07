// ==UserScript==
// @name           BiggerMine 2 (FIXED)
// @namespace      http://sockclap.selfip.com/
// @description    Make the applet res bigger in minecraft
// @include        http://*minecraft.net/play.jsp*
// ==/UserScript==

all = document.getElementsByTagName('*');

for (var i = 0; i < all.length; i++) {
    element = all[i];
	if (element.nodeName == 'APPLET') {
		element.setAttribute('width', '1366');
		element.setAttribute('height', '768');
	}
}