// ==UserScript==
// @name           ترافيان غير مع أكواد بي بي سي
// @namespace      travian_bbcode
// @include        http://*.travian.*/*
// ==/UserScript==

function parseBBCode(str)
{
   var ret;
   ret=str;
   ret=ret.replace(/\[b\](.*?)\[\/b\]/gi,'<span style="font-weight:bold">$1</span>');
   ret=ret.replace(/\[i\](.*?)\[\/i\]/gi,'<span style="font-style:italic">$1</span>');
   ret=ret.replace(/\[u\](.*?)\[\/u\]/gi,'<span style="text-decoration:underline">$1</span>');
   ret=ret.replace(/\[url\](.*?)\[\/url\]/gi,'<a href="$1" target="_blank">$1</a>');
   ret=ret.replace(/\[url=(.*?)\](.*?)\[\/url\]/gi,'<a href="$1" target="_blank">$2</a>');
   ret=ret.replace(/\[img\](.*?)\[\/img\]/gi,'<img src="$1" />');
   ret=ret.replace(/\[img=(.*?)\]/gi,'<img src="$1" />');
   ret=ret.replace(/\[color=(.*?)\](.*?)\[\/color\]/gi,'<span style="color:$1">$2</span>');
   ret=ret.replace(/\[size=(.*?)\](.*?)\[\/size\]/gi,'<span style="font-size:$1px">$2</span>');
   return ret;
   
}

function removeBBCode(str)
{
   var ret;
   ret=str;
   ret=ret.replace(/<span style="font-weight:bold">(.*?)<\/span>/gi, "[b]$1[/b]");
   ret=ret.replace(/<span style="font-style:italic">(.*?)<\/span>/gi, "[i]$1[/i]");
   ret=ret.replace(/<span style="text-decoration:underline">(.*?)<\/span>/gi, "[i]$1[/i]");
   ret=ret.replace(/<a href="(.*?)" target="_blank">(.*?)<\/a>/gi, "[url=$1]$2[/url]");
   ret=ret.replace(/<img src="(.*?)" \/>/gi, "[img=$1]");
   ret=ret.replace(/<span style="color:(.*?)">(.*?)<\/span>/gi ,"[color=$1]$2[/color]");
   ret=ret.replace(/<span style="font-size:(.*?)px">(.*?)<\/span>/gi ,"[size=$1]$2[/size]");
   //nella linea successiva un ' dopo l'asterisco
   return ret;
   
}

document.body.innerHTML=parseBBCode(document.body.innerHTML);
var allElements, thisElement;
allElements = document.getElementsByTagName('textarea');
for (var i = 0; i < allElements.length; i++) {
    allElements[i].value=removeBBCode(allElements[i].value);
    // do something with thisElement
}
