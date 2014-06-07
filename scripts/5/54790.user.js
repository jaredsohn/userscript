// ==UserScript==
// @name           YouTube Video Downloader
// @namespace      youtube
// @description    Downloads videos in MP4, FLV, 3GP and MP3 format on youtube.
// @include        http://*youtube.com/*v=*
// @date           2009-31-07
// @author         Char
// @version        2
// ==/UserScript==


var t = document.getElementById('movie_player').getAttribute('flashvars').split('&t=')[1].split('&')[0];
var id = location.href.split('?v=')[1].split('&')[0] || location.href.split('&v=')[1].split('&')[0];
var url = 'http://youtube.com/get_video?video_id='+id+'&t='+t;

desc = document.getElementsByClassName("watch-description-username-dash")[0];
desc.innerHTML += "— <a href='"+url+"'>FLV</a> | <a href='"+url+"&fmt=17'>3GP</a> | <a href='"+url+"&fmt=18'>MP4</a> | <a href='http://www.video2mp3.net/?v="+id+"' target='_blank'>MP3</a> &mdash;";
