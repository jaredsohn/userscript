// ==UserScript==
// @name           YouTube Subscriptions Total Duration
// @namespace      http://userscripts.org/users/374433
// @description    Adds a display of the total duration, and a count, of all the videos on your YouTube subscription page.
// @include        http://www.youtube.com/feed/subscriptions*
// @include        https://www.youtube.com/feed/subscriptions*
// @version        1.1a
// @author         Spike Padley
// ==/UserScript==

var source = document.getElementById('feed').innerHTML,
	items = source.split('<span class="video-time">');

items.shift();

var secs = 0,
	mins = 0,
	hrs = 0;

for (var i = 0; i < items.length; i++) {
	var duration_string = items[i].substr(0, items[i].search('</span>')),
		duration_array = duration_string.split(':');

	if (duration_array.length == 3)
		secs += parseInt(duration_array[2]) + (parseInt(duration_array[1]) * 60) + (parseInt(duration_array[0]) * 3600);
	else if (duration_array.length == 2)
		secs += parseInt(duration_array[1]) + (parseInt(duration_array[0]) * 60);
}

hrs = Math.floor(secs / 3600);
secs -= hrs * 3600;
mins = Math.floor(secs / 60);
secs -= mins * 60;

// Add in leading 0s
if (mins < 10) mins = "0" + mins;
if (secs < 10) secs = "0" + secs;

document.querySelector('#subscriptions-guide-item a span span span').innerHTML = 'Total '+hrs+':'+mins+':'+secs+' ('+items.length+' video'+(items.length == 1 ? '' : 's')+')';