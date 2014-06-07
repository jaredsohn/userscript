// ==UserScript==
// @name           Is My Follower
// @namespace      http://t.qq.com/blue0net
// @description    在QQ微博的“我收听的人”，其他博友的“他收听的人”以及“他的听众”三个页面显示是否已收听我
// @include        http://t.qq.com/*/following*
// @include        http://t.qq.com/*/follower*
// @author         blue0net修改 jdomyth原创
// @version        2.1
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
	//if it is my follower page, then return.
	if($(".main div:first-child ul li").eq(1).attr("class") == 'select'){
		return;
	}
	$(".listWrapper .userName a:first-child").each(function(i){
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
	var strFollowed =  isFollowed == "1"?"<span style='color:green;font-size:12px;font-weight:bold'>是</span>":"<span style='color:red;font-size:12px;font-weight:bold'>否</span>";
	$(".userNums").eq(i).append("<span><a href='/"+user+"'>已收听我:<strong style='font-size:12px;'>"+strFollowed+"</strong></span>");
}