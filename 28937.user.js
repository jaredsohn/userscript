// ==UserScript==
// @name          Youtube MP4
// @namespace     http://userscripts.org/users/37550
// @source        http://userscripts.org/scripts/show/28937
// @identifier    http://userscripts.org./scripts/source/28937.user.js
// @version     100
// @date          2011-05-05
// @creator       Sn1p1ng Guy117
// @include       http*://*.youtube.*/*
// ==/UserScript==
 


var id = location.href.split('?v=')[1].split('&')[0] || location.href.split('&v=')[1].split('&')[0];

 var download_url = 'http://www.youtube.com/get_video?t=vjVQa1PpcFNNvO9jZGdTmWnYLHeHwYafjQcOQ63xVok=&video_id=';
 var playerDiv = document.getElementById('movie_player');
 var flashvars = document.evaluate("attribute::flashvars", playerDiv, null, XPathResult.STRING_TYPE, null).stringValue;
 var video_id = flashvars.match(/video_id=([^(\&|$)]*)/)[1];
 var video_format = '.mp3'; 
 var video_url = download_url + video_id + video_format + "&fmt=34";

function getEl(w){
	return document.getElementById(w);
}