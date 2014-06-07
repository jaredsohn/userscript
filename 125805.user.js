// ==UserScript==
// @name    Spoiler tag support
// @author  Witiko
// @version 1.0.2
// @include http*://www.facebook.com*
// @include http*://plus.google.com/*
// ==/UserScript==

var $1 = /\[spoiler\]/i,
    $2 = /\[\/spoiler\]/i,
    head = document.getElementsByTagName("head")[0];

style(
  "span.spoiler{background-color: #000; color: #000}" +
  "span.spoiler:hover{color: #fff}" +
  "span.spoiler img{visibility: hidden}" +
  "span.spoiler:hover img{visibility: visible}"
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
      $temp.className = "spoiler";
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