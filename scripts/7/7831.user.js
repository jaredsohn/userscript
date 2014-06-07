// ==UserScript==
// @name           YouTube thumbnail animator
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// ==/UserScript==

unsafeWindow.Animate = 

function Animate(i)
{
if(c=unsafeWindow.shu[i]){var b,a=c.src=(c.src.substr(0,b=c.src.lastIndexOf('/')+1)+
((a=c.src.substr(b++,1))==3?1:++a)+c.src.substring(b));
setTimeout("Animate('"+i+"')",1500);}
};

unsafeWindow.shu = new Array();
var e = document.getElementsByTagName('img');
for(var i=0;i<e.length;i++)
	if(!e[i].className.indexOf('vimg'))
		e[i].addEventListener('mouseover',beginAnimate,true);

function beginAnimate(event)
{
if(unsafeWindow.shu.length)
unsafeWindow.shu[unsafeWindow.shu.length-1] = null;
unsafeWindow.shu.push(event.currentTarget);
unsafeWindow.Animate(unsafeWindow.shu.length-1);
}
