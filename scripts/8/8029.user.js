// ==UserScript==
// @name           Key Scroll
// @namespace      
// @description    Enable autoscrolling via hotkey
// @include        http://*
// @include        file://*
// ==/UserScript==

if (window.scrollSpeed == null) { window.scrollSpeed = 0; }

function changeScrollSpeed(e)
{

  if (e.altKey && e.ctrlKey && (e.charCode==115))
  {
    window.scrollSpeed = (window.scrollSpeed + 1) % 4;
    window.clearInterval(window.i);
    if (window.scrollSpeed != 0) 
     { 
      window.i = window.setInterval(
       performScroll,
       window.scrollSpeed * window.scrollSpeed * 10); 
     }
  }
}

function performScroll()
{
  window.scrollPosition = window.pageYOffset;
  window.scrollBy(0,1);
  if (window.scrollPosition == window.pageYOffset)
   { 
    window.scrollSpeed = 0;
    window.clearInterval(window.i);
   }
}

window.addEventListener("keypress",function(e){changeScrollSpeed(e);},false);