// ==UserScript==
// @name           logind
// @namespace      http://userscripts.org/users/101059
// @description    Automating the moving of the login box
// @include        http://www.oilandgasinvestor.com/*
// @include        http://www.epmag.com/*
// ==/UserScript==

// Some variable variables...
var t;
var login=document.getElementById("Login");
var Xheading=-1;
var Yheading=1;
var X=parseFloat(login.offsetLeft);
var Y=parseFloat(login.offsetTop);
var Xmax=parseInt(window.innerWidth) - parseInt(login.offsetWidth);
var Ymax=parseInt(window.innerHeight) - parseInt(login.offsetHeight);

// Some CSS for that ASS
login.style.backgroundColor="#222222";
login.style.position="fixed";
login.style.zIndex="666";

// this is it here, this is the function
window.logind=function() {
 // Give X and Y a 1 in 10 chance of changing headings and update with delta of 5
 Xheading = Math.floor(Math.random()*10)==3 ? Xheading*(-1) : Xheading;
 Yheading = Math.floor(Math.random()*10)==3 ? Yheading*(-1) : Yheading;
 X+=5*Xheading;
 Y+=5*Yheading;
 // Set some limits to keep this between the ditches
 X = X<0 ? 0 : X;
 X = X>Xmax ? Xmax : X;
 Y = Y<0 ? 0 : Y;
 Y = Y>Ymax ? Ymax : Y;
 // Assign the new position
 login.style.left=X+"px";
 login.style.top=Y+"px";
 // Wait 42ms and ask the mice for another set of coords
 t=window.setTimeout(logind,42);
}

// Call the function, no fun otherwise
window.logind();

// So long, and thanks for all the fish!
