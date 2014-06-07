// ==UserScript==
// @version Images
// @name Shiv's link converter
// @author Shiv
// @namespace
// @description Shiv link to image converter
// @include http://www.orkut.co.in/*
// ==/UserScript==
//--------------------------------------------
// Shows links of images as images
//--------------------------------------------
var i=0;
function changelinktoimg(){
doc=document;
lnk=doc.links;

for (i=0;i<lnk.length;i++){
getload="document.getElementById('loadi"+i+"')"
this2="document.getElementById('bfimg"+i+"')"

var sb=lnk[i].href.substring(lnk[i].href.length-4,lnk[i].href.length);sb=sb.toLowerCase()
if(sb=='.jpg' || sb=='.gif' || sb=='.png' || sb=='jpeg'){
lnk[i].innerHTML="<b id=loadi"+i+" onclick=\""+this2+".style.display='';"+getload+".style.display='none';return false;\"><font size=1 color=green id=load"+i+">Loading Image By Shiv, click if you don't want to wait</font></b><img onError=\"document.links["+i+"].innerHTML='<font size=1 color=red>Link broken/Link for figure</font>'\" oncontextmenu=\"if(aa"+i+"==0){if(imgh"+i+">imgw"+i+"){document.getElementById('bfimg"+i+"').height=imgh"+i+"};if(imgw"+i+">imgh"+i+"){document.getElementById('bfimg"+i+"').width=imgw"+i+"};aa"+i+"=1}else{if(this.height>200 && this.height>=this.width){this.height=200};if(this.width>200 && this.width>=this.height){this.width=200};aa"+i+"=0};return false\" src="+lnk[i].href+" style='display: none' id=bfimg"+i+" border=0 onload=\"aa"+i+"=0;imgh"+i+"=this.height;imgw"+i+"=this.width;if(this.height>200 && this.height>=this.width){this.height=200}else if(this.width>200 && this.width>=this.height){this.width=200;};this.style.display='';"+getload+".style.display='none';\">"
}}
}
changelinktoimg()
//--------------------------------------------
// Removes the tags [img] [/img] from the page
//--------------------------------------------
function changetags(){
br=document.body.innerHTML
if(br.indexOf("[img]") > -1 && br.indexOf("[/img]") > -1){
br=br.replace(/\[img\]/gi,'');
br=br.replace(/\[\/img\]/gi,'');
document.body.innerHTML = br;
}
}
changetags()