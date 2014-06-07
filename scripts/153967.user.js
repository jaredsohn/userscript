// ==UserScript==
// @name        Nicosound converter
// @namespace   http://inecmc.blogspot.tw/
// @description Link niconico douga to nicosound directly
// @include     http://www.nicovideo.jp/watch/*
// @author inecmc
// @version     0.6
// @grant none
// ==/UserScript==

(function(){
	var title;
	if(document.title.search('(原宿)')>0){
		title = document.getElementById('video_title');
		}
	else if(document.title.search('ニコニコ動画:Q')>0){
		title = document.getElementById('videoHeaderDetail');
		}
	else if(document.title.search('ニコニコ動画:GINZA')>0){
                title = document.getElementById('videoTagContainer');
                }
	if(!title)
		return;
	
	var video_id = /nicovideo\.jp\/watch\/([a-z]{2,}\d+)/.exec(location.href);
	if(video_id==null) 
		return;
	var nicosound_link = 'http://nicosound.anyap.info/sound/' + video_id[1];
	var link = document.createElement('button');
	link.innerHTML = 'にこ☆さうんど';
	link.onclick =  function(){
		window.location.href = nicosound_link;
		return false;
		};
	title.parentNode.appendChild(link);
})();