// 
// version 0.3 for greasemonkey
// 2013-Jan-27
// Copyright (c) 2013, madin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Do not USE this code for Google Chrome.
// The Software is provided "AS IS" and "WITH ALL FAULTS," without warranty of any kind, including without limitation the warranties of merchantability, fitness for a particular purpose and non-infringement. The Licensor makes no warranty that the Software is free of defects or is suitable for any particular purpose. In no event shall the Licensor be responsible for loss or damages arising from the installation or use of the Software, including but not limited to any indirect, punitive, special, incidental or consequential damages of any character including, without limitation, damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses. The entire risk as to the quality and performance of the Software is borne by you. Should the Software prove defective, you and not the Licensor assume the entire cost of any service and repair. 
// Solange auf presse.com nichts verändert wird, sollte dieses Script funktionieren.
// --------------------------------------------------------------------
//
//Sie lesen gerne die Postings auf diepresse.com?
//Haben aber keine Lust alle Kommentare zu lesen, sondern sind nur an den am besten bewerteten interessiert?
//
//
//diePresseComKommentarSortierung sortiert die Threads eines Artikels nach der besten Bewertung eines Kommentars und stellt sie auf einer Seite dar.
//
//diePresseComATKommentarSortierung sammelt keine Daten.
//Es werden die Kommentare der ersten 15 Seiten Sortiert.
//Wenn ein Thread aus mehreren Beiträgen ein Kommentar enthält welches sehr gut bewertet ist, dann wird der gesamte Thread nach dieser Bewertung gereiht. Auch wenn z.B. der 1. Beitrag schlecht bewertet ist.
//Es werden nur die positiven Bewertungen berücksichtigt.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Kommentarsortierung für diePresseCom
// @description   Sortiert die Kommentare auf diePresse.com nach der besten Bewertung im Thread.
// @include       http://diepresse.com/*
// @include       http://www.diepresse.com/*
// @version		  0.3
// @grant		  none
// ==/UserScript==

/* ChangeLog

V0.3 Sortierung von Beiträgen wenn es nur 1 Seite gibt ermöglicht.


*/




/*
var GPL_Violation = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		if (GPL_Violation){
			alert("I warned you! Do not use this script for Google Chrome! Use Firefox instead! ");
		}
*/



if ("undefined" == typeof(diePresseComATKommentarSortierungGreaseM)) {
  var diePresseComATKommentarSortierungGreaseM = {
  
	madinPresseComForumButtonEinfuegen : function(){
	
	
		if (window.content.document.getElementById("MadinRateButton") == null){//wenn noch kein button eingefügt
 
		
		window.content.document.madinPresseComForumXMLHttpRequestArray = new Array();
		window.content.document.madinPresseComForumZaehlerZiel = 0;
		 
		window.content.document.ThreadGesamtAnzahl = 0;
		window.content.document.ThreadsEingefuegtAnzahl = 0;
		window.content.document.BeitraegeGesamtAnzahl = 0;
		window.content.document.AnzahlEinzufuegenderBeitraegeProDurchlauf = 50;
		
	 
		//wenn auf diepresse.com
		if (window.content.location.href.indexOf("http://diepresse.com") ==0 ||
				window.content.location.href.indexOf("http://www.diepresse.com") ==0) {//nur wenn auf diePresseCom usw
		
		//wenn forum existiert	
		
			if (window.content.document.getElementById("commentbox") != null){
				MadinRateButton = window.content.document.createElement("div");
				MadinRateButton.id = "MadinRateButton";
				MadinRateButton.textContent = "Kommentare sortieren"; 
				MadinRateButton.style.width = "150px";
				MadinRateButton.style.height = "20px";
				MadinRateButton.style.paddingTop = "5px";
				MadinRateButton.style.fontSize = "1em";
				MadinRateButton.style.marginBottom = "20px";
				MadinRateButton.style.paddingLeft = "10px";
				MadinRateButton.style.background = "-moz-linear-gradient(top, #1B7677, #553A26)";
				
				
				MadinRateButton.addEventListener("click", diePresseComATKommentarSortierungGreaseM.madinPresseComForumAsynchXMLHTTPRequestsSenden, false);
				
				
				var  AnzahlBeitraege=window.content.document.getElementsByClassName("commentWrapper");
					if (AnzahlBeitraege.length > 1){//wenn mehr als 1 beitrag existiert
			
						if (window.content.document.getElementById("MadinRateButton") == null){
							window.content.document.getElementById("commentbox").insertBefore(MadinRateButton,window.content.document.getElementsByClassName("commentcount")[0]);
						}
					}
			}else{//wenn kein forum

			}		
			
		}//ende of auf diePresseCom
	
	}//wenn noch kein button eingefügt
},//Ende funktion ButtonErstellen



	





madinPresseComForumAsynchXMLHTTPRequestsprogress : function ()	{//counting accessful requests starts sortation if all requests are done
	window.content.document.madinPresseComForumZaehler++;
	window.content.document.getElementById("MadinRateButton").textContent = "Empfange Seite " + window.content.document.madinPresseComForumZaehler+ "/" +window.content.document.madinPresseComForumZaehlerZiel;

	//wen alle empfangen
	if (window.content.document.madinPresseComForumZaehlerZiel == window.content.document.madinPresseComForumZaehler){//wenn fertig
		window.content.document.getElementById("MadinRateButton").textContent = "Sortiere, bitte warten...";
		setTimeout(function(){diePresseComATKommentarSortierungGreaseM.madinPresseComForum1AlsArrayEinlesen()}, 1100);
	}
},



	
madinPresseComForumAsynchXMLHTTPRequestsSenden : function ()	{//sending asynchronous XMLHttpRequest

	/*Variable reset*/
	window.content.document.madinPresseComForumZaehler = 0;
	window.content.document.getElementById("MadinRateButton").textContent = "Bitte warten.."; 
	window.content.document.SeitenUrlArray = diePresseComATKommentarSortierungGreaseM.madinPresseComGetSeitenUrlArray();
	window.content.document.madinPresseComForumZaehlerZiel =window.content.document.SeitenUrlArray.length;

	for (var i = 0; i <window.content.document.SeitenUrlArray.length; i++){
	//	alert("sende: " + i + "   " + window.content.document.SeitenUrlArray[i][1]);
		diePresseComATKommentarSortierungGreaseM.madinPresseComForumSendRequest(i);
	}
	
	content.document.getElementById("MadinRateButton").textContent = "Gesendet";
	setTimeout(function(){diePresseComATKommentarSortierungGreaseM.madinPresseComForumNichtFunktioniert()}, window.content.document.SeitenUrlArray.length*1200);
},


madinPresseComGetSeitenUrlArray : function () {//Liefert ein Array mit den Urls der Seiten die Sortiert werden sollen. Evt werden nicht alle seiten erwischt
	
	if (window.content.document.getElementsByClassName("commentnavilist").length > 0){//wenn es meherere Seiten gibt
		var NavigationsLinksArray = window.content.document.getElementsByClassName("commentnavilist")[0].getElementsByTagName("a");//Navigationslinks
	}else{
		var NavigationsLinksArray = new Array();
	}
	
	var madinPresseComZielSeitenArray = new Array();
	
	for (var i = 0; i <NavigationsLinksArray.length; i++){
		if (NavigationsLinksArray[i].tagName == "A"){
			var aktuellerBeginn = NavigationsLinksArray[i].href.indexOf("&page=");
			var aktuellesEnde =  NavigationsLinksArray[i].href.indexOf("#", aktuellerBeginn);
			var PageNumber = parseInt(NavigationsLinksArray[i].href.substr(aktuellerBeginn+6, aktuellesEnde-(aktuellerBeginn+6)));
			//if (!isNaN(PageNumber)){
				madinPresseComZielSeitenArray[i] = new Array(2);
				madinPresseComZielSeitenArray[i][0] = PageNumber;//Link Eintragen
				madinPresseComZielSeitenArray[i][1] = NavigationsLinksArray[i].href;//Link Eintragen
			//}
		}
	}
	
	//Aktuelle Seite Einfügen
	var eigeneUrl = window.content.location.href;//actual Url
	var aktuellerBeginn = eigeneUrl.indexOf("&page=");
	var aktuellesEnde =  eigeneUrl.indexOf("#", aktuellerBeginn);
	var NummerDerEigenenSeite = parseInt(eigeneUrl.substr(aktuellerBeginn+6, aktuellesEnde-(aktuellerBeginn+6)));
	var Link = "";
	
	if (!isNaN(NummerDerEigenenSeite) && NummerDerEigenenSeite>0){//if Valid
		PageNumber = NummerDerEigenenSeite;
	}else{//if Not valid --> propably on page 1
		PageNumber = 1;
		if (window.content.location.href.indexOf("?") != -1){
			eigeneUrl = window.content.location.href + "&offset=0&page=1#kommentar0";
		}else{
			eigeneUrl = window.content.location.href + "?offset=0&page=1#kommentar0";
		}
	}
	
	madinPresseComZielSeitenArray[NavigationsLinksArray.length] = new Array(2);
	madinPresseComZielSeitenArray[NavigationsLinksArray.length][0] = PageNumber;//Link Eintragen
	madinPresseComZielSeitenArray[NavigationsLinksArray.length][1] = eigeneUrl;//Link Eintragen
	madinPresseComZielSeitenArray.sort(diePresseComATKommentarSortierungGreaseM.sortArrayX0Aufsteigend);
	
	return madinPresseComZielSeitenArray;
	
},


madinPresseComForumFehler : function () {
	alert("Fehler beim Empfangen wg 301");
},			



madinPresseComForumSendRequest : function (indexNummer) {
	//alert(window.content.document.SeitenUrlArray[indexNummer]);
	var Target = window.content.document.SeitenUrlArray[indexNummer][1];
		
		
	if (Target.indexOf("http://diepresse.com") ==0 ||
		Target.indexOf("http://www.diepresse.com") ==0) {//only works on specified Sites
		
			window.content.document.madinPresseComForumXMLHttpRequestArray[indexNummer] = new XMLHttpRequest();
			window.content.document.madinPresseComForumXMLHttpRequestArray[indexNummer].open('GET', Target, true);
			window.content.document.madinPresseComForumXMLHttpRequestArray[indexNummer].responseType = "document";
			window.content.document.madinPresseComForumXMLHttpRequestArray[indexNummer].onload = diePresseComATKommentarSortierungGreaseM.madinPresseComForumAsynchXMLHTTPRequestsprogress;	
			window.content.document.madinPresseComForumXMLHttpRequestArray[indexNummer].send(); 
	}
	
},

 


 
  
madinPresseComForumNichtFunktioniert : function () {//sicherheitsbedingung wenn etwas nicht funktionieren sollte (zb. keine antwort auf httprequest)
	
	
	var StringEins = "";
	var fehler = false;
	
	for (var i = 0; i <window.content.document.SeitenUrlArray.length; i++){
		StringEins = StringEins + "\n" + i + ": " + window.content.document.madinPresseComForumXMLHttpRequestArray[i].readyState;
		if ( window.content.document.madinPresseComForumXMLHttpRequestArray[i].readyState != 4){
			window.content.document.getElementById("MadinRateButton").textContent = "Versuche erneut: " + window.content.document.madinPresseComForumZaehler+ "/" +window.content.document.madinPresseComForumZaehlerZiel;
			fehler = true;
			StringEins = StringEins + " fehler";
			diePresseComATKommentarSortierungGreaseM.madinPresseComForumSendRequest(i);
		}
	}
	if (fehler == true){
		//alert(StringEins);//debug
	} else{
		//alert(StringEins);//debug
	}
	
},

 
  
  
madinPresseComForum1AlsArrayEinlesen : function ()	{//Extracting data from Request response texts

 /*
 vorgehen:
 [Threadnr]
	[0][0] Bewertung
	[0][1] Beitrag mit bester Bewertung
	[1-x] Beiträge
 */
 
 var ThreadArray = new Array();
 var ThreadArrayLaufer = -1;
 var Beitragslaufer = 0;
 var GesamtbeitragsAnzahl = 0;
 var BeitragsIDAlt= " ";
 
	for (var i = 0; i < window.content.document.madinPresseComForumXMLHttpRequestArray.length ; i++){
		var BeitragsArray = window.content.document.madinPresseComForumXMLHttpRequestArray[i].responseXML.getElementsByClassName('commentWrapper');//alle Beiträge als Array
		var AnzahlBeitraegeProSeite = BeitragsArray.length;//Anzahl der Neuen Beiträge

		for (var n = 0; n < AnzahlBeitraegeProSeite ; n++){ 
			//Prüfung: doppelten Beitrag nicht einfügen
			var BeitragsID = BeitragsArray[n].getElementsByTagName("a")[0].attributes["name"].value;
		
			if (BeitragsIDAlt!= BeitragsID){//nur wenn beitrag nicht zuvor schon eingefügt
				BeitragsIDAlt = BeitragsID;
				 //wenn neuer thread
				if (BeitragsArray[n].getElementsByClassName("comment").length != 0){
					ThreadArrayLaufer++;
					ThreadArray[ThreadArrayLaufer] = new Array();
					ThreadArray[ThreadArrayLaufer][0] = new Array();
					ThreadArray[ThreadArrayLaufer][0][0] = 0;//Max Bewertung auf 0;
					ThreadArray[ThreadArrayLaufer][0][1] = 0;//Der Am Besten Bewertete auf 0
					Beitragslaufer = 0;
					//alert ("Neuer Beitrag " + BeitragsArray[n].getElementsByClassName("comment")[0].outerHTML);
				}

				Beitragslaufer++;
				GesamtbeitragsAnzahl++;
				ThreadArray[ThreadArrayLaufer][Beitragslaufer]= new Array(3);
				ThreadArray[ThreadArrayLaufer][Beitragslaufer][2] = BeitragsArray[n];//Beitrag eintragen
				//Bewertung berechnen
				var ElementPlus = ThreadArray[ThreadArrayLaufer][Beitragslaufer][2].getElementsByClassName("voting")[0].getElementsByClassName("stand")[0];//.firstChild;//.firstChild;
				var ElementMinus = ThreadArray[ThreadArrayLaufer][Beitragslaufer][2].getElementsByClassName("voting")[0].getElementsByClassName("stand")[1];
				ThreadArray[ThreadArrayLaufer][Beitragslaufer][0] = parseInt(ElementPlus.textContent);	
				ThreadArray[ThreadArrayLaufer][Beitragslaufer][1] = parseInt(ElementMinus.textContent);	

				if (ThreadArray[ThreadArrayLaufer][Beitragslaufer][0] > ThreadArray[ThreadArrayLaufer][0][0]){//Wenn bewertung von Beitrag besser als beste bewertung dann eintragen
					ThreadArray[ThreadArrayLaufer][0][0] = ThreadArray[ThreadArrayLaufer][Beitragslaufer][0];//Beste Bewertung
					ThreadArray[ThreadArrayLaufer][0][1] = [Beitragslaufer];//Beitrag mit Bester bewertung
				}
			
			}
		}
	}
 
 
	window.content.document.ThreadArray1 = ThreadArray;
	window.content.document.ThreadGesamtAnzahl = ThreadArray.length;
	window.content.document.BeitraegeGesamtAnzahl = GesamtbeitragsAnzahl;
	setTimeout(function(){diePresseComATKommentarSortierungGreaseM.madinPresseComForumSortierungVariante1()}, 100);
	
},


madinPresseComForumSortierungVariante1 : function (){
	var ThreadArray =  window.content.document.ThreadArray1;
	 ThreadArray.sort(diePresseComATKommentarSortierungGreaseM.sortMultiDimensional);//Array nach bewertungen sortieren

	setTimeout(function(){diePresseComATKommentarSortierungGreaseM.madinPresseComForumSortierungSeiteFuersEinfuegenVorbereiten()}, 100);
	content.document.getElementById("MadinRateButton").textContent = "Sortierung Fertig";
},


madinPresseComForumSortierungSeiteFuersEinfuegenVorbereiten : function (){//Bereitet alles aufs Einfügen vor
	//Container Erstellen
	var ForumKomplettContainer = window.content.document.createElement("div");
	ForumKomplettContainer.id = "ForumKomplettContainer";


	//Element nach dem letzen Beitrag herausfinden
	var ElementNachDemLetzenUp = window.content.document.getElementsByClassName("commentWrapper")[content.document.getElementsByClassName("commentWrapper").length-1].nextSibling;
	 
	 //alle Beiträge der aktuellen Seite löschen
	for(var k = window.content.document.getElementsByClassName("commentWrapper").length-1; k >= 0; k--){
		window.content.document.getElementsByClassName("commentWrapper")[k].parentNode.removeChild(window.content.document.getElementsByClassName("commentWrapper")[k]);
	}
	
	document.getElementById("commentbox").insertBefore(ForumKomplettContainer,ElementNachDemLetzenUp );
	
	//Navigationsleisten entfernen
	while(window.content.document.getElementsByClassName("commentnavi").length >0){
		var KindKnoten = window.content.document.getElementsByClassName("commentnavi")[0];
		var MutterKnoten= window.content.document.getElementsByClassName("commentnavi")[0].parentNode;
		MutterKnoten.removeChild(KindKnoten);
	}
	
	/*2. infoboxen eintragen*/
	for(var k = 0; k < window.content.document.getElementsByClassName("commentcount").length; k++){
		window.content.document.getElementsByClassName("commentcount")[k].textContent = window.content.document.BeitraegeGesamtAnzahl 
																		+' Beitr\u00e4ge in ' 
																		+ window.content.document.ThreadGesamtAnzahl + ' Threads';
	}
	 
	setTimeout(function(){diePresseComATKommentarSortierungGreaseM.madinPresseComForumSortierungEinfuegenSequentiell(1)}, 50);
	
},





madinPresseComForumSortierungEinfuegenSequentiell : function (nummer){//Fügt die Elemente ein. Beginnend mit dem Thread mit der besten Bewertung
//max  window.content.document.AnzahlEinzufuegenderBeitraegeProDurchlauf =50 pro durchlauf danach rekursiver aufruf mit settimeout

// Variablenauflistung 
//		window.content.document.ThreadGesamtAnzahl = 0;
//		window.content.document.ThreadsEingefuegtAnzahl = 0;
//		window.content.document.BeitraegeGesamtAnzahl = 0;
//		window.content.document.AnzahlEinzufuegenderBeitraegeProDurchlauf = 50;



 var ThreadArray = window.content.document.ThreadArray1;
 var BeitragsDurchlaufAnzahl = 0;
 
  var ForumKomplettContainer = window.content.document.getElementById("ForumKomplettContainer");
	var ThreadAnzahl = ThreadArray.length;
	
	for (var i = window.content.document.ThreadsEingefuegtAnzahl; i < window.content.document.ThreadGesamtAnzahl; i++){
		var BewertungsanzeigeLinie = window.content.document.createElement("hr");
		BewertungsanzeigeLinie.className = "cr";
		var UmbruchBR = window.content.document.createElement("br");
		
		var BewertungsanzeigeUmbruch = window.content.document.createElement("div");
		BewertungsanzeigeUmbruch.className  = "Bewertungsanzeige";
		BewertungsanzeigeUmbruch.textContent = 'Beste Bewertung im Thread: ' +  parseInt(ThreadArray[i][0][0]) +  " Antworten: " + (ThreadArray[i].length-2);
		BewertungsanzeigeUmbruch.style.fontSize = "0.8em";
		//ForumKomplettContainer.appendChild(BewertungsanzeigeLinie);
		
		//ForumKomplettContainer.appendChild(UmbruchBR);
		//ForumKomplettContainer.appendChild(UmbruchBR);
		ForumKomplettContainer.appendChild(BewertungsanzeigeLinie);
		//ForumKomplettContainer.appendChild(BewertungsanzeigeUmbruch);
		
		var BeitragsAnzahl = ThreadArray[i].length;
		
		
		for (var n = 1; n < BeitragsAnzahl; n++){
			BeitragsDurchlaufAnzahl++;
			
			
			ForumKomplettContainer.appendChild(ThreadArray[i][n][2]);
			
		}
		
		if (BeitragsDurchlaufAnzahl >= window.content.document.AnzahlEinzufuegenderBeitraegeProDurchlauf){//wenn max Anzahl an Beiträgen/durchlauf bereits eingefügt worden ist dann abbrechen
			break;
		}		
		
	}

	nummer = nummer+1;

	window.content.document.ThreadsEingefuegtAnzahl = i+1;
	


	if (window.content.document.ThreadsEingefuegtAnzahl < window.content.document.ThreadGesamtAnzahl-1){
		content.document.getElementById("MadinRateButton").textContent = "Adde Thread: " + window.content.document.ThreadsEingefuegtAnzahl +"/" + window.content.document.ThreadGesamtAnzahl;
		setTimeout(function(){diePresseComATKommentarSortierungGreaseM.madinPresseComForumSortierungEinfuegenSequentiell(nummer)}, 50);
	}else{
		content.document.getElementById("MadinRateButton").style.visibility = "hidden";
	}

},



sortArrayX0Aufsteigend : function (a,b){
		return ((a[0] < b[0]) ? -1 : ((a[0] > b[0]) ? 1 : 0));
},

sortMultiDimensional : function (a,b){
		return ((a[0][0] < b[0][0]) ? 1 : ((a[0][0] > b[0][0]) ? -1 : 0));
} 





	
 };//ende var diePresseComATKommentarSortierungGreaseM = {};
};//ende if ("undefined" == typeof(diePresseComATKommentarSortierungGreaseM)) {



diePresseComATKommentarSortierungGreaseM.madinPresseComForumButtonEinfuegen ();
