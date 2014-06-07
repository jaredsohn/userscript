// ==UserScript==
// @name        colafile
// @namespace   colafile
// @include     http://www.colafile.com/*
// @version     1
// @grant       none
// ==/UserScript==



function killimg(){
 var navnav_list=document.getElementsByTagName("img");
 for(var i=0;i<navnav_list.length;i++){  
    //alert(navnav_list[i].outerHTML);
    navnav_list[i].outerHTML = "";
 }  
 
var navnav_list=document.getElementsByTagName("iframe");  
 for(var i=0;i<navnav_list.length;i++){  
    //alert(navnav_list[i].outerHTML);
    navnav_list[i].outerHTML = "";
 }
 
 }
var t1 = window.setInterval(killimg,1000); 

setTimeout(function(){window.location.href = document.getElementById("d1").href;document.html.innerHTML = "<br /><br /><br /><br /><a href='" + document.getElementById("d1").href +"'>========Link Download========</a>";document.body.style.textAlign = "center";},8000);
document.user_form.onsubmit = null;