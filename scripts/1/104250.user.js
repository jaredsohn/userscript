// ==UserScript==
// @name          SKIP MEGA BY FEXXEL
// @description   skip megaupload wait
// @include       http://www.megaupload.com/?d=*
// @include       http://megaupload.com/?d=*
// @version       1.00
// @updated       June 5th 2011
// ==/UserScript==
//V1.0
document.getElementById('downloadlink').style.display = ''; 

//V1.1
var REMOVETHATSHIT = document.getElementById('downloadcounter');
if (REMOVETHATSHIT) {
    REMOVETHATSHIT.parentNode.removeChild(REMOVETHATSHIT);
}

//V1.2
down_butt_bg2 = document.getElementById('down_butt_bg2');
var credits = document.createElement("ce")
credits.innerHTML = '<tr><td><a href="?c=login" style="text-decoration:none;"><font size=6>By Fexxel : http://userscripts.org/scripts/show/104250</font></a></td><td width="12" align="center">-</td></tr>,';
document.body.insertBefore(credits, down_butt_bg2);
