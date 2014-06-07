// ==UserScript==
// @name           Pimp My Dragosien
// @namespace      Uranos
// @description    Erweitert das Browserspiel Dragosien mit zusätzlichen Funktionen, die die Bedienung erleichtern sollen.
// @icon           http://s3.amazonaws.com/uso_ss/icon/78439/large.png
// @updateURL      http://userscripts.org/scripts/source/78439.meta.js
// @downloadURL    http://userscripts.org/scripts/source/78439.user.js
// @include        http://*dragosien.de/*
// @include        http://*dragosien.com/*
// @include        http://*dragosien.org/*
// @include        http://dragosien.browsergames.popmog.com/*
// @exclude        http://board.dragosien.de/*
// @exclude        http://board2.dragosien.de/*
// @author         Uranos
// @version        2.12.6
// @new            Fehler bei der Anzeige der Extra-Tabs behoben
// ==/UserScript==



var version = "2.12.6";
/* Funktionen:
 1. Marktnummerierung: Die eigenen Angebote und Nachfragen auf der Marktübersicht sind jetzt
    nummeriert. So erkennt man leichter ob bereits etwas verkauft oder geliefert wurde, ohne dass
    man erst alles durch zählen muss.
 2. BB-Codes: Man muss auf den Drachen- und Gildenprofilen die BBCodes nicht mehr per Hand
    eintippen. Einfach den Text markieren und dann auf den gewünschten Code klicken, um den Text
    entsprechend zu formatieren. Ist nichts markiert wird der Code einfach an der Cursor-Position
    eingefügt.
    Der Code für die Schriftfarbe öffnet eine kleine Tabelle mit einer kleinen Farbauswahl, hier
    kann man die Wunschfarbe auswählen und sie wird direkt mit eingefügt. Gegebenenfalls kann man
    den Farbcode danach immer noch anpassen. Die Farbe rechts oben f Ecke ist die gleich Farbe
    wie der Hintergrund der Seite. Text in dieser Farbe wird also unsichtbar.
 3. Kartennavigation: Auf der Karte erscheint jetzt links oben ein Formular, in dem man nur die
    Zielkoordinaten eintippen muss, mit Enter oder Klick auf den "teleportieren"-Button gehts dann
    direkt zu eingegebenen Stelle. So muss man nicht immer ewig auf der Karte herumklicken, um auch
    weiter entfernte Orte zu erreichen.
 4. Schatzkarten-Teleport: Mit dieser Funktion werden Schatzkarten in magische Teleport-Schlüssel
    verwandelt. Man braucht einfach auf die angegebenen Koordinaten klicken und landet direkt an
    der Stelle mit dem Schatz. Nur graben muss man noch selbst. ;-)
 5. Gildenchat Links klickbar machen: Wenn jemand in der Gilde eine URL im Chat schreibt muss man
    diese nicht erst umständlich heraus kopieren. Sie wird direkt in einen Link umgewandelt, der
    sich mit einfachem Klick öffnen lässt.
 6. Gildenchat größeres Eingabefeld: Statt einer einzeiligen Eingabe gibt es nun ein größeres
    Textfeld, in dem man auch lange Texte verfassen kann.
    ACHTUNG: Unter Umständen kann es in der Gilde nicht erwünscht sein, zu lange Texte im Chat zu
    verfassen. Vor Benutzung dieser Funktion sollte man sich also besser mit der Gilde absprechen!
 7. Nachrichtenlinks klickbar machen: Alle URLs in privaten Nachrichten, die mit
    http:// beginnen werden automatisch in richtige Links umgewandelt. UPDATE: Auch Links mit www.
 8. Eingabe Tausender-Mengen: Wenn man eine Weile gespielt hat braucht man immer größere Mengen an
    Waren. Und dann wird es etwas nervig, wenn man bei der Eingabe von Nachfragen, oder Rohstoff-
    Bereitstellungen immer so viele Nullen eingeben muss, bei denen man sich leicht mal verzählen
    kann. Nun muss man einfach nur ein k eingeben (k für Kilo=Tausend) oder ein + (weils so schön
    auf dem Ziffernblock liegt) und es wird automatisch in 3 Nullen umgewandelt. So kann man
    leichter Tausender-Mengen handhaben.
 9. Markt im Hauptmenü: Der Markt ist nun auf jeder Seite immer über das Hauptmenü zu erreichen.
10. Arenatab in der Gildenhalle: In der Gildenhalle erscheint neben den üblichen Tabs (News,
    Gildenlager, Ausbauen, Chat) nun ein zusätzlicher Tab, der einen direkt zur Gildenarena bringt.
    So hat man diese Funktion gleich in der Nähe und braucht nicht umständlich zum Ende der
    Newsseite scrollen, oder über den Reiter H gehen.
11. Sitter merken: Hat man seinen Drachen einmal zum Sittern geschickt, merkt sich das Script den
    Sitter und trägt ihn in Zukunft bereits in das Formular ein, sodass man bei nächsten Sittern
    nur noch senden drücken braucht. Gibt man stattdessen einen anderen Sitter ein, wird der für
    das nächste Mal gemerkt.
12. Warnung bei schlechtem Zustand: Fällt der Erhaltungszustand eines Gebäudes unter 5% wird eine
    Warnung ausgegeben, wenn man das Gebäude besucht, damit man es nicht übersieht.
    Da nach dem Ausbau die Renovierungskosten steigen ist es allgemein ratsam, vor dem Ausbau zu
    renovieren. Deshalb wird man beim Ausbauen des Gebäudes wird man darauf hingewiesen, wenn das
    Gebäude nicht 100% hat. Beim Klick auf "Abbrechen" wird der Ausbau nicht gestartet, sodass man
    vorher noch renovieren kann, wenn man es nur vergessen hat.
13. Zustandsliste sortieren: Die Liste über den Zustand der Gebäude (Reiter "Z") wird nach dem
    Zustand sortiert. Das am weitesten verfallene Gebäude steht oben.
14. Tabellendarstellung: In Gildenhalle und Drachenprofilen ist es damit möglich Tabellen einzufügen.
    Beachten sollen man aber, dass die Tabelle so nur für die Leute erscheint, die das Script auch
    installiert haben. Deshalb wurde die Syntax für die Tabellen aber auch so gewählt, dass sie
    möglichst auch ohne das Script noch gut ausssieht.
    Das Prinzip ist ganz einfach, überall da wo eine Spalte anfängt oder aufhört kommt ein besonderes
    Zeichen hin. Für die Kopfzeilen ist das das ^ und für die normalen Tabellenzeilen der senkrechte
    Strich |. In einer Zeile darf man aber nur eines dieser Zeichen benutzen. Außerdem sollte man
    darauf achten, dass jede Zeile die gleiche Anzahl Spalten hat.
    Will man breite Zellen, die über mehrere Spalten gehen, macht man einfach so viele Zeichen
    hintereinander, wie die Zelle Spalten breit sein soll. ||| bewirkt also eine Zelle über drei
    Spalten. Will man stattdessen leere Spalten, sollte man sie zumindest mit einem Leerzeichen
    füllen: | |
    Innnerhalb der einzelnen Zellen kann man die üblichen BB-Codes benutzen. Die BB-Codes sollten
    allerdings nicht über die Zelle hinausgehen. |[b]Zelle1 | Zelle2[/b]| erzeugt also Fehler.
    Neben dem Speichern-Button unter dem Textfeld erscheint auch ein Button Tabelle erstellen.
    Hiermit kann man auch eine leere Tabelle erstellen, die man dann nur noch mit Inhalten zu
    füllen braucht.
    UPDATE: Um die Tabelle zu zentrieren kann der normale BB-Code ([c]zentriert[/c]) verwendet werden.
    Wichtig ist nur, das der Code auf der selben Zeile wie die erste und letzte Zeile der Tabelle ist.
    Beispieltabelle:
    [c]^Drachen^^^^^Eigenschaften^
    ^       ^Kraft^Geschick^Feuerkraft^Willenskraft^Intelligenz^
    ||||||männliche Drachen                                    |
    |DracheA|112  |42      |53        |[b]257[/b]  |38         |
    |DracheB|53   |354     |[b]321[/b]|33          |61         |
    |DracheC|39   |61      |44        |[i]301[/i]  |266        |
    ||||||weibliche Drachen                                    |
    |DracheD|206  |54      |264       |56          |47         |
    |DracheE|121  |326     |63        |298         |58         |[/c]
15. Dracheneier ausblenden: Hat man viele Dracheneier gelegt um das richtige zu finden kann es
    zuweilen schon etwas unübersichtlich werden. Mit dieser Funktion kann man nun solche Dracheneier
    oder auch andere Drachen unsichtbar machen. Alles was man dazu tun muss, ist es diese in JohnDoe
    oder MaryDoe umzubenennen. Um verschiedene Eier zu unterscheiden kann man auch noch eine Zahl
    direkt hinten anhängen, z.B.: MaryDoe17. Ist die Funktion aktiviert erscheinen sie dann weder im
    Reiter "D", in der Drachenzucht, noch im Profil. Auch alle fremden Drachen mit diesen Namen
    werden in den Profilen nicht mehr angezeigt. Wurden Drachen(-eier) ausgeblendet erscheint als
    Hinweis ein kleines Ei in der Überschrift. Klickt man darauf, kann man die Drachen auch wieder
    sichtbar machen.
16. Lager als Gebäude sichtbar: Da manche Probleme haben das im Markt integrierte Lager zu finden,
    gibt es das Lager mit dieser Funktion auch wieder als eigenes Gebäude. So ist es immer gleich
    neben den anderen Gebäuden gut zu erkennen. Als Bonus darf man sich auch noch aussuchen, wo es
    stehen soll. Entweder weiter links gleich rechts neben dem Gebäude Nr. 20 oder rechts neben der
    Drachenzucht.
17. Orakelvorhersage zu Spielen: Bei Dragballspielen erscheint jetzt sowohl live in der Arena, als
    auch bei den Spielberichten immer ein Button "Orakel befragen!", der bei Klick das Orakel zur
    aktuellen Aufstellung befragt. Das Orakel wird dabei in einem neuen Tab geöffnet. So kann man
    sich gleich nach Anpfiff die Siegwahrscheinlichkeit berechnen lassen.
    UPDATE: Funktioniert jetzt auch in der Gildenarena, wobei man wählen kann, ob die aktuelle
    Aufstellung als Heim- oder Gastspiel angesetzt werden soll.
18. Baukosten ohne Bauherrn-Ersparnis anzeigen: Wenn man einen Bauherrn hat werden alle Gebäudekosten
    inklusive der Ersparnis durch den Bauherrn angezeigt. Durch Klick auf die Spaltenüberschrift der
    Baukosten kann man sich nun nacheinander auch die Baukosten anzeigen lassen, wie sie ohne den
    Bauherrn wären, und die absolute Ersparnis um so zu sehen, wie viel man durch seinen Bauherrn
    einspart.
19. Gildenstadt: Auf Anregung von eragon1234 wurde Gilde komplett restrukturiert. Mit dieser Funktion
    sieht die Gilde nun einer Siedlung ähnlich, mit verschieden Gebäuden für die einzelnen Funktionen
    in der Gilde. Auch die Unterseiten der Gilde wurden überarbeitet. Im Gildenlager ist z.B. die
    Lagermenge, das Spenden, die bereits gespendete Menge und auch das Zurückziehen übersichtlicher
    alles zusammen in einer Tabelle untergebracht.
20. Einkaufsliste: Auf den jeweiligen Marktseiten werden Pfeile eingeblendet, mit denen man durch
    alle eigenen Angebote und Nachfragen blättern kann. So kann man bei allen die aktuelle Position
    und die Preise der Konkurrenten, etc. überprüfen ohne zwischendurch immer wieder auf die
    Übersichtsseite wechseln, oder sich alle merken zu müssen.
21. Baufortschrittsanzeige: Wenn ein Gebäude ausgebaut wird, erscheint unter dem Gebäudenamen ein
    Fortschrittsbalken, der anzeigt, wie weit der Ausbau schon gediehen ist und wie lange er noch
    andauert.
22. Wetteinsatz merken: Bei Spielen im Wirtshaus merkt sich diese Funktion den Wetteinsatz und
    trägt ihn beim nächsten Mal gleich in das Eingabefeld ein. Wenn man z.B. immer nur um 237Gold
    spielen will brauch man die Zahl nicht immer wieder neu eintragen.
23. Gildenarena-Tabelle sortieren: Die Tabelle mit den Drachen in der Gildenarena kann nun nach
    allen Werten sortiert werden. Zusätzlich kann man zu jedem Drachen ein Bemerkung speichern.
    Hier könnte man z.B. vermerken, für welche Mannschaft er vorgesehen ist, oder welcher Drache
    als letztes gesteigert wurde. Die Bemerkungen können auch sortiert werden.
    HINWEIS: Diese Funktion funktioniert nicht, wenn die Tabelle schon von anderen Scripts verändert
    wurde. Wer also noch ein anderes Script benutzt, sollte die entsprechende Funktion eines Scriptes
    deaktivieren.
    UPDATE: Hinter den Namen wird auch das Geschlecht der Drachen angezeigt, sofern man den Drachen
    schon einmal vorher besucht hat.
24. Paarungen nach Mannschaften sortieren: Auf der Seite "Paarungen" in der Gildenarena kann man sich
    mittels Auswahlfelder über der Tabelle wahlweise jeweils nur noch eine Mannschaft anzeigen lassen.
    Außerdem kann man auch nur Heim- bzw. Gastspiele anzeigen lassen.
    HINWEIS: Damit das funktioniert, sollte man einmalig zuerst die Gildenhalle aufgesucht haben,
    bevor man auf die "Paarungen"-Seite geht.
25. Turnierplan-Ansicht verbessern: Die Anzeige im Turnierplan springt zum aktuellen Spiel und nicht
    immer nur zu dem um 15:30. Neben dem Auswahlfeld werden Pfeile angezeigt mit denen man direkt zum
    nächsten oder letzen Spiel springen kann. Außerdem kann man sich sowohl im Turnierplan, als auch
    in der Punktetabelle nur die Gruppen mit den eigenen Mannschaften anzeigen lassen.
26. Drachenfarbe anzeigen: Im Profil des Drachen wird neben den sonstigen Angaben nun auch die Bezeichnung
    der Farben angezeigt.
27. Uhr: Laest die Dragosien Uhr laufen. Im title der Uhr bleibt der echte TS erhalten. Vielen Dank an Hashmy,
    der diese Funktion geschrieben hat.
    UPDATE: Es wird über der Uhrzeit auch das aktuelle Datum angezeigt.
28. Jahreszeit: Umstellung zwischen Sommer (grüne Wiese) und Winter (Schnee).
29. Nacht: Nach einer bestimmten Uhrzeit wird es dunkel in Dragosien und frühs wieder hell. Die Uhrzeit
    ist in der Configuration beliebig einstellbar. Außerdem kann man auch ständigen Tag oder permanente Nacht wählen.
30. Gilden- und Drachenprofile gliederbar: Wenn man viele Informationen in der Profilen unterbringen will,
    werden sie unter Umständen unüberischtlich und man muss viel scrollen. Diese Funktion schafft nun Abhilfe,
    indem man den Text in Abschnitte gliedern kann, die einzeln über eine Tab-Leiste ausgewählt werden können.
    Dazu schreibt man einfach über jeden Abschnitt die Überschrift, die im Tab stehen soll mit jeweils zwei
    Gleichheitszeichen davor und dahinter: ==Ueberschrift==
31. Reiter P: Der Reiter P wird jetzt übersichtlicher. Alles Produkte die weder produziert, noch verbraucht
    werden, werden ausgeblendet. Bei den anderen wird Produktion und Verbrauch in verschiedenen Spalten
    dargestellt und die Netto-Produktion dahinter angezeigt.

 In der rechten Leiste erscheint nun in Dragosien ein zusätzlicher Reiter "C" (für Configuration).
 Hier können die einzelnen Funktionen auch abgeschaltet werden, wenn man nur bestimmte nutzen will.
*/



// Namen der Funktionen = Ids der Checkboxen = gespeicherte GMValues
var wert = ["update", "marktnumm", "bbcode", "karte", "schatz", "link", "gchat", "nlink",
"menge", "menue", "garena", "sitter", "warn_zustand", "z_sort", "table", "dr_ei", "lager",
"orakel", "bauherr", "g_stadt","m_list","b_fort","wette","ga_sort","paarungen","turnierplan",
"drcolor","uhr","advent","nacht","g_tab","reiterP"];
// Bezeichungen in der Konfiguration
var bez = ["Pr&uuml;fe auf Updates", "Markt&shy;nummerierung", "BB-Codes", "Karten&shy;navigation",
"Schatzkarten-Teleport","Gildenchat Links klickbar machen", "Gildenchat gr&ouml;&szlig;eres Eingabe&shy;feld",
"Nachrichten&shy;links klickbar machen", "Eingabe Tausender-Mengen", "Markt im Haupt&shy;men&uuml;",
"Arenatab in der Gilden&shy;halle", "Sitter merken", "Warnung bei schlechtem Zustand",
"Zustandsliste sortieren", "Tabellen&shy;darstellung", "Dracheneier ausblenden",
"Lager als Geb&auml;ude sichtbar", "Orakelvorhersage zu Spielen", "Baukosten ohne Bauherr-Ersparnis anzeigen",
"Gildenstadt","Einkaufs&shy;liste","Baufortschritts&shy;anzeige","Wetteinsatz merken","Gildenarena-Tabelle sortieren",
"Paarungen nach Mannschaften sortieren","Turnierplan-Ansicht verbessern","Drachenfarbe anzeigen","Datum &amp; Uhr","Jahreszeit",
"Nacht","Gilden- und Drachen&shy;profile gliederbar","Reiter P"];
// Überschriftzeile
var line = document.getElementById("drag_line");
//Rechter Seitenrand
var rand = document.getElementById("mainRight");
//Serverzeit
if (document.getElementById("footer")) {
  var serverzeit = /Serverzeit: (\d+\.\d+\.\d+ \d+:\d+:\d+) Uhr/.exec(document.getElementById("footer").innerHTML)[1].replace(/\.|\s|:/g, ";").split(";"); }
if(document.getElementById("userinfo")) {
  var user=/Name:.* (.*)<br>/.exec(document.getElementById("userinfo").innerHTML)[1]; }
if(document.getElementById("linkLogout")) {
  var request=document.getElementById("linkLogout").href.match(/request=\d+/); }

//////////////
//  Bilder  //
//////////////
/*
  var hoster="http://666kb.com/i/";
//                schnee                    nacht                schnee+nacht
  var b_dorf=["bot69xi3tsfhmiskr.jpg","bpjr3o4fg57cjkiib.jpg","bpjr61iekicbffq9f.jpg"];
  var b_dorfDZ=["bot6as5hgsh1s6n8r.jpg","bpjr4d9rtvthdy4s3.jpg","bpjr6ccs5z9sw6e9f.jpg"];
  var b_geb=["bot6bkkit9othz5ez.png","bpjr554bc3y9gttbn.png","bpjr716c5qcaaffeb.png"];
  var b_baupl="bot6buz59yuxqo4kr.jpg";
  var b_street="bot6c4564h4ei4kkr.jpg";
  var b_snow="bot6c9jj9pef5sbor.gif";
  var b_pause_n="bpjr5decw1ifswrzn.png";
  var b_progress_n="bpjr5nv0r7r71y8qb.png";
*/
  var hoster="http://666kb.com/i/";
  var b_street="dragolin_street_winter.jpg";
  var b_snow="snow.gif";
  var b_pause_n="bpjr5decw1ifswrzn.png";
  var b_progress_n="bpjr5nv0r7r71y8qb.png";


/***********************
** Chromium und Opera **
***********************/
//function testGM(force) {
function testGM() {
 var isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
 if(typeof(unsafeWindow) == 'undefined') { unsafeWindow = window; }
 if (window.opera) { log = opera.postError; }
 else if(!isGM) { log = function(msg) { try { unsafeWindow.console.log(msg); } catch(e) {} }; }
  else { log = GM_log; }
// if(force) isGM=false;
 GM_setValue = isGM ? GM_setValue : function(name, value) { return localStorage.setItem(name, value) };
 GM_getValue = isGM ? GM_getValue : function(name, def){ var s = localStorage.getItem(name);
   if (s == null) return def;
   else return (s == "false") ? false : s };
 GM_deleteValue = isGM ? GM_deleteValue : function(name) { return localStorage.setItem(name, null) };
 thisIsFF=isGM;
}
// if(typeof(localStorage) != "undefined"&&localStorage.getItem("local")!="false") testGM(true);
// else testGM(false);
testGM();
if(typeof GM_xmlhttpRequest == 'undefined') {
  GM_xmlhttpRequest = function(details) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        var responseState = {
            responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
            responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
            readyState:xmlhttp.readyState,
            responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
            status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
            statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
        }
        if (details["onreadystatechange"]) {
            details["onreadystatechange"](responseState);
        }
        if (xmlhttp.readyState==4) {
            if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
                details["onload"](responseState);
            }
            if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
                details["onerror"](responseState);
            }
        }
    }
    try {
      //cannot do cross domain
      xmlhttp.open(details.method, details.url);
    } catch(e) {
      if( details["onerror"] ) {
        //simulate a real error
        details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
      }
      return;
    }
    if (details.headers) {
        for (var prop in details.headers) {
            xmlhttp.setRequestHeader(prop, details.headers[prop]);
        }
    }
    xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
  }
}
if(typeof GM_openInTab == 'undefined') {
  GM_openInTab = function(url) {
    newTab = window.open(url, "newTab");
    newTab.focus();
  }
}

//Veraltete Werte löschen
if(typeof(GM_getValue("l_pos"))!="string") GM_deleteValue("l_pos");
if(typeof(GM_getValue("dr_notes"))=="string") {
  GM_deleteValue("dr_notes");
}
if(typeof(GM_getValue("dr_note"))=="string") {
  GM_deleteValue("dr_note");
}



////////////////////
//   Funktionen   //
////////////////////

// automatisches Update
// original by Jarett (http://userscripts.org/scripts/show/20145)
var SUC_script_num = 78439;
  function updateCheck(forced) {
    if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 3600000 <= (new Date().getTime()))) {
      try {
        GM_xmlhttpRequest({
          method: 'GET',
          url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
          headers: {'Cache-Control': 'no-cache'},
          onload: function(resp) {
            var local_version, remote_version, rt, script_name;
            rt=resp.responseText;
            GM_setValue('SUC_last_update', new Date().getTime()+'');
            remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
            try { neues=/@new\s*(.*?)\s*$/m.exec(rt)[1]; } catch(not_new) { neues='-unbekannt-'; }
            local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
            if(local_version!=-1) {
              script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
              GM_setValue('SUC_target_script_name', script_name);
              if (remote_version > local_version) {
                if(confirm('Es ist ein Update verf\u00fcgbar f\u00fcr das Greasemonkey-Script \"'
+script_name+'\".\nM\u00f6chtest du es installieren?\n\nNeuerungen:\n'+neues)) {
                  GM_setValue('SUC_current_version', remote_version);
                  document.location.href='http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js';
                }
              }
              else if (forced) {
                if (confirm('Kein Update verf\u00fcgbar f\u00fcr \"'+script_name+'\".\n'
                    +'M\u00f6chtest du trotzdem neu installieren?')) {
                  document.location.href='http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js';
                }
              }
            }
            else {
              GM_setValue('SUC_current_version', remote_version+'');
            }
          },
          onerror: function() {
            if (forced) {
//              alert('Keine Verbindung zum Script-Server.\nVersuche es sp\u00e4ter erneut.');
              if(confirm('Pimp my Dragosien kann keine Verbindung zum Script-Server herstellen.\n'
                        +'M\u00f6chtest du zum Script-Server weitergeleitet werden, um selbst nach '
                        +'einem Update zu suchen?')) {
                GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
              }
            }
          }
        });
      }
      catch (err) {
        if (forced) {
          if(confirm('Beim Pr\u00fcfen auf Updates trat ein Fehler auf:\n'+err+'\nM\u00f6chtest du zum '
                    +'Script-Server weitergeleitet werden, um selbst nach einem Update zu suchen?')) {
            GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
          }
        }
      }
    }
  }
/*  GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - manuelles Update', function()
  {
    updateCheck(true);
  });*/

//keine Drachen doppelt
if(document.URL.match(/t=guild_arena/)&&document.getElementById("positionen")) {
  var db_input=document.getElementById("positionen").getElementsByTagName("form")[0].getElementsByTagName("input");
  var db_save;
  for(i=0;i<db_input.length;i++) {
    if(db_input[i].value.match(/speichern/)) {
      db_save=db_input[i];
      db_save.addEventListener("mousedown",db_doppelt,false);
      break;
    }
  }
}
function db_doppelt() {
  var db_select=document.getElementById("positionen").getElementsByTagName("form")[0].getElementsByTagName("select");
  var db_obtion;
  var db_wahl=new Array;
  var db_name=new Array;
  for(i=0;i<db_select.length;i++) {
    db_option=db_select[i].getElementsByTagName("option");
    for(k=0;k<db_option.length;k++) {
      if(db_option[k].selected) {
        db_wahl[i]=db_option[k].value;
        db_name[i]=db_option[k].textContent.replace(/ \(\d+\)/,"");
      }
    }
  }
  db_save.type="submit";
  for(l=0;l<db_select.length;l++) {
    for(m=0;m<l;m++) {
      if(db_wahl[l]!=0&&db_wahl[l]==db_wahl[m]) {
        alert("Achtung!\nDer Drache "+db_name[l]+" kann nicht auf mehreren Positionen gleichzeitig spielen.\nBitte \u00fcberpr\u00fcfe noch einmal die Aufstellung!");
        db_save.type="button";
      }
    }
  }
}

//Eigene Gilde in Hauptstadt markiert
if(GM_getValue("guildname_"+user)) {
  if(document.URL.match(/t=capital/)) {
    var gildenname=GM_getValue("guildname_"+user);
    var gildenliste=line.parentNode.getElementsByTagName("table")[0].getElementsByTagName("tr");
    for(i=1;i<gildenliste.length-1;i++) {
      if(gildenliste[i].getElementsByTagName("td")[1].textContent.match(gildenname)) {
        gildenliste[i].style.backgroundColor="#e8dfd5";
      }
    }
  }
}

/*************************
** 1. Marktnummerierung **
*************************/
function markt (n,m) {
for (a = 1; a <= n; a++) {
// Tabelle verbreitern
document.getElementById("drag_box").getElementsByTagName("table")[a].style.width = "475px";
// Nummerierung hinzufuegen
var laenge = document.getElementById("drag_box").getElementsByTagName("table")[a].getElementsByTagName("tr").length;
var zeilen = laenge - 2;
  for (i = 1; i <= zeilen; i++) {
  var spalte = document.createElement("td");
  var inhalt = document.createTextNode(i+".");
  spalte.appendChild(inhalt);
  var tabelle = document.getElementById("drag_box").getElementsByTagName("table")[a].getElementsByTagName("tr")[i];
  var vorne = tabelle.getElementsByTagName("td")[0];
  tabelle.insertBefore(spalte, vorne);
  spalte.style.width = "20px";
  }
// Kopfzeile verbreitern
document.getElementById("drag_box").getElementsByTagName("table")[a].getElementsByTagName("th")[0].colSpan = "3";
document.getElementById("drag_box").getElementsByTagName("table")[a].getElementsByTagName("tr")[laenge - 1].getElementsByTagName("td")[0].colSpan = "3";
// Gesamtzahl angebote
var angebote = document.getElementById("drag_box").getElementsByTagName("table")[a].getElementsByTagName("tr")[laenge - 1].getElementsByTagName("td")[0]
var handel = new Array ("Angebote", "Nachfragen", "Angebot", "Nachfrage");
if (zeilen != 1) {
angebote.innerHTML = zeilen+" "+handel[a-1+m]+" f&uuml;r "+angebote.innerHTML; }
else { angebote.innerHTML = "1 "+handel[a+1+m]+" f&uuml;r "+angebote.innerHTML; }
}
}

//Marknummerierung starten wenn in Einstellungen aktiviert
function marktnumm() {
  if (document.getElementById("drag_box")) {
    if (document.getElementById("drag_box").innerHTML.match("Du kannst Nachfragen und Angebote")) {
      if (document.getElementById("drag_box").getElementsByTagName("table")[2]) {
        markt (2,0); }
      else {
        if (document.getElementById("drag_box").getElementsByTagName("table")[1]) {
          if (document.getElementById("drag_box").getElementsByTagName("table")[1].innerHTML.match("Eigene Angebote")) {
            markt (1,0); }
          else { markt(1,1); }
        }
      }
    }
  }
}

/****************
** 2. BB-Codes **
****************/
//BB-Codes in den Text einfügen
function anzeigen() {
var einblenden = document.createElement("script");
einblenden.type = "text\/javascript";
var inhalt = document.createTextNode("function insert(aTag, eTag) {\n"
+"  var inputs = document.getElementsByTagName(\"textarea\"); \n"
+"  for(i=0;i<inputs.length;i++) {\n"
+"    if(inputs[i].className!=\"invisible\") var input=inputs[i];\n"
+"  }\n"
+"var scrollpos = input.scrollTop;\n"
+"  input.focus();\n"
+"  var start = input.selectionStart;\n"
+"  var end = input.selectionEnd;\n"
+"  var insText = input.value.substring(start, end);\n"
+"  input.value = input.value.substr(0, start) + aTag + insText + eTag + input.value.substr(end);\n"
+"  var pos;\n"
+"  if (insText.length == 0) {\n"
+"    pos = start + aTag.length;\n"
+"  } else {\n"
+"    pos = start + aTag.length + insText.length + eTag.length;\n"
+"  }\n"
+"  input.selectionStart = pos;\n"
+"  input.selectionEnd = pos;\n"
+"input.scrollTop = scrollpos;\n"
+"  if (document.getElementById(\"farben\").style.display = \"block;\") {\n"
+"    wegdamit();\n"
+"  }\n"
+"}\n"
+"\n"
+"function zeigen() {\n"
+"document.getElementById(\"farben\").style.display = \"block\"; }\n"
+"function wegdamit() {\n"
+"document.getElementById(\"farben\").style.display = \"none\"; }\n");
einblenden.appendChild(inhalt);
var kopf = document.getElementsByTagName("head")[0];
kopf.appendChild(einblenden);

//Farbtabelle CSS
var styling = document.createElement("style");
styling.type = "text\/css";
var styleinhalt = document.createTextNode("#farben {\ndisplay:none;\nposition:absolute;\n"
+"background-color:#DBD1C8;\npadding:0px;\nborder:2px solid #3C1E00;\n}\n"
+"#farbwahl td {\nwidth:20px;\nheight:20px;\ncursor:crosshair;\nborder:1px solid black;\n}\n"
+"#farbwahl th {\ntext-align:center;\nvertical-align:middle;\nborder-style:none;\n}\n"
+"#ftkopf {\ncolor:#3C1E00;\nfont-size:0.8em\n}\n"
+"#ftaus {\ncursor:pointer;\ncolor:#ffffff;\nfont-weight:normal;\nbackground-color:#3D342B;}");
styling.appendChild(styleinhalt);
kopf.appendChild(styling);
}

//Farbtabelle erstellen
function farbbox() {
var einblenden = document.createElement("div");
var attr = document.createAttribute("id");
attr.nodeValue = "farben";
einblenden.setAttributeNode(attr);
var inhalt = document.createTextNode("Hier sollte eigentlich eine Farbtabelle stehen.");
einblenden.appendChild(inhalt);
var colortag = document.getElementsByTagName("h4")[0].parentNode;
colortag.style.position = "relative;"
colortag.insertBefore(einblenden, document.getElementsByTagName("h4")[0].nextSibling);
var r = "<\/tr><tr>"
var s = "<td style=\"background-color:#"
var t = ";\" onclick=\"insert('\[color="
var u = "\]', '\[\/color\]')\"><\/td>"
var farbtabelle = "<table id=\"farbwahl\" cellspacing=\"0\" cellpadding=\"0\">"
+"<tr><th id=\"ftkopf\" colspan=\"6\">Bitte Farbe w&auml;hlen<\/th>"
+"<th id=\"ftaus\" onClick=\"wegdamit()\">X<\/th>"
+r+s+"000"+t+"000000"+u+s+"333"+t+"333333"+u+s+"666"+t+"666666"+u+s+"999"+t+"999999"
+u+s+"CCC"+t+"CCCCCC"+u+s+"FFF"+t+"FFFFFF"+u+s+"DBD1C8"+t+"DBD1C8"+u
+r+s+"006"+t+"000066"+u+s+"066"+t+"006666"+u+s+"060"+t+"006600"+u+s+"660"+t+"666600"
+u+s+"630"+t+"663300"+u+s+"600"+t+"660000"+u+s+"606"+t+"660066"+u
+r+s+"009"+t+"000099"+u+s+"099"+t+"009999"+u+s+"090"+t+"009900"+u+s+"990"+t+"999900"
+u+s+"930"+t+"993300"+u+s+"900"+t+"990000"+u+s+"909"+t+"990099"+u
+r+s+"00F"+t+"0000FF"+u+s+"0FF"+t+"00FFFF"+u+s+"0F0"+t+"00FF00"+u+s+"FF0"+t+"FFFF00"
+u+s+"F60"+t+"FF6600"+u+s+"F00"+t+"FF0000"+u+s+"F0F"+t+"FF00FF"+u
+r+s+"99F"+t+"9999FF"+u+s+"9FF"+t+"99FFFF"+u+s+"9F9"+t+"99FF99"+u+s+"FF9"+t+"FFFF99"
+u+s+"FC9"+t+"FFCC99"+u+s+"F99"+t+"FF9999"+u+s+"F9F"+t+"FF99FF"+u
+"<\/tr><\/table>";
document.getElementById("farben").innerHTML = farbtabelle;
}

//BB-Code-Liste klickbar machen und an Einfügen übergeben
function code() {
  var bereich = document.getElementsByTagName("h4")[0].parentNode;
  var bbcodes = new Array(1);
  bbcodes[0] = new Array("\[b\]Fett\[\/b\]", "\[i\]Kursiv\[\/i\]", "\[c\]Zentriert\[\/c\]",
"\[user\]Spieler\[\/user\]", "\[dragon\]Drache\[\/dragon\]", "\[guild\]Gildenkürzel\[\/guild\]",
"\[url=http:\/\/abc.de\]link\[\/url\]", "\[img\]Bild-Link\[\/img\]");
  bbcodes[1] = new Array("b", "i", "c", "user", "dragon", "guild", "url", "img");
  for (i = 0; i <= 7; i++) {
    bereich.innerHTML = bereich.innerHTML.replace(bbcodes[0][i], "<span style='cursor:pointer;' "
+"onClick='insert(\"\["+bbcodes[1][i]+"\]\", \"\[\/"+bbcodes[1][i]+"\]\")'>"+bbcodes[0][i]+"<\/span>");
  }
}

//Farbtabelle öffnen
function farblink() {
  var bereich = document.getElementsByTagName("h4")[0].parentNode;
  bereich.innerHTML = bereich.innerHTML.replace(/\[color=ff0000\]Farbe\[\/color\]/, "<span "
+"style='cursor:pointer;' onClick='zeigen()'>[color=ff0000\]Farbe\[\/color\]<\/span>");
}

// BB-Codes starten wenn in Einstellungen aktiviert
function bbcode() {
  if (document.getElementsByTagName("h4")[0]) {
    if (document.getElementsByTagName("h4")[0].innerHTML.match(/BB-Codes:/g)) {
      anzeigen();
      code();
      farbbox();
      farblink();
    }
  }
}

/************************
** 3. Kartennavigation **
************************/
//Formular zur Direkteingabe der Koordinaten einblenden
function koordinaten() {
var b = document.body.getAttribute("onload");
document.body.setAttribute("onload", b+"\ndocument.Koordinaten.PosX.focus();");
var koordScript = document.createElement("script");
koordScript.type = "text\/javascript";
var scriptXY = document.createTextNode("function nurZahlen(el) {\n"
+"var val = el.value.replace(\/[^-\\d]|(.)-|(\\d{4})\\d\/g, '\$1\$2');\n"
+"el.value = val;\n}\n"
+"function geentert(event, feld) {\n"
+"nurZahlen(feld);\n"
+"if (event && event.which == 13) {\n"
+"  if (document.Koordinaten.PosX.value == '') { document.Koordinaten.PosX.focus(); }\n"
+"  else {\n"
+"    if (document.Koordinaten.PosY.value == '') { document.Koordinaten.PosY.focus(); }\n"
+"    else { tele(); }\n"
+"  }\n"
+"}\n"
+"else { return true; }\n"
+"}\n"
+"\n"
+"function tele() {\n"
+"var X = document.Koordinaten.PosX.value;\n"
+"var Y = document.Koordinaten.PosY.value;\n"
+"if (X != '' && Y != '') {\n"
+"mapGoTo(X,Y);\n"
+"}\n"
+"else {\n"
+"alert('Du kannst nicht teleportiert werden, wenn du nicht wei\u00DFt wohin!');\n"
+"}\n"
+"}");
koordScript.appendChild(scriptXY);
var kopf = document.getElementsByTagName("head")[0];
kopf.appendChild(koordScript);
var karte = document.getElementById("drag_box").getElementsByTagName("div")[3];
karte.innerHTML = karte.innerHTML.replace(/(Position: <b>-?\d+\/-?\d+<\/b>)(\s*<br>){0,2}/, "$1\n"
+"<div id='teleport' style='width:150px; margin-top:10px; border:solid black 1px; text-align:center; background-color:#DBD1C8;'>\n"
+"<form name='Koordinaten'>Koordinaten:<br \/>\n"
+"<input name='PosX' type='text' size='5' maxLength='5' onkeyup='nurZahlen(this);' onkeypress='return geentert(event, this);' />\/"
+"<input name='PosY' type='text' size='5' maxLength='5' onkeyup='nurZahlen(this);' onkeypress='return geentert(event, this);' /><br \/>\n"
+"<input type='button' value='zu Position teleportieren' onclick='tele()' style='cursor:pointer;'>\n"
+"<\/form>\n"
+"<a href='?t=map&'>nach Hause<\/a><br \/>\n"
+"<a href='?t=map&x=3000&y=3000&zoom=0'>zur Hauptstadt<\/a>\n"
+"<\/div>");
}

// Kartennavigation starten wenn in Einstellungen aktiviert
function karte() {
  if (document.getElementById("drag_box")) {
    if (document.getElementById("drag_box").innerHTML.match("Die Karte von Dragosien")) {
      koordinaten();
    }
  }
}

/*****************************
** 4. Schatzkarten-Teleport **
*****************************/

//Auf Schatzkarte Koordinaten klickbar machen
function schatzkarte() {
  if (document.getElementById("warning").innerHTML.match("Pergament")) {
    var meldung = document.getElementById("warning").getElementsByTagName("div")[3];
    meldung.innerHTML = meldung.innerHTML.replace(/: (-?\d+):(-?\d+)/, ": <a href='"
+"?t=map&x=$1&y=$2&zoom=0' title='Klicken, um direkt zu den Koordinaten zu springen.'>$1:$2</a>");
  }
}

//Ebenso auf Nachricht durch Schatzkarte
function s_nachricht() {
var meldung = document.getElementById("drag_box");
meldung.innerHTML = meldung.innerHTML.replace(/: (-?\d+):(-?\d+)</, ": <a href='"
+"?t=map&x=$1&y=$2&zoom=0' title='Klicken, um direkt zu den Koordinaten zu springen.'>$1:$2</a><");
}

// Schatzkarten-Teleport starten wenn in Einstellungen aktiviert
function schatz() {
  if (document.getElementById("warning")) {
    schatzkarte();
  }
  if (document.getElementById("drag_box")) {
    if (document.getElementById("drag_box").innerHTML.match("Pergament")) {
      s_nachricht();
    }
  }
}

/****************************************
** 5. Gildenchat Links klickbar machen **
****************************************/
//Link umwandlen
function linkmich() {
  if (!modifierActive) {
modifierActive=true;
this.innerHTML=this.innerHTML.replace(/([^\"])(http:\/\/)([^ <]*\b\/?)|([^\/])(www.[^ <]*\b\/?)/ig,"$1$4<a href='http:\/\/$3$5' target='new'>$2$3$5</a>");
this.innerHTML=this.innerHTML.replace(/<a href[^<>]*><\/a>/,"");
modifierActive=false;
  }
}

//Gildenchat Links starten wenn in Einstellungen aktiviert
function link() {
  if (document.getElementById("chat_content")) {
    chatcontent = document.getElementById("chat_content");
    modifierActive=false;
    chatcontent.addEventListener("DOMSubtreeModified",linkmich,false);
  }
  if (document.getElementById("mainRight")) {
    var chatlog=document.getElementById("mainRight").getElementsByTagName("div");
    for (i=0;i<chatlog.length;i++) {
      if (chatlog[i].innerHTML.match("Gilden-Chatlog")) {
      chatlog[i].innerHTML=chatlog[i].innerHTML.replace(/([^\"])(https?:\/\/)([^ <]*\b\/?)|([^\/])(www.[^ <]*\b\/?)/ig,"$1$4<a href='http:\/\/$3$5' target='new'>$2$3$5</a>");
      chatlog[i].innerHTML=chatlog[i].innerHTML.replace(/<b>([^\/]*):<\/b>/g,"<a href='\/user/$1' class='inlineb'>$1:<\/a>");
      chatlog[i].innerHTML=chatlog[i].innerHTML.replace(/<a [^>]*>( schickt eine Brieftaube:)<\/a>/,"<b>$1<\/b>");
      break;
      }
    }
  }
}

/***************************************
** 6. Gildenchat größeres Eingabefeld **
***************************************/
function gildenchat() {
  var chat = document.getElementById("form_chat");
  var enter="";
  if (GM_getValue("enter",true)) {
    enter=" onkeydown=\"if (event.which == 13) { chat_send(); return false; } else { return true; }\"";
  }
  chat.innerHTML = "<textarea id=\"chat_message\" cols=\"200\" rows=\"3\" style=\"width: 700px;\" "
  +"type=\"text\""+enter+"><\/textarea><input value=\"ok\" style=\"width: 20px;\" type=\"submit\">";
}
function senden() {
var o_script=document.getElementById("form_chat").parentNode.parentNode.getElementsByTagName("script")[0];
var ajax=o_script.innerHTML.match(/ajax.*URIComponent/);
var chatScript = document.createElement("script");
chatScript.type = "text\/javascript";
var scriptC = document.createTextNode("function chat_send() {\n"
+"var message=document.getElementById('chat_message');\n"
+"message.style.backgroundColor='#ddd';\n"
+ajax+"(message.value), function() {\n"
+"  message.value = '';\n"
+"  message.style.backgroundColor='#f2f2f2';\n"
+"  getChat(0);\n"
+"})\n"
+"return false;\n"
+"}");
chatScript.appendChild(scriptC);
var kopf = document.getElementsByTagName("head")[0];
kopf.appendChild(chatScript);
}

//Gildenchat starten wenn in Einstellungen aktiviert
function gchat() {
  if (line) {
    if (line.innerHTML.match(/Gildenhalle/)) {
      if (document.getElementById("chat_content")) {
        gildenchat();
        senden();
      }
    }
  }
}

/*****************************************
** 7. Nachrichten Links klickbar machen **
*****************************************/
var nachricht="";
function nlink() {
  if (document.getElementById("drag_box")) {
    if (line.innerHTML.match("Nachrichten")) {
      if (document.getElementsByName("message")[0]) {
        var antwort=document.getElementsByName("message")[0].innerHTML;
        antwort=antwort.replace(/(\n+---.*\d\d:\d\d\n)/,"$1"+nachricht);
      }
      else {
        var text = document.getElementById("drag_box").getElementsByTagName("td")[3];
        nachricht=text.innerHTML.toString();
        nachricht=nachricht.replace(/<.*>/g, "");
        text.innerHTML=text.innerHTML.replace(/([^\"])(https?:\/\/)([^ <]*\b\/?)|([^\/])(www.[^ <]*\b\/?)/ig,"$1$4<a href='http:\/\/$3$5' target='new'>$2$3$5</a>");
      }
    }
    if (line.innerHTML.match("Spielerprofil")&&!line.getElementsByTagName("div")[5]) {
      var profil = document.getElementById("drag_box");
      profil.innerHTML=profil.innerHTML.replace(/([^\"])(https?:\/\/)([^ <]*\b\/?)|([^\/])(www.[^ <]*\b\/?)/ig,"$1$4<a href='http:\/\/$3$5' target='new'>$2$3$5</a>");
    }
  }
}

/********************************
** 8. Eingabe Tausender-Mengen **
********************************/
function tausend() {
  var val = this.value.replace(/k|\+/g, "000");
  this.value = val;
}
function kilo_buy() {
  var input = document.getElementById("market_buy").getElementsByTagName("input");
  for (i=0;i<input.length;i++) {
    input[i].addEventListener("keyup", tausend, false);
  }
}
function kilo_sell() {
  var input = document.getElementById("market_sell").getElementsByTagName("input");
  for (i=0;i<input.length;i++) {
    input[i].addEventListener("keyup", tausend, false);
  }
}
function kilo_mat() {
  var input = line.parentNode.getElementsByTagName("div")[3].getElementsByTagName("input");
  for (i=0;i<input.length;i++) {
    input[i].addEventListener("keyup", tausend, false);
  }
}
function kilo_dragon() {
  var input = line.parentNode.getElementsByTagName("table");
  for (i=0;i<input.length;i++) {
    if(input[i].getElementsByTagName("input")[0]) {
      input[i].getElementsByTagName("input")[0].addEventListener("keyup", tausend, false);
    }
  }
}
function donate() {
  var input = line.parentNode.getElementsByTagName("table")[0].getElementsByTagName("input");
  for (i=0;i<input.length;i++) {
    input[i].addEventListener("keyup", tausend, false);
  }
}

//Tausender-Mengen starten wenn in Einstellungen aktiviert
function menge() {
  if (document.getElementById("market_buy")) {
    kilo_buy();
  }
  if (document.getElementById("market_sell")) {
    kilo_sell();
  }
  if (line&&line.innerHTML.match(/Geb\u00e4ude\u00fcbersicht/)) {
    kilo_mat();
  }
  if (document.getElementById("m_count1")) {
    kilo_dragon();
  }
  if (document.getElementById("donate_count1")) {
    donate();
  }
}

/*********************
** 9. Markt in Menü **
*********************/
function menue() {
 if(document.getElementById("mainRight")) {
  mainNavi = document.getElementById("mainRight").nextSibling.nextSibling;
  var markt = document.createElement("a");
  markt.className = "inline";
  markt.href = "?t=market";
  var inhalt = document.createTextNode("Markt");
  markt.appendChild(inhalt);
  var profil = mainNavi.getElementsByTagName("a")[5];
  mainNavi.insertBefore(markt, profil);
  //CSS
  if(document.styleSheets[0].cssRules) {
    var cssinhalt=document.styleSheets[0].cssRules;
  } else { var cssinhalt=document.styleSheets[0].rules; }
  var laenge=cssinhalt.length;
  for (i=0;i<laenge;i++) {
    if (cssinhalt[i].selectorText=="\.mainNavi a\.inline") {
      navi=cssinhalt[i];
      break;
    }
  }
  navi.style.marginRight="10px";
  var user=document.getElementById("userinfo");
  var style='style="color:#3D342B;background:none; padding:0px;"';
  user.innerHTML=user.innerHTML.replace(/(Name:) (\w+)\b/, "<a "+style+" href='/user/$2'>$1<\/a> $2");
  user.innerHTML=user.innerHTML.replace(/(Punkte:)/, "<a "+style+" href='?t=highscore&chapter=building'>$1<\/a>");
  user.innerHTML=user.innerHTML.replace(/(Gold:)/, "<a "+style+" href='?t=highscore&chapter=tavern'>$1<\/a>");
 }
}

/***********************
** 10. Gildenarenatab **
***********************/
//Berechnet weiteren Platz in der Gilde
function platz() {
  var mtgl_seite=line.parentNode.getElementsByTagName("div")[3];
  var platz=mtgl_seite.innerHTML.match(/(\d+)\D*\/\D*(\d+) Mitgliede?r?,\s*(\d*)\D?(\d+)\D*\/\D*(\d*)\D?(\d+)/);
  var mtgl=parseInt(platz[2])-parseInt(platz[1]);
  var bmp=parseInt(platz[5]+platz[6])-parseInt(platz[3]+platz[4]);
  if (mtgl==1) { var pl=""; } else { var pl="er" }
  bmp=bmp.toString().replace(/(\d+)(\d{3})\b/g,"$1.$2");
  mtgl_seite.innerHTML=mtgl_seite.innerHTML.replace(/(Baumeisterpunkte<\/b>)/, "$1 <span class='annotation'>"
+"\(Noch Platz f&uuml;r "+mtgl+" Mitglied"+pl+", "+bmp+" Baumeisterpunkte\)<\/span>");
  if (line.parentNode.getElementsByTagName("ul")[0].innerHTML.match(/tab=5/)) { GM_setValue("verw_"+user+"_"+window.location.host,true); }
  else { GM_setValue("verw_"+user+"_"+window.location.host,false); }
}
//Tab zur Arena in der Gildenhalle
function halletab() {
  var tabs = line.parentNode.getElementsByTagName("ul")[0];
  var atab = document.createElement("li");
  var atablink = document.createElement("a");
  atablink.className="";
  atablink.href="?t=guild_arena";
  var atabtext = document.createTextNode("Gildenarena");
  atablink.appendChild(atabtext);
  atab.appendChild(atablink);
  tabs.appendChild(atab);
}
//Tabs zur Gildenhalle in der Gildenarena
function arenatab() {
  var verw="";
  if (GM_getValue("verw_"+user+"_"+window.location.host,false)) {
    verw="<li><a class='' href='?t=guild_hall&amp;tab=5'>Verwalten<\/a><\/li>\n";
  }
  var tabs = line.parentNode.getElementsByTagName("ul")[0];
  tableiste = document.createElement("ul");
  tableiste.className="tabs small";
  if (line.innerHTML.match("Gildenarena")) {
  line.parentNode.insertBefore(tableiste,tabs); }
  else { line.parentNode.insertBefore(tableiste,line.parentNode.getElementsByTagName("div")[3]); }
  tableiste.innerHTML="\n<li><a class='' href='?t=guild_hall&amp;tab=0'>Mitglieder<\/a><\/li>\n"
+"<li><a class='' href='?t=guild_hall&amp;tab=1'>Gildenlager<\/a><\/li>\n"
+"<li><a class='' href='?t=guild_hall&amp;tab=2'>Ausbauen<\/a><\/li>\n"
+"<li><a class='' href='?t=guild_hall&amp;tab=3'>Chat<\/a><\/li>\n"
+verw
+"<li><a class='active' href='?t=guild_arena'>Gildenarena<\/a><\/li>\n";
}
//Auf richtiger Seite anwenden
function garena() {
  if (line) {
    if (line.innerHTML.match("Gildenhalle")&&line.parentNode.getElementsByTagName("ul")[0]) {
      halletab();
      if (line.parentNode.innerHTML.match("Unsere Mitglieder")) {
        platz();
      }
    }
    if (document.URL.match(/t=guild_arena/)) {
      arenatab();
    }
  }
}

/************************
** 11. Sitter merken **
************************/
function pfleger() {
  var flname=document.getElementsByName("str_username")[0];
  GM_setValue("pfleger_"+user,flname.value);
}
function sittern() {
  var formular=document.getElementById("drag_box").getElementsByTagName("form")[0];
  formular.getElementsByTagName("input")[0].value=GM_getValue("pfleger_"+user,"");
  formular.addEventListener("submit",pfleger,false);
}
function sitter() {
  if (document.getElementById("drag_box")) {
    if (document.getElementById("drag_box").getElementsByTagName("form")[0]) {
      if (document.getElementById("drag_box").getElementsByTagName("form")[0].innerHTML.match("Pflegers")) {
        sittern();
      }
    }
  }
}

/*************************************************
** 12. Warnung bei schlechtem Erhaltungszustand **
*************************************************/
function ausbau() {
  if (document.getElementById("cost_renovate")) {
    var ausbauen=document.getElementById("building_upgrade_cost").parentNode.getElementsByTagName("td")[1];
    var zustand=document.getElementById("cost_renovate").parentNode.innerHTML.match(/zustand: (\d{1,3})%/);
    if (ausbauen.getElementsByTagName("a")[0]) {
      if (parseInt(zustand[1])<75) {
        var warn=document.createAttribute("onclick");
        warn.nodeValue = "return confirm('Das Geb\u00e4ude hat einen Erhaltungszustand von nur "
+zustand[1]+"%.\\nDie Renovierung wird teurer werden, nachdem der Ausbau fertig gestellt wurde. Es ist daher ratsam,"
+" das Geb\u00e4ude vorher zu renovieren.\\nM\u00f6chtest du das Geb\u00e4ude wirklich ausbauen, ohne es zu renovieren?');"
+" if(Check == false) {return false;} else {return true;}";
        ausbauen.getElementsByTagName("a")[0].setAttributeNode(warn);
      }
    }
  }
}
function zerfall() {
  if (document.getElementById("cost_renovate")) {
    var zustand=document.getElementById("cost_renovate").parentNode.innerHTML.match(/zustand: (\d{1,3})%/);
    if (parseInt(zustand[1])<5) {
      alert("Achtung\nDas Geb\u00e4ude hat einen Erhaltungszustand von nur noch "+zustand[1]
+"%.\nWenn es nicht bald renoviert wird, wird es verfallen und eine Stufe verlieren!");
    }
  }
}

function warn_zustand() {
  if (line) {
    if (line.innerHTML.match(/Geb\u00e4ude\u00fcbersicht/)) {
      ausbau();
      zerfall();
    }
  }
}

/********************************
** 13. Zustandsliste sortieren **
********************************/
function zustand_sort() {
  if (document.getElementById("store").getElementsByTagName("tbody")) {
  var tabelle=document.getElementById("store").getElementsByTagName("tbody")[0]; }
  else { var tabelle=document.getElementById("store"); }
  var z_liste=tabelle.getElementsByTagName("tr");
  var z_zeilen = [];
  for (var i=1;i<z_liste.length;i++) {
  z_zeilen[i-2] = z_liste[i];
  };
  z_zeilen.sort(
   function(x, y) { return num(x,y); }
  );
  for (var i=0; i<z_zeilen.length; i++) {
    tabelle.appendChild(z_zeilen[i]);
  }
  function num(x, y) {
  var xProzent = parseInt(x.getElementsByTagName("td")[1].innerHTML.toString());
  var yProzent = parseInt(y.getElementsByTagName("td")[1].innerHTML.toString());
  return xProzent - yProzent;
  };
}

function z_sort() {
  if (document.getElementById("mainRight")) {
    if (document.getElementById("store")) {
      if (document.getElementById("store").getElementsByTagName("td")[0].innerHTML.match(/Zustand/)) {
        zustand_sort();
      }
    }
  }
}


/**************************************************
** 14. Tabellen in Gildenhalle und Drachenprofil **
**************************************************/
// Tabellencode in richtige Tabelle umwandeln
function table_insert(elm,nr) {
  var ort=line.parentNode.getElementsByTagName(elm)[nr];
if (elm=="h3") { ort=ort.nextSibling.nextSibling.nextSibling.nextSibling; }
if (elm=="table") {
    var trs=ort.getElementsByTagName("tr");
    for(i=0;i<trs.length;i++) {
      if(trs[i].getElementsByTagName("textarea")[0]) {
        ort=trs[i].nextSibling.nextSibling.getElementsByTagName("td")[0];
      }
    }
}
  var inhalt;
  if (ort.getElementsByTagName("textarea")[0]) {
    inhalt=ort.getElementsByTagName("textarea")[0].innerHTML.toString();
  }
  var tabelle=ort.innerHTML.toString();
  var breite;
  tabelle=tabelle.replace(/\|(\s*<\/)|\|( *\n<br>\n[^\|\^])|\|(\s*<p)/g, "<\/td><\/tr><\/tbody><\/table>$1$2$3");
  tabelle=tabelle.replace(/\^(\s*<\/)|\^( *\n<br>\n[^\|\^])|\^(\s*<p)/g, "<\/th><\/tr><\/tbody><\/table>$1$2$3");
  for(i=10;i>0;i=i-1) {
    if (i!=1) { breite=" colspan=\""+i+"\""; }
    else { breite=""; }
    e=new RegExp("([^\\^\\\|]\\n<br>\\n)\\^\{"+i+"\}([\^\\^])","g");
    tabelle=tabelle.replace(e, "$1<table class=\"table\"><tbody><tr><th"+breite+">$2");
    f=new RegExp("(h3|td|en\\;\\\")(>\\s*)\\^\{"+i+"\}([\^\\^])","g");
    tabelle=tabelle.replace(f, "$1$2<table class=\"table\"><tbody><tr><th"+breite+">$3");
    h=new RegExp("([^\\^\\\|]\\n<br>\\n)\\\|\{"+i+"\}([\^\\\|])","g");
    tabelle=tabelle.replace(h, "$1<table class=\"table\"><tbody><tr><td"+breite+">$2");
    k=new RegExp("(h3|td|en\\;\\\")(>\\s*)\\\|\{"+i+"\}([\^\\\|])","g");
    tabelle=tabelle.replace(k, "$1$2<table class=\"table\"><tbody><tr><td"+breite+">$3");
    g=new RegExp("(<div style=\\\"text-align: ?center\\;?\\\">\\s*)\\^\{"+i+"\}([\^\\^])","g");
    tabelle=tabelle.replace(g, "<div><table class=\"table\" align=\"center\" style=\"margin-left:auto;margin-right:auto;\"><tbody><tr><th"+breite+">$2");
    l=new RegExp("(<div style=\\\"text-align: ?center\\;?\\\">\\s*)\\\|\{"+i+"\}([\^\\\|])","g");
    tabelle=tabelle.replace(l, "<div><table class=\"table\" align=\"center\" style=\"margin-left:auto;margin-right:auto;\"><tbody><tr><td"+breite+">$2");
    a=new RegExp("\\n\\^\{"+i+"\}([\^\\^])","g");
    tabelle=tabelle.replace(a, "<tr><th"+breite+">$1");
    c=new RegExp("\\n\\\|\{"+i+"\}([^\\^])","g");
    tabelle=tabelle.replace(c, "<tr><td"+breite+">$1");
  }
  tabelle=tabelle.replace(/\^[ \s]*\n?<br>\n*/g, "<\/th><\/tr>\n");
  tabelle=tabelle.replace(/\|[ \s]*\n?<br>\n*/g, "<\/td><\/tr>\n");
  for(i=10;i>0;i=i-1) {
    if (i!=1) { breite=" colspan=\""+i+"\""; }
    else { breite=""; }
    b=new RegExp("\\^\{"+i+"\}([^\\^\\n])","g");
    tabelle=tabelle.replace(b, "<\/th><th"+breite+">$1");
    d=new RegExp("\\\|\{"+i+"\}([^\\^\\n])","g");
    tabelle=tabelle.replace(d, "<\/td><td"+breite+">$1");
  }
  if (!tabelle.match(/<table/g)) {
    tabelle=tabelle.replace(/^\s*<\/t(d|h)>/g, "<table class=\"table\"><tbody><tr>");
  }
  tabelle=tabelle.replace(/<t(d|h)>\s*$/g, "<\/tbody><\/table>");
  ort.innerHTML=tabelle;

  var z=ort.getElementsByTagName("table");
  for(k=0;k<z.length;k++) {
    z[k].innerHTML=z[k].innerHTML.replace(/<br>/g, "");
  }
  if (ort.getElementsByTagName("textarea")[0]) {
    ort.getElementsByTagName("textarea")[0].innerHTML=inhalt;
  }
}
// Spalten abfragen
function t_tr() {
  var spalten=prompt("Gebe die Anzahl der Spalten ein, die die Tabelle haben soll.", "");
  spalten=parseInt(spalten.toString().replace(/\D/g, ""));
  if (isNaN(spalten)) {
    spalten=prompt("Ung\u00fcltiger Wert.\nBitte gib die Anzahl der Spalten, die die Tabelle haben soll, als eine Zahl ein.");
    spalten=parseInt(spalten.toString().replace(/\D/g, ""));
    if (isNaN(spalten)) {
      spalten=prompt("Also gut, nochmal gaaanz langsam:\nDu willst eine Tabelle erstellen. Dazu musst du wissen"
      +" wie viele Spalten - das sind die senkrechten Dinger nebeneinander - sie haben soll.\n"
      +"Und diese Zahl sollst du jetzt hier eingeben. Und zwar als Zahl - das sind die Dinger aus dem Mathematikunterricht.\n"
      +"Das hier ist z.B. eine Zahl: 6\nWenn du es jetzt verstanden hast, dann gib diese Zahl bitte hier ein:");
      spalten=parseInt(spalten.toString().replace(/\D/g, ""));
      if (isNaN(spalten)) { alert("Ich geb's auf!"); return false; }
    }
  }
  if (spalten>20) {
    alert(spalten+" sind aber zu viele Spalten. Die Anzahl wurde auf 20 begrenzt.");
    spalten=20;
  }
  if (spalten==0) {
    alert("Eine Tabelle muss mindestens eine Spalte haben.");
    return t_tr();
  }
  return t_th(spalten);
}
//Kopfzeilen abfragen
function t_th(spalten) {
  var kopf=prompt("Gebe die Anzahl der Kopfzeilen ein, die die Tabelle haben soll.\n"
  +"Kopfzeilen sind für die Überschriften der Spalten. Standard ist\n eine Kopfzeile. Du kannst aber auch mehr,\n"
  +"oder aber keine haben.","1");
  kopf=parseInt(kopf.toString().replace(/\D/g, ""));
  if (isNaN(kopf)) {
    kopf=prompt("Ung\u00fcltiger Wert.\nBitte gib die Anzahl der Kopfzeilen, die die Tabelle haben soll, als eine Zahl ein.", "1");
    kopf=parseInt(kopf.toString().replace(/\D/g, ""));
    if (isNaN(kopf)) {
      kopf=prompt("Noch ein Versuch:\nGibt die Anzahl der Kopfzeilen f\u00fcr deine Tabelle ein.\n"
     +"Oder lass doch einfach die \"1\" stehen.", "1");
       kopf=parseInt(kopf.toString().replace(/\D/g, ""));
       if (isNaN(kopf)) { alert("Dann eben nicht!"); return false; }
    }
  }
  if (kopf>5) {
    confirm(kopf+" sind zu viele Kopfzeilen. Die Anzahl wurde auf 5 begrenzt.");
    kopf=5;
  }
  return t_td(spalten,kopf);
}
// Tabellenzeilen abfragen
function t_td(spalten,kopf) {
  var reihen=prompt("Gebe die Anzahl der K\u00f6rperzeilen ein, die die Tabelle haben soll.\n"
  +"Das sind alle Zeilen unterhalb der Kopfzeile.", "");
  reihen=parseInt(reihen.toString().replace(/\D/g, ""));
  if (isNaN(reihen)) {
    reihen=prompt("Ung\u00fcltiger Wert.\nBitte gib die Anzahl der Zeilen, die die Tabelle haben soll, als eine Zahl ein.", "");
    reihen=parseInt(reihen.toString().replace(/\D/g, ""));
    if (isNaN(reihen)) {
      reihen=prompt("Das kann doch nicht so schwer sein:\nWie viele Zeilen soll deine Tabelle untereinander"
      +" haben?\nGib diese Zahl hier ein.");
      reihen=parseInt(reihen.toString().replace(/\D/g, ""));
      if (isNaN(reihen)) { alert("Du bist ein hoffnungsloser Fall!"); return false; }
    }
  }
  if (reihen==0) {
    alert("Eine Tabelle muss mindestens eine Zeile haben.");
    return t_td();
  }
  if (reihen>80) {
    alert(reihen+" sind zu viele Tabellenzeilen. Die Anzahl wurde auf 80 begrenzt.");
    reihen=80;
  }
  return t_erstellen(spalten,kopf,reihen);
}
// Tabellencode erstellen
function t_erstellen(spalten,kopf,reihen) {
  var table_new="";
  for(i=0;i<kopf;i++) {
    for(k=0;k<spalten;k++) {
      table_new+="\^ ";
    }
    table_new+="\^\n";
  }
  for(i=0;i<reihen;i++) {
    for(k=0;k<spalten;k++) {
      table_new+="\| ";
    }
    table_new+="\|\n";
  }
  t_einfuegen(table_new);
}
// Tabellencode in Textfeld einfügen
function t_einfuegen(table_new) {
  if(document.getElementsByTagName("textarea")[0].className!="invisible") var input = document.getElementsByTagName("textarea")[0];
  else var input = document.getElementsByTagName("textarea")[1];
  var scrollpos = input.scrollTop;
  input.focus();
  var end = input.selectionEnd;
  input.value = input.value.substr(0, end) + table_new + input.value.substr(end);
  pos = end + table_new.length;
  input.selectionStart = pos;
  input.selectionEnd = pos;
  input.scrollTop = scrollpos;
}
// Button zum Tabelle Erstellen
function generator_button(x) {
  if (document.getElementsByTagName("textarea")[0]) {
    var hierhin;
    switch(x) {
    case 1: hierhin=line.parentNode.getElementsByTagName("table")[0].getElementsByTagName("input")[3]; break;
    case 2: hierhin=document.getElementsByTagName("textarea")[1].parentNode.getElementsByTagName("input")[3]; break;
    default: hierhin=document.getElementsByTagName("textarea")[0].parentNode.getElementsByTagName("input")[3]; }
    var generator=document.createElement("input");
    generator.type="button";
    generator.id="table_button";
    generator.value="Tabelle erstellen";
    generator.style.marginRight="0.5em";
    hierhin.parentNode.insertBefore(generator, hierhin);
    generator.addEventListener("click",t_tr,false);
  }
}

// Passende Seiten finden
function table() {
  if (line) {
    if (line.textContent.match(/Gildenhalle/)&&line.parentNode.getElementsByTagName("ul")[0]) {
      if (line.parentNode.getElementsByTagName("h3")[0]) {
        if (line.parentNode.getElementsByTagName("h3")[0].textContent.match(/Punkte/)) {
          table_insert("div",3);
        }
        if (line.parentNode.getElementsByTagName("h3")[0].textContent.match(/News/)) {
          table_insert("div",3);
          generator_button();
        }
        if (line.parentNode.getElementsByTagName("h3")[0].textContent.match(/Gildenprofil/)) {
          table_insert("h3",0);
          generator_button(1);
        }
      }
    }
    if (line.textContent.match(/Profil von/)) {
      table_insert("div",4);
    }
    if (line.textContent.match(/Profil der Gilde/)&&!document.URL.match(/tab=2/)) {
      table_insert("div",3);
    }
    if (line.textContent.match(/Drachenzucht/)) {
      if(document.URL.match(/tab=2/)) {
        table_insert("table",0);
        generator_button(2);
      }
    }
  }
}

/***********************************************
** 15. Nicht benötigte Dracheneier ausblenden **
***********************************************/
function eibild() {
  var cssinhalt=document.styleSheets[0];
  if(cssinhalt.cssRules) var laenge=cssinhalt.cssRules.length;
  else var laenge=cssinhalt.rules.length
  cssinhalt.insertRule(".eibild {\n"
+"  background-image:url\(data:image\/jpg;base64,"
+"\/9j\/4AAQSkZJRgABAQEASABIAAD\/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsK"
+"CwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT\/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQU"
+"FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT\/wAARCAAMAAwDAREA"
+"AhEBAxEB\/8QAFgABAQEAAAAAAAAAAAAAAAAABwUG\/8QAJxAAAQMCBAUFAAAAAAAAAAAAAQIDBAUG"
+"AAcRIQgSIjFBExRRYZH\/xAAYAQACAwAAAAAAAAAAAAAAAAADBAUGB\/\/EAB4RAAICAwEAAwAAAAAA"
+"AAAAAAECAAMEESEiEyNB\/9oADAMBAAIRAxEAPwCde3Ezc79+XDHcqUukIgVB2KxFjulsNIbdKBzJ"
+"GgWToCeb5PjTGfZ1uV8+0cgD8Et2NVSaujZjplNxHP3LanuKvS5MmY08WS\/Da6XEhKSFEbaK6t9N"
+"vI74l8TNZ6\/sGyORC6hVbyeTLZucMNp3JfTtYemVeNNlqCnjGkIAUR2O6Dv94csprY+huBSxgOGM"
+"eXOUNv2Fa7FMpYmegVF5S3pS1LWsgaknbU7D8wdKkVdKNQTOxPZ\/\/9k=\);\n"
+"  background-repeat:no-repeat;\n"
+"  heigth:12px;\n"
+"  width:12px;\n"
+"  cursor:pointer;\n"
+"}",laenge);
  var einblenden = document.createElement("script");
  einblenden.type = "text\/javascript";
  var inhalt = document.createTextNode("function eier(elem) {\n"
  +"  var alle=document.getElementsByTagName(elem);\n"
  +"  for (i=0;i<alle.length;i++) {\n"
  +"    if (alle[i].className=='ei') {\n"
  +"      if (alle[i].style.display=='none') { alle[i].style.display='inline'; }\n"
  +"      else { alle[i].style.display='none'; }\n"
  +"    }\n"
  +"  }\n"
  +"}");
  einblenden.appendChild(inhalt);
  var kopf = document.getElementsByTagName("head")[0];
  kopf.appendChild(einblenden);
}

function eiReiterD() {
  var drachen=rand.getElementsByTagName("p")[0];
  drachen.getElementsByTagName("b")[0].className="eibild";
  drachen.getElementsByTagName("b")[0].style.paddingRight="20px";
  drachen.getElementsByTagName("b")[0].style.backgroundPosition="top right";
  drachen.getElementsByTagName("b")[0].setAttribute("onclick","eier('span');");
  drachen.innerHTML=drachen.innerHTML.replace(/(<br>\s*<a href=.+>(JohnDoe\d*|MaryDoe\d*)<\/a>\s*\(\d+\))/ig,
"<span class=\"ei\" style=\"display: none;\">$1<\/span>");
  drachen.innerHTML=drachen.innerHTML.replace(/(<br><span>\s*<a href=.+>(JohnDoe\d*|MaryDoe\d*)<\/a>\s*\(\d+\)\s*\n\s*.*<\/span><\/span>)/ig,
"<span class=\"ei\" style=\"display: none;\">$1<\/span>");
}
function eiProfil() {
  var zeilen=document.getElementById("drag_box").getElementsByTagName("tr");
  var drachen;
  for(i=0;i<zeilen.length;i++) {
    if(zeilen[i].getElementsByTagName("td")[0].textContent.match(/Drachen/)) {
      drachen=zeilen[i].getElementsByTagName("td");
      drachen[0].innerHTML+="<img src=\"\/img\/us.gif\" alt=\"\" class=\"eibild\" onclick=\"eier('span');\" \/>";
      drachen[1].innerHTML=drachen[1].innerHTML.replace(/(<a href=.+>(JohnDoe\d*|MaryDoe\d*)<\/a>&nbsp;.*&nbsp;)/ig,
"<span class=\"ei\" style=\"display: none;\">$1<\/span>");
    }
  }
}
function eiDZ() {
  var drachen=document.getElementById("building_name").parentNode;
  var x;
  for(i=0;i<drachen.getElementsByTagName("b").length;i++) {
    if (drachen.getElementsByTagName("b")[i].textContent.match(/in der/)) x=i;
  }
  drachen.getElementsByTagName("b")[x].className="eibild";
  drachen.getElementsByTagName("b")[x].style.paddingLeft="20px";
  drachen.getElementsByTagName("b")[x].setAttribute("onclick","eier('a');");
  var dr_links=drachen.getElementsByTagName("a");
  for(i=0;i<dr_links.length;i++) {
    if(dr_links[i].textContent.match(/(JohnDoe\d*|MaryDoe\d*)/)) {
      dr_links[i].className="ei";
      dr_links[i].style.display="none";
    }
  }
}
function dr_ei() {
  if (rand) {
    if (rand.innerHTML.match(/Deine Drachen/)) {
      if (rand.innerHTML.match(/JohnDoe\d*|MaryDoe\d*/i)) {
        eiReiterD();
        eibild();
      }
    }
  }
  if (line) {
    if (line.innerHTML.match(/Spielerprofil/)) {
      if (document.getElementById("drag_box").innerHTML.match(/JohnDoe\d*|MaryDoe\d*/i)) {
        eiProfil();
        eibild();
      }
    }
    if (document.getElementById("building_name")) {
      if (document.getElementById("building_name").innerHTML.match(/Drachenzucht/)) {
        if (document.getElementById("building_name").parentNode.innerHTML.match(/JohnDoe\d*|MaryDoe\d*/i)) {
          eiDZ();
          eibild();
        }
      }
    }
  }
}

/***********************************
** 16. Lager als Gebäude sichtbar **
***********************************/

function lager_stufe() {
  var stufe;
  var lagerlink="/?t=building&position=23";
  var bau="";
  var zeit="";
  var platz="";
  var welt=window.location.host;
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://'+welt+'/?t=market&tab=14',
    headers: {'Cache-Control': 'no-cache'},
    onload: function(resp) {
      rt=resp.responseText;
      try { stufe=/\s*Stufe\s*(\d+)/m.exec(rt)[1];
        if (stufe=="1") { lagerlink="/?t=market&tab=14"; }
      }
      catch(err) {
        stufe=GM_getValue("l_pos_"+user+"_"+location.host,"0;1").split(";")[1];
      }
      if (rt.toString().match(/Stufe\s*(\d+)\s\(wird ausgebaut/g)) {
        bau="wird ausgebaut.";
        zeit=/endet am (\d+\.\d+ \d+:\d+) Uhr/m.exec(rt)[1].toString().replace(/\.|\s|:/g, ";");
      }
      try { platz=/([\d\.]+) St\u00fcck je Ware/.exec(rt)[1];
      } catch(err) {  }
      lager_html(stufe,lagerlink,bau,zeit,platz);
    }
  });
}
function lager_stufe_alt() {
  var stufe=/\d+/.exec(document.getElementById("building_name").textContent);
  var l_pos=GM_getValue("l_pos_"+user+"_"+location.host,"0;1").split(";");
  if(!isNaN(stufe)) { l_pos[1]=stufe; }
  GM_setValue("l_pos_"+user+"_"+location.host,l_pos.join(";"));
}
function lager_html(stufe,lagerlink,bau,zeit,platz) {
  var jetztMonat = parseInt(serverzeit[1],10)-1;
  var jetzt = new Date(0).setFullYear(serverzeit[2]);
  jetzt = new Date(jetzt).setMonth(jetztMonat);
  jetzt = new Date(jetzt).setDate(serverzeit[0]);
  jetzt = new Date(jetzt).setHours(serverzeit[3]);
  jetzt = new Date(jetzt).setMinutes(serverzeit[4]);
  jetzt = new Date(jetzt).setSeconds(serverzeit[5]);
  var endzeit=zeit.split(";");
  var endMonat=parseInt(endzeit[1],10)-1;
  var jahr;
  if (jetztMonat>endMonat) {
    jahr=parseInt(serverzeit[2])+1; }
  else { jahr=parseInt(serverzeit[2],10); }
  var endeAusbau = new Date(0).setFullYear(jahr);
  endeAusbau = new Date(endeAusbau).setMonth(endMonat);
  endeAusbau = new Date(endeAusbau).setDate(endzeit[0]);
  endeAusbau = new Date(endeAusbau).setHours(endzeit[2]);
  endeAusbau = new Date(endeAusbau).setMinutes(parseFloat(endzeit[3])+1);
  var dauer=(endeAusbau-jetzt)/1000;
    var nacht="";
    var winter="";
  if (document.getElementById("mainVillage")) {
    if(document.getElementById("mainVillage").className.match(/night/)) nacht=" night";
    if(document.getElementById("mainVillage").className.match(/winter/)) winter=" winter";
  }
  if (document.getElementById("mainVillageDrachenzucht")) {
    if(document.getElementById("mainVillageDrachenzucht").className.match(/night/)) nacht=" night";
    if(document.getElementById("mainVillageDrachenzucht").className.match(/winter/)) winter=" winter";
  }
  var hierhin=document.getElementById("tooltip1").parentNode.parentNode;
    var down=parseInt(GM_getValue("sun","18;6").split(";")[0],10);
    var up=parseInt(GM_getValue("sun","18;6").split(";")[1],10);
    var zeit=parseInt(serverzeit[3],10);
    if(GM_getValue("nacht",true)) {
      if(GM_getValue("nachtStatus","M")=="A"||GM_getValue("nachtStatus","M")=="M"&&(down==up||(down>up&&(zeit>=down||zeit<up))||(down<up&&zeit>=down&&zeit<up))) {
        nacht=" night";
      } else {
        nacht="";
      }
    }
    if(GM_getValue("advent",true)) {
      if(GM_getValue("season","S")=="W") winter= " winter";
      else winter= "";
    }
  lagerBild=document.createElement("div");
  lagerBild.className="building l_pos lager"+nacht+winter;
  lagerTip=document.createElement("div");
  if (bau=="") { lagerTip.className="l_pos   status"; }
  else { lagerTip.className="l_pos pause progress status";
    if(nacht==" night") lagerTip.style.backgroundImage="url("+hoster+b_progress_n+")";
    lagerBau=document.createElement("div");
    lagerBau.id="lagerBau";
    lagerBau.title=dauer;
    lagerBau.className="buildingCountdown";
    window.setTimeout("new Countdown(document.getElementById('lagerBau'))",1);
    lagerBauText=document.createTextNode("in Bau");
  }
  lagerTip1=document.createElement("div");
  lagerTip1.id="tooltip30";
  lagerTip1.className="tooltip";
  lagerTip2=document.createElement("h3");
  lagerTip2Text=document.createTextNode("Lager Stufe "+stufe);
  if(bau==""&&platz!="") {
    lagerTip2x=document.createElement("div");
    lagerTip2xText=document.createTextNode(platz+" je Ware");
  }
  lagerTip3=document.createElement("div");
  lagerTip3Text=document.createTextNode(bau);
  lagerTip4=document.createElement("a");
  lagerTip4.className="building l_pos";
  lagerTip4.href=lagerlink;
  lagerTip4.setAttribute("onmouseover", "showBuildingTooltip(elm('tooltip30'));");
  lagerTip4.setAttribute("onmouseout", "hideBuildingTooltip(elm('tooltip30'));");
  lagerTip2.appendChild(lagerTip2Text);
  if(bau==""&&platz!="") lagerTip2x.appendChild(lagerTip2xText);
  lagerTip1.appendChild(lagerTip2);
  if(bau==""&&platz!="") lagerTip1.appendChild(lagerTip2x);
  lagerTip3.appendChild(lagerTip3Text);
  lagerTip1.appendChild(lagerTip3);
  if (bau!="") {
    lagerBau.appendChild(lagerBauText);
    lagerTip.appendChild(lagerBau);
  }
  lagerTip.appendChild(lagerTip1);
  hierhin.appendChild(lagerBild);
  hierhin.appendChild(lagerTip);
  hierhin.appendChild(lagerTip4);
//Tower
  for(i in hierhin.getElementsByTagName("div")) {
    if(hierhin.getElementsByTagName("div")[i].className.match("tower")) {
      var o_tower = hierhin.getElementsByTagName("div")[i];
      break;
    }
  }
  o_tower.removeAttribute("title");
  o_tower.className="turm"+nacht+winter;
  var capital=o_tower.getElementsByTagName("a")[0].cloneNode(true);
  capital.setAttribute("onmouseover","elm('tooltipT').parentNode.style.width='120px'; elm('tooltipT').style.display='block';");
  capital.setAttribute("onmouseout","elm('tooltipT').parentNode.style.width='28px'; elm('tooltipT').style.display='none';");
  capital.className="hauptstadt";
  o_tower.removeChild(o_tower.getElementsByTagName("a")[0]);
  hierhin.insertBefore(capital,o_tower);
  var tower_mo=document.createElement("div");
  tower_mo.className="turm status";
  var tower_tooltip=document.createElement("div");
  tower_tooltip.id="tooltipT";
  tower_tooltip.className="tooltip";
  tower_tooltip.style.marginTop="-20px";
  var tower_text=document.createTextNode("zur Hauptstadt");
  tower_tooltip.appendChild(tower_text);
  tower_mo.appendChild(tower_tooltip);
  hierhin.insertBefore(tower_mo,hierhin.getElementsByTagName("a")[1]);
  if(GM_getValue("b_fort",true)&&bau!="") new baufortschritt(document.getElementById('lagerBau'));
}
function lager_css() {
  var lagerPos="";
  if (GM_getValue("l_pos_"+user+"_"+location.host,"0;1").split(";")[0]=="0") {
    lagerPos="  left: 210px;\n  top: 120px;\n";
  } else {
    lagerPos="  left: 600px;\n  top: 142px;\n";
  }
  var cssinhalt=document.styleSheets[0];
  if (cssinhalt.cssRules) var laenge=cssinhalt.cssRules.length;
  else var laenge=cssinhalt.rules.length;
  cssinhalt.insertRule("div.l_pos, a.l_pos {\n"
+lagerPos+"}\n",laenge);
  cssinhalt.insertRule("div.l_pos {\n"
+"  z-index:11;\n"
+"}\n",laenge);
  cssinhalt.insertRule("div.l_pos.status {\n"
+"  z-index:12;\n"
+"}\n",laenge);
  cssinhalt.insertRule("div.turm {\n"
+"  display:block;\n"
+"  background-image:url(img/gebauede_sprite100x100.png);\n"
+"  background-position:-775px -634px;\n"
+"  background-repeat:none;\n"
+"  width:28px;\n"
+"  height:75px;\n"
+"  position:absolute;\n"
+"  left:707px;\n"
+"  top:145px;\n"
+"  z-index:9;\n"
+"}",laenge);
  cssinhalt.insertRule("div.turm.night{\n"
+"  background-image:url(img/gebauede_sprite100x100_night.png);\n"
+"}",laenge);
  cssinhalt.insertRule("div.turm.winter{\n"
+"  background-image:url(img/gebauede_sprite100x100_winter.png);\n"
+"}",laenge);
  cssinhalt.insertRule("div.turm.night.winter{\n"
+"  background-image:url(img/gebauede_sprite100x100_night_winter.png);\n"
+"}",laenge);
  cssinhalt.insertRule("div.turm.status {\n"
+"  background-image:none;\n"
+"  z-index:10;\n"
+"}",laenge);
  cssinhalt.insertRule("a.hauptstadt {\n"
+"  display:block;\n"
+"  background-image:none;\n"
+"  width:28px;\n"
+"  height:75px;\n"
+"  position:absolute;\n"
+"  left:707px;\n"
+"  top:145px;\n"
+"  z-index:100;\n"
+"}",laenge);
}
function lager() {
  if (document.URL.match(/t=village/)||(!document.URL.match(/t=/)&&(document.getElementById("mainVillage")||document.getElementById("mainVillageDrachenzucht")))) {
    lager_css();
    lager_stufe();
  }
  if ((document.URL.match(/t=market/)&&document.URL.match(/tab=14/))||(document.URL.match(/t=building/)&&document.URL.match(/position=23/))) {
    if(document.getElementById("building_name")) {
      lager_stufe_alt();
    }
  }
}

/**************************************
** 17. Orakelvorhersage zu Spielen **
**************************************/
function orakeln() {
  var spieler=document.getElementsByTagName("ul");
  var heim, gast, staerke;
  for (i in spieler) {
    if (spieler[i].className=="lineupHome") {
      heim=spieler[i];
    }
    if (spieler[i].className=="lineupGuest") {
      gast=spieler[i];
    }
  }
  var st_heim=0;
  var st_gast=0;
  var url=document.URL.match(/http.*\//);
  url+="?t=guild_arena&tab=5&lineup=";
  var sp_heim=heim.getElementsByTagName("li");
  var x=0;
  for (i=10;i>=0;i--) {
    if (sp_heim[i].innerHTML=="-&nbsp;") {
      url+="o";
    }
    else {
      url+="X"; x++;
      staerke=/\d+/.exec(sp_heim[i].title);
      st_heim+=parseInt(staerke);
    }
  }
  url+=":";
  var sp_gast=gast.getElementsByTagName("li");
  var y=0;
  for (i=0;i<=10;i++) {
    if (sp_gast[i].innerHTML=="-&nbsp;") {
      url+="o";
    }
    else {
      url+="X"; y++;
      staerke=/\d+/.exec(sp_gast[i].title);
      st_gast+=parseInt(staerke);
    }
  }
  if (x>=5&&y>=5) {
    var mitte=document.createElement("p");
    mitte.style.textAlign="center";
    var orakelButton=document.createElement("input");
    orakelButton.type="button";
    orakelButton.id="orakelButton";
    orakelButton.name="orakelButton";
    orakelButton.value="Orakel befragen!";
    mitte.appendChild(orakelButton);
    heim.parentNode.parentNode.insertBefore(mitte,heim.parentNode);
    document.getElementById("orakelButton").addEventListener("click",function (){GM_openInTab(url);},false);
  }
  heim.nextSibling.nextSibling.title="Gesamtst\u00e4rke: "+st_heim;
  gast.nextSibling.nextSibling.title="Gesamtst\u00e4rke: "+st_gast;
}

function orakel_ga(neu) {
  var pos=document.getElementById("positionen");
  var select=pos.getElementsByTagName("form")[0].getElementsByTagName("select");
  var nr, drache;
  var aufst='';
  var anzahl=0;
  var gesamt=0;
  for(i=10;i>=0;i--) {
    if(neu) select[i].addEventListener("change",function() {return orakel_ga();},false);
    nr=select[i].selectedIndex;
    drache=select[i].options[nr];
    if(drache.text!='-') {
      anzahl++;
      gesamt+=parseInt(/ \((\d+)\)/.exec(drache.text)[1]);
      aufst+='X';
    } else {
      aufst+='o';
    }
  }
  var url='http://'+window.location.host+'/?t=guild_arena&tab=5';
  if(document.URL.match(/city=1/)) url+='&city=1';
  var url_heim=url+'&lineup='+aufst+':ooooooooooo';
  var url_gast=url+'&lineup=ooooooooooo:'+aufst;
//Gesamtstaerke anzeigen
  var staerke=pos.getElementsByTagName("h4")[0];
  if(neu) {
    var span=document.createElement("span");
    span.style.fontWeight="normal";
    span.style.marginRight="1em";
    span.style.cssFloat="right";
    var spanText=document.createTextNode("Gesamtst\u00e4rke: "+gesamt);
    span.appendChild(spanText);
    staerke.appendChild(span);
  } else {
    staerke.getElementsByTagName("span")[0].textContent="Gesamtst\u00e4rke: "+gesamt;
  }
  if(anzahl==0) staerke.getElementsByTagName("span")[0].textContent="";
//Orakellinks
  if(neu) {
    var hierhin=pos.getElementsByTagName("div")[0];
    var box=document.createElement("div");
    box.id="orakel_box";
    box.style.cssFloat="right";
    box.style.display="none";
    var text=document.createTextNode("Orakel befragen f\u00fcr:");
    var button_heim=document.createElement("input");
    button_heim.type="button";
    button_heim.id="button_heim";
    button_heim.value="Heimspiel";
    button_heim.style.marginLeft="0.5em";
    var button_gast=document.createElement("input");
    button_gast.type="button";
    button_gast.id="button_gast";
    button_gast.value="Gastspiel";
    button_gast.style.marginLeft="0.5em";
    box.appendChild(text);
    box.appendChild(button_heim);
    box.appendChild(button_gast);
    staerke.style.clear="right";
    pos.insertBefore(box,hierhin);
    document.getElementById("button_heim").setAttribute("onclick","window.open('"+url_heim+"','_blank')");
    document.getElementById("button_gast").setAttribute("onclick","window.open('"+url_gast+"','_blank')");
  }
  if(anzahl>=5&&anzahl<=7) {
    document.getElementById("orakel_box").style.display="block";
    document.getElementById("button_heim").setAttribute("onclick","window.open('"+url_heim+"','_blank')");
    document.getElementById("button_gast").setAttribute("onclick","window.open('"+url_gast+"','_blank')");
  } else {
    document.getElementById("orakel_box").style.display="none";
    document.getElementById("button_heim").setAttribute("onclick","");
    document.getElementById("button_gast").setAttribute("onclick","");
  }
}

function orakel() {
  var spieler=document.getElementsByTagName("ul");
  if (spieler[0]) {
    for (i in spieler) {
      if (spieler[i].className=="lineupHome") {
        if (!spieler[i].innerHTML.match(/<input/g)) {
          orakeln();
        }
      }
    }
  }
  if(line&&line.getElementsByTagName("div")[0].textContent.match(/Gildenarena/)) {
    if (document.getElementById("positionen")) {
      orakel_ga(true);
    }
  }
}

/***************************************************
** 18. Baukosten ohne Bauherrn-Ersparnis anzeigen **
***************************************************/
function b_herr() {
  var t=line.parentNode.getElementsByTagName("div")[3].getElementsByTagName("table");
  var s;
  if(document.getElementById("building_material1")) {
    if(document.getElementById("building_material2")) {
      s=t[2].getElementsByTagName("tr");
    } else {
      s=t[1].getElementsByTagName("tr");
    }
  } else {
    s=t[0].getElementsByTagName("tr");
  }
  var bauherr=parseInt(s[0].getElementsByTagName("th")[3].textContent.match(/\d+/))/100;
  if (bauherr!=0) {
    var baukosten=new Array;
    var cost=new Array;
    var newcost=new Array;
    var savings=new Array;
    for(i=0;i<s.length;i++) {
      if (s[i].getElementsByTagName("th")[0]) {
        baukosten[i]=s[i+1].getElementsByTagName("td")[4];
        cost[i]=baukosten[i].innerHTML.match(/\b\d+\.?\d*\.?\d*\b/g);
        for(k=0;k<cost[i].length;k++) { cost[i][k]=cost[i][k].replace(/\./g, ""); }
        newcost[i]=new Array;
        for (k=0;k<cost[i].length;k++) {
          newcost[i][k]=Math.round(parseInt(cost[i][k])/(1-bauherr));
        }
        savings[i]=new Array;
        for (k=0;k<cost[i].length;k++) {
          savings[i][k]=Math.round(bauherr*parseInt(cost[i][k])/(1-bauherr));
        }
      }
    }
    var u=0;
    var ko=new Array;
    var bh=s[0].getElementsByTagName("th")[3].innerHTML;
    s[0].getElementsByTagName("th")[3].style.cursor="pointer";
    s[0].getElementsByTagName("th")[3].addEventListener("click",function () {
      var spar=new Array;
      if(u==0) {
        u=1;
        s[0].getElementsByTagName("th")[3].innerHTML="W&uuml;rde Ben&ouml;tigen "
        +"<span class=\"annotation\">(ohne "+Math.round(bauherr*100)+"\% Ersparnis durch Bauherren)</span>";
        for(i=0;i<s.length;i++) {
          if (s[i].getElementsByTagName("th")[0]) {
            ko[i]=baukosten[i].innerHTML;
            for (k=0;k<cost[i].length;k++) {
              baukosten[i].innerHTML=baukosten[i].innerHTML.replace(/\b\d+\.?\d*\.?\d*\b/, "Q"+newcost[i][k]+"Q");
            }
            baukosten[i].innerHTML=baukosten[i].innerHTML.replace(/Q/g, "");
          }
        }
        return false;
      }
      if(u==1) {
        u=2;
        s[0].getElementsByTagName("th")[3].innerHTML="Absolute Ersparnis "
        +"<span class=\"annotation\">(durch "+Math.round(bauherr*100)+"\% Ersparnis durch Bauherren)</span>";
        for(i=0;i<s.length;i++) {
          if (s[i].getElementsByTagName("th")[0]) {
            for (k=0;k<cost[i].length;k++) {
              baukosten[i].innerHTML=baukosten[i].innerHTML.replace(/\b\d+\.?\d*\.?\d*\b/, "Q"+savings[i][k]+"Q");
            }
            baukosten[i].innerHTML=baukosten[i].innerHTML.replace(/Q/g, "");
          }
        }
        return false;
      }
      if(u==2) {
        u=0;
        s[0].getElementsByTagName("th")[3].innerHTML=bh;
        for(i=0;i<s.length;i++) {
          if (s[i].getElementsByTagName("th")[0]) {
            baukosten[i].innerHTML=ko[i];
          }
        }
        return false;
      }
    },false);
  }
}
function b_herr2() {
  var tables=document.getElementsByTagName("table");
  var t;
  for(i=0;i<tables.length;i++) {
    if(tables[i].className=="table numbers") {
      t=tables[i];
      break;
    }
  }
  var tr=t.getElementsByTagName("tr");
  var th=tr[0].getElementsByTagName("th");
  var bh;
  for(i=0;i<th.length;i++) {
    if(th[i].textContent.match(/Baukosten/)) { bh=i; }
  }
  var bauherr=parseInt(tr[0].getElementsByTagName("th")[bh].textContent.match(/\d+/))/100;
  if (bauherr!=0) {
    var cost=new Array;
    var newcost=new Array;
    var savings=new Array;
    var total=new Array;
    var gold;
    var roi;
    var th1=tr[1].getElementsByTagName("th");
    for(i=0;i<th1.length;i++) {
      if(th1[i].textContent=="Gold") { gold=i; }
      if(th1[i].textContent=="ROI") { roi=i; }
    }
    for(i=0;i<tr.length-3;i++) {
      cost[i]=new Array;
      newcost[i]=new Array;
      savings[i]=new Array;
      total[i]=new Array;
      var td=tr[i+2].getElementsByTagName("td");
      for(k=0;k<td.length-gold;k++) {
        if(isNaN(parseFloat(td[k+gold].textContent))==false) {
          if(roi!=undefined&&roi==k+gold+1) {
            total[i][0]=/Kosten: (\d*\.?\d*\.?\d*\.?\d+)/.exec(td[k+gold].innerHTML)[1].replace(/\./g,"");
            total[i][1]=Math.round(parseInt(total[i][0].replace(/\./g,""))/(1-bauherr));
            total[i][2]=Math.round(bauherr*parseInt(total[i][0].replace(/\./g,""))/(1-bauherr));
            td[k+gold].innerHTML=td[k+gold].innerHTML.replace(/^(\d*)\.?(\d*)\.?(\d+)/,"$1$2$3");
            td[k+gold].innerHTML=td[k+gold].innerHTML.replace(/Kosten: (\d*)\.?(\d*)\.?(\d*)\.?(\d+)/,"Kosten: $1$2$3$4");
            td[k+gold+1].innerHTML=parseFloat(td[k+gold+1].innerHTML.replace(/\./,"\;").replace(/\,/,"\.").replace(/\;/,"")).toFixed(2).toString().replace(/\./,",");
          }
          if(roi!=undefined&&roi==k+gold) { cost[i][roi-gold]=parseFloat(td[k+gold].textContent.toString().replace(/\./,"\;").replace(/\,/,"\.").replace(/\;/,"")).toFixed(2); }
          else { cost[i][k]=parseFloat(td[k+gold].textContent); }
          if(roi!=undefined&&roi==k+gold) { newcost[i][roi-gold]=(Math.round(100*(cost[i][roi-gold]/(1-bauherr)))/100).toFixed(2); }
          else { newcost[i][k]=Math.round(cost[i][k]/(1-bauherr));}
          if(roi!=undefined&&roi==k+gold) { savings[i][roi-gold]=(Math.round(100*((bauherr*cost[i][roi-gold])/(1-bauherr)))/100).toFixed(2); }
          else { savings[i][k]=Math.round(bauherr*cost[i][k]/(1-bauherr)); }

        }
      }
    }
    var u=0;
    t.getElementsByTagName("th")[bh].style.cursor="pointer";
    t.getElementsByTagName("th")[bh].addEventListener("click",function () {
      if(u==0) {
        u=1;
        t.getElementsByTagName("th")[bh].innerHTML="Brutto-Baukosten "
        +"<span class=\"annotation\">(ohne "+Math.round(bauherr*100)+"\% Ersparnis durch Bauherren)</span>";
        for(i=0;i<tr.length-3;i++) {
          var td=tr[i+2].getElementsByTagName("td");
          for(k=0;k<td.length-gold;k++) {
            if(isNaN(parseFloat(td[k+gold].textContent))==false) {
              if(roi!=undefined&&roi==k+gold+1) {
                td[k+gold].innerHTML=td[k+gold].innerHTML.replace(/^\d*\.?\d*\.?\d+/,newcost[i][k]);
                td[k+gold].innerHTML=td[k+gold].innerHTML.replace(/Kosten: \d*\.?\d*\.?\d+/,"Kosten: "+total[i][1]); }
              else { td[k+gold].textContent=newcost[i][k].toString().replace(/\./,","); }
            }
          }
        }
        return false;
      }
      if(u==1) {
        u=2;
        t.getElementsByTagName("th")[bh].innerHTML="Absolute Ersparnis "
        +"<span class=\"annotation\">(durch "+Math.round(bauherr*100)+"\% Ersparnis durch Bauherren)</span>";
        for(i=0;i<tr.length-3;i++) {
          var td=tr[i+2].getElementsByTagName("td");
          for(k=0;k<td.length-gold;k++) {
            if(isNaN(parseFloat(td[k+gold].textContent))==false) {
              if(roi!=undefined&&roi==k+gold+1) {
                td[k+gold].innerHTML=td[k+gold].innerHTML.replace(/^\d*\.?\d*\.?\d+/,savings[i][k]);
                td[k+gold].innerHTML=td[k+gold].innerHTML.replace(/Kosten: \d*\.?\d*\.?\d+/,"Kosten: "+total[i][2]); }
              else { td[k+gold].textContent=savings[i][k].toString().replace(/\./,","); }
            }
          }
        }
        return false;
      }
      if(u==2) {
        u=0;
        t.getElementsByTagName("th")[bh].innerHTML="Baukosten "
        +"<span class=\"annotation\">(incl. "+Math.round(bauherr*100)+"\% Ersparnis durch Bauherren)</span>";
        for(i=0;i<tr.length-3;i++) {
          var td=tr[i+2].getElementsByTagName("td");
          for(k=0;k<td.length-gold;k++) {
            if(isNaN(parseFloat(td[k+gold].textContent))==false) {
              if(roi!=undefined&&roi==k+gold+1) {
                td[k+gold].innerHTML=td[k+gold].innerHTML.replace(/^\d*\.?\d*\.?\d+/,cost[i][k]);
                td[k+gold].innerHTML=td[k+gold].innerHTML.replace(/Kosten: \d*\.?\d*\.?\d+/,"Kosten: "+total[i][0]); }
              else { td[k+gold].textContent=cost[i][k].toString().replace(/\./,","); }
            }
          }
        }
        return false;
      }

    },false);
  }
}
function bauherr() {
  if (line) {
    if (line.innerHTML.match(/Geb\u00e4ude\u00fcbersicht/)) {
      b_herr();
    }
  }
  if (document.URL.match(/\?t=hilfe\&chapter=building/)) {
    b_herr2();
  }
}

/********************
** 19. Gildenstadt **
********************/
function gildenstadt() {
//Informationen sammeln
  var seite=line.parentNode.getElementsByTagName("div")[3];
  var verw=false;
  if (line.parentNode.getElementsByTagName("ul")[0].innerHTML.match(/tab=5/)) { verw=true; }
  var headline=line.getElementsByTagName("div")[0].innerHTML.match(/ \- (.*)/);
  var mlist=seite.getElementsByTagName("div");
//Gildenränge
  var t=new Array;
  t[1]=new Array;
  t[1][1]=new Array;
  t[1][2]=new Array;
  t[1][3]=new Array;
  t[2]=new Array;
  t[2][1]=new Array;
  t[2][2]=new Array;
  t[2][3]=new Array;
  t[3]=new Array;
  t[3][1]=new Array;
  t[3][2]=new Array;
  t[3][3]=new Array;
  t[4]=new Array;
  t[4][1]=new Array;
  t[4][2]=new Array;
  t[4][3]=new Array;
  t[5]=new Array;
  t[5][1]=new Array;
  t[5][2]=new Array;
  t[5][3]=new Array;
  t[6]=new Array;
  t[6][1]=new Array;
  t[6][2]=new Array;
  t[6][3]=new Array;
  t[7]=new Array;
  t[7][1]=new Array;
  t[7][2]=new Array;
  t[7][3]=new Array;
  for(i=0;i<mlist.length;i++) {
    if(mlist[i].className=="member_list") {
      if(t[1][0]==undefined) {
        t[1][0]=/\((.*),/.exec(mlist[i].innerHTML)[1];
      }
      else {
        if(/\((.*),/.exec(mlist[i].innerHTML)[1]!=t[1][0]) {
          if(t[2][0]==undefined) {
            t[2][0]=/\((.*),/.exec(mlist[i].innerHTML)[1];
          }
          else {
            if(/\((.*),/.exec(mlist[i].innerHTML)[1]!=t[2][0]) {
              if(t[3][0]==undefined) {
                t[3][0]=/\((.*),/.exec(mlist[i].innerHTML)[1];
              }
              else {
                if(/\((.*),/.exec(mlist[i].innerHTML)[1]!=t[3][0]) {
                  if(t[4][0]==undefined) {
                    t[4][0]=/\((.*),/.exec(mlist[i].innerHTML)[1];
                  }
                  else {
                    if(/\((.*),/.exec(mlist[i].innerHTML)[1]!=t[4][0]) {
                      if(t[5][0]==undefined) {
                        t[5][0]=/\((.*),/.exec(mlist[i].innerHTML)[1];
                      }
                      else {
                        if(/\((.*),/.exec(mlist[i].innerHTML)[1]!=t[5][0]) {
                          if(t[6][0]==undefined) {
                            t[6][0]=/\((.*),/.exec(mlist[i].innerHTML)[1];
                          }
                          else {
                            if(/\((.*),/.exec(mlist[i].innerHTML)[1]!=t[6][0]) {
                              if(t[7][0]==undefined) {
                                t[7][0]=/\((.*),/.exec(mlist[i].innerHTML)[1];
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
//Mitgliedernamen, -punkte, -online den Rängen zuordnen
      for(l=1;l<8;l++) {
        if(/\((.*),/.exec(mlist[i].innerHTML)[1]==t[l][0]) {
          for(k=0;k<mlist.length;k++) {
            if(t[l][1][k]==undefined) {
              t[l][1][k]=/\">(.*)<\/a>/.exec(mlist[i].innerHTML)[1];
              t[l][2][k]=/(\d*\.?\d+) Punkte\)/.exec(mlist[i].innerHTML)[1];
              t[l][3][k]=/onlinestatus (\w*)\"/.exec(mlist[i].innerHTML)[1];
              break;
            }
          }
        }
      }
    }
  }
//  alert(t[1]+"\n"+t[2]+"\n"+t[3]+"\n"+t[4]+"\n"+t[5]+"\n"+t[6]+"\n"+t[7]);
//weitere Infos
  var g_bew="";
  if(seite.innerHTML.match(/offene /)) {
    if(!seite.innerHTML.match(/momentan keine/)) {
      g_bew=seite.innerHTML.match(/<a href=\"user\/.*\">(.*)<\/a> \((\d+) Punkte\) am (\d+\.\d+\.\d+) /);
    }
  }
  var bmp=seite.innerHTML.match(/<b>Gesamt: (\d+)<\/b>\/<b>(\d+) Mitglieder, \n\s(\d*)\.?(\d+)<\/b>\/<b>(\d*)\.?(\d+) Baumeisterpunkte<\/b>/);
  var gkz=line.parentNode.getElementsByTagName("div")[3].getElementsByTagName("h3")[0].textContent.match(/\((.*)\)/)[1];
  var ges_p=line.parentNode.getElementsByTagName("div")[3].getElementsByTagName("h3")[0].textContent.match(/\d+/);
  var ga=false;
  var ga_stufe="";
  var vitr="";
  if (seite.innerHTML.match(/zur Gildenarena gehen/)) {
    ga=true;
    if(typeof(GM_getValue("ga_stufe_"+user+"_"+location.host))!="undefined") {
      ga_stufe=GM_getValue("ga_stufe_"+user+"_"+location.host);
      vitr=(parseFloat(ges_p)-(5*(parseFloat(bmp[2])-1))-((parseFloat(bmp[5])-5)/3)-(5*parseFloat(ga_stufe)))/20;
      ga_stufe=" Stufe "+ga_stufe;
    }
  }
  var rm=false;
  if (seite.innerHTML.match(/Rundmail schreiben/)) { rm=true; }
  var gm=seite.innerHTML.match(/<a href=\"(.*)\">Gildenangebote im Markt filtern<\/a>/)[1].replace(/type=\d/,"tab=1");
  var austr=seite.innerHTML.match(/<a href=\"(.*)\" onclick=\"(.*)\">aus der Gilde austreten<\/a>/);
  var gt="Drachenzucht";
  if(parseInt(bmp[5])==5) { gt=""; }
//Drachen
  var drachen=new Array;
  for (i=0;i<seite.getElementsByTagName("span").length;i++) {
    if (seite.getElementsByTagName("span")[i].innerHTML.match(/<a href=\"dragon\//)) {
      drachen[i]=seite.getElementsByTagName("span")[i].innerHTML.match(/<a href=\"dragon\/(.*)\" class=\"inline\">(.*)<\/a>/);
    }
  }
  var z=Math.floor(Math.random()*drachen.length);
  var gverw='';
  if (GM_getValue('verw_'+user+'_'+window.location.host,false)) { gverw='<li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=5">Verwalten<\/a><\/li>\n'; }
  var ga_='';
  if (GM_getValue('garena',true)) { ga_='<li><a class="" style="width:85px;" href="?t=guild_arena&city=1">Gildenarena<\/a><\/li>\n'; }
//Seite zusammenbauen
  var gildenstadt='<div id="drag_line">\n'
  +'  <div class="layer_box_title">Gilde - '+headline[1]+' - '+ges_p+' Punkte<\/div>\n'
  +'  <div onclick="goToVillage();" class="layer_close">X<\/div>\n'
  +'<\/div>\n'
//Tableiste

  +'<div style="position:relative; height:20px; overflow:hidden; z-index:1000;" onmouseover="maus=true; tiefer();" onmouseout="maus=false; hoeher();">\n'
  +'  <div id="tab_move" style="position:absolute; bottom:20px; left:0px; background-color:#dbd1c8; width:100%; height:49px; overflow:hidden; padding-top:3px;">\n'
  +'    <ul class="tabs">\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=0">Stadt-Ansicht</a><\/li>\n'
  +'      <li><a class="" href="?t=guild_hall&tab=0">normale Ansicht</a><\/li>\n'
  +'    <\/ul>\n'
  +'    <ul class="tabs small">\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=0">Gildenstadt</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=1">Gildenlager</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=2">Ausbauen</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=3">Gildenhalle</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=11">Gildenturm</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=12">Mitglieder</a><\/li>\n'
  +gverw+ga_
  +'    <\/ul>\n'
  +'  <\/div>\n'
  +'<\/div>\n'
//Land
  +'<div style="height:531px;margin-top:-20px;margin-bottom:-10px;">\n'
  +'<div id="mainVillage'+gt+'">\n'
  +'<div>\n'
//Markt
  +'<div class="building markt"><\/div>\n'
  +'<div class="markt   status " >\n'
  +'  <div id="tooltip0" class="tooltip">\n'
  +'    <h3>Gildenangebote im Markt<\/h3>\n'
  +'  <\/div>\n'
  +'<\/div>\n'
  +'<a onmouseover="showBuildingTooltip(elm(\'tooltip0\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip0\'));" href="'+gm+'" class="market"><\/a>\n'
  +'<a href="?t=village" class="img"><\/a>\n' //nutzloser Link für Schnee
//Austreten
  +'<div class="tower">\n'
  +'<div style="position:absolute;left:707px;top:115px;z-index:101;">\n'
  +'  <div id="tooltipX" class="tooltip">\n'
//  +'    <h3>aus der Gilde austreten<\/h3>\n'
  +'    <h3>zur&uuml;ck zur Hauptstadt<\/h3>\n'
  +'  <\/div>\n'
  +'<\/div>\n'
//  +'<a onmouseover="showBuildingTooltip(elm(\'tooltipX\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltipX\'));" href="'+austr[1]+'" onclick="'+austr[2]+'" class="capital"><\/a>\n'
  +'<a onmouseover="showBuildingTooltip(elm(\'tooltipX\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltipX\'));" href="?t=capital" class="capital"><\/a>\n'
  +'<\/div>\n'

//OnlineStatus
  +'<style type="text\/css">\n'
  +'.onlinestatus {\n'
  +'  background-image:url(img/online_sprite.gif);\n'
  +'  height:16px;\n'
  +'  margin-right:18px;\n'
  +'  padding-top:1px;\n'
  +'  font-weight:normal;\n'
  +'  width:20px;\n'
  +'  position:absolute;\n'
  +'}\n'
  +'.onlinestatus.day {\n'
  +'  background-position:0px -16px;\n'
  +'}\n'
  +'.onlinestatus.week {\n'
  +'  background-position:0px -32px;\n'
  +'}\n'
  +'.onlinestatus.month {\n'
  +'  background-position:0px -48px;\n'
  +'}\n'
  +'.onlinestatus.inactive {\n'
  +'  background-position:0px -65px;\n'
  +'}\n'
  +'div.user {\n'
  +'  margin-left:18px;\n'
  +'  margin-bottom:4px;\n'
  +'}\n'
  +'.leute {\n'
  +'  background-image:url(data:image\/jpg;base64,'
  +'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAAEH5aXCAAAACXBIWXMAAC4jAAAuIwF4pT92AAAE'
  +'\/UlEQVR4nO3dS2zbdBwH8L\/tOC+nduK807ybOu+kaZr0NbXr2MqWTtvYptHBViYhhpgYE4wLB+C0'
  +'A0O7II7AbWJimrQDEgckJE5wGtJ4CYF2GiCBQIxH1ak0P5wJpA0WjbTN3Mf3I7X\/OPrbv69lR\/2r'
  +'jv9mDNatgEumjlfqdTn+7EIWAJbJ5jo7IcO9vZda7YO9rs5WfEi2dX7qA8D\/tLUcoWLI191PWS0d'
  +'p2w2f0eRot286kXN+g9\/R2Gn\/fvVLvIfT+8a+qLrRQAAADohWYT9XS9Sy0SbtXJ+Pp5IftvVQslE'
  +'uKk3ym1vyTzHja1mjYGpybHLehv85w2B54MFjj+\/mkWY0+k8evvyMS12ZW40291xWNAiXtAbe1eL'
  +'AAAAAAAArC2CIOR2VLRfW68tZqFqdJ5lC3udVIz7yev1vj47O0v1ev1rozMty\/bB9E8Rt0K5XPZq'
  +'X0ojURR3t+ka1kxsTV8XNPdI9qW+vsR7mbR2Q19O3q1TUpYPXHxkiqKi\/dj9jdcZtVodfCsWjb7N'
  +'cdxd\/3Ugm0zFU8NJmmNr+6jc05nhzEKOsY\/1l4LRWVZsh5a4UFKka0bnAAAAAAAAAAAAAAAAgI3k'
  +'qUbtd70xW8wmzegsK1JOeBclqzibDzovqj3Sm0bnWS5rIaRSKuK7OVCpUGPXTOuK7fq72MnzvCPh'
  +'dVLI46Tp6Wnq19KtHTEZnWtZelWZoj51vlweoHAkutSuX0K2LPnslo\/uZ7aOvHRsz02P2\/XhTv2I'
  +'JOLJtl8GiCvWL2WOW7tfFgjop5XeeEqlEsUT7Xfk4sxemlP9a3dHfC6lFS5Tq9UXqtWhZrt+jw0m'
  +'KMMLa3dHdFLrVy6XuV6r179q1+lkvY+OmEWKCqaj7foYzmqxzNhstnH2r9uVb3diKkMVxpZcDunZ'
  +'+xht9U2l\/RRk7KrROVZM80g0wPPfGZ1jxTh9PDbSc2tmjban33ohpCP+14wOAQAAAAAAAAAAAAAA'
  +'AAAAAAAAAAAAAAAAAN0nimLearXkjM4B7NbtvZWTByabT+7Zssj+fmBVIeT5YF860gwq0mmD4206'
  +'pphHvjGe9NG+kQTFg+7WDPNWj1t95dSR\/VQqFX6MxWLHjQ65aeifDksi5Gm2pv7XQm5K+RWKhALv'
  +'j46O0tj4uH5ABqhWr7fuI5eMzrppPDDQvxR09lBAcVB\/2EejQ5XFiYkJ2rZtG2WyedK09JVlbPYw'
  +'z9hzHGPjqx54o7PbbDtPH9pOE2WNwgHPZ6GQ77dSuUzJvhT5\/P7W3xW1w00WG\/kAjYYU6hH4eX3Z'
  +'0oXYG9vByVoz6FVJEITJ\/lTi8kyjQYVCkeLxZGtuArnDzdmPp4YXz26t0POVCqk26WA3Mm9kkV6\/'
  +'l2S7rTVHj7dSKX2ez2dbj5K5nM0VyGazdvRk1ZxoPnMiFaFJQaB9ZjOlGXuhS7k3rJLqlBe8qvOa'
  +'aDK9mNZSZ7OZ9PVAwHu+WCx+2unG9IGC++VDW+jswyPU0Py0h7GfTRyHQUGnOI5jiqLMDdeH\/xis'
  +'VK\/5fL43isXSD263+mgn29mhus49UYzQbsVO+oo057DRtOR4t1u54R5OVzO\/7K1EqWARv0kyNq9I'
  +'9lfZepwQa6N4Jh9dHOvz07hDWogx9onReYAxc4Tn3zksy7Sd55tWwdT9B8rDvY30B8\/NDGlNyWp5'
  +'3Ogsm54+QHDpo7YGuzW7EgAAAAAAGOQvKjEOUjCoAcoAAAAASUVORK5CYII=);\n'
  +'  background-repeat:no-repeat;\n'
  +'}\n'
  +'<\/style>\n';

//Anwärter
  if(t[7][0]!=undefined) {
    gildenstadt+='<div class="building pos1 holzfaeller "><\/div>\n'
    +'<div class="pos1   status " style="z-index:50;">\n'
    +'  <div id="tooltip1" class="tooltip">\n'
    +'    <h3>Wohnraum f&uuml;r '+t[7][0]+'<\/h3>\n';
    for(i=0;i<t[7][1].length;i++) {
      gildenstadt+='    <div class="onlinestatus '+t[7][3][i]+'"></div><div class="user">'+t[7][1][i]+' ('+t[7][2][i]+' Punkte)<\/div>\n';
    }
    gildenstadt+='  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip1\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip1\'));" class="building pos1"  href="?t=guild_hall&city=1&tab=12"><\/a>\n';
  }

//Gildenhalle
  gildenstadt+='<div class="building pos2 wirtshaus "><\/div>\n'
  +'<div class="pos2   status " style="z-index:50;">\n'
  +'  <div id="tooltip2" class="tooltip">\n'
  +'    <h3>Gildenhalle Stufe '+(parseInt(bmp[2])-1)+'<\/h3>\n'
  +'    <div>und Chat<\/div>\n'
  +'    <div><\/div>\n'
  +'    <div>'+bmp[1]+'\/'+bmp[2]+' Mitglieder<\/div>\n'
  +'  <\/div>\n'
  +'<\/div>\n'
  +'<a onmouseover="showBuildingTooltip(elm(\'tooltip2\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip2\'));" class="building pos2"  href="?t=guild_hall&city=1&tab=3"><\/a>\n'

//Ausbauen
  +'<div class="building pos3 bauherr "><\/div>\n'
  +'<div class="pos3   status " style="z-index:50;">\n'
  +'  <div id="tooltip3" class="tooltip">\n'
  +'    <h3>Ausbauen<\/h3>\n'
  +'    <div><\/div>\n'
  +'  <\/div>\n'
  +'<\/div>\n'
  +'<a onmouseover="showBuildingTooltip(elm(\'tooltip3\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip3\'));" class="building pos3"  href="?t=guild_hall&city=1&tab=2"><\/a>\n';

//Gildenrat
  if(t[3][0]!=undefined) {
    gildenstadt+='<div class="building pos4 weberei "><\/div>\n'
    +'<div class="pos4   status " style="z-index:50;">\n'
    +'  <div id="tooltip4" class="tooltip">\n'
    +'    <h3>Wohnraum f&uuml;r '+t[3][0]+'<\/h3>\n';
    for(i=0;i<t[3][1].length;i++) {
      gildenstadt+='    <div class="onlinestatus '+t[3][3][i]+'"></div><div class="user">'+t[3][1][i]+' ('+t[3][2][i]+' Punkte)<\/div>\n';
    }
    gildenstadt+='  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip4\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip4\'));" class="building pos4"  href="?t=guild_hall&city=1&tab=12"><\/a>\n';
  }

//Geselle
  if(t[5][0]!=undefined) {
    gildenstadt+='<div class="building pos7 schreinerei "><\/div>\n'
    +'<div class="pos7   status " style="z-index:50;">\n'
    +'  <div id="tooltip7" class="tooltip">\n'
    +'    <h3>Wohnraum f&uuml;r '+t[5][0]+'<\/h3>\n';
    for(i=0;i<t[5][1].length;i++) {
      gildenstadt+='    <div class="onlinestatus '+t[5][3][i]+'"></div><div class="user">'+t[5][1][i]+' ('+t[5][2][i]+' Punkte)<\/div>\n';
    }
    gildenstadt+='  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip7\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip7\'));" class="building pos7"  href="?t=guild_hall&city=1&tab=12"><\/a>\n';
  }

//Rundmail
  if(rm==true) {
    gildenstadt+='<div class="building pos8 kerzengiesserei "><\/div>\n'
    +'<div class="pos8   status " style="z-index:50;">\n'
    +'  <div id="tooltip8" class="tooltip">\n'
    +'    <h3>Rundmail schreiben<\/h3>\n'
    +'    <div><\/div>\n'
    +'  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip8\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip8\'));" class="building pos8"  href="?t=messages&amp;action=guild_message&amp;type=2"><\/a>\n';
  }

//Gildenleiter
  gildenstadt+='<div class="building pos9 akademie "><\/div>\n'
  +'<div class="pos9   status " style="z-index:50;">\n'
  +'  <div id="tooltip9" class="tooltip">\n'
  +'    <h3>Wohnraum f&uuml;r '+t[1][0]+'<\/h3>\n'
  +'    <div class="onlinestatus '+t[1][3][0]+'"><\/div><div class="user">'+t[1][1][0]+' ('+t[1][2][0]+' Punkte)<\/div>\n'
  +'  <\/div>\n'
  +'<\/div>\n'
  +'<a onmouseover="showBuildingTooltip(elm(\'tooltip9\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip9\'));" class="building pos9"  href="?t=guild_hall&city=1&tab=12"><\/a>\n';

//Meister
  if(t[4][0]!=undefined) {
    gildenstadt+='<div class="building pos11 seilerei "><\/div>\n'
    +'<div class="pos11   status " style="z-index:50;">\n'
    +'  <div id="tooltip11" class="tooltip">\n'
    +'    <h3>Wohnraum f&uuml;r '+t[4][0]+'<\/h3>\n';
    for(i=0;i<t[4][1].length;i++) {
      gildenstadt+='    <div class="onlinestatus '+t[4][3][i]+'"></div><div class="user">'+t[4][1][i]+' ('+t[4][2][i]+' Punkte)<\/div>\n';
    }
    gildenstadt+='  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip11\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip11\'));" class="building pos11"  href="?t=guild_hall&city=1&tab=12"><\/a>\n';
  }

//Vitrine
  if(vitr!="") {
    gildenstadt+='<div class="building pos12 bauplatz ">'
    +'<div class="building tower" style="background-color:transparent; '
    +'background-position:-775px -634px; background-repeat:none; position:relative; top: 35px; left: 40px; '
    +'width:28px; height:50px;"></div>\n'
    +'<\/div>\n'
    +'<div class="pos12   status  leute" style="background-position:-10px 4px; z-index:50;">\n'
    +'  <div id="tooltip12" class="tooltip">\n'
    +'    <h3>Vitrine Stufe '+vitr+'<\/h3>\n'
    +'    <div><\/div>\n'
    +'  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip12\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip12\'));" class="building pos12"  href="?t=profil_guild&str_tag='+gkz+'&tab=2"><\/a>\n';
  }

//Verwalten
  if(verw==true) {
    gildenstadt+='<div class="building pos13 kaufmann "><\/div>\n'
    +'<div class="pos13   status " style="z-index:50;">\n'
    +'  <div id="tooltip13" class="tooltip">\n'
    +'    <h3>Verwaltung<\/h3>\n'
    +'    <div><\/div>\n'
    +'  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip13\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip13\'));" class="building pos13"  href="?t=guild_hall&city=1&tab=5"><\/a>\n';
  }

//Gildenvize
  if(t[2][0]!=undefined) {
    gildenstadt+='<div class="building pos14 alchemiehuette "><\/div>\n'
    +'<div class="pos14   status " style="z-index:50;">\n'
    +'  <div id="tooltip14" class="tooltip">\n'
    +'    <h3>Wohnraum f&uuml;r '+t[2][0]+'<\/h3>\n';
    for(i=0;i<t[2][1].length;i++) {
      gildenstadt+='    <div class="onlinestatus '+t[2][3][i]+'"></div><div class="user">'+t[2][1][i]+' ('+t[2][2][i]+' Punkte)<\/div>\n';
    }
    gildenstadt+='  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip14\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip14\'));" class="building pos14"  href="?t=guild_hall&city=1&tab=12"><\/a>\n';
  }

//Lehrling
  if(t[6][0]!=undefined) {
    gildenstadt+='<div class="building pos16 saegewerk "><\/div>\n'
    +'<div class="pos16   status " style="z-index:50;">\n'
    +'  <div id="tooltip16" class="tooltip">\n'
    +'    <h3>Wohnraum f&uuml;r '+t[6][0]+'<\/h3>\n';
    for(i=0;i<t[6][1].length;i++) {
      gildenstadt+='    <div class="onlinestatus '+t[6][3][i]+'" style="width:20px;height:16px;"></div><div class="user">'+t[6][1][i]+' ('+t[6][2][i]+' Punkte)<\/div>\n';
    }
    gildenstadt+='  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip16\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip16\'));" class="building pos16"  href="?t=guild_hall&city=1&tab=12"><\/a>\n';
  }

//Gildenlager
  gildenstadt+='<div class="building pos17 lager "><\/div>\n'
  +'<div class="pos17   status " style="z-index:50;">\n'
  +'  <div id="tooltip17" class="tooltip">\n'
  +'    <h3>Gildenlager<\/h3>\n'
  +'    <div><\/div>\n'
  +'  <\/div>\n'
  +'<\/div>\n'
  +'<a onmouseover="showBuildingTooltip(elm(\'tooltip17\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip17\'));" class="building pos17"  href="?t=guild_hall&city=1&tab=1"><\/a>\n';

//Bewerbungen
  if(g_bew!="") {
    gildenstadt+='<div class="building pos20 bauplatz "><\/div>\n'
    +'<div class="pos20   status  leute" style="z-index:50;">\n'
    +'  <div id="tooltip20" class="tooltip">\n'
    +'    <h3>offene Bewerbungen:<\/h3>\n'
    +'    <div>'+g_bew[1]+' ('+g_bew[2]+'&nbsp;Punkte) am&nbsp;'+g_bew[3]+'<\/div>\n'
    +'  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip20\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip20\'));" class="building pos20"  href="?t=guild_hall&city=1&tab=13"><\/a>\n';
  }

//Gildenturm
  if(gt!="") {
    gildenstadt+='<div class="building pos21 drachenzucht "><\/div>\n'
    +'<div class="pos21   status " style="z-index:50;">\n'
    +'  <div id="tooltip21" class="tooltip">\n'
    +'    <h3>Gildenturm Stufe '+((parseInt(bmp[5])-5)/3)+'<\/h3>\n'
    +'    <div>und News<\/div>\n'
    +'    <div><\/div>\n'
    +'    <div>'+bmp[3]+'.'+bmp[4]+'\/'+bmp[5]+'.'+bmp[6]+' Baumeisterpunkte<\/div>\n'
    +'  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip21\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip21\'));" class="building pos21"  href="?t=guild_hall&city=1&tab=11"><\/a>\n';
  }
  else {
    gildenstadt+='<div class="building pos21 bauplatz_drachenzucht "><\/div>\n'
    +'<div class="pos21 pause_drachenzucht  status " style="z-index:50;">\n'
    +'  <div id="tooltip21" class="tooltip">\n'
    +'    <h3>Bauplatz f&uuml;r Gildenturm<\/h3>\n'
    +'    <div>und News<\/div>\n'
    +'    <div><\/div>\n'
    +'    <div>'+bmp[3]+'.'+bmp[4]+'\/5.000 Baumeisterpunkte<\/div>\n'
    +'  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip21\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip21\'));" class="building pos21"  href="?t=guild_hall&city=1&tab=11"><\/a>\n';
  }

//Gildenarena
  if(ga==true) {
    gildenstadt+='<div class="building pos22 arena "><\/div>\n'
    +'<div class="pos22   status " style="z-index:50;">\n'
    +'  <div id="tooltip22" class="tooltip">\n'
    +'    <h3>Gildenarena'+ga_stufe+'<\/h3>\n'
    +'  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltip22\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltip22\'));" class="building pos22"  href="?t=guild_arena&city=1"><\/a>\n';
  }

//Zufallsdrache aus der Gilde
  if(drachen!=""&&gt!="") {
    gildenstadt+='<img src="img/dragon_move.gif" style="position:absolute;left:540px;top:30px;" alt="" \/>\n'
    +'<div style="position:absolute;left:610px;top:60px;">\n'
    +'  <div id="tooltipD" class="tooltip">\n'
    +'    <div>'+drachen[z][2]+'<\/div>\n'
    +'  <\/div>\n'
    +'<\/div>\n'
    +'<a onmouseover="showBuildingTooltip(elm(\'tooltipD\'));"  onmouseout="hideBuildingTooltip(elm(\'tooltipD\'));" class="building" style="left:572px; top:25px; width:35px; height:40px;" href="dragon\/'+drachen[z][1]+'"><\/a>\n';
  }

  gildenstadt+='<\/div>\n'
  +'<\/div>\n'
  +'<\/div>\n';


//alles einfügen
  line.parentNode.innerHTML=gildenstadt;
}



function gildenlager() {
//Überschrift
  line.getElementsByTagName("div")[0].textContent=line.getElementsByTagName("div")[0].textContent.replace(/halle Stufe \d+/, "lager");
  line.getElementsByTagName("div")[1].setAttribute("onclick","window.location.href='?t=guild_hall&city=1&tab=0';");
//Links umwandeln
  var alle_links=line.parentNode.getElementsByTagName("div")[3].getElementsByTagName("a");
  for (i=0;i<alle_links.length;i++) {
    if(alle_links[i].href!=undefined) alle_links[i].href=alle_links[i].href.replace(/(t=guild_hall)/g,"$1&city=1");
    if(alle_links[i].getAttribute('onclick')!=undefined) {
      alle_links[i].setAttribute("onclick",alle_links[i].getAttribute('onclick').replace(/(t=guild_hall)/g,'$1&city=1')); }
  }
//Tableiste
  line.parentNode.getElementsByTagName("ul")[0].style.display="none";
  var tableiste=line.parentNode.getElementsByTagName("ul")[0].innerHTML.replace(/(href=\".*)\"/g,"$1\&city=1\"");
  var gverw='';
  if (GM_getValue('verw_'+user+'_'+window.location.host,false)) { gverw='<li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=5">Verwalten<\/a><\/li>\n'; }
  var ga='';
  if (GM_getValue('garena',true)) { ga='<li><a class="" style="width:85px;" href="?t=guild_arena&city=1">Gildenarena<\/a><\/li>\n'; }
  var t1=document.createElement("div");
  t1.style.position="relative";
  t1.style.height="20px";
  t1.style.overflow="hidden";
//  t1.style.zIndex="1000";
  t1.setAttribute("onmouseover","maus=true; tiefer();");
  t1.setAttribute("onmouseout","maus=false; hoeher();");
  t1.innerHTML='\n'
  +'  <div id="tab_move" style="position:absolute;bottom:20px;left:0px;background-color:#dbd1c8;width:100%;height:49px;overflow:hidden;padding-top:3px;">\n'
  +'    <ul class="tabs">\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=1">Stadt-Ansicht</a><\/li>\n'
  +'      <li><a class="" href="?t=guild_hall&tab=1">normale Ansicht</a><\/li>\n'
  +'    <\/ul>\n'
  +'    <ul class="tabs small">\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=0">Gildenstadt</a><\/li>\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=1">Gildenlager</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=2">Ausbauen</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=3">Gildenhalle</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=11">Gildenturm</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=12">Mitglieder</a><\/li>\n'
  +gverw+ga
  +'    <\/ul>\n'
  +'  <\/div>\n';
  var tabs=line.parentNode.getElementsByTagName('ul')[0];
  line.parentNode.insertBefore(t1,tabs);
//Bild
  var bild=document.createElement("img");
  bild.src="img/d_lager.jpg";
  bild.width="300";
  bild.height="300";
  bild.style.clear="both";
  bild.style.cssFloat="left";
  bild.style.marginBottom="10px";
  bild.style.marginLeft="-10px";
  var hierhin=line.parentNode.getElementsByTagName("div")[5];
  hierhin.insertBefore(bild,hierhin.getElementsByTagName("h3")[0]);
  var f=document.createElement("div");
  hierhin.insertBefore(f,hierhin.getElementsByTagName("h3")[0]);
  line.style.marginBottom="0px";
  hierhin.style.marginTop="-20px";
  hierhin.getElementsByTagName("h3")[0].style.clear="left";
//Text neben Bild
  f.innerHTML='<h1>Gildenlager<\/h1>\n'
  +'<br>\n'
  +'<br>\n'
  +'Gildenlager: [<a class="link" href="?t=guild_hall&city=1&tab=0">verlassen<\/a>]\n'
  +'<br>\n'
  +'<br>\n'
  +'Im Gildenlager werden die Waren gelagert, die zum Ausbau der Gilde verwendet werden. Jedes \n'
  +'Mitglied kann seine Spende ins Gildenlager entrichten. Es kann dabei von jedem Rohstoff immer nur \n'
  +'bis maximal doppelt soviel eingelagert werden, wie zum n&auml;chsten Ausbau ben&ouml;tigt wird.<br>\n'
  +'Jede Spende kann innerhalb von 24h zur&uuml;ckgezogen werden.\n';
}

function gilde_ausbauen() {
//CSS
  var cssinhalt=document.styleSheets[0];
  if (cssinhalt.cssRules) var laenge=cssinhalt.cssRules.length;
  else var laenge=cssinhalt.rules.length;
  cssinhalt.insertRule("table.table span.red a {\n"
    +"color:#bb0000;\n"
    +"}",laenge);
//Punkte
  var uebschr=line.parentNode.getElementsByTagName("div")[3].getElementsByTagName("h3");
  var stufe=new Array;
  for (i=0;i<uebschr.length;i++) {
    stufe[i]=parseInt(/ Stufe (\d+)/.exec(uebschr[i].textContent)[1]);
  }
  if (stufe[2]==undefined) stufe[2]=0;
  else GM_setValue("ga_stufe_"+user+"_"+location.host,stufe[2]);
  if (stufe[3]==undefined) stufe[3]=0;
  var punkte=(stufe[0]*5)+stufe[1]+(stufe[2]*5)+(stufe[3]*20);
//Überschrift
  line.getElementsByTagName("div")[0].textContent=line.getElementsByTagName("div")[0].textContent.replace(/halle Stufe \d+/, "ausbau")+" - "+punkte+" Punkte";
  line.getElementsByTagName("div")[1].setAttribute("onclick","document.location.href='?t=guild_hall&city=1&tab=0';");
//Links umwandeln
  var alle_links=line.parentNode.getElementsByTagName("div")[3].getElementsByTagName("a");
  for (i=0;i<alle_links.length;i++) {
    if(alle_links[i].href!=undefined) alle_links[i].href=alle_links[i].href.replace(/(t=guild_hall)/g,"$1&city=1");
  }
//Tableiste
  line.parentNode.getElementsByTagName("ul")[0].style.display="none";
  var tableiste=line.parentNode.getElementsByTagName("ul")[0].innerHTML.replace(/(href=\".*)\"/g,"$1\&city=1\"");
  var gverw='';
  if (GM_getValue('verw_'+user+'_'+window.location.host,false)) { gverw='<li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=5">Verwalten<\/a><\/li>\n'; }
  var ga='';
  if (GM_getValue('garena',true)) { ga='<li><a class="" style="width:85px;" href="?t=guild_arena&city=1">Gildenarena<\/a><\/li>\n'; }
  var t1=document.createElement("div");
  t1.style.position="relative";
  t1.style.height="20px";
  t1.style.overflow="hidden";
  t1.style.zIndex="1000";
  t1.setAttribute("onmouseover","maus=true; tiefer();");
  t1.setAttribute("onmouseout","maus=false; hoeher();");
  t1.innerHTML='\n'
  +'  <div id="tab_move" style="position:absolute;bottom:20px;left:0px;background-color:#dbd1c8;width:100%;height:49px;overflow:hidden;padding-top:3px;">\n'
  +'    <ul class="tabs">\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=2">Stadt-Ansicht</a><\/li>\n'
  +'      <li><a class="" href="?t=guild_hall&tab=2">normale Ansicht</a><\/li>\n'
  +'    <\/ul>\n'
  +'    <ul class="tabs small">\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=0">Gildenstadt</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=1">Gildenlager</a><\/li>\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=2">Ausbauen</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=3">Gildenhalle</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=11">Gildenturm</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=12">Mitglieder</a><\/li>\n'
  +gverw+ga
  +'    <\/ul>\n'
  +'  <\/div>\n';
  var tabs=line.parentNode.getElementsByTagName('ul')[0];
  line.parentNode.insertBefore(t1,tabs);
//Bild
  var bild=document.createElement("img");
  bild.src="img/d_bauherr.jpg";
  bild.width="300";
  bild.height="300";
  bild.style.clear="both";
  bild.style.cssFloat="left";
  bild.style.marginBottom="10px";
  var f=document.createElement("div");
  hierhin=line.parentNode.getElementsByTagName("div")[5];
  hierhin.insertBefore(bild,hierhin.getElementsByTagName("div")[0]);
  hierhin.getElementsByTagName("div")[0].style.clear="left";
  hierhin.getElementsByTagName("div")[0].style.width="100%";
  hierhin.insertBefore(f,hierhin.getElementsByTagName("div")[0]);
  line.style.marginBottom="0px";
  hierhin.style.marginTop="-20px";
//Text neben Bild
  f.innerHTML='<h1>Gildenausbau<\/h1>\n'
  +'<br>\n'
  +'<br>\n'
  +'Gildenausbau: [<a class="link" href="?t=guild_hall&city=1&tab=0">verlassen<\/a>]\n'
  +'<br>\n'
  +'<br>\n'
  +'Im Gildenausbau k&ouml;nnen alle Gildengeb&auml;ude ausgebaut werden, sofern man die dazu \n'
  +'n&ouml;tigen Rechte in der Gilde besitzt. Ansonsten kann hier auch jeder sehen wie viel der \n'
  +'n&auml;chste Ausbau kostet, um sich so mit den n&auml;chsten Spenden darauf einzustellen.\n';
//Ausbautabelle
  line.parentNode.getElementsByTagName("div")[5].style.padding="0px 0px 10px";
  var daten=line.parentNode.getElementsByTagName("div")[5].getElementsByTagName("div")[1].innerHTML;
  var ausbau;
  try {
    ausbau=daten.match(/<a href=\".*\">.* ausbauen auf Stufe \d+<\/a>/g);
    for(i=0;i<ausbau.length;i++) {
      ausbau[i]=ausbau[i].replace(/a href/g, "a class=\"nav\" href").replace(/(ausbauen) (auf Stufe \d+)/g, "<span>$2 $1<\/span>");
    }
  }
  catch(err) {
    ausbau=new Array;
    for(i=0;i<uebschr.length;i++) {
      ausbau[i]='<span class="annotation">keine Ausbaurechte<\/span>';
    }
  }
  var kosten=daten.match(/Ausbaukosten:.*\n.*\n/g);
  var nk;
  for(i=0;i<kosten.length;i++) {
    kosten[i]=kosten[i].match(/(<a href\D+>\D+<\/a>|Pokale)\D*: \d+\D* \D+>\(\d+ im/g);
    for(k=0;k<kosten[i].length;k++) {
      nk=new Array;
      nkx=/((<a href\D+>\D+<\/a>)|(Pokale))\D*: (\d+)\D* \D+>\((\d+) im/.exec(kosten[i][k])
      nk[0]=nkx[1];
      nk[1]=nkx[4];
      nk[2]=nkx[5];
      nk[3]=parseInt(nkx[4])-parseInt(nkx[5]);
      kosten[i][k]=nk;
    }
  }
  var minturm=/mind\. Stufe (\d+) sein/.exec(daten)[1];
  var z=0;

  tabelle='<table class="table" style="border-spacing:0px; width:100%;">\n'

  +'<tr>\n'
  +'    <th colspan="2">Geb&auml;ude ausbauen<\/th>\n'
  +'    <th>Gildenhalle Stufe '+stufe[0]+'<\/th>\n'
  +'    <th>Ben&ouml;tigt<\/th>\n'
  +'    <th>Punkte<\/th>\n'
  +'  <\/tr>\n'

  +'  <tr>\n'
  +'    <td valign="top">\n'
  +'      <div class="buildingList" style="margin: -5px; overflow: hidden; width: 70px; height: 80px;">\n'
  +'        <div class="wirtshaus buildingOverview" style="margin-top: -22px; margin-left: -30px; '
  +'width: 100px; height: 100px;"><div class="tor" building"></div><\/div>\n'
  +'      <\/div>\n'
  +'    <\/td>\n'
  +'    <td style="color: black;">'+ausbau[0]+'<\/td>\n'
  +'    <td>Die Gildenhalle ist der zentrale Anlaufspunkt f&uuml;r alle Gildenmitglieder, ihre Gr&ouml;&szlig;e '
  +'bestimmt die Anzahl der Gildenmitglieder.<\/td>\n'
  +'    <td>';
  for(i=0;i<kosten[0].length;i++) {
    if(kosten[0][i][3]>0) {
      tabelle+='<span class="red">'+kosten[0][i][0]+' '+kosten[0][i][1]+'<\/span>; ';
    } else {
      tabelle+=kosten[0][i][0]+' '+kosten[0][i][1]+'; ';
    }
  }
  tabelle+='<\/td>\n'
  +'    <td>+5 Punkte<\/td>\n'
  +'  <\/tr>\n';

  z=0;
  for(i=0;i<kosten[0].length;i++) {
    if(kosten[0][i][3]>0) { z++; }
  }
  if(z!=0) {
    tabelle+='  <tr>\n'
    +'  <td colspan="6">Zum Ausbau auf Stufe '+(parseInt(stufe[0])+1)+' fehlen: ';
    for(i=0;i<kosten[0].length;i++) {
      if(kosten[0][i][3]>0) {
        tabelle+=kosten[0][i][3]+' '+kosten[0][i][0]+'; ';
      }
    }
    tabelle+='<\/td>\n'
    +'<\/tr>\n';
  }

  tabelle+='  <tr>\n'
  +'    <td colspan="6"> <br> <\/td>\n'
  +'  <\/tr>\n'

  +'  <tr>\n'
  +'    <th colspan="2">Geb&auml;ude ausbauen<\/th>\n'
  +'    <th>Gildenturm Stufe '+stufe[1]+'<\/th>\n'
  +'    <th>Ben&ouml;tigt<\/th>\n'
  +'    <th>Punkte<\/th>\n'
  +'  <\/tr>\n'

  +'  <tr>\n'
  +'    <td valign="top">\n'
  +'      <div class="buildingList" style="margin: -5px; overflow: hidden; width: 70px; height: 100px;">\n'
  +'        <div class="drachenzucht buildingOverview" style="margin-top: -2px; margin-left: -30px;'
  +'width: 100px; height: 100px;"><\/div>\n'
  +'      <\/div>\n'
  +'    <\/td>\n'
  +'    <td style="color: black;">'+ausbau[1]+'<\/td>\n'
  +'    <td>Der Gildenturm ist wichtig f&uuml;r das Ansehen einer Gilde. Ein hoher Turm verk&uuml;ndet '
  +'Reichtum und wirtschaftliches Geschick der Mitglieder. Um neue Mitglieder aufzunehmen, sollte der '
  +'Turm mind. Stufe '+minturm+' sein.<\/td>\n'
  +'    <td>';
  for(i=0;i<kosten[1].length;i++) {
    if(kosten[1][i][3]>0) {
      tabelle+='<span class="red">'+kosten[1][i][0]+' '+kosten[1][i][1]+'<\/span>; ';
    } else {
      tabelle+=kosten[1][i][0]+' '+kosten[1][i][1]+'; ';
    }
  }
  tabelle+='<\/td>\n'
  +'    <td>+1 Punkt<\/td>\n'
  +'  <\/tr>\n';

  z=0;
  for(i=0;i<kosten[1].length;i++) {
    if(kosten[1][i][3]>0) { z++; }
  }
  if(z!=0) {
    tabelle+='  <tr>\n'
    +'  <td colspan="6">Zum Ausbau auf Stufe '+(parseInt(stufe[1])+1)+' fehlen: ';
    for(i=0;i<kosten[1].length;i++) {
      if(kosten[1][i][3]>0) {
        tabelle+=kosten[1][i][3]+' '+kosten[1][i][0]+'; ';
      }
    }
    tabelle+='<\/td>\n'
    +'<\/tr>\n';
  }

if(uebschr.length>2) {
  tabelle+='  <tr>\n'
  +'    <td colspan="6"> <br> <\/td>\n'
  +'  <\/tr>\n'
  +'  <tr>\n'
  +'    <th colspan="2">Geb&auml;ude ausbauen<\/th>\n'
  +'    <th>Gildenarena Stufe '+stufe[2]+'<\/th>\n'
  +'    <th>Ben&ouml;tigt<\/th>\n'
  +'    <th>Punkte<\/th>\n'
  +'  <\/tr>\n'
  +'  <tr>\n'
  +'    <td valign="top">\n'
  +'      <div class="buildingList" style="margin: -5px; overflow: hidden; width: 70px; height: 90px;">\n'
  +'        <div class="arena buildingOverview" style="margin-top: -30px; margin-left: -30px;'
  +'width: 100px; height: 120px;"></div>\n'
  +'      <\/div>\n'
  +'    <\/td>\n'
  +'    <td style="color: black;">'+ausbau[2]+'<\/td>\n'
  +'    <td>In der Gildenarena finden die Mannschaftswettk&auml;mpfe statt. Eine hohe Stufe erh&ouml;ht '
  +'die Anzahl der Mannschaften, die f&uuml;r die Gilde in der Drachenliga antreten k&ouml;nnen. F&uuml;r '
  +'die Teilnahme an der Drachenliga reicht Stufe 1.<\/td>\n'
  +'    <td>';
  for(i=0;i<kosten[2].length;i++) {
    if(kosten[2][i][3]>0) {
      tabelle+='<span class="red">'+kosten[2][i][0]+' '+kosten[2][i][1]+'<\/span>; ';
    } else {
      tabelle+=kosten[2][i][0]+' '+kosten[2][i][1]+'; ';
    }
  }
  tabelle+='    <\/td>'
  +'    <td>+5 Punkte<\/td>\n'
  +'  <\/tr>\n';

  z=0;
  for(i=0;i<kosten[2].length;i++) {
    if(kosten[2][i][3]>0) { z++; }
  }
  if(z!=0) {
    tabelle+='  <tr>\n'
    +'  <td colspan="6">Zum Ausbau auf Stufe '+(parseInt(stufe[2])+1)+' fehlen: ';
    for(i=0;i<kosten[2].length;i++) {
      if(kosten[2][i][3]>0) {
        tabelle+=kosten[2][i][3]+' '+kosten[2][i][0]+'; ';
      }
    }
    tabelle+='<\/td>\n'
    +'<\/tr>\n';
  }

  tabelle+='  <tr>\n'
  +'    <td colspan="6"> <br> <\/td>\n'
  +'  <\/tr>\n'

  +'  <tr>\n'
  +'    <th colspan="2">Geb&auml;ude ausbauen<\/th>\n'
  +'    <th>Vitrine Stufe '+stufe[3]+'<\/th>\n'
  +'    <th>Ben&ouml;tigt<\/th>\n'
  +'    <th>Punkte<\/th>\n'
  +'  <\/tr>\n'
  +'  <tr>\n'
  +'    <td valign="top">\n'
  +'      <div class="buildingList" style="margin: -5px; overflow: hidden; width: 70px; height: 65px;">\n'
  +'        <div class="bauplatz buildingOverview" style="margin-top: -40px; margin-left: -30px;'
  +'width: 100px; height: 100px;">\n'
  +'          <div style="background-color:transparent; background-image:url(img/gebauede_sprite100x100.png); '
  +'background-position:-775px -634px; background-repeat:none; position:relative; top: 35px; left: 45px; '
  +'width:28px; height:50px;"></div>\n'
  +'        <\/div>\n'
  +'      <\/div>\n'
  +'    <\/td>\n'
  +'    <td style="color: black;">'+ausbau[3]+'<\/td>\n'
  +'    <td>In der Vitrine stehen die Pokale der Gilde, je mehr, desto gr&ouml;&szlig;er wird das '
  +'Ansehen der Gilde.<\/td>\n'
  +'    <td>';
  for(i=0;i<kosten[3].length;i++) {
    if(kosten[3][i][3]>0) {
      tabelle+='<span class="red">'+kosten[3][i][0]+' '+kosten[3][i][1]+'<\/span>; ';
    } else {
      tabelle+=kosten[3][i][0]+' '+kosten[3][i][1]+'; ';
    }
  }
  tabelle+='    <\/td>'
  +'    <td>+20 Punkte<\/td>\n'
  +'  <\/tr>\n';

  z=0;
  for(i=0;i<kosten[3].length;i++) {
    if(kosten[3][i][3]>0) { z++; }
  }
  if(z!=0) {
    tabelle+='  <tr>\n'
    +'  <td colspan="6">Zum Ausbau auf Stufe '+(parseInt(stufe[3])+1)+' fehlen: ';
    for(i=0;i<kosten[3].length;i++) {
      if(kosten[3][i][3]>0) {
        tabelle+=kosten[3][i][3]+' '+kosten[3][i][0]+'; ';
      }
    }
    tabelle+='<\/td>\n'
    +'<\/tr>\n';
  }
}
  tabelle+='<\/table>';

  tabelle=tabelle.replace(/a href/g,"a class=\"inline\" href");

//alert(tabelle);

  line.parentNode.getElementsByTagName("div")[5].getElementsByTagName("div")[1].innerHTML=tabelle;

}

function visit_gchat() {
//Überschrift
  line.getElementsByTagName("div")[1].setAttribute("onclick","document.location.href='?t=guild_hall&city=1&tab=0';");
//Tableiste
  line.parentNode.getElementsByTagName("ul")[0].style.display="none";
  var gverw='';
  if (GM_getValue('verw_'+user+'_'+window.location.host,false)) { gverw='<li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=5">Verwalten<\/a><\/li>\n'; }
  var ga='';
  if (GM_getValue('garena',true)) { ga='<li><a class="" style="width:85px;" href="?t=guild_arena&city=1">Gildenarena<\/a><\/li>\n'; }
  var t1=document.createElement("div");
  t1.style.position="relative";
  t1.style.height="20px";
  t1.style.overflow="hidden";
  t1.style.zIndex="1000";
  t1.setAttribute("onmouseover","maus=true; tiefer();");
  t1.setAttribute("onmouseout","maus=false; hoeher();");
  t1.innerHTML='\n'
  +'  <div id="tab_move" style="position:absolute;bottom:20px;left:0px;background-color:#dbd1c8;width:100%;height:49px;overflow:hidden;padding-top:3px;">\n'
  +'    <ul class="tabs">\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=3">Stadt-Ansicht</a><\/li>\n'
  +'      <li><a class="" href="?t=guild_hall&tab=3">normale Ansicht</a><\/li>\n'
  +'    <\/ul>\n'
  +'    <ul class="tabs small">\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=0">Gildenstadt</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=1">Gildenlager</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=2">Ausbauen</a><\/li>\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=3">Gildenhalle</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=11">Gildenturm</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=12">Mitglieder</a><\/li>\n'
  +gverw+ga
  +'    <\/ul>\n'
  +'  <\/div>\n';
  var tabs=line.parentNode.getElementsByTagName('ul')[0];
  line.parentNode.insertBefore(t1,tabs);
//Bild
  var bild=document.createElement("img");
  bild.src="img/d_wirtshaus.jpg";
  bild.width="300";
  bild.height="300";
  bild.style.clear="both";
  bild.style.cssFloat="left";
  bild.style.marginBottom="10px";
  bild.style.marginLeft="-10px";
  var f=document.createElement("div");
  hierhin=line.parentNode.getElementsByTagName("div")[5];
  hierhin.insertBefore(bild,hierhin.getElementsByTagName("div")[0]);
  hierhin.getElementsByTagName("div")[0].style.clear="left";
  hierhin.getElementsByTagName("div")[0].style.width="100%";
  hierhin.insertBefore(f,hierhin.getElementsByTagName("div")[0]);
  line.style.marginBottom="0px";
  hierhin.style.marginTop="-20px";
//Text neben Bild
  f.innerHTML='<h1>Gildenhalle<\/h1>\n'
  +'<br>\n'
  +'<br>\n'
  +'Gildenhalle: [<a class="link" href="?t=guild_hall&city=1&tab=0">verlassen<\/a>]\n'
  +'<br>\n'
  +'<br>\n'
  +'Die Gildenhalle ist der zentrale Anlaufspunkt f&uuml;r alle Gildenmitglieder, ihre '
  +'Gr&ouml;&szlig;e bestimmt die Anzahl der Gildenmitglieder.<br>\n'
  +'Hier trifft man sich zum gem&uuml;tlichen Plausch, zur handfesten Diskussion, oder zur Besprechung '
  +'des Dragball-Trainingsplans.\n';
}

function gilde_verwalten() {
//Überschrift
  var tabnr=/tab=(\d)/.exec(document.URL)[1];
  line.getElementsByTagName("div")[0].textContent=line.getElementsByTagName("div")[0].textContent.replace(/Gildenhalle Stufe \d+/, "Verwaltung");
  line.getElementsByTagName("div")[1].setAttribute("onclick","document.location.href='?t=guild_hall&city=1&tab=0';");
//Links umwandeln
  alle_links=line.parentNode.getElementsByTagName("a");
  for(i=0;i<alle_links.length;i++) {
    if(alle_links[i].href!=undefined) alle_links[i].href=alle_links[i].href.replace(/(t=guild_hall)/g,"$1&city=1");
  }
  if(line.parentNode.getElementsByTagName("div")[3].getElementsByTagName("form")[0]) {
    line.parentNode.getElementsByTagName("div")[3].getElementsByTagName("form")[0].action="?t=guild_hall&city=1&tab="+tabnr;
  }
//Tableiste
  line.parentNode.getElementsByTagName("ul")[0].style.display="none";
  line.parentNode.getElementsByTagName("ul")[1].style.width="100%";
  var gverw='';
  if (GM_getValue('verw_'+user+'_'+window.location.host,false)) { gverw='<li><a class="active" href="?t=guild_hall&city=1&tab=5">Verwalten<\/a><\/li>\n'; }
  var ga='';
  if (GM_getValue('garena',true)) { ga='<li><a class="" style="width:85px;" href="?t=guild_arena&city=1">Gildenarena<\/a><\/li>\n'; }
  var t1=document.createElement("div");
  t1.style.position="relative";
  t1.style.height="20px";
  t1.style.overflow="hidden";
  t1.style.zIndex="1000";
  t1.setAttribute("onmouseover","maus=true; tiefer();");
  t1.setAttribute("onmouseout","maus=false; hoeher();");
  t1.innerHTML='\n'
  +'  <div id="tab_move" style="position:absolute;bottom:20px;left:0px;background-color:#dbd1c8;width:100%;height:49px;overflow:hidden;padding-top:3px;">\n'
  +'    <ul class="tabs">\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab='+tabnr+'">Stadt-Ansicht</a><\/li>\n'
  +'      <li><a class="" href="?t=guild_hall&tab='+tabnr+'">normale Ansicht</a><\/li>\n'
  +'    <\/ul>\n'
  +'    <ul class="tabs small">\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=0">Gildenstadt</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=1">Gildenlager</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=2">Ausbauen</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=3">Gildenhalle</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=11">Gildenturm</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=12">Mitglieder</a><\/li>\n'
  +gverw+ga
  +'    <\/ul>\n'
  +'  <\/div>\n';
  var tabs=line.parentNode.getElementsByTagName('ul')[0];
  line.parentNode.insertBefore(t1,tabs);
//Bild
  var bild=document.createElement("img");
  bild.src="img/d_kaufmann.jpg";
  bild.width="300";
  bild.height="300";
  bild.style.clear="both";
  bild.style.cssFloat="left";
  bild.style.marginBottom="10px";
  bild.style.marginLeft="-10px";
  var f=document.createElement("div");
  hierhin=line.parentNode.getElementsByTagName("div")[5];
  hierhin.insertBefore(bild,hierhin.getElementsByTagName("ul")[0]);
  hierhin.getElementsByTagName("ul")[0].style.clear="left";
  hierhin.insertBefore(f,hierhin.getElementsByTagName("ul")[0]);
  line.style.marginBottom="0px";
  hierhin.style.marginTop="-20px";
//Text neben Bild
  f.innerHTML='<h1>Verwaltung<\/h1>\n'
  +'<br>\n'
  +'<br>\n'
  +'Verwaltung: [<a class="link" href="?t=guild_hall&city=1&tab=0">verlassen<\/a>]\n'
  +'<br>\n'
  +'<br>\n'
  +'In der Verwaltung wird die Organisation der Gilde geregelt. Hier kann das Schwarze Brett f&uuml;r '
  +'den Gildenturm neu beschriftet werden, das &ouml;ffentliche Gildenprofil in der Hauptstadt bearbeitet '
  +'werden, oder auch die Rechte der Gildenmitglieder ge&auml;ndert werden. Alles aber nur sofern man '
  +'selbst die entsprechenden Rechte besitzt.\n';
}

function gilden_news() {
  var hierhin=line.parentNode.getElementsByTagName("div")[3];
  var stufe=(parseInt(/(\d+)\.000 Bau/.exec(hierhin.innerHTML)[1])-5)/3;
//News
  var news=hierhin.innerHTML; //.replace(/\n/g,"");
  news=news.replace(/<style>[.\n]*$/,"");
  hierhin.innerHTML=news;
//Überschrift
  line.getElementsByTagName("div")[0].textContent=line.getElementsByTagName("div")[0].textContent.replace(/halle Stufe \d+/, "turm Stufe "+stufe);
  line.getElementsByTagName("div")[1].setAttribute("onclick","document.location.href='?t=guild_hall&city=1&tab=0';");
//Tableiste
  line.parentNode.getElementsByTagName("ul")[0].style.display="none";
  var gverw='';
  if (GM_getValue('verw_'+user+'_'+window.location.host,false)) { gverw='<li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=5">Verwalten<\/a><\/li>\n'; }
  var ga='';
  if (GM_getValue('garena',true)) { ga='<li><a class="" style="width:85px;" href="?t=guild_arena&city=1">Gildenarena<\/a><\/li>\n'; }
  var t1=document.createElement("div");
  t1.style.position="relative";
  t1.style.height="20px";
  t1.style.overflow="hidden";
  t1.style.zIndex="1000";
  t1.setAttribute("onmouseover","maus=true; tiefer();");
  t1.setAttribute("onmouseout","maus=false; hoeher();");
  t1.innerHTML='\n'
  +'  <div id="tab_move" style="position:absolute;bottom:20px;left:0px;background-color:#dbd1c8;width:100%;height:49px;overflow:hidden;padding-top:3px;">\n'
  +'    <ul class="tabs">\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=11">Stadt-Ansicht</a><\/li>\n'
  +'      <li><a class="" href="?t=guild_hall&tab=11">normale Ansicht</a><\/li>\n'
  +'    <\/ul>\n'
  +'    <ul class="tabs small">\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=0">Gildenstadt</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=1">Gildenlager</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=2">Ausbauen</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=3">Gildenhalle</a><\/li>\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=11">Gildenturm</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=12">Mitglieder</a><\/li>\n'
  +gverw+ga
  +'    <\/ul>\n'
  +'  <\/div>\n';
  var tabs=line.parentNode.getElementsByTagName('ul')[0];
  line.parentNode.insertBefore(t1,tabs);
//Bild
  var bild=document.createElement("img");
  if(stufe>0) bild.src="img/d_drachenzucht.jpg";
  else bild.src="img/us.gif";
  bild.width="300";
  bild.height="300";
  bild.style.clear="both";
  bild.style.cssFloat="left";
  bild.style.marginBottom="10px";
  bild.style.marginLeft="-10px";
  var f=document.createElement("div");
  hierhin=line.parentNode.getElementsByTagName("div")[5];
  hierhin.insertBefore(bild,hierhin.getElementsByTagName("h3")[0]);
  hierhin.getElementsByTagName("h3")[0].style.clear="left";
  hierhin.insertBefore(f,hierhin.getElementsByTagName("h3")[0]);
  line.style.marginBottom="0px";
  hierhin.style.marginTop="-20px";
//Text neben Bild
  var bauplatz="";
  if(stufe==0) bauplatz="Bauplatz ";
  f.innerHTML='<h1>'+bauplatz+'Gildenturm Stufe '+stufe+'<\/h1>\n'
  +'<br>\n'
  +'<br>\n'
  +bauplatz+'Gildenturm: [<a class="link" href="?t=guild_hall&city=1&tab=0">verlassen<\/a>]\n'
  +'<br>\n'
  +'<br>\n'
  +'Der Gildenturm ist wichtig f&uuml;r das Ansehen einer Gilde. Ein hoher Turm verk&uuml;ndet Reichtum '
  +'und wirtschaftliches Geschick der Mitglieder.<br>\n'
  +'Im Gildenturm werden Neuigkeiten, und wichtige (oder auch weniger wichtige) Nachrichten f&uuml;r die '
  +'Gilde ausgeh&auml;ngt.\n';
}

function gilden_mitglieder() {
//Mitglieder
  var hierhin=line.parentNode.getElementsByTagName("div")[3];
  var bmp=hierhin.innerHTML.match(/<b>Gesamt:.*Mitglieder\, \n\s*.*Baumeisterpunkte.*>/);
  var mtgl=hierhin.innerHTML.replace(/\n|\t/g,"").match(/<div class=\"member.*<\/div>/);
  var mtgl=mtgl[0].replace(/(span>|\))\s*(<\/div>)\s*(<div)/g,"$1$2<|>$3").split("<|>");
  var m;
  var dr=false;
  for(i=0;i<mtgl.length;i++) {
    m=new Array;
    m[0]=/<div class=\"online[^><]*><\/div>/.exec(mtgl[i]);
    m[1]=/div>\s*(<a href=\"user.*<\/a>)\s*\(/.exec(mtgl[i])[1];
    m[2]=/\((.*)\,/.exec(mtgl[i])[1];
    m[3]=/(\d*\.?\d+)\s*Punkte\)/.exec(mtgl[i])[1];
    if(mtgl[i].match(/<a href=\"dragon/)) {
      m[4]=mtgl[i].match(/<a href=\"dragon.*<\/a>/)
      m[4]=m[4][0].replace(/ <\/span><span class=\"annotation\">\s*(mit:\s*|und\s*)/g,"<|>").split("<|>");
      dr=true;
    }
    else { m[4]=["-"]; }
    mtgl[i]=m;
  }
  var unsmtgl=hierhin.getElementsByTagName("h3")[1].textContent;
  tabelle='<style>\n'
  +'.onlinestatus {\n'
  +'  background-image:url(img/online_sprite.gif);\n'
  +'  height:16px;\n'
  +'  padding-top:1px;\n'
  +'  font-weight:normal;\n'
  +'  width:10px;\n'
  +'}\n'
  +'.onlinestatus.day {\n'
  +'  background-position:0px -16px;\n'
  +'}\n'
  +'.onlinestatus.week {\n'
  +'  background-position:0px -32px;\n'
  +'}\n'
  +'.onlinestatus.month {\n'
  +'  background-position:0px -48px;\n'
  +'}\n'
  +'.onlinestatus.inactive {\n'
  +'  background-position:0px -65px;\n'
  +'}\n'
  +'<\/style>'
  +'<h3>'+unsmtgl+'<\/h3>\n'
  +'<table class="table">\n'
  +'  <tr>\n'
  +'    <th colspan="2">Name<\/th>\n'
  +'    <th>Rang<\/th>\n'
  +'    <th>Punkte<\/th>\n';
  if(dr==true) {
    tabelle+='    <th>Drachen<\/th>\n';
  }
  tabelle+='  <\/tr>\n';
  for(i=0;i<mtgl.length;i++) {
    tabelle+='  <tr>\n';
    for(k=0;k<3;k++) {
      tabelle+='    <td>'+mtgl[i][k]+'<\/td>\n';
    }
    tabelle+='    <td style="text-align:right;">'+mtgl[i][3]+'<\/td>\n';
    if(dr==true) {
      tabelle+='    <td>'+mtgl[i][4][0];
      if(mtgl[i][4].length>1) {
        for(l=1;l<mtgl[i][4].length;l++) {
          tabelle+=', '+mtgl[i][4][l];
        }
      }
      tabelle+='<\/td>\n';
    }
  tabelle+='  <\/tr>';
  }
  tabelle+='<tr><td colspan="';
  if(dr==true) tabelle+='5">'+bmp[0]; else tabelle+='4">'+bmp[0].replace(/(<\/b>) (<span)/,'$1<br>$2');
  tabelle+='<\/td><\/tr><\/table>';
  hierhin.innerHTML=tabelle;
//Überschrift
  line.getElementsByTagName("div")[0].textContent=line.getElementsByTagName("div")[0].textContent.replace(/halle Stufe \d+/, "mitglieder");
  line.getElementsByTagName("div")[1].setAttribute("onclick","document.location.href='?t=guild_hall&city=1&tab=0';");
//Tableiste
  line.parentNode.getElementsByTagName("ul")[0].style.display="none";
  var gverw='';
  if (GM_getValue('verw_'+user+'_'+window.location.host,false)) { gverw='<li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=5">Verwalten<\/a><\/li>\n'; }
  var ga='';
  if (GM_getValue('garena',true)) { ga='<li><a class="" style="width:85px;" href="?t=guild_arena&city=1">Gildenarena<\/a><\/li>\n'; }
  var t1=document.createElement("div");
  t1.style.position="relative";
  t1.style.height="20px";
  t1.style.overflow="hidden";
  t1.style.zIndex="1000";
  t1.setAttribute("onmouseover","maus=true; tiefer();");
  t1.setAttribute("onmouseout","maus=false; hoeher();");
  t1.innerHTML='\n'
  +'  <div id="tab_move" style="position:absolute;bottom:20px;left:0px;background-color:#dbd1c8;width:100%;height:49px;overflow:hidden;padding-top:3px;">\n'
  +'    <ul class="tabs">\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=12">Stadt-Ansicht</a><\/li>\n'
  +'      <li><a class="" href="?t=guild_hall&tab=12">normale Ansicht</a><\/li>\n'
  +'    <\/ul>\n'
  +'    <ul class="tabs small">\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=0">Gildenstadt</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=1">Gildenlager</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=2">Ausbauen</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=3">Gildenhalle</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=11">Gildenturm</a><\/li>\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=12">Mitglieder</a><\/li>\n'
  +gverw+ga
  +'    <\/ul>\n'
  +'  <\/div>\n';
  var tabs=line.parentNode.getElementsByTagName('ul')[0];
  line.parentNode.insertBefore(t1,tabs);
//Bild
  var bild=document.createElement("img");
  bild.src="img/d_akademie.jpg";
  bild.width="300";
  bild.height="300";
  bild.style.clear="both";
  bild.style.cssFloat="left";
  bild.style.marginBottom="10px";
  bild.style.marginLeft="-10px";
  var f=document.createElement("div");
  hierhin=line.parentNode.getElementsByTagName("div")[5];
  hierhin.insertBefore(bild,hierhin.getElementsByTagName("style")[0]);
  hierhin.getElementsByTagName("h3")[0].style.clear="left";
  hierhin.insertBefore(f,hierhin.getElementsByTagName("style")[0]);
  line.style.marginBottom="0px";
  hierhin.style.marginTop="-20px";
//Text neben Bild
  f.innerHTML='<h1>Gildenmitglieder<\/h1>\n'
  +'<br>\n'
  +'<br>\n'
  +'Gildenmitglieder: [<a class="link" href="?t=guild_hall&city=1&tab=0">verlassen<\/a>]\n'
  +'<br>\n'
  +'<br>\n'
  +'In diesem Bereich wohnen alle Gildenmitglieder. Hier kann man sie alle besuchen, sehen, '
  +'wann jemand zuletzt online war, und Punkte und Rang einsehen.<br>\n'
  +'Und nat&uuml;rlich sieht man auch alle erwachsenen Drachen der Gilde, die zum Dragball antreten '
  +'k&ouml;nnen.\n';
}

function gilden_bewerber() {
  var hierhin=line.parentNode.getElementsByTagName("div")[3];
//News
  var bew=hierhin.innerHTML.replace(/\n/g,"");
  bew=bew.replace(/<h3>.*Baumeisterpunkte(<\/b>|\)<\/span>)\s*<p><\/p>/,"");
  bew=bew.replace(/<h3>Aktionen.*austreten<\/a>/,"");
  hierhin.innerHTML=bew;
//Überschrift
  line.getElementsByTagName("div")[0].textContent=line.getElementsByTagName("div")[0].textContent.replace(/halle Stufe \d+/, "bewerber");
  line.getElementsByTagName("div")[1].setAttribute("onclick","document.location.href='?t=guild_hall&city=1&tab=0';");
//Tableiste
  line.parentNode.getElementsByTagName("ul")[0].style.display="none";
  var gverw='';
  if (GM_getValue('verw_'+user+'_'+window.location.host,false)) { gverw='<li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=5">Verwalten<\/a><\/li>\n'; }
  var ga='';
  if (GM_getValue('garena')) { ga='<li><a class="" style="width:85px;" href="?t=guild_arena&city=1">Gildenarena<\/a><\/li>\n'; }
  var t1=document.createElement("div");
  t1.style.position="relative";
  t1.style.height="20px";
  t1.style.overflow="hidden";
  t1.style.zIndex="1000";
  t1.setAttribute("onmouseover","maus=true; tiefer();");
  t1.setAttribute("onmouseout","maus=false; hoeher();");
  t1.innerHTML='\n'
  +'  <div id="tab_move" style="position:absolute;bottom:20px;left:0px;background-color:#dbd1c8;width:100%;height:49px;overflow:hidden;padding-top:3px;">\n'
  +'    <ul class="tabs">\n'
  +'      <li><a class="active" href="?t=guild_hall&city=1&tab=13">Stadt-Ansicht</a><\/li>\n'
  +'      <li><a class="" href="?t=guild_hall&tab=13">normale Ansicht</a><\/li>\n'
  +'    <\/ul>\n'
  +'    <ul class="tabs small">\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=0">Gildenstadt</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=1">Gildenlager</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=2">Ausbauen</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=3">Gildenhalle</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=11">Gildenturm</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=12">Mitglieder</a><\/li>\n'
  +gverw+ga
  +'    <\/ul>\n'
  +'  <\/div>\n';
  var tabs=line.parentNode.getElementsByTagName('ul')[0];
  line.parentNode.insertBefore(t1,tabs);
//Bild
  var bild=document.createElement("img");
  bild.src="img/d_village.jpg";
  bild.width="300";
  bild.height="202";
  bild.style.clear="both";
  bild.style.cssFloat="left";
  bild.style.marginBottom="10px";
  bild.style.marginLeft="-10px";
  var f=document.createElement("div");
  hierhin=line.parentNode.getElementsByTagName("div")[5];
  hierhin.insertBefore(bild,hierhin.getElementsByTagName("h3")[0]);
  hierhin.getElementsByTagName("h3")[0].style.clear="left";
  hierhin.insertBefore(f,hierhin.getElementsByTagName("h3")[0]);
  line.style.marginBottom="0px";
  hierhin.style.marginTop="-20px";
//Text neben Bild
  f.innerHTML='<h1>Bewerber<\/h1>\n'
  +'<br>\n'
  +'<br>\n'
  +'Bewerber: [<a class="link" href="?t=guild_hall&city=1&tab=0">verlassen<\/a>]\n'
  +'<br>\n'
  +'<br>\n'
  +'Hier sieht man alle Leute, die gerne in die Gilde aufgenommen werden wollen. Und kann sie aus '
  +'gleich aufnehmen, sofern genug Platz in der Gilde ist. Oder die Bewerbung ablehnen.\n';
}

function visit_garena() {
  var stufe="?";
  var pos=document.getElementById("positionen");
  if(pos) {
    if(pos.getElementsByTagName("select")[0]) {
      stufe=pos.getElementsByTagName("select")[0].getElementsByTagName("option").length;
    } else {
     stufe="1";
    }
    GM_setValue("ga_stufe_"+user+"_"+location.host,stufe);
  } else if(document.getElementsByName("time")[0]) {
    if(document.getElementsByName("ownteam")[0]) {
      stufe=document.getElementsByName("ownteam")[0].getElementsByTagName("option").length;
    } else {
     stufe="1";
    }
    GM_setValue("ga_stufe_"+user+"_"+location.host,stufe);
  } else {
    if(typeof(GM_getValue("ga_stufe_"+user+"_"+location.host))!="undefined") {
      stufe=GM_getValue("ga_stufe_"+user+"_"+location.host);
    }
  }
//Tableiste
  if (GM_getValue("garena",true)) line.parentNode.getElementsByTagName("ul")[0].style.display="none";
  line.parentNode.innerHTML=line.parentNode.innerHTML.replace(/(t=guild_arena)/g,"$1&city=1").replace(/index\.php/g,"?t=guild_arena&city=1&tab=4");
  var gverw='';
  if (GM_getValue('verw_'+user+'_'+window.location.host,false)) { gverw='<li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=5">Verwalten<\/a><\/li>\n'; }
  var ga='<li><a class="active" href="?t=guild_arena&city=1">Gildenarena<\/a><\/li>\n';
//Überschrift
  line=document.getElementById("drag_line");
  line.getElementsByTagName("div")[0].textContent=line.getElementsByTagName("div")[0].textContent.replace(/arena/, "arena Stufe "+stufe);
  line.getElementsByTagName("div")[1].setAttribute("onclick","document.location.href='?t=guild_hall&city=1&tab=0';");
//Tableiste
  var ga_tab='';
  if (document.URL.match(/&tab=\d/)) ga_tab=document.URL.match(/&tab=\d/);
  var ga_team='';
  if (document.URL.match(/&team=\d/)) ga_team=document.URL.match(/&team=\d/);
  var t1=document.createElement("div");
  t1.style.position="relative";
  t1.style.height="20px";
  t1.style.overflow="hidden";
  t1.style.zIndex="1000";
  t1.setAttribute("onmouseover","maus=true; tiefer();");
  t1.setAttribute("onmouseout","maus=false; hoeher();");
  t1.innerHTML='\n'
  +'  <div id="tab_move" style="position:absolute;bottom:20px;left:0px;background-color:#dbd1c8;width:100%;height:49px;overflow:hidden;padding-top:3px;">\n'
  +'    <ul class="tabs">\n'
  +'      <li><a class="active" href="?t=guild_arena&city=1'+ga_tab+ga_team+'">Stadt-Ansicht</a><\/li>\n'
  +'      <li><a class="" href="?t=guild_arena'+ga_tab+ga_team+'">normale Ansicht</a><\/li>\n'
  +'    <\/ul>\n'
  +'    <ul class="tabs small">\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=0">Gildenstadt</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=1">Gildenlager</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=2">Ausbauen</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=3">Gildenhalle</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=11">Gildenturm</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=12">Mitglieder</a><\/li>\n'
  +gverw+ga
  +'    <\/ul>\n'
  +'  <\/div>\n';
  var tabs=line.parentNode.getElementsByTagName('ul');
  var tab;
  for(i=tabs.length-1;i>=0;i--) {
    if(tabs[i].className.match(/tabs/)) {
      tab=tabs[i];
      break;
    }
  }
  tab.style.clear="left";
  line.parentNode.insertBefore(t1,tab);
  var f=document.createElement("div");
  f.style.marginTop="-20px";
  line.parentNode.insertBefore(f,tab);
  line.style.marginBottom="0px";
//Text neben Bild
  f.innerHTML='<img src="img/d_arena.jpg" alt="" height="300" width="300" style="float: left; margin-bottom: 10px;" >\n'
  +'<h1>Gildenarena Stufe '+stufe+'<\/h1>\n'
  +'<br>\n'
  +'<br>\n'
  +'Gildenarena: [<a class="link" href="?t=guild_hall&city=1&tab=0">verlassen<\/a>]\n'
  +'<br>\n'
  +'<br>\n'
  +'In der Gildenarena finden die Mannschaftswettk&auml;mpfe statt. Eine hohe Stufe erh&ouml;ht die '
  +'Anzahl der Mannschaften, die f&uuml;r die Gilde in der Drachenliga antreten k&ouml;nnen. F&uuml;r '
  +'die Teilnahme an der Drachenliga reicht Stufe 1.\n';
}

function wiese() {
//Tableiste
  var tab;
  if(line.parentNode.getElementsByTagName("ul")[0]) {
    tab=line.parentNode.getElementsByTagName("ul")[0];
    line.parentNode.getElementsByTagName("ul")[0].style.display="none";
  }
  else tab=line.parentNode.getElementsByTagName("div")[3];
  var gverw='';
  if (GM_getValue('verw_'+user+'_'+window.location.host,false)) { gverw='<li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=5">Verwalten<\/a><\/li>\n'; }
  var ga='';
  if (GM_getValue('garena',true)) { ga='<li><a class="active" href="?t=guild_arena&city=1">Gildenarena<\/a><\/li>\n'; }
//Überschrift
  line=document.getElementById("drag_line");
  line.getElementsByTagName("div")[1].setAttribute("onclick","document.location.href='?t=guild_hall&city=1&tab=0';");
//Tableiste
  var t1=document.createElement("div");
  t1.style.position="relative";
  t1.style.height="20px";
  t1.style.overflow="hidden";
  t1.style.zIndex="1000";
  t1.setAttribute("onmouseover","maus=true; tiefer();");
  t1.setAttribute("onmouseout","maus=false; hoeher();");
  t1.innerHTML='\n'
  +'  <div id="tab_move" style="position:absolute;bottom:20px;left:0px;background-color:#dbd1c8;width:100%;height:49px;overflow:hidden;padding-top:3px;">\n'
  +'    <ul class="tabs">\n'
  +'      <li><a class="active" href="?t=guild_arena&city=1">Stadt-Ansicht</a><\/li>\n'
  +'      <li><a class="" href="?t=guild_arena">normale Ansicht</a><\/li>\n'
  +'    <\/ul>\n'
  +'    <ul class="tabs small">\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=0">Gildenstadt</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=1">Gildenlager</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=2">Ausbauen</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=3">Gildenhalle</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=11">Gildenturm</a><\/li>\n'
  +'      <li><a class="" style="width:85px;" href="?t=guild_hall&city=1&tab=12">Mitglieder</a><\/li>\n'
  +gverw+ga
  +'    <\/ul>\n'
  +'  <\/div>\n';
  line.parentNode.insertBefore(t1,tab);
  var f=document.createElement("div");
  f.style.marginTop="-20px";
  line.parentNode.insertBefore(f,tab);
  line.style.marginBottom="0px";
//Text neben Bild
  f.innerHTML='<div style="float: left; margin-bottom: 10px; background-image:url(img/bg_village03.jpg); background-repeat:none; background-position:-242px -260px; height:200px; width:300px;"></div>\n'
  +'<h1>Wundersch&ouml;ne gr&uuml;ne Wiese<\/h1>\n'
  +'<br>\n'
  +'<br>\n'
  +'Wundersch&ouml;ne gr&uuml;ne Wiese: [<a class="link" href="?t=guild_hall&city=1&tab=0">verlassen<\/a>]\n'
  +'<br>\n'
  +'<br>\n';
}


function gilden_tabs() {
  var tabscript=document.createElement("script");
  tabscript.type="text\/javascript";
  var tabscriptText=document.createTextNode('var maus;\n'
  +'function tiefer() {\n'
  +'  if(maus==true) {\n'
  +'    var move=document.getElementById("tab_move").parentNode;\n'
  +'    if (parseInt(move.style.height)<72) { move.style.height=(parseInt(move.style.height)+2)+"px"; }\n'
  +'    if (parseInt(move.style.height)<72) { setTimeout("tiefer()",40); }\n'
  +'  }\n'
  +'}\n'
  +'function hoeher() {\n'
  +'  if(maus==false) {\n'
  +'    var move=document.getElementById("tab_move").parentNode;\n'
  +'    if (parseInt(move.style.height)>20) { move.style.height=(parseInt(move.style.height)-2)+"px"; }\n'
  +'    if (parseInt(move.style.height)>20) { setTimeout("hoeher()",40); }\n'
  +'  }\n'
  +'}\n');
  var kopf=document.getElementsByTagName("head")[0];
  tabscript.appendChild(tabscriptText);
  kopf.appendChild(tabscript);
}

function gilden_tabs2() {
  var tab;
  if(line.parentNode.getElementsByTagName('ul')[0]) {
    tab=line.parentNode.getElementsByTagName('ul')[0];
    if(document.URL.match(/tab=1\d{1}/)) {
      tab.getElementsByTagName("a")[0].className="active";
      if(tab.getElementsByTagName("a")[4]) tab.getElementsByTagName("a")[4].className="";
    }
  }
  else tab=line.parentNode.getElementsByTagName('div')[3];
  var active='';
  if(document.URL.match(/&tab=\d+/)) active=document.URL.match(/&tab=\d+/);
  var ga_team='';
  if (document.URL.match(/&team=\d/)) ga_team=document.URL.match(/&team=\d/);
  var hall=document.URL.match(/t=guild\w*/);
  var ul=document.createElement('ul');
  ul.className='tabs';
  ul.innerHTML='\n'
+'<li><a class="" href="?'+hall+'&city=1'+active+ga_team+'">Stadt-Ansicht</a></li>\n'
+'<li><a class="active" href="?'+hall+active+ga_team+'">normale Ansicht</a></li>\n';
  line.parentNode.insertBefore(ul,tab);
}

function gilden_reiterH() {
  var g_hall=rand.getElementsByTagName("div")[1].getElementsByTagName("a")[1];
  var klon=g_hall.cloneNode(true);
  klon.textContent="Gildenstadt besuchen";
  klon.href+="&city=1";
  br=document.createElement("br");
  g_hall.parentNode.insertBefore(klon,g_hall);
  g_hall.parentNode.insertBefore(br,g_hall);
}
function gilden_hauptstadt() {
  var hauptst=line.parentNode.getElementsByTagName("div")[3].getElementsByTagName("a")[0];
  if(hauptst.textContent.match(/betreten/)) {
    var klon=hauptst.cloneNode(true);
    klon.textContent=klon.textContent.replace(/Gildenhalle(.*)betreten/,"Gildenstadt$1besuchen");
    klon.href+="&city=1";
    var br=document.createElement("br");
    hauptst.parentNode.insertBefore(klon,hauptst);
    hauptst.parentNode.insertBefore(br,hauptst);
  }
}



function g_stadt() {
  if (document.URL.match(/t=guild_hall/)&&line&&line.parentNode.getElementsByTagName("ul")[0]) {
    if ((document.URL.match(/tab=0/)||!document.URL.match(/tab=/))&&document.URL.match(/city=1($|\&)/)) {
      gildenstadt();
      gilden_tabs();
    }
    if (document.URL.match(/tab=1($|\&)/)&&document.URL.match(/city=1($|\&)/)) {
      gildenlager();
      gilden_tabs();
    }
    if (document.URL.match(/tab=2($|\&)/)&&document.URL.match(/city=1($|\&)/)) {
      gilde_ausbauen();
      gilden_tabs();
    }
    if (document.URL.match(/tab=3($|\&)/)&&document.URL.match(/city=1($|\&)/)) {
      visit_gchat();
      gilden_tabs();
    }
    if (document.URL.match(/tab=(5|7|8)($|\&)/)&&document.URL.match(/city=1($|\&)/)) {
      gilde_verwalten();
      gilden_tabs();
    }
    if (document.URL.match(/tab=11($|\&)/)&&document.URL.match(/city=1($|\&)/)) {
      gilden_news();
      gilden_tabs();
    }
    if (document.URL.match(/tab=12($|\&)/)&&document.URL.match(/city=1($|\&)/)) {
      gilden_mitglieder();
      gilden_tabs();
    }
    if (document.URL.match(/tab=13($|\&)/)&&document.URL.match(/city=1($|\&)/)) {
      gilden_bewerber();
      gilden_tabs();
    }
    if (!document.URL.match(/city=1($|\&)/)) {
      gilden_tabs2();
    }
  }
  if (document.URL.match(/t=guild_arena/)) {
    if (document.URL.match(/city=1($|\&)/)) {
      if (!line.getElementsByTagName("div")[0].textContent.match(/Wunder/)) {
        visit_garena();
        gilden_tabs();
      }
      else {
        wiese();
        gilden_tabs();
      }
    }
    else {
      gilden_tabs2();
    }
  }
  if (rand) {
    if (rand.getElementsByTagName("div")[1]&&rand.getElementsByTagName("div")[1].innerHTML.match(/Gildenhalle/)) {
      gilden_reiterH();
    }
  }
  if (line&&line.innerHTML.match(/Dragolin/)) {
    gilden_hauptstadt();
  }
}

/**********************
** 20. Einkaufsliste **
**********************/
function marktliste() {
  var tabellen=line.parentNode.getElementsByTagName("table");
  var eigene=new Array;
  for(i=1;i<tabellen.length;i++) {
    var tr=tabellen[i].getElementsByTagName("tr");
    eigene[i-1]=new Array;
    for(k=0;k<tr.length-2;k++) {
      eigene[i-1][k]=/\?t=.*$/.exec(tr[k+1].getElementsByTagName("a")[0].href);
    }
  }
  var markt=eigene.join(",");
  GM_setValue("einkaufsliste_"+user+"_"+window.location.host,markt);
}
function marktweiter() {
  var markt=GM_getValue("einkaufsliste_"+user+"_"+window.location.host,"").split(",");
  var product=/product=(\w+)(\&|$)/.exec(document.URL)[1];
  var nix=false;
  if(markt!="") {
  for(i=0;i<markt.length;i++) {
    if(/product=(\w+)(\&|$)/.exec(markt[i])[1]==product) {
      nix=true;
      var tableiste=document.getElementById("drag_box").getElementsByTagName("ul")[0];
      var rueck=document.createElement("li");
      var rueck_a=document.createElement("a");
      rueck_a.style.width="25px";
      rueck_a.style.borderRight="solid #3D342B 1px";
      if(i==0) rueck_a.href=markt[markt.length-1];
      else rueck_a.href=markt[i-1];
      var rueck_text=document.createTextNode("<<");
      rueck_a.appendChild(rueck_text);
      rueck.appendChild(rueck_a);
      tableiste.appendChild(rueck);
      var vor=document.createElement("li");
      var vor_a=document.createElement("a");
      vor_a.style.width="25px";
      vor_a.style.borderLeft="solid #3D342B 1px";
      vor_a.className="end";
      if(i==markt.length-1) vor_a.href=markt[0];
      else vor_a.href=markt[i+1];
      var vor_text=document.createTextNode(">>");
      vor_a.appendChild(vor_text);
      vor.appendChild(vor_a);
      tableiste.appendChild(vor);
      var buy=document.getElementById("market_buy");
      var sell=document.getElementById("market_sell");
      if((buy&&sell&&!buy.innerHTML.match(/getbackMarket/g)&&!sell.innerHTML.match(/getbackDemand/g))||
      (buy&&!sell&&!buy.innerHTML.search(/getbackMarket/g))||(sell&&!buy&&!sell.innerHTML.search(/getbackDemand/g))) {
        markt.splice(i,1);
        markt=markt.join(",");
        GM_setValue("einkaufsliste_"+user+"_"+window.location.host,markt);
      }
      var cssinhalt=document.styleSheets[0];
      if (cssinhalt.cssRules) var laenge=cssinhalt.cssRules.length;
      else var laenge=cssinhalt.rules.length;
      cssinhalt.insertRule("ul.tabs li a.end {\n"
      +"	background-position:-441px 0px;\n"
      +"}\n",laenge);
      cssinhalt.insertRule("ul.tabs li a:hover.end {\n"
      +"	background-position:-674px 0px;\n"
      +"}\n",laenge);
      break;
    }
  }
  }
  if(nix==false) {
    marktneu();
  }
}
function marktneu() {
  var buy=document.getElementById("market_buy");
  var sell=document.getElementById("market_sell");
  if(buy.innerHTML.match(/getbackMarket/g)||sell.innerHTML.match(/getbackDemand/g)) {
    if(buy&&buy.innerHTML.match(/getbackMarket/g)) var tab="";
    if(sell&&sell.innerHTML.match(/getbackDemand/g)) var tab="\&tab=2";
    var gid=/\&gid=\d+/.exec(document.URL);
    if(gid=="\&gid=0"||gid==null) gid="\&gid=";
    var product=/\&product=\w+/.exec(document.URL);
    var neulink="\?t=market"+tab+gid+product;
    var markt=GM_getValue("einkaufsliste_"+user+"_"+window.location.host,"").split(",");
    if(markt=="") markt=[neulink];
    else markt.push(neulink);
    markt=markt.sort();
    markt=markt.join(",");
    GM_setValue("einkaufsliste_"+user+"_"+window.location.host,markt);
    marktweiter();
  }
}
function m_list() {
  if(line&&line.getElementsByTagName("div")[0].textContent.match(/H\u00e4ndler/)) {
    if(line.parentNode.getElementsByTagName("ul")[1]&&line.parentNode.getElementsByTagName("ul")[1].getElementsByTagName("a")[0].className=="active") {
      marktliste();
    }
    if(document.getElementById("market_buy")||document.getElementById("market_sell")) {
      marktweiter();
    }
  }
}

/*******************************
** 21. Baufortschrittsanzeige **
*******************************/
function baufortschritt(countdown) {
//Werte abfragen
  if(countdown==false) {
    var typ=/^[^\s]+\b/.exec(document.getElementById("building_name").textContent);
    var stufe=/\d+/.exec(document.getElementById("building_name").textContent);
    var zeit=/\d+\.\d+ \d+:\d+/.exec(document.getElementById("building_production").textContent).toString().replace(/\.|\s|:/g, ";");
  } else {
    var typ=/^[^\s]+\b/.exec(countdown.parentNode.getElementsByTagName("h3")[0].textContent);
    var stufe=/\d+/.exec(countdown.parentNode.getElementsByTagName("h3")[0].textContent);
    var zeit=countdown.title;
    if(zeit=="") {
      var t=parseInt(countdown.textContent.match(/\d+T/));
      var h=parseInt(countdown.textContent.match(/\d+h/));
      var m=parseInt(countdown.textContent.match(/\d+m/));
      var s=parseInt(countdown.textContent.match(/\d+s/));
      if(isNaN(t)) t=0;
      if(isNaN(h)) h=0;
      if(isNaN(m)) m=0;
      if(isNaN(s)) s=0;
      var dauer=(1440*t)+(60*h)+m+(s/60);
    } else {
      var dauer=parseInt(countdown.title)/60;
    }
  }
//Faktor definieren
  typen=new Array;
  typen[0]=["Akademie","Alchemieh\u00fctte","Arena","B\u00e4cker","Bauherr","B\u00f6ttcher",
"Brauerei","Drachenzucht","Eisengie\u00dferei","Eisenmine","Garten","Gasthaus","Gerber",
"Getreideanbau","Hanfplantage","Holzf\u00e4ller","Imkerei","Kaufmann","Kerzengie\u00dferei",
"K\u00f6hlerei","Kr\u00e4utergarten","Lager","Lehmbrennerei","Lehmstecherei","Metzger","M\u00fchle",
"Nagelschmiede","Obstplantage","Papierm\u00fchle","S\u00e4gewerk","Sattelmacher","Schreinerei",
"Seilerei","Steinbruch","Steinmetz","T\u00f6pferei","Viehzucht","Weberei","Wirtshaus","Zeugschmiede"];
  typen[1]=[16,16,70,6,14,8,6,50,4,2,2,8,6,2,6,2,2,12,4,4,6,4,4,2,4,4,6,4,10,4,8,6,8,2,4,8,2,10,8,8];
//Gesamtzeit
  var faktor;
  if(document.URL.match(/speed/)) {
    faktor=0.5;
  }
  else {
    for(i=0;i<typen[0].length;i++) {
      if(typen[0][i]==typ) {
        faktor=typen[1][i];
        break;
      }
    }
  }
  gesamt=faktor*Math.pow(parseInt(stufe)+1,2);
//Dauer
  if(countdown==false) {
    var jetztMonat = parseInt(serverzeit[1])-1;
    var jetzt = new Date(0).setFullYear(serverzeit[2]);
    jetzt = new Date(jetzt).setMonth(jetztMonat);
    jetzt = new Date(jetzt).setDate(serverzeit[0]);
    jetzt = new Date(jetzt).setHours(serverzeit[3]);
    jetzt = new Date(jetzt).setMinutes(serverzeit[4]);
    jetzt = new Date(jetzt).setSeconds(serverzeit[5]);
    var endzeit=zeit.split(";");
    var endMonat=parseInt(endzeit[1])-1;
    var jahr;
    if (jetztMonat>endMonat) {
      jahr=parseInt(serverzeit[2])-1; }
    else { jahr=parseInt(serverzeit[2]); }
    var endeAusbau = new Date(0).setFullYear(jahr);
    endeAusbau = new Date(endeAusbau).setMonth(endMonat);
    endeAusbau = new Date(endeAusbau).setDate(endzeit[0]);
    endeAusbau = new Date(endeAusbau).setHours(endzeit[2]);
    endeAusbau = new Date(endeAusbau).setMinutes(parseFloat(endzeit[3])+1);
    var dauer=(endeAusbau-jetzt)/60000;
  }
//Prozent
  var prozent=Math.round(1000*(1-(dauer/gesamt)))/10;
  if (prozent<0) prozent=0;
  var dauerTage=Math.floor(dauer/1440);
  var dauerStunden=Math.floor((dauer-(dauerTage*1440))/60);
  var dauerMinuten=Math.floor(dauer-(dauerTage*1440)-(dauerStunden*60));
  var dauerZeit="";
  if(dauerTage>0) dauerZeit=dauerTage+"T ";
  dauerZeit+=dauerStunden+"h "+dauerMinuten+"m";
//Balken
  if(countdown==false) var hierhin=line.parentNode.getElementsByTagName("div")[3];
  else var hierhin=countdown.parentNode.getElementsByTagName("div")[1].getElementsByTagName("div")[0];
  var rahmen=document.createElement("div");
  if(countdown==false) rahmen.style.width="400px";
  else rahmen.style.width="140px";
  rahmen.style.height="1.2em";
  rahmen.style.backgroundColor="#DBD1C8";
  rahmen.style.border="solid black 1px";
  rahmen.style.display="inline-block";
  rahmen.style.overflow="hidden";
  rahmen.style.position="relative";
  var balken=document.createElement("div");
  balken.style.width=prozent+"%";
  balken.style.height="1.2em";
  balken.style.backgroundColor="#C9B9AC";
  var textbox=document.createElement("div");
  if(countdown==false) textbox.style.width="400px";
  else textbox.style.width="140px";
  textbox.style.height="1.2em";
  textbox.style.fontSize="0.8em";
  textbox.style.position="absolute";
  textbox.style.top="0px";
  textbox.style.left="0px";
  textbox.style.textAlign="center";
  if(countdown==false) var text=document.createTextNode(prozent+"% Noch "+dauerZeit);
  else var text=document.createTextNode(prozent+"%");
  rahmen.appendChild(balken);
  textbox.appendChild(text);
  rahmen.appendChild(textbox);
  if(countdown==false) hierhin.insertBefore(rahmen,hierhin.getElementsByTagName("h1")[0].nextSibling);
  else hierhin.appendChild(rahmen);
}
function baufortschritt2() {
  var village;
  if(document.getElementById("mainVillage")) village=document.getElementById("mainVillage");
  if(document.getElementById("mainVillageDrachenzucht")) village=document.getElementById("mainVillageDrachenzucht");
  var countdown=village.getElementsByTagName("div");
  for (i in countdown) {
    if(countdown[i].className=="buildingCountdown") {
      new baufortschritt(countdown[i]);
    }
  }
}
function b_fort() {
  if(line&&line.innerHTML.match(/Geb\u00e4ude\u00fcbersicht/)) {
    if(document.getElementById("building_production")&&document.getElementById("building_production").textContent.match(/produziert \(bis/)) {
      baufortschritt(false);
    }
  }
  if(document.getElementById("mainVillage")||document.getElementById("mainVillageDrachenzucht")) {
    baufortschritt2();
  }
}

/***************************
** 22. Wetteinsatz merken **
***************************/
function bet_save() {
  var gold=parseInt(document.getElementById("price").value);
  if(gold>1000) gold=1000;
  GM_setValue("wettgeld",gold);
}
function bet_load() {
  var gold=GM_getValue("wettgeld",100);
  document.getElementById("price").value=gold;
}
function wette() {
  if(line&&line.innerHTML.match(/Wirtshaus/)) {
    if(line.parentNode.getElementsByTagName("h3")&&
(line.parentNode.getElementsByTagName("h3")[0].textContent.match(/gegen den Wirt/)||
line.parentNode.getElementsByTagName("h3")[0].textContent.match(/Ein einfaches/))) {
      if(document.getElementById("price")) {
        document.getElementById("price").addEventListener("change",bet_save,false);
        bet_load();
      }
    }
  }
}

/**************************************
** 23. Gildenarena-Tabelle sortieren **
**************************************/
function garena_sort() {
//Werte einlesen
  var mannschaft=document.getElementById("mannschaft").getElementsByTagName("div");
  var werteX=new Array;
  for(i=0;i<mannschaft.length-4;i++) {
    if(mannschaft[i+2].style.textDecoration=="line-through") {
      mannschaft[i+2].firstChild.style.textDecoration="line-through";
      mannschaft[i+2].firstChild.title=mannschaft[i+2].title;
    }
    werteX[i]=mannschaft[i+4].innerHTML;
  }
//Werte ordnen
  var werte=new Array;
  for(i=0;i<werteX.length/10;i++) {
    werte[i]=new Array;
    werte[i][0]=werteX[i*10];
    for(k=1;k<8;k++) { werte[i][k]=parseInt(werteX[(i*10)+k]); }
    werte[i][8]=werteX[(i*10)+9];
  }
//Dragballstaerken berechnen
  var gesamt;
  var bemerk=GM_getValue("dr_guild","").split("<|>");
  for(i=0;i<bemerk.length;i++) {
    bemerk[i]=bemerk[i].split("<||>");
  }
  for(i=0;i<werte.length;i++) {
    gesamt=Math.round((werte[i][1]+werte[i][2]+werte[i][3]+werte[i][4]+werte[i][5])/3);
    if(werte[i][2]<werte[i][3]) { /*AA*/
      werte[i][9]=(2*werte[i][2])+werte[i][3]-gesamt;
    } else {
      werte[i][9]=(2*werte[i][3])+werte[i][2]-gesamt;
    }
    if(werte[i][1]<werte[i][3]) { /*AM*/
      werte[i][10]=(2*werte[i][1])+werte[i][3]-gesamt;
    } else {
      werte[i][10]=(2*werte[i][3])+werte[i][1]-gesamt;
    }
    if(werte[i][2]<werte[i][5]) { /*MA*/
      werte[i][11]=(2*werte[i][2])+werte[i][5]-gesamt;
    } else {
      werte[i][11]=(2*werte[i][5])+werte[i][2]-gesamt;
    }
    if(werte[i][1]<werte[i][4]) { /*VM*/
      werte[i][12]=(2*werte[i][1])+werte[i][4]-gesamt;
    } else {
      werte[i][12]=(2*werte[i][4])+werte[i][1]-gesamt;
    }
    if(werte[i][4]<werte[i][5]) { /*VA*/
      werte[i][13]=(2*werte[i][4])+werte[i][5]-gesamt;
    } else {
      werte[i][13]=(2*werte[i][5])+werte[i][4]-gesamt;
    }
    if(werte[i][2]<werte[i][4]) { /*T*/
      werte[i][14]=(2*werte[i][2])+werte[i][4]-gesamt;
    } else {
      werte[i][14]=(2*werte[i][4])+werte[i][2]-gesamt;
    }
//bester Wert
    if(werte[i][9]>=werte[i][10]&&werte[i][9]>=werte[i][11]&&werte[i][9]>=werte[i][12]&&werte[i][9]>=werte[i][13]&&werte[i][9]>=werte[i][14]) {
      werte[i][15]='<span style="float:left; margin-left:0.4em;">AA:</span>'+werte[i][9];
    }
    if(werte[i][10]>=werte[i][9]&&werte[i][10]>=werte[i][11]&&werte[i][10]>=werte[i][12]&&werte[i][10]>=werte[i][13]&&werte[i][10]>=werte[i][14]) {
      werte[i][15]='<span style="float:left; margin-left:0.4em;">AM:</span>'+werte[i][10];
    }
    if(werte[i][11]>=werte[i][9]&&werte[i][11]>=werte[i][10]&&werte[i][11]>=werte[i][10]&&werte[i][11]>=werte[i][13]&&werte[i][11]>=werte[i][14]) {
      werte[i][15]='<span style="float:left; margin-left:0.4em;">MA:</span>'+werte[i][11];
    }
    if(werte[i][12]>=werte[i][9]&&werte[i][12]>=werte[i][10]&&werte[i][12]>=werte[i][11]&&werte[i][12]>=werte[i][13]&&werte[i][12]>=werte[i][14]) {
      werte[i][15]='<span style="float:left; margin-left:0.4em;">VM:</span>'+werte[i][12];
    }
    if(werte[i][13]>=werte[i][9]&&werte[i][13]>=werte[i][10]&&werte[i][13]>=werte[i][11]&&werte[i][13]>=werte[i][12]&&werte[i][13]>=werte[i][14]) {
      werte[i][15]='<span style="float:left; margin-left:0.4em;">VA:</span>'+werte[i][13];
    }
    if(werte[i][14]>=werte[i][9]&&werte[i][14]>=werte[i][10]&&werte[i][14]>=werte[i][11]&&werte[i][14]>=werte[i][12]&&werte[i][14]>=werte[i][13]) {
      werte[i][15]='<span style="float:left; margin-left:0.4em;">T&nbsp;:</span>'+werte[i][14];
    }
//Bemerkungen einfuegen
    werte[i][16]="";
    for(k=0;k<bemerk.length;k++) {
      if(bemerk[k][0]==werte[i][0].match(/dragon\/([^\"]+)\"/)[1]) {
        text=bemerk[k][1];
        text=text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\[i\]/ig,"<i>").replace(/\[\/i\]/ig,"<\/i>");
        text=text.replace(/\[b\]/ig,"<b>").replace(/\[\/b\]/ig,"<\/b>").replace(/\[c\]/ig,"<center>").replace(/\[\/c\]/ig,"<\/center>");
        text=text.replace(/\[user\]([^\[]*)\[\/user\]/ig,"<a href=\"\/user\/$1\">$1<\/a>").replace(/\[dragon\]([^\[]*)\[\/dragon\]/ig,"<a href=\"\/dragon\/$1\">$1<\/a>").replace(/\[guild\]([^\[]*)\[\/guild\]/ig,"<a href=\"\/guild\/$1\">$1<\/a>");
        text=text.replace(/\[url=([^\]]*)\]([^\[]*)\[\/url\]/ig,"<a href=\"$1\">$2<\/a>").replace(/\[url\]([^\[]*)\[\/url\]/ig,"<a href=\"$1\">$1<\/a>");
        text=text.replace(/\[color=([a-fA-F0-9]{6})\]([^\[]*)\[\/color\]/ig,"<span style=\"color:\#$1;\">$2<\/span>");
        werte[i][16]=text;
        if(bemerk[k][2]!="") werte[i][0]+="&nbsp;"+bemerk[k][2];
      }
    }
  }

//Tabellen-Array
  var tabelle=new Array;
  var zeile;
  var zelle;
  var zelleText;
  for(i=0;i<werte.length;i++) {
    zeile=document.createElement("tr");
    for(k=0;k<17;k++) {
      zelle=document.createElement("td");
      if(k==1) zelle.style.color="#8C4907";
      if(k==2) zelle.style.color="#1A1856";
      if(k==3) zelle.style.color="#940B06";
      if(k==4) zelle.style.color="#2E5519";
      if(k==5) zelle.style.color="#DC9B00";
      if(k==6) zelle.className="annotation";
      if(k!=0&&k!=8&&k!=16) zelle.style.textAlign="right";
      if(k>0&&k<6) zelle.style.fontWeight="bold";
      zelle.innerHTML=werte[i][k];
      zeile.appendChild(zelle);
    }
    tabelle[i]=zeile;
  }
//Tabelle erstellen
  var table=document.createElement('table');
  table.className="overview";
  table.style.margin="10px";
  table.style.backgroundColor="#DBD1C8";
  var thead=document.createElement('thead');
  var tr_head=document.createElement('tr');
  var th1=document.createElement('th');
  th1.id='dr_namen';
  th1.innerHTML='Erwachsene Drachen';
  th1.title='Erwachsene Drachen';
  var th2=document.createElement('th');
  th2.id='dr_kraft';
  th2.innerHTML='<abbr title="Kraft">K</abbr>';
  th2.title='Kraft';
  var th3=document.createElement('th');
  th3.id='dr_gesch';
  th3.innerHTML='<abbr title="Geschick">G</abbr>';
  th3.title='Geschick';
  var th4=document.createElement('th');
  th4.id='dr_feuer';
  th4.innerHTML='<abbr title="Feuerkraft">F</abbr>';
  th4.title='Feuerkraft';
  var th5=document.createElement('th');
  th5.id='dr_wille';
  th5.innerHTML='<abbr title="Willenskraft">W</abbr>';
  th5.title='Willenskraft';
  var th6=document.createElement('th');
  th6.id='dr_int';
  th6.innerHTML='<abbr title="Intelligenz">I</abbr>';
  th6.title='Intelligenz';
  var th6b=document.createElement('th');
  th6b.id='dr_fit';
  th6b.innerHTML='<abbr title="Fitness">&nbsp;</abbr>';
  th6b.title='Fitness';
  var th6c=document.createElement('th');
  th6c.id='dr_vit';
  th6c.innerHTML='<abbr title="Vitalit\u00e4t">V</abbr>';
  th6c.title='Vitalit\u00e4t';
  var th7=document.createElement('th');
  th7.id='dr_letzsp';
  th7.innerHTML='letztes Ligaspiel';
  th7.title='letztes Ligaspiel';
  var th8=document.createElement('th');
  th8.id='dr_AA';
  th8.innerHTML='<abbr title="Angriff Au\u00dfen">AA</abbr>';
  th8.title='Angriff Au\u00dfen';
  var th9=document.createElement('th');
  th9.id='dr_AM';
  th9.innerHTML='<abbr title="Angriff Mitte">AM</abbr>';
  th9.title='Angriff Mitte';
  var th10=document.createElement('th');
  th10.id='dr_MA';
  th10.innerHTML='<abbr title="Mitte Au\u00dfen">MA</abbr>';
  th10.title='Mitte Au\u00dfen';
  var th11=document.createElement('th');
  th11.id='dr_VM';
  th11.innerHTML='<abbr title="Verteidigung Mitte">VM</abbr>';
  th11.title='Verteidigung Mitte';
  var th12=document.createElement('th');
  th12.id='dr_VA';
  th12.innerHTML='<abbr title="Verteidigung Au\u00dfen">VA</abbr>';
  th12.title='Verteidigung Au\u00dfen';
  var th13=document.createElement('th');
  th13.id='dr_T';
  th13.innerHTML='<abbr title="Torwart">T</abbr>';
  th13.title='Torwart';
  var th14=document.createElement('th');
  th14.id='dr_best';
  th14.innerHTML='<abbr title="beste Position">b.&nbsp;Pos.</abbr>';
  th14.title='beste Position des Drachen';
  var th15=document.createElement('th');
  th15.id='dr_bemerk';
  th15.innerHTML='Bemerkungen';
  th15.title='Eigene Bemerkungen';
  tr_head.appendChild(th1);
  tr_head.appendChild(th2);
  tr_head.appendChild(th3);
  tr_head.appendChild(th4);
  tr_head.appendChild(th5);
  tr_head.appendChild(th6);
  tr_head.appendChild(th6b);
  tr_head.appendChild(th6c);
  tr_head.appendChild(th7);
  tr_head.appendChild(th8);
  tr_head.appendChild(th9);
  tr_head.appendChild(th10);
  tr_head.appendChild(th11);
  tr_head.appendChild(th12);
  tr_head.appendChild(th13);
  tr_head.appendChild(th14);
  tr_head.appendChild(th15);
  thead.appendChild(tr_head);
  table.appendChild(thead);
  var tfoot=document.createElement('tfoot');
  var tr_foot=document.createElement('tr');
  var td1=document.createElement('td');
  td1.colSpan='16';
  td1.innerHTML='';
  var td2=document.createElement('td');
  td2.style.textAlign="right";
  td2.innerHTML='<input id="edit" type="button" value="editieren" \/>'
  +'<input type="button" id="save" value="speichern" style="display:none;" \/>';
  tr_foot.appendChild(td1);
  tr_foot.appendChild(td2);
  tfoot.appendChild(tr_foot);
  table.appendChild(tfoot);
  var tbody=document.createElement('tbody');
  tbody.id='dr_tbody';
  for(i=0;i<tabelle.length;i++) {
    tbody.appendChild(tabelle[i]);
  }
  table.appendChild(tbody);
  var prinzip=document.getElementById("mannschaft").getElementsByTagName("p");
  var spieltext=new Array;
  for(i=0;i<prinzip.length;i++) { spieltext[i]=prinzip[i]; }
  document.getElementById("mannschaft").style.cssFloat="none";
  document.getElementById("mannschaft").style.clear="both";
  document.getElementById("mannschaft").style.paddingTop="10px";
  document.getElementById("mannschaft").style.width="100%";
  document.getElementById("mannschaft").innerHTML="";
  document.getElementById("mannschaft").appendChild(table);
  var div1=document.createElement("div");
  div1.style.margin="10px";
  var h4=document.createElement("h4");
  h4.innerHTML="Das Spielprinzip von DragBall:";
  div1.appendChild(h4);
  for(i=0;i<spieltext.length;i++) { div1.appendChild(spieltext[i]); }
  document.getElementById("mannschaft").appendChild(div1);
  for(i=0;i<17;i++) {
    var ths=document.getElementById("mannschaft").getElementsByTagName("thead")[0].getElementsByTagName("th")[i];
    ths.style.cursor="pointer";
    ths.className="sort ";
    var span=document.createElement("span");
    ths.insertBefore(span,ths.firstChild);
  }

    var sort_row=GM_getValue("ga_sort_row","dr_best");
    eval("tabelle.sort(function(x, y) { return "+sort_row+"(x,y); } ); einfuegen(document.getElementById('"+sort_row+"'));");

//sortieren
  document.getElementById("dr_namen").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_namen(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_kraft").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_kraft(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_gesch").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_gesch(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_feuer").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_feuer(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_wille").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_wille(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_int").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_int(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_fit").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_fit(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_vit").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_vit(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_letzsp").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_letzsp(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_AA").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_AA(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_AM").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_AM(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_MA").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_MA(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_VM").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_VM(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_VA").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_VA(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_T").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_T(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_best").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_best(x,y); } ); einfuegen(this,true);},false);
  document.getElementById("dr_bemerk").addEventListener("click",function() {tabelle.sort( function(x, y) { return dr_bemerk(x,y); } ); einfuegen(this,true);},false);

  function dr_namen(x, y) {
    var a = x.getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML.toString();
    var b = y.getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML.toString();
    if(a>b) return 1;
    if(a<b) return -1;
  }
  function dr_kraft(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[1].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[1].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_gesch(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[2].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[2].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_feuer(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[3].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[3].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_wille(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[4].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[4].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_int(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[5].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[5].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_fit(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[6].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[6].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_vit(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[7].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[7].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_letzsp(x, y) {
    var aa = /(\d+)\.(\d+)\./.exec(x.getElementsByTagName("td")[8].innerHTML.toString());
    if(aa==null) { a = 0; }
    else { var a = 100*parseInt(aa[2])+parseInt(aa[1]); }
    var bb = /(\d+)\.(\d+)\./.exec(y.getElementsByTagName("td")[8].innerHTML.toString());
    if(bb==null) { b = 0; }
    else { var b = 100*parseInt(bb[2])+parseInt(bb[1]); }
    if(a>b) return 1;
    if(a<b) return -1;
  }
  function dr_AA(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[9].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[9].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_AM(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[10].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[10].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_MA(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[11].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[11].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_VM(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[12].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[12].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_VA(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[13].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[13].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_T(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[14].innerHTML.toString());
    var b = parseInt(y.getElementsByTagName("td")[14].innerHTML.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_best(x, y) {
    var a = parseInt(x.getElementsByTagName("td")[15].getElementsByTagName("span")[0].nextSibling.textContent.toString());
    var b = parseInt(y.getElementsByTagName("td")[15].getElementsByTagName("span")[0].nextSibling.textContent.toString());
    if(a<b) return 1;
    if(a>b) return -1;
  }
  function dr_bemerk(x, y) {
    var a = x.getElementsByTagName("td")[16].textContent.toString();
    var b = y.getElementsByTagName("td")[16].textContent.toString();
    if(a=="") {
      if(b=="") {
        return 0;
      } else {
        return 1;
      }
    } else {
      if(b=="") {
        return -1;
      } else {
        if(a>b) return 1;
        if(a<b) return -1;
      }
    }
  }
//sortierte Werte einfuegen
  function einfuegen(sort,s) {
    if(s) GM_setValue("ga_sort_row",sort.id);
    var ths=document.getElementById("mannschaft").getElementsByTagName("thead")[0].getElementsByTagName("th");
    if(sort.className=="sort asc") {
      tabelle.reverse();
      for(i=0;i<ths.length;i++) {
        ths[i].className="sort ";
      }
      sort.className="sort desc";
    } else {
      for(i=0;i<ths.length;i++) {
        ths[i].className="sort ";
      }
      sort.className="sort asc";
    }
    for(i=0;i<tabelle.length;i++) {
      document.getElementById("dr_tbody").appendChild(tabelle[i]);
    }
  }

//Bemerkungen editieren
  document.getElementById("edit").addEventListener("click",edit,false);
  function edit() {
    var trs=document.getElementById("dr_tbody").getElementsByTagName("tr");
    var text='';
    var bemerkX=GM_getValue("dr_guild","").split("<|>");
    var lX=bemerkX.length;
    for(i=0;i<lX;i++) {
      bemerkX[i]=bemerkX[i].split("<||>");
    }
    for(i=0;i<trs.length;i++) {
      for(k=0;k<lX;k++) {
        if(bemerkX[k][0]==trs[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].href.match(/dragon\/(.+)/)[1]) {
          text=bemerkX[k][1];
        }
      }
      input_neu=document.createElement("input");
      input_neu.type="text";
      input_neu.value=text;
      input_neu.style.maxWidth="100px";
      trs[i].getElementsByTagName("td")[16].innerHTML="";
      trs[i].getElementsByTagName("td")[16].appendChild(input_neu);
    }
    document.getElementById("edit").style.display="none";
    document.getElementById("save").style.display="inline";
  }
//Bemerkungen speichern
  document.getElementById("save").addEventListener("click",save,false);
  function save() {
    var dr_notes=new Array;
    var trs=document.getElementById("dr_tbody").getElementsByTagName("tr");
    var text;
    for(i=0;i<trs.length;i++) {
      dr_notes[i]=new Array;
      dr_notes[i][0]=trs[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].href.match(/dragon\/(.+)/)[1];
      text=trs[i].getElementsByTagName("td")[16].getElementsByTagName("input")[0].value;
      dr_notes[i][1]=text;
      dr_notes[i][2]=trs[i].getElementsByTagName("td")[0].textContent.match(/\u2640|\u2642/);
      dr_notes[i]=dr_notes[i].join("<||>");
      text=text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\[i\]/ig,"<i>").replace(/\[\/i\]/ig,"<\/i>");
      text=text.replace(/\[b\]/ig,"<b>").replace(/\[\/b\]/ig,"<\/b>").replace(/\[c\]/ig,"<center>").replace(/\[\/c\]/ig,"<\/center>");
      text=text.replace(/\[user\]([^\[]*)\[\/user\]/ig,"<a href=\"\/user\/$1\">$1<\/a>").replace(/\[dragon\]([^\[]*)\[\/dragon\]/ig,"<a href=\"\/dragon\/$1\">$1<\/a>").replace(/\[guild\]([^\[]*)\[\/guild\]/ig,"<a href=\"\/guild\/$1\">$1<\/a>");
      text=text.replace(/\[url=([^\]]*)\]([^\[]*)\[\/url\]/ig,"<a href=\"$1\">$2<\/a>").replace(/\[url\]([^\[]*)\[\/url\]/ig,"<a href=\"$1\">$1<\/a>");
      text=text.replace(/\[color=([a-fA-F0-9]{6})\]([^\[]*)\[\/color\]/ig,"<span style=\"color:\#$1;\">$2<\/span>");
      trs[i].getElementsByTagName("td")[16].innerHTML=text;
    }
    document.getElementById("edit").style.display="inline";
    document.getElementById("save").style.display="none";
    var notes=dr_notes.join("<|>");
    GM_setValue("dr_guild",notes);
  }
  edit(); save();
}

function garena_css() {
  var cssinhalt=document.styleSheets[0];
  if (cssinhalt.cssRules) var laenge=cssinhalt.cssRules.length;
  else var laenge=cssinhalt.rules.length;
  cssinhalt.insertRule(".sort span {\n"
  +"  background-image: url('img/arrow_sprite.gif');\n"
  +"  background-repeat: no-repeat;\n"
  +"  background-position: 0px -72px;\n"
  +"  padding-left:8px;\n"
  +"}\n",laenge);
  cssinhalt.insertRule(".sort:hover span {\n"
  +"  background-position: 0px -117px;\n"
  +"}\n",laenge);
  cssinhalt.insertRule(".sort.asc span {\n"
  +"  background-position: 0px -87px;\n"
  +"}\n",laenge);
  cssinhalt.insertRule(".sort.asc:hover span {\n"
  +"  background-position: 0px -132px;\n"
  +"}\n",laenge);
  cssinhalt.insertRule(".sort.desc span {\n"
  +"  background-position: 0px -102px;\n"
  +"}\n",laenge);
  cssinhalt.insertRule(".sort.desc:hover span {\n"
  +"  background-position: 0px -117px;\n"
  +"}\n",laenge);
  cssinhalt.insertRule("#mannschaft table tbody tr:hover {\n"
  +"  background-color:#E8DFD5;\n"
  +"}\n",laenge);
}

function dr_sex() {
  var h1=line.parentNode.getElementsByTagName("div")[3].getElementsByTagName("h1")[0];
  if(h1.textContent.match(/\u2640|\u2642/)) {
    var name;
    if(document.URL.match(/\/dragon\//)) {
      name=document.URL.match(/dragon\/(.+)/)[1];
    } else if (document.URL.match(/profil_dragonname=/)) {
      name=document.URL.match(/profil_dragonname=(.+)/)[1];
    } else {
      name=line.textContent.match(/Profil von (.+) aus /)[1];
    }      
    var sex=h1.textContent.match(/(\u2640|\u2642) ?\(/)[1];
    var dr_notes=GM_getValue("dr_guild","").split("<|>");
    var l=dr_notes.length;
    for(i=0;i<l;i++) {
      dr_notes[i]=dr_notes[i].split("<||>");
      if(dr_notes[i][0]==name) {
        dr_notes[i][2]=sex;
        dr_notes[i]=dr_notes[i].join("<||>");
        GM_setValue("dr_guild",dr_notes.join("<|>"));
        break;
      } else {
        dr_notes[i]=dr_notes[i].join("<||>");
      }
    }
  }
}

function ga_sort() {
  if (document.getElementById("mannschaft")&&document.getElementById("mannschaft").getElementsByTagName("div")[12]) {
    if (document.getElementById("mannschaft").getElementsByTagName("div")[12].style.width=="5px") {
      garena_css();
      garena_sort();
    } else {
      alert('Pimp My Dragosien:\nDie Funktion "Gildenarena-Tabelle sortieren" funktioniert '
      +'nicht, wenn die Tabelle bereits von einem anderen Script ver\u00e4ndert wurde.\n'
      +'Deaktiviere die entsprechene Funktion im anderen Script, oder du solltest die Funktion '
      +'"Gildenarena-Tabelle sortieren" abschalten. (Geht \u00fcber den Reiter "C" in der rechten '
      +'Spalte.)');
    }
  }
  if (line&&line.textContent.match(/Profil von/)) {
    dr_sex();
  }
}


/****************************
** 24. Paarungen sortieren **
****************************/
function paarungen() {
//Gildenname
  if(document.URL.match(/guild_hall/)&&!document.URL.match(/speed\.dragosien\.de/)) {
    if(line) {
      var guildname = /- (.*)  $/.exec(line.getElementsByTagName("div")[0].textContent)[1];
      GM_setValue("guildname_"+user,guildname);
    }
  }
//Paarungen
  if(document.URL.match(/guild_arena/)&&document.URL.match(/tab=1/)) {
    var tabelle=line.parentNode.getElementsByTagName("table")[0];
   if(GM_getValue("guildname_"+user)!=undefined) {
    var guildname = GM_getValue("guildname_"+user);
//Gewinne färben
    var tr=tabelle.getElementsByTagName("tr");
    var x, y;
    for(i=1;i<tr.length;i++) {
      if(tr[i].getElementsByTagName("td")[4]) {
        x = parseInt(/(\d+):\d+/.exec(tr[i].getElementsByTagName("td")[3].textContent)[1]);
        y = parseInt(/\d+:(\d+)/.exec(tr[i].getElementsByTagName("td")[3].textContent)[1]);
        if(tr[i].getElementsByTagName("td")[1].textContent.match(guildname)) {
          if(tr[i].getElementsByTagName("td")[2].textContent.match(guildname)) {
            tr[i].getElementsByTagName("td")[3].style.color="blue";
          } else {
            if(x>y) { tr[i].getElementsByTagName("td")[3].style.color="green"; }
            else if(x<y) { tr[i].getElementsByTagName("td")[3].style.color="red"; }
          }
        } else {
          if(x<y) { tr[i].getElementsByTagName("td")[3].style.color="green"; }
          else if(x>y) { tr[i].getElementsByTagName("td")[3].style.color="red"; }
        }
      }
    }
//Anzahl Mannschaften
    var nr;
    if(tabelle.textContent.match(new RegExp(guildname+" VI","g"))) {
      nr=6;
    } else if (tabelle.textContent.match(new RegExp(guildname+" V","g"))) {
      nr=5;
    } else if (tabelle.textContent.match(new RegExp(guildname+" IV","g"))) {
      nr=4;
    } else if (tabelle.textContent.match(new RegExp(guildname+" III","g"))) {
      nr=3;
    } else if (tabelle.textContent.match(new RegExp(guildname+" II","g"))) {
      nr=2;
    } else {
      nr=1;
    }
//Auswahlfelder Mannschaft
    var rahmen=document.createElement("div");
    rahmen.style.margin="5px";
    var select=document.createElement("select");
    select.id="mannschaft_nr";
    select.style.marginRight="5px";
    var opt=document.createElement("option");
    opt.value="[IV]*";
    var optText=document.createTextNode("Alle Mannschaften");
    opt.appendChild(optText);
    select.appendChild(opt);
    if(nr>=1) {
      var opt1=document.createElement("option");
      opt1.value="$";
      var opt1Text=document.createTextNode("1. Mannschaft");
      opt1.appendChild(opt1Text);
      select.appendChild(opt1);
    }
    if(nr>=2) {
      var opt2=document.createElement("option");
      opt2.value="II$";
      var opt2Text=document.createTextNode("2. Mannschaft");
      opt2.appendChild(opt2Text);
      select.appendChild(opt2);
    }
    if(nr>=3) {
      var opt3=document.createElement("option");
      opt3.value="III$";
      var opt3Text=document.createTextNode("3. Mannschaft");
      opt3.appendChild(opt3Text);
      select.appendChild(opt3);
    }
    if(nr>=4) {
      var opt4=document.createElement("option");
      opt4.value="IV$";
      var opt4Text=document.createTextNode("4. Mannschaft");
      opt4.appendChild(opt4Text);
      select.appendChild(opt4);
    }
    if(nr>=5) {
      var opt5=document.createElement("option");
      opt5.value="V$";
      var opt5Text=document.createTextNode("5. Mannschaft");
      opt5.appendChild(opt5Text);
      select.appendChild(opt5);
    }
    if(nr>=6) {
      var opt6=document.createElement("option");
      opt6.value="VI$";
      var opt2Text=document.createTextNode("6. Mannschaft");
      opt6.appendChild(opt6Text);
      select.appendChild(opt6);
    }
    rahmen.appendChild(select);

//Auswahlfelder Heimspiel
    var select2=document.createElement("select");
    select2.id="heimspiel";
    var opt20=document.createElement("option");
    opt20.value=0;
    var opt20Text=document.createTextNode("Heim- und Gastspiele");
    opt20.appendChild(opt20Text);
    select2.appendChild(opt20);
    var opt21=document.createElement("option");
    opt21.value=1;
    var opt21Text=document.createTextNode("nur Heimspiele");
    opt21.appendChild(opt21Text);
    select2.appendChild(opt21);
    var opt22=document.createElement("option");
    opt22.value=2;
    var opt22Text=document.createTextNode("nur Gastspiele");
    opt22.appendChild(opt22Text);
    select2.appendChild(opt22);
    var opt23=document.createElement("option");
    opt23.value=3;
    var opt23Text=document.createTextNode("nur Testspiele");
    opt23.appendChild(opt23Text);
    select2.appendChild(opt23);
    rahmen.appendChild(select2);

    tabelle.parentNode.insertBefore(rahmen,tabelle);

//Auswahl
    function mannschaftswahl() {
      var mnr=document.getElementById("mannschaft_nr").value;
      var hsp=document.getElementById("heimspiel").value;
      for(i=1;i<tr.length;i++) {
        if(hsp==0) {
          if(tr[i].getElementsByTagName("td")[1].textContent.match(new RegExp(guildname+" "+mnr,"g"))) {
            tr[i].style.display="table-row";
          } else if (tr[i].getElementsByTagName("td")[2].textContent.match(new RegExp(guildname+" "+mnr,"g"))) {
            tr[i].style.display="table-row";
          } else {
            tr[i].style.display="none";
          }
        } else {
          if(hsp==3) {
            if(tr[i].getElementsByTagName("td")[1].textContent.match(new RegExp(guildname+" ","g"))&&
               tr[i].getElementsByTagName("td")[2].textContent.match(new RegExp(guildname+" ","g"))&&
               (tr[i].getElementsByTagName("td")[1].textContent.match(new RegExp(guildname+" "+mnr,"g"))||
                tr[i].getElementsByTagName("td")[1].textContent.match(new RegExp(guildname+" "+mnr,"g")))) {
              tr[i].style.display="table-row";
            } else {
              tr[i].style.display="none";
            }
          } else {
            if(tr[i].getElementsByTagName("td")[hsp].textContent.match(new RegExp(guildname+" "+mnr,"g"))) {
              tr[i].style.display="table-row";
            } else {
              tr[i].style.display="none";
            }
          }
        }
      }
    }

    document.getElementById("mannschaft_nr").addEventListener("change",mannschaftswahl,false);
    document.getElementById("heimspiel").addEventListener("change",mannschaftswahl,false);

   } else {
     var city="";
     var hall="halle";
     if(document.URL.match(/city=1/)) { city="&city=1"; hall="stadt"; }
     var rahmen=document.createElement("div");
     rahmen.style.margin="5px";
     rahmen.innerHTML="Um das Sortieren der Paarungen zu erm&ouml;glichen bitte einmal die "
     +"<a class='inline' href='\?t=guild_hall"+city+"'>Gilden"+hall+"<\/a> aufsuchen.";
     tabelle.parentNode.insertBefore(rahmen,tabelle);
   }
  }

}

/***************************************
** 25. Turnierplan-Ansicht verbessern **
***************************************/
function turnierplan() {
  if(document.URL.match(/guild_hall/)&&!document.URL.match(/speed\.dragosien\.de/)) {
    if(line) {
      var guildname = /- (.*)  $/.exec(line.getElementsByTagName("div")[0].textContent)[1];
      GM_setValue("guildname_"+user,guildname);
    }
  }
if(line&&line.parentNode&&line.parentNode.getElementsByTagName("table")[1]) {
//Tabelle eigene Mannschaften
var tabelle=line.parentNode.getElementsByTagName("table")[1];
  function ownteam() {
    var gilde=document.getElementById("teamName").value;
    var gildeSuch=new RegExp("\("+gilde+"\)","ig");
    var trs=tabelle.getElementsByTagName("tr");
    for(i=0;i<trs.length;i++) {
      trs[i].style.display="table-row";
      trs[i].innerHTML=trs[i].innerHTML.replace(/<kbd[^<>]*dashed[^<>]*>([^<>]*)<\/kbd>/g,"$1");
    }
    if(document.getElementById("ownteam").checked==true&&document.getElementById("teamName").value!="") {
      var k;
      var highlight;
      for(i=0;i<trs.length;i++) {
        if(trs[i].getElementsByTagName("th")[0]) {
          highlight=false;
          k=i;
          if(trs[k].innerHTML.match(gildeSuch)) {
            highlight=true;
          }
          k++;
          while(trs[k]&&trs[k].getElementsByTagName("td")[0]) {
            if(trs[k].textContent.match(gildeSuch)) {
              highlight=true;
              var t=trs[k].innerHTML;
              var u=t.replace(/>/g,"><|>").replace(/</g,"<|><").split("<|>");
              for(l=0;l<u.length;l++) {
                if(!u[l].match(/</)&&!u[l].match(/>/)) {
                  u[l]=u[l].replace(gildeSuch,"<kbd style=\"border-bottom: 1px dashed red;\">$1<\/kbd>");
                }
              }
              t=u.join("");
              trs[k].innerHTML=t;
            }
            k++;
          }
          k=parseInt(i)+1;
          if(highlight==false) {
            trs[i].style.display="none";
            while(trs[k]&&trs[k].getElementsByTagName("td")[0]) {
              trs[k].style.display="none";
              k++;
            }
          }
        }
      }
    }
  }

//Häkchen zum ausblenden
if(line&&tabelle.getElementsByTagName("th")[0]&&(tabelle.getElementsByTagName("th")[0].textContent.match(/Liga,?/)||
tabelle.getElementsByTagName("th")[0].textContent.match(/Freundschaftsspiele/))) {
  var rahmen=document.createElement("div");
  rahmen.style.margin="3px";
  rahmen.style.cssFloat="right";
  var haken=document.createElement("input");
  haken.id="ownteam";
  haken.type="checkbox";
  haken.style.cursor="pointer";
  var label=document.createElement("label");
  label.setAttribute("for","ownteam");
  label.style.marginLeft="0.4em";
  label.style.cursor="pointer";
  var text=document.createTextNode("Nur diese Mannschaften anzeigen:");
  label.appendChild(text);
  var gildenname=document.createElement("input");
  gildenname.type="text";
  gildenname.id="teamName";
  gildenname.value=GM_getValue("guildname_"+user,"");
  gildenname.style.width="20em";
  gildenname.style.marginLeft="0.4em";
  rahmen.appendChild(haken);
  rahmen.appendChild(label);
  rahmen.appendChild(gildenname);
  tabelle.style.clear="right";
  tabelle.parentNode.insertBefore(rahmen,tabelle);
//ausblenden beim setzten
  document.getElementById("ownteam").addEventListener("change",ownteam,false);
  document.getElementById("teamName").addEventListener("keyup",ownteam,false);

//Turnierplan
  if(tabelle.getElementsByTagName("th")[0].textContent.match(/Spielplan/)) {
//blättern
    var select=line.parentNode.getElementsByTagName("select")[0];
    var options=select.getElementsByTagName("option");
    for(i in options) {
      if(options[i].selected==true) {
        if(i>0) var optionPrevious=options[i-1].value;
        var optionCurrent=options[i].value;
        if(options[parseInt(i)+1]) var optionNext=options[parseInt(i)+1].value;
        if(options[parseInt(i)+2]) var optionNextNext=options[parseInt(i)+2].value;
        break;
      }
    }
    if(optionPrevious!=undefined) {
      var previous=document.createElement("a");
      previous.className="img";
      previous.style.fontSize="1.6em";
      previous.style.margin="0.2em";
      var previousText=document.createTextNode("\u25C4");
      previous.appendChild(previousText);
      previous.href="?t=highscore&chapter=games&pos="+optionPrevious;
      select.parentNode.insertBefore(previous,select);
    }
    if(optionNext!=undefined) {
      var next=document.createElement("a");
      next.className="img";
      next.style.fontSize="1.6em";
      next.style.margin="0.2em";
      var nextText=document.createTextNode("\u25BA");
      next.appendChild(nextText);
      next.href="?t=highscore&chapter=games&pos="+optionNext;
      select.parentNode.insertBefore(next,select.nextSibling);
    }

//aktuelles Spiel
    if(document.URL.match(/t=highscore/)&&document.URL.match(/chapter=games/)&&!document.URL.match(/pos=/)) {
//serverzeit=Tag,Monat,Jahr,Stunde,Minute,Sekunde
      zeit=serverzeit;
      if(((parseInt(zeit[3])>17)||(parseInt(zeit[3])==17&&parseInt(zeit[4])>=45))&&
         ((parseInt(zeit[3])<20)||(parseInt(zeit[3])==20&&parseInt(zeit[4])<=15))) {
        document.location.href="http:\/\/"+document.location.host+"\/?t=highscore&chapter=games&pos="+optionNext;
      }
      if((parseInt(zeit[3])>20)||(parseInt(zeit[3])==20&&parseInt(zeit[4])>=15)) {
        document.location.href="http:\/\/"+document.location.host+"\/?t=highscore&chapter=games&pos="+optionNextNext;
      }

    }

  }
}

}
}

/******************************
** 26. Drachenfarbe anzeigen **
******************************/
if(line&&line.getElementsByTagName("div")[0].textContent.match(/Profil von Dragonova aus \./)) {
  line.getElementsByTagName("div")[0].textContent="Profil von Dragonova aus dem Haremsgebirge.";
}
var farbcodes=["r","s","g","c","n","j","z","o","O","Z","J","N","_","q"];
var farbcodes2=["t","d","y","v","m","k","u","p","I","L","H","w"];
var farbcodes3=["a","f","x","b","h","l","i","P","U","K","M","e"];
var alle_farben=["Lind","Gr\u00fcn","Mint","Cyan","Azur","Blau","Violett","Magenta","Karmin","Rot","Orange","Gelb","Lind","Oktarin"];
function drachenfarbe() {
  var bild=document.getElementById("drag_box").getElementsByTagName("img")[0];
  var farbe="unbekannt";
  if(!bild.src.match(/upload/)) {
    farbe="gew\u00f6hnlich";
  } else {
    for(i=0;i<farbcodes.length;i++) {
      var farb1=new RegExp("g[qetsfy]"+farbcodes[i]+"\\w\\.png","");
      if(bild.src.match(farb1)) {
        farbe=alle_farben[i];
      }
    }
    for(i=0;i<farbcodes2.length;i++) {
      var farb2=new RegExp("g[qetsfy]"+farbcodes2[i]+"\\w\\.png","");
      if(bild.src.match(farb2)) {
        farbe=alle_farben[i]+"\/"+alle_farben[i+1];
      }
    }
    for(i=0;i<farbcodes3.length;i++) {
      var farb3=new RegExp("g[qetsfy]"+farbcodes3[i]+"\\w\\.png","");
      if(bild.src.match(farb3)) {
        farbe=alle_farben[i+1]+"\/"+alle_farben[i];
      }
    }
    farbe+=", ";
    var farb2fund=false;
    for(i=0;i<farbcodes.length;i++) {
      var farb4=new RegExp("g[qetsfy]\\w"+farbcodes[i]+"\\.png","");
      if(bild.src.match(farb4)) {
        farbe+=alle_farben[i];
        farb2fund=true;
      }
    }
    for(i=0;i<farbcodes2.length;i++) {
      var farb5=new RegExp("g[qetsfy]\\w"+farbcodes2[i]+"\\.png","");
      if(bild.src.match(farb5)) {
        farbe+=alle_farben[i]+"\/"+alle_farben[i+1];
        farb2fund=true;
      }
    }
    for(i=0;i<farbcodes3.length;i++) {
      var farb6=new RegExp("g[qetsfy]\\w"+farbcodes3[i]+"\\.png","");
      if(bild.src.match(farb6)) {
        farbe+=alle_farben[i+1]+"\/"+alle_farben[i];
        farb2fund=true;
      }
    }
    if(farb2fund==false) farbe+="unbekannt";
  }
  var zeilennr;
  if(document.getElementById("drag_box").getElementsByTagName("div")[3]) {
    var daten=document.getElementById("drag_box").getElementsByTagName("div")[3];
    if(line&&line.textContent.match(/Drachenzucht/)) {
      if(daten.innerHTML.match(/<b>Besitzer:<\/b>/)) zeilennr=3;
      else if(daten.innerHTML.match(/<b>Eltern:<\/b>/)) zeilennr=2;
    } else {
      if(daten.innerHTML.match(/<b>Pfleger:<\/b>/)) zeilennr=4;
      else zeilennr=3;
    }
    if(daten.innerHTML.match(/<b>Kinder:<\/b>/)) zeilennr++;
    hierhin=daten.getElementsByTagName("b")[zeilennr];
  } else hierhin=document.getElementById("drag_box").getElementsByTagName("b")[0];
  if(hierhin) {
  var colorB=document.createElement("b");
  var colorBText=document.createTextNode("Farbe:");
  var colorBr1=document.createElement("br");
  var colorText=document.createTextNode(farbe);
  var colorBr2=document.createElement("br");
  var colorBr3=document.createElement("br");
  colorB.appendChild(colorBText);
  hierhin.parentNode.insertBefore(colorB,hierhin);
  hierhin.parentNode.insertBefore(colorBr1,hierhin);
  hierhin.parentNode.insertBefore(colorText,hierhin);
  hierhin.parentNode.insertBefore(colorBr2,hierhin);
  hierhin.parentNode.insertBefore(colorBr3,hierhin);
  }
}
function drcolor() {
  if(line&&(line.textContent.match(/Drachenzucht/)||line.textContent.match(/Profil von/))) {
    drachenfarbe();
  }
}

/************
** 27. Uhr **
************/
function uhr(systemTime){
 if(document.getElementById('userinfo')){
  var html = document.getElementById('userinfo').nextSibling.nextSibling;
  var title = html.innerHTML.match(/\d\d:\d\d:\d\d ?\s?Uhr/);
  html.innerHTML = html.innerHTML.replace(/[\d:]+ ?\s?Uhr/, '');
  var uhr = document.createElement("div");
  uhr.id="laufendeUhr";
  uhr.style.cssFloat="right";
  uhr.style.margin="-1.2em 0em 0em -1em";
  uhr.style.textAlign="right";
  uhr.title=title;
  html.insertBefore(uhr,html.firstChild);
  var now = new Date();
  if (!systemTime){
    var dt = document.getElementById('laufendeUhr').title.split(':');
   for(var i = 0; i < dt.length; i++) dt[i] = parseInt(dt[i], 10);
   now.setFullYear(serverzeit[2]);
   now.setMonth(parseInt(serverzeit[1],10)-1);
   now.setDate(serverzeit[0],10);
   now.setHours(dt[0]);
   now.setMinutes(dt[1]);
   now.setSeconds(dt[2]);
  }
  var mo=new Array("Jan","Feb","M\u00e4r","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez");
  var day=new Array("So","Mo","Di","Mi","Do","Fr","Sa");
  function tick() {
   if (systemTime) now = new Date();
   else now.setSeconds(now.getSeconds() +1);
   var t = new Array(now.getDate(), now.getMonth(), now.getFullYear(), now.getHours(), now.getMinutes(), now.getSeconds());
// Reload bei Sonnenauf- und -untergang
    if(GM_getValue("nacht",true)) {
     var down=parseInt(GM_getValue("sun","18;6").split(";")[0],10);
     var up=parseInt(GM_getValue("sun","18;6").split(";")[1],10);
     if(GM_getValue("nachtStatus","M")=="M"&&(t[0]==down||t[0]==up)&&t[1]==0&&t[2]==0) {
       if(document.getElementById("mainVillage")||document.getElementById("mainVillageDrachenzucht")) {
         location.reload();
       }
     }
    }
   for(var i = 0; i < t.length; i++)if(t[i] < 10) t[i] = '0'+ t[i];
   document.getElementById('laufendeUhr').innerHTML=day[now.getDay()]+', '+t[0]+'. '+mo[parseInt(t[1],10)]+'. '+t[2]+'<br>'+t[3]+':'+t[4]+':'+t[5]+' Uhr';
  }
  tick();
  window.setInterval(tick,1000);
 }
}


/***********
** Quests **
***********/
function questfenster(h1,h2,bild,tag,text,opt1,opt1txt,opt2,opt2txt,opt3,opt3txt,wahl) {
//Elemente erzeugen
  var quest=document.createElement("div");
  quest.id="script_quest";
  quest.className="box_description jQDragRel";
  quest.style.zIndex="5000";
  quest.style.position="absolute";
  quest.style.padding="1px";
  var head=document.createElement("div");
  head.className="jQDragHandle";
  head.style.backgroundColor="#C9B9AC";
  head.style.height="20px";
  var title=document.createElement("div");
  title.className="layer_box_title";
  var X=document.createElement("div");
  X.title="schließen";
  X.className="layer_close";
  X.setAttribute("onclick","document.getElementById('script_quest').style.display='none'");
  var body=document.createElement("div");
  body.style.padding="5px 10px";
  var pic=document.createElement("img");
  pic.src=bild;
  pic.style.cssFloat="left";
  pic.style.width="150px";
  pic.style.height="150px";
  pic.style.margin="3px 10px 10px 0px";
  pic.style.border="1px solid rgb(61, 52, 43)";
  pic.alt="";
  var zahl=document.createElement("div");
  zahl.style.cssFloat="left";
  zahl.style.marginLeft="-162px";
  zahl.style.marginTop="3px";
  zahl.style.paddingTop="10px";
  zahl.style.width="150px";
  zahl.style.height="140px";
  zahl.style.textAlign="right";
  zahl.style.fontSize="40px";
  var rechts=document.createElement("div");
  rechts.style.cssFloat="left";
  rechts.style.width="440px";
  var headline=document.createElement("p");
  headline.style.fontWeight="bold";
  var txt=document.createElement("p");
  var willstdu=document.createElement("p");
  willstdu.style.fontWeight="bold";
  var options=document.createElement("p");
  var option1=document.createElement("a");
  if(opt1txt=="Schließen") {
    option1.setAttribute("onclick","document.getElementById('script_quest').style.display='none';");
    option1.style.cursor="pointer";
  } else {
    option1.href=opt1;
  }
  if(wahl=="") {
    var br1=document.createElement("br");
    var option2=document.createElement("a");
    option2.href=opt2;
    var br2=document.createElement("br");
    var option3=document.createElement("a");
    option3.href=opt3;
  }
//Texte erzeugen
  var titleText=document.createTextNode(h1);
  var XText=document.createTextNode("X");
  var headlineText=document.createTextNode(h2);
  var zahlText=document.createTextNode(tag);
  var txtText=document.createTextNode(text);
  if(wahl=="") {
    var willstduText=document.createTextNode("Willst du:");
    var option1Text=document.createTextNode(opt1txt);
    var option2Text=document.createTextNode(opt2txt);
    var option3Text=document.createTextNode(opt3txt); }
  else { var willstduText=document.createTextNode(wahl);
    var option1Text=document.createTextNode(opt1txt); }
//Texte einfügen
  title.appendChild(titleText);
  X.appendChild(XText);
  headline.appendChild(headlineText);
  zahl.appendChild(zahlText);
  txt.appendChild(txtText);
  txt.innerHTML=txt.innerHTML.replace(/\n/g,"<br>");
  willstdu.appendChild(willstduText);
    option1.appendChild(option1Text);
  if(wahl=="") {
    option2.appendChild(option2Text);
    option3.appendChild(option3Text); }
//Elemente zusammenfügen
  quest.appendChild(head);
  quest.appendChild(body);
  head.appendChild(title);
  head.appendChild(X);
  body.appendChild(pic);
  body.appendChild(zahl);
  body.appendChild(rechts);
  rechts.appendChild(headline);
  rechts.appendChild(txt);
  rechts.appendChild(willstdu);
    rechts.appendChild(options);
    options.appendChild(option1);
  if(wahl=="") {
    options.appendChild(br1);
    options.appendChild(option2);
    options.appendChild(br2);
    options.appendChild(option3); }
//Questfenster einfügen
return quest;
}

/*****************
** Land aendern **
*****************/
function landminus(minus) {
  var dz="mainVillage";
  if (document.getElementById("mainVillageDrachenzucht")) dz="mainVillageDrachenzucht";
  for(k=1;k<=20;k++) {
    var tip="tooltip"+k;
    if(document.getElementById(tip)) {
      document.getElementById(tip).parentNode.previousSibling.previousSibling.className=document.getElementById(tip).parentNode.previousSibling.previousSibling.className.replace(minus,"");
      document.getElementById(tip).parentNode.className=document.getElementById(tip).parentNode.className.replace(minus,"");
    }
  }
  if(document.getElementById("tooltip22")) {
    document.getElementById("tooltip22").parentNode.previousSibling.previousSibling.className=document.getElementById("tooltip22").parentNode.previousSibling.previousSibling.className.replace(minus,"");
  }
    var villageDivs=document.getElementById(dz).getElementsByTagName("div");
    for(i=0;i<villageDivs.length;i++) {
      if(villageDivs[i].className.match(/markt/)) {
        villageDivs[i].className=villageDivs[i].className.replace(minus,"");
      }
    }
    document.getElementById(dz).className=document.getElementById(dz).className.replace(minus,"");
    if(document.getElementById(dz).getElementsByTagName("h4")[0]||document.URL.match(/t=guild_hall/)) {
      document.getElementById(dz).getElementsByTagName("a")[2].className=document.getElementById(dz).getElementsByTagName("a")[2].className.replace(minus,"");
    }
  var all=document.getElementsByTagName("*");
  for(i=0;i<all.length;i++) {
    if(all[i].className.match(/tower/)&&(!GM_getValue("lager",true)
    ||(document.getElementById(dz)&&document.getElementById(dz).getElementsByTagName("h4")[0]))) {
      all[i].className=all[i].className.replace(minus,"");
    }
    if(all[i].getElementsByTagName("a")[0]&&all[i].getElementsByTagName("a")[0].title.match(/Tannenbaum/)&&all[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0]) {
      var minus2=new RegExp("_"+minus,"");
      all[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src=all[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src.replace(minus2,"");
    }
  }
}
function landplus(plus) {
  var dz="mainVillage";
  if (document.getElementById("mainVillageDrachenzucht")) dz="mainVillageDrachenzucht";
  for(k=1;k<=20;k++) {
    var tip="tooltip"+k;
    if(document.getElementById(tip)) {
      if(!document.getElementById(tip).parentNode.previousSibling.previousSibling.className.match(plus)) {
        document.getElementById(tip).parentNode.previousSibling.previousSibling.className+=" "+plus;
        document.getElementById(tip).parentNode.className+=" "+plus; }
    }
  }
  if(document.getElementById("tooltip22")) {
    if(!document.getElementById("tooltip22").parentNode.previousSibling.previousSibling.className.match(plus)) {
      document.getElementById("tooltip22").parentNode.previousSibling.previousSibling.className+=" "+plus; }
  }
    var villageDivs=document.getElementById(dz).getElementsByTagName("div");
    for(i=0;i<villageDivs.length;i++) {
      if(villageDivs[i].className.match(/markt/)) {
        if(!villageDivs[i].className.match(plus)) {
          villageDivs[i].className+=" "+plus; }
      }
    }
    if(!document.getElementById(dz).className.match(plus)) {
      document.getElementById(dz).className+=" "+plus; }
    if(document.getElementById(dz).getElementsByTagName("h4")[0]||document.URL.match(/t=guild_hall/)) {
      document.getElementById(dz).getElementsByTagName("a")[2].className+=" "+plus;
    }
  var all=document.getElementsByTagName("*");
  for(i=0;i<all.length;i++) {
    if(all[i].className.match(/tower/)) {
      if(!all[i].className.match(plus)) {
        all[i].className+=" "+plus; }
    }
    if(all[i].getElementsByTagName("a")[0]&&all[i].getElementsByTagName("a")[0].title.match(/Tannenbaum/)&&all[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0]) {
      if(!all[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src.match(plus)) {
        all[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src=all[i].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src.replace(/(_winter)|(\.png)/,"_"+plus+"$1$2");
      }
    }
  }
}


/**************
** 28.Winter **
**************/
if(!document.URL.match(/speed/)&&document.URL.match(/t=foreign_village/)&&document.URL.match(/id=6($|\D)/)) {
  document.getElementById("tooltip1").parentNode.previousSibling.previousSibling.className+=" zeugschmiede";
  document.getElementById("tooltip1").getElementsByTagName("h3")[0].textContent="Waffenschmiede";
  document.getElementById("tooltip16").parentNode.previousSibling.previousSibling.className+=" muehle";
  document.getElementById("tooltip16").getElementsByTagName("h3")[0].textContent="B\u00fcro des Hauptmanns";
  document.getElementById("tooltip17").parentNode.previousSibling.previousSibling.className+="wirtshaus";
  document.getElementById("tooltip17").getElementsByTagName("h3")[0].textContent="Pausenraum";
  for(i=2;i<16;i++) {
    document.getElementById("tooltip"+i).parentNode.previousSibling.previousSibling.className+=" lager";
    document.getElementById("tooltip"+i).getElementsByTagName("h3")[0].textContent="Geschenke-Lager";
  }
}

function advent() {
  var season=GM_getValue("season","S");
  if(document.getElementById("mainVillage")||document.getElementById("mainVillageDrachenzucht")) {

    if(season=="S") {
      landminus("winter");
      if(document.getElementById("mainVillage")) {
        document.getElementById("mainVillage").getElementsByTagName("div")[0].style.backgroundImage="";
        document.getElementById("mainVillage").getElementsByTagName("div")[1].style.backgroundImage="";
      } else if(document.getElementById("mainVillageDrachenzucht")) {
        document.getElementById("mainVillageDrachenzucht").getElementsByTagName("div")[0].style.backgroundImage="";
        document.getElementById("mainVillageDrachenzucht").getElementsByTagName("div")[1].style.backgroundImage="";
      }
    }
    if(season=="W") {
      landplus("winter");

      if(document.getElementById("cumulus")) {
        hierhin=document.getElementById("cumulus").parentNode;
        var snow=document.createElement("div");
        snow.style.backgroundImage="url(img\/"+b_snow+")";
        snow.style.backgroundRepeat="repeat";
        snow.style.zIndex="39";
        snow.style.width="756px";
        snow.style.height="530px";
        snow.style.position="absolute";
        snow.style.top="0px";
        snow.style.left="0px";
        hierhin.insertBefore(snow,document.getElementById("cumulus"));
      }
    }
    if(season=="F") {

    }
    if(season=="H") {

    }

  }

  if(document.URL.match(/t=capital/)) {
    if(season=="S") {
      line.parentNode.getElementsByTagName("img")[0].src="img\/dragolin_street.jpg"
    }
    if(season=="W") {
      line.parentNode.getElementsByTagName("img")[0].src="img\/"+b_street;
    }
  }
}


/**************
** 29. Nacht **
**************/
function nacht() {
  if(document.getElementById("mainVillage")||document.getElementById("mainVillageDrachenzucht")) {
    var nachtStatus=GM_getValue("nachtStatus","M");
    var down=parseInt(GM_getValue("sun","18;6").split(";")[0],10);
    var up=parseInt(GM_getValue("sun","18;6").split(";")[1],10);
    var zeit=parseInt(serverzeit[3],10);
    if(nachtStatus=="A"||nachtStatus=="M"&&(down==up||(down>up&&(zeit>=down||zeit<up))||(down<up&&zeit>=down&&zeit<up))) {
      landplus("night");
    }
    if(nachtStatus=="N"||nachtStatus=="M"&&((down>up&&zeit<down&&zeit>=up)||(down<up&&(zeit<down||zeit>=up)))) {
      landminus("night");
    }
  }
}

/******************
** 30.Gildentabs **
******************/
// Bereiche trennen
function add_tabs(elm,nr) {
  var ort=line.parentNode.getElementsByTagName(elm)[nr];
  if (elm=="h3") { ort=ort.nextSibling.nextSibling.nextSibling.nextSibling; }
  if (elm=="table") {
    var trs=ort.getElementsByTagName("tr");
    for(i=0;i<trs.length;i++) {
      if(trs[i].getElementsByTagName("textarea")[0]) {
        ort=trs[i].nextSibling.nextSibling.getElementsByTagName("td")[0];
      }
    }
  }
  var seite=ort.innerHTML.toString();
  var tab_names=seite.match(/==.*==/g);
  if(!tab_names) tab_names="";
  seite='<div id="start">'+seite;
  for(i=1;i<=tab_names.length;i++) {
    seite=seite.replace(/(\<.*\>)?==.*==(\<.*\>)?\n?<br>/,'<\/div>\n<div id="tab'+i+'">');
  }
  if(seite.match(/<h3>.*Gildenprofilseite.*<\/h3>/)) {
    seite=seite.replace(/(<h3>.*Gildenprofilseite.*<\/h3>)/,'<\/div>$1');
  } else {
    seite+='<\/div>';
  }
  ort.innerHTML=seite;

//Tabs einfügen
 if(tab_names!="") {
  var url=document.URL;
  if(url.match(/\&extra=\d+/)) url=url.replace(/\&extra=\d+/,"");
  if(url.match(/\/guild\//)) url=url.replace(/\/guild\/([^\?]*)\??/,"?t=profil_guild&str_tag=$1");
  if(url.match(/\/dragon\//)) url=url.replace(/\/dragon\/([^\?]*)\??/,"?t=profil_dragon&profil_dragonname=$1");
  if(!url.match(/\?/)) url+="?";
  var ul=document.createElement("ul");
  ul.id="extra_tabs";
  ul.style.marginLeft="-10px";
  var breite;
  if(tab_names.length<4) breite="tabs";
  if(tab_names.length==4) breite="tabs middle";
  if(tab_names.length>4) breite="tabs small";
  ul.className=breite;
  for(i=0;i<tab_names.length;i++) {
    var li=document.createElement("li");
    var a=document.createElement("a");
    a.className="";
    a.href=url+"&extra="+(parseInt(i)+1);
    var text=tab_names[i].replace(/==/g,"");
    var txt=document.createTextNode(text);
    a.appendChild(txt);
    li.appendChild(a);
    ul.appendChild(li);
  }

tab_height=22*Math.ceil(tab_names.length/6);
var styling = document.createElement("style");
styling.type = "text\/css";
var styleinhalt = document.createTextNode("#extra_tabs li a.active { margin-bottom:-1px; }\n"
+"#extra_tabs { height:"+tab_height+"px;");
styling.appendChild(styleinhalt);
var kopf = document.getElementsByTagName("head")[0];
kopf.appendChild(styling);

  var tabs_end=document.createElement("div");
  tabs_end.style.clear="left";
  tabs_end.style.display="block";
  tabs_end.style.height="1em";
  if (elm=="table") {
    ul.style.marginLeft="0px";
    ul.style.width="728px";
    ort.insertBefore(ul,ort.getElementsByTagName("*")[0]);
    ort.insertBefore(tabs_end,ort.getElementsByTagName("*")[0]);
  } else if(line.textContent.match(/Gildenturm/)) {
    ul.style.marginLeft="-10px";
    ul.style.clear="left";
    ort.getElementsByTagName("div")[0].insertBefore(ul,ort.getElementsByTagName("h3")[0]);
    ort.getElementsByTagName("div")[0].insertBefore(tabs_end,ort.getElementsByTagName("h3")[0]);
  } else { 
    ort.parentNode.insertBefore(ul,ort);
    ort.parentNode.insertBefore(tabs_end,ort);
  }
  if(elm=="div"&&nr==3) ul.style.marginLeft="0px";
 }

//ausblenden
  var extra=document.URL.match(/\&extra=(\d+)/);
  if(!extra) extra="1"; else extra=extra[1];
  for(i=1;i<=tab_names.length;i++) {
    if(extra!=i) {
      document.getElementById("tab"+i).style.display="none";
    } else {
      document.getElementById("extra_tabs").getElementsByTagName("li")[i-1].getElementsByTagName("a")[0].className="active";
    }
  }

//  if(document.URL.match(/extra=\d+/)) location.hash="extra_tabs";

}

// Passende Seiten finden
function g_tab() {
  if (line) {
    if (line.innerHTML.match(/Gildenhalle/)&&line.parentNode.getElementsByTagName("ul")[0]) {
      if (line.parentNode.getElementsByTagName("h3")[0]) {
        if (line.parentNode.getElementsByTagName("h3")[0].innerHTML.match(/Punkte/)) {
          add_tabs("div",3);
        }
        if (line.parentNode.getElementsByTagName("h3")[0].innerHTML.match(/News/)) {
          var dort=line.parentNode.getElementsByTagName("div")[3];
          dort.innerHTML=dort.innerHTML.replace(/(<h3>Vorschau News:<\/h3>)/,'$1\n<br>\n<div>');
          dort.innerHTML+='</div>';
          add_tabs("h3",1);
        }
        if (line.parentNode.getElementsByTagName("h3")[0].innerHTML.match(/Gildenprofil/)) {
          add_tabs("h3",0);
        }
      }
    }
    if (line.innerHTML.match(/Gildenturm/)&&line.parentNode.getElementsByTagName("ul")[0]) {
      if (line.parentNode.getElementsByTagName("h3")[0]) {
        add_tabs("div",5);
      }
    }
    if (line.innerHTML.match(/Verwaltung/)&&line.parentNode.getElementsByTagName("ul")[0]) {
      if (line.parentNode.getElementsByTagName("h3")[0]) {
        if (line.parentNode.getElementsByTagName("h3")[0].innerHTML.match(/News/)) {
          var dort=line.parentNode.getElementsByTagName("div")[5];
          dort.innerHTML=dort.innerHTML.replace(/(<h3>Vorschau News:<\/h3>)/,'$1\n<br>\n<div>');
          dort.innerHTML+='</div>';
          add_tabs("h3",1);
        }
        if (line.parentNode.getElementsByTagName("h3")[0].innerHTML.match(/Gildenprofil/)) {
          add_tabs("h3",0);
        }
      }
    }
    if (line.innerHTML.match(/Profil von/)) {
      add_tabs("div",5);
    }
    if (line.innerHTML.match(/Profil der Gilde/)&&!document.URL.match(/tab=2/)) {
          var dort=line.parentNode.getElementsByTagName("div")[3];
          dort.innerHTML=dort.innerHTML.replace(/(<h3>Gildenprofil:<\/h3>)/,'$1\n<br>\n<div>');
          dort.innerHTML+='</div>';
          add_tabs("h3","1");
    }
    if (line.innerHTML.match(/Drachenzucht/)) {
      if(document.URL.match(/tab=2/)) {
        add_tabs("table",0);
      }
    }
  }
}

/****************
** 31.Reiter P **
****************/
function reiterP() {
  if(rand&&rand.getElementsByTagName("table")[0]&&rand.getElementsByTagName("table")[0].getElementsByTagName("b")[0]) {
    if(rand.getElementsByTagName("table")[0].getElementsByTagName("b")[0].textContent.match(/Produktion/)) {
      var trs=rand.getElementsByTagName("table")[0].getElementsByTagName("tr");
      for(i=trs.length-1;i>0;i--) {
        var td=trs[i].getElementsByTagName("td")[1];
        if(td.textContent=="0\/0") {
          trs[i].parentNode.removeChild(trs[i]);
        } else {
          var prod=td.textContent.match(/(\d*\.?\d+)\/(-?\d*\.?\d+)/);
          prod[1]=prod[1].replace(/\./,"");
          prod[2]=prod[2].replace(/\./,"");
          prod[3]=parseFloat(prod[1])+parseFloat(prod[2]);
          td.textContent=prod[1];
          td.style.color="black";
          var tdx=document.createElement("td");
          tdx.style.fontSize="10px";
          var tdxtxt=document.createTextNode(prod[2]);
          tdx.appendChild(tdxtxt);
          trs[i].appendChild(tdx);
          var tdy=document.createElement("td");
          tdy.style.fontSize="10px";
          if(prod[3]<0) tdy.style.color="red";
          if(prod[3]>0) { tdy.style.color="green"; prod[3]="+"+prod[3]; }
          if(prod[3]==0) prod[3]="\u00b10";
          var tdytxt=document.createTextNode(prod[3]);
          tdy.appendChild(tdytxt);
          trs[i].appendChild(tdy);
        }
      }
      trs[0].getElementsByTagName("td")[0].setAttribute("colspan","4");
      var trh=document.createElement("tr");
      var tdp=document.createElement("td");
      var tdpb=document.createElement("b");
      var tdptxt=document.createTextNode("Produkt");
      tdpb.appendChild(tdptxt);
      tdp.appendChild(tdpb);
      trh.appendChild(tdp);
      var tdx=document.createElement("td");
      var tdxb=document.createElement("b");
      var tdxtxt=document.createTextNode("+");
      tdxb.appendChild(tdxtxt);
      tdx.appendChild(tdxb);
      trh.appendChild(tdx);
      var tdy=document.createElement("td");
      var tdyb=document.createElement("b");
      var tdytxt=document.createTextNode("-");
      tdyb.appendChild(tdytxt);
      tdy.appendChild(tdyb);
      trh.appendChild(tdy);
      var tdz=document.createElement("td");
      var tdzb=document.createElement("b");
      var tdztxt=document.createTextNode("=");
      tdzb.appendChild(tdztxt);
      tdz.appendChild(tdzb);
      trh.appendChild(tdz);
      trs[0].parentNode.insertBefore(trh,trs[1]);
    }
  }

}



/////////////////////////////
//   Scriptkonfiguration   //
/////////////////////////////

if (rand) {
//C hinzufügen
var configTab = document.createElement("li");
configTab.title = "Script-Konfiguration";
var a = document.createElement("a");
var ai = document.createTextNode("C");
a.appendChild(ai);
a.className = "inactive";
a.style.cursor = "pointer";
a.id = "configTab";
configTab.appendChild(a);
rand.getElementsByTagName("ul")[0].appendChild(configTab);

//Konfigurationsseite
var config = document.createElement("div");
config.id = "config";
config.style.display = "none";
config.style.width = "160px";
config.style.marginTop = "2px";
config.style.marginBottom = "20px";
config.style.marginLeft = "7px";
rand.insertBefore(config, rand.getElementsByTagName("ul")[0].nextSibling);
var liste = "<b>Einstellungen:<\/b>\n<ol style=\"margin-left:2em; margin-top:0.5em;\">\n";
for (i=1; i<wert.length; i++) {
  liste += "<li><input id=\""+wert[i]+"\" name=\""+wert[i]
+"\" type=\"checkbox\" style=\"margin-right:0.6em;\"><label for=\""+wert[i]+"\">"
+bez[i]+"<\/label>\n";
  if (i==6) {
    liste+="<br \/><input id=\"enter\" name=\"enter\" type=\"checkbox\" "
+"style=\"margin-left:1em; margin-right:0.6em;\"><label for=\"enter\">Mit ENTER senden<\/label>\n";
  }
  if (i==16) {
    liste+="<br \/>\n<input id=\"lagerL\" name=\"lagerPos\" type=\"radio\" "
+"style=\"margin-left:1em; margin-right:0.4em;\"><label for=\"lagerL\">links</label> "
+"<input id=\"lagerR\" name=\"lagerPos\" type=\"radio\" style=\"margin-right:0.4em;\">"
+"<label for=\"lagerR\">rechts</label>\n";
  }
  if (i==28) {
    liste+="<br \/><input id=\"seasonS\" name=\"season\" type=\"radio\" "
+"style=\"margin-right:0.4em;\"><label for=\"seasonS\">Sommer</label> "
+"<input id=\"seasonW\" name=\"season\" type=\"radio\" "
+"style=\margin-right:0.4em;\"><label for=\"seasonW\">Winter</label> ";
  }
  if (i==29) {
    var sun=GM_getValue("sun","18;6").split(";");
    liste+="\n ist <br \/>\n<input id=\"nachtN\" name=\"nachtT\" type=\"radio\" "
+"style=\"margin-right:0.4em;\"><label for=\"nachtN\">nie</label> "
+"<input id=\"nachtA\" name=\"nachtT\" type=\"radio\" "
+"style=\margin-right:0.4em;\"><label for=\"nachtA\">immer</label> "
+"<input id=\"nachtM\" name=\"nachtT\" type=\"radio\" "
+"style=\"margin-right:0.4em;\"><label for=\"nachtM\">"
+"von </label><br \/>\n<input id=\"sunDown\" name=\"sun\" type=\"text\" maxlength=\"2\" "
+"value=\""+sun[0]+"\" style=\"margin-right:0.4em; width:2em;\"><label for=\"sunDown\">Uhr</label> "
+"bis <input id=\"sunUp\" name=\"sun\" type=\"text\" maxlength=\"2\" value=\""+sun[1]+"\" "
+"style=\"margin-right:0.4em; width:2em;\"><label for=\"sunUp\">Uhr</label>\n";
  }
  liste+="<\/li>\n";
}
liste += "<\/ol>\n<br \/>\n<input value=\""+wert[0]+"\" id=\""+wert[0]+"\" name=\""
+wert[0]+"\" type=\"checkbox\" style=\"margin-right:0.6em;\">"
+"<label for=\""+wert[0]+"\">"+bez[0]+"<\/label>\n"
+"<br \/>\n<input value=\"manuelles Update\" id=\"updating\" type=\"button\">"
+"<br \/><span class=\"annotation\">Version "+version+"<\/span>"
+"<span class=\"end\"><\/span>";
config.innerHTML = liste;
document.getElementById("configTab").addEventListener("click", zeigen, false);
}

//bei Klick auf C Konfiguration öffnen
function zeigen() {
  if (document.getElementById("configTab").className == "inactive") {
    config.style.display = "block";
    var lis = rand.getElementsByTagName("ul")[0].getElementsByTagName("li");
    for (k=0;k<lis.length;k++) {
      lis[k].getElementsByTagName("a")[0].className = "inactive"; }
    document.getElementById("configTab").className = "active";
    rand.innerHTML = rand.innerHTML.replace(/(<span class=\"end\"><\/span><\/div>)/, "$1\n<div id=\"randInhalt\" "
+"style=\"display:none;\">");
    rand.innerHTML = rand.innerHTML.replace(/(<div class=\"mainNavi\" >)/, "<\/div>\n$1");
    for (l=0;l<wert.length;l++) {
      if(GM_getValue(wert[l],true)) document.getElementById(wert[l]).checked = true; }
    if(GM_getValue("enter",true)) document.getElementById("enter").checked = true;
    if (!GM_getValue("gchat",true)) {
      document.getElementById("enter").disabled = true; }
    if (GM_getValue("l_pos_"+user+"_"+location.host,"0;1").split(";")[0]=="0") {
      document.getElementById("lagerL").checked = true;
      document.getElementById("lagerR").checked = false; }
    else {
      document.getElementById("lagerL").checked = false;
      document.getElementById("lagerR").checked = true; }
    if (!GM_getValue("lager",true)) {
      document.getElementById("lagerL").disabled = true;
      document.getElementById("lagerR").disabled = true; }
    if (!GM_getValue("advent",true)) {
      document.getElementById("seasonS").disabled = true;
      document.getElementById("seasonW").disabled = true; }
    var season=GM_getValue("season","S");
    document.getElementById("season"+season).checked = true;
    if (!GM_getValue("nacht",true)) {
      document.getElementById("nachtN").disabled = true;
      document.getElementById("nachtA").disabled = true;
      document.getElementById("nachtM").disabled = true;
      document.getElementById("sunDown").disabled = true;
      document.getElementById("sunUp").disabled = true;
      document.getElementById("sunDown").style.backgroundColor = "#ccc";
      document.getElementById("sunUp").style.backgroundColor = "#ccc";}
    var nachtStatus = GM_getValue("nachtStatus","M");
      document.getElementById("nacht"+nachtStatus).checked = true;
      if(!nachtStatus.match(/M/)) nachtZeit(true);
    klickwaechter();
  }
  else { }
}


//wird eine Option geklickt?
function speichern() {
  GM_setValue(this.id, this.checked);
  if (this.id=="gchat") {
    if (this.checked==true) {
      document.getElementById("enter").disabled=false; }
    if (this.checked==false) {
      document.getElementById("enter").disabled=true; }
  }
  if (this.id=="lager") {
    if (this.checked==true) {
      document.getElementById("lagerL").disabled=false;
      document.getElementById("lagerR").disabled=false; }
    if (this.checked==false) {
      document.getElementById("lagerL").disabled=true;
      document.getElementById("lagerR").disabled=true; }
  }
  if (this.id=="advent") {
    if (this.checked==true) {
      document.getElementById("seasonS").disabled=false;
      document.getElementById("seasonW").disabled=false; }
    if (this.checked==false) {
      document.getElementById("seasonS").disabled=true;
      document.getElementById("seasonW").disabled=true; }
  }
  if (this.id=="nacht") {
    if (this.checked==true) {
    document.getElementById("nachtN").disabled=false;
    document.getElementById("nachtA").disabled=false;
    document.getElementById("nachtM").disabled=false;
      if(GM_getValue("nachtStatus","M")=="M") nachtZeit(false);
    } else {
    document.getElementById("nachtN").disabled=true;
    document.getElementById("nachtA").disabled=true;
    document.getElementById("nachtM").disabled=true;
      nachtZeit(true);
    }
  }
}
function nachtZeit(onoff) {
    document.getElementById("sunDown").disabled=onoff;
    document.getElementById("sunUp").disabled=onoff;
    if(onoff) {
      document.getElementById("sunDown").style.backgroundColor = "#ccc";
      document.getElementById("sunUp").style.backgroundColor = "#ccc";
    } else {
      document.getElementById("sunDown").style.backgroundColor = "#fff";
      document.getElementById("sunUp").style.backgroundColor = "#fff";
    }
}
function umschalten() {
  if (this.id=="lagerL") {
    if (this.checked==true) {
      var l_pos=GM_getValue("l_pos_"+user+"_"+location.host,"0;1").split(";");
      l_pos[0]="0";
    }
  }
  if (this.id=="lagerR") {
    if (this.checked==true) {
      var l_pos=GM_getValue("l_pos_"+user+"_"+location.host,"0;1").split(";");
      l_pos[0]="1";
    }
  }
  GM_setValue("l_pos_"+user+"_"+location.host,l_pos.join(";"));
}
function nachtStWe() {
  var nachtStatus= this.id.replace(/nacht/,"");
  GM_setValue("nachtStatus",nachtStatus);
  if(this.id.match(/M/)) {
    nachtZeit(false);
  } else {
    nachtZeit(true);
  }
}
function seasonWe() {
  var season= this.id.replace(/season/,"");
  GM_setValue("season",season);
}
function night() {
  var down=parseInt(document.getElementById("sunDown").value,10);
  if(isNaN(down)) down=18;
  var up=parseInt(document.getElementById("sunUp").value,10);
  if(isNaN(up)) up=6;
  var sun=down+";"+up;
  GM_setValue("sun",sun);
}
function klickwaechter() {
for (i=0;i<wert.length;i++) {
document.getElementById(wert[i]).addEventListener("change", speichern, false); }
document.getElementById("enter").addEventListener("change", speichern, false);
document.getElementById("updating").addEventListener("click", pruefe, false);
document.getElementById("lagerL").addEventListener("change", umschalten, false);
document.getElementById("lagerR").addEventListener("change", umschalten, false);
document.getElementById("seasonS").addEventListener("change", seasonWe, false);
document.getElementById("seasonW").addEventListener("change", seasonWe, false);
document.getElementById("sunDown").addEventListener("change", night, false);
document.getElementById("sunUp").addEventListener("change", night, false);
document.getElementById("nachtN").addEventListener("change", nachtStWe, false);
document.getElementById("nachtA").addEventListener("change", nachtStWe, false);
document.getElementById("nachtM").addEventListener("change", nachtStWe, false);
}
//if(rand) rand.addEventListener("DOMSubtreeModified", klickwaechter, false);
function pruefe() { updateCheck(true); }

/////////////////////////////
//   Funktionsverwaltung   //
/////////////////////////////

//aktiviert die Funktionen die in den Einstellungen aktiviert wurden
if (GM_getValue("marktnumm",true)) { marktnumm(); }
if (GM_getValue("bbcode",true)) { bbcode(); }
if (GM_getValue("karte",true)) { karte(); }
if (GM_getValue("schatz",true)) { schatz(); }
if (GM_getValue("link",true)) { link(); }
if (GM_getValue("gchat",true)) { gchat(); }
if (GM_getValue("nlink",true)) { nlink(); }
if (GM_getValue("menge",true)) { menge(); }
if (GM_getValue("menue",true)) { menue(); }
if (GM_getValue("garena",true)) { garena(); }
if (GM_getValue("sitter",true)) { sitter(); }
if (GM_getValue("warn_zustand",true)) { warn_zustand(); }
if (GM_getValue("z_sort",true)) { z_sort(); }
if (GM_getValue("table",true)) { table(); }
if (GM_getValue("dr_ei",true)) { dr_ei(); }
if (GM_getValue("lager",true)) { lager(); }
if (GM_getValue("bauherr",true)) { bauherr(); }
if (GM_getValue("g_stadt",true)) { g_stadt(); }
if (GM_getValue("orakel",true)) { orakel(); }
if (GM_getValue("m_list",true)) { m_list(); }
if (GM_getValue("b_fort",true)) { b_fort(); }
if (GM_getValue("wette",true)) { wette(); }
if (GM_getValue("ga_sort",true)) { ga_sort(); }
if (GM_getValue("paarungen",true)) { paarungen(); }
if (GM_getValue("turnierplan",true)) { turnierplan(); }
if (GM_getValue("drcolor",true)) { drcolor(); }
if (GM_getValue("uhr",true)) { uhr(); }
if (GM_getValue("nacht",true)) { nacht(); }
if (GM_getValue("advent",false)) { advent(); }
if (GM_getValue("g_tab",true)) { g_tab(); }
if (GM_getValue("reiterP",true)) { reiterP(); }
if (GM_getValue("update",true)) { updateCheck(); }