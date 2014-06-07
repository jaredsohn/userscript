// ==UserScript==
// @name           AAO Script für feuerwache.net
// @namespace      http://userscripts.org/users/117925
// @description    das Script schlägt Fahrzeuge für Einsätze auf feuerwache.net vor
// @include        http://www.feuerwache.net/feuerwehr-einsaetze*
// @version        2009-12-01 13:00
// ==/UserScript==

// UMLAUTE-TEST:  äöüÄÖÜß

// Umbau durch dK
// orig. Script stamm von http://userscripts.org/scripts/show/50002

var ToAlarm = new Array;

//GM_log(document.location.href);

// auf der Einsatz-Übersichtseite alle Einsätze mit ihrer Art kennzeichnen:
if (document.location.href == "http://www.feuerwache.net/feuerwehr-einsaetze")
{ for each (TD in document.getElementsByTagName("td"))
  { for each (A in TD.getElementsByTagName("a"))
    { if ( A.href.indexOf("http://www.feuerwache.net/feuerwehr-einsaetze/") == 0)
      { TD.innerHTML += "&nbsp;&nbsp;<font color='red'>" + Art(A.innerHTML) + "</font>";
      }
    }
  }
}
else { Alarmiere();
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
    case "Brennende Telefonzelle":
		case "Brennender PKW":
    case "Brennendes Gras":
    case "Containerbrand":
    case "Container Brand":
    case "Feuer im Laubhaufen":
    case "Gartenlaubenbrand":
    case "Motorrad-Brand":
    case "Mülleimerbrand":
    case "Mülleimer Brand":
    case "Sperrmüllbrand":
    case "Traktorbrand":
      return "F1";

    case "Brennender LKW":
      return "F1 Oel";

    case "Brennende Bäume":
    case "Kellerbrand":
      return "F2";

    case "Strohballen Brand":
      return "F2 W";

    case "Baum auf Auto":
    case "Auffahrunfall":
    case "Verkehrsunfall":
      return "TH1 Oel";
	
    case "Baum auf Dach":
      return "TH2 DL";

    case "Baum auf Straße":
    case "Fahrstuhl - Türöffnung":
    case "Fahrstuhl-Türöffnung":
    case "Keller unter Wasser":
      return "TH RW";
		
    case "Dachstuhlbrand":
    case "Schornsteinbrand":
    case "Wohnungsbrand":
    case "Brand im Supermarkt":
    case "Silobrand":
      return "F3 DL";

    case "Fettbrand in Pommesbude":
      return "F2 TLF";
		
    case "Gastronomiebrand":
      return "F3 ELW";
		
    case "Brand in KFZ-Werkstatt":
      return "F3 Oel";
		
    case "Brand im Sägewerk":
      return "F3 Wasser";

    case "Scheunenbrand":
      return "F3 DLK W";

    case "Brand in Sporthalle":
      return "F3 TLF W";

    case "Feuer im Altenheim":
    case "Brand in Schule":
    case "Wohnblockbrand":
      return "F4 GWA";

    case "Brand in Spedition":
      return "F4 VOLL RW";
// ACHTUNG: Wenn BF vorhanden müssen die beiden Gefahrgut Karren mit rein!
      
    case "Kinobrand":
      return "F4 VOLL";

    case "Chemieunfall (an Schule)":
      return "GSG1";
      
    case "Chlorgas Alarm (Schwimmbad)":
      return "GSG2";
    
  }
//GM_log ("undef. Einsatz: " + Stichwort);
  return ("<font color='red'>unbekannt: " + Stichwort + "</font>");
//  return ("&nbsp;");
}

function trim(T)
{ var ret = T;
  var C;

  while ( (ret.substr(0,1) != escape(ret.substr(0,1)) && ret.length>0) )
  { ret = ret.substr(1);
  }
  return ret;
}

function PushFahrzeuge(Einsatzart)
{
  switch (Einsatzart)
  {
    case "F1":
      ToAlarm.push("LF");
      break;
    case "F1 Oel":
      ToAlarm.push("LF","GW-Öl");
      break;
    case "F2":
      ToAlarm.push("LF","LF");
      break;
    case "F2 W":
      ToAlarm.push("LF","LF","GW-W");
      break;
    case "F3 ELW":
      ToAlarm.push("LF","LF","LF","ELW");
      break;
    case "TH1 Oel":
      ToAlarm.push("LF","GW-Öl","RW");
      break;
    case "TH2 DL":
      ToAlarm.push("LF","LF","RW","DL");
      break;
    case "TH RW":
      ToAlarm.push("LF","RW");
      break;
    case "F3 DL":
      ToAlarm.push("LF","LF","LF","DL","ELW");
      break;
    case "F2 TLF":
      ToAlarm.push("LF","LF","TLF");
      break;
    case "F3 Oel":
      ToAlarm.push("LF","LF","LF","ELW","TLF","GW-Öl");
      break;
    case "F3 Wasser":
      ToAlarm.push("LF","LF","LF","ELW","GW-W","GW-A");
      break;
    case "F3 DLK W":
      ToAlarm.push("LF","LF","LF","ELW","DL","GW-W");
      break;
    case "F3 TLF W":
      ToAlarm.push("LF","LF","LF","ELW","GW-W","GW-A","TLF");
      break;
    case "F4 GWA":
      ToAlarm.push("LF","LF","LF","LF","ELW","DL","GW-A");
      break;
    case "F4 VOLL":
      ToAlarm.push("LF","LF","LF","LF","ELW","DL","GW-A","TLF","GW-W");
      break;
    case "F4 VOLL RW":
      ToAlarm.push("LF","LF","LF","LF","ELW","DL","GW-A","TLF","GW-W","RW");
      break;
    
    case "GSG1":
      ToAlarm.push("LF","LF","LF","LF","ELW","GW-G","GW-Mess");
      break;
// Schule      
    case "GSG2":
      ToAlarm.push("LF","LF","LF","LF","RW","ELW","GW-G","GW-Mess");
      break;
// Schwimmbad     
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
    Anfahrt += "<br><b><font color='yellow'>folgende Fahrzeuge fehlen: " + FZ_fehlen + "</font></b><br><br>";
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