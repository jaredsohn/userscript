// ==UserScript==
// @name           TradeId's
// @namespace      Magistream
// @include        http://magistream.com/trades
// ==/UserScript==

var requestString;

var outputText = document.createElement("textarea");
outputText.readOnly = true;
outputText.style.display = "block";

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

var tradeLinks = new Array();
var ids = new Array();
var res = "";

function handleStateChange(xmlHttpObject)
{
    // Derzeitigen Status zurueckgeben
    if(xmlHttpObject.readyState == 4){
     	requestString = xmlHttpObject.responseText;

    }
}


function cleanCodes(){
	var help = document.body.getElementsByClassName('panel')[1];
	help = help.getElementsByTagName('a');

	//get the nessecary links
	for(var i=0; i<help.length; i++){
		var link = help[i].attributes.href.nodeValue;
		if(link.match(/trades/)){
			tradeLinks.push(link);
		}
	}

	for(var i=0; i<tradeLinks.length; i++){
		var xmlHttpObject = prepareRequest();
        xmlHttpObject.open('GET','http://magistream.com/'+tradeLinks[i], false);
        xmlHttpObject.send(null);
        xmlHttpObject.onreadystatechange = handleStateChange(xmlHttpObject);

        var help = requestString.replace(/<li class=\"icon-ucp(.|\n)+?\/li>/gi,"");
        help = help.replace(/<div style=\"float(.|\n)+?\/div>/gi,"");
        var parser = new XPCNativeWrapper(window, "DOMParser").DOMParser();
        var xmlString = parser.parseFromString(help, "text/xml");

        //See wich panel...
        help = xmlString.getElementsByClassName('panel');
        for(var j=0; j<help.length; j++){
        	help2 = help[j].getElementsByTagName('h3');
        	var text1 = help2[0].firstChild.nodeValue;
        	if(text1.match(/Offer -/)){
        		var help3 = help[j].getElementsByTagName('a');
        		for(var k=0; k<help3.length; k++){
        			var url = help3[k].attributes.href.nodeValue;
        			if(url.match(/creature/)){
        				var split = url.split("/");
        				ids.push(split[4]);
        			}
        		}
        	}
        }
	}

	//now finally output...
	for(var i=1;i<ids.length;i++){
		res+=ids[i]+",";
	}

	outputText.value=res;
}

cleanCodes();

var marker  = document.getElementById('page-body');

marker.insertBefore(outputText, marker.firstChild);
