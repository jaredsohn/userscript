// ==UserScript==
// @name        Stop Benefit Plus countdown
// @namespace   http://metatron.brq.redhat.com/gs/benefit
// @include     https://benefitplus.sprinx.cz/*
// @version     5
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


contentEval('setInterval("DeactivateAllCountdowns();", 1000);');
contentEval('DeactivateAllCountdowns();');

