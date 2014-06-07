/* 
* @Author: hanjiyun
* @Date:   2013-12-29 02:07:28
* @Last Modified by:   hanjiyun
* @Last Modified time: 2014-01-13 18:45:12
*/

// ==UserScript==
// @name        DoubanCustom
// @namespace   jiyun@han.im
// @include     http://*.douban.com/*
// @version     2
// @grant       GM_setValue
// @grant       GM_getValue
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


$(function(){

/*==================
    导航处理
==================*/
    $('.global-nav-items').html('').append('<div class="global-nav-items"><ul><li><a href="http://www.douban.com/">首页</a></li><li><a href="http://www.douban.com/mine">我的豆瓣</a></li><li><a href="http://www.douban.com/mine/statuses">我的广播</a></li><li><a href="http://book.douban.com/">读书</a></li><li><a href="http://movie.douban.com/">电影</a></li><li><a href="http://music.douban.com/">音乐</a></li><li><a href="http://www.douban.com/location/">同城</a></li><li><a href="http://www.douban.com/group/">小组</a></li><li><a href="http://read.douban.com/?dcs=top-nav&amp;dcm=douban">阅读</a></li><li><a href="http://douban.fm/">豆瓣FM</a></li><li><a href="http://dongxi.douban.com/?dcs=top-nav&amp;dcm=douban">东西</a></li><li><a class="bn-more" href="#more"><span>更多</span></a><div class="more-items"><table cellspacing="0" cellpadding="0"><tbody><tr><td><a href="http://9.douban.com" target="_blank">九点</a></td></tr><tr><td><a href="http://alphatown.com" target="_blank">阿尔法城</a></td></tr><tr><td><a href="http://www.douban.com/mobile/" target="_blank">移动应用</a></td></tr></tbody></table></div></li></ul></div>')

/*==================
    首页右侧广告处理
==================*/

// 屏蔽右侧广告、试试更多有趣的内容、正在发生、豆瓣系列应用; 覆盖滚动时的position:fixed。

    $('head').append('<style type="text/css">.fixed-fields{position:static!important;}#dale_homepage_login_bottom_right, #dale_homepage_login_top_right, .notify-mod, #events, .mobile-app-entrance, #dale_homepage_login_bottom_middle_right, #dale_homepage_online_activity_promo, .channel_promo{display:none!important;}</style>')

    

})



