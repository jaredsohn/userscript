// ==UserScript==
// @name          AOL Free MP3s
// @namespace     http://shiwej/devcenter
// @description   Changes the javascript popup code to easily download the free mp3s.
// @include       http://music.channel.aol.com/songs/downloads/mp3_main*
// @include	  http://music.aol.com/songs/downloads/mp3_main*
// ==/UserScript==

(function() {
	var xpath = "//a[starts-with(@href,'javascript')]";
	var res = document.evaluate(xpath, document, null,
	                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	var i, link;
	for (i = 0; link = res.snapshotItem(i); i++) {
		var start_js = link.href.indexOf("songfile=") + 9;
		var end_js = link.href.indexOf("songname") - 1;
		link.href = 'http://cdn.digitalcity.com/_media/ch_music/' + link.href.substring(start_js, end_js);
	}
})();
