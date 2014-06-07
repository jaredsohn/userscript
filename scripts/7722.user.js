// ==UserScript==
// @name          Show links
// @namespace     http*/*/
// @description   Sites want to look pretty by hiding links.
// @include       *
// ==/UserScript==

// Default colors for links.
// If you have chosen different colors you can change these.
// To find your preferred link colors, use the url "about:config", then
// search for "color". 
// browser.active_color, browser.anchor_color, browser.visited_color
var gs_style = new String(
"a:link     { color: #0000EE; text-decoration: underline } \n" +
"a:visited  { color: #551A8B; text-decoration: underline } \n" +
"a:active   { color: #EE0000; text-decoration: underline } \n" 
);

addGlobalStyle(gs_style);

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}