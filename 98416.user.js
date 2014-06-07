// ==UserScript==
// @name           alarm-nemexia-randomized
// @namespace      alarm-nemexia-randomized
// @include        http://game.nemexia.ru/fleets.php
// ==/UserScript==

if (typeof unsafeWindow === 'object'){
uW = unsafeWindow;
} else {
uW = window;
}

function rnd(){
	var m = 99;
	var n = 199;
	var r = Math.floor( Math.random( ) * (n - m + 1) ) + m;
	return r;
}

var uW;
var $ = uW.jQuery;
var r = rnd();
var time = r*1000; //in milli sec 1 sec = 1000 milli sec
var sound = "http://ftp.tux.org/pub/X-Windows/games/freeciv/incoming/sounds/sonar2.wav";
var str = document.createElement('audio');
var $str = $(str);
$str.attr('src', sound);

if(document.getElementById("newAttackMsg")){
str.load();
str.play(0);
}

window.setTimeout("window.location.reload()", time);