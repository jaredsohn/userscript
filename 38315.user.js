// ==UserScript==
// @name          old page
// @namespace     http://www.la-go.cn
// @description   index..
// @include       http://www.douban.com/*
// ==/UserScript==
var adSidebar = document.getElementById('nav');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}//删除原来的div

var nav = document.createElement("div");
nav.innerHTML = '<div id="nav"><a class="now" href="http://www.douban.com/?old=1" ><span>首页</span></a><a  href="http://www.douban.com/mine/" ><span>我的豆瓣</span></a><a  href="http://www.douban.com/contacts/" ><span>友邻</span></a><a  href="http://www.douban.com/group/" ><span>小组</span></a><a  href="http://www.douban.com/book/" ><span>读书</span></a> <a  href="http://www.douban.com/movie/" ><span>电影</span></a><a  href="http://www.douban.com/music/" ><span>音乐</span></a><a  href="http://www.douban.com/event/" ><span>同城</span></a><a  href="http://www.douban.com/plaza/" style="color:#eb9000"><span>广场</span></a></div>';

var main, newElement;
main = document.getElementById('searbar');
if (main) {
    main.parentNode.insertBefore(nav, main);
}