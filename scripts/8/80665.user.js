// ==UserScript==
// @name           Is My Follower For Chrome
// @namespace      http://t.qq.com/jdomyth
// @description    在QQ微博的“我收听的人”，其他博友的“他收听的人”以及“他的听众”三个页面显示是否已收听我
// @required       http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js
// @include        http://t.qq.com/*/following*
// @include        http://t.qq.com/*/follower*
// @author         jdomyth
// @version        2.0
// ==/UserScript==

$(document).ready(function() {
    getUser();
})


//get user and position
function getUser(){
	//if it is my follower page, then return.
	if($(".main div:first-child ul li").eq(1).attr("class") == 'select'){
		return;
	}
	$(".userPic a:last-child").each(function(i){
		var href = $(this).attr("href");
		var user = href.substring(1,href.length);
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
	var red = isFollowed == "0"?"red":"";
	$(".listWrapper .userNums").eq(i).append("<span><a href='/"+user+"'>已收听我:<strong style='font-size:12px;'><font color='"+red+"'>"+strFollowed+"</font></strong></span>");
}