// ==UserScript==
// @name           NHL Shift Charts 08/09
// @namespace      TOI
// @description    For using timeonice.com shift charts and H2H on NHL.com scores page. Updated for redesigned 08/09 nhl.com scores page. Based on original (http://userscripts.org/scripts/show/13503) by nameht
// @include        http://*.nhl.com/*
// ==/UserScript==


var link;
link = document.body.getElementsByTagName("a")
for (var i = 0; i < link.length; i++) {

var h2h06 = /.*20062007*.*TH0*.*(\d\d\d\d\d)\.htm$/i;
link[i].href = link[i].href.replace(h2h06, "http://www.timeonice.com/H2H0607.html?GameNumber=" + "$1" + "&submit=Go");
	
var h2h07 = /.*20072008*.*TH0*.*(\d\d\d\d\d)\.htm$/i;	
link[i].href = link[i].href.replace(h2h07, "http://www.timeonice.com/H2H0708.html?GameNumber=" + "$1" + "&submit=Go");

var h2h08 = /.*20082009*.*TH0*.*(\d\d\d\d\d)\.htm$/i;	
link[i].href = link[i].href.replace(h2h08, "http://www.timeonice.com/H2H0809.html?GameNumber=" + "$1" + "&submit=Go");

var sc = /.*TV0*.*(\d\d\d\d\d)\.htm$/i;
link[i].href = link[i].href.replace(sc, "http://www.timeonice.com/default.html?GameNumber=" + "$1" + "&submit=Go");

}

var teamLinks = document.evaluate("//td[starts-with(text(), 'TOI')]//a", document, null, 7, null);
for(var i=0; i < teamLinks.snapshotLength; i++){
  teamLinks.snapshotItem(i).textContent = "Shift Charts";
  i++;
  teamLinks.snapshotItem(i).textContent = "H2H";
}

// 08/09 scores page has a different format
var teamLinks = document.evaluate("//a[contains(@href, 'timeonice.com')]", document, null, 7, null);
for(var i=0; i < teamLinks.snapshotLength; i++){
  teamLinks.snapshotItem(i).textContent = "Shift Charts";
  i++;
  teamLinks.snapshotItem(i).textContent = "H2H";
}
