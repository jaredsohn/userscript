// ==UserScript==

// @name           AAOBrandenburg
// @namespace      
// @description    Alarmordnung BAD
// @include        http://www.feuerwache.net/feuerwehr-einsaetze/*
// @version        2009-11-11 15:00

// ==/UserScript==

// UMLAUTE-TEST:  äöüÄÖÜß

var ToAlarm = new Array;
var ToAlarm2 = new Array;

//GM_log(document.location.href);

// auf der Einsatz-Übersichtseite alle Einsätze mit ihrer Art kennzeichnen:
if (document.location.href == "http://www.feuerwache.net/feuerwehr-einsaetze")
{ for each (TD in document.getElementsByTagName("td"))
  { for each (A in TD.getElementsByTagName("a"))
    { if ( A.href.indexOf("http://www.feuerwache.net/feuerwehr-einsaetze/") == 0)
      { TD.innerHTML += "&nbsp;<font color='red'>(" + Art(A.innerHTML) + ")</font>";
      }
    }
  }
}
else
{ Alarmiere();
}

function Alarmiere()
{
  // Einsatzstichwort auslesen
  var EinsatzDiv = document.getElementById("mission_content");
  var Einsatz = document.getElementsByTagName("h1")[0];
  var Einsatzstichwort = Einsatz.innerHTML;
  var Einsatzart = Art(Einsatzstichwort);
  // Einsatzart in Webseite anzeigen:
  // neuen Abschnitt anlegen:
  var InfoBereich = document.createElement("h2");
  InfoBereich.innerHTML = "Einsatzinfos";
  EinsatzDiv.parentNode.insertBefore(InfoBereich,Einsatz.nextSibling);
  var Infos = document.createElement("p");
  EinsatzDiv.parentNode.insertBefore(Infos,InfoBereich.nextSibling);
  Infos.innerHTML = "Einsatzart: <b><font color='red'>" + Einsatzart + "</font></b><br>";
  
  // Fahrzeuge gemäß AAO planen :
  PushFahrzeuge(Einsatzart);

  Infos.innerHTML += "Fahrzeuge: " + ToAlarm + "<br>";
  if (ToAlarm2.length > 0) { Infos.innerHTML += "optional: " + ToAlarm2 + "<br>"; }
  
  if (neuerEinsatz()) 
  { // Fahrzeuge alarmieren:
    var Dauer = AlarmiereFahrzeuge();
    Infos.innerHTML += Dauer + "<br>";
  }
  
  return;
}

/***************************************************/

function Art(Stichwort)
{ 
  //GM_log("original: " + Stichwort);

  var Teile = Stichwort.split(">");
  if (Teile.length > 1) 
  { Stichwort = Teile[1]; }
  //GM_log("neu: " + escape(Stichwort));
  
  Stichwort = trim(Stichwort);
  //GM_log("trim: " + escape(Stichwort));
  
  
  switch (Stichwort) 
  {
    case "Person im Fluss":
    case "PKW in Fluss":
      return "Wasser-1";

    case "Auffahrunfall":
    case "Keller unter Wasser":
    case "Baum auf Auto":
    case "Baum auf Straße":
    case "Baum auf Dach":
      return "TH-1";

    case "Fahrstuhl - Türöffnung":
      return "TH-1+RW";

    case "undef":
    case "Brennender Sicherungskasten":
    case "Brennende Bäume":
    case "Brennende Telefonzelle":
    case "Brennendes Gras":
    case "Containerbrand":
    case "Container Brand":
    case "Feuer im Laubhaufen":
    case "Gartenlaubenbrand":
    case "Motorradbrand":
    case "Mülleimerbrand":
    case "Mülleimer Brand":
    case "Sperrmüllbrand":
    case "Brennender LKW":
    case "Brennender PKW":
    case "PKW-Brand":
    case "Motorrad-Brand":
    case "Strohballen Brand":
    case "Traktorbrand":
    case "Feldbrand":
    case "Kleiner Waldbrand":
    case "Brand in Briefkasten":
    case "Brennender Müllwagen":
    case "Wohnwagenbrand":
    case "Mähdrescherbrand":
    case "Trocknerbrand":
    case "Garagenbrand":    
    case "Kioskbrand":    
    case "Brennendes Gebüsch":
      return "F-1";


    case "Verkehrsunfall":
      return "TH-2";

    case "lspur":
      return "ÖL-Land";
      
    case "Kellerbrand":
    case "Brand auf Weihnachtsmarkt":
      return "F-2";

    case "Dachstuhlbrand":
    case "Schornsteinbrand":
    case "Kaminbrand":
     return "F-2+DL";

    case "Fettbrand in Pommesbude":
    case "Schuppenbrand":
    case "Brand in KFZ-Werkstatt":
    case "Gastronomiebrand":
    case "Brand-Weihnachtsbaum in Kirche":
      return "F-2+TLF";

    case "Scheunenbrand":
    case "Silobrand":
    case "Brand im Supermarkt":
    case "Brand in Spedition":
    case "Brand in Autohaus":
    case "Brand in Druckerei":
      return "F-3";
    
    case "Brand in Schule":
    case "Feuer im Altenheim":
    case "Kinobrand":
    case "Wohnungsbrand":
    case "Brand in Sporthalle":
    case "Brand im Sägewerk":
    case "Gewerbebrand":
    case "Brand im Baumarkt":
    case "Brand in Zugdepot":
    case "Brand in Lackfabrik":
    case "Brand in Schloss":
    case "Brand in Kletterhalle":
    case "Feuer im Krankenhaus":
    case "Brand im Casino":
      return "F-4";

    case "Wohnblockbrand":
      return "F-5";

    
    case "Chlorgas Alarm (Schwimmbad)":
    case "Chemieunfall (an Schule)":
      return "GSG";

    case "Brennende S-Bahn":
      return "TH-Schiene";
    
  }
  GM_log ("undef. Einsatz: " + Stichwort);
  return ("<font color='red'>undef: " + Stichwort + "</font>");
}


function PushFahrzeuge(Einsatzart)
{
  switch (Einsatzart)
  {
    case "ÖL-Land":
      ToAlarm.push("LF","GW-Öl");
      break;
    case "Wasser-1":
      ToAlarm.push("LF","GW-Taucher");
      break;
    case "TH-1":
      ToAlarm.push("LF");
      break;
case "TH-1+RW":
      ToAlarm.push("LF","RW");
      break;
    case "F-1":
      ToAlarm.push("LF");
      break;
    case "TH-2":
      ToAlarm.push("LF","RW","GW-Öl");
      break;
    case "F-2":
      ToAlarm.push("LF","TLF");
      break;
    case "F-2+DL":
      ToAlarm.push("LF","LF","DL","ELW");
      break;
    case "F-2+TLF":
      ToAlarm.push("LF","LF","ELW","TLF");
      break;
    case "F-3":
      ToAlarm.push("TLF","LF","LF","ELW","DL");
      break;
    case "F-4":
      ToAlarm.push("LF","LF","TLF","ELW","DL","GW-A","LF");
      break;
    case "F-5":
      ToAlarm.push("LF","LF","TLF","LF","ELW","DL","GW-A","LF");
      break;
    case "GSG":
      ToAlarm.push("LF","LF","ELW","GW-G","GW-Mess","RW");
      break;
    case "TH-Schiene":
      ToAlarm.push("LF","LF","ELW","GW-S","TLF");
      break;
  }
}


function Typ(Fahrzeug)
{
  switch (Fahrzeug)
  {
    case "LF 8":
    case "LF 10/6":
    case "LF 20/16":
    case "Kleinlöschfahrzeug":
      return "LF";
    case "LF 16-TS":
      return "TS";
    case "DLA (K) 23/12":
      return "DL";
    case "TLF 20/40 - SL":
      return "TLF";
    case "GW-L2 - Wasser":
      return "GW-W";
    case "ELW 1":
      return "ELW";
    case "GW-Gefahrgut":
      return "GW-G";
    case "GW-Messtechnik":
      return "GW-Mess";
    case "GW-Schiene":
      return "GW-S";
    case "GW-Taucher":
      return "GW-Taucher"

  }
  return (Fahrzeug);
}


function AlarmiereFahrzeuge()
{
  var Divs = document.getElementsByTagName("div");
  var D;
  for (i=1 ; i<Divs.length ; i++ )
  { if (Divs[i].id == "waiting_vehicle") D=Divs[i+1]; }
  var T = D.getElementsByTagName("table")[0];
  var Zeilen = T.getElementsByTagName("tr");
  var maxi=0;
  var FZ_fehlen = "";
  var LastZeile = "";

  while (ToAlarm.length > 0)
  { 
    var FZ = ToAlarm.pop();
    var AlternativFZ = FZ.split("/");
    var Alternativen = AlternativFZ.length;

//GM_log("nächstes Fahrzeug: " + FZ);
//GM_log("Alternativen: " + Alternativen + ", " + AlternativFZ);
    
    for (var i=1; i<Zeilen.length ; i++ ) 
    { 
      var Zeile = Zeilen[i];
      var TDs = Zeile.getElementsByTagName("td");
      var ThisFZ = Typ(TDs[2].innerHTML);
      
      var passt=false;
      for (var a=0 ; a<Alternativen ; a++) { if (ThisFZ == AlternativFZ[a]) passt = true; }
      if (passt)
      { var C = TDs[0].getElementsByTagName("input")[0];
        if (C.checked==false)
        { C.checked = true;
          
          FZ = "gefunden";
          if (i>maxi) 
          { maxi=i;
            LastZeile = Zeile;
          }
          i  = Zeilen.length;
          TDs[2].innerHTML = "<font color='red'>" + TDs[2].innerHTML + "</font>";
        }
      }
    }
    if (FZ != "gefunden")
    { 
      FZ_fehlen = FZ_fehlen + ", " + FZ;
    }
  }
  if (LastZeile != "") 
  { LastZeile.getElementsByTagName("td")[2].innerHTML = "<b>" + LastZeile.getElementsByTagName("td")[2].innerHTML + "</b>"; }

  var Anfahrt = "";
  if (maxi > 0)
  { Anfahrt = "Anfahrtzeit bis zu " + Zeilen[maxi].getElementsByTagName("td")[4].innerHTML; }
  
  if (FZ_fehlen != "")
  { FZ_fehlen = FZ_fehlen.slice(2);
    Anfahrt += "<br><b>es fehlt/fehlen: " + FZ_fehlen + "</b>";
  }
  
  while (ToAlarm2.length>0)
  {
    var FZ = ToAlarm2.pop();
    var AlternativFZ = FZ.split("/");
    var Alternativen = AlternativFZ.length;

//GM_log("nächstes Fahrzeug: " + FZ);
//GM_log("Alternativen: " + Alternativen + ", " + AlternativFZ);
    
    for (var i=1; i<Zeilen.length ; i++ ) 
    { 
      var Zeile = Zeilen[i];
      var TDs = Zeile.getElementsByTagName("td");
      var ThisFZ = Typ(TDs[2].innerHTML);
      
      var passt=false;
      for (var a=0 ; a<Alternativen ; a++) { if (ThisFZ == AlternativFZ[a]) passt = true; }
      if (passt)
      { var C = TDs[0].getElementsByTagName("input")[0];
        if (C.checked==false)
        { FZ = "gefunden";
          i  = Zeilen.length;
          TDs[2].innerHTML = "<font color='yellow'>" + TDs[2].innerHTML + "</font>";
        }
      }
    }

  }
  return Anfahrt;
}


function neuerEinsatz()
{
var div, h2;
var exit=false;

  div = document.getElementById("mission_vehicle");
  h2  = div.getElementsByTagName("h2");
  if (h2.length>0)
  { // Fahrzeuge sind am Ort
    return false;
  }

  div = document.getElementById("driving_vehicle");
  h2  = div.getElementsByTagName("h2");
  if (h2.length>0)
  { // Fahrzeuge sind unterwegs
    return false;
  }

  div = document.getElementById("waiting_vehicle");
  h2  = div.getElementsByTagName("h2");
  if (h2.length>0)
  { // Fahrzeuge warten auf Personal
    return false;
  }
  return true;
}

function trim(T)
{ var ret = T;
  var C;

  while ( (ret.substr(0,1) != escape(ret.substr(0,1)) && ret.length>0) )
  { ret = ret.substr(1);
  }

  return ret;
}