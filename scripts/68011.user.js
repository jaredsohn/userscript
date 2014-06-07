// ==UserScript==
// @name           Remember the Milk - Disable Sidebar Scroll
// @namespace      http://www.devoresoftware.com
// @description    Disables the floating nature of the RTM sidebar.
// @include        http://www.rememberthemilk.com/*
// @include        https://www.rememberthemilk.com/*
// ==/UserScript==
// Based on code provided by Michael Devore in discussion thread at
// http://userscripts.org/forums/1/topics/172.

// The actual fixing script
function fixIt() {
    document.getElementById("detailsbox").moveDiv = function () {
        var L = document.getElementById("detailsbox");
        L.style.top = window.pageYOffset+"px";
        window.Autocomplete.handleWindowResize();
    };
}


// Helper function that will execute JS in the context of the page
// Source: http://wiki.greasespot.net/Content_Script_Injection
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

  // Insert the script node into the page, so it will run, 
  // and immediately remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}


// Waiting around until RTM claims to have finished loading
var rtmLoad = unsafeWindow.rtmLoad;
(function () {
    if (!rtmLoad.done) {
        setTimeout(arguments.callee, 100);
        return;
    }
    
    // Once RTM has finished loading, call the fixIt script in the context of the page
    contentEval(fixIt);
})();
