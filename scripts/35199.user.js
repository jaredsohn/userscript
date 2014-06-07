// ==UserScript==
// @name           remove shareplace-timer
// @namespace      http://shareplace.com/download.php?id=*
// @description    downloadlink (under the button) (you must not wait for the counter)
// @include        http://shareplace.com/download.php?id=*
// @include        http://shareplace.com/?*
// ==/UserScript==

//the first center element contains an ad frame
//var adframe = document.getElementsByTagName('center')[0];
var timeout = 10; // Wartezeit
document.getElementById('downloadbtn').disabled=false;
//document.download_form.downloadbtn()
document.getElementById("downloadbtn").value = 'Download!';
document.getElementById("downloadfile").style.display = 'block';
setTimeout('countdown()',110);


//remove it
//if(timeout == 20) { adframe.parentNode.removeChild(timeout); }
