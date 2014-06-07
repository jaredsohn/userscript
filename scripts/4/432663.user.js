// ==UserScript==
// @name       山东大学课程中心登陆脚本
// @namespace  http://course.sdu.edu.cn/G2S/ShowSystem/Index.aspx
// @version    0.1
// @description  A tool for SDU students to log on the course center.
// @match      http://course.sdu.edu.cn/G2S/ShowSystem/Index.aspx
// @require		http://libs.baidu.com/jquery/2.0.3/jquery.min.js
// @copyright  2014+, Find
// ==/UserScript==



var username = "username";
var userkey = "userkey";
var storage = window.localStorage;

function firstcheck() {
	var trHTML = '<input type="button" class="select1" value="单击我清除缓存">'
	$(".main-menu").append(trHTML);
	$(".select1").click(function(event) {
		storage.removeItem(username);
		storage.removeItem(userkey);
		logout();
	});
	if (storage.getItem(username) == null) {
		var logname = prompt("第一次登陆请先输入用户名");
		storage.setItem(username, logname);
		var logkey = prompt("请输入密码");
		storage.setItem(userkey, logkey);
		uname = logname;
		ukey = logkey;
		log();
	} else {
		uname = storage.getItem(username);
		ukey = storage.getItem(userkey);
		log();
	}
}
function log() {
	document.getElementById("LoginName").value = uname;
	document.getElementById("Password").value = ukey;
	login();
}
// window.onload=test();
window.onload = firstcheck();