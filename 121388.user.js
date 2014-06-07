// ==UserScript==
// @name          HaiLan Password Maker
// @namespace     http://itbrother.com
// @description   海蓝密码生成器，将简单的密码生成复杂的10位密码，保证每个网站都是不同的密码
// @include       *
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// @require       http://itbrother.com/js/min_sha1.js
// @require       http://itbrother.com/js/min_base64.js
// ==/UserScript==

var isShow = false;
var _info = '\u6d77\u84dd\u5bc6\u7801\u751f\u6210\u5668';//海蓝密码生成器
var _dqwz = '\u5f53\u524d\u7f51\u5740\uff1a';//当前网址：
var _grmm = '\u4e2a\u4eba\u5bc6\u7801\uff1a';//个人密码：
var _scmm = '\u751f\u6210\u5bc6\u7801\uff1a';//生成密码：
//var _sysm = '123';
var _sysm = '\u4f7f\u7528\u8bf4\u660e\u6d77\u84dd\u5bc6\u7801\u751f\u6210\u5668\uff0c\u5c06\u7b80\u5355\u7684\u5bc6\u7801\u751f\u6210\u590d\u6742\u768410\u4f4d\u5bc6\u7801';
_sysm += '\u5728\u4e2a\u4eba\u5bc6\u7801\u6846\u4e2d\u8f93\u5165\u81ea\u5df1\u7684\u597d\u8bb0\u7684\u5bc6\u7801\uff0c\u7136\u540e\u518d\u751f\u6210\u5bc6\u7801\u6846\u4f1a\u53ca\u65f6\u663e\u793a';//在个人密码框中输入自己的好记的密码，然后再生成密码框会及时显示
_sysm += '<br/>\u5f53\u524d\u7f51\u5740\u548c\u4e2a\u4eba\u5bc6\u7801\u4e00\u8d77\u52a0\u5bc6\u7b97\u51fa\u590d\u6742\u5bc6\u7801\uff0c\u8fd9\u6837\u6bcf\u4e2a\u7f51\u5740\u751f\u6210\u7684\u5bc6\u7801\u90fd\u662f\u4e0d\u540c\u7684';//将 当前网址和个人密码一起加密算出复杂密码，这样每个网址生成的密码都是不同的
_sysm += '<br/>Alt+1:'+'\u663e\u793a\u8bbe\u7f6e\u9875\u9762';//显示设置页面
_sysm += '<br/>Alt+2:'+'\u9690\u85cf\u8bbe\u7f6e\u9875\u9762';//隐藏设置页面
_sysm += '<br/>Alt+3:'+'\u5728\u9875\u9762\u5bc6\u7801\u6846\u4e2d\u586b\u5165\u5bc6\u7801';//在页面密码框中填入密码

//使用说明：海蓝密码生成器，将简单的密码生成复杂的10位密码
//保证每个网站都是不同的密码，在需要输入密码的页面，按Ctrl+Alt+1，出现设置页面，按Ctrl+Alt+2，可隐藏设置页面
//当前网址显示该页面的地址，在个人密码的位置输入自己好记的密码，可以输入汉字，
//同时在生成密码的位置会即时显示生成的10位复杂密码。这时在网页里你需要输入密码的位置，
//按Ctrl+Alt+3，即可自动填写改复杂密码。

function getPwd(){
		var host = $("#selfUrl").val();
		var salt = $("#saltPwd").val();
		var sha_salt = hex_sha1(salt);
		var sha_pass = hex_sha1(host+sha_salt);
		sha_pass = Base64.encode(sha_pass);
		$("#pwd").val(sha_pass.substring(0,10));
}

function showWorkSpace(){
	var logo = document.createElement("div");
	logo.innerHTML = '<div id="workSpace" style="margin: 0 auto 0 auto; ' +
	'border-bottom: 1px solid #7EC0EE; margin-bottom: 5px; ' +
	'font-size: small; background-color: #7EC0EE; ' +
	'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' + 
	'<table><tr><td>' +
	_info + 
	'<br/>' + _dqwz + '<input type="text" id="selfUrl" value=""/>' +
	'<br/>' + _grmm + '<input type="text" id="saltPwd" value=""/>' +
	'<br/>' + _scmm + '<input type="text" id="pwd" value=""/>' +
	'</td>'	+
	'<td>' +
	_sysm +
	'</td></tr></table>' +
	'</p></div>';
	document.body.insertBefore(logo, document.body.firstChild);
	initSth();
	isShow = true;
}

function initSth(){
	var url = document.location.href;
	var start = url.indexOf("/")+2;
	var end = url.indexOf("/",8);
	var host = url.substring(start,end);
	host = host.toLowerCase().match(/[^\.]+\.[^\.]+$|[^\.]+\.(?:com|org|net)\.(?:cn|hk|jp)$/i);
	$("#selfUrl").val(host);
	$('#pwd').attr("readonly","readonly");
	$("#saltPwd").bind("keyup",getPwd);
	$("#selfUrl").bind("keyup",getPwd); 
}
	

function hideWorkSpace(){
	$("#workSpace").hide();
	isShow = false;
}

$(document).keydown(function(event){
	if(event.altKey&&event.keyCode == 49){
		if(!isShow)	showWorkSpace();
    }
	if(event.altKey&&event.keyCode == 50){
		hideWorkSpace();
    }
	if(event.altKey&&event.keyCode == 51){
		document.activeElement.value=$("#pwd").val();
    }	
});




