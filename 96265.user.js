// ==UserScript==
// @name          Grooveshark "Close Ad" button fix
// @namespace     n.ippl.es
// @description   GrooveShark has a close ad button at the top right, but it's broken as shit! Let's fix it shall we? (This doesn't cheat the advertisers/Grooveshark quite so much as hiding ads immediately)
// @include       http://listen.grooveshark.com/*
// ==/UserScript==

//setTimeout(function() {

(function(d) { try {
  var capital = document.querySelector('#capital');
  var parent = capital.parentNode;
  document.querySelector('#remove_capital_button').addEventListener('click', function(e) { e.preventDefault(); parent.removeChild(capital); return false; }, true);
} catch(e) { if(console) console.log('failed to run close ad fix'); }})(document);
//}, 1000);