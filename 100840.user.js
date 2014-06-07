// ==UserScript==
// @name           Youtube related videos like/dislike preview
// @namespace      janschejbal-youtube-likedislike
// @description    Tired of always hitting crappy "related videos" on Youtube? This shows the number of likes and dislikes in the related video section so you can judge before you click.
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// ==/UserScript==



// CHANGE THESE VARIABLES TO DISABLE THE GRAPHICAL (BAR) OR TEXTUAL (NUMBERS) DISPLAY
var graphicalDisplay = true;
var textDisplay = true;   





/*function getVideoID() {
	var linknodes = document.getElementsByTagName('link');
	for (var i in linknodes) {
		if (linknodes[i].rel == "canonical") return linknodes[i].href.replace("http://www.youtube.com/watch?v=", "");
	}
}

var videoid = getVideoID();
*/


var parser = new DOMParser();

function handleVideo(element) {
	var link = element.children[0].href;
	var id = link.replace("http://www.youtube.com/watch?v=","").replace("https://www.youtube.com/watch?v=","").replace(/&.*/,"");
	var infourl = "https://gdata.youtube.com/feeds/api/videos/"+id+"?v=2";
	//console.log("youtubeLikePreview handling video " + id);
	GM_xmlhttpRequest({
		method: 'GET',
		url: infourl,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			//console.log("youtubeLikePreview received info for video " + id);
			var xmldoc = parser.parseFromString(responseDetails.responseText,"text/xml");
			var likes = xmldoc.getElementsByTagName('yt:rating')[0].getAttribute('numLikes');
			var dislikes = xmldoc.getElementsByTagName('yt:rating')[0].getAttribute('numDislikes');
			var target = element.getElementsByClassName("view-count")[0];
			if (!target) target = element.getElementsByClassName("stat")[1];
			if (textDisplay) {
				target.innerHTML += ' (<span style="color:#080;">'+likes+'</span>/<span style="color:#c00;">'+dislikes+'</span>)';
			}
			if (graphicalDisplay) {
				var flikes = parseFloat(likes);
				var fdislikes = parseFloat(dislikes);
				percentwidth = (flikes*100)/(flikes+fdislikes);
				element.style.position = "relative";
				target.innerHTML += '<div style="position: absolute; background-color:#c00; height: 3px; right: 92px; bottom: 7px; width: 70px;">' +
					'<div style="float: left; height: 3px; background-color: #080; width: '+percentwidth+'%;"></div>' +
					'</div>';
			}
		}
	});

}


var videolinks = document.getElementsByClassName("video-list-item");

for (var i in videolinks) {
	handleVideo(videolinks[i]);
}