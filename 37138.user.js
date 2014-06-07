// ==UserScript==
// @name          autologin_126_webmail
// @description   auto login mail.126.com mail
// @namespace     http://blog.sina.com.cn/nmgxiaozhao
// @include       http://news.sina.com.cn/*
// by laoniu 
// Email:nmgxiaozhao@126.com
// ==/UserScript==


var login="你的用户名";
var password="你的密码";

var t=document.getElementsByTagName("INPUT");

t.item(3).value=login;
t.item(4).value=password;
setTimeout(function(){
document.forms[0].submit();
},3000);
