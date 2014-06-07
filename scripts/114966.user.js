// ==UserScript==
// @name           Endless Video loop play only three times
// @namespace      http://kodewerx.org/
// @include        http://endlessvideo.com/*v=*
// ==/UserScript==

unsafeWindow.playthismanytimes=3;
var isSet=false;

unsafeWindow.playonly = function() {
  var currentone=parseInt(document.getElementById("part_loop_count").innerHTML)+parseInt(document.getElementById("loop_count").innerHTML);
  if(currentone>=unsafeWindow.playthismanytimes) {
    isSet=false;
    setTimeout('document.getElementById("ytapiplayer").pauseVideo()', 200);
  } else {
    setTimeout("playonly()", 1250);
  }
}

unsafeWindow.onemoretime = function() {
  document.getElementById("loop_count").innerHTML="0";
  document.getElementById("part_loop_count").innerHTML="0";
  unsafeWindow.playthismanytimes=parseInt(prompt("Play this many times:", unsafeWindow.playthismanytimes));
  if(!isSet)
    unsafeWindow.playonly();
  isSet=true;
}

var buttonStyle="text-align: center; padding: 10px; cursor: pointer; text-decoration: underline; font-weight: bold; color: red; font-size: 14px;"
var addbutton = document.getElementById("addthis_button").parentNode.parentNode;
addbutton.innerHTML="<div onclick='onemoretime();' style='"+ buttonStyle +"'>Not Endless, play X times...</div>"+addbutton.innerHTML;