// ==UserScript==
// @name        Loading.se Love
// @namespace   http://loading.se
// @version     0.1
// @description Loves the forum posts of cool users
// @match       http://loading.se/*
// @copyright   batte_ri
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==


var loves = ['Konstnären', 'Skarlman']; // this is your love list

$("table.forum_thread_list td.forum_thread_tbr_td").find("a.forum_user_on, a.forum_user_off").each(function(){
	var e=$(this),
	    t=e.find("b").text();

	if($.inArray(t,loves)>-1||t.split("").reverse().join("")=="ir_ettab"){
		var n=e.parents("tr.forum_thread_tbr"),
		    r=e.attr("href"),i="";
		headn = n.prev("tr.forum_thread_tbr_head");
		footn = n.next().next("tr.forum_thread_tbr_foot");
		
		n.hasClass("odd")&&(i=" odd");
		var s=$('<tr class="forum_thread_tbr_head'+i+'"><td class="forum_thread_tbr_td" colspan="2"><img src="/gfx/smilies/love.gif"><img src="https://dl.dropbox.com/u/26977240/Love/uni.gif"><img src="/gfx/smilies/love.gif"><img src="https://dl.dropbox.com/u/26977240/Love/glitter2.gif"><img src="/gfx/smilies/love.gif"><img src="https://dl.dropbox.com/u/26977240/Love/uni2.gif"><img src="/gfx/smilies/love.gif"><span class="repelled" style="margin:5px 5px 0 0;"></span></td></tr>').insertBefore(headn);
		var ss=$('<tr class="forum_thread_tbr_foot'+i+'"><td class="forum_thread_tbr_td" colspan="3"><img src="/gfx/smilies/love.gif"><img src="https://dl.dropbox.com/u/26977240/Love/uni.gif"><img src="/gfx/smilies/love.gif"><img src="https://dl.dropbox.com/u/26977240/Love/glitter2.gif"><img src="/gfx/smilies/love.gif"><img src="https://dl.dropbox.com/u/26977240/Love/uni2.gif"><img src="/gfx/smilies/love.gif"></td></tr>').insertBefore(footn);

		var loveColor = "LightPink";

		headn.hide();
		footn.hide();
		n.children().css("background-color", loveColor);
		n.next().children().css("background-color", loveColor);
		n.prev().prev().children().css("background-color", loveColor);
		n.next().next().children().css("background-color", loveColor);
	}

})