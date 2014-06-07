// ==UserScript==
// @name          Remove Officers and Commander icons + menuitems + add "Find Geologists"-feature
// @author 	  OgamerNL
// @description   Remove Officers and Commander icons + menuitems + add "Find Geologists"-feature
// @include       http://*ogame*/game/index.php*
// ==/UserScript==


var divs = document.getElementsByTagName('div');
for (var idiv = 0; idiv < divs.length; idiv++) {
	if (divs[idiv].id == 'menu') {
		var iMenuDiv = idiv;
	}
	if (divs[idiv].id == 'header_top') {
		divs[idiv].style.width=screen.width-190;
		divs[idiv].style.height=60;
	}
	if (divs[idiv].id == 'content') {
		divs[idiv].style.width=screen.width-190;
		if (document.location.href.indexOf('&no_header=1')!=-1) { 
			divs[idiv].style.top=0;
			divs[idiv].style.height=window.innerHeight-1;
		} else {
			divs[idiv].style.top=70;
			divs[idiv].style.height=window.innerHeight-71;
		}
	}
	if (divs[idiv].id == 'messagebox') {
		divs[idiv].style.width=screen.width-200;
		divs[idiv].style.top=60;
	}
	if (divs[idiv].id == 'errorbox') {
		divs[idiv].style.width=screen.width-200;
		divs[idiv].style.top=60;
	}
}

var menutable = document.getElementsByTagName('div')[iMenuDiv].getElementsByTagName('table');
var menurows = menutable[0].getElementsByTagName('tr');


//=================================================================================================
// This section is for the tool which allows you to discover if somebody uses the Geologist officer
// The international webpage url is: http://www.kvdeckmasters.nl/ogame/findgeologists.html
// You can save that file, translate it for your country and host it yourselves on your own server
//=================================================================================================
if (menurows[1].innerHTML.indexOf('Overzicht') != -1) {
	// Dutch version
	var findgeologistspage = 'ontdekgeologen';			// niet wijzigen, dit is een link naar een webpagina
	var findgeologiststext = 'Ontdek Geologen';			// Deze tekst mag wel gewijzigd worden!
} else {
	// International version
	var findgeologistspage = 'findgeologists';			// don't change this... it's a reference to a webpage
	var findgeologiststext = 'Find Geologists';			// This text can be changed!
}

var findgeologistslocation = 'http://www.kvdeckmasters.nl/ogame/';	// only change this if you wish to host your own version of the 'Find Geologists' webpage!
//=================================================================================================


for (var i = 0; i < menurows.length; i++) {
	if(menurows[i].innerHTML.indexOf('page=micropayment') != -1){
		menutable[0].deleteRow(i);
	}
	if(menurows[i].innerHTML.indexOf('page=suche') != -1){
		var newrow = menutable[0].insertRow(i+1);
		var newcell=newrow.insertCell(0);
		newcell.innerHTML="<div align='center'><font color='#FFFFFF'><a href='#' onclick='fenster(&#34;"+findgeologistslocation+findgeologistspage+".html&#34;, &#34;"+findgeologistspage+"&#34;);'>"+findgeologiststext+"</a></font></div>";
	}
}


var checkofficers = '';
try {
	checkofficers = document.getElementsByTagName('table')[0].getElementsByTagName('td')[19].innerHTML;
	if (checkofficers.indexOf('index.php?page=micropayment') != -1) {
		document.getElementsByTagName('table')[0].getElementsByTagName('td')[19].innerHTML = '';
	}
}
catch(err) {
	checkofficers = '';
}

try {
	document.getElementsByTagName('table')[0].getElementsByTagName('td')[12].innerHTML = "<nobr>"+document.getElementsByTagName('table')[0].getElementsByTagName('td')[12].innerHTML+"</nobr>";
}
catch(err) {
	checkofficers = '';
}

if (document.location.href.indexOf('page=overview')!=-1) { 
	try {
		var bannerdiv = document.getElementById("combox_container");
		bannerdiv.innerHTML = '';
	}
	catch(err) {
		var bannerdiv =  '';
	}
}

