// ==UserScript==
// @name alarm
// @namespace trar
// @include http://*.grepolis.*/game/building_farm?town_id=*
// @description version 0.26 - Angriffswarner geht nur wenn du auf den "Farm" (später in Mauer ändern, sonst Redundanz!)gehst. Miliz wird in allen Städten einberufen!
// ==/UserScript==

if (typeof unsafeWindow === 'object'){
uW = unsafeWindow;
} else {
uW = window;
}
var fenster_offen = 0
var uW;
var senden = 0
var $ = uW.jQuery;
var time = 20000; //in milli sec ein sec = 1000 milli sec
var sound = "http://www.rehker.com/sound/sirene-01.WAV";
var str = document.createElement('audio');
var $str = $(str);
$str.attr('src', sound);

if(document.getElementById("game_incoming")){
str.load();
str.play(0);

// Test für Miliz
// document.getElementById('request_militia_button').submit();
// ggf. wieder löschen !!! 

// weitere Stadtfenster öffnen !!!
// if (fenster_offen = 0) {
// meinFenster01 = window.open('http://de10.grepolis.com/game/building_farm?town_id=p25907', 'Platopolis 01');
// meinFenster02 = window.open('http://de10.grepolis.com/game/building_farm?town_id=p28519', 'Platopolis 02');
// meinFenster03 = window.open('http://de10.grepolis.com/game/building_farm?town_id=p28290', 'Platopolis 03');
// fenster_offen = 1
// }

}
window.setTimeout("window.location.reload()", time); 



