// ==UserScript==
// @name         Releaselog Torrent Links
// @namespace    rslogTorrentLinks
// @include      /https?:\/\/(www\.)?rlslog\.net\/[^\/#].*/i
// @include      http://www.rlslog.net/*
// @match        http://www.rlslog.net/*
// @datecreated  2010-03-10
// @lastupdated  2010-03-10
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript adds more torrent links to the Releaselog.
// ==/UserScript==

(function(d){
	var ntSearchURL = "http://www.newtorrents.info/search/",
		ntLink = d.evaluate("//div[contains(@class,'entry')]//a[contains(@href,'"+ntSearchURL+"')]",d,null,9,null).singleNodeValue;
	if(!ntLink) return;

	if(ntLink.innerHTML.match(/nti/i)){
		var inserted,
			ntLinks = d.evaluate("//div[contains(@class,'entry')]//a[contains(@href,'"+ntSearchURL+"')]",d,null,7,null);
		for(var i=0; i < ntLinks.snapshotLength; i++){
			// isohunt
			ntLink = ntLinks.snapshotItem(i);
			inserted = ntLink.parentNode.insertBefore( d.createTextNode(" - "), ntLink );
			inserted = inserted.parentNode.insertBefore( d.createElement("a"), inserted );
			inserted.href = ntLink.href.replace(ntSearchURL,"http://isohunt.com/torrents/?ihq=");
			inserted.innerHTML = "isoHunt";

			// binsearch
			inserted = ntLink.parentNode.insertBefore( d.createTextNode(" - "), ntLink );
			inserted = inserted.parentNode.insertBefore( d.createElement("a"), inserted );
			inserted.href = ntLink.href.replace(ntSearchURL,"http://binsearch.info/?q=");
			inserted.innerHTML = "Binsearch";
		}
	}
	else if(ntLink.innerHTML.match(/here/i)){
		// isohunt
		var inserted = ntLink.parentNode.insertBefore( d.createElement("a"), ntLink.nextSibling );
		inserted.href = ntLink.href.replace(ntSearchURL,"http://isohunt.com/torrents/?ihq=");
		inserted.innerHTML = "Here";
		inserted = inserted.parentNode.insertBefore( d.createTextNode(" "), inserted );
		inserted = inserted.parentNode.insertBefore( d.createElement("strong"), inserted );
		inserted.innerHTML = 'ISOHunt:';
		inserted = inserted.parentNode.insertBefore( d.createElement("br"), inserted );

		//binsearch
		inserted = ntLink.parentNode.insertBefore( d.createElement("a"), ntLink.nextSibling );
		inserted.href = ntLink.href.replace(ntSearchURL,"http://binsearch.info/?q=");
		inserted.innerHTML = "Here";
		inserted = inserted.parentNode.insertBefore( d.createTextNode(" "), inserted );
		inserted = inserted.parentNode.insertBefore( d.createElement("strong"), inserted );
		inserted.innerHTML = 'Binsearch:';
		inserted = inserted.parentNode.insertBefore( d.createElement("br"), inserted );
	}
})(document);
