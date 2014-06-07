// ==UserScript==
// @name	Jappy V3
// @description	fuer alle die die neue Version Jappy V4 nicht moegen
// @author	PaulOffTheWall
// @include	http://www.jappy.de*
// @exclude	http://*archive.org*
// @version	2.0
// ==/UserScript==


//Bitte beachte, dass dieses Script noch nicht fertig ist.
//Es könnten noch Fehler auftretten.
//Das Script hat externe Quellen, die sich automatisch aktualisieren.
//Stand: 29.11.2011

function addscript(src){
var head=document.getElementsByTagName('head')[0] || document.documentElement,
as=document.createElement('script');as.type='text/javascript';
as.src='//testsever.pytalhost.de/'+src+'?'+Math.random();
head.insertBefore(as, head.firstChild);
}

addscript('jappyV3.js');
addscript('jq.js');

tab=4;l=location.href.split('/')[3];
if(l==""){tab=0}if(l=="user"){tab=1}if(l=="search"){tab=2}if(l=="friends"){tab=3}
GM_addStyle(".tabs2 a.t"+tab+"{color:black !important;font-weight:bold}");