// ==UserScript==
// @name			Search on Spotify for YouTube
// @description		Adds a link that searches Spotify for the currently playing song on YouTube.
// @namespace		spotify-youtube-c
// @include			http://youtube.com/watch?v=*
// @include			http://*.youtube.com/watch?v=*
// @match			http://youtube.com/watch?v=*
// @match			http://*.youtube.com/watch?v=*
// @version			1.0
// ==/UserScript==

// Is this an artist page?
var extraInfo = document.getElementById('watch-description-extra-info');
if (!extraInfo.getElementsByClassName('music-artist').length)
	return;

// Find the name and artist
var infos = extraInfo.getElementsByClassName('metadata-info');
var matches, artist, name;
for (var i = 0; i < infos.length; i++) {
	if (matches = /Artist: <span class="link-like">([^<]*)<\/span>/.exec(infos[i].innerHTML))
		artist = matches[1];
	else if (matches = /Buy "([^"]*)" on:/.exec(infos[i].innerHTML))
		name = matches[1];
}

// Add the link
if (artist && name) {
	var li = document.createElement('li');
	li.innerHTML = '<img class="metadata-icon music-note" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Spotify:" /><span class="metadata-info"><a href="spotify:search/' + (artist + ' ' + name).replace(/\s/g, '%20') + '">Spotify</a>';
	extraInfo.appendChild(li);
}