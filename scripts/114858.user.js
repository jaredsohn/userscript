// ==UserScript==
// @name           YouTube Like Bar in Related Videos
// @namespace      http://lachlanarthur.com
// @description    Shows the like bar in the related videos for each video. Only works on the New YouTube layout (CosmicPanda)
// @include        http://www.youtube.com/*
// ==/UserScript==

function main_114858() {

	var videos = [];
	var videoIds = [];
	var count = 0;

	window["addLikeBar"] = function() {
		window["_" + count.toString()] = function(data) {
			var likes = parseInt(data.entry.yt$rating.numLikes);
			var dislikes = parseInt(data.entry.yt$rating.numDislikes);
			var percent = (likes / (likes + dislikes)) * 100;
			var id = data.entry.media$group.yt$videoid.$t;
		
			if (document.getElementById("search-results") != undefined) { // Search Page
				var elements = videos[videoIds.indexOf(id)];
				for (var i=0; i<elements.length; i++) {
					var thumb = elements[i].getElementsByClassName("thumb-container")[0];
					thumb.style.position = "relative";
					var likeBar = document.createElement("div");
					likeBar.setAttribute("style", "background: #c00; position: absolute; bottom: -3px; left: -1px; width: 100%;");
					likeBar.innerHTML = '<div style="background: #060; height: 2px; width:' + percent + '%;"></div>';
					thumb.appendChild(likeBar);
				}
			} else { // Video Page
				var elements = videos[videoIds.indexOf(id)];
				for (var i=0; i<elements.length; i++) {
					if (elements[i].getElementsByClassName("stat").length != 0) {
						var idMatch = elements[i].getElementsByTagName("a")[0].href.match(/v=([^&]+)/);
						if (idMatch == null) {
							continue;
						}
						if (idMatch[1] == id) {
							var likeBar = document.createElement("div");
							likeBar.setAttribute("style", "background: #c00; margin: -1px 0 1px;");
							likeBar.innerHTML = '<div style="background: #060; height: 2px; width: ' + percent.toString() + '%;"></div>';
							var title = elements[i].getElementsByClassName("title")[0];
							title.parentNode.insertBefore(likeBar, title);
						}
					}
				}
			}
			count++;
		}
		count++;
	}

	window["getVideoIds"] = function(videoList) {
		var ids = [];
		var newList = [];
		for (var i=0; i<videoList.length; i++) {
			if (videoList[i].getElementsByTagName("a").length != 0) {
				var match = videoList[i].getElementsByTagName("a")[0].href.match(/v=([^&]+)/);
				if (match != null) {
					if (ids.indexOf(match[1]) == -1) {
						ids.push(match[1]);
						newList.push([videoList[i]]);
					} else {
						newList[ids.indexOf(match[1])].push(videoList[i]);
					}
				}
			}
		}
		return [ids, newList];
	}

	if (document.getElementById("search-results") != undefined) { // Search Page
		videos = document.getElementById("search-results").getElementsByClassName("result-item");
	} else { // Video Page
		videos = document.getElementsByClassName("watch-related-video-item");
	}

	videoInfo = getVideoIds(videos);
	videoIds = videoInfo[0];
	videos = videoInfo[1];

	for (var i=0; i<videos.length; i++) {
		addLikeBar();
	}

	count = 0;

	for (var i=0; i<videoIds.length; i++) {
		var script = document.createElement("script")
		script.src = "https://gdata.youtube.com/feeds/api/videos/" + videoIds[i] + "?v=2&alt=json-in-script&callback=_" + i.toString()
		document.body.appendChild(script)
	}

}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main_114858 +')();'));
(document.body || document.head || document.documentElement).appendChild(script);