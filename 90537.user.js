// ==UserScript==
// @name          H5Tube
// @description   Makes youtube videos play with the HTML5 <video> tag
// @include       http://www.youtube.*/*
// @include       http://youtube.*/*
// ==/UserScript==

var playerDiv2 = document.getElementById("watch-player");
var vid=playerDiv2.innerHTML.match(/&video_id=([^(\&|$)]*)/)[1];
video_url = null;

function stream_quality(i) {
	if(i == null)
		return -1;

	switch(i) {
		case 0: return 0;
		case 5: return 0; //240p
		case 6: return 0; //360p
		case 18: return 0; //480p

		case 34: return 1; //360p
		case 35: return 2; //480p
		case 22: return 3; //720p
		case 37: return 4; //1080p
	}
	return 0;
}

var a = document.getElementById('movie_player').getAttribute('flashvars').split('&');
for (var i = 0; i < a.length; i++) {
	var pair = a[i];
	if(pair.substring(0,15) != 'fmt_stream_map=')
		continue;
	var map = decodeURIComponent(pair.substring(15));
	var b = map.split(',');

	var selected_stream = null;
	for (var j = 0; j < b.length; j++) {
		pair = b[j].split('|');

		var q == stream_quality(pair[0]);
		if(q < 1)
			continue;

		if(q < stream_quality(selected_stream))
			continue;

		if(selected_stream == null) {
			video_url = pair[1];
			selected_stream = pair[0];
		}

		document.getElementById('watch-headline-title').innerHTML += ' <span><a href="http://www.youtube.com/watch?v=' + vid + '&fmt=' + pair[0] + '">' + pair[0] + '</a></span>';
	}
	break;
}

if(video_url != null) {
	playerDiv2.innerHTML= '<embed type="application/x-mplayer2" src="' + video_url + '" width="480" height="388">';
	//playerDiv2.innerHTML = '<video width="480" height="388" controls><source src="' + video_url + '"/></video>';
	document.getElementById('watch-headline-title').innerHTML += ' picked ' + selected_stream;
}

