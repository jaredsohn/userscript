// ==UserScript==
// @name		stasiVZ logo
// @author		JaSK
// @include       http://schuelerVZ.net/*
// @include       http://*.schuelerVZ.net/*
// @include       http://studiVZ.net/*
// @include       http://*.studiVZ.net/*
// @include       http://meinVZ.net/*
// @include       http://*.meinVZ.net/*
// ==/UserScript==

var logo = document.getElementById('Logo');
if (logo != null) {
    logo.innerHTML = '<a href="/" rel="nofollow" title="zur Startseite"><img src="http://danielmack.de/wp-content/uploads/2007/12/stasi.jpg" alt="Logo stasiVZ, Link zur Startseite" width="100%"/></a>';
}

var snapImages = document.evaluate("//img[contains(@src,'pvz_logo_wm2010.png')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=snapImages.snapshotLength - 1; i >= 0; i--) {
	var elm = snapImages.snapshotItem(i);
    var width = elm.width;
    elm.src = 'http://danielmack.de/wp-content/uploads/2007/12/stasi.jpg';
    elm.width = width;
}