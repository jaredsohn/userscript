// ==UserScript==
// @name           Remove unwanted stuff.
// @description    This will remove all unwanted (at least my unwnated) stuff from
// @description     your portal page of myspace.
// @include        *.myspace.com/*
// @Version/Date	1.0/2-16-2007
// @Code            Shane - myspace.com/DFW_Dino
// ==/UserScript==







var b = document.getElementById("splash_profile");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_greybox");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("ctl00_Main_ctl00_ProfileHome_gads");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_additionalLinks");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_setHomePage");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("home_schools");
if (b) {b.parentNode.removeChild(b);}

var b = document.getElementById("footer");
if (b) {b.parentNode.removeChild(b);}



//Funcation Area

//******************************************************************************
//Will remove the child of the element of the object you pass
//******************************************************************************
function myremoveChild(elm)
{

  var myContent = document.getElementById(elm);

  myContent.parentNode.removeChild(myContent);
  
  myContent = null;


}