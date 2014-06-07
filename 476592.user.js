// ==UserScript==
// @name        PASSPORTLOGIN
// @namespace   passport
// @include     https://*passportindia.gov.in/*
// @include     http://*passportindia.gov.in/*
// @version     1
// ==/UserScript==
if(document.getElementById("menurite_login_key"))
{document.getElementById('menurite_login_key').click(loginSubmit());} 
else
{if(document.loginform.userName.value=="USERNAME")
{document.loginform["userName"].value = "PASSWORD"
document.loginform.submit();}
else 
{
if(document.getElementById("captcha"))
{document.loginform["password"].value = "";
document.loginform.test.focus();
}}}