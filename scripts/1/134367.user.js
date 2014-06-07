// ==UserScript==
// @name        zerobar_remove
// @namespace   http://
// @description ニコニコ動画上部にある「zeroバージョンへ変更」のバーを削除します
// @include     http://www.nicovideo.jp/*
// @include     http://live.nicovideo.jp/*
// @version     1
// ==/UserScript==
(function(){
	var zero_lead = document.getElementById("zero_lead") ? document.getElementById("zero_lead") : document.getElementById("zero_lead_index");
	var body_header = document.getElementById("body_header") ? document.getElementById("body_header") : false;
	
	if(body_header){
		body_header.removeChild(zero_lead);
	}else{
		document.body.removeChild(zero_lead);
	}
})();
