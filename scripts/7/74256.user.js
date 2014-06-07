// ==UserScript==
// @name          Download ANY MP3 from YouTube
// @namespace     http://userscripts.org/users/37550
// @description   adds a link to download MP3 from You Tube
// @version     9
// @date          2008-07-05
// @creator       Sn1p1ng Guy117
// @include       *youtube.*/*v=*
// ==/UserScript==
 


var id = location.href.split('?v=')[1].split('&')[0] || location.href.split('&v=')[1].split('&')[0];

 var download_url = 'http://www.listentoyoutube.com/video/';
 var playerDiv = document.getElementById('movie_player');
 var flashvars = document.evaluate("attribute::flashvars", playerDiv, null, XPathResult.STRING_TYPE, null).stringValue;
 var video_id = flashvars.match(/video_id=([^(\&|$)]*)/)[1];
 var video_format = '.mp3'; 
 var video_url = download_url + video_id + video_format;

function getEl(w){
	return document.getElementById(w);
}