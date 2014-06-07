// ==UserScript==
// @name           Haystack download
// @namespace      tag:userscripts.org,2007-06-25:haystackdownload
// @description    Easier downloading of Haystack MP3 files. Customize to your heart's content.
// @include        http://haystack.com/releases/show/*
// ==/UserScript==

if(!location.href.match(/http:\/\/haystack\.com\/releases\/show\/([0-9]+)/gi))
	return;


function $x(p, context)
{
	if(!context)
		context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}


var artistName = $x("//div[@class='release_detail_song_list']/span[@class='release_title']/a/text()")[0];
var albumName = document.title.replace("Haystack - ", "");

function processSong(songEl, songDex, allSongs)
{
	var songName = $x("text()", songEl)[0].nodeValue;
	unsafeWindow.foo = songName;
	var songID = songEl.getAttribute('href').replace("http://haystack.com/songs/show/", "");

	var fileName = songName + '.mp3';
	var downloadLink = document.createElement('a');
	downloadLink.setAttribute('href', 'http://untrusted.brainonfire.net/director/go.php/'+encodeURIComponent(fileName)+'?to=http://haystack.com/songs/play/'+songID+'.mp3');
	downloadLink.appendChild(document.createTextNode("(download)"));

	songEl.parentNode.insertBefore(downloadLink, songEl.nextSibling);
	songEl.parentNode.insertBefore(document.createTextNode(' '), songEl.nextSibling);//put some room in between
}

$x("//div[@class='release_detail_song_list']/div[@class='song']/div[@class='song_title']/a[1]").forEach(processSong);
