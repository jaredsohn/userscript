// ==UserScript==
// @name           CleanUpHTML
// @namespace      Magistream
// @include       http://magistream.com/ucp.php*
// ==/UserScript==

var requestString;
//Species
var input = document.createElement("textarea");
var ids = document.createElement("textarea");
ids.setAttribute('readonly', 'readonly');
ids.style.backgroundColor = "#CCCCCC";
//breedable
var cleanButton = document.createElement("input");
cleanButton.type = "button";
cleanButton.value ="Clean Up (HTML)";

var idList = new Array();
var idListClean = new Array();
var longString = "";

function arrayContains(array, string){
	for(var i=0; i<array.length; i++ ){
		if(array[i] == string) return true;
	}
	return false;
}

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
     	requestString = xmlHttpObject.responseText;

    }
}

function cleanCodes(){
	idList = new Array();
	idListClean = new Array();
	longString="";
	var mystring =  input.value;
	var resArray = mystring.match(/<a href=.http:\/\/magistream.+?a>/gi);
	var id;
	var toDelete = new Array();
	for(var i=0; i<resArray.length; i++){
			var xmlHttpObject = prepareRequest();
			id=resArray[i].split("/")[4].split("\"")[0];
			if(arrayContains(idList, id)){
				toDelete.push(resArray[i]);
				continue;
			}
			idList.push(id);
			xmlHttpObject.open('GET','http://magistream.com/creatures/ajaxtooltip.php?id='+id, false);
			xmlHttpObject.send(null);
			xmlHttpObject.onreadystatechange = handleStateChange(xmlHttpObject);
			if(requestString.match(/^Adult/)
				|| requestString.match(/^Frozen/)
				|| requestString.match(/Owner: Nobody/)
				|| requestString.match(/Owner: Anonymous/)){
					toDelete.push(resArray[i]);
				}
			else {
				idListClean.push(id);
			}
	}
	for(var i=0; i<toDelete.length; i++){
		toDelete[i] = toDelete[i].replace(/\"/g, "\"");
		input.value = input.value.replace(new  RegExp(toDelete[i]), "");
	}

	for(var i=0; i<idListClean.length; i++){
		longString = longString+idListClean[i]+",";
	}
	ids.value = longString;

	alert("I am done");
}

cleanButton.addEventListener('click', function(){cleanCodes();}, true);


var marker  = document.getElementById('tabs');


marker.insertBefore(cleanButton, marker.firstChild);
marker.insertBefore(document.createElement("br"), marker.firstChild);
marker.insertBefore(ids, marker.firstChild);
marker.insertBefore(document.createElement("br"), marker.firstChild);
marker.insertBefore(input, marker.firstChild);