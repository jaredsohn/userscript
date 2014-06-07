// ==UserScript==
// @name           favtape demonoid
// @namespace      local
// @description   changes 'Download MP3' from searching amazon for song, to searching demonoid for song
//@include		http://favtape.com/*
// ==/UserScript==
function relink(){
var els = document.getElementsByTagName('span');
var elsLen = els.length;
var pattern = new RegExp('(^|\\\\s)'+'group'+'(\\\\s|$)');
	for (i=0;i<elsLen;i++)
	{
		if ( pattern.test(els[i].className))
		{
			if (els[i].firstChild.innerHTML == 'Download MP3')
			{
			var strt = els[i].firstChild.href.indexOf('keywords=');
			var strng = els[i].firstChild.href;
			var fnsh = els[i].firstChild.href.substr(strt,strng.length).indexOf('&tag=');
			var dlLnk = strng.substr(strt,fnsh).replace('keywords=','');
				els[i].firstChild.href = 'http://www.demonoid.com/files/?category=2&query='+dlLnk;
			}
		els[i].firstChild.innerHTML = 'Download Torrent';
		els[i].firstChild.style.color = '#1b7412';
		}
	}
}
relink();