// ==UserScript==
// @name           Hide Blue Arrow
// @namespace      http://chofter.com
// @description    Hides the ridiculous blue arrow and blue bar on Google.com
// @include        http://www.google.com/*
// @include        https://www.google.com/*
// ==/UserScript==

var nodes = ['hplogoi', 'gbprw'];

var node;
for (var i = 0; i < nodes.length; i++) {
  node = document.getElementById(nodes[i]);
  node && node.parentNode.removeChild(node);
}