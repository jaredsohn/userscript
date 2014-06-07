// ==UserScript==
// @name           Facebook Remove Duplicate Posts
// @namespace      http://userscripts.org/
// @description    Hide duplicates caused by expanding Similar Posts
// @include        http://www.facebook.com/*
// ==/UserScript==

function removeDupes(){
	var stories=document.evaluate(".//abbr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var l=stories.snapshotLength;
	if(l==0) return;
	for(i=0;i<l;i++) {
		var timestamp = stories.snapshotItem(i).title
		var dupes = document.evaluate(".//abbr[@title='" + timestamp + "']/ancestor::li[contains(@class,'uiStreamStory') and not(.//*[contains(@class,'passive')])]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var sl = dupes.snapshotLength
		if (sl>1) {
			var actor = document.evaluate(".//a[@class='actorName'][1]", dupes.snapshotItem(0), null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;		 
			for (j=1;j<sl;j++){
				if (actor == document.evaluate(".//a[@class='actorName'][1]", dupes.snapshotItem(j), null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.innerHTML){
					dupes.snapshotItem(j).parentNode.removeChild(dupes.snapshotItem(j));
				}
			}
		}
	}
}

window.setInterval(removeDupes, 2500);