// Copyright (c) 2009, Gabriel Medina.
// Released under the GNU LGPL license:
// http://rha7dotcom.blogspot.com/
//
// ==UserScript==
// @name           Gmail Navigation Pane Widener
// @namespace      http://rha7dotcom.blogspot.com/
// @description    Makes the nav box in Gmail wider.
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
      function setGMailPanelSize() {
        setTimeout(function(){
          intSize = 180;
          pane = gmail.getNavPaneElement();
          if (pane) {
            ints = eval(pane.style.width.substr(0,pane.style.width.length-2));
            size = String(ints+intSize)+'px';
            if (ints < 200) {
              pane.style.width = size;
              pane = gmail.getActiveViewElement();
              if (pane) {
                pane = pane.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                ints = eval(pane.style.width.substr(0,pane.style.width.length-2));
                size = String(ints-intSize)+'px';
                pane.style.width = size;
              }
            }
          }
          if (gmail.getActiveViewType() == 'cv') {
            pane = gmail.getActiveViewElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0];
            size = String(eval(pane.style.width.substr(0,pane.style.width.length-2))-intSize)+'px';
            pane.style.width = size;
          }
        }, 100);
      }
      gmail.registerViewChangeCallback(setGMailPanelSize);
      setGMailPanelSize();
    });
  }

  function addMyEvent(obj, evType, fn){ 
    if (obj.addEventListener) { 
      obj.addEventListener(evType, fn, false); 
      return true; 
    } else if (obj.attachEvent) { 
      var r = obj.attachEvent("on"+evType, fn); 
      return r; 
    } else { 
      return false; 
    } 
  }
  addMyEvent(window, 'resize', function(){ 
    if (unsafeWindow.gmonkey) {
      gmail = unsafeWindow.gmonkey.get('1.0')
      setTimeout(function(){
        intSize = 180;
        pane = gmail.getNavPaneElement();
        if (pane) {
          ints = eval(pane.style.width.substr(0,pane.style.width.length-2));
          size = String(ints+intSize)+'px';
          if (ints < 200) {
            pane.style.width = size;
          }
        }
        pane = gmail.getActiveViewElement();
        if (pane) {
          pane = pane.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
          ints = eval(pane.style.width.substr(0,pane.style.width.length-2));
          size = String(ints-intSize)+'px';
          pane.style.width = size;
        }
        if (gmail.getActiveViewType() == 'cv') {
          pane = gmail.getActiveViewElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0];
          size = String(eval(pane.style.width.substr(0,pane.style.width.length-2))-intSize)+'px';
          pane.style.width = size;
        }
      }, 100);
    }
  });
}, true);

