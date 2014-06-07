// ==UserScript==
// @name           Feuerwache.net Fahrzeugvorschlaege Schoschi
// @namespace      http://userscripts.org/users/90337
// @description    schlaegt Fahrzeuge zu Einsatzstichworten vor
// @include        http://www.feuerwache.net/*
// @author         sawos
// @Info           enthält Funktionen von Tfm94 und Amtsleiter
// @version        2011-08-29 14:00
// ==/UserScript==


//AlleGleich="LF,LF,LF,GW-G,";
//AlleGleich="LF/RW";


// Anzahl der Spalten in der Verfügbar-Anzeige.
var MAXSPALTENVERFUEGBAR=99;

// ******************************************************************************************
// ACHTUNG!
// Die SCRIPTID muss angepasst werden, wenn Du das Script anpasst (z.B. AAO änderst) 
// und erneut veröffentlichst. S.a. Beschreibung unter http://userscripts.org/scripts/show/50002
// ******************************************************************************************
// Script-Nummer bei userscripts.org:
var SCRIPTID="83189";
// soll täglich nach einem Update des Scriptes gesucht werden?
var CHECKFORUPDATES=true;




var Einsatzklassen = {
  // Die Einsatzklassen werden online abgerufen, siehe dazu auch
  //   http://userscripts.org/scripts/review/72829
};
  
var Einsatzklasse_Fahrzeugzuordnung = {
  'undef':  'LF/HLF'
};

var Fahrzeugklassen = {
  'LF 10/6'            :   'LF'        ,
  'LF 20/16'           :   'LF'        ,
  'HLF 20/16'          :   'LF'        ,
  'HLF 10/6'           :   'LF'        ,
};

var Fahrzeuggeschwindigkeiten = {
  'RTW'                   :   75     ,
  'LF 10/6'               :   58     ,
  'LF 20/16'              :   60     ,
  'LF 8'                  :   48     ,
  'Kleinlöschfahrzeug'    :   60     ,
  'TLF 20/40 - SL'        :   49     ,
  'DLA (K) 23/12'         :   63     ,
  'ELW 1'                 :   77     ,
  'LF 16-TS'              :   52     ,
  'RW'                    :   49     ,
  'GW-A'                  :   56     ,
  'GW-L2 - Wasser'        :   53     ,
  'GW-Öl'                 :   51     ,
  'GW-Schiene'            :   57     ,
  'GW-Gefahrgut'          :   46     ,
  'GW-Messtechnik'        :   40     ,
  'GW-Taucher'            :   62     ,
  'Kran'	          :   55     ,
  'Flugfeldlöschfahrzeug' :   110    ,
  'Rettungstreppe'        :   65     ,
  'Löschboot'             :   60     ,
  'Rettungsboot'          :   60     ,
  'HLF 20/16'             :   60     ,
  'HLF 10/6'              :   58     ,
  'GW-TUIS'               :   73     ,
  'ULF'                   :   40     ,
  'TLF 16/25'             :   55     ,
};

var Nachforderungen = {
/*
  an alle Script-Anpasser:
  die Erkennung von Nachforderungen wurde überarbeitet, so dass nun die große Liste nicht mehr nötig ist.
  Die Erkennung läuft nun so, dass automatisch eine Nachforderung erkannt wird, wenn die exakte Beschreibung
  des Fahrzeuges (also z.B. "DLA (K) 23/12" und nicht nur "DL") in einer Rückmeldung von der Einsatzstelle
  erscheint. Der RW wird da auch richtig erkannt, weil auf Groß/Kleinschreibung geachtet wird, also eine Meldung
  "...für erweiterte Hilfeleistung..." wird da nicht als RW-Anforderung bewertet.
  
  Da die Rückmeldungstexte beim GW-L2-Wasser uneinheitlich sind, müssen diese weiterhin hier in der Liste
  aufgeführt werden.
*/
  "Hier muss Wasser über weite Wegstrecken transportiert werden. Wir benötigen einen GW-L2 Wasser." : "GW-L2",
  "Wir müssen Wasser über eine weite Wegstrecke transporierten und benötigen einen GW-L2 Wasser" : "GW-L2",
  "Um Leitungen über weite Strecken legen zu können, benötigen wir einen GW - L2 - Wasser." : "GW-L2",
  "Das Feuer ist weiter ausserhalb und alle Wasserreserven sind aufgebraucht. Wir brauchen einen GW-L2 -Wasser um weitere Schläuche verlegen zu können." : "GW-L2",
  "Um die Löscharbeiten weiter ausführen zu können, wird eine Drehleiter (DLA (K) 23 / 12) benötigt." : "DLK",  
};

var WikiLinks = {
  'Auffahrunfall'                  : 'Auffahrunfall',
  'Baum auf Auto'                  : 'Baum_auf_Auto',
  'Baum auf Dach'                  : 'Baum_auf_Dach',
  'Baum auf Straße'                : 'Baum_auf_Stra%C3%9Fe',
  'Brand in Autohaus'              : 'Brand_in_Autohaus',
  'Brand in Briefkasten'           : 'Brand_in_Briefkasten',
  'Brand im Baumarkt'              : 'Brand_im_Baumarkt',
  'Brand in Druckerei'             : 'Brand_in_Druckerei',
  'Brand in KFZ-Werkstatt'         : 'Brand_in_KFZ-Werkstatt',
  'Brand in Lackfabrik'            : 'Brand_in_Lackfabrik',
  'Brand im Sägewerk'              : 'Brand_im_S%C3%A4gewerk',
  'Brand im Supermarkt'            : 'Brand_im_Supermarkt',
  'Brand in Schule'                : 'Brand_in_Schule',
  'Brand in Spedition'             : 'Brand_in_Spedition',
  'Brand in Sporthalle'            : 'Brand_in_Sporthalle',
  'Brand in Zugdepot'              : 'Brand_im_Zugdepot',
  'Brennende Bäume'                : 'Brennende_B%C3%A4ume',
  'Brennende S-Bahn'               : 'Brennende_S-Bahn',
  'Brennende Telefonzelle'         : 'Brennende_Telefonzelle',
  'Brennender LKW'                 : 'Brennender_LKW',
  'Brennender Müllwagen'           : 'Brennender_M%C3%BCllwagen',
  'Brennender PKW'                 : 'Brennender_PKW',
  'Brennender Sicherungskasten'    : 'Brennender_Sicherungskasten',
  'Brennendes Gras'                : 'Brennendes_Gras',
  'Chemieunfall (an Schule)'       : 'Chemieunfall_%28an_Schule%29',
  'Chlorgas Alarm (Schwimmbad)'    : 'Chlorgas_Alarm_%28Schwimmbad%29',
  'Container Brand'                : 'Containerbrand',
  'Dachstuhlbrand'                 : 'Dachstuhlbrand',
  'Fahrstuhl - Türöffnung'         : 'Fahrstuhl-T%C3%BCr%C3%B6ffnung',
  'Feldbrand'                      : 'Feldbrand',
  'Fettbrand in Pommesbude'        : 'Fettbrand_in_Pommesbude',
  'Feuer im Altenheim'             : 'Feuer_im_Altenheim',
  'Feuer im Laubhaufen'            : 'Feuer_im_Laubhaufen',
  'Gartenlaubenbrand'              : 'Gartenlaubenbrand',
  'Gastronomiebrand'               : 'Gastronomiebrand',
  'Gewerbebrand'                   : 'Gewerbebrand',
  'Kellerbrand'                    : 'Kellerbrand',
  'Keller unter Wasser'            : 'Keller_unter_Wasser',
  'Kinobrand'                      : 'Kinobrand',
  'Kleiner Waldbrand'              : 'Kleiner_Waldbrand',
  'Motorrad-Brand'                 : 'Motorradbrand',
  'Mülleimer Brand'                : 'M%C3%BClleimerbrand',
  'Ölspur'                         : '%C3%96lspur',
  'Person im Fluss'                : 'Person_im_Fluss',
  'Scheunenbrand'                  : 'Scheunenbrand',
  'Schornsteinbrand'               : 'Schornsteinbrand',
  'Schuppenbrand'                  : 'Schuppenbrand',
  'Silobrand'                      : 'Silobrand',
  'Sperrmüllbrand'                 : 'Sperrm%C3%BCllbrand',
  'Strohballen Brand'              : 'Strohballen_Brand',
  'Traktorbrand'                   : 'Traktorbrand',
  'Verkehrsunfall'                 : 'Verkehrsunfall',
  'Wohnblockbrand'                 : 'Wohnblockbrand',
  'Wohnungsbrand'                  : 'Wohnungsbrand',
  'Wohnwagenbrand'                 : 'Wohnwagenbrand',
  'Brand auf Weihnachtsmarkt'      : 'Brand_auf_Weihnachtsmarkt',
  'Brand-Weihnachtsbaum in Kirche' : 'Brand-Weihnachtsbaum_in_Kirche',
//29.03.2010
  'Trocknerbrand'                  : 'Trocknerbrand',
  'Brand in Reifenlager'           : 'Brand_in_Reifenlager',
  'Brand im Casino'                : 'Brand_im_Casino',
//23.04.2010
  'Brennendes Gebüsch'             : 'Brennendes_Geb%C3%BCsch',
  'Kioskbrand'                     : 'Kioskbrand',
  'Garagenbrand'                   : 'Garagenbrand',
  'Mähdrescherbrand'               : 'M%C3%A4hdrescherbrand',
  'Kaminbrand'                     : 'Kaminbrand',
  'PKW in Fluss'                   : 'PKW_in_Fluss',
  'Brand in Schloss'               : 'Brand_in_Schloss',
  'Brand in Kühlhaus'              : 'Brand_in_K%C3%BChlhaus',
  'Feuer im Krankenhaus'           : 'Feuer_im_Krankenhaus',
  'Brand in Kletterhalle'          : 'Brand_in_Kletterhalle',
//23.08.2010
  'Grasnarbenbrand'                : 'Grasnarbenbrand',
//01.09.2010
  'Brennendes Flugzeug'            : 'Brennendes_Flugzeug',
//13.10.2010
  'Brand in Industriepark'         : 'Brand_in_Industriepark',
//27.10.2010
  'Brand in Eishalle'              : 'Brand_in_Eishalle',
  'Brand in Metzgerei'             : 'Brand_in_Metzgerei',
  'Brand in Gärtnerei'             : 'Brand_in_Gärtnerei',
//19.11.2010
  'Feuer auf Boot (Klein)'         : 'Feuer_auf_Boot_(klein)',
//28.11.2010
  'Feuer auf Boot (Mittel)'        : 'Feuer_auf_Boot_(mittel)',
//13.12.2010
  'Gabelstapler im Hafenbecken'    : 'Gabelstapler_im_Hafenbecken',
// 24.12.2010
  'Verletztentransport'            : 'Verletztentransport',
//05.01.2011
  'Brand in Steinbruch'            : 'Brand_in_Steinbruch',
  'Brand in Gemeindehaus'          : 'Brand_in_Gemeindehaus',
  'Maschinenbrand'                 : 'Maschinenbrand',
//15.04.2011
  'Tankbrand'                      : 'Tankbrand',
  'Brennt Tanklager'               : 'Brennt_Tanklager',
  'Brand in Raffinerie'            : 'Brand_in_Raffinerie',
//12.05.2011
  'Unfall mit Gefahrgut-Transport' : 'Unfall_mit_Gefahrgut-Transport',
  'Gefahrstoff-Austritt in Firma'  : 'Gefahrstoff-Austritt_in_Firma',
//26.06.2011
  'Brand in Betankungsanlage'      : 'Brand_in_Betankungsanlage',
  'Küchenbrand'                    : 'Küchenbrand',
  'Türöffnung'                     : 'Türöffnung',
  'Waldbrand'                      : 'Waldbrand',
  'VU mit Straßenbahn'             : 'VU_mit_Straßenbahn',
//22.07.2011
  'Kleintier in Not'               : 'Kleintier_in_Not',
  'Brennendes Bus-Häuschen'        : 'Brennendes_Bus-H%C3%A4uschen',
  'Person in Schacht'              : 'Person_in_Schacht',
  'Auslaufende Betriebsstoffe'     : 'Auslaufende_Betriebsstoffe',
};

//
// really no need to change anything below
//





















//
// ...unless you know what you do...
//



// unter welchem URL finde ich Infos über das Script?
var UPDATEURL="http://userscripts.org/scripts/show/" + SCRIPTID;
// unter welchem URL finde ich das Script als Installation?
var INSTALLURL="http://userscripts.org/scripts/source/" + SCRIPTID + ".user.js";
var ToAlarm = new Array;
var Optional = new Array;
var Unterwegs = new Array;
var AmOrt = new Array;
var AufAnfahrt = new Array;
var Wartend = new Array;
var NichtVerf = new Array;
var ichBins;
var FirstRun=true;
var CBClicked=false;
var debugging;
var machVorschlag=true;
var zweiterAbmarsch=GM_getValue("zweiterAbmarsch",0);
var AlleGleich;
var showInfoRTWplus;
var showInfoKlasseInListe;
var showInfoEinsatzgebiet,InfotextEinsatzgebiet;
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
var showInfoVerfuegbar,InfotextVerfuegbar;
var ScriptUpdateAvailable="";
var adr = document.location.href;
var AAO;
var PosBem;


init();
main();

function main()
{ 
  mylog("main\nadr=" + adr);
  
  ichBins = true;
  
  if (adr == "http://www.feuerwache.net/feuerwehr-einsaetze")
  { bearbeiteÜbersichtsseite(); }
  else if (adr == "http://www.feuerwache.net/feuerwehrleitstelle")
  { bearbeiteLeitstelle(); }
  else if (adr == "http://www.feuerwache.net/feuerwehrfahrzeuge")
  { bearbeiteFahrzeugliste(); }
  else if (adr == "http://www.feuerwache.net/feuerwachen")
  { bearbeiteFeuerwachenliste(); }
  else if (adr == "http://www.feuerwache.net/personal/list")
  { bearbeitePersonaltabellen(); }
  else if (adr.match("http://www.feuerwache.net/feuerwachen/[0-9]+/feuerwehrleute"))
  { bearbeitePersonaltabellen(); }
  else if (adr.match("http://www.feuerwache.net/feuerwachen/[0-9]+/feuerwehrautos"))
  { bearbeiteWacheFahrzeugliste(); }
  else if (adr.match("http://www.feuerwache.net/vehicle/show/caption_url/*"))
  { bearbeiteFahrzeugkauf(); }
  else if (adr.match("http://www.feuerwache.net/feuerwehrfahrzeuge/[0-9]*/verschieben"))
  { bearbeiteFahrzeugkauf(); }
  else if (adr.match("http://www.feuerwache.net/building_to_user/show/id/*"))
  { bearbeiteLehrgangszuteilung(); }
  else if (adr.match("http://www.feuerwache.net/feuerwehr-einsaetze/[0-9]+"))
  { bearbeiteEinsatzseite(); }
  else if (adr.match("http://www.feuerwache.net/feuerwehrfahrzeuge/[0-9]+/bearbeiten"))
  { bearbeiteFahrzeugseite(); }
  else if (adr.match("http://www.feuerwache.net/event_logfile/*"))
  { bearbeiteLogFile(); }

  
  ichBins = false;
}
function createText(text)
{
  return document.createTextNode(text);
}

function bearbeiteLogFile() { 
	var TRs = document.getElementById("content").getElementsByTagName("tbody")[0].getElementsByTagName("tr"); {
		var AnzNotruf  = 0, AnzFehl     = 0, AnzErledigt = 0, AnzAusgetreten = 0, AnzNeuLeute = 0, AnzWerbung = 0, AnzWachgebaut = 0, AnzWachNeu = 0, AnzWachAbriss = 0, Anzabgebrochen = 0, AnzAusflug = 0;
		for (i=0;i<TRs.length;i++) { 
					var TR = TRs[i];
					var TD = TR.getElementsByTagName("td")[0];
					var H = TD.innerHTML;
					var Hstr = new String;
					Hstr = H;
					if (Hstr.match("Fehleinsatz:") != null ) { 
						AnzFehl++;
						H = "<font color='brown'>"+H+"</font>";
					} 
					else if (Hstr.match("Notruf:") != null ) { 
						AnzNotruf++;
						H = "<font color='blue'>"+H+"</font>"; 
					}
					else if (Hstr.match("Einsatz abgearbeitet:") != null ) { 
						AnzErledigt++;
						H = "<font color='green'>"+H+"</font>";
					}
					else if (Hstr.match("ist bei der Wache") != null ) { 
						AnzAusgetreten++;
						H = "<font color='red'>"+H+"</font>";
					}
					else if (Hstr.match("fängt bei der Wache") != null ) { 
						AnzNeuLeute++;
						H = "<font color='darkgreen'>"+H+"</font>";
					}
					else if (Hstr.match("Feuerwache ausgebaut") != null ) { 
						AnzWachgebaut++;
						H = "<font color='#FF00CC'>"+H+"</font>";
					}
					else if (Hstr.match("Feuerwache gegründet") != null ) { 
						AnzWachNeu++;
						H = "<font color='#FF00CC'>"+H+"</font>";
					}
					else if (Hstr.match("Feuerwache abgerissen.") != null ) { 
						AnzWachAbriss++;
						H = "<font color='#188284'>"+H+"</font>";
					}
					else if (Hstr.match("Werbeaktion für Feuerwehrleute gestartet") != null ) { 
						AnzWerbung++;
						H = "<font color='indigo'>"+H+"</font>";
					}
					else if (Hstr.match("Einsatz abgebrochen:") != null ) { 
						Anzabgebrochen++;
						H = "<font color='yellow'>"+H+"</font>";
					}
					else if (Hstr.match("Feuerwehrausflug gestartet bei") != null ) { 
						AnzAusflug++;
						H = "<font color='#DE18C3'>"+H+"</font>";
					}
					TD.innerHTML = H;
				}
		}
	  var ret;
	  var Fehlquote;
	  Fehlquote = (100/(AnzErledigt+AnzFehl))*AnzFehl
	  if (AnzFehl == 0) { Fehlquote = 0 }
	  ret =  "<table class='defaultTable'><tr>";
	  ret += "<th colspan='2'>Auswertung der aktuellen Logfile Seite:</th></tr>\n";
	  ret += "<tr><th>neue Notrufe</th><td style='width:365px;'><font color='blue'><b>" + AnzNotruf + "</b></font></td></tr>\n";
      ret += "<tr><th>Einsätze erledigt</th><td> <font color='green'><b>" + AnzErledigt + "</b></font></td></tr>\n";
	  ret += "<tr><th>Fehleinsätze</th><td><font color='brown'><b>" + AnzFehl + "</b></font></td></tr>\n";
	  ret += "<tr><th>Quote Fehleinsätze</th><td><b>" + Fehlquote.toFixed(2) + "%</b></td></tr>\n";
	  ret += "<tr><th>Feuerwehrleute ausgetreten:</th><td><font color='darkred'><b>" + AnzAusgetreten + "</b></font></td></tr>\n";
	  ret += "<tr><th>Feuerwehrleute eingetreten:</th><td><font color='darkblue'><b>" + AnzNeuLeute + "</b></font></td></tr>\n";
	  ret += "</table><br>\n";
	  var main, newElement;
	  main = document.getElementsByTagName("h1")[0];
	  newElement = document.createElement('p');
	  main.parentNode.insertBefore(newElement, main.nextSibling);
	  newElement.innerHTML = ret;
}



function bearbeiteFahrzeugseite()
{ // Fahrzeug bearbeiten
  var H = "<script type='text/javascript'>\n";
  H += "function ToggleStatus6()\n";
  H += "{\n";
  H += "  var I=document.getElementById('caption');\n";
  H += "  var FN=I.value;\n";
  H += "  if (FN.substr(0,4).toUpperCase()=='XXX ')\n";
  H += "  { I.value = FN.substr(4,FN.length-4); }\n";
  H += "  else { I.value = 'XXX ' + FN; }\n";
  H += "}\n";
  H += "</script>\n\n";
  H += "<a href='javascript:ToggleStatus6();';>Fahrzeug in/außer Dienst stellen</a>\n";
  
  var INP = document.getElementById("caption");
  var td = document.createElement("td");
  td.innerHTML = H;
  INP.parentNode.parentNode.insertBefore(td,INP.parentNode.nextSibling);
}

function bearbeiteFahrzeugkauf()
{ var FRM = document.getElementsByTagName("form")[0];
  if (!FRM) return;
  var TB = FRM.getElementsByTagName("table")[0];
  if (!TB) return;
  var TR = TB.getElementsByTagName("tr")[2];
  if (!TR) return;
  var TD = TR.getElementsByTagName("td")[1];
  if (!TD) return;

  var Par=TD.getElementsByTagName("p");
  for (var i=0;i < Par.length;i++)
  { if (Par[i].innerHTML.match("Diese Feuerwache kann keine Fahrzeuge mehr aufnehmen"))
    { Par[i].style.display = "none"; }
    if (Par[i].innerHTML.match("Zuwenig bzw. keine Stellplätze für Rettungswagen"))
    { Par[i].style.display = "none"; }
  }
}


function bearbeiteWacheFahrzeugliste()
{ 
  var DC = document.getElementById("content");
  var TBs = DC.getElementsByClassName("defaultTable");
  var H2s = DC.getElementsByTagName("h2");

  for each (H2 in H2s)
  { var A = H2.getElementsByTagName("a")[0];
    if (A)
    {
      var FWLink = A.href;
      H2.innerHTML += "&nbsp;&nbsp;<a href='" + FWLink + "/feuerwehrleute'><font size='-1'>(Personal)</font></a>";
    }
  }
}

function bearbeiteFeuerwachenliste()
{ 
  var TRs = document.getElementById("content").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
  for (i=0;i<TRs.length;i++)
  { var TR=TRs[i];
    var TD = TR.getElementsByTagName("td")[1];
    var L = TD.getElementsByTagName("a")[0];
    
    // Spalte Fahrzeuge
    var TD = TR.getElementsByTagName("td")[3];
    var H1 = TD.getElementsByTagName("a")[0].innerHTML;
    var H2 = TD.innerHTML.split(" / ")[1];
    var H = "&nbsp;" + H1 + " / " + H2 + "&nbsp;" ;
    if (parseInt(H1) != parseInt(H2)) H = "<font color='orange'>"+H+"</font>";
    H = "<a href='" + L + "/feuerwehrautos'>" + H + "</a>";
    TD.innerHTML = H;

    // Spalte Rettungswagen
    TD = TR.getElementsByTagName("td")[4];
    H = TD.innerHTML;
    H2 = H.split("/");
    if (parseInt(H2[0]) != parseInt(H2[1])) H = "<font color='orange'>"+H+"</font>";
    TD.innerHTML = H;

    // Spalte Feuerwehrleute
    TD = TR.getElementsByTagName("td")[5];
    var A = TD.getElementsByTagName("a")[0];
    A.innerHTML = "&nbsp;" + A.innerHTML + "&nbsp;";

    // Spalte Stufe
    TD = TR.getElementsByTagName("td")[6];
    TD.style.textAlign = "left";
    H = TD.innerHTML;
    if (parseInt(H) < 5) H += "&nbsp;<a href='" + L + "/ausbauen'>&nbsp;+&nbsp;</a>";
    TD.innerHTML = H;
  }
}

function bearbeiteLeitstelle()
{
  var DC = document.getElementById("content");
  var TBs = DC.getElementsByClassName("defaultTable");
  var H2s = DC.getElementsByTagName("h2");

  for each (H2 in H2s)
  { var A = H2.getElementsByTagName("a")[0];
    if (A)
    {
      var FWLink = A.href;
      H2.innerHTML += "<br><a href='" + FWLink + "/feuerwehrleute'><font size='-1'>Personal</font></a>";
      H2.innerHTML += "&nbsp/&nbsp<a href='" + FWLink + "/feuerwehrautos'><font size='-1'>Fahrzeuge</font></a>";
    }
  }
}

function bearbeitePersonaltabellen()
{
  var DC = document.getElementById("content");
  var TBs = DC.getElementsByClassName("defaultTable");
  var H2s = DC.getElementsByTagName("h2");

  for (var i=0; i<TBs.length; i++)
  { var TB=TBs[i];
  
    var T = BearbeitePersonaltabelle(TB);

    if (T != "")
    { var FWStat = document.createElement("div")
      TB.parentNode.insertBefore(FWStat,TB);
      FWStat.innerHTML = T;
    }
    
    var H2 = H2s[i];
    var A = H2.getElementsByTagName("a")[0];
    var FWLink = A.href;
    H2.innerHTML += "&nbsp&nbsp<a href='" + FWLink + "/feuerwehrautos'><font size='-1'>(Fahrzeuge)</font></a>";
  }
  
  // vor der ersten Überschrift Default-Sortierung anbieten:
  if (!document.getElementById("DefaultSort"))
  {
    var div = document.createElement("div");
    div.style.paddingBottom = "10px";
    div.innerHTML = "Standard-Sortierung: ";
    var H1 = document.getElementsByTagName("h1")[0];
    if (!H1) H1 = document.getElementsByTagName("h2")[0];
    H1.parentNode.insertBefore(div,H1);
    
    var SEL = document.createElement("select");
    SEL.id = "DefaultSort";
    SEL.options[SEL.length] = new Option("(unsortiert)","-1");
    SEL.options[SEL.length] = new Option("Name");
    SEL.options[SEL.length] = new Option("Motivation");
    SEL.options[SEL.length] = new Option("Fähigkeiten");
    SEL.options[SEL.length] = new Option("Alter");
    SEL.options[SEL.length] = new Option("Ausbildung");
    SEL.options[SEL.length] = new Option("Status");
    SEL.options[SEL.length] = new Option("Schicht");
    div.appendChild(SEL);
    
    document.getElementById("DefaultSort").addEventListener( "change" , DefaultSortChanged , true );
  }
  var SEL = document.getElementById("DefaultSort");
  SEL.value = GM_getValue("DefaultTabSort","-1");
}

function DefaultSortChanged()
{ var S = document.getElementById('DefaultSort').value
  GM_setValue("DefaultTabSort",S);
}

function bearbeiteLehrgangszuteilung()
{
  var R=document.getElementsByName("education_type");
  for (var i=0;i < R.length;i++) {
	R[i].addEventListener ( "click" , Markiere_Schueler , true );
  }
}

function Markiere_Schueler()
{ var GG = document.getElementById("education_type_1").checked;
  var RA = document.getElementById("education_type_2").checked;
  var TA = document.getElementById("education_type_3").checked;
  var FH = document.getElementById("education_type_4").checked;
  var LB = document.getElementById("education_type_5").checked;
  var RB = document.getElementById("education_type_6").checked;
  var TS = document.getElementById("education_type_7").checked;
  var DT=document.getElementsByClassName("defaultTable");
  if (DT.length<2) return;

  for (var i=1; i<DT.length; i++)
  { var TB = DT[i];
    for each (TR in TB.getElementsByTagName("tr"))
    { var TDs = TR.getElementsByTagName("td");
      if (TDs.length==7) 
      { TDs[0].style.backgroundColor="transparent";
        var Ausb = TDs[5].innerHTML;
        var verf = (TDs[1].innerHTML.match("Nicht verfügbar") == null);
        var Mot  = parseInt(TDs[2].innerHTML);
        if (Mot >= 75) TDs[2].style.color="green";
        if (Mot <= 74) TDs[2].style.color="green";
        if (Mot <= 25) TDs[2].style.color="#FF6666";
        if (verf)
        { var bgc="";
          if (GG && Ausb.match("Gefahrgut")==null) bgc="#FFFF00";
          if (RA && Ausb.match("Rettungsassistent")==null) bgc="#99FFFF";
          if (TA && Ausb.match("Taucher")==null) bgc="#C61818";
          if (FH && Ausb.match("Flughafen")==null) bgc="#3300CC";
          if (LB && Ausb.match("Löschboot")==null) bgc="#FFB200";
          if (RB && Ausb.match("Rettungsboot")==null) bgc="#8218C3";
		  if (TS && Ausb.match("TUIS")==null) bgc="#9C7B18";

          if (bgc) 
          { TDs[0].style.backgroundColor = bgc; 
            TR.style.display = "";
          }
          else 
          { TR.style.display = "none";
          }
        }
        else
        { TR.style.display = "none";
        }
      }
    }
  }
}

function createElement(type, attributes)
{
  var node = document.createElement(type);

  for (var attr in attributes)
  {
    if (attributes.hasOwnProperty(attr))
    {
      node.setAttribute(attr, attributes[attr]);
    }
  }
  return node;
}

function bearbeiteFahrzeugliste()
{ var DC=document.getElementById("content");
  var ArrTR=new Array;
  
  var H2 = DC.getElementsByTagName("h2");
  for (var i=0; i<H2.length; i++)
  { var A = H2[i].getElementsByTagName("a")[0];
    if (A)
    { var FWLink = A.href;
      H2[i].innerHTML += "&nbsp&nbsp<a href='" + FWLink + "/feuerwehrleute'><font size='-1'>(Personal)</font></a>";
    }
  }

  var H1 = document.getElementsByTagName("h1")[0];
  var H2=document.createElement("h2");
  H2.innerHTML = "Übersicht";
  DC.insertBefore(H2,H1.nextSibling);
  
  var TB=document.createElement("table");
  TB.className="defaultTable";
  TB.id="Übersichtstabelle";
  var T = "<thead><tr>\n";
  T += "<th>FZ-Typ</th>";
  T += "<th>Anzahl</th>";
  T += "<th style='background-color:#0000F8;'>Dienst-<br>fahrt<br>(S1)</th>";
  T += "<th style='background-color:#00FF2d;color:#000000;'>auf<br>Wache<br>(S2)</th>";
  T += "<th style='background-color:#FFCC27;color:#000000;'>zum<br>Einsatz<br>(S3)</th>";
  T += "<th style='background-color:#FF5A19;color:#000000;'>im<br>Einsatz<br>(S4)</th>";
  T += "<th style='background-color:#BABABA;color:#000000;'>nicht<br>Bereit<br>(S6)</th>";
  T += "<th style='background-color:#DAD815;color:#000000;'>Patient<br>an Bord<br>(S7)</th>";
  T += "<th>&Sigma; km</th>";
  T += "<th>&Oslash;-km</th>";
  T += "<th>&Oslash; Zust.</th>";
  T += "</tr></thead><tbody>\n";
  
  var FZNamen = new Array;
  var gefFZ = new Array;
  var gefS1 = new Array;
  var gefS2 = new Array;
  var gefS3 = new Array;
  var gefS4 = new Array;
  var gefS6 = new Array;
  var gefS6a = new Array;
  var gefS7 = new Array;
  var kmSumme = new Array;
  var ZustandSumme = new Array;
  var gesamtZustand=0;
  var AnzS1=0;
  var AnzS2=0;
  var AnzS3=0;
  var AnzS4=0;
  var AnzS6=0;
  var AnzS6a=0;
  var AnzS7=0;
  var gesamtkm=0;
  var ArrTopKM = new Array;
  
  TBs = document.getElementsByTagName("table");
  for (var i=1;i<TBs.length-2;i++)
  { 
    var TB2=TBs[i];
	var TR=TB2.getElementsByTagName("tr")[0];
	//alert(TR.getElementsByTagName("th").length);
	var index=TR.getElementsByTagName("th").length-1;
	//alert(TR.getElementsByTagName("th")[index].firstChild.nodeValue);
    var LastTH = TR.getElementsByTagName("th")[index].firstChild.nodeValue;
	//alert(TR.getElementsByTagName("th")[index].firstChild.nodeValue);
    if (LastTH=="Zustand")
    { var TRs = TBs[i].getElementsByTagName("tr");
      var AnzTR = TRs.length;
      for (var j=1;j<AnzTR;j++)
      { var FZName = TRs[j].getElementsByTagName("td")[2].innerHTML;
        if (gefFZ[FZName] == undefined) 
        { FZNamen.push(FZName);
          gefFZ[FZName]=1;
          gefS1[FZName]=0;
          gefS2[FZName]=0;
          gefS3[FZName]=0;
          gefS4[FZName]=0;
          gefS6[FZName]=0;
          gefS6a[FZName]=0;
          gefS7[FZName]=0;
          kmSumme[FZName]=0;
          ZustandSumme[FZName]=0;
        }
        else 
        { gefFZ[FZName]++;
        }
        var Funkname = TRs[j].getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
        
        var FZStat = trim(TRs[j].getElementsByTagName("td")[3].innerHTML);
        if (FZStat=="Einsatzbereit auf Wache" && Funkname.substr(0,3).toUpperCase()=="XXX") FZStat = "Außer Dienst";
        switch (FZStat)
        { case "Frei (Dienstfahrt)":      gefS1[FZName]++; break;
          case "Einsatzbereit auf Wache": gefS2[FZName]++; break;
          case "Auf dem Weg zum Einsatz": gefS3[FZName]++; break;
          case "Ankunft am Einsatzort":   gefS4[FZName]++; break;
          case "Nicht einsatzbereit":     gefS6[FZName]++; break;
          case "Außer Dienst":            gefS6a[FZName]++; break;
          case "Patient aufgenommen":     gefS7[FZName]++; break;
        }
        
        var FZLink = TRs[j].getElementsByTagName("td")[1].innerHTML;
        var kmStand = TRs[j].getElementsByTagName("td")[5].innerHTML;
        var IntkmStand = parseInt(kmStand.substr(0,kmStand.length-2).replace(".",""))
        ArrTopKM.push(new Array(IntkmStand,FZLink));
        kmSumme[FZName] += IntkmStand;
        
        //Zustand prüfen und ggf. Link zur Werkstatt einbauen
        var TD = TRs[j].getElementsByTagName("td")[6];
        var FZID = TRs[j].getElementsByTagName("td")[1].getElementsByTagName("a")[0].href;
        FZID = FZID.replace("http://www.feuerwache.net/feuerwehrfahrzeuge/","");
        var Zustand = parseInt(removeTags(TD.innerHTML));
        if (Zustand != 100)
        { ArrTR.push(TRs[j].cloneNode(true));
        }
        ZustandSumme[FZName] += Zustand;
      }
    }
  }

  for each (FZName in FZNamen.sort())
  { 
    AnzS1 += gefS1[FZName];
    AnzS2 += gefS2[FZName];
    AnzS3 += gefS3[FZName];
    AnzS4 += gefS4[FZName];
    AnzS6 += gefS6[FZName];
    AnzS6a += gefS6a[FZName];
    AnzS7 += gefS7[FZName];
    gesamtkm += kmSumme[FZName];
    gesamtZustand += ZustandSumme[FZName];
    
    if (gefS1[FZName]==0) gefS1[FZName] = "<font color='#666666'>0</font>";
    if (gefS2[FZName]==0) gefS2[FZName] = "<font color='#666666'>0</font>";
    if (gefS3[FZName]==0) gefS3[FZName] = "<font color='#666666'>0</font>";
    if (gefS4[FZName]==0) gefS4[FZName] = "<font color='#666666'>0</font>";
    if (gefS6[FZName]==0) gefS6[FZName] = "<font color='#666666'>0</font>";
    if (gefS6a[FZName]==0) gefS6a[FZName] = "";
    if (gefS7[FZName]==0) gefS7[FZName] = "<font color='#666666'>0</font>";

    T += "<tr><td><b>" + FZName + "</b></td>";
    T += "<td style='text-align:center'>" + gefFZ[FZName] + "</td>";
    T += "<td style='text-align:center'>" + gefS1[FZName] + "</td>";
    T += "<td style='text-align:center'>" + gefS2[FZName] + "</td>";
    T += "<td style='text-align:center'>" + gefS3[FZName] + "</td>";
    T += "<td style='text-align:center'>" + gefS4[FZName] + "</td>";
    T += "<td style='text-align:center'>" + gefS6[FZName];
    if (gefS6a[FZName]) T += " + " + gefS6a[FZName];
    T += "</td>";
    T += "<td style='text-align:center'>" + gefS7[FZName] + "</td>";
    T += "<td style='text-align:right'>" + makeDots(kmSumme[FZName]) + "</td>";
    var Schnitt = parseInt(kmSumme[FZName] / gefFZ[FZName]);
    T += "<td style='text-align:right'>" + makeDots(Schnitt) + "</td>";
    Schnitt = parseInt(10 * ZustandSumme[FZName] / gefFZ[FZName]) / 10;
    var txtSchnitt = Schnitt.toString();
    if (txtSchnitt.substr(txtSchnitt.length-2,1) != ".") txtSchnitt += ".0";
    T += "<td style='text-align:right'>" + txtSchnitt + " %</td>";
    T += "</tr>\n";
  }
  var Anz = AnzS1+AnzS2+AnzS3+AnzS4+AnzS6+AnzS6a+AnzS7;
  T += "<tr><th style='text-align:left'>SUMME</th>";
  T += "<th>" + Anz + "</th>";
  T += "<th>" + AnzS1 + "</th>";
  T += "<th>" + AnzS2 + "</th>";
  T += "<th>" + AnzS3 + "</th>";
  T += "<th>" + AnzS4 + "</th>";
  T += "<th>" + AnzS6;
  if (AnzS6a) T += " + " + AnzS6a;
  T += "</th>";
  T += "<th>" + AnzS7 + "</th>";
  T += "<th style='text-align:right;padding:1px 5px;'>" + makeDots(gesamtkm) + "</th>";
  var Schnitt = parseInt(gesamtkm / Anz);
  T += "<th style='text-align:right;padding:1px 5px;'>" + makeDots(Schnitt) + "</th>";
  Schnitt = parseInt(10 * gesamtZustand / Anz) / 10;
  var txtSchnitt = Schnitt.toString();
  if (txtSchnitt.substr(txtSchnitt.length-2,1) != ".") txtSchnitt += ".0";
  T += "<th style='text-align:right;padding:1px 5px;'>" + txtSchnitt + " %</th>";
  T += "</tr>\n";
  T += "</tbody></table>\n";
  TB.innerHTML=T;
  DC.insertBefore(TB,H2.nextSibling);
  
  TB = TBs[TBs.length-1];
  var lastTR = TB.getElementsByTagName("tr")[TB.getElementsByTagName("tr").length-1];
  var TR=document.createElement("tr");
  lastTR.parentNode.insertBefore(TR,lastTR.nextSibling);
  TR.innerHTML = "<th>Fahrzeuge mit der höchsten Laufleistung:</th>\n<td></td>";
  var TD=TR.getElementsByTagName("td")[0];

  ArrTopKM.sort(function s(a,b){return b[0]-a[0];});
  for (var i=0;i<5;i++)
  { TD.innerHTML += ArrTopKM[i][1] + " (" + makeDots(ArrTopKM[i][0]) + " km)<br>\n";
  }
  
  // Tabelle mit beschädigten Fahrzeugen in Dokument schreiben, 
  // aber erstmal verstecken, Anzeigen erst durch Klick auf Toggle-Link

  var NewDiv = document.createElement("div");
  
  var nodeScript = createElement('script',
                                   {'type': 'text/javascript'});
    nodeScript.innerHTML = "function toggledisplay()\n\
  { var e = document.getElementById('DivZustandstabelle');\n\
    e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n\
  }\n";
 NewDiv.appendChild(nodeScript);
	
  //var H = "<script type='text/javascript'>\n";
 // H += "function toggledisplay()\n";
  //H += "{ var e = document.getElementById('DivZustandstabelle');\n";
  //H += "  e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n";
 // H += "}\n";
 // H += "</script>";
  //var H = "<h2><a href='javascript:toggledisplay();'>beschädigte Fahrzeuge auflisten</a></h2>";
 // H += "<br>\n";
 var nodeA = createElement('a',
                              {'href': 'javascript:toggledisplay();'});
    nodeA.appendChild(document.createTextNode('beschädigte Fahrzeuge auflisten'));
    NewDiv.appendChild(nodeA);
    NewDiv.appendChild(createElement('br'));
  //NewDiv.innerHTML = H;
 
  
  var hiddenDiv=document.createElement("div");
  hiddenDiv.id = "DivZustandstabelle";
  hiddenDiv.style.display = "none";
  var H2 = document.createElement("h2");
  H2.appendChild(document.createTextNode("beschädigte Fahrzeuge"));
  hiddenDiv.appendChild(H2);
  var hiddTB = document.createElement("table");
  hiddTB.className="defaultTable";
  hiddTB.id="Zustandstabelle";
  hiddenDiv.appendChild(hiddTB);
  var THead=document.createElement("thead");
  hiddTB.appendChild(THead);
  H = "<tr>";
  H += "<th style='width: 10px;'></th>\n";
  H += "<th style='width: auto;'>Funkrufname</th>\n";
  H += "<th style='width: 120px;'>Fahrzeugtyp</th>\n";
  H += "<th style='width: 190px;'>FMS</th>\n";
  H += "<th style='width: 55px;' title='Aktuelle Position'>Akt. Pos</th>\n";
  H += "<th style='width: 100px;'>Laufleistung</th>\n";
  H += "<th style='width: 60px;'>Zustand</th>\n";
  H += "</tr>\n";
  THead.innerHTML = H;
  var TBody=document.createElement("tbody");
  hiddTB.appendChild(TBody);
  
 // NewDiv.appendChild(hiddenDiv);
  TB=document.getElementById("Übersichtstabelle");
  TB.parentNode.insertBefore(hiddenDiv,TB.nextSibling);
  TB.parentNode.insertBefore(NewDiv,TB.nextSibling);
  TB=document.getElementById("Zustandstabelle").getElementsByTagName("tbody")[0];
  var TR=ArrTR;
  for (var i=0;i < TR.length;i++) TB.appendChild(TR[i]);

  
  // Tabelle sortieren
  SortTabelle(hiddTB,6,true,true,true);
}

function bearbeiteEinsatzseite()
{ 
  // Alle Infobox-Variablen leer machen
  InfotextEinsatzgebiet="";
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
  InfotextVerfuegbar="";
  PosBem="";

  // verfügbare FZ zählen
  if (showInfoVerfuegbar) InfotextVerfuegbar = zaehleVerfuegbar();
  
  // im Verbandseinsatz die Checkbox per default NICHT anhaken, sonst schon
  if (document.getElementById("machVorschlag") == undefined) machVorschlag = !Verbandseinsatz();
  
  //Einsatzgebiete
var locationArr = {
	// Sonderbebauung zuerst
	'<font color="#C31882"><b>Flughafen Einsatz</b></font>'      : {from: {x:  83, y: 179}, to: {x:  84, y: 180}},
	'<font color="#C31882"><b>Hafen Einsatz</b></font>'      : {from: {x:  98, y: 198}, to: {x: 100, y: 200}},
	'<font color="#C31882"><b>Raffinerie Einsatz</b></font>'      : {from: {x:   6, y: 176}, to: {x:   7, y: 176}},
	'<font color="#C31882"><b>Güterbahnhof</b></font>'     : {from: {x:  50, y: 152}, to: {x:  51, y: 152}},
	'<font color="#C31882"><b>Bahnlinie</b></font>'      : {from: {x:   1, y: 152}, to: {x: 100, y: 152}},
	// 'normale' Bereiche
	'Einsatz <b>Altstadt</b>'      : {from: {x:   1, y:   1}, to: {x: 100, y: 100}},
	'Einsatz <font color="#8218C3"><b>Neustadt</b></font>'      : {from: {x:   1, y: 101}, to: {x: 100, y: 200}},
}

// Beschreibung des Einsatzgebietes ermitteln
function getAreaDescription(x, y) { 
	var locArr = [];
	for (loc in locationArr) { 
		if (locationArr[loc].from.x <= x &&
			locationArr[loc].from.y <= y &&
			locationArr[loc].to.x >= x &&
			locationArr[loc].to.y >= y)
		{ locArr.push(loc);
		}
	}
	return locArr.join(', ');
}

  
if (showInfoEinsatzgebiet) {
var checkVerband=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("tr")[3].getElementsByTagName("td")[0].innerHTML;
if(checkVerband == "Einsatz von"){
	//var posArr=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("td")[3].innerHTML.replace('Andere Stadt -', '').split(' - ');
	var InfotextEinsatzgebiet = "<font color=#C31882><b>Verbandseinsatz</b></font>";
}
else {
	var check = document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("td")[3].innerHTML;
	if(check.match(/href/i)){
		var posArr=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("td")[3].getElementsByTagName("a")[0].innerHTML.replace('Andere Stadt -', '').split(' - ');
		var InfotextEinsatzgebiet = getAreaDescription(parseInt(posArr[0]), parseInt(posArr[1]));
	}
	else {
		var posArr=document.getElementById("mission_content").getElementsByTagName("table")[0].getElementsByTagName("td")[3].innerHTML.replace('Andere Stadt -', '').split(' - ');
		var InfotextEinsatzgebiet = getAreaDescription(parseInt(posArr[0]), parseInt(posArr[1]));
	}
}
	}
 
  
  // Einsatzstichwort ermitteln
  var EinsatzDiv = document.getElementById("mission_content");
  var Einsatz = document.getElementsByTagName("h1")[0];
  var Einsatzstichwort = getStichwort(Einsatz.innerHTML);
  if (showInfoStichwort) 
  { InfotextStichwort = Einsatzstichwort;
    var L = getWikiLink(Einsatzstichwort);
    if (L != "") InfotextStichwort = "<a target='_new' href='" + L + "'>" + Einsatzstichwort + "</a>";
  }
  
  // Einsatzklasse
  var Einsatzklasse = getEinsatzKlasse(Einsatzstichwort);
  

  
  //Einsatzklasse vortsetzung

  if (showInfoKlasse) InfotextKlasse = Einsatzklasse;
  // Fahrzeuge zusammenstellen
  FillAlarmListe(Einsatzklasse);

  if (showInfoKlassenalarm) InfotextKlassenalarm = ToAlarm.toString();
  if (showInfoKlassenalarmOpt && Optional.length>0) InfotextKlassenalarmOpt = Optional.toString();

  // Anzahl der nötigen RTW ermitteln
  var V = Verletzte();
  if (V>0)
  { if (showInfoRTW) 
    { InfotextRTW = "";
      for (var i=0;i<V;i++) InfotextRTW += "<img class='famfamfamicon' src='/images/pill.png' alt='Pill'>";
      InfotextRTW += " " + V + " verletzte Person";
      if (V>1) InfotextRTW +="en";
    }
 // Wassereinsatz ?
    var Buchstabe = Einsatzklasse.charAt(0);
    //dt();mylog(Buchstabe);df();
    if (Buchstabe == 'H') { 
    	if (showInfoRTWplus) { V--; }
    }
    //dt();mylog(V);df();
   	while (V>0) { 
   		if (Buchstabe == 'H') { ToAlarm.push("RTB"); }
   		if (Buchstabe != 'H') { ToAlarm.push("RTW"); }
   		V--; 
   	}
  }

  
  // bereits eingebundene Fahrzeuge ermitteln
  FillUnterwegsListe();

  // Diese Unterwegs-Fahrzeuge auflisten...
  if (Unterwegs.length>0)
  { if (showInfoUnterwegs) 
    { if (AmOrt.length) InfotextUnterwegs += "am Ort: <font color='green'>" + AmOrt.toString() + "</font>, ";
      if (AufAnfahrt.length) InfotextUnterwegs += "auf Anfahrt: <font color='#845ADF'>" + AufAnfahrt.toString() + "</font>, ";
      if (Wartend.length) InfotextUnterwegs += "wartend: <font color='#C318DE'>" + Wartend.toString() + "</font>, ";
      InfotextUnterwegs = InfotextUnterwegs.substr(0,InfotextUnterwegs.length-2);
    }
  }

  // ToAlarm um die FZ kürzen, die bereits unterwegs sind
  // sowie die Reihenfolge anpassen, dass Alternativen am Ende stehen
  bereinigeToAlarm();
  
  // Nachforderungen auslesen
  var NF = AddNachforderungen();
  if (NF != "" && showInfoNachforderungen) InfotextNachforderungen = NF;

  if (!machVorschlag)
  { // es sollen keine Vorschläge angehakt werden, also alles aus ToAlarm
    // nach Optional verschieben, so dass alles nur gelb markiert wird.
    while (ToAlarm.length>0) Optional.push(ToAlarm.pop());
  }

  if (ToAlarm.length>0) 
  { if (showInfoToAlarm) InfotextToAlarm = "<b><font color='chocolate'></b>" + ToAlarm + "</font>"; }
  else
  { if (showInfoToAlarm)
    {
      InfotextToAlarm = "<font color='green'>Nichts zu alarmieren.</font> "; 
      if (Optional.length>0) InfotextToAlarm += "(Optional: " + Optional + ")";
    }
  }

// ************************************************************************************
// an dieser Stelle sind die Listen ToAlarm und Optional gefüllt. Jetzt kann alles
// aus ToAlarm abgehakt werden und alles aus Optional gelb markiert
// ************************************************************************************
    
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
  Info += "> Fahrzeuge sofort auswählen\n";
  
  Info += "<span style='float:right'>Abmarschreihenfolge: <input type='checkbox' id='zweiterAbmarschTr' ";
  if (zweiterAbmarsch==1) Info +="checked";
  Info +=">  (zuerst Trupp-FZ)";
  Info += "&nbsp;<b>oder</b>&nbsp;<input type='checkbox' id='zweiterAbmarschAusb' ";
  if (zweiterAbmarsch==2) Info +="checked";
  Info +=">  (zuerst Sonderausbildungs-FZ)</span>\n";
  
  // Infos in Tabelle strukturieren
  Info += "<table class='defaultTable'>\n";
  var InfoVorspann = "<tr><th style='width: 150px;'>";
  var InfoVorspann2 = "<tr><th colspan='2'>";
  
  if (InfotextEinsatzgebiet) Info += InfoVorspann + "Zusatzinfo</th><td>" + InfotextEinsatzgebiet + " </td></tr>\n";
  if (InfotextStichwort) Info += InfoVorspann + "<font color='chocolate'>Wicki Info</th><td>" + InfotextStichwort + "</td></tr>\n";
  
  if (InfotextKlasse) 
  { Info += InfoVorspann + "Einsatzklasse</th><td><font color='#0000B2'>" + InfotextKlasse + "</font>";
    if (InfotextKlassenalarmOpt) InfotextKlassenalarm += ", Optional: " + InfotextKlassenalarmOpt + "&nbsp;";
    if (InfotextKlassenalarm) Info += "&nbsp;&nbsp;(&nbsp;" + InfotextKlassenalarm + "&nbsp;)";
    Info += "</td></tr>\n";
  }
  if (InfotextRTW) Info += InfoVorspann + "RTW benötigt</th><td>" + InfotextRTW + "</td></tr>\n";
  if (InfotextNachforderungen) Info += InfoVorspann + "Nachforderung</th><td>" + InfotextNachforderungen + "</td></tr>\n";
  if (InfotextUnterwegs) Info += InfoVorspann + "im Einsatz</th><td>" + InfotextUnterwegs + "</td></tr>\n";
  if (InfotextToAlarm) Info += InfoVorspann + "zu alarmieren</th><td id='TA'>" + InfotextToAlarm + "</td></tr>\n";
  if (InfotextVerfuegbar) Info += InfoVorspann + "<a target='_new' href='http://www.feuerwache.net/feuerwehrfahrzeuge'>verfügbar</a></th><td><font color='green'>" + InfotextVerfuegbar + "</font></td></tr>\n";
  if (InfotextFahrzeit || InfotextFahrzeitOpt) 
  { Info += InfoVorspann + "Anfahrzeiten</th><td>"
    if (InfotextFahrzeit) Info += "notwendige Fahrzeuge " + InfotextFahrzeit;
    if (InfotextFahrzeit && InfotextFahrzeitOpt) Info += "<br>";
    if (InfotextFahrzeitOpt) Info += "optionale Fahrzeuge " + InfotextFahrzeitOpt;
    Info += "</td></tr>\n";
  }
  if (InfotextNichtVerfuegbar) Info += InfoVorspann + "<font color='red'>nicht verfügbar</font></th><td><font color='red'>" + InfotextNichtVerfuegbar + "</font></td></tr>\n";
  
  Info += "</table>\n";

  mylog("Info=\n" + Info);
  
  // Infobereich in die Seite einbauen
  var InfoBereich = document.getElementById("InfoBereich");
  if (!InfoBereich)
  { InfoBereich = document.createElement("div");
    InfoBereich.id = "InfoBereich";
    EinsatzDiv.parentNode.insertBefore(InfoBereich,Einsatz.nextSibling);
  }
  InfoBereich.innerHTML = Info;

  document.getElementById("machVorschlag").addEventListener ( "click" , machVorschlag_clicked , false ) ;
  document.getElementById("zweiterAbmarschAusb").addEventListener ( "click" , zweiterAbmarsch_clicked , false ) ;
  document.getElementById("zweiterAbmarschTr").addEventListener ( "click" , zweiterAbmarsch_clicked , false ) ;
  
  var D = KonfigHTML();
  if (D != "") 
  { InfoBereich.parentNode.insertBefore(D,InfoBereich.nextSibling);
    AddKonfigEventlisteners();
  }
  
  var BTN = document.getElementsByName("commit")[0];
  if (BTN) BTN.addEventListener ( "click" , function(){ FirstRun=true; } , false ) ;
  
  for each (A in document.getElementsByTagName("a"))
  { if (A.innerHTML == "zurück alarmieren") A.addEventListener ( "click" , function(){ FirstRun=true;CBClicked=false; } , false ) ; }
  
  for each (I in document.getElementsByName("vehicle_to_user_id[]"))
  { I.addEventListener ( "click" , function(){ CBClicked=true; } , false ) ; }
  
  findeFahrzeugeZumZurückalarmieren();
  
  FirstRun=false;
}

function findeFahrzeugeZumZurückalarmieren()
{ var D = document.getElementById("driving_vehicle");
  var TB1=D.getElementsByTagName("table")[0];
  if (!TB1) return;
  var Rows1 = TB1.getElementsByTagName("tr");
  
  D = document.getElementsByClassName("free_vehicle")[0];
  var TB2=D.getElementsByTagName("table")[0];
  if (!TB2) return;
  var Rows2 = TB2.getElementsByTagName("tr");
  
  for (var i=Rows1.length-1; i>=0; i--)
  { var Row1 = Rows1[i];
    var FZID1 = Row1.getElementsByTagName("td")[0].getElementsByTagName("a")[0].href;
    FZID1 = FZID1.replace("http://www.feuerwache.net/feuerwehrfahrzeuge/","");
    var FZBez1 = Row1.getElementsByTagName("td")[1].innerHTML;
    var FZKlasse1 = getFahrzeugKlasse(FZBez1);
    if (!FZKlasse1) FZKlasse1 = "1";
    var RestSek1 = document.getElementById("hidden_driving_countdown_" + FZID1).value;
    if (!RestSek1) RestSek1=0;
    
    var sucheWeiter=true;
    var j=1;
    while (sucheWeiter)
    { var Row2 = Rows2[j];
      var FZBez2 = Row2.getElementsByTagName("td")[2].innerHTML;
      var FZKlasse2 = getFahrzeugKlasse(FZBez2);
      var Fahrzeit2 = Row2.getElementsByTagName("td")[4].innerHTML;
      var FahrtSek2 = ZeitToSek(Fahrzeit2);
      var FZName2 = Row2.getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
      if (FZName2.substr(0,3).toUpperCase()=="XXX") FZKlasse2 = "2";
      FZName2 = Row2.getElementsByTagName("td")[1].innerHTML;
      if (!FZName2.match(".*(unterwegs)")) FahrtSek2 += 90;
      if (FZKlasse1 == FZKlasse2 && RestSek1 > FahrtSek2 && Row2.getElementsByTagName("td")[4].style.backgroundColor!="rgb(34, 102, 34)")
      { 
        Row1.getElementsByTagName("td")[5].style.backgroundColor="#662222";
        Row2.getElementsByTagName("td")[4].style.backgroundColor="#226622";
        sucheWeiter = false;
      }
      if (FahrtSek2 > RestSek1) sucheWeiter = false;
      j++;
      if (j >= Rows2.length) sucheWeiter = false;
    }
  }
}

function bearbeiteÜbersichtsseite()
{ if (showInfoKlasseInListe)
  {   
  var TD=document.getElementsByTagName("td");
	for (var i=0;TD.length > i; i++){
    var A=TD[i].getElementsByTagName("a");
	  for (var j=0;A.length > j; j++){
       if ( A[j].href.indexOf("http://www.feuerwache.net/feuerwehr-einsaetze/") == 0)
        { TD[i].innerHTML += "<span style='padding-right:2px; float:right;'><font color='#0000B2'>(" + getEinsatzKlasse(A[j].innerHTML) + ")</font></span>";
        }
      }
    }
  }

  
  var H1=document.getElementsByTagName("h1")[0];
  var D = KonfigHTML();
  if (D != "") 
  { H1.parentNode.insertBefore(D,H1);
    AddKonfigEventlisteners();
  }
}

function AddKonfigEventlisteners()
{ var Boxes = document.getElementsByName("KonfigBox");
  for each (Box in Boxes)
  { Box.addEventListener("click",KonfigBox_clicked,false);
  }

  if (ScriptUpdateAvailable != "") 
  { document.getElementById("installURL").addEventListener ( 
      "click" , 
      function(){ GM_setValue("Version",ScriptUpdateAvailable); ScriptUpdateAvailable=""; GM_setValue("pleaseUpdate",""); } , 
      true )
  }
  
  document.getElementById("AAO_downloadButton").addEventListener ( "click", AAO_doDownload , true);

}

function SortiereNachSpalte(Tab,SortBy)
{
  var Spalte = -1;
  var c=0;
  for each (TH in Tab.getElementsByTagName("th"))
  { if (TH.innerHTML == SortBy) Spalte=c;
    c++;
  }
  if (Spalte == -1) return;
  
  switch(SortBy)
  { case "Name":        SortTabelle(Tab,Spalte,true,false,true); break;
    case "Motivation":  SortTabelle(Tab,Spalte,false,true,false); break;
    case "Fähigkeiten": SortTabelle(Tab,Spalte,false,true,false); break;
    case "Alter":       SortTabelle(Tab,Spalte,true,true,false); break;
    case "Ausbildung":  SortTabelle(Tab,Spalte,true,false,false); break;
    case "Status":      SortTabelle(Tab,Spalte,true,false,false); break;
    case "Schicht":     SortTabelle(Tab,Spalte,true,true,false); break;
  }
}

function SortiereNachSpalteClick(event)
{ var t = event.target;
  var SortBy = t.innerHTML;
  var Tab = t.parentNode.parentNode.parentNode;
  if (!Tab) return;

  SortiereNachSpalte(Tab,SortBy);
}

function MachSortierbar(myTB)
{ var THead = myTB.getElementsByTagName("thead")[0];
  if (!THead) return;
  var THs = THead.getElementsByTagName("th");
  var TH=THs;
  for (var i=0;i<TH.length;i++) {
 // for each (TH in THs) {
  var H = TH[i].innerHTML;
    TH[i].addEventListener ( "click" , function(e){SortiereNachSpalteClick(e)} , true ) ;
  }
}


function BearbeitePersonaltabelle(myTB)
{ MachSortierbar(myTB);
  var DefSort = GM_getValue("DefaultTabSort","-1")
  if (DefSort != "-1") SortiereNachSpalte(myTB,DefSort)
  
  var AnzFM=0, AnzEinsatz=0, AnzSchule=0, AnzBereit=0, AnzDienst=0;
  var AnzGG=0, AnzGGDienst=0, AnzGGBereit=0;
  var AnzRA=0, AnzRADienst=0, AnzRABereit=0;
  var AnzTA=0, AnzTADienst=0, AnzTABereit=0;
  var AnzFH=0, AnzFHDienst=0, AnzFHBereit=0;
  var AnzLB=0, AnzLBDienst=0, AnzLBBereit=0;
  var AnzRB=0, AnzRBDienst=0, AnzRBBereit=0;
  var AnzTS=0, AnzTSDienst=0, AnzTSBereit=0;
  
  var TR=myTB.getElementsByTagName("tr");
  for (var i=0;i<TR.length;i++) {
  //for each (TR in myTB.getElementsByTagName("tr")) { 
  if (TR[i].getElementsByTagName("td").length>5)
    { var TDs = TR[i].getElementsByTagName("td");

      var Stat = trim(TDs[5].innerHTML);
      var Ausb = trim(TDs[4].innerHTML);

      // Motivation kennzeichnen:
      var Mot = parseInt(TDs[1].innerHTML);
      if (Mot >= 75) TDs[1].style.color = "green";
	  if (Mot <= 74) TDs[1].style.color = "#3984C3";
      if (Mot <= 25) TDs[1].style.color = "red";
	  
	  // Fähigkeiten kennzeichnen:
      var Fähi = parseInt(TDs[2].innerHTML);
      if (Fähi >= 75) TDs[2].style.color = "green";
	  if (Fähi <= 74) TDs[2].style.color = "#3984C3";
      if (Fähi <= 25) TDs[2].style.color = "red";
      
      // Personalstatistik:
      AnzFM++;
      
      // Status kennzeichnen und zählen
      if (Stat == "Beim Einsatz") { AnzDienst++; AnzEinsatz++; TDs[5].style.color="#FF0000"; }
      if (Stat == "Frei - nicht im Dienst") TDs[5].style.color="blue";
      if (Stat == "Einsatzbereit") { AnzDienst++; AnzBereit++; TDs[5].style.color="green"; }
      if (Stat == "In der Feuerwehrschule") { AnzSchule++; TDs[5].style.color="chocolate"; }
      
      // Ausbildungsstand
      if (Ausb.match("Gefahrgut"))
      { AnzGG++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzGGDienst++;
        if (Stat == "Einsatzbereit") AnzGGBereit++;
      }
      if (Ausb.match("Rettungsassistent"))
      { AnzRA++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzRADienst++;
        if (Stat == "Einsatzbereit") AnzRABereit++;
      }
      if (Ausb.match("Taucher"))
      { AnzTA++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzTADienst++;
        if (Stat == "Einsatzbereit") AnzTABereit++;
		}
      if (Ausb.match("Flughafen"))
      { AnzFH++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzFHDienst++;
        if (Stat == "Einsatzbereit") AnzFHBereit++;
      }
      if (Ausb.match("Löschboot"))
      { AnzLB++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzLBDienst++;
        if (Stat == "Einsatzbereit") AnzLBBereit++;
      }
      if (Ausb.match("Rettungsboot"))
      { AnzRB++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzRBDienst++;
        if (Stat == "Einsatzbereit") AnzRBBereit++;
      }
      if (Ausb.match("TUIS"))
      { AnzTS++;
        if (Stat == "Beim Einsatz" || Stat == "Einsatzbereit") AnzTSDienst++;
        if (Stat == "Einsatzbereit") AnzTSBereit++;		
      }
    }
  }

  var ret;
  ret = "<b>" + AnzFM + " FM(SB)</b>";
  if (AnzDienst != AnzFM) 
  { ret += ", davon " + AnzDienst + " im Dienst und ";
    if (AnzSchule) 
    { ret += AnzSchule + " in der Schule."; }
    else
    { ret = ret.substr(0,ret.length-5) + "."; }
  }
  ret += "<br><b>" + AnzBereit + " einsatzbereit</b> (=" + parseInt(1000*AnzBereit/AnzDienst)/10 + "%), ";
  if (AnzEinsatz) ret += AnzEinsatz + " im Einsatz (=" + parseInt(1000*AnzEinsatz/AnzDienst)/10 + "%), ";
  ret = ret.substr(0,ret.length-2) + ".<br>";
  if (AnzGG)
  { ret += "Gefahrgut: " + AnzGG + " insgesamt, " + AnzGGDienst + " im Dienst";
    if (AnzGGDienst != AnzGGBereit)
    { ret += ", davon " + AnzGGBereit + " einsatzbereit.<br>\n"; }
    else
    { ret += " (alle einsatzbereit).<br>\n"; }
  }
  if (AnzRA)
  { ret += "Rettungsassistenten: " + AnzRA + " insgesamt, " + AnzRADienst + " im Dienst";
    if (AnzRADienst != AnzRABereit)
    { ret += ", davon " + AnzRABereit + " einsatzbereit.<br>\n"; }
    else
    { ret += " (alle einsatzbereit).<br>\n"; }
  }
  if (AnzTA)
  { ret += "Taucher: " + AnzTA + " insgesamt, " + AnzTADienst + " im Dienst";
    if (AnzTADienst != AnzTABereit)
    { ret += ", davon " + AnzTABereit + " einsatzbereit.<br>\n"; }
    else
    { ret += " (alle einsatzbereit).<br>\n"; }
	}
  if (AnzFH)
  { ret += "Flughafen: " + AnzFH + " insgesamt, " + AnzFHDienst + " im Dienst";
    if (AnzFHDienst != AnzFHBereit)
    { ret += ", davon " + AnzFHBereit + " einsatzbereit.<br>\n"; }
    else
    { ret += " (alle einsatzbereit).<br>\n"; }
  }
  if (AnzLB)
  { ret += "Löschboot: " + AnzLB + " insgesamt, " + AnzLBDienst + " im Dienst";
    if (AnzLBDienst != AnzLBBereit)
    { ret += ", davon " + AnzLBBereit + " einsatzbereit.<br>\n"; }
    else
    { ret += " (alle einsatzbereit).<br>\n"; }
  }
  if (AnzRB)
  { ret += "Rettungsboot: " + AnzRB + " insgesamt, " + AnzRBDienst + " im Dienst";
    if (AnzRBDienst != AnzRBBereit)
    { ret += ", davon " + AnzRBBereit + " einsatzbereit.<br>\n"; }
    else
    { ret += " (alle einsatzbereit).<br>\n"; }
  }
  if (AnzTS)
  { ret += "TUIS: " + AnzTS + " insgesamt, " + AnzTSDienst + " im Dienst";
    if (AnzTSDienst != AnzTSBereit)
    { ret += ", davon " + AnzTSBereit + " einsatzbereit.<br>\n"; }
    else
    { ret += " (alle einsatzbereit).<br>\n"; }
  }  

  return ret;
}

function SortTabelle(myTB,Spalte,Richtung,Numerisch,Link)
{ var TBody = myTB.getElementsByTagName("tbody")[0];
  if (!TBody) return;
  var ArrTR = new Array();
  var TR=TBody.getElementsByTagName("tr");
  for (var i=0;i<TR.length;i++) {
  //for each (TR in TBody.getElementsByTagName("tr")) }
  ArrTR.push(TR[i]);

  }
  if (ArrTR.length==0) return;
  
  ArrTR.sort(function(x,y){return TableSort(x,y,Spalte,Richtung,Numerisch,Link);});

  var H = "";
  for (var i=0;i<ArrTR.length;i++) H += "<tr>" + ArrTR[i].innerHTML + "</tr>\n";
  
  TBody.innerHTML = H;
}

function TableSort(Z1,Z2,S,richtung,num,link)
{ // sortiert Tabellenspalten nach Spalte S
  // übergeben werden zwei <tr> Objekte und die Spaltennummer,
  // nach der sortiert werden soll
  // die weiteren Parameter bedeuten:
  // richtung (t/f)    = Richtung (true = A->Z, false = Z->A)
  // num (true/false)  = numerisch sortieren? sonst alphanumerisch
  // link (true/false) = Zelleninhalt ist ein Link
  var S1,S2;
  
  var TDs = Z1.getElementsByTagName("td");
  if (TDs.length <= S) return 0;
  S1 = removeTags(TDs[S].innerHTML);

  TDs = Z2.getElementsByTagName("td");
  if (TDs.length <= S) return 0;
  S2 = removeTags(TDs[S].innerHTML);

  if (num)
  { S1 = parseInt(S1.replace(".",""));
    S2 = parseInt(S2.replace(".",""));
  }

  if (richtung)
  { if (S1<S2) return -1;
    if (S1>S2) return 1;
  }
  else
  { if (S1<S2) return 1;
    if (S1>S2) return -1;
  }
  return 0;
}

function ClearFreeVehiclesTable(auchHaken)
{ 
  // löschen aller Hervorhebungen und ggf. Haken in der Liste freier Fahrzeuge:
  var D = document.getElementsByClassName("free_vehicle")[0];
  var TB = D.getElementsByTagName("table")[0];
  if (TB==undefined) return;
  for each (TR in TB.getElementsByTagName("tr"))
  { // Farbe entfernen
    for each (TD in TR.getElementsByTagName("td")) { TD.bgColor = undefined; }
    
    var CB=TR.getElementsByTagName("input")[0];
    if (CB) 
    { CB.alt=undefined;
      if (CB.checked && auchHaken) CB.click(); 
    }
    
  }
}

function KonfigHTML()
{ 
  if (document.getElementById("DivKonfigurieren")) return "";
  
  var NewDiv = document.createElement("div");
  NewDiv.id = "DivKonfigurieren";
  var H = "<script type='text/javascript'>\n";
  H += "function toggledisplay()\n";
  H += "{ var e = document.getElementById('KonfigBoxes');\n";
  H += "  e.style.display = (e.style.display == 'block') ? 'none' : 'block';\n";
  H += "}\n";

  H += "</script>";

  H += "<a href='javascript:toggledisplay();';>AAO-Script Konfiguration anzeigen</a>";
  if (ScriptUpdateAvailable != "") 
  { H += "<br><br><font color='red'>Es gibt ein Script-Update (auf Version " + ScriptUpdateAvailable + ")</font>";
    H += "&nbsp;<a href='" + UPDATEURL + "' target='_new'>Infos</a>";
    H += "&nbsp;<a id='installURL' href='" + INSTALLURL + "' target='_new'>Installieren</a>";
  }
  H += "<br><br>\n";
  NewDiv.innerHTML = H;
  
  var hiddenDiv=document.createElement("div");
  hiddenDiv.id = "KonfigBoxes";
  hiddenDiv.style.display = "none";
  
  H = "\n";
  
  H += "<h2>AAO einlesen</h2><br>\n";
  H += "<input type='text' size='50' id='AAO_downloadSource' value='";
  H += GM_getValue("AAO_Source","http://userscripts.org/scripts/review/71524") + "'> \n";
  H += "<input type='button' value='einlesen' id='AAO_downloadButton'><br>\n";

  H += "<font color='red'>Schoschi AAO</font> ---> http://userscripts.org/scripts/review/72829";
  
  H += "<h2>in Einsatzübersichtstabelle</h2><br>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfEinsatzgebiet'";
  if (showInfoEinsatzgebiet) H += " checked";
  H += "> Zusatzinfo anzeigen<br>\n";

  
  H += "<input type='checkbox' name='KonfigBox' id='KonfKlasseInListe'";
  if (showInfoKlasseInListe) H += " checked";
  H += "> Einsatzart anzeigen<br>\n";

  H += "<br><h2>in Infobox auf Einsatzseite</h2><br>\n";
  H += "<input type='checkbox' name='KonfigBox' id='KonfStichwort'";
  if (showInfoStichwort) H += " checked";
  H += "> Einsatzstichwort anzeigen<br>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfKlasse'";
  if (showInfoKlasse) H += " checked";
  H += "> Einsatzklasse anzeigen<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfKlassenalarm'";
  if (showInfoKlassenalarm) H += " checked";
  H += "> gemäß Einsatzklasse zu alarmierende Fahrzeuge anzeigen<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfKlassenalarmOpt'";
  if (showInfoKlassenalarmOpt) H += " checked";
  H += "> Anzeige der optionalen Fahrzeuge<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfRTW'";
  if (showInfoRTW) H += " checked";
  H += "> Anzeige der benötigten RTW<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfUnterwegs'";
  if (showInfoUnterwegs) H += " checked";
  H += "> Anzeige der Fahrzeuge, die bereits im Einsatz eingebunden sind<br>\n";

  H += "<input type='checkbox' name='KonfigBox' id='KonfNachforderungen'";
  if (showInfoNachforderungen) H += " checked";
  H += "> Anzeige der Fahrzeuge, die von der Einsatzstelle nachgefordert wurden<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfToAlarm'";
  if (showInfoToAlarm) H += " checked";
  H += "> Anzeige der zu alarmierenden Fahrzeuge<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfFahrzeit'";
  if (showInfoFahrzeit) H += " checked";
  H += "> Anzeige der Fahrzeiten zur Einsatzstelle (von-bis)<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfFahrzeitOpt'";
  if (showInfoFahrzeitOpt) H += " checked";
  H += "> Anzeige der Fahrzeiten für die optionalen Fahrzeuge<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfNichtVerfuegbar'";
  if (showInfoNichtVerfuegbar) H += " checked";
  H += "> Anzeige der benötigten, aber nicht verfügbaren Fahrzeuge<br>\n";
  
  H += "<input type='checkbox' name='KonfigBox' id='KonfVerfuegbar'";
  if (showInfoVerfuegbar) H += " checked";
  H += "> Anzeige aller verfügbarer Fahrzeugklassen<br>\n";

  H += "<br><a href='" + adr + "'>Seite aktualisieren</a>\n";
  H += "<br><br>\n";
  hiddenDiv.innerHTML = H;
  NewDiv.appendChild(hiddenDiv);

  return NewDiv;
}

function KonfigBox_clicked()
{ mylog("KonfigBox_clicked");
  var Boxes = document.getElementsByName("KonfigBox");
  mylog("#Boxes = " + Boxes.length);

  for (var i=0;i<Boxes.length;i++)
  { var Box=Boxes[i];
    var VarNam = Box.id.replace ("Konf","showInfo");
    var OldVal = eval(VarNam);
    var NewVal = Box.checked;
    
    mylog(VarNam + " von " + OldVal + " nach " + NewVal);
    eval(VarNam + " = " + NewVal);
    mylog("Test, " + VarNam + " ist jetzt " + eval(VarNam));
  }
  
  SetVariables();
}

function zweiterAbmarsch_clicked(e)
{ var zATr = document.getElementById("zweiterAbmarschTr").checked;
  var zAGG = document.getElementById("zweiterAbmarschAusb").checked;
  
  if (e.target.id == "zweiterAbmarschTr" && zATr) zAGG=false;
  if (e.target.id == "zweiterAbmarschAusb" && zAGG) zATr=false;
  
  zweiterAbmarsch = 0;
  if (zATr) zweiterAbmarsch = 1;
  if (zAGG) zweiterAbmarsch = 2;

  GM_setValue("zweiterAbmarsch",zweiterAbmarsch);
  ClearFreeVehiclesTable(true);
  FirstRun=true;
  main();
}

function machVorschlag_clicked(e)
{ machVorschlag = document.getElementById("machVorschlag").checked;
  ClearFreeVehiclesTable(true);
  FirstRun=true;
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
  var NFFZ="";
  var alleNF="";
  for (var z=1;z<TRs.length;z++)
  { var TR=TRs[z];
    if (TR.getElementsByTagName("td").length>=2)
    { var Q = TR.getElementsByTagName("td")[1].innerHTML;
      if (Q.indexOf("Leitstelle:") == -1)
      { var RM = TR.getElementsByTagName("td")[2].innerHTML;
        if (RM != undefined)
        { NFFZ = getNachforderungFahrzeug(RM);
          if (NFFZ != "") 
          { if (FZinEinsatz(NFFZ)) NFFZ="";
            if (NFFZ != "")
            {
              ToAlarm.push(NFFZ);
              alleNF += "," + NFFZ;
            }
          }
        }
      }
    }
  }
  if (alleNF != "") alleNF = alleNF.substr(1,100);
  mylog("Nachforderung: " + alleNF);
  return alleNF;
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
  AmOrt = new Array;
  AufAnfahrt = new Array;
  Wartend = new Array;
  
  var d = document.getElementById("mission_vehicle");
  if (d.getElementsByTagName("table").length == 1)
  { var TB=d.getElementsByTagName("table")[0];
    for each (TR in TB.getElementsByTagName("tr"))
    { var FZ;
      try
      { var FZ=TR.getElementsByTagName("td")[1].innerHTML; 
        FZ = getFahrzeugKlasse(FZ);
        Unterwegs.push(FZ);
        AmOrt.push(FZ);
      } catch(e) {};
    }
  }
  var d = document.getElementById("driving_vehicle");
  if (d.getElementsByTagName("table").length == 1)
  { var TB=d.getElementsByTagName("table")[0];
    for each (TR in TB.getElementsByTagName("tr"))
    { var FZ;
      try
      { var FZ=TR.getElementsByTagName("td")[1].innerHTML; 
        FZ = getFahrzeugKlasse(FZ);
        Unterwegs.push(FZ);
        AufAnfahrt.push(FZ);
      } catch(e) {};
    }
  }
  var d = document.getElementById("waiting_vehicle");
  if (d.getElementsByTagName("table").length == 1)
  { var TB=d.getElementsByTagName("table")[0];
    for each (TR in TB.getElementsByTagName("tr"))
    { var FZ;
      try
      { var FZ=TR.getElementsByTagName("td")[1].innerHTML; 
        FZ = getFahrzeugKlasse(FZ);
        Unterwegs.push(FZ);
        Wartend.push(FZ);
      } catch(e) {};
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
    if (TR.getElementsByTagName("td")[0].innerHTML == "Verletzte")
    { var T = TR.getElementsByTagName("td")[1].innerHTML;
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

function getFahrzeuggeschwindigkeit(Fahrzeugname)
{ var G = Fahrzeuggeschwindigkeiten[Fahrzeugname];
  if (G == undefined) G = 1000;
  G = parseInt(G);
  return G;
}

function getEinsatzKlasse(Stichwort)
{ if (AlleGleich) return "-gleich-";
  mylog("getEinsatzKlasse(" + Stichwort + ")");
  
  EK=Einsatzklassen[Stichwort];
  
  if (EK == undefined) EK = "undef";
  mylog("returns " + EK);
  return EK;
}


function getNachforderungFahrzeug(Rueckmeldung)
{ mylog("getNachforderungFahrzeug(" + Rueckmeldung + ")");

  var FZ = Nachforderungen[Rueckmeldung];
  if (FZ == undefined) FZ = errateNachforderungFahrzeug(Rueckmeldung);
  mylog("returns " + FZ);
  return FZ;
}


function errateNachforderungFahrzeug(Rueckmeldung)
{ for (F in Fahrzeugklassen)
  { if (Rueckmeldung.indexOf(F) != -1) 
    { return Fahrzeugklassen[F]; }
  }
  return "";
}

function getFahrzeugListe(EKListe)
{ mylog("getFahrzeugListe(" + EKListe + ")");
  if (AlleGleich) return AlleGleich;
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

function getWikiLink(Stichwort)
{ mylog("getWikiLink(" + Stichwort + ")");
  var WL = WikiLinks[Stichwort];
  if (WL == undefined) 
  { WL = ""; }
  else
  { WL = "http://wiki.feuerwache.net/wiki/" + WL; }
  mylog("returns " + WL);
  return WL;
}

function trim (S) 
{ return S.replace (/^\s+/, '').replace (/\s+$/, '');
}
function removeTags (S) 
{ return trim(S.replace(/<.*?>/g, ''));
}
function makeDots(Zahl)
{ var Str = Zahl.toString();
  var ret = "";
  while (Str.length>3)
  { ret = "." + Str.substr(Str.length-3,3) + ret;
    Str = Str.substr(0,Str.length-3);
  }
  if (Str.length>0) 
  { ret = Str + ret; }
  else
  { ret = ret.substr(1,ret.length-1); }
  
  return ret;
}

function MarkiereFahrzeuge()
{ var D = document.getElementsByClassName("free_vehicle")[0];
  var TB = D.getElementsByTagName("table")[0];
  if (TB==undefined) return;
  var Zeilen = TB.getElementsByTagName("tr");
  var Anfahrt="";
  
  var imax=0;
  var imin=9999;

  for (var opt=0; opt<Optional.length; opt++)
  { var FZ = Optional[opt];
    var AlternativFZ = FZ.split("/");
    var Alternativen = AlternativFZ.length;
    mylog("(opt) suche nach " + AlternativFZ);
    
    //alert(Zeilen.length);
    for (var i=1; i<Zeilen.length-1; i++)
    { var ThisZeile = Zeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      	  //alert(ThisSpalten[2]);
      var ThisFZ = getFahrzeugKlasse(ThisSpalten[2].firstChild.nodeValue);
	//  alert(ThisSpalten[2].firstChild.nodeValue);
      var passt=false;
      for (var a=0 ; a<Alternativen ; a++) { if (ThisFZ == AlternativFZ[a]) passt = true; }
      if (passt)
      { var C = ThisSpalten[0].getElementsByTagName("input")[0];
        var RN = ThisSpalten[1].getElementsByTagName("a")[0];
        if (RN) RN = RN.innerHTML;
        if (C.alt != "x" && RN.substr(0,3).toUpperCase() != "XXX")
        { mylog("(opt) gefunden:" + ThisFZ);
          for (var s=0; s<ThisSpalten.length; s++) ThisSpalten[s].bgColor = "#BA5D5D";
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
    Anfahrt = "<font color=#BA5D5D>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font>";
    if (imin != imax)
    { Zeile = Zeilen[imin];
      Anfahrt = "zwischen <font color=#BA5D5D>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font> und " + Anfahrt;
    }
  }
  
  return Anfahrt;
}  

function AlarmiereFahrzeuge()
{ ClearFreeVehiclesTable(!CBClicked);

  var D = document.getElementsByClassName("free_vehicle")[0];
  var TB = D.getElementsByTagName("table")[0];
  if (TB==undefined) return;
  var Zeilen = TB.getElementsByTagName("tr");
  var AlarmZeilen = new Array();
  var Anfahrt="";
  
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
        var RN = ThisSpalten[1].getElementsByTagName("a")[0];
        if (RN) RN = RN.innerHTML;
        if (C.alt != "x" && RN.substr(0,3).toUpperCase() != "XXX")
        { mylog("gefunden:" + ThisFZ);
          if (FirstRun || !CBClicked) 
          { C.click();
            AlarmZeilen.push (ThisZeile);
          }
          C.alt="x";
          for (var s=0; s<ThisSpalten.length; s++) ThisSpalten[s].bgColor = "#C69C5A";
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
    Anfahrt = "<font color=chocolate>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font>";
    if (imin != imax)
    { Zeile = Zeilen[imin];
      Anfahrt = "zwischen <font color=chocolate>" + Zeile.getElementsByTagName("td")[4].innerHTML + "</font> und " + Anfahrt;
    }
  }

  if (zweiterAbmarsch != 0)
  { var AlarmWachen = new Array();
    var WachAlarm = new Array();
    
    for (var i=0; i<AlarmZeilen.length; i++)
    { var ThisZeile = AlarmZeilen[i];
      var ThisSpalten = ThisZeile.getElementsByTagName("td");
      var ThisCheckbox = ThisSpalten[0].getElementsByTagName("input")[0];
      var ThisWache = ThisSpalten[3].getElementsByTagName("a")[0].innerHTML;
      var ThisFZTyp = GrTrFahrzeug(ThisSpalten[2].innerHTML);
      var ThisFZAusb = AusbFahrzeug(ThisSpalten[2].innerHTML);
      var ThisFunkName = ThisSpalten[1].innerHTML;
      var FNEndLink = ThisFunkName.indexOf("</a>");
      var ThisFZUnterwegs = ( trim(ThisFunkName.substr(FNEndLink+4)) == "(unterwegs)" );
      
      if (!ThisFZUnterwegs)
      { if (!WachAlarm[ThisWache])
        { AlarmWachen.push (ThisWache);
          WachAlarm[ThisWache] = Array();
          WachAlarm[ThisWache][0] = "";
          WachAlarm[ThisWache][1] = "";
        }
        if (zweiterAbmarsch == 1)
        {
          if (ThisFZTyp == "Gr") WachAlarm[ThisWache][0] += "," + i;
          if (ThisFZTyp == "Tr") WachAlarm[ThisWache][1] += "," + i;
        }
        else if (zweiterAbmarsch == 2)
        {
          if (ThisFZAusb == "") WachAlarm[ThisWache][0] += "," + i;
          if (ThisFZAusb == "Ausb") WachAlarm[ThisWache][1] += "," + i;
        }
      }
    }
    for each (W in AlarmWachen)
    { if (WachAlarm[W][0] && WachAlarm[W][1])
      { var StornoZeilen = WachAlarm[W][0].split(",");
        for each (SZ in StornoZeilen)
        { if (SZ) AlarmZeilen[SZ].getElementsByTagName("input")[0].click();
        }
      }
    }
  }
  
  for (ta=ToAlarm.length; ta>=0; ta--)
  { if (ToAlarm[ta]=="gefunden") ToAlarm.splice(ta,1); }
  
  return Anfahrt;
}

function GrTrFahrzeug(FZBez)
{ var ret="";
  ret = "Tr";
  if (FZBez.substr(0,3) == "LF ") ret="Gr";
  if (FZBez == "Kleinlöschfahrzeug") ret="Gr";
  mylog("FZBez = " + FZBez + ", Typ=" + ret);
  return ret;
}  

function AusbFahrzeug(FZBez)
{ var ret="";
  if (FZBez == "GW-Gefahrgut") ret="Ausb";
  if (FZBez == "GW-Messtechnik") ret="Ausb";
  if (FZBez == "GW-Taucher") ret="Ausb";
  if (FZBez == "RTW") ret="Ausb";
  if (FZBez == "Flugfeldlöschfahrzeug") ret="Ausb";
  if (FZBez == "Rettungstreppe") ret="Ausb";
  if (FZBez == "Löschboot") ret="Ausb";
  if (FZBez == "Rettungsboot") ret="Ausb";
  if (FZBez == "TUIS") ret="Ausb";
  mylog("FZBez = " + FZBez + ", Typ=" + ret);
  return ret;
}  
  
function zaehleVerfuegbar()
{ // Array aufbauen, Reihenfolge wie in Fahrzeugklassen
  var ArrFZK = new Array();
  var strFZK = "";

  for (F in Fahrzeugklassen)
  { var FZK = Fahrzeugklassen[F];
    if (!strFZK.match("#"+FZK+"#"))
    { ArrFZK.push(FZK);
      strFZK += "#" + FZK + "#";
    }
  }
  var AnzFZK=new Array();
  var AnzFZKXXX=new Array();
  for each (FZK in ArrFZK) 
  { AnzFZK[FZK]=0;
    AnzFZKXXX[FZK]=0;
  }
  
  // Freie-Fahrzeuge-Tabelle durchscannen
  var FV=document.getElementsByClassName("free_vehicle");
  if (!FV) return "";
  var TB=FV[0].getElementsByTagName("table");
  if (TB.length==0) return "";
  for each (TR in TB[0].getElementsByTagName("tr"))
  { var FZ;
    var TDs=TR.getElementsByTagName("td");
    if (TDs.length==5) 
    { FZ=TDs[2].innerHTML;
      var FN=TDs[1].getElementsByTagName("a")[0].innerHTML;
      var FZK=getFahrzeugKlasse(FZ);
      if (FN.substr(0,3).toUpperCase()=="XXX")
      { AnzFZKXXX[FZK]++; }
      else
      { AnzFZK[FZK]++; }
    }
  }

  var ret = "<table border='0'><tr>";
  var c=0;
  for each (FZ in ArrFZK)
  { if (c==MAXSPALTENVERFUEGBAR) c=0, ret+="</tr><tr>";
    if (AnzFZK[FZ] == 0) ret += "<td style='border:0;'><font size=2><font color='red'>"+AnzFZK[FZ]+"</font></font>";
    if (AnzFZK[FZ] != 0) ret += "<td style='border:0;'><font size=2><font color='green'>"+AnzFZK[FZ]+"</font></font>";
    if (AnzFZKXXX[FZ]) ret +="<font color='orange'>/"+AnzFZKXXX[FZ]+"</font>";
    ret += "<br>"+FZ+"&nbsp;</td>";
    c++;
  }

  ret +="</tr></table>";
  return ret;
}

function mylog(Text)
{ if (!debugging) return;

  var Jetzt = new Date();
  GM_log(Jetzt.toLocaleString() + "\n" + Text); 
}

function GetVariables()
{ mylog("GetVariables");

  showInfoKlasseInListe = GM_getValue("showInfoKlasseInListe",true);
  showInfoStichwort = GM_getValue("showInfoStichwort",true);
  showInfoEinsatzgebiet = GM_getValue("showInfoEinsatzgebiet",true);
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
  showInfoVerfuegbar = GM_getValue("showInfoVerfuegbar",true);
  

  
  ScriptUpdateAvailable = GM_getValue("pleaseUpdate","");
}

function SetVariables()
{ mylog("SetVariables");
  
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
  GM_setValue("showInfoVerfuegbar",showInfoVerfuegbar);
  GM_setValue("showInfoEinsatzgebiet",showInfoEinsatzgebiet);
}

function ZeitToSek(txtZeit)
{ // errechnet aus der Klartext-Zeit die Anzahl der Sekunden
  var Teile = txtZeit.split(".");
  var sek=0;
  for each (Teil in Teile)
  { Teil = trim(Teil);
    var Wert = Teil.split(" ");
    var Zahl = Wert[0];
    if (Zahl.match("0[1-9]+")) Zahl = Zahl.substr(1,Zahl.length);
    Zahl = parseInt(Zahl);
    var Einheit = Wert[1];
    switch (Einheit)
    { case "Sek": sek += Zahl; break;
      case "Min": sek += Zahl*60; break;
      case "Std": sek += Zahl*3600; break;
    }
  }
  return sek;
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
      var THText = TR.getElementsByTagName("td")[0].innerHTML;
      if (THText == "Einsatz von")
      { var UserEinsatz="Y";
        Obj = TR.getElementsByTagName("td")[1];
        if (Obj) Obj = Obj.getElementsByTagName("a")[0];
        if (Obj) UserEinsatz=Obj.innerHTML;
        if (User != UserEinsatz) ret=true;
      }
    }
  }

  mylog("Verbandseinsatz=" + ret);
  return ret;
}

function NowDateString()
{ var Now = new Date();
  var X,R="";
  var X = Now.getFullYear();
  R+=X;
  X = "0" + (Now.getMonth()+1);
  X = X.substr(X.length-2,2);
  R+=X;
  X = "0" + Now.getDate();
  X = X.substr(X.length-2,2);
  R+=X;
  
  return R;
}

function updateTest()
{ // prüfen, ob heute bereits ein Update-Check stattgefunden hat:
  var LastUpdate = GM_getValue("LastUpdate","0");
  var heute = NowDateString();
  mylog("heute = " + heute + "\nLastUpdate = " + LastUpdate);
  
  // wenn ja, nicht noch einmal prüfen
  if (LastUpdate == heute) return;

  // heute nicht nochmal prüfen
  GM_setValue("LastUpdate",heute);
  
  // userscript-Seite öffnen, um Version auszulesen
  GM_xmlhttpRequest
  ( { method: 'GET', 
      url: UPDATEURL, 
      onload: function(r) 
      { if (r.status==200)
        { XML = r.responseText;
          DoUpdateCheck(XML);
        }
      }
    } 
  )
}

function DoUpdateCheck(XML)
{ var ThisVersion = GM_getValue("Version","version");
  var OnlineVersion = ParseXMLforVersion(XML);
  mylog("This  ="+ThisVersion);
  mylog("Online="+OnlineVersion);

  if (ThisVersion != OnlineVersion)
  { GM_setValue("pleaseUpdate",OnlineVersion);
    ScriptUpdateAvailable = OnlineVersion;
  }
  else
  { GM_setValue("pleaseUpdate","");
    ScriptUpdateAvailable = "";
  }
}

function ParseXMLforVersion(XML)
{ // aus XML den Versionsstand herausziehen:
  var H = XML;
  var Pos = H.indexOf("<div id='summary'>");
  if (Pos<0) return "OnlineVersion";
  H = H.substr(Pos,H.length);
  
  Pos = H.indexOf("<b>Version:</b>");
  H = H.substr(Pos+16,H.length);
  
  Pos = H.indexOf("<br />");
  H = H.substr(0,Pos-1);

  return H;
}

function parseAAO(T)
{ mylog("parseAAO");

  for (EK in Einsatzklassen)
  { mylog("EK vorher:" + EK + " -> " + Einsatzklassen[EK]); }

  Einsatzklassen = new Object;
  Einsatzklasse_Fahrzeugzuordnung = new Object;
  Fahrzeugklassen = new Object;

  var Zeilen = T.split("\n");
  var Bereich="";
  for each(Z in Zeilen)
  { if (Z.substr(0,3)=="===")
    { if (Z == "===Einsatzklassen") Bereich="EKlassen";
      if (Z == "===Fahrzeugzuordnung") Bereich="Zuordnung";
      if (Z == "===Fahrzeugklassen") Bereich="FZKlassen";
    }
    else
    { while (Z.match("\t\t")) Z=Z.replace("\t\t","\t");
      var Teile=Z.split("\t");
      var Titel = Teile[0];
      var Inhalt = Teile[1];
      mylog("Bereich=" + Bereich + ", Titel=" + Titel + ", Inhalt = " + Inhalt);
      switch (Bereich)
      { case "EKlassen":
          Einsatzklassen[Titel] = Inhalt;
          break;
        case "Zuordnung":
          Einsatzklasse_Fahrzeugzuordnung[Titel] = Inhalt;
          break;
        case "FZKlassen":
          Fahrzeugklassen[Titel] = Inhalt;
          break;
      }
    }
  }
  if (debugging)
  {
    for (EK in Einsatzklassen)  { mylog("EK nachher:" + EK + " -> " + Einsatzklassen[EK]); }
    for (ZU in Einsatzklasse_Fahrzeugzuordnung)  { mylog("ZU nachher:" + ZU + " -> " + Einsatzklasse_Fahrzeugzuordnung[ZU]); }
    for (FK in Fahrzeugklassen)  { mylog("FK nachher:" + FK + " -> " + Fahrzeugklassen[FK]); }
  }
}

function AAO_doDownload()
{ mylog("doDownload");
  var AAOURL;
  if (document.getElementById('AAO_downloadSource')) AAOURL = document.getElementById('AAO_downloadSource').value;
  if (!AAOURL) AAOURL=GM_getValue("AAO_Source","");
  if (!AAOURL) AAOURL="http://userscripts.org/scripts/review/71524";
  GM_setValue("AAO_Source",AAOURL);

  GM_xmlhttpRequest
  ( { method: 'GET', 
      url: AAOURL,
//      overrideMimeType: "text/html; charset=ISO-8859-1",
      overrideMimeType: "text/html; charset=UTF-8",
      onerror: function(r) 
      { dt();mylog("onerror aufgerufen");mylog(r.status + " = " + r.statusText + "\n" + r.responseText);df();
        alert("Fehler beim AAO-Download"); location.reload(); 
      } ,
      onload: function(r) 
      { if (r.status==200) 
        { //dt();mylog(r.responseHeaders);df();
          parseDownload( r.responseText , r.responseHeaders ); 
        }
        else
        { dt();mylog("r.status = " + r.status + " = " + r.statusText);df();
          alert("Fehler beim AAO-Download"); location.reload(); 
        }
      }
    } 
  )
  if (document.getElementById("AAO_downloadButton")) document.getElementById("AAO_downloadButton").value = "**bitte warten**";
}

function parseDownload(T,H)
{ mylog("parseDownload");
  var HArr = H.split("\n");
  for each (H in HArr)
  { if (H.match("Content-Type"))
    { dt();mylog("H="+H);df();
      if (! H.match("utf-8")) 
      { alert("der Server hat die Umlaute zerstört!. Kann AAO nicht einlesen");
        document.location.reload();
        return;
      }
    }
  }
  var TArr = T.split("\n");
  var AAOArr = new Array;
  var inside=false;
  for each (Zeile in TArr)
  { Zeile = trim(Zeile);
    if (Zeile.substr(0,3) == "===") inside=true;
    if (Zeile.substr(0,7) == "===Ende") { inside=false; }

    if (inside)
    { var weiter=true;
      if (Zeile == "") weiter=false;
      if (Zeile.substring(0,1) == "#") weiter=false;
      if (weiter)
      { 
        AAOArr.push (Zeile); 
      }
    }
  }
  AAO = AAOArr.join("\n");
  if (AAO=="") AAO="dummy";
  GM_setValue("AAO",AAO);
  alert("AAO wurde eingelesen");
  document.location.reload();
}

function init()
{ mylog ("init startet");

  ToAlarm="";
  NichtVerf="";

  // AAO-Variable auslesen
  AAO = GM_getValue("AAO","");

  // wenn eine AAO vorliegt, diese umsetzen, sonst erst eine einlesen
  if (AAO != "") 
  { parseAAO(AAO); }
  else
  { AAO_doDownload(); }

  document.addEventListener("DOMNodeInserted", nodeInserted, false);
  GetVariables();
  if (CHECKFORUPDATES) updateTest();
  
}

function nodeInserted(e)
{ // wenn ich selbst für die Änderung verantwortlich bin, nichts unternehmen
  if (ichBins) return;

  mylog ("nodeInserted, e=" + e.target.innerHTML.substr(0,100));

  // reload auf Übersichtseite hat stattgefunden:
  if (e.target.innerHTML == "Einsätze deines Verbandes")
  { window.setTimeout(main, 10);
    return;
  }
  // reload auf Einsatzseite hat stattgefunden:
  if (e.target.innerHTML.indexOf("<h2>Freie Fahrzeuge</h2>") > 0)
  { window.setTimeout(main, 100);
    return;
  }
  // in Schule wurde eine Wache "aufgeklickt":
  if (e.target.innerHTML.indexOf("<th>Ausbildung</th>") > 0)
  { window.setTimeout(Markiere_Schueler(e),10);
    return;
  }
  // reload auf Leitstellenansicht hat stattgefunden:
  if (e.target.innerHTML == "Leitstellenansicht")
  { window.setTimeout(main, 10);
    return;
  }

  mylog("HREF=" + document.location.href + "\nInserted: " + e.target.innerHTML.substr(0,500));
}

function dt() { debugging=true; }
function df() { debugging=false; }