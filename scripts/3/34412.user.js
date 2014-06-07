// ==UserScript==
// @name           Countdown Timer (stopwatch)
// @namespace      http://userscripts.org/users/23652
// @description    Counts down from the number of minutes you enter.
// @include        *
// @exclude        about:*
// @exclude        chrome:*
// @copyright      JoeSimmons
// ==/UserScript==

var soundSrc, playerSrc;
soundSrc = "http://chargraph.com/josh/timer/notify.mp3";
playerSrc = "http://www.infowars.com/mediaplayer.swf";

function main() {

// Remove the invisible table that blocks the timer on Google
if(/^http\:\/\/www\.google\.\w+/.test(location.href)) {
var tb = document.body.lastChild;
if(tb && tb.tagName=="DIV") tb.parentNode.removeChild(tb);
}

function r() {alert('You didn\'t enter a valid time\nTry again');window.location.reload();}

var nE = document.createElement("p");
nE.setAttribute('style', 'z-index:999;font-size:72px;position:fixed;top:5px;left:5px;background:url(\'http://i38.tinypic.com/2dlvvc6.jpg\');color:#ddd;border:2px ridge #000;padding:.3em;font-family:verdana;');
nE.setAttribute('id', 'nE');
document.body.appendChild(nE);
var t = prompt('How many minutes to wait?','5');
if(t===null) {document.body.removeChild(nE);return;}
(t==='' || t<1 || /\./.test(t)) ? r() : setTimeout(function(){nE.innerHTML=parseInt(t).toString();},0);
i=parseInt(t);
//nE.style.display='';

function wait() {
if(i===0) {
// Play a sound
var player = document.createElement('embed');
player.src = playerSrc;
player.setAttribute("style", "visibility:hidden;");
player.setAttribute('id', 'timer_sound');
player.setAttribute('flashvars', 'type=mp3&autostart=true&repeat=false&file=' + escape(soundSrc));
document.body.appendChild(player);
setTimeout(function(){var ts=document.getElementById("timer_sound");if(ts){ts.parentNode.removeChild(ts);}}, 5000);
/////////////////////////////////
nE.innerHTML="<p style=\"font:48px verdana;\">Time up\n<br>\n<a style=\"font-size:12px;color:#aaa;text-decoration:underline;cursor:pointer;\" onClick=\"var ne=document.getElementById('nE');ne.parentNode.removeChild(ne);\">Close</a></p>";
var dt = document.title;
setTimeout(function(){document.title='Time up';},500);
setTimeout(function(){document.title=dt;},1000);
setTimeout(function(){document.title='Time up';},1500);
setTimeout(function(){document.title=dt;},2000);
setTimeout(function(){document.title='Time up';},2500);
setTimeout(function(){document.title=dt;},3000);
setTimeout(function(){document.title='Time up';},3500);
setTimeout(function(){document.title=dt;},4000);
clearInterval(intV);
return;
}
else {
nE.innerHTML=i.toString();
i--;
}
}

wait();
var intV = setInterval(wait, 60*1000);

}

window.addEventListener('load', main, false);