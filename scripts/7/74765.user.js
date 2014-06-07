// ==UserScript==
// @name           Lockerz Countdown (Dx edition)
// @namespace      Dxball
// @version        0.3.1
// @description    Auto display the captcha at the end of the video.
// @include        http://www.lockerz.com/p/watch/*
// @exclude        http://www.lockerz.com/p/watch/featured/*
// @exclude        http://www.lockerz.com/p/watch/originals*
// @exclude        http://www.lockerz.com/p/watch/favorites*
// @exclude        http://www.lockerz.com/p/watch/all*
// ==/UserScript==

var is_already_watched = document.getElementById("is_already_watched");
if(is_already_watched.value != ""){
	alert("This video is already watched!");
}

var player = document.getElementById("playerDiv");
while(player.childNodes[0]){
	player.removeChild(player.childNodes[0]);
}

var videoList = document.getElementById("videoList");
while(videoList.childNodes[0]){
	videoList.removeChild(videoList.childNodes[0]);
}

//function playSound(){var params={wmode:"transparent"};swfobject.embedSWF("/swf/chaChing.swf","soundHolder","1","1","9.0.0",params);}
function blink() {
	x = setInterval(function () {
		document.title = "Done! Fill the Captcha!";
		setTimeout(function () {
			document.title = "Your PTZ : " + document.getElementsByClassName("ptz_value")[0].innerHTML;
		}, 800);
	}, 1600);
}

//window.scrollTo(0,180);

function getTime(m) {
	return eval((r = m.match(/([\d+]{1,2})\:([\d+]{2})/))[1] * 60 + eval(r[2]));
}

//x = getTime(document.body.innerHTML) + 30;
x = getTime(document.getElementById("content-video-title").innerHTML) + 3;

t = setInterval(function () {
	if (x == 0) {
		clearTimeout(t);
		window.location = "javascript:vidFinished();playSound();";
		document.getElementById('recaptcha_response_field' ).focus();
		blink();
	} else {
		x -= 1;
		document.title = "Seconds Left : " + x;
	}
}, 1000);
