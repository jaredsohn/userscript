// ==UserScript==// @name           it's all about lyrics// @namespace      http://lunrfarsde.blogspot.com// @description    Adds lyrics to a song page, using lyrictracker.com// @include        http://www.last.fm/music/*/_/*// ==/UserScript==var headline = document.getElementById('LastHeadline').childNodes[1];var artist = headline.getElementsByTagName('a')[0].childNodes[0].nodeValue;if (headline.getAttribute('class') == 'h1album') {	var album = headline.getElementsByTagName('a')[1].childNodes[0].nodeValue;}else if (headline.getAttribute('class') == 'h1track') {	var track = headline.getElementsByTagName('a')[1].childNodes[0].nodeValue;	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://lyrictracker.com/soap.php',		headers: {'Content-Type' : 'application/x-www-form-urlencoded'},		data: 'act=query&cln=galleon&clv=0.0.0&ar=' + escape(artist) + '&ti=' + escape(track) + '&and=1',
		onload: function(responseDetails) {
			var xmlDoc = (new DOMParser()).parseFromString(responseDetails.responseText, 'application/xhtml+xml');						GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://lyrictracker.com/soap.php',				headers: {'Content-Type' : 'application/x-www-form-urlencoded'},				data: 'act=detail&cln=iTunesLittleHelper&clv=1&id=' + xmlDoc.getElementsByTagName('result')[0].getAttribute('id'),
				onload: function(responseDetails) {					var lyrics = document.createElement('div');					var lyricHTML = responseDetails.responseText.replace(/\n/g, '<br/>');					lyrics.innerHTML = '<h3 class=album>Lyrics</h3>' + lyricHTML;										var albums = document.evaluate('//div[@class="crightCol"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);					albums.parentNode.insertBefore(lyrics, albums.nextSibling.nextSibling.nextSibling);				}
			});
		}
	});}