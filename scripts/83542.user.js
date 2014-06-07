// ==UserScript==
// @name           Comentarios en skynetx
// @namespace      Comentarios en skynetx
// @description    Comentarios en skynetx
// @include        *skynetx.cz.cc/posts/*
// ==/UserScript==

cmntsphp = "http://cmntstaringa.freei.me/";

body = document.getElementsByTagName("BODY")[0].innerHTML;
l1='<div id="div_cmnt_';
l2='"';

cmnts1 = body.split(l1);
getdata = "?cmnts=";

for (i=1; i < cmnts1.length; i++){
cmnt = cmnts1[i].split(l2);
getdata = getdata+cmnt[0]+":";
}

var s = document.createElement('script');
s.type = "text/javascript";
s.src = cmntsphp+getdata;
document.getElementsByTagName('head')[0].appendChild(s);
