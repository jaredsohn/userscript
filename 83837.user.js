// ==UserScript==
// @name          GrepoKultur
// @namespace     
// @description   Erweiterung Grepolis Verwalter Kultur
// @version       0.6
// @include       http://*.grepolis.*/game/town_overviews?action=culture_overview*
// ==/UserScript==


// Stadtfeste nach oben

var scriptEl = document.createElement("script");
	scriptEl.setAttribute('type','text/javascript');
	scriptEl.appendChild(document.createTextNode("\
	(function(){\
		allAParty=document.evaluate(\
			\"//a[@class='confirm type_theater  ']\",\
			document,\
			null,\
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
			null);\
		ul=$('#culture_overview_towns')[0];\
		for (i=0; i<allAParty.snapshotLength; i++)\
		{\
			li=$(allAParty.snapshotItem(i)).parents('li.town_item')[0];\
			sib=li.previousSibling;\
			ul.insertBefore(li, ul.firstChild);\
			ul.insertBefore(sib, ul.firstChild);\
		}\
		allAParty=document.evaluate(\
			\"//a[@class='confirm type_party  ']\",\
			document,\
			null,\
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
			null);\
		ul=$('#culture_overview_towns')[0];\
		for (i=0; i<allAParty.snapshotLength; i++)\
		{\
			li=$(allAParty.snapshotItem(i)).parents('li.town_item')[0];\
			sib=li.previousSibling;\
			ul.insertBefore(li, ul.firstChild);\
			ul.insertBefore(sib, ul.firstChild);\
		}\
	})();\
	"));// ie may needs (null == scriptEl.canHaveChildren || scriptEl.canHaveChildren) ? scriptEl.text = txt;
document.body.appendChild(scriptEl);

	
// Alle Feste zaehlen

var allEtaSpans;
var counter=0;

allEtaSpans=document.evaluate(
	"//span[@class='eta']",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	
var divPlaceCult;
divPlaceCult=document.getElementById("place_culture_count");
	
var points;
points=divPlaceCult.firstChild.nodeValue.split("/");

var newpoints;
newpoints=parseInt(points[0],10)+allEtaSpans.snapshotLength;

var diffpoints;
diffpoints=parseInt(points[1],10)-newpoints;

// Und Statuszeile anpassen

// für debugs
//diffpoints=-2;

if (diffpoints>0) 
{
	divPlaceCult.firstChild.nodeValue=points[0]+" / "+points[1]+" [-"+diffpoints+"]";
}
else
{
	// ETA berechnen, wann Kulturstufe fertig	

	allEtas = new Array(allEtaSpans.snapshotLength);

	for (i=0; i<allEtaSpans.snapshotLength; i++)
	{
		allEtas[i]=allEtaSpans.snapshotItem(i).firstChild.nodeValue.substr(14,10);
	}
	allEtas.sort();

	// diffpoints sind =0 oder <0
	// bei =0 -> letztes element
	// bei <0 -> zurückzählen
	// eta = anzahlelemente + diffpoints -1(wg. index)

	var eta;
	eta=allEtas[allEtaSpans.snapshotLength + diffpoints -1];
	
	divPlaceCult.firstChild.nodeValue=points[0]+" / "+points[1]+" ["+eta+"]";
	
	// thx @Faark
	var scriptEl = document.createElement("script");
	scriptEl.setAttribute('type','text/javascript');
	scriptEl.appendChild(document.createTextNode("\
		(function(){\
			var content = /([0-9]+) \\/ ?([0-9]+) \\[([0-9]+)\\]/.exec( $('#place_culture_count').text() );\
			if( content ){\
				$('#place_culture_count').html(content[1]+' / '+content[2]+' [<span></span>]');\
				$('#place_culture_count span').countdown( content[3] );\
				$('#place_culture_count span').mousePopup( new MousePopup( 'Zeit bis zum Erreichen der nächsten Stufe' ) );\
			}\
		})();\
	"));// ie may needs (null == scriptEl.canHaveChildren || scriptEl.canHaveChildren) ? scriptEl.text = txt;
	document.body.appendChild(scriptEl);
}