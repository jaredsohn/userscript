// 
// version 0.1 for greasemonkey
// 2013-Jan-26
// Copyright (c) 2013, madin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Do not USE this code for Google Chrome. Support Firefox.
// The Software is provided "AS IS" and "WITH ALL FAULTS," without warranty of any kind, including without limitation the warranties of merchantability, fitness for a particular purpose and non-infringement. The Licensor makes no warranty that the Software is free of defects or is suitable for any particular purpose. In no event shall the Licensor be responsible for loss or damages arising from the installation or use of the Software, including but not limited to any indirect, punitive, special, incidental or consequential damages of any character including, without limitation, damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses. The entire risk as to the quality and performance of the Software is borne by you. Should the Software prove defective, you and not the Licensor assume the entire cost of any service and repair. 
// Solange auf krone.at nichts verändert wird, sollte dieses Script funktionieren.
// --------------------------------------------------------------------
//
//Sie lesen gerne die Postings auf krone.at?
//Haben aber keine Lust alle Kommentare zu lesen, sondern sind nur an den am besten bewerteten Postings interessiert?
//
//diekroneKommentarSortierung sortiert die Kommentare eines Artikels nach der besten Bewertung und stellt sie auf einer Seite dar.
//Das Einfügen der sortierten Kommentare dauert leider einige Sekunden. (530 Kommentare ca. 15 Sekunden)
//
//diekroneKommentarSortierung sammelt keine Daten.
//
// Verbesserungsvorschläge sind willkommen.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Kommentarsortierung für krone.at
// @description   Sortiert die Kommentare auf krone.at nach der besten Bewertung .
// @include       http://krone.at/*
// @include       http://www.krone.at/*
// @version		  0.1
// @grant		  none
// ==/UserScript==

/*
var GPL_Violation = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		if (GPL_Violation){
			alert("I warned you! Do not use this script for Google Chrome! Use Firefox instead! ");
		}
*/




if ("undefined" == typeof(dieKroneKommentarSortierungGreaseM)) {
  var dieKroneKommentarSortierungGreaseM = {
  
	MadinKroneForumInit : function(){
	
	//alert ("init");
		window.content.document.MadinKroneForumXMLHttpRequestArray = new Array();// Array für XmLHttpRequests
		window.content.document.MadinKroneForumSubSeitenUrlArray = new Array();//Array für die Urls der Subseiten
		window.content.document.ThreadGesamtAnzahl = 0;
		window.content.document.MadinKroneForumSeitenAnzahl = 0;//Anzahl der Seiten die Requestet werden müssen
		window.content.document.MadinKroneForumSeitenEmpfangenZaehler = 0;//Anzahl der Empfangenen Seiten
		window.content.document.NewsNumber = 0;//Id des Krone Artikels
		window.content.document.ThreadGesamtAnzahl = 0;
		window.content.document.ThreadsEingefuegtAnzahl = 0;
		window.content.document.BeitraegeGesamtAnzahl = 0;
		window.content.document.AnzahlEinzufuegenderBeitraegeProDurchlauf = 50;
		
		/*Varialben zum warten bis die Seite das Forum geladen hat*/
		window.content.document.AnzahlVersucheForumAuslesen=0;
		window.content.document.AuslesenErfolgreich=false;
		window.content.document.BeitragHatForum=false;
		
		dieKroneKommentarSortierungGreaseM.madinKroneForumCheckForPostings();
		
	},
  
	MadinKroneForumButtonEinfuegen : function(){
	 
		if (window.content.document.getElementById("MadinRateButton") == null){//wenn noch kein button eingefügt
 
		//wenn auf krone.at
		if (window.content.location.href.indexOf("http://www.krone.at/") == 0 ||
			window.content.location.href.indexOf("http://krone.at/") == 0
		) {//nur wenn auf krone.at
		//wenn forum existiert	
		
			
				//Wenn forum Existiert dann Button einfügen
				MadinRateButton = window.content.document.createElement("div");
				MadinRateButton.id = "MadinRateButton";
				MadinRateButton.textContent = "Kommentare sortieren"; 
				MadinRateButton.style.width = "140px";
				MadinRateButton.style.height = "20px";
				MadinRateButton.style.paddingTop = "5px";
				MadinRateButton.style.marginRight = "50px";
				MadinRateButton.style.fontSize = "0.8em";
				MadinRateButton.style.marginBottom = "20px";
				MadinRateButton.style.paddingLeft = "10px";
				MadinRateButton.style.background = "-moz-linear-gradient(top, #1B7677, #553A26)";
				MadinRateButton.style.cssFloat = "right";
				MadinRateButton.addEventListener("click", dieKroneKommentarSortierungGreaseM.MadinKroneForumAsynchXMLHTTPRequestsSenden, false);
				window.content.document.getElementById("kmcom_char").parentNode.insertBefore(MadinRateButton,window.content.document.getElementById("kmcom_char").nextSibling);					
			
			
		}//ende of auf krone
	
	}//wenn noch kein button eingefügt
},//Ende funktion ButtonErstellen


madinKroneForumAnalyzeSite : function ()	{//Einmaliger Async XMLHttpRequest zur Ermittlung der max Seite
	
	var urlstring = window.content.location.href;
	var beginn = urlstring.lastIndexOf("-");
	window.content.document.NewsNumber = parseInt(urlstring.substring(beginn+1, urlstring.length));
	var StringToXML = "/krone/kmcom/set_cache__1/sendung_id__30/packagename__HXCMS/action__cmVhZA==/object_id__" + window.content.document.NewsNumber + "/source_id__" + window.content.document.NewsNumber +"/online__true/kmcom_page__0/kmcom_xml.html";
	//send Analyzing HttpRequest
		window.content.document.MadinKroneForumAnalyzeRequest = new XMLHttpRequest();
		window.content.document.MadinKroneForumAnalyzeRequest.open('GET', StringToXML, true);
		window.content.document.MadinKroneForumAnalyzeRequest.responseType = "text";//mit documet funktioniert es nicht
		window.content.document.MadinKroneForumAnalyzeRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');//zusatz von krone
		window.content.document.MadinKroneForumAnalyzeRequest.onload = dieKroneKommentarSortierungGreaseM.madinKroneForumAnalyzeXMLString;	
		window.content.document.MadinKroneForumAnalyzeRequest.send(); 
		

},

madinKroneForumAnalyzeXMLString : function ()	{//Berechnung der Max Seite
	

	var RespText = window.content.document.MadinKroneForumAnalyzeRequest.responseText;
	//Extrahieren
	var Beginn = RespText.indexOf("<max_page>")+10;
	var Ende = RespText.indexOf("</max_page>");
	var Seitenanzahl = parseInt(RespText.substring(Beginn, Ende));
	
	window.content.document.MadinKroneForumSeitenAnzahl = Seitenanzahl;
	setTimeout(function(){dieKroneKommentarSortierungGreaseM.madinKroneForumErstelleRequestArray()}, 10);
	
},


madinKroneForumErstelleRequestArray : function ()	{//Errechnung der Pfade für die Requests
	for (var i = 0; i <window.content.document.MadinKroneForumSeitenAnzahl; i++){
		window.content.document.MadinKroneForumSubSeitenUrlArray[i] = "http://www.krone.at/krone/kmcom/set_cache__1/sendung_id__30/packagename__HXCMS/action__cmVhZA==/object_id__" + window.content.document.NewsNumber + "/source_id__" + window.content.document.NewsNumber +"/online__true/kmcom_page__" + (i+1) + "/kmcom_xml.html";
	}
	
	setTimeout(function(){dieKroneKommentarSortierungGreaseM.MadinKroneForumButtonEinfuegen()}, 10);
},








madinKroneForumCheckForPostings : function ()	{//checks if comments are there.
	window.content.document.AnzahlVersucheForumAuslesen++;
	if (content.document.getElementById("kmcom_comments_header")!=null){
		var KommentarString = content.document.getElementById("kmcom_comments_header").innerHTML;
		//alert(window.content.document.AnzahlVersucheForumAuslesen+ "X" + KommentarString);

		if (KommentarString.length >5){
			window.content.document.AuslesenErfolgreich = true;
			if (KommentarString.charAt(0) == 0){//wenn Kommentar mit 0 beginnt dann gibt es kein Forum
			//	alert ("keine kommentare");
			}else{
				window.content.document.BeitragHatForum=true;
				setTimeout(function(){dieKroneKommentarSortierungGreaseM.madinKroneForumAnalyzeSite()}, 10);
			}
			
		}
	}
	if (window.content.document.AuslesenErfolgreich == false){
		setTimeout(function(){dieKroneKommentarSortierungGreaseM.madinKroneForumCheckForPostings()}, 60);
	}

},
	





MadinKroneForumAsynchXMLHTTPRequestsprogress : function ()	{//counting accessful requests starts sortation if all requests are done
	window.content.document.MadinKroneForumSeitenEmpfangenZaehler++;
	window.content.document.getElementById("MadinRateButton").textContent = "Empfange Seite " + window.content.document.MadinKroneForumSeitenEmpfangenZaehler+ "/" +window.content.document.MadinKroneForumSeitenAnzahl;
	
	//wen alle empfangen
	if (window.content.document.MadinKroneForumSeitenAnzahl == window.content.document.MadinKroneForumSeitenEmpfangenZaehler){//wenn fertig
		window.content.document.getElementById("MadinRateButton").textContent = "Sortiere, bitte warten...";
		setTimeout(function(){dieKroneKommentarSortierungGreaseM.MadinKroneForum1AlsArrayEinlesen()}, 10);
	}
	
},



	
MadinKroneForumAsynchXMLHTTPRequestsSenden : function ()	{//controls the sending of asynchronous XMLHttpRequests

//Disable Button
MadinRateButton.removeEventListener("click", dieKroneKommentarSortierungGreaseM.MadinKroneForumAsynchXMLHTTPRequestsSenden, false);

	window.content.document.getElementById("MadinRateButton").textContent = "Bitte warten.."; 
	var maxSeite = window.content.document.MadinKroneForumSeitenAnzahl;//Max Anzahl der Seiten die Emfpangen werden müssen
	for (var i = 0; i <maxSeite; i++){
		dieKroneKommentarSortierungGreaseM.MadinKroneForumSendRequest(i);
	}
	content.document.getElementById("MadinRateButton").textContent = "Gesendet";
	setTimeout(function(){dieKroneKommentarSortierungGreaseM.MadinKroneForumNichtFunktioniert()}, maxSeite*1200);
},









MadinKroneForumSendRequest : function (indexNummer) {//sends the XMLHttpRequests
	var Target = window.content.document.MadinKroneForumSubSeitenUrlArray[indexNummer];
	
	if (Target.indexOf("http://krone.at") == 0 ||
		Target.indexOf("http://www.krone.at") ==0) {//only works on specified Sites
		//alert (Target);
			window.content.document.MadinKroneForumXMLHttpRequestArray[indexNummer] = new XMLHttpRequest();
			window.content.document.MadinKroneForumXMLHttpRequestArray[indexNummer].open('GET', Target, true);
	//Testweise aus		window.content.document.MadinKroneForumXMLHttpRequestArray[indexNummer].responseType = "text";
		    window.content.document.MadinKroneForumXMLHttpRequestArray[indexNummer].setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			window.content.document.MadinKroneForumXMLHttpRequestArray[indexNummer].onload = dieKroneKommentarSortierungGreaseM.MadinKroneForumAsynchXMLHTTPRequestsprogress;	
			window.content.document.MadinKroneForumXMLHttpRequestArray[indexNummer].send(); 
	}
},

 


 
  


 
  
  
MadinKroneForum1AlsArrayEinlesen : function ()	{//Extracting data from Request response texts



	/*
	0. 
	1. Sortierarray bekommt neues Element "Pool" und SortPool
	2. Alle KommetarElemente bis auf 1. werden in "Pool" verschoben. 1. Kommentar kommt in Elment "SortPool"
	3. Alle Elemente nach Bewertunge in Sortpool einfügen
	3. Sortierte elemente aus SortPool in Root verschieben
	4. Elemente aus zusätzlichen HttpRequests nach Bewertung in Root einfügen
	5. Nutzung der Krone Funktion (darum dauert das einfügen auch so lange)
	
	*/
	var eigeneXMLHttpRequest = window.content.document.MadinKroneForumXMLHttpRequestArray[0];
	
	var eigeneXMLHttpRequestXML = eigeneXMLHttpRequest.responseXML;
	
	var Pool = eigeneXMLHttpRequestXML.createElement("Pool");
	eigeneXMLHttpRequestXML.getElementsByTagName("kmcom")[0].appendChild(Pool);
	
	var SortPool = eigeneXMLHttpRequestXML.createElement("SortPool");
	eigeneXMLHttpRequestXML.getElementsByTagName("kmcom")[0].appendChild(SortPool);
	eigeneXMLHttpRequestXML.getElementsByTagName("SortPool")[0].appendChild(eigeneXMLHttpRequestXML.getElementsByTagName("kommentar")[0]);
	
	for (var i = eigeneXMLHttpRequestXML.getElementsByTagName("kommentar").length-2; i>=0; i--){
		eigeneXMLHttpRequestXML.getElementsByTagName("Pool")[0].appendChild(eigeneXMLHttpRequestXML.getElementsByTagName("kommentar")[i]);
	}
	
	
	for (var i = eigeneXMLHttpRequestXML.getElementsByTagName("Pool")[0].childNodes.length-1; i>=0; i--){//Alle Elemente von Pool
		var EinfuegeElement = eigeneXMLHttpRequestXML.getElementsByTagName("Pool")[0].childNodes[i];
		var Bewertung = eigeneXMLHttpRequestXML.getElementsByTagName("Pool")[0].childNodes[i].getElementsByTagName("diggs")[0].textContent;
		var eingefuegt = false;
			for (var n = 0;  n <= eigeneXMLHttpRequestXML.getElementsByTagName("SortPool")[0].childNodes.length-1; n++){//Alle Elemente von SortPool
				if (parseInt(Bewertung) >=parseInt(eigeneXMLHttpRequestXML.getElementsByTagName("SortPool")[0].childNodes[n].getElementsByTagName("diggs")[0].textContent)){//
					eigeneXMLHttpRequestXML.getElementsByTagName("SortPool")[0].insertBefore(
					EinfuegeElement, 
					eigeneXMLHttpRequestXML.getElementsByTagName("SortPool")[0].childNodes[n]);
					eingefuegt = true;
					break;
				}
			}
			if (eingefuegt == false){//wenn nicht eingefügt wurde
				eigeneXMLHttpRequestXML.getElementsByTagName("SortPool")[0].appendChild(EinfuegeElement);
			}
	}
	

	
	//Zurückkopieren
	for (var n = eigeneXMLHttpRequestXML.getElementsByTagName("SortPool")[0].childNodes.length-1;  n >=0 ; n--){//Alle Kommentar Elemente von SortPool
		eigeneXMLHttpRequestXML.
		getElementsByTagName("kmcom")[0].
		appendChild(eigeneXMLHttpRequestXML.
		getElementsByTagName("SortPool")[0].
		firstChild);
	}
	
	
		

	for (var i = 1; i < window.content.document.MadinKroneForumXMLHttpRequestArray.length ; i++){//Durchlauf alle weiteren Requests/Seiten beginnend mit 1
		var zusatzxml = window.content.document.MadinKroneForumXMLHttpRequestArray[i].responseXML;
		var BewertungsarrayNeueElemente = zusatzxml.getElementsByTagName("diggs");//Bewertungen des neuen Requests Speichern
		for (var n = zusatzxml.getElementsByTagName("kommentar").length-1; n>=0; n--){//Durchlauf alle XML Knoten des neuen Requests
			eingefuegt = false;
			for (var k = 0 ; k< eigeneXMLHttpRequestXML.getElementsByTagName("kommentar").length; k++){//Durchlauf alle XML Knoten des Documentes in das eingefügt wird
				if (parseInt(BewertungsarrayNeueElemente[n].textContent)>= parseInt(eigeneXMLHttpRequestXML.getElementsByTagName("kommentar")[k].getElementsByTagName("diggs")[0].textContent)){//wenn neues Element größer oder gleich Hauptelement, dann davor einfügen
					eigeneXMLHttpRequestXML.getElementsByTagName("kmcom")[0].insertBefore(
						BewertungsarrayNeueElemente[n].parentNode,
						eigeneXMLHttpRequestXML.getElementsByTagName("kommentar")[k]
					);
					eingefuegt = true;
					break;
				}
			}
			if (eingefuegt == false){//wenn nicht eingefügt wurde
				eigeneXMLHttpRequestXML.getElementsByTagName("kmcom")[0].appendChild(BewertungsarrayNeueElemente[n].parentNode);
			}
		}
	}


	window.content.document.getElementById("MadinRateButton").textContent = "Bitte Warten!!"; 
	

   setTimeout(function(){dieKroneKommentarSortierungGreaseM.MadinKroneForumBeitraegeEinfuegen()}, 10);

},




MadinKroneForumBeitraegeEinfuegen : function () {
//alert ("beitraege einfuegenxx");
	var eigeneXMLHttpRequest = window.content.document.MadinKroneForumXMLHttpRequestArray[0];

	//Krone Funktion aufrufen info
		
//kmcom_to: wenn das nicht definiert ist, dann werden die werte aus dem XMl file genommen
 
 location.assign( "javascript:kmcom_read(window.content.document.MadinKroneForumXMLHttpRequestArray[0],'kmcom_comments_teil',  'kmcom_read_id');void(0)" );
 
 
 if (window.content.document.getElementById("kmcom_pages_footer") != null){
	window.content.document.getElementById("kmcom_pages_footer").style.visibility = "hidden";
 }
 if (window.content.document.getElementById("kmcom_pages_header") != null){
	window.content.document.getElementById("kmcom_pages_header").style.visibility = "hidden";
 }
 setTimeout(function(){dieKroneKommentarSortierungGreaseM.MadinKroneForumButtonAusblenden()}, 10);

},

MadinKroneForumButtonAusblenden : function(){
	window.content.document.getElementById("MadinRateButton").style.visibility = "hidden";
},


MadinKroneForumNichtFunktioniert : function () {//sicherheitsbedingung wenn etwas nicht funktionieren sollte (zb. keine antwort auf httprequest)
	var StringEins = "";
	var fehler = false;
	
	for (var i = 1; i <window.content.document.MadinKroneForumSeitenAnzahl; i++){
		StringEins = StringEins + "\n" + i + ": " + window.content.document.MadinKroneForumXMLHttpRequestArray[i].readyState;
		if ( window.content.document.MadinKroneForumXMLHttpRequestArray[i].readyState != 4){
			window.content.document.getElementById("MadinRateButton").textContent = "Versuche erneut: " + window.content.document.MadinKroneForumSeitenEmpfangenZaehler+ "/" +window.content.document.MadinKroneForumSeitenAnzahl;
			fehler = true;
			StringEins = StringEins + " fehler";
			dieKroneKommentarSortierungGreaseM.MadinKroneForumSendRequest(i);
		}
	}
	if (fehler == true){
		//alert(StringEins);//debug
	} else{
		//alert(StringEins);//debug
	}
	
},



MadinKroneForumSortierungVariante1 : function (){
	var ThreadArray =  window.content.document.ThreadArray1;
	 ThreadArray.sort(dieKroneKommentarSortierungGreaseM.sortMultiDimensional);//Array nach bewertungen sortieren

	setTimeout(function(){dieKroneKommentarSortierungGreaseM.MadinKroneForumSortierungSeiteFuersEinfuegenVorbereiten()}, 100);
	content.document.getElementById("MadinRateButton").textContent = "Sortierung Fertig";
}

	
 };//ende var dieKroneKommentarSortierungGreaseM = {};
};//ende if ("undefined" == typeof(dieKroneKommentarSortierungGreaseM)) {



dieKroneKommentarSortierungGreaseM.MadinKroneForumInit ();
