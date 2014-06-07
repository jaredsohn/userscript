// ==UserScript==
// @name           Google draggable changed logo
// @description    Other slight change 
// @author         Vusan
// @include       http://*.google.*/*
// @include       https://*.google.*/*
// @version       1.0


// Script mit Notepad öffnen
// open the script with Notepad
// Bitte die URL unten gegen ein eigenes Bild bzw. die URL des Bildes austauschen.
// Replace URL with URL of your own Picture.
// Big THX goes to ArtColourHD™ for the new Logo - Please visit the YouTube Channel of the artist http://www.youtube.com/user/ArtColourHD

// ==/UserScript==

var loadingInstant = false;
var instantInterval = null;

function TwentyPercentCooler() {
	var GoogleLogo = document.getElementById("lga");
	var searchLogo = document.getElementById("gbqlw");
	var searchButton =document.getElementById("gbqfbwa");
	if (loadingInstant) {
		if (document.getElementById("sfcnt") == null) {
			return;

		}
		clearInterval(instantInterval);
		loadingInstant = false;
	}

	if (GoogleLogo != null) {
		GoogleLogo.innerHTML = '<img id="hplogo" src="http://i50.tinypic.com/ivd1xd.gif" style="margin-top:60px;left: 50%;margin-left: -60px;position: absolute;top: 31px;z-index: 999;" alt="" />';
	}

	if (searchLogo != null) {
		searchLogo.innerHTML = '<img id="gbqld" src="http://i50.tinypic.com/ivd1xd.gif"  style="position:relative;width:70px;right:15px" alt="">';
    }
    
    if (searchButton != null) {
        searchButton.style.position="relative";
        searchButton.style.bottom="100px";
    }
    
    
}

window.addEventListener("hashchange", TwentyPercentCooler, false);
if (window.location.hash != "") {
	loadingInstant = true;
	instantInterval = setInterval(TwentyPercentCooler, 100);
}

TwentyPercentCooler();
var  newImg1=document.getElementById('hplogo'); newImg1.setAttribute("class","dragme");  newImg1.style.position="absolute";  newImg1.style.zIndex=999;document.body.appendChild( newImg1); var ie=document.all; var nn6=document.getElementById&&!document.all;  var isdrag=false; var x,y; var dobj;  function movemouse(e) {   if (isdrag)   {     dobj.style.left = nn6 ? tx + e.clientX - x+"px" : tx + event.clientX - x+"px";     dobj.style.top  = nn6 ? ty + e.clientY - y+"px" : ty + event.clientY - y+"px";     return false;   } }  function selectmouse(e)  {   var fobj       = nn6 ? e.target : event.srcElement;   var topelement = nn6 ? "HTML" : "BODY";    while (fobj.tagName != topelement && fobj.className != "dragme")   {     fobj = nn6 ? fobj.parentNode : fobj.parentElement;   }    if (fobj.className=="dragme")   {     isdrag = true;     dobj = fobj;     tx = parseInt(dobj.style.left+0);     ty = parseInt(dobj.style.top+0);     x = nn6 ? e.clientX : event.clientX;     y = nn6 ? e.clientY : event.clientY;     document.onmousemove=movemouse;     return false;   } }  document.onmousedown=selectmouse;     document.onmouseup=function(){isdrag=false}; 
var newImg=document.getElementById('gbqld');newImg.setAttribute("class","dragme"); newImg.style.position="absolute"; newImg.style.zIndex=999;newImg.style.top="31px";newImg.style.left="2px";document.body.appendChild(newImg); var ie=document.all; var nn6=document.getElementById&&!document.all;  var isdrag=false; var x,y; var dobj;  function movemouse(e) {   if (isdrag)   {     dobj.style.left = nn6 ? tx + e.clientX - x+"px" : tx + event.clientX - x+"px";     dobj.style.top  = nn6 ? ty + e.clientY - y+"px" : ty + event.clientY - y+"px";     return false;   } }  function selectmouse(e)  {   var fobj       = nn6 ? e.target : event.srcElement;   var topelement = nn6 ? "HTML" : "BODY";    while (fobj.tagName != topelement && fobj.className != "dragme")   {     fobj = nn6 ? fobj.parentNode : fobj.parentElement;   }    if (fobj.className=="dragme")   {     isdrag = true;     dobj = fobj;     tx = parseInt(dobj.style.left+0);     ty = parseInt(dobj.style.top+0);     x = nn6 ? e.clientX : event.clientX;     y = nn6 ? e.clientY : event.clientY;     document.onmousemove=movemouse;     return false;   } }  document.onmousedown=selectmouse;     document.onmouseup=function(){isdrag=false}; 