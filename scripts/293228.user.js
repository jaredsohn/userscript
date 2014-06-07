// ==UserScript==
// @name           HaberTurk.com - Foto Galeri - AD skipper
// @version        1.0
// @date           25.01.2014
// @author         Volkan K.
// @namespace      http://userscripts.org/users/volkan
// @description    skip that shit in HaberTurk fotogaleri
// @include        http://galeri.haberturk.com/galeri/reklam/*
// ==/UserScript==

function contentEval(source, remove) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  if (!(remove==false)){
	setTimeout(function(){document.body.removeChild(script);},1000);
  }
}

contentEval( function() { 
	$("a.sonraki")[0].click();
}, 0);