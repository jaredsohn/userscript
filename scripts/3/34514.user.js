// ==UserScript==
// @name            SlaveHack AutoLogin
// @namespace      http://console.x10hosting.com/
// @description    Logs you in.
// @include        http://www.slavehack.com/
// ==/UserScript==
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
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
function login(un,ps) {
document.getElementsByName('login')[0].value = un;
document.getElementsByName('loginpas')[0].value = ps;
document.forms[0].submit();
}
var user = readCookie("user");
var pass = readCookie("pass");
if(user) {
login(user,pass);
} 
else {
var info = prompt("Enter your username and password seperated by a '-'.");
var username = info.split("-")[0];
var password = info.split("-")[1];
createCookie("user",username,"1");
createCookie("pass",password,"1");
}