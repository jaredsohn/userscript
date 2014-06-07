 // ==UserScript==
 // @version 1
 // @name Orkut Link Color change
 // @author  http://www.orkut.com/Profile.aspx?uid=8150579501183576905
 // @namespace
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
