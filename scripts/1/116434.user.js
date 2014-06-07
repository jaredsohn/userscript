// ==UserScript==
// @name            FWN Auftragsmarkierung 
// @namespace       http://userscripts.org/users/116434
// @description     Farbmarkierung der Auftraege (Eigene & Verband)
// @include         http://www.feuerwache.net/feuerwehr-einsaetze*
// @include         http://www.feuerwache.net/Auftragskonfig			
// @version         2012-03-17 00:30
// @author          SirAlex21
// ==/UserScript==

/* *****************************************************************************************
ACHTUNG
Wenn das Script angepasst und erneut auf userscripts.org veröffentlicht wird,
MUSS die USERSCRIPTID angepasst werden.
********************************************************************************************/
//Updated Managment

const USERSCRIPTID = '116434'; // diese Konstante ist anzupassen
// unter welchem URL finde ich Infos über das Script?
const UPDATEURL="http://userscripts.org/scripts/show/"+USERSCRIPTID;
// unter welchem URL finde ich das Script als Installation?
const INSTALLURL="http://userscripts.org/scripts/source/"+USERSCRIPTID+".user.js";
// unter welchem URL finde ich die Metadaten zum Script?
const UPDATEURLmeta="http://userscripts.org/scripts/source/"+USERSCRIPTID+".meta.js";
var ichBins;
var ScriptUpdateAvailable = GM_getValue("pleaseUpdate","");

updateTest();
showUpdate();

var Welt = document.getElementById('root').getElementsByTagName('li')[2].getElementsByTagName('a')[0].innerHTML.split(" ")[1]
document.addEventListener("DOMNodeInserted", nodeInserted, false);
					
var adr = document.location.href;
if (adr == "http://www.feuerwache.net/feuerwehr-einsaetze") Übersichtsseite();
if (adr.match("http://www.feuerwache.net/feuerwehr-einsaetze/[0-9]*")) Einsatzseite();
if (adr == "http://www.feuerwache.net/Auftragskonfig") Auftragskonfig();



function nodeInserted(e)
{
	if (ichBins) return;
	if (adr == "http://www.feuerwache.net/feuerwehr-einsaetze") window.setTimeout(Übersichtsseite, 10);
	if (adr == "http://www.feuerwache.net/feuerwehr-einsaetze/*") window.setTimeout(Einsatzseite, 10);
}

function Übersichtsseite()
{	
	ichBins = true;
	
	// Füge Link zur Konfigseite ein
	
	var Links = document.getElementsByTagName("a");
	for each (Link in Links) if(typeof Link == 'object') if (Link.innerHTML.match("Verlinke Feuerwache.net"))
	{		
			Link.style.color = "DeepSkyBlue";
			Link.style.fontWeight = "bold";
			Link.href = '/Auftragskonfig';
			Link.innerHTML = "Verbandsaufträge Konfigurieren";
	}
	
	//Eigenen Auftrag ermitteln
	
	var MeinAuftrag=document.getElementsByClassName("level2")[1].getElementsByTagName("li")[0].innerHTML.split('"')[7];
	
	// Einsätze einfärben
	
	var TR=document.getElementsByTagName("tr");
	for (var i=0;TR.length > i; i++)
		{
			var TD=TR[i].getElementsByTagName("td")[1];
			if (typeof TD != 'undefined')
			{	// Auftragseinsätze des Verbandes Blau Markieren
				
				var Einsatzname = "_" + TD.innerHTML.split(">")[1].split("<")[0];
				if (GM_getValue("VAuftrag_W" + Welt + Einsatzname,false))
					{ 	
						TD.getElementsByTagName("a")[0].style.color = "blue";
						TD.getElementsByTagName("a")[0].style.fontWeight = "bold";
					}
				
				// Meine Auftragseinsätze grün Markieren
					
				if ( Einsatzname == "_" +MeinAuftrag)
					{	
						TD.getElementsByTagName("a")[0].style.color = "forestgreen";
						TD.getElementsByTagName("a")[0].style.fontWeight = "bold";
					}
			}	
			
		}
	ichBins = false;
}

function Einsatzseite()
{	
	if (document.getElementsByTagName("h1")[0].innerHTML.match("famfamfamicon")) var Einsatzname = Trim(document.getElementsByTagName("h1")[0].innerHTML.split(">")[1].split("<")[0]); else var Einsatzname = Trim(document.getElementsByTagName("h1")[0].innerHTML);
	if (GM_getValue("VAuftrag_W" + Welt + "_" + Einsatzname,false)) document.getElementsByTagName("h1")[0].style.color = "blue";
	var EigenerAuftrag = document.getElementsByClassName("level2")[1].getElementsByTagName("li")[0].innerHTML.split('"')[7];
	if (Einsatzname == EigenerAuftrag) document.getElementsByTagName("h1")[0].style.color = "forestgreen";
}

function Auftragskonfig()
{	ichBins = true
	var content = document.getElementById('content');
	var len = content.childNodes.length;
	
	for (var i = 1; i <= len; i++) {
		content.removeChild(content.childNodes[0]);
	}
	
	var h1=createElement('h1');
	 h1.innerHTML = '<br>'
	 h1.appendChild(document.createTextNode('Konfig der Auftragseinsätze'));
	 content.appendChild(h1);
	 content.appendChild(KonfigHTML());
	var Boxes = document.getElementsByName("KonfigBox_W1");
	for ( var i=0;i < Boxes.length;i++) {
		Boxes[i].addEventListener("click",KonfigBox_clicked,false);
	}
	var Boxes = document.getElementsByName("KonfigBox_W2");
	for ( var i=0;i < Boxes.length;i++) {
		Boxes[i].addEventListener("click",KonfigBox_clicked,false);
	}
	ichBins = false
}

function KonfigHTML()
{ 
	if (document.getElementById("DivKonfig")) return "";
  
	var NewDiv = document.createElement("div");
	NewDiv.id = "DivKonfig";
	NewDiv.innerHTML = "<br><h2>W1&nbsp&nbspW2&nbsp&nbsp&nbspEinsatz</h2>\n<br>";
	
	
	NewDiv.appendChild(CreateDiv("Ammoniakaustritt in Eishalle"));
        NewDiv.appendChild(CreateDiv("Auffahrunfall"));
	NewDiv.appendChild(CreateDiv("Ausgedehnter Waldbrand"));
	NewDiv.appendChild(CreateDiv("Auslaufende Betriebsstoffe"));
	NewDiv.appendChild(CreateDiv("Baum auf Auto"));
	NewDiv.appendChild(CreateDiv("Baum auf Dach"));
	NewDiv.appendChild(CreateDiv("Baum auf Schiene"));
	NewDiv.appendChild(CreateDiv("Baum auf Straße"));
	NewDiv.appendChild(CreateDiv("Brand am Bahndamm"));
	NewDiv.appendChild(CreateDiv("Brand auf Weihnachtsmarkt"));
	NewDiv.appendChild(CreateDiv("Brand im Baumarkt"));
	NewDiv.appendChild(CreateDiv("Brand im Casino"));
	NewDiv.appendChild(CreateDiv("Brand im Sägewerk"));
	NewDiv.appendChild(CreateDiv("Brand im Supermarkt"));
	NewDiv.appendChild(CreateDiv("Brand in Autohaus"));
	NewDiv.appendChild(CreateDiv("Brand in Betankungsanlage"));
        NewDiv.appendChild(CreateDiv("Brand in Brauerei"));
	NewDiv.appendChild(CreateDiv("Brand in Briefkasten"));
	NewDiv.appendChild(CreateDiv("Brand in Druckerei"));
	NewDiv.appendChild(CreateDiv("Brand in Eishalle"));
	NewDiv.appendChild(CreateDiv("Brand in Fahrkartenautomat"));
	NewDiv.appendChild(CreateDiv("Brand in Gärtnerei"));
	NewDiv.appendChild(CreateDiv("Brand in Gemeindehaus"));
	NewDiv.appendChild(CreateDiv("Brand in Großwäscherei"));
        NewDiv.appendChild(CreateDiv("Brand in KFZ-Werkstatt"));
	NewDiv.appendChild(CreateDiv("Brand in Kletterhalle"));
	NewDiv.appendChild(CreateDiv("Brand in Kühlhaus"));
	NewDiv.appendChild(CreateDiv("Brand in Lackfabrik"));
	NewDiv.appendChild(CreateDiv("Brand in Metzgerei"));
	NewDiv.appendChild(CreateDiv("Brand in Raffinerie"));
	NewDiv.appendChild(CreateDiv("Brand in Reifenlager"));
	NewDiv.appendChild(CreateDiv("Brand in Schloss"));
	NewDiv.appendChild(CreateDiv("Brand in Schule"));
	NewDiv.appendChild(CreateDiv("Brand in Spedition"));
	NewDiv.appendChild(CreateDiv("Brand in Sporthalle"));
	NewDiv.appendChild(CreateDiv("Brand in Zugdepot"));
	NewDiv.appendChild(CreateDiv("Brand-Weihnachtsbaum in Kirche"));
	NewDiv.appendChild(CreateDiv("Brennende Bäume"));
	NewDiv.appendChild(CreateDiv("Brennende Lokomotive"));
	NewDiv.appendChild(CreateDiv("Brennende S-Bahn"));
	NewDiv.appendChild(CreateDiv("Brennende Telefonzelle"));
	NewDiv.appendChild(CreateDiv("Brennender Güterzug"));
	NewDiv.appendChild(CreateDiv("Brennender Güterzug (Bahnhof)"));
	NewDiv.appendChild(CreateDiv("Brennender Güterzug (Tunnel)"));
	NewDiv.appendChild(CreateDiv("Brennender LKW"));
	NewDiv.appendChild(CreateDiv("Brennender Müllwagen"));
	NewDiv.appendChild(CreateDiv("Brennender PKW"));
	NewDiv.appendChild(CreateDiv("Brennender Sicherungskasten"));
	NewDiv.appendChild(CreateDiv("Brennendes Bus-Häuschen"));
	NewDiv.appendChild(CreateDiv("Brennendes Flugzeug"));
	NewDiv.appendChild(CreateDiv("Brennendes Gebüsch"));
	NewDiv.appendChild(CreateDiv("Brennendes Gras"));
	NewDiv.appendChild(CreateDiv("Brennt Tanklager "));
	NewDiv.appendChild(CreateDiv("Chemieunfall (an Schule)"));
	NewDiv.appendChild(CreateDiv("Chlorgas Alarm (Schwimmbad)"));
	NewDiv.appendChild(CreateDiv("Container Brand"));
	NewDiv.appendChild(CreateDiv("Dachstuhlbrand"));
	NewDiv.appendChild(CreateDiv("Fahrstuhl - Türöffnung"));
	NewDiv.appendChild(CreateDiv("Feldbrand"));
	NewDiv.appendChild(CreateDiv("Fettbrand in Pommesbude"));
	NewDiv.appendChild(CreateDiv("Feuer auf Boot (Klein)"));
	NewDiv.appendChild(CreateDiv("Feuer auf Boot (Mittel)"));
	NewDiv.appendChild(CreateDiv("Feuer im Altenheim"));
	NewDiv.appendChild(CreateDiv("Feuer im Krankenhaus"));
	NewDiv.appendChild(CreateDiv("Feuer im Laubhaufen"));
	NewDiv.appendChild(CreateDiv("Feuer im Personenzug"));
	NewDiv.appendChild(CreateDiv("Feuer im Personenzug (Bahnhof)"));
	NewDiv.appendChild(CreateDiv("Feuer im Personenzug (Tunnel)"));
	NewDiv.appendChild(CreateDiv("Feuer in Bahnhofshalle"));
	NewDiv.appendChild(CreateDiv("Gabelstapler im Hafenbecken"));
	NewDiv.appendChild(CreateDiv("Garagenbrand"));
	NewDiv.appendChild(CreateDiv("Gartenlaubenbrand"));
	NewDiv.appendChild(CreateDiv("Gastronomiebrand"));
	NewDiv.appendChild(CreateDiv("Gefahrstoff-Austritt in Firma"));
	NewDiv.appendChild(CreateDiv("Gewerbebrand"));
	NewDiv.appendChild(CreateDiv("Grasnarbenbrand"));
	NewDiv.appendChild(CreateDiv("Güterzug entgleist"));
	NewDiv.appendChild(CreateDiv("Güterzug entgleist (Bahnhof)"));
	NewDiv.appendChild(CreateDiv("Güterzug entgleist (Tunnel)"));
	NewDiv.appendChild(CreateDiv("Kaminbrand"));
	NewDiv.appendChild(CreateDiv("Keller unter Wasser"));
	NewDiv.appendChild(CreateDiv("Kellerbrand"));
	NewDiv.appendChild(CreateDiv("Kinobrand"));
	NewDiv.appendChild(CreateDiv("Kioskbrand"));
	NewDiv.appendChild(CreateDiv("Kleiner Waldbrand"));
	NewDiv.appendChild(CreateDiv("Kleintier in Not"));
	NewDiv.appendChild(CreateDiv("Küchenbrand"));
	NewDiv.appendChild(CreateDiv("LKW in Brückengeländer"));
	NewDiv.appendChild(CreateDiv("Mähdrescherbrand"));
	NewDiv.appendChild(CreateDiv("Maschinenbrand"));
	NewDiv.appendChild(CreateDiv("Motorrad-Brand"));
	NewDiv.appendChild(CreateDiv("Mülleimer Brand"));
	NewDiv.appendChild(CreateDiv("Ölspur"));
	NewDiv.appendChild(CreateDiv("Person im Fluss"));
	NewDiv.appendChild(CreateDiv("Person in Schacht"));
	NewDiv.appendChild(CreateDiv("PKW in Fluss"));
	NewDiv.appendChild(CreateDiv("Rangierunfall"));
	NewDiv.appendChild(CreateDiv("Scheunenbrand"));
	NewDiv.appendChild(CreateDiv("Schornsteinbrand"));
	NewDiv.appendChild(CreateDiv("Schuppenbrand"));
	NewDiv.appendChild(CreateDiv("Silobrand"));
	NewDiv.appendChild(CreateDiv("Sperrmüllbrand"));
	NewDiv.appendChild(CreateDiv("Strohballen Brand"));
	NewDiv.appendChild(CreateDiv("Tankbrand"));
	NewDiv.appendChild(CreateDiv("Traktorbrand"));
	NewDiv.appendChild(CreateDiv("Trocknerbrand"));
	NewDiv.appendChild(CreateDiv("Türöffnung"));
	NewDiv.appendChild(CreateDiv("Unfall an Bahnübergang"));
	NewDiv.appendChild(CreateDiv("Unfall mit Gefahrgut-Transport"));
	NewDiv.appendChild(CreateDiv("Verkehrsunfall"));
	NewDiv.appendChild(CreateDiv("VU mit Straßenbahn"));
	NewDiv.appendChild(CreateDiv("Waldbrand"));
	NewDiv.appendChild(CreateDiv("Wohnblockbrand"));
	NewDiv.appendChild(CreateDiv("Wohnungsbrand"));
	NewDiv.appendChild(CreateDiv("Wohnwagenbrand"));

	
	var SpeicherButton = document.createElement("a");	
	SpeicherButton.id = "btSpeichern";
	SpeicherButton.innerHTML = "<br><br> Speichern";
	SpeicherButton.href = "feuerwehr-einsaetze";
	
	NewDiv.appendChild(SpeicherButton)	
	
	return NewDiv;
}

function CreateDiv(Einsatz)
{	
	var EinsatzDiv = document.createElement("div");
	EinsatzDiv.id = Einsatz;
	CB = "&nbsp<input type='checkbox' name='KonfigBox_W1'";
	if (GM_getValue("VAuftrag_W1_" + Einsatz,false)) CB += "checked";
	CB += ">&nbsp&nbsp&nbsp&nbsp<input type='checkbox' name='KonfigBox_W2'";
	if (GM_getValue("VAuftrag_W2_" + Einsatz,false)) CB += "checked";
	CB += ">&nbsp&nbsp&nbsp&nbsp" + Einsatz + "<br>\n";
	EinsatzDiv.innerHTML = CB;
	
	return EinsatzDiv;
}

function KonfigBox_clicked(e)
{	var WKlicked = e.target.name.split("_")[1] + "_"
	if (e.target.checked == true) GM_setValue("VAuftrag_" + WKlicked + e.target.parentNode.id,true); 
	if (e.target.checked == false) GM_deleteValue("VAuftrag_" + WKlicked + e.target.parentNode.id); 
}

function createElement(type, attributes)
{
  var node = document.createElement(type);
  for (var attr in attributes)   if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);  
  return node;
}

function Trim(s) 
{ return s.replace (/^\s+/, '').replace (/\s+$/, '');
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
  
  // wenn ja, nicht noch einmal prüfen
  if (LastUpdate >= heute ) return;

  // heute nicht nochmal prüfen
  GM_setValue("LastUpdate",heute);
  
  // userscript-Seite öffnen, um Version auszulesen
  GM_xmlhttpRequest
  ( { method: 'GET', 
      url: UPDATEURLmeta, 
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
  var versionArr = XML.match(/\/\/\s\@version\s*(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2})/);
  if (RegExp.$1 != "")
  {
    return RegExp.$1;
  }
  return '';
}

function showUpdate() {
  if (ScriptUpdateAvailable != ""){ 
	var updatediv=createElement('div',{'align':'center'});
	var br=createElement("br");
	updatediv.appendChild(br.cloneNode(true));
	var headdiv=createElement('div');
	headdiv.style.color='red';
	headdiv.appendChild(createText("Achtung: Deine Skriptversion ist nicht mehr aktuell!"));
	updatediv.appendChild(headdiv);
	updatediv.appendChild(br.cloneNode(true));
	var a=createElement('a',{'href':UPDATEURL,'target':'_new'});
	updatediv.appendChild(a);
	a.appendChild(createText("Informationen"));
	updatediv.appendChild(createText(" dazu oder gleich "));
	var a=createElement('a',{'id':'installURL','href':INSTALLURL,'target':'_new'});
	a.appendChild(createText("neue Version installieren"));
	updatediv.appendChild(a);
    updatediv.appendChild(br.cloneNode(true));
	updatediv.appendChild(br.cloneNode(true));
  
  //var h1=document.getElementsByTagName('h1')[0];
  document.getElementById("content").insertBefore(updatediv,document.getElementById("content").firstChild);
  
  // Upatemeldung entfernen, wenn geklickt
  document.getElementById("installURL").addEventListener ( 
      "click" , 
      function(){ GM_setValue("Version",ScriptUpdateAvailable); ScriptUpdateAvailable=""; GM_setValue("pleaseUpdate",""); } , 
      true )
  }
}

function createText(text)
{
	return document.createTextNode(text);
}


