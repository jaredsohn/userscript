// ==UserScript==
// @name           Better New Digg
// @version        2.1
// @namespace      Scorchy, Eric Vold and mikec20 - compiled by Scorchy
// @description    Disables announcements, promotions, adverts and the annoying newsletter sign-up pane.
// @include     http://digg.com/*
// @include     http://*.digg.com/*
// ==/UserScript==

//*START* Digg Remove Newsletter Signup by Scorchy

(function(){
	var tempEles = document.getElementsByClassName('module-invites','module-group');

	// remove known ad class names
	for (var j = tempEles.length-1; j > -1; j++) {
		tempEles[j].parentNode.removeChild(tempEles[j]);
	}
})();

//*END* Digg Remove Newsletter Signup by Scorchy

//*START* Digg.com Disable Announcements and Promos script by mikec20

var allDivs = document.getElementsByTagName('div');
var topDivs = new Array();
for (var i=0; i < allDivs.length; i++) {
    if(allDivs[i].getAttribute('id') == 'announce' || allDivs[i].getAttribute('class') == 'promo' || allDivs[i].getAttribute('class') == 'rec-info' ) {
        topDivs.push(allDivs[i]);
        allDivs[i].style.display = 'none';
    }
}


//allDivs[i].getAttribute('id') == 'recommended-list' || allDivs[i].getAttribute('class') == 'promo' || allDivs[i].getAttribute('class') == 'side-container'

//*END* Digg.com Disable Announcements and Promos script by mikec20

//*START* Digg Ads Remover by Eric Vold

(function(){
	var adIDAry = ['advertisement','ad','sponsor-banner','div#topads','topads','block_ad_msft','module-invites','module-group','invite'],
		classNameAry = ['advertisement','ad','sponsored','ad-list','promo','module-invites','module-group','invite'],
		tempEle = null,
		tempEles = null;

	// remove known ad ids
	for (var i = 0; i < adIDAry.length; i++) {
		tempEle = document.getElementById(adIDAry[i]);
		if (tempEle) tempEle.parentNode.removeChild(tempEle);
	}
	// remove known ad class names
	for (var i = 0; i < classNameAry.length; i++) {
		tempEles = document.getElementsByClassName(classNameAry[i]);
		for (var j = 0; j < tempEles.length; j++) {
			tempEles[j].parentNode.removeChild(tempEles[j]);
		}
	}
})();

//*END* Digg Ads Remover by Eric Vold