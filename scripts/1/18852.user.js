 // ==UserScript==
 // @name Orkut Link Color change
 // @description Changes the color of orkut Links
 // @include http://www.orkut.com/*
 // ==/UserScript==
 function color() {
a=document.links;
c=["red","green","blue","yellow","magenta","orange","black","white"]; 
for(i=0;i<100;i++)
{
if(a[i])
{
a[i].style.color=c[i%8];
}
}

 }
color();
