// ==UserScript==
// @name          eMule links
// @author        kl
// @description   显示emule链接
// @include       http://yyets.com/*
// @include       http://www.1000fr.net/*
// @include       http://www.verycd.com/files/*
// @include       http://www.verycd.com/topics/*
// @include       http://oabt.org/*
// @include       http://www.simplecd.org/*
// @include       http://www.5inet.net/*
// @include       http://www.62cd.com/*
// @include       http://www.ed2000.com/*
// @include       http://www.qvocd.com/*
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.0.3
// @history       0.0.3 2012-03-29
// @history       0.0.2 2011-12-27
// @history       0.0.1 2011-12-10
// ==/UserScript==

var bla;
var bllink="";
var blhtml;
var i;
var bled2k;
bla=document.querySelectorAll('a[href^="ed2k://"]'); 
for (i=0;i<bla.length;i++){
	bled2k='<p style="font-size:9.0pt;line-height:100%;margin:0px;padding:0px;">'+bla[i].getAttribute("href")+"</p>";
	if (bllink.indexOf(bled2k)==-1){
		bllink=bllink+bled2k;
	}
}

bla=document.querySelectorAll('a[ed2k^="ed2k://"]'); 
for (i=0;i<bla.length;i++){
	bled2k='<p style="font-size:9.0pt;line-height:100%;margin:0px;padding:0px;">'+bla[i].getAttribute("ed2k")+"</p>";
	if (bllink.indexOf(bled2k)==-1){
		bllink=bllink+bled2k;
	}
}

bla=document.querySelectorAll('input[name^="ed2k://"]'); 
for (i=0;i<bla.length;i++){
	bled2k='<p style="font-size:9.0pt;line-height:100%;margin:0px;padding:0px;">'+bla[i].getAttribute("name")+"</p>";
	if (bllink.indexOf(bled2k)==-1){
		bllink=bllink+bled2k;
	}
}

if (!bllink==""){
	var blbody = document.getElementsByTagName("body")[0];
	var blelement1=blbody.querySelector('*');
	var bldiv = document.createElement("div");
	blbody.insertBefore(bldiv,blelement1);
	bldiv.innerHTML=bllink;
	bldiv.style.cssText="margin:5px;padding:5px;border:1px solid #8FAAD9;text-align:left;font-family:Tahoma;font-size:9.0pt;line-height:100%;color:#000000;background-color:#BBCEE9;word-break:break-all;word-wrap:break-word;";
}