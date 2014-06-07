// JavaScript Document
// ==UserScript==
// @name          Pandora Shortcut Arrow Key Blocker
// @description   Prevents the arrow key from going to the next song on Pandora
// @include				http://*.pandora.com/*

// @license        GPL version 3; http://www.gnu.org/copyleft/gpl.html
//
// ==/UserScript==

function KeyCheck(e)
{
  if(e.keyCode == 39 || e.keyCode == 37) { //right arrow key and left just in case they decide to make it do something later
    if(e.preventDefault){ e.preventDefault();}
    else{e.stop();}
				
    e.returnValue = false;
    e.stopPropagation();
  }
}

window.addEventListener('keydown', KeyCheck, true);
window.addEventListener('keyup', KeyCheck, true);