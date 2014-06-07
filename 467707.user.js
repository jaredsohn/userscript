// ==UserScript==
// @name            twitpic直接大图
// @namespace       http://weibo.com/myimagination
// @author          @MyImagination
// @version			0.5
// @description     twitpic默认小图不给力
// @include         http://twitpic.com/photos/*
// @run-at          document-end
// ==/UserScript==

(function(){
	$(".user-photo.left").find("a").each(function(){
	$(this).attr('href',$(this).attr('href')+'/full');})      
})();