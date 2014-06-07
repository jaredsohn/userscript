// ==UserScript==
// @name        auto
// @namespace   auto captcha jvc
// @include     http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @version     1
// ==/UserScript==


var codeSecret= document.forms["post"].elements["session"].value;
//alert(' test de fonctionnement ');
//alert(codeSecret);
document.forms["post"].elements["code"].value=codeSecret.substring(0,4);;