// ==UserScript==
// @name           Add Like in New Window
// @namespace      http://8bitcollective.com/music
// @include        http://8bitcollective.com/music/*
// @description    This modifies the 'Add Like' links on 8bitcollective's song pages so that they open in new windows rather than redirecting the current window in the middle of a song.
// ==/UserScript==


var links = document.getElementsByTagName('a');

for(var i = 0; i < links.length; i++)
{
  var link = links[i];
  var url = link.href.toString();
  if(url.match("action=like")){
    link.target="_blank";
  }
}