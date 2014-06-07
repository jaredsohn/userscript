// ==UserScript==
// @name           Special Sign fix
// @namespace      http://www.somethingselse.com
// @include        *.org:88/forums.php?action=viewtopic*
// @include        *.org:88/markets.php?action=viewtopic*

// ==/UserScript==
var body=document.getElementsByTagName('body')[0];
var newbody = body.innerHTML.replace(/&amp;#8220;/g, "\"");
newbody = newbody.replace(/&amp;#8221;/g, "\"");
body.innerHTML=newbody;