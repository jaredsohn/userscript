// ==UserScript==
// @name       新浪微博注册助手
// @namespace  http://www.find1x.com/
// @version    0.1
// @description  enter something useful
// @match      http://weibo.com/signup/signup.php
// @copyright  2012+, You
// ==/UserScript==

////首先需要在js控制台输入
//		window.localStorage.n=你希望开始尝试的账户数字
window.onload=function()
{
   	var n = window.localStorage.n;
  	var username = document.getElementsByName('username');
    username[0].value='sina'+n+'@sohu.com';
	var passwd = document.getElementsByName('passwd');
	passwd[0].value = 'xuanxuan';
	var nickname = document.getElementsByName('nickname');
	nickname[0].value = 'ericxuan'+n;
	document.getElementsByTagName('select')[0].options[24].selected = true;  
    document.getElementsByTagName('select')[1].options[1].selected = true;  
    document.getElementsByTagName('select')[2].options[3].selected = true;  
    document.getElementsByTagName('select')[3].options[0].selected = true;  
    document.getElementsByTagName('select')[4].options[0].selected = true;  
    document.getElementsByTagName('input')[4].checked=true;
    window.localStorage.n++;
}
