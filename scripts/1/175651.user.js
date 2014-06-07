// ==UserScript==
// @name Yesilyum Developer Mode
// @namespace
// @version  0.1
// @include        http://127.0.0.1:8000/*
// @author         Evren Esat Ozkan 
// @license        Public Domain
// ==/UserScript==

function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();'
  }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}

function runner(){
    Settings.POOLING_INTERVAL = 9999000;
    console.log("AJAX pooling disabled on dev machine");
}

contentEval(runner);
