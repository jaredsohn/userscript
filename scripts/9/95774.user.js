// ==UserScript==
// @name           Youtube MP3 Download
// @description    Youtube MP3 Download via http://youtube-mp3.org/
// @author         David
// @include        http://youtube.com/watch*
// @include        http://www.youtube.com/watch*
// @version        1.0
// ==/UserScript==

var embed_but = document.getElementById('watch-embed');

if (embed_but) {
	var download_but = document.createElement('button');
	download_but.type = 'button';
	download_but.className = 'master-sprite yt-uix-tooltip yt-uix-button yt-uix-tooltip-reverse';
	download_but.id = 'watch-download';
	download_but['data-tooltip'] = download_but['data-tooltip-title'] = download_but.title = 'Als MP3 herunterladen';
	download_but.innerHTML = '<a href="http://www.youtube-mp3.org/#v=' + location.search.match(/v=([\w_-]{11})/)[1] + '" class="yt-uix-button-content" target="_blank" style="text-decoration: none; color: #000;">MP3</span>';
	document.getElementById('watch-actions').insertBefore(download_but, embed_but.nextSibling);
}