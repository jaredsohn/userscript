// ==UserScript==
// @name				Gruppen Invertierer
// @namespace			Group inverter
// @description			Liest die ausgewählte Gruppe in der Gruppen-Übersicht ein und invertiert die Auswahl, sodass man diese dann zu einer 	beliebigen Gruppe hinzufügen kann.
// @version			1.2
// @include			http://*.die-staemme.*/game.php?*screen=overview_villages*
// @include			http://*.staemme.*/game.php?*screen=overview_villages*

// ==/UserScript==


//***************************************************************************
//***                      Gruppen_invertieren.user.js
//**                       -----------------------
//*   author               : TM4rkuS
//**  copyright            : (C) Markus Rohlof
//***
//***************************************************************************


function _evaluate(path, context) {
	if(!context) {
		var context = document;
	}
	
	var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = [];
	for(var x = 0; x < XPath.snapshotLength; x++) {
		nodes.push(XPath.snapshotItem(x));
	}
	
	return nodes;
}

function _getCookie(name) {
	if(document.cookie.split(name + "=").length > 1) {
		var value = document.cookie.split(name + "=")[1].split(";")[0];
	} else {
		var value = false;
	}
	
	return value;
}

function getDoc() {
	var doc = document;
	if(top.frames.length > 1){
		if(top.frames[1].document.URL.match('game.php') =='game.php') {
			var doc = top.frames[1].document;
		} else {
			top.frames[0].document;
		}
	}
	
	return doc;
}

function getMode() {
	try {
		var mode = doc.getElementById("overview").value;
	} catch(e) {
		var mode = false;
	}
	
	return mode;
}

function getGroupIDs() {
return document.getElementsByName("selected_group");
}

function getGroupName() {
	var lnks = document.getElementsByTagName("strong");
	groupname = lnks[1].innerText;
	if (groupname != "alle")
	return groupname;
	else 
	return false;
}
	
function createMenu() {
	var mainTable = _evaluate('//[contains(@class, "row_")]/parent::tbody')[0];
	mainTable.id = "mainTable";
	
	var lnks = document.getElementsByTagName("a");
	var lnk = null;
	for(var i=0; i<lnks.length; i++){
		if(lnks[i].textContent.indexOf("Gruppen bearbeiten") != -1){
			lnk = lnks[i];
			break;
		}
	}
	
	var row = doc.createElement("tr");
	lnk.parentNode.insertBefore(row,lnk);	

	var cell = doc.createElement("td"); 
	cell.style.textAlign = "center";
	row.appendChild(cell);	
	
	if (getGroupName()) {
	var button = doc.createElement("input");
	var group_name = getGroupName();
	button.type = "button";
	button.id = "Einlesen";
	button.value = "Gruppe " + group_name + " Einlesen";
	button.addEventListener('click', read, false);
	cell.appendChild(button);
	}
	

	if(_getCookie("groupinverter") !== false) {
	var villages = _getCookie("groupinverter");
	var villages = villages.split(",");
	var button = doc.createElement("input");	
	button.type = "button";
	button.value = "Eingelesene Gruppe " + villages[0] + " invertieren";
	button.id = "Invertieren";
	button.addEventListener('click', function() {choose(false);}, false);
	cell.appendChild(button);
	}
if(_getCookie("groupinverter") !== false) {
	var villages = _getCookie("groupinverter");
	var villages = villages.split(",");
	var button = doc.createElement("input");	
	button.type = "button";
	button.value = "Eingelesene Gruppe " + villages[0] + " auswählen";
	button.id = "Invertieren";
	button.addEventListener('click', function() {choose(true);}, false);
	cell.appendChild(button);
	}	
	
	}
	
function choose(varify) {
	var rows = _evaluate('//tr[contains(@class, "row_")]');
	var invert_villages = "";
	var groupname = getGroupName();
	var villages = _getCookie("groupinverter");
	var villages = villages.split(",");
	var invert_button = document.getElementById("Invertieren");
	var change_check = false;
	for (var i = 0;i < rows.length;i++)
	{
	invert_button.value = "lädt... (" + (i+1) + "/" + (rows.length) +")";
	var cells = rows[i].getElementsByTagName("td");
	var vill_name = cells[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0];
	var id = vill_name.id.substring(11);
	var id_check = false;
	for (var j = 0; j < villages.length;j++)
	{
	if (villages[j] == id) 
	id_check = true;
	}
	if (id_check == varify)
		{
		var vill_name = cells[0].getElementsByTagName("Input");
		vill_name[0].checked = true;
		change_check = true;
		}
	}
	
	invert_button.value = "Eingelesene Gruppe >" + villages[0] + "< invertieren";
	if (change_check == true)
	window.alert("Dörferauswahl erfolgreich. Du kannst sie jetzt zu einer anderen Gruppen hinzufügen.");
	else
	window.alert("In der Dörferliste befindet sich kein Dorf, dass nicht in der Gruppe >" + villages[0] + "< ist. Hast du auch die Gruppe gewechselt?");
	}
	
function read() {
	
	var rows = _evaluate('//tr[contains(@class, "row_")]');
	var villages = "";
	var groupname = getGroupName();
	for (var i = 0;i < rows.length-1;i++)
	{
	var cells = rows[i].getElementsByTagName("td");
	var vill_name = cells[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0];
	var id = vill_name.id.substring(11);
	var villages = villages + id + ",";
	}
	var cells = rows[rows.length-1].getElementsByTagName("td");
	var vill_name = cells[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0];
	var id = vill_name.id.substring(11);
	villages = groupname + "," + villages + id;
	var date = new Date();
	date = new Date(date.getTime()+1000*60*60*24*365);
	doc.cookie = "groupinverter=" + villages + "; expires=" + date.toGMTString();
	location.reload();
	
	if(_getCookie("groupinverter") !== false)
	window.alert("Gruppe " + groupname + " wurde erfolgreich eingelesen");
	
}

(function main() {
		doc = getDoc();
	var mode = getMode();
	var groupname	
	if (mode == "groups")
	{
	createMenu();
	}
})();