// ==UserScript==
// @name           googlePrivacy
// @namespace      download
// @description    Gets rid of almost every google tracking device including tracking cookies without killing your preferences.
// @include        http://*.google.com/search?*
// @include        http://www.google.com/*
// @include        http://www.google.*
// @include        http://images.google.com/*
// @include        http://images.google.*/*
// @include        http://google.com/*
// @include        http://google.*
// @include        http://news.google.*
// ==/UserScript==

function $(a){return document.getElementById(a)}

function replace_google()
{
	unsafeWindow.g=null;
	unsafeWindow.clk=null;
	unsafeWindow.dyn=null;
	unsafeWindow.google={};
	unsafeWindow.google.safeSearchBar={};
	unsafeWindow.google.safeSearchBar.toggle=function(a)
	{
		a.stopPropagation();
		var c=$("ss-box");
		c.style.visibility=(c.style.visibility=="visible"?"none":"visible");
		return false;
	}
	unsafeWindow.gbar={};
	unsafeWindow.gbar.tg=function(a)
	{
		var c=0;
		a.stopPropagation();
		a=a.originalTarget;
		if(a.className!="gb3") a=a.parentNode;
		var b=a;
		var d=b.getAttribute("aria-owns");
		d&&(d=$(d))||(d=$("gbi"));
		if(!d) return false;
		do c+=a.offsetLeft;
		while(a=a.offsetParent);
		if(c+d.offsetWidth>document.width) c-=(d.offsetWidth-b.offsetWidth);
		d.style.left=c+"px";
		d.style.visibility="visible";
		return false;
	}
	document.addEventListener("click",function(e)
	{
		var d=$("ss-box");
		d&&(d.style.visibility="hidden");
		d=$("gbi");
		d&&(d.style.visibility="hidden");
		d=$("gbg");
		d&&(d.style.visibility="hidden");
		return false;
	},false);
	if(document.title.indexOf("Google News")!=-1)
	{
		setTimeout(function(){replaceElement(document.querySelector(".searchField"))},500);
		var t=document.querySelectorAll(".title>a[class^='usg'],.additional-article a,.sources a,.thumbnail a,.thumbnail img");
		document.body.addEventListener("mousedown",function(e)
		{
			for(var i=0;i<t.length;i++)
			{
				if(e.target==t[i])
				{
					e.stopPropagation();
					return false;
				}
			}
		},true);
	}
	else replaceElement(document.querySelector(".lst"));
}
addEventListener("load",replace_google,false);
function replaceElement(a)
{
	if(!a) return;
	var r=a.cloneNode(true);
	a.parentNode.replaceChild(r,a);
}
function makeYoutubeVid(a)
{
	var d=document.createElement("div");
	d.setAttribute("class","video-inner");
	var t=document.createElement("embed");
	t.setAttribute("src","http://www.youtube.com/v/"+a+"&amp;autoplay=1");
	t.setAttribute("type","application/x-shockwave-flash");
	t.setAttribute("class","video-embed-object");
	t.setAttribute("wmode","transparent");
	d.appendChild(t);
	return d;
}


function genHexStr(len)
{
	var str="";
	for(i=0;i<len;i++) str+=Math.floor(Math.random()*16).toString(16);
	return str;
}
unsafeWindow.document.cookie="SS="+genHexStr(16)+"; path=/search";

try{var p=$('tads');p.parentNode.removeChild(p)}catch(e){};
try{var e=document.querySelector("table[class='ra']");e.parentNode.removeChild(e);}catch(e){}
try
{
	var e=document.evaluate("//a[starts-with(@href,'/url?q=')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(i=0;i<e.snapshotLength;i++)
	{
		var ce=e.snapshotItem(i);
		var url=ce.getAttribute("href");
		ce.setAttribute("href",decodeURI(url.substr(7,url.indexOf("&")-7)));
	}
}catch(e){}
try
{
	var e=document.evaluate("//a[starts-with(@onmousedown,'return') or starts-with(@onmouseup,'return') or starts-with(@onclick,'return')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for(i=0;i<e.snapshotLength;i++)
	{
		var ce=e.snapshotItem(i);
		ce.removeAttribute("onclick");
		ce.removeAttribute("onmouseup");
		ce.removeAttribute("onmousedown");
	}
}catch(e){}
try{document.querySelector("input[name='q']").focus();}catch(e){}

function fadeInit()
{
	var n=-1,tt=400,t=0;
	if(n!=-1) return;
	removeEventListener("mousemove",fadeInit,false);
	n=setInterval(function()
	{
		t+=10;
		var o=t/tt;
		if(o>1) o=1;
		$("ghead").style.setProperty("opacity",o,null);
		$("fctr").style.setProperty("opacity",o,null);
		if(o>=1) clearInterval(n);
	},10);
}
if($("ghead")) addEventListener("mousemove",fadeInit,false);