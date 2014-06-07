// ==UserScript==
// @name           Derpy Orangered (With OverEncumbered Derpy)
// @namespace      http://www.reddit.com/r/mylittlepony/
// @description    Replace your orangereds with Derpy!
// @include        http://www.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

var haveMailImage = "http://i.imgur.com/60dqX.png";
var noMailImage = "http://i.imgur.com/YFUnk.png";
var haveMailHeight = 41;
var haveMailWidth = 39;
var noMailHeight = 41;
var noMailWidth = 39;
    
function addGlobalStyle(css)
{
  var style, head = document.getElementsByTagName('head')[0];
  if (!head) return;

  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}
    
addGlobalStyle("#mail.havemail { background-image:url(http://i.imgur.com/60dqX.png); background-position: bottom left; height:" + haveMailHeight + "px; width: " + haveMailWidth + "px;}");
addGlobalStyle("#mail.nohavemail { background-image:url(http://i.imgur.com/YFUnk.png); background-position: bottom left; height:" + noMailHeight + "px; width: " + noMailWidth + "px;}");