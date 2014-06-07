// ==UserScript==

// @name           Neptun.NET Logon UI Screen Update v1.0
// @description    Használd a Neptun.NET-et kényelmesebben!
// @include        https://netw1.nnet.sze.hu/hallgato/*
// @include        https://netw2.nnet.sze.hu/hallgato/*
// @include        https://netw3.nnet.sze.hu/hallgato/*

// ==/UserScript==

document.body.bgColor = "#3385B7"; 
//document.body.bgColor = "#006699";

// Alsó kicsi logo eltüntetése
var logoNode = document.evaluate('//img[@src="style/main/sdalstudiologo.jpg"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
if (logoNode) {
	logoNode.style.display='none';
}

// Nagy logo eltüntetése
var logoNode = document.evaluate('//img[@src="style/main/loginlogo.jpg"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
if (logoNode) {
	logoNode.style.display='none';
}

//Felesleges szövegek eltávolítása
document.getElementById('lblVersion').style.display='none';
document.getElementById('lblModuleType').style.display='none';

// NEPTUN háttérkép cseréje
var divs = document.getElementsByTagName('table');
var i;
var nr=0;

for (i=0; i<divs.length;i++)
{	
if (nr==1)
	{
		divs[i].style.background='url(http://emesenszotar.uw.hu/neptun.jpg) no-repeat top center'
	//	divs[i].style.display='none';		
	break;
	}

	nr++;		
	}

//Gomb színének cseréje
document.getElementById('Submit').style.background = "#FF9933";
