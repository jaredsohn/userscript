// ==UserScript==
// @name           Cracked photoplasty auto article mode
// @description    Bypasses the spastic page that asks you how you want to view photoplasty 
// @include        http://www.cracked.com/photoplasty*
// @exclude        http://www.cracked.com/photoplasty*?view=article*
// @version        1.0
// ==/UserScript==

var anchors = document.getElementsByTagName('a');
for (var i = 0; i < anchors.length; i++) {
	if (anchors[i].innerHTML == "Article View") {
		anchors[i].click();
	}
}
