// ==UserScript==
// @name        POIadmin
// @namespace   ales.vitinger@gmail.com
// @description POIadmin zkratka pro administratory Mapy.cz
// @include     *://*mapy.cz/*
// @version     1.3
// ==/UserScript==

// Vyrobi odkaz do poiadminu
var padminLink = document.createElement("a");
var linkText = document.createTextNode("Administrace");
padminLink.appendChild(linkText);
padminLink.href = "#";
padminLink.target = "_blank";
// Vlozi link do stranky a nastavi ho neviditelne
document.getElementById("login").appendChild(padminLink);
//padminLink.style.display = "none";

// Casovac, ktery kazde 2 vteriny spousti update
var tid = setInterval(update, 1000);

// Funkce updatu
function update() {
// Vycte z url hodnotu parametru d
var d = gup("d");
// Pokud parametr je, tak zobrazi link a vlozi do odkazu spravnou hodnotu
if (d) {
	padminLink.style.display = "inline";
	var re1=/_/; 
	var result1=d.split(re1);
	if (result1[0] == "base" || result1[0] == "firm") {
		padminLink.href = "http://poiadmin.mapy.cz/detail/" + result1[0] + "_" + result1[1];
	} else {
		var type;
		switch (result1[0]) {
			case "muni": type="municipality"; 
			break;
			case "stre": type="street"; 
			break;
			case "addr": type="address"; 
			break;
			case "regi": type="region"; 
			break;
			case "dist": type="district"; 
			break;
			case "coun": type="country"; 
			break;
			case "ward": type="ward";
			break;
			case "quar": type="quarter";
			break;
                        case "area": type="area";
			break;
		}
		
		padminLink.href = "https://regionadmin.mapy.cz/locationDetailScreen?entityId=" + result1[1] + "&entityType=" + type;
		
	}
}
// Pokud parametr neni zmizi odkaz
else {
	padminLink.style.display = "none";
	}
}

// Vytahne z url vybrany parametr - okopirovano ze stackoverflow
function gup( name ){
name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
var regexS = "[\\?&#!]"+name+"=([^&#]*)";  
var regex = new RegExp( regexS );  
var results = regex.exec( window.location.href ); 
 if( results == null )    return "";  
else    return results[1];}