// ==UserScript==
// @name			Youtube Video Stats Tracker
// @version			v5
// @namespace		marnick.leau@skynet.be
// @description		Tracks and reports about the statistics of your videos.
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/faziri.png
// @include			http://www.youtube.com/my_videos*
// @grant			GM_setValue
// @grant			GM_getValue
// ==/UserScript==

var videos = {};
var oldvideos = JSON.parse(GM_getValue("videos",JSON.stringify(videos)));

var videorows = document.getElementsByClassName('vm-video-item');
var video,id,views,ups,downs,comments,nviews,nups,ndowns,ncomments;
var stats = "";
for (var vr = 0;vr < videorows.length;vr++) {
	video = {};
	video.id = videorows[vr].id.replace("vm-video-","");
	video.views = videorows[vr].getElementsByClassName('vm-video-metric video-view-count')[0].getElementsByClassName('vm-video-metric-value')[0].innerHTML.match(/[0-9]+/).join("");
	video.ups = videorows[vr].getElementsByClassName('vm-video-metric video-likes-count')[0].getElementsByClassName('vm-video-metric-value')[0].innerHTML;
	video.downs = videorows[vr].getElementsByClassName('vm-video-metric video-dislikes-count')[0].getElementsByClassName('vm-video-metric-value')[0].innerHTML;
	video.comments = videorows[vr].getElementsByClassName('vm-video-metric video-comments')[0].getElementsByClassName('vm-video-metric-value')[0].innerHTML;
	
	if (oldvideos[video.id] === undefined) {
		oldvideos[video.id] = video;
	}
	
	for (var i in video) {
		if (i !== "id" && video[i] - oldvideos[video.id][i] !== 0) {
			if (stats.indexOf("<noscript>" + video.id + "</noscript>") === -1) {
				stats += "<br><noscript>" + video.id + "</noscript>" + videorows[vr].getElementsByClassName('vm-video-title-content')[0].innerHTML + ":";
			}
			stats += "<br>&nbsp;&nbsp;&nbsp;&nbsp;" + (video[i] - oldvideos[video.id][i]) + " new " + i;
		}
	}
	
	videos[video.id] = video;
}

GM_setValue("videos",JSON.stringify(videos));

if (stats === "") {
	stats = "No changes to any stats!";
}

var ol = document.getElementsByClassName('creator-sidebar-channel-link')[0];
var statsbox = ol.cloneNode(false);
statsbox.innerHTML = "<br><span style=\"font-size: x-small; text-align: right;\">" + stats + "</span>";
ol.appendChild(statsbox);