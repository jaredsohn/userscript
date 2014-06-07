// ==UserScript==
// @include http://www.wettforum.info/sportwetten/*
// @name Wettforum
// @description Wettforum fix
// ==/UserScript==

iframes = document.getElementsByTagName('iframe');

for (i=0;i<iframes.length;i++) {
if(iframes[i].src == 'http://www.wettforum.info/phpBB2/content_rot.php?cat=top728') bannerFrame = iframes[i];
}

uberDiv = bannerFrame.parentNode;
lastDiv = uberDiv.previousSibling.previousSibling;
lastDiv.setAttribute('style','position:absolute;wi dth: 748px; height: 93px; left: 200px; top: 0px; text-align: left; z-index: 2; background-image: url(http://www.wettforum.info/styles/frame.png); background-position: center center; background-repeat: no-repeat;');
uberDiv.setAttribute('style','position:absolute;wi dth: 728px; height: 90px; left: 210px; top: 1px; text-align: left; z-index: 3;');


tables = document.getElementsByTagName('table');
td1 = tables[0].childNodes[1].childNodes[0].childNodes[3].childNodes[15].childNodes[1].childNodes[0].childNodes[1];
td2 = tables[0].childNodes[1].childNodes[0].childNodes[3].childNodes[15].childNodes[1].childNodes[0].childNodes[3];
tr = tables[0].childNodes[1].childNodes[0].childNodes[3].childNodes[15].childNodes[1].childNodes[0];
tr.removeChild(td2);
tr.insertBefore(td2,td1);