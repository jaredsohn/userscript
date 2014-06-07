// ==UserScript==
// @name           BlogSpot.com: "I wish to continue"
// @namespace      rowaasr13@gmail.com
// @description    Automatically clicks any "I wish to continue" buttons on content warning pages.
// @include        https://www.blogger.com/blogin.g?blogspotURL=* 
// ==/UserScript==

var continueButton=document.getElementById("continueButton");
if(continueButton){ document.location.replace(continueButton.href); }