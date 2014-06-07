// ==UserScript==
// @name Minimal Tetris Arena Low
// @namespace http://userscripts.org/scripts/show/215229
// @description Reduces lag as much as possible by removing everything from the page except for the game itself.
// @include http://*tetrisfriends.com/games/Live/game.php*
// @grant none 
// @version 23 December 2013 v2.09
// @author knux
// ==/UserScript==
addEventListener("DOMContentLoaded", 
function(){
var bodyStr = '<object type="application/x-shockwave-flash" allowscriptaccess="always" data="/data/games/Live/OWGameTetrisLive.swf?livebust=0165?version=0" width="946" height="560" id="contentFlash" style="visibility: visible;">' + 
'<param name="wmode" value="window">' + document.getElementsByName("flashvars")[0].outerHTML +
'<param name="quality" value="low">' + 
'</object>';
    document.head.innerHTML = '<style> body { background: url(http://tetrisow-a.akamaihd.net/data4_0_0_1/images/bg.jpg) repeat-x; font-family: "Trebuchet MS",Helvetica,Tahoma,Geneva,Verdana,Arial,sans-serif; font-size: 12px; color: #666; margin: 0; text-align: center; display: block; } object { margin: 20px; }* { margin: 0; padding: 0; outline: none; -moz-box-sizing: border-box; box-sizing: border-box; } </style>'
document.body.innerHTML = bodyStr;
startScript = document.createElement("script");
startScript.innerHTML = 
'var sArenaTimes = 3; function startArena(){try{document.getElementById("contentFlash").style.visibility="visible"; document.getElementById("contentFlash").as3_prerollDone();}catch(err){}; if(sArenaTimes){sArenaTimes--; setTimeout(startArena, 1000)}}; startArena();'
document.body.appendChild(startScript);
})