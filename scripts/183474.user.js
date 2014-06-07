// ==UserScript==
// @name           TDD.2013
// @namespace      TeenDreamsDownloader 2013
// @description    Download zips & mp4s
// @include        http://tour.teendreams.com/cms/set/view/set=*
// ==/UserScript==
url = window.location;
enlaces = document.getElementsByTagName('a');
url = new String(window.location);
set = url.split("set=")[1].split(":")[0];
type = url.split("type=")[1];
model = url.split("model=")[1].split(":")[0];

switch(type)
{
case 'P':
	for (i=7; i <= 11; i++){
		if (enlaces[i].getAttribute('href') == '/join.php'){
			enlaces[i].setAttribute('href', "http://content.teendreams.com/content/zips/tdreams_" + set + ".zip");
		}
	}
	break;
case 'M':
	for (i=7; i <= 11; i++){
		if (enlaces[i].getAttribute('href') == '/join.php'){
			enlaces[i].setAttribute('href', "http://content.teendreams.com/download.php?set=" + set + "&model=" + model + "&ext=mp4&file=" + model + "_" + set + "_0001_1280x720-mp4_hdready-1.mp4");
		}
	}
	break;
}
