// ==UserScript==
// @name          eRepublik INCI
// @namespace     http://inci.sozlukspot.com
// @description   O tepedeki duyuruları değiştirip inci ile ilgili duyuruları şettiriyo. (mrdennis)
// @include       http://erepublik.com/en
// @include       http://erepublik.com/tr
// @include       http://www.erepublik.com/en
// @include       http://www.erepublik.com/tr
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@id='country_status']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
	var yeni = '<div id="country_status">' +
'<div class="top_display">' +
'<img src="http://www.erepublik.com/images/modules/homepage/radar_symbol.png" alt="" class="symbol">' +
'<img src="http://www.erepublik.com/images/modules/homepage/cstat.gif" alt="" class="title">' +
'<h2>Currently <strong>Cyprus</strong> is at war with <strong>Saudi Arabia</strong> and <strong>Egypt</strong>. We"re fighting to become a superpower.</h2>' +
'<img src="http://www.erepublik.com/images/flags/L/Cyprus.gif" alt="" class="flags">' +
'</div>' +
'<div class="closer">' +
'<div class="zone_news">' +
'<table width="100%">' +
'<tbody><tr>' +
'<td>' +
'<ul>' +
'<li>' +
'<span>' +
'17 hours agoaasadasdsdssdsadds, Egypt regained Beersheba South District.	</span>' +
'</li>' +
'<li>' +
'<span>' +
'2 days assdadsadgo, Egypt regained Al Madinah.	</span>' +
'</li>' +
'<li>' +
'<span>' +
'2 days adsadsadsago, our army successfully defended Makkah against the resistance forces of Saudi Arabia.	</span>' +
'</li>' +
'</ul>' +
'</td>' +
'</tr>' +
'</tbody></table>' +
'</div>' +
'</div>' +
'</div>'
	document.body.innerHTML= document.body.innerHTML.replace(new RegExp(allDivs, "g"), yeni);
}