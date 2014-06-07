// ==UserScript==
// @name           Pfandflaschensammler
// @namespace      http://userscripts.org/scripts/show/85124
// @author         lmk (wieder lauffaehig gemacht und erweitert von We1hnachtsmann)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @copyright      (c) 2009, lmk.
// @description    Nach beendetem Pfandflaschensammeln wird ein Hinweis auf der zuletzt geoeffneten Seite ausgegeben und es kann zur Pfandflaschensammelseite weitergeleitet werden.
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_deleteValue
// @grant          GM_listValues
// @include        http://*.pennergame.de/*
// @include        http://pennergame.de/*
// @include        http://*.dossergame.co.uk/*
// @include        http://dossergame.co.uk/*
// @include        http://*.menelgame.pl/*
// @include        http://menelgame.pl/*
// @include        http://*.bumrise.com/*
// @include        http://bumrise.com/*
// @include        http://*.clodogame.fr/*
// @include        http://clodogame.fr/*
// @include        http://*.mendigogame.es/*
// @include        http://mendigogame.es/*
// @include        http://*.mendigogame.com/*
// @include        http://mendigogame.com/*
// @include        http://*.faveladogame.com/*
// @include        http://faveladogame.com/*
// @include        http://*.bomzhuj.ru/*
// @include        http://bomzhuj.ru/*
// @exclude        http://*board.pennergame.de/*
// @updateURL      https://userscripts.org/scripts/source/85124.meta.js
// @version        2.3.33 noch eine Korrektur zu Anpassungen für Ostergame 2014
// ==/UserScript==

// @version        2.3.32 Korrektur zu Anpassungen für Ostergame 2014
// @version        2.3.31 Anpassungen für Ostergame 2014
// @version        2.3.30 Fehler bei Anpassung an neues Karnevalgame behoben
// @version        2.3.29 Anpassung an neues Karnevalgame
// @version        2.3.28 kleine Korrektur: bei automatischen Verbrechen kam u.U. eine Abfrage
// @version        2.3.27 2. Korrektur zu Anpassungen an Xmas-Minigame 2013
// @version        2.3.26 Korrektur zu Anpassungen an Xmas-Minigame 2013
// @version        2.3.25 Anpassungen an Xmas-Minigame 2013
// @version        2.3.24 Skript lief nicht mehr richtig
// @version        2.3.23 Checkbox auf Login-Seite fehlte
// @version        2.3.22 Fehler im letzten Update behoben
// @version        2.3.21 Anpassung wegen anderen Aufbaus der Counter; Beseitigung von Fehlermeldungen
// @version        2.3.20 Erweiterung um Minispiel Piratenschatz
// @version        2.3.19 Erweiterung um Minispiel Zollkontrolle
// @version        2.3.18 Erweiterung um Kofferpackspiel
// @version        2.3.17 kein automatisches Wiedereinloggen, wenn explizit ausgeloggt wurde
// @version        2.3.16 automatisches Wiedereinloggen
// @version        2.3.15 Korrektur wegen Stadtfeind
// @version        2.3.14 Testmeldung entfernt
// @version        2.3.13 kleinere Erweiterungen; Reparatur nach Totalausfall
// @version        2.3.12 Korrektur wegen Stadtfeind
// @version        2.3.11 noch einmal Updateverfahren korrigiert
// @version        $Id: pfandflaschensammler.user.js 22 2014-05-05 06:34:18Z mkl $

/* Automatic click on "start collecting" | Automatischer Klick auf "Sammeln" */
var autoSubmit = true; //false;

/* Alert messages */
var msgDone1 = "Das Pfandflaschensammeln wurde beendet.";    // "Collecting done";
var msgDone2 = "Klicke auf OK um die Aktionsseite zu " + unescape("%F6") + "ffnen.";    // "Click ok to open actions-page";
var msgAttackEnemy = "Es wurde ein Angriff auf den Stadtfeind Nr. 1 gestartet. Seite aktualisieren ?";

/* Captcha select title*/
var strTime = "Zeit: ";  // "Time: "; 

var intervalTime = 4000;
var done = " -/-"; // text after counter reached 0:00
var done0 = "00:00"; // alternative text after counter reached 0:00
var time = String(new Date().getTime());
var counter = done;
var fcounter = done;
var nameTime = "time";
var nameLastCollectTime = "LastCollectTime";
var checkInterval;
var TOWNEXTENSION = window.location.host;
var m_ownuserid;


var THISSCRIPTVERSION = GM_info.script.version.split(" ")[0];
var THISSCRIPTNAME = GM_info.script.name;
var THISSCRIPTINSTALL_URL = GM_info.script.namespace;          // URL fuer Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = THISSCRIPTINSTALL_URL.replace('show', 'source') + ".user.js"; // Skript-URL bei userscripts.org

var language = document.getElementsByName("language")[0].content;
// Version ermitteln
var oldVersion = 1;
if (!document.getElementById("login")) {
    var host = location.toString();
    var pos = host.lastIndexOf("//") + 2;
    host = host.substr(pos);
    pos = host.indexOf("/");
    host = host.substr(0, pos);
    GM_setValue("ErrorCounter_" + host, GM_getValue("ErrorCounter_" + host, 0) + 1);
    oldVersion = 0;
    setTimeout(reload, 10000);
}
else
    doTheAction();

// **********************************************************************************
// **********************************************************************************
// Funktion extrahiert die eigene UserID
// **********************************************************************************
// **********************************************************************************
function getOwnUserID() {
    // Eigene UserID ermitteln
    var ownuserid = document.getElementById('my-profile').innerHTML.split('href="/profil/id:')[1];
    ownuserid = ownuserid.split('/"')[0];

    return ownuserid;
}

// Holen einer Variablen mit User-Id
function PGu_getValue(varname, deflt) {
    return GM_getValue(TOWNEXTENSION + varname + m_ownuserid, deflt);
}

// Setzen einer Variablen mit User-Id
function PGu_setValue(varname, value) {
    GM_setValue(TOWNEXTENSION + varname + m_ownuserid, value);
}

// ***********************************************************************************************
// ***********************************************************************************************
// formats a date into the format "YYYY-MM-DD"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatDate(DateToFormat) {
    var year = DateToFormat.getFullYear();
    var month = DateToFormat.getMonth() + 101 + "";
    var day = DateToFormat.getDate() + 100 + "";

    return year + "-" + month.slice(1) + "-" + day.slice(1);
}


// ***********************************************************************************************
// ***********************************************************************************************
// removes spaces at the beginning and end of a string
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
    return s.replace(/^\s+|\s+$/g,'');
}

// ***********************************************************************************************
// ***********************************************************************************************
// check for a new script version and display a message, if there is one
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate() {
    // create and format actual date
    var today = new Date();
    var tagesdatum = FormatDate(today);

    // if not searched for a new version of the script today
    if (GM_getValue("LastUpdateCheck","") != tagesdatum) {
        // load the script page on userscripts.org
        GM_xmlhttpRequest({
            method: 'GET', 
            url: THISSCRIPTINSTALL_URL, 
            onload: function(responseDetails) {
                var content = responseDetails.responseText;
                                
                // find the script version
                var scriptversion = content.split("<b>Version:</b>")[1];
                var scriptfullversion = trimString(scriptversion.split("</p")[0]);
                scriptversion = trimString(scriptversion.split("</p")[0]).split(" ")[0];
                
                // if there is a new version of the script
                if (scriptversion != THISSCRIPTVERSION) {
                    // build the message
                    var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos &uuml;ber die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschlie&szlig;end durchgef&uuml;hrt werden.\n\nHinweis: Die &uuml;berpr&uuml;fung auf neue Versionen wird nur einmal pro Tag durchgef&uuml;hrt."

                    // display the message
                    alert(alerttext);
                    // load the page with the new script for installation
                    window.location.href = THISSCRIPTSOURCE_URL;
                }
            }
        });

        // memorize the new date
        GM_setValue("LastUpdateCheck", tagesdatum)
    }
}

// ***********************************************************************************************
// ***********************************************************************************************
// check for minigame and play it
// ***********************************************************************************************
// ***********************************************************************************************
function CheckMinigame () {
    if (window.location.pathname.indexOf("/activities/") == -1)
        return;
    var minigames = new Array("halloween", "summer13", "event/aug13_2");
    var tbl = document.getElementsByTagName("table");
    for (i = 0; i < tbl.length; i++) {
        for (var tk = 0; tk < minigames.length; tk++)
            if (tbl[i].innerHTML.indexOf("/" + minigames[tk] + "/") != -1)
                break;
        var trs = tbl[i].getElementsByTagName("tr");
        for (j = 0; j < trs.length; j++) {
            for (var k = 0; k < minigames.length; k++)
                if (trs[j].innerHTML.indexOf("/" + minigames[k] + "/") != -1)
                    break;
            if (tk < minigames.length || k < minigames.length) {
                var seks = 0;
                if (j + 1 < trs.length) {
                    var span = trs[j+1].getElementsByTagName("span");
                    if (span.length > 0)
                        for (jj = 0; jj < 1; jj++) {
                            var timer = span[jj].innerHTML;
                            if (timer == done) {
                                seks = 0;
                            }
                            else if (timer.indexOf(":") != -1) {
                                var time = timer.split(":");
                                seks = parseInt(time[0])*60 + parseInt(time[1]);
                            }
                        }
                }
                if (seks > 0) {
                    checkInt = window.setTimeout(CheckMinigame,seks*1000);
                    return;
                }
                else if (trs[j].style.background.indexOf("/success.jpg") != -1 || trs[j].style.background.indexOf("/fail.jpg") != -1 || trs[j].style.background.indexOf("/normal.jpg") != -1) {
                    var success = PGu_getValue("minigame_success", 0);
                    if (success == 1) {
                        if (trs[j].style.background.indexOf("/success.jpg") == -1) {
                            PGu_setValue("minigame_value", -1);
                            PGu_setValue("minigame_success", 0);
                            success = 0;
                        }
                        else
                            checkInt = window.setTimeout(reload, 300000);
                    }
                    if (success == 0) {
                        if (trs[j].style.background.indexOf("/success.jpg") != -1) {
                            PGu_setValue("minigame_success", 1);
                        }
                        else {
                            var options = trs[j].innerHTML.split('<option>');
                            if (options.length == 1) {
                                reload();
                                break;
                            }

                            var nextValue = PGu_getValue("minigame_value", -1) + 1;
                            var nextVal = nextValue % (options.length-1);
                            nextVal = options[nextVal+1].split('<')[0];

                            GM_xmlhttpRequest({
                                       method:"POST",
                                       url: 'http://' + window.location.host + '/' + minigames[k] + '/minigame/',
                                       headers: {'Content-type': 'application/x-www-form-urlencoded'},
                                       data: encodeURI('minigame_count='+nextVal),
                                       onload:function(responseDetails) {
                                              var pos = responseDetails.responseText.indexOf('/fail.jpg');
                                              if (pos == -1) {
                                                   window.location.href = window.location.protocol + '//' + window.location.host + '/activities/';
                                              }
                                              else {
                                                   PGu_setValue("minigame_value", nextValue);
                                                   window.location.href = window.location.protocol + '//' + window.location.host + '/activities/';
                                              }
                            }});
                        }
                    }
                    break;
                }
                else if (k < minigames.length) {
                    window.location.href = window.location.protocol + '//' + window.location.host + '/' + minigames[k] + '/minigame/';
                }
            }
            else if (trs[j].style.background.search(/\/xmas.*\/minigame/) != -1) {
                var seks = 0;
                if (j + 1 < trs.length) {
                    var span = trs[j+1].getElementsByTagName("span");
                    for (jj = 0; jj < 1; jj++) {
                        var timer = span[jj].innerHTML;
                        if (timer == done) {
                            seks = 0;
                        }
                        else {
                            var time = timer.split(":");
                            seks = parseInt(time[0])*60 + parseInt(time[1]);
                        }
                    }
                }
                if (seks > 0) {
                    checkInt = window.setTimeout(reload, seks*1000);
                    return;
                }
                else {
                    var success = PGu_getValue("XmasMini_success", 0);
                    if (success == 1) {
                        if (trs[j].style.background.indexOf("minigame_success") == -1) {
                            PGu_setValue("XmasMini_value", -1);
                            PGu_setValue("XmasMini_success", 0);
                            success = 0;
                        }
                        else
                            checkInt = window.setTimeout(reload, 600000);
                    }
                    if (success == 0) {
                        if (trs[j].style.background.indexOf("minigame_success") != -1) {
                            PGu_setValue("XmasMini_value", -1);
                            PGu_setValue("XmasMini_success", 1);
                            checkInt = window.setTimeout(reload, 600000);
                        }
                        else {
                            var options = trs[j].innerHTML.split('<option>');
                            if (options.length == 1) {
                                reload();
                                break;
                            }

                            var nextValue = PGu_getValue("XmasMini_value", -1) + 1;
                            var nextVal = nextValue % (options.length-1);
                            nextVal = options[nextVal+1].split('<')[0];
                            var action = trs[j].innerHTML.match(/<form.*action=\"[^\"]*\"/)[0].split('"')[1];

                            GM_xmlhttpRequest({
                                   method:"POST",
                                   url: 'http://' + window.location.host + action,
                                   headers: {'Content-type': 'application/x-www-form-urlencoded'},
                                   data: encodeURI('minigame_count='+nextVal),
                                   onload:function(responseDetails) {
                                          var pos = responseDetails.finalUrl.indexOf('event=');
                                          if (pos == -1) {
                                               window.location.href = window.location.protocol + '//' + window.location.host + '/activities/';
                                          }
                                          else {
                                               var rc = parseInt(responseDetails.finalUrl.substr(pos+6));
                                               if (rc == -2)
                                                   alert('Bitte Glühwein kaufen !!');
                                               else {
                                                   PGu_setValue("XmasMini_value", nextValue);
                                                   PGu_setValue("XmasMini_success", (rc==1?1:0));
                                                   window.location.href = responseDetails.finalUrl;
                                               }
                                          }
                            }});
                        }
                    }
                }
                break;
            }
            else if (trs[j].style.background.indexOf("/events/") != -1) {
                //alert(trs[j].style.background);
                var eventpos = trs[j].innerHTML.indexOf('/event/');
                var eventurl = "";
                minigames = new Array("easter14");
                var multiple = 0;
                for (var k = 0; k < minigames.length; k++)
                    if (tbl[i].innerHTML.indexOf("/" + minigames[k] + "/") != -1)
                        break;
                var dk = (k < minigames.length?1:2);
                if (eventpos != -1) {
                    var eventposend = trs[j].innerHTML.indexOf('"', eventpos);
                    eventurl = trs[j].innerHTML.substr(eventpos, eventposend - eventpos);
                    if (trs[j].innerHTML.substr(eventpos-8,6) == "action") {
                        var form = trs[j].getElementsByTagName("form")[0].innerHTML;
                        var inputs = form.split("<input");
                        var input = "";
                        for (ii = 1; ii < inputs.length; ii++) {
                            var name = inputs[ii].split('name="');
                            if (name.length > 1)
                                name = name[1].split('"')[0];
                            else
                                continue;
                            var value = inputs[ii].split('value="');
                            if (value.length > 1)
                                value = value[1].split('"')[0];
                            else
                                continue;
                            if (input != "")
                                input += "&";
                            input += name + "=" + value;
                        }
                        if (k < minigames.length) {
                            var seks = 0;
                            dk = 1;
                            if (j + 1 < trs.length) {
                                var span = trs[j+1].getElementsByTagName("span");
                                if (span.length > 0)
                                    for (jj = 0; jj < 1; jj++) {
                                        var timer = span[jj].innerHTML;
                                        if (timer == done) {
                                            seks = 0;
                                        }
                                        else if (timer.indexOf(":") != -1) {
                                            var time = timer.split(":");
                                            seks = parseInt(time[0])*60 + parseInt(time[1]);
                                        }
                                    }
                            }
                            if (seks > 0) {
                                checkInt = window.setTimeout(CheckMinigame,seks*1000);
                                return;
                            }
                            else if (trs[j].style.background.indexOf("success.jpg") != -1 || trs[j].style.background.indexOf("unsuccess.jpg") != -1 || trs[j].style.background.indexOf("normal.jpg") != -1) {
                                var success = PGu_getValue("minigame_success", 0);
                                if (success == 1) {
                                    if (trs[j].style.background.indexOf("success.jpg") == -1) {
                                        PGu_setValue("minigame_value", -1);
                                        PGu_setValue("minigame_success", 0);
                                        success = 0;
                                    }
                                    else
                                        checkInt = window.setTimeout(reload, 300000);
                                }
                                if (success == 0) {
                                    if (trs[j].style.background.indexOf("success.jpg") != -1) {
                                        PGu_setValue("minigame_success", 1);
                                    }
                                    else {
                                        var options = trs[j].innerHTML.split('<option>');
                                        if (options.length == 1) {
                                            reload();
                                            break;
                                        }
                                        var nextValue = PGu_getValue("minigame_value", -1) + 1;
                                        var nextVal = nextValue % (options.length-1);
                                        nextVal = options[nextVal+1].split('<')[0];
                                        if (input != "")
                                            input += "&";
                                        input += 'minigame_count='+nextVal;
                                        multiple = 1;
                                    }
                                }
                            }
                            else if (k < minigames.length) {
                                window.location.href = window.location.protocol + '//' + window.location.host + '/' + minigames[k] + '/minigame/';
                            }
                        }
                        GM_xmlhttpRequest({
                               method:"POST",
                               url: 'http://' + window.location.host + eventurl,
                               headers: {'Content-type': 'application/x-www-form-urlencoded'},
                               data: encodeURI(input),
                               onload:function(responseDetails) {
                                  if (multiple == 1)
                                      PGu_setValue("minigame_value", nextValue);
                                  var pos = responseDetails.finalUrl.indexOf('event=');
                                  if (pos == -1 || !multiple) {
                                      window.location.href = window.location.protocol + '//' + window.location.host + '/activities/';
                                  }
                                  else {
                                      var rc = parseInt(responseDetails.finalUrl.substr(pos+6));
                                      PGu_setValue("minigame_success", (rc==1?1:0));
                                      window.location.href = responseDetails.finalUrl;
                                  }
                               }
                        });
                    }
                    else if (eventurl.indexOf("mayevent") == -1) {
                        window.location.href = window.location.protocol + '//' + window.location.host + eventurl;
                        GM_setValue(TOWNEXTENSION + "eventURL", eventurl);
                    }
                    break;
                }
                if (j + dk < trs.length) {
                    var seks = 0;
                    var span = trs[j+dk].getElementsByTagName("span");
                    for (jj = 0; jj < 1; jj++) {
                        var timer = span[jj].innerHTML;
                        if (timer == done) {
                            seks = 0;
                        }
                        else {
                            var time = timer.split(":");
                            seks = parseInt(time[0])*60 + parseInt(time[1]);
                        }
                    }
                    if (seks > 0) {
                        checkInt = window.setTimeout(reload, seks*1000);
                        return;
                    }
                    else {
                        var eventurl = PG_getValue(TOWNEXTENSION + "eventURL", "");
                        if (eventurl != "")
                            window.location.href = window.location.protocol + '//' + window.location.host + eventurl;
                    }
                }
                break;
            }
        }
    }
}

function insertCheckBox() {
    var newtd = document.createElement("td");
    newtd.setAttribute('style', 'padding-top: 10px; padding-bottom: 10px');
    newtd.innerHTML = '<input name="BCCheckbox" id="BCCheckbox" type="checkbox"><span style="vertical-align: bottom">&nbsp;Automatisch sammeln</span>';
    document.getElementsByName("xycoords")[0].parentNode.insertBefore(newtd, document.getElementsByName("xycoords")[0]);
    document.getElementById("BCCheckbox").checked = PGu_getValue("AutoCollect", false);
    // Click-Handler hinzufügen
    document.getElementById("BCCheckbox").addEventListener("click", function(event) { 
        // Klickstatus speichern
        PGu_setValue("AutoCollect", this.checked);
        if (this.checked) {
            PGu_setValue("AutoCrime", false);
            document.getElementById("SCCheckbox").checked = false;
            var timeOptions = document.getElementsByName("time")[0];
            PGu_setValue(nameLastCollectTime, timeOptions.selectedIndex);
            }
    }, false);
}

function insertCheckBox2() {
    var newtd = document.createElement("td");
    newtd.setAttribute('style', 'padding-top: 10px; padding-bottom: 10px');
    newtd.innerHTML = '<input name="SCCheckbox" id="SCCheckbox" type="checkbox"><span style="vertical-align: bottom">&nbsp;Automatisch starten</span>';
    var buttons = document.getElementsByTagName("button");
    if (buttons.length > 0)
        var button = buttons[0];
    else {
        buttons = document.getElementsByName("xycoords");
        var button = buttons[buttons.length-1];
    }
    button.parentNode.insertBefore(newtd, button);
    document.getElementById("SCCheckbox").checked = PGu_getValue("AutoCrime", false);
    // Click-Handler hinzufügen
    document.getElementById("SCCheckbox").addEventListener("click", function(event) { 
        // Klickstatus speichern
        if (this.checked) {
            PGu_setValue("AutoCollect", false);
            document.getElementById("BCCheckbox").checked = false;
            if (PGu_getValue("AutoCrimeNr", 0) == 0) {
                alert("Bitte erst Verbrechen festlegen !!");
                this.checked = false;
            }
        }
        PGu_setValue("AutoCrime", this.checked);
    }, false);
}

function insertCheckBox3(button) {
    var crimenr = button.parentNode.innerHTML.split("start_crime(")[1].split(")")[0];
    var name = 'CbButton_' + crimenr;
    var newtd = document.createElement("td");
    newtd.setAttribute('style', 'padding-top: 10px; padding-bottom: 10px');
    newtd.innerHTML = '<input name="CbCrime" id="' + name +'" type="checkbox"><span style="vertical-align: bottom">&nbsp;dieses Verbrechen automatisch starten</span>';
    button.parentNode.appendChild(newtd, button);
    var crime = PGu_getValue("AutoCrimeNr", 0);
    if (crimenr == crime)
        document.getElementById(name).checked = true;
    // Click-Handler hinzufügen
    document.getElementById(name).addEventListener("click", function(event) { 
        var crimenr = this.id.split("_")[1];
        // Klickstatus speichern
        if (this.checked) {
            PGu_setValue("AutoCollect", false);
            PGu_setValue("AutoCrime", true);
            PGu_setValue("AutoCrimeNr", crimenr);
            var buttons = document.getElementsByName("CbCrime");
            for (i = 0; i < buttons.length; i++) {
                var crime = buttons[i].parentNode.parentNode.innerHTML.split("start_crime(")[1].split(")")[0];
                if (crime != crimenr)
                    document.getElementById("CbButton_"+crime).checked = false;
            }
        }
        else {
            PGu_setValue("AutoCrimeNr", 0);
            PGu_setValue("AutoCrime", false);
        }
    }, false);
}

// ***********************************************************************************************
// ***********************************************************************************************
// check for enemy game and play it
// ***********************************************************************************************
// ***********************************************************************************************
function CheckEnemygame () {
    if (!document.getElementById("enemy_info"))
        return;
    GM_xmlhttpRequest({method:"GET", url: 'http://' + window.location.hostname + '/enemies/', onload:function(responseDetails) {
            var content = responseDetails.responseText;
            var pos = content.indexOf('id="fight_button');
            if (pos != -1) {
                if (content.substr(pos, 100).indexOf('counter(') == -1)
                    setTimeout(Enemyattack, 1500);
                return;
            }
            pos = content.indexOf('hp_bar_blue');
            if (pos == -1) {
                return;
            }
            else {
                var poscnt = content.indexOf('counter(', pos);
                if (poscnt != -1) {
                    var cnt = parseInt(content.substr(poscnt+8).split(")")[0].split(',')[0]);
                    if (cnt > 0)
                        setTimeout(enemyreload, cnt*1000);
                }
            }
        }
    });
}

function getvcounter () {
    var vcounter = done;
    if (document.getElementsByClassName("chest_counter").length == 0) {
        var tbl = document.getElementsByTagName("table");
        for (i = tbl.length - 1; i > 0; i--)
            if (tbl[i].className)
                if (tbl[i].className == "cbox")
                    break;
        var trs = tbl[i].getElementsByTagName("tr");
        if (trs.length > 2) {
            var span = trs[2].getElementsByTagName("span");
            for (i = 0; i < span.length; i++) {
                if (span[i].id)
                    if (span[i].id.substr(0, 7) == "counter") {
                        vcounter = span[i].innerHTML;
                        if (trimString(vcounter) == done0)        // is the time 00:00 ?
                            vcounter = done;
                        break;
                    }
            }
        }
    }
    return vcounter;
}

function submit(){

    if(window.location.pathname.indexOf("/activities/") != -1 && autoSubmit){
        
        if (document.getElementsByClassName("chest_key_on").length > 0) {
            var href = document.getElementsByClassName("chest_menu")[0].getElementsByClassName("chest_button")[0].href;
            window.location.href = href;
        }

        if (getvcounter() != done) {
            var lastURL = PGu_getValue("AutoCollURL", "");
            if (lastURL != "") {
                PGu_setValue ("AutoCollURL", "");
                window.location.replace( lastURL );
            }
            else {
                PGu_setValue(nameTime, time);
                PGu_setValue("AskedForCollect", 0);
                checkInterval = window.setInterval(check,intervalTime);
            }
            return;
        }

        var lastCollectTime = PGu_getValue(nameLastCollectTime,0);
        
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", true, true);
        
        var timeOptions = document.getElementsByName("time")[0];
        timeOptions.selectedIndex = lastCollectTime;
        timeOptions.dispatchEvent(evt);
        timeOptions.addEventListener( "change",
                          function(){  PGu_setValue(nameLastCollectTime, document.getElementsByName("time")[0].selectedIndex);
                               timeOptionsCaptcha.selectedIndex = timeOptions.selectedIndex; },
                          true );
        
        var timeOptionsCaptcha = timeOptions.cloneNode(true);
        timeOptionsCaptcha.selectedIndex = timeOptions.selectedIndex;
        timeOptionsCaptcha.addEventListener( "change",
                             function(){ PGu_setValue(nameLastCollectTime, document.getElementsByName("time")[0].selectedIndex);
                                 timeOptions.selectedIndex = timeOptionsCaptcha.selectedIndex;},
                             true);

        var captchaHolder = document.getElementById("holder");
        var infoText = captchaHolder.insertBefore(document.createElement('p'),captchaHolder.getElementsByTagName("span")[1]);
        infoText.innerHTML = strTime;
        infoText.appendChild(timeOptionsCaptcha);
        infoText.style.margin = "0px";
        infoText.style.marginTop = "8px";
        captchaHolder.getElementsByTagName("span")[1].style.marginTop = "-8px";
        captchaHolder.getElementsByTagName("span")[1].style.marginLeft = "-10px";
        
        var cancelButton = captchaHolder.getElementsByClassName("cancel")[0];
        cancelButton.style.margin = "0px";
        cancelButton.style.marginLeft = "10px";
        infoText.appendChild(cancelButton);

        var crimeNr = PGu_getValue("AutoCrimeNr", 0);
        var crimeTO = "";
        if (crimeNr > 0)
            crimeTO = " if (document.getElementById('SCCheckbox').checked) window.location = window.location.protocol + '//' + window.location.host + '/activities/crime/?start_crime=" + crimeNr + "'";
        
        setTimeout("if (document.getElementById('BCCheckbox')) if (document.getElementById('BCCheckbox').checked) document.getElementsByName('Submit2')[0].click(); if (document.getElementById('SCCheckbox'))" + crimeTO + ";", 5000); // fails often if to fast
    }
    else {
        PGu_setValue(nameTime, time); //store time for each domain to prevent multiple run in same domain
        checkInterval = window.setInterval(check,intervalTime);
    }
}

function check(){

    if(PGu_getValue(nameTime) != time){ //script started somewhere else
        clearInterval(checkInterval);
        return 0;
    }
    var c=1;
    var posci = document.getElementById("enemy_info")?0:-1;
    if (posci != -1)
        posci = document.getElementById("enemy_info").innerHTML.indexOf('enemy_counter_info');
    if (posci != -1)
        posci = document.getElementById("enemy_info").innerHTML.substr(posci+20,100).indexOf("counter");
    if (posci != -1)
        c=2;
    try{
        fcounter = document.getElementById("counter"+c).innerHTML;
        counter = document.getElementById("counter"+(c+1)).innerHTML;
        if (trimString(counter) == done0)        // is the time 00:00 ?
            counter = done;
    }
    catch(err){
    }

    if (fcounter == done && counter == done || PGu_getValue("AutoCrime", false) && counter == done) {
        if(window.location.pathname.indexOf("/activities/") != -1){
            if (document.getElementsByClassName("chest_key_on").length > 0) {
                var href = document.getElementsByClassName("chest_menu")[0].getElementsByClassName("chest_button")[0].href;
                window.location.href = href;
            }

            if (getvcounter() != done)
                return;                // do nothing, if a crime is planned

            clearInterval(checkInterval); // stop script
            setTimeout(reload, 1000);
            setTimeout(reload, 2000);
        } else {
            GM_xmlhttpRequest({method:"GET", url: 'http://' + window.location.hostname + '/activities/', onload:function(responseDetails) {
                    var content = responseDetails.responseText;

                    var text = content.split("setupForm('/activities/bottle/'");
                    if (text.length > 1) {
                        text = text[1].split('>')[0].split(' ');
                        text = text[text.length-1];
                    }
                    if (text == "disabled") {
                        clearInterval(checkInterval); // stop script
                        checkInterval = window.setInterval(check,intervalTime*5);
                    }
                    /* deaktiviert !!
                    else if (PGu_getValue("AutoCollect", false)) {
                        var lastCollectTime = PGu_getValue(nameLastCollectTime, 0);
                        var timesplit = content.split('name="time"')[1].split("<option");
                        if (timesplit.length > lastCollectTime + 1)
                            var dauer = timesplit[lastCollectTime+1].split('value="')[1].split('"')[0];
                        else
                            var dauer = 10;
                        GM_xmlhttpRequest({method:'POST',
                                           url: 'http://' + window.location.hostname + '/activities/bottle/',
                                           headers: {'Content-type': 'application/x-www-form-urlencoded'},
                                           data: encodeURI('bottlecollect_pending=True'),
                                           onload:function(responseDetails) {
                            var content = responseDetails.responseText;

                                GM_xmlhttpRequest({method:'POST',
                                                   url: 'http://' + window.location.hostname + '/activities/bottle/',
                                                   headers: {'Content-type': 'application/x-www-form-urlencoded'},
                                                   data: encodeURI('sammeln='+dauer),
                                                   onload:function(responseDetails) {
                                    var content = responseDetails.responseText;
                                    var text = content.split("setupForm('/activities/bottle/'");
                                    if (text.length > 1) {
                                        text = text[1].split('>')[0].split(' ');
                                        text = text[text.length-1];
                                    }
                                    if (text == "disabled") {
                                        clearInterval(checkInterval); // stop script
                                        checkInterval = window.setInterval(check,intervalTime*5);
                                    }
                                }});
                        }});
                    } */
                    else {
                        clearInterval(checkInterval); // stop script
                        setTimeout(refer, 10000);
                    }
            }});
        }
    }
    else if (PGu_getValue("RefreshInterval", 0) > 0)
        setTimeout(refer, PGu_getValue("RefreshInterval", 0) * 60000);
}

function refer(){
    var box = PGu_getValue("AutoCollect", false) || PGu_getValue("AutoCrime", false);
    if (box) {          // check input field in Mails and SB
        var f_text = document.getElementById("f_text");
        if (f_text)
            box = f_text.value == "";
    }

    if (!box && PGu_getValue("AskedForCollect", 0) < 3) {
        box = window.confirm( msgDone1 + "\n" + msgDone2 );
        PGu_setValue("AskedForCollect", PGu_getValue("AskedForCollect", 0) + 1);
    }
    if (box) {
        PGu_setValue("AutoCollURL", location.toString());
        window.location.href = window.location.protocol + "//" + window.location.host + "/activities/";
    }
}

function reload(){
    if (oldVersion || !autoSubmit)
        alert(msgDone1);
    window.location.href = window.location.protocol + "//" + window.location.host + "/activities/";
} 

function enemyreload(){
    var box = true;
                        // check input field in Mails and SB
    var f_text = document.getElementById("f_text");
    if (f_text)
        box = f_text.value == "";

    if (!box) {
        box = window.confirm( msgAttackEnemy );
    }
    if (box) {
        window.location.href = location.toString();
    }
}

function Enemyattack(){
    GM_xmlhttpRequest({
           method:"POST",
           url: 'http://' + window.location.host + '/enemies/start_fight/',
           headers: {'Content-type': 'application/x-www-form-urlencoded'},
           data: encodeURI(''),
           onload:function(responseDetails) {
               enemyreload();
           }
           });
} 
// Die eigentliche Funktion
function doTheAction () {
    if (document.getElementsByClassName('zleft profile-data').length > 0)
        oldVersion = 0;

    /*-*/
    var host = window.location.host;
    if (host.substr(0,4) == "www.")
        host = host.substr(4);
    if (host.substr(0,7) == "change.")
        host = host.substr(7);
    if (GM_getValue(host + "_autologin", "xxx") == "xxx") {
        GM_setValue(host + "_autologin", GM_getValue("www." + host + "_autologin", false));
        GM_setValue(host + "_username", GM_getValue("www." + host + "_username", ""));
        GM_setValue(host + "_password", GM_getValue("www." + host + "_password", ""));
        GM_deleteValue("www." + host + "_autologin");
        GM_deleteValue("www." + host + "_username");
        GM_deleteValue("www." + host + "_password");
        GM_deleteValue("change." + host + "_autologin");
        GM_deleteValue("change." + host + "_username");
        GM_deleteValue("change." + host + "_password");
    }

    var login = document.getElementById("loginform");
    if (login) {
        login.addEventListener('submit', function(event) {
                 var input = document.getElementById("loginform").getElementsByTagName("input");
                 for (var i = 0; i < input.length; i++) {
                     if (input[i].name == "username" || input[i].name == "password")
                         GM_setValue(host + "_" + input[i].name, input[i].value);
                 }
                 return true;
            }, false);
    }

    var myprof = document.getElementById("my-profile");
    if (!myprof) {
        function doLogin() {
            var login = document.getElementById("loginform");
            var input = login.getElementsByTagName("input");
            var i = input.length - 1;
            if (document.getElementById("login_username").value != "" &&
                document.getElementById("password").value != "") {
                input[i].click();
            }
            else if (GM_getValue(host + "_username", "") != "" && GM_getValue(host + "_password", "") != "") {
                document.getElementById("login_username").value = GM_getValue(host + "_username", "");
                document.getElementById("password").value = GM_getValue(host + "_password", "");
                input[i].click();
            }
        }
        var user = document.getElementById("login_username");
        if (user) {
            var chb = document.createElement("input");
            chb.type="checkbox";
            chb.id="autologin";
            chb.title="Auto-Login";
            user.parentNode.appendChild(chb, user);
            document.getElementById("autologin").checked = GM_getValue(host + "_autologin", false);
            // Click-Handler hinzufügen
            document.getElementById("autologin").addEventListener("click", function(event) { 
                // Klickstatus speichern
                GM_setValue(host + "_autologin", this.checked);
            }, false);
        }
        if (GM_getValue(host + "_autologin", false))
            window.setTimeout(doLogin, 10000);
        return;
    }
    else if (myprof.getElementsByTagName("form").length > 0) {
        var input = myprof.getElementsByTagName("input");
        if (input.length > 0) {
            myprof.getElementsByTagName("form")[0].addEventListener('mouseup', function(event) {
                GM_setValue(host + "_autologin", false);
            }, false);
        }
    }
    var mobBut = document.getElementById("mobile_button");
    if (mobBut)
        if (mobBut.innerHTML == "Logout") {
            mobBut.getElementsByTagName("form")[0].addEventListener('mouseup', function(event) {
                GM_setValue(host + "_autologin", false);
            }, false);
        }

    // ***********************************************************************************************
    // ***********************************************************************************************
    // -------- Start of program--------------
    // ***********************************************************************************************
    // ***********************************************************************************************

    // Wenn in Berlin gespielt wird
    m_ownuserid = getOwnUserID();
    if (language == "bl_DE") {
        TOWNEXTENSION = 'B';
    // Wenn in München gespielt wird
    } else if (language == "mu_DE") {
        TOWNEXTENSION = 'MU';
    // Wenn in Köln gespielt wird
    } else if (language == "kl_DE") {
        TOWNEXTENSION = 'K';
    // Wenn in Hamburg gespielt wird
    } else if (language == "de_DE") {
        TOWNEXTENSION = 'HH';
    // Wenn in Hamburg reloaded gespielt wird
    } else if (language == "hr_DE") {
        TOWNEXTENSION = 'HR';
    // Wenn in Operation Pennersturm gespielt wird
    } else if (language == "s6_DE") {
        TOWNEXTENSION = 'OP';
    // Wenn in Sylt gespielt wird
    } else if (language == "sy_DE") {
        TOWNEXTENSION = 'SY';
    // Wenn in Malle gespielt wird
    } else if (language == "ml_DE") {
        TOWNEXTENSION = 'ML';
    }
    else if (language == "us_EN") {
        TOWNEXTENSION = 'NY';
    }
    else if (language == "kr_PL") {
        TOWNEXTENSION = 'KR';
    }
    else if (language == "pl_PL" || language == "wr_PL") {
        TOWNEXTENSION = 'WA';
    }
    else if (language == "ma_FR") {
        TOWNEXTENSION = 'MS';
    }
    else if (language == "fr_FR" || language == "cr_FR") {
        TOWNEXTENSION = 'PA';
    }
    else if (language == "ba_ES") {
        TOWNEXTENSION = 'BA';
    }
    else if (language == "es_ES" || language == "er_ES") {
        TOWNEXTENSION = 'MD';
    }
    else if (language == "sp_BR") {
        TOWNEXTENSION = 'SP';
    } 
    else if (language == "pt_BR") {
        TOWNEXTENSION = 'RJ';
    }
    else if (language == "ru_RU") {
        TOWNEXTENSION = 'MO';
    }
    else if (language == "en_EN") {
        TOWNEXTENSION = 'LO';
    }

    CheckForUpdate();

    CheckMinigame();

    CheckEnemygame();

    GM_xmlhttpRequest({method:"GET", url: 'http://' + window.location.hostname + '/city/plundershop/', onload:function(responseDetails) {
    }});
    if (PGu_getValue(nameLastCollectTime, -1) == -1) {
        var keys = GM_listValues();
        for (i = 0; i < keys.length; i++) {
            var val = keys[i];
            if (val.indexOf("-") != -1 || val.indexOf("pennersturm") != -1)
                GM_deleteValue(val);
        }
        PGu_setValue(nameLastCollectTime, 0);
    }

    var c=1;
    var posci = document.getElementById("enemy_info")?0:-1;
    if (posci != -1)
        posci = document.getElementById("enemy_info").innerHTML.indexOf('enemy_counter_info');
    if (posci != -1)
        posci = document.getElementById("enemy_info").innerHTML.substr(posci+20,100).indexOf("counter");
    if (posci != -1)
        c=2;
    try{
        fcounter = document.getElementById("counter"+c).innerHTML;
        counter = document.getElementById("counter"+(c+1)).innerHTML;
        if (trimString(counter) == done0)        // is the time 00:00 ?
            counter = done;
    }
    catch(err){
    }

    if(window.location.pathname.indexOf("/activities/crime/") != -1){
        var buttons = document.getElementsByTagName("button");
        for (i = 0; i < buttons.length; i++)
            insertCheckBox3(buttons[i], i);
    }
    else if(window.location.pathname.indexOf("/activities/") != -1){
        var timeOptions = document.getElementsByName("time")[0];
        timeOptions.selectedIndex = PGu_getValue(nameLastCollectTime,0);
        insertCheckBox();
        insertCheckBox2();
    }

    if (fcounter == done && counter == done || PGu_getValue("AutoCrime", false) && counter == done) 
        submit();
    else {
        var lastURL = PGu_getValue("AutoCollURL", "");
        if (lastURL != "") {
            PGu_setValue ("AutoCollURL", "");
            window.location.replace( lastURL );
        }
        else {
            PGu_setValue(nameTime, time);
            PGu_setValue("AskedForCollect", 0);
            checkInterval = window.setInterval(check,intervalTime);
        }
    }
}

