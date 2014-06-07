// ==UserScript==
// @name           GMX - längere Betreffzeilen
// @description    zeigt längere Betreffzeilen an, verkleinert Werbungs-Zweizeiler, verkürzt Absender "GMX Magazin" auf Buchstaben für eine Zeile
// @namespace      gotU
// @include        http://service.gmx.net/de*
// @include        https://service.gmx.net/de*
// ==/UserScript==

var availableWidthInPixels_mails=(window.innerWidth-420);
var availableWidthInLetters_mails=availableWidthInPixels_mails/8 - 3;

var availableWidthInPixels_filestore=(window.innerWidth-335);
var availableWidthInLetters_filestore=availableWidthInPixels_filestore/6 - 3 - 10;

/**
Falls Fenstergröße verändert wird
*/
function updateVariables(){
	availableWidthInPixels_mails=(window.innerWidth-420);
	availableWidthInLetters_mails=availableWidthInPixels_mails/8 - 3;

	availableWidthInPixels_filestore=(window.innerWidth-335);
	availableWidthInLetters_filestore=availableWidthInPixels_filestore/6 - 3 - 10;
}






window.addEventListener('resize', function()
	{
		//alert("Resized!");
		updateVariables();
		checkURLandCallFunctions();
	}, true);
	
checkURLandCallFunctions();







function checkURLandCallFunctions() {
	if(document.location.href.indexOf("service.gmx.net/de/cgi/filestore")>=0){
		if(window.innerWidth>495){
			//kurz warten, bis Ordnerstruktur geladen wurde		
			window.setTimeout( showLongerTopic_inFilestore, 1000);
		}
	}
	else{
		if(window.innerWidth>795)
			showLongerTopicEmails();
	}
}

function showLongerTopicEmails() {
	//alert(document.location.href);
	//alert(window.innerWidth);
	
	var rows= document.getElementById('MI').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	//var rows2= document.getElementById('contentdiv').getElementsByTagName('form')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');	
	
	for(var j=0; j<rows.length; j++){

		/*doppelreihen "normalisieren*/
		if(j+1<rows.length){
			if(rows[j+1].getElementsByTagName('td').length==1){

				rows[j].removeAttribute("style");					//höhe entfernen
				rows[j].getElementsByTagName('td')[0].removeAttribute("style");		//höhe entfernen

				rows[j].getElementsByTagName('td')[0].removeAttribute("rowspan");	//höhe entfernen
				rows[j].getElementsByTagName('td')[1].removeAttribute("rowspan");	//höhe entfernen
				rows[j].getElementsByTagName('td')[3].removeAttribute("rowspan");	//höhe entfernen



				/*Neue Elemente für Doppelreihe erstellen*/

				var newTd1 = document.createElement("td");//Absender
					if(rows[j].getElementsByTagName('td')[2].getElementsByTagName('img').length>0){				//Bild vorne dran hat Priorität
						var newImg1= rows[j].getElementsByTagName('td')[2].getElementsByTagName('img')[0].cloneNode(false);
						newTd1.appendChild(newImg1);
					}else{
						var newA1= rows[j].getElementsByTagName('td')[2].getElementsByTagName('a')[0].cloneNode(true);	//Text-Kinder mitkopieren
						newTd1.appendChild(newA1);
					}
				var newTd2 = document.createElement("td");//Betreff
					var newA2= rows[j].getElementsByTagName('td')[2].getElementsByTagName('a')[0].cloneNode(true);		//Text-Kinder mitkopieren
					/*
					if(newA2.getAttribute("title")==undefined)//Titel setzen, damit untere Verlängerungsmethode funktioniert
						newA2.setAttribute("title",newA2.innerHTML);
					*/
					newTd2.appendChild(newA2);

				var newTd3 = document.createElement("td");//Datum
				var newTd4 = document.createElement("td");//Größe

				

				var insBeforeTd= rows[j].getElementsByTagName('td')[3];



				/*zweite Zeile und langen Betreff der Werbung löschen*/
				var ri=rows[j+1].rowIndex;
				document.getElementById('MI').getElementsByTagName('table')[0].deleteRow(ri);
				rows[j].removeChild(rows[j].getElementsByTagName('td')[2]);


				/*Neue Elemente einfügen*/
				rows[j].insertBefore(newTd1, insBeforeTd);
				rows[j].insertBefore(newTd2, insBeforeTd);
				rows[j].insertBefore(newTd3, insBeforeTd);
				rows[j].insertBefore(newTd4, insBeforeTd);
			}
		}

		var absender=rows[j].getElementsByTagName('td')[2].getElementsByTagName('a')[0];
		var betreff=rows[j].getElementsByTagName('td')[3].getElementsByTagName('a')[0];

		//alert(betreff.getAttribute("title",0));

		if(betreff.getAttribute("title",0)==undefined){
			//alert(betreff.innerHTML);
			//alert(j);
			continue;
		}

		//clean from any < or > crap that creates a html <someword> if appending text by + operator, like below
		var title_cleaned= betreff.getAttribute("title",0).replace(/</gi, "").replace(/>/gi, "");

		var diff= availableWidthInLetters_mails - title_cleaned.length;		
		//alert(diff);
		if(diff>0){
			//Name wird auf gewünschte Länge mit Leerzeichen erweitert, damit Spalte auch breiter wird wenn mal kein langer Name dabei ist
			var toAddSpaces="";
			for(var addSpaceCounter= diff; addSpaceCounter>0; addSpaceCounter--){
				toAddSpaces+=" ";
			}
			//alert("$"+toAddSpaces+"$");			

			//alert("§"+title_cleaned+"§");
			//betreff.innerHTML=betreff.getAttribute("title",0) + toAddSpaces;
			betreff.innerHTML=title_cleaned + toAddSpaces;
			//alert(betreff.innerHTML);
		}
		else{
			//Der volle Titel ist immer noch zu lang. Auf sinnvolle Länge Verlängern. Nicht kürzer machen als im Original
			if(betreff.innerHTML.length<availableWidthInLetters_mails)
				betreff.innerHTML=title_cleaned.substring(0,availableWidthInLetters_mails)+'...';
		}

		/*GMX-Magazin bei Absender kürzen - Anfang*/
		/*Absendername nicht im innerHTML, sondern im title???*/
		
		if(absender.innerHTML!=undefined){
			if(absender.innerHTML.indexOf("GMX Magazin")>=0){
				absender.innerHTML="GMX Magazin";
			}
		}
		//empfangene Emails von GMX()-Pro-Benutzern haben vor ihrem Namen eine Krone
		//Bei diesen Zeilen auf undefined prüfen
		if(absender.getAttribute("title",0)!=undefined){
			if(absender.getAttribute("title",0).indexOf("GMX Magazin")>=0){
				absender.innerHTML="GMX Magazin";
				absender.removeAttribute("title");
			}
		}
		/*GMX-Magazin bei Absender kürzen - Ende*/

	}//end for

}

function showLongerTopic_inFilestore() {
		
	var rows2= document.getElementById('contentdiv').getElementsByTagName('form')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');	
	//alert(rows2.length);
	//alert(rows2[2].getElementsByTagName('td')[0].innerHTML);
	//alert(rows2[30].getElementsByTagName('td')[0].innerHTML);
	
	for(var j2=2; j2<rows2.length; j2=j2+2){
		//alert(rows2[j2].getElementsByTagName('td')[0].innerHTML);
		
		var fullname=rows2[j2].getElementsByTagName('td')[0].getElementsByTagName('input')[0].getAttribute("value",0);
		//alert(fullname);

		var shortname_a=rows2[j2].getElementsByTagName('td')[2].getElementsByTagName('a')[0];
		var shortname=shortname_a.innerHTML;
		//alert(shortname);		
		
		//clean from any < or > crap that creates a html <someword> if appending text by + operator, like below
		var fullname_cleaned2= fullname.replace(/</gi, "").replace(/>/gi, "");
		//alert(fullname_cleaned2);
		
		var diff2= availableWidthInLetters_filestore - fullname_cleaned2.length;
		//alert(diff2);
		
		if(diff2>0){
			var toAddSpaces2="";
			for(var addSpaceCounter2= diff2; addSpaceCounter2>0; addSpaceCounter2--){
				toAddSpaces2+=" ";
			}
			//alert("$"+toAddSpaces2+"$");
			
			shortname_a.innerHTML= fullname_cleaned2 + toAddSpaces2;
		}
		else{
			//Der volle Titel ist immer noch zu lang. Auf sinnvolle Länge verlängern. Aber nicht kürzer machen als im Original -> if
			if(shortname.length<availableWidthInLetters_filestore)
				shortname_a.innerHTML=fullname_cleaned2.substring(0,availableWidthInLetters_filestore)+'...';
		}			
	}//end for

}


/*
<!--
Aufbau von zweizeiliger Werbung "GMX best price":
	
erste tr
		td um input-checkbox hat rowspan=2
		td um anhang hat rowspan=2

		td absender+betreff+...  hat colspan="4"
		td um spam hat rowspan=2

	zweite tr
		nur noch möglich: td mit colspan=4

-->
*/
