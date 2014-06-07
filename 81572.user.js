// ==UserScript==
// @name           Who Is My Follower
// @namespace      http://t.qq.com/jdomyth
// @description    在QQ微博的“我收听的人”，其他博友的“他收听的人”以及“他的听众”三个页面显示是否已收听我
// @include        http://t.qq.com/*/following*
// @include        http://t.qq.com/*/follower*
// @author         jdomyth
// @edit           by nowboy July 14,2010
// @version        3.0
// ==/UserScript==
// Add jQuery
var GM_JQ = document.createElement('script'),
    head = document.getElementsByTagName('head');
var objMyFollowing;
var arrMyFollowing=[];
var strMyAccount;
var flgScriptStart=false;

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
	/*
	添加一个筛选按钮
	*/
	$("#mainWrapper .tabStyle2 ul").append('<li class=""><a href="#" id="iNotFollowMe" >未回听我的</a></li><li class=""><a href="http://taoku.in/?rf=t.qq.com" id="goTaoKu" target=_blank>TaoKu</a></li>');
	$("#iNotFollowMe").bind("click",function(){
		if(flgScriptStart==true){
			alert("检测已经开始，请等待结束...");
			return;
		}
		flgScriptStart=true;
		$("#mainWrapper .tabStyle2 .select").attr("class","");
		$("#iNotFollowMe").parent().attr("class","select");
		getAllMyFollowing();
	});
	strMyAccount= $("#nav a:first-child").attr("href").substring(1);
	
	//
	$(".userPic").each(function(i){
		var user = $(this).html().replace(/^.*\(@([^\)]+)\).*$/g,"$1");
		getUserCard(i,user,appendSpan);
	});
}


//get userCard info by ajax.
function getUserCard(i,user,fn,callback){
	var url = "http://t.qq.com/asyn/userCard.php?u=" + user;
	$.ajax( {
        type: "GET",
        url: url,
        success: function(r) {
			if(r.indexOf("result")>=0){
				var result = eval("("+r+")");
				if(result.result!=0){
					if(callback){setTimeout(function(){(callback)(-1);},500)}
					return;
				}
				var isFollowed = result.info.followed;
				(fn)(i,isFollowed,user);
			}
			else if(callback){setTimeout(function(){(callback)(-1);},500)}
        }
     } );
}

//append span 
function appendSpan(i,isFollowed,user){
	var strFollowed =  isFollowed == "1"?"是":"否";
	var strFollowedColor =  isFollowed == "1"?"#ffffff":"yellow";
	$(".listWrapper li").eq(i).css("background",strFollowedColor);
	$(".listWrapper .userNums").eq(i).append("<span><a href='/"+user+"'>已收听我：<strong style='font-size:14px;'>"+strFollowed+"</strong></a></span>");
}

function getAllMyFollowing(){
	$("#mainWrapper .tabStyle2").nextAll().replaceWith('<div class="listWrapper"><ul class="LC" id="iUserUNFO"></ul>'
		+'</div><div id="pageNav" class="blueFoot" style="text-align:center">正在刷新列表......</div>');

	$.ajax({
		type: "GET",
		url: "/asyn/nicktips.php?user="+strMyAccount+"&type=1&num=2000",
		async: false,
		dataType:"json",
		success: function(r){
			objMyFollowing=r.info;
			for(y in objMyFollowing)arrMyFollowing[arrMyFollowing.length]=y;			
			//alert(arrMyFollowing,appendSpan)
			startCheckMyFollow();
		},
	});
}
var intCurrentUserId=0;
var intUnFoUser=0;
function startCheckMyFollow(s){
	if(s)intCurrentUserId+=s;
	intCurrentUserId++;
	if(intCurrentUserId>=arrMyFollowing.length){
		$("#pageNav").html("全部完成，未回听:<strong>"+intUnFoUser+"人</strong>");
		intUnFoUser=0;
		intCurrentUserId=0;
		flgScriptStart=false;
		return;
	}
	getUserCard(intCurrentUserId,arrMyFollowing[intCurrentUserId],selectUnFollowing,startCheckMyFollow);
}

function selectUnFollowing(i,isFollowed,user){
	if(isFollowed!="1"){
		intUnFoUser++;
		$("#iUserUNFO").append('<li><a href="/'+user+'"><strong>'
			+objMyFollowing[user]+"</strong></a>(@"+user+")"
			+'<input type="button" class="delAttention" value="取消收听" onclick="follow(\''+user+'\',this);" /></li>');
	}
	startCheckMyFollow();
}