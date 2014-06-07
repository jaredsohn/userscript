// ==UserScript==
// @name                     DS_Nachtbonus
// @namespace                c1b1.de
// @author                   c1b1, Peety
// @description              v1.21 Ankunftszeiten im Nachtbonus rot hervorheben
// @include                  *.*staemme.*/game.php?*screen=place*try=confirm*
// ==/UserScript==


var td = document.getElementById('date_arrival');
var id = td.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.firstChild.nextSibling.firstChild.href.split('=').pop();
var server = document.location.host.split('.')[0];
var s = /[de,ch](\d+)/;
var nighttime = 0;

if (s.test(server)) {                                                                // SDS- und Classic-Welten ausfiltern
        if (document.body.innerHTML.match(/Uslogge/)){                // schweiz
                var world = server.match(/ch(\d+)/);
                //Welt Schweiz 1,2,3,4,5,6,7,8,.,.,.,.,.,.,.  - bei neuen Welten hier Ã¤ndern
                var swiss = [0,8,8,7,8,7,7,7,7,7,8,7,8,8,8,8];
                nighttime = swiss[world[1]];
        }
        else {                                                                                // deutsch
                var world = server.match(/de(\d+)/);
                //        Zehnerstelle der Welt:  1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 3 3 3 3 3 3 3 3 3 3 4 4 4 4 4 4 4 4 4 4 5 5 5 5 5
                // Welt deutsch 1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,.,.,.,.,.,.,.,. - bei neuen Welten hier Ändern
                var german = [0,0,0,0,0,0,7,7,7,0,8,8,8,8,8,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,7,8,0,8,8,8,8,8,7,8,8,8,8,8,8,8,8,8,7,8,8,8,8];
                nighttime = german[world[1]];
        }
}


if((nighttime > 0) && (id != '')) {
        var time = td.firstChild.data.match(/(\d{1,2}\:\d{1,2})/g)[0].split(':');
        if(time[0][0] == '0') time[0] = time[0][1];
        if( parseInt(time[0]) < nighttime) {
                if (document.body.innerHTML.match(/<input name=\"support/)){                 // Unterstützung
                        td.setAttribute('style','white-space: nowrap; border: green 2px solid');
                }
                else {                                                                                                         // Angriff
                           td.setAttribute('style','white-space: nowrap; border: red 2px solid');
                }
                var text = document.createElement('span');
                text.setAttribute('style','font-weight:bolder; color:darkred; ');
                text.appendChild(document.createTextNode(' <--Nachtbonus!'));
                td.appendChild(text);
        }
}