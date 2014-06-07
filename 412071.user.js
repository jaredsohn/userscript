// ==UserScript==
// @name        Ghost Highlight Problematic Links
// @namespace   none
// @include     https://*.ghost.io/ghost/editor/*/
// @version     1
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       none
// ==/UserScript==

// After page loads, and on future keystrokes, identify cm-link blocks.
waitForKeyElements("div.CodeMirror-code pre span.cm-link", checkLinks);

function checkLinks (jNode) {
  // We have found a cm-link block
  // If it begins with "www", highlight it for great justice
  linkText = jNode.text();
  if(linkText.substr(0,3).toLowerCase() == "www")
   jNode.attr('style','background-color: #FFFF00;'); 
}
