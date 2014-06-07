 // ==UserScript==
 // @version 1
 // @name Link
 // @author  http://www.orkut.com/Profile.aspx?uid=8150579501183576905
 // @namespace
 // @description Changes the color of orkut Links
 // @include http://www.orkut.com/*
 // ==/UserScript==
 function color() {
a=document.getElementsByTagName('a');
var i;
for(i=0;i<a.length;i++)
{
a.[i].style.color="blue";
}
 }
color();
