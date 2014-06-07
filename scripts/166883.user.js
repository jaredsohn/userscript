// ==UserScript==
// @name        微博分享音乐
// @namespace   weibo.ui.btn.music
// @description 在发布框下面增加一个分享音乐的按钮
// @include     http://weibo.com/*
// @match	http://weibo.com/*
// @version     1
// ==/UserScript==
function add_music_btn(){
	var list = document.getElementsByClassName("W_ico16 icon_sw_music");
	if(list && list.length > 0) return;
	var d=document.createElement("a");
	d.setAttribute("title", "音乐");
	d.setAttribute("action-data", "type=500&amp;action=1&amp;log=video&amp;cate=1");
	d.setAttribute("action-type", "music");
	d.setAttribute("class", "W_ico16 icon_sw_music");
	d.setAttribute("href", "javascript:void(0);");
	d.setAttribute("tabindex", "3");
	var container = document.getElementsByClassName("kind_detail");
	if(container && container.length == 1)	container[0].appendChild(d);
}; add_music_btn();
