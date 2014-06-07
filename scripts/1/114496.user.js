// ==UserScript==
// @name      nicosound
// @namespace http://anoncom.net/
// @include   http://www.nicovideo.jp/watch/*
// @author    anon
// @version   0.2
// ==/UserScript==

(function(){
	var itab = document.getElementById('itab');
	if(!itab) return;
	var video_id = /nicovideo\.jp\/watch\/([a-z]{2,}\d+)/.exec(location.href);
	if(video_id==null) return;
	var link = document.createElement('a');
	link.innerHTML = '<span style="font-weight:bold;">[にこ☆さうんど]</span>';
	link.href = 'http://nicosound.anyap.info/sound/' + video_id[1];
	itab.parentNode.insertBefore(link, itab);
})();
