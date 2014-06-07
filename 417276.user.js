// ==UserScript==
// @name         Fight-IDs automatisch abgeben
// @namespace    http://userscripts.org/scripts/source/110876.user.js
// @author       edit by wsnwsr
// @version      3.5.1c Titelfilter Update
// @description  Fügt einen Abgabebutton für Downfight neben jedem abgebbaren Kampf in den Fightlisten hinzu
// @include      http://*.pennergame.de/fight/
// @include      http://*.pennergame.de/fight/#*
// @include      http://*.pennergame.de/fight/fightlog/*
// @include      http://*.pennergame.de/fight/overview/*
// @include      http://*.pennergame.de/fight/?status*
// @include      http://*.bumrise.com/fight/
// @include      http://*.bumrise.com/fight/#*
// @include      http://*.bumrise.com/fight/fightlog/*
// @include      http://*.bumrise.com/fight/overview/*
// @include      http://*.bumrise.com/fight/?status*
// @include      http://*.menelgame.pl/fight/
// @include      http://*.menelgame.pl/fight/#*
// @include      http://*.menelgame.pl/fight/fightlog/*
// @include      http://*.menelgame.pl/fight/overview/*
// @include      http://*.menelgame.pl/fight/?status*
// @include      http://*.clodogame.fr/fight/
// @include      http://*.clodogame.fr/fight/#*
// @include      http://*.clodogame.fr/fight/fightlog/*
// @include      http://*.clodogame.fr/fight/overview/*
// @include      http://*.clodogame.fr/fight/?status*
// @include      http://*.mendigogame.es/fight/
// @include      http://*.mendigogame.es/fight/#*
// @include      http://*.mendigogame.es/fight/fightlog/*
// @include      http://*.mendigogame.es/fight/overview/*
// @include      http://*.mendigogame.es/fight/?status*
// @include      http://*.mendigogame.es/profil/*
// @include      http://*.mendigogame.com/fight/
// @include      http://*.mendigogame.com/fight/#*
// @include      http://*.mendigogame.com/fight/fightlog/*
// @include      http://*.mendigogame.com/fight/overview/*
// @include      http://*.mendigogame.com/fight/?status*
// @include      http://*.faveladogame.com.br/fight/
// @include      http://*.faveladogame.com.br/fight/#*
// @include      http://*.faveladogame.com.br/fight/fightlog/*
// @include      http://*.faveladogame.com.br/fight/overview/*
// @include      http://*.faveladogame.com.br/fight/?status*
// @include      http://*.faveladogame.com.br/profil/*
// @include      http://*.bomzhuj.ru/fight/
// @include      http://*.bomzhuj.ru/fight/#*
// @include      http://*.bomzhuj.ru/fight/fightlog/*
// @include      http://*.bomzhuj.ru/fight/overview/*
// @include      http://*.bomzhuj.ru/fight/?status*
// @include      http://*.dossergame.co.uk/fight/
// @include      http://*.dossergame.co.uk/fight/#*
// @include      http://*.dossergame.co.uk/fight/fightlog/*
// @include      http://*.dossergame.co.uk/fight/overview/*
// @include      http://*.dossergame.co.uk/fight/?status*
// @include      *
// ==/UserScript==
// @version      3.5.1c Titelfilter Update & weitere Anpassungen
// @version	 3.5.1 Titelfilter Update
// @version	 3.5.0 Pennerzepter Update
// @version      3.4.9 Titel hinzugefügt
// @version      3.4.8 Titel hinzugefügt
// @version      3.4.7 Titel hinzugefügt
// @version      3.4.6 Premium-Titel hinzugefügt
// @version      3.4.5 Pionier als Titelberücksichtigung hinzugefügt
// @version      3.4.4 Zocker als Titelberücksichtigung hinzugefügt
// @version      3.4.3 Nulpe, Checker und Casanova als Titelberücksichtigung hinzugefügt
// @version      3.4.2 neue Downfight-Subdomain hinzugefügt
// @version      3.4.1 Hippie, Diva und Star als Titelberücksichtigung hinzugefügt
// @version      3.4 Auto-Updater eingefügt
// @version      3.3.6 Lamm, Küken und Osterhase als Titelberücksichtigung hinzugefügt
// @version      3.3.5 Gärtner, Gartenzwerg und Lover als Titelberücksichtigung hinzugefügt
// @version      3.3.4 Clown, SexyKäfer und Sheriff als Titelberücksichtigung hinzugefügt
// @version      3.3.3 Script an jQuery-Änderungen angepasst (live() - on() function)
// @version      3.3.2 Elf, Rudolf und Santa als Titelberücksichtigung hinzugefügt +++ base64 Code für externe Grafik angelegt
// @version      3.3.1 Grinchkiller als Titelberücksichtigung hinzugefügt
// @version      3.3 Sylt hinzugefügt +++ Error-Handling bei der User-Daten-Abfrage verbessert
// @version      3.2.1 Script aufgeräumt +++ Error-Handling verbessert +++ Script besser auskommentiert +++ Einstellungen für Pilger, Gesindel und Legionäre verbessert
// @version      3.2 Multi-Login bei Downfight übernommen +++ Möglichkeit der Anzeige der FightID
// @version      3.1.1 Bugfix des Titel-Problems +++ Bugfix bei zu langen Usernamen +++ Gebäude-Abgabeorte für Mönche angepasst
// @version      3.1 Killabgabe und Gebäudeabgabe mit Auswahlmöglichkeiten und spezieller Abstimmung auf dem Downfight-Account möglich
// @version      3.0 Neues System: Automatische Abgabe der FightIDs
// @version      2.1.0 Bugfix
// @version      2.0.1 Updater Test :)
// @version      2.0 jQuery Include +++ Script gefixt und verbessert +++ Auto-Update installiert
// @version      1.1 Anpassen der Includes +++ Anzeige der FightID auf dem langen Fightlog
//jQuery
GM_xmlhttpRequest({
    method: 'GET',
    url: unescape('http://code.jquery.com/jquery-latest.min.js'),
    onload: function (jquery) {
        start(jquery.responseText)
    }
});
//Update
var ScriptID = '417276';
var THISSCRIPTINSTALL_URLQ = 'http://userscripts.org/scripts/show/' + ScriptID;
var THISSCRIPTSOURCE_URLQ = 'http://userscripts.org/scripts/source/' + ScriptID + '.user.js';
var version = '3.5.1';
//Updatefunktion
function update() {
    var now = (new Date() .getTime() / 86400000) .toString() .split('.') [0];
    var last_update = GM_getValue('last_update', '0');
    if (now - last_update >= 1) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://userscripts.org/scripts/source/' + ScriptID + '.meta.js',
            onload: function (content) {
                var scriptname = (/@name\s*(.*?)\s*$/m.exec(content.responseText)) [1];
                var newversionhistory = (/@version\s*(.*?)\s*$/m.exec(content.responseText)) [1];
                var newversion = (/@version\s*(.*?)\s/m.exec(content.responseText)) [1];
                if (newversion != version) {
                    if (confirm('Es gibt eine neue Version des Skriptes ' + scriptname + ':\n\nVersion: \n' + newversionhistory + '\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos über die neue Version:\n\n ' + THISSCRIPTINSTALL_URLQ + '\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschliessend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt.')) {
                        window.location.href = THISSCRIPTSOURCE_URLQ;
                    }
                }
            }
        }, false);
        GM_setValue('last_update', now);
    }
}
//Script

var server = 'http://downfight.eu/';
//Gespeicherte Grafiken 
var ABGABE_BUTTON = server + 'fightid_abgabe_button.png';
var ABGABE_BUTTON_BASE = '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';
var buttons = true;
var me,
c_str;
function start(jquery) {
    //jQuery Initialisierung
    eval(jquery);
    var l = location.toString();
    if (l.search(/^https?:\/\/([a-z]{3,8}\.)?pennergame\.de\/fight\/(\#[a-z0-9]{1,20}|(fightlog\/(\d{1,5}\/|\?q=.*?)?)|overview\/|\?status=[a-z0-9]{1,20}|\?to=[A-Za-z0-9_\-+\s]{1,30})?$/g) != - 1) {
        //////////////////
        //Script
        //////////////////
        update();
        //Stadt filtern
        var city = $('html') .attr('lang');
        if (typeof city != 'undefined' && city != false) {
            switch (city) {
            case 'de_DE':
                var url = 'http://www.pennergame.de/';
                break;
            case 'mu_DE':
                var url = 'http://muenchen.pennergame.de/';
                break;
            case 'bl_DE':
                var url = 'http://berlin.pennergame.de/';
                break;
            case 'kl_DE':
                var url = 'http://koeln.pennergame.de/';
                break;
            case 'hr_DE':
                var url = 'http://reloaded.pennergame.de/';
                break;
            case 'sy_DE':
                var url = 'http://sylt.pennergame.de/';
                break;
            default:
                var url = 'http://www.pennergame.de/';
                set_error('Die Stadt in der du spielst konnte nicht erkannt werden. Bitte an den Autor wenden.');
            }
            //Oberfläche generieren

            var myhtml = '<tr id="fightids">';
            myhtml += '<td colspan="2"><span style="float:left"><img src="' + ABGABE_BUTTON + '" alt="DF" width="12" height="12" border="0" />&nbsp;&nbsp;<strong><a href="http://userscripts.org/scripts/source/110876.user.js" title="Update suchen">K&auml;mpfe bei Downfight abgeben</a></strong>&nbsp;&nbsp;';
            myhtml += '<a style="cursor:pointer" class="tooltip">[?]<br>';
            myhtml += '<span>';
            myhtml += '<strong>Fight-Abgabe</strong><br /><br />Mit einem Klick auf den Button <img src="' + ABGABE_BUTTON + '" alt="DF" width="12" height="12" border="0" /> neben jedem Kampf wird dieser bei downfight.de abgegeben.<br /><br />';
            myhtml += '<strong>Killsabgabe:</strong><br />Es wird zun&auml;chst gepr&uuml;ft, ob du Soldat, Legion&auml;r, M&ouml;nch oder Gesindel bist. Danach werden an der entsprechenden Stelle deine Kills gegen Legion&auml;re/Soldaten, Pilger und Cheater abgegeben.<br /><br />';
            myhtml += '<strong>Down- und Hochfighter:</strong><br />Hast du erfolgreich gegen Down- oder Hochfighter, bzw. Legion&auml;re oder Gesindel gek&auml;mpft, kann die ID in verschiedenen Geb&auml;uden des Downlands abgegeben werden. Welches es nun sein soll, kannst du hier einstellen.<br /><br />';
            myhtml += '</span>';
            myhtml += '</a><span style="float:left"><strong><a href="http://userscripts.org/scripts/versions/417276" title="Changelogs" target="_blank">Changelogs</a></strong></span><span style="float:right"><input type="checkbox" name="fightid_setting_showid" id="fightid_showid"/><label for="fightid_showid">&nbsp;&nbsp;Textfeld mit FightID anzeigen</label></span><br /><hr size="1">';
            myhtml += '<div id="fightid_status"></div>';
            myhtml += '<span id="fightid_setting_container"><strong>Abgabeart:</strong>&nbsp;&nbsp;&nbsp;<span id="fightid_settings"><input value="kill" type="radio" id="fightid_setting_kill" name="fightid_setting"><label for="fightid_setting_kill">&nbsp;Killsabgabe</label>&nbsp;&nbsp;<input value="geb" type="radio" id="fightid_setting_geb" name="fightid_setting"><label for="fightid_setting_geb">&nbsp;Geb&auml;udeabgabe</label></span><br />';
            myhtml += '<span id="fightid_geb_settings"><strong>Du bist Hochfighter::</strong>&nbsp;&nbsp;&nbsp;<span id="fightid_downfightstring">-/-</span><br />';
            myhtml += '<strong>Du bist Downfighter:</strong>&nbsp;&nbsp;&nbsp;<span id="fightid_hochfightstring">-/-</span></span></span>';
            myhtml += '<hr size="1">';
            myhtml += '</td>';
            myhtml += '</tr>';
            //Einstellungsbereich auf der Fight-Seite plazieren
            $('table.cbox > tbody > tr:nth-child(10)') .after(myhtml);
            $tr = $('table.tieritemA > tbody > tr:first') .next('tr');
            $tr.before(myhtml) .prev('tr#fightids') .find('hr') .css('margin-top', '8px');
            $tr.prev('tr#fightids') .find('td') .prepend('<hr size="1" style="margin-bottom:8px">');
            $('#fightid_setting_container') .hide();
            $('div#fightid_status') .css({
                width: '99%',
                textAlign: 'center',
                padding: '2px',
                margin: '5px 0px 10px 0px',
                borderRadius: '3px',
                MozBorderRadius: '3px',
            }) .hide();
            //Gebäude generieren
            var df_casino = '<input value="df_casino" type="radio" id="fightid_df_casino" name="fightid_df"><label for="fightid_df_casino">&nbsp;Casino</label>';
            var df_pub = '<input value="df_pub" type="radio" id="fightid_df_pub" name="fightid_df"><label for="fightid_df_pub">&nbsp;O´Hooligans Irish Pub</label>';
            var df_kloster = '<input value="df_kloster" type="radio" id="fightid_df_kloster" name="fightid_df"><label for="fightid_df_kloster">&nbsp;Unteres Kloster</label>';
            var hf_puff = '<input value="hf_puff" type="radio" id="fightid_hf_puff" name="fightid_hf"><label for="fightid_hf_puff">&nbsp;Downfightpuff</label>';
            var hf_alchimist = '<input value="hf_alchimist" type="radio" id="fightid_hf_alchimist" name="fightid_hf"><label for="fightid_hf_alchimist">&nbsp;Alchimist</label>';
            var hf_kloster = '<input value="hf_kloster" type="radio" id="fightid_hf_kloster" name="fightid_hf"><label for="fightid_hf_kloster">&nbsp;Oberes Kloster</label>';
            var ges_legi = '<input value="ges_legi" type="radio" id="fightid_ges_legi" name="fightid_df"><label for="fightid_ges_legi">&nbsp;Al Katzone&#39;s</label>';
            var legi_ges = '<input value="legi_ges" type="radio" id="fightid_legi_ges" name="fightid_df"><label for="fightid_legi_ges">&nbsp;Fels beim alten Wohnturm</label>';
            //Eigene User-ID auslesen
            var myid = $('div.zleft.profile-data > span.el2:first') .text();
            //Einzigartigen String aus Profil-ID und Stadtkürzel erstellen -> für benutzerdefinierte Einstellungen
            if (typeof myid != 'undefined')
            c_str = '_' + myid + '_' + city;
             else
            set_error('Deine User-ID konnte nicht ausgelesen werden. Bitte Seite neu laden.');
            //Username auslesen + Workaround für zu lange Usernamen
            var me_value = GM_getValue('me' + c_str);
            if (typeof me_value == 'undefined' || me_value == null || me_value.length == 0) {
                set_error('Dein Username wird geladen ...');
                var m = $('div.zleft.profile-data span.user_name') .text();
                if (m.substr( - 3) == '...') {
                    set_error('Dein Username ist zu lang ...');
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: url + 'overview/',
                        synchronous: true,
                        onload: function (home) {
                            var h = home.responseText;
                            //alert($('div.settingpoint > span:first', $(h)).length);
                            var name = $('div.settingpoint > span:first', h) .html();
                            //alert(name);
                            GM_setValue('me' + c_str, name);
                            set_status('Dein Username "' + name + '" wurde erfolgreich geladen und abgespeichert!');
                            me = name;
                        },
                        onerror: function () {
                            set_error('Das Laden deines Usernamens ist fehlgeschlagen. Seite bitte neu laden!');
                        },
                        ontimeout: function () {
                            set_error('Das Laden deines Usernamens ist fehlgeschlagen. Seite bitte neu laden!');
                        },
                    });
                } 
                else {
                    GM_setValue('me' + c_str, m);
                    set_status('Dein Username "' + m + '" wurde erfolgreich geladen und abgespeichert!');
                    me = m;
                }
            } 
            else
            me = GM_getValue('me' + c_str);
            //Eigene DownFight-Daten prüfen und Gebäudestrings setzen
            set_error('Lade Downfight-Daten ...');
            var fighter,
            groupnr,
            sperrstufe;
            //Multi-Login für DownFight initialisieren
            var subdomain = new Array('', '1.', '2.', '3.', '');
            var s = 0;
            function df_login(start) {
                if (start < subdomain.length - 1) {
                    set_error('Loginversuch bei Downfight ...');
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: 'http://' + subdomain[start] + 'downfight.de/?seite=login',
                        onload: function () {
                            set_error('Downfight-Login erneuert ...');
                            var opiurl = 'http://' + subdomain[start] + 'downfight.de/opi.php?username=' + me + '&stadt=' + city + '&showlogin=1';
                            GM_xmlhttpRequest({
                                method: 'GET',
                                url: unescape(opiurl),
                                onload: function (opi) {
                                    set_error('Lade personalisiere Daten ...');
                                    var content = opi.responseText;
                                    var login = $(content) .find('loggedin') .html();
                                    if (login == 0) {
                                        set_error('<a href="http://' + subdomain[start] + 'downfight.de/?seite=login" target="_blank">Bitte logge dich zuerst bei Downfight ein!</a>');
                                        s++;
                                        df_login(s);
                                    } 
                                    else if (login == 1) {
                                        set_error('<a href="http://downfight.de/?seite=Logout|login" target="_blank">Bitte logge dich zuerst mit <b>deinem</b> Account bei Downfight ein!</a>');
                                        s++;
                                        df_login(s);
                                    } 
                                    else if (login == 2) {
                                        groupnr = $(content) .find('groupnr') .html();
                                        var group = $(content) .find('group') .html();
                                        sperrstufe = $(content) .find('sperrstufe') .html();
                                        set_status('Bei Downfight eingeloggt! Deine Gruppe: ' + group);
                                        //Pilger
                                        if (sperrstufe == 7) {
                                            var kl = (groupnr == 2) ? df_kloster + '&nbsp;&nbsp;&nbsp;' : '';
                                            var kl = (groupnr == 1) ? legi_ges + '&nbsp;&nbsp;&nbsp;' : kl;
                                            var kl = (groupnr == 5) ? ges_legi + '&nbsp;&nbsp;&nbsp;' : kl;
                                            var downfightstring = kl + df_casino + '&nbsp;&nbsp;&nbsp;' + df_pub;
                                            var hochfightstring = '-/-';
                                            $('input#fightid_setting_geb') .prop('checked', true);
                                            $('input#fightid_df_casino') .prop('checked', true);
                                            $('#fightid_settings input') .prop('disabled', true);
                                            GM_setValue('abgabe_settings_' + c_str, 'geb');
                                            fighter = 'Pilger';
                                        }
                                        //Soldaten
                                         else if (groupnr == 0) {
                                            var downfightstring = df_casino + '&nbsp;&nbsp;&nbsp;' + df_pub;
                                            var hochfightstring = hf_alchimist + '&nbsp;&nbsp;&nbsp;' + hf_puff;
                                            $('input#fightid_hf_alchimist') .prop('checked', true);
                                            fighter = 'Soldat';
                                        }
                                        //Legionäre
                                         else if (groupnr == 1) {
                                            var downfightstring = df_casino + '&nbsp;&nbsp;&nbsp;' + df_pub + '&nbsp;&nbsp;&nbsp;' + legi_ges;
                                            var hochfightstring = hf_alchimist + '&nbsp;&nbsp;&nbsp;' + hf_puff;
                                            $('input#fightid_hf_alchimist') .prop('checked', true);
                                            fighter = 'Legion&auml;r';
                                        }
                                        //Mönche
                                         else if (groupnr == 2) {
                                            var downfightstring = df_kloster + '&nbsp;&nbsp;&nbsp;' + df_casino + '&nbsp;&nbsp;&nbsp;' + df_pub;
                                            var hochfightstring = hf_kloster + '&nbsp;&nbsp;&nbsp;' + hf_alchimist + '&nbsp;&nbsp;&nbsp;' + hf_puff;
                                            fighter = 'M&ouml;nch';
                                        }
                                        //Gesindel
                                         else if (groupnr == 5) {
                                            var downfightstring = ges_legi + '&nbsp;&nbsp;&nbsp;' + df_casino + '&nbsp;&nbsp;&nbsp;' + df_pub;
                                            var hochfightstring = hf_alchimist + '&nbsp;&nbsp;&nbsp;' + hf_puff;
                                            $('input#fightid_hf_alchimist') .prop('checked', true);
                                            fighter = 'Gesindel';
                                        } 
                                        else {
                                            set_error('Deine Downfight-Gruppe ist diesem Script noch nicht bekannt! Bitte an den Autor wenden!');
                                            buttons = false;
                                        }
                                        $('span#fightid_downfightstring') .html(downfightstring);
                                        $('input#fightid_df_casino') .prop('checked', true);
                                        $('span#fightid_hochfightstring') .html(hochfightstring);
                                        $('input#fightid_df_kloster') .prop('checked', true)
                                        /*.prop('disabled', true)*/
                                        ;
                                        $('input#fightid_hf_kloster') .prop('checked', true)
                                        /*.prop('disabled', true)*/
                                        ;
                                        $('label[for*="fightid_"]') .css('display', 'inline');
                                        //Gespeicherte Werte für Radio-Inputs setzen
                                        if (typeof GM_getValue('abgabe_df_' + c_str) != 'undefined' && GM_getValue('abgabe_df_' + c_str) != false)
                                        $('input[name*="fightid_df"][value="' + GM_getValue('abgabe_df_' + c_str) + '"]') .prop('checked', true);
                                        if (typeof GM_getValue('abgabe_hf_' + c_str) != 'undefined' && GM_getValue('abgabe_hf_' + c_str) != false)
                                        $('input[name*="fightid_hf"][value="' + GM_getValue('abgabe_hf_' + c_str) + '"]') .prop('checked', true);
                                        //Standardwert für Anzeige der FightIDs setzen
                                        var show_set = GM_getValue('showid_' + c_str);
                                        if (typeof show_set == 'undefined' || show_set == '')
                                        GM_setValue('showid_' + c_str, 'false');
                                        $('input#fightid_showid') .prop('checked', (GM_getValue('showid_' + c_str) == 'true') ? true : false);
                                        //Abgabe-Einstellungen setzen und/oder Untermenü anzeigen
                                        var ab_set = GM_getValue('abgabe_settings_' + c_str);
                                        if (typeof ab_set == 'undefined' || ab_set == '')
                                        GM_setValue('abgabe_settings_' + c_str, 'kill');
                                        var gmsetting = GM_getValue('abgabe_settings_' + c_str);
                                        if (gmsetting == 'kill' && sperrstufe != 7) {
                                            $('input#fightid_setting_kill') .prop('checked', true);
                                            $('span#fightid_geb_settings') .css('display', 'none');
                                        } 
                                        else if (gmsetting == 'geb' || sperrstufe == 7) {
                                            $('input#fightid_setting_geb') .prop('checked', true);
                                            $('span#fightid_geb_settings') .css('display', 'block');
                                        } 
                                        else {
                                            set_error('Die Abgabe-Einstellungen deiner FightIDs sind fehlerhaft. Bitte die Seite neu laden.');
                                            GM_setValue('abgabe_settings_' + c_str, 'kill');
                                        }
                                        //Input click-Handler

                                        $('input.fightid_input') .on('mousedown click', function () {
                                            $(this) .select();
                                        });
                                        //Radiobuttons Settings change-Handler
                                        $('input[name*="fightid_setting"]') .on('change', function () {
                                            if ($(this) .attr('id') == 'fightid_showid') {
                                                //Anzeige der FightID
                                                GM_setValue('showid_' + c_str, ($(this) .prop('checked') == true) ? 'true' : 'false');
                                            } 
                                            else {
                                                //Abgabeeinstellungen Kill/Gebäude
                                                GM_setValue('abgabe_settings_' + c_str, $(this) .val());
                                                ($(this) .val() == 'kill') ? $('span#fightid_geb_settings') .css('display', 'none')  : $('span#fightid_geb_settings') .css('display', 'block');
                                                ($('td[id*="userprofileid:"]') .length >= 1) ? $('img.fightid_button') .remove()  : $('div.fightid_abgabebutton') .remove();
                                            }
                                            create_buttons();
                                        });
                                        //Radiobuttons Downfight change-Handler
                                        $('input[name*="fightid_df"]') .on('change', function () {
                                            GM_setValue('abgabe_df_' + c_str, $(this) .val());
                                        });
                                        //Radiobuttons Hochfight change-Handler
                                        $('input[name*="fightid_hf"]') .on('change', function () {
                                            GM_setValue('abgabe_hf_' + c_str, $(this) .val());
                                        });
                                        //Status ausblenden dblclick-Handler
                                        $('div#fightid_status') .dblclick(function () {
                                            $('div#fightid_status') .hide();
                                        });
                                        if (groupnr == 0) {
                                            var df_list_string = 'http://' + subdomain[s] + 'downfight.de/killerlog/fakersend.php?user=' + me + '&ordner=killerlog&killstadt=' + city;
                                        } 
                                        else if (groupnr == 1 || groupnr == 2 || groupnr == 5) {
                                            var df_list_string = 'http://' + subdomain[s] + 'downfight.de/hauptquartier/fakersend.php?user=' + me + '&ordner=hauptquartier&killstadt=' + city;
                                        } 
                                        else {
                                            set_error('Deine Downfight-Gruppe ist diesem Script noch nicht bekannt! Bitte an den Autor wenden!');
                                            buttons = false;
                                        }
                                        $('#fightid_setting_container') .show();
                                        create_buttons();
                                    } 
                                    else {
                                        if (content.indexOf('<Downfight></Downfight>') != - 1)
                                        set_error('Du bist in dieser Stadt noch nicht verifiziert oder freigeschaltet.<br />Falls du schon freigeschaltet bist, versuche, dich auf Downfight in eine Liste <a target="_blank" href="http://downfight.de/?seite=voreintragen">einzutragen</a>!');
                                         else
                                        set_error('Downfight ist gerade &uuml;berlastet. Versuche es in ein paar Minuten noch einmal!');
                                    }
                                },
                                onerror: function () {
                                    set_error('Derzeit keine Verbindung zu Downfight!');
                                    $('span#fightid_downfightstring') .html('-/-');
                                },
                                ontimeout: function () {
                                    set_error('Derzeit keine Verbindung zu Downfight!');
                                    $('span#fightid_hochfightstring') .html('-/-');
                                },
                            });
                        },
                        onerror: function () {
                            set_error('Derzeit keine Verbindung zu Downfight!');
                        },
                        ontimeout: function () {
                            set_error('Die Verbindung zu Downfight dauert zu lange!');
                        },
                    });
                }
            }
            df_login(s);
            //Funktion kreiert die Abgabebuttons
            function create_buttons() {
                if (buttons == true) {
                    var showid = GM_getValue('showid_' + c_str);
                    $('tr > td a[href*="/profil/id:"]') .closest('td') .prev('td') .each(function () {
                        if ($(this) .find('img.fightid_button') .length < 1) {
                            var src = $(this) .closest('tr') .find('a[href*="/fight/viewfight/"] img') .attr('src');
                            var type = false;
                            var set = false;
                            if (GM_getValue('abgabe_settings_' + c_str) == 'kill')
                            set = true;
                            if (src.match(/.*?\/1_0(kopie)?\.gif$/) || (src.match(/.*?\/1_1(kopie)?\.gif$/) && (groupnr == 1 || groupnr == 5)))
                            type = 'df';
                             else if (src.match(/.*?\/0_0(kopie)?\.gif$/) && set == false && sperrstufe != 7)
                            type = 'hf';
                             else if (src.match(/.*?\/(0_0|0_1|1_1)(kopie)?\.gif$/) && set == true)
                            type = 'kill';
                            if (type != false) {
                                $(this) .closest('table') .find('tr td') .removeAttr('width') .css('width', '');
                                var href = '<img src="' + ABGABE_BUTTON + '" class="fightid_button" alt="DF" fightidtype="' + type + '" title="Kampf bei Downfight abgeben" width="12" height="12" border="0" style="cursor:pointer" />';
                                $(this) .append('<div class="fightid_abgabebutton" style="float:right"></div>');
                                $(this) .next('td[id*="userprofileid:"]') .prev('td') .find('div.fightid_abgabebutton') .remove();
                                ($(this) .find('div.fightid_abgabebutton') .length != 0) ? $(this) .find('div.fightid_abgabebutton') .append(href + '&nbsp;&nbsp;&nbsp;')  : $(this) .append(href);
                                //Abgabe click-Handler
                                $('img.fightid_button', this) .on('click', function () {
                                    switch ($('input[name=fightid_df]:checked') .val()) {
                                    case 'df_casino':
                                        var df_gebaeude = '226';
                                        var df_gebaeudestring = 'im Casino';
                                        break;
                                    case 'df_pub':
                                        var df_gebaeude = '156';
                                        var df_gebaeudestring = 'im Pub';
                                        break;
                                    case 'df_kloster':
                                        var df_gebaeude = '233';
                                        var df_gebaeudestring = 'im unteren Kloster';
                                        break;
                                    case 'ges_legi':
                                        var df_gebaeude = '293';
                                        var df_gebaeudestring = 'im Al Katzone&#39;s';
                                        break;
                                    case 'ges_legi':
                                        var df_gebaeude = '248';
                                        var df_gebaeudestring = 'am Fels beim alten Wohnturm';
                                        break;
                                    default:
                                        var df_gebaeude = '226';
                                        var df_gebaeudestring = 'im Casino';
                                    }
                                    switch ($('input[name=fightid_hf]:checked') .val()) {
                                    case 'hf_puff':
                                        var hf_gebaeude = '55';
                                        var hf_gebaeudestring = 'im Puff';
                                        break;
                                    case 'hf_alchimist':
                                        var hf_gebaeude = '215';
                                        var hf_gebaeudestring = 'beim Alchimisten';
                                        break;
                                    case 'hf_kloster':
                                        var hf_gebaeude = '234';
                                        var hf_gebaeudestring = 'im unteren Kloster';
                                        break;
                                    default:
                                        var hf_gebaeude = '55';
                                        var hf_gebaeudestring = 'im Puff';
                                    }
                                    var id_href = $(this) .closest('tr') .find('td > a[href*="/fight/viewfight/"]') .attr('href');
                                    var id = id_href.match(/^\/fight\/viewfight\/(\d+)\/$/) [1];
                                    var temp_user = $(this) .closest('tr') .find('td a[href*="/profil/id:"]') .text() .trim();
                                    var user = temp_user.replace(/^(Hexe|Hexer|Omaschreck|Narr|Zockerin|Zocker|Trickbetrügerin|Trickbetrüger|Kämpfer|Kämpferin|Pionierin|Pionier|Gärtnerin|Gärtner|Käpt'n|Berserker|Zauberin|Zauberer|Vampirin|Vampirin|Vampir|Zooleiter|Trickbetrüger|Bankräuber|Mafiaboss|Strohdieb|Zapfmeister|Zeltmeister|Hobbybayer|Langfinger|Kampfmaschine|Abenteurer|Freibeuter|Pirat|Korsar|Goldgräber|Burgherr|Reiseleiter|Pionier|Premium Gold|Premium Silber|Premium Bronze|Friese|Steuermann|Käpt'n|Matrose|Kämpfer|Berserker|Bierkönig|Zombie|Vampir|Werwolf|Grinchkiller|Elf|Rudolf|Santa|Clown|SexyKäfer|Sheriff|Gärtner|Gartenzwerg|Lover|Lamm|Küken|Osterhase|Hippie|Diva|Star|Nulpe|Checker|Casanova|Zocker)\s/g, '') .trim();
                                    var link;
                                    if (GM_getValue('abgabe_settings_' + c_str) == 'geb') {
                                        var fields = {
                                            'eintrageusername': user,
                                            'eintragecheck': id,
                                            'eintragestadt': city
                                        };
                                        var gebaeude = ($(this) .attr('fightidtype') == 'df') ? df_gebaeude : hf_gebaeude;
                                        var gebaeudestring = ($(this) .attr('fightidtype') == 'df') ? df_gebaeudestring : hf_gebaeudestring;
                                        link = 'http://' + subdomain[s] + 'downfight.de/?seite=gebaeude|' + gebaeude;
                                        set_status(user + ' (' + id + ') ' + gebaeudestring + ' abgegeben');
                                        if (hf_gebaeude == '55')
                                        fields.sendfid = 'jo';
                                    } 
                                    else {
                                        var fields = {
                                            'killeratteintrag': '0',
                                            'killerdefeintrag': '0',
                                            'fname': me,
                                            'passwort': '',
                                            'killstadt': city,
                                            'opfernameeintrag[]': user,
                                            'f_id_opfernameeintrag[]': id,
                                            'f_id_opfernameburg': '',
                                            'fbetreff': 'Legionär',
                                            'senden': 'senden',
                                        };
                                        if (groupnr == 0) {
                                            fields.fbetreff = 'Freiheitskaempfer';
                                            link = 'http://' + subdomain[s] + 'downfight.de/killerlog/buch_funktionen.php?ordner=killerlog';
                                        } 
                                        else if (groupnr == 1 || groupnr == 2 || groupnr == 5) {
                                            link = 'http://' + subdomain[s] + 'downfight.de/hauptquartier/buch_funktionen.php?ordner=hauptquartier';
                                        } 
                                        else
                                        set_status('Etwas ist schiefgelaufen :( Schreibe den Autor an!');
                                        set_status('Der Kill gegen ' + user + ' (' + id + ') wurde als ' + fighter + ' abgegeben');
                                    }
                                    $('form#fightid_post_form') .remove();
                                    $('body') .append('<form method="post" action="' + link + '" target="_blank" name="fightid_post" id="fightid_post_form"></form>');
                                    var note = '';
                                    $.each(fields, function (k, v) {
                                        $('form#fightid_post_form') .append('<input type="hidden" name="' + k + '" value="' + v + '" />');
                                        note += k + ' : ' + v + '\n';
                                    });
                                    //alert(note);
                                    $('form#fightid_post_form') .submit();
                                });
                            }
                        }
                        if (showid == 'true') {
                            if ($(this) .next('td') .find('input.fightid_input') .length < 1) {
                                var html = $(this) .next('td') .html();
                                $(this) .next('td') .html('<span style="float:left" class="fightid_container">' + html + '</span>');
                                $(this) .closest('tr') .find('a[href*="/fight/viewfight/"]') .attr('href') .match(/\/(\d+)\/$/g);
                                var tempid = RegExp.$1;
                                $(this) .next('td') .append('<span style="float:right;margin-right:3px"><input style="width:60px" type="text" class="fightid_input" value="' + tempid + '"/></span>');
                            }
                        } 
                        else if (showid == 'false') {
                            var html = $(this) .next('td') .find('span.fightid_container') .html();
                            $('input.fightid_input') .parent('span') .remove();
                            $(this) .next('td') .html(html);
                        } 
                        else {
                            set_error('Es ist zu einem Fehler beim Auslesen deiner Einstellungen gekommen. Bitte die Seite neu laden.');
                            GM_setValue('showid_' + c_str, 'false');
                        }
                    });
                }
            }
            //Durch Fightinfo neu generierte Kampflisten mit Buttons versehen (Vollständiger Kampflog)

            if (location.toString() .indexOf('/fight/fightlog/') != - 1) {
                window.setInterval(function () {
                    create_buttons();
                }, 1000 * 5);
            }
        } 
        else {
            set_error('Es ist zu einem Problem bei Pennergame gekommen. <br />Sollte der Fehler weiterhin auftreten, bitte den Autor anschreiben!');
            $('input[id*="fightid_"]') .prop('disabled', true);
        }
    }
    //Errorfunktion für HTTP-Requests

    function set_error(text) {
        $('div#fightid_status') .css('background-color', '#880000') .html(text) .show();
        $('input#fightid_submit') .prop('disabled', true);
    }
    //Statusfunktion

    function set_status(text) {
        $('div#fightid_status') .css('background-color', '#008800') .html(text) .show();
    }
    //////////////////
    //Script
    //////////////////

}
