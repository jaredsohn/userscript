// ==UserScript==
// @name           Goto Top
// @namespace      http://t.qq.com/jdomyth
// @description    为每条腾讯微博增加返回顶端的链接
// @include        http://t.qq.com/*
// @exclude        http://t.qq.com/*/following*
// @exclude        http://t.qq.com/*/follower*
// @author         jdomyth
// @version        1.0
// ==/UserScript==
var GM_JQ = document.createElement('script'),
    head = document.getElementsByTagName('head');

GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js';
GM_JQ.type = 'text/javascript';

var $;
var html = "<span>|</span><a href='#' title='返回顶部' class='gotoTop'>回顶</a>";

if (head && head.length && head[0].appendChild) {
    head[0].appendChild(GM_JQ);

    // wait for jQuery to load
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
        else { unsafeWindow.jQuery.noConflict();$ = unsafeWindow.jQuery; appendGotoTop(); }
    }
    GM_wait();
}


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