// ==UserScript== 
// @name                menghilangkan iklan di facebook
// @version	       1.0
// @run-at               document-start
// @author		      ivanttoivank
// @include             *facebook*
// @include             *facebook.com/profile.php?id=*
// ==/UserScript== 


var hideBookmarks = false;
var hideTicker = false;
var hideAll = false;

// Returns true if data is in some way "not empty"
function hasData(data)
{
	var bRet = false;
	if(data != null && data != "" && typeof(data) != "undefined") {
		bRet = true;
	}
	return bRet;
}

// Possible bug in firefox, using error trapping to fix this oddity with top.location == location
function isTopWindow(l){
	try{
		if(hasData(l)){
			if(top.location == l){
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} catch(e){
		return false;
	}
}

function isAppPage(){
	if((isTopWindow(location) != false) && (/\apps.facebook\.com$/i.test(location.hostname))) {
		return true;
	}	
	return false;
}

// this function has been updated so that specific xpath matches get removed first in a top down manner
// This allows ads on certain pages to be removed 'first' so that other matches further down the chain won't happen
// This addresses a problem where fan, group, app (main) pages would be displayed abnormally
// This ads a bit more code but overall performance shouldn't suffer because previously removed nodes won't be caught more than one time.
function ParsePage() {
	var Obj = document.evaluate(
		"//div[contains(@id,'rightCol')] | //div[contains(@class,'UIStandardFrame_SidebarAds')] | //div[contains(@class,'fbTimelineSideAds')]", 
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	// goes back 3 parents
	var AdObj = document.evaluate(				//muffin_tracking_pixel_startfbAdUnit,//a[contains(@href,'/ads/')]//h4[contains(text(),'Related Ads')] | //h4[contains(text(),'Play It Again')]
		"//div[contains(@class,'fbAdUnit')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	var OtherAdObj = document.evaluate(						
		"//div[contains(@id,'pagelet_side_ads')] | //div[contains(@id,'pagelet_ego_pane_w')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);	
	if(hasData(Obj) && hasData(OtherAdObj)){
		//GM_log('Found Obj and AdObj');
		// begin AdObj loop
		for(var i = 0; i < OtherAdObj.snapshotLength; i++) {
			var adElement = OtherAdObj.snapshotItem(i);
			if(adElement){
				//GM_log('AdElement: exists');
				var AdNode = adElement;
				if(AdNode.style.visibility !== 'hidden' && AdNode.nodeType === 1){
					//GM_log('AdElement: visibility hidden');
					AdNode.style.visibility = 'hidden';
				}
				if(AdNode.nodeType === 1 && AdNode.style.visibility === 'hidden'){
					while(AdNode.childNodes.length>=1)
					{
						AdNode.removeChild(AdNode.firstChild);
						if(AdNode.childNodes.length == 0 && AdNode.nodeType === 1){
							AdNode.parentNode.removeChild(AdNode)
						}
					};
				}
			}
		}	// end AdObj loop		
	}
	if(hasData(Obj) && hasData(AdObj)){
		//GM_log('Found Obj and AdObj');
		for(var i = 0; i < AdObj.snapshotLength; i++) {
			var adElement = AdObj.snapshotItem(i);
			if(adElement){
				//GM_log('AdElement: exists');
				var AdNode = adElement.parentNode.parentNode.parentNode;
				if(AdNode.style.visibility !== 'hidden' && AdNode.nodeType === 1){
					//GM_log('AdElement: visibility hidden');
					AdNode.style.visibility = 'hidden';
				}
				if(AdNode.nodeType === 1 && AdNode.style.visibility === 'hidden'){
					while(AdNode.childNodes.length>=1)
					{
						AdNode.removeChild(AdNode.firstChild);
						if(AdNode.childNodes.length == 0 && AdNode.nodeType === 1){
							AdNode.parentNode.removeChild(AdNode)
						}
					};
				}
			}
		}	// end AdObj loop
	}
	return;
}
document.addEventListener("DOMNodeInserted", ParsePage, true);