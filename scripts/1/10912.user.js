

// ==UserScript==
// @name          Download YouTube Video IIII (german text)
//@namespace      
// @description   adds "Download This Video" link and icon
// @include       http://*youtube.com/watch?v=*
// ==/UserScript==

(function() {
	function findPlaceToAdd() {
		els = document.getElementsByTagName("div");
		for (i = 0; i < els.length; i++) {
			var el = els[i];
			if (el.hasAttribute('class')) {
				if (el.getAttribute('class') == 'vidTitle') return el;
			}
		}

		el = document.getElementById("vidTitle");
		if (el != null) return el;
		return null;
	}
	
	function getFLAddress() {
		return document.getElementById("movie_player").src;
	}
	
	function getAddressVariable(address, variable) {
		return address.toString().split(variable+"=")[1].split("&")[0];
	}
	
		var imgdownload = document.createElement('img');
	imgdownload.setAttribute('class','alignR');
	imgdownload.setAttribute('border','0');
	imgdownload.setAttribute('width','15');
	imgdownload.setAttribute('height','15');
	imgdownload.setAttribute('src','http://www.anarchononline.at.tf/swb/down.PNG');
	
	flAddress = getFLAddress();
	video_id = getAddressVariable(flAddress, "video_id");
	t = getAddressVariable(flAddress, "t");
	
	flVideo = "get_video?video_id="+video_id+"&t="+t;
	//flVideo = pre+"watch?v="+video_id;
	links = findPlaceToAdd();
	
	var a = document.createElement('a');
	a.setAttribute('class','noul');
	a.setAttribute('title','Download Video via Vixy');
	a.setAttribute('href',flVideo);
	a.appendChild(imgdownload);
	a.innerHTML += ' <span class="eLink"><font size=1>Video herunterladen</font></span>';
	
	
	var td = document.createElement('div');
	td.setAttribute('align','right');
	td.appendChild(a)
	links.appendChild(td);

})();
