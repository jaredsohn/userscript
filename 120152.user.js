// ==UserScript==
// @name          Enable Autocomplete for SFCU
// @version       1.2
// @author        Biggus Dictus
// @match         https://*.sfcu.org/*
// @description   Enable Autocomplete for SFCU
// ==/UserScript==

function on(tag) {
   var on = document.getElementsByTagName(tag);
   for (var i = 0; i < on.length; i++) {
      var tag2 = on[i];
      if (tag2.getAttribute('autocomplete') == 'off')
         tag2.setAttribute('autocomplete', 'on');
   }
}
on('form');
on('input');
