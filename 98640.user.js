// ==UserScript==
// @name           Douban TopNav Plus
// @description    豆瓣顶部导航增强
// @include        http://*.douban.com/*
// @exclude        http://9.douban.com/*
// @author         ting
// ==/UserScript==

//2011-04-08 更新 
//添加显示提醒和关注功能
//脚本更名为：
//Douban TopNav Plus//豆瓣顶部导航增强

var $=unsafeWindow.jQuery;

if($('.top-nav-info').length>0){
//修正不登陆首页也弹菜单的bug，另外还有如何判断元素是否存在，囧。


$.get("http://www.douban.com/", function(data){
$('.top-nav-info').prepend($(".bd div.pl div.pl a ",data));
});
//将提醒和关注及时显示到顶部导航上，方便爱乱逛不常刷首页的豆友及时发现新提醒。


$('.top-nav-items li:nth-child(5)').replaceWith("<li><a target=\"_blank\" href=\"http://9.douban.com/\">豆瓣九点</a></li>");
$('.top-nav-items li:nth-child(6)').replaceWith("<li><a href=\"http://www.douban.com/mine/\">我的豆瓣</a></li>");
//把导航改了改，删掉电台，换成“我的豆瓣”。九点变成“豆瓣九点”，好吧我有病。


var home_bar = new Array('<a href=\"http://www.douban.com/group/\">我的小组</a>','<a href=\"http://www.douban.com/group/my_topics\">发起话题</a>','<a href=\"http://www.douban.com/group/my_replied_topics\">回应话题</a>','<a href=\"http://www.douban.com/help/\">帮助中心</a>','<a href=\"http://www.douban.com/service/\">豆瓣服务</a>','<a href=\"http://www.douban.com/help/ask\">提问</a>','<a target="_blank" href=\"http://blog.douban.com/\">豆瓣blog</a>');

var book_bar = new Array('<a href="http://book.douban.com/mine">我的读书</a>','<a href="http://book.douban.com/updates">关注动态</a>','<a href="http://book.douban.com/writers/">作者译者</a>','<a href="http://book.douban.com/recommended">豆瓣猜</a>','<a href="http://book.douban.com/review/best/">热评</a>','<a href="http://book.douban.com/chart">排行榜</a>','<a href="http://book.douban.com/top250">图书250</a>','<a href="http://book.douban.com/tag/">分类浏览</a>');

var movie_bar = new Array('<a href="http://movie.douban.com/mine">我的电影</a>','<a href="http://movie.douban.com/celebrities/">影人</a>','<a href="http://movie.douban.com/review/best/">热评</a>','<a href="http://movie.douban.com/recommended">豆瓣猜</a>','<a href="http://movie.douban.com/chart">排行榜</a>','<a href="http://movie.douban.com/top250">电影250</a>','<a href="http://movie.douban.com/tag/">分类浏览</a>','<a href="http://movie.douban.com/tv">电视剧</a>');

var music_bar = new Array('<a href="http://music.douban.com/mine">我的音乐</a>','<a target="_blank" href="http://douban.fm/">豆瓣FM</a>','<a href="http://music.douban.com/artists/">音乐人</a>','<a href="http://music.douban.com/review/best/">热评</a>','<a href="http://music.douban.com/recommended">豆瓣猜</a>','<a href="http://music.douban.com/chart">排行榜</a>','<a href="http://music.douban.com/top250">音乐250</a>','<a href="http://music.douban.com/tag/">分类浏览</a>','<a href="javascript:if(!window.open(&quot;http://douban.fm/radio&quot;,&quot;D&quot;,&quot;height=186,width=420,toolbar=no,menubar=no,scrollbars=no,location=no,status=no&quot;)){location.href=&quot;http://douban.fm/radio&quot;}">弹出电台</a>');

var nine_bar = new Array('<a target="_blank" href="http://9.douban.com/reader/">我的订阅</a>','<a target="_blank" href="http://9.douban.com/channel/culture">文化</a>','<a target="_blank"  href="http://9.douban.com/channel/life">生活</a>','<a target="_blank"  href="http://9.douban.com/channel/fun">趣味</a>','<a target="_blank" href="http://9.douban.com/channel/technology">科技</a>');

var mine_bar = new Array('<a href="http://www.douban.com/mine/notes">日记</a>','<a href="http://www.douban.com/mine/photos">相册</a>','<a href="http://www.douban.com/mine/discussions">讨论</a>','<a href="http://www.douban.com/mine/recs">推荐</a>','<a href="http://www.douban.com/mine/doulists">豆列</a>','<a href="http://www.douban.com/mine/board">留言板</a>','<a href="http://www.douban.com/mine/miniblogs">广播</a>','<a href="http://www.douban.com/contacts/list?tag=1">我的朋友</a>','<a href="http://www.douban.com/contacts/list">友邻</a>','<a href="http://www.douban.com/group/mine">小组列表</a>','<a href="http://www.douban.com/mine/minisite">小站列表</a>','<a href="http://www.douban.com/settings/">设置</a>');




$("div.top-nav-items a").wrap('<div class=\"menu\"></div>');
//把导航链接包装成menu类。



$(".menu:eq(0)").append('<table class="mlist"><tr><td>'+home_bar.join("</td></tr> <tr><td>")+'</td></tr></table>');
$(".menu:eq(1)").append('<table class="mlist"><tr><td>'+book_bar.join("</td></tr> <tr><td>")+'</td></tr></table>');
$(".menu:eq(2)").append('<table class="mlist"><tr><td>'+movie_bar.join("</td></tr> <tr><td>")+'</td></tr></table>');
$(".menu:eq(3)").append('<table class="mlist"><tr><td>'+music_bar.join("</td></tr> <tr><td>")+'</td></tr></table>');
$(".menu:eq(4)").append('<table class="mlist"><tr><td>'+nine_bar.join("</td></tr> <tr><td>")+'</td></tr></table>');
$(".menu:eq(5)").append('<table class="mlist"><tr><td>'+mine_bar.join("</td></tr> <tr><td>")+'</td></tr></table>');
//在menu中添加类为mlist的表单，下拉菜单用table更方便些。




$(".mlist").css({
  "position":"absolute",
  "visibility":"hidden",
  "z-index":"10",
  "background-color":"#E9F4E9"
  });
//修改菜单mlist的CSS，z-index表示垂直层面的前后关系，value值大就能覆盖其他元素。




$(".menu:eq(0)").hover(
  function () {
    $(".mlist:eq(0)").css("visibility", "visible");
  }, 
  function () {
    $(".mlist:eq(0)").css("visibility", "hidden");
  }
);
$(".menu:eq(1)").hover(
  function () {
    $(".mlist:eq(1)").css("visibility", "visible");
  }, 
  function () {
    $(".mlist:eq(1)").css("visibility", "hidden");
  }
);
$(".menu:eq(2)").hover(
  function () {
    $(".mlist:eq(2)").css("visibility", "visible");
  }, 
  function () {
    $(".mlist:eq(2)").css("visibility", "hidden");
  }
);
$(".menu:eq(3)").hover(
  function () {
    $(".mlist:eq(3)").css("visibility", "visible");
  }, 
  function () {
    $(".mlist:eq(3)").css("visibility", "hidden");
  }
);
$(".menu:eq(4)").hover(
  function () {
    $(".mlist:eq(4)").css("visibility", "visible");
  }, 
  function () {
    $(".mlist:eq(4)").css("visibility", "hidden");
  }
);
$(".menu:eq(5)").hover(
  function () {
    $(".mlist:eq(5)").css("visibility", "visible");
  }, 
  function () {
    $(".mlist:eq(5)").css("visibility", "hidden");
  }
);
//hover方法设置菜单的可见性。写的好笨啊混蛋！

}




