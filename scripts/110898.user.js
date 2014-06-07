// ==UserScript==
// @name           WebCT Automatic Login
// @namespace      http://userscripts.org/users/dstjacques
// @description    Automatic login for the WebCT portal
// @include        *
// ==/UserScript==

var username = "";
var password = "";

var userField = document.getElementById("webctid");
userField.value = username;
var passField = document.getElementById("password");
passField.value = password;

if (window.addEventListener)
{
   window.addEventListener('load', function() { login(); }, false);
} 
else if (window.attachEvent)
{
   window.attachEvent('onload', login);
}

function login()
{
   if(userField !== "" && passField.value !== "")
   {
      document.forms[0].submit();
   }
   else
   {
      alert("Your login information is missing or WebCT has changed and the script needs to be updated.");
   }
}