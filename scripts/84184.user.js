// ==UserScript==
// @name           Matematik Cafe için Üs vs. Düzenleyici
// @include        http://matematikcafe.net/*
// @include        http://www.matematikcafe.net/*
// ==/UserScript==


var e=document.getElementsByClassName("post_body");
for(var i=0;i<e.length;i++)
{

var us = e[i].innerHTML.match(/\^\S*/g);

for(var u=0;u<us.length;u++)
 { e[i].innerHTML = e[i].innerHTML.replace(/\^\S*/, '<sup>'+us[u].replace('^','')+'</sup>'); }

}
