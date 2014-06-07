// ==UserScript==
// @name           CollapseClicker
// @namespace      http://forums.goha.ru/*
// @include        http://forums.goha.ru/*
// ==/UserScript==

var divElements, thisElement;
divElements = document.getElementsByTagName('span');

for (var i = 0; i < divElements.length; i++) 

  {
  
      thisElement = divElements[i];
    
    if (thisElement.className.match(/thead/))
    
      {
      
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);  
        thisElement.dispatchEvent(e);
        
      }  
    
  }
