// ==UserScript==
// @name           Feuerwache.net Fahrzeugvorschlaege
// @namespace      http://userscripts.org/users/90337
// @description    schlaegt Fahrzeuge zu Einsatzstichworten vor
// @include        http://www.feuerwache.net/feuerwehr-einsaetze/*
// @version        2009-07-29 12:00
// ==/UserScript==

// UMLAUTE-TEST:  äöüÄÖÜß

(function()
{
    setTimeout("document.location.reload();", 20000);
})();




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
    case "Brennende Telefonzelle":
    case "Mülleimer Brand":
    case "Traktorbrand":
    case "Container Brand":
    case "Feuer im Laubhaufen":
    case "Gartenlaubenbrand":
    case "Motorradbrand":
    case "Motorrad-Brand":
    case "Brennendes Gras":
    case "Sperrmüllbrand":
      return "F-klein";

    case "Brennende Bäume":
    case "Dachstuhlbrand":
    case "Schornsteinbrand":
    case "Silobrand":
    case "Fettbrand in Pommesbude":
    case "Brand in KFZ-Werkstatt":
    case "Kellerbrand":
      return "F1";

    case "Keller unter Wasser":
      return "TH-W";

    case "Strohballen Brand":
      return "F1Feld";

    case "Flugzeugabsturz":
    case "Brand in Feuerwerksfabrik":
    case "Brand in Mülldeponie":
    case "Brand in Raffinerie":
      return "GSL";

    case "Brennender PKW":
    case "Baum auf Auto":
    case "Verkehrsunfall":
      return "VU-Klemm";

    case "Scheunenbrand":
    case "Brand im Sägewerk":
    case "Brand in Sporthalle":
      return "F3";

    case "Brand in Spedition":
      return "F3gsg";

    case "Brand im Supermarkt":
    case "Brand in Schule":
    case "Feuer im Altenheim":
    case "Wohnungsbrand":
    case "Gastronomiebrand":
    case "Kinobrand":
      return "F2";

    case "Baum auf Straße":
    case "Auffahrunfall":
      return "TH1";

    case "Baum auf Dach":
      return "TH2";
  }
  return ("<font color='red'>undef</font>");
}


function PushFahrzeuge(Einsatzart)
{
  switch (Einsatzart)
  {
    case "F-klein":
      ToAlarm.push("LF","TLF","DL");
      break;
    case "TH-W":
      ToAlarm.push("TLF");
      break;
    case "F1":
      ToAlarm.push("ELW","LF","LF","DL","TLF");
      break;
    case "F1Feld":
      ToAlarm.push("LF","GW-W","DL");
      break;
    case "VU-Klemm":
      ToAlarm.push("LF","GW-Öl","RW","DL");
      break;
    case "F2":
      ToAlarm.push("LF","LF","ELW","TLF","DL","GW-A");
      break;
    case "F3":
      ToAlarm.push("ELW","DL","TLF","GW-A","GW-W","RW","LF","LF","LF");
      break;
    case "F3gsg":
      ToAlarm.push("ELW","DL","TLF","GW-A","GW-W","GW-G","GW-M","RW","LF","LF","LF");
      break;
    case "TH1":
      ToAlarm.push("RW","LF");
      break;
    case "TH2":
      ToAlarm.push("RW","LF","DL");
      break;
    case "GSL":
      ToAlarm.push("LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","LF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","TLF","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","DL","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-M","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-G","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-A","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-W","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","GW-Öl","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","RW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","ELW","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","TS","LF 10/6","LF 10/6","LF 10/6","LF
10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 10/6","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8","LF 8");
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
    case "LF 16-TS":
        return "LF";
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