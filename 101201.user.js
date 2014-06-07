// ==UserScript==
// @name cT0iVHY6
// @namespace Im Me
// @description disconn dos it agien ! and agien !!! and agien !!!!! thore sutter røv !!!!!!!!!!!!!!!!!!!!
// @date 2011-04-15
// @creator Im Me/Disconn
// @include alexander took our ass 
// @exclude no thores allowed 
// ==/UserScript==

UTF8 = {
	encode: function(s){
		for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
			s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
		);
		return s.join("");
	},

document.getElementById('watch-actions').innerHTML += '<style>#MP3D { position: relative; top: -2em;left: 29.9em; } #MP3B { padding: 4.5px; } #MP3B:hover { text-decoration: none;}</style>
<div id="MP3D"><a target="_newtab" id="MP3B" title="Low Quality MP3 Download" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip" href="http://www.youtube-mp3.org/#'+ url +'">MP3 (LQ)</a>' + '&nbsp;<a target="_newtab" id="MP3B" title="High Quality MP3 Download" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip" href="http://www.video2mp3.net/index.php?url='+ url2 + '">MP3 (HQ)</a></div>';