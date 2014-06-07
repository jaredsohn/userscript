// ==UserScript==
// @name           IHA VIP
// @description    Enhances your IHA experience!
// @version        1.2
// @date           2010-10-20
// @author         Sander Soots
// @namespace      iha_plus
// @grant          none
// @include        http://www.iha.ee/*
// ==/UserScript==
var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://www.iha.ee/images/kjdhsidkfp3o4o2lasdI22.gif")
{
images[x].src = "http://www.battleit.ee/iha/ro_1245w3_6x4.gif";
}
x=x+1;
}

var images2 = document.getElementsByTagName ("img");
var x2=0;
while(x2<images.length)
{
if(images[x2].src == "http://www.iha.ee/images/kjdhsidosiduf0isdjOias.gif")
{
images[x2].src = "http://www.battleit.ee/iha/ro_1245w3_1x1.gif";
}
x2=x2+1;
}

var images3 = document.getElementsByTagName ("img");
var x3=0;
while(x3<images.length)
{
if(images[x3].src == "http://www.iha.ee/images/kjdhsidoiasdlsd10aisdl.gif")
{
images[x3].src = "http://www.battleit.ee/iha/ro_1245w3_6x6.gif";
}
x3=x3+1;
}