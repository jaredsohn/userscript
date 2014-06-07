// ==UserScript==
// @name           Alles und jeden Zuspammer fuer alle Pennergames Hamburg Berlin Muenchen by Boggler
// @author         Boggler @ Pennerhack ( visit: http://pennerhack.foren-city.de/ )
// @namespace      Boggler @ Pennerhack ( visit: http://pennerhack.foren-city.de/ )
// @description    Mit diesem Script kann man alles und jeden zuspammen 2Pn Optionen ausserdem Shoutbox und Bandenforum Funktion!
// @include        http://*pennergame.de*
// @include        http://*menelgame.pl*
// @include        http://*clodogame.fr*
// @include        http://*mendigogame.es*
// @include        http://*dossergame.co.uk*
// @include        http://*serserionline.com*
// @include        http://*bumrise.com*
// @include        http://*bichionline.ru*
// @include        http://*pivetgame.com.br*
// @exclude        http://*board*
// @exclude        http://*redirect*
// @version		   1.2
// @license	   Creative Commons by-nc-sa
// ==/UserScript==


// Dieses Script ist Creative commons by-nc-sa lizensiert
// Dieses Script ist Copyright by Boggler & syme @ Pennerhack ( visit: http://pennerhack.de.tc/ )


//Item einfuegen und Auswahlmenue erzeugen
var div_settingpoint = document.getElementsByClassName('settingpoint');
var div_tieritemA = document.getElementsByClassName('tieritemA');
newdiv = document.createElement('div');
newdiv.setAttribute('class', 'tieritemA');
newdiv.style.width = "500px";
newdiv.innerHTML = '<h1>Alles und jeden Spammer by Boggler </h1><div id="spammer"></div><br><div id="log"></div>';
div_settingpoint[0].insertBefore(newdiv, div_tieritemA[div_tieritemA.length - 5]);
document.getElementById('spammer').innerHTML = '<b><br>Dieses Script ist lediglich zum Testen bereitgestellt.<br>Durch die Benutzung dieses Scriptes verst&ouml;&szlig;t man gegen die AGB von Pennergame<br>Daher darf das Script nur zum Test und nicht zum dauerhaften Gebrauchverwendet werden.</b><br>Was willst du spammen? <br><select id="auswahl"><option value="0">Bitte ausw&auml;hlen</option><option value="1">Nachrichten an alle</option><option value="2">Nachrichten an einen</option><option value="3">Bandenshoutbox</option><option value="4">Bandenforum</option></select><br><div id="einzelfeld"></div>';

//Funktion zum Wechseln
document.getElementById('auswahl').addEventListener('change', function wechseln() {

    var id = document.getElementById('auswahl').value;
    //Wenn nichts gewaehlt
    if (id == '0') {
        document.getElementById('einzelfeld').innerHTML = '';
    }
    //Wenn Nachricht an alle gewaehlt
    if (id == '1') {
        document.getElementById('einzelfeld').innerHTML = '<br>An folgende Ids: <br>Von: <input type="text" id="von" value="' + GM_getValue('von') + '" size="3"> Bis: <input type="text" id="bis" value="' + GM_getValue('bis') + '" size="4">' + '<br>Betreff: <input type="text" id="betreff" value="' + GM_getValue('betreff') + '"><br>Nachricht:<br><textarea id="spamtext" cols="86" rows="5">' + GM_getValue('mailtext') + '</textarea><br>' + 'Wartezeit(in sec): <input type="text" size="2" id="pause" value="' + GM_getValue('pause') + '"><br><input type="button" id="senden" value="Spam starten">';
        document.getElementById('log').innerHTML += '<b><font style="color:orange">Nachricht an alle (bestimmte Ids) senden gew&auml;hlt.</font></b><br>';
    }
    //Wenn Nachricht an einen gewaehlt
    if (id == '2') {
        document.getElementById('einzelfeld').innerHTML = '<br>An diesen Spieler:<input type="text" id="spieler" value="' + GM_getValue('spieler') + '"> <br>Anzahl der Nachrichten: <input type="text" id="anzahl" value="' + GM_getValue('anzahl') + '" size="2">' + '<br>Betreff: <input type="text" id="betreff" value="' + GM_getValue('betreff') + '"><br>Nachricht:<br><textarea id="spamtext" cols="86" rows="5">' + GM_getValue('mailtext') + '</textarea><br>' + 'Wartezeit(in sec): <input type="text" size="2" id="pause" value="' + GM_getValue('pause') + '"><br><input type="button" id="senden" value="Spam starten">';
        document.getElementById('log').innerHTML += '<b><font style="color:orange">Nachricht an einen Spieler senden gew&auml;hlt.</font></b><br>';
    }
    //Wenn Bandenshoutbox gewaehlt
    if (id == '3') {
        document.getElementById('einzelfeld').innerHTML = '<br>Bandenshoutboxspam:<br>Anzahl der Eintr&auml;e: <input type="text" id="anzahl" value="' + GM_getValue('anzahl') + '" size="2">' + '<br>Nachricht:<br><textarea id="spamtext"cols="86" rows="5">' + GM_getValue('mailtext') + '</textarea><br>' + 'Wartezeit(in sec): <input type="text" size="2" id="pause" value="' + GM_getValue('pause') + '"><br><input type="button" id="senden" value="Spam starten">';
        document.getElementById('log').innerHTML += '<b><font style="color:orange">Bandenshoutbox zuspammen gew&auml;hlt.</font></b><br>';
    }
    //Wenn Bandenforum gewaehlt
    if (id == '4') {
        document.getElementById('einzelfeld').innerHTML = '<br>Bandenforumspam:<br>Anzahl der Threads: <input type="text" id="anzahl" value="' + GM_getValue('anzahl') + '" size="2">' + '<br>Betreff: <input type="text" id="betreff" value="' + GM_getValue('betreff') + '"><br>Nachricht:<br><textarea id="spamtext" cols="86" rows="5">' + GM_getValue('mailtext') + '</textarea><br>' + 'Wartezeit(in sec): <input type="text" size="2" id="pause" value="' + GM_getValue('pause') + '"><br><input type="button" id="senden" value="Spam starten">';
        document.getElementById('log').innerHTML += '<b><font style="color:orange">Bandenforum zuspammen gew&auml;hlt.</font></b><br>';
    }
    //Damit nicht ueberall undefined steht werden die Werte vordefiniert
    try {
        if (GM_getValue('von') == null) {
            document.getElementById('von').value = '2500';
        }
    } catch(e) {}
    try {
        if (GM_getValue('bis') == null) {
            document.getElementById('bis').value = '2550';
        }
    } catch(e) {}
    try {
        if (GM_getValue('betreff') == null) {
            document.getElementById('betreff').value = 'Geile Scriptseite :D';
        }
    } catch(e) {}
    try {
        if (GM_getValue('mailtext') == null) {
            document.getElementById('spamtext').value = 'Hey habe eine geile Scriptseite entdeckt :D http://pennerhack.foren-city.de/ Da gibt es echt alle legalen PennergameScripte (fuer Greasemonkey)';
        }
    } catch(e) {}
    try {
        if (GM_getValue('pause') == null) {
            document.getElementById('pause').value = '11';
        }
    } catch(e) {}
    try {
        if (GM_getValue('spieler') == null) {
            document.getElementById('spieler').value = '';
        }
    } catch(e) {}
    try {
        if (GM_getValue('anzahl') == null) {
            document.getElementById('anzahl').value = '10';
        }
    } catch(e) {}
    try {
        if (GM_getValue('bildurl') == null) {
            document.getElementById('bildurl').value = '';
        }
    } catch(e) {}

    //Wenn man den Spammer startet
    document.getElementById('senden').addEventListener('click', function senden() {
        var id = document.getElementById('auswahl').value;
        try {
            GM_setValue('von', document.getElementById('von').value);
        } catch(e) {}
        try {
            GM_setValue('bis', document.getElementById('bis').value);
        } catch(e) {}
        try {
            GM_setValue('betreff', document.getElementById('betreff').value);
        } catch(e) {}
        try {
            GM_setValue('mailtext', document.getElementById('spamtext').value);
        } catch(e) {}
        try {
            GM_setValue('pause', document.getElementById('pause').value);
        } catch(e) {}
        try {
            GM_setValue('spieler', document.getElementById('spieler').value);
        } catch(e) {}
        try {
            GM_setValue('anzahl', document.getElementById('anzahl').value);
        } catch(e) {}
        try {
            GM_setValue('bildurl', document.getElementById('bildurl').value);
        } catch(e) {}

        //Fuer jede Option wird die entsprechende Funktion gewaehlt
        if (id == '1') {
            var anzahl = Number(GM_getValue('bis')) - Number(GM_getValue('von'));
            document.getElementById('log').innerHTML += '<b><font style="color:green">Sende nun ' + anzahl + ' Nachrichten an gew&auml;hlte Ids.</font></b><br>';
            var a = 0;
            var i = GM_getValue('von');
            nachrichten(i, a, anzahl);
        }
        if (id == '2') {
            document.getElementById('log').innerHTML += '<b><font style="color:green">Sende nun ' + GM_getValue('anzahl') + ' Nachrichten an ' + GM_getValue('spieler') + '.</font></b><br>';
            var i = 0;
            var a = 0;
            var anzahl = GM_getValue('anzahl');
            nachrichtendizz(i, a, anzahl);
        }
        if (id == '3') {
            document.getElementById('log').innerHTML += '<b><font style="color:green">Schreibe nun ' + GM_getValue('anzahl') + ' Eintraege in die Bandenshoutbox.</font></b><br>';
            var i = 0;
            var a = 0;
            var anzahl = GM_getValue('anzahl');
            bandenshoutbox(i, a, anzahl);
        }
        if (id == '4') {
            document.getElementById('log').innerHTML += '<b><font style="color:green">Erstelle nun ' + GM_getValue('anzahl') + ' Threads in die Bandenshoutbox.</font></b><br>';
            var a = 0;
            var i = 0;
            var anzahl = GM_getValue('anzahl');
            bandenthread(i, a, anzahl);
        }

    }, false);

}, false);

//Funktion zum Nachrichten an alle schreiben
function nachrichten(i, a, anzahl) {
    if (i < GM_getValue('bis')) {
        //Nachricht senden
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://' + document.location.hostname + '/messages/write/send/',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: encodeURI('f_toname=id:' + i + '&f_subject=' + GM_getValue('betreff') + '&f_text=' + GM_getValue('mailtext') + '&f_did=&submit=Nachricht+verschicken'),
            onload: function(responseDetails) {
                a++;
                i++;
                anzahl--;
                if (anzahl != 0) {
                    document.getElementById('log').innerHTML += '<b><font style="color:green">' + a + '. Nachricht erfolgreich versandt. Noch ' + anzahl + '. Warte ' + GM_getValue('pause') + ' Sekunden...</font></b><br>';
                }
                //xx Sekunden warten
                var timeout = GM_getValue('pause') * 1000;
                if (anzahl != '0') {
                    setTimeout(function() {
                        nachrichten(i, a, anzahl);
                    }, timeout);
                } else {
                    document.getElementById('log').innerHTML += '<b><font style="color:green">' + a + '. Nachricht erfolgreich. Keine Nachrichten mehr.</font></b><br>';
                    a++;
                    a++;
                    nachrichten(i, a, anzahl);
                }
            }
        })
        } else {
        var endanzahl = Number(GM_getValue('bis')) - Number(GM_getValue('von'));
        document.getElementById('log').innerHTML += '<b><font style="color:green">Nachrichten an alle senden erfolgreich. Es wurden ' + endanzahl + ' Nachrichten verschickt.</font></b><br>';
    }

}

//Funktion zum Nachrichten an einen schreiben
function nachrichtendizz(i, a, anzahl) {
    if (i < GM_getValue('anzahl')) {
        //Nachricht senden
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://' + document.location.hostname + '/messages/write/send/',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: encodeURI('f_toname=' + GM_getValue('spieler') + '&f_subject=' + GM_getValue('betreff') + '&f_text=' + GM_getValue('mailtext') + '&f_did=&submit=Nachricht+verschicken'),
            onload: function(responseDetails) {
                a++;
                i++;
                anzahl--;
                if (anzahl != 0) {
                    document.getElementById('log').innerHTML += '<b><font style="color:green">' + a + '. Nachricht an ' + GM_getValue('spieler') + ' erfolgreich versandt. Noch ' + anzahl + '. Warte ' + GM_getValue('pause') + ' Sekunden...</font></b><br>';
                }
                //xx Sekunden warten
                if (anzahl != 0) {
                    var timeout = GM_getValue('pause') * 1000;
                    setTimeout(function() {
                        nachrichtendizz(i, a, anzahl);
                    }, timeout);
                } else {
                    document.getElementById('log').innerHTML += '<b><font style="color:green">' + a + '. Nachricht an ' + GM_getValue('spieler') + ' erfolgreich versandt. Keine Nachrichten mehr.</font></b><br>';
                    a++;
                    a++;
                    nachrichtendizz(i, a, anzahl);
                }
            }
        })
        } else {
        document.getElementById('log').innerHTML += '<b><font style="color:green">Es wurden ' + GM_getValue('anzahl') + ' Nachrichten an ' + GM_getValue('spieler') + ' verschickt.</font></b><br>';
    }
}

//Funktion zum Shoutbox vollspammen
function bandenshoutbox(i, a, anzahl) {
    if (i < GM_getValue('anzahl')) {
        //Shoutboxeintrag schreiben
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://' + document.location.hostname + '/gang/chat/add/',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: encodeURI('f_text=' + GM_getValue('mailtext') + '&Submit=Abschicken'),
            onload: function(responseDetails) {
                a++;
                i++;
                anzahl--;
                if (anzahl != 0) {
                    document.getElementById('log').innerHTML += '<b><font style="color:green">' + a + '. Eintrag in die Bandenshoutbox geschrieben. Noch ' + anzahl + '. Warte ' + GM_getValue('pause') + ' Sekunden...</font></b><br>';
                }
                //xx Sekunden warten
                if (anzahl != 0) {
                    var timeout = GM_getValue('pause') * 1000;
                    setTimeout(function() {
                        bandenshoutbox(i, a, anzahl);
                    }, timeout);
                } else {
                    document.getElementById('log').innerHTML += '<b><font style="color:green">' + a + '. Eintrag in die Bandenshoutbox geschrieben. Keine Eintr?¤ge mehr.</font></b><br>';
                    a++;
                    a++;
                    bandenshoutbox(i, a, anzahl);
                }
            }
        })
        } else {
        document.getElementById('log').innerHTML += '<b><font style="color:green">Es wurden ' + GM_getValue('anzahl') + ' Eintr?¤ge in die Bandenshoutbox geschrieben.</font></b><br>';
    }

}

//Funktion zum Bandenthreads eroeffnen
function bandenthread(i, a, anzahl) {
    if (i < GM_getValue('anzahl')) {
        //Thread oeffnen
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://' + document.location.hostname + '/gang/forum/newthread/',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: encodeURI('f_name=' + GM_getValue('betreff') + '&f_text=' + GM_getValue('mailtext') + '&dosubmit=Abschicken'),
            onload: function(responseDetails) {
                a++;
                i++;
                anzahl--;
                if (anzahl != 0) {
                    document.getElementById('log').innerHTML += '<b><font style="color:green">' + a + '. Thread im Bandenforum erstellt. Noch ' + anzahl + '. Warte ' + GM_getValue('pause') + ' Sekunden...</font></b><br>';
                }
                //xx Sekunden warten
                if (anzahl != 0) {
                    var timeout = GM_getValue('pause') * 1000;
                    setTimeout(function() {
                        bandenthread(i, a, anzahl);
                    }, timeout);
                } else {
                    document.getElementById('log').innerHTML += '<b><font style="color:green">' + a + '. Thread im Bandenforum erstellt. Keine Eintr?¤ge mehr.</font></b><br>';
                    a++;
                    a++;
                    bandenthread(i, a, anzahl);
                }
            }
        })
        } else {
        document.getElementById('log').innerHTML += '<b><font style="color:green">Es wurden ' + GM_getValue('anzahl') + ' Threads im Bandenforum erstellt.</font></b><br>';
    }

}