// ==UserScript==
// @name          Google Reader SlideWindow
// @namespace     Google Reader
// @description   Slide window of 200 news which won't overload FF
// @include       https://www.google.com/reader/*
// @include       http://www.google.com/reader/*
// ==/UserScript==

var nent = 60;  // Minimum number of entries to keep
var lsup = 200; // When removeChild starts first time. This one must be lsup > nent ever 

var ent = 0;
var bor = 0;
var bsig = 0;
var nbor = 0;
var centi = false;
var entries = document.getElementById("entries");

(function() {

    entries.addEventListener("DOMNodeInserted", function() {

        try {
              ent = ent + 1;    
              if ((ent > lsup)&&(!centi)){
                centi = true; 

                nbor = entries.scrollTop;

                while (bor + bsig <= nbor) {
                  actual = entries.firstChild;
                  bsig = Math.floor(actual.nextSibling.offsetHeight/2);
                  bor = bor + actual.offsetHeight;
                  entries.removeChild(actual);
                }

                ent = nent;
                bor = 0;
                entries.scrollTop = 0;

                centi = false;
              }
            } catch (e) {
        }

    }, false);
    
    // Reset values on load
    window.addEventListener("load", function() {
      ent = 0;
      bor = 0;
      centi = false;
      }, false);

})();
