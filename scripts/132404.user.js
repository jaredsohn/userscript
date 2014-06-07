// ==UserScript==
// @name          Hide Deleted Answers
// @namespace     http://stackexchange.com
// @description   hides deleted answers on fogbugz and kiln stackexchanges
// @include       http://fogbugz.stackexchange.com/*
// @include       http://kiln.stackexchange.com/*
// ==/UserScript==

window.onload = function() {
  var deletedanswers = document.getElementsByClassName('deleted-answer');
  for (i = 0; i < deletedanswers.length; i++) { 
    deletedanswers[i].hidden = true;
  }
  
  if (deletedanswers.length < 1) return;

  newElem = document.createElement("a");
  newElem.setAttribute("id", "showdeleted");
  newElem.setAttribute("href", "javascript:var deletedanswers = document.getElementsByClassName('deleted-answer');for (i = 0; i < deletedanswers.length; i++) {deletedanswers[i].hidden=!deletedanswers[i].hidden;};");
  newElem.innerText = "Toggle showing " + deletedanswers.length + " deleted answers";
  
  document.getElementById('answers-header').insertAdjacentElement("AfterEnd", newElem);
};