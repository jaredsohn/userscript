// ==UserScript==
// @name           G15Forums Ad Remover
// @namespace      http://www.otsegolectric.com/greasemonkey/
// @description    Removes the advert "posts" and "topics" from the G15Forums
// @include        http://g15forums.com/forum/*
// @include        http://www.g15forums.com/forum/*
// ==/UserScript==

var forumLogo = document.evaluate("//a[@href='index.php']/img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if(forumLogo.snapshotLength != 0){
	forumLogo = forumLogo.snapshotItem(0);
	var currentPage = "" + window.location;
		if(currentPage.toLowerCase().match("\/viewtopic.php")){
			if(forumLogo.src.toLowerCase().match("\/acidtech\/")){
				var advertTableRow = document.evaluate("/html/body/table/tbody/tr/td/table[3]/tbody/tr/td/table[3]/tbody/tr", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				advertTableRow.snapshotItem(4).parentNode.removeChild(advertTableRow.snapshotItem(4));
				advertTableRow.snapshotItem(5).parentNode.removeChild(advertTableRow.snapshotItem(5));
			} else if(forumLogo.src.toLowerCase().match("\/subsilver\/")){
				var advertTableRow = document.evaluate("/html/body/table/tbody/tr/td/table[4]/tbody/tr", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				advertTableRow.snapshotItem(4).parentNode.removeChild(advertTableRow.snapshotItem(4));
				advertTableRow.snapshotItem(5).parentNode.removeChild(advertTableRow.snapshotItem(5));
			}
		}
		else if(currentPage.toLowerCase().match("\/viewforum.php")){
			if(forumLogo.src.toLowerCase().match("\/acidtech\/")){
				var advertTableRow = document.evaluate("/html/body/table/tbody/tr/td/table[3]/tbody/tr/td/form/table[2]/tbody/tr[6]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				advertTableRow.snapshotItem(0).parentNode.removeChild(advertTableRow.snapshotItem(0));
			} else if(forumLogo.src.toLowerCase().match("\/subsilver\/")){
				//do nothing as there's currently no advert
			}
		}
}