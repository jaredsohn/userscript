// ==UserScript==
// @name            NICO简单"翻墙"(nicozon版)
// @namespace       http://weibo.com/myimagination
// @author          @MyImagination
// @version			0.5
// @description     点击搜索页面的图片链接即可新开一个页面免翻墙浏览
// @include         http://*.nicovideo.jp/tag/*
// @include         http://*.nicovideo.jp/search/*
// @run-at          document-end
// @require         http://lib.sinaapp.com/js/jquery/1.9.0/jquery.min.js
// ==/UserScript==

(function(){
	$(".itemThumbWrap").each(function(){
	$(this).attr('href','http://www.nicozon.net/watch/'+$(this).closest('li').attr('data-id'));
})      
})();