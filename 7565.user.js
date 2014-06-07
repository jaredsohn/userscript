// ==UserScript==
// @name           Economist Ad Remover
// @description    Remove ads from the Economist
// @version        1.0
// @author         Sherman Mui
// @namespace      economist.com:adremover:sherman
// @include        http://*.economist.com/*
// ==/UserScript==


function xpath(query) {
	return document.evaluate(query, document, null,
	                         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function removeAds(){
    bannerDivs = xpath("//div[contains(@class, 'banner')]");
    for (i = 0; i < bannerDivs.snapshotLength; i++) {
        banDiv = bannerDivs.snapshotItem(i);
        banDiv.parentNode.removeChild(banDiv);
    }
    
    var sponsored = document.getElementById('bannerspace-bottom');
    if (sponsored) {
        sponsored.parentNode.removeChild(sponsored);
    }
}

(function () {
  removeAds();
}());
