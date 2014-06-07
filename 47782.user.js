// ==UserScript==
// @name  kihuzo
// @description csunya szavak ellen
// @include http://index.hu/*
// @include http://index.hu/*
// @exclude
// ==/UserScript==


//var x=document.getElementById("content");
//var sz = document.getElementById("content").innerHTML; \
//document.getElementById("content").innerHTML = sz; \

// ha nem csak index.hu
//var x = document.getElementsByTagName('body')[0];
//var sz = document.getElementsByTagName("body")[0].innerHTML; \
//document.getElementsByTagName("body")[0].innerHTML  = sz; \


var x=document.getElementById("content");
var s = document.createElement('script');
s.type = "text/javascript";
s.src = "http://web-hang.hu/orsi/file/javascript_getActiveWords.php";
x.appendChild(s);

var s2 = document.createElement('script');
s2.type = "text/javascript";

var ih = ' \
var sz = document.getElementById("content").innerHTML; \
 \
function csillag(szo) { \
	var cs=""; \
	for(var i=0;i<szo.length;i++) cs+="*"; \
	return cs; \
} \
 \
var t,OFP,poz,s1,s2,a1,a2,csere; \
 \
for(var i in teljes) { \
	t=teljes[i]; \
	OFP=0; \
	while(sz.indexOf(t)!=-1 && OFP<99) { \
		poz=sz.indexOf(t); \
		s1=sz.substr(0,poz); \
		s2=sz.substr(poz+t.length); \
 \
		a1 = s1.charCodeAt(s1.length-1); \
		a2 = s2.charCodeAt(0); \
		csere = ( \
			a1>64 && a1<91 || a1>96 && a1<123 || \
			a2>64 && a2<91 || a2>96 && a2<123 \
		) ? "^" : csillag(t); \
 \
		sz = s1 + csere + s2; \
 \
		OFP++; \
	} \
 \
	while(sz.indexOf("^")!=-1) { \
		sz = sz.replace("^",t); \
	} \
} \
 \
for(i in szokozi) { \
	while(sz.indexOf(szokozi[i])!=-1) { \
		sz = sz.replace(szokozi[i],csillag(szokozi[i])); \
	} \
} \
document.getElementById("content").innerHTML = sz; \
';

s2.innerHTML = ih;
x.appendChild(s2);