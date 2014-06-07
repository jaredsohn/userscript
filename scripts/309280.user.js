// ==UserScript==
// @name       html5player
// @namespace  http://www.terrychan.org/
// @version    0.2
// @description   HTML5 Player 来自妈妈再也不用担心我的macbook发烫了计划 
 
// @include http://v.youku.com/v_show/*
// @include http://bilibili.smgbb.cn/video/av*
// @include http://www.bilibili.tv/video/av*
// @include http://v.pps.tv/*
// @include http://ipd.pps.tv/*
// @include http://v.163.com/movie/*
// @include http://vod.kankan.com/v/*
// @include http://www.yinyuetai.com/video/*
 
// @include http://v.sohu.com/*
 
// @match http://v.youku.com/v_show/*
// @match http://bilibili.smgbb.cn/video/av*
// @match http://www.bilibili.tv/video/av*
// @match http://v.pps.tv/*
 
// @match http://www.iqiyi.com/*
// @match http://ipd.pps.tv/*
// @match http://v.163.com/movie/*
// @match http://vod.kankan.com/v/*
// @match http://www.yinyuetai.com/video/*
 
// @match http://v.sohu.com/*
// @match http://www.56.com/*
// @copyright  2014+, You
// ==/UserScript==

javascript:(function(){var l = document.createElement('link');l.setAttribute('rel','stylesheet');l.setAttribute('media','all');l.setAttribute('href','http://zythum.sinaapp.com/youkuhtml5playerbookmark/youkuhtml5playerbookmark2.css');document.body.appendChild(l);var s = document.createElement('script');s.setAttribute('src','http://zythum.sinaapp.com/youkuhtml5playerbookmark/youkuhtml5playerbookmark2.js');document.body.appendChild(s);})();