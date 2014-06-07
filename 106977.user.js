// ==UserScript==
// @name           Hold Naver Login Security Level to 1
// @namespace      http://flyjsw.canxan.com/
// @description    Hold the login security level to 1 in Naver
// @include        http://nid.naver.com/*
// @include        https://nid.naver.com/*
// @include        http://static.nid.naver.com/*
// @include        https://static.nid.naver.com/*
// ==/UserScript==

function contentEval_top(source) {
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
  main = document.body.firstChild;
  main.parentNode.insertBefore(script, main);
  
  //document.body.appendChild(script);
  //document.body.removeChild(script);
}

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
  //document.body.removeChild(script);
}

contentEval("useLevel(1); var org_useLevel = window.useLevel; window.useLevel = function(){}; setTimeout(function(){ window.useLevel = org_useLevel; }, 5000);");
//contentEval_top("p = document.getElementsByTagName('form')[0]; t = p.getElementsByTagName('script')[0]; p.removeChild(t);");