// ==UserScript==
// @name          Download H264 YouTube Video - 
// @description   adds "Download This Video" link
// @include       http://youtube.com/*v=*
// @include       http://*.youtube.com/*v=*
// ==/UserScript==

//This is just a modified version of Download YouTube Video - Vaibhav Saran
//All creidts to Vaibhav Saran


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
	
	flVideo		 = "http://youtube.com/get_video?video_id="+video_id+"&t="+t;
	
	flVideoH264v2  = "http://youtube.com/get_video?video_id="+video_id+"&t="+t+"&fmt=18";
	
	flVideoH264v1  = "http://youtube.com/get_video?video_id="+video_id+"&t="+t+"&fmt=6";
	
	
	
	links = findPlaceToAdd(newDesign);
	
	if (!newDesign) {
		dv = document.createElement("div");
		dv.style.paddingLeft = "22px";
		links.appendChild(dv);
		dv.innerHTML = '<span class="eLink"><a class="noul" href="'+flVideo+'">Download Video</a></span>';
		
		dv1 = document.createElement("div");
		dv1.style.paddingLeft = "22px";
		links.appendChild(dv1);
		dv1.innerHTML = '<span class="eLink"><a class="noul" href="'+flVideoH264v2+'">Download H264 Video</a></span>';
		
		} else {
		a = document.createElement("a");
		a.href = flVideo;
		a.className = 'actionLink';
		span = document.createElement("span");
		span.className = "actionText";
		span.innerHTML = 'Download This Video';
		a.appendChild(span);
		links.appendChild(a);
		
		a1 = document.createElement("a");
		a1.href = flVideoH264v2;
		a1.className = 'actionLink';
		span1 = document.createElement("span");
		span1.className = "actionText";
		span1.innerHTML = 'Download H264 Video';
		a1.appendChild(span1);
		links.appendChild(a1);
	}

})();

