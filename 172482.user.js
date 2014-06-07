// ==UserScript==
// @name           BlogSpot Content Warning Evader
// @namespace      agustinferrari@eml.cc
// @description    Automatically clicks any "I wish to continue" buttons on content warning pages.
// @include        http*://www.blogger.com/blogin.g?blogspotURL=*
// ==/UserScript==

var continueButton=document.getElementsByClassName("maia-button maia-button-primary")[0];
if(!continueButton){ continueButton=document.querySelector('a[href*="/?guestAuth="]'); }
if(continueButton){ parent.location.replace(continueButton.href); }
