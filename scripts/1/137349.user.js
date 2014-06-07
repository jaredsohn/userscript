// ==UserScript==
// @name            STOP
// @description     "Wpis prawdopodobnie poniżej poziomu"
// @version         1.0
// @author          Wywrot4
// @include         http://*kostkarubika.org/forum/shoutbox_view.php

// ==/UserScript==


//Tutaj podajemy ID użytkownika którego wiadomości nie będą pokazywane
var trolls=new Array();
    trolls[0]="151"; //lukaseror
	trolls[1]="735"; //Ezy Ryder
	trolls[2]="191"; //mokra
	trolls[3]="2585"; //osiol
	trolls[4]="2499"; //wania



//Jeśli nie wiesz co robisz, pozostaw to tak jak jest ;)
function troll(url) {
    for(var i=0; i < trolls.length; i++) if('http://'+location.hostname+'/forum/profile.php?mode=viewprofile&u='+trolls[i] == url) return true;
    return false;
}


var els=document.getElementsByTagName('td');
for(i=0;i<els.length; i++){
    var url = document.getElementsByTagName('td')[i].getElementsByTagName('a')[0].href;
    if (troll(url)){
	var wpis=document.getElementsByTagName('td')[i].getElementsByClassName('gensmall')[1].innerHTML;
	document.getElementsByTagName('td')[i].getElementsByClassName('gensmall')[1].innerHTML = '<i><b onmouseover="getElementById(\''+i+'\').style.display = \'block\'; getElementById(\''+i+'\').style.border = \'red 1px dotted\'; getElementById(\''+i+'\').style.padding = \'2px\';" onmouseout="document.getElementById(\''+i+'\').style.display = \'none\';" style="cursor:pointer;"> Wpis prawdopodobnie poni&#380;ej poziomu</b></i><span id="'+i+'" style="display: none">'+wpis+'</span>';
    }

}