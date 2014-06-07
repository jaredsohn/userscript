// ==UserScript==
// @name Minimal Tetris Friends
// @namespace minimaltetrisfriends
// @description /Reduces lag as much as possible by removing everything from the page except for the games themselves.
// @include http://*tetrisfriends.com/games/Ultra/game.php*
// @include http://*tetrisfriends.com/games/Sprint/game.php*
// @include http://*tetrisfriends.com/games/Live/game.php*
// @grant none 
// @version 26 March 2014 v2.10
// @author knux
// ==/UserScript==
addEventListener("DOMContentLoaded", 
function(){
var gameNameStr = "", gameWidth, gameHeight, gameURL;
if(location.href.indexOf("Ultra") != -1)
{
gameNameStr = "Ultra";
gameWidth = 760;
gameHeight = 560;
gameURL = "http://tetrisow-a.akamaihd.net/data4_0_0_1/games/Ultra/OWGameUltra.swf?version=3";
}
if(location.href.indexOf("Sprint") != -1)
{
gameNameStr = "Sprint";
 gameWidth = 760;
gameHeight = 560;
gameURL = "http://tetrisow-a.akamaihd.net/data4_0_0_1/games/Sprint/OWGameSprint.swf?version=3";
}
if(location.href.indexOf("Live") != -1)
{
gameNameStr = "Live";
gameWidth = 946;
gameHeight = 560;
gameURL = "http://www.tetrisfriends.com/data/games/Live/OWGameTetrisLive.swf?livebust=0165?version=0";
}
setTimeout(gamePrerollComplete, 1000);
var bodyStr = '<object type="application/x-shockwave-flash" allowscriptaccess="always" data="' + gameURL + '" width="' + gameWidth + '" height="' + gameHeight + '" id="contentFlash" style="visibility: visible;">' +
'<param name="wmode" value="window">' + document.getElementsByName("flashvars")[0].outerHTML +
'<param name="quality" value="low">' + 
'</object>';
document.head.innerHTML = '<style> body { background: url(http://tetrisow-a.akamaihd.net/data4_0_0_1/images/bg.jpg) repeat-x; font-family: "Trebuchet MS",Helvetica,Tahoma,Geneva,Verdana,Arial,sans-serif; font-size: 12px; color: #666; margin: 0; text-align: center; display: block; } object { margin: 20px; }* { margin: 0; padding: 0; outline: none; -moz-box-sizing: border-box; box-sizing: border-box; } </style>';
document.body.innerHTML = bodyStr;

if(gameNameStr == "Live")
{
startScript = document.createElement("script");
startScript.innerHTML = 
'var sArenaTimes = 5; function startArena(){if(contentFlash.TotalFrames){try{contentFlash.style.visibility="visible"; contentFlash.as3_prerollDone();}catch(err){}}else{setTimeout(startArena, 1000); return}; sArenaTimes--; setTimeout(startArena, 1000)}; startArena();'
document.body.appendChild(startScript);
}
})