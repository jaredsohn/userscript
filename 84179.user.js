// ==UserScript==
// @name           CityDeal-Einnahmenrechner
// @namespace      *
// @description    Nach der Aktivierung errechnet dieses Tool automatisch den tages- und minutenabhänigen Stand der Einnahmen von Citydeal
// @include        http://www.groupon.de/*
// ==/UserScript==

var CON__START_AT = 0;

	// Debugkiller
	// localStorage.removeItem("CurrentCity");localStorage.removeItem("CurrentState");localStorage.removeItem("CityState");localStorage.removeItem("CityList");localStorage.removeItem("ResultList");console.log("ALL DATA HAS BEEN DELETED!!"); return;
	
	//Get current State
	if(localStorage.getItem("CurrentState") != "working") {
		console.log("Keine Aktivität gefunden - Also Frage stellen");
		/*Kill all data*/	localStorage.removeItem("CurrentState");localStorage.removeItem("CityState");localStorage.removeItem("CityList");localStorage.removeItem("ResultList");console.log("ALL DATA HAS BEEN DELETED!!");
		
		if(!confirm("Wollen Sie die Berechnung jetzt starten?")) 
			return;
		else {
			localStorage.removeItem("CurrentState");
			localStorage.removeItem("CityState");
			localStorage.removeItem("CityList");
			localStorage.removeItem("ResultList");
			localStorage.removeItem("CurrentCity");
		}
	} else {
		console.log("In Arbeit. Keine Frage gestellt");
	}
	
	// Load current City
	if(!localStorage.getItem("CurrentCity")) {
		console.log("Keine CurrentCity-Nummer gefunden - starte bei " + CON__START_AT);
		var CurrentCity = CON__START_AT;
		localStorage.setItem("CurrentCity", CurrentCity);
	} else {
		var CurrentCity = localStorage.getItem("CurrentCity");
		console.log("CurrentCity-Nummer gefunden! " + CurrentCity);
	}
	
	// Load list of Cities
	if(!localStorage.getItem("CityList")) { 
		console.log("Keine CityListe gefunden - Laden lassen");
		var CityList = GetCities();
		localStorage.setItem("CityList", JSON.stringify(CityList));
	} else {
		console.log("Es ist eine CityListe vorhanden.");
		var CityList = JSON.parse(localStorage.getItem("CityList"));
	}
	
	// Load the resultlist
	if(!localStorage.getItem("ResultList")) {
		console.log("Keine ResultListe gefunden - Erzeuge eine leere");
		var ResultList = new Array();
		localStorage.setItem("ResultList", ResultList);
	} else {
		console.log("Es ist bereits eine ResultList vorhanden - lade");
		var ResultList = JSON.parse(localStorage.getItem("ResultList"));
	}
	
	// if freshly loaded, start it
	if (localStorage.getItem("CurrentState") != "working") {
		localStorage.setItem("CurrentState", "working");
		localStorage.setItem("CityState", "normal");
		location.href = CityList[CurrentCity][1];
		return;
	}
	
	console.log("Aktueller Posten: " + CurrentCity + "/" + CityList.length);
	
	// Are we done yet?
	if ( CurrentCity == CityList.length ) {
		console.log("Wir sind durch!");
		//console.log(ResultList);
		
		CalcMoney();
		
		console.log("Aus insgesamt " + CityList.length + " Städten + Extra-Deals");
		
		localStorage.removeItem("CurrentState");
		localStorage.removeItem("CityState");
		localStorage.removeItem("CityList");
		localStorage.removeItem("ResultList");
		return;
	}
	
	// Is it a normal deal or the extra-deal?
	if(localStorage.getItem("CityState") == "normal") {
		
		console.log("Normal-state for '" + CityList[CurrentCity][0] + "'");
	
		var priceString = document.getElementById("price-for-deal").innerHTML;
		priceString = priceString.split(" ")[2].split(";")[1];
		
		var buyerString = document.getElementById("deals-bought").innerHTML;
		buyerString = trim(buyerString.split(" ")[1].split("\n")[1]);
		
		var CityResult = new Array(CityList[CurrentCity][0],"normal" ,priceString, buyerString);
		console.log(CityResult);
		
		if(!isNaN(priceString.replace(",",".") * buyerString)) {
			console.log("Data is valid!");
			ResultList.push(CityResult); 
			localStorage.setItem("ResultList", JSON.stringify(ResultList));
		} else {
			console.log("Data is invalid ... :-(");
		}
		
		//CalcMoney();
		
		// Is there an extra offer?
		var link = document.getElementById("sidebar").getElementsByTagName("a")[0].href;
		if ( link && !(link.indexOf("empfehlung") > 0)) {
			localStorage.setItem("CityState", "extra");
			console.log("Link to: " + link + " (as extra-link is present)");
			location.href = link;
		}
		else {
			CurrentCity++;
			
			// Are we done yet?
			if ( CurrentCity >= CityList.length ) {
				console.log("Aktueller Posten: " + CurrentCity + "/" + CityList.length + " WE ARE DONE HERE!!");
				localStorage.setItem("CurrentCity", CurrentCity);
				location.reload()
			}
			
			localStorage.setItem("CurrentCity", CurrentCity);
			localStorage.setItem("CityList", JSON.stringify(CityList));
			console.log("Link to: " + CityList[CurrentCity][1] + " (as no extra-link is present)");
			location.href = CityList[CurrentCity][1];
		}
	}
	else if (localStorage.getItem("CityState") == "extra") {
	
		console.log("Extra-state for '" + CityList[CurrentCity][0] + "'");
	
		var priceString = document.getElementById("price-for-deal").innerHTML;
		priceString = priceString.split(" ")[2].split(";")[1];
		
		var buyerString = document.getElementById("deals-bought").innerHTML;
		buyerString = trim(buyerString.split(" ")[1].split("\n")[1]);
		
		var CityResult = new Array(CityList[CurrentCity][0],"extra" ,priceString, buyerString);
		console.log(CityResult);
		
		if(!isNaN(priceString.replace(",",".") * buyerString)) {
			ResultList.push(CityResult); 
			localStorage.setItem("ResultList", JSON.stringify(ResultList));
		}
		
		//CalcMoney();
		
		CurrentCity++;
		
		// Are we done yet?
		if ( CurrentCity >= CityList.length ) {
			console.log("Aktueller Posten: " + CurrentCity + "/" + (CityList.length) + " WE ARE DONE HERE!!");
			localStorage.setItem("CurrentCity", CurrentCity);
			location.reload()
		}
		
		localStorage.setItem("CurrentCity", CurrentCity);
		localStorage.setItem("CityList", JSON.stringify(CityList));
		localStorage.setItem("CityState", "normal");
		console.log("Link to: " + CityList[CurrentCity][1]);
		location.href = CityList[CurrentCity][1];
	 }

	// ##########################
	// ## Non sense from now on
	// ##########################

	function CalcMoney() {
		
		document.getElementsByTagName("html")[0].innerHTML = "<h1>CityDeal-Ergebnisse</h1>";
		
		var Gesamt = 0;
		var table = "<table id='tab' border='2px'><tr><td>Stadt</td><td>User</td><td>Preis</td><td>Gesamt</td></tr>";
		for ( item in ResultList ) {
			//console.log(ResultList[item][0] + "(" + ResultList[item][1] + ") = " + ResultList[item][3] + " * " + ResultList[item][2] + " = " + (ResultList[item][3] * ResultList[item][2].replace(",",".")) + " €");
			table += "<tr><td>" + ResultList[item][0] + "(" + ResultList[item][1] + ")</td><td>" + ResultList[item][3] + "</td><td>"+ ResultList[item][2] + "</td><td>" + (ResultList[item][3] * ResultList[item][2].replace(",",".")) + " €</td></tr>";
			Gesamt += (ResultList[item][3] * ResultList[item][2].replace(",","."));
		}
		
		table += "<tr><td><b>GESAMT</b></td><td></td><td></td><td>" + Gesamt + "</td></tr></table>";
		
		document.getElementsByTagName("html")[0].innerHTML += table;
		//console.log("Aktuelle Einnahmen von CityDeal: " + Gesamt + " €");
	}
	
	function GetCities() {

		if ( document.getElementById("cl-container") ) {
			
			CityList = new Array();
			
			var container = document.getElementById("cl-container");
			container = container.getElementsByTagName("div");
			
			for ( key in container) {

				if (container[key].id.indexOf("Top40") > 0) continue;
				
				var LinkList = document.getElementById(container[key].id).getElementsByTagName("a");
				for ( key in LinkList ) {
					CityList.push(new Array(LinkList[key].innerHTML, LinkList[key].href));	
				}
			}
			
			return CityList;
		}
		else {
			console.log('Error - Konnte keine Städteliste laden');
			return;
		}
	}

	function getHttpRequest() {
	   
		var xmlhttp = null;
		
		// Mozilla
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		}
		// IE
		else if (window.ActiveXObject) {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	   
		return xmlhttp;
	}
	
	function createCookie(naming,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = naming+"="+value+expires;
	}
	
	function readCookie(naming) {
		var nameEQ = naming + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function eraseCookie(naming) {
		CHF_UI.createCookie(naming,"",-1);
	}
	
	function trim (zeichenkette) {
		return zeichenkette.replace (/^\s+/, '').replace (/\s+$/, '');
	}