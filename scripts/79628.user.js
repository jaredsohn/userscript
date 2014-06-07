// ==UserScript==
// @name           SJTU ElectsysAutoLogin By Anything
// @namespace      http://userscripts.org/users/181391
// @description    Autologin@electsys.sjtu.edu.cn. Based on http://userscripts.org/users/115943, with thx 2 Leevel & Zeqing.
// @include        http://electsys*.sjtu.edu.cn/*
// ==/UserScript==

function letsLogin() {
	document.getElementById("txtUserName").value = 'YourStudentID';
	document.getElementById("txtPwd").value = 'YourPassword';
	document.getElementById("Button1").click();
}

letsLogin();