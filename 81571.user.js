// ==UserScript==
// @name alarm
// @namespace trar
// @include http://*.grepolis.*/game/building_wall?town_id=*
// @description angriffswarner geht nur wenn du auf stadtmauer gehst
// ==/UserScript==

if (typeof unsafeWindow === 'object'){
uW = unsafeWindow;
} else {
uW = window;
}

var uW;
var $ = uW.jQuery;
var time = 8000; //in milli sec ein sec = 1000 milli sec
var sound = "http://www.villaruth.net/stregthen.wav";
var str = document.createElement('audio');
var $str = $(str);
$str.attr('src', sound);

if(document.getElementById("game_incoming")){
str.load();
str.play(0);
}

window.setTimeout("window.location.reload()", time); 



