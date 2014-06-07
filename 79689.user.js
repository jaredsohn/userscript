// ==UserScript==
// @name           ismyfollower
// @namespace      http://userscripts.org/scripts/show/79324
// @description    在QQ微博的“我收听的人”页面显示是否已收听我
// @include        http://t.qq.com/*/following*
// @author         kim zhuang
// @version        1.0
// ==/UserScript==
// Add jQuery
var GM_JQ = document.createElement('script'),
    head = document.getElementsByTagName('head');

GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js';
GM_JQ.type = 'text/javascript';

var $;
if (head && head.length && head[0].appendChild) {
    head[0].appendChild(GM_JQ);

    // wait for jQuery to load
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
        else { unsafeWindow.jQuery.noConflict();$ = unsafeWindow.jQuery; getUser(); }
    }
    GM_wait();
}

//get user and position
function getUser(){
	$(".userPic a:first-child").each(function(i){
		var user = $(this).attr("title").replace(/.+\(@(.+)\)/g,"$1");
		getUserCard(i,user);
	});
}

//get userCard info by ajax.
function getUserCard(i,user){
	var url = "http://t.qq.com/asyn/userCard.php?u=" + user;
	$.ajax( {
        type: "GET",
        url: url,
        success: function(r) {
			var result = eval("("+r+")");
			var isFollowed = result.info.followed;
			appendSpan(i,isFollowed,user);
        }
     } );
}

//append span 
function appendSpan(i,isFollowed,user){
	var strFollowed =  isFollowed == "1"?"是":"否";
	$(".userNums").eq(i).append("<span><a href='/"+user+"'>已收听我:<strong style='font-size:12px;'>"+strFollowed+"</strong></span>");
}