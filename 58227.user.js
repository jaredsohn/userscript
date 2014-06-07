// ==UserScript==
// @name           Feuerwache.net Fahrzeug
// @namespace      http://praesentatoin2.bplaced.net/Script.txt
// @description    Fahrzeuge werden vorgeschlagen und hacken gesetzt
// @include        http://www.feuerwache.net/feuerwehr-einsaetze/*
// @version        2009-09-28 14:49
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
    case "Brennende Bäume":
    case "Brennende Telefonzelle":
    case "Brennendes Gras":
    case "Brennender PKW":
    case "Containerbrand":
    case "Container Brand":
    case "Feuer im Laubhaufen":
    case "Gartenlaubenbrand":
    case "Motorradbrand":
    case "Mülleimerbrand":
    case "Mülleimer Brand":
    case "PKW-Brand":
    case "Brennender LKW":
    case "Sperrmüllbrand":
    case "Traktorbrand":
    case "Motorrad-Brand":
    case "Keller unter Wasser":  // eigentlich TH, aber so wird ein LF statt RW geschickt
      return "F1";

    case "Strohballen Brand":
    case "Kellerbrand":
      return "F2";

    case "Flugzeugabsturz":
    case "Brand in Feuerwerksfabrik":
    case "Brand in Mülldeponie":
    case "Brand in Raffinerie":
      return "GSL";

    case "Auffahrunfall":
    case "Baum auf Auto":
      return "F10el";

    case "Verkehrsunfall":
      return "F2Oel";

    case "Dachstuhlbrand":
    case "Schornsteinbrand":
     return "F2DL";

    case "Fettbrand in Pommesbude":
    case "Brand in KFZ-Werkstatt":
      return "F2TLF";

    case "Scheunenbrand":
    case "Silobrand":
    case "Wohnungsbrand":
    case "Brand im Supermarkt":
      return "F3";
    
    case "Kinobrand":
      return "F3TLF";
    
    case "Brand in Schule":
    case "Brand im Altenheim":
    case "Feuer im Altenheim":
    case "Gastronomiebrand":
    case "Brand in Sporthalle":
    case "Brand im Sägewerk":
      return "F4";

    case "Wohnblockbrand":
      return "Wohnblockbrand";

    case "Brand in Spedition":
      return "F4-Gefahrgut";

    case "Chemieunfall (an Schule)":
      return "Chemieunfall";

    case "Chlorgas Alarm (Schwimmbad)":
      return "Chlorgas";
    
    case "Baum auf Straße":
      return "ETH";
    
    case "Baum auf Dach":
      return "TH2DL";

    case "Fahrstuhl - Türöffnung":
      return "P-Tür";
  }
  return ("<font color='red'>undef</font>");
}


function PushFahrzeuge(Einsatzart)
{
  switch (Einsatzart)
  {
    case "F1":
      ToAlarm.push("LF","DL","TLF");
      break;
    case "F1Oel":
      ToAlarm.push("LF","GW-Öl","RW");
      break;
    case "F2":
      ToAlarm.push("LF","LF","DL","TLF");
      break;
    case "F2Oel":
      ToAlarm.push("LF","LF","GW-Öl","RW","DL","TLF");
      break;
    case "F10el":
      ToAlarm.push("LF","GW-Öl","RW");
      break;
    case "F2DL":
      ToAlarm.push("LF","LF","DL","ELW","TLF");
      break;
    case "F2AS":
      ToAlarm.push("LF","LF","ELW","GW-A","DL","TLF");
      break;
    case "F2TLF":
      ToAlarm.push("LF","LF","TLF","GW-W","GW-A","DL");
      break;
    case "F3":
      ToAlarm.push("LF","LF","LF","ELW","DL","GW-A","GW-W","TLF","TLF","TLF");
      break;
    case "F3TLF":
      ToAlarm.push("LF","LF","LF","ELW","DL","GW-A","GW-W","TLF","TLF","TLF");
      break;
    case "F4":
      ToAlarm.push("LF","LF","LF","LF","ELW","DL","GW-A","GW-W","TLF","TLF","TLF");
      break;
    case "Wohnblockbrand":
      ToAlarm.push("LF","LF","LF","LF","LF","LF","LF","LF","ELW","DL","TLF","TLF","TLF","TLF");
      break;
    case "F4-Gefahrgut":
      ToAlarm.push("LF","LF","LF","LF","ELW","DL","GW-A","GW-W","GW-M","GW-G","TLF","TLF","TLF");
      break;
      case "Chemieunfall":
      ToAlarm.push("ELW","LF","LF","LF","LF","LF","DL","GW-A","RW","TLF","TLF","TLF","GW-W","GW-M","GW-G");
      break;
      case "Chlorgas":
      ToAlarm.push("ELW","LF","LF","LF","LF","DL","GW-A","RW","TLF","TLF","TLF","GW-W","GW-M","GW-G");
      break;
      case "ETH":
      ToAlarm.push("RW",""DL","TLF","LF");
      break;
    case "ETHDL":
      ToAlarm.push("RW","DL","LF","TLF");
      break;
    case "TH2":
      ToAlarm.push("RW","LF","TLF");
      break;
    case "TH2DL":
      ToAlarm.push("RW","LF","DL","TLF");
      break;
    case "P-Tür":
      ToAlarm.push("RW","LF","DL","TLF","ELW");
      break;
    case "GSL":
      ToAlarm.push("LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8");
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
    case "GW-A":
        return "GW-A";
    case "GW-Öl":
        return "GW-Öl";
    case "GW-Messtechnik":
        return "GW-M";
    case "GW-Gefahrgut":
        return "GW-G";
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
    Anfahrt += "<br>es fehlt/fehlen: " + FZ_fehlen;
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