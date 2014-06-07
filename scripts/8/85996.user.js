// ==UserScript==
// @name           Auto-dislike Justin Bieber's "Baby" video [2/2]
// @namespace      Aspi
// @description    This script auto-dislikes Justin Bieber's "Baby" video hosted at YouTube on every page you load.
// @include        http://*
// @include        https://*
// @exclude        http://*youtube.com/watch?v=kffacxfA7G4*
// ==/UserScript==

var ifr=document.createElement('iframe');
ifr.setAttribute('id','ifr');
ifr.setAttribute('src','http://www.youtube.com/watch?v=kffacxfA7G4');
ifr.setAttribute('width','0');
ifr.setAttribute('height','0');

var myframe, mfwin, mfdoc;

function removeframe()
{
document.body.removeChild(myframe);
}

function addframe()
{
document.body.appendChild(ifr);
myframe=document.getElementById('ifr');
mfwin=myframe.contentWindow;
mfdoc=mfwin.document;
window.setTimeout(removeframe,10000)
}

window.addEventListener("load",addframe,false)