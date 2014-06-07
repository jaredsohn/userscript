// ==UserScript==
// @name           focus outline medium
// @namespace      http://www.telerama.com/~mcguire/us
// @description    Makes the focus more recognizable, especially for people who use the keyboard (TAB and ENTER variants) to navigate a list of links. Some sites are styled so that the default thin outline is hard to see. You can also install "focus outline thick" and right click the little monkey head to choose between thin, medium, and thick for subsequent page (re)loads.
// @include        *
// ==/UserScript==

function addGlobalStyle(css) {
 var head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  var style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = css;
   head.appendChild(style);
}

addGlobalStyle(':focus {outline: medium dotted invert;}');