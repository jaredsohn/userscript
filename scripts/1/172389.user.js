// ==UserScript==
// @name        tdDownloader
// @namespace   tdDownloader
// @include     *.teendreams.com/*
// @version     1
// ==/UserScript==
var links = document.getElementsByTagName("a");
var url = window.location.href;
var isMovie = false;
if (url.indexOf("type=M") != -1) isMovie = true;
var set = url.substring(url.indexOf("set=")+4,url.indexOf(":model="));
var model = url.substring(url.indexOf("model=")+6,url.indexOf(":",url.indexOf("model=")));
for (var i=0,imax=links.length; i<imax; i++) {
	if (links[i].href.indexOf("/join.php") != -1){
		if(links[i].innerHTML.indexOf("http://members.teendreams.com/images/download") != -1){
			if (isMovie){
				links[i].href="http://content.teendreams.com/download.php?set="+set+"&model="+model+"&ext=mp4&file="+model+"_"+set+"_0001_640x360-mp4_medium-1.mp4";
			}else{
				links[i].href="http://content.teendreams.com/content/zips/tdreams_"+set+".zip";
			}
		}
	}
}