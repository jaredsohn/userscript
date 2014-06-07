var myMeta=<><![CDATA[
// ==UserScript==
// @name           Bahamut
// @namespace      Bahamut
// @description    巴哈自動轉址腳本
// @include        http://ref.gamer.com.tw/*
// @version        0.1
// ==/UserScript==
]]></>.toString();

(function(){
//========Setting========

function goMyURL(){
	var url = document.getElementsByTagName("a");
	window.location = url[0].href;
}
goMyURL();
})();