// ==UserScript==
// @name          AutoLogin
// @description   Password Autofill
// @include       http*/admin/
// @include       https://account.bigcommerce.com/admin/login.php
// @exclude       *index.php?ToDo=logOut
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.js
// ==/UserScript==
var name="";
var pass="";
if(document.location == "https://account.bigcommerce.com/admin/login.php" && !document.getElementById('login_failed'))//account.bigcommerce.com
{
	document.getElementsByName('username')[0].value=name;
	document.getElementsByName('password')[0].value=pass;
	document.forms[0].submit();
}
else if(document.images[0].src.match("logo.png$") && !document.getElementsByClassName('LoginError').length)//bigCommerce store login
{
	document.getElementById("password").value = pass;
}
