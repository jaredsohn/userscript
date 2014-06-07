// JavaScript Document
// ==UserScript==
// @name          Rohstoffe verschicken
// @namespace     Domi
// @description   Version 1.6: Update auf DS 7.0
// @include       http://de*.die-staemme.de/game.php*screen=market*   
// ==/UserScript==


//Konfiguration Hotkeys kann von jedem Spieler angepasst werden
var Rohstoffe_verschicken = 86;		//Standard: v/86
var OK_auf_Bestaetigungsseite = 13;	//Standard: enter/13
var naechstesdorf = 82;			//Standard: r/82
var vorherigesdorf = 87;		//Standard: w/87


// AB HIER NICHTS MEHR VERÄNDERN****************************************************************************************

// Auslesen und Berechnen der Daten
var server = document.location.host.split('.')[0];
var konti = document.getElementsByTagName('B')[0].innerHTML;
var x = konti[1]+konti[2]+konti[3];
var y = konti[5]+konti[6]+konti[7];
var koords = x + y;
var zkoords = 0;
var wood = parseInt(document.getElementById('wood').innerHTML);
var stone = parseInt(document.getElementById('stone').innerHTML);
var iron = parseInt(document.getElementById('iron').innerHTML);


// hotkeys verwenden
function keyUpHandler(e)
{
  if( e.target.nodeName == "INPUT" && e.target.type == "text")
  {
    return;
  }
  if( e.target.nodeName != "TEXTAREA" )
  {
    //storage.log( "Key up: " + e.which );
    for( var i = 0; i < hotKeys.length; i++ )
    {
      if( hotKeys[i].key == e.which )
      {
        if( hotKeys[i].func )
          hotKeys[i].func(e);
        if( hotKeys[i].href )
          location.href = hotKeys[i].href;
        if( hotKeys[i].event )
          fireEvent( document.getElementById(hotKeys[i].event.id), hotKeys[i].event.event );
      }
    }
  }
}
window.addEventListener("keyup", keyUpHandler, false );
var hotKeys = [];
if(document.getElementsByClassName('menu quickbar')[0]){
hotKeys.push( { key: Rohstoffe_verschicken, func: Daten_eintragen } );
hotKeys.push( { key: naechstesdorf, func: dorfweiter } );
hotKeys.push( { key: vorherigesdorf, func: dorfzurueck } );
if (location.href.match('&try=confirm_send')) {
    hotKeys.push( { key: OK_auf_Bestaetigungsseite, func: klick } );
}
}

// Daten eintragen
function Daten_eintragen() {
    var h = document.getElementsByTagName('th')[1].firstChild.data;
    var hn = h.split(' ');
    h = hn[2];
    var save = GM_getValue(server + '_Einstellungen', '0,0,0');
    var woodu = parseInt(save.split(',')[0]);
    var stoneu = parseInt(save.split(',')[1]);
    var ironu = parseInt(save.split(',')[2]);
    var save_res = woodu + stoneu + ironu;
    if(woodu > wood) {
        wood = 0;
    }
    else {
        wood = wood - woodu;
    }
    if(stoneu > stone) {
        stone = 0;
    }
    else {
        stone = stone - stoneu;
    }
    if(ironu > iron) {
        iron = 0;
    }
    else {
        iron = iron - ironu;
    }
    var res = wood + stone + iron;
    
    if(h > res) {
        var inswood = wood;
        var insstone = stone;
        var insiron = iron;
    }
    else {
        var inswood = Math.floor(wood / res * h);
        var insstone = Math.floor(stone / res * h);
		var insiron = Math.floor(iron / res * h);
	}

    var test = GM_getValue(server + '_' + koords, '0');
    if(test == 0) {
        zkoords = prompt('Geb die Koordinaten des Zieldorfs ein:', '');
        GM_setValue(server + '_' + koords, zkoords);
    }
    else {
        zkoords = GM_getValue(server + '_' + koords, zkoords);
    }
    var z = zkoords.split('|');
    var zx = z[0];
    var zy = z[1];
    document.getElementsByTagName('input')[7].value = inswood;
    document.getElementsByTagName('input')[8].value = insstone;
    document.getElementsByTagName('input')[9].value = insiron;
    document.getElementsByTagName('input')[10].value = zx;
    document.getElementsByTagName('input')[11].value = zy;
    document.getElementsByTagName('input')[12].click();
}

// Daten löschen
function Ress_loeschen() {
    var loesch = confirm('Willst du die Koordinaten wirklich löschen?');
    if (loesch == true) {
        GM_deleteValue(server + '_' + koords);
    }
    else if(loesch == false){}
}

function Einstellungen() {
    var test = GM_getValue(server + '_Einstellungen', "0");
    if(test == 0) {
        var woodu = prompt('Wie viel Holz soll auf jeden Fall in den Dörfern bleiben?', '0');
        var stoneu = prompt('Wie viel Lehm soll auf jeden Fall in den Dörfern bleiben?', '0');
        var ironu = prompt('Wie viel Eisen soll auf jeden Fall in den Dörfern bleiben?', '0');
    }
    else {
        var woodu = prompt('Wie viel Holz soll auf jeden Fall in den Dörfern bleiben?', test.split(',')[0]);
        var stoneu = prompt('Wie viel Lehm soll auf jeden Fall in den Dörfern bleiben?', test.split(',')[1]);
        var ironu = prompt('Wie viel Eisen soll auf jeden Fall in den Dörfern bleiben?', test.split(',')[2]);
    }
    var save = woodu + ',' + stoneu + ',' + ironu;
    GM_setValue(server+ '_Einstellungen', save);
}

// Erzeugen der Links
function link() {
    var tbody = document.getElementsByClassName('vis')[0].getElementsByTagName('tbody')[0];
    if(tbody) {
        var atr1 = document.createElement('tr');
        var atr2 = document.createElement('tr');
        var atr3 = document.createElement('tr');
        tbody.appendChild(atr1);
        tbody.appendChild(atr2);
        tbody.appendChild(atr3);
        var atd1 = document.createElement('td');
        var atd2 = document.createElement('td');
        var atd3 = document.createElement('td');
        atr1.appendChild(atd1);
        atr2.appendChild(atd2);
        atr3.appendChild(atd3);
        if(atd1) {
            var aa = document.createElement('a');
            aa.innerHTML = 'Verschicken';
            aa.setAttribute('href', '#');
            aa.addEventListener('click', function() {Daten_eintragen()}, false);
            atd1.appendChild(aa);
        }
        if(atd2) {
            var bb = document.createElement('b');
            bb.innerHTML = 'Ress löschen';
            bb.setAttribute('href', '#');
            bb.addEventListener('click', function() {Ress_loeschen()}, false);
            atd2.appendChild(bb);
        }
        if(atd3) {
            var cc = document.createElement('a');
            cc.innerHTML = 'Einstellungen';
            cc.setAttribute('href', '#');
            cc.addEventListener('click', function() {Einstellungen()}, false);
            atd3.appendChild(cc);
        }
    }
}

function dorfweiter() {
    var dorf = document.getElementById('menu_row2').parentNode.parentNode.rows[0].cells[3].getElementsByTagName('a')[0].href;
    window.location.href = dorf;
}

function dorfzurueck() {
    var dorf = document.getElementById('menu_row2').parentNode.parentNode.rows[0].cells[2].getElementsByTagName('a')[0].href;
    window.location.href = dorf;
}

function klick () {
    document.getElementsByTagName('input')[6].click();
}

if ( location.href.match('screen=market&mode=own_offer') || 
	location.href.match('screen=market&mode=other_offer') ||
	location.href.match('screen=market&mode=traders') ||
	location.href.match('screen=market&mode=all_own_offer') ||
    location.href.match('&try=confirm_send')) { 
}
else {
    if(document.getElementsByClassName('menu quickbar')[0]){
        link();
    }
}