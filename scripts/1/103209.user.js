// ==UserScript==
// @name                Auto Login
// @description 		Auto Login + Remove Right Click Error
// @namespace   IRCTC
// @include             http://*irctc.co.in/*
// @include             https://*irctc.co.in/*
// @version     2.0
// @author              Hardik Shah
// ==/UserScript==


///////////////// Auto Login on Form Load Goto AutoLogin (line no 16)
window.onload=AutoLogin();

// Auto Login Function is Called upon Form Load 
function AutoLogin()
{
// Checking For Right URL
if(location.href == "https://www.irctc.co.in/")
{

var formsArray = document.getElementsByTagName('form');

formsArray[0][0].value='home';
 //////Enter username by Replacing the Word username with your own username Eg. formsArray[0][1].value='hardikshah';  ////////////
formsArray[0][1].value='username';
 /////Enter password by Replacing the Word password with your own password Eg. formsArray[0][2].value='userscripts';  ////////////
formsArray[0][2].value='password';
var x=document.getElementById("button");
x.click();
 }
 else
 {
 // If URL is Not "https://www.irctc.co.in/" then Goto  Checkurl (line no 39)
 Checkurl();
 }
 }
 
function Checkurl()
{
// if u logout then goto "https://www.irctc.co.in/" and AutoLogin
if (document.location.href.match('logout.do'))
{
location.href = "https://www.irctc.co.in/";
AutoLogin();
}
if (document.location.href.match('home.do'))
{
location.href = "https://www.irctc.co.in/";
AutoLogin();
}

if(document.location.href.match('repassword.do'))
{
location.href = "https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/services/home.do";
//"https://www.irctc.co.in/";
AutoLogin();
}
}

///////////////// Remove Right Click Error message : "Sorry you donot have the permission to Right Click"
with (document.wrappedJSObject || document)
{
        onmouseup = null;
        onmousedown = null;
        oncontextmenu = null;
}