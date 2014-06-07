// ==UserScript==
// @name           CountThem
// @namespace      Magistream
// @include        http://magistream.com/user/*
// ==/UserScript==



var outputText = document.createElement("textarea");
outputText.readOnly = true;
outputText.style.display = "block";
var numberOfAll = 0;


var allTabs = document.createElement("input");
allTabs.type = "checkbox";

var resArray = new Array();
var longString = "";

//Little helper: creats a label
function makeLabel(text){
	var newLabel = document.createElement("label");
	newLabel.appendChild(document.createTextNode(text));
	newLabel.style.color = "black";
	return newLabel;
}

var requestString;
//Request-Objekt erzeugen
function prepareRequest(){
	var xmlHttpObject = false;

	// Ueberpruefen ob XMLHttpRequest-Klasse vorhanden und erzeugen von Objekte fuer IE7, Firefox, etc.
	if (typeof XMLHttpRequest!= 'undefined')
	{
 		xmlHttpObject = new XMLHttpRequest();
	}
	// Wenn im oberen Block noch kein Objekt erzeugt, dann versuche XMLHTTP-Objekt zu erzeugen
	// Notwendig fuer IE6 oder IE5
	if (!xmlHttpObject)
	{
    	try
    	{
        	xmlHttpObject = new ActiveXObject("Msxml2.XMLHTTP");
   		}
    	catch(e)
    	{
        	try
        	{
            	xmlHttpObject = new ActiveXObject("Microsoft.XMLHTTP");
        	}
        	catch(e)
        	{
            	xmlHttpObject = null;
        	}
    	}
	}
	return xmlHttpObject;
}


// Funktion, die bei Statusaenderungen reagiert
function handleStateChange(xmlHttpObject)
{
    // Derzeitigen Status zurueckgeben
    if(xmlHttpObject.readyState == 4){
     	//requestString = xmlHttpObject.responseXML.documentElement;
     	//might not need it....
    }
}

//A little Note to users and myself:
//As JS lacks classes and Assotiated Arrays, I shal use the follwoing;
//ResArray if an Array, that contains Onject og Type "MainSpecies"
//MainSpecies-Object have a "name" (that of the species), a "number" and a "subArray"
//SubArrays again have SubSpecies-Objects, these have:
//"name" (ie. "Frozen Female Hatchling", and a "number"

function arraySearch(array, string){
	if(array.length==0) return -1;
	for(var i=0; i<array.length; i++ ){
		if(array[i]["name"] == string) return i;
	}
	return -1;
}


function countIt(){
var helpArray = new Array();
if(allTabs.checked){
	var tabArray = document.body.getElementsByClassName('tab');
	for(var i=0; i<tabArray.length; i++){
		if(tabArray[i].nodeName == "A"){
			var tabLink = "http://magistream.com"+tabArray[i].getAttribute('href');
			var xmlHttpObject = prepareRequest();
			xmlHttpObject.open('GET',tabLink, false);
			xmlHttpObject.send(null);
			xmlHttpObject.onreadystatechange = handleStateChange(xmlHttpObject);
				var help = xmlHttpObject.responseText.replace(/<li class=\"icon-ucp(.|\n)+?\/li>/gi,"");
				help = help.replace(/<div style=\"float(.|\n)+?\/div>/gi,"");
				var parser = new XPCNativeWrapper(window, "DOMParser").DOMParser();
				var xmlString = parser.parseFromString(help, "text/xml");
				var nodeList = xmlString.documentElement.getElementsByClassName('row');
				for(var j=0 ; j<nodeList.length ; j++){
					helpArray.push(nodeList[j]);
				}
		}
	}
}
var trs  = document.body.getElementsByClassName('row');
				for(var j=0; j<trs.length; j++){
					helpArray.push(trs[j]);
				}
				
resArray = new Array();
for(var i=0; i<helpArray.length; i++){
	var test = helpArray[i].getElementsByClassName('usercol2');
	var species = test[1].firstChild.data;
	var details = test[2].firstChild.data;
	index = arraySearch(resArray, species);
	if(index<0){ //Species is new for this array
		index = resArray.length;
		var newSpecies = new Object();
		var newDetails = new Object();
		newSpecies["name"] = species;
		newSpecies["number"] = 1;
		newDetails["name"] = details;
		newDetails["number"] = 1;
		newSpecies["subArray"] = new Array(newDetails);
		numberOfAll++;
		resArray.push(newSpecies);
	}
	else{ //species is already in array
		var speciesObject = resArray[index];
		speciesObject["number"]++;
		numberOfAll++;
		subIndex = arraySearch(speciesObject["subArray"], details);
		if(subIndex < 0){ //There are no "Adult Fenales" or something like for that species till now
			var newDetails = new Object();
			newDetails["name"] = details;
			newDetails["number"] = 1;
			speciesObject["subArray"].push(newDetails);
		}
		else{ //We already have, for example,Adult Females:
			speciesObject["subArray"][subIndex]["number"]++;
		}

	}
}

longString = "";
//Now, movin all that stuff from the resArray into a String...
for(var i=0; i<resArray.length; i++){
	longString += resArray[i]["name"]+": "+resArray[i]["number"] + "\n";
	for(var j=0; j< resArray[i]["subArray"].length; j++){
		longString += "    "+resArray[i]["subArray"][j]["name"]+": "+resArray[i]["subArray"][j]["number"] + "\n";
	}
	longString += "-------------\n"
}
longString += "Sum of all: "+ numberOfAll;
outputText.value=longString;
}



allTabs.addEventListener('change', function(){countIt();}, true);

var marker  = document.getElementById('keeptabs');

marker.insertBefore(outputText, marker.firstChild);
marker.insertBefore(allTabs, marker.firstChild);
marker.insertBefore(makeLabel("Count all tabs"), marker.firstChild);

countIt();