// ==UserScript==
// @name           SB Killer
// @namespace      Forum
// @description    deletes SB
// @include        http://forum.szene1.at/
// author: pbammer    25.02.2011

// ==/UserScript==



function DeleteBox() {

var allElements, thisElement;

  allElements = document.getElementsByClassName('box');

  for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];  
    thisElement.innerHTML = "";
  } // end for

} // DeleteBox


setTimeout(DeleteBox(), 1); 



















