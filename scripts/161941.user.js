// ==UserScript==
// @name           Youtube-MP3 PopeenStyle
// @namespace      http://kakadua.net
// @author         Popeen	
// @description    This script automaticly converts the video you are watching to an mp3 file using youtube-mp3.org and then puts the download/link box from the site under the video
// @include        http://*.youtube.*/*watch*
// @include        https://*.youtube.*/*watch*
// @include        http://*youtube-mp3.org/*?ymp3ps
// @version        1.0
// ==/UserScript==

//youtube.com
if(location.hostname.replace("www.", "").split(".")[0] == "youtube"){
	var videoID, title, div;

	videoID = location.search.split('v=')[1].split('&')[0]
	title = document.getElementById('watch-headline-title');

	div = document.createElement('div');
	div.innerHTML = '<iframe src="http://www.youtube-mp3.org/#v='+ videoID + '?ymp3ps" style="width:430px; height:110px; margin-top:10px;" frameborder="0" scrolling="no">Download MP3</a>';

	title.parentNode.insertBefore(div, title.nextSibling);
}


//youtube-mp3.org
if(location.hostname.replace("www.", "").split(".")[0] == "youtube-mp3"){
	var content, logo, form, desc, footer;

	content = document.getElementById('progress_info');
	content.setAttribute('style', "position:absolute; top:0px; left:0px; width:420px;");

	logo = document.getElementsByTagName("img")[0];
	logo.setAttribute('style', "display:none;");

	form = document.getElementById('form');
	form.setAttribute('style', "display:none;");

	desc = document.getElementById('description');
	desc.parentNode.removeChild(desc);

	footer = document.getElementById('footer');
	footer.parentNode.removeChild(footer);
}