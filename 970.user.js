// ==UserScript==
// @name          Fix the JobCentrePlus search
// @description	  Make it work in Firefox
// @namespace     http://www.kryogenix.org/code/browser/greasemonkey/
// @include       http://*.jobcentreplus.gov.uk/*

// Stuart Langridge (http://www.kryogenix.org/)

// ==/UserScript==


(function() {
  var els = document.getElementsByTagName('*');
  for (var i = 0;i<els.length;i++) {
    d = els[i];
    if (d.name != '' && d.id == '') {
      d.id = d.name;
    }
  }
})();
