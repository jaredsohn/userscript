// DouBan Sliding Menu Plugin
// version 200803121630
// 2008-03-12
// Copyright (c) 2008, Inorth, http://notebk.spaces.live.com/
//Email: blueicejin@163.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name          DouBan Sliding Menu Plugin
// @namespace     http://notebk.spaces.live.com/
// @description   Easy Using Menu For Douban.com. Created By Inorth. blueicejin@163.com.http://notebk.spaces.live.com/
// @include       http://www.douban.com/*
// @include       http://douban.com/*
// ==/UserScript==
function slidingmenu(item){
    subnav = document.getElementById('subnav');
    switch(item){
	   default:
	      subnav.innerHTML = '';
	   break;
	   
	   case 'mydouban':
	      subnav.innerHTML = '<a href="/mine/notes">日记</a> <a href="/mine/photos">相册</a> <a href="/mine/discussions">评论和讨论</a> <a href="/mine/recs">推荐</a> <a href="/mine/miniblogs">广播</a> <a href="/mine/exchange">二手</a> <a href="/mine/board">留言板</a> ';
	   break;
	   
	   case 'neighbor':
	      subnav.innerHTML ='<a href="/contacts/listfriends">我的朋友</a> <a href="/contacts/list">我关注的人</a> <a href="/contacts/find">找朋友</a> ';
	   break;
	   
	   case 'groups':
	      subnav.innerHTML ='<a href="/group/mine">我的小组</a> <a href="/group/my_topics">我的发言</a> <a href="/group/discover">更多小组</a> ';
	   break;
	   
	   case 'books':
	      subnav.innerHTML ='<a href="/book/mine">我读</a> <a href="/book/recommended">豆瓣猜</a> <a href="/book/review/best/">热评</a> <a href="/book/chart">排行榜</a> <a href="/book/browse">分类浏览</a> ';
	   break;
	   
	   case 'movies':
	      subnav.innerHTML ='<a href="/movie/mine">我看</a> <a href="/movie/recommended">豆瓣猜</a> <a href="/movie/review/best/">热评</a> <a href="/movie/chart">排行榜</a> <a href="/movie/browse">分类浏览</a> <a href="/movie/tv">电视剧</a> ';
	   break;
	   
	   case 'music':
	      subnav.innerHTML ='<a href="/music/mine">我听</a> <a href="/music/recommended">豆瓣猜</a> <a href="/music/review/best/">热评</a> <a href="/music/chart">排行榜</a> <a href="/music/browse">分类浏览</a> ';
	   break;
	   
	   case 'citys':
	      subnav.innerHTML ='<a href="/event/mine">我的活动</a> <a href="/event/">我的城市</a> <a href="/event/friends">友邻的活动</a> <a href="/location/world/">浏览其他城市</a> ';
	   break;
	}
}
var indexlink, thislink1;
indexlink = document.evaluate(
	'//div[@id="nav"]/a[@href="/"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thislink1 = indexlink.snapshotItem(0);
thislink1.addEventListener('mouseover', function(event) {slidingmenu('default')}, true);

var mydouban, thislink2;
mydouban = document.evaluate(
	'//div[@id="nav"]/a[@href="/mine/"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thislink2 = mydouban.snapshotItem(0);
thislink2.addEventListener('mouseover', function(event) {slidingmenu('mydouban')}, true);

var neighbor, thislink3;
neighbor = document.evaluate(
	'//div[@id="nav"]/a[@href="/contacts/"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thislink3 = neighbor.snapshotItem(0);
thislink3.addEventListener('mouseover', function(event) {slidingmenu('neighbor')}, true);

var group, thislink4;
group = document.evaluate(
	'//div[@id="nav"]/a[@href="/group/"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thislink4 = group.snapshotItem(0);
thislink4.addEventListener('mouseover', function(event) {slidingmenu('groups')}, true);

var book, thislink5;
book = document.evaluate(
	'//div[@id="nav"]/a[@href="/book/"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thislink5 = book.snapshotItem(0);
thislink5.addEventListener('mouseover', function(event) {slidingmenu('books')}, true);

var movie, thislink6;
movie = document.evaluate(
	'//div[@id="nav"]/a[@href="/movie/"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thislink6 = movie.snapshotItem(0);
thislink6.addEventListener('mouseover', function(event) {slidingmenu('movies')}, true);

var music, thislink7;
music = document.evaluate(
	'//div[@id="nav"]/a[@href="/music/"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thislink7 = music.snapshotItem(0);
thislink7.addEventListener('mouseover', function(event) {slidingmenu('music')}, true);

var city, thislink8;
city = document.evaluate(
	'//div[@id="nav"]/a[@href="/event/"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thislink8 = city.snapshotItem(0);
thislink8.addEventListener('mouseover', function(event) {slidingmenu('citys')}, true);

var ninedot, thislink9;
ninedot = document.evaluate(
	'//div[@id="nav"]/a[@href="http://9.douban.com"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
thislink9 = ninedot.snapshotItem(0);
thislink9.addEventListener('mouseover', function(event) {slidingmenu('default')}, true);