// ==UserScript==
// @description This script will modify your Facebook chat to include colors! Simply type something of the style [color=red]this will be red[/color], and it will show up red. Note that your friends will need it installed too. This is also available as a Chrome Extension: https://chrome.google.com/webstore/detail/jbbiigphgdkaiggnpjdlplkdbpccomao. Copyright Alex Meiburg 2011
// @include http://www.facebook.com/*
// @include https://www.facebook.com/*
// @name Facebook Chat Colors
// @namespace AlexMeiburgScripts
// @version 1.0
// ==/UserScript==

function f(){
	a=document.getElementsByClassName("fbChatMessage");
	for(i=0;i<a.length;i++){
		b=a[i].innerHTML;
		while(/.*\[color=([a-z]*|#[0-9a-fA-F]{6})\].*\[\/color\].*/.test(b)){
			c=/\[color=([a-z]*|#[0-9a-fA-F]{6})\]/.exec(b)[0];
			d=c.substring(7,c.length-1);
			b=b.replace(c,"<span style='color:"+d+";'>").replace("[/color]","</span>");
			a[i].innerHTML=b;
		}
	}
}
t=setInterval(f,100);
void(0);