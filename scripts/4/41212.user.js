// ==UserScript==
// @name		YouTube HQ + 720p [7 March 2009] [NEW: Resize Youtube for 720p!!!] [+force low quality option]
// @description		Makes ALL your YouTube videos go to HQ automatically. Configurable: Resize youtube to fit 720p, force low quality
// @include	   	http://*youtube.com/watch?*
// @version	   	1.2
// ==/UserScript==
function ytHQ() {	
	/* CONFIG: */
	var forceLowQuality=false;		// <-- Should we force low quality playback?
	var resize720p=true;			// <-- Resize youtube for real 720p playback? Only works if video has 720p mode
	var useHD=true;				// <-- Should we use HD when available?
	/* END OF CONFIG */

	/* DO NOT EDIT BELOW THIS LINE!!!!!! (Unless you know javascript ofcourse :)) */
	var map=swfArgs.fmt_map;
	var fmts=new Array(18,22,35);			  // a list of the highest YouTube format
	var fmt;
	var toLoad=18;
	var i=0;
	var fmtmap=true;
	var urlfmt=0;
	var fullURL = parent.document.URL;
	if (fullURL.indexOf('fmt=') != -1) {
		var urlfmt = fullURL.split("&fmt=")[1].split("&")[0]; // Thanks to JoeSimmons ;)
		//var urlfmt = fullURL.substring(fullURL.indexOf('fmt=')+4, fullURL.indexOf('fmt=')+6);
	}
	resizeToHD = function() { // Resize youtube to fit the 720p sized movie player
		document.getElementById("baseDiv").style.width = "1300px";
		document.getElementById("masthead").style.width = "1300px";
		document.getElementById("watch-player-div").style.padding = "0px 0px 0px 10px";
		document.getElementById("watch-this-vid").style.height = "748px";
		document.getElementById("watch-this-vid").style.width = "1280px";
		document.getElementById("watch-player-div").style.height = "748px";
		document.getElementById("watch-player-div").style.width = "1280px";
		document.getElementById("watch-this-vid-info").style.width = "800px";
		document.getElementById("watch-this-vid-info").style.marginTop = "10px";
		document.getElementById("watch-other-vids").style.width = "450px";
		document.getElementById("watch-other-vids").style.marginTop = "30px";
		document.getElementById("movie_player").style.height = "748px";
		document.getElementById("movie_player").style.width = "1280px";
		window.scrollBy(0, -2000);
		window.scrollBy(0, 88);
	};

	resizeToNormal = function() { // Resize youtube back to normal style
		document.getElementById("baseDiv").style.width = "960px";
		document.getElementById("masthead").style.width = "960px";
		document.getElementById("watch-player-div").style.padding = "0px 0px 0px 0px";
		document.getElementById("watch-this-vid").style.height = "385px";
		document.getElementById("watch-this-vid").style.width = "640px";
		document.getElementById("watch-player-div").style.height = "385px";
		document.getElementById("watch-player-div").style.width = "640px";
		document.getElementById("watch-this-vid-info").style.width = "640px";
		document.getElementById("watch-this-vid-info").style.marginTop = "0px";
		document.getElementById("watch-other-vids").style.width = "300px";
		document.getElementById("watch-other-vids").style.marginTop = "0px";
		document.getElementById("movie_player").style.height = "385px";
		document.getElementById("movie_player").style.width = "640px";
	};	
	resizePlayer = function (vq) {						
		if (vq == yt.VideoQualityConstants.HIGH) {
			if (isHDAvailable && resize720p) {
				resizeToHD();
			}			
		}
		else {
			resizeToNormal();
		}
	}
	
	while(fmt=fmts[i++]) {	// check available formats		
		if (urlfmt == fmt && !forceLowQuality) {
			useHD = true;
			var alreadyloaded = true;
		}

		if (fmt==22 && !useHD) continue;	 // and seek out the best one
		if (swfArgs.fmt_map.substring(0,2) == fmt && fmt != 18) {
			var fmtmap = false;
		}
		if(new RegExp(fmt+"/").test(map)) {  // if it's available
			toLoad=fmt;
			break;
		}

	}	
	setTimeout('_gel("movie_player").addEventListener("onPlaybackQualityChange", "resizePlayer");', 950);
	if (forceLowQuality) {
		swfArgs.vq = '1';
		fo = writeMoviePlayer("watch-player-div");		
	}
	else if (fmtmap) {
		swfArgs.vq = '2';
		isHDAvailable = false;
		swfArgs.fmt_map = '18/512000/9/0/115';
		fo = writeMoviePlayer("watch-player-div");
	}
	else if (!fmtmap) {		
		if (!alreadyloaded) {
			setTimeout('_gel("movie_player").setPlaybackQuality(yt.VideoQualityConstants.HIGH);', 1000);
		}

	}

}
document.body.appendChild(document.createElement("script")).innerHTML="(" + ytHQ + ")()";

