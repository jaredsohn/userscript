// ==UserScript==
// @name           More di
// @namespace      userscripts.org
// @description    Collapes the top bar (containing the big ad) on di.se (opens when mouse over)
// @include        http://*di.se/Funktioner/StockClocks.aspx*
// @include        http://borssnack.di.se/Diseconf/Topbanner*
// ==/UserScript==

var main = (/Clocks/).test(document.location.href);

var frame = window.top.document.getElementsByTagName('frameset')[0];
var height = frame.getAttribute('rows');
frame.setAttribute('rows', (main?'20,*':'20,44,*'));

function show() {
	frame.setAttribute('rows', height);
}

function hide() {
	frame.setAttribute('rows', (main?'20,*':'20,44,*'));
}

document.addEventListener('mouseover', show, false);
document.addEventListener('mouseout', hide, false);

function removeAd() {
	var ads = window.top.document.getElementsByName('frmStortavla')[0].contentDocument;
	var ad = ads.getElementById('StortavlaDiv');
	ad.parentNode.removeChild(ad);
	ad = ads.getElementById('StortavlaBGdiv');
	ad.parentNode.removeChild(ad);
}

if (main) {
	try {
			removeAd();
	} catch (e) {
		window.setTimeout(removeAd, 500)
	}
}