// ==UserScript==
// @name        Turk Torrent Adblocker
// @namespace   Blocker
// @description Turk Torrent Ads Blocking Script
// @include     http://*turktorrent.eu*
// @include     https://*turktorrent.eu*
// @version     1.6
// ==/UserScript==


var radio=document.getElementById("collapseobj_Radyo_Live");
radio.parentNode.parentNode.style.display="none";
radio.parentNode.parentNode.innerHTML="";


// hostixz.com reklamı
var reklam1=document.getElementById("collapseobj_Hostixz.com");
reklam1.parentNode.parentNode.style.display="none";
reklam1.parentNode.parentNode.innerHTML=""; 


// vip reklamı
var reklam2=document.getElementById("collapseobj_VIP");
reklam2.parentNode.parentNode.style.display="none";
reklam2.parentNode.parentNode.innerHTML="";


// tjturk reklamı
var reklam3=document.getElementById("collapseobj_Tjurk");
reklam3.parentNode.parentNode.style.display="none";
reklam3.parentNode.parentNode.innerHTML="";


// bizim linkler reklamı
var reklam4=document.getElementById("collapseobj_Bizim_Linkler");
reklam4.parentNode.parentNode.style.display="none";
reklam4.parentNode.parentNode.innerHTML="";

// üst reklam
var allTables = document.getElementsByTagName("table");
if(allTables[2].className=="main"){
allTables[2].innerHTML="";
allTables[2].style.display="none";
}
