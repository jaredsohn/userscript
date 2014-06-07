// ==UserScript==
// @name           kf_fw_ig_one
// @namespace      
// @description    KF自动抽道具
// @include        http://bbs.9gal.com/kf_fw_ig_one.php
// @include        http://bbs.9gal.com/kf_fw_ig_my.php
// @include        http://bbs.9baka.com/kf_fw_ig_my.php
// @include        http://bbs.9baka.com/kf_fw_ig_one.php
// @require		http://code.jquery.com/jquery-1.6.2.min.js
// ==/UserScript==

var url = location.href;
var regx = /.*kf_fw_ig_my.php$/g;
if(regx.test(url)) {
	url = url.replace(/kf_fw_ig_my.php$/g,"");
	url += "kf_fw_ig_one.php";

	setTimeout(function() {
		location.replace(url);
	}, 1 * 60 * 1000);
} else {
	var timeStr = $("table tr:eq(3) td:eq(1)").text();
	var str = /距离下次抽奖还需：\d+分钟$/g.exec(timeStr);
	var str = /\d+/g.exec(str);
	var time = new Number(str) + 1;

	setTimeout(function() {
		var num = parseInt(( Math.random() * 100 ) % 9);
		alert(num);
		num = 0;
		
		var but = $("input[name='submit']");
		but[num].click();
	}, time * 60 * 1000);
}
