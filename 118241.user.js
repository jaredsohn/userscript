// ==UserScript==
// @name           Youtube Search rating preview 
// @namespace      Youtube Search rating preview 
// @description    shows the rating in the search results
// @include        http://www.youtube.com/*
// ==/UserScript==


var parser = new DOMParser();

function handleVideo(element) {
	var link = element.children[0].href;
	var id = link.replace("http://www.youtube.com/watch?v=","").replace(/&.*/,"");
	var infourl = "http://gdata.youtube.com/feeds/api/videos/"+id+"?v=2";
	GM_xmlhttpRequest({
		method: 'GET',
		url: infourl,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var xmldoc = parser.parseFromString(responseDetails.responseText,"text/xml");
			var likes = xmldoc.getElementsByTagName('yt:rating')[0].getAttribute('numLikes');
			var dislikes = xmldoc.getElementsByTagName('yt:rating')[0].getAttribute('numDislikes');
			var target = element.getElementsByClassName("ux-thumb-wrap result-item-thumb")[0];
			var rating = xmldoc.getElementsByTagName('gd:rating')[0].getAttribute('average');
			target.innerHTML += ' <span title="'+likes+' Likes - '+dislikes+' Dislikes" alt="'+likes+' Likes - '+dislikes+' Dislikes" style="float:right; width:50px; height:4px;margin-right:-1px;background:#c00"><div style="float:left;height:4px;border-right:1px solid #fff;background:#060; width:'+Math.round((rating*10))+'px;"></div></span>';
		}
	});

}


var videolinks = document.getElementsByClassName("thumb-container");

for (var i in videolinks) {
	handleVideo(videolinks[i]);
}

