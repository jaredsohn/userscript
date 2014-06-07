// ==UserScript==
// @name           Download Escapist Video
// @namespace      download
// @description    Download videos from the escapist website
// @include        http://www.escapistmagazine.com/videos/*
// @include        http://www.themis-media.com/videos/config/*
// ==/UserScript==


var l = document.getElementById("video_player_menu");
if(l) {
	var dl = "<a href='javascript:void(0);' class='video_menu_link' id='dllink'>Download</a>";
	l.innerHTML = dl + l.innerHTML;
		
	//add click listener
	var dlk = document.getElementById('dllink');
	dlk.addEventListener("click", popupDL, true);
		
} else if(document.domain == "www.themis-media.com") {
	downloadVideo();
}


function popupDL() {
	//hide popup if it exists
	var pop = document.getElementById('dlpopup');
	if(pop) {
		document.body.removeChild(pop);
	} else {
		var flashVars = document.getElementById('video_player_object');
		if(!flashVars) return;
		flashVars = flashVars.childNodes[0].getAttribute('flashvars');
		if(!flashVars) return;
		
		var url = flashVars.substr(7);
		
		//create a popup iframe
		pop = document.createElement('div');
		pop.setAttribute('id', 'dlpopup');
		//style
		pop.style.color = 'red';
		pop.style.position = 'fixed';
		pop.style.top = '100px';
		pop.style.left = '200px';
		pop.style.width = '200px';
		pop.style.height = '50px'; //this doesnt work properly
		pop.style.zIndex = 999;
		
		//hide element if firefox
		if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
			pop.style.display='none';
		}
		
		
		//set contents
		pop.innerHTML = "<iframe src='" + url + "'></iframe>";
		//add to page
		document.body.appendChild(pop);
	}
}


function downloadVideo() {
	//get download link
	var s = document.body.innerHTML;
	var r = new RegExp("http[^']*video[^']*(mp4|flv)");
	var url = r.exec(s)[0];
	
	//should check that it is for the escapist?
	if(!s.match(/escapist/)) return;
	
	//edit page to only display this link - this bit only works in opera
	document.body.style.backgroundColor = 'black';
	document.body.innerHTML = "<a href='" + url + "'>Download Video</a>";
	
	window.location = url; //automatic download - only works in firefox
}