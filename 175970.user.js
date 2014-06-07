// ==UserScript==
// @name       YouTube Ad-free witchcraft
// @namespace  http://boxmein.x10.mx/
// @version    1.0.62
// @description not useful
// @include    http://*.youtube.com/watch*
// @include	   http://youtube.com/watch*
// @copyright  2013+, boxmein (use under terms of the MIT license) 
// ==/UserScript==

function contentEval(source) {
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
  document.body.removeChild(script);
}

// actual code start
setTimeout(function(){contentEval(function(){
  var loc = /watch\?v=([^&\s]+)/.exec(document.location.href)[1];
  console.log("Setting src of #movie_player to http://youtube.com/embed/"+loc);
  document.getElementById("movie_player").setAttribute("src", "http://youtube.com/embed/"+loc);
})}, 2000);