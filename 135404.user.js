// ==UserScript==
// @author         brownt0wn
// @name           Redirect to Group Page
// @namespace      http://userscripts.org/scripts/show/135404
// @description    Adds a link to unchecked.php to open group page instead of permalink
// @include        https://tls.passthepopcorn.me/unchecked.php
// ==/UserScript==
 

var html = document.body.innerHTML;
html = html.replace('<th>Torrents</th>', '<th>TG</th><th>Torrents</th>' );
html = html.replace('<th>Torrents on Freeleech</th>', '<th>TG</th><th>Torrents on Freeleech</th>' );
document.body.innerHTML = html;

var x = 0;
var torrent_group = document.getElementsByClassName('l_movie');

for (j=0;j<torrent_group.length;j++)
{
	var str = torrent_group[j].toString();
	var group = str.split("&",1);
	var group_link = "<a href="+group+">TG</a>";
	html = html.replace(/(<tr id="torrent_)(\d*")>/, '<tr><td>'+group_link+'</td>' );
	document.body.innerHTML = html;
}