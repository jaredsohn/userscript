// ==UserScript==
// @name           entity correct
// @namespace      saintjimmy
// @description    Faster Deletion of entity topics
// @include        http://forums.myspace.com/*.aspx?fuseaction=forums.viewforum*
// ==/UserScript==
// Last Modified: FEB 15, 2008
// CREDITS: Created by Dave (myspace.com/_saintjimmy).
// the original script is mostly a clone of
// http://userscripts.org/scripts/show/7114
// created  by Manuel Seeger http://manuelseeger.de
// The new version evaluates just the links and not all textNodes

(function() {
/*
    var textNodes =  document.evaluate("//text()", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var node = null;
    for (var i = 0; i < textNodes.snapshotLength; i++) {
        node = textNodes.snapshotItem(i);
	node.data = node.data.replace(String.fromCharCode(173), 'CORRECTION')
	//node.data = node.data.replace(String.fromCharCode(160), 'CORRECTION')
    }
*/

        //get all anchor tags and store them in allA
	var allA = document.getElementsByTagName('a');
	for(i = 0; i < allA.length; i++){
        //we only care about Anchors with the class name ForumNameUnread
		 if(allA[i].className == 'ForumNameUnRead'){
        //charcode 173 = &shy;, charchode 160 = &zwrj; or something like that
        //if the length is 1 or less, lets fix it anyway, handles blank subjects
			if((allA[i].innerHTML == String.fromCharCode(173)) 
				|| (allA[i].innerHTML == String.fromCharCode(160))
				|| (allA[i].innerHTML.length <= 1)){
				allA[i].innerHTML = 'CORRECTION';
			}
		}

		
	}
})();