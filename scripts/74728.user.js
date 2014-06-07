// ==UserScript==
// @name           Jamendo OGG Redirector
// @namespace      www.jamendo.com
// @description    Redirects Jamendo MP3 download to OGG ones
// @include        http://www.jamendo.com/*/download/
// ==/UserScript==

// http://www.jamendo.com/LANGUAGE/download/album/ALBUM_NUMBER/do
//   |
//   |  to
//   v
// http://www.jamendo.com/get/album/id/album/archiverestricted/redirect/ALBUM_NUMBER/?p2pnet=bittorrent&are=ogg3

var url=location.href;
var slices=url.split('/');
var last=slices[slices.length-1];


if (last.substr(0,2)=="do"){
	var newUrl="http://www.jamendo.com/get/album/id/album/archiverestricted/redirect/"+slices[slices.length-2]+"/?p2pnet=bittorrent&are=ogg3";
	location.href=newUrl;

}