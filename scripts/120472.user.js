<style type="text/css">
</style>
// ==UserScript==
// @name        ลบโฆษณา Facebook By NonGyEn
// @namespace   http://code-poet.net/
// @description Remove Ads Facebook
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @author      Vaughan Chandler
// @timestamp   1299644556453
// @version     1.0
// ==/UserScript==

function Remove_All_Facebook_Ads() {
//ซ่อนโฆษณาหน้าแรก
	var pagelet_ego_pane_w = document.getElementById('pagelet_ego_pane_w');
	if (pagelet_ego_pane_w && pagelet_ego_pane_w.style.visibility != 'hidden') {
		pagelet_ego_pane_w.style.visibility = 'hidden';
	}
    
    	var pagelet_ego_pane = document.getElementById('pagelet_ego_pane');
	if (pagelet_ego_pane && pagelet_ego_pane.style.visibility != 'hidden') {
		pagelet_ego_pane.style.visibility = 'hidden';
	}

	var ego_column = document.getElementById('ego_column');
	if (ego_column && ego_column.style.visibility != 'hidden') {
		ego_column.style.visibility = 'hidden';
	}
	var pagelet_side_ads = document.getElementById('pagelet_side_ads');
	if (pagelet_side_ads && pagelet_side_ads.style.visibility != 'hidden') {
		pagelet_side_ads.style.visibility = 'hidden';
	}

    
//	var pagelet_current = document.getElementById('pagelet_current');
//	if (pagelet_current && pagelet_current.style.visibility != 'hidden') {
//		pagelet_current.style.visibility = 'hidden';
//	}
    
  	var elements = document.evaluate(
		"//div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad')] | //div[contains(@class, 'sponsor')] | //div[contains(@id, 'sponsor')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	for (var i = 0; i < elements.snapshotLength; i++) {
		var thisElement = elements.snapshotItem(i);
		//GM_log("Removing Facebook ad element with class='" + thisElement.className + "' and id='" + thisElement.id + "'.");
    	thisElement.parentNode.removeChild(thisElement);
	}

}

document.addEventListener("DOMNodeInserted", Remove_All_Facebook_Ads, true);