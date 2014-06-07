// ebaysucheohneweitereoptionen
// version 0.1
// 2013-Jan-30
// Copyright (c) 2013, madin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Do not USE this code for Google Chrome.
// The Software is provided "AS IS" and "WITH ALL FAULTS," without warranty of any kind, including without limitation the warranties of merchantability, fitness for a particular purpose and non-infringement. The Licensor makes no warranty that the Software is free of defects or is suitable for any particular purpose. In no event shall the Licensor be responsible for loss or damages arising from the installation or use of the Software, including but not limited to any indirect, punitive, special, incidental or consequential damages of any character including, without limitation, damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses. The entire risk as to the quality and performance of the Software is borne by you. Should the Software prove defective, you and not the Licensor assume the entire cost of any service and repair. 
// Solange auf ebay nichts verändert wird, sollte dieses Script funktionieren.
// --------------------------------------------------------------------
//
// Auf der Suche nach dem günstigsten Preis bei Ebay findet man immer wieder Einträge mit dem Zusatz:
//"Weitere Optionen"
//Der angegebene Preis ist aber meist ein Zubehörteil für den Artikel nach dem man gesucht hat. Um den günstigsten Preis des Artikels selbst herauszufinden, muss man sich durch all die Ergebnisse mit dem Zusatz "weitere Optionen" druchklicken.
//Mit diesem Script werden alle Einträge mit dem Zusatz "Weitere Optionen" ausgeblendet.
//
//Beispiel: Suche nach "5m 5050 rgb" Link 
//Einmal ohne und einmal mit Addon ausprobieren.
//http://www.ebay.de/sch/i.html?_nkw=5m+5050+rgb&_sacat=0&_odkw=5m+5050+rgb+waterproof&_stpos=12345&LH_BIN=1&_sop=15&_fcid=77&gbr=1&_localstpos=12345&_osacat=0&_from=R40&LH_PrefLoc=2&_clu=2
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ebay weitere optionen Ausblenden
// @description   Blendet die Suchergebnisse mit dem Zusatz "Weitere Optionen" aus den Suchergebnissen von Ebay aus bzw. ein.
// @include       http://ebay.at/*
// @include       http://ebay.de/*
// @include       http://ebay.com/*
// @include       http://www.ebay.at/*
// @include       http://www.ebay.de/*
// @include       http://www.ebay.com/*
// @version		  0.3
// @grant		  none
// ==/UserScript==




/*Built by madin

Disclaimer

Für dieses AddonDie Software wird vertrieben wie sie ist und ohne Garantien irgendwelcher Art.
This Addon is free software. It comes without any warranty.


*/


if ("undefined" == typeof(ebOhneWeitereOptionenGM)) {
  var ebOhneWeitereOptionenGM = {
  
	OptionenAusblenden : function(){
	
			/*
			1. Suche nach "weitere Optionen" in allen <a> tags
			2. wenn gefunden dann suche nach table
			3. wenn gefunden dann ausblenden/*/
			var AnzahlAusgeblendeterElemente = 0;
		var MaxSchleifenanzahl = 9; //maximale anzahl an Schleifen in denen nach der klasse des haupteintrages mit "weitere optionen" gesucht wird.
		var AnzahlAs=window.content.document.getElementsByTagName("a").length;
		var alleAs = window.content.document.getElementsByTagName("a");
		for (var i = 0; i <alleAs.length; i++){//alle A tags durchsuchen
			var AktBeitrag = alleAs[i];
			if  (AktBeitrag.textContent.indexOf("Weitere Optionen") != -1 || AktBeitrag.textContent.indexOf("More Options") != -1){//wenn Tag "weitere Optionen"  oder more options beinhaltet
				for (var n = 0; n <MaxSchleifenanzahl; n++){
					//alert (AktBeitrag.tagName);
					if (AktBeitrag.tagName != "TABLE"){
						AktBeitrag = AktBeitrag.parentNode;
					}else{
						//alert ("Table erreicht");
						//AktBeitrag.style.backgroundColor = "yellow";
						AktBeitrag.style.backgroundColor = "#d0d0d0";
						AktBeitrag.style.display="none"; 
						n = MaxSchleifenanzahl;
						AnzahlAusgeblendeterElemente++;
					}
				}
			
			
			}
		}
		
		window.content.document.AnzahlElementeMitWeitereOptionen = AnzahlAusgeblendeterElemente;
		if (AnzahlAusgeblendeterElemente >0){
			if (window.content.document.getElementById("EinblendenKnopfButtonID") == null){
					ebOhneWeitereOptionenGM.OptionenEinblendenKnopfAnzeigen ();
			}
			ebOhneWeitereOptionenGM.OptionenEinblendenKnopfOptionenEinblenden();
		}	
		
	
		
  
	}, //ende Optionen Ausblenden
  

  OptionenEinblendenKnopfAnzeigen : function(){
				EinblendenKnopfButton = window.content.document.createElement("div");
				EinblendenKnopfButton.id = "EinblendenKnopfButtonID";
				if (window.content.document.URL.indexOf("ebay.com") !=-1){
					EinblendenKnopfButton.textContent = "Show " + window.content.document.AnzahlElementeMitWeitereOptionen + " hidden results"; 
					EinblendenKnopfButton.style.width = "150px";
				}else{
					EinblendenKnopfButton.textContent = window.content.document.AnzahlElementeMitWeitereOptionen + " ausgeblendete Elemente anzeigen";
					EinblendenKnopfButton.style.width = "240px";
				}
				EinblendenKnopfButton.style.height = "20px";
				EinblendenKnopfButton.style.fontSize = "1em";
				
				EinblendenKnopfButton.style.background = "#CCCCCC";
				EinblendenKnopfButton.style.borderStyle = "solid"
				EinblendenKnopfButton.style.borderColor = "#666666"
				//EinblendenKnopfButton.style.width = "240px";
				EinblendenKnopfButton.style.paddingTop = "5px";
				
				EinblendenKnopfButton.style.marginBottom = "20px";
				EinblendenKnopfButton.style.paddingLeft = "10px";
				
				content.document.getElementById("TopPanel").appendChild(EinblendenKnopfButton);
  },
  
  OptionenEinblendenKnopfOptionenAusblenden : function(){
  //alert ("button auf ausblenden");
				var EinblendenKnopfButton = window.content.document.getElementById("EinblendenKnopfButtonID");
				if (EinblendenKnopfButton != null){
					if (window.content.document.URL.indexOf("ebay.com") !=-1){
						EinblendenKnopfButton.textContent = "Hide " + window.content.document.AnzahlElementeMitWeitereOptionen + " results"; 
					}else{
						EinblendenKnopfButton.textContent = window.content.document.AnzahlElementeMitWeitereOptionen + " eingeblendete Elemente ausblenden"; 
					}
					EinblendenKnopfButton.removeEventListener("click", ebOhneWeitereOptionenGM.OptionenEinblenden, false);
					EinblendenKnopfButton.addEventListener("click", ebOhneWeitereOptionenGM.OptionenAusblenden, false);
				}
				
  },
  
  OptionenEinblendenKnopfOptionenEinblenden : function(){
  //alert ("button auf einblenden");
  				var EinblendenKnopfButton = window.content.document.getElementById("EinblendenKnopfButtonID");
				if (EinblendenKnopfButton != null){
				if (window.content.document.URL.indexOf("ebay.com") !=-1){
					EinblendenKnopfButton.textContent = "Show " + window.content.document.AnzahlElementeMitWeitereOptionen + " hidden results";
				}else{	
					EinblendenKnopfButton.textContent = window.content.document.AnzahlElementeMitWeitereOptionen + " ausgeblendete Elemente anzeigen";
				}
					EinblendenKnopfButton.removeEventListener("click", ebOhneWeitereOptionenGM.OptionenAusblenden, false);
					EinblendenKnopfButton.addEventListener("click", ebOhneWeitereOptionenGM.OptionenEinblenden, false);
				}
  },
  
  
  
  OptionenEinblenden : function(){
			/*
			1. Suche nach "weitere Optionen" in allen <a> tags
			2. wenn gefunden dann suche nach table
			3. wenn gefunden dann EINblenden/*/
			
		var MaxSchleifenanzahl = 9; //maximale anzahl an Schleifen in denen nach der klasse des haupteintrages mit "weitere optionen" gesucht wird.
		var AnzahlAs=window.content.document.getElementsByTagName("a").length;
		var alleAs = window.content.document.getElementsByTagName("a");
		for (var i = 0; i <alleAs.length; i++){//alle A tags durchsuchen
			var AktBeitrag = alleAs[i];
			if  (AktBeitrag.textContent.indexOf("Weitere Optionen") != -1 || AktBeitrag.textContent.indexOf("More Options") != -1){//wenn Tag "weitere Optionen" beinhaltet
				for (var n = 0; n <MaxSchleifenanzahl; n++){
					//alert (AktBeitrag.tagName);
					if (AktBeitrag.tagName != "TABLE"){
						AktBeitrag = AktBeitrag.parentNode;
					}else{
						//alert ("Table erreicht");
						AktBeitrag.style.backgroundColor = "#d0d0d0";
						AktBeitrag.style.display="block"; 
						n = MaxSchleifenanzahl;
					}
				}
			
			
			}
		}
		
		ebOhneWeitereOptionenGM.OptionenEinblendenKnopfOptionenAusblenden();	
  
	} //ende Optionen Ausblenden
  



	
 };//ende var ebOhneWeitereOptionenGM = {};
};//ende if ("undefined" == typeof(ebOhneWeitereOptionenGM)) {



ebOhneWeitereOptionenGM.OptionenAusblenden ();
