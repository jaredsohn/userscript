// ==UserScript==
// @name           Get MySpace Karaoke Files
// @namespace      xenomark
// @description    Adds links to myspace karaoke for downloading files
// @include        http://ksolo.myspace.com/actions/showSongProfile.do*
// ==/UserScript==




info = document.getElementById('songId_0');
video = info.getAttribute('vidUrl');
image = info.getAttribute('imageUrl');

fbHeader = document.getElementById('fbHeader');
if (fbHeader) {
    embedDiv = document.createElement('div');
	embedDiv.innerHTML = '<div style="width:468px; height:18px; background-color:#dddddd; margin-bottom:5px;"><center><a style="font-weight:bold;" href="' + video + '">GET VIDEO</a> - <a style="font-weight:bold;" href="' + image + '">GET IMAGE</a></center></div>';
    fbHeader.parentNode.insertBefore(embedDiv, fbHeader);
}