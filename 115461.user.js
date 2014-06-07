// ==UserScript==
// @name cliker
// ==/UserScript==
(function(){ var counter = 0; document.documentElement.addEventListener('click', function() { counter++; if(!(counter%6)) alert('pwned, you clicked 6 times in a single website'); } , false); })();