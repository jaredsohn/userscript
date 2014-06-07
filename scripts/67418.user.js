// ==UserScript==
// @name           Alkon link fixer
// @description    Arregla los links del ultimo post en alkon
// @include        http://alkon.com.ar/foro/*
// @include        http://www.alkon.com.ar/foro/*
// @copyright      Xyos
// @version        1.3
// ==/UserScript==
(function(){
var anchors = document.getElementsByTagName("a");
var reg = new RegExp("\\\x2D+post+[0-9]{8}");
var reg2 = RegExp("\\\x2D+new+\x2D+post");
for (var i = 0; i < anchors.length ; i++)
{
   if(reg.test(anchors[i].href)){
   anchors[i].href = anchors[i].href.replace(reg , "");
}
   if(reg2.test(anchors[i].href)){
   anchors[i].href = anchors[i].href.replace(reg2 , "");
}
}
})
();