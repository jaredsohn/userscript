// ==UserScript==
// @name           Xiami downloader
// @namespace      http://www.xiami.com
// @include        http://www.xiami.com/*
// ==/UserScript==
var DownloadTags = document.getElementsByClassName("song_download");
for (var i=0;i<DownloadTags.length;++i)
{
	var tag = DownloadTags[i];
	var re = /download *\( *['"]([0-9]+)['"] *\)/
	var m = re.exec(tag.getAttribute('onclick'))
	if (m)
	{
		tag.removeAttribute('onclick');
		tag.setAttribute('href','http://psp-music.appspot.com/xiami/'+m[1]);
	}
}