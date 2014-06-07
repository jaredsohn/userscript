// I just want to download my bought audiobooks from audible on my linux comp
// but download doesn't work with the exception on macs
// I tried to set the proper user agent but failed with this method
// So I came up with this script that sets the browserType variable to MAC 
// and suddenly the download button works correctly
// If there is an easier way to achieve this goal, please tell me
// NOTE: You can't steal audiobooks of audible with this script nor can you
// play those files without a proper authorized player. I just want to download
// what I bought. This is tested for audible.de but might work for audible.*
// just add a proper @include line
// ==UserScript==
// @name	Audible Download Fix
// @namespace	http://yomamayo/
// @description	Set browser type to Mac to allow proper download of bought files
// @include	http://www.audible.de/*
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
contentEval("browserType = 'MAC'");