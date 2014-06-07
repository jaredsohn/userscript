// ==UserScript==
// @name           Remove All Facebook Ads
// @author         MAGO
// @version        1.6
// @description    Rimuove pubblicità e sponsor da Facebook
// @include        *facebook.com*
// ==/UserScript==

function Remove_All_Facebook_Ads() {

	var canvasSidebar = document.getElementById('canvasSidebar');
	if (canvasSidebar && canvasSidebar.style.visibility != 'hidden') { //Prevents the visibility from being set multiple times unnecessarily
		//GM_log("Removing Facebook sidebar ads.");
		UcanvasSidebar.style.visibility = 'hidden';
	}

	var divToRemove = document.getElementById('pagelet_ego_pane_w');
	if (divToRemove) {
		divToRemove.style.display = 'none';
	}
	
	divToRemove = document.getElementById('rightCol');
	if (divToRemove) {
		divToRemove.style.display = 'none';	
	}
	
	divToRemove = document.getElementById('appsNav');
	if (divToRemove) {
		divToRemove.style.display = 'none';	
	}
	
	divToRemove = document.getElementById('pagesNav');
	if (divToRemove) {
		divToRemove.style.display = 'none';	
	}	

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