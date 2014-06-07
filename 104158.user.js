// ==UserScript==
// @name          videobb nice fullscreen (chrome only)
// @description This script will take out ALL videobb website and leave only the fullscreen video. Hit ctrl+shift+F (or Cmd+shift+F) to go fullscreen. Then bring your cursor at the bottom left: it will totally hide the player bar! Leave fullscreen with the same keybord shortcut. (If you can't quit fullscreen, first click at the very bottom left once and try again)
// @include       http://videobb.com/video/*
// ==/UserScript==

var flHTML = document.getElementById("videoPlayer").getElementsByTagName("object")[0].innerHTML;
//document.getElementById("videoPlayer").getElementsByTagName("object")[0].innerHTML="";

document.body.innerHTML=flHTML+
'<div style="height:37px;width:100%;background-color:#000;position:absolute;bottom:0;left:0;display:none;" id="mask"></div>'+
'<div style="height:2px;width:2px;position:absolute;bottom:0;left:0;" onmouseover="javascript:document.getElementById(\'mask\').style.display=\'block\';" onmouseout="javascript:document.getElementById(\'mask\').style.display=\'none\';"></div>';


var fl=document.getElementsByTagName("embed")[0];


fl.style.width="100%";
fl.style.height="100%";