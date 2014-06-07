// ==UserScript==
// @name        login
// @namespace   gd.lsxy
// @description autologin
// @include     http://10.50.20.254/login*
// @version     1
// @grant 	none
// to auto login in login.lsu.edu.cn
// ==/UserScript==

document.login.username.value="lsxyacm";
document.login.password.value="jsjacm";
//document.sendin.dst.value="http://www.baidu.com";
document.getElementById("ImageButton1").click();