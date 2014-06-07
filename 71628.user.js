// Autologin to the Facebook using bookmark
// version 0.1 BETA
// 16.01.2010
// Copyright (c) 2010, Cabhage
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// Using:
// Create bookmark: http://www.facebook.com/?AutoLog=yes&Log=YOUR_EMAIL&Pas=YOUR_PASSWORD
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Facebook Bookmark Autologin
// @namespace       
// @description     This script allows you to use bookmark for Autologin to the Facebook. Firefox NOT NEED to be set to remember your password. The core of the code was ripped from Alan Hogan (http://userscripts.org/users/6491)
// @include         http://*.facebook.com/?AutoLog=yes*
// @contributor     Cabhage
// ==/UserScript==


function ParseURL(AName, AUrl){
   AName = AName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regexS = "[\\?&]"+AName+"=([^&#]*)";
   var regex = new RegExp (regexS);
   var results = regex.exec(AUrl);
   if (results == null)
       return "";
   else
       return results[1];
}

function autoLogin(){
   login = ParseURL('Log',window.location);
   pass  = ParseURL('Pas',window.location);
   document.forms[0].elements.namedItem("email").value = login;
   document.forms[0].elements.namedItem("pass").value = pass;
   document.forms[0].submit();
}

window.addEventListener("load", autoLogin, false);
