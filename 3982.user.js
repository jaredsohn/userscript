// ==UserScript==
// @name          Download YouTube Video
// @description   adds "Download This Video" link
// @include       http://youtube.com/*v=*
// @include       http://*.youtube.com/*v=*
// ==/UserScript==

(function() {
	function findPlaceToAdd(newDesign) {
		var divClass;
		if (newDesign) divClass = 'actionLinks';
		else divClass = 'actionsDiv';
		els = document.getElementsByTagName("div");
		for (i = 0; i < els.length; i++) {
			var el = els[i];
			if (el.hasAttribute('class')) {
				if (el.getAttribute('class') == divClass) return el;
			}
		}

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
	
	function isNewDesign() {
		return document.getElementById('actionsAreaDiv') != null;
	}
	
	newDesign = isNewDesign();
	
	flAddress = getFLAddress();
	video_id = getAddressVariable(flAddress, "video_id");
	t = getAddressVariable(flAddress, "t");
	
	flVideo = "http://youtube.com/get_video?video_id="+video_id+"&t="+t;
	
	links = findPlaceToAdd(newDesign);
	
	if (!newDesign) {
		dv = document.createElement("div");
		dv.style.paddingLeft = "22px";
		links.appendChild(dv);
		dv.innerHTML = '<span class="eLink"><a class="noul" href="'+flVideo+'">Download Video</a></span>';
	} else {
		a = document.createElement("a");
		a.href = flVideo;
		a.className = 'actionLink';
		span = document.createElement("span");
		span.className = "actionText";
		span.innerHTML = 'Download';
		a.appendChild(span);
		links.appendChild(a);
	}

})();

