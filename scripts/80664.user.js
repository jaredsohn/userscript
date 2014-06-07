// ==UserScript==
// @name           Goto Top For Chrome
// @namespace      http://t.qq.com/jdomyth
// @description    为每条腾讯微博增加返回顶端的链接
// @include        http://t.qq.com/*
// @exclude        http://t.qq.com/*/following*
// @exclude        http://t.qq.com/*/follower*
// @required       http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js
// @author         jdomyth
// @version        1.0
// ==/UserScript==

$(document).ready(function() {
   appendGotoTop();
})

var html = "<span>|</span><a href='#' title='返回顶部' class='gotoTop'>回顶</a>";

//append a GotoTop link to every twitter per second.
function appendGotoTop(){
	var twitters = $("#talkList .funBox");
	twitters.each(function (){
		if(!$(this).find("a:last").hasClass("gotoTop")){
			$(this).append(html);
		}	
	});
	window.setTimeout(appendGotoTop,1000);
}