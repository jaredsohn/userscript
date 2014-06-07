// ==UserScript==
// @name		PowerLogin by Boggler
// @namespace	Boggler @ Pennerhack (visit: http://pennerhack.foren-city.de/)
// @author	Boggler @ Pennerhack (visit: http://pennerhack.foren-city.de/)
// @description	Erzeugt ein Loginmenue fuer alle 3 deutschen Games in dem man unbegrenzt viele Accounts speichern kann
// @version     2.1
// @include		http://*pennergame.de*
// @license	   Creative Commons by-nc-sa
// ==/UserScript==


// Dieses Script ist Creative commons by-nc-sa lizensiert
// Dieses Script ist Copyright by Boggler & syme @ Pennerhack ( visit: http://pennerhack.de.tc/ )

var url = document.location.href;
// Linkadressen fuer Berlin
if (url.indexOf('http://berlin') >= 0) {
    var link = 'http://berlin.pennergame.de';
    var berlin = '<a href="#"><font style="color:red">Berlin</font></a>';
    var stadtendname = 'b';
} else {
    var berlin = '<a href="http://berlin.pennergame.de"><font style="color:green">Berlin</font></a>';
}

// Linkadressen fuer hamburg
if (url.indexOf('http://www.pennergame.de') >= 0) {
    var link = 'http://www.pennergame.de';
    var hamburg = '<a href="#"><font style="color:red">Hamburg</font></a>';
    var stadtendname = 'h';
} else {
    var hamburg = '<a href="http://www.pennergame.de"><font style="color:green">Hamburg</font></a>';
}

// Linkadressen fuer muenchen
if (url.indexOf('muenchen.pennergame.de') >= 0) {
    var link = 'http://muenchen.pennergame.de';
    var muenchen = '<a href="#"><font style="color:red">M&uuml;nchen</font></a>';
    var stadtendname = 'm';
} else {
    var muenchen = '<a href="http://www.muenchen.pennergame.de/"><font style="color:green">M&uuml;nchen</font></a>';
}

// Linkadressen fuer malle
if (url.indexOf('malle.pennergame.de') >= 0) {
    var link = 'http://malle.pennergame.de';
    var malle = '<a href="#"><font style="color:red">Mallorca</font></a>';
    var stadtendname = 'ma';
} else {
    var malle = '<a href="http://www.malle.pennergame.de/"><font style="color:green">Mallorca</font></a>';
}

// Farbeinstellungen
var position = 'fixed';
var top = GM_getValue('top');
if (top == null) {
    var top = '50';
}
var right = GM_getValue('right');
if (right == null) {
    var right = '50';
}
var fontsize = 'x-small';
var radius = '20';
var sichtbar = '';
var border = '1px solid #000000';
var bgcolor = '#313131';

var anzahl = GM_getValue('anzahl');
if (anzahl == null) {
    anzahl = 2;
    GM_setValue('anzahl', 2);
};
var anzahla = anzahl++;
for (i = 0; i < 4; i++) {
    if (i == 0) {
        var stadt = 'h';
    }
    if (i == 1) {
        var stadt = 'b';
    }
    if (i == 2) {
        var stadt = 'm';
    }
    if (i == 3) {
        var stadt = 'ma';
    }
    for (a = 1; a <= anzahla; a++) {

        if (GM_getValue(stadt + 'penner' + a) == null) {
            GM_setValue(stadt + 'penner' + a, '')
            }
        if (GM_getValue(stadt + 'pass' + a) == null) {
            GM_setValue(stadt + 'pass' + a, '')
            }

    }
}

var url = document.location.href;
if (url == link + '?reg=success' || url == link + '/' || url == link + '/?landing=true' || url == link + '/logout/' || url == link + '/news/' || url == link + '/pw_forgotten/' || url == link + '/login/' || url == link + '/login/check/') {
    var werbung = '<center><a target="_blank" href="http://pennerhack.foren-city.de/" title="C by Boggler Pennerhack"><span style="color:white"><b>Pennerhack</b></span></a></center><br>';
    var stadte = '<center>' + hamburg + '&nbsp;' + berlin + '&nbsp;' + muenchen + '&nbsp;' + malle + '</center><br>';

    var diepenner = '';
    for (a = 1; a <= anzahla; a++) {
        diepenner += '<center><a><font color="orange">Penner ' + a + '</font></a>' + '<form method="post" action="' + link + '/login/check/"><input id="player" type="text" size="16" name="username" value="' + GM_getValue(stadtendname + "penner" + a) + '"><input type="password" name="password" size="7" id="password" value="' + GM_getValue(stadtendname + "pass" + a) + '" />' + '&nbsp;<input class="formbutton" type="submit" name="submitForm" value="Login" /></form></center><br>';
    }

    var vergessen = '<center><a href="/pw_forgotten/"><font color="white">Passwort vergessen</font></a></center><br>';
    var einstell = '<center><input type="button" id="einstella" name="einstella" value="Einstellungen" /></center>';

    document.getElementById('footer').innerHTML += '<span name="Menue" style="position:' + position + ';top:' + top + 'px;right:' + right + 'px;font-size:' + fontsize + ';-moz-border-radius:' + radius + 'px;-moz-opacity:' + sichtbar + ';border:' + border + '; background-color:' + bgcolor + '"><div class="content" style="padding-top:20px"><ul><div align="center">' + werbung + stadte + diepenner + vergessen + einstell + '</div></ul></div></span>';
};

document.getElementById('einstella').addEventListener('click', function einstellungen() {
    document.getElementsByName('Menue')[0].innerHTML = '<span style="position:' + position + ';top:' + top + 'px;right:' + right + 'px;font-size:' + fontsize + ';-moz-border-radius:' + radius + 'px;-moz-opacity:' + sichtbar + ';border:' + border + '; background-color:' + bgcolor + '"><div class="content" style="padding-top:15px"><ul><li><div align="center"><div id="einstellungen"></div></div></li></ul></div></span>';

    document.getElementById('einstellungen').innerHTML += '<center>';
    document.getElementById('einstellungen').innerHTML += '<span style="color:#0099FF; font-size:14px;"><b>Einstellungen</b></span><br><input type="text" id="anzahl" value="' + GM_getValue("anzahl") + '" /><input type="button" id="anzahlspeichern" value="Anzahl speichern" /><br>';
    document.getElementById('einstellungen').innerHTML += '<input type="button" id="loschen" value="Alle Daten l&ouml;schen" />';
    document.getElementById('einstellungen').innerHTML += '<input type="button" id="speichern" value="Speichern" /><br>';
    document.getElementById('einstellungen').innerHTML += '<font style="color:orange"><a id=' + stadt + '>Position</a></font>';
    document.getElementById('einstellungen').innerHTML += '<center><a><font color="orange">Top(px):</font></a><input id="top" value="' + top + '"/>&nbsp;</center><br>';
    document.getElementById('einstellungen').innerHTML += '<center><a><font color="orange">Right(px):</font></a><input id="right" value="' + right + '"/>&nbsp;</center><br>';
    for (i = 0; i < 4; i++) {
        if (i == 0) {
            var stadt = 'h';
            var stadtname = 'Hamburg';
        }
        if (i == 1) {
            var stadt = 'b';
            var stadtname = 'Berlin';
        }
        if (i == 2) {
            var stadt = 'm';
            var stadtname = 'M&uuml;nchen';
        }
        if (i == 3) {
            var stadt = 'ma';
            var stadtname = 'Mallorca';
        }
        document.getElementById('einstellungen').innerHTML += '<font style="color:orange"><a id=' + stadt + '>' + stadtname + '</a></font>';

        for (a = 1; a <= anzahla; a++) {
            document.getElementById('einstellungen').innerHTML += '<center><a><font color="orange">Penner ' + a + '</font></a><input id="player' + stadt + a + '" value="' + GM_getValue(stadt + "penner" + a) + '"/><input id="password' + stadt + a + '" value="' + GM_getValue(stadt + "pass" + a) + '"/>&nbsp;</center><br>';
        }

    }

    document.getElementById('einstellungen').innerHTML += '</center>';
    document.getElementById('loschen').addEventListener('click', function einstellungen() {
        for (j = 0; j < 4; j++) {
            if (j == 0) {
                var stadt = 'h';
                var stadtname = 'Hamburg';
            }
            if (j == 1) {
                var stadt = 'b';
                var stadtname = 'Berlin';
            }
            if (j == 2) {
                var stadt = 'm';
                var stadtname = 'M&uuml;nchen';
            }
            if (j == 3) {
                var stadt = 'ma';
                var stadtname = 'Mallorca';
            }
            for (b = 1; b <= 60; b++) {

                GM_deleteValue(stadt + 'penner' + b);
                GM_deleteValue(stadt + 'pass' + b);
            }
        }
        GM_deleteValue('anzahl');
        alert('Alle Daten dieses Scriptes wurden geloescht.');
        location.reload()
        }, false);
    document.getElementById('speichern').addEventListener('click', function einstellungen() {
        for (j = 0; j < 4; j++) {
            if (j == 0) {
                var stadt = 'h';
                var stadtname = 'Hamburg';
            }
            if (j == 1) {
                var stadt = 'b';
                var stadtname = 'Berlin';
            }
            if (j == 2) {
                var stadt = 'm';
                var stadtname = 'M&uuml;nchen';
            }
            if (j == 3) {
                var stadt = 'ma';
                var stadtname = 'Mallorca';
            }
            for (b = 1; b <= anzahla; b++) {

                GM_setValue(stadt + 'penner' + b, document.getElementById('player' + stadt + b).value);
                GM_setValue(stadt + "pass" + b, document.getElementById('password' + stadt + b).value);
            }
        }
        GM_setValue("top", document.getElementById('top').value);
        GM_setValue("right", document.getElementById('right').value);

        location.reload()
        }, false);
    document.getElementById('anzahlspeichern').addEventListener('click', function einstellungen() {
        GM_setValue('anzahl', document.getElementById('anzahl').value);
        location.reload()
        }, false);
}, false);