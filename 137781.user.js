// ==UserScript==
// @name           TDD
// @namespace      TeenDreamsDownloader
// @description    Download zips & wmvs
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
			enlaces[i].setAttribute('href', "http://data2.teendreams.com/content/zips/tdreams_" + set + ".zip");
		}
	}
	break;
case 'M':
	for (i=7; i <= 11; i++){
		if (enlaces[i].getAttribute('href') == '/join.php'){
			enlaces[i].setAttribute('href', "http://data4.teendreams.com/content/" + model + "/" + set + "/movies/" + "0001.wmv");
		}
	}
	break;
}
