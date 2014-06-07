// ==UserScript==
// @name        ucasmailautologin
// @namespace   com.test
// @include     https://passport.escience.cn/oauth2/authorize?response_type=code&redirect_uri=http%3A%2F%2Fmail.cstnet.cn%2Fcoremail%2Fcmcu_addon%2Fcoremail_umt_token.jsp&client_id=10000&theme=coremail
// @version     1
// ==/UserScript==

var autoClick = document.getElementById("submitButton");
var account = document.getElementById("userName");
var passwd = document.getElementById("password");
var form=document.getElementById("loginForm");

//here write the username and password
account.value = "yourusername@mails.ucas.ac.cn";
passwd.value = "yourpassword";
form.submit();