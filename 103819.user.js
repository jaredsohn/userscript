// ==UserScript==
// @name           GetIDfromtrades
// @namespace      Magistream
// @include        http://magistream.com/trades/*
// ==/UserScript==


var requestString;

var outputText = document.createElement("textarea");
outputText.readOnly = true;
outputText.style.display = "block";


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

    //See wich panel...
    var help = document.body.getElementsByClassName('panel');
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

	//now finally output...
	for(var i=0;i<ids.length;i++){
		res+=ids[i]+",";
	}

	outputText.value=res;
}

cleanCodes();

var marker  = document.getElementById('page-body');

marker.insertBefore(outputText, marker.firstChild);