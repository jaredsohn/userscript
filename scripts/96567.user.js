// ==UserScript==
// @name           RainyVolume
// @namespace      http://kodewerx.org/
// @include        http://www.rainymood.com/
// ==/UserScript==
document.getElementsByTagNameNS("*","embed")[0].parentNode.innerHTML='' + 
'<object width="300" height="16">' + 
'<embed src="http://www.rainymood.com/audio/RainyMood.mp3" autostart="true" loop="true" width="300" height="16" ' + 
'controller="true"></embed>' + 
'</object>';