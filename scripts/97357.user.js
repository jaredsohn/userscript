// ==UserScript==
// @name          Angriffe und Unterstützungen im Spielerprofil
// @namespace     Domi
// @description   Version 1.0: Eigene Angriffe und Unterstützungen werden im Spielerprofil anderer Spieler angezeigt.
// @include       http://de*.die-staemme.de/game.php?*mode=commands*
// @include       http://de*.die-staemme.de/game.php?*&screen=info_player*
// ==/UserScript==

// images
var bilder = [ { name: "attack",    img: '<img src="graphic/command/attack.png" border="0"/>'},
               { name: "help",      img: '<img src="graphic/command/support.png" border="0"/>'} ];

// Angriffe und Unterstuetzungen einlesen und in GM speichern
var server = document.location.host.split('.')[0];
var koord = 0;
var ang = '';
var unt = '';
if ( location.href.match('mode=commands')) {
    var tab = document.getElementsByClassName('vis')[4];
    var max = tab.rows.length - 1;
    for(var i =0; i < max; i++) {
        var a = document.getElementsByClassName('content-border')[0].getElementsByTagName('span')[1+3*i].innerHTML.split('(')[1];
        koord = a.split(')')[0];
        var typ = document.getElementsByClassName('content-border')[0].getElementsByTagName('span')[1+3*i].innerHTML[0];
        if(typ == 'A') {
            ang = ang + koord + ',';
        }
        if(typ == 'U') {
            unt = unt + koord + ',';
        }
    }
    GM_setValue(server + '_Angriffe', ang);
    GM_setValue(server + '_Unterstuetzungen', unt);
}

// Angriffe und Unterstützungen auf Spielerprofil anzeigen
function anzeigen() {
    ang = GM_getValue(server + '_Angriffe', ang);
    unt = GM_getValue(server + '_Unterstuetzungen', unt);
    var tab = document.getElementsByClassName('vis')[1];
    var max = tab.rows.length - 1;
    var anglang = ang.length / 8;
    var untlang = unt.length / 8;
    for(var i =0; i < max; i++) {
        var koord1 = document.getElementsByClassName('vis')[1].getElementsByTagName('tr')[1+ i].getElementsByTagName('td')[1].innerHTML;
        var count_ang = 0;
        var count_unt = 0;
        for(var j = 0; j < anglang; j++) {
            var koord2 = ang.split(',')[0+j];
            if(koord2 == koord1) {
                count_ang++;
            }
        }
        for(var k = 0; k < untlang; k++) {
            var koord2 = unt.split(',')[0+k];
            if(koord2 == koord1) {
                count_unt++;
            }
        }
        if(count_ang == 0 & count_unt ==0) {
        }
        else {
            var b = document.getElementsByClassName('vis')[1].getElementsByTagName('tr')[1+ i].getElementsByTagName('td')[0];
            var aa = document.createElement('td');
            aa.innerHTML = bilder[0].img + '(' + count_ang + ') | ' + bilder[1].img + '(' + count_unt + ')';
            b.parentNode.insertBefore(aa, b);
        }
    }
    
}

// Links erzeugen
if ( location.href.match('&screen=info_player')) {
    var c = document.getElementsByClassName('vis')[1];
    if (c) {
        var cc = document.createElement('a');
        cc.innerHTML = 'Angriffe und Unterstützungen anzeigen';
        cc.setAttribute('href', '#');
        cc.addEventListener('click', function() { anzeigen() }, false);
        c.parentNode.insertBefore(cc, c);
    }
}
