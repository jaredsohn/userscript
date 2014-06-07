// version 02 for greasemonkey Vorlaufige Version
// 2013-APR-24
// Copyright (c) 2013, madin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//


// ==UserScript==
// @name        derstandard.at Zitrone am Mittwoch
// @namespace   derStandardAtZitroneAmMittwoch
// @description Blendet die Zitronenbeiträge am Dienstag aus und zeigt sie mittwochs an.
// @include     http://derstandard.at/
// @include     http://www.derstandard.at/
// @include     http://diestandard.at/
// @include     http://www.diestandard.at/
// @version     2.0
// @grant	 	GM_xmlhttpRequest
// ==/UserScript==




if ("undefined" == typeof(derStandardAtZitroneAmMittwochGreaseM)) {
  var derStandardAtZitroneAmMittwochGreaseM = {
  
	MadinDerStandardAtZitroneAmMittwochStart : function(){
	
	
	/*Errechnung der Verteilung der Zitronen auf Wochentage
	     var linkArray = window.content.document.getElementsByClassName("date context");
		var stringD = "";
		for (i = linkArray.length-1; i>=0; i--){
			stringD = stringD + linkArray[i].textContent + ";";
		}
		alert (stringD);
	
	/* */
	
	
	
	
	var heute = new Date();
	window.content.document.ausblenden = false;
	window.content.document.einblenden = false;
	window.content.document.ForumZitroneAntwortText = "";
	
	
	if (heute.getDay() == 2){//wenn heute dienstag ist, dann wird der neueste Zitronenbeitrag ausgeblendet(Original:2)
		window.content.document.ausblenden = true;
	}else{
		if (heute.getDay() == 3){//wenn heute Mittwoch ist dann wird der Link zum neuesten Zitronenbeitrag eingeblendet (Original:3)
			window.content.document.einblenden = true;
			//alert("heute ist mittwoch");
		}else{//wenn weder Dienstag noch mittwoch dann abbrechen
			//return;
		}
	}//ende else
	
	
	
	//window.content.document.ausblenden = true;//Testzwecke!!
				
			//Request abschicken
			GM_xmlhttpRequest({
			  method: "GET",
			  url: "http://diestandard.at/r1192182008645/Zitronen?_chron=t",
				onload: function(response) {
					window.content.document.ForumZitroneAntwortText = response.responseText;
					setTimeout(function(){derStandardAtZitroneAmMittwochGreaseM.MadinDerStandardAtZitroneAmMittwochLinkExtrahieren()}, 100);
				}
			});
			

},//Ende funktion ButtonErstellen


MadinDerStandardAtZitroneAmMittwochLinkExtrahieren: function ()	{//Extrahiert das Datum und die Link ID
	
	
	var beginn1 = window.content.document.ForumZitroneAntwortText.indexOf("date context");
	var beginn2 = window.content.document.ForumZitroneAntwortText.indexOf("date context", beginn1+10);
	var beginn3 = window.content.document.ForumZitroneAntwortText.indexOf(">", beginn2+1)+1;
	var ende3 = window.content.document.ForumZitroneAntwortText.indexOf("<", beginn2+1);
	var datum = window.content.document.ForumZitroneAntwortText.substring(beginn3, ende3);
	var datumArr = datum.split(".");
	var datumx = new Date(datumArr[2], datumArr[1]-1, datumArr[0]);
	
	var beginnID = window.content.document.ForumZitroneAntwortText.indexOf('href="/',ende3)+7;
	var endeID = window.content.document.ForumZitroneAntwortText.indexOf('/',beginnID);
	var BeitragsID = window.content.document.ForumZitroneAntwortText.substring( beginnID, endeID);
	//alert(BeitragsID);
	
	
//	BeitragsID = "1363706446146";//Zu Testzwecken
	
	
	
	if (window.content.document.ausblenden){//wenn Dienstag ist dann aktuelleste Zitrone ausblenden
		derStandardAtZitroneAmMittwochGreaseM.MadinDerStandardAtZitroneBeitragAusblenden(BeitragsID);
	}
	if(window.content.document.einblenden){//wenn eingeblendet werden soll (weil Mittwoch ist)
		var heute = new Date();
		//Zeit auf 00:00:00 :00
		heute.setHours(0);
		heute.setMinutes(0);
		heute.setSeconds(0);
		heute.setMilliseconds(0);
		//alert(heute.getTime() - datumx.getTime() + "XX" +(3600000*24));
		if ((heute.getTime() - datumx.getTime())< (3600000*24 +1)){//wenn die aktuellste Zitrone vor weniger als 24h veröffentlicht wurde
			//alert("einblenden");
			derStandardAtZitroneAmMittwochGreaseM.MadinDerStandardAtZitroneBeitragEinblenden(BeitragsID);
			
		}
	}	
	
}, // Ende MadinDerStandardAtZitroneAmMittwochLinkExtrahieren: function ()	{//Extrahiert das Datum und die Link ID
	

	MadinDerStandardAtZitroneBeitragAusblenden: function (BeitragsID)	{//Blendet den Beitrag aus
	
		var linkArray = window.content.document.getElementsByTagName("a");
		for (i = linkArray.length-1; i>=0; i--){
			if (linkArray[i].href.indexOf(BeitragsID) != -1){
				linkArray[i].parentNode.parentNode.style.display = 'none'; 
			}
		}
	},// Ende MadinDerStandardAtZitroneBeitragAusblenden: function (BeitragsID)	{//Blendet den Beitrag aus

	
	MadinDerStandardAtZitroneBeitragEinblenden: function (BeitragsID)	{//Fügt einen Link zum Aktuellsten Zitronenbeitrag hinzu
				ZitronenLink = window.content.document.createElement("div");
				ZitronenLink.id = "ZitronenLink";
				var LinkSelbst = window.content.document.createElement("a");
				LinkSelbst.textContent = "Mittwoch ist Zitronentag beim Standard"; 
				LinkSelbst.href = BeitragsID; 
				LinkSelbst.style.backgroundColor = "#f00";
				ZitronenLink.appendChild(LinkSelbst);
				window.content.document.getElementById("breadcrumb").appendChild(ZitronenLink);
	}// Ende MadinDerStandardAtZitroneBeitragAusblenden: function (BeitragsID)	{//Blendet den Beitrag aus
	

 
	
 };//ende var derStandardAtZitroneAmMittwochGreaseM = {};
};//ende if ("undefined" == typeof(derStandardAtZitroneAmMittwochGreaseM)) {



derStandardAtZitroneAmMittwochGreaseM.MadinDerStandardAtZitroneAmMittwochStart ();
