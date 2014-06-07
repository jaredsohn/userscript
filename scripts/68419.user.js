// ==UserScript==
// @name           Facebook Logout
// @namespace      http://websiteoninternet.com
// @description    Places the logout link next to account
// @include        http://www.facebook.com/*
// ==/UserScript==

function addslashes(str) {
str=str.replace(/\\/g,'\\\\');
str=str.replace(/\'/g,'\\\'');
str=str.replace(/\"/g,'\\"');
str=str.replace(/\0/g,'\\0');
return str;
}
codemod = "hi";
var code = document.getElementById("pageNav").innerHTML;
var codemod = addslashes(code);
codemod = codemod.split("logout.php?h=");
codemod = codemod[1].split("&amp;t=");
// This is for debugging:
//document.getElementById("contentCol").innerHTML="<textarea cols=\"150\" rows=\"50\">"+codemod[0]+"</textarea>";
document.getElementById("pageNav").innerHTML=document.getElementById("pageNav").innerHTML+"<li><a href=\"http://www.facebook.com/logout.php?h="+codemod[0]+"\">Logout</a></li>";

