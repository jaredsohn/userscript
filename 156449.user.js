// ==UserScript==
// @name       Saturday Morning Breakfast Cereal (SMBC) Hotkey Disable
// @namespace  http://www.smbc-comics.com/
// @version    0.1
// @description  Disables hotkeys such as "y" on the SMBC page.
// @match      http://www.smbc-comics.com/*
// @copyright  2012+, Gavin Borg
// ==/UserScript==


// Quick and dirty, but it works.
location.href="javascript:(function(){ document.removeEventListener(\"keyup\", onKeyUp, false); })()";



// Potential other method, pulled from the greasemonkey wiki. A bit much for this situation.
/*
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

contentEval("document.removeEventListener(\"keyup\", onKeyUp, false)");*/