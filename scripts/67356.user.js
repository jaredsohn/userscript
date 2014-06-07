// ==UserScript==
// @name           img98
// @namespace      n
// @include        http://www.img98.com/*
// ==/UserScript==

var a=document.getElementsByTagName("body")[0].children;
var b=document.getElementsByTagName("body")[0];
for(i=0;i<a.length;i++)
	//alert(a[i].className);
	if(a[i].className=="nav_menu"||a[i].className=="members_bar"||a[i].className=="page_body")
		continue;
	else if(a[i].className=="page_footer"){
		var c=a[i].children;
		for(var j=0;j<c.length;j++)
			if(c[j].nodeName=="DIV"){
				a[i].removeChild(c[j]);
				break;
			}
	}
	else
		b.removeChild(a[i--]);
		
var a=document.getElementById("page_body");
var b=a.children;
for(i=0;i<b.length;i++)
	if(b[i].nodeName=="DIV"){
		a.removeChild(b[i]);
		break;
	}