// ==UserScript==
// @name           HoriFix
// @namespace      http://horiversum.org
// @description    Horizon Fixes & Mods
// @version 1.1.7 [beta]
// @include        http://horiversum.org/game/main/main.php*
// @include        http://horiversum.org*
// ==/UserScript==

/*
Versionen:
1.0.0: Men�erweiterung nach Vorlage von schnatter
1.0.1: Men�erweiterung mit 4 Links in einer Zeile
1.1.1: Fixes f�r 1024er-Bildschirmbreite (1024 fix)
1.1.2: Fixes f�r geringe Bildschirmbreite (dynamisch)
1.1.3: Begrenzung des Chat zur Freihaltung der Planetenquickbar, Berechnungsanpassung Bildschirm
1.1.4: User-Konfiguration
1.1.5: sinnvoller Scrollbereich bei verkleinertem Browserfenster
1.1.6: MessageDelete integriert 
1.1.7: [beta] bestehende scripte integeriert: anzahl der aggs im schrein hinzugefügt; Direktlink im Feld Eigene Flottenoperationen integriert; 
	   Summiert Aggregatvolumen im Lademenue & zeigt nur bestimmte Aggregate an;  Tankerzahl fuer Sprungtorflug, Ueberzahl an Tankern; 
	   Berichte und Nachrichten: Papierkorb & Checkbox Vorauswahl & Ausblendung & Ziellink & MotiSchutz; Arenen Direktlink ins Turniersystem; 
	   Fuegt ein Button ein, mit dem man beim Laden automatisch '9999M' eintraegt

Bekannte Probleme und Einschr�nkungen:
- Aus einem noch unerfindlichen Grund funktioniert die Einbindung von jquery mittels 'require' nicht
- FF: Breitenanpassungen erfolgen nur bei reload, nicht automatisch nach �nderung der Bildschirmgr��e
- Chatl�nge: Eingabezeile kann am unteren Bildrand rausrutschen
*/


//KONFIGURATION								

// aktiv beim wert "true"
var MenueErweiterung = true;				// fuegt zusaetzliche Links ins Menue ein

var PlanetenquickbarAnpassen = true;		// erzeugt einen Zeilenumbruch bei der Planetenquickbar
var QuickbarPlanetsMax = 10;		// Automatisch: 0 oder Maximum Planeten in einer Quickbarzeile (1024x768: 10)

var ScreenVerkleinern = false;		// beschraenkt den benutzten Bereich
var ScreenBreite = 1440;			// Breite des zu nutzenden Bildschirms
var ChatBreite = 0;			// Breite des Chat (0=Auto, n=Breite)

var ChatHoeheAnpassen = 2;			// Laesst den Chat unterhalb der Planiquickbar enden (0=Aus, n=Planiquickbarzeilen)

var MainScreenImmerGross = true;		// Erzeugt einen sinnvollen Scrollbereich bei verkleinertem Browserfenster
var PapierkorbSymbol = true;		//Fügt bei Berichten & Nachrichten den Mülleimer wieder oben ein

/*
// Bei den Zahlen am besten ein bisschen rumprobieren; �ndern->Speichern->Seite neu laden
var BreiteFuerPlanetenquickbar = 800;		// Breite der Planetenquickbar; groessere Zahl = schmalere Quickbar
var BreiteFuerChatFenster = 800;			// Breite des Chats; groessere Zahlen = schmalerer Chat
// ich habe bspw. 1440 Bildschirmbreite und f�r die Quickbar 1300 und das Chatfenster 1400 eingestellt
*/

//SKRIPTANFANG ab hier nichts mehr ver�ndern

var $;

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://code.jquery.com/jquery-1.5.2.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();


// All your GM code must be inside this function
function letsJQuery() {
//    alert($); // check if the dollar (jquery) function works
		
//Start Men�erweiterung		
	if (MenueErweiterung){
		//		$("div.ContainerActPlanet").css("height", "123px"); //ggf. obere Position des 1. Men�eintrags ausgleichen
		var divs = $("div.NavItem");
		for(var idx=0; idx<divs.size(); idx++)
		{
			if($(divs[idx]).html().match("Einstellungen"))
			{
			var top = $(divs[idx]);
			var emptydiv = $(top).prev().clone();
			
			//im folgenden Abschnitt keine Leerzeichen oder Umbr�che einf�gen!
			//4 abgek�rzte Links, Gesamtbreite 89px
            top.before('<div class="NavItem"><span><a href="http://confed.netcommander.ch/" target="_blank_tools" title="Darkangels Tools" class="NavLink" style="width:24px;display:inline-block">DT</a></span><span><a href="http://stan.goetterheimat.de/index/statistics" target="_blank_stan" title="STAN Statistik" class="NavLink" style="width:24px;display:inline-block">ST</a></span><span><a href="http://bugs.horiversum.org/ " target="_blank_mantis" title="Mantis" class="NavLink" style="width:17px;display:inline-block">M</a></span><span><a href="http://horitest.goetterheimat.de/homepage/newspaper/index.php" target="_blank_galamag" title="Galaxy Mag" class="NavLink" style="width:24px;display:inline-block">GM</a></span></div>');
            top.before('<div class="NavItem"><span><a href="http://fanatiker.hanneskaube.de" target="_blank_fanacenter" title="Fraktionscenter"  class="NavLink" style="width:24px;display:inline-block">FC</a></span><span><a href="http://www.rebbo.de/fanatiker/" target="_blank_fanaforum" title="Fana Forum" class="NavLink" style="width:24px;display:inline-block">FF</a></span><span><a href="http://fanatiker.hanneskaube.de/wiki/" target="_blank_fanawiki" title="Fana Wiki" class="NavLink" style="width:17px;display:inline-block">W</a></span><span><a href="https://docs.google.com/?pli=1#home" target="_blank_gs" title="Google Docs" class="NavLink" style="width:17px;display:inline-block">GD</a></span></div>');

			top.before(emptydiv); //nur Abstand

			//alternativ bzw. zus�tzlich lassen sich ganze Zeilen mit einem einzigen Link nach folgendem Muster einf�gen:
			//top.before('<div class="NavItem"><a href="LINK" title="MAUSTEXT" class="NavLink">TEXT</a></div>');
			}
		}
	}

//Start Small Screen Fixes
  if(PlanetenquickbarAnpassen){

	var resx = self.window.innerWidth; //verf�gbare Browserfensterbreite
//	alert(resx);
        //Big Screen Limit
        if(ScreenVerkleinern){
		var resx = ScreenBreite;
        }

	//Breite der Planetenquickbar: (n * 22px/Planet) oder resx-128(Nav)-672(Main)
	if (QuickbarPlanetsMax > 0)
		{
		$('div.TickPlanetEntry').parent().css('width', function() {return eval(22 * QuickbarPlanetsMax);});
		} 
	else {
		$('div.TickPlanetEntry').parent().css('width', function() {return eval(resx - 800);});
		} 
//	}
	//Breite des Chat
	if (ChatBreite > 0)
	{
	$('div.TickContainer').css('min-width',220); // 1024
	$('div.TickContainer').css('right',function() {return eval(resx-800-ChatBreite);});
	}
	else
	{
	$('div.TickContainer').css('min-width',function() {return eval(resx-800);}); //resx-800
	if ($('div.TickContainer').css('min-width') < 220)
        	{
        	$('div.TickContainer').css('min-width',220);
        	}
	}
//	$('div.TickContainer').css('min-width', 0); //auto

	//Breite des Teils rechts des Mainscreen
	$('div.TickPlanetEntry').parent().parent().css('width', function() {return eval(resx-800);}); //resx-128-672	(-Nav-Main)


	//Breite des Teils rechts der Navigation
	$('div.NavEnd').parent().next().css('width', function() {return eval(resx-128);}); //resx-128
  }

  
//Planibar (2-reihig) wird nicht vom Chat verdeckt
  if(ChatHoeheAnpassen > 0){
	$('div.TickContainer').css('max-height',function() {return eval(self.window.innerHeight-ChatHoeheAnpassen*44);}); //resy-2 Reihen Planeten
	$('div.TickCell').css('max-height',function() {return eval(self.window.innerHeight-ChatHoeheAnpassen*44-40);}); //resy-2 Reihen Planeten-TickerForm
	$('div.TickCell').css('overflow','hidden');
	//	var chaty = eval(self.window.innerHeight-92); //verf�gbare Browserfensterbreite
//	$('div.TickPlanetEntry').parent().parent().css('z-index', 2);
//	$('div.TickContainer').css('z-index', 1); //�berhang abschneiden
//	$('div.TickContainer').css('clip', 'rect(0px, chatx, chaty, 0px)'); //�berhang abschneiden
  }

//MainScreen Minimalh�he. Erzeugt einen sinnvollen Scrollbereich bei verkleinertem Browserfenster.
  if(MainScreenImmerGross){
	$('div.MainContainer').css('min-height', function() {return eval(self.window.innerHeight-160);}); //resy-top
  }

//Papierkorbsymbol einf�gen
  if(PapierkorbSymbol){
    var TrashBin = document.evaluate('/HTML/BODY/DIV[5]/DIV[2]/DIV[2]/FORM[1]/TABLE/TBODY/TR/TD[5]', document, null, XPathResult.ANY_TYPE, null ).iterateNext();
    if (TrashBin != null){
	TrashBin.innerHTML = '<a href="#" title="Nachrichten löschen"><img src="../pix/skins/default/cnt/messages_trash_bulk.gif" width="19" height="21" alt="Nachricht löschen" class="MessageButtons" border="0" onclick="ReportForm.submit();"></a>';
    }
  }
}

//Start Bad Links Correction (fehlerhafte Links bitte melden an sil aka Kong)




// anzahl aggs ausserhalb des schreins


    var AggregatzahlAusserhalbSchreinsAnzeigen = true;
     
     
     
    var AggregateAusblenden = true;
	var Positivkriterien = "";
    //var Positivkriterien = "Fragment.*Diggren.*";  // Format: Fragmentarischer Himmelblauer Diggren Absorbator der Sparsamkeit
    //var Negativkriterien = "";
     
     
     
    var SeiteTitel = document.evaluate('/html/head/title', document, null, XPathResult.ANY_TYPE, null).iterateNext();
     
    if (SeiteTitel != null && SeiteTitel.innerHTML.match(/Aggregat-Schrein/))
        {
        
        
        /*************************************
        * ANZAHL AGGS AUSSERHALB DES SCHREINS
        *************************************/
        if (AggregatzahlAusserhalbSchreinsAnzeigen)
            {
            // Knoten im Schrein zaehlen
            var UngelagerteAggs = document.evaluate('/html/body/div[5]/div/div[2]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
            AnzahlUngelagerteAggs = (UngelagerteAggs.childNodes.length - 1) / 2;
     
            //alert(UngelagerteAggs.childNodes[1].innerHTML);
            // von Knotenanzahl auf Anzahl Aggs schliessen
            if (UngelagerteAggs.childNodes[1].innerHTML == "")
                { // kein Agg ausserhalb des Schreins
                AnzahlUngelagerteAggs = 0;
                }
            else
                { // Aggs ausserhalb des Schreins
                AnzahlUngelagerteAggs = (UngelagerteAggs.childNodes.length - 1) / 2;
                }
            
            // Zeile um Anzahl Aggs erweitern
            UngelagerteAggs.nextSibling.nextSibling.innerHTML += " --- "+AnzahlUngelagerteAggs+" Aggregate";
     
     
            //alert(UngelagerteAggs.nextSibling.nextSibling.innerHTML);
            //alert("ChildNodes: "+UngelagerteAggs.childNodes.length+"nAnzahl Aggs ausserhalb des Schreins: "+AnzahlUngelagerteAggs);
            }
            
            
            
            
        /*************************************
        * AUSBLENDEN BESTIMMTER AGGREGATE
        *************************************/        
        if (AggregateAusblenden)
            {
            // Knoten im Schrein zaehlen
            var UngelagerteAggs = document.evaluate('/html/body/div[5]/div/div[2]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
            AnzahlUngelagerteAggs = (UngelagerteAggs.childNodes.length - 1) / 2;        
            
            //alert(UngelagerteAggs.childNodes[3].innerHTML);
            
            
            for (var i=1; i<UngelagerteAggs.childNodes.length; i=i+2)
                {
                // alert(UngelagerteAggs.childNodes[i].innerHTML);
                
                if (UngelagerteAggs.childNodes[i].innerHTML.match(Positivkriterien))
                    {
                    //do nothing
                    }
                else{
                    UngelagerteAggs.childNodes[i].innerHTML="";    
                    }
                
                }
            
            }
            
        }


		
		
// direktlink ins system der operierenden flotte im feld "eigene flottenoperationen" (main page)



var FlottenopsHead = document.evaluate('/html/body/div[5]/div/div/div/div', document, null, XPathResult.ANY_TYPE, null).iterateNext();
if (FlottenopsHead != null && FlottenopsHead.innerHTML == "Eigene Flottenoperationen")
	{
	var FlottenopsBody = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	
	var Koords = new Array();
	for (i = 2; i<FlottenopsBody.childNodes.length; i=i+2)
		{
		Koords = FlottenopsBody.childNodes[i].childNodes[9].innerHTML.split(":");
		FlottenopsBody.childNodes[i].childNodes[9].innerHTML = '<a STYLE="color:white" href="main.php?cmd=galaxy&send=sent&subcmd=galaxy&action=from_messages&galaxy='+Koords[0]+'&system='+Koords[1]+'&planet='+(Koords[2]-1)+'">'+Koords[0]+":"+Koords[1]+":"+Koords[2]+'</a></td>';
		
		Koords = FlottenopsBody.childNodes[i].childNodes[11].innerHTML.split(":");
		FlottenopsBody.childNodes[i].childNodes[11].innerHTML = '<a STYLE="color:white" href="main.php?cmd=galaxy&send=sent&subcmd=galaxy&action=from_messages&galaxy='+Koords[0]+'&system='+Koords[1]+'&planet='+(Koords[2]-1)+'">'+Koords[0]+":"+Koords[1]+":"+Koords[2]+'</a></td>';
		}
	}
	
	
	
	
	
/***************
* BESCHREIBUNG 
*******************************************************************************************************
* Im Versende-Bildschirm von Flotten wird das Aggregatvolumen aller Aggregate zusammengerechnet und 
* in der "Alles Ein-/Ausladen" Zeile angehangen.
*******************************************************************************************************
* KONFIGURIERBAR:
*  - nichts
******************************************************************************************************/


///////////////TEST ANFANG///////////////////
/*****************
/   FUNKTIONEN
******************/
//orginal from http://www.starborn.org/game/pix/skins/default/javascript/mainshared.js
var NewScriptNumberFormat = document.createElement("script");
var NewScriptNumberFormatBody = document.createTextNode("");
	
NewScriptNumberFormat.language = "javascript";
NewScriptNumberFormat.type = "text/javascript";

NewScriptNumberFormatBody.nodeValue =  "function func_numberFormat(strZahl){ ";
NewScriptNumberFormatBody.nodeValue +=  "alert ('Bingbong'); ";
NewScriptNumberFormatBody.nodeValue +=  "  if(strZahl) ";
NewScriptNumberFormatBody.nodeValue +=  "	{var integer = Math.abs(strZahl).toString();";
NewScriptNumberFormatBody.nodeValue +=  "	if(integer.length>3) ";
NewScriptNumberFormatBody.nodeValue +=  "		{ // ab Tausenderwerten";
NewScriptNumberFormatBody.nodeValue +=  "		for (i = integer.length - 3; i > 0; i -= 3) integer = integer.substring (0 , i) + \"'\" + integer.substring (i);";
NewScriptNumberFormatBody.nodeValue +=  " 		return integer;";
NewScriptNumberFormatBody.nodeValue +=  "		} ";
NewScriptNumberFormatBody.nodeValue +=  "	else {return 0;}";
NewScriptNumberFormatBody.nodeValue +=  "	} ";
NewScriptNumberFormatBody.nodeValue +=  "  else {return 0;}";
NewScriptNumberFormatBody.nodeValue +=  "}";

NewScriptNumberFormat.appendChild(NewScriptNumberFormatBody);


var SkriptPlatz = document.evaluate('/html/head/script', document, null, XPathResult.ANY_TYPE, null).iterateNext();
// Skript vor Liefertabelle einfuegen
SkriptPlatz.insertBefore(NewScriptNumberFormat, SkriptPlatz.childNodes[1]);

///////////////TEST ENDE///////////////////

/**********
* SKRIPT
**********************************
* ab hier nichts mehr veraendern!
*********************************/

var Bedingung = document.evaluate('/html/body/div[5]/div/div/div', document, null, XPathResult.ANY_TYPE, null).iterateNext();
if (Bedingung != null && Bedingung.innerHTML.match(/Versorgungsoperation/))
	{
	/*******************
	* Liefern-Tabelle
	*******************/
	var nodes = new Array();

	var AggregatTabelle = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[3]/tbody/tr', document, null, XPathResult.ANY_TYPE, null);
	var Zeile = AggregatTabelle.iterateNext();	//Kopfzeile
	Zeile = AggregatTabelle.iterateNext();
	
	while (Zeile != null)   // Knoten/Zeilen zaehlen, entspricht Anzahl von Aggis
		{
		nodes.push(Zeile);
		Zeile = AggregatTabelle.iterateNext();
		}
		

	//////////////////////
	// Skript 1
	//////////////////////
	
	// Aggregate einladen 
	var NewScriptDeliver = document.createElement("script");
	var NewScriptBody = document.createTextNode("");
	
	NewScriptDeliver.language = "javascript";
	NewScriptDeliver.type = "text/javascript";
	
	NewScriptBody.nodeValue =  "function SelectAggDeliver(Wert)																																									\n";
	NewScriptBody.nodeValue += "	{		\n";
	NewScriptBody.nodeValue += "	//alert('Hallo: '+Wert);																																								\n";
	NewScriptBody.nodeValue += "	var Gesamtvolumen = 0;   \n";

	NewScriptBody.nodeValue += "	var AggregatTabelle = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[3]/tbody', document, null, XPathResult.ANY_TYPE, null).iterateNext();				\n";
	NewScriptBody.nodeValue += "	for (var i = 2; i < ((AggregatTabelle.childNodes.length-1)/2); i++)																														\n";
	NewScriptBody.nodeValue += "		{																																													\n";
	NewScriptBody.nodeValue += "		var Aggregat = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[3]/tbody/tr['+i+']', document, null, XPathResult.ANY_TYPE, null).iterateNext();			\n";

	NewScriptBody.nodeValue += "		if (Wert == 'rot') {Wert=' Hellroter | Roter | Tiefroter | Rubinroter ';}	\n";
	NewScriptBody.nodeValue += "		if (Wert == 'blau') {Wert=' Himmelblauer | Blauer | Dunkelblauer | Saphirblauer ';}	\n";
	NewScriptBody.nodeValue += "		if (Wert == 'gelb') {Wert=' Blassgelber | Gelber | Dottergelber | Bernsteingelber ';}	\n";
	NewScriptBody.nodeValue += "		if (Wert == 'grün') {Wert=' Lindgrüner | Grüner | Dunkelgrüner | Smaragdgrüner ';}	\n";
	NewScriptBody.nodeValue += "		if (Wert == 'violett') {Wert=' Hellvioletter | Violetter | Tiefvioletter | Amethystvioletter ';}	\n";
	NewScriptBody.nodeValue += "		if (Wert == 'orange') {Wert=' Helloranger | Oranger | Tieforanger | Goldener ';}	\n";
	
	NewScriptBody.nodeValue += "		if (Wert=='Alle Anzeigen')																																									\n";	
	NewScriptBody.nodeValue += "			{																																												\n";
	NewScriptBody.nodeValue += "			Aggregat.setAttribute('style','');																																				\n";
	NewScriptBody.nodeValue += "			Aggregat.childNodes[5].childNodes[0].removeAttribute('checked');																											\n";
	NewScriptBody.nodeValue += "			var AggVolumen = Aggregat.childNodes[3].innerHTML.replace(/'/ig,'');																											\n";
	NewScriptBody.nodeValue += "			Gesamtvolumen += (AggVolumen * 1);																																				\n";
	NewScriptBody.nodeValue += "			continue;																																										\n";
	NewScriptBody.nodeValue += "			}	\n";
	
	NewScriptBody.nodeValue += "		if (Wert=='Alle Transportieren')																																									\n";	
	NewScriptBody.nodeValue += "			{																																												\n";
	NewScriptBody.nodeValue += "			Aggregat.setAttribute('style','');																																				\n";
	NewScriptBody.nodeValue += "			Aggregat.childNodes[5].childNodes[0].setAttribute('checked','checked');																											\n";
	NewScriptBody.nodeValue += "			var AggVolumen = Aggregat.childNodes[3].innerHTML.replace(/'/ig,'');																											\n";
	NewScriptBody.nodeValue += "			Gesamtvolumen += (AggVolumen * 1);																																				\n";
	NewScriptBody.nodeValue += "			continue;																																										\n";
	NewScriptBody.nodeValue += "			}																																												\n";

	// Aggs die ausgewaehltem Kriterium entsprechen anklicken & einbelnden, sonst: Ausblenden & abklicken
	NewScriptBody.nodeValue += "		if (Aggregat.childNodes[1].innerHTML.match(Wert))																																	\n";	
	NewScriptBody.nodeValue += "			{																																												\n";
	NewScriptBody.nodeValue += "			Aggregat.setAttribute('style','');																																				\n";
	NewScriptBody.nodeValue += "			Aggregat.childNodes[5].childNodes[0].setAttribute('checked','checked');																											\n";
	NewScriptBody.nodeValue += "			var AggVolumen = Aggregat.childNodes[3].innerHTML.replace(/'/ig,'');																											\n";
	NewScriptBody.nodeValue += "			Gesamtvolumen += (AggVolumen*1);\n";
	NewScriptBody.nodeValue += "			} \n";
	NewScriptBody.nodeValue += "		else 																																												\n";	
	NewScriptBody.nodeValue += "			{																																												\n";
	NewScriptBody.nodeValue += "			Aggregat.setAttribute('style','display:none');																																	\n";
	NewScriptBody.nodeValue += "			Aggregat.childNodes[5].childNodes[0].removeAttribute('checked');																												\n";
	NewScriptBody.nodeValue += "			}																																												\n";
	NewScriptBody.nodeValue += "		}																																													\n";
	
	// Transportvolumen anzeigen
	NewScriptBody.nodeValue += "	Aggregat.nextSibling.nextSibling.childNodes[1].innerHTML = 'Alle ein-/ausladen ('+Gesamtvolumen+')';																																												\n";
	
	// Den "Alle-Anklicken Button" loeschen (macht nur Probleme & ist obsolet)
	NewScriptBody.nodeValue += "	Aggregat.nextSibling.nextSibling.childNodes[3].innerHTML = '';													\n";
	
	// alle Checkboxen der Abholen Aggis deaktivieren
	NewScriptBody.nodeValue += "	var AggregatTabelle = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[4]/tbody', document, null, XPathResult.ANY_TYPE, null).iterateNext();				\n";
	NewScriptBody.nodeValue += "	for (var i = 2; i < ((AggregatTabelle.childNodes.length-1)/2); i++)																														\n";
	NewScriptBody.nodeValue += "		{																																													\n";
	NewScriptBody.nodeValue += "		var Aggregat = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[4]/tbody/tr['+i+']', document, null, XPathResult.ANY_TYPE, null).iterateNext();			\n";
	NewScriptBody.nodeValue += "		Aggregat.childNodes[5].childNodes[0].removeAttribute('checked');																													\n";
	NewScriptBody.nodeValue += "		}																																													\n";

	NewScriptBody.nodeValue += "	}																																														\n";
	
	NewScriptDeliver.appendChild(NewScriptBody);
	
	
	
	//////////////////////
	// Skript 2 (Einladen -> Holen)
	//////////////////////	
	
	// Aggregate abholen
	var NewScriptLoad = document.createElement("script");
	var NewScriptBody = document.createTextNode("");
	
	NewScriptLoad.language = "javascript";
	NewScriptLoad.type = "text/javascript";
	
	NewScriptBody.nodeValue =  "function SelectAggLoad(Wert)																																								\n";
	NewScriptBody.nodeValue += "	{																																														\n";
	NewScriptBody.nodeValue += "	//alert('Hallo: '+Wert);																																								\n";
	NewScriptBody.nodeValue += "	var Gesamtvolumen = 0;   \n";
	
	NewScriptBody.nodeValue += "	var AggregatTabelle = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[4]/tbody', document, null, XPathResult.ANY_TYPE, null).iterateNext();				\n";
	NewScriptBody.nodeValue += "	for (var i = 2; i < ((AggregatTabelle.childNodes.length-1)/2); i++)																														\n";
	NewScriptBody.nodeValue += "		{																																													\n";
	NewScriptBody.nodeValue += "		var Aggregat = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[4]/tbody/tr['+i+']', document, null, XPathResult.ANY_TYPE, null).iterateNext();			\n";

	NewScriptBody.nodeValue += "		if (Wert == 'rot') {Wert=' Hellroter | Roter | Tiefroter | Rubinroter ';}	\n";
	NewScriptBody.nodeValue += "		if (Wert == 'blau') {Wert=' Himmelblauer | Blauer | Dunkelblauer | Saphirblauer ';}	\n";
	NewScriptBody.nodeValue += "		if (Wert == 'gelb') {Wert=' Blassgelber | Gelber | Dottergelber | Bernsteingelber ';}	\n";
	NewScriptBody.nodeValue += "		if (Wert == 'grün') {Wert=' Lindgrüner | Grüner | Dunkelgrüner | Smaragdgrüner ';}	\n";
	NewScriptBody.nodeValue += "		if (Wert == 'violett') {Wert=' Hellvioletter | Violetter | Tiefvioletter | Amethystvioletter ';}	\n";
	NewScriptBody.nodeValue += "		if (Wert == 'orange') {Wert=' Helloranger | Oranger | Tieforanger | Goldener ';}	\n";	
	
	NewScriptBody.nodeValue += "		if (Wert=='Alle Anzeigen')																																							\n";	
	NewScriptBody.nodeValue += "			{																																												\n";
	NewScriptBody.nodeValue += "			Aggregat.setAttribute('style','');																																				\n";
	NewScriptBody.nodeValue += "			Aggregat.childNodes[5].childNodes[0].removeAttribute('checked');																												\n";
	NewScriptBody.nodeValue += "			var AggVolumen = Aggregat.childNodes[3].innerHTML.replace(/'/ig,'');																											\n";
	NewScriptBody.nodeValue += "			Gesamtvolumen += (AggVolumen * 1);																																				\n";
	NewScriptBody.nodeValue += "			continue;																																										\n";
	NewScriptBody.nodeValue += "			}	\n";
	
	NewScriptBody.nodeValue += "		if (Wert=='Alle Transportieren')																																					\n";	
	NewScriptBody.nodeValue += "			{																																												\n";
	NewScriptBody.nodeValue += "			Aggregat.setAttribute('style','');																																				\n";
	NewScriptBody.nodeValue += "			Aggregat.childNodes[5].childNodes[0].setAttribute('checked','checked');																											\n";
	NewScriptBody.nodeValue += "			var AggVolumen = Aggregat.childNodes[3].innerHTML.replace(/'/ig,'');																											\n";
	NewScriptBody.nodeValue += "			Gesamtvolumen += (AggVolumen * 1);																																				\n";
	NewScriptBody.nodeValue += "			continue;																																										\n";
	NewScriptBody.nodeValue += "			}																																												\n";

	// Aggs die ausgewaehltem Kriterium entsprechen anklicken & einbelnden, sonst: Ausblenden & abklicken
	NewScriptBody.nodeValue += "		if (Aggregat.childNodes[1].innerHTML.match(Wert))																																	\n";	
	NewScriptBody.nodeValue += "			{																																												\n";
	NewScriptBody.nodeValue += "			Aggregat.setAttribute('style','');																																				\n";
	NewScriptBody.nodeValue += "			Aggregat.childNodes[5].childNodes[0].setAttribute('checked','checked');																											\n";
	NewScriptBody.nodeValue += "			var AggVolumen = Aggregat.childNodes[3].innerHTML.replace(/'/ig,'');																											\n";
	NewScriptBody.nodeValue += "			Gesamtvolumen += (AggVolumen*1);																																				\n";
	NewScriptBody.nodeValue += "			}																																												\n";
	NewScriptBody.nodeValue += "		else 																																												\n";	
	NewScriptBody.nodeValue += "			{																																												\n";
	NewScriptBody.nodeValue += "			Aggregat.setAttribute('style','display:none');	\n";
	NewScriptBody.nodeValue += "			Aggregat.childNodes[5].childNodes[0].removeAttribute('checked');																												\n";
	NewScriptBody.nodeValue += "			}																																												\n";
	NewScriptBody.nodeValue += "		}																																													\n";

	
	NewScriptBody.nodeValue +=  "  		if(Gesamtvolumen) 																																									\n";
	NewScriptBody.nodeValue +=  "			{var integer = Math.abs(Gesamtvolumen).toString();																																\n";
	NewScriptBody.nodeValue +=  "			if(integer.length>3) {																																							\n";
	NewScriptBody.nodeValue +=  "				for (i = integer.length - 3; i > 0; i -= 3) {integer = integer.substring (0 , i) + '.' + integer.substring (i);}															\n";
	NewScriptBody.nodeValue +=  " 				Gesamtvolumen = integer;																																					\n";
	NewScriptBody.nodeValue +=  "				}																																											\n";
	NewScriptBody.nodeValue +=  "			else {Gesamtvolumen = integer;}																									 												\n";
	NewScriptBody.nodeValue +=  "			}																																												\n";
	NewScriptBody.nodeValue +=  "  		else {Gesamtvolumen = integer;}	 																																					\n";	

	NewScriptBody.nodeValue += "	Aggregat.nextSibling.nextSibling.childNodes[1].innerHTML = 'Alle ein-/ausladen ('+Gesamtvolumen+')';																																														\n";

	// Den "Alle-Anklicken Button" loeschen (macht nur Probleme & ist obsolet)
	NewScriptBody.nodeValue += "	Aggregat.nextSibling.nextSibling.childNodes[3].innerHTML = '';	";

	// alle Checkboxen der Einladen Aggis deaktivieren
	NewScriptBody.nodeValue += "	var AggregatTabelle = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[3]/tbody', document, null, XPathResult.ANY_TYPE, null).iterateNext();				\n";
	NewScriptBody.nodeValue += "	for (var i = 2; i < ((AggregatTabelle.childNodes.length-1)/2); i++)																														\n";
	NewScriptBody.nodeValue += "		{																																													\n";
	NewScriptBody.nodeValue += "		var Aggregat = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[3]/tbody/tr['+i+']', document, null, XPathResult.ANY_TYPE, null).iterateNext();			\n";
	NewScriptBody.nodeValue += "		Aggregat.childNodes[5].childNodes[0].removeAttribute('checked');																										\n";
	NewScriptBody.nodeValue += "		}																																													\n";
	NewScriptBody.nodeValue += "	}																																														\n";
	
	NewScriptLoad.appendChild(NewScriptBody);	
	
	
	
	//////////////////////////////////////
	// Zun�chst alle Aggregate ausblenden
	//////////////////////////////////////
	
	//Liefern-Tabelle
	var AggregatTabelle = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[3]/tbody', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	for (var i = 2; i < ((AggregatTabelle.childNodes.length-1)/2); i++)
		{
		var Aggregat = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[3]/tbody/tr['+i+']', document, null, XPathResult.ANY_TYPE, null).iterateNext();
		Aggregat.setAttribute('style','display:none');
		}
		
	//Abholen-Tabelle
	var AggregatTabelle = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[4]/tbody', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	for (var i = 2; i < ((AggregatTabelle.childNodes.length-1)/2); i++)
		{
		var Aggregat = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[4]/tbody/tr['+i+']', document, null, XPathResult.ANY_TYPE, null).iterateNext();
		Aggregat.setAttribute('style','display:none');
		}
		
	
	/////////////////
	// Dropdownmenue
	/////////////////
	
	// HTML fuer Dropdownmenue
	var DropdownDeliver = "";
	var DropdownLoad = "";
	var DropdownGeneral = "";
	
	DropdownDeliver = "<select name=\"AggsDeliver\" style=\"font: bold 11px Verdana; line-height: 13px; background-color: #212C39; color: #FFFFFF; width: 120px;\" onChange=SelectAggDeliver(AggsDeliver.value) \n";	
	DropdownLoad = "<select name=\"AggsLoad\" style=\"font: bold 11px Verdana; line-height: 13px; background-color: #212C39; color: #FFFFFF; width: 120px;\" onChange=SelectAggLoad(AggsLoad.value) \n";	
	
	DropdownGeneral += '	<option >---</option>				\n';
	DropdownGeneral += '	<option >Keine</option>				\n';
	DropdownGeneral += '	<option >Alle Anzeigen</option>		\n';
	DropdownGeneral += '	<option >Alle Transportieren</option>	\n';
	DropdownGeneral += '	<optgroup label="Typen">			\n';
	DropdownGeneral += '		<option >Absorbator</option>	\n';
	DropdownGeneral += '		<option >Deflektor</option>		\n';
	DropdownGeneral += '		<option >Generator</option>		\n';
	DropdownGeneral += '		<option >Infiltrator</option>	\n';
	DropdownGeneral += '		<option >Inkubator</option>		\n';
	DropdownGeneral += '		<option >Interocitor</option>	\n';
	DropdownGeneral += '		<option >Konstruktor</option>	\n';
	DropdownGeneral += '		<option >Prokurator</option>	\n';
	DropdownGeneral += '		<option >Propulsor</option>		\n';
	DropdownGeneral += '		<option >Protektor</option>		\n';
	DropdownGeneral += '		<option >Reaktor</option>		\n';
	DropdownGeneral += '		<option >Rekonstruktor</option>	\n';
	DropdownGeneral += '		<option >Stabilisator</option>	\n';
	DropdownGeneral += '	</optgroup>							\n';
	DropdownGeneral += '	<optgroup label="Rassen">			\n';	
	DropdownGeneral += '		<option >Diggren</option>		\n';
	DropdownGeneral += '		<option >Kee\'laak</option>		\n';
	DropdownGeneral += '		<option >Nux</option>			\n';
	DropdownGeneral += '		<option >Quipgrex</option>		\n';
	DropdownGeneral += '		<option >Sciween</option>		\n';	
	DropdownGeneral += '	</optgroup>							\n';
	DropdownGeneral += '	<optgroup label="Farben">			\n';
	DropdownGeneral += '		<option >rot</option>			\n';
	DropdownGeneral += '		<option >blau</option>			\n';
	DropdownGeneral += '		<option >gelb</option>			\n';
	DropdownGeneral += '		<option >grün</option>			\n';
	DropdownGeneral += '		<option >orange</option>		\n';
	DropdownGeneral += '		<option >violett</option>		\n';
	DropdownGeneral += '	</optgroup>							\n';	
	DropdownGeneral += '</select>								\n';
	
	DropdownDeliver += DropdownGeneral;
	DropdownLoad += DropdownGeneral;
	
	// Einfuegen bei Liefern-Tabelle
	var AggregatTabelle = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[3]/tbody/tr/td', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	AggregatTabelle.innerHTML += " &nbsp;&nbsp;&nbsp;&nbsp; "+DropdownDeliver;
	
	// Skript vor Liefertabelle einfuegen
	AggregatTabelle.insertBefore(NewScriptDeliver, AggregatTabelle.childNodes[1]);
	
	// Einfuegen bei Abholen-Tabelle
	var AggregatTabelle = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[4]/tbody/tr/td', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	AggregatTabelle.innerHTML += " &nbsp;&nbsp;&nbsp;&nbsp; "+DropdownLoad;	
	
	// Skript vor Liefertabelle einfuegen
	AggregatTabelle.insertBefore(NewScriptLoad, AggregatTabelle.childNodes[1]);
	}
	
	
	
	

	

/**************************************************************
1)
Bei der Detailansicht einer Flotte in der Zeile fuer den Treibstoff
eine weiter Zahl anhaengen, die die benoetigten Tanker fuer einen 
Sprungtorflug angibt

2)
Im Flugplan anzeigen wieviele Tanker in der Flotte zuviel sind
***************************************************************/


/*******************
*   KONFIGURATION
********************/
var TankerStorage = 38667;			// Kapazitaet eines kleinen Tankers (bei Quip ggf. eines ATNK)



/*******************
*   SKRIPT
********************/

/////////////////////////////////////////
/////////// Flottendetails //////////////
/////////////////////////////////////////
var TankFieldDescription = document.evaluate('/HTML/BODY/DIV[2]/DIV[3]/DIV[1]/DIV[1]/TABLE/TBODY/TR[8]/TD[1]', document, null, XPathResult, null ).iterateNext();

if (TankFieldDescription != null && TankFieldDescription.innerHTML.match("Treibstoff")){
	// Masse und Tankvolumen der Flotte bestimmen
	var MassField = document.evaluate('/HTML/BODY/DIV[2]/DIV[3]/DIV[1]/DIV[1]/TABLE/TBODY/TR[1]/TD[2]', document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	var TankField = document.evaluate('/HTML/BODY/DIV[2]/DIV[3]/DIV[1]/DIV[1]/TABLE/TBODY/TR[8]/TD[2]', document, null, XPathResult.ANY_TYPE, null ).iterateNext();

	var Masse = MassField.innerHTML.replace(/\D*/gi,"");

	var Tank = TankField.innerHTML.replace(/ Tonnen.*/g,"");
	Tank = Tank.replace(/\D*/g,"");

	var Tanker = ((Masse*0.04)-Tank)/TankerStorage;

	if (Tanker < 0) {Tanker = 0}
	
	Tanker = Tanker.toFixed(1);
	Tanker = Tanker.replace(/\./g,",");

	TankField.innerHTML += " / "+Tanker+" Tanker";
	}
	
	
	
/////////////////////////////////////////
/////////////// Flugplan ////////////////
/////////////////////////////////////////	

var FlugplanKopf = document.evaluate('/HTML/BODY/DIV[5]/DIV[1]/DIV[1]/DIV[1]', document, null, XPathResult.ANY_TYPE, null ).iterateNext();

if (FlugplanKopf != null && FlugplanKopf.innerHTML == "Flugplan")
	{
	
	// FUNKTIONEN
	
	function func_InQualifizierteZahlUmwandeln(x)
		{
		x = x.replace(/'/g,"");
		if (x.match(/K/))
			{
			x = x.replace(/K/,"000");
			if (x.match(/,/))
				{
				x = x.replace(/,/,"");
				x = x / 10;
				}
			}	
		x = x * 1;		
		return(x);
		}
	
	
	//	SKRIPT
	
	// TS-Verbrauch & Tankvolumen der Flotte bestimmen
	var TS_Verbrauch = document.evaluate('/HTML/BODY/DIV[5]/DIV[1]/div[2]/table/tbody/tr[2]/td[3]', document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	var TS_Tankvolumen = TS_Verbrauch.nextSibling.nextSibling;
		
	// Formatierung der Zahlen entfernen (',K)
	TS_Verbrauch = func_InQualifizierteZahlUmwandeln(TS_Verbrauch.innerHTML);
	TS_Tankvolumen = func_InQualifizierteZahlUmwandeln(TS_Tankvolumen.innerHTML);
	
	// Zuviel an Tankern bestimmen
	var TankerUeberzahl = Math.floor((TS_Tankvolumen - TS_Verbrauch) / TankerStorage);

	// Ergebnis in Feld einfuegen
	var TS_VerbrauchFeld = document.evaluate('/HTML/BODY/DIV[5]/DIV[1]/div[2]/table/tbody/tr[2]/td[4]', document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	TS_VerbrauchFeld.innerHTML += " ("+TankerUeberzahl+")";
	}
	
	
	



var autoSelect = true;
var autoSelectCriterion = "Auktionsgebot|Kollision|Waffenangebot|Schiffsangebot|System erforscht|Planet zerbrochen|Abschirmungsverbesserung|Soldaten|Sonnenflecken|Verteidigung|zerfallen|Wassereinbruch|Turnier";

var hideMessage = true;
var hideMessageCriterion = "Mietzahlung|Laserkristalle werden gelagert";

var clickableLink = true;





var berichteReiter = document.evaluate('/html/body/div[5]/div/table/tbody/tr/td[2]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
var naviLineFilter = document.evaluate('/html/body/div[5]/div[2]/div/table/tbody/tr/td', document, null, XPathResult.ANY_TYPE, null).iterateNext();


/*******
*  Papierkorb Symbol 
*******/

if ((naviLineFilter != null) && (naviLineFilter.innerHTML.match(/Filter:/)))
	{
	var DeleteField = document.evaluate('/HTML/BODY/DIV[5]/DIV[2]/DIV[2]/FORM[1]/TABLE/TBODY/TR/TD[5]', document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	DeleteField.innerHTML = '<a href="#" title="Ausgew&auml;hlte Nachrichten l&ouml;schen"><img src="../pix/skins/default/cnt/messages_trash_bulk.gif" width="19" height="21" alt="Nachricht l?schen" class="MessageButtons" border="0" onclick="ReportForm.submit();"></a>';
	}

	
	
/***************
* "Alle Berichte Loeschen" Button ausblenden, wenn Filter auf "alles" steht (MotiSchutz Generell)
****************/		
var Filter = document.evaluate('/html/body/div[5]/div[2]/div[1]/table/tbody/tr/td/select', document, null, XPathResult.ANY_TYPE, null).iterateNext();

if (Filter != null && Filter.options[0].selected == true)			// Filter steht auf "alles"
	{
	var DelAllMsgs = document.evaluate('/html/body/div[5]/div[2]/div[2]/form/table[2]/tbody/tr/td[2]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
	DelAllMsgs.innerHTML = "";
	}		
	
	
/*******
*  automatische Vorauswahl von Berichten
*  Ausblenden bestimmter Berichte 
*  Bei Motis alle Loeschmoeglichkeiten entfernen
*******/

if (naviLineFilter != null && berichteReiter != null && berichteReiter.parentNode.innerHTML.match(/reiter_1_aktiv/))
	{ // Berichtfenster aktiv & Bericht�bersicht(kein einzelner Bericht)
	
	var reportNumber = 2;
	
	while (document.evaluate('/html/body/div[5]/div[2]/div[2]/form/table/tbody/tr['+reportNumber+']', document, null, XPathResult.ANY_TYPE, null).iterateNext() != null)
		{
		var messageLines = document.evaluate('/html/body/div[5]/div[2]/div[2]/form/table/tbody/tr['+reportNumber+']', document, null, XPathResult.ANY_TYPE, null).iterateNext();

		//alert(messageLines.childNodes[3].innerHTML);						//MainSender der Nachricht
		//alert(messageLines.childNodes[3].childNodes[2].innerHTML);		//SubSender der Nachricht
		//alert(messageLines.childNodes[5].childNodes[1].innerHTML);		//MainSubject der Nachricht
		//alert(messageLines.childNodes[5].childNodes[4].innerHTML);		//SubSubject der Nachricht
		//alert(messageLines.childNodes[9].innerHTML);						//Checkbox der Nachricht

		
		////////////
		//Vorauswahl
		////////////
		if (autoSelect &&
			(messageLines.childNodes[5].childNodes[1] != null && messageLines.childNodes[5].childNodes[1].innerHTML.match(autoSelectCriterion)) || 
			(messageLines.childNodes[5].childNodes[4] != null && messageLines.childNodes[5].childNodes[4].innerHTML.match(autoSelectCriterion)))
			{
			var checked = messageLines.childNodes[9].innerHTML.replace(/>/,' checked="checked">');
			messageLines.childNodes[9].innerHTML = checked;
			}
			
			
			
		//////////////
		//Moti-Schutz (individuell fuer ein einzelnes Moti)
		//////////////
		if (messageLines.childNodes[5].childNodes[1] != null && messageLines.childNodes[5].childNodes[1].innerHTML.match(/Motivationsvideo verf.gbar/))
			{
			// Checkbox entfernen
			messageLines.childNodes[9].innerHTML = "";
			
			
			// "X"-Box entfernen
			messageLines.childNodes[7].childNodes[5].removeAttribute('href');
			messageLines.childNodes[7].childNodes[5].removeAttribute('title');
			
			var EmptyButton = messageLines.childNodes[7].childNodes[5].childNodes[0];
			//var EmptyButton = document.createElement("IMG");
			EmptyButton.setAttribute('width',"19");
			EmptyButton.setAttribute('height',"21");
			EmptyButton.setAttribute('class',"MessageButtons");
			EmptyButton.setAttribute('alt',"");
			EmptyButton.setAttribute('src',"../pix/skins/default/cnt/messages_empty.gif");
			
			//messageLines.childNodes[7].appendChild(EmptyButton);
			}
		
		////////////////////////////////////////////////
		//Planetennamen mit Direktlink (Absender Spalte)
		////////////////////////////////////////////////
		if(clickableLink && 
			messageLines.childNodes[3] != null &&
			messageLines.childNodes[3].innerHTML.match(/\(.:.+:.+\)/))
			{
			
			// Koordinaten auslesen
			var systemKoords = new Array();
			systemKoords = messageLines.childNodes[3].childNodes[2].innerHTML.replace(/.+\(/,"").replace(/\)/,"").split(/:/);
			systemKoords[2] = systemKoords[2]-1;
			
			// Linkfarbe, je nachdem ob Nachricht bereits gelesen wurde andere Farbe
			if (messageLines.innerHTML.match(/MessageTableCellLeftRead/))
				{var linkColor = "#cccccc";}
			else{var linkColor = "#ffffff";}			
			
			// HTML neu schreiben
			messageLines.childNodes[3].childNodes[2].innerHTML = '<a style="font: 10px Verdana; color: '+linkColor+';" href="main.php?cmd=galaxy&send=sent&subcmd=galaxy&action=from_messages&galaxy='+systemKoords[0]+'&system='+systemKoords[1]+'&planet='+systemKoords[2]+'">'+messageLines.childNodes[3].childNodes[2].innerHTML+'</a>';
			}

			
			
		///////////////////////////////////////////////	
 		//Planetennamen mit Direktlink (Subject Spalte)
		///////////////////////////////////////////////
		if(clickableLink && 
			messageLines.childNodes[5].childNodes[4] != null &&
			messageLines.childNodes[5].childNodes[4].innerHTML.match(/\(.:.+:?.*\)/))
			{
			
			// Koordinaten auslesen
			var systemKoords = new Array();
			systemKoords = messageLines.childNodes[5].childNodes[4].innerHTML.replace(/.+\(/,"").replace(/\)/,"").split(/:/);
			systemKoords[2] = systemKoords[2]-1;
			
			// Bei manchen Berichten (z.B. Neues System erforscht) gibt es keine Planetenkoordinate
			if (isNaN(systemKoords[2])) {systemKoords[2] = ""}
			
			// Linkfarbe, je nachdem ob Nachricht bereits gelesen wurde andere Farbe
			if (messageLines.innerHTML.match(/MessageTableCellLeftRead/))
				{var linkColor = "#cccccc";}
			else{var linkColor = "#ffffff";}

			// HTML neu schreiben
			messageLines.childNodes[5].childNodes[4].innerHTML = '<a style="font: 10px Verdana; color: '+linkColor+';" href="main.php?cmd=galaxy&send=sent&subcmd=galaxy&action=from_messages&galaxy='+systemKoords[0]+'&system='+systemKoords[1]+'&planet='+systemKoords[2]+'">'+messageLines.childNodes[5].childNodes[4].innerHTML+'</a>';
			} 			
			
		
		
		/////////////	
		//Ausblenden
		/////////////
		if (hideMessage &&
			(messageLines.childNodes[5].childNodes[1] != null && messageLines.childNodes[5].childNodes[1].innerHTML.match(hideMessageCriterion)) || 
			(messageLines.childNodes[5].childNodes[4] != null && messageLines.childNodes[5].childNodes[4].innerHTML.match(hideMessageCriterion)))
			{
			messageLines.innerHTML = "";
			}				
		reportNumber++;
		}
	}
	
	
	
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	
/*
* Der folgende Block:
*  Die Links aus Alle Berichte loeschen fuer eine bestimmte Nachrichtengruppe (TRADE,RESEARCH,usw)
*/

//alert(self.location.href);
	
/* if (self.location.href.match("http://horitest.goetterheimat.de/game/main/main.php?cmd=message&send=sent&subcmd=reports"))
	{
	var Buttons = '<a href="http://horitest.goetterheimat.de/game/main/main.php?cmd=message&send=sent&subcmd=reports&action=mesdelall&mes_number=0&mes_filter=TRADE" title="Handelsnachrichten L&ouml;schen"><img src="../pix/skins/default/cnt/messages_trash_bulk.gif" width="19" height="21" alt="Nachricht l&ouml;schen" class="MessageButtons" border="0" onclick="ReportForm.submit();"></a>';
	
	//var Buttons = '<td height="18" width="18" align="center" bgcolor="grey" >  <a href="http://horitest.goetterheimat.de/game/main/main.php?cmd=message&send=sent&subcmd=reports&action=mesdelall&mes_number=0&mes_filter=TRADE" style="display:block" > <font face="Verdana" size="-1" color="black"> H </a></td>';
	
	var SelectField = document.evaluate('/HTML/BODY/DIV[5]/DIV[2]/DIV[1]/table/tbody/tr/td[1]', document, null, XPathResult.ANY_TYPE, null ).iterateNext();
	//alert(SelectField.innerHTML);
	SelectField.innerHTML = SelectField.innerHTML+Buttons;
	} */	





/***************
* BESCHREIBUNG 
*******************************************************************************************************
* Unter "Handel >> Arenen" wird das Zielsystem um einen Link erweitert mit dem man direkt hinspringen kann
*******************************************************************************************************
* KONFIGURIERBAR:
*  - nichts
******************************************************************************************************/



/*************************
* VARIABLEN-KONFIGURATION
******************************************
* Hier kann man das Skript an seine Beduerfnisse anpassen
******************************************/

// keine Konfiguration

/**********
* SKRIPT
**********************************
* ab hier nichts mehr veraendern!
*********************************/


var Bedingung = document.evaluate('/html/body/div[5]/div[2]/div[1]/div[1]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
//alert('Bedingung: '+Bedingung.innerHTML);

if ((Bedingung != null) && (Bedingung.innerHTML.match(/Kampfarenen/)))
	{
	var nodes = new Array();
	var div = document.evaluate('/html/body/div[5]/div[2]/div[2]/table/tbody', document, null, XPathResult.ANY_TYPE, null );
	var subdiv = div.iterateNext();	
	
	//alert('Bedingung: '+subdiv.innerHTML);
	
	if (subdiv != null) {
		var gal = document.evaluate('/html/body/div[5]/div[2]/div[2]/table/tbody/tr', document, null, XPathResult.ANY_TYPE, null );
		var tr = gal.iterateNext(); 
		//alert("Kopfzeile: "+tr.innerHTML);
		
		//Tabelle zeilwenweise durchgehen
		if (tr != null){
			var aggs = document.evaluate('/html/body/div[5]/div[2]/div[2]/table/tbody/tr', document, null, XPathResult.ANY_TYPE, null );
			var atr = aggs.iterateNext(); //Fist is the tableHead
			atr = aggs.iterateNext();
			
			// Zeilenknoten speichern
			while (atr != null) {
				nodes.push(atr);
				atr = aggs.iterateNext();
				}
			}
		}
	// alert(nodes.length);
	
	for (var j = 0; j < nodes.length; j++){ //	
	
		var System = nodes[j].childNodes[1].innerHTML;
		//alert(System);
		
		var Koords = System.replace(/Sprungtor /,"");
		var Koords = Koords.split(":");		
		
		//alert("Ziel: "+System+" Koord: "+Koords[0]+":"+Koords[1]+":"+Koords[2]);	
		
		var neueSystemBeschreibung = '<td width="130" height="23" valign="middle" align="center" class="OrbitCell"><a href="main.php?cmd=galaxy&send=sent&subcmd=galaxy&action=from_messages&galaxy='+Koords[0]+'&system='+Koords[1]+'&planet='+(Koords[2]-1)+'" title="Zum Turnier" class="Galaxy_Link">'+System+'</a></td>';

		nodes[j].childNodes[1].innerHTML = neueSystemBeschreibung;
		}
	}	








var ressmenge = "999m";
var linkcolor = new String("#FFFFFF");
var oNewLinks = new Array();
var oNewScript = document.createElement("script");
var oNewScriptBody = document.createTextNode("");

oNewLinks[0] = document.createElement("a");
oNewLinks[0].href = "javascript:takeRes('t_metal');";
oNewLinks[0].style.fontWeight = "bold";
oNewLinks[0].style.color = linkcolor;
oNewLinks[1] = document.createElement("a");
oNewLinks[1].href = "javascript:takeRes('t_crystal');";
oNewLinks[1].style.fontWeight = "bold";
oNewLinks[1].style.color = linkcolor;
oNewLinks[2] = document.createElement("a");
oNewLinks[2].href = "javascript:takeRes('t_fuel');";
oNewLinks[2].style.fontWeight = "bold";
oNewLinks[2].style.color = linkcolor;
oNewLinks[3] = document.createElement("a");
oNewLinks[3].href = "javascript:takeRes('all');";
oNewLinks[3].style.fontWeight = "bold";
oNewLinks[3].style.color = linkcolor;

oNewScript.language = "javascript";
oNewScript.type = "text/javascript";

oNewScriptBody.nodeValue = "function takeRes(id) {\n";
oNewScriptBody.nodeValue += "	if(id == 'all') {\n";
oNewScriptBody.nodeValue += "		var o = document.getElementsByName('t_metal');\n";
oNewScriptBody.nodeValue += "		o[0].value = '"+ressmenge+"';\n";
oNewScriptBody.nodeValue += "		var o = document.getElementsByName('t_crystal');\n";
oNewScriptBody.nodeValue += "		o[0].value = '"+ressmenge+"';\n";
oNewScriptBody.nodeValue += "		var o = document.getElementsByName('t_fuel');\n";
oNewScriptBody.nodeValue += "		o[0].value = '"+ressmenge+"';\n";
oNewScriptBody.nodeValue += "	} else {\n";
oNewScriptBody.nodeValue += "		var o = document.getElementsByName(id);\n";
oNewScriptBody.nodeValue += "		o[0].value = '"+ressmenge+"';\n";
oNewScriptBody.nodeValue += "	}\n";
oNewScriptBody.nodeValue += "}\n";

var oTableRow = document.createElement("tr");
var oTableData = new Array();
oTableData[0] = document.createElement("td");
oTableData[1] = document.createElement("td");
oTableData[2] = document.createElement("td");
oTableData[3] = document.createElement("td");

var oAttributes = new Array();

oAttributes[0] = new Array();
oAttributes[0]['width'] = document.createAttribute("width");
oAttributes[0]['width'].nodeValue = "110";
oAttributes[0]['height'] = document.createAttribute("height");
oAttributes[0]['height'].nodeValue = "22";
oAttributes[0]['valign'] = document.createAttribute("valign");
oAttributes[0]['valign'].nodeValue = "middle";
oAttributes[0]['align'] = document.createAttribute("align");
oAttributes[0]['align'].nodeValue = "center";
oAttributes[0]['class'] = document.createAttribute("class");
oAttributes[0]['class'].nodeValue = "FleetCell";

oAttributes[1] = new Array();
oAttributes[1]['width'] = document.createAttribute("width");
oAttributes[1]['width'].nodeValue = "110";
oAttributes[1]['height'] = document.createAttribute("height");
oAttributes[1]['height'].nodeValue = "22";
oAttributes[1]['valign'] = document.createAttribute("valign");
oAttributes[1]['valign'].nodeValue = "middle";
oAttributes[1]['align'] = document.createAttribute("align");
oAttributes[1]['align'].nodeValue = "center";
oAttributes[1]['class'] = document.createAttribute("class");
oAttributes[1]['class'].nodeValue = "FleetCell";

oAttributes[2] = new Array();
oAttributes[2]['width'] = document.createAttribute("width");
oAttributes[2]['width'].nodeValue = "110";
oAttributes[2]['height'] = document.createAttribute("height");
oAttributes[2]['height'].nodeValue = "22";
oAttributes[2]['valign'] = document.createAttribute("valign");
oAttributes[2]['valign'].nodeValue = "middle";
oAttributes[2]['align'] = document.createAttribute("align");
oAttributes[2]['align'].nodeValue = "center";
oAttributes[2]['class'] = document.createAttribute("class");
oAttributes[2]['class'].nodeValue = "FleetCell";

oAttributes[3] = new Array();
oAttributes[3]['width'] = document.createAttribute("width");
oAttributes[3]['width'].nodeValue = "110";
oAttributes[3]['height'] = document.createAttribute("height");
oAttributes[3]['height'].nodeValue = "22";
oAttributes[3]['valign'] = document.createAttribute("valign");
oAttributes[3]['valign'].nodeValue = "middle";
oAttributes[3]['align'] = document.createAttribute("align");
oAttributes[3]['align'].nodeValue = "center";
oAttributes[3]['class'] = document.createAttribute("class");
oAttributes[3]['class'].nodeValue = "FleetCell";
oAttributes[3]['colspan'] = document.createAttribute("colspan");
oAttributes[3]['colspan'].nodeValue = "3";

oTableData[0].setAttributeNode(oAttributes[0]['width']);
oTableData[0].setAttributeNode(oAttributes[0]['height']);
oTableData[0].setAttributeNode(oAttributes[0]['valign']);
oTableData[0].setAttributeNode(oAttributes[0]['align']);
oTableData[0].setAttributeNode(oAttributes[0]['class']);

oTableData[1].setAttributeNode(oAttributes[1]['width']);
oTableData[1].setAttributeNode(oAttributes[1]['height']);
oTableData[1].setAttributeNode(oAttributes[1]['valign']);
oTableData[1].setAttributeNode(oAttributes[1]['align']);
oTableData[1].setAttributeNode(oAttributes[1]['class']);

oTableData[2].setAttributeNode(oAttributes[2]['width']);
oTableData[2].setAttributeNode(oAttributes[2]['height']);
oTableData[2].setAttributeNode(oAttributes[2]['valign']);
oTableData[2].setAttributeNode(oAttributes[2]['align']);
oTableData[2].setAttributeNode(oAttributes[2]['class']);

oTableData[3].setAttributeNode(oAttributes[3]['width']);
oTableData[3].setAttributeNode(oAttributes[3]['height']);
oTableData[3].setAttributeNode(oAttributes[3]['valign']);
oTableData[3].setAttributeNode(oAttributes[3]['align']);
oTableData[3].setAttributeNode(oAttributes[3]['class']);
oTableData[3].setAttributeNode(oAttributes[3]['colspan']);

oNewLinks[0].appendChild(document.createTextNode("Erz einladen"));
oNewLinks[1].appendChild(document.createTextNode("Min einladen"));
oNewLinks[2].appendChild(document.createTextNode("TS einladen"));
oNewLinks[3].appendChild(document.createTextNode("Alle Resourcen einladen"));
oNewScript.appendChild(oNewScriptBody);

oTableData[0].appendChild(oNewLinks[0]);
oTableData[1].appendChild(oNewLinks[1]);
oTableData[2].appendChild(oNewLinks[2]);
oTableData[3].appendChild(oNewLinks[3]);

oTableRow.appendChild(oTableData[0]);
oTableRow.appendChild(oTableData[1]);
oTableRow.appendChild(oTableData[2]);
oTableRow.appendChild(oTableData[3]);


var tableNode = document.evaluate('/html/body/div[5]/div/div[2]/table/tbody/tr/td/form/table[2]', document, null, XPathResult.ANY_TYPE,null).iterateNext();

//var tableNode = document.getElementsByTagName("tbody")[2];
//alert(tableNode.childNodes[1].innerHTML);


var insertBeforeNode = tableNode.childNodes[1];

tableNode.insertBefore(oNewScript, insertBeforeNode);
tableNode.insertBefore(oTableRow, insertBeforeNode);

function takeRes(id) {
	GM_log(id);
}	