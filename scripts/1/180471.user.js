// ==UserScript==
// @name        test-teaser
// @namespace   www.hekticket.de
// @include     http*://www.hekticket.de/*/.bin/index.cgi*
// @version     1
// @grant       none
// ==/UserScript==
//document.write("<scri"+"pt type='text/javascript' src='scripts/jquery.easyAccordion.js'></sc"+"ript>");



theArtists 	= new Array();
hekhekHighlights 	= new Array();
// HelperFuntions - zum Prüfen auf doppelte, Verfügbarkeit und zu lange Texte
// 
function habenWirSchon(Teaser){
	var ergebnisDerPruefung = 0;
	for (var l = 0; l < hekhekHighlights.length; l++){
		if (hekhekHighlights[l][1]==Teaser) {ergebnisDerPruefung = 1;break;}
	}
	return ergebnisDerPruefung;
}
// 
function gibtEsNoch(teilHTML){
//	alert(teilHTML);
	var ergebnisDerPruefung = 1;
		if (teilHTML.indexOf('usualbutton')==-1) ergebnisDerPruefung = 0;
	return ergebnisDerPruefung;
}
// 
function hhZuLang(hhText, maxLaenge){
if (hhText.length>maxLaenge)hhText = hhText.substr(0,maxLaenge-1) +"...";
return hhText;
}
// 
// 
for (var i = 2; i < document.getElementsByTagName("strong").length; i++){ 

	theArtists.push(document.getElementsByTagName("strong")[i].firstChild.data.substr(0, document.getElementsByTagName("strong")[i].firstChild.data.indexOf(" - ")));
	for (var j = 0; j < teaser.length; j++){
		if(theArtists[i-2]==teaser[j][1] && habenWirSchon(theArtists[i-2])==0  && gibtEsNoch(document.getElementsByTagName("strong")[i].parentNode.parentNode.parentNode.innerHTML)==1){
			//alert(document.getElementsByTagName("strong")[i].parentNode.getAttribute("href",0));
			eventdetails = new Array(document.getElementsByTagName("strong")[i].parentNode.getAttribute("href",0),teaser[j][1],teaser[j][3]);
			hekhekHighlights.push(eventdetails);
			break;
		}
		
	}
//	alert(i + " von " + document.getElementsByTagName("strong").length);
	if (hekhekHighlights.length>4) break;
}
if(hekhekHighlights.length>1){
var hhAA = "<h1 style='margin-top:-30px;margin-bottom:15px'>";
hhAA += "Unsere Highlights:";
hhAA += "</h1><div id='hekhekAccordion'><dl>";
for (var i = 0; i < hekhekHighlights.length; i++){
	hhAA +="<dt ";
	if(i+1==hekhekHighlights.length) hhAA += "class='active'";	// den letzten aktiv!
	hhAA +=">";
	hhAA += hhZuLang(hekhekHighlights[i][1],23); 		// Buchr??n
	hhAA +="</dt><dd><div style='top:0px; left:0px; z-index:2;'><a href='";
	hhAA += hekhekHighlights[i][0];						// Link
	hhAA += "'><img src='";
	hhAA += hekhekHighlights[i][2];						// Bild
	hhAA += "' /></a></div><div style='top:180px; left:20px; z-index:3;'><h1><a href='";
	hhAA += hekhekHighlights[i][0];					// Link
	hhAA += "'>";
	hhAA += hhZuLang(hekhekHighlights[i][1],30);		// Titel
	hhAA += "</a></h1></div></dd>";
}
hhAA += "</dl></div><br>";

document.getElementsByClassName("rechtespalte")[0].innerHTML=hhAA + document.getElementsByClassName("rechtespalte")[0].innerHTML;
}
if(hekhekHighlights.length==4)document.getElementById("hekhekAccordion").firstChild.style.width = "528px";
if(hekhekHighlights.length==3)document.getElementById("hekhekAccordion").firstChild.style.width = "486px";
if(hekhekHighlights.length<3)document.getElementById("hekhekAccordion").firstChild.style.width = "444px";



    $(document).ready(function () {
	alert("ready");
//	$('.kopfrahmen').hide();
	$('.kopfrahmen').css('display','none');
//	$('.linkespalte').hide();
	$('.linkespalte').css('display','none');
//	$('.fussschatten').hide();
	$('.fussschatten').css('display','none');
//	$('.fussgrenze').hide();
	$('.fussgrenze').css('display','none');
//	$('.fussfuss').hide();
	$('.fussfuss').css('display','none');
//	$('.fussabschluss').hide();
	$('.fussabschluss').css('display','none');
	$('.positioner').css("position","relative");
	$('.fusscontent').css("padding-left","35px");
	$('.fusscontent').css("left","0px");
	$('.fusscontent').css("background-color","#fafafa");
	$('.rechtespalte').css("background-color","#fafafa");
	$('.rechtespalte table').css("margin-top","0px");
	$('.b2bheader').css("width","600px");
	$('.b2bheader').css("height","25px");
	$('.b2bheader').css("padding-top","10px");
	$('.b2bheader').css('background-image','url("http://www.hekticket.de/.img/hekticket-600x35.gif")');
	$('.b2bheader').css("background-color","#fafafa");
	$('.b2bheader *').css("font-size","10.5pt");
	$('.b2bheader *').css("font-weight","600");
	$('.b2bheader a').css("color","white");
	$('.b2bheader form').css("margin-right","15px");
	$('.b2bheader form select').css("width","120px");
	$('.b2bheader form select').css("background-color","#F36B5E");
	$('.b2bheader form select').css("color","white");
	$('.b2bheader form select option').css("color","white");
	$('.b2bheader form select').css("border","1px dashed #443B3A");
	$('.contentrahmen').css("top","80px");
	$('.contentrahmen').css("width","600px");
	$('.contentrahmen').css("background-color","#fafafa");
	$('.contentrahmen').css('background-image','url("http://www.hekticket.de/.img/hekticket-15x4-dk.gif")');
	
	$('#hekhekAccordion').easyAccordion({ 
			autoStart: true,
			slideInterval: 4000,
			slideNum:false	
	}); 

})



//alert (hhAA);
