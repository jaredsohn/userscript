// ==UserScript==
// @name          phpMyAdmin Font Fix
// @namespace     http://repo.securityteam.us/firefox/greasemonkey
// @description   Fixes the extra large (default) font size in phpMyAdmin
// @include       http://*/phpMyAdmin/*
// @include       https://*/phpMyAdmin/*
// ==/UserScript==

(function () 
{
  function addGlobalStyle(css) {
      var head, style;
      head = document.getElementsByTagName('head')[0];
      if (!head) { return; }
      style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = css;
      head.appendChild(style);
  }
  
  addGlobalStyle('body { font-family: sans-serif; font-size: 0.8em ! important; }');

}
)();
