// ==UserScript==
// @name           SunGard Automatic Login
// @namespace      http://userscripts.org/users/dstjacques
// @description    Automatic login for the SunGard Higher Education portal
// @include        *
// ==/UserScript==

var username = "";
var password = "";

var userField = document.getElementsByName("user")[1];
userField.value = username;
var passField = document.getElementsByName("pass")[0];
passField.value = password;

if(userField !== "" && passField.value !== "")
{
   document.forms[1].submit();
}
else
{
   alert("Your login information is missing or SunGard has changed and the script needs to be updated.");
}