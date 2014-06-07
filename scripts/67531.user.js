// ==UserScript==
// @name           fumpr
// @namespace      n
// @include        http://www.fumpr.com/*
// ==/UserScript==

var a=document.getElementsByTagName("body")[0];
var b=a.children;
for(var i=0;i<b.length;i++){
	if(b[i].nodeName=="CENTER"){
		a.removeChild(b[i]);
		i--;
	}
}
var a=document.getElementById("subiste-viendo").innerHTML;
if(/You just uploaded/.test(a)){
	var url=document.getElementById("imagen").getElementsByTagName("img")[0].src;
	var a=document.getElementById("mostrar_mas_enlaceview");
	var b=a.getElementsByTagName("div")[0];
	var c=b.cloneNode(1);
	c.getElementsByTagName("div")[0].innerHTML="True URL:";
	c.getElementsByTagName("div")[1].innerHTML="<input tabindex=\"1\" value="+url+" onclick=\"this.focus();this.select();\">";
	a.insertBefore(c,b);
}
