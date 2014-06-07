// ==UserScript==
// @name weibo notice
// @namespace ArcherWN
// @description notice
// @version 0.1
// @author Archer
// @match http://weibo.com/*
// @run-at document-start
// ==/UserScript==

var timer = setInterval(function(){
	console.log('test')
	var str = document.querySelector('.layer_message_box ul').innerHTML;
	if (str != '') {
		if (window.webkitNotifications) {
		window.webkitNotifications.createNotification("", "新通知", "有个混蛋/妹子召唤你").show();
		} else {
			console.log('does not support webkitNotifications')
		}
	}
}, 5000);