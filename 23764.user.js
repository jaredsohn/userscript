// ==UserScript==
// @name          Haifa
// @description   haifa live video
// @include       http://*.haifa.ac.il*
// ==/UserScript==

if (/http:\/\/video\.haifa\.ac\.il\/live\/.*\/index\.html/i.exec(location.href)) {
	var media = document.getElementById('SSFA');
	var media_url = media.childNodes[51].value
	if (media != undefined) {
		media.parentNode.innerHTML = '<embed width="319" height="281" src="' + media_url + '" type="application/x-mplayer2" /><br /><a href="' + media_url + '">לא רואה וידיאו? לחץ כאן</a>'
	}
}
else if (/http:\/\/actv\.haifa\.ac\.il\/programs\/Item\.aspx\?it=\d+/i.exec(location.href)) {
	var media = document.getElementById('mediaPlayer').childNodes[24].value;
	var video = document.getElementById('Div_VideoImage');
	if (media != undefined && video != undefined) {
		video.innerHTML = '<embed width="320" height="305" src="' + media + '" type="application/x-mplayer2" /><br /><a href="' + media + '">לא רואה וידיאו? לחץ כאן</a>';
	}
}