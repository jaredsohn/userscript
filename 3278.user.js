// ==UserScript==

// @name           Anruf mit dastelefonbuch und Sipgate

// @namespace      http://userscripts.org/scripts/source/3278.user.js

// @description    Einen Anruf mit Sipgate.de direkt aus der Telefonbuchsuche machen

// @include        http://*.dastelefonbuch.de/*, http://*.gelbeseiten.de/*

// ==/UserScript==
var allDivs, thisDiv, alldivsGS, thisdivGS, telefonnummer;
ergebnis = document.URL.search(/dastelefonbuch/ig);
if (ergebnis > 1) {
allDivs = document.evaluate( "//div[@class='phonenr']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
thisDiv = allDivs.snapshotItem(i);
telefonnummer = thisDiv.innerHTML.replace(/[^0-9]/ig,"");
thisDiv.innerHTML = thisDiv.innerHTML +links_zu_voip (telefonnummer)
}
}
ergebnis = document.URL.search(/gelbeseiten/ig);
if (ergebnis > 1) {
allDivsGS = document.evaluate( "//td[@class='ausgabe']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allDivsGS.snapshotLength; i++) {
thisDivGS = allDivsGS.snapshotItem(i);
ergebnis = thisDivGS.innerHTML.search(/Telefon/ig);
if (ergebnis >1 ) {
telefonnummer = thisDivGS.innerHTML.replace(/[^0-9]/ig,"");
thisDivGS.innerHTML = thisDivGS.innerHTML + links_zu_voip (telefonnummer)
}
}
}

function links_zu_voip (telefonnummer){
links_zu_voip_string  =' <A href="https://secure.sipgate.de/user/ctd.php?target=sip%3A'+
	telefonnummer+'%40sipgate.de">SG</a>'+
                       ' <A href="http://localhost/cgi-bin/m/placecall3.pl?webdial='+
                        telefonnummer+'>LO</a>';
return links_zu_voip_string;
}

