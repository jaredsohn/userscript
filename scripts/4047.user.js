// Pandora Ad Remover
// ------------------
// By Aviv Goll
//
// This is my first attempt at userscripting (The pandora ad was just added
// really distastefuly).
// I have no idea what most of the javascript means, I just copied it.
// Feel free to improve or change it.
//
// ==UserScript==
// @name           Pandora Ad Removal
// @description    Removes the ad from pandora.
// @include        http://*Pandora.com/
// ==/UserScript==

var addiv, adfaqdiv;

addiv = (document.evaluate("//div[@id='advertisement']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null)).snapshotItem(0);
addiv.parentNode.removeChild(addiv);

adfaqdiv = (document.evaluate("//div[@id='ad_faq_link']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null)).snapshotItem(0);
adfaqdiv.parentNode.removeChild(ad_faq_link);

