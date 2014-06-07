// ==UserScript==

// @name           Flash Sourcer 1.0

// @namespace      http://www.moishy.com

// @description    Press F12 to get embeded flash files

// @include        *

// ==/UserScript==

var ems = document.getElementsByTagName('embed');
var all = '<blockquote><b>'+location.href+"</b><p>";
for (i=0;i<ems.length;i++)
{all=all+'<b>'+ems[i].src+'</b><br>'+ems[i].width+'<br>'+ems[i].height+'<p>';}

window.addEventListener("keydown",function(e){if(e.keyCode==123){

document.getElementsByTagName('html')[0].innerHTML=all;

}},false);