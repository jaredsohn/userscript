// ==UserScript==
// @name           Remove All youtube Ads
// @namespace      http://userscripts.org/scripts/show/94763
// @description    Removes any and all ads from Youtube
// @version 	   0.2
// @include        http://*.youtube.*
// @include        https://*.youtube.*
// @history	   0.1 Created
// @history	   0.2 Removed user banner ad.
// ==/UserScript==

var hide = false;

function hasData(data)
{
	var bRet = false;
	if(data != null && data != "" && typeof(data) != "undefined") {
		bRet = true;
	}
	return bRet;
}

function ParsePage() {
	var obj = document.evaluate(
		"//div[contains(@class,'ad-div')] | //iframe[contains(@id,'ad')] | //div[contains(@class,'yt-alert')] | //div[contains(@id,'watch-channel-brand')] | //div[contains(@id,'user_banner')] | //div[contains(@id,'iyt-login-suggest-box')] | //div[contains(@class,'promoted')] | //div[contains(@id,'search-pva-content')] | //div[contains(@class,'show-onebox')] | //div[contains(@id,'tip')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for(var i = 0; i < obj.snapshotLength; i++) {
		var thisElement = obj.snapshotItem(i);
		if(thisElement){
			var node = thisElement;
			if(node.style.visibility !== 'hidden');
				node.style.visibility = 'hidden';
			if(node.nodeType === 1 && node.style.visibility === 'hidden'){
				while(node.childNodes.length>=1)
				{
					node.removeChild(node.firstChild);
					if(node.childNodes.length == 0 && node.nodeType === 1){
						node.parentNode.removeChild(node)
					}
				};
			}			
    }
	}
		if(hide){
		 	var thisElement = document.getElementById('rightCol');
		 	if(thisElement){
		 		var node = thisElement;
				if(node.style.visibility !== 'hidden');
					node.style.visibility = 'hidden';
				if(node.nodeType === 1 && node.style.visibility === 'hidden'){
					while(node.childNodes.length>=1)
					{
						node.removeChild(node.firstChild);
						if(node.childNodes.length == 0 && node.nodeType === 1)
							node.parentNode.removeChild(node);
					}
				}			 		
			}			
		}		
}
document.addEventListener("DOMNodeInserted", ParsePage, true);
