// ==UserScript==
// @name           9GAG NSFW Viewer
// @author         Oliver Huish
// @originalauthor Arthur Emidio
// @version        0.3
// @description    View NSFW images without login.
// @include        http://9gag.com/*
// ==/UserScript==
// Reload all NSFW elements.
function nsfwReload() {
	checkWhichVisualization = document.getElementsByClassName("col-2");
	if(checkWhichVisualization.length == 1) {
		a = document.getElementById('entry-list').getElementsByTagName("li");
	
		for(i=0;i<a.length;i++) {
			isImage = a[i].getElementsByClassName("video");
			isNSFW = a[i]["className"];
		
			if(isImage.length == 0 && isNSFW.length > 1) {
				prepLink = a[i].getElementsByTagName("a");
				link = prepLink[0]["href"].split("/");
				photo = "http://d24w6bsrhbeh9d.cloudfront.net/photo/"+link[4]+"_220x145.jpg";
				prepPhoto = a[i].getElementsByTagName("img");
				prepPhoto[0]["src"] = photo;
			}
		}
	
	} else {
		a = document.getElementById('entry-list-ul').getElementsByClassName("content");
		b = document.getElementsByClassName("info jump_stop");
	
		for(i=0;i<a.length;i++) {
			isImage = a[i].getElementsByTagName("img");
			isNSFW = b[i].getElementsByClassName("nsfw-badge");
			gagid = a[i].parentNode.getAttribute("gagid");
	
			if(isImage.length == 1 && isNSFW.length == 1 && isNSFW.unmasked === undefined) {
				photo = "http://d24w6bsrhbeh9d.cloudfront.net/photo/"+gagid+"_460s.jpg";
				isImage[0]["src"] = photo;
				isNSFW.unmasked = true;
			}
		}
	}
}
// First run.
nsfwReload();
// Run every couple of seconds.
setInterval(nsfwReload,2000);
