// ==UserScript==
// @name           cos of stuff sign up 
// @namespace      paul
// @include        http://www.cosofstuff.com/*
// ==/UserScript==
function makeid() { var text = "";var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for( var i=0; i < 8; i++ ) text += possible.charAt(Math.floor(Math.random() * possible.length)); return text; } var bday = Math.floor((d27-d2)*Math.random()) + 1;var bmon = Math.floor((m11-m1)*Math.random()) + 1;
var $ = unsafeWindow.jQuery;
if(window.location.href == "http://www.cosofstuff.com/prelunch/register.php?referer=paul-chester@hotmail.co.uk") {
	$("#nick").val(makeid());$("#name").val(makeid());$("#sname").val(makeid());$("#email").val(makeid() +"@gmail.com");$("#emai2l").val(makeid() +"@gmail.com");$("#pass").val("password");$("#pass2").val("password");$("#male").val("male");$("#bmonth").val(boon);$("#bday").val(bday);$("#byear").val("y1990");$("#country").val("cPL");$("#city").val(makeid());$("#post-code").val("wsdefghj");$("#adress").val("sdfgh");$("#timearea").val("t3600");
	window.location = "javascript: $('#').click();void(0);"
}
if(window.location.href == "http://www.cosofstuff.com/logged") {
	window.location.href = "http://www.cosofstuff.com/logout";
}
if(window.location.href == "http://www.cosofstuff.com/") {
	window.location.href = "http://www.cosofstuff.com/prelunch/register.php?referer=paul-chester@hotmail.co.uk"
}