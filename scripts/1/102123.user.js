// ==UserScript==
// @name          FRS torrent searcher
// @namespace     http://freerecordshop.nl
// @description   Voegt een torrent link, ondertitel link toe aan http://freerecordshop.nl
// @include       http://*.freerecordshop.*/films/*
// @include       http://*.freerecordshop.*/games/*
// @include       http://*.freerecordshop.*/music/*
// @version		  5.2
// @author 		  Zaric
// ==/UserScript==

//===============Taal: Nederlands ==========Release: Stable!==============//

//============================Functies:================================//
function xpath(query) 
{
    return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function knop()
{
	var knoppen = document.createElement("a");
	knoppen.setAttribute('href','http://ondertitel.com/?type=&trefwoord=' + titel + '&p=zoek');
	knoppen.setAttribute('target','_blank');
	knoppen.innerHTML = '<br><img style="padding: 13px;" src="data:image/gif;base64,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"><Br> <a target="_blank" href="http://btjunkie.org/search?q=' + titel +'"><img style="padding: 13px;" src="data:image/gif;base64,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"></a>';
	
	return knoppen;
}




//==================================Film lijst==============================================//
//====================Knop (Ondertitel, Download) toevoegen==================================//

var difs, knp, altText, titel, allDivs, thisDiv;
difs = xpath("//div[@class='lister_levertijd']");
for (var i = 0; i < difs.snapshotLength; i++) 
{
	allDivs = xpath("//div[@class='productinfo_top']/a[@class='bluelinkul']");

	for (var i = 0; i < allDivs.snapshotLength; i++) 
	{
		thisDiv = allDivs.snapshotItem(i);
		titel = thisDiv.firstChild.nodeValue;
		knp = difs.snapshotItem(i);
		knp.parentNode.insertBefore(knop(), knp.nextSibling);
	}
}


//=============================Film pagina===============================//
//Voor als je op de pagina FILM komt (films -> genre -> film bes -> meer)
var pagediv, pageknp, textedit, titdiv, dezdiv, titel;
pagediv = xpath("//div[@class='pd_prijs_midden']");

for (var i = 0; i < pagediv.snapshotLength; i++)
{

	titdiv = xpath("//h1[@class='zwart24']");
	for (var i = 0; i < titdiv.snapshotLength; i++) 
	{
		dezdiv = titdiv.snapshotItem(i);
		titel = dezdiv.innerHTML;
		pageknp = pagediv.snapshotItem(i);
		
		pageknp.parentNode.replaceChild(knop(), pageknp);
	 
	}
}


//===============================Elementen verwijderen=============================//
//PRIJS VERWIJDEREN
var difs, knp;
difs = xpath("//div[@class='lister_prijs']");

for (var i = 0; i < difs.snapshotLength; i++) 
{
	knp = difs.snapshotItem(i);
	knp.parentNode.removeChild(knp);
}

//Bestel knop verwijderen
var difs, knp;
difs = xpath("//div[@class='lister_bestelknop']");

for (var i = 0; i < difs.snapshotLength; i++) 
{
	knp = difs.snapshotItem(i);
	knp.parentNode.removeChild(knp);
}
