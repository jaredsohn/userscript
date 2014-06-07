// ==UserScript==
// @name          Refresh Pages
// @author        kl
// @description   解决联通嵌入广告的问题
// @include       *//*.*/*
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.0.1
// @history       0.0.1 2012-05-27
// ==/UserScript==

var bllink=location.href;
var blhost=location.host;

var blscript=document.querySelector('script');
if (blscript){
	var blcontent=blscript.innerHTML;
	if (blcontent.indexOf(";document.write(i(d,c));")>=0 && blcontent.indexOf('var d="=iunm?=ifbe')>=0 && blcontent.indexOf(";for(var u=0;u<_.length;u++){var r=")>=0){
		window.location.reload();
		return;
	}
}

var blelement=document.querySelector('iframe#fulliframe');
if (blelement){
	window.location.reload();
	return;
}