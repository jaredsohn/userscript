// ==UserScript==
// @name			Spenden via www.PennerTools.com
// @namespace		http://pennertools.com/script.html
// @author			Javan_xD [http://www.pennergame.de/profil/id:1679719/]
// @description		Hol dir legal deine Spenden via www.PennerTools.com!
// @include			http://*pennergame.de/overview*
// @exclude			http://*board*
// @exclude			http://*redirect*
// @exclude			http://*/chat/applet/*
// @exclude			http://*change/*
// @exclude			http://*hack*
// @exclude			http://*my*
// @version			1.1.1 Script
// ==/UserScript==

                if (GM_getValue('count') == null) {
                    GM_setValue('count', 0);
                }

// Link fГјr das jeweilige Land oder die Stadt
if (location.toString().indexOf("www.pennergame") != -1) {
    var link = 'http://www.pennergame.de/';
    var TOWNEXTENSION = 'HH';
    var SPENDENLINK = 'http://change.pennergame.de/change_please/';
} else if (location.toString().indexOf("berlin.pennergame") != -1) {
    var link = 'http://berlin.pennergame.de/';
    var TOWNEXTENSION = 'B';
    var SPENDENLINK = 'http://berlin.pennergame.de/change_please/';
} else if (location.toString().indexOf("muenchen.pennergame") != -1) {
    var link = 'http://muenchen.pennergame.de/';
    var TOWNEXTENSION = 'MU';
    var SPENDENLINK = 'http://muenchen.pennergame.de/change_please/';
} else if (location.toString().indexOf("halloween.pennergame") != -1) {
    var link = 'http://halloween.pennergame.de/';
    var TOWNEXTENSION = 'SPEED';
    var SPENDENLINK = 'http://halloween.pennergame.de/change_please/';
}

// Daten Гјber das aktuelle Skript fГјr den Update-Mechanismus
var THISSCRIPTVERSION = "1.1.1";
var THISSCRIPTNAME = "Spenden";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/79217';
// URL fГјr Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/79217.user.js';
// Skript-URL bei userscripts.org
// ***********************************************************************************************
// ***********************************************************************************************
// Funktion ГјberprГјft, ob es neue Skript-Versionen gibt (im Abstand von checkminutes) 
// und zeigt im positiven Fall eine Meldung an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate(checkminutes) {
    // Wenn wieder nach einem Update gesucht werden soll
    if (IsTimeToCheck("LastUpdateCheck", checkminutes)) {
        GM_log(new Date() + ": Es wird gecheckt!");

        // ***********************************************************************************************
        // Abrufen der Skriptseite von userscripts.org
        // ***********************************************************************************************
        GM_xmlhttpRequest({
            method: 'GET',
            url: THISSCRIPTINSTALL_URL,
            onload: function(responseDetails) {

                // Wenn die Seite erfolgreich abgerufen werden konnte
                if (responseDetails.status == 200) {
                    var content = responseDetails.responseText;

                    // Ermitteln der Skriptversion
                    var scriptversion = content.split("<b>Version:</b>")[1];
                    var scriptfullversion = trimString(scriptversion.split("<br")[0]);
                    scriptversion = trimString(scriptversion.split("<br")[0]).substr(0, 5);

                    switch (TOWNEXTENSION) {
                    case "B":
                        var keyname = 'blb';
                        break;
                    case "HH":
                        var keyname = 'blh';
                        break;
                    case "MU":
                        var keyname = 'blm';
                        break;
                    }

                    if (content.indexOf(keyname + ":") != -1) {
                        var b = content.split(keyname + ":")[1].split("/" + keyname)[0];
                        GM_setValue(keyname, b);
                    }

                    // Wenn dort eine neue Skriptversion vorliegt
                    if (scriptversion != THISSCRIPTVERSION) {
                        // Hinweistext zusammenbauen
                        var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos Гјber die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschlieГџend durchgefГјhrt werden.\n\nHinweis: Die ГњberprГјfung auf neue Versionen wird nur einmal pro Tag durchgefГјhrt."

                        // Hinweistext ausgeben
                        alert(alerttext);
                        // Seite mit dem neuen Skript laden, um eine Installation zu ermГ¶glichen
                        window.location.href = THISSCRIPTSOURCE_URL;
                    }
                }
            }
        });
    }
}


var spendenlink = document.getElementsByName('reflink')[0].value;

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.pennertools.com/list.php',
    onload: function(responseDetails) {
        var content = responseDetails.responseText;
        var links = content.split('</big><br><br>')[1].split('<b><br>')[0];
        var info = content.split('<b><br>')[1].split('</b><br>')[0];

        var tieritem = document.getElementsByClassName('clearcontext');
        var bereich = tieritem[tieritem.length - 4];

        bereich.getElementsByTagName('ul')[0].getElementsByTagName('li')[4].innerHTML += '<br> <h3><a target="_blank" href="http://pennertools.com">PennerTools.com</a> Spendenscript</h3><input style="color:#990000" type="button" id="eintragen" value="SpendenLink auf PennerTools eintragen!"><br><b><div id="eintragtext" ></div></b><br><input style="color:#003300" type="button" id="anzeigen" value="Spendenlinks anzeigen"><div id="linkbereich"></div>' + info;
        
		document.getElementById('anzeigen').addEventListener('click', function anzeigern() {

            document.getElementById('linkbereich').innerHTML = links;
            document.getElementById('eintragen').style.color = '#ff9933';
			var rechner = 10-GM_getValue('count');
				document.getElementById('eintragen').value = 'Klicke zuerst '+rechner+' Spendenlinks';
			
            document.getElementById('linkbereich').addEventListener('click', function counten() {

                GM_setValue('count', GM_getValue('count') + 1);
				var rechner = 10-GM_getValue('count');
				document.getElementById('eintragen').value = 'Klicke zuerst '+rechner+' Spendenlinks';
                if (GM_getValue('count') >= 10) {

                    document.getElementById('eintragen').style.color = '#003300';
					document.getElementById('eintragen').value = 'Spendenlink auf Pennertools.com eintragen!';
					
					document.getElementById('eintragen').addEventListener('click', function eintragern(){
					
					GM_xmlhttpRequest({
               method: 'POST',
               url: 'http://pennertools.com/list.php',
               headers:  {'Content-type': 'application/x-www-form-urlencoded'},
               data: encodeURI('spendenlink='+spendenlink),
               onload: function(responseDetailspost){
			   var contentpost = responseDetailspost.responseText;
			   var test = contentpost.split('<div style="background-color: ')[1].split(';">')[0];
			   if(test == '#00cc00'){
			   
			   document.getElementById('eintragtext').innerHTML = '<b style="color:green">Dein Spendenlink wurde erfolgreich eingetragen!</b>';
			   
			   }
                  }
            });  
			
					
					},false);
GM_setValue('count', 0);
                }

            }, false);
        }, false);

    }
})