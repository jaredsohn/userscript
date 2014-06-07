// ==UserScript==
// @name           Fazed Lazy User Login
// @namespace      tatrat66.deviantart.com
// @description    Auto-lazily logs you in. Just replace "edit_login" and "edit_pass" 
//with your username and password. 
// @include        http://*fazed.org/login/
// @include        http://*skill.org/login/
// ==/UserScript==
///////////////////////Props to JDH annan for inspiring us all///////////////////////////////////////
//To Do: Fix script where login page doesnt trip out when actual credentials aren't supplied.


////EDIT HERE
username = "Edit_Login";
pass = "Edit_Pass";
//////

function init()
{
var log = document.getElementsByName('username')[0];
if(log != null)
log.value = username;
var passw = document.getElementsByName('password')[0];
if(passw != null)
passw.value = pass;
document.forms[0].submit();

}

init();
