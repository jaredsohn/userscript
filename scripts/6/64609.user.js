// ==UserScript==
// @name                   Feuerwache.net Fahrzeugvorschlaege
// @description            schlaegt Fahrzeuge zu Einsatzstichworten vor
// @include                http://www.feuerwache.net/feuerwehr-einsaetze*
// @AAO by                 d006
// @version                2009-12-20
// ==/UserScript==

/*
  FAQ:
  - kann ich meine eigene AAO sichern, damit ich nach dem Update nicht alles neu machen muss?
    kopiere unten alles zwischen "KOPIEREN AB HIER" und "KOPIEREN BIS HIER" in eine leere
    Textdatei und nach dem Update überschreibst Du damit meine Zuordnungen wieder.
    
  - kann man die Häkchen bei den Verbandeinsätzen auch standardmäßig setzen?
    -> Nein, weil im Verband seltener komplette Einsätze bearbeitet werden, sondern
       meist nur einzelne Sonder-FZ gefordert sind.
*/


//******************************************************************************************
// KOPIEREN AB HIER //
var Einsatzklassen = {
  // hier die Einsatzstichworte einer Einsatzklasse und zusätzlichen Fahrzeugen zuordnen
  // Es werden später alle Fahrzeuge vorgeschlagen, die der Einsatzklasse angehören
  // (z.B. 3xLF bei "Feuer3") sowie alle hier zusätzlich genannten Fahrzeuge
  //
  // Syntax in der Alarmierungsliste:
  //   Einsatzklasse zuerst, dann ggf. ein Plus (+) und weiter Fahrzeugklassen, diese 
  //   durch Komma (,) voneinander getrennt. Alternativen durch Schrägstrich (/) getrennt
  //   Optionale Fahrzeuge (werden nur in der Liste hervorgehoben) mit Pipe (|) anfügen
  //   zum Beispiel 'F1+RW/TS,ELW|GW-M,DL' ->
  //       alarmiere alles nach F1, zusätzlich einen RW oder LF16-TS, sowie einen ELW.
  //       markiere zusätzlich den nächsten GW-M sowie die nächste DL
  //
  'Auffahrunfall'                  : 'TH_Auffahrunfall',
  'Baum auf Auto'                  : 'TH_BaumAuto',
  'Baum auf Dach'                  : 'TH_BaumDach',
  'Baum auf Straße'                : 'TH_BaumStraße',
  'Brand in KFZ-Werkstatt'         : 'Feu_KFZ-Werkstatt',
  'Brand in Schule'                : 'Feu_Schule',
  'Brand in Spedition'             : 'Feu_Spedition',
  'Brand in Sporthalle'            : 'Feu_Sporthalle',
  'Brand im Sägewerk'              : 'Feu_Sägewerk',
  'Brand im Supermarkt'            : 'Feu_Supermarkt',
  'Brennende Bäume'                : 'Feu_Baum',
  'Brennende Telefonzelle'         : 'Feu_Telefonzelle',
  'Brennender LKW'                 : 'Feu_LKW',
  'Brennender PKW'                 : 'Feu_PKW',
  'Brennendes Gras'                : 'Feu_Gras',
  'Chemieunfall (an Schule)'       : 'GSG_Chemieunfall(an Schule)',
  'Chlorgas Alarm (Schwimmbad)'    : 'GSG_Chlorgas(Schwimmbad)',
  'Container Brand'                : 'Feu_Container',
  'Dachstuhlbrand'                 : 'Feu_Dachstuhl',
  'Fahrstuhl - Türöffnung'         : 'TH_Aufzug',
  'Fettbrand in Pommesbude'        : 'Feu_Pommesbude',
  'Feuer im Altenheim'             : 'Feu_Altenheim',
  'Feuer im Laubhaufen'            : 'Feu_Laub',
  'Gartenlaubenbrand'              : 'Feu_Gartenlaube',
  'Gastronomiebrand'               : 'Feu_Gastronomie',
  'Kellerbrand'                    : 'Feu_Keller',
  'Keller unter Wasser'            : 'TH_KellerWasser',
  'Kinobrand'                      : 'Feu_Kino',
  'Motorrad-Brand'                 : 'Feu_Motorrad',
  'Mülleimer Brand'                : 'Feu_Mülleimer',
  'PKW-Brand'                      : 'Feu_PKW',
  'Scheunenbrand'                  : 'Feu_Scheune',
  'Schornsteinbrand'               : 'Feu_Schornstein',
  'Silobrand'                      : 'Feu_Silo',
  'Sperrmüllbrand'                 : 'Feu_Sperrmüll',
  'Strohballen Brand'              : 'Feu_Stroh',
  'Traktorbrand'                   : 'Feu_Traktor',
  'Verkehrsunfall'                 : 'TH_VU',
  'Wohnblockbrand'                 : 'Feu_Wohnblock',
  'Wohnungsbrand'                  : 'Feu_Wohnung',
  'Brand auf Weihnachtsmarkt'      : 'Feu_Weihnachtsmarkt',
  'Brand-Weihnachtsbaum in Kirche' : 'Feu_WeihnachtsbaumKirche',
};
  
var Einsatzklasse_Fahrzeugzuordnung = {
  // hier wird definiert, welche Fahrzeuge standardmäßig zu den verschiedenen
  // Einsatzklassen geschickt werden. Einzelne Fahrzeuge werden durch Komma (,)
  // getrennt, Alternativen durch (/).
  'TH_Auffahrunfall'            :  'LF',
  'TH_BaumAuto'                 :  'LF',
  'TH_BaumDach'                 :  'LF,RW/DL',
  'TH_BaumStraße'               :  'LF',
  'Feu_KFZ-Werkstatt'           :  'LF,LF/TLF,ELW',
  'Feu_Schule'                  :  'LF,LF/TLF,DL,ELW',
  'Feu_Spedition'               :  'LF,LF,LF,ELW,TLF,DL',
  'Feu_Baum'                    :  'LF/TLF',
  'Feu_Telefonzelle'            :  'LF/TLF',
  'Feu_Gras'                    :  'LF/TLF',
  'Feu_Container'               :  'LF/TLF',
  'Feu_Laub'                    :  'LF/TLF',
  'Feu_Gartenlaube'             :  'LF/TLF',
  'Feu_Motorrad'                :  'LF/TLF',
  'Feu_Mülleimer'               :  'LF/TLF',
  'Feu_PKW'                     :  'LF/TLF',
  'Feu_Sperrmüll'               :  'LF/TLF',
  'Feu_Traktor'                 :  'LF/TLF',
  'Feu_LKW'                     :  'LF/TLF',
  'TH_Aufzug'                   :  'RW',
  'TH_KellerWasser'             :  'TLF/LF',
  'TH_VU'                       :  'LF',
  'Feu_Stroh'                   :  'LF/TLF',
  'Feu_Keller'                  :  'LF,LF,LF/TLF,ELW',
  'Feu_Dachstuhl'               :  'LF,LF,ELW,DL',
  'Feu_Schornstein'             :  'LF,DL',
  'Feu_Wohnung'                 :  'LF,LF,DL,ELW',
  'Feu_Pommesbude'              :  'LF,TLF,ELW',
  'Feu_Scheune'                 :  'LF,LF,LF,ELW,DL',
  'Feu_Silo'                    :  'TLF/LF,LF,DL,ELW',
  'Feu_Supermarkt'              :  'LF,LF,LF,TLF,ELW',
  'Feu_Altenheim'               :  'LF,LF,LF,ELW,DL',
  'Feu_Kino'                    :  'LF,LF,TLF,ELW,DL',
  'Feu_Sporthalle'              :  'LF,LF,ELW,TLF,DL',
  'Feu_Sägewerk'                :  'LF,LF,LF,ELW,DL',
  'Feu_Wohnblock'               :  'LF,LF,LF,TLF,ELW,DL',
  'GSG_Chemieunfall(an Schule)' :  'LF,ELW,GW-M,GW-G',
  'GSG_Chlorgas(Schwimmbad)'    :  'LF,ELW,GW-M,GW-G,RW',
  'Feu_Gastronomie'             :  'LF,LF/TLF,ELW',
  'Feu_Weihnachtsmarkt'         :  'LF/TLF',
  'Feu_WeihnachtsbaumKirche'    :  'LF,LF,LF,DL,ELW,GW-A',
  'GSG'                         :  'LF,RW,ELW,GW-M,GW-G',
};
// KOPIEREN BIS HIER //
//******************************************************************************************











  


//
// usually no need to change anything below this line
//




var Fahrzeugklassen = {
  // hier die verfügbaren Fahrzeugen mit ihrer Beschreibung und der Zuordnung 
  // zu einer Fahrzeugklasse auflisten. Fahrzeuge, die ihr eigener Typ sind 
  // (z.B. "RTW") brauchen hier nicht aufgeführt werden. (sie schaden aber auch nicht)
  'RTW'                :   'RTW'       ,
  'TLF 20/40 - SL'     :   'TLF'       ,
  'DLA (K) 23/12'      :   'DL'        ,
  'GW-Messtechnik'     :   'GW-M'      ,
  'GW-Gefahrgut'       :   'GW-G'      ,
  'GW-A'               :   'GW-A'      ,
  'GW-L2 - Wasser'     :   'GW-W'      ,
  'GW-Öl'              :   'GW-Öl'     ,
  'RW'                 :   'RW'        ,
  'ELW 1'              :   'ELW'       ,
  'LF 16-TS'           :   'TS'        ,
  'LF 10/6'            :   'LF'        ,
  'LF 20/16'           :   'LF'        ,
  'LF 8'               :   'LF'        ,
  'Kleinlöschfahrzeug' :   'LF'        ,
};

var Nachforderungen = {
  "Die Einsatzstelle wird unübersichtlich. Wir benötigen einen ELW 1." : "ELW",
  "Hier wird es zu unübersichtlich! Wir benötigen einen ELW 1" : "ELW",
  "Zur besseren Koordination benötigen wir einen ELW 1." : "ELW",
  "Aufgrund der Ausbreitung wird ein ELW 1 benötigt." : "ELW",
  "Vorort herrscht Chaos! Wir benötigen einen ELW 1." : "ELW",
  
  "Die Wasserversorgung ist unzureichend! Ein TLF 20/40 - SL wird benötigt." : "TLF",
  "Wir benötigen mehr Schaummittel. Es wird ein TLF 20/40 - SL benötigt." : "TLF",
  "Ein TLF 20/40 - SL wird benötigt, da größere Mengen Schaummittel und der Wasserwerfer eingesetzt werden sollen." : "TLF",
  
  "Uns gehen die Atemschutzgeräte aus! Wir benötigen einen GW-A." : "GW-A",

  "Wir benötigen Material vom Rüstwagen (RW)!" : "RW",
  "Für erweiterte Technische Hilfe wird ein RW (Rüstwagen) benötigt." : "RW",
  "Um das Auto zu befreien, benötigen wir einen RW!" : "RW",
  
  "Wir benötigen für weitere Löscharbeiten dringend eine Drehleiter (DLA (K) 23/12)." : "DL",
  "Um das Feuer besser erreichen zu können, brauchen wir eine Drehleiter (DLA (K) 23/12)." : "DL",
  "Um die oberen Stockwerke zu erreichen, brauchen wir eine Drehleiter (DLA (K) 23/12)." : "DL",
  "Um die Löscharbeiten weiter ausführen zu können, wird eine Drehleiter (DLA (K) 23 / 12) benötigt." : "DL",
  
  "Unbekannte Stoffe sind ausgetreten. Wir benötigen einen GW-Gefahrgut." : "GW-G",
  "Unbekannte Fässer wurden gefunden! Wir benötigen einen GW-Gefahrgut." : "GW-G",
  "Wir benötigen die Ausrüstung vom GW-Gefahrgut." : "GW-G",
  "Unbekannte Stoffe sind ausgetreten. Wir benötigen zum Messen einen GW-Messtechnik" : "GW-M",

  "Beim Verkehrsunfall sind große Mengen Öl ausgelaufen! Wir brauchen den GW-Öl!" : "GW-Öl",
  "Hier laufen größere Mengen Öl aus! Wir benötigen einen GW-Öl." : "GW-Öl",
  
  "Hier muss Wasser über weite Wegstrecken transportiert werden. Wir benötigen einen GW-L2 Wasser." : "GW-W",
  "Das Feuer ist weiter ausserhalb und alle Wasserreserven sind aufgebraucht. Wir brauchen einen GW-L2 -Wasser um weitere Schläuche verlegen zu können." : "GW-W",
};



//
// really no need to change anything below
//





















//
// ...unless you know what you do...
//


var ToAlarm = new Array;
var Optional = new Array;
var Unterwegs = new Array;
var NichtVerf = new Array;
var ichBins;
var debugging;
var machVorschlag=true;
var Alle_F1;
var showInfoKlasseInListe;
var showInfoStichwort,InfotextStichwort;
var showInfoKlasse,InfotextKlasse;
var showInfoKlassenalarm,InfotextKlassenalarm;
var showInfoKlassenalarmOpt,InfotextKlassenalarmOpt;
var showInfoRTW,InfotextRTW;
var showInfoUnterwegs,InfotextUnterwegs;
var showInfoNachforderungen,InfotextNachforderungen;
var showInfoToAlarm,InfotextToAlarm;
var showInfoFahrzeit,InfotextFahrzeit;
var showInfoFahrzeitOpt,InfotextFahrzeitOpt;
var showInfoNichtVerfuegbar,InfotextNichtVerfuegbar;
var gettingVars=false;

init();
main();

function main()
{ var adr = document.location.href;
  mylog("main, page=" + adr);
  
  ichBins = true;
  if (adr == "http://www.feuerwache.net/feuerwehr-einsaetze")
  { // auf Übersichtseite
    if (showInfoKlasseInListe)
    { for each (TD in document.getElementsByTagName("td"))
      { for each (A in TD.getElementsByTagName("a"))
        { if ( A.href.indexOf("http://www.feuerwache.net/feuerwehr-einsaetze/") == 0)
          { TD.innerHTML += "&nbsp;<font color='red'>(" + getEinsatzKlasse(A.innerHTML) + ")</font>";
          }
        }
      }
    }
  }
  else
  { // auf Einsatzseite
    // Test, ob konfiguriert werden soll:
    if (adr.indexOf("&mode=konfigurieren") != -1) 
    { gettingVars=true;
      SetVariables();
      document.location.href = adr.substr(0,adr.indexOf("&mode=konfigurieren"));
      gettingVars=false;
    }

    // Alle Infobox-Variablen leer machen
    InfotextStichwort="";
    InfotextKlasse="";
    InfotextKlassenalarm="";
    InfotextKlassenalarmOpt="";
    InfotextRTW="";
    InfotextUnterwegs="";
    InfotextNachforderungen="";
    InfotextToAlarm="";
    InfotextFahrzeit="";
    InfotextFahrzeitOpt="";
    InfotextNichtVerfuegbar="";
    
    // im Verbandseinsatz die Checkbox per default NICHT anhaken, sonst schon
    if (document.getElementById("machVorschlag") == undefined) machVorschlag = !Verbandseinsatz();
    
    // Einsatzstichwort ermitteln
    var EinsatzDiv = document.getElementById("mission_content");
    var Einsatz = document.getElementsByTagName("h1")[0];
    var Einsatzstichwort = getStichwort(Einsatz.innerHTML);
    if (showInfoStichwort) InfotextStichwort = Einsatzstichwort;

    // Einsatzklasse
    var Einsatzklasse = getEinsatzKlasse(Einsatzstichwort);
    if (showInfoKlasse) InfotextKlasse = Einsatzklasse;
    // Fahrzeuge zusammenstellen
    FillAlarmListe(Einsatzklasse);

    if (showInfoKlassenalarm) InfotextKlassenalarm = ToAlarm.toString();
    if (showInfoKlassenalarmOpt && Optional.length>0) InfotextKlassenalarmOpt = Optional.toString();

    // Anzahl der nötigen RTW ermitteln
    var V = Verletzte();
    if (V>0)
    { if (showInfoRTW) InfotextRTW = V + " Stück";
      while (V>0) { ToAlarm.push("RTW"); V--; }
    }
    
    // bereits eingebundene Fahrzeuge ermitteln
    FillUnterwegsListe();

    // ...und diese aus der Alarmliste löschen
    if (Unterwegs.length>0)
    { if (showInfoUnterwegs) InfotextUnterwegs = Unterwegs.toString();
      // ToAlarm um die FZ kürzen, die bereits unterwegs sind
      bereinigeToAlarm();
    }
    
    // Nachforderungen auslesen
    var NF = AddNachforderungen();
    if (NF != "" && showInfoNachforderungen) InfotxetNachforderungen = NF;

    if (!machVorschlag)
    { // es sollen keine Vorschläge angehakt werden, also alles aus ToAlarm
      // nach Optional verschieben, so dass alles nur gelb markiert wird.
      while (ToAlarm.length>0) Optional.push(ToAlarm.pop());
    }
    
    if (ToAlarm.length>0 && showInfoToAlarm) 
    { InfotextToAlarm = ToAlarm.toString(); }
    else
    { InfotextToAlarm = "<font color='green'>Nichts zu alarmieren.</font>"; }
      
    // ToAlarm-Fahrzeuge tatsächlich abhaken
    var Dauer1 = AlarmiereFahrzeuge();
    if (Dauer1 != "" && showInfoFahrzeit) InfotextFahrzeit = Dauer1;
    // Optionale Fahrzeuge markieren
    var Dauer2 = MarkiereFahrzeuge();
    if (Dauer2 != "" && showInfoFahrzeitOpt) InfotextFahrzeitOpt = Dauer2;
      
    // falls Fahrzeuge nicht alarmiert werden konnten, diese auflisten
    if (ToAlarm.length > 0 && showInfoNichtVerfuegbar) InfotextNichtVerfuegbar = ToAlarm.toString();

    // Text für die Infobox zusammenstellen
    var Info = "<h2>Einsatzinfos</h2>\n";

    // Vorschläge ein- und ausschalten
    Info += "<input type='checkbox' id='machVorschlag' ";
    if (machVorschlag) Info +="checked";
    Info += "> vorgeschlagene Fahrzeuge sofort abhaken\n";
mylog("Stichwort = " + InfotextStichwort);
mylog("Klasse = " + InfotextKlasse);
mylog("KlasseAlarm = " + InfotextKlassenalarm);
mylog("KlasseAlarmOpt = " + InfotextKlassenalarmOpt);
mylog("RTW = " + InfotextRTW);
mylog("Unterw = " + InfotextUnterwegs);
mylog("Nachf = " + InfotextNachforderungen);
mylog("ToAlarm = " + InfotextToAlarm);
mylog("Zeit = " + InfotextFahrzeit);
mylog("ZeitOpt = " + InfotextFahrzeitOpt);
mylog("NV = " + InfotextNichtVerfuegbar);
    // Infos in Tabelle strukturieren
    Info += "<table class='defaultTable'>\n";
    var InfoVorspann = "<tr><th style='width: 150px;'>";
    if (InfotextStichwort) Info += InfoVorspann + "Stichwort</th><td>" + InfotextStichwort + "</td></tr>\n";
    if (InfotextKlasse) 
    { Info += InfoVorspann + "Einsatzklasse</th><td><font color='yellow'>" + InfotextKlasse + "</font>";
      if (InfotextKlassenalarmOpt) InfotextKlassenalarm += ", Optional: " + InfotextKlassenalarmOpt + "&nbsp;";
      if (InfotextKlassenalarm) Info += "&nbsp;&nbsp;(&nbsp;" + InfotextKlassenalarm + "&nbsp;)";
      Info += "</td></tr>\n";
    }
    if (InfotextRTW) Info += InfoVorspann + "RTW benötigt</th><td>" + InfotextRTW + "</td></tr>\n";
    if (InfotextNachforderungen) Info += InfoVorspann + "Nachforderung</th><td>" + InfotextNachforderungen + "</td></tr>\n";
    if (InfotextUnterwegs) Info += InfoVorspann + "bereits im Einsatz</th><td>" + InfotextUnterwegs + "</td></tr>\n";
    if (InfotextToAlarm) Info += InfoVorspann + "zu alarmieren</th><td><font color='red'>" + InfotextToAlarm + "</font></td></tr>\n";
    if (InfotextFahrzeit || InfotextFahrzeitOpt) 
    { Info += InfoVorspann + "Anfahrzeiten</th><td>"
      if (InfotextFahrzeit) Info += "notwendige Fahrzeuge " + InfotextFahrzeit;
      if (InfotextFahrzeit && InfotextFahrzeitOpt) Info += "<br>";
      if (InfotextFahrzeitOpt) Info += "optionale Fahrzeuge " + InfotextFahrzeitOpt;
      Info += "</td></tr>\n";
    }
    if (InfotextNichtVerfuegbar) Info += InfoVorspann + "<font color='red'>nicht verfügbar</font></th><td><font color='red'>" + InfotextNichtVerfuegbar + "</font></td></tr>\n";
    
    Info += "</table>\n";
    Info += "<a href='" + adr + "&mode=konfigurieren'>Einsatzinfo konfigurieren</a><br>\n";
    mylog("Info=\n" + Info);
    
    // Infobereich in die Seite einbauen
    var InfoBereich;
    InfoBereich = document.getElementById("InfoBereich");
    if (InfoBereich)
    { InfoBereich.innerHTML = Info;
    }
    else
    { InfoBereich = document.createElement("div");
      InfoBereich.id = "InfoBereich";
      EinsatzDiv.parentNode.insertBefore(InfoBereich,Einsatz.nextSibling);
      InfoBereich.innerHTML = Info;
    }
    document.getElementById("machVorschlag").addEventListener ( "click" , machVorschlag_clicked , false ) ;
  }
  ichBins = false;
}

function machVorschlag_clicked(e)
{ machVorschlag = document.getElementById("machVorschlag").checked;
  // löschen aller Hervorhebungen in der Liste freier Fahrzeuge:
  var MC=document.getElementById("mission_content");
  var Divs = MC.getElementsByTagName("div");
  var Div=Divs[Divs.length - 1];
  var TB=Div.getElementsByTagName("table")[0];
  for each (TR in TB.getElementsByTagName("tr"))
  { var CB=TR.getElementsByTagName("input")[0];
    if (CB) { CB.checked=false; CB.alt=undefined;}
    for each (TD in TR.getElementsByTagName("td"))
    { TD.bgColor = undefined;
    }
  }
  main();
}

function FillAlarmListe(Einsatzklasse)
{ mylog("FillAlarmListe(" + Einsatzklasse + ")");
  var FZ = getFahrzeugListe(Einsatzklasse);
  ToAlarm = new Array;
  Optional = new Array;
  
  var Teile = FZ.split("|");
  ToAlarm = Teile[0].split(",");
  if (Teile.length > 1) Optional = Teile[1].split(",");
  return;
}

function AddNachforderungen()
{ var D = document.getElementById("mission_reply");
  if (D==undefined) return "";
  var TB = D.getElementsByTagName("table");
  if (TB.length == 0) return "";
  var TRs = TB[0].getElementsByTagName("tr");

  for (var z=1;z<TRs.length;z++)
  { var TR=TRs[z];
    if (TR.getElementsByTagName("td").length>=2)
    {
      var RM = TR.getElementsByTagName("td")[2].innerHTML;
      if (RM != undefined)
      { var NFFZ = getNachforderungFahrzeug(RM);
        if (NFFZ != "") 
        { // prüfen, ob das FZ schon eingebunden ist
          if (FZinEinsatz(NFFZ)) NFFZ="";
          if (NFFZ != "")
          {
            ToAlarm.push(NFFZ);
            return NFFZ;
          }
        }
      }
    }
  }
  return "";
}

function FZinEinsatz(FZ)
{ mylog ("FZinEinsatz(" + FZ + ")");
  mylog ("ToAlarm="+ToAlarm+"\nUnterwegs="+Unterwegs);

  var FZistDrin = false;

  for each (FZA in ToAlarm)
  { var A = FZA.split("/");
    for each (F in A)
    { if (F == FZ) FZistDrin = true; 
    }
  }
  for each (U in Unterwegs)
  { if (U == FZ) FZistDrin = true;
  }
  mylog("returns:"+FZistDrin);
  return FZistDrin;
}

function FillUnterwegsListe()
{ Unterwegs = new Array;
  var divnames = new Array;
  divnames.push ("mission_vehicle","driving_vehicle","waiting_vehicle");
  
  for each (dn in divnames)
  { var d = document.getElementById(dn);
    if (d.getElementsByTagName("table").length == 1)
    { var TB=d.getElementsByTagName("table")[0];
      for each (TR in TB.getElementsByTagName("tr"))
      { var FZ;
        try 
        { var FZ=TR.getElementsByTagName("td")[1].innerHTML; 
          FZ = getFahrzeugKlasse(FZ);
          Unterwegs.push(FZ);
        } catch(e) {};
      }
    }
  }
  
}

function bereinigeToAlarm()
{ // Alternativ-FZ in ToAalrm ans Ende stellen:
  mylog("vorher:"+ToAlarm);
  for (var ta=0; ta<ToAlarm.length; ta++)
  { if (ToAlarm[ta].indexOf("/") != -1) ToAlarm[ta] = "ZZZ/" + ToAlarm[ta]; }
  ToAlarm = ToAlarm.sort();
  for (var ta=0; ta<ToAlarm.length; ta++)
  { if (ToAlarm[ta].indexOf("ZZZ/") != -1) ToAlarm[ta] = ToAlarm[ta].substring(4,100); }
  mylog("nachher:"+ToAlarm);

  // ebenso in Optional:
  mylog("vorher:"+Optional);
  for (var ta=0; ta<Optional.length; ta++)
  { if (Optional[ta].indexOf("/") != -1) Optional[ta] = "ZZZ/" + Optional[ta]; }
  Optional = Optional.sort();
  for (var ta=0; ta<Optional.length; ta++)
  { if (Optional[ta].indexOf("ZZZ/") != -1) Optional[ta] = Optional[ta].substring(4,100); }
  mylog("nachher:"+Optional);
  
  var gefunden=false;
  
  for each (FZ in Unterwegs)
  { gefunden=false;
    for (var i=0; i<ToAlarm.length; i++)
    { var ALT = ToAlarm[i].split("/");
      mylog("prüfe FZ (" + FZ + ") in ALT (" + ALT + ")");
      for (a=0; a<ALT.length; a++)
      { if (FZ == ALT[a]) 
        { ToAlarm.splice(i,1); i=ToAlarm.length;
          gefunden=true;
        }
      }
    }
    if (!gefunden)
    { for (var i=0; i<Optional.length; i++)
      { var ALT = Optional[i].split("/");
        mylog("prüfe FZ (" + FZ + ") in ALT (" + ALT + ")");
        for (a=0; a<ALT.length; a++)
        { if (FZ == ALT[a]) 
          { Optional.splice(i,1); i=Optional.length;
            gefunden=true;
          }
        }
      }
    }
  }
  mylog("\nNACHHER: ToAlarm=" + ToAlarm + "\nUnterwegs=" + Unterwegs);
}

function Verletzte()
{ var TB = document.getElementById("mission_content").getElementsByTagName("table")[0];
  for (var i=0; i<TB.getElementsByTagName("tr").length; i++)
  { var TR = TB.getElementsByTagName("tr")[i];
    if (TR.getElementsByTagName("th")[0].innerHTML == "Verletzte")
    { var T = TR.getElementsByTagName("td")[0].innerHTML;
      var pos = T.indexOf("Personen - für jede Person") - 5;
      T = T.substr(pos,5);
      var Anz = parseInt(T);
      return Anz;
    }
  }
  return 0;
}

function getFahrzeugKlasse(Fahrzeugname)
{ mylog("getFahrzeugKlasse(" + Fahrzeugname + ")");
  var FZ = Fahrzeugklassen[Fahrzeugname];
  if (FZ == undefined) FZ=Fahrzeugname; 
  mylog("returns " + FZ);
  return FZ;
}

function getEinsatzKlasse(Stichwort)
{ if (Alle_F1 == true) return "F1";
  mylog("getEinsatzKlasse(" + Stichwort + ")");
  var EK = Einsatzklassen[Stichwort];
  if (EK == undefined) EK = "undef";
  mylog("returns " + EK);
  return EK;
}

function getNachforderungFahrzeug(Rueckmeldung)
{ mylog("getNachforderungFahrzeug(" + Rueckmeldung + ")");

  var FZ = Nachforderungen[Rueckmeldung];
  if (FZ == undefined) FZ = "";
  mylog("returns " + FZ);
  return FZ;
}

function getFahrzeugListe(EKListe)
{ mylog("getFahrzeugListe(" + EKListe + ")");
  var Klasse="", dazu="", opt="";
  var Teile;
  
  if (EKListe.indexOf("|") != -1)
  { Teile = EKListe.split("|");
    EKListe = Teile[0];
    opt = Teile[1];
  }

  if (EKListe.indexOf("+") != -1)
  { Teile = EKListe.split("+");
    Klasse = Teile[0];
    dazu = Teile[1];
  }
  else
  { var X=getEinsatzklasseFahrzeugliste(EKListe);
    if (X != "")
    { Klasse = EKListe; }
    else
    { dazu = EKListe; }
  }

  mylog("Klasse=" + Klasse + "\ndazu=" + dazu + "\nopt=" + opt);

  Klasse = getEinsatzklasseFahrzeugliste(Klasse);
  if (Klasse != "" && dazu != "") Klasse +=",";
  Klasse += dazu;
  if (opt != "") Klasse += "|" + opt;
  
  mylog("ToAlarm = " + Klasse);

return Klasse;
}

function getEinsatzklasseFahrzeugliste(Einsatzklasse)
{ mylog("getEinsatzklasseFahrzeugliste(" + Einsatzklasse +")");
  var FZL = Einsatzklasse_Fahrzeugzuordnung[Einsatzklasse];
  if (FZL == undefined)
  { mylog ("Einsatzklasse '" + Einsatzklasse + "' nicht definiert!")
    FZL = "";
  }
  mylog("returns " + FZL);
  return FZL;
}

function getStichwort(Text)
{ mylog("getStichwort(" + Text + ")");
  var Stichwort=Text;
  var Teile = Text.split(">");
  if (Teile.length > 1) 
  { Stichwort = Teile[1]; }
  Stichwort = trim(Stichwort);
  return Stichwort;
}

function trim(T)
{ var ret;
  ret = T;
  while ( (ret.substr(0,1) != escape(ret.substr(0,1)) && ret.length>0) )
  { ret = ret.substr(1); }
  return ret;
}

function MarkiereFahrzeuge()
{ var D = document.getElementsByClassName("free_vehicle")[0];
  var TB = D.getElementsByTagName("table")[0];
  var Zeilen = TB.getElementsByTagName("tr");
  var Anfahrt="";
  
  if (TB==undefined) return;
  
  var imax=0;
  var imin=9999;

  for (var opt=0; opt<Optional.length; opt++)
  { var FZ = Optional[opt];
    var AlternativFZ = FZ.split("/");
    var Alternativen = AlternativFZ.length;
    mylog("(opt) suche nach " + AlternativFZ);
    
    for (var i=1; i<Zeilen.length; i++)
    { var ThisZeile = Zeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      var ThisFZ = getFahrzeugKlasse(ThisSpalten[2].innerHTML);
      var passt=false;
      for (var a=0 ; a<Alternativen ; a++) { if (ThisFZ == AlternativFZ[a]) passt = true; }
      if (passt)
      { var C = ThisSpalten[0].getElementsByTagName("input")[0];
        if (C.alt != "x")
        { mylog("(opt) gefunden:" + ThisFZ);
          for (var s=0; s<ThisSpalten.length; s++) ThisSpalten[s].bgColor = "#444422";
          C.alt = "x";
          if (i>imax) imax=i;
          if (i<imin) imin=i;
          i=Zeilen.length;
        } // not checked
      } // FZ passt
    } // for Zeilen
  } // alle Optionalen
  
  if (imax>0)
  { var Zeile = Zeilen[imax];
    Anfahrt = "<font color=#CCCC66>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font>";
    if (imin != imax)
    { Zeile = Zeilen[imin];
      Anfahrt = "zwischen <font color=#CCCC66>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font> und " + Anfahrt;
    }
  }
  
  return Anfahrt;
}  

function AlarmiereFahrzeuge()
{ var D = document.getElementsByClassName("free_vehicle")[0];
  var TB = D.getElementsByTagName("table")[0];
  var Zeilen = TB.getElementsByTagName("tr");
  var Anfahrt="";
  
  if (TB==undefined) return;
  
  var imax=0;
  var imin=9999;
  
  for (var ta=0; ta<ToAlarm.length; ta++)
  { var FZ = ToAlarm[ta];
    var AlternativFZ = FZ.split("/");
    var Alternativen = AlternativFZ.length;
    mylog("suche nach " + AlternativFZ);
    
    for (var i=1; i<Zeilen.length; i++)
    { var ThisZeile = Zeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      var ThisFZ = getFahrzeugKlasse(ThisSpalten[2].innerHTML);
      var passt=false;
      for (var a=0 ; a<Alternativen ; a++) { if (ThisFZ == AlternativFZ[a]) passt = true; }
      if (passt)
      { var C = ThisSpalten[0].getElementsByTagName("input")[0];
        if (C.checked == false)
        { mylog("gefunden:" + ThisFZ);
        
          C.checked = true;
          C.alt="x";
          for (var s=0; s<ThisSpalten.length; s++) ThisSpalten[s].bgColor = "#442222";
          FZ = "gefunden";
          ToAlarm[ta] = "gefunden";
          if (i>imax) imax=i;
          if (i<imin) imin=i;
          i=Zeilen.length;
        } // not checked
      } // FZ passt
    } // for Zeilen
  } // alle ToAlarm

  if (imax>0)
  { var Zeile = Zeilen[imax];
    Anfahrt = "<font color=#CC6666>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font>";
    if (imin != imax)
    { Zeile = Zeilen[imin];
      Anfahrt = "zwischen <font color=#CC6666>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font> und " + Anfahrt;
    }
  }

  for (ta=ToAlarm.length; ta>=0; ta--)
  { if (ToAlarm[ta]=="gefunden") ToAlarm.splice(ta,1); }
  
  return Anfahrt;
}  

function mylog(Text)
{ if (!debugging) return;

  var Jetzt = new Date();
  GM_log(Jetzt.toLocaleString() + "\n" + Text); 
}

function GetVariables(SetThem)
{ mylog("GetVariables");
  var X = GM_getValue("showInfoStichwort");
  if (X == undefined || SetThem == true)
  { SetVariables()
  }

  showInfoKlasseInListe = GM_getValue("showInfoKlasseInListe",true);
  showInfoStichwort = GM_getValue("showInfoStichwort",true);
  showInfoKlasse = GM_getValue("showInfoKlasse",true);
  showInfoKlassenalarm = GM_getValue("showInfoKlassenalarm",true);
  showInfoKlassenalarmOpt = GM_getValue("showInfoKlassenalarmOpt",true);
  showInfoRTW = GM_getValue("showInfoRTW",true);
  showInfoUnterwegs = GM_getValue("showInfoUnterwegs",true);
  showInfoNachforderungen = GM_getValue("showInfoNachforderungen",true);
  showInfoToAlarm = GM_getValue("showInfoToAlarm",true);
  showInfoFahrzeit = GM_getValue("showInfoFahrzeit",true);
  showInfoFahrzeitOpt = GM_getValue("showInfoFahrzeitOpt",true);
  showInfoNichtVerfuegbar = GM_getValue("showInfoNichtVerfuegbar",true);
}

function SetVariables()
{ mylog("SetVariables");

  showInfoKlasseInListe=confirm("Anzeigen der Alarmklasse in der EinsatzLISTE?");

  var T = "Anzeigen in der Einsatzinfo?\n\n";
  showInfoStichwort=confirm(T+"Alarmstichwort");
  showInfoKlasse=confirm(T+"Alarmklasse");
  if (showInfoKlasse)
  { showInfoKlassenalarm=confirm(T+"Vorschläge laut Alarmklasse");
    if (showInfoKlassenalarm)
    { showInfoKlassenalarmOpt=confirm(T+"Anzeige der optionalen Fahrzeuge"); }
    else
    { showInfoKlassenalarmOpt=false; }
  }
  else
  { showInfoKlassenalarm=false;
    showInfoKlassenalarmOpt=false;
  }
  showInfoRTW=confirm(T+"benötigte RTW");
  showInfoUnterwegs=confirm(T+"bereits eingebundene Fahrzeuge");
  showInfoNachforderungen=confirm(T+"Nachforderung von der Einsatzstelle");
  showInfoToAlarm=confirm(T+"zu alarmierende Fahrzeuge");
  showInfoFahrzeit=confirm(T+"Fahrzeit zur Einsatzstelle");
  if (showInfoFahrzeit)
  { showInfoFahrzeutOpt=confirm(T+"Fahrzeit der Optionalen Fahrzeuge zur Einsatzstelle"); }
  else
  { showInfoFahrzeutOpt=false; }
  showInfoNichtVerfuegbar=confirm(T+"benötigte, aber nicht verfügbare Fahrzeuge");

  GM_setValue("showInfoKlasseInListe",showInfoKlasseInListe);
  GM_setValue("showInfoStichwort",showInfoStichwort);
  GM_setValue("showInfoKlasse",showInfoKlasse);
  GM_setValue("showInfoKlassenalarm",showInfoKlassenalarm);
  GM_setValue("showInfoKlassenalarmOpt",showInfoKlassenalarmOpt);
  GM_setValue("showInfoRTW",showInfoRTW);
  GM_setValue("showInfoUnterwegs",showInfoUnterwegs);
  GM_setValue("showInfoNachforderungen",showInfoNachforderungen);
  GM_setValue("showInfoToAlarm",showInfoToAlarm);
  GM_setValue("showInfoFahrzeit",showInfoFahrzeit);
  GM_setValue("showInfoFahrzeitOpt",showInfoFahrzeit);
  GM_setValue("showInfoNichtVerfuegbar",showInfoNichtVerfuegbar);
}

function Verbandseinsatz()
{ var User="X";
  var ret=false;

  var Obj = document.getElementById("navigation_top");
  if (Obj) Obj = Obj.getElementsByTagName("ul")[0];
  if (Obj) Obj = Obj.getElementsByTagName("ul")[0];
  if (Obj) Obj = Obj.getElementsByTagName("li")[0];
  if (Obj) Obj = Obj.getElementsByTagName("a")[0];
  if (Obj) Obj = Obj.innerHTML;
  if (Obj) User = Obj.replace(/Benutzer: /,"");
  mylog("User = " + User);

  Obj = document.getElementById("mission_content");
  if (Obj) Obj = Obj.getElementsByTagName("table")[0];
  if (Obj)
  { var TRs=Obj.getElementsByTagName("tr");
    for (var t=0;t<TRs.length;t++)
    { var TR=TRs[t];
      var THText = TR.getElementsByTagName("th")[0].innerHTML;
      if (THText == "Einsatz von")
      { var UserEinsatz="Y";
        Obj = TR.getElementsByTagName("td")[0];
        if (Obj) Obj = Obj.getElementsByTagName("a")[0];
        if (Obj) UserEinsatz=Obj.innerHTML;
        if (User != UserEinsatz) ret=true;
      }
    }
  }

  mylog("Verbandseinsatz=" + ret);
  return ret;
}

function init()
{ ToAlarm="";
  NichtVerf="";

  mylog ("init startet");
  document.addEventListener("DOMNodeInserted", nodeInserted, false);
  GetVariables(false);
}

function nodeInserted(e)
{ 
  if (ichBins) return;
  if (gettingVars) return;
  
  mylog ("nodeInserted, e=" + e.target.innerHTML.substr(0,100));
  
  // reload auf Übersichtseite hat stattgefunden:
  if (e.target.innerHTML == "Einsätze deines Verbandes")
  { window.setTimeout(main, 10);
    return;
  }
  // reload auf Einsatzseite hat stattgefunden:
  if (e.target.innerHTML.indexOf("<h2>Freie Fahrzeuge</h2>") > 0)
  { window.setTimeout(main, 10);
    return;
  }
  mylog("HREF=" + document.location.href + "\nInserted: " + e.target.innerHTML.substr(0,100));
}