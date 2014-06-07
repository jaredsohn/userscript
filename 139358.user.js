// ==UserScript==
// @name        nomADs
// @namespace   http://userscripts.org/users/101059
// @description Migrating ads? Those are nomADs!
// @include     *
// @version     1
// ==/UserScript==

// Some variating variable variables of varying degrees...
var t;
var nomAD=[];
nomAD=document.getElementsByClassName('adBox');
var nomADs=nomAD.length;
var Xheading=[];
var Yheading=[];
var X=[];
var Y=[];
var Xmax=[];
var Ymax=[];

// Assign headings and coords for all matching elements.
for(var i=0; i<nomADs; i++) {
 Xheading[i]=-1;
 Yheading[i]=1;
 X[i]=parseFloat(nomAD[i].offsetLeft);
 Y[i]=parseFloat(nomAD[i].offsetTop);
 Xmax[i]=parseInt(window.innerWidth) - parseInt(nomAD[i].offsetWidth);
 Ymax[i]=parseInt(window.innerHeight) - parseInt(nomAD[i].offsetHeight);
 // Some CSS for that ASS
 nomAD[i].style.position="fixed";
 nomAD[i].style.zIndex="666";
}

// this is it here, this is the function
window.nomADd=function() {
 for(var j=0; j<nomADs; j++) {
  // Give X and Y a 1 in 42 chance of changing headings and update with delta of 5
  Xheading[j] = Math.floor(Math.random()*42)==3 ? Xheading[j]*(-1) : Xheading[j];
  Yheading[j] = Math.floor(Math.random()*42)==3 ? Yheading[j]*(-1) : Yheading[j];
  X[j]+=5*Xheading[j];
  Y[j]+=5*Yheading[j];
  // Set some limits to keep this between the ditches
  X[j] = X[j]<0 ? 0 : X[j];
  X[j] = X[j]>Xmax[j] ? Xmax[j] : X[j];
  Y[j] = Y[j]<0 ? 0 : Y[j];
  Y[j] = Y[j]>Ymax[j] ? Ymax[j] : Y[j];
  // Assign the new position
  nomAD[j].style.left=X[j]+"px";
  nomAD[j].style.top=Y[j]+"px";
  // Wait 42ms and ask the mice for another set of coords
 }
 t=window.setTimeout(nomADd,42);
}

// Call the function, no fun otherwise
window.nomADd();

// So long, and thanks for all the fish!
