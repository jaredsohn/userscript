// ==UserScript==
// @name        KillDoubanHome
// @namespace   http://www.han.im
// @include http://www.douban.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     1
// ==/UserScript==

$('.site-nav-items li:first').hide();
var url = window.location.href;
if(url == 'http://www.douban.com/'){
	$('#bd').hide().after('<div style="padding:20px;text-align:center;color:#666"><img src="http://img3.douban.com/pics/spinner.gif" /> 跳转中</div>');
	location.href = 'http://www.douban.com/update/'
}