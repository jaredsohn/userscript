// 
// version 0.9 for greasemonkey Vorlaufige Version
// 2013-Feb-19
// Copyright (c) 2013, madin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Nach diesem Addon haben Sie HÄNDERINGEND gesucht!
//Das beste auf derstandard.at sind die Postings.
//Doch was tun bei 1000 Posts und einem neuen Artikel?

//derStandardATKommentarSortierung sortiert alle Threads eines Artikels nach der besten Bewertung eines Kommentars und stellt sie auf einer Seite dar.

//derStandardATKommentarSortierung sammelt keine Daten, funktioniert nur auf derstandart.at diestandard.at dastandard.at und schickt nichts an fremde Websites.

//Nie mehr verklicken bei der Bewertung eines Kommentars. Die Bewertungsbuttons werden links und rechts vom Bewertungsbalken angeordnet.
//

//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Kommentarsortierung für derstandard

// @description   Sortiert die Kommentare auf derstandard.at nach der besten Bewertung im Thread.
// @include       http://derstandard.at/*
// @include       http://diestandard.at/*
// @include       http://dastandard.at/*
// @include       http://www.derstandard.at/*
// @include       http://www.diestandard.at/*
// @include       http://www.dastandard.at/*
// @version		  0.9
// @grant		  none
// ==/UserScript==


/*
ChangeLog

V09: Button um direkt zum Forum zu gelangen eingefügt
	Schriftfarbe der Buttons veraendert


V08: Bezeichnung Button veraendert


V07: Usability erhöht:
Linien nach jedem Thread. Damit bei langen Threads schnell der nächste gefunden werden kann.
Highlight des besten Beitrages im Thread wenn der Thread aus mehreren Beiträgen besteht.
Experiementelle Erkennung von Trollposts und Berechnung des Trollfaktors. Der Trollfaktor wird als Tooltiptext bei potentiellen Trollposts angezeigt.



*/






if ("undefined" == typeof(derStandardATKommentarSortierungGreaseM)) {
  var derStandardATKommentarSortierungGreaseM = {
  
	MadinStandardForumButtonEinfuegen : function(){
		if (window.content.document.getElementById("MadinRateButton") == null){//wenn noch kein button eingefügt
 
 
		window.content.document.MadinStandardForumXMLHttpRequestArray = new Array();
		window.content.document.MadinStandardForumZaehlerZiel = 0;
		 
		window.content.document.ThreadGesamtAnzahl = 0;
		window.content.document.ThreadsEingefuegtAnzahl = 0;
		window.content.document.BeitraegeGesamtAnzahl = 0;
		window.content.document.AnzahlEinzufuegenderBeitraegeProDurchlauf = 50;
		
	 
		//wenn auf standard.at
		if (window.content.location.href.indexOf("http://derstandard.at") ==0 ||
		window.content.location.href.indexOf("http://www.derstandard.at") ==0 ||
		window.content.location.href.indexOf("http://diestandard.at") ==0 || 
		window.content.location.href.indexOf("http://www.diestandard.at") == 0 || 
		window.content.location.href.indexOf("http://dastandard.at") ==0 || 
		window.content.location.href.indexOf("http://www.dastandard.at") ==0) {//nur wenn auf derstandard usw
		//wenn forum existiert	
			if (window.content.document.getElementById("communityCanvas") != null){
				MadinRateButton = window.content.document.createElement("div");
				MadinRateButton.id = "MadinRateButton";
				MadinRateButton.textContent = "Kommentare sortieren"; 
				MadinRateButton.style.width = "140px";
				MadinRateButton.style.height = "20px";
				MadinRateButton.style.paddingTop = "5px";
				MadinRateButton.style.fontSize = "1.3em";
				MadinRateButton.style.marginBottom = "20px";
				MadinRateButton.style.paddingLeft = "10px";
				MadinRateButton.style.background = "-moz-linear-gradient(top, #1B7677, #553A26)";
				//MadinRateButton.style.color ="rgb(224, 227, 224)";
				MadinRateButton.style.color ="#E7DBBD";
				
				MadinRateButton.addEventListener("click", derStandardATKommentarSortierungGreaseM.MadinStandardForumAsynchXMLHTTPRequestsSenden, false);
				
				
				var  AnzahlBeitraege=window.content.document.getElementsByClassName("up");
					if (AnzahlBeitraege.length > 1){//wenn mehr als 1 beitrag existiert
			
						if (window.content.document.getElementById("MadinRateButton") == null){
							window.content.document.getElementById("communityCanvas").insertBefore(MadinRateButton,content.document.getElementsByClassName("up")[0]);
							derStandardATKommentarSortierungGreaseM.MadinStandardForumToForumButton();//Zum Forum Button Einfuegen
							
							
							derStandardATKommentarSortierungGreaseM.MadinStandardForumAlleRatebuttonsAnordnen();
						}
					}
			}else{//wenn kein forum

			}		
			
		}//ende of auf derstandard
	
	}//wenn noch kein button eingefügt
},//Ende funktion ButtonErstellen



	





MadinStandardForumAsynchXMLHTTPRequestsprogress : function ()	{//counting accessful requests starts sortation if all requests are done
	window.content.document.MadinStandardForumZaehler++;
	window.content.document.getElementById("MadinRateButton").textContent = "Empfange Seite " + window.content.document.MadinStandardForumZaehler+ "/" +window.content.document.MadinStandardForumZaehlerZiel;
	
	//wen alle empfangen
	if (window.content.document.MadinStandardForumZaehlerZiel == window.content.document.MadinStandardForumZaehler){//wenn fertig
		window.content.document.getElementById("MadinRateButton").textContent = "Sortiere, bitte warten...";
		setTimeout(function(){derStandardATKommentarSortierungGreaseM.MadinStandardForum1AlsArrayEinlesen()}, 1100);
	}
},



	
MadinStandardForumAsynchXMLHTTPRequestsSenden : function ()	{//sending asynchronous XMLHttpRequest

	/*Variable reset*/
	window.content.document.MadinStandardForumZaehler = 0;
	window.content.document.MadinStandardForumZaehlerZiel =0;

	window.content.document.getElementById("MadinRateButton").textContent = "Bitte warten.."; 
	
	var maxSeite = derStandardATKommentarSortierungGreaseM.MadinStandardForumGetMaxSiteNumber();
 	
	window.content.document.MadinStandardForumZaehlerZiel = maxSeite;
	window.content.document.ParameterloseHaupturl = derStandardATKommentarSortierungGreaseM.MadinStandardForumextractParameterFromUrl();
	
	for (var i = 1; i <=maxSeite; i++){
		derStandardATKommentarSortierungGreaseM.MadinStandardForumSendRequest(i);
	}
	
	content.document.getElementById("MadinRateButton").textContent = "Gesendet";
 
 
	setTimeout(function(){derStandardATKommentarSortierungGreaseM.MadinStandardForumNichtFunktioniert()}, maxSeite*1200);
},


MadinStandardForumextractParameterFromUrl : function () {
	var ParameterloseHaupturl = window.content.location.href;

	/*Url ohne ?Parameter extrahieren*/
	if (ParameterloseHaupturl.indexOf("?") != -1){//wenn aktuele Url Parameter enthält 
		ParameterloseHaupturl = ParameterloseHaupturl.substring(0,ParameterloseHaupturl.indexOf("?"));//ParameterEntfernen
	}

  
   /*Workaround fuer Permalinkseiten:
   http://derstandard.at/plink/<nummer des Artikels>
   wird zu:
   http://derstandard.at/<nummer des Artikels>
   */
  
	if (ParameterloseHaupturl.indexOf("/plink") != -1){//wenn aktuele Url subverzeichnis plink enthält 
		ParameterloseHaupturl = ParameterloseHaupturl.replace("/plink" , "");//ParameterEntfernen
    }
  /*/Ende Workaround fuer Permalinkseiten*/
 
	if (ParameterloseHaupturl.indexOf("#") != -1){//wenn aktuele Url Parameter enthält 
		ParameterloseHaupturl = ParameterloseHaupturl.substring(0,ParameterloseHaupturl.indexOf("#"));//ParameterEntfernen
	}
 
	return ParameterloseHaupturl;
	
},



MadinStandardForumGetMaxSiteNumber : function (){//Returns the number of the last page in the forum
	/*SeitenAnzahl Extrahieren*/
	/*
		die letze seite ist im link mit "seite=" +  Zahl + "#forumstart" enthalten. 
	*/

	var maxSeite = 1;
	var ParseIntSeite = 0;

	for (var i = 0; i <window.content.document.getElementsByTagName("a").length; i++){//durchlaufe alle <a> Tags
		var aktuellerHref = window.content.document.getElementsByTagName("a")[i].href;
		var aktuellerBeginn = aktuellerHref.indexOf("seite=");
		var aktuellesEnde =  aktuellerHref.indexOf("#forumstart", aktuellerBeginn);

		if (aktuellerBeginn != -1 && aktuellesEnde != -1){
			ParseIntSeite = parseInt(aktuellerHref.substr(aktuellerBeginn+6, aktuellesEnde-(aktuellerBeginn+6)));
			if (!isNaN(ParseIntSeite) && ParseIntSeite >  maxSeite){
				maxSeite = ParseIntSeite;
			}
		}
	}
	return maxSeite;
},




MadinStandardForumSendRequest : function (indexNummer) {
	var Target = window.content.document.ParameterloseHaupturl+"?seite="+ indexNummer + "#forumstart";
	if (Target.indexOf("http://derstandard.at") ==0 ||
		Target.indexOf("http://www.derstandard.at") ==0 ||
		Target.indexOf("http://diestandard.at") ==0 || 
		Target.indexOf("http://www.diestandard.at") == 0 || 
		Target.indexOf("http://dastandard.at") ==0 || 
		Target.indexOf("http://www.dastandard.at") ==0) {//only works on specified Sites
			window.content.document.MadinStandardForumXMLHttpRequestArray[indexNummer] = new XMLHttpRequest();
			window.content.document.MadinStandardForumXMLHttpRequestArray[indexNummer].open('GET', Target, true);
			window.content.document.MadinStandardForumXMLHttpRequestArray[indexNummer].responseType = "document";
			window.content.document.MadinStandardForumXMLHttpRequestArray[indexNummer].onload = derStandardATKommentarSortierungGreaseM.MadinStandardForumAsynchXMLHTTPRequestsprogress;	
			window.content.document.MadinStandardForumXMLHttpRequestArray[indexNummer].send(); 
	}
},

 


 
  
MadinStandardForumNichtFunktioniert : function () {//sicherheitsbedingung wenn etwas nicht funktionieren sollte (zb. keine antwort auf httprequest)
	
	
	var StringEins = "";
	var fehler = false;
	
	for (var i = 1; i <=window.content.document.MadinStandardForumZaehlerZiel; i++){
		StringEins = StringEins + "\n" + i + ": " + window.content.document.MadinStandardForumXMLHttpRequestArray[i].readyState;
		if ( window.content.document.MadinStandardForumXMLHttpRequestArray[i].readyState != 4){
			window.content.document.getElementById("MadinRateButton").textContent = "Versuche erneut: " + window.content.document.MadinStandardForumZaehler+ "/" +window.content.document.MadinStandardForumZaehlerZiel;
			fehler = true;
			StringEins = StringEins + " fehler";
			derStandardATKommentarSortierungGreaseM.MadinStandardForumSendRequest(i);
		}
	}
	if (fehler == true){
		//alert(StringEins);//debug
	} else{
		//alert(StringEins);//debug
	}
	
},

 
  
  
MadinStandardForum1AlsArrayEinlesen : function ()	{//Extracting data from Request response texts

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
 
	for (var i = 1; i < window.content.document.MadinStandardForumXMLHttpRequestArray.length ; i++){
		var BeitragsArray = window.content.document.MadinStandardForumXMLHttpRequestArray[i].responseXML.getElementsByClassName('up');
		var AnzahlBeitraegeProSeite = BeitragsArray.length;
		 
		for (var n = 0; n < AnzahlBeitraegeProSeite ; n++){ 
			 //wenn neuer thread
			if (BeitragsArray[n].style.paddingLeft == "7px"){
				//alert ("Threadbeginn");
				ThreadArrayLaufer++;
				ThreadArray[ThreadArrayLaufer] = new Array();
				ThreadArray[ThreadArrayLaufer][0] = new Array();
				ThreadArray[ThreadArrayLaufer][0][0] = 0;//Max Bewertung auf 0;
				ThreadArray[ThreadArrayLaufer][0][1] = 0;//Der Am Besten Bewertete auf 0
				Beitragslaufer = 0;
			}

			Beitragslaufer++;
			GesamtbeitragsAnzahl++;
			ThreadArray[ThreadArrayLaufer][Beitragslaufer]= new Array(3);
			ThreadArray[ThreadArrayLaufer][Beitragslaufer][2] = BeitragsArray[n];
			ThreadArray[ThreadArrayLaufer][Beitragslaufer][0] = parseInt(ThreadArray[ThreadArrayLaufer][Beitragslaufer][2].getElementsByClassName("l counter p")[0].textContent);	
			ThreadArray[ThreadArrayLaufer][Beitragslaufer][1] = parseInt(ThreadArray[ThreadArrayLaufer][Beitragslaufer][2].getElementsByClassName("l counter n")[0].textContent);	
				
			if (ThreadArray[ThreadArrayLaufer][Beitragslaufer][0] > ThreadArray[ThreadArrayLaufer][0][0]){//Wenn bewertung von Beitrag besser als beste bewertung dann eintragen
				ThreadArray[ThreadArrayLaufer][0][0] = ThreadArray[ThreadArrayLaufer][Beitragslaufer][0];//Beste Bewertung
				ThreadArray[ThreadArrayLaufer][0][1] = [Beitragslaufer];//Beitrag mit Bester bewertung
			}
		
		}
	}
 
 
	window.content.document.ThreadArray1 = ThreadArray;
	window.content.document.ThreadGesamtAnzahl = ThreadArray.length;
	window.content.document.BeitraegeGesamtAnzahl = GesamtbeitragsAnzahl;
	 
	 //alert("beitrag 1 max wert:" + ThreadArray[1][0][0]);
	 
	setTimeout(function(){derStandardATKommentarSortierungGreaseM.MadinStandardForumSortierungVariante1()}, 100);
	 
 

	
},


MadinStandardForumSortierungVariante1 : function (){
	var ThreadArray =  window.content.document.ThreadArray1;
	 ThreadArray.sort(derStandardATKommentarSortierungGreaseM.sortMultiDimensional);//Array nach bewertungen sortieren

	setTimeout(function(){derStandardATKommentarSortierungGreaseM.MadinStandardForumSortierungSeiteFuersEinfuegenVorbereiten()}, 100);
	content.document.getElementById("MadinRateButton").textContent = "Sortierung Fertig";
},


MadinStandardForumSortierungSeiteFuersEinfuegenVorbereiten : function (){//Bereitet alles aufs Einfügen vor
	//Container Erstellen
	var ForumKomplettContainer = window.content.document.createElement("div");
	ForumKomplettContainer.id = "ForumKomplettContainer";


	//Element nach dem letzen Beitrag herausfinden
	var ElementNachDemLetzenUp = window.content.document.getElementsByClassName("up")[content.document.getElementsByClassName("up").length-1].nextSibling;
	 
	 //alle Beiträge der aktuellen Seite löschen
	for(var k = window.content.document.getElementsByClassName("up").length-1; k >= 0; k--){
		window.content.document.getElementsByClassName("up")[k].parentNode.removeChild(window.content.document.getElementsByClassName("up")[k]);
	}
	
	document.getElementById("communityCanvas").insertBefore(ForumKomplettContainer,ElementNachDemLetzenUp );
	
	//Navigationsleisten entfernen
	for(var k = window.content.document.getElementsByClassName("paging").length-1; k >= 0; k--){
		window.content.document.getElementsByClassName("paging")[k].parentNode.removeChild(window.content.document.getElementsByClassName("paging")[k]);
	}
	for(var k = window.content.document.getElementsByClassName("pagingDirect").length-1; k >=0; k--){
		window.content.document.getElementsByClassName("pagingDirect")[k].parentNode.removeChild(window.content.document.getElementsByClassName("pagingDirect")[k]);
	}
	
	/*2. infoboxen eintragen*/
	for(var k = 0; k < window.content.document.getElementsByClassName("info").length; k++){
		window.content.document.getElementsByClassName("info")[k].textContent = window.content.document.BeitraegeGesamtAnzahl 
																		+' Beitr\u00e4ge in ' 
																		+ window.content.document.ThreadGesamtAnzahl + ' Threads';
	}
	 
	setTimeout(function(){derStandardATKommentarSortierungGreaseM.MadinStandardForumSortierungEinfuegenSequentiell(1)}, 50);
	
},





MadinStandardForumSortierungEinfuegenSequentiell : function (nummer){//Fügt die Elemente ein. Beginnend mit dem Thread mit der besten Bewertung
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
		BewertungsanzeigeLinie.style.width = "140%";
		BewertungsanzeigeLinie.style.marginLeft = "-40%";
		
		
		var BewertungsanzeigeUmbruch = window.content.document.createElement("div");
		BewertungsanzeigeUmbruch.className  = "Bewertungsanzeige";
		BewertungsanzeigeUmbruch.textContent = 'Beste Bewertung im Thread: ' +  parseInt(ThreadArray[i][0][0]) +  " Antworten: " + (ThreadArray[i].length-2);
		
		ForumKomplettContainer.appendChild(BewertungsanzeigeLinie);
		ForumKomplettContainer.appendChild(BewertungsanzeigeUmbruch);
		
		var BeitragsAnzahl = ThreadArray[i].length;
		
		
		for (var n = 1; n < BeitragsAnzahl; n++){
			BeitragsDurchlaufAnzahl++;
			
			
			ForumKomplettContainer.appendChild(ThreadArray[i][n][2]);
			derStandardATKommentarSortierungGreaseM.MadinStandardForumFormatiereEinzelnesElement(ForumKomplettContainer.lastChild);//Formatiert letztes Element
			
			//Trollpost:
			if (ThreadArray[i][n][1] >15 &&  ThreadArray[i][n][1] > ThreadArray[i][n][0]){//wenn mind X negative bewertungen und Mehr negative als Positive
			
				var Trollfaktor1 = 1-ThreadArray[i][n][0]/ThreadArray[i][n][1];
				
				var Trollfaktor2 = (ThreadArray[i][n][0]*ThreadArray[i][n][0])/(ThreadArray[i][n][1]*ThreadArray[i][n][1]);
				Trollfaktor2 = 1-((Trollfaktor2)*5);
				
				if (Trollfaktor1 >0.79){
					ForumKomplettContainer.lastChild.getElementsByClassName("thread")[0].title = "Troll-Wahrscheinlichkeit: " + parseInt(Trollfaktor2*100) + "%";
				}
			}
			
			
			if (ThreadArray[i][0][1] == n && n > 1) {//v07: Wenn bester Beitrag im Thread und nicht der 1. Beitrag dann Rahmen veraendern
				ForumKomplettContainer.lastChild.getElementsByClassName("thread")[0].style.border = "dashed 1px";
			}
			
		}
		
		if (BeitragsDurchlaufAnzahl >= window.content.document.AnzahlEinzufuegenderBeitraegeProDurchlauf){//wenn max Anzahl an Beiträgen/durchlauf bereits eingefügt worden ist dann abbrechen
			break;
		}		
		
	}

	nummer = nummer+1;

	window.content.document.ThreadsEingefuegtAnzahl = i+1;
	


	if (window.content.document.ThreadsEingefuegtAnzahl < window.content.document.ThreadGesamtAnzahl-1){
		content.document.getElementById("MadinRateButton").textContent = "Adde Thread: " + window.content.document.ThreadsEingefuegtAnzahl +"/" + window.content.document.ThreadGesamtAnzahl;
		setTimeout(function(){derStandardATKommentarSortierungGreaseM.MadinStandardForumSortierungEinfuegenSequentiell(nummer)}, 50);
	}else{
		content.document.getElementById("MadinRateButton").style.visibility = "hidden";
	}

},


MadinStandardForumFormatiereEinzelnesElement : function (uebergebenesElement){
	

	//Balken Visualisieren
	
		uebergebenesElement.getElementsByClassName("wrapper")[0].style.border = "solid 1px";

		var positiv = parseInt(uebergebenesElement.getElementsByClassName("counter p")[0].textContent);
		var negativ = parseInt(uebergebenesElement.getElementsByClassName("counter n")[0].textContent);
		var maxwert = positiv;
		/*max wert errechnen:*/
		if (positiv < negativ){
			maxwert = negativ;
		}

		if (maxwert > 10){
			maxwert = 35 / maxwert;
		}else{
			maxwert = 3.3;
		}

		uebergebenesElement.getElementsByClassName("p")[1].style.width =  (~~(positiv*maxwert))+"px";
		
		uebergebenesElement.getElementsByClassName("n")[2].style.width =  (~~(negativ*maxwert))+"px";
	

	//Rahmen um Balken
		uebergebenesElement.getElementsByClassName("wrapper")[0].style.border = "solid 1px";
	

			
			
		/*Ratebuttons anders anordnen*/
		try{
			uebergebenesElement.getElementsByClassName("row1")[0].insertBefore(
				uebergebenesElement.getElementsByClassName("row1")[0].getElementsByClassName("r rating")[0],
				uebergebenesElement.getElementsByClassName("row1")[0].getElementsByClassName("std-button rate n")[0].parentNode
			);
			uebergebenesElement.getElementsByClassName("row1")[0].getElementsByClassName("r rating")[0].style.margin = "2px 0 0 0";
		}
		catch(e){
				
		}
							
		


},


MadinStandardForumGesamteSeiteAngepasstDarstellen : function (){

	var AnzahlPosts = window.content.document.getElementsByClassName("up").length;
	

	//Balken Visualisieren
	for (var i = 0; i< AnzahlPosts; i++){
		content.document.getElementsByClassName("wrapper")[i].style.border = "solid 1px";

		var positiv = parseInt(window.content.document.getElementsByClassName("thread")[i].getElementsByClassName("counter p")[0].textContent);
		var negativ = parseInt(window.content.document.getElementsByClassName("thread")[i].getElementsByClassName("counter n")[0].textContent);
		var maxwert = positiv;
		/*max wert errechnen:*/
		if (positiv < negativ){
			maxwert = negativ;
		}

		if (maxwert > 10){
			maxwert = 35 / maxwert;
		}else{
			maxwert = 3.3;
		}

		content.document.getElementsByClassName("thread")[i].getElementsByClassName("p")[1].style.width =  (~~(positiv*maxwert))+"px";
		
		content.document.getElementsByClassName("thread")[i].getElementsByClassName("n")[2].style.width =  (~~(negativ*maxwert))+"px";
	}

	//Rahmen um Balken
	for (var i = 0; i< window.content.document.getElementsByClassName("wrapper").length; i++){
		content.document.getElementsByClassName("wrapper")[i].style.border = "solid 1px";
	}


},


MadinSanitize : function (valueToBeSanitized) {
	if (isNan(valueToBeSanitized)){
		
	}else{
		return parseInt(valueToBeSanitized);
	}
},


MadinStandardForumAlleRatebuttonsAnordnen : function (){
		//Ratebuttonsanordnen wenn nicht richtig sortiert. Vielleicht kommt derstandard irgendwann drauf dass man es auch besser machen könnte
			var Bewertungsbalken = content.document.getElementsByClassName("r rating")[0];
			if (Bewertungsbalken != null){//wenn balken vorhanden
				var PositionMinus = Bewertungsbalken.parentNode.getElementsByClassName("std-button rate n")[0].offsetLeft;
					if (PositionMinus > Bewertungsbalken.offsetLeft){//wenn die position vom minus feld größerer ist als die vom bewertungsbalken
						/*Ratebuttons anders anordnen*/
						for (i = 0; i<window.content.document.getElementsByClassName("row1").length; i++){
						
							try{
								content.document.getElementsByClassName("row1")[i].insertBefore(
									content.document.getElementsByClassName("row1")[i].getElementsByClassName("r rating")[0],
									content.document.getElementsByClassName("row1")[i].getElementsByClassName("std-button rate n")[0].parentNode
								);
								content.document.getElementsByClassName("row1")[i].getElementsByClassName("r rating")[0].style.margin = "2px 0 0 0";
							}
							catch(e){
								//alert ("fehler gefunden");
							}
							
							
						}//ende for
					}//ende if
			}//ende if Bewertungsbalken vorhanden
},//Ende MadinStandardRatebuttonsAnordnen()



sortMultiDimensional : function (a,b){
		return ((a[0][0] < b[0][0]) ? 1 : ((a[0][0] > b[0][0]) ? -1 : 0));
}, 

MadinStandardForumToForumButton : function (){//Fügt einen Button Für das Forum ein
		MadinToForumButton = window.content.document.createElement("a");
		MadinToForumButton.id = "MadinToForumButton";
		MadinToForumButton.textContent = "Forum"; 
		MadinToForumButton.style.width = "40px";
		MadinToForumButton.style.height = "10px";
		MadinToForumButton.style.fontSize = "1em";
		MadinToForumButton.style.background = "-moz-linear-gradient(top, #1B7677, #553A26)";
		MadinToForumButton.style.color = "#E7DBBD";
		MadinToForumButton.href = "#forumstart";
				
				if (window.content.document.getElementsByClassName("date").length != 0){//Nur wenn es das Element gibt
					window.content.document.getElementsByClassName("date")[0].parentNode.appendChild(MadinToForumButton);			
				}
				
				
//		alert ("Anzahl xdate : " + window.content.document.getElementsByClassName("datex").length);
		
}



	
 };//ende var derStandardATKommentarSortierungGreaseM = {};
};//ende if ("undefined" == typeof(derStandardATKommentarSortierungGreaseM)) {



derStandardATKommentarSortierungGreaseM.MadinStandardForumButtonEinfuegen ();
