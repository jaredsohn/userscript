// ==UserScript==
// @name          Quita el visor virtual del menú izquierdo
// @author 	  Sey
// @description   None
// @include       http://*/*.php*
// ==/UserScript==



//=================================================================================================
// This section is for the tool which allows you to discover if somebody uses the Geologist officer
// The international webpage url is: http://www.kvdeckmasters.nl/ogame/findgeologists.html
// You can save that file, translate it for your country and host it yourselves on your own server
//=================================================================================================
if (document.getElementsByTagName('tr')[1].innerHTML.indexOf('Overzicht') != -1) {
	// Dutch version
	var findgeologistspage = 'ontdekgeologen';			// niet wijzigen, dit is een link naar een webpagina
	var findgeologiststext = 'Ontdek Geologen';			// Deze tekst mag wel gewijzigd worden!
} else {
	// International version
	var findgeologistspage = 'findgeologists';			// don't change this... it's a reference to a webpage
	var findgeologiststext = 'compara producción';			// This text can be changed!
}

var findgeologistslocation = 'http://www.kvdeckmasters.nl/ogame/';	// only change this if you wish to host your own version of the 'Find Geologists' webpage!
//==============================================================================



var thispage=document.location.href;

if (thispage.indexOf('leftmenu.php')!=-1) { 
	cursession =  thispage.substring(thispage.indexOf('session=')+8,thispage.length);
	var menutable = document.getElementsByTagName('table');
	var menurows = document.getElementsByTagName('tr');
	for (var i = 0; i < menurows.length; i++) {
		if(menurows[i].innerHTML.indexOf('help.php') != -1){
			menutable[0].deleteRow(i);
		}
		if(menurows[i].innerHTML.indexOf('imperium.php') != -1){
			menutable[0].deleteRow(i);
		}	
		if(menurows[i].innerHTML.indexOf('suche.php') != -1){
			var newrow = menutable[0].insertRow(i+1);
			newcell.innerHTML="<div align='center'><font color='#FFFFFF'><a> ???? </a></font></div>";
}
	}
} else {
	if (thispage.indexOf('galaxy.php')==-1) {
		var checkofficers = '';
		try {
			checkofficers = document.getElementsByTagName('table')[0].getElementsByTagName('td')[23].innerHTML;
			if (checkofficers.indexOf('/imperium.php') != -1) {
				document.getElementsByTagName('table')[0].getElementsByTagName('td')[23].innerHTML = '';
			} else {
				checkofficers = document.getElementsByTagName('table')[3].getElementsByTagName('td')[19].innerHTML;
				if (checkofficers.indexOf('/imperium.php') != -1) {
					document.getElementsByTagName('table')[3].getElementsByTagName('tr')[0].getElementsByTagName('td')[19].innerHTML = '';
				}
			}
		}
		catch(err) {
			checkofficers = '';
		}
	}
	
	if (thispage.indexOf('overview.php')!=-1) { 
		try {
			var bannerdiv = document.getElementById("combox_container");
			bannerdiv.innerHTML = '';
		}
		catch(err) {
			var bannerdiv =  '';
		}
	}
}