// ==UserScript==
// @name          MTube
// @description   Watch YouTube with MPlayer
// @include       http://*youtube.*/*
// ==/UserScript==
	
// Example sizes:
// small     width=450 height=358
// 1024x768  width=556 height=435
// 1280x1024 width=885 height=683
// 1680x1050 width=930 height=715

var width = 885;
var height = 683;

/* Player */
var player = document.getElementById('watch-player-div');
if(player) {
	var base = document.getElementById('baseDiv');
	if(base) {
		base.style.width = (width+370) + 'px';
		player.parentNode.style.width = width + 'px';
	}
	var side = document.getElementById('sideAdDiv');
	if(side) {
		side.parentNode.removeChild(side);
	}
	var ad = document.getElementById('leaderboardAd');
	if(ad) {
		ad.parentNode.removeChild(ad);
	}

	var z = null;
	var scripts = document.getElementsByTagName('script');
	for(var i = 0; i < scripts.length && z == null; ++i) {
		//z = scripts[i].text.match(/video_id:'([^']+).+,t:'([^']+)/);
                z = scripts[i].text.match(/video_id": "([^"]+).+, "t": "([^"]+)/);
	}
		
	if(z == null) {
		alert('MTube: Unable to find video source');
		return;
	}
	
	var src = 'http://youtube.com/get_video?video_id=' + z[1]+ '&t=' + z[2];

	player.innerHTML = 
		'<embed src="' + src + '" width="' + width + '" height="' +
		height + '" autoplay="true" ' + 'loop="true" ' +
		'type="application/x-quicktimeplayer"></embed>';
}

/* Homepage */
var hp = document.getElementById('hpEmbedVideo');
if(hp) {
	var src = hp.innerHTML.match(/iurl=([^&]+)/);
	if(src) {
		hp.innerHTML = '<img src="' + unescape(src[1]) +
				'" width="300" height="225">';
	}
}

/* Profile & Vlog */
var obj = document.getElementsByTagName('object');
var img = new Array(obj.length);
var ele = new Array(obj.length);
var j = 0;

for(var i = 0; i < obj.length; ++i) {
	var z = null;
	if(obj[i].parentNode.className == 'profileEmbedVideo')
		z = obj[i].innerHTML.match(/video_id=([^&]+)/);
	else
		z = obj[i].innerHTML.match(/video_id=([^&]+)&.*iurl=/);
	if(z) {
		img[j] = document.createElement('div');
		img[j].innerHTML =
			'<a href="http://www.youtube.com/watch?v=' + z[1] +
			'"><img src="http://img.youtube.com/vi/' + z[1] +
			'/default.jpg" width="300" height=225"></a>';
		obj[i].innerHTML = "";
		ele[j++] = obj[i];
	}
}
for(var i = 0; i < j; ++i) {
	ele[i].parentNode.replaceChild(img[i],ele[i]);
}
