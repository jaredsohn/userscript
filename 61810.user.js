// ==UserScript==

// @name           AAOBOARD
// @namespace      
// @description    Alarmordnung REDLICH
// @include        http://www.feuerwache.net/feuerwehr-einsaetze/*
// @version        2009-12-11 23:00

// ==/UserScript==

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
    case "Auffahrunfall":
case "Verkehrsunfall":
case "Ölspur":
return "h - VKU";

case "Keller unter Wasser":
case "Baum auf Auto":
case "Baum auf Straße":
case "Baum auf Dach":
return "h - WSS";

case "Fahrstuhl - Türöffnung":
return "h - Person in Not";

case "Person im Fluss":
return "h - Person im Wasser";

case "Brennender Sicherungskasten":
case "Brennende Telefonzelle":
case "Containerbrand":
case "Container Brand":
case "Gartenlaubenbrand":
case "Mülleimerbrand":
case "Mülleimer Brand":
case "Sperrmüllbrand":
case "Schuppenbrand":
case "Brand in Briefkasten":
return "b - klein";

case "Brennende Bäume":
case "Brennendes Gras":
case "Feuer im Laubhaufen":
case "Strohballen Brand":
case "Feldbrand":
case "Kleiner Waldbrand":
return "b - Ödland";

case "Wohnwagenbrand":
case "Brennender Müllwagen":
case "Motorradbrand":
case "Motorrad-Brand":
case "Brennender LKW":
case "Brennender PKW":
case "Traktorbrand":
return "b - KFZ";

case "Fettbrand in Pommesbude":
case "Brand in KFZ-Werkstatt":
case "Gastronomiebrand":
case "Scheunenbrand":
case "Silobrand":
case "Brand im Supermarkt":
case "Brand in Spedition":
case "Brand in Schule":
case "Feuer im Altenheim":
case "Kinobrand":
case "Brand in Sporthalle":
case "Brand im Sägewerk":
case "Gewerbebrand":
case "Brand im Baumarkt":
case "Kellerbrand":
case "Brand auf Weihnachtsmarkt":
case "Wohnungsbrand":
case "Wohnblockbrand":
case "Brand in Zugdepot":
case "Brand in Autohaus":
case "Brand in Druckerei":
case "Brand in Lackfabrik":
case "Dachstuhlbrand":
case "Schornsteinbrand":
return "b - Gebäude 2";


case "Chlorgas Alarm (Schwimmbad)":
case "Chemieunfall (an Schule)":
return "h - GSG";


case "Brennende S-Bahn":
return "b - Schiene"; 
    
  }
  GM_log ("undef. Einsatz: " + Stichwort);
  return ("<font color='red'>undef: " + Stichwort + "</font>");
}


function PushFahrzeuge(Einsatzart)
{
  switch (Einsatzart)
  {
    case "b - klein":
ToAlarm.push("LF");
break;
case "h - WSS":
ToAlarm.push("LF");
break;
case "h - VKU":
ToAlarm.push("LF","RW","GW-Öl");
break;
case "b - KFZ":
ToAlarm.push("LF","TLF");
break;
case "b - Ödland":
ToAlarm.push("LF","TLF");
break;
case "b - Gebäude 2":
ToAlarm.push("LF","LF","LF","LF","TLF","ELW");
break;
case "h - GSG":
ToAlarm.push("LF","LF","ELW","GW-G","GW-Mess","RW");
break;
case "b - Schiene":
ToAlarm.push("LF","LF","GW-S");
break;
case "h - Person im Wasser":
ToAlarm.push("LF","GW-T");
break;
case "h - Person im Wasser":
ToAlarm.push("LF","GW-T");
break;
case "h - Person in Not":
ToAlarm.push("LF","RW");
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