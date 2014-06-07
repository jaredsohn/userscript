// ==UserScript==
// @name           electsys auto login
// @namespace      http://userscripts.org/users/95297
// @description    auto fill the verify code @electsys.sjtu.edu.cn
// @include        http://electsys*.sjtu.edu.cn/electsysJd/
// ==/UserScript==

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function letsLogin() {
	document.getElementById("txtUserName").value = 'USERNAME';
	document.getElementById("txtPwd").value = 'PASSWORD';
	var vc = readCookie('VerifyCode');
	document.getElementById("txtyzm").value = vc;
	document.getElementById("btnOK").click();
}

letsLogin();
