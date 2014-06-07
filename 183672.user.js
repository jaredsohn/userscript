// ==UserScript==
// @name           SjtuAutoLogin.user.js
// @description    自动登入交大网站(可自己添加),请将xx改成你的学号,密码
// @include        http://electsys.sjtu.edu.cn/edu/
// @include 	   http://ks.sjtu.edu.cn/
// ==/UserScript==
var YourID = 'xxxxxxxx';
var YourPassword = 'xxxxxxxx';
var Name,Pwd,Btn;
//可以自行添加网站,同时添加//@include Yoururl
if(window.location.href == "http://ks.sjtu.edu.cn/"){		//判断完整url
	Name = 'txtUserCode';									//用户名框id
	Pwd = 'txtPassword';									//密码框id
	Btn = 'btnOK';}											//登入按钮id
if(window.location.href == "http://electsys.sjtu.edu.cn/edu/"){
	Name = 'txtUserName';
	Pwd = 'txtPwd';
	Btn = 'Button1';}
//下面不需要修改
function Login() {
	document.getElementById(Name).value = YourID;
	document.getElementById(Pwd).value = YourPassword;
	document.getElementById(Btn).click();
}
Login();