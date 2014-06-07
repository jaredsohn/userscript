// ==UserScript==
// @name           xiaomi Get
// @namespace      http://t.qq.com/jdomyth
// @description    小米抢购页面加一个链接
// @include        http://*.xiaomi.com/*
// @include        http://*.xiaomi.com/*
// @author         qianggou
// @edit           by nowboy July 14,2010
// @version        3.0
// ==/UserScript==

var $ = unsafeWindow.$;
getxiaomi();
function getxiaomi(){
	$("#headerTop").append('<a href="http://t.hd.xiaomi.com/index.php?_a=20121129_m23&_op=choose">开始抢购1</a><a href="http://t.hd.xiaomi.com/index.php?_a=20121129_m23_m1s9&_op=choose">开始抢购</a>');  
	
}

