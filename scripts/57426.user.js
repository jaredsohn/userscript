// ==UserScript==
// @name           Facebook - Free Boost
// @namespace      http://facebook.com/friends/
// @description    Adds links in friends page so you can get boost of the users if Available
// @version        1.0
// @include        http://www.facebook.com/*
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
			lobjSpan.innerHTML = " [<a href='http://apps.facebook.com/inthemafia/index.php?xw_controller=index&xw_action=iced_boost_claim&friend_id=" +  lobjRegExResult[1] + "' target='_blank'><u><b>Get Free Iced Boost</b></u></a>]";
			log(lobjSpan.innerHTML );

			lobjFriendRows.snapshotItem(i).appendChild(lobjSpan);

		}

	}
},false);

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
			lobjSpan.innerHTML = " [<a href='http://apps.facebook.com/inthemafia/index.php?xw_controller=index&xw_action=levelup_boost_claim&friend_id=" +  lobjRegExResult[1] + "' target='_blank'><u><b>Get Free Level Boost</b></u></a>]";
			log(lobjSpan.innerHTML );

			lobjFriendRows.snapshotItem(i).appendChild(lobjSpan);

		}

	}
},false);