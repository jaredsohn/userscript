// ==UserScript==
// @name           clean
// @namespace      http://org.anderhil/pclean
// @include        http://pornorama.com/
// ==/UserScript==
var els = document.getElementsByTagName('a');
for(var i=0;i<els.length;i++)
{
	var arr = els[i].href.split("=");
	if(arr.length>1){els[i].href=arr[1];}
}