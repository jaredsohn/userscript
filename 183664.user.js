// ==UserScript==
// @name        V2EX Designer News Style
// @description V2EX Designer News Style made by Ray. www.rayps.com
// @version     1.5
// @include     http://*.v2ex.com/*
// @include     https://*.v2ex.com/*
// @include     http://v2ex.com/*
// @include     https://v2ex.com/*

// @downloadURL   http://userscripts.org/scripts/source/183664.user.js
// @updateURL       http://userscripts.org/scripts/source/183664.user.js
// @homepage        http://userscripts.org/scripts/show/183664
// @icon                 
// ==/UserScript==

var username = ""
var unreadCount = 0

if ($("#Top .top:nth-child(2)")[0]) {username = $("#Top .top:nth-child(2)").html()}
if ($("#money")[0]) {unreadCount = $("#money").parent().find("a").eq(1).html().split(" ")[0]}

//LOGO
$("#Top .content").prepend("<a href='/' id='DNS_logo' style='overflow:hidden;float: left;margin-left: -140px;line-height: 60px;display: inline-block;font-size:48px;color:#788390;font-family: Arial;font-weight: bold;text-decoration: none;width: 140px;height: 60px;text-align: left;'>V2EX<a>")
$("#DNS_logo").mouseenter(function(){$(this).css("color","#8794A3")}).mouseleave(function(){$(this).css("color","#788390")})
//LOGO

//Menu
function hasMSG() {if (unreadCount != 0) {return " (" + unreadCount + ")"} else {return ""} }
if(username != "注册"){
	$("#Top .content").append("<a href='"+"/member/"+ username + "' id='DNS_username' style='float:right;line-height: 60px;display: inline-block;font-size:16px;color:#D0D9E4;font-family: Arial;text-decoration: none;width: 140px;height: 60px;'>" + username + hasMSG() + "</a>")
	$("#Top .content").append("<ul id='DNS_usermenu' style='display:none;z-index:9;text-align: left;background-color: #596574;width: 200px;list-style: none;position: absolute;left: 50%;margin-left: 120px;top: 60px;margin-top: 0px;'><li><a href='/notifications'>"+unreadCount+" 条未读提醒</a></li><li><a href='/settings'>设置</a></li><li><a href='/signout'>登出</a></li></ul>")
} else {
	$("#Top .content").append("<a href='/signup' class='DNS_sign'>注册</a><a href='/signin' class='DNS_sign'>登入</a>")
    $("#Top .content .DNS_sign").css({"float":"right","line-height":"60px","font-size":"16px","color":"#D0D9E4","text-decoration":"none","margin-right":"20px","height":"60px"})
}

$("#DNS_usermenu li").css({"margin":"0px","border-top":"1px solid #495462"})
$("#DNS_usermenu a,#DNS_usermenu li a:link,#Top .content ul li a:visited").css({"color":"#CDD9E3","display":"block","margin":"0","text-indent":"20px","line-height":"40px","height":"40px","text-decoration":"none"})
$("#DNS_username").css("-webkit-transition","all .2s ease-Out")
$("#DNS_username").mouseenter(function(){
    $(this).css({"background-color":"#576475"})
    $("#DNS_usermenu").show()
}).mouseleave(function(){
    $(this).css({"background-color":"#495462"})
    $("#DNS_usermenu").hide()
})

$("#DNS_usermenu").mouseenter(function(){
    $("#DNS_username").css({"background-color":"#576475"})
    $(this).show()
}).mouseleave(function(){
    $("#DNS_username").css({"background-color":"#495462"})
    $(this).hide()
})
GM_addStyle('#DNS_usermenu a:hover{color:white !important;}')
//Menu



//Leftbar
$("#Leftbar").prepend($("#Search").parent().html())
$("#Top .content div").remove()
$("#Search form div").css({"background":"none","width":"160px","height":"60px"})
$("#q").attr("placeholder","Search")
GM_addStyle('#Leftbar{margin-left: -400px;left: 50%;position: absolute;background: none;height: 200px;width: 160px;}')
GM_addStyle('#q{color: #808080;line-height: 12px;padding: 0px 10px; border-radius: 14px; margin: 20px 15px 20px 25px; border: none; width: 100px; height: 20px; background-color: #FFF;}')
GM_addStyle('::-webkit-input-placeholder{color:#C0C0C0}')

var leftListHTML = '<ul id="DNS_leftList">\
						<li class="l1"></li>\
						<li class="l2"></li>\
						<li class="l3"></li>\
						<li class="dailyGift" style="margin-top:10px;"></li>\
						<li><a href="/planes">浏览所有节点</a></li>\
					</ul>'
                    
$("#Leftbar").append(leftListHTML)

if($("#Rightbar .bigger")[0]) {
    $("#DNS_leftList .l1").append("<a href='/my/nodes'>节点收藏" + "<span>" + $(".bigger").eq(1).html() + "</span></a>")
    $("#DNS_leftList .l2").append("<a href='/my/topics'>主题收藏" + "<span>" + $(".bigger").eq(2).html() + "</span></a>")
    $("#DNS_leftList .l3").append("<a href='/my/following'>特别关注" + "<span>" + $(".bigger").eq(3).html() + "</span></a>")
}
if ($(".icon-gift")[0]) {
    $(".dailyGift").append($(".icon-gift").next())
}

GM_addStyle('#DNS_leftList{line-height:25px;font-size:12px;margin:0 0 0 30px;list-style:none;text-align:left;width:110px;}   #DNS_leftList a{display:block;text-decoration:none;}   #DNS_leftList a span{float:right;}')
$("#Rightbar").remove() 
//Leftbar


//Global
$("#Main .sep20:nth-child(1)").remove()
$("#Main").css({"width":"640px","margin-left":"-240px","padding-bottom":"100px","position":"absolute","left":"50%"})
$("#Main .tab").css({"margin-right":"4px"})
$("#Top").css({"height":"60px","background-image":"none","background-color":"#3C4552","border":"none"})
$("#Top .content").css({"position":"absolute","margin-left":"-240px","left":"50%","background-color":"#475363","width":"640","height":"60px"})
$("#Wrapper").css({"background-image":"none","background-color":"#eceef1"})
$("body").css({"background-color":"#eceef1","padding-bottom":"100px"})
$("#DNS_logo").css("-webkit-transition","all .5s ease-Out")
$("#DNS_logo").css("text-shadow","#2C3641 1px 1px,#2C3641 2px 2px,#2C3641 3px 3px,#2C3641 4px 4px,#2C3641 5px 5px,#2C3641 6px 6px,#2C3641 7px 7px,#2C3641 8px 8px,#2C3641 9px 9px,#2C3641 10px 10px,#2C3641 11px 11px,#2C3641 12px 12px,#2C3641 13px 13px,#2C3641 14px 14px,#2C3641 15px 15px,#2C3641 16px 16px,#2C3641 17px 17px,#2C3641 18px 18px,#2C3641 19px 19px,#2C3641 20px 20px,#2C3641 21px 21px,#2C3641 22px 22px,#2C3641 23px 23px,#2C3641 24px 24px,#2C3641 25px 25px,#2C3641 26px 26px,#2C3641 27px 27px,#2C3641 28px 28px,#2C3641 29px 29px,#2C3641 30px 30px")
$(".box").css({"box-shadow":"none","border":"none","border-radius":"0"})
//Global

//Home
$(".item").css({"background-image":"none","width":"600px","margin-left":"20px","padding":"20px 0px"})
$(".avatar").css({"border-radius":"48px","background-color":"#f9f9f9"})
$(".item_title a").css({"color":"#404040"})
GM_addStyle('#Main a:hover{text-decoration:none !important;} .item_title a:visited{color: #BFC4CC !important;}')
if(document.title == "V2EX"){$("#Main .box:nth-child(3)").hide()}
if($(".cell.item").eq(0).find("img").length == 2) { $(".cell.item").eq(0).find("img").eq(0).css({"margin":"-20px -10px 0px 600px"})}
//Home

//Topic
$("#Main .fr img").css({"border-radius":"73px"})
$(".header").css({"margin":"0px 10px"})
$(".topic_content").css({"margin":"10px"})
$(".f11").css({"margin":"0"})
$("#reply_content").css({"width":"610px"})
$(".topic_buttons").css({"background":"none","background-color":"#F9F9F9","border-radius":"0"})
$(".box:nth-child(3) .cell,.box:nth-child(3) .inner").css({"background-image":"none","width":"600px","margin-left":"20px","padding":"20px 0px"})
$(".super.button").css({"background":"none","background-color":"#637583","border":"0","padding":"10px 40px","color":"white","text-shadow":"none","font-size":"14px"})
$(".reply_content,.imgly").css({"max-width":"540px"})
//Topic

//Member
$(".dock_area").css({"background-image":"none","background-color":"#F9F9F9"})
if (location.href.indexOf("member") !== -1){
	$(".fr").eq(0).children().eq(2).removeAttr('class')
    .removeAttr('style')
    .css({"border":"none","background-color":"#E3E9EB","color":"gray","border-radius":"3px","cursor":"pointer","outline":"none"})
}
//Member

//Planes
if(document.title.indexOf("Planes") !== -1){
    $("#Main .box:nth-child(1)").css({"height":"90px"})
    $(".inner a").css({"background":"none","background-color":"#f9f9f9"})
}
//Planes

//New topic
$(".mle").css("width","600px")
if(document.title.indexOf("创建新主题") !== -1){
	$(".inner").hide()
}
//New topic




$("#Bottom").hide()



                        