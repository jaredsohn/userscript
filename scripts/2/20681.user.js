// ==UserScript==
// @name           Douban Sliding Navbar
// @namespace      http://npchen.blogspot.com
// @description    悬停式二级导航 + 自动显示邀请和提醒(v3.0)
// @include        http://www.douban.com/*
// @exclude        http://www.douban.com/plaza/*
// @exclude        http://www.douban.com/service/apidoc/*
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         NullPointer
// @version        3.0
/* @reason
   v3.0 
   1. 响应改版，恢复右上角邀请和提醒数字的显示
   2，底部导航自动隐藏，鼠标在底部悬停再自动出现。
   @end*/
// ==/UserScript==
var thisScript = {
   name: "悬停式二级导航",
   id: "20681",
   version:"3.0"
}

var updater = new Updater(thisScript);
updater.check();   


if(typeof unsafeWindow.jQuery !== "undefined") {
   var jQuery = unsafeWindow.jQuery;
   var $ = jQuery 
} 


function CGM_getValue(v, utf8_defaultV) {
    var t = GM_getValue(v);
    if (t==undefined) return utf8_defaultV;
    else return decodeURIComponent(t);
}

function CGM_setValue(n, v) {
    GM_setValue(n, encodeURIComponent(v));
}

var home_bar = "<a href=\"http://blog.douban.com/\">豆瓣blog</a><a href=\"/help\">帮助中心</a><a href=\"/service\">豆瓣服务</a>"

var mydouban_bar = CGM_getValue("/mine/","<a href=\"/mine/notes\">日记</a><a href=\"/mine/discussions\">评论和讨论</a><a href=\"/mine/recs\">我的推荐</a><a href=\"/mine/miniblogs\">广播</a><a href=\"/mine/exchange\">二手</a><a href=\"/mine/doulists\">豆列</a><a href=\"/mine/board\">留言板</a>");

var neighbor_bar = CGM_getValue("/contacts/","<a href=\"/contacts/listfriends\">我的朋友</a><a href=\"/contacts/list\">我关注的人</a><a href=\"/contacts/find\">找朋友</a><a href=\"/contacts/invite\">邀请</a>");

var group_bar = CGM_getValue("/group/","<a href=\"/group/mine\">我的小组</a><a href=\"/group/my_topics\">我的发言</a><a href=\"/group/discover\">更多小组</a>")+"<a href='/group/my_replied_topics'>我回应的话题</a>";

var read_bar = CGM_getValue("/book/","读书: <a href=\"/book/mine\">我读</a><a href=\"/book/recommended\">豆瓣猜</a><a href=\"/book/review/best/\">热评</a><a href=\"/book/chart\">排行榜</a><a href=\"/book/browse\">分类浏览</a>");

var movie_bar = CGM_getValue("/movie/","电影: <a href=\"/movie/mine\">我看</a><a href=\"/movie/recommended\">豆瓣猜</a><a href=\"/movie/review/best/\">热评</a><a href=\"/movie/chart\">排行榜</a><a href=\"/movie/browse\">分类浏览</a><a href=\"/movie/tv\">电视剧</a>");

var music_bar = CGM_getValue("/music/","音乐: <a href=\"/music/mine\">我听</a><a href=\"/music/recommended\">豆瓣猜</a><a href=\"/music/review/best/\">热评</a><a href=\"/music/chart\">排行榜</a><a href=\"/music/browse\">分类浏览</a>");

var city_bar = CGM_getValue("/event/","<a href=\"/event/mine\">我的活动</a><a href=\"/event/\">我的城市</a><a href=\"/location/world/\">浏览其他城市</a>");

var plaza_bar = "<a href=\"/plaza/citysquare/\">城市广场</a><a href=\"/plaza/centralpark/\">中央公园</a><a href=\"/plaza/backstreet\">后街</a><a href=\"/plaza/timewharf/\">时光码头</a>|<a href=\"http://9.douban.com/\">九点</a>"

var now;
var sbar;

function lighted(i){
   $("div#nav a").attr("class","");
   $("div#nav a:eq("+i+")").attr("class","now");
}

$(document).ready(function(){
  var nowitem = $("a.now");
  now = nowitem.attr("href");
  var subnav =  $("div#subnav");
  sbar = subnav.html();
  
  var texta = $("div#nav a:not(:has(span))");
  $.each(texta,function(){
    var sp = $("<span></span>").html($(this).html());
    $(this).empty().append(sp);
  });
  
  var nav = $("div#nav");
  nav.children("a:eq(0)").mouseover(function(){subnav.html(home_bar); lighted(0)});
  nav.children("a:eq(1)").mouseover(function(){subnav.html(mydouban_bar); lighted(1)}); 
  nav.children("a:eq(2)").mouseover(function(){subnav.html(neighbor_bar); lighted(2)}); 
  nav.children("a:eq(3)").mouseover(function(){subnav.html(group_bar); lighted(3)}); 
  nav.children("a:eq(4)").mouseover(function(){subnav.html(read_bar); lighted(4)}); 
  nav.children("a:eq(5)").mouseover(function(){subnav.html(movie_bar); lighted(5)}); 
  nav.children("a:eq(6)").mouseover(function(){subnav.html(music_bar); lighted(6)}); 
  nav.children("a:eq(7)").mouseover(function(){subnav.html(city_bar); lighted(7)}); 
  nav.children("a:eq(8)").mouseover(function(){subnav.html(plaza_bar); lighted(8)}); 
//  item.mouseover(function(){subnav.html("")});
  $("div#content").mouseover(function(){
      subnav.html(sbar); 
      $("div#nav a").attr("class",""); 
      nowitem.attr("class","now");
      $('#footer ul:first').hide();
  });
//  $("h1").mouseover(function(){subnav.html(sbar)});
  
  var sta = $("#status a"); 
  var i = 0; 
  var staa = new Array(sta.length);
  $.each(sta, function(){staa[i++]=$(this).attr("href");});
 
  $('#footer').mouseover(function(){$('#footer ul:first').show();}) 
 
  if ($.inArray("/doumail/", staa)!=-1) {
 
    $("<div id='peep'/>").load("/notification/ #content", function(){
      var checks = $("#peep #content ul:last p").length;
      $("#peep #content ul:last").remove();
      var uncheck = $("#peep #content ul p").length;
      var note = "提醒"; 
      checks = checks + uncheck;
      if (checks>0) note = note +"("+ uncheck +":"+checks+")";
      $("#status #subnav").after($("<a href='/notification/'>"+note+"</a>"));
      $("div#peep").empty();
    }).appendTo("body").hide();
    
  $("<div id='peepy'/>").load("/request/ #content",function(){
      var reqs = $("#peepy #content li.mbtrdot").length;
      var req = "邀请";
      if (reqs>0) req = req + "("+reqs +")";
      $("#status #subnav").after($("<a href='/request/'>"+req+"</a>"));
      $("div#peepy").empty();
     }).appendTo("body").hide();

    }
})

CGM_setValue(now, sbar);