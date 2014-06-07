// ==UserScript==
// @name       自动注册163邮箱
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://reg.email.163.com/unireg/*
// @include      http://reg.email.163.com/unireg/*
// @copyright  2012+, You
// ==/UserScript==

function $(id){
    return document.getElementById(id);
}


var now = new Date().getTime();
var pass = now+"a";
var name = "sd"+(now%100000)+"b";


$("nameIpt").focus();
$("nameIpt").value=name;

$("mainPwdIpt").focus();
$("mainPwdIpt").value=pass;

$("mainCfmPwdIpt").focus();
$("mainCfmPwdIpt").value=pass;

$("vcodeIpt").focus();
$("vcodeIpt").value="";
 
 
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.baidu.com",
		onload: function(response) {
			if(response.responseText.indexOf("登录")!=-1) {
				//if(confirm("尚未登录，是否登录？")) {
				//	window.location.href = "https://login.taobao.com/member/login.jhtml?f=top&redirectURL=" + window.location.href;
				//}
                $("vcodeIpt").value="百度未登陆"
			}
            else
            {
                            $("vcodeIpt").value="百度已经登陆"
            }
		}
	});