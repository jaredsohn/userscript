// ==UserScript==
// @name           TDGD
// @namespace      TeenDreams Gallery Downloader
// @description    Download the zips of you favorite model absoluty free
// @include        http://tour.teendreams.com/cms/set/view/set=*
// ==/UserScript==
url = window.location;
enlaces = document.getElementsByTagName('a');
url = new String(window.location);
set = url.split("/set=")[1].split(":")[0];
for (i=7; i <= 11; i++){
	if (enlaces[i].getAttribute('href') == '/join.php'){
		enlaces[i].setAttribute('href', "http://data2.teendreams.com/content/zips/tdreams_"+ set + ".zip");
	}
}