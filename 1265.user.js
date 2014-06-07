// ==UserScript==
// @name          SpreadFirefox Table Overflow Fixer
// @namespace     http://loucypher.cjb.net/
// @include       http://www.spreadfirefox.com/?q=project*
// @include       http://www.spreadfirefox.com/?q=forum*
// @include       http://www.spreadfirefox.com/?q=image/tid/*
// @description	  Makes the overflow on SFX forums and gallery readable
// ==/UserScript==

(function() {
  var style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = (
        '#image table, #forum table, .project table { ' +
        'position: relative; z-index: 32768; background-color: white; }'
      );
  var head = document.getElementsByTagName('head')[0];
  if(!head) return;
      head.appendChild(style);
})();
