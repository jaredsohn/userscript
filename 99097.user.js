// ==UserScript==
// @name           gondal.fight
// @author         PP2000
// @version        0.7g
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// == GONDAL - Offiziell ==
// @include        http://w1.gondal.de/*
// @include        http://w2.gondal.de/*
// @include        http://w3.gondal.de/*
// @include        http://www.gondal-de.de/*
// == GONDAL - Speedwelt ==
// @include        http://s1-2.gondal.de/*
// @include        http://s1-1.gondal.de/*
// @include        http://s1-0.gondal.de/
// @include        http://s1.gondal.de/*
// == Andere Spiele (ohne Garantie, da ich sie selber nicht spiele!)
// @include        http://www.lastemperor.de/*
// @include        http://w2.last-emperor.de/*
// @description    Dieses Skript ist in der Lage die Arenakämpfe bei Gondal vollständig zu übernehmen, insofern gewünscht.
// @description    Für eventuelle negative Folgen der Nutzung dieses Skripts übernehme ich keinerlei Verantwortung. 
// ==/UserScript==

// Für diese Script benötigen Sie Firefox 3.x und Greasemonkey https://addons.mozilla.org/de/firefox/addon/748

// Anzugreifender Gegner  
var GegnerFerono = ""; 
var GegnerThur   = "";
var GegnerVenja  = "";
var GegnerSahscria = "";  // w3.gondal.de

var GegnerSpeed0 = "";    // s1.gondal.de
var GegnerSpeed1 = "";    // s1-0.gondal.de
var GegnerSpeed2 = "";    // s1-1.gondal.de
var GegnerSpeed3 = "";    // s1-2.gondal.de

var LastEmperorW1  = "";
var LastEmperorW2  = "";

// Kampf mit oder ohne MK's (true = mit MKs, false = ohne MKs .. sprich warten)
// Anz{Server} = 
//     0  = keine MK's verwenden
//     "unlimited"  = MK's verwenden, bis keine mehr vorhanden sind
//     ""   = der davor angegebene Wert wird storniert! (nötig, wenn eine Anzahl angegeben wurde,
//            die dann verbraucht, wurde!) .. eine Art Reset, des MK'VerbrauchsCounter!!!
//          TIP:  "" eingeben => Seite neuladen => Anzahl eingeben => Seite neu laden
//    Zahl grösser 0  = eine bestimmte Anzahl MK's die aufgebraucht werden soll
        
MKThur = false;     // Thur
AnzThur = 5;
MKFerono = false;    // Ferono
AnzFerono = 0;
MKVenja = false;     // Venja
AnzVenja = "unlimited";
MKSahscria = false; // Sahscria
AnzSahscria = "unlimited"
MKSpeed0 = false;   // s1.gondal.de
AnzSpeed0 = 0;
MKSpeed1 = false;   // s1-0.gondal.de
AnzSpeed1 = 0;
MKSpeed2 = false;   // s1-1.gondal.de
AnzSpeed2 = 0;
MKSpeed3 = false;   // s1-2.gondal.de
AnzSpeed3 = 0;

//////////////////////////////////////
// Ab hier bitte nichts mehr ändern //
//////////////////////////////////////

// Wähle Gegner
function SelectGegner(gegner) {
  if (gegner.indexOf(";") != -1)
  {
    var GegnerArray = gegner.split(";");
    //length - 1 da array 0-basierend
    var gegnerArrayPos = Randomize(0, GegnerArray.length -1);
    return GegnerArray[gegnerArrayPos];
  } else {
    return gegner;
  }
}

// MK's fuer Fight ermitteln
function EvalMKs(server,defAnz) {
  var Anzahl = GM_getValue(server);
  var MKAvail = document.getElementById("currentCrystals").innerHTML;
  if(MKAvail==0) {
    // Keine MK's zur Verfuegung, kein MKKampf!
    GM_deleteValue(server);
    return false;
  } 
  // Reset der MKAnzahl 
  if(defAnz=="") {
    GM_deleteValue(server);
    return false;
  }
  // Bei Aenderung von unlimited in definierte Anzahl
  if(Anzahl=="unlimited" && defAnz!="unlimited") {
    GM_setValue(server,defAnz);
    Anzahl = defAnz;
  }
  // Unlimited MK's
  if(defAnz=="unlimited") {
    GM_setValue(server,"unlimited");
    return true;
  }
  // Anzahl MK's verbraucht, oder abgearbeitet
  if(Anzahl==0 || defAnz==0) { return false; }
  
  if(Anzahl==null) {
    // Variable nicht gesetzt
    if(defAnz>0) {
      // Default MK's Zahl angegeben
      if(defAnz>=MKAvail) {
        // Mehr angegeben als verfuegbar
        GM_setValue(server,MKAvail-1);
        return true;
      }
      if(defAnz<MKAvail) {
        // Weniger MK's angegeben als verfuegbar
        GM_setValue(server,defAnz-1);
        return true;
      }
    }
  }
  // Sind noch MKs uebrig
  if(Anzahl>0) {
    GM_setValue(server,Anzahl-1);
    return true;
  }
}

// Zeitrandomisierungsfunktion
function Randomize( from, to) {
  // Zeitrückgabe .. in Millisekunden
  return( from + parseInt( Math.random() * (to - from + 1)));
}

// Weiterleitung auf die nächste Seite
function SeitenRedirect(redir_to) {
  window.setTimeout('window.location.pathname = "' + redir_to + '"', Randomize(1000,5000));
}

// Weiterleiten auf die Gegenersuche, wenn Gondalsweiterleitung nicht funktioniert oder stecken bleibt
function KampfRedirect(time) {
  window.setTimeout('window.location.pathname = "/fights/start"',time);
}

// Differenzieren bei result
if(window.location.pathname.split("/")[2] == "results") {
  var pathname = "/fights/results";
} else {
  var pathname = window.location.pathname;
}

// Unterschiedliche Handlungen bei unterschiedlichen Seiten 
switch(pathname) {
  case "/fights/start":
    //alert ("Hier Suche ich den Gegner");
    document.getElementsByName("data[Character][granularity]")[0].selectedIndex = 1;
    var Gegner = document.getElementsByName("data[Character][name]")[0].value;
    if(Gegner!="") {
        // Ziel gegner auslesen
        var gegnerZiel = document.getElementsByName("data[Character][name]")[0].value;
        // Schleife ueber Ergebnisliste
        var notsearched = false;
        var gefunden = false;
        for(var x = 0;x<35;x++) {
          if(typeof(document.getElementById("search").getElementsByTagName("a")[x])!="undefined") {
            var gegnerName = document.getElementById("search").getElementsByTagName("a")[x].innerHTML;
            if(gegnerName.substring(0,4)=="<img") {
              x++;
              gegnerName = document.getElementById("search").getElementsByTagName("a")[x].innerHTML;
            }
            x++;
            if(typeof(document.getElementById("search").getElementsByTagName("a")[x])!="undefined") {
              var Gegnerlink = document.getElementById("search").getElementsByTagName("a")[x].pathname;
            } else {
              notsearched = true;
            }
          }
          if(gegnerZiel==gegnerName) {
            // nur wenn der Zielgegen dem Eintrag entspricht angreifen!    
            SeitenRedirect(Gegnerlink);
            var gefunden = true;
          }         
          x++;
        } 
        if(gefunden==false && notsearched==false) { alert("Gegner wurde nicht gefunden, achten Sie auf Gross/Kleinschreibung"); }
    } else {   
      switch(document.location.hostname) {
        // Regulaere Welten Gondal
        case "www.gondal-de.de":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(GegnerThur) ;
          break;
        case "w1.gondal.de":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(GegnerFerono);
          break;
        case "w2.gondal.de":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(GegnerVenja) ;
          break;
        case "w3.gondal.de":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(GegnerSahscria) ;
          break;
        // Speedwelten - Gondal
        case "s1.gondal.de":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(GegnerSpeed0) ;
          break;
        case "s1-0.gondal.de":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(GegnerSpeed1) ;
          break;
        case "s1-1.gondal.de":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(GegnerSpeed2) ;
          break;
        case "s1-2.gondal.de":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(GegnerSpeed3) ;
          break;
        // Andere Spiele
        case "www.lastemperor.de":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(LastEmperorW1) ; 
          break;
        case "w2.last-emperor.de":
          document.getElementsByName("data[Character][name]")[0].value = SelectGegner(LastEmperorW2) ; 
          break;
      } 
      if(document.getElementsByName("data[Character][name]")[0].value!="") {
        window.setTimeout('document.getElementsByTagName("form")[1].submit()',Randomize(3000,5000));
      } 
    }
    break;
  // Seite: Character Gefunden   
   case "/fights/searchCharacter":
     SeitenRedirect(document.getElementsByTagName("a")[1].pathname);
     break;
  // Seite des Kampfes
  case "/fights/fight":
     // Quelltext einlesen in dem die Weiterleitung steht
     var dsrc = document.getElementById("gondal_layout_content").innerHTML;
     var posStart = dsrc.indexOf("/fights/results/");
     var posEnd   = dsrc.indexOf(" class=\"button_125px\"",posStart);
     var showRes  = dsrc.substr(posStart,posEnd - posStart-1);
     SeitenRedirect(showRes);
     break;
  // Seite des Ergebnisses
  case "/fights/results":  
    SeitenRedirect("/fights/start");
    break;
  // Seite auf nächsten Kampf warten
  case "/fights/waitFight":
    switch(document.location.hostname) {            
        // Regulaere Welten Gondal
        case "www.gondal-de.de":
          if(MKThur==true && EvalMKs("MKThur",AnzThur)==true) { SeitenRedirect("/fights/waitFight/buy"); }
          break;
        case "w1.gondal.de":
          if(MKFerono==true && EvalMKs("MKFerono",AnzFerono)==true) { SeitenRedirect("/fights/waitFight/buy"); }
          break;
        case "w2.gondal.de":
          if(MKVenja==true && EvalMKs("MKVenja",AnzVenja)==true) { SeitenRedirect("/fights/waitFight/buy"); }
          break;
        case "w3.gondal.de":
          if(MKSahscria==true && EvalMKs("MKSahscria",AnzSahscria)==true) { SeitenRedirect("/fights/waitFight/buy"); }
          break;
        // Speedwelten - Gondal
        case "s1.gondal.de":
          if(MKSpeed0==true && EvalMKs("MKSpeed0",AnzSpeed0)==true) { SeitenRedirect("/fights/waitFight/buy"); }
          break;
        case "s1-0.gondal.de":
          if(MKSpeed1==true && EvalMKs("MKSpeed1",AnzSpeed1)==true) { SeitenRedirect("/fights/waitFight/buy"); }
          break;
        case "s1-1.gondal.de":
          if(MKSpeed2==true && EvalMKs("MKSpeed2",AnzSpeed2)==true) { SeitenRedirect("/fights/waitFight/buy"); }
          break;
        case "s1-2.gondal.de":
          if(MKSpeed3==true && EvalMKs("MKSpeed3",AnzSpeed3)==true) { SeitenRedirect("/fights/waitFight/buy"); }
          break;    
    }
    //start_timer('remaining', 200, 'location.href = "/fights/start";', 0, 1);
    // Quelltext einlesen in dem 'Wartezeit zum Kampf steht ..'
    var dsrc = document.getElementById("wrapper").innerHTML;
    // String 'remaining' suchen, position bestimmen, "," nach der Wartezeit (in sek) suchen,
    // auslesen, und auf die Seite /fights/start weiterleiten, + 2 sek, sobald die Wartezeit vorbei ist
    // Diese Routine dient lediglich dazu, sollte mal das weiterleiten seitens Gondal stecken, was vorkommen kann.
    var posStart = dsrc.indexOf("'remaining'") + 13;
    var posEnd = dsrc.indexOf(",",posStart);
    var tmleft = dsrc.substr(posStart, posEnd - posStart);
    tmleft = parseInt(tmleft) * 1000 + 2000;
    KampfRedirect(tmleft);
    break;
}