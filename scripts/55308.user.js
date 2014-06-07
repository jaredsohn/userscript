// ==UserScript==
// @name           Dailymotion Image Link
// @namespace      http://www.linkmauve.fr/
// @description    Turns embedded Dailymotion videos into images with link to video.
// @include        *
// @exclude        http://*dailymotion.*/*
// ==/UserScript==

var obj = document.getElementsByTagName('object');
var img = new Array(obj.length);
var ele = new Array(obj.length);
var j = 0;

for(var i = 0; i < obj.length; ++i) {
	var z = obj[i].innerHTML.match(/http:\/\/.*dailymotion\..*\/swf\/([^&"]{6})/);
	if(z) {
		img[j] = document.createElement("div");
		img[j].innerHTML =
			'<strong>Dailymotion Video</strong><br />' +
			'<a href="http://openvideo.dailymotion.com/fr/video/' + z[1] +
			'" target="new" title="DailymotionImageLink">' +
			'<img src="http://dailymotion.com/thumbnail/160x120/video/' + z[1] +
			'"></a>';
		obj[i].innerHTML = "";
		ele[j++] = obj[i];
	}
}
for(var i = 0; i < j; ++i) {
	ele[i].parentNode.replaceChild(img[i],ele[i]);
}
