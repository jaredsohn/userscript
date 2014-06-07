// ==UserScript==
// @name           nambafix
// @description   Fix for namba.kz
// @include        http://*namba.kz*
// @include        http://*homekino.kz*
// @include        http://*mirkino.kz*
// @include        http://*keremet.kz*
// @include        http://*mytv.kz*
// @include        http://*intportal.kz*
// ==/UserScript==

playerold = 'video.namba.kz/swf/player/3.2.8/flowplayer-3.2.8.swf';
playernew ='video.namba.kz/swf/flowplayer-3.1.5.swf';
document.body.innerHTML = document.body.innerHTML.replace(playerold,playernew);
input = 'flashvars-3.2.8.php';
output ='flashvars.php';
document.body.innerHTML = document.body.innerHTML.replace(input,output);
