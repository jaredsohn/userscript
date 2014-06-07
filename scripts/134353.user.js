// ==UserScript==
// @name        nicoMP3
// @namespace   http://
// @description ニコニコ動画で音声をにこさうんどで抽出します
// @include     http://www.nicovideo.jp/watch/*
// @version     1
// ==/UserScript==
(function(){
	var pbt = document.getElementById("player_bottom_textlink");
	var nobr = document.createElement("nobr");
	var child_a = document.createElement("a");
	var video_id = unsafeWindow.Video.id;
	var str = document.createTextNode("MP3抽出");
	
	child_a.href = "http://nicosound.anyap.info/sound/" + video_id;
	child_a.target = "new";
	child_a.appendChild(str);
	
	nobr.appendChild(child_a);
	pbt.appendChild(nobr);
	
})();
