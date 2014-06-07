// ==UserScript==
// @name           resize_textarea_lol_pm
// @namespace      http://www.userscripts.org/
// @include        http://*lol*.com/sendmessage.php?receiver*
// @include        http://*lol*.com/comment.php?*
// ==/UserScript==
// edit by SpyBitX v1.1
// v1.1 add resize on comment.php

var new_width = '600px';
var textareas = document.getElementsByTagName("textarea");
for (var i = 0; i < textareas.length; i++)
{
   textareas[i].style.width = new_width;
}

if(window.location.href.toLowerCase().match("comment.php?")){
   document.getElementsByName("text").style.width = new_width;
}else if(window.location.href.toLowerCase().match("sendmessage.php?")){
   document.getElementById('msg').style.width = new_width;
}