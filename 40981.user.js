// ==UserScript==
// @name           Facebook - Add Recent Friends To MobWars
// @namespace      http://facebook.com
// @description    adds a mob wars link for recently added friends page
// @version        1.0
// @date           2009-01-22
// @include        http://*.facebook.com/*friends/?added*
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
			lobjSpan.innerHTML = " [<a href='http://apps.facebook.com/mobwars/mob/do.php?join_id=" +  lobjRegExResult[1] + "' target='_blank'>Add to Mob Wars</a>]";
			log(lobjSpan.innerHTML );

			lobjFriendRows.snapshotItem(i).appendChild(lobjSpan);

		}

	}
},false);
