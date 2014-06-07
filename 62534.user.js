// ==UserScript==
// @name           DS - Erinnerung *relaunch*
// @namespace      Die Stämme
// @description    Version 2.2 | Ermöglicht im Browsergame "Die Stämme" das hinterlegen von Erinnerungen, welche dann beim nächsten Login angezeigt werden. 
// @autor          fabi545
// @include        http://*.die-staemme.de/*
// @exclude        http://www.*
// ==/UserScript==

/*************************************************************************
* Dieses Userscript basiert auf folgendem Script von Roman S.(Zombie74): *
*        http://forum.die-staemme.de/showthread.php?t=102009             *
**************************************************************************/

function pa()
{
	var links = window.document.getElementsByTagName("a");
	for(var i=0; i<links.length; i++)
	{
		if(links[i].href.match(/screen=memo/))
		{	
			return(true);
		}
	}
	return(false);
};



function changeText()
{
	var erinnerung = window.document.getElementById('DS-Erinnerung');
	erinnerung.setAttribute("style", "display:none");
	
	var textfield = window.document.getElementById('DS-Textfield');
	textfield.setAttribute("style", "display:inline");
}	

function saveData()
{

	var checkbox = window.document.getElementsByName("AlleWelten")[0].checked;
	if(checkbox==true)
	{
		GM_setValue("AlleWelten", "ja");
		var dataName = "erinnerung";
	}
	else
	{
		GM_setValue("AlleWelten", "nein");
		var dataName = "erinnerung_"+welt;
	}	
	var url = document.location.href;
	window.location.href = url

	var text = window.document.getElementById("DS-Textfield").getElementsByTagName("input")[0].value;
	if(text!=0 && text!="undefined")
	{
		GM_setValue(dataName, text);
	}
	else
	{
		GM_deleteValue(dataName);
	}
}

	
	// Aktuell installierte Version:
	var vers_ist = "DS - Erinnerung *relaunch* 2.0";

	var vers = vers_ist.split(" ");
	var version = "";
	for(v=0; v<vers.length; v++) {
		if(v < vers.length-1) {
			version += vers[v] + " ";
			}
		else {
			version += "<span class='grey'>" + vers[v] + "</span>";
		}
	}
	
	// Aktueller Dateipfad:
	var url = document.location.href;
	
	// Welt:
	var teil = url.split(".");
	var welt = teil[0].replace("http://", "");
	

	
	if(!pa())
{
	if(url.match(/screen=settings&mode=settings/)) {
		var tr = new Array();
		tr[0] = document.createElement("tr");
		tr[1] = document.createElement("tr");
		var th = new Array();
		th[0] = document.createElement("th");
		var td = new Array();
		td[0] = document.createElement("td");
		td[1] = document.createElement("td");
		
		th[0].setAttribute("colspan", "2");
		th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=122107' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";

		td[1].setAttribute("colspan", "2");
		td[1].innerHTML = "Für dieses Script wird ein Premiumaccount benötigt!";
		
		tr[0].appendChild(th[0]);
		tr[1].appendChild(td[0]);
    
		document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
		document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
	}
}
else
{
	if((GM_getValue("AlleWelten")=="ja")||(GM_getValue("AlleWelten")==undefined))
	{
		var dataName = "erinnerung";
	}
	else
	{
		var dataName = "erinnerung_"+welt
	}
	
	//Logout link bearbeiten
	var link = window.document.getElementsByTagName('a')[0].href;
	window.document.getElementsByTagName('a')[0].href = url + "&script";
	


	// Einstellungen:
	if(url.match(/screen=settings&mode=settings/)) {
		    
		
		// Input-elemente werden erzeugt
		var input = new Array();
		input[0] = document.createElement("input");
		input[1] = document.createElement("input");
		input[2] = document.createElement("input");
		
		input[0].setAttribute("size", "64");
		input[0].setAttribute("type", "text");
		input[0].setAttribute("name", "DS-Erinnerung");
		input[0].setAttribute("value", GM_getValue(dataName));
		input[1].setAttribute("type", "checkbox");
		input[1].setAttribute("name", "AlleWelten");
		if((GM_getValue("AlleWelten") == "ja")||(GM_getValue("AlleWelten") == undefined)){input[1].setAttribute("checked", "checked");}	
		input[2].setAttribute("type", "button");
		input[2].setAttribute("value", "OK");
		input[2].addEventListener("click", saveData, false);
		
		
		// Span-elemente werden erzeugt
		var span = new Array();
		span[0] = document.createElement("span");
		span[1] = document.createElement("span");
		
		span[0].addEventListener("click", changeText, false);
		span[0].setAttribute("id", "DS-Erinnerung");
		span[1].setAttribute("style", "display:none;");
		span[1].setAttribute("id", "DS-Textfield");
		
		if((GM_getValue(dataName) == undefined)) 
		{
			span[0].setAttribute("class", "grey");
			span[0].innerHTML = "Momentan ist kein Erinnerungstext gespeichert";
		}
		else 
		{
			var erinnerung = GM_getValue(dataName);
			span[0].innerHTML = erinnerung;
		}
		span[1].appendChild(input[0]);
				
		
		// Td-elemente werden erzeugt
		var td = new Array();
		td[0] = document.createElement("td");
		td[1] = document.createElement("td");
		td[2] = document.createElement("td");
		td[3] = document.createElement("td");
		td[4] = document.createElement("td");
		td[5] = document.createElement("td");
		var th = new Array();
		th[0] = document.createElement("th");
		
		td[0].setAttribute("colspan", "2");
		td[0].setAttribute("class", "no_bg");
		td[5].setAttribute("colspan", "2");
		th[0].setAttribute("colspan", "2");
		
		td[0].innerHTML = "<br>";
		td[1].innerHTML = "Erinnerung:";
		td[2].appendChild(span[0]);
		td[2].appendChild(span[1]);
		td[3].innerHTML = "Alle Welten:";
		td[4].appendChild(input[1]);
		td[4].innerHTML += "Ein gemeinsamer Text für alle Spielwelten";
		td[5].appendChild(input[2]);
		th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=122107 target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
		
		
		// Tr-elemente werden erzeugt
		var tr = new Array();
		tr[0] = document.createElement("tr");
		tr[1] = document.createElement("tr");
		tr[2] = document.createElement("tr");
		tr[3] = document.createElement("tr");
		tr[4] = document.createElement("tr");
		
		tr[0].appendChild(td[0]);
		tr[1].appendChild(th[0]);
		tr[2].appendChild(td[1]);
		tr[2].appendChild(td[2]);
		tr[3].appendChild(td[3]);
		tr[3].appendChild(td[4]);
		tr[4].appendChild(td[5]);
		
		
		// Elemente werden in die Seite eingefügt
		document.getElementsByClassName("main")[0].getElementsByTagName("tbody")[3].appendChild(tr[0]);
		document.getElementsByClassName("main")[0].getElementsByTagName("tbody")[3].appendChild(tr[1]);
		document.getElementsByClassName("main")[0].getElementsByTagName("tbody")[3].appendChild(tr[2]);
		document.getElementsByClassName("main")[0].getElementsByTagName("tbody")[3].appendChild(tr[3]);
		document.getElementsByClassName("main")[0].getElementsByTagName("tbody")[3].appendChild(tr[4]);
	}




	// Logout:
	if(url.match(/script/)) {
		// Keine Erinnerung gespeichert:
		if(GM_getValue(dataName) == undefined) {
			if(confirm("DS - Erinnerung:\n\nMomentan ist keine Erinnerung gespeichert.\nMöchtest Du beim nächsten Login an etwas erinnert werden?")) {
				GM_setValue(dataName, prompt("Erinnerung:\nHier bitte den Text eingeben, welcher Dir beim nächsten Login als Erinnerung angezeigt werden soll."));
			}
		}
		// Erinnerung gespeichert:
		else {
			if(confirm("DS - Erinnerung:\n\nMomentan ist eine Erinnerung gespeichert.\nMöchtest Du den Erinnerungstext jetzt bearbeiten?")) {
				GM_setValue(dataName, prompt("Erinnerung:\nDies ist der gespeicherte Text, welcher Dir beim nächsten Login als Erinnerung angezeigt werden soll.", GM_getValue(dataName)));
			}
		}
		window.location.href = link;
	}


	// Login:
	if(url.match(/intro/)) {
		if(GM_getValue(dataName) != undefined) {
			if(confirm("DS - Erinnerung:\n--------------------------------------------------\n\n" + GM_getValue(dataName) + "\n\n--------------------------------------------------\nSoll die Erinnerung jetzt gelöscht werden?")) {
				GM_deleteValue(dataName);
			}
		}
		window.location.href = url.replace("&intro", "")
	}
}