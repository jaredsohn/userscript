// ==UserScript==
// @name          Never MAAR!
// @namespace     http://plurk.com/garcon
// @description	  Never mark all as read in Plurk accidentaly.
// @include       http://plurk.com/*
// @include       http://www.plurk.com/*
// ==/UserScript==
// 
// Version: 20100220.01
//
// [cs] Tenhle skript funguje s Greasemonkey
// [en] This script runs with Greasemonkey
//   Firefox: https://addons.mozilla.org/cs/firefox/addon/748
//   Other browsers: http://en.wikipedia.org/wiki/Greasemonkey#Equivalents_for_other_browsers 

try {
  // "Opravdu chceš všechno označit jako přečtené?"
  var quanti = "Do you really want to Mark All As Read?";
  
  var neverMaar = function() {
    var linkMaar = document.getElementById("mark_all_link");
    if(window.addEventListener) {
      linkMaar.getElementsByTagName("span")[0].addEventListener("click", function(e) {
        if(linkMaar.id == e.target.parentNode.id) {
          if(!confirm(quanti)) e.stopPropagation()
        }
      }, false);
    } else if(window.attachEvent) {
      linkMaar.getElementsByTagName("span")[0].attachEvent("onclick", function(e) {
        if(linkMaar.id == e.srcElement.parentNode.id) {
          if(!confirm(quanti)) e.cancelBubble = true;
        }
      });
    }
  };

  (function() {
    if(window.addEventListener) {
      window.addEventListener("load", neverMaar, false);
    } else if(window.attachEvent) {
      window.attachEvent("onload", neverMaar);
    }
  })();  
} catch(err) {}