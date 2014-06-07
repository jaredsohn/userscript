// ==UserScript==
// @name           gondal.quest
// @author         PP2000
// @version        0.2a
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// == GONDAL - Offiziell ==
// @include        http://w1.gondal.de/*
// @include        http://w2.gondal.de/*
// @include        http://w3.gondal.de/*
// @include        http://www.gondal-de.de/*
// @description    Dieses Script ist in der Lage Quests automatisch auszuführen.
// @description    Für eventuelle negative Folgen der Nutzung dieses Skripts übernehme ich keinerlei Verantwortung. 
// ==/UserScript==

// Für diese Script benötigen Sie Firefox 3.x und Greasemonkey https://addons.mozilla.org/de/firefox/addon/748

// 1 = Questnummer 1
// 2 = Questnummer 2
// Dungeons sind nicht möglich, da hier ja interaktion gefragt ist!
// Maximal 6-Quests: 1,2,1,1,2,1
var QuestsFerono   = "1";  // w1.gondal.de
var QuestsThur     = "1,2,2";  // www.gondal-de.de
var QuestsVenja    = "";  // w2.gondal.de
var QuestsSahscria = "1,1,1,1,1,1";  // w3.gondal.de

// Wer mehr machen will, kann hier die Anzahl der MK's definieren, (unlimited = bis keine MK's mehr da sind)
// oder eine bestimmte Anzahl (ohne Anführungszeichen), oder "" für keine MK's
var QuestsMKFerono = "";
var QuestsMKThur   = 1;
var QuestsMKVenja  = 5;
var QuestsMKSahscria = "unlimited";

// Angabe der Quests die gemacht werden sollen, eine Zahl (1 oder 2), wenn mit den MK's nur 1 Questtyp gemacht werden soll
// zwei Zahlen (1 oder 2), wenn 2 Questtypen abwechselnd gemacht werden sollen
var QuestsMKTypFerono = "1";        
var QuestsMKTypThur   = "2";
var QuestsMKTypVenja  = "1,2";
var QuestsMKTypSahscria = "2,1";

// Wohin solls am Ende der Quests gehn? Kampfarena (gondal.fight) oder zum Dienst (gondal.service)
// Dienst, Fight
var QFinalFerono   = "Dienst";
var QFinalThur     = "";
var QFinalVenja    = "";
var QFinalSahscria = "Fight";

//////////////////////////////////////
// Ab hier bitte nichts mehr ändern //
//////////////////////////////////////

var server = "";            // Variable fue das GM_Value bei den MK's
var SQuest = new Array();   // Einzelne Quests
var QID    = 0;             // QuestID
var wohin  = "";            // Weiterleitung wohin, wenn Questen vorbei ist
var target = "/quests/finish";

// Zeitrandomisierungsfunktion
function Randomize( from, to) {
  // Zeitrückgabe .. in Millisekunden
  return( from + parseInt( Math.random() * (to - from + 1)));
}

// Weiterleitung auf die nächste Seite
function SeitenRedirect(redir_to) {
  window.setTimeout('window.location.pathname = "' + redir_to + '"', Randomize(1000,5000));
}

// Prüfen ob einer Zahl auf ungrade/grade => Benötigt um zu ermitteln, welcher MK-Quest in Gange ist
var isEven = function(someNumber){
  return (someNumber%2 == 0) ? true : false;
};

// MK's fuer Fight ermitteln
function EvalMKs(defAnz) {
  var Anzahl = GM_getValue(server + "_MKQuest");
  var MKAvail = document.getElementById("currentCrystals").innerHTML;
  if(MKAvail==0) {
    // Keine MK's zur Verfuegung, kein MKKampf!
    GM_deleteValue(server + "_MKQuest");
    return false;
  } 
  // Reset der MKAnzahl 
  if(defAnz=="") {
    GM_deleteValue(server + "_MKQuest");
    return false;
  }
  // Bei Aenderung von unlimited in definierte Anzahl
  if(Anzahl=="unlimited" && defAnz!="unlimited") {
    GM_setValue(server + "_MKQuest",defAnz);
    Anzahl = defAnz;
  }
  // Unlimited MK's
  if(defAnz=="unlimited") {
    GM_setValue(server + "_MKQuest","unlimited");
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
        GM_setValue(server + "_MKQuest",MKAvail-1);
        return true;
      }
      if(defAnz<MKAvail) {
        // Weniger MK's angegeben als verfuegbar
        GM_setValue(server + "_MKQuest",defAnz-1);
        return true;
      }
    }
  }
  // Sind noch MKs uebrig
  if(Anzahl>0) {
    GM_setValue(server + "_MKQuest",Anzahl-1);
    return true;
  }
}

function QuestsAvailable() {
  // Ermittelt die noch verfuegbare Anzahl zu erledigender Quests
  // Quelltext des Bereiches
  var dsrc = document.getElementById("wrapper").innerHTML;
  var posStart = dsrc.indexOf("Tageslimit erreicht");
  if(posStart>-1) {
    // Alle Quests bereits gemacht
    return 6;   
  } else {
    posStart = dsrc.indexOf("heute ");
    var anzahl = dsrc.substr(posStart+6,1);
    return anzahl;  
  }
}

function whichQuest(MKValue,MKQuests) {
  // Ermittelt welcher Quest der naechste ist
  var QAnz = QuestsAvailable();
  if(QAnz<6 && SQuest.length!=0) {
    if(SQuest.length>QAnz) {
      // QuestNr. (1 - 6) ist definiert worden
      QID = SQuest[QAnz++];
    } else if(SQuest.length==QAnz) {
      // Aktuelle Questnummer ist die letzte definierte
      QID = SQuest[QAnz];
    } else if(SQuest.length<QAnz) {
      // Anzahl Questnummern ist geringer somit soll Quest nicht ausgefuehrt werden
      // Optional letzte angegebene Nummer wird fuer alle Nachfolgenden verwendet (??)
      //QID = SQuest[SQuest.length - 1];       
    }
  } else {
    if(MKValue!="" && EvalMKs(MKValue)==true) {
      // Nun die Komplexe Berechnung, welcher Quest nun gemacht werden soll ;)
      if(MKQuests=="") {
        QID = 1;  // Wenn nix angegeben wurde, wird der 1. Quest ausgefuehrt
      } else {
        SQuest = MKQuests.split(",");
        // Questmodus ermitteln, entweder immer der selbe oder etwas Abwechslung ?
        // Anzahl aktiver MK's zur Verwendung + 1 (da davor schon verringert!)
        // Bei Unlimited brauchen wir eine weitere Variable
        var Anzahl = GM_getValue(server + "_MKQuest");
        if(Anzahl=="unlimited") {
          switch(GM_getValue(server + "_MKQuestUnlimited")) {
            case 1:
              GM_setValue(server + "_MKQuestUnlimited",2);
              Anzahl = 1;
              break;
            case 2:
              GM_setValue(server + "_MKQuestUnlimited",1);
              Anzahl = 2;
              break;
            default:
              GM_setValue(server + "_MKQuestUnlimited",2);
              Anzahl = 1;
              break;              
          }
        } else {
          Anzahl++;
        }
        switch(SQuest.length) {
          case 0:
            // Wenn nur eine QuestID angegeben wurde
            QID = SQuest[0];
            break;
          default:
            // Wenn mehrere QuestID's angegeben wurden
            if(isEven(Anzahl)==false) {
              QID = SQuest[0];
            } else {
              QID = SQuest[1];
            }
            break;        
        }
      }
    }
  }
  switch(QID) {
    // Bei QuestTyp2 muss noch aktiv gekämpft werden ;)
    case 1:
      GM_setValue(server + "_QType",1);
      break;
    case 2:
      GM_setValue(server + "_QType",2);
      break;
    default:
      GM_deleteValue(server + "_QType");
      break;
  }
}

function wohinGehts(target) {
  switch(target) {
    case "Dienst":
      wohin = "/services/index";
      break;
    case "Kampf":
      wohin = "/fights/start";
      break; 
  }
}

function init() {
  switch(document.location.hostname) {
    case "w1.gondal.de":
      server = "Ferono";
      if(QuestsFerono!="") {
        SQuest = QuestsFerono.split(","); 
        whichQuest(QuestsMKFerono,QuestsMKTypFerono);
        wohinGehts(QFinalFerono);     
      }
      break;
    case "w2.gondal.de":
      server = "Venja";
      if(QuestsVenja!="") {
        SQuest = QuestsVenja.split(",");
        whichQuest(QuestsMKVenja,QuestsMKTypVenja);
        wohinGehts(QFinalVenja);
      }
      break;
    case "w3.gondal.de":
      server = "Sahscria";
      if(QuestsSahscria!="") {
        SQuest = QuestsSahscria.split(",");
        whichQuest(QuestsMKSahscria,QuestsMKTypSahscria);
        wohinGehts(QFinalSahscria);
      }
      break;
    case "www.gondal-de.de":
      server = "Thur";
      if(QuestsThur!="") {
        SQuest = QuestsThur.split(",");
        whichQuest(QuestsMKThur,QuestsMKTypThur);
        wohinGehts(QFinalThur);
      }
      break;
  }
}  

var pathname = window.location.pathname;

if(pathname==GM_getValue(server + "_target")) {
    target = GM_getValue(server + "_target");
    GM_deleteValue(server + "_target");
}

      var dsrc = document.getElementById("gondal_layout_content").innerHTML;
       var posStart = dsrc.indexOf("(15000, '") + 9;
       var posEnd   = dsrc.indexOf("')",posStart);
       var showRes  = dsrc.substr(posStart,posEnd - posStart);
       alert(showRes);

switch(pathname) {
  case "/quests/start": 
    init();
    if(QID!=0) {
      alert(QID); 
      // Pruefen ob der Quest ueberhaupt verfuegbar ist, ansonsten wird Quest 1 ausgefuehrt
      // Wichtig bei Level < 3, die koennen nur 'Leichte Quests'
      unsafeWindow.currentQuest = QID - 1;
      if(typeof unsafeWindow.quests[unsafeWindow.currentQuest]!="undefined") {
        QID = unsafeWindow.quests[unsafeWindow.currentQuest].questId;
      } else {
        QID = unsafeWindow.quests[0].questId;
      }      
      SeitenRedirect("/quests/start/" + QID); 
    } else if(wohin!="") {
      SeitenRedirect(wohin);
    }
    break;
  case "/quests/doQuest":
    GM_setValue(server + "_target",unsafeWindow.targetURL);
    break;
  case "/quests/fight":
     // Quelltext einlesen in dem die Weiterleitung steht

    //alert(GM_getValue(server + "_target"));
    break;
  case target:
     if(GM_getValue(server + "_QType")==2) {
       var dsrc = document.getElementById("gondal_layout_content").innerHTML;
       var posStart = dsrc.indexOf("(15000, '") + 9;
       var posEnd   = dsrc.indexOf("')",posStart);
       var showRes  = dsrc.substr(posStart,posEnd - posStart);
       GM_setValue(server + "_target",showRes);
       unsafeWindow.startProgressBar(15000, showRes);
    } else {
      // Am ende des Quests, wird das Gold auf die Bank gelegt ;)
      GM_setValue(server + "_Script","gondal.quest");
      SeitenRedirect("/bank/deposit");
    }
    break;
  case "/quests/endText":
      // Am ende des Quests, wird das Gold auf die Bank gelegt ;)
      GM_setValue(server + "_Script","gondal.quest");
      SeitenRedirect("/bank/deposit");
      break;  
  case "/bank/deposit":
    // Sämtliches Gold sofort einzahlen
    document.getElementsByTagName("form")[0].submit();
    break;
  case "/bank/index":
    if(GM_getValue(server + "_Script")=="gondal.quest") {
      GM_deleteValue(server + "_Script");
      window.setTimeout("window.location.pathname = '/quests/start'",1000);
    }
    break;  
} 