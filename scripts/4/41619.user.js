// ==UserScript==
// @name           ББкод в травиан
// @namespace      travian_bbcode
// @include        http://*.travian.*/*
// ==/UserScript==
faccine=new Array();
faccine[':P']='tongue';
faccine[':D']="laugh";
faccine['O.o']='blink';
faccine['8)']='cool';
faccine[';(']='cry';
faccine[':))']='biggrin';
faccine[':-D']='biggrin';
faccine[':)']='happy';
faccine[':O']='ohmy';
faccine[':(']='sad';

function replace(string, first, last) {
while (string.indexOf(first) != -1) {
string = string.replace(first, last);
}
return string
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.faccina { width: 15px; height:15px }');

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
   ret=ret.replace(/\[youtube\](.*?)\[\/youtube\]/gi,'<object width="425" height="344"><param name="movie" value="$1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="$1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>');

   for(var code in faccine){
   stringa="<img class=\"faccina\" src=\"http:\/\/matt93\.altervista\.org\/_altervista_ht\/travian\/faccine\/"+faccine[code]+"\.gif\" alt=\"\" \/>";
   ret=replace(ret,code,stringa);
   }
   return ret;

}

function removeBBCode(str)
{
   var ret;
   ret=str;
   ret=ret.replace(/<span style="font-weight:bold">(.*?)<\/span>/gi, "[b]$1[/b]");
   ret=ret.replace(/<span style="font-style:italic">(.*?)<\/span>/gi, "[i]$1[/i]");
   ret=ret.replace(/<span style="text-decoration:underline">(.*?)<\/span>/gi, "[u]$1[/u]");
   ret=ret.replace(/<a href="(.*?)" target="_blank">(.*?)<\/a>/gi, "[url=$1]$2[/url]");
   ret=ret.replace(/<img src="(.*?)" \/>/gi, "[img=$1]");
   ret=ret.replace(/<span style="color:(.*?)">(.*?)<\/span>/gi ,"[color=$1]$2[/color]");
   ret=ret.replace(/<span style="font-size:(.*?)px">(.*?)<\/span>/gi ,"[size=$1]$2[/size]");
   for(var code in faccine){
   stringa="<img class=\"faccina\" src=\"http:\/\/matt93\.altervista\.org\/_altervista_ht\/travian\/faccine\/"+faccine[code]+"\.gif\" alt=\"\" \/>";
   ret=replace(ret,stringa, code);
   }

   return ret;

}

document.body.innerHTML=parseBBCode(document.body.innerHTML);
var allElements, thisElement;
allElements = document.getElementsByTagName('textarea');
for (var i = 0; i < allElements.length; i++) {
    allElements[i].value=removeBBCode(allElements[i].value);

}

