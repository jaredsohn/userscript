// ==UserScript==
// @name NicoVideo minInfoBox 
// @namespace http://zuzu-service.net/
// @description ニコニコ動画の動画ページにある「動画の説明文」をスクロール可能なボックスに変更します。
// @author zuzu
// @homepage http://zuzu-service.net/
// @include http://www.nicovideo.jp/watch/*
// ==/UserScript==
(function(){
	var element=document.getElementById("itab_description");
	element.style.height="150px";
	element.style.overflow="scroll";
})();
