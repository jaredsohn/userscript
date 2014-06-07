// ==UserScript==
// @name           FarmVille - Add Recent Friends To FarmVille
// @namespace      http://facebook.com
// @description    adds a FarmVille link for recently added friends page or any friends list (based on the Vampire Wars script http://userscripts.org/scripts/show/45409)
// @version        1.0
// @date           2009-10-18
// @include        http://www.facebook.com/friends/*
// ==/UserScript==


function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function log(message) {
	GM_log(message);
}

window.addEventListener( 'load', function( e ) {

	var lobjFriendRows = xpath("//div[@class='UIObjectListing_MetaData']");
	var lobjRegExResult;
	
	for (var i=0; i < lobjFriendRows.snapshotLength; i++ ) {
		
		log('row=' + i + ' -> ' + lobjFriendRows.snapshotItem(i).innerHTML);

		lobjRegExResult = lobjFriendRows.snapshotItem(i).innerHTML.match(/id=([0-9]+)/);
		if (lobjRegExResult) {

			var lobjSpan = document.createElement('span');
			lobjSpan.innerHTML = " [<a href='http://apps.facebook.com/onthefarm/addneighbor.php?ruid=" +  lobjRegExResult[1] + "' target='_blank'>Add to FarmVille</a>]";
			log(lobjSpan.innerHTML );

			lobjFriendRows.snapshotItem(i).appendChild(lobjSpan);

		}

	}
},false);