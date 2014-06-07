// ==UserScript==
// @name          YourTube
// @author        Ryan Rosario, originally written by orkut don
// @description   adds "Download This Video" link where you can download videos in flv format.
// @include       http://youtube.com/*watch*
// @include       http://*.youtube.com/*watch*
// ==/UserScript==

(function() {
	function findPlaceToAdd() {
		var divClass;
		divClass = 'watch-tabs';
		els = document.getElementsByTagName("table");
		for (i = 0; i < els.length; i++) {
			var el = els[i];
			if (el.hasAttribute('class')) {
				if (el.getAttribute('class') == divClass) return el;
			}
		}

		alert("Couldn't find it");
		el = document.getElementById("playerDiv");
		if (el != null) return el;
		return null;
	}
	
	function getFLAddress() {
		return document.getElementById("movie_player").getAttribute("flashvars");
	}
	
	function getAddressVariable(address, variable) {
		return address.toString().split(variable+"=")[1].split("&")[0];
	}
	
	flAddress = getFLAddress();
	video_id = getAddressVariable(flAddress, "video_id");
	t = getAddressVariable(flAddress, "t");
	
	flVideo = "http://youtube.com/get_video?video_id="+video_id+"&t="+t;
	
	links = findPlaceToAdd();
	
	a = document.createElement("a");
	a.href = flVideo;
	a.className = 'watch-action-link';
	span = document.createElement("span");
	span.className = "actionText";
	span.innerHTML = 'Download';
	a.appendChild(span);
	links.appendChild(a);

})();
