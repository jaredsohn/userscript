// ==UserScript==
// @name 清水河畔——解决浏览器保存密码的问题
// @description 解决浏览器保存密码之后再次登录时密码错误的问题。
// @match http://uc.stuhome.net/connect.php*
// @match http://uc.stuhome.net/index.php
// @match http://uc.stuhome.net/
// @run-at document-end
// ==/UserScript==

document.getElementById("password").oninput = (function()
{
	document.getElementById("password").tag_UserInput = true;
});

var login = document.getElementsByClassName(
	location.pathname == "/connect.php" ? "button" : "button2")[0];;
var old_onclick = login.onclick;
login.onclick = (function()
{
	if(document.getElementById("password").tag_UserInput)
		old_onclick();
	else
		document.getElementById("myForm1").submit();
});
