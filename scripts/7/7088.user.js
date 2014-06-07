// ==UserScript==
// @namespace     http://maone.net/userscripts/workarounds
// @name          Global Named Elements IEism
// @include       http://www.skymall.com/*
// @description   Defines a global variable for each named input element
// ==/UserScript==

window.addEventListener("load", function() {
  var tags = ["input", "select", "textarea"];
  var t, e, elems, control;
  for(t = tags.length; t-- > 0;) {
    elems = document.getElementsByTagName(tags[t]);
    for(e = elems.length; e-- > 0;) {
      control = elems[e];
      if(control.name && !(control.name in unsafeWindow)) {
        unsafeWindow[control.name] = control;
      }
    } 
  }
}, false);//.user.js