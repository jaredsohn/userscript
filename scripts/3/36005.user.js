// ==UserScript==
// @name           Douban Menu
// @namespace      http://www.douban.com/people/zython/
// @description    豆瓣下拉菜单
// @include        http://www.douban.com/*
// @author         zython
// @require       http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @version        0.6.5
/* @reason
修改音乐附属的链接
 @end*/
// ==/UserScript==

var thisScript = {
  name: "豆瓣下拉菜单",
  id: "36005",
  version:"0.6.5"
};
var updater = new Updater(thisScript);
updater.setHoursToCheck(24);
updater.check();

var $=unsafeWindow.jQuery;
var uid = GM_getValue("uid", 'zython');
// 设置username或用户号
function setUid()
{
  var temp = $.trim(prompt("请输入数字用户ID或username，如1554547或zython, 便于补完需要该参数的url", uid));
  if( temp !="" && temp !=null ) 
  {
    GM_setValue("uid", temp);
    uid = temp;
  }
}
GM_registerMenuCommand("设置个人主页地址的参数", setUid);

var home_bar = new Array('<a href="http://blog.douban.com/">豆瓣blog</a>','<a href="/help">帮助中心</a>','<a href="/service">豆瓣服务</a>','<a href="/help/ask">联系我们</a>');

var mine_bar = new Array('<a href="/mine/notes">我的日记</a>','<a href="/note/create">写日记</a>','<a href="/mine/photos">我的相册</a>','<a href="/mine/discussions">评论和讨论</a>','<a href="/mine/recs">我的推荐</a>','<a href="/mine/miniblogs">我的广播</a>','<a href="/people/'+uid+'/offers">二手</a>','<a href="/mine/doulists">我的豆列</a>','<a href="/mine/board">留言板</a>','<a href="/people/'+uid+'/subjects">我添加的条目</a>','<a href="/people/'+uid+'/places">我去的地方</a>');

var contacts_bar = new Array('<a href="/contacts/?type=recs">友邻推荐</a>','<a href="/contacts/listfriends">我的朋友</a>','<a href="/contacts/list">我关注的人</a>','<a href="/contacts/find">找朋友</a>','<a href="/contacts/invite">邀请</a>','<a href="/settings/miniblog/blacklist?add=1">加入黑名单</a>');

var group_bar = new Array('<a href="/group/mine">我的小组</a>','<a href="/group/my_topics">我的发言</a>','<a href="/people/'+uid+'/replied_topics">我回应的话题</a>','<a href="/group/discover">更多小组</a>');

var book_bar = new Array('<a href="/book/mine?status=do">在读</a>','<a href="/book/mine?status=wish">想读</a>','<a href="/book/mine?status=collect">读过</a>','<a href="/book/recommended">豆瓣猜</a>','<a href="/book/review/best/">热评</a>','<a href="/book/chart">新书榜</a>','<a href="/book/top250">图书250</a>','<a href="/book/browse">分类浏览</a>');

var movie_bar = new Array('<a href="/movie/mine?status=do">在看</a>','<a href="/movie/mine?status=wish">想看</a>','<a href="/movie/mine?status=collect">看过</a>','<a href="/movie/recommended">豆瓣猜</a>','<a href="/movie/review/best/">热评</a>','<a href="/movie/chart">排行榜</a>','<a href="/movie/top250">电影250</a>','<a href="/movie/browse">分类浏览</a>','<a href="/movie/tv">电视剧</a>');

var music_bar = new Array('<a href="/music/mine?status=do">在听　　</a>','<a href="/music/mine?status=wish">想听　　</a>','<a href="/music/mine?status=collect">听过</a>','<a href="/mine/artist">我关注的音乐人</a>','<a href="/music/recommended">豆瓣猜　</a>','<a href="/music/review/best/">热评　</a>','<a href="/music/chart">排行榜</a>','<a href="/music/top250">音乐250</a>','<a href="/music/browse">分类浏览</a>','<a href="http://www.douban.com/artist/">音乐人</a>');

var event_bar = new Array('<a href="/event/mine">我的同城活动</a>','<a href="/event/friends">友邻的活动</a>','<a href="/online/mine">我的线上活动</a>','<a href="/online/">线上活动</a>');

var plaza_bar = new Array('<a href="/plaza/citysquare/">城市广场</a>','<a href="/plaza/centralpark/">中央公园</a>','<a href="/plaza/backstreet">后　　街</a>','<a href="/plaza/timewharf/">时光码头</a>');

var blog_bar = new Array('<a href="http://9.douban.com/reader/">我的订阅</a>', '<a href="http://9.douban.com/channel/culture">文化</a>','<a href="http://9.douban.com/channel/life">生活</a>','<a href="http://9.douban.com/channel/technology">科技</a>','<a href="http://9.douban.com/channel/fun">趣味</a>');

//add css
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function LoadJsCssFile(filename, filetype){
    var fileref;
    if (filetype=="js"){ //如果是.js文件
        fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
    }
    else if (filetype=="css"){ //如果是.css文件
        fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href",filename);
    }
    if (typeof fileref != "undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}
$(document).ready(function(){
  addGlobalStyle('#nav div{ float: left;}');
  addGlobalStyle('.Menu{font-size:10px; position: absolute;z-index: 2;visibility: hidden;padding: 0.3em 0.3em 0.6em;background-color:#EEF9EB;border: solid #ccc;border-width: 0 1px 1px 1px;}');
  addGlobalStyle('.Box:hover .Menu{ visibility:visible;}');
  addGlobalStyle('.Box .Menu { margin-top: 30px;}');
  $("div#nav").append('<a href="/plaza/">广场</a>');
  $("div#nav a").wrap('<div class="Box"></div>');
  $(".Box:eq(0)").append('<ul class="Menu"><li>'+home_bar.join("</li><li>")+'</li></ul>');
  $(".Box:eq(1)").append('<ul class="Menu"><li>'+mine_bar.join("</li><li>")+'</li></ul>');
  $(".Box:eq(2)").append('<ul class="Menu"><li>'+contacts_bar.join("</li><li>")+'</li></ul>');
  $(".Box:eq(3)").append('<ul class="Menu"><li>'+group_bar.join("</li><li>")+'</li></ul>');
  $(".Box:eq(4)").append('<ul class="Menu"><li>'+book_bar.join("</li><li>")+'</li></ul>');
  $(".Box:eq(5)").append('<ul class="Menu"><li>'+movie_bar.join("</li><li>")+'</li></ul>');
  $(".Box:eq(6)").append('<ul class="Menu"><li>'+music_bar.join("</li><li>")+'</li></ul>');
  $(".Box:eq(7)").append('<ul class="Menu"><li>'+event_bar.join("</li><li>")+'</li></ul>');
  $(".Box:eq(8)").append('<ul class="Menu"><li>'+blog_bar.join("</li><li>")+'</li></ul>');
  $(".Box:eq(9)").append('<ul class="Menu"><li>'+plaza_bar.join("</li><li>")+'</li></ul>');
})