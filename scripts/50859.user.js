// ==UserScript==
// @name          Nico load ratio
// @namespace     oamaxa
// @description   ページタイトルに動画のロード量を表示します。
// @include       http://www.nicovideo.jp/watch/*
// @version	      1.1
// @update        2010/05/03
// ==/UserScript==

var w=(unsafeWindow||window),document=w.document;

var ratio=null,player=document.getElementById("flvplayer"),title=w.Video.title;
var timer=setInterval(function(){
	if(!ratio||typeof player.ext_getLoadedRatio=="undefined") return;
	ratio=player.ext_getLoadedRatio();
	if(ratio<1) document.title="("+(ratio*100|0)+"% loaded) "+title;
	else if(ratio==1){
		clearInterval(timer);
		document.title="(loaded completely) "+title;
		setTimeout(function(){document.title=title;},4000);
	}
},2000);