// ==UserScript==
// @name           AutoRelaterTube
// @namespace      http://userscripts.org/users/84087/scripts
// @description    Auto-play related videos on YouTube. Filtered out promo & featured videos. Avoid Repetition
// @include        http://*.youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// @credits		  Wei
// ==/UserScript==
relater = function() {

	var playOn = true;
	var currentVideo;
	
	urlArgs = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < urlArgs.length; i++) {
		arg = urlArgs[i].split('=');
		if (arg[0].toLowerCase() == "v") {
			currentVideo = arg[1];
			var cookieValue = getCookie("youtubeRelater");
			if(cookieValue==null)
				setCookie("youtubeRelater", currentVideo);
			else if (cookieValue.indexOf(currentVideo)<0){
				if(cookieValue.length>=500)			//prevent cookie gets too big
					cookieValue=cookieValue.substr(cookieValue.indexOf('%')+1);
				setCookie("youtubeRelater", cookieValue + "%" + currentVideo);
			}
		}
	}

	window.setTimeout(function() { initRelater(false); }, 555);

	function initRelater(addElement) {
		//if (addElement) { document.getElementById("watch-player-div").appendChild(loopy); }
		ytPlayer = document.getElementById("movie_player");
		ytPlayer.addEventListener("onStateChange", "onPlayerStateChange");
	}

	onPlayerStateChange = function(newState) {
		if (playOn && newState == "0") {
			var url;			
			var linkTags = document.getElementById("watch-related").getElementsByTagName("a");
			var cookieValue = getCookie("youtubeRelater");
			
			for(var i=0; i<linkTags.length; i++){
				url=linkTags[i].href;
				if(url.indexOf("feature=related")>0 && url.indexOf("feature=fvw")<0){ 			//skip featured videos
					videoHistory = cookieValue.split('%');
					var found=false;
					for(var j = 0; j < videoHistory.length; j++) {
						if(url.indexOf(videoHistory[j])>0) 				//skip played videos
							found=true;
					}
					if(!found)
						break;
				}
			}

			window.setTimeout(function() { window.location = url;}, 60);

		}
	};
	
	function getCookie(name) {
		var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		if (results) {
			return unescape(results[2]);
		} else {
			return null;
		}
	}

	function setCookie(name, value) {
		document.cookie = name + "=" + escape(value);
	}

};

document.body.appendChild(document.createElement("script")).innerHTML = "("+relater+")()";