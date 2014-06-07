// ==UserScript==
// @name          	Hide facebook ads by Junandia
// @namespace   	facebook
// @description	Hides facebook advertisments
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://*.facebook.com/ajax/*
// @version        001
// ==/UserScript==

function hideAdsContainerByClassName(name) {
	var possibleAdsContainer = document.getElementsByClassName(name); 
	if (possibleAdsContainer == null || typeof possibleAdsContainer === "undefined" ) {
		return;
	} else {
		for (var i = 0; i < possibleAdsContainer.length; i++) {
			hideAdsContainer(possibleAdsContainer[i]);
		}
	}
}
function hideAdsContainer(container) {
	if (container != null || typeof container != "undefined" ) {
		var ads = container.getElementsByClassName('fbAdUnit');
		if(ads != null && typeof ads != "undefined" && ads.length > 0) {
			container.style.display = "none";
		}
	}
}

function hideAds() {
	hideAdsContainerByClassName('ego_column');
}

document.addEventListener("DOMNodeInserted", hideAds, true);