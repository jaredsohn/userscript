// ==UserScript==
// @name	[PG] Freundesliste v4.2
// @Author	syme edit by kingfr3sh
// @namespace	http://userscripts.org/scripts/show/87980 (thx@syme) 
// @description	Man kann mit diesem Script unbegrenzt viele Freunde speichern, ausserdem zeigt es einige Infos (pn punkte bande position geld usw) an
// @Version	4.2 für Sylt angepasst

// @include	*pennergame.de/friendlist*
// ==/UserScript==

// Seitenadressen ermitteln
var seite = document.location.href;
if (seite.indexOf("http://www.pennergame") >= 0) {
    var link = "http://www.pennergame.de";
}
var seite = document.location.href;
if (seite.indexOf("http://berlin.pennergame") >= 0) {
    var link = "http://berlin.pennergame.de";
}
var seite = document.location.href;
if (seite.indexOf("http://muenchen.pennergame") >= 0) {
    var link = "http://muenchen.pennergame.de";
}
var seite = document.location.href;
if (seite.indexOf("http://koeln.pennergame") >= 0) {
    var link = "http://koeln.pennergame.de";
}
var seite = document.location.href;
if (seite.indexOf("http://reloaded.pennergame") >= 0) {
    var link = "http://reloaded.pennergame.de";
}
var seite = document.location.href;
if (seite.indexOf("http://sylt.pennergame") >= 0) {
    var link = "http://sylt.pennergame.de";
}

//Style
var style = document.getElementsByTagName('style')[0];
var table_class = '.fade {color:#666666;}.bstyle0 {color:#00CC00;}.bstyle1 {color:#D80A0A}.style1 {font-size: 15px;font-weight: bold;}.dropdown {background-color: #333333;list-style-type: none;color: #FFFFFF;font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 9px;}#content .tieritemA{margin-left: 0; margin-bottom: 10px; margin-right: 0; width:820px;clear:both;background:#3a3a3a;padding:5px;-moz-border-radius:4px; border: 1px solid #2F2F2F;}';
style.innerHTML = table_class;

// Tabelle erweitern
var table = document.getElementsByTagName('table')[0];
var tr = table.getElementsByTagName('tr')[1];
tr_inhalt = '<td height="13" width="150"></td><td valign="middle" width="460">&nbsp;<strong>Spieler</strong></td><td width="300">&nbsp;&nbsp;<strong>Punkte</strong></td><td width="300">&nbsp;&nbsp;<strong>Reg</strong></td><td width="200">&nbsp;&nbsp;<strong>Platz</strong></td><td>&nbsp;&nbsp;<strong>Bande</strong></td><td width="300">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Geld</strong></td><td width="300"><strong>&nbsp;&nbsp;&nbsp;Fight&nbsp;&nbsp;Kom.&nbsp;&nbsp;Del.</strong></td><td></td>';
tr.innerHTML = tr_inhalt;

//Eigene Werte fuer Farben rausfinden
GM_xmlhttpRequest({
    method: 'GET',
    url: '' + link + '/overview/',
    onload: function(responseDetails) {
        var content = responseDetails.responseText;
        var text1 = content.split('<a href="/profil/id:')[2];
        var userid = text1.split('/">')[0];
        var userp = content.split('src="http://www.pennergame.de/headline/')[2];
        var userpoints = userp.split('/?size=34"')[0];
        var angriffmax = Math.floor(userpoints * 1.5);
        var angriffmin = Math.floor(userpoints * 0.8);
        GM_setValue("angriffmax", angriffmax);
        GM_setValue("angriffmin", angriffmin);
        GM_setValue("userpoints", userpoints);
    }
});

//Hinzufuegefeld aktivieren und Fehlertext ersetzen
GM_xmlhttpRequest({
    method: 'GET',
    url: document.location.href,
    onload: function(responseDetails) {
        var content = responseDetails.responseText;
        if (content.indexOf('Du kannst keine weiteren Spieler in ') >= 0) {
            if (content.indexOf('r Ehrenmitglieder liegt bei 20 Spielern pro Liste.') >= 0) {
                table.innerHTML = (table.innerHTML).replace("Du kannst keine weiteren Spieler in deine Freundesliste aufnehmen.", 'Eigentlich k&ouml;nntest du keine Freunde mehr speichern.<br>Dank dem Freundescript von Boggler und syme trotzdem Freunde speichern:');
                table.innerHTML = (table.innerHTML).replace("Die Begrenzung f\u00FC", "");
                table.innerHTML = (table.innerHTML).replace("r Ehrenmitglieder liegt bei 20 Spielern pro Liste.", '</tr><tr><td><strong>Spielername:</strong></td><td colspan="3">' + '<input name="derfreund" type="text" id="derfreund" value=""></td></tr><tr><td><strong>Kommentar:</strong></td><td><input name="dercomment" type="text" id="dercomment" value=""></td></tr><tr><td></td><td><input type="button" id="derfreund1" name="derfreund1" value="Trotzdem Spieler Hinzuf&uuml;gen"></td></tr>');
            } else {
                table.innerHTML = (table.innerHTML).replace("Du kannst keine weiteren Spieler in deine Freundesliste aufnehmen.", 'Eigentlich k&ouml;nntest du keine Freunde mehr speichern.<br>Dank dem Freundescript von Boggler und syme trotzdem Freunde speichern:');
                table.innerHTML = (table.innerHTML).replace("Deine Begrenzung liegt bei 20 Spielern pro Liste", '</tr><tr><td><strong>Spielername:</strong></td><td colspan="3">' + '<input name="derfreund" type="text" id="derfreund" value=""></td></tr><tr><td><strong>Kommentar:</strong></td><td><input name="dercomment" type="text" id="dercomment" value=""></td></tr><tr><td></td><td><input type="button" id="derfreund1" name="derfreund1" value="Trotzdem Spieler Hinzuf&uuml;gen"></td></tr>');
            }
            document.getElementById("derfreund1").addEventListener('click', function get_submit() {
                GM_setValue("Der_Freund", document.getElementById("derfreund").value);
                GM_setValue("Der_Comment", document.getElementById("dercomment").value);
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: link + '/friendlist/add/friend/',
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data: encodeURI('f_name=' + GM_getValue('Der_Freund') + '&f_comment=' + GM_getValue('Der_Comment') + '&Submit=Hinzuf%C3%BCgen'),
                    onload: function(responseDetails) {
                        GM_deleteValue("Der_Freund");
                        window.setTimeout(window.location.href = "?status=success", 2000);
                    }
                })
                }, false);
        }
    }
})

//Die Infofunktion
function infos(i) {

    function einfug() {
        tr_spieler = table.getElementsByTagName('tr')[i];
        td_1 = tr_spieler.insertCell(2);
        td_2 = tr_spieler.insertCell(3);
        td_3 = tr_spieler.insertCell(4);
        td_4 = tr_spieler.insertCell(5);
        td_5 = tr_spieler.insertCell(6);
        td_6 = tr_spieler.insertCell(7);
    }

    einfug();
    var kommentar_text = tr_spieler.getElementsByTagName('td')[8].innerHTML.split('</td>')[0];
    var kommentar = '<a class="tooltip" href="32_0|#"><img src="http://i47.tinypic.com/1072mv5.jpg"><span>' + kommentar_text + '</span></a>';
    var del1 = tr_spieler.getElementsByTagName('td')[9].innerHTML.split('</td> ')[0];
    var del = tr_spieler.getElementsByTagName('td')[9].innerHTML = "";
    tr_spieler.innerHTML = (tr_spieler.innerHTML).replace('http://static.pennergame.de/img/pv4/icons/trash.gif', 'http://static.pennergame.de/img/pv4/icons/mail_del.png" width="12" height="12');
    var del2 = del1.split('<img ')[0];
    //" "
    tr_spieler.deleteCell(8);

    //Daten aus api lesen
    var name = tr_spieler.getElementsByTagName('td')[1].innerHTML.split('">')[1].split('</a>')[0];
    var id = tr_spieler.getElementsByTagName('td')[1].innerHTML.split('id:')[1].split('/')[0];
    var url = link + '/dev/api/user.' + id + '.xml';

    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function(responseDetails) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

            var position = dom.getElementsByTagName('position')[0].textContent;
            var reg_since = dom.getElementsByTagName('reg_since')[0].textContent;
            var points = dom.getElementsByTagName('points')[0].textContent;
            var namebande = dom.getElementsByTagName('name')[1].textContent;
            var idbande = dom.getElementsByTagName('id')[1].textContent;
            if (namebande == "False") {
                var namebande = "-";
            }
            if (idbande == "False") {
                var idbande = "";
            }
            try {
                var cash = dom.getElementsByTagName('cash')[0].textContent / 100;

                //Geldfarben definieren
                var highlightita = 5000;
                var highlightit0 = 5001;
                var highlightit1 = 10000;
                var highlightit2 = 20000;
                var highlightit3 = 50000;
                var highlightit4 = 75000;
                var highlightit5 = 125000;
                if (cash <= highlightita) {
                    farbe = "white";
                }
                if (cash >= highlightit0) {
                    var farbe = "#F91805";
                }
                if (cash >= highlightit1) {
                    var farbe = "#EE4611";
                }
                if (cash >= highlightit2) {
                    var farbe = "#F6A008";
                }
                if (cash >= highlightit3) {
                    var farbe = "#D9EA14";
                }
                if (cash >= highlightit4) {
                    var farbe = "#0EF905";
                }
                if (cash >= highlightit5) {
                    var farbe = "#450FEF";
                }
                var cash1 = '<font style=\"color:' + farbe + '; font-size:100%;\"><b>&nbsp;&nbsp;&nbsp;&nbsp;' + cash + '&euro;</b></font>';
            } catch(e) {
                var cash = '-';
                var cash1 = "<b>&nbsp;&nbsp;&nbsp;&nbsp;-</b>";
            }
            var fight = '<a href="/messages/write/?to=' + id + '"></a>';
            var pn = '<a href="/fight/?to=' + name + '"><img src="http://static.pennergame.de/img/pv4/icons/att.png" width="16" height="16" alt="fight to"></a>';

            //Fightfarben definieren
            var points = points;
            var maxatt = GM_getValue("angriffmax");
            var minatt = GM_getValue("angriffmin");
            var maxatt1 = Math.floor(points * 1.5);
            var minatt1 = Math.floor(points * 0.8);
            var userpoints = GM_getValue("userpoints");

            if (maxatt > points && minatt < points) {
                var colorr = "green";
                var green = true;
            } else {
                var green = false;
            }

            if (maxatt1 > userpoints && minatt1 < userpoints && green == false) {
                var colorr = "red";
            }
            einfug();
            tr_spieler.deleteCell(8);

            //Daten endgueltig einfuegen
            td_1.innerHTML = '<font style="color:' + colorr + ';">&nbsp;&nbsp;<b>' + points + '</b></fonts>';
            td_2.innerHTML = '&nbsp;&nbsp;<b>' + reg_since + '</b>';
            td_3.innerHTML = '&nbsp;&nbsp;<b>' + position + '</b>';
            td_4.innerHTML = '&nbsp;&nbsp;<a href="/profil/bande:' + idbande + '/"><b><nobr>' + namebande + '</nobr></b></a>';
            td_5.innerHTML = '&nbsp;&nbsp;' + cash1;
            td_6.innerHTML = '&nbsp;&nbsp;<b>' + fight + '&nbsp;&nbsp;' + pn + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + kommentar + '</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + del2 + '<img src="http://static.pennergame.de/img/pv4/icons/mail_del.png" width="12" height="12" border=none></a>';

        }
    })
    }

for (var i = 2; i < 50; i++) {
    infos(i);
}