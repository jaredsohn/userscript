// ==UserScript==
// @name          YouTube Download and Quality Links
// @description   adds download and high quality link to all videos
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

  var vq = document.getElementById("watch-video-quality-setting");
  if(vq) {
    if(!vq.className)
      vq.className = 'low';
  } else {
    a = document.createElement("a");
    a.href = flVideo;
    a.className = 'hLink';
    a.id="watch-high-quality-link";
    a.href=document.location.href + '&fmt=18';
    a.innerHTML = 'watch in high quality';
    links.appendChild(a);
  }

  span = document.createElement("span");
  span.innerHTML = ' - ';
  links.appendChild(span);

  a = document.createElement("a");
  a.href = flVideo;
  a.className = 'hLink';
  a.innerHTML = '<b>download flash video</b>';
  links.appendChild(a);

  span = document.createElement("span");
  span.innerHTML = ' - ';
  links.appendChild(span);

  a1 = document.createElement("a");
  a1.href = flVideoH264v2;
  a1.className = 'hLink';
  a1.innerHTML = '<b>download h264 video</b>';
  links.appendChild(a1);

  span = document.createElement("span");
  span.innerHTML = ' - ';
  links.appendChild(span);

  a1 = document.createElement("a");
  a1.href = flVideo720p;
  a1.className = 'hLink';
  a1.innerHTML = '<b>download 720p video</b>';
  links.appendChild(a1);

})();