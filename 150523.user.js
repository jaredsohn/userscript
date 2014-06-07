// ==UserScript==
// @name       360注册
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://i.360.cn/reg/*
// @copyright  2012+, You
// ==/UserScript==




function $(tid){
    return document.getElementById(tid);
}

uname="ddeee@gmail.com";
pass="ddeee@gmail.com";

$("loginEmail").value=uname;
$("password").value=pass;
$("rePassword").value=pass;

$("phrase").focus();
