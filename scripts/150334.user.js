// ==UserScript==
// @name        NSeznam
// @namespace   /seznam/
// @description New seznam.cz upgrade
// @include     http://novy.email.seznam.cz/*
// @version     1
// @grant none
// ==/UserScript==
setTimeout(function(){fix();},100);
function fix () {
  var first=document.getElementById('wm-commands-selection');  
  if (first==null)
  {
    setTimeout(function(){fix();},100);
    return;
  }
  var children=first.childNodes;
  for(var i=0; i < children.length; i++)
  {
    if (children[i].tagName=="A")
      children[i].className+=' wm-button';
 
  }
} 