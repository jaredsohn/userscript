// ==UserScript==
// @name           ImageLoadByGoogle
// @namespace      ImageLoadByGoogle
// @description    Load image via google proxy when direct load failed.
// @include        http://c1521.mbsee.com/*
// @include        http://caoliushequ520info.shen.cl/*
// @include        http://66.96.216.169/*
// @include        http://caoliushequ520info.nesfeder.net/*
// @include        http://caoliushequ520info.primavera.hk/*
// @include        http://caoliushequ520info.simplecharity.com/*
// @include        http://caoliushequ520info.subnet.fm/*
// ==/UserScript==

var imgs=document.getElementsByTagName("img");

for(var i=0;i<imgs.length;i++)
{

	if(imgs[i].src!="" && !imgs[i].getAttribute("onerror") && !imgs[i].getAttribute("onload"))
	{
		
		imgs[i].setAttribute("loadComplete","false");
						
		imgs[i].setAttribute("onerror", 
			"this.src='https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url='+encodeURIComponent(this.src)+'&container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*'; this.setAttribute('onerror',''); ");
			
		imgs[i].setAttribute("onload", "this.setAttribute('loadComplete','true')");
			
	}

}

var imageLoader=document.createElement("div");
var btn=document.createElement("input");
btn.setAttribute("type","button");
btn.setAttribute("value","Image Load By Google");
btn.setAttribute("onclick",
	"var imgs=document.getElementsByTagName('img'); "+
	"for(var i=0;i<imgs.length;i++) {"+
		"if(imgs[i].getAttribute('loadComplete')!='true') {"+
			"imgs[i].src='https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url='+encodeURIComponent(this.src)+'&container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*';"+
			"imgs[i].setAttribute('onerror',''); }}" );
imageLoader.appendChild(btn);
imageLoader.setAttribute("style","position:absolute; top:150px; right:10px;");

document.getElementsByTagName("body")[0].appendChild(imageLoader);

