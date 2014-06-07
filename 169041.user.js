// ==UserScript==
// @name    Trigger tag support
// @author  Witkio (based off Facebook Spoiler Tag Support)
// @author  Lapage
// @version 1.0
// @include include http*://www.facebook.com*
// ==/UserScript==

var $1 = /\[trigger\]/i,
    $2 = /\[\/trigger\]/i,
    head = document.getElementsByTagName("head")[0];

style(
  "span.trigger{background-color: #000; color: #000}" +
); find(document.body);
document.body.addEventListener("DOMSubtreeModified", function(e) {
  find((e || event).target);
}, false);

function affect(node) {
  var $$ = document.createElement("span"),
      $n = node.data.split($1);
  if( $n.length === 1) return;
  $n.forEach(function($, $temp) {
    if($2.test($)) {
      $ = $.split($2);
      $temp = document.createElement("span");
      $temp.className = "trigger";
      $temp.appendChild(document.createTextNode($[0]));
      $$.appendChild($temp);
      $$.appendChild(document.createTextNode($[1]));
    } else $$.appendChild(document.createTextNode($));
  }); node.parentElement.replaceChild($$, node);
}

function find(node) {
  if(node.nodeType === Node.TEXT_NODE) affect(node);
  else for(var child = 0; node.childNodes[child];) find(node.childNodes[child++]);
}

function style(cssText) {
  var sheet;
  with(sheet = document.createElement("style")) {
    type = "text/css";
    appendChild(document.createTextNode(cssText));
  } head.appendChild(sheet);
}