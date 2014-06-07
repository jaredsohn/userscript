// ==UserScript==
// @name           Forumwarz - Topic icon autoselector
// @namespace      Forumwarz - Topic icon autoselector
// @description    Auto-selects the "Sports" topic icon
// @include        http://*.forumwarz.com/discussions/post/*
// @include        http://forumwarz.com/discussions/post/*
// ==/UserScript==

var inputs = document.getElementsByTagName("input");

for(var input in inputs) {
 if(inputs[input].value == 126) {
  inputs[input].checked = true;
  break;
 }
}