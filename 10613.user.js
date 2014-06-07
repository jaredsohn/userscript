// ==UserScript==
// @name           Remove unwanted stuff.
// @description    This will remove all unwanted (at least my unwnated) stuff from
// @description     your portal page of myspace.
// @include        *.myspace.com/*
// @Version/Date	1.0/2-16-2007
// @Code            Shane - myspace.com/DFW_Dino
// ==/UserScript==







myremoveChild("splash_profile");

myremoveChild("home_greybox");

myremoveChild("ctl00_Main_ctl00_ProfileHome_gads");

myremoveChild("home_additionalLinks");

myremoveChild("home_additionalLinks");

myremoveChild("home_additionalLinks");

myremoveChild("home_setHomePage");

myremoveChild("home_schools");

myremoveChild("footer");



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