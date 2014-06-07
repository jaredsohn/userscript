// ==UserScript==
// @name           UIR Assistant
// @namespace      http://userscripts.org/scripts/show/165655
// @version        beta 0.1
// @description    1)Autologin 2)Fix duirlb1 Menu Error
// @match        http://*.uir.cn/*
// ==/UserScript==

//////////////////////////////////////////////////////////////
//////////////////// 使 用 说 明 /////////////////////////////
//////////////////////////////////////////////////////////////
//
// 请修改以下信息

LoginUserName = "username";  //设置初始用户名
LoginUserPassWord = "password";   //设置初始用户密码

//
//
//
//
//
//
//
//提示安装错误
if (typeof (WScript) != 'undefined') {
	var obj = WScript.CreateObject("WScript.Shell");
	obj.Popup("请将脚本文件拖放至Chrome的扩展管理页面或Firefox中安装，请勿双击。\r\n拖放到谷歌浏览器中无法安装时，请尝试在chrome中打开扩展管理界面后，再拖放至扩展管理界面中。", 0, "警告", 64);
	throw new Error();
}

////////////////// 插件信息 
var version = "beta 1.0.0";
var Author = "PanFake";
var WebSite = "http://userscripts.org/scripts/show/165655";

////////////////// 以下信息请勿更改

var path = window.location.pathname;

var url = window.location.href;

var pattern;

//判断是否是登录页面 是的话自动登录
if (url == 'http://duirlb1.uir.cn/' || url == 'http://duirlb1.uir.cn/index.jsp') {
	uirLogin();
}

//判断是否是菜单网址 是的话修复菜单
if (url == 'http://duirlb1.uir.cn/icons/login/mainmenu.jsp') {
	FixMenu();
}

//进入选课页面启动选课助手
//pattern="roamLoginAction.do";
//if (url.search(pattern)!=-1) {
//}

//自动登录
function uirLogin() {

	//输入用户名
	var js_userName=document.getElementsByName("userName");
	js_userName[0].value = LoginUserName;

	//输入密码
	var js_userPass=document.getElementsByName("userPass");
	js_userPass[0].value = LoginUserPassWord;

	//点击提交
	var js_userSubmit=document.getElementsByName("Submit");
	js_userSubmit[0].click();
}

//修复菜单
function FixMenu() {

	//给QQGroupTable中的qqtd重新赋予onclick值
	var qqtd=document.getElementById("QQGroupTable").getElementsByClassName('qqtd');
	//alert(qqtd.length); //Menu中qqtd的td的数量
	for(var i=0;i<qqtd.length;i++)
	{
		//qqtd[i].id="qqtd"+i;
		//eval("qqtd[i].onclick = function() { alert("+i+"); }"); 
		eval("qqtd[i].onclick = function() { ShowFLT("+i+"); }"); 
	}

	//给QQGroupTable中的iFrame重新赋予id值
	var qqtdifr=document.getElementById("QQGroupTable").getElementsByTagName("iframe");
	//alert(qqtdifr.length); //Menu中iFrame的数量
	for(var i=0;i<qqtdifr.length;i++)
	{
		qqtdifr[i].id="table"+i;
	}

	function LMYC() {
		var lbmc;
		for (i=0;i<qqtdifr.length;i++) {
			lbmc = eval('table' + i);
			lbmc.height = '0';
		}
	}
	 
	function ShowFLT(i) {
		lbmc = eval('table' + i);
		if (lbmc.height == '0') {
			LMYC();
			lbmc.height = 'auto';
		}
		else {
			lbmc.height = '0';
		}
	}
}
