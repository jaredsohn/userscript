// ==UserScript==
// @name           auto_refresh_sina_microblog
// @namespace      auto_refresh_sina_microblog
// @description    出现“有新微博，点击查看”自动刷新，可能会有此需要
// @include        http://t.sina.com.cn/home
// @include 	   http://t.sina.com.cn/*
// ==/UserScript==
// @author		xutaozero21
// @blog		http://blog.csdn.net/xutaozero21
// @date		2010.10.04

setInterval(function(){
	var new_info=document.getElementById('feed_msg_new');
	if("有新微博，点击查看"==new_info.innerHTML && new_info.style.display!="none")
	{
		//alert(document.getElementById('feed_msg_new').innerHTML);
		window.location.reload();
	}},1000);