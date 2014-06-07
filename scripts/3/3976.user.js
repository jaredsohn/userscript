// ==UserScript==
// @name           Video UnEmbeder
// @namespace      http://www.arantius.com/misc/greasemonkey/
// @description    Go to the actual YouTube or Google Video page, when it's embedded in someone elses' page.
// @include        *
// @exclude        http://video.google.com/*
// @exclude        http://www.youtube.com/*
// @exclude        http://youtube.com/*
// ==/UserScript==

//find the video(s)
var vids=document.evaluate(
	"//param[@name='movie'][contains(@value, 'video.google.com') or contains(@value, 'youtube.com')]/@value"+
	"|"+
	"//embed[contains(@src, 'video.google.com') or contains(@src, 'youtube.com')]/@src",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
);
var docs=[];
for (var i=0, vid=null; vid=vids.snapshotItem(i); i++) {
	var doc='';
	if (vid.value.match(/video.google.com/)) {
		var m=decodeURIComponent(vid.value).match(/docid=(.*?)&/);
		if (m[1]) doc='http://video.google.com/videoplay?docid='+m[1];
	} else if (vid.value.match(/youtube.com/)) {
		var m=vid.value.match(/[^\/]+$/);
		if (m) doc='http://www.youtube.com/watch?v='+m;
	}
	if (doc) docs.push(doc);
}

if (1==docs.length) {
	document.location.assign(docs[0]);
	return;
}
if (0!=docs.length) {
	if (confirm(
		'Video UnEmbeder found more than one embeded video.\n'+
		'Click OK to see a list of them, or Cancel to stay at the current page.'
	)) {
		document.write('<ul>');
		for (i in docs) {
			document.write('<li><a href="'+docs[i]+'">'+docs[i]+'</a></li>');
		}
		document.write('</ul>');
		document.close();
	}
	return;
}
