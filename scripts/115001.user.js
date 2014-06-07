// ==UserScript==
// @name           fb_likebox_blocker
// @version        0.1
// @include        http://*
// @include        *facebook.com/connect/uiserver.php*
// @description    Blocks facebook likebox plugin (iframe)
// @author	   Marcin M, marcinmal@gmail.com
// ==/UserScript==

var list = document.getElementsByTagName("iframe");
for(var i=0;i<list.length;i++)
	if(list[i].src.substr(0,44) == "http://www.facebook.com/plugins/likebox.php?")
		list[i].parentNode.removeChild(list[i]);

if(list.length > 0)
{
	list = document.getElementsByTagName("fb:like-box");
	for(var i=0;i<list.length;i++)
		list[i].parentNode.removeChild(list[i]);
}