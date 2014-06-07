// ==UserScript==
// @name           纳米盘直接下载
// @namespace      namipan_downloader
// @include        http://www.namipan.com/d/*
// @include        http://d.namipan.com/d/*
// @version        0.3
// ==/UserScript==

var e=document.links;
for (var i=0;i<e.length;i++)
{
	if(e[i].href.indexOf("javascript:AddLink(")==0)
	{
		var href=e[i].href.replace(/^javascript:AddLink\('/,"");
		href=href.replace(/'\);?$/,"");
		href=unescape(href);
		var a=document.createElement("a");
		a.href=href;
		a.innerHTML="直接下载";
		a.style.marginRight="30px";
		e[i].parentNode.insertBefore(a,e[i]);
		i++;
/*
		e[i].href=href;
		e[i].innerHTML="> 直接下载";
*/
	}
}