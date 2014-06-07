// ==UserScript==
// @name          Angriffe und Unterstützungen im Spielerprofil
// @namespace     Domi
// @description   Version 1.2.1: Eigene Angriffe,Unterstützungen und Rückkehr werden im Spielerprofil anderer Spieler angezeigt.
// @include       http://de*.die-staemme.de/game.php?*mode=commands*
// @include       http://de*.die-staemme.de/game.php?*&screen=info_player*
// ==/UserScript==

// images 

var bilder = [ { name: "attack",    img: '<img src="graphic/command/attack.png" border="0"/>'},
               { name: "help",      img: '<img src="graphic/command/support.png" border="0"/>'},
               { name: "return",    img: '<img src="graphic/command/return.png" border="0"/>'}
             ];

// Angriffe und Unterstuetzungen einlesen und in GM speichern

var server = document.location.host.split('.')[0];
var koord = 0;
var ang = '';
var unt = '';
var zur = '';

if ( location.href.match('mode=commands')){
	var tab = document.getElementsByClassName('vis')[5];
	var max = tab.rows.length - 2;
  for(var i =0; i < max;i++){
    var a = document.getElementById('labelText[' + i + ']').innerHTML.split('(')[1];
    koord = a.split(')')[0];
    var typ = document.getElementById('labelText[' + i + ']').innerHTML.substr(0, 2);
    if(typ == 'An'){
      ang = ang + koord + ',';
    }
    if(typ == 'Un'){
      unt = unt + koord + ',';
    }
    if(typ == 'Rü'){
    	zur = zur + koord + ',';
    }
  }
	GM_setValue(server + '_Angriff', ang);
  GM_setValue(server + '_Unterstuetzung', unt);
  GM_setValue(server + '_Rueckkehr', zur);
}
	
// Angriffe und Unterstützungen auf Spielerprofil anzeigen

function anzeigen(){
	ang = GM_getValue(server + '_Angriff', ang);
  unt = GM_getValue(server + '_Unterstuetzung', unt);
  zur = GM_getValue(server + '_Rueckkehr', zur);
  var tab = document.getElementsByClassName('vis')[2];
  var max = tab.rows.length - 1;
  var anglang = ang.length / 8;
  var untlang = unt.length / 8;
  var zurlang = zur.length / 8;
  for(var i =0; i < max; i++){
  	var koord1 = document.getElementsByClassName('vis')[2].getElementsByTagName('tr')[1+i].getElementsByTagName('td')[1].innerHTML;
//kompatibilität anfang
		if(koord1.substr(1, 1) == 'a'){
			var koord1 = document.getElementsByClassName('vis')[2].getElementsByTagName('tr')[1+i].getElementsByTagName('a')[4].innerHTML;
		}
//kompatibilität ende
    var count_ang = 0;
    var count_unt = 0;
    var count_zur = 0;
    for(var j = 0; j < anglang; j++){
    	var koord2 = ang.split(',')[0+j];
    	if(koord2 == koord1){
      	count_ang++;
      }
    }
    for(var k = 0; k < untlang; k++){
    	var koord2 = unt.split(',')[0+k];
      if(koord2 == koord1){
      	count_unt++;
      }
    }
    for(var l = 0; l < zurlang; l++){
    	var koord2 = zur.split(',')[0+l];
      if(koord2 == koord1){
      	count_zur++;
      }            
    }
    if(count_ang == 0 & count_unt == 0 & count_zur == 0){
    }
    else{
    	var b = document.getElementsByClassName('vis')[2].getElementsByTagName('tr')[1+i].getElementsByTagName('td')[0].getElementsByTagName('a')[0];
    	var aa = document.createElement('td');
      aa.innerHTML = bilder[0].img + '(' + count_ang + ') | ' + bilder[1].img + '(' + count_unt + ') | ' + bilder[2].img + '(' + count_zur + ')';
      b.parentNode.insertBefore(aa, b);
    }
  }
}

// Link erzeugen

if(location.href.match('&screen=info_player')){
	var c = document.getElementsByClassName('vis')[2];
  if (c){
  	var cc = document.createElement('a');
    cc.innerHTML = 'Befehle anzeigen';
    cc.setAttribute('href', '#');
    cc.addEventListener('click', function() { anzeigen() }, false);
    c.parentNode.insertBefore(cc, c);
  }
}
