// ==UserScript==
// @name          YouTube h264 Download
// @include       http://youtube.com/*v=*
// @include       http://*.youtube.com/*v=*
// ==/UserScript==

//Based on Download YouTube Video - Vaibhav Saran

(function() {
	function findPlaceToAdd() {
		el = document.getElementById("watch-video-quality-setting");
		if (el != null) return el;
		el = document.getElementById("watch-player-div");
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

	flVideo       = "http://youtube.com/get_video?video_id="+video_id+"&t="+t;
	flVideoH264v2 = "http://youtube.com/get_video?video_id="+video_id+"&t="+t+"&fmt=18";
	flVideoH264v1 = "http://youtube.com/get_video?video_id="+video_id+"&t="+t+"&fmt=6";
	flVideo720p = "http://youtube.com/get_video?video_id="+video_id+"&t="+t+"&fmt=22";
  var links = findPlaceToAdd();



  span = document.createElement("span");
  span.innerHTML = ' &nbsp ';
  links.appendChild(span);

  a1 = document.createElement("a");
  a1.href = flVideoH264v2;
  a1.className = 'hLink';
  a1.innerHTML = '<b>download video</b>';
  links.appendChild(a1);


})();