// ==UserScript==
// @name           YouTubeImageLink Edited
// @description    Turns embedded YouTube videos into images with link to video. No WWW (Edited)
// @include        *
// @exclude        http://*youtube.*/*
// ==/UserScript==

var obj = document.getElementsByTagName('object');
var img = new Array(obj.length);
var ele = new Array(obj.length);
var j = 0;

for(var i = 0; i < obj.length; ++i) {
	var z = obj[i].innerHTML.match(/http:\/\/.*youtube\..*\/v\/([^&"]+)/);
	if(z) {
		img[j] = document.createElement("div");
		img[j].innerHTML =
			'<strong>YouTube Video</strong><br />' +
			'<a href="http://youtube.com/watch?v=' + z[1] +
                        '" target="new" title="YouTubeImageLink">' +
			'"><img src="http://img.youtube.com/vi/' + z[1] +
			'/default.jpg" width="300" height=225"></a>';
		obj[i].innerHTML = "";
		ele[j++] = obj[i];
	}
}
for(var i = 0; i < j; ++i) {
	ele[i].parentNode.replaceChild(img[i],ele[i]);
}
