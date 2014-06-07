// ==UserScript==
// @name				DSMoveReports
// @namespace			DSLife
// @author				knish3r
// @description			Version 1.6 | Das Skript filtert Berichte nach Eigenschaften und verschiebt diese (auch per Hotkeys) in dafür gesetzte Gruppen. Gruppenordner für das Verschieben der Berichte werden unter Einstellungen -> Einstellungen gesetzt.
// @include				http://*.die-staemme.de/game.php?*screen=report*
// @include				http://*.die-staemme.de/game.php?*screen=settings&mode=settings*
// @exclude				http://*.die-staemme.de/game.php?*screen=report*mode=forward*
// @exclude				http://*.die-staemme.de/game.php?*screen=report*mode=group_create*
// ==/UserScript==

/*Die Weiterentwicklung des Skripts bedarf der Zustimmung des Autors*/
(function DSMoveReports() {
if( !document.getElementById("quickbar_inner") ) return;
var lib = new Knish3rDSLib("DSMoveReports");

var gui = {
	de: {
		version: "1.6",
		settings: "Einstellungen",
		reportFolders: "   Berichteordner vollständig eingelesen (wenn der Punkt rot ist: ",
		importReportFolders: "Berichteordner einlesen",
		reportGroupAttribution: "Gruppenzuordnung:",
		fadeIn: "einblenden",
		fadeOut: "ausblenden",
		disable: "Deaktivieren",
		farmReportGroup: "Berichteordner für <b>Farmberichte</b>",
		forwardedReportGroup: "Berichteordner für <b>weitergeleitete Berichte</b>",
		spyReportGroup: "Berichteordner für <b>Spähberichte</b>",
		attsReportGroup: "Berichteordner für <b>eigene Angriffsberichte</b>",
		incomingsReportGroup: "Berichteordner für <b>Incomings</b>",
		conquestReportGroup: "Berichteordner für <b>eigene Adelungen</b>",
		attsOnSupportReportGroup: "Berichteordner für <b>Angriffe auf Unterstützungen</b>",
		restReportGroup: "Berichteordner für <b>sonstige Berichte</b>",
		keyButton: "Nach welchem Keyword soll gefiltert werden?",
		keyGroupButton: "In welche Gruppe sollen die gefilterten Berichte verschoben werden?",
		saveButton: "Speichern",
		tab: "<span style='white-space:pre'>&#9;</span>",
		settingsSaved: "DSMoveReports-Einstellungen wurden gespeichert!",
		reportFoldersImported: "Berichteordner wurden gespeichert!",
		deleteButton: "Daten löschen",
		confirm_delAll: "Sollen die Daten der aktuellen Welt wirklich gelöscht werden?",
		allDataDeleted: "Alle Daten gelöscht!",
		start: 'Mit Klick auf "OK" werden die benötigte Berichteordner für DSMoveReports ausgelesen!',
		moveBB: "Farmen verschieben [F]",
		moveForwarded: "Weitergeleitete [W]",
		moveAtts: "Atts verschieben [A]",
		moveSpys: "Spähs verschieben [S]",
		moveIncomings: "Incomings verschieben [I]",
		moveConquest: "Adelungen verschieben [C]",
		moveAttsOnSupport: "Atts auf Unterstütz. [U]",
		moveRest: "Sonstige Berichte [Y]",
		moveKeyWord: "Nach Keyword filtern [X]",
		deleteReports: "Berichte löschen [L]",
		noGroupSet: "Sie müssen erst noch einen Gruppennamen angeben, in den die Berichte verschoben werden sollen!",
		noExistentGroup: "Sie müssen einen Gruppennamen angeben, der existiert!",
		alreadyInGroup: "Die Berichte befinden sich bereits in der angegebenen Gruppe!",
		noKeywordReports: "Keine Berichte mit dem eingegebenen Keyword vorhanden!",
	}
};
var regExp = {
	de: {
		newr: /neu/,
		conquers: "erobert",
		bonusVillage: "Bonusdorf",
		barbarianVillage: "Barbarendorf",	
		attacks: "greift",
		supportIsAttacked: ["Deine Unterstützung aus","in","wurde angegriffen"],
		move: "Verschieben",
		deleteAll: "Löschen",
		newReports: "Neue Berichte",
		createFolder: "Ordner erstellen",
	}
}

if( lib.storage.getValue("keywords",undefined) == undefined ) {
	lib.storage.setValue("keywords", ";");
	alert(gui[lib.lang].start);
	location.href = getReportGroups_Link();
}

var settingNames = [ 
			"farmReportGroup",
			"forwardedReportGroup",
			"attsReportGroup",
			"spyReportGroup",
			"incomingsReportGroup",
			"conquestReportGroup",
			"attsOnSupportReportGroup",
			"restReportGroup",]
var defaultCheckboxes = {
		groupsImported: false,
		disableFarmReportGroup: false,
		disableForwardedReportGroup: false,
		disableAttsReportGroup: false,
		disableSpyReportGroup: false,
		disableIncomingsReportGroup: false,
		disableConquestReportGroup: false,
		disableAttsOnSupportGroup: false,
		disableRestReportGroup: false,
		fadedIn: false,
};			
var settings = getSettings();
var reportGroups = lib.storage.getValue("reportGroups_player.id:" + lib.game_data.player.id,"").split(";");

function getSettings() {
	var value = lib.storage.getValue("settings_player.id:"+lib.game_data.player.id,'0;0;0;0;0;0;0;0').split(";");
	var valueSettings = new Array(settingNames.length);
	for( var x = 0 ; x < settingNames.length ; x++)
		valueSettings[settingNames[x]] = parseInt(value[x], 10);
	return valueSettings;
}

function saveSettings() {
	for( var x = 0 ; x < settingNames.length ; x++ ) {
		var input = document.getElementById("DSMoveReports_" + settingNames[x]);
		if( !input ) settings[settingNames[x]] = 0;
		else settings[settingNames[x]] = parseInt(input.value, 10);}
	var strValue = "";
	for( var i = 0 ; i<settingNames.length ; i++ ) {
		if( strValue.length > 0 ) strValue += ";";
		strValue += settings[settingNames[i]];};
	lib.storage.setValue("settings_player.id:" + lib.game_data.player.id,strValue);
	var checkboxes = lib.storage.getValue("checkboxes_player.id:"+lib.game_data.player.id,defaultCheckboxes);
	checkboxes.disableFarmReportGroup = document.getElementById("DSMoveReports_disableFarmReportGroup").checked;
	checkboxes.disableForwardedReportGroup = document.getElementById("DSMoveReports_disableForwardedReportGroup").checked;
	checkboxes.disableAttsReportGroup = document.getElementById("DSMoveReports_disableAttsReportGroup").checked;
	checkboxes.disableSpyReportGroup = document.getElementById("DSMoveReports_disableSpyReportGroup").checked;
	checkboxes.disableIncomingsReportGroup = document.getElementById("DSMoveReports_disableIncomingsReportGroup").checked;
	checkboxes.disableConquestReportGroup = document.getElementById("DSMoveReports_disableConquestReportGroup").checked;
	checkboxes.disableAttsOnSupportGroup = document.getElementById("DSMoveReports_disableAttsOnSupportGroup").checked;
	checkboxes.disableRestReportGroup = document.getElementById("DSMoveReports_disableRestReportGroup").checked;
	lib.storage.setValue("checkboxes_player.id:"+lib.game_data.player.id,checkboxes);
	alert( gui[lib.lang].settingsSaved );
}

function getAllReports() {
	var reportElements = lib.xPath('//span[contains(@id, "labelText")]');
	var reports = [];
	
	for(var x = 0; x < reportElements.length; x++) {
		var Report =  new function() {
			this.name = ''; this.id = 0; this.green = 0; this.yellow = 0; this.red = 0;
			this.blue = 0; this.read = 0; this.text = 0; this.empty = 0; this.forwarded = 0;
		}
		Report.name = reportElements[x].textContent;
		Report.id = reportElements[x].id.replace(/labelText_/, "");
		if(reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nodeName == 'IMG'){
			if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.src.indexOf('green.png')>0) {Report.green = 1;};
			if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.src.indexOf('yellow.png')>0) {Report.yellow = 1;};
			if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.src.indexOf('red.png')>0) {Report.red = 1;};
			if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.src.indexOf('blue.png')>0) {Report.blue = 1;};
			if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.src.indexOf('forwarded.png')>0) {Report.forwarded = 1;};
			if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nodeName == 'SPAN') {
				Report.empty = 1;
			}
		}
		else Report.text = 1;
		if ( reportElements[x].parentNode.parentNode.parentNode.parentNode.getElementsByTagName("td")[0].textContent.match(regExp[lib.lang].newr) ) Report.read = 1;
		reports.push(Report);
	}	
	return reports;
}

/* functions */
function setCheck(rid) {document.getElementsByName('id_' + rid)[0].checked = true;}
function removeCheck(rid) {document.getElementsByName('id_' + rid)[0].checked = false;}
function getCurrentGroup() {return document.getElementsByTagName("strong")[0].textContent.replace(/^\s*|\&gt\;|\&lt\;|\s*$|>|</g, "");}

function getReportGroups_Link() {
	if( lib.game_data.player.sitter_id == 0 )
		var link = 'http://' + lib.game_data.world + '.die-staemme.de/game.php?village=' + lib.game_data.village.id + '&screen=report&mode=all&group_id=0';
	else var link = 'http://' + lib.game_data.world + '.die-staemme.de/game.php?village=' + lib.game_data.village.id + '&screen=report&mode=all&group_id=0&t=' 
		+ lib.game_data.player.id;
	return link;
}

function getDotLink() {
	if( lib.storage.getValue("checkboxes_player.id:" + lib.game_data.player.id,defaultCheckboxes).groupsImported )
		var link =  '/graphic/dots/green.png?1';
	else var link = '/graphic/dots/red.png?1';
	return link;
}

function selectGroup(groupname) {
	try {
		var options = document.getElementsByName("group_id")[0].getElementsByTagName("option");
		var selected = false;	
		for(var x = 0; x < options.length; x++) {
			if(options[x].textContent == groupname) {
				options[x].selected = true;
				selected = true;}
		}	
		return selected;
	} catch(e) {return false;}
}

function moveBB() {
	var groupnameIndex = settings.farmReportGroup;
	var groupname = reportGroups[groupnameIndex];
	var reports = getAllReports(), checks = 0;
	
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].green || reports[x].yellow) {
				if ( reports[x].name.match(regExp[lib.lang].barbarianVillage) || reports[x].name.match(regExp[lib.lang].bonusVillage) ) {
					if ( reports[x].name.match(lib.game_data.player.name) && !reports[x].name.match(regExp[lib.lang].conquers) ) {
						setCheck(reports[x].id); checks++; }
					else removeCheck(reports[x].id);}
				else removeCheck(reports[x].id);}
		else removeCheck(reports[x].id);
		for( var i=0 ; i<moveBBIDs.length ; i++ ) {
			if( moveBBIDs[i].match(reports[x].id) ) {setCheck(reports[x].id);checks++;}}
		for( var i=0 ; i<moveAttsIDs.length ; i++ ) {
			if( moveAttsIDs[i].match(reports[x].id) ) removeCheck(reports[x].id);}
		for( var i=0 ; i<moveSpyIDs.length ; i++ ) {
			if( moveSpyIDs[i].match(reports[x].id) ) removeCheck(reports[x].id);}
	}

	var error = (checks === 0 ? true : false);
	if(groupname === '') error = gui[lib.lang].noGroupSet;
	else if(getCurrentGroup() == groupname) error = gui[lib.lang].alreadyInGroup;
	else if(selectGroup(groupname) === false) error = gui[lib.lang].noExistentGroup;
	if(error === false) lib.xPath('//input[@value="'+regExp[lib.lang].move+'"]')[0].click();
	else if( error === true ) return;
	else {for(var x = 0; x < reports.length; x++)
		removeCheck(reports[x].id); window.alert(error);}	
}

function moveConquest() {
	var groupnameIndex = settings.conquestReportGroup;
	var groupname = reportGroups[groupnameIndex];
	var reports = getAllReports(), checks = 0;
	
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].green || reports[x].yellow) {
				if ( reports[x].name.match(regExp[lib.lang].conquers) && reports[x].name.match(lib.game_data.player.name) ) {
						setCheck(reports[x].id); checks++; }
				else removeCheck(reports[x].id);}
		else removeCheck(reports[x].id);
	}
	
	var error = (checks === 0 ? true : false);
	if(groupname === '') error = gui[lib.lang].noGroupSet;
	else if(getCurrentGroup() == groupname) error = gui[lib.lang].alreadyInGroup;
	else if(selectGroup(groupname) === false) error = gui[lib.lang].noExistentGroup;
	if(error === false) lib.xPath('//input[@value="'+regExp[lib.lang].move+'"]')[0].click();
	else if( error === true ) return;
	else {for(var x = 0; x < reports.length; x++)
		removeCheck(reports[x].id); window.alert(error);}	
}

function moveAtts() {
	var groupnameIndex = settings.attsReportGroup;
	var groupname = reportGroups[groupnameIndex];
	var reports = getAllReports(), checks = 0;
	
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].green || reports[x].yellow || reports[x].red ) {
				if ( reports[x].name.match(regExp[lib.lang].attacks) && reports[x].name.match(lib.game_data.player.name) ) {
						if ( reports[x].red || reports[x].blue) {
							setCheck(reports[x].id); checks++; }
						else if ( reports[x].name.match(regExp[lib.lang].barbarianVillage) || reports[x].name.match(regExp[lib.lang].bonusVillage) ) {
							removeCheck(reports[x].id); }
						else {setCheck(reports[x].id); checks++; }}	
				else removeCheck(reports[x].id); }
		else removeCheck(reports[x].id);
		for( var i=0 ; i<moveBBIDs.length ; i++ ) {
			if( moveBBIDs[i].match(reports[x].id) ) removeCheck(reports[x].id);}
		for( var i=0 ; i<moveAttsIDs.length ; i++ ) {
			if( moveAttsIDs[i].match(reports[x].id) ) {setCheck(reports[x].id);checks++}}
		for( var i=0 ; i<moveSpyIDs.length ; i++ ) {
			if( moveSpyIDs[i].match(reports[x].id) ) removeCheck(reports[x].id);}
	}
	
	var error = (checks === 0 ? true : false);
	if(groupname === '') error = gui[lib.lang].noGroupSet;
	else if(getCurrentGroup() == groupname) error = gui[lib.lang].alreadyInGroup;
	else if(selectGroup(groupname) === false) error = gui[lib.lang].noExistentGroup;
	if(error === false) lib.xPath('//input[@value="'+regExp[lib.lang].move+'"]')[0].click();
	else if( error === true ) return;
	else {for(var x = 0; x < reports.length; x++)
		removeCheck(reports[x].id); window.alert(error);}
}

function moveSpys() {
	var groupnameIndex = settings.spyReportGroup;
	var groupname = reportGroups[groupnameIndex];
	var reports = getAllReports(), checks = 0;

	for(var x = 0; x < reports.length; x++) {
		if( reports[x].blue ) { setCheck(reports[x].id); checks++; }
		else removeCheck(reports[x].id);
		for( var i=0 ; i<moveBBIDs.length ; i++ ) {
			if( moveBBIDs[i].match(reports[x].id) ) removeCheck(reports[x].id);}
		for( var i=0 ; i<moveAttsIDs.length ; i++ ) {
			if( moveAttsIDs[i].match(reports[x].id) ) removeCheck(reports[x].id);}
		for( var i=0 ; i<moveSpyIDs.length ; i++ ) {
			if( moveSpyIDs[i].match(reports[x].id) ) {setCheck(reports[x].id);checks++;}}
	}
	
	var error = (checks === 0 ? true : false);
	if(groupname === '') error = gui[lib.lang].noGroupSet;
	else if(getCurrentGroup() == groupname) error = gui[lib.lang].alreadyInGroup;
	else if(selectGroup(groupname) === false) error = gui[lib.lang].noExistentGroup;
	if(error === false) lib.xPath('//input[@value="'+regExp[lib.lang].move+'"]')[0].click();
	else if( error === true ) return;
	else {for(var x = 0; x < reports.length; x++)
		removeCheck(reports[x].id); window.alert(error);}
}

function moveIncs() {
	var groupnameIndex = settings.incomingsReportGroup;
	var groupname = reportGroups[groupnameIndex];
	var reports = getAllReports(), checks = 0;
	
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].green || reports[x].yellow || reports[x].red || reports[x].blue) {
			if ( reports[x].name.match(regExp[lib.lang].attacks) || reports[x].name.match(regExp[lib.lang].conquers) ) {
				if ( reports[x].name.match(lib.game_data.player.name) ) { removeCheck(reports[x].id); }
				else { setCheck(reports[x].id); checks++; }}
			else removeCheck(reports[x].id); }
		else removeCheck(reports[x].id);
	}
	
	var error = (checks === 0 ? true : false);
	if(groupname === '') error = gui[lib.lang].noGroupSet;
	else if(getCurrentGroup() == groupname) error = gui[lib.lang].alreadyInGroup;
	else if(selectGroup(groupname) === false) error = gui[lib.lang].noExistentGroup;
	if(error === false) lib.xPath('//input[@value="'+regExp[lib.lang].move+'"]')[0].click();
	else if( error === true ) return;
	else {for(var x = 0; x < reports.length; x++)
		removeCheck(reports[x].id); window.alert(error);}
}

function moveAttsOnSupport() {
	var groupnameIndex = settings.attsOnSupportReportGroup;
	var groupname = reportGroups[groupnameIndex];
	var reports = getAllReports(),  checks = 0;
	
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].green || reports[x].yellow || reports[x].red || reports[x].blue) {
				if ( reports[x].name.match(regExp[lib.lang].supportIsAttacked[0]) && reports[x].name.match(regExp[lib.lang].supportIsAttacked[1]) 
					&& reports[x].name.match(regExp[lib.lang].supportIsAttacked[2]) ) {
						setCheck(reports[x].id); checks++; }
				else removeCheck(reports[x].id); }
		else removeCheck(reports[x].id);
	}
	
	var error = (checks === 0 ? true : false);
	if(groupname === '') error = gui[lib.lang].noGroupSet;
	else if(getCurrentGroup() == groupname) error = gui[lib.lang].alreadyInGroup;
	else if(selectGroup(groupname) === false) error = gui[lib.lang].noExistentGroup;
	if(error === false) lib.xPath('//input[@value="'+regExp[lib.lang].move+'"]')[0].click();
	else if( error === true ) return;
	else {for(var x = 0; x < reports.length; x++)
		removeCheck(reports[x].id); window.alert(error);}
}

function moveForwarded() {
	var groupnameIndex = settings.forwardedReportGroup;
	var groupname = reportGroups[groupnameIndex];
	var reports = getAllReports(), checks = 0;
	
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].forwarded) { setCheck(reports[x].id); checks++;} 
		else removeCheck(reports[x].id);
	}
	
	var error = (checks === 0 ? true : false);
	if(groupname === '') error = gui[lib.lang].noGroupSet;
	else if(getCurrentGroup() == groupname) error = gui[lib.lang].alreadyInGroup;
	else if(selectGroup(groupname) === false) error = gui[lib.lang].noExistentGroup;
	if(error === false) lib.xPath('//input[@value="'+regExp[lib.lang].move+'"]')[0].click();
	else if( error === true ) return;
	else {for(var x = 0; x < reports.length; x++)
		removeCheck(reports[x].id); window.alert(error);}	
}

function moveRest() {
	var groupnameIndex = settings.restReportGroup;
	var groupname = reportGroups[groupnameIndex];
	var reports = getAllReports(), checks = 0;
	
	for(var x = 0; x < reports.length; x++) {
		if(reports[x].text) { setCheck(reports[x].id); checks++;} 
		else removeCheck(reports[x].id);
	}
	
	var error = (checks === 0 ? true : false);
	if(groupname === '') error = gui[lib.lang].noGroupSet;
	else if(getCurrentGroup() == groupname) error = gui[lib.lang].alreadyInGroup;
	else if(selectGroup(groupname) === false) error = gui[lib.lang].noExistentGroup;
	if(error === false) lib.xPath('//input[@value="'+regExp[lib.lang].move+'"]')[0].click();
	else if( error === true ) return;
	else {for(var x = 0; x < reports.length; x++)
		removeCheck(reports[x].id); window.alert(error);}	
}

function moveKeyWord() {
	var keywords = lib.storage.getValue("keywords","");
	keywords = keywords.split(";");
	
	var keyword = window.prompt( gui[lib.lang].keyButton,keywords[0]);
	if( keyword == null || keyword == "" ) return false;
	else {
		lib.storage.setValue("keywords",keyword + ";" + keyword[1]);
		var keyGroup = window.prompt( gui[lib.lang].keyGroupButton,keywords[1] );
		if( keyGroup == null || keyGroup == "" ) return false;
		else {
			lib.storage.setValue("keywords",keyword + ";" + keyGroup);
			var reports = getAllReports(), checks = 0;
			var regExpr = new RegExp(keyword, "i");
			for(var x = 0; x < reports.length; x++) {
				if( reports[x].name.match(regExpr) ) {
					setCheck(reports[x].id); checks++;} 
				else removeCheck(reports[x].id); 
			}
			var error = (checks === 0 ? gui[lib.lang].noKeywordReports : false );
			if(keyGroup === '') var error =gui[lib.lang].noGroupSet;
			else if(getCurrentGroup() == keyGroup) var error = gui[lib.lang].alreadyInGroup;
			else if(selectGroup(keyGroup) === false) var error = gui[lib.lang].noExistentGroup;	
			if(error === false) lib.xPath('//input[@value="'+regExp[lib.lang].move+'"]')[0].click();
			else {for(var x = 0; x < reports.length; x++)
				removeCheck(reports[x].id); window.alert(error);}	
		}
	}
}

function deleteAll() {
	var reports = getAllReports();
	for(var x = 0; x < reports.length; x++)
		setCheck(reports[x].id);
	lib.xPath('//input[@value="'+regExp[lib.lang].deleteAll+'"]')[0].click();
}

if( location.href.match(/screen=report/) && location.href.match(/view=/) ) {
	var labelText = document.getElementById("labelText").textContent;
	var graphic = document.getElementById("label").parentNode.getElementsByTagName("img")[0].src;
	if( labelText.match(regExp[lib.lang].conquers) || labelText.match(regExp[lib.lang].supportIsAttacked[0]) || !labelText.match(lib.game_data.player.name) 
		|| graphic.match(/forwarded.png/) || graphic.match(/rename/) || graphic.match(/red/) ) return;
	else {
		var img = document.getElementById("attack_info_att_units").getElementsByClassName("center")[0].getElementsByTagName("img");
		var spyindex = 0;
		for( var i=0 ; i< img.length ; i++) {if( img[i].src.match("unit_spy") ) {spyindex = i; break;}}
		if( document.getElementById("attack_info_def").getElementsByTagName("th")[1].textContent == "---" ) {
			var attack = document.getElementById("attack_info_att_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
			if( attack[attack.length-1].textContent != 0 ) {lib.saveReportIDs("moveAttsIDs"); return;}
			var troops = document.getElementById("attack_info_def_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
			var matchTroops = false;
			for( var i=1 ; i<troops.length ; i++ ) { if( troops[i].textContent != 0 ) matchTroops = true; }
			if( matchTroops ) {
				troops = document.getElementById("attack_info_att_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
				var max = 0, spy = parseInt(troops[spyindex+1].textContent,10);
				for( var i=1 ; i<troops.length ; i++ ) {
					if( parseInt(troops[i].textContent,10) > max ) max=parseInt(troops[i].textContent,10);} 
				if( spy >= max && max != 0 ) {lib.saveReportIDs("moveSpyIDs"); return; }
				else {lib.saveReportIDs("moveAttsIDs"); return;}
			}
			if( graphic.match(/blue.png/) ) lib.saveReportIDs("moveBBIDs");	
		}
		else if( graphic.match(/blue.png/) ) {
			var troops = document.getElementById("attack_info_att_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
			var max = 0, spy = parseInt(troops[spyindex+1].textContent,10);
			for( var i=1 ; i<troops.length ; i++ ) {
				if( parseInt(troops[i].textContent,10) > max ) max=parseInt(troops[i].textContent,10);} 			
			if( !(spy >= max && max != 0) && troops[troops.length-1].textContent != 0 ) {lib.saveReportIDs("moveAttsIDs"); return;}
		}
		else {
			var troops = document.getElementById("attack_info_att_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
			var max = 0, spy = parseInt(troops[spyindex+1].textContent,10);
			for( var i=1 ; i<troops.length ; i++ ) {
				if( parseInt(troops[i].textContent,10) > max ) max=parseInt(troops[i].textContent,10);} 		
			if( spy >= max && max != 0 ) {lib.saveReportIDs("moveSpyIDs"); return;}	
		} 
	}
}

if( document.URL.match(/screen=report/) && !document.URL.match(/view=/) ) {
	var readIn=false;
	if( (getAllReports().length  == 0) && getCurrentGroup() == regExp[lib.lang].newReports ) {
		var groups = document.getElementsByClassName("vis")[1].getElementsByTagName("a");
		var groupsLength=0;
		for( var i = 0 ; i<groups.length ; i++) {
			var value =  groups[i].textContent;
			if(value.match(regExp[lib.lang].createFolder) ) groupsLength = i;}
		var saveGroups="";
		for( var x = 0 ; x<groupsLength ; x++) {
			var value =  groups[x].textContent;
			var value2 = value.substr(2, value.length-4);
			saveGroups += value2 + ";";}
		saveGroups = saveGroups.substr(0, saveGroups.length-1); readIn=true;
	} else if( getAllReports().length != 0 ) {
		var groups = document.getElementsByName("group_id")[0].getElementsByTagName("option"); readIn=true;
		for( var x=0 ; x<groups.length ; x++ ) { if( groups[x].value==0 ) readIn=false; }
		var saveGroups = "";
		for( var x = 0 ; x<groups.length ; x++) {
			var value =  groups[x].textContent; saveGroups += value + ";";}
		saveGroups = saveGroups.substr(0, saveGroups.length-1);
	}
	if( readIn ) {
	if( !lib.storage.getValue("checkboxes_player.id:" + lib.game_data.player.id,false).groupsImported ) {
		alert(gui[lib.lang].reportFoldersImported);
		lib.storage.setValue("reportGroups_player.id:" + lib.game_data.player.id,saveGroups);
		var checkboxes=lib.storage.getValue("checkboxes_player.id:" + lib.game_data.player.id,defaultCheckboxes);
		checkboxes.groupsImported=true;
		lib.storage.setValue("checkboxes_player.id:" + lib.game_data.player.id, checkboxes);
	} else {
		var keys = lib.storage.getValue("reportGroups_player.id:" + lib.game_data.player.id,"");
		if( keys != saveGroups ) lib.storage.setValue("reportGroups_player.id:" + lib.game_data.player.id,saveGroups);
	}}

	var moveBBIDs = lib.storage.getValue("moveBBIDs:"+lib.game_data.player.id,"").split(";");
	var moveAttsIDs = lib.storage.getValue("moveAttsIDs:"+lib.game_data.player.id,"").split(";");
	var moveSpyIDs = lib.storage.getValue("moveSpyIDs:"+lib.game_data.player.id,"").split(";");

	var container = document.createElement("table");
	container = container.appendChild(document.createElement("table"));
	document.getElementsByClassName("vis")[0].appendChild(container);
	container.style.width = "195px";
	var row, cell, checkboxes = lib.storage.getValue("checkboxes_player.id:"+lib.game_data.player.id,defaultCheckboxes);

	if( !checkboxes.disableFarmReportGroup ) {
	row = container.insertRow(container.rows.length);
	cell = row.insertCell(0);	
	var a = cell.appendChild(document.createElement("a"));
	a.innerHTML += gui[lib.lang].moveBB;
	a.id = "moveBB";
	a.href = "javascript:;";
	a.addEventListener( "click", moveBB, false );
	lib.hotkeys.keys.push( { key: 70, event: { id: "moveBB", event: "click" } } );}

	if( !checkboxes.disableForwardedReportGroup ) {
	row = container.insertRow(container.rows.length);
	cell = row.insertCell(0);	
	a = cell.appendChild(document.createElement("a"));
	a.innerHTML += gui[lib.lang].moveForwarded;
	a.id = "moveForwarded";
	a.href = "javascript:;";
	a.addEventListener( "click", moveForwarded, false );
	lib.hotkeys.keys.push( { key: 87, event: { id: "moveForwarded", event: "click" } } );}

	if( !checkboxes.disableAttsReportGroup ) {
	row = container.insertRow(container.rows.length);
	cell = row.insertCell(0);	
	a = cell.appendChild(document.createElement("a"));
	a.innerHTML += gui[lib.lang].moveAtts;
	a.id = "moveAtts";
	a.href = "javascript:;";
	a.addEventListener( "click", moveAtts, false );
	lib.hotkeys.keys.push( { key: 65, event: { id: "moveAtts", event: "click" } } );}

	if( !checkboxes.disableSpyReportGroup ) {
	row = container.insertRow(container.rows.length);
	cell = row.insertCell(0);	
	a = cell.appendChild(document.createElement("a"));
	a.innerHTML += gui[lib.lang].moveSpys;
	a.id = "moveSpys";
	a.href = "javascript:;";
	a.addEventListener( "click", moveSpys, false );
	lib.hotkeys.keys.push( { key: 83, event: { id: "moveSpys", event: "click" } } );}

	if( !checkboxes.disableIncomingsReportGroup ) {
	row = container.insertRow(container.rows.length);
	cell = row.insertCell(0);	
	a = cell.appendChild(document.createElement("a"));
	a.innerHTML += gui[lib.lang].moveIncomings;
	a.id = "moveIncs";
	a.href = "javascript:;";
	a.addEventListener( "click", moveIncs, false );
	lib.hotkeys.keys.push( { key: 73, event: { id: "moveIncs", event: "click" } } );}

	if( !checkboxes.disableConquestReportGroup ) {
	row = container.insertRow(container.rows.length);
	cell = row.insertCell(0);	
	a = cell.appendChild(document.createElement("a"));
	a.innerHTML += gui[lib.lang].moveConquest;
	a.id = "moveConquest";
	a.href = "javascript:;";
	a.addEventListener( "click", moveConquest, false );
	lib.hotkeys.keys.push( { key: 67, event: { id: "moveConquest", event: "click" } } );}

	if( !checkboxes.disableAttsOnSupportGroup ) {
	row = container.insertRow(container.rows.length);
	cell = row.insertCell(0);	
	a = cell.appendChild(document.createElement("a"));
	a.innerHTML += gui[lib.lang].moveAttsOnSupport;
	a.id = "moveAttsOnSupport";
	a.href = "javascript:;";
	a.addEventListener( "click", moveAttsOnSupport, false );
	lib.hotkeys.keys.push( { key: 85, event: { id: "moveAttsOnSupport", event: "click" } } );}

	if( !checkboxes.disableRestReportGroup ) {
	row = container.insertRow(container.rows.length);
	cell = row.insertCell(0);	
	a = cell.appendChild(document.createElement("a"));
	a.innerHTML += gui[lib.lang].moveRest;
	a.id = "moveRest";
	a.href = "javascript:;";
	a.addEventListener( "click", moveRest, false );
	lib.hotkeys.keys.push( { key: 89, event: { id: "moveRest", event: "click" } } );}

	row = container.insertRow(container.rows.length);
	cell = row.insertCell(0);	
	a = cell.appendChild(document.createElement("a"));
	a.innerHTML += gui[lib.lang].moveKeyWord;
	a.id = "moveKeyWord";
	a.href = "javascript:;";
	a.addEventListener( "click", moveKeyWord, false );
	lib.hotkeys.keys.push( { key: 88, event: { id: "moveKeyWord", event: "click" } } );

	row = container.insertRow(container.rows.length);
	cell = row.insertCell(0);	
	a = cell.appendChild(document.createElement("a"));
	a.innerHTML += gui[lib.lang].deleteReports;
	a.id = "deleteAll";
	a.href = "javascript:;";
	a.addEventListener( "click", deleteAll, false );
	lib.hotkeys.keys.push( { key: 76, event: { id: "deleteAll", event: "click" } } );
}


if(document.URL.match(/screen=settings&mode=settings/) ) {	
	var e = document.getElementsByTagName("h3");
	for( var i = 0; i < e.length; e++ ) {
		if( new RegExp(gui[lib.lang].settings).test(e[i].innerHTML) ) {
			e = e[i].parentNode; break;
	}}
  	var p = e.appendChild(document.createElement("p"));
  	e = p.appendChild(document.createElement("form"));
	e.id="DSMoveReportsSettings";
	e.action = "javascript:;";
	e = e.appendChild(document.createElement("table"));
	e.className="vis";
	e.style.border = "1px solid rgb(222, 211, 185)";
	e.style.width = "700px";
	var row = e.insertRow(e.rows.length);
	var cell = row.appendChild(document.createElement("th"));
	cell.innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=137016' target='_blank'>DSMoveReports "+ gui[lib.lang].version + "</a>";
	row = e.insertRow(e.rows.length);
	cell = row.insertCell(0);
	cell.innerHTML += '<tr><td colspan="2"><img src="' + getDotLink() + '">' + gui[lib.lang].reportFolders +
					 '<a href="' + getReportGroups_Link() + '" id="reportGroupLink">' + gui[lib.lang].importReportFolders + '</a>)</td></tr>';
	var reportGroupLink = document.getElementById("reportGroupLink");
	reportGroupLink.addEventListener("click", function() {
			var checkboxes = lib.storage.getValue("checkboxes_player.id:"+lib.game_data.player.id,defaultCheckboxes); checkboxes.groupsImported=false;
			lib.storage.setValue("checkboxes_player.id:" + lib.game_data.player.id, checkboxes) }, false );
	row = e.insertRow(e.rows.length);
	cell = row.insertCell(0);

	var section = cell.appendChild(document.createElement("table"));
	section.className="vis";
	section.style.border = "1px solid rgb(222, 211, 185)";
	section.style.width = "100%";
	section.style.whiteSpace = "noWrap";
	section.id="DSMoveReportsGroupAttribution";
	var sectionTitle = section.appendChild(document.createElement("tr"));
	var th = sectionTitle.appendChild(document.createElement("th"));
	th.colSpan = 2;
	th.innerHTML = gui[lib.lang].reportGroupAttribution+" ";
	var a = th.appendChild(document.createElement("a"));
	a.href = "javascript:;";
	var fadedIn = lib.storage.getValue("checkboxes_player.id:"+lib.game_data.player.id,defaultCheckboxes).fadedIn;
	if( fadedIn) a.innerHTML = "( "+gui[lib.lang].fadeOut+" )";
	else a.innerHTML = "( "+gui[lib.lang].fadeIn+" )";
	a.addEventListener("click", function(){ 
			var checkboxes = lib.storage.getValue("checkboxes_player.id:"+lib.game_data.player.id,defaultCheckboxes);
			var block = document.getElementById("DSMoveReportsGroupAttributionContent");
			if( block.style.display == "none" ) {
				block.style.display = "block";
				a.innerHTML = "( "+gui[lib.lang].fadeOut+" )";
				checkboxes.fadedIn = true;
			}
			else {
				block.style.display = "none";
				a.innerHTML = "( "+gui[lib.lang].fadeIn+" )";
				checkboxes.fadedIn = false;
			}
			 lib.storage.setValue("checkboxes_player.id:"+lib.game_data.player.id,checkboxes);
	}, false);
	var sectionRow = section.appendChild(document.createElement("tr"));

	var checkboxes = lib.storage.getValue("checkboxes_player.id:"+lib.game_data.player.id,defaultCheckboxes);
	var html = '<tr><td width="100%"><select id="DSMoveReports_farmReportGroup">';
	for( var x = 0 ; x <reportGroups.length ; x++ )
		html += '<option value="'+x+'"'+(settings.farmReportGroup == x ?' selected="selected"':'')+'>'+reportGroups[x]+'</option>';
	html += '</select>' + gui[lib.lang].tab + gui[lib.lang].farmReportGroup + '</td><td style="text-align:right">';
	html+= '<input type="checkbox" id="DSMoveReports_disableFarmReportGroup"';
	html += (checkboxes.disableFarmReportGroup ? 'checked="checked"':'')+'/>'+gui[lib.lang].disable+'</td></tr>';

	html += '<tr><td width="100%"><select id="DSMoveReports_forwardedReportGroup">';
	for( var x = 0 ; x <reportGroups.length ; x++ )
		html += '<option value="'+x+'"'+(settings.forwardedReportGroup == x ?' selected="selected"':'')+'>'+reportGroups[x]+'</option>';
	html += '</select>' + gui[lib.lang].tab + gui[lib.lang].forwardedReportGroup + '</td><td style="text-align:right">';
	html += '<input type="checkbox" id="DSMoveReports_disableForwardedReportGroup"';
	html += (checkboxes.disableForwardedReportGroup ? 'checked="checked"':'')+'/>'+gui[lib.lang].disable+'</td></tr>';

	html += '<tr><td width="100%"><select id="DSMoveReports_attsReportGroup">';
	for( var x = 0 ; x <reportGroups.length ; x++ )
		html += '<option value="'+x+'"'+(settings.attsReportGroup == x ?' selected="selected"':'')+'>'+reportGroups[x]+'</option>';
	html += '</select>' + gui[lib.lang].tab + gui[lib.lang].attsReportGroup + '</td><td style="text-align:right">';
	html += '<input type="checkbox" id="DSMoveReports_disableAttsReportGroup"';
	html += (checkboxes.disableAttsReportGroup ? 'checked="checked"':'')+'/>'+gui[lib.lang].disable+'</td></tr>';

	html += '<tr><td width="100%"><select id="DSMoveReports_spyReportGroup">';
	for( var x = 0 ; x <reportGroups.length ; x++ )
		html += '<option value="'+x+'"'+(settings.spyReportGroup == x ?' selected="selected"':'')+'>'+reportGroups[x]+'</option>';
	html += '</select>' + gui[lib.lang].tab + gui[lib.lang].spyReportGroup + '</td><td style="text-align:right">';
	html += '<input type="checkbox" id="DSMoveReports_disableSpyReportGroup"';
	html += (checkboxes.disableSpyReportGroup ? 'checked="checked"':'')+'/>'+gui[lib.lang].disable+'</td></tr>';

	html += '<tr><td width="100%"><select id="DSMoveReports_incomingsReportGroup">';
	for( var x = 0 ; x <reportGroups.length ; x++ )
		html += '<option value="'+x+'"'+(settings.incomingsReportGroup== x ?' selected="selected"':'')+'>'+reportGroups[x]+'</option>';
	html += '</select>' + gui[lib.lang].tab + gui[lib.lang].incomingsReportGroup + '</td><td style="text-align:right">';
	html += '<input type="checkbox" id="DSMoveReports_disableIncomingsReportGroup"';
	html += (checkboxes.disableIncomingsReportGroup ? 'checked="checked"':'')+'/>'+gui[lib.lang].disable+'</td></tr>';

	html += '<tr><td><select id="DSMoveReports_conquestReportGroup">';
	for( var x = 0 ; x <reportGroups.length ; x++ )
		html += '<option value="'+x+'"'+(settings.conquestReportGroup == x ?' selected="selected"':'')+'>'+reportGroups[x]+'</option>';
	html += '</select>' + gui[lib.lang].tab + gui[lib.lang].conquestReportGroup + '</td>';
	html += '<td style="text-align:right"><input type="checkbox" id="DSMoveReports_disableConquestReportGroup"';
	html += (checkboxes.disableConquestReportGroup ? 'checked="checked"':'')+'/>'+gui[lib.lang].disable+'</td></tr>';

	html += '<tr><td width="100%"><select id="DSMoveReports_attsOnSupportReportGroup">';
	for( var x = 0 ; x <reportGroups.length ; x++ )
		html += '<option value="'+x+'"'+(settings.attsOnSupportReportGroup == x ?' selected="selected"':'')+'>'+reportGroups[x]+'</option>';
	html += '</select>' + gui[lib.lang].tab + gui[lib.lang].attsOnSupportReportGroup + '</td>';
	html += '<td style="text-align:right"><input type="checkbox" id="DSMoveReports_disableAttsOnSupportGroup"';
	html += (checkboxes.disableAttsOnSupportGroup ? 'checked="checked"':'')+'/>'+gui[lib.lang].disable+'</td></tr>';

	html += '<tr><td width="100%"><select id="DSMoveReports_restReportGroup">';
	for( var x = 0 ; x <reportGroups.length ; x++ )
		html += '<option value="'+x+'"'+(settings.restReportGroup == x ?' selected="selected"':'')+'>'+reportGroups[x]+'</option>';
	html += '</select>' + gui[lib.lang].tab + gui[lib.lang].restReportGroup + '</td>';
	html +='<td style="text-align:right"><input type="checkbox" id="DSMoveReports_disableRestReportGroup"';
	html += (checkboxes.disableRestReportGroup ? 'checked="checked"':'')+'/>'+gui[lib.lang].disable+'</td></tr>';

	sectionRow.innerHTML = html;
	sectionRow.id = "DSMoveReportsGroupAttributionContent";
	
	if( fadedIn ) sectionRow.style.display = "block";
	else sectionRow.style.display = "none";

	row = e.insertRow(e.rows.length);
	cell = row.insertCell(0);		

	var input = cell.appendChild(document.createElement("input"));
	input.type = "button";
	input.value = gui[lib.lang].saveButton;
	input.id = "DSMoveReports_save";
	input.addEventListener("click", saveSettings, false);

	var input = cell.appendChild(document.createElement("input"));
	input.type = "button";
	input.value = gui[lib.lang].deleteButton;
	input.id = "DSMoveReports_clearAll";
	input.addEventListener("click", function() {
		if( confirm( gui[lib.lang].confirm_delAll ) ) {
			var vals = lib.storage.listValues();
			for(var i = 0; i < vals.length; i++ ) lib.storage.deleteValue(vals[i]);
			alert( gui[lib.lang].allDataDeleted );
	}}, false);
}

function Knish3rDSLib(prefix) {
    //Hypix's storage-class; thanks for providing!
    this.StorageHandler = function(prefix,forceGM){
        var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
        var win = gm ? unsafeWindow : window;
        var ls = false;
        var intGetValue;
        var intSetValue;
        var prefix = prefix;
        try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
        if( !ls && !gm )
            throw("Keine geeignete Speichermöglichgkeit gefunden");
            if( forceGM && gm || !ls) {
                if( gm ) {
                    prefix = prefix + "_" + document.location.host.split('.')[0];
                    intSetValue = function(key,value) {
                        GM_setValue(prefix+"_"+key,value);
                    };
                    intGetValue = function(key,defaultValue) {
                        return GM_getValue(prefix+"_" + key, defaultValue);
                    }     
                    this.deleteValue = function(key) {
                        GM_deleteValue(prefix+"_"+key);
                    }
                    this.listValues = function(re) {
                    var allkeys = GM_listValues();
                    var serverKeys = [];
                    var rePrefix = new RegExp("^"+prefix+"_(.*)$");
                    if( typeof(re) != "undefined" )
                    var reKey = new RegExp(re);
                    for( var i = 0; i < allkeys.length; i++ ) {
                        var res = allkeys[i].match(rePrefix);
                        if( res ) {
                            if( reKey ) {
                                res = res[1].match(reKey);
                                if( res ) serverKeys.push(res);
                            } else serverKeys.push(res[1]);
                        }
                    } return serverKeys;
                }
            }
        } else if( ls ) {
            intSetValue = function(key,value) {
                localStorage.setItem(prefix+"_"+key, value );};    
            intGetValue = function(key,defaultValue) {
                var value = localStorage.getItem(prefix+"_"+key);
                if( value ) return value;
                else return defaultValue;
            };
            this.deleteValue = function(key) {
                localStorage.removeItem(prefix+"_"+key);}
            this.listValues = function(re) {
                var keys = [];
                var rePrefix = new RegExp("^"+prefix+"_(.*)$");
                if( typeof(re) != "undefined")
                    var reKey = new RegExp(re);
                for( var i = 0; i < win.localStorage.length; i++ ) {
                    var res = localStorage.key(i).match(rePrefix);
                    if( res ) {
                        if( reKey ) {
                            res = res[1].match(reKey);
                            if( res ) keys.push(res);
                        } else keys.push(res[1]);
                    }
                } return keys;
            }
        }
        this.clear = function(re) {
            var keys = this.listValues(re);
            for( var i = 0; i < keys.length; i++ )
                this.deleteValue(keys[i]);
        }
        this.setValue = function(key,value) {
            switch( typeof(value) ) {
                case "object":
                case "function": intSetValue(key,"j"+JSON.stringify(value)); break;
                case "number": intSetValue(key,"n"+value); break;
                case "boolean": intSetValue(key,"b" + (value ? 1 : 0)); break;
                case "string": intSetValue(key,"s" + value ); break;
                case "undefined": intSetValue(key,"u"); break;
            }
        }  
        this.getValue = function(key,defaultValue){
            var str = intGetValue(key);
            if( typeof(str) != "undefined" ) {
                switch( str[0] ) {
                    case "j": return JSON.parse(str.substring(1));
                    case "n": return parseFloat(str.substring(1));
                    case "b": return str[1] == "1";
                    case "s": return str.substring(1);
                    default: this.deleteValue(key);
                }
            } return defaultValue;
        }
        this.getString = function(key) {
            return intGetValue(key);}
        this.setString = function(key,value){
            intSetValue(key,value);}
    }
    var self = this;
    this.hotkeys = {
	keys: [],
        doIt: function() {
            window.addEventListener("keyup", this.keyUpHandler, false );},
        keyUpHandler : function(e) {
            if( e.target.nodeName.toUpperCase() == "INPUT" && (e.target.value != "PASSWORD" || e.target.type == "text" ) )
                return;
            if( e.target.nodeName.toUpperCase() != "TEXTAREA" ) {
                for( var i = 0; i < self.hotkeys.keys.length; i++ ) {
                    if( self.hotkeys.keys[i].key == e.keyCode ) {
                        if( self.hotkeys.keys[i].href ) {
                            location.href = self.hotkeys.keys[i].href; break;}
                        if( self.hotkeys.keys[i].event ) {
                            self.fireEvent( document.getElementById(self.hotkeys.keys[i].event.id), self.hotkeys.keys[i].event.event ); break;}
                    }
                }
            }
        },
    }
    this.xPath = function(path, context) {
        if(!context) var context = document;	
        var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var nodes = [];
        for(var x = 0; x < XPath.snapshotLength; x++)
            nodes.push(XPath.snapshotItem(x));
        return nodes;
    }
    this.getGameData = function() {
        var game_data;
        if(typeof(unsafeWindow) != 'undefined' && navigator.userAgent.indexOf("Firefox")>-1)
            game_data = unsafeWindow.game_data;
        if(!game_data) {
            var script = document.createElement("script");
            script.type = "application/javascript";
            script.textContent = 	"var input=document.createElement('input');" +
                                    "input.type='hidden';" +
                                    "input.value=JSON.stringify(game_data);"  +
                                    "input.id='game_data';" +
                                    "document.body.appendChild(input);";
            document.body.appendChild(script);
            var input = document.getElementById("game_data");
            if( input ) eval("game_data=" + input.value + ";");
            document.body.removeChild(script);
        }
        if( game_data ) game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
        return game_data;
    }
    this.fireEvent = function(node,evt) {
        if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "CHECKBOX" )
            node.checked = !node.checked;
        if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "SUBMIT" ) {
            node.focus(); node.click();}
        var evObj = document.createEvent('HTMLEvents');
        evObj.initEvent( evt, true, true );
        node.dispatchEvent(evObj);
    }
    this.game_data = this.getGameData();
    this.storage = new this.StorageHandler(prefix,true);
    if( !this.game_data ) return;
    this.saveReportIDs = function(char) {
	var id = location.href.split("view=")[1].split("&")[0].replace(/[^0-9]/);
	var savedIDs = self.storage.getValue(char+":"+self.game_data.player.id,"");
	if( savedIDs.length == 0 ) {
		savedIDs = new Array(1);
		savedIDs[0] = id;}
	else {
		savedIDs = savedIDs.split(";");
		var match = false;
		for( var i=0 ; i<savedIDs.length ; i++) {if( savedIDs[i] == id) match=true;}
		if( !match ) savedIDs[savedIDs.length] = id;
		if( savedIDs.length > 500 ) savedIDs.shift();
	}
	var value = savedIDs.join(";");
	self.storage.setValue(char+":"+self.game_data.player.id,value);
    }
    this.lang = this.game_data.world.replace(/[0-9]/g,"");
    this.hotkeys.doIt();
    if( !this.game_data ) return;
    this.lang = this.game_data.world.replace(/[0-9]/g,"");
    if( this.lang == "des" || this.lang == "dec" || (this.lang == "ch" && this.game_data.world.replace(/[^0-9]/) < 4) || this.lang == "chs" )
	this.lang = "de";
}

})();
