// ==UserScript==
// @name           DS - Berichte und Angriffe markieren
// @version        v2.7
// @author         bodhiBrute
// @description    Hebt zusammengehoerende Berichte,Angriffe und Nachrichten farbig hervor
// @include        http://ae*.tribalwars.ae/*screen=report*
// @include        http://de*.die-staemme.de/*screen=overview_villages&mode=commands*
// @include        http://de*.die-staemme.de/*screen=overview_villages&mode=incomings*
// @include        http://de*.die-staemme.de/*screen=mail
// @include        http://de*.die-staemme.de/*screen=mail&action=*
// @include        http://de*.die-staemme.de/*screen=mail&mode=in*
// ==/UserScript==

//Bestimmt ob automatisch Farben zugeordnet werden sollen, oder nur manuell per Doppelklick auf eine Zeile
var autoMarkierung=true;

//Bestimmt wie haeufig eine Gruppe mindestens vorkommen muss um automatisch eingefaerbt zu werden.
var mindestHaufigkeit=1;

//Bestimmt ob versucht werden soll Koordinaten des Dorfes zu finden
var koordinatenSuchen=true;

//Bestimmt ob alle Rohstofflieferungen einschließlich Annehmen von Marktplatzangeboten zusammengefaßt werden sollen
lieferungenZusammenfassen=true;

//Bestimmt ob versucht werden soll verschiedene Typen von Berichten zu unterscheiden
//Steht es auf false, bekommen die Berichte "irgendwer unterstützt DorfA", "DorfA unterstützt irgendwen",
//"irgendwer beliefert DorfA", "deine Unterstützung in DorfA wurde angegriffen", "du ziehst deine Unterstützung aus DorfA ab" und
//"DorfA schickt die Unterstützung zurück" die gleiche Farbe
berichttypenUnterscheiden=true;

var farben = new Array(
	"#FFEFAE", "#FFD7AE", "#FECDD7", "#F9CDFE", "#E3CDFE", "#D3D7FE", "#D3ECFE", "#D3FEFA", "#CFFED0", "#ECFEAF",
	"#FFE064", "#FFB66C", "#FD829A", "#F28EFD", "#C699FD", "#8B97FC", "#83C9FC", "#74FCEE", "#69FC6C", "#DEFD73",
	"#F4C400", "#F47A00", "#FB1C48", "#E311FB",            "#1D33FA", "#0581DC", "#04C6B3", "#03A707", "#9CC903",
	"#AD966B", "#9E7A8B", "#AE6AA9", "#6B6398", "#6F8BAA", "#6DABAB", "#6BAD71",
	"#B79300", "#4F03AB", "#020F7D", "#034A7E", "#026258", "#014503", "#DFD9CE");

try{
	var css=document.styleSheets[2];
	for(var zeilenNummer=0;zeilenNummer<css.cssRules.length;zeilenNummer++)
	{
		if(css.cssRules[zeilenNummer].selectorText=="table.vis td"){
			css.cssRules[zeilenNummer].style.backgroundImage = 'none';
		}

//Optional: stellt zweifarbige Markierung bei nicht hervorgehobenen Zeilen aus
//		if(css.cssRules[zeilenNummer].selectorText=="table.vis tr.row_b td"){
//			css.cssRules[22].style.backgroundColor = '#F8F4E8';
//		}
	}
} catch(evt){}

for(var farbNummer=0;farbNummer<farben.length;farbNummer++){
	GM_addStyle("table.vis td.color"+farbNummer+" { background-color:"+farben[farbNummer]+"}");
	GM_addStyle("table.vis tr.row_a td.color"+farbNummer+" { background-color:"+farben[farbNummer]+"}");
	GM_addStyle("table.vis tr.row_b td.color"+farbNummer+" { background-color:"+farben[farbNummer]+"}");
}

var pattern1=new RegExp("\\(\\d{1,3}\\|\\d{1,3}\\)","g");
var pattern2=new RegExp("\\(\\d{1,2}:\\d{1,2}:\\d{1,2}\\)","g");

var vistabellen,tabellenNummer,datenOrt,datenOrtStelle,offsetVonHinten,laengeVonHinten;
var gruppenArray=new Array();
var zeilenArray = new Array();
var ersterDurchlauf=true;
var neustart=false;
var hakenSetzenFunktion=false;
var PA=false;


/*fuer zukuenftige opera-kompatibilitaet (by poncho)
 *if(typeof GM_addStyle!="function"){
 *	function GM_setValue(name, value) {
 *		document.cookie = name + '=' + escape(value) + '; expires=' + (new Date(2036, 1, 1)).toGMTString() + ';';
 *	}
 *	function GM_getValue(name) {
 *		var value = document.cookie.match('/'+name+'=(.*?)(?:;|$)/');
 *		if(value)
 *		return unescape(value[1]);
 *		return false;
 *	}
 *	function GM_addStyle(style) {
 *		var styleel = document.createElement('style');
 *		styleel.setAttribute('type', 'text/css');
 *		styleel.innerHTML = style;
 *		document.getElementsByTagName('head')[0].appendChild(styleel);
 *	}
 *}
 */

function starten() {
	try {
		var doc = getGameDoc();
		try{if(doc.getElementsByTagName("ul")[0].className=="menu nowrap quickbar"){PA=true;}}
		catch(evt){}
		var tabellen=doc.getElementsByTagName("table");
		vistabellen=new Array();
		for(var zeilenNummer=0;zeilenNummer<tabellen.length;zeilenNummer++){
			if(tabellen[zeilenNummer].className=="vis"){vistabellen.push(tabellen[zeilenNummer]);}
		}

    	if(doc.URL.match("screen=report")){	
			tabellenNummer=2;
			if(!PA){
				var seitenAuswahlZeile=vistabellen[1].getElementsByTagName("td")[0].innerHTML;
				if(seitenAuswahlZeile.search("&gt;[0-9]+&lt;")<0){
					tabellenNummer=1;
				}
			}
	    	datenOrt="span";
	    	datenOrtStelle=1;
	    	offsetVonHinten=0;
	    	laengeVonHinten=12;
	    	hakenSetzenFunktion=true;
	    } else if(doc.URL.match("screen=overview_villages")){
			if(doc.URL.match("mode=commands")){
				tabellenNummer=3;
				datenOrt="a";
				switch(GM_getValue("commandsort")) {
					case 0: datenOrtStelle=0;offsetVonHinten=7;laengeVonHinten=12; break;
					case 1: datenOrtStelle=2;offsetVonHinten=0;laengeVonHinten=12; break;
					default : datenOrtStelle=0;GM_setValue("commandsort", 0); break;
				}
				var headers = doc.getElementsByTagName("th");
				for(var zeilenNummer=0;zeilenNummer<headers.length;zeilenNummer++){
					if(headers[zeilenNummer].innerHTML.match("Befehl")){
						if(ersterDurchlauf){headers[zeilenNummer].addEventListener('click', function() {GM_setValue("commandsort", 0);neustarten();}, false);}
						if(GM_getValue("commandsort")==0){headers[zeilenNummer].innerHTML="Befehl (markiert)";}
						else{headers[zeilenNummer].innerHTML="Befehl";}
					}
					if(headers[zeilenNummer].innerHTML.match("Heimatdorf")){
						if(ersterDurchlauf){headers[zeilenNummer].addEventListener('click', function() {GM_setValue("commandsort", 1);neustarten();}, false);}
						if(GM_getValue("commandsort")==1){headers[zeilenNummer].innerHTML="Heimatdorf (markiert)";}
						else{headers[zeilenNummer].innerHTML="Heimatdorf";}
					}
				}
			} else if(doc.URL.match("mode=incomings")){
				tabellenNummer=3;
				var ignorierteAngriffeZeile=vistabellen[2].getElementsByTagName("td")[1].innerHTML;
				if(ignorierteAngriffeZeile.match("Ignorierte")){
					tabellenNummer=4;
				}
				datenOrt="a";
				switch(GM_getValue("incomingsort")) {
					case 0: datenOrtStelle=0;offsetVonHinten=7;laengeVonHinten=12; break;
					case 1: datenOrtStelle=2;offsetVonHinten=0;laengeVonHinten=12; break;
					case 2: datenOrtStelle=3;offsetVonHinten=0;laengeVonHinten=-1; break;
					default : datenOrtStelle=2;offsetVonHinten=0;laengeVonHinten=12;GM_setValue("incomingsort", 1); break;
				}
				var headers = doc.getElementsByTagName("th");
				for(var zeilenNummer=0;zeilenNummer<headers.length;zeilenNummer++){
					if(headers[zeilenNummer].innerHTML.match("Befehl")){
						if(ersterDurchlauf){headers[zeilenNummer].addEventListener('click', function() {GM_setValue("incomingsort", 0);neustarten();}, false);}
						if(GM_getValue("incomingsort")==0){headers[zeilenNummer].innerHTML="Befehl (markiert)";}
						else{headers[zeilenNummer].innerHTML="Befehl";}
					}
					if(headers[zeilenNummer].innerHTML.match("Ziel")){
						if(ersterDurchlauf){headers[zeilenNummer].addEventListener('click', function() {GM_setValue("incomingsort", 1);neustarten();}, false);}
						if(GM_getValue("incomingsort")==1){headers[zeilenNummer].innerHTML="Ziel (markiert)";}
						else{headers[zeilenNummer].innerHTML="Ziel";}
					}
					if(headers[zeilenNummer].innerHTML.match("Herkunft")){
						if(ersterDurchlauf){headers[zeilenNummer].addEventListener('click', function() {GM_setValue("incomingsort", 2);neustarten();}, false);}
						if(GM_getValue("incomingsort")==2){headers[zeilenNummer].innerHTML="Herkunft (markiert)";}
						else{headers[zeilenNummer].innerHTML="Herkunft";}
					}
				}
			}
		} else if(doc.URL.match("screen=mail")){
			if(PA){
				tabellenNummer=3;
				var seitenAuswahlZeile=vistabellen[2].getElementsByTagName("td")[0].innerHTML;
				if(seitenAuswahlZeile.search("&gt;[0-9]+&lt;")<0){
					tabellenNummer=2;
				}
				
			}
			else{
				tabellenNummer=2;
				var seitenAuswahlZeile=vistabellen[1].getElementsByTagName("td")[0].innerHTML;
				if(seitenAuswahlZeile.search("&gt;[0-9]+&lt;")<0){
					tabellenNummer=1;
				}
			}
	    	datenOrt="a";
	    	datenOrtStelle=1;
	    	offsetVonHinten=0;
	    	laengeVonHinten=-1;
	    	hakenSetzenFunktion=true;
		}//Seitenauswahl

		var zeilen = vistabellen[tabellenNummer].getElementsByTagName("tr");
    	for(var zeilenNummer=0;zeilenNummer<zeilen.length;zeilenNummer++){
    		var daten = zeilen[zeilenNummer].getElementsByTagName(datenOrt);
			try{
				var auswahlText=daten[datenOrtStelle].innerHTML;
				var gruppenText="";
				if(koordinatenSuchen&&pattern1.test(auswahlText)){
					pattern1.lastIndex=0;
      				while(pattern1.exec(auswahlText)){}
      				gruppenText=RegExp.lastMatch;
				}else if(koordinatenSuchen&&pattern2.test(auswahlText)){
					pattern2.lastIndex=0;
      				while(pattern2.exec(auswahlText)){}
      				gruppenText=RegExp.lastMatch;
				} else if(auswahlText.split(", ").length==3){
      				gruppenText=auswahlText.split(", ")[1];
				} else if(auswahlText.search(" greift ")>=0&auswahlText.lastIndexOf(" (")>auswahlText.search(" greift ")){
      				if(berichttypenUnterscheiden){gruppenText+="Angriff ";}
      				gruppenText+=auswahlText.slice(auswahlText.search(" greift ")+8,auswahlText.lastIndexOf(" ("));
				} else if(auswahlText.match(" wurde angegriffen")){
      				if(berichttypenUnterscheiden){gruppenText+="AngriffAufUnterstützung ";}
      				gruppenText+=auswahlText.slice(auswahlText.search(" in ")+4,auswahlText.search(" wurde angegriffen"));
				} else if(auswahlText.match(" zieht seine Unterstützung von ")){
      				if(berichttypenUnterscheiden){gruppenText+="Abzug ";}
      				gruppenText+=auswahlText.slice(auswahlText.search(" zieht seine Unterstützung von ")+31,auswahlText.search(" ab"));
				} else if(auswahlText.match(" schickt die Unterstützung von ")){
      				if(berichttypenUnterscheiden){gruppenText+="Zurückgeschickt ";}
      				gruppenText+=auswahlText.substring(0,auswahlText.search(" schickt die Unterstützung von "));
      				gruppenText=gruppenText.substring(gruppenText.lastIndexOf(">")+1);
      			} else if(auswahlText.match(" unterstützt ")){
      				if(berichttypenUnterscheiden){gruppenText+="Unterstützung ";}
      				gruppenText+=auswahlText.substr(auswahlText.search(" unterstützt ")+13);
				} else if(auswahlText.match("Angebot")){
      				if(lieferungenZusammenfassen){gruppenText+="Lieferung";}
      				else{
      					if(berichttypenUnterscheiden){gruppenText+="Lieferung ";}
      					gruppenText+=auswahlText.slice(auswahlText.search("Angebot von ")+12,auswahlText.search(" angenommen"));
      				}
				} else if(auswahlText.match(" beliefert ")){
      				if(lieferungenZusammenfassen){gruppenText+="Lieferung";}
      				else{
      					if(berichttypenUnterscheiden){gruppenText+="Lieferung ";}
      					gruppenText+=auswahlText.substr(auswahlText.search(" beliefert ")+11);
      				}
      			} else if(auswahlText.match("Urlaubsvertretung")){
      				gruppenText="Urlaubsvertretung";
      			} else if(auswahlText.match(" hat dich in den Stamm ")){
      				gruppenText="Einladung";
      			} else if(auswahlText.match("Die Einladung des Stammes ")){
      				gruppenText="Einladung";
      			} else{
					gruppenText=auswahlText.substring(0,auswahlText.length-offsetVonHinten);
					if(laengeVonHinten>0) gruppenText=gruppenText.substring(gruppenText.length-laengeVonHinten,gruppenText.length);
					gruppenText=gruppenText.substring(gruppenText.lastIndexOf(">")+1);
				}
			    //alert(gruppenText);
				var gruppenNummer=0;
				while(gruppenArray[gruppenNummer]!=null&&gruppenArray[gruppenNummer][1]!=gruppenText){
					gruppenNummer++;
				}
				try{gruppenArray[gruppenNummer]=[gruppenNummer,gruppenText,gruppenArray[gruppenNummer][2],gruppenArray[gruppenNummer][3],gruppenArray[gruppenNummer][4]=gruppenArray[gruppenNummer][4]+1];}
				catch(evt){gruppenArray[gruppenNummer]=[gruppenNummer,gruppenText,autoMarkierung,false,1];}
														//gruppennummer,gruppentext,markierung,checkbox,haeufigkeit
				if(ersterDurchlauf|neustart){zeilenArray[zeilenNummer]=[gruppenNummer,function(){}];}
			}
			catch(evt){}
    	}

    	if(gruppenArray.length>farben.length|mindestHaufigkeit>1){
			gruppenArray.sort(function(p1,p2){return p2[4]-p1[4];});
	   	}

    	for(var zeilenNummer=0;zeilenNummer<zeilen.length;zeilenNummer++){
    		var daten = zeilen[zeilenNummer].getElementsByTagName(datenOrt);
			try{
				var platzNummer=0;
				while(gruppenArray[platzNummer]!=null&&gruppenArray[platzNummer][0]!=zeilenArray[zeilenNummer][0]){
					platzNummer++;
				}

				if(ersterDurchlauf|neustart){
					if(gruppenArray[platzNummer][4]<mindestHaufigkeit) gruppenArray[platzNummer][2]=false;
					
					zeilenArray[zeilenNummer][1]=(function(e) {return function() {gruppenArray[e][2]=!gruppenArray[e][2];starten();}})(platzNummer);
					zeilen[zeilenNummer].addEventListener('dblclick', zeilenArray[zeilenNummer][1], false);
					if(hakenSetzenFunktion){
						zeilenArray[zeilenNummer][2]=(function(e) {return function() {gruppenArray[e][2]=!gruppenArray[e][2];gruppenArray[e][3]=!gruppenArray[e][3];starten();}})(platzNummer);
						zeilen[zeilenNummer].getElementsByTagName("input")[0].addEventListener('dblclick',zeilenArray[zeilenNummer][2], false);
					}
				}

				var tabledata=zeilen[zeilenNummer].getElementsByTagName("td");
				for(var l=0;l<tabledata.length;l++){
					if(gruppenArray[platzNummer][2]){tabledata[l].className="color"+platzNummer;}
					else tabledata[l].className="";
				}
				if(hakenSetzenFunktion){zeilen[zeilenNummer].getElementsByTagName("input")[0].checked=gruppenArray[platzNummer][3];}
			}
			catch(evt){}
    	}
    	ersterDurchlauf=false;
    	neustart=false;
  } catch(evt) {
    //pssst, don't tell
  }
}//starten, gruppen ermitteln, gruppen zuordnen und einfaerben

function neustarten(){
	gruppenArray=new Array();
	var zeilen = vistabellen[tabellenNummer].getElementsByTagName("tr");
   	for(var zeilenNummer=0;zeilenNummer<zeilen.length;zeilenNummer++){
   		try{zeilen[zeilenNummer].removeEventListener('dblclick', zeilenArray[zeilenNummer][1],false);}catch(evt){}
   		try{zeilen[zeilenNummer].getElementsByTagName("input")[0].removeEventListener('dblclick',zeilenArray[zeilenNummer][2], false);}catch(evt){}
   	}
   	zeilenArray=new Array();
    neustart=true;
	starten();
}//neustarten bei gruppierungswechsel

function getGameDoc(){
	getdoc=window.document;
	if(!getdoc.URL.match("game.php")){
		for(zeilenNummer=0;zeilenNummer<window.frames.length;zeilenNummer++){
			if(window.frames[zeilenNummer].document.URL.match("game.php")){
				getdoc = window.frames[zeilenNummer].document;
			}
		}
	}
	return getdoc;
}//getGameDoc

starten();