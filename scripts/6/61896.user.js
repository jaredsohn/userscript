// ==UserScript==
// @name           TMSteroids
// @namespace      com.exeqt.tmsteroids
// @include        http://trophymanager.com/livematch*
// ==/UserScript==

document.getElementById('fill').innerHTML='';
var llk = document.getElementById("livelivekamp");
llk.innerHTML = llk.innerHTML.replace('livematch.swf', 'livekamp_a.swf');
