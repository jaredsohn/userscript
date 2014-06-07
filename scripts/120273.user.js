// ==UserScript==
// @name           resize_pm
// @namespace      http://www.userscripts.org/
// @include        *lolthai.com/sendmessage.php?receiver*
// ==/UserScript==
// edit by SpyBitX v1.0

var new_width = '650px';
var textareas = document.getElementsByTagName("textarea");
for (var i = 0; i < textareas.length; i++)
{
   textareas[i].style.width = new_width;
}
document.getElementById('msg').style.width = new_width;