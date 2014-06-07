// ==UserScript==
// @name		JavanHighscore
// @namespace		http://javan.de
// @description		Highscore Punktedifferenz
// @author		Javan
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_xmlhttpRequest
// @grant		GM_openInTab
// @include     http://*.pennergame.de/profil/*/
// @include     http://*.pennergame.de/highscore/user/*
// @include     http://*.pennergame.de/highscore/joindate/*
// @updateURL		http://userscripts.org/scripts/source/154086.user.js
// @downloadURL		http://userscripts.org/scripts/source/154086.user.js
// @icon		http://javan.de/tools/live/favicon.png
// @version		1.2
// ==/UserScript==
var link = 'http://' + window.location.host;
var url = window.location;
var stadt = window.location.host + '.';

function ungenaueMillionenWegMachen(differenz, punktefaktor) {

    if (punktefaktor != '')
        differenz = differenz.toString().substring(0, differenz.toString().length - punktefaktor.length) + punktefaktor;
    if (differenz.toString() == '' || differenz.toString() == punktefaktor)
        differenz = 0;

    return differenz;
}

function errechnePunktefaktor(punkte) {
    if (punkte.toString().search("Millionen") != -1)
        punktefaktor = '000';
    else if (punkte.toString().search("Milliarden") != -1)
        punktefaktor = '000000';
	else if (punkte.toString().search("Mrd") != -1)
        punktefaktor = '000000';
    else if (punkte.toString().search("Billionen") != -1)
        punktefaktor = '000000000';
	else if (punkte.toString().search("Billiarden") != -1)
        punktefaktor = '000000000000';
    else
        punktefaktor = '';

    return punktefaktor;
}

function MillionenWegMachen(punkte, punktefaktor) {
    punkte = punkte.replace(/[,€$.]/g, '');
    punkte = punkte.replace(/[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]/g, '');
    punkte = punkte.replace(/[ ]/g, '');
    punkte = punkte + punktefaktor;
    punkte = parseInt(punkte);

    return punkte;
}

if (url.toString().search("profil") != -1) {

    var name = document.getElementsByTagName('body')[0].innerHTML.split('id="f_name" value="')[1].split('"')[0];
    var punktenow = document.getElementsByTagName('body')[0].innerHTML.split('Punkte</strong></td>')[1].split('" style="')[0];
    var punktenow = parseInt(punktenow.split('323">')[1].split('</td>')[0]);

    var neuerdiv = document.createElement("tr");
    var ausgabebereich = document.getElementsByTagName('table')[3];
    ausgabebereich.appendChild(neuerdiv);


    GM_xmlhttpRequest({
        method: 'GET',
        url: link + '/highscore/user/?name=' + name,
        onload: function (responseDetails) {

            var content = responseDetails.responseText;
            if (content.search(name) != -1) {
                var punkte = content.split('col5" title="None">')[1].split('</td>')[0];
                punktefaktor = errechnePunktefaktor(punkte);
                punkte = MillionenWegMachen(punkte, punktefaktor);

                var differenz = punktenow - punkte;
                differenz = ungenaueMillionenWegMachen(differenz, punktefaktor);


                if (differenz > 0) {
                    var color = '00ff00';
                } else if (differenz == 0) {
                    var color = 'ffc000';
                } else {
                    var color = 'ff0000';
                }

                neuerdiv.innerHTML += '<td colspan="4" bgcolor="#1b1b1b" class="row1" style="padding:2px; vertical-align:middle" style="padding:5px;margin:0px;font-size:13px;color:#ffffff">Punktedifferenz aus dem letzten HS-Stand:' + '<br />Punkte: ' + punkte + '<br />Aktuelle Punkte: ' + punktenow + '<br />Differenz: <span style="color:#' + color + '">' + differenz + '</span>' + '</td>';
            }

        }
    });

} else if (url.toString().search("highscore") != -1) {

    var ausgabebereich = document.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
    ausgabebereich.innerHTML += '<th class="col7 flag" id="punkte"><div>Differenz</div></th>';

    function add(i) {

        var punkte = document.getElementsByTagName('body')[0].innerHTML.split('class="col5')[i + 1].split('">')[1].split('</td>')[0];





        punktefaktor = errechnePunktefaktor(punkte);
        punkte = MillionenWegMachen(punkte, punktefaktor);



        var name = document.getElementsByTagName('body')[0].innerHTML.split('class="username')[i].split('">')[1].split('</a>')[0];

        GM_xmlhttpRequest({
            method: 'GET',
            url: link + '/dev/api/user.getname.xml?name=' + name,
            onload: function (responseDetails) {
                var content = responseDetails.responseText;
                if (content.search("<points>") != -1) {
                    //var bereich = content.split('Punkte</strong></td>')[1].split('" style="')[0];
                    //var punktenow = parseInt(bereich.split('323">')[1].split('</td>')[0]);

                    //<points>13909094</points>

                    var punktenow = parseInt(content.split('<points>')[1].split('</points>')[0]);

                    var differenz = punktenow - punkte;

                    differenz = ungenaueMillionenWegMachen(differenz, punktefaktor);


                    if (differenz > 0) {
                        var color = '00ff00';
                    } else if (differenz == 0) {
                        var color = 'ffc000';
                    } else {
                        var color = 'ff0000';
                    }

                    document.getElementsByTagName('table')[0].getElementsByTagName('tr')[i].innerHTML += '<td class="col7"><span style="color:#' + color + '">' + differenz + '</span></td>';
                }
                var next = i + 1;
                if (next <= 25)
                    add(next);
            }
        });
    }
    add(1);

}

// Copyright (c) by Javan_xD
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.