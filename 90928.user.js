// ==UserScript==
// @name           bilder groß
// @namespace      fght
// @include        http://jarek.pl.gp/Fotos/*
// ==/UserScript==

for(var i=0;i<document.getElementsByTagName("img").length;i++)
{
var link = document.getElementsByTagName("img")[i].src;
document.getElementsByTagName("img")[i].setAttribute("onclick", "javascript:if(this.src=='"+link+"'){this.title='Groß';this.src = '"+link.replace(/1\//, "")+"';}else{this.title='Klein';this.src='"+link+"';}");
}
for(var i=0;i<document.getElementsByTagName("a").length;i++)
{
document.getElementsByTagName("a")[i].setAttribute("onclick", "javascript:return false;");
}