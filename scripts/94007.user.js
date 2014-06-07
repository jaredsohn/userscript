// ==UserScript==
// @name           flickr Download Link
// @version        2.0
// @updateURL      http://userscripts.org/scripts/source/94007.user.js
// @description    Adds a "Downloadl" link next to the Upload link and enables right click on the image.
// @namespace      c1b1.de
// @author         Samuel Essig
// @copyright      2011-2014, Samuel Essig
// @grant          none
// @include        http://www.flickr.com/photos/*
// ==/UserScript==
"use strict";

function clickable() {
  if(document.getElementsByClassName('main-photo')) {
    document.getElementsByClassName('main-photo')[0].setAttribute("style","z-index:500 !important");
    document.getElementsByClassName('main-photo')[0].parentNode.parentNode.appendChild( document.getElementsByClassName('main-photo')[0].parentNode);
  }
  if(document.getElementsByClassName('facade-of-protection-neue')) {
    document.getElementsByClassName('facade-of-protection-neue')[0].setAttribute("style","display:inline; position:relative;");
  }
}
function doit() {
  if(!document.getElementsByClassName('main-photo'))
    return;
  if(document.getElementById("idllusgm"))
    return;
  
  var url = document.getElementsByClassName('main-photo')[0].src;
  var li = document.createElement('li');
  li.setAttribute("role","menuitem")
  var a = document.createElement('a');
  li.appendChild(a);
  document.getElementsByClassName('nav-menu')[0].appendChild(li);
  a.setAttribute('class','gn-title');
  a.setAttribute('id','idllusgm');
  a.setAttribute('href',url);
  a.appendChild(document.createTextNode('Download'));
  clickable();
}

window.setInterval(doit,3000);