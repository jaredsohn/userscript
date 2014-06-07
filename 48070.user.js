// ==UserScript==
// @name           CN IMDB - create links to IMDB for TV shows and movies
// @namespace      cnimdb
// @description    Adds links to IMDB in the torrent overview pages of CN
// @include        *cn/browse.php*
// ==/UserScript==

var l = document.links;
var i = l.length;
var t,h;

// Walk through all links
while (i--)
{
	// This is a link to a torrent page
	if (l[i].href.match(/details\.php\?id=([0-9]+)/)
		&& l[i].parentNode.className == 'wtf'
		&& l[i].parentNode.parentNode.getElementsByTagName('td')[0].getElementsByTagName('a')[0]
			.href.match(/cat=(1|2|3|4|5|6|7|8|9|10|29|30)/)) // Movie Cat ids
	{
		// Strip all crap out of the title
		t = l[i].innerHTML.split(/((S[0-9]+( |E[0-9]))|( 720| 1080| cam | hdtv | pdtv | ws | xxx | complete | repack | ntsc | proper| x264| stv| xvid| dvd| pal | bluray| limited| disc| r1 | r2 | r3 | r4 | r5 | ts | <font size="0"> | <b> ))/i)[0];
		// Create a link to IMDB using Google Feeling Lucky
		h = document.createElement('a');
		h.href = 'http://www.google.com/search?btnI=1&q=site:imdb.com ' + t;
		h.innerHTML = '<img src="http://www.imdb.com/favicon.ico" style="text-decoration:none;position:relative;padding-right:.5em">';
		// Insert link
		l[i].parentNode.insertBefore(h, l[i]);
	}
}