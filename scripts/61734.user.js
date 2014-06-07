// ==UserScript==

// @name           AAOBAD
// @namespace      
// @description    Alarmordnung BAD (non)
// @include        http://www.feuerwache.net/feuerwehr-einsaetze/*
// @version        2009-11-11 15:00

// ==/UserScript==

// UMLAUTE-TEST:  äöüÄÖÜß

var ToAlarm = new Array;

// Test, auf welcher Seite ich grad bin:
if (document.location.href == "http://www.feuerwache.net/feuerwehr-einsaetze")
{ var T = document.getElementById("mission_content").getElementsByTagName("tbody")[0];
  for each (TD in T.getElementsByTagName("td"))
  { var A = TD.getElementsByTagName("a");
    if (A.length)
    { var EA = Art(A[0].innerHTML);
      EA = "&nbsp;&nbsp;<font color='red'>(" + EA + ")</font>";
      TD.innerHTML += EA;
    }
  }
  
  T = document.getElementById("mission_content").getElementsByTagName("tbody")[1];
  for each (TD in T.getElementsByTagName("td"))
  { var A = TD.getElementsByTagName("a");
    if (A.length)
    { var EA = Art(A[0].innerHTML);
      EA = "&nbsp;&nbsp;<font color='red'>(" + EA + ")</font>";
      TD.innerHTML += EA;
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
  
  // Links für Vorherigen und nächsten Einsatz finden
  var naechsterEinsatz = "", vorherigerEinsatz = "";
  var Links = document.getElementsByTagName("a");
  for each (Link in Links)
  { if (Link.innerHTML == "Vorheriger Einsatz") 
    { vorherigerEinsatz = document.createElement("a");
      vorherigerEinsatz.href = Link.href;
      vorherigerEinsatz.innerHTML = "Vorheriger Einsatz";
    }
    if (Link.innerHTML == "Nächster Einsatz")
    { naechsterEinsatz = document.createElement("a");
      naechsterEinsatz.href = Link.href;
      naechsterEinsatz.innerHTML = "Nächster Einsatz";
    }
  }

  // Fahrzeuge gemäß AAO planen :
  PushFahrzeuge(Einsatzart);

  Infos.innerHTML += "Fahrzeuge: " + ToAlarm + "<br>";
  
  if (neuerEinsatz()) 
  { // Fahrzeuge alarmieren:
    var Dauer = AlarmiereFahrzeuge();
    Infos.innerHTML += Dauer + "<br>";
  }
  
  if (vorherigerEinsatz) Infos.appendChild(vorherigerEinsatz);
  if (vorherigerEinsatz && naechsterEinsatz) Infos.innerHTML += " - ";
  if (naechsterEinsatz) Infos.appendChild(naechsterEinsatz);
  return;
}

/***************************************************/

function Art(Stichwort)
{ //GM_log(Stichwort);
  switch (Stichwort) 
  {
    case "Auffahrunfall":
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
    case "Brennender PKW":
    case "Sperrmüllbrand":
    case "Brennender LKW":
    case "PKW-Brand":
    case "Motorrad-Brand":
    case "Strohballen Brand":
    case "Traktorbrand":
      return "B1";

    case "Verkehrsunfall":
      return "VKU";

    case "Keller unter Wasser":
    case "Baum auf Auto":
    case "Baum auf Straße":
	return "H-Stadt/Land";

      
    case "Scheunenbrand":
    case "Silobrand":
    case "Brand im Supermarkt":
      return "B2";
      
    case "Kellerbrand":
      return "B2-1";


    case "Dachstuhlbrand":
    case "Schornsteinbrand":
     return "B2-DLK";

    case "Fettbrand in Pommesbude":
    case "Brand in KFZ-Werkstatt":
    case "Gastronomiebrand":
      return "B2-TLF";

    
    
    case "Wohnungsbrand":
    case "Brand in Schule":
    case "Feuer im Altenheim":
    case "Kinobrand":
      return "B3";
    

    
    
    case "Brand in Spedition":
    case "Brand in Sporthalle":
    case "Brand im Sägewerk":
    case "Wohnblockbrand":
      return "B4";
    
    
    case "Fahrstuhl - Türöffnung":
      return "TH";
    
    case "Baum auf Dach":
      return "TH-DLK";
      
    case "Chemieunfall (an Schule)":
      return "GSG1";
      
    case "Chlorgas Alarm (Schwimmbad)":
      return "GSG2";
  }
  return ("<font color='red'>undef</font>");
}


function PushFahrzeuge(Einsatzart)
{
  switch (Einsatzart)
  {
    case "B1":
      ToAlarm.push("LF");
      break;
    case "VKU":
      ToAlarm.push("LF","GW-Öl","RW","ELW");
      break;
    case "H-Stadt/Land":
      ToAlarm.push("LF");
      break;
    case "B2":
      ToAlarm.push("LF","LF","ELW","DL");
      break;
    case "B2-1":
      ToAlarm.push("LF","TLF");
      break;
    case "B2-DLK":
      ToAlarm.push("LF","LF","ELW","DL");
      break;
    case "B2-TLF":
      ToAlarm.push("LF","LF","ELW","TLF");
      break;
    case "B3":
      ToAlarm.push("LF","LF","ELW","DL","GW-A");
      break;
    case "B4":
      ToAlarm.push("LF","LF","LF","ELW","DL","GW-A","TLF");
      break;
    case "TH":
      ToAlarm.push("RW","LF");
      break;
    case "TH-DLK":
      ToAlarm.push("RW","DL","LF");
      break;
    case "GSG1":
      ToAlarm.push("LF","LF","ELW","GW-G","GW-Mess","RW");
      break;
    case "GSG2":
      ToAlarm.push("LF","LF","RW","ELW","GW-G","GW-Mess");
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
  var LastZeile;

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
  LastZeile.getElementsByTagName("td")[2].innerHTML = "<b>" + LastZeile.getElementsByTagName("td")[2].innerHTML + "</b>";

  var Anfahrt = "Anfahrtzeit bis zu " + Zeilen[maxi].getElementsByTagName("td")[4].innerHTML;
  if (FZ_fehlen != "")
  { FZ_fehlen = FZ_fehlen.slice(2);
    Anfahrt += "<br><b>es fehlt/fehlen: " + FZ_fehlen + "</b>";
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