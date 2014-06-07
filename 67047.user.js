// ==UserScript==
// @name 		Download YouTube 3ouTube
// @namespace 	com.danstechstop.3outube
// @description Download Videos From Youtube Using 3outube.com
// @version 	1.0
// @creator 	Daniel Morrison http://danstechstop.com
// @include 	http://*youtube.com/watch*
// ==/UserScript==

//Get id
function $(id,root){
	return root ? root.getElementById(id) : document.getElementById(id);
}

//Create
var strLocation = location.href;
strLocation = strLocation.replace('watch','mp4/');
var aDownloadMP4 = document.createElement('a');
aDownloadMP4.href = strLocation.replace('youtube','3outube');
aDownloadMP4.innerHTML = 'Download MP4';
aDownloadMP4.id = 'aDownloadMP4';

//Display
$('watch-vid-title').appendChild(aDownloadMP4);
$('aDownloadMP4').style.display = 'block';