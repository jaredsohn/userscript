// ==UserScript==
// @name           ustream.tv download link
// @namespace      http://mereandor.soup.io
// @description    Enable download of ustream videos.
// @include        http://www.ustream.tv/recorded/*
// ==/UserScript==

function videoFile(v, c) {
	return v.substr(0,1)+"/" + v.substr(0, 4) + "/" + v + "/1_" + c + "_" + v + ".flv";
}

function addFlvUrl1(videoId, channelId) {
	var url = "http://vod-storage1.ustream.tv/ustreamstorage/content/0/1/"+videoFile(videoId, channelId);
	return addDownloadLink(url);
}

function addFlvUrl2(videoId, channelId) {
	for (i=1; i<=4; i++) {
		var url = "http://ustream.vo.llnwd.net/pd"+i+"/0/1/"+videoFile(videoId, channelId);
		tryandadd(url);
	}
}

function tryandadd(url) {
	GM_xmlhttpRequest({
		method: 'HEAD',
		url: url,
		onload: function(response) {
			if (response.status == 200) {
				addDownloadLink(url);
			}
		}
	});
}

function addDownloadLink(url) {
	// create and display link
	var link = document.createElement('a');
	link.setAttribute("href", url);
	t = 'download video';
	link.appendChild(document.createTextNode(t));
	document.getElementById('VideoStatistics').appendChild(link);
}

window.addEventListener(
	'load',
	function() {
		// get Channel-Id
		s = document.getElementById('ChannelFeed');
		var channelId = s.getAttribute("rel").split("/")[4];
		
		// get Video-Id
		x = document.location.pathname.split("/");
		var videoId = x[x.length - 1];
		
		// generate url
		var url;
		if (parseInt(videoId) < 4123827) {
			addFlvUrl1(videoId, channelId);
		} else {
			addFlvUrl2(videoId, channelId);
		}
	},
	false
);