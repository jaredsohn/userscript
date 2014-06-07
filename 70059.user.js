// ==UserScript==
// @name           Spendenbot by Boggler
// @author         Boggler auf Pennerhack
// @version        1.1
// @namespace      Pennerhack ( visit: http://pennerhack.de.tc/ ),
// @description    Man traegt die Links seiner Freunde ein und auf klick werden sie in tabs ge?¶ffnet oder einfach geklickt
// @include        http://*serserionline.com/overview/
// @include        http://*clodogame.fr/overview/
// @include        http://*mendigogame.es/overview/
// @include        http://*pennergame.de/overview/
// @include        http://*bumrise.com/overview/
// @include        http://*menelgame.pl/overview/
// @license	   Creative Commons by-nc-sa
// ==/UserScript==

// Dieses Script ist Creative commons by-nc-sa lizensiert
// Dieses Script ist Copyright by Boggler & syme @ Pennerhack ( visit: http://pennerhack.de.tc/ )

var anzahla = GM_getValue("anzahl");

var div_settingpoint = document.getElementsByClassName('settingpoint');
var div_tieritemA = document.getElementsByClassName('tieritemA');

newdiv = document.createElement('div');
newdiv.setAttribute('class', 'tieritemA');
newdiv.style.width = "500px";
newdiv.innerHTML = '' + '<h1> Bogglers Spendenbot </h1>' + '' + '<div id="options" name="options"</div><div id="ausgabe" name="ausgabe"</div>Es wurden bisher ' + anzahla + ' Links gespeichert:<br>';
for (i = 0; i < anzahla; i++) {
    var m = i + 1;
    newdiv.innerHTML += m + '. <a href="' + GM_getValue("link" + i) + '">' + GM_getValue("name" + i) + '</a><br>';
}
newdiv.innerHTML += 'Im Hintergrund &ouml;ffnen (automatisches Spenden):<input type="checkbox" name="auto" id="auto" checked><br>Beim automatischen Spenden werden die Links im Hintergrund geklickt ' + '(dauert ca 5 Sekunden). Bei einem Game mit Capatcha (Berlin) geht das nat&uuml;rlich nicht. <br><br>' + '<input type="button" name="klicken" id="klicken" value="Alle Links &ouml;ffnen" /><br>' + '<br><input type="button" id="optionen" name="options" value="Optionen &ouml;ffnen" /><br><div id="optionenfeld" ></div><br><div name="fortschritt" id="fortschritt"></div><br><div name="danke" id="danke"></div>';

div_settingpoint[0].insertBefore(newdiv, div_tieritemA[div_tieritemA.length - 5]);
document.getElementById("auto").checked = GM_getValue("automatisch");

document.getElementById('optionen').addEventListener('click', function options() {
    if (anzahla > 0) {
        var speicherbutton = '<input type="button" id="delete" value="ALLES L&Ouml;SCHEN" /><br><br><br><input type="button" name="linksspeichern" id="linksspeichern" value="Alles speichern" />';
    } else {
        var speicherbutton = '';
    }
    document.getElementById('optionenfeld').innerHTML = '<br><b>Optionen von Bogglers Spendenbot</b><br><font style="color:red">Um eine perfekte Funktion zu garantieren m??ssen alle Felder korrekt ausgef&uuml;lt sein und die Links existieren.</font>' + '<br>Anzahl:<input type="text" value="' + anzahla + '" id="anzahl" /><input type="button" name="anzahlspeichern" id="anzahlspeichern" value="Anzahl reloaden" /><br>' + '<div id="anzahlbla" name="anzahlbla" ></div>' + '<br>' + speicherbutton;
    var anzahl = anzahla;
    for (i = 0; i < anzahl; i++) {
        var n = i + 1;
        document.getElementById('anzahlbla').innerHTML += n + '. <input type="text" id="deinlinkkk" name="deinlinkkk" size="50" value="' + GM_getValue("link" + i) + '" /><input type="text" id="deinname" name="deinname" size="15" value="' + GM_getValue("name" + i) + '" /><br>';
    }
    document.getElementById('anzahlspeichern').addEventListener('click', function anzahl() {
        var anzahl = document.getElementById('anzahl').value;
        GM_setValue("anzahl", anzahl);
        location.reload()
        }, false);
    document.getElementById('linksspeichern').addEventListener('click', function links() {
        var anzahl = document.getElementById('anzahl').value;
        for (i = 0; i < anzahl; i++) {
            var link = document.getElementsByName("deinlinkkk")[i].value;
            var name = document.getElementsByName("deinname")[i].value;
            GM_setValue("link" + i, link);
            GM_setValue("name" + i, name);
        }
        GM_setValue("anzahl", anzahl);
        location.reload()
        }, false);
    document.getElementById('delete').addEventListener('click', function options() {
        var fragen = confirm("Willst du wirklich alle gespeicherten Links und Namen l?¶schen?");
        if (fragen == true) {
            for (i = 0; i < anzahla; i++) {
                GM_deleteValue("link" + i);
                GM_deleteValue("name" + i);

                GM_deleteValue("anzahl");
                GM_deleteValue("automatisch");
                location.reload()
                }
        }
    }, false);
}, false);

document.getElementById('klicken').addEventListener('click', function links() {
    GM_setValue("automatisch", document.getElementById('auto').checked);
    i = 0;
    neu(i);
    function neu(i) {
        if (document.getElementById('auto').checked == true) {
            var endlink = GM_getValue("link" + i);
            GM_xmlhttpRequest({
                method: 'GET',
                url: endlink,
                onload: function(responseDetails) {
                    var anzahlb = anzahla - 1;
                    var l = i + 1;
                    if (i == anzahlb) {
                        var oeffnen = "Fertig! Habe alle " + anzahla + " Links besucht.";
                    } else {
                        var oeffnen = 'Link ' + l + ' [ <a href="' + GM_getValue("link" + i) + '">' + GM_getValue("name" + i) + '</a> ] wird gerade im Hintergrund ge&ouml;ffnet.';
                    }
                    document.getElementById('fortschritt').innerHTML = '<font style="color:green">' + oeffnen + '</font>';
                    i++;
                    var tempo = 2000 + 1000*Math.random();
                    setTimeout(function () { neu(i);}, tempo);
                    }
            });
        } else {
            for (i = 0; i < anzahla; i++) {
                window.open(GM_getValue("link" + i));
            }
        }
    }
    document.getElementById('danke').innerHTML = '<font style="color:#000066">Danke dass du mein Script benutzt, bitte besuche auch meine Seite: <a href="http://pennerhack.foren-city.de">Pennerhack(mit basti1012)</a> <br>mfg Boggler</font>';
}, false);

// Copyright (c) by Boggler @ Pennerhack ( visit: http://www.pennerhack.de.tc )
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.