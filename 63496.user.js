// ==UserScript==
// @name           Remove Banner/pbp
// @namespace      
// @description    
// @include        http://goallineblitz.com/game/replay.pl?*
// @exclude        
// ==/UserScript==



document.getElementById('header').setAttribute ("style","height:0px;");
document.getElementById('toolbar').setAttribute ("style","positioning: absolute; top: 0px;");
document.getElementById('content').setAttribute ("style","positioning: relative; top: -75px;");