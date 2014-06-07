// ==UserScript==
// @name           Download Adultism video
// @namespace      com.adultism.downloadvideo
// @include        http://www.adultism.com/*
// ==/UserScript==


if (document.location == top.location) {
    (function(){    
        var scripts = document.getElementsByTagName('script');
        if (scripts.length > 0) {
            var script = scripts[6].text;
			//alert(script);
            var styleMatch = script.match('/xmoov/style.php.*?"');
			if (styleMatch) {
				var styleURL = styleMatch[0].substr(0, styleMatch[0].length - 1);

		        var flashcontent = document.getElementById('flashcontent');
		        var newDiv = document.createElement('div');
		        newDiv.innerHTML = '<p id="flashvideo"><em>Creating link...</em></p>';
		        flashcontent.parentNode.insertBefore(newDiv, flashcontent);

				xhr('http://www.adultism.com' + styleURL, function(http) {
					var videoPath = http.responseText.match('videoPath\:.*?;')[0].replace('videoPath: ', '');
					videoPath = videoPath.substr(0, videoPath.length - 1);
					var video = http.responseText.match('video\:.*?;')[0].replace('video: ','');
					video = video.substr(0, video.length - 1);

					var flvURL = videoPath + video;
					//console.log(flvURL);

			        var flashvideo = document.getElementById('flashvideo');
					flashvideo.innerHTML = '<a href="' + flvURL + '">Download video</a>';
				});
			}
        }
    })();
}

function xhr(url, callback, error, method) {
	//console.log(url);
	var http = null;
	if (window.XMLHttpRequest) {
		http = new XMLHttpRequest();
	}
	if (http) {
		if (callback) {
			if (typeof(http.onload) != "undefined")
				http.onload = function() {
					callback(http);
					http = null;
				};
			else {
				http.onreadystatechange = function() {
					if (http.readyState == 4) {
						callback(http);
						http = null;
					}
				};
			}
		}
		http.open(method || "GET", url, true);
		http.send(null);
	} else {
		if (error) error();
	}
}