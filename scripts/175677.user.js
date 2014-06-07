// ==UserScript==
// @name          Warian Report Processor  [MoRGaNA]
// @namespace     http://userscripts.org/scripts/show/175677
// @version 	  5.6.4
// @description   Processes Warian Reports
// @include 	  http://*.warian*.*/*.php*
// @include 	  http://*.warian*.*/*.php*
// @exclude 	  http://*.warian*.*/hilfe.php*
// @exclude	  	  http://*.warian*.*/log*.php*
// @exclude 	  http://*.warian*.*/index.php*
// @exclude 	  http://*.warian*.*/anleitung.php*
// @exclude 	  http://*.warian*.*/impressum.php*
// @exclude 	  http://*.warian*.*/anmelden.php*
// @exclude 	  http://*.warian*.*/gutscheine.php*
// @exclude 	  http://*.warian*.*/spielregeln.php*
// @exclude 	  http://*.warian*.*/links.php*
// @exclude 	  http://*.warian*.*/geschichte.php*
// @exclude 	  http://*.warian*.*/tutorial.php*
// @exclude 	  http://*.warian*.*/manual.php*
// @exclude 	  http://*.warian*.*/manual.php*
// @exclude 	  http://*.warian*.*/ajax.php*
// @exclude 	  http://*.warian*.*/ad/*
// @exclude 	  http://*.warian*.*/chat/*
// @exclude 	  http://forum.warian*.*
// @exclude 	  http://board.warian*.*
// @exclude 	  http://shop.warian*.*
// @exclude 	  http://*.warian*.*/activate.php*
// @exclude 	  http://*.warian*.*/support.php*
// @exclude  	  http://help.warian*.*
// @exclude 	  *.css
// @exclude 	  *.js
// ==/UserScript==


/*
*Copyright © Kirne, 2013
*/
var scriptVersion = '5.6.4';  // once here and once up in the comments
var crtPage;
var queryStringValuePairs = new Array();
var ReportProcessorData;
var activeVillage;
var villages = new Array();
var debugAlerts = false;

var minTroop = 12;
var defaultTroopType = 1;
var defaultTroopNumber = 12;

var isSpeedServer = false;

var raceImageNumber = '1'; // ''=romans, '1'=teutons, '2'=gauls

var farmSettingsDialogElement;
var importExportDialogElement;
var senderSetupDialogElement;

// google chrome support
var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
// end chrome support





function functionMain(e) {
	var crtPath = window.location.href;	
	crtPage = crtPath.substring(crtPath.substring(12).indexOf('/') + 13);
	var crtShortPage = crtPage.substring(0, crtPage.indexOf('.'));
	
	if(crtPage.indexOf('?') > -1) {
		queryStringValuePairs = ParseQueryString(crtPage.substring(crtPage.indexOf('?')+1));
	}
	
	isSpeedServer = (crtPage.indexOf("speed") != -1 || crtPage.indexOf("vip") != -1 || crtPage.indexOf("research")!= -1)
	
	//if(xpathToFirstFound("//a", document.getElementById("mtop")).title.indexOf('TB3') > -1) {
	//	BeyondActivated = true;
	//}
		
	AddStyles();
	
	LoadReportProcData();
	
	raceImageNumber = ReportProcessorData.race;
	if(raceImageNumber=='0') {
		raceImageNumber = '';
	}
	
	// legacy check
	if(ReportProcessorData.farms.length>0 && ReportProcessorData.farms[0].autoAdjustEnabled == null) {
		AmendFarmList();
	}
	if(ReportProcessorData.minRaiders == null) {
		ReportProcessorData.minRaiders = 12;
		ReportProcessorData.incRatio = 50;
		ReportProcessorData.decRatio = 20;
		SaveReportProcData();
	}
	if(ReportProcessorData.lossAlertPercentage == null) {
		ReportProcessorData.lossAlertPercentage = 50;
		SaveReportProcData();
	}
	
	LoadVillageList();
	RenderPageElements();
	
	switch(crtShortPage)
	{
		case 'dorf1':
			TrackETAs();
			break;
	    case 'berichte':
			if(crtPage.indexOf("?id=") > -1 || crtPage.indexOf("&id=") > -1) {
				if( ReportProcessorData.activated ) {
					HandleSingleReport(null);
				}
				else {
					RenderProcessReportLink();
				}
			}
			else {
				if( ReportProcessorData.activated) {
					ProcessReportList();
				}
			}
	        break;
	    case 'a2b':
			if(GetQueryStringValue('z')) {
				HandleAttackPage();
			}
			else {
				SendAttack();
			}
			break;
	    case 'karte':
			if(crtPage.indexOf("?d=") > -1) {
				UpdateFarmDataFromKartePage();
				RenderAddAsFarmLink();
			}
			break;
		case 'build':  // rally point
			if(GetQueryStringValue('gid') == '16' && (ReportProcessorData.activated || ReportProcessorData.returnToReports)) {
				ReportProcessorData.returnToReports = false;
				SaveReportProcData();
				document.location.href = 'berichte.php?t=3';
			}
			break;
		case 'spieler':
			RenderFakeLinks();
			break;
	}
}



/* ===================================== RENDERING ======================================= */


function AddStyles() {
    var css = " .rptPrcTbl {border-collapse: collapse;}";
	css += ".rptPrcTbl,.rptPrcTbl td,.rptPrcTbl th{border: 1px solid #666;padding: 0 4px !important;font-size: 10px; text-align:left!important;}\r\n";
	css += ".rptPrcTbl th{background-color: #eee;}\r\n";
	css += "#reportsTbl {margin:20px 0 0 0;}\r\n";
	css += "#farmsTbl {margin:10px 0 40px 0;}\r\n";
	css += ".scriptUpdateLink {margin: 0 10px;}\r\n";
	css += ".aSettings {float: none; clear: both; margin: 5px 0 0 0; display: block;}\r\n";
	css += ".currentReport td {background-color: green; color: #fff; font-weight: bold;}\r\n";
	css += ".rptPrcDialog {background-color: #C5DEA4; position:absolute; top: -40px; left: -550px; z-index: 20000; padding: 40px; border: 4px solid #666;}\r\n";
	css += ".rptPrcDialog button {float:right; margin: 0 0 20px 0;}\r\n";
	css += "#farmSettingsHelp {width: 570px;}\r\n";
	css += ".trptprc_resendContainer, .trptprc_fakesContainer {border: 1px solid #c0c0c0; background-color: #f3f3f3; padding:3px; font-size: 90%;}\r\n";
	css += ".trptprc_resendContainer a{margin:0 20px}\r\n";
	css += "#rptPrcFarmSettings input {width: 30px;}\r\n";
	css += ".trptprc_fakesContainer .radioContainer {width: 490px; margin-bottom: 10px;}\r\n";
	css += ".trptprc_fakesContainer input {margin-right: 25px;}\r\n";
	css += "#importExportDialogElement {background-color: #C5DEA4; position:absolute; top: -40px; left: -550px; z-index: 25000; padding: 40px; border: 4px solid #666;}\r\n";
	css += "#importExportDialogElement textarea {width:500px; height:500px; border: 1px solid #666;}";
	css += ".rptOptTbl {border-collapse: collapse;border: 1px solid #c0c0c0; margin: 20px 0 0 0;}";
	css += ".rptOptTbl th { border: 1px solid #c0c0c0; font-size: 80%; }";
	css += ".rptOptTbl td { border: 1px solid #c0c0c0; font-size: 80%;}";
	css += ".lastRow {text-align:center; background-color: #f3f3f3;}";
	css += ".lastRow p {margin: 0;}";
	css += "\r\n.radical {background-color: #80C907;}";
	css += "\r\n.super {background-color: #9ECD67;}";
	css += "\r\n.better {background-color: #CAE4AA;}";
	css += "\r\n.worse {background-color: #D55C14;}";
	css += "\r\n.worst {background-color: #db0000;}";
	css += "\r\n.same {color: #666;}";
	css += "\r\n.activeVillageTd {color: #000; font-weight:bold;}";
	css += "\r\n.eta {color: red; width: 50px;}";
	
	
	GM_addStyle(css);
}

function RenderPageElements() {
	var lastDiv = document.getElementById('side_info');
	
	var b = document.createElement("b");
	b.appendChild(document.createTextNode('Report Processor'));
	b.addEventListener("click", function(){document.location.href='http://userscripts.org/scripts/show/65944';}, true);
	insertAfter(lastDiv.lastChild, b);
	
	var aUpd = document.createElement("a");
	aUpd.href = 'javascript: ;';
	aUpd.className = 'scriptUpdateLink';
	aUpd.appendChild(document.createTextNode(scriptVersion));
	aUpd.addEventListener("click", AutoUpdate, true);
	insertAfter(lastDiv.lastChild, aUpd);
	
	if(ReportProcessorData.activated) {
		
		var btn = document.createElement("button");
		btn.textContent = "Stop Processing";
		btn.addEventListener("click", StopProcess, true);
		insertAfter(lastDiv.lastChild, btn);
		
		//insertAfter(lastDiv.lastChild, document.createTextNode("working..."));
	}
	else
	{
		var btn = document.createElement("button");
		btn.textContent = "Start Processing";
		btn.addEventListener("click", StartProcessing, true);
		insertAfter(lastDiv.lastChild, btn); 
	}
		
	var aSettings = document.createElement("a");
	aSettings.href = 'javascript: ;';
	aSettings.className = 'aSettings';
	aSettings.appendChild(document.createTextNode('Show farm settings'));
	aSettings.addEventListener("click", ShowFarmSettings, true);
	insertAfter(lastDiv.lastChild, aSettings);
	
	RenderReportsTable();
}

function ShowFarmSettings() {
	var table = CreateTable('rptPrcTbl','farmsTbl');
	
	AddTableHeaderTextCell(table, 'Village');
	AddTableHeaderTextCell(table, 'Owner');
	AddTableHeaderTextCell(table, 'Troop');
	AddTableHeaderTextCell(table, 'No.');
	AddTableHeaderTextCell(table, 'Auto adjust');
	AddTableHeaderTextCell(table, 'Raid');
	//AddTableHeaderTextCell(table, 'From');
	AddTableHeaderTextCell(table, 'Runs');	
	AddTableHeaderTextCell(table, 'Avg. Bounty');
	
	var tBody = table.tBodies[0];
	
	var farmList = ReportProcessorData.farms;
	
	for(var i=0; i<farmList.length; i++) {
		var row = document.createElement('tr');
		tBody.appendChild(row);
		
		// target village link
		var td = document.createElement('td');
		td.appendChild(CreateLink(farmList[i].villageLink, farmList[i].villageName));
		row.appendChild(td);
		
		// target player link
		var td = document.createElement('td');
		td.appendChild(CreateLink('spieler.php?uid=' + farmList[i].playerId, farmList[i].playerName));
		row.appendChild(td);
		
		// troop type image		
		var td = document.createElement('td');
		var img = document.createElement('img')
		img.src = "img/x.gif";
		img.className = 'unit u' + raceImageNumber + farmList[i].troopType;
		td.appendChild(img);
		row.appendChild(td);
		
		// troop number
		row.appendChild(CreateTableCell(farmList[i].troopNumber));
			
		// Auto adjust
		var td = document.createElement('td');		
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "farmAutoAdjust_"+i;
		checkbox.value = farmList[i].villageId;
		checkbox.id = "farmAutoAdjust_"+i;
		checkbox.checked = farmList[i].autoAdjustEnabled;
		checkbox.addEventListener("change", ToggleAutoAdjust, true);
		td.appendChild(checkbox);
		row.appendChild(td);
		
		// Attack type
		var td = document.createElement('td');		
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "farmAttackType_"+i;
		checkbox.value = farmList[i].villageId;
		checkbox.id = "farmAttackType_"+i;
		checkbox.checked = farmList[i].attackType == 2 || farmList[i].attackType == null;
		checkbox.addEventListener("change", ToggleAttackType, true);
		td.appendChild(checkbox);
		row.appendChild(td);
		
		// the rest of the stuff
		//row.appendChild(CreateTableCell(ResolveVillageName(farmList[i].senderVillageId)));
		row.appendChild(CreateTableCell(farmList[i].attackedCount));
		row.appendChild(CreateTableCell(farmList[i].averageBounty));
	}
	
	// a container
	farmSettingsDialogElement = document.createElement('div');
	farmSettingsDialogElement.id = "rptPrcFarmSettings";
	farmSettingsDialogElement.className = "rptPrcDialog";
	
	// close button
	var btn = document.createElement("button");
	btn.textContent = "Close";
	btn.addEventListener("click", HideFarmSettings, true);
	farmSettingsDialogElement.appendChild(btn);
	
	// add some text
	farmSettingsDialogElement.appendChild(GetFarmHelpText());
	
	// the race selector
	var select = document.createElement('select');
	select.name = "playerRace_"+i;
	select.id = "playerRace_"+i;
	select.setAttribute("valueName", "race");
	select.options[0] = new Option('Romans', '', (ReportProcessorData.race==''));
	select.options[1] = new Option('Teutons', '1', (ReportProcessorData.race=='1'));
	select.options[2] = new Option('Gauls', '2', (ReportProcessorData.race=='2'));
	select.addEventListener("change", SaveSettings, true);
	
	var raceSelectorContainer = document.createElement('div');
	raceSelectorContainer.appendChild(document.createTextNode('Your race: '));
	raceSelectorContainer.appendChild(select);
	
	// some settings
	var min = CreateInput("minRaiders_"+i, ReportProcessorData.minRaiders, 'Minimum raiders', 'blur', SaveSettings, 'minRaiders');
	var inc = CreateInput("incRatio_"+i, ReportProcessorData.incRatio, 'Increase ratio (%)', 'blur', SaveSettings, 'incRatio');
	var dec = CreateInput("decRatio_"+i, ReportProcessorData.decRatio, 'Decrease ratio (%)', 'blur', SaveSettings, 'decRatio');	
	var loss = CreateInput("alertLevel_"+i, ReportProcessorData.lossAlertPercentage, 'Loss alert level (%)', 'blur', SaveSettings, 'lossAlertPercentage');	
	var delay = CreateInput("delay_"+i, ReportProcessorData.delay, 'Delay (seconds)', 'blur', SaveSettings, 'delay');	
	
	farmSettingsDialogElement.appendChild(raceSelectorContainer);
	farmSettingsDialogElement.appendChild(min);
	farmSettingsDialogElement.appendChild(inc);
	farmSettingsDialogElement.appendChild(dec);
	farmSettingsDialogElement.appendChild(loss);
	farmSettingsDialogElement.appendChild(delay);
	
	// add the table
	farmSettingsDialogElement.appendChild(table); 
	
	//export and import
	var btnExp = document.createElement("button");
	btnExp.textContent = "Export farm list";
	btnExp.addEventListener("click", ShowExportDialog, true);
	farmSettingsDialogElement.appendChild(btnExp);
	
	var btnExp = document.createElement("button");
	btnExp.textContent = "Import farm list";
	btnExp.addEventListener("click", ShowImportDialog, true);
	farmSettingsDialogElement.appendChild(btnExp);
	
	// clear farm settings
	var btnClear = document.createElement("button");
	btnClear.textContent = "Remove all farms";
	btnClear.addEventListener("click", ClearData, true);
	farmSettingsDialogElement.appendChild(btnClear);
	
	insertAfter(document.getElementById('side_info').lastChild, farmSettingsDialogElement);
}

function HideFarmSettings() {
	if (farmSettingsDialogElement) {
		farmSettingsDialogElement.parentNode.removeChild(farmSettingsDialogElement);
	}
}

function RenderReportsTable() {
	var table = CreateTable('rptPrcTbl','reportsTbl');
	
	AddTableHeaderTextCell(table, 'Unhandled Report');
	AddTableHeaderTextCell(table, 'Reason');
	AddTableHeaderTextCell(table, 'Delete');	
	
	var tBody = table.tBodies[0];
	
	var reports = ReportProcessorData.unhandledReports;
	for(var i=0; i<reports.length; i++) {
		if(!reports[i].id) {
			AmendReport(reports[i]);
			SaveReportProcData();
		}
		var row = document.createElement('tr');
		if(reports[i].id==GetQueryStringValue('id')) {
			row.className = 'currentReport';
		}
		tBody.appendChild(row);
		
		var td = document.createElement('td');
		td.appendChild(CreateLink(reports[i].link, reports[i].title));
		row.appendChild(td);
		
		row.appendChild(CreateTableCell(reports[i].log));
		
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "rpt_"+i;
		checkbox.value = reports[i].id;
		checkbox.id = "rpt_"+i;
		checkbox.addEventListener("change", RemoveReport, true);
		
		var td = document.createElement('td');
		td.appendChild(checkbox);
		row.appendChild(td);
	}
	
	insertAfter(document.getElementById('side_info').lastChild, table);
}

function RenderAddAsFarmLink() {
	var farmId = GetQueryStringValue('d');
	if(farmId) {
		var a = document.createElement('a');
		a.href = 'javascript: ;';
		if(IsFarm(farmId)) {
			a.appendChild(document.createTextNode('» Remove from farm list'));
			a.addEventListener("click", RemoveFarmAndRefresh, true);
		}
		else {
			a.appendChild(document.createTextNode('» Add as farm'));
			a.addEventListener("click", AddFarmFromKartePage, true);
		}
		var tr = document.createElement('tr');	
		var td = document.createElement('td');
		td.appendChild(a);
		tr.appendChild(td);
		
		var optionsTable = document.getElementById('options');
		if(optionsTable) {
			optionsTable.tBodies[0].appendChild(tr);
		}
	}
}

function RenderProcessReportLink() {
	var p = document.createElement('p');
	p.className = "trptprc_resendContainer";	
	
	var a1 = document.createElement('a');
	a1.href = 'javascript: ;';
	a1.appendChild(document.createTextNode('More (+'+ReportProcessorData.incRatio+'%)'));
	a1.addEventListener("click", ResendMore, true);	
	
	var a2 = document.createElement('a');
	a2.href = 'javascript: ;';
	a2.appendChild(document.createTextNode('Same (+0)'));
	a2.addEventListener("click", ResendSame, true);	 
	
	var a3 = document.createElement('a');
	a3.href = 'javascript: ;';
	a3.appendChild(document.createTextNode('Less (-'+ReportProcessorData.decRatio+'%)'));
	a3.addEventListener("click", ResendLess, true);	
	
	var b = document.createElement('b');	
	var villageId = GetFarmIdFromReportPage();
	if(IsFarm(villageId)) {
		b.appendChild(document.createTextNode('Resend troops'));
	}
	else {
		b.appendChild(document.createTextNode('Resend troops and add as farm'));
	}
	
	p.appendChild(b);
	p.appendChild(a1);
	p.appendChild(a2);
	p.appendChild(a3);
	
	insertAfter(document.getElementById('textmenu'), p); 
	
	
	// optimal farming sender	
	insertAfter(p, CreateSenderHint(villageId)); 
	

	// save report link
	var a4 = document.createElement('a');
	a4.href = 'javascript: ;';
	a4.appendChild(document.createTextNode('Add to unhandled reports'));
	a4.addEventListener("click", AddToUnhandled, true);
	insertAfter(p, a4); 
}

function CreateSenderHint(farmId) {
	var raceNo = parseInt(ReportProcessorData.race);
	var senderId = GetSenderIdFromReportPage();
	var lastSender = GetVillage(senderId);
	var lastSenderTroopType = 1;
	var xy = id2xy(farmId);
	var farmX = xy[0];
	var	farmY = xy[1];
	var lastDistance = getDistance(lastSender.x, lastSender.y, farmX, farmY);
	var tournamentLevel = lastSender.tournamentSquareLevel;
		
	// find out which troop was used last time	
	var lastSenderTroopType;
	var attCells = document.getElementById('attacker').rows[2].cells;
	for(var v=1; v<10; v++) {
		attacking = attCells[v].textContent;		
		if(attacking && attacking!=0) {		
			lastSenderTroopType = v;
			break;
		}
	}
	
	var lastTravelTime = getTravelTime(lastSenderTroopType, raceNo, lastDistance, tournamentLevel);
	
	// create the table
	var table = CreateTable('rptOptTbl','optimalTbl');
	AddTableHeaderTextCell(table, 'Sender');
	for(var x=1; x<7; x++) {
		AddTableHeaderCell(table, CreateImage("img/x.gif", 'unit u' + raceNo + x));
	}
	var tBody = table.tBodies[0];
	
	
	for(var i=0; i<villages.length; i++) {
		if(!villages[i].showAsSender)
			continue;
			
		var distance = getDistance(villages[i].x, villages[i].y, farmX, farmY);
		
		var row = document.createElement('tr');
		tBody.appendChild(row);
		
		var td = document.createElement('td');
		td.appendChild(document.createTextNode(villages[i].name));
		row.appendChild(td);
		
		tournamentLevel = villages[i].tournamentSquareLevel;
		
		for(var n=0; n<6; n++) {
			var tt = getTravelTime(n+1, raceNo, distance, tournamentLevel);
			var td = document.createElement('td');
			
			var diff = lastTravelTime / tt;
			
			var className = "same";
			if(diff > 2)
				className = "radical";
			else
				if(diff > 1.5)
					className = "super";
				else
					if(diff > 1.1)
						className = "better";
					else
						if(diff < 0.7)
							className = "worst";
						else
							if(diff < 0.9)
								className = "worse";
			td.className = className;
			
			if(villages[i].id == senderId && lastSenderTroopType == n+1)
				td.className += ' activeVillageTd';
			td.appendChild(document.createTextNode(formatTime(tt, 0)));
			row.appendChild(td);
		}
	}
	
	// a final row with a link	
	var customLink = document.createElement('a');
	customLink.href = 'javascript: ;';
	customLink.appendChild(document.createTextNode('Configure optimization hints table'));
	customLink.addEventListener("click", ShowSenderSetup, true);
	
	var row = document.createElement('tr');
	tBody.appendChild(row);
	
	var th = document.createElement('th');
	th.setAttribute('colspan', '7');
	th.appendChild(customLink);
	th.className = 'lastRow';
	row.appendChild(th);

	return table;
}


function RenderFakeLinks() {
	// render some instructions and settings
	var p = document.createElement('p');
	p.className = "trptprc_fakesContainer";	
	
	var intro = document.createElement('p');	
	intro.appendChild(document.createTextNode('Clicking the "send fakes" image below will send with the following settings. A good advice is to CTRL+click the image. This will open a new tab in your browser where the fake will be sent.'));
	
	var radioDesc = document.createElement('p');
	radioDesc.appendChild(document.createTextNode('Troop type to send as fake: '));
	
	var radioContainer = document.createElement('div');
	radioContainer.className = "radioContainer";
	for(var t=1; t<9; t++) {
		var radio = document.createElement('input');
		radio.type = 'radio';
		radio.name = "fakeTroopType";
		radio.id = "fakeTroopType";
		radio.value = t;
		if(ReportProcessorData.fakeTroopType==t) {
			radio.setAttribute('checked', 'true');
		}
		radio.groupName = 'fakeTroopType';
		radio.addEventListener("click", SetFakeTroopType, true);
				
		// troop type image		
		var td = document.createElement('td');
		var img = document.createElement('img')
		img.src = "img/x.gif";
		img.className = 'unit u' + raceImageNumber + t;
		
		radioContainer.appendChild(img);		
		radioContainer.appendChild(radio);
	}
	
	p.appendChild(intro);	
	p.appendChild(radioDesc);
	p.appendChild(radioContainer);
	
	insertAfter(document.getElementById('profile'), p); 
	
	// add send fake links to the village list
	var villageTable = document.getElementById('villages');
	var rows = villageTable.tBodies[0].rows;
	for(var r=0; r<rows.length; r++) {
		var villageUrl = xpathToFirstFound("a", rows[r].cells[0]).href;
		var villageId = GetQueryStringValue('d', ParseQueryString(villageUrl.substring(villageUrl.indexOf('?')+1)))
		
		var img = GetImage('bandit');
		img.title = "Send fake attack/raid";
		var a = document.createElement('a');
		a.href = 'a2b.php?z='+villageId;
		a.setAttribute('villageid', villageId);
		a.appendChild(img);
		a.addEventListener("click", SendFake, true);	
		var td = rows[r].cells[0].appendChild(a);
	}
}

/* ===================================== DATA OBJECT ======================================= */


function LoadReportProcData() {
	var valueName = GetServerName()+GetUserId()+'ReportProcessorData'
	// legacy check
	if(!isChrome && !GM_getValue(valueName)) {
		ReportProcessorData = eval(GM_getValue('ReportProcessorData','new Object()'));
	}
	else {
		if(isChrome) {	
			ReportProcessorData = eval(readCookie(valueName,'new Object()'));
		}
		else {
			ReportProcessorData = eval(GM_getValue(valueName,'new Object()'));
		}
	}
	
	if(!ReportProcessorData || !ReportProcessorData.farms){
		ReportProcessorData = new Object();
		ReportProcessorData.farms = new Array();
		ReportProcessorData.unhandledReports = new Array();
		ReportProcessorData.activated = false;
		ReportProcessorData.race = '1';
		ReportProcessorData.minRaiders = 12;
		ReportProcessorData.incRatio = 50;
		ReportProcessorData.decRatio = 20;
		ReportProcessorData.lossAlertPercentage = 50;
		ReportProcessorData.returnToReports = false;
	}
}
function SaveReportProcData() {
	var valueName = GetServerName()+GetUserId()+'ReportProcessorData'
	
	if(isChrome) {
		var jsonString = CustomUneval(ReportProcessorData);
		createCookie(valueName, jsonString, 365);
	}
	else {
		var jsonString = uneval(ReportProcessorData)
		GM_setValue(valueName, jsonString);
	}
}

function ClearData() {
	if(confirm('Do you really wish to delete all farms?')) {
		ReportProcessorData = new Object();
		ReportProcessorData.farms = new Array();
		ReportProcessorData.unhandledReports = new Array();
		ReportProcessorData.activated = false;
		ReportProcessorData.race = '1';
		ReportProcessorData.minRaiders = 12;
		ReportProcessorData.incRatio = 50;
		ReportProcessorData.decRatio = 20;
		ReportProcessorData.lossAlertPercentage = 50;
		ReportProcessorData.returnToReports = false;
		SaveReportProcData();
		
		document.location.reload();
	}
}

// Manually builds a json string out of the ReportProcessorData object
// remember to modify this if you add/change the reportProcessorData object.
// this is for Chrome only since they don't have uneval()
function CustomUneval(procObj) {
	var data = new Array();
	
	// begin object
	data[0] = '({';
	
	// farms
	data[1] = 'farms:[';
	for(var i=0; i<ReportProcessorData.farms.length; i++) {
		if(i>0)
			data[data.length] = ', '
		data[data.length] = Farm2json(ReportProcessorData.farms[i]);
	}
	data[data.length] = '] ';

	// myVillages	
	if(ReportProcessorData.myVillages) {
		data[data.length] = ', myVillages:[';
		for(var i=0; i<ReportProcessorData.myVillages.length; i++) {
			if(i>0)
				data[data.length] = ', '
			data[data.length] = '"' + ReportProcessorData.myVillages[i] + '"';
		}
		data[data.length] = '] ';
	}

	// fakeTargetVillages	
	if(ReportProcessorData.fakeTargetVillages) {
		data[data.length] = ', fakeTargetVillages:[';
		for(var i=0; i<ReportProcessorData.fakeTargetVillages.length; i++) {
			if(i>0)
				data[data.length] = ', '
			data[data.length] = '"' + ReportProcessorData.fakeTargetVillages[i] + '"';
		}
		data[data.length] = '] ';
	}
	
	// UnhandledReports
	if(ReportProcessorData.UnhandledReports) {
		data[1] = 'UnhandledReports:[';
		for(var i=0; i<ReportProcessorData.UnhandledReports.length; i++) {
			var rpt = ReportProcessorData.UnhandledReports[i];
			
			if(i>0)
				data[data.length] = ', '
			data[data.length] = '{link:"' + rpt.link + '", title:"' + rpt.title + '"}';
		}
		data[data.length] = '] ';
	}
	
	// farmInProcess
	data[data.length] = ', farmInProcess=' + Farm2json(ReportProcessorData.farmInProcess);
	
	// reportInProcess
	if(ReportProcessorData.reportInProcess) {
		data[data.length] = ', reportInProcess={link:"' + ReportProcessorData.reportInProcess.link + ', title:"' + ReportProcessorData.reportInProcess.title + ', log:"' + ReportProcessorData.reportInProcess.log + ', id:"' + ReportProcessorData.reportInProcess.id + '}';
	}
	else {
		data[data.length] = ', reportInProcess=null';
	}
	
	// props	
	data[data.length] = ', activated=' + ((ReportProcessorData.activated) ? "true" : "false");
	data[data.length] = ', returnToReports=' + ((ReportProcessorData.returnToReports) ? "true" : "false");
	if(ReportProcessorData.lastReportPageNumber != null)
		data[data.length] = ', lastReportPageNumber=' + ReportProcessorData.lastReportPageNumber;	
	if(ReportProcessorData.lastReportLinkFollowed != null)
		data[data.length] = ', lastReportLinkFollowed="' + ReportProcessorData.lastReportLinkFollowed + '"';
	data[data.length] = ', race="' + ReportProcessorData.race + '"';
	data[data.length] = ', minRaiders="' + ReportProcessorData.minRaiders + '"';
	data[data.length] = ', incRatio="' + ReportProcessorData.incRatio + '"';
	data[data.length] = ', decRatio="' + ReportProcessorData.decRatio + '"';
	data[data.length] = ', lossAlertPercentage="' + ReportProcessorData.lossAlertPercentage + '"';
	
	
	if(ReportProcessorData.fakeTroopType != null)
		data[data.length] = ', fakeTroopType="' + ReportProcessorData.fakeTroopType + '"';
	
	// close the data object
	data[data.length] = '})';
	
	return data.join('');
}

function Farm2json(farm) {
	if(!farm) {
		return "null";
	}
	return '{villageId:"' + farm.villageId + '", villageLink:"' + farm.villageLink + '", villageName:"' + farm.villageName + '", playerId:"' + farm.playerId + '", autoAdjustEnabled:' + ((farm.autoAdjustEnabled)?'true':'false') + ', troopType:' + farm.troopType + ', troopNumber:' + farm.troopNumber + ', senderVillageId:"' + farm.senderVillageId + '", attackedCount:' + farm.attackedCount + ', averageBounty:' + farm.averageBounty + ', farmUrl:"' + farm.farmUrl + '"}';
}

/* ================================ ADD / REMOVE FARM ===================================== */

function AddFarmFromKartePage() {
	var farm = CreateFarmFromKartePage();
	AddFarm(farm);
}

function RemoveFarmAndRefresh() {	
	LoadReportProcData(); // ensure that we get the latest data possible	
	var villageId = GetQueryStringValue('d');	
	var result = RemoveFarm(villageId);	
	SaveReportProcData();	
	if(result) {
		document.location.href = crtPage;
	}
}

function AddFarm(farm) {
	LoadReportProcData(); // ensure that we get the latest data possible
	
	if(IsFarm) {
		document.location.href = crtPage;
	}	
	
	var existingFarms = ReportProcessorData.farms;		
	existingFarms[existingFarms.length] = farm;
	
	ReportProcessorData.farms = existingFarms;
	SaveReportProcData();
	
	document.location.href = crtPage;
}

function RemoveFarm(villageId) {
	var farms = ReportProcessorData.farms;
	var idx = -1;
	for(var i = 0; i<farms.length; i++) {
		if(farms[i].villageId == villageId) {
			idx = i;
			break;
		}
	}
	
	if(idx > -1) {
		ReportProcessorData.farms.splice(idx, 1);
		return true;
	}
	return false;
}

function GetSingleFarm(villageId) { 
	var farms = ReportProcessorData.farms;
	for(var i=0; i<farms.length; i++) {
		if(farms[i].villageId == villageId) {
			return farms[i];
		}
	}
	return new Farm(villageId, "", "", "", "", true, 1, 12, activeVillage.id);  // TODO this seems wrong
}

function Farm(villageId, villageLink, villageName, playerId, playerName, autoAdjustEnabled, troopType, troopNumber, senderVillageId) {
	this.villageId = villageId;
	this.villageLink = villageLink;
	this.villageName = villageName;
	this.playerId = playerId;
	this.playerName = playerName;
	this.autoAdjustEnabled = autoAdjustEnabled;
	this.troopType = troopType;
	this.troopNumber = troopNumber;
	this.senderVillageId = senderVillageId;
	this.attackedCount = 0;
	this.averageBounty = 0;
	this.attackType = 2; // 1=normal, 2=raid
}

function IsFarm(villageId) {
	var farms = ReportProcessorData.farms;
	for(var i=0; i<farms.length; i++) {
		if(farms[i].villageId == villageId)
			return true;
	}
	return false;
}

function CreateFarmFromKartePage() {
	var villageInfoTable = document.getElementById('village_info');
	
	var villageLink = crtPage;
	var villageId = GetQueryStringValue('d');
	var villageName = villageInfoTable.rows[0].cells[0].textContent;
	villageName = villageName.substring(0, villageName.lastIndexOf('(')-1);
	
	var playerLink = villageInfoTable.rows[3].cells[1].childNodes[0];
	var playerHref = playerLink.href;
	
	var playerId = playerHref.substring(playerHref.lastIndexOf('uid=')+4);
	var playerName = playerLink.textContent;
	var autoAdjustEnabled = true;
	var troopType = defaultTroopType;
	var troopNumber = defaultTroopNumber;
	var senderVillageId = activeVillage.id;
	
	return new Farm(villageId, villageLink, villageName, playerId, playerName, autoAdjustEnabled, troopType, troopNumber, senderVillageId);
}

// Checks if the currently displayed village is a farm and if so updates the name and player data
function UpdateFarmDataFromKartePage() {
	var villageInfoTable = document.getElementById('village_info');
	
	var villageLink = crtPage;
	var villageId = GetQueryStringValue('d');
	
	LoadReportProcData(); // ensure that we get the latest data possible
	if(IsFarm(villageId)) {
		if (villageInfoTable== null) {
			RemoveFarm(villageId);
		}
		else {
			var farm = GetSingleFarm(villageId);
					
			var villageName = villageInfoTable.rows[0].cells[0].textContent;
			farm.name = villageName.substring(0, villageName.lastIndexOf('(')-1);
			
			var playerLink = villageInfoTable.rows[3].cells[1].childNodes[0];
			var playerHref = playerLink.href;	
			farm.playerId = playerHref.substring(playerHref.lastIndexOf('uid=')+4);
			farm.playerName = playerLink.textContent;
			farm.villageLink = villageLink;
			
			UpdateFarm(farm);
		}
	}
	
	SaveReportProcData();
}


function UpdateFarmDataFromReport(farm) {	
	var defTd = xpathToFirstFound("//table[@class='defender']").rows[0].cells[1];
	var attTd = document.getElementById('attacker').rows[0].cells[1];
	
	var playerName = defTd.childNodes[0].textContent;
	var playerLink = defTd.childNodes[0].href;
	
	var villageLink = xpathToFirstFound("a[contains(@href, 'karte.php')]", defTd).href;
	var farmName = xpathToFirstFound("a[contains(@href, 'karte.php')]", defTd).textContent;
	var senderVillageHref = xpathToFirstFound("a[contains(@href, 'karte.php')]", attTd).href;
	
	farm.villageLink = villageLink;
	farm.villageName = farmName;
	farm.playerId = GetQueryStringValue('uid', ParseQueryString(playerLink.substring(playerLink.indexOf('?')+1)));
	farm.playerName = playerName;
	farm.senderVillageId = GetQueryStringValue('d', ParseQueryString(senderVillageHref.substring(senderVillageHref.indexOf('?')+1)));
	
	// fix the village list
	if(activeVillage == null) {
		FixVillageList(senderVillageHref.textContent, senderVillageId);
	}
	
	DebugAlert('updated farm with villageLink='+villageLink+', villageName='+farmName+', senderVillageId='+farm.senderVillageId+', playerName='+playerName+', playerId='+farm.playerId)
	
	return farm;
}

function UpdateFarm(farm, skipLoad) {	
	if(!skipLoad) {
		LoadReportProcData(); // ensure that we get the latest data possible
	}
	var farms = ReportProcessorData.farms;
	for(var i=0; i<farms.length; i++) {
		if(farms[i].villageId == farm.villageId)  {
			ReportProcessorData.farms[i] = farm;
			SaveReportProcData();
			return;
		}
	}
	
	// if we didn't find it we add it
	AddFarm(farm);
	SaveReportProcData();
}

function ToggleAutoAdjust(e) {
	var cbx;
	if (!e) var e = window.event;
	if (e.target) cbx = e.target;
	else if (e.srcElement) cbx = e.srcElement;
	if (cbx.nodeType == 3) // defeat Safari bug
		cbx = cbx.parentNode;
	
	var villageId = cbx.value;
	var autoAdjustEnabled = cbx.checked;
	
	var farm = GetSingleFarm(villageId);
	farm.autoAdjustEnabled = autoAdjustEnabled;
	
	UpdateFarm(farm, true);
}

function ToggleAttackType(e) {
	var cbx;
	if (!e) var e = window.event;
	if (e.target) cbx = e.target;
	else if (e.srcElement) cbx = e.srcElement;
	if (cbx.nodeType == 3) // defeat Safari bug
		cbx = cbx.parentNode;
	
	var villageId = cbx.value;
	var attackType = (cbx.checked) ? 2 : 1;
	
	var farm = GetSingleFarm(villageId);
	farm.attackType = attackType;
	
	UpdateFarm(farm, true);
}

/* ===================================== REPORT PROCESSING ======================================= */


function StartProcessing() {
	DebugAlert('Start processing reports!');
	LoadReportProcData(); // ensure that we get the latest data possible
	ReportProcessorData.activated = true;
	ReportProcessorData.lastReportLinkFollowed = null;
	SaveReportProcData();
	document.location.href = 'berichte.php?t=3';
}

function StopProcess() {
	LoadReportProcData(); // ensure that we get the latest data possible
	ReportProcessorData.activated = false;
	ReportProcessorData.lastReportLinkFollowed = null;
	SaveReportProcData();
	DebugAlert('Completed processing reports!');
	document.location.href = 'berichte.php';
}

function ProcessReportList() {
	LoadReportProcData(); // ensure that we get the latest data possible
	if(!ReportProcessorData.activated) {
		StopProcess();
		return;
	}

	var rptTable = document.getElementById('overview');
	
	// get the previous and next links 
	var previousUrl;
	var nextUrl;
	var lastCell = rptTable.rows[rptTable.rows.length-1].cells[2];
	if(lastCell.childNodes.length > 1) {
		var previousUrl = lastCell.childNodes[0].href;
		var nextUrl = lastCell.childNodes[1].href;
	}
	
	var lastNewReportUrl;
	var a;
	var newAttackCount = 0;
	var foundLastReportFollowed = false;
	
	DebugAlert('lastReportLinkFollowed:'+ReportProcessorData.lastReportLinkFollowed);
	
	
	// parse all rows and gather some intel
    var rows = document.getElementById("overview").rows;
    for(var i=1; i<rows.length-1; i++) {
		var td = rows[i].cells[1];		
		
		if(!td) {
			continue;
		}
		
		//check if it is a new report
		var isNew = false;
		var div = xpathToFirstFound("div", td);
		for(var c=0; c<div.childNodes.length; c++) {
			var node = div.childNodes[c];
			if(!node.tagName && node.textContent.length > 2)
				isNew = true;
		}
		
		// try to determine if the report is unread
		/*
		var newIndicator = "";
		
		if(BeyondActivated) { // using travian beyond
			newIndicator = td.childNodes[2].childNodes[2].textContent;
		}
		else {
			newIndicator = td.childNodes[2].childNodes[1].textContent;
		}
		var isNew = newIndicator.indexOf("("+phrases["NEW"]+")") > -1;
		
		// handle the mysteries of double byte characters
		if(phrases["NEW"].length == 1 && newIndicator.substring(1).charCodeAt(0) == phrases["NEW"].charCodeAt(0)) {
			isNew = true;
		}
		*/
		a = xpathToFirstFound("div/a[contains(@href, 'berichte.php')]", td);
		
		// check if we find the current report list page contains the report last handled
		if(ReportProcessorData.lastReportLinkFollowed != null && a.href.toLowerCase().indexOf(ReportProcessorData.lastReportLinkFollowed.toLowerCase()) > -1){
			DebugAlert('Found last followed report!');
			foundLastReportFollowed = true;
		}		
		
		if(isNew)
		{
			var img = xpathToFirstFound("img", td);
			var reportId = a.href.substring(a.href.lastIndexOf('id=')+3);
			
			/* attack, won w/o losses                           attack, won w losses    */
			if(img.className.indexOf('iReport1') > -1  ||  img.className.indexOf('iReport2') > -1) {
				newAttackCount++;
				lastNewReportUrl = a.href;
			}
		}
	}
	
	DebugAlert('Found '+newAttackCount+' new attacks last report url is:'+lastNewReportUrl+' and foundLastReportFollowed:'+foundLastReportFollowed);
	
	var lastReportPageNumber = ReportProcessorData.lastReportPageNumber; 
	var thisReportPageNumber = GetQueryStringValue('s') || 0;
	
	DebugAlert('Last page='+lastReportPageNumber+' This page='+thisReportPageNumber);
	
	// browse the report lists and find the (most likely) oldest attack with new-flag
	if(ReportProcessorData.lastReportPageNumber == null) {
		DebugAlert('lastReportPageNumber is null');
			
		if(!lastNewReportUrl) { // inga attacker med (ny)
			DebugAlert('no new attacks, stopping');
			StopProcess();
		}
		else {
			if(nextUrl && !foundLastReportFollowed) {
				DebugAlert('attacks found, checking next page...');
				ReportProcessorData.lastReportPageNumber = thisReportPageNumber
				SaveReportProcData();
				GoToPage(nextUrl, ReportProcessorData.delay); // make sure no reports are left behind
			}
			else {
				DebugAlert('attacks found, no next-page, going to report.');
				GoToPage(lastNewReportUrl, ReportProcessorData.delay);
			}
		}
	}
	else
	{
		DebugAlert('lastReportPageNumber is populated');
			
		if(lastNewReportUrl) // found at least 1 new attack report
		{
			// we came from a previous report list page	
			if(Number(lastReportPageNumber) <= Number(thisReportPageNumber) && nextUrl && !foundLastReportFollowed) {  
				DebugAlert('Going to next page... lastReportPageNumber:'+lastReportPageNumber+' thisReportPageNumber:'+thisReportPageNumber+' nextUrl:'+nextUrl);		
				SaveReportProcData(); 
				GoToPage(nextUrl, ReportProcessorData.delay); // make sure no reports are left behind
			}
			else {    // we have just visited the next report list page but didn't found any new reports so we went back here
				DebugAlert('Already visited the next page or no next page or found the previously handled report on this page, going to report ' + lastNewReportUrl);
				ReportProcessorData.lastReportPageNumber = null;
				SaveReportProcData();
				GoToPage(lastNewReportUrl, ReportProcessorData.delay);
			}
		}
		else {
			ReportProcessorData.lastReportPageNumber = thisReportPageNumber;
			SaveReportProcData();
			if(previousUrl) {
				DebugAlert('no attack erports found, going to previous page...');
				GoToPage(previousUrl, ReportProcessorData.delay);
			}
			else {
				DebugAlert('no attack reports found no previous page, stopping...');
				StopProcess();
			}
		}
	}
}

function GetFarmIdFromReportPage() {
	var farmLink = xpathToFirstFound("//table[@class='defender']//a[contains(@href, 'karte.php?d=')]");
	if(!farmLink) {
		return null;
	}
	var farmUrl = farmLink.href;
	return GetQueryStringValue('d', ParseQueryString(farmUrl.substring(farmUrl.indexOf('?')+1)));	
}
function GetSenderIdFromReportPage() {
	var attTd = document.getElementById('attacker').rows[0].cells[1];
	var senderVillageHref = xpathToFirstFound("a[contains(@href, 'karte.php')]", attTd).href;
	return GetQueryStringValue('d', ParseQueryString(senderVillageHref.substring(senderVillageHref.indexOf('?')+1)));;
}

function ResendMore() {
	HandleSingleReport((Number(ReportProcessorData.incRatio) + 100) / 100, true);
}

function ResendLess() {
	HandleSingleReport((100 - Number(ReportProcessorData.decRatio)) / 100, true);
}
function ResendSame() {
	HandleSingleReport(1, true);
}
function AddToUnhandled() {
	var reportLink = crtPage;
	var reportTitle = document.getElementById('report_surround').rows[0].cells[1].textContent;
	var currentReport = new Report(reportLink, reportTitle);
	currentReport.log = 'Saved';
	
	LoadReportProcData(); // ensure that we get the latest data possible
	AddUnhandledReport(currentReport);
	SaveReportProcData();
}
function HandleSingleReport(troopMultiplier, manualOverride) {	
	LoadReportProcData(); // ensure that we get the latest data possible
	
	var reportLink = crtPage;
	var reportTitle = document.getElementById('report_surround').rows[0].cells[1].textContent;
	var currentReport = new Report(reportLink, reportTitle);
	
	var farmId = GetFarmIdFromReportPage();
	if(!farmId) {
		DebugAlert('Farm no longer exists')
		if(ReportProcessorData.activated) {
			currentReport.log = "Farm no longer exists";
			if(AddUnhandledReport(currentReport)) {
				SaveReportProcData();
			}
			document.location.href = 'berichte.php?t=3';
		}
		else {
			alert('Farm no longer exists')
		}
		return;
	}
	
	
	ReportProcessorData.lastReportLinkFollowed = reportLink;
	SaveReportProcData();
	
	// if not a farm we shouldn't process it, or else sweeps might be handled as farming raids and everything goes down the toilet
	if(ReportProcessorData.activated && !IsFarm(farmId)) {
		DebugAlert('not a farm and in automated mode')
		currentReport.log = "Not a farm";
		if(AddUnhandledReport(currentReport)) {
			SaveReportProcData();
		}
		document.location.href = 'berichte.php?t=3';
		return;
	}
	DebugAlert('is a farm or will be added')
	
	var farm = GetSingleFarm(farmId);  // will return a new blank farm if not found
	farm = UpdateFarmDataFromReport(farm);
	
	var attackingTroopType, attacking, lost;
	var attCells = document.getElementById('attacker').rows[2].cells;
	var resultCells = document.getElementById('attacker').rows[3].cells;
	for(var i=1; i<10; i++) {
		attacking = attCells[i].textContent;
		lost = resultCells[i].textContent;
		
		if(attacking && attacking!=0) {		
			attackingTroopType = i;
			var lossRatio = 100 / (attacking / lost);
			if(ReportProcessorData.activated && lossRatio > Number(ReportProcessorData.lossAlertPercentage)) { 
				DebugAlert('lost more than '+ReportProcessorData.lossAlertPercentage+'% troops');
				currentReport.log = "Major loss";
				if(AddUnhandledReport(currentReport)) {
					SaveReportProcData();
				}
				document.location.href = 'berichte.php?t=3';
				return;
			}
			break;
		}
	}
	
	// check bounty and rectify the number of attackers
	var bountyBody;
	var bodies = document.getElementById('attacker').tBodies;
	for(var b=0; b<bodies.length; b++) {
		if(bodies[b].className=='goods') {
			bountyBody = bodies[b];
			break;
		}
	}
	
	var bountyNodes = bountyBody.rows[0].cells[1].childNodes;
	var bountyText = bountyNodes[bountyNodes.length-1].textContent;
	
	var bounty = Number(bountyText.split('/')[0]);
	var capacity = Number(bountyText.split('/')[1]);
	
	if(troopMultiplier==null) {
		troopMultiplier = 1;
		if(farm.autoAdjustEnabled) {
			if(bounty == capacity) {
				troopMultiplier = (Number(ReportProcessorData.incRatio) + 100) / 100;
				//troopMultiplier = 1.5;
			}
			else {
				if(bounty < capacity/4) {
					troopMultiplier = (100 - Number(ReportProcessorData.decRatio)) / 100;
					//troopMultiplier = 0.8;
				}
			}
			
			if(attacking<minTroop) {
				attacking = Number(ReportProcessorData.minRaiders);
			}
		}
	}
	attacking = Math.round(attacking * troopMultiplier);
	
	// update the farm attacker settings
	farm.troopNumber = attacking;
	farm.troopType = attackingTroopType;
	
	// update farming statistics: number of times farmed and average bounty
	var average = farm.averageBounty;
	var times = farm.attackedCount;
	farm.averageBounty = Math.round(((average * times) + bounty) / (times + 1));
	farm.attackedCount = times + 1;
	
	// save farm
	UpdateFarm(farm);
	
	// set the farm as "in process"
	ReportProcessorData.farmInProcess = farm;
	ReportProcessorData.reportInProcess = currentReport;
	
	
	
	// save all changes
	SaveReportProcData();
	
	// go the attack screen
	document.location.href = "a2b.php?z=" + farm.villageId;	
}

function AddUnhandledReport(report) {	
	if(!ReportProcessorData.unhandledReports){
		ReportProcessorData.unhandledReports = new Array();
	}
	DebugAlert('Adding unhandled report');
	
	// don't create doubles
	for(var i=0; i<ReportProcessorData.unhandledReports.length; i++) {
		if(ReportProcessorData.unhandledReports[i].id == report.id) {
			return false;
		}
	}
	
	ReportProcessorData.unhandledReports[ReportProcessorData.unhandledReports.length] = report;
	
	return true;
}

function RemoveReport(e) {
	var cbx;
	if (!e) var e = window.event;
	if (e.target) cbx = e.target;
	else if (e.srcElement) cbx = e.srcElement;
	if (cbx.nodeType == 3) // defeat Safari bug
		cbx = cbx.parentNode;
	
	var reportId = cbx.value;
	RemoveUnhandledReport(reportId);
	
	var row = cbx.parentNode.parentNode;
	row.parentNode.removeChild(row);
}

function RemoveUnhandledReport(id) {
	LoadReportProcData();
	
	var rpts = ReportProcessorData.unhandledReports;
	var idx = -1;
	for(var i = 0; i<rpts.length; i++) {
		if(rpts[i].id == id) {
			idx = i;
			break;
		}
	}
	
	if(idx > -1) {
		ReportProcessorData.unhandledReports.splice(idx, 1);
		SaveReportProcData();
	}	
}

// adds the id property a report
function AmendReport(report) {
	report.id = GetQueryStringValue('id', ParseQueryString(report.link.substring(report.link.indexOf('?')+1)));	
	if(report.log == null) {
		report.log = "";
	}
}

function Report(link, title, log) {
	this.link = link;
	this.title = title;
	this.log = (log)?log:"";
	this.id = GetQueryStringValue('id', ParseQueryString(link.substring(link.indexOf('?')+1)));
}


/* ================================== ATTACK ==================================== */


function HandleAttackPage()
{
	// get farm id
	var farmId = GetQueryStringValue('z');
		
	if(farmId == null) {
		DebugAlert('Failed to retrieve farm id!');
		StopProcess();
	}
	
	LoadReportProcData(); // ensure that we get the latest data possible
	
	if(ReportProcessorData.farmInProcess == null || ReportProcessorData.farmInProcess.villageId != farmId) {
		nothingToProcess = true;
		DebugAlert('not the farm in process. Checking for fake sending');
		
		var farm = GetFakeTarget(farmId);
		if(!farm) {
			return;
		}
	}
	else {
		var farm = GetSingleFarm(farmId);
		
		// make sure the right sender village is selected
		if(activeVillage.id != "" && activeVillage.id != farm.senderVillageId) {
			DebugAlert('wrong sender, changing...');
			var village = GetVillage(farm.senderVillageId);
			if(!village) {			
				SaveReportAndContinue("Sender N/A");
				if(ReportProcessorData.activated) {
					document.location.href = 'berichte.php?t=3';
				}
				else {
					alert('Sender village no longer exists. The report was added to the unhandled reports list.');
				}
				return;
			}
			DebugAlert('going to '+village.setUrl);
			document.location.href = village.setUrl;
			return;
		}
	}
	// select attack type
	var attackType = farm.attackType || 2;
	var radioValue = (attackType==2) ? 4 : 3;
	//document.getElementById('coords').rows[attackType].cells[0].childNodes[0].childNodes[0].click();
	xpathToFirstFound("//input[@type='radio' and @value='"+radioValue+"']", document.getElementById('coords')).click();
		
	// fill out the attack form
	var troopBox = document.getElementsByName('t'+farm.troopType)[0]; //document.getElementById('t' + farm.troopType)   for some reason this stopped working
	
	var troopMaxLink = xpathToFirstFound("a", troopBox.parentNode);
	if(!troopMaxLink) {
		availableTroops = 0;
	}
	else {
		var availableTroops = troopMaxLink.textContent;
		//var availableTroops = troopBox.parentNode.childNodes[5].textContent;	
		availableTroops = Number(availableTroops.substring(1, availableTroops.length-1));
	}
	if(availableTroops < Number(farm.troopNumber)) {
		SaveReportAndContinue('Troops N/A');
		if(ReportProcessorData.activated) {
			document.location.href = 'berichte.php?t=3';
		}
		else {
			alert('Troops N/A. Need '+farm.troopNumber+' of troop type '+farm.troopType+'. The report was added to the unhandled reports list.');
		}
		return;
	}
	troopBox.value = farm.troopNumber;
		
	DebugAlert('Posting form...')
		
	// Post the form
	ClickButtonDelayed('btn_ok', ReportProcessorData.delay);
}
function SaveReportAndContinue(logMsg) {
	if(ReportProcessorData.reportInProcess == null) {
		return;
	}
	LoadReportProcData(); // ensure that we get the latest data possible
	ReportProcessorData.reportInProcess.log = logMsg;
	AddUnhandledReport(ReportProcessorData.reportInProcess);
	ReportProcessorData.farmInProcess = null;
	ReportProcessorData.reportInProcess = null;
	SaveReportProcData();	
}

function SendAttack() {
	var tbl = document.getElementById('short_info');
	if(!tbl) {	
		// returning troops....
		return;
	}
	
	var farmUrl = tbl.rows[0].cells[1].childNodes[0].href;
	var farmId = GetQueryStringValue('d', ParseQueryString(farmUrl.substring(farmUrl.indexOf('?')+1)));
	var farm;
	LoadReportProcData(); // ensure that we get the latest data possible
	
	if(ReportProcessorData.farmInProcess == null) {
		// check fakes
		farm = GetFakeTarget(farmId);
		if(!farm) {
			return;
		}
		else {
			// clean up the fake target queue
			var idx = ReportProcessorData.fakeTargetVillages.indexOf(farmId);
			if(idx > -1) {
				ReportProcessorData.fakeTargetVillages.splice(idx, 1);
				SaveReportProcData();
			}
		}
	}	
	else {	
		if(ReportProcessorData.farmInProcess.villageId != farmId) {
			DebugAlert('not the farm in process '+ReportProcessorData.farmInProcess.villageId+' vs ' + farmId);
			return;
		}
		
		var farm = GetSingleFarm(farmId);
		
		// make sure the right sender village is selected
		if(activeVillage.id!="" && activeVillage.id != farm.senderVillageId) {
			alert('Wrong sender village, saving the report as unhandled and returning to report processing')
			
			ReportProcessorData.reportInProcess.log = 'Village changed';
			AddUnhandledReport(ReportProcessorData.reportInProcess);
			ReportProcessorData.reportInProcess = null;
			ReportProcessorData.farmInProcess = null;
			SaveReportProcData();
			
			document.location.href = 'berichte.php?t=3';
			
			// TODO
			// this might be solved by switching the village and somehow retaining the current target... 
			
			//var village = GetVillage(farm.senderVillageId);
			//document.location.href = village.setUrl;
			return;
		}
		
		ReportProcessorData.farmInProcess = null;
		ReportProcessorData.reportInProcess = null;
		ReportProcessorData.returnToReports = true;
		SaveReportProcData();
	}
	DebugAlert('Sending troops...')
	
	ClickButtonDelayed('btn_ok', ReportProcessorData.delay);
}

/* ================================= FAKES ======================================= */

function SendFake(e) {	
	var img;
	if (!e) var e = window.event;
	if (e.target) img = e.target;
	else if (e.srcElement) img = e.srcElement;
	if (img.nodeType == 3) // defeat Safari bug
		img = img.parentNode;
	
	var villageId = img.parentNode.getAttribute('villageid'); 
	
	LoadReportProcData(); // ensure that we get the latest data possible
	
	if(ReportProcessorData.fakeTargetVillages == null) {
		ReportProcessorData.fakeTargetVillages = new Array();
	}
	
	// check for dupes
	var targets = ReportProcessorData.fakeTargetVillages;
	for(var t=0; t<targets.length; t++) {
		if(targets[t] == villageId) {
			return false;
		}
	}
	ReportProcessorData.fakeTargetVillages[targets.length] = villageId;
	SaveReportProcData();
}

function SetFakeTroopType(e) {
	var radio;
	if (!e) var e = window.event;
	if (e.target) radio = e.target;
	else if (e.srcElement) radio = e.srcElement;
	if (radio.nodeType == 3) // defeat Safari bug
		radio = radio.parentNode;
	
	var fakeTroopType = radio.value;
	
	LoadReportProcData(); // ensure that we get the latest data possible
	ReportProcessorData.fakeTroopType = fakeTroopType;
	SaveReportProcData();
}

function GetFakeTarget(villageId) {
	var fakeTargets = ReportProcessorData.fakeTargetVillages;
	for(var f=0; f<fakeTargets.length; f++) {
		if(fakeTargets[f] == villageId) {				
			// create a dummy farm object
			var farm = new Object();
			farm.attackType = 1; //1=attack 2=raid
			farm.troopType = ReportProcessorData.fakeTroopType;
			farm.troopNumber = 1;
			return farm;
		}
	}
}

/* ================================= VILLAGE LIST ======================================= */

function LoadVillageList() {
	villages = new Array();
	
	var extraVillageData = ReportProcessorData.extraVillageData;
	
	var vTbl = document.getElementById('vlist');
	if(!vTbl) {
		activeVillage = new Village("", "", 0, 0, "", false);
		return villages;
	}
	
	for(var i=1; i<vTbl.rows.length; i++) {
		var row = vTbl.rows[i];
		
		var name = row.cells[1].textContent;
		var xy = row.cells[2].textContent;
		var xyArray = FilterString(xy, "-0123456789|").split('|');
		var x = xyArray[0];
		var y = xyArray[1];
		var setUrl = row.cells[1].childNodes[0].childNodes[0].href;
		//var setUrl = xpathToFirstFound(".//a", row).href; 
		var id = xy2id(x, y);
		
		var tMinus = 0;
		var showAsSender = false;
		var tournamentSquareLevel = 0;
		var etaCell = CreateTableCell(" ");
		
		// get ExtraVillageData
		var ExtraVillageData = GetExtraVillageDataForVillage(id, true);
		if(ExtraVillageData) {
			tMinus = ExtraVillageData.ETA;
			showAsSender = ExtraVillageData.showAsSender;
			tournamentSquareLevel = ExtraVillageData.tournamentSquareLevel;
			
			// append ETA info to the rendered village list
			var etaCell;
			if(tMinus) {
				var ETA = new Date(tMinus*1);
				if(ETA > ((new Date().getTime())))
				{
					ETA = ETA.toTimeString().substr(0, 8);
					etaCell = CreateTableCell(ETA);
				}
			}
		}
		etaCell.className = "eta";
		row.appendChild(etaCell);
		
		var village = new Village(name, id, x, y, setUrl, showAsSender, tMinus, tournamentSquareLevel);
		
		if(row.cells[0].className.indexOf('hl') > -1) {
			activeVillage = village;
		}
		villages[villages.length] = village;
	}	
}

function FixVillageList(name, id) {
	if( villages.length == 0) {
		var first = new Village(name, id, 0, 0, "");
		activeVillage = first;
		villages[0] = first;
	}
}

function GetVillage(id) {
	for(var i=0; i<villages.length; i++) {
		if(villages[i].id == id) {
			return villages[i];
		}
	}
}
function GetExtraVillageDataForVillage(villageId, noLoad) {
	if(!noLoad)
		LoadReportProcData();
	var extraVillageData = ReportProcessorData.extraVillageData;
	if(extraVillageData) {
		for(var r=0; r < extraVillageData.length; r++) {
			if(extraVillageData[r].villageId == villageId) {
				return extraVillageData[r];
			}
		}
	}
}

function UpdateExtraVillageData(villageId, propName, newValue) {	
	LoadReportProcData();
	
	DebugAlert('Setting '+propName+' in village '+villageId+' to '+newValue);
	
	var extraVillageData = ReportProcessorData.extraVillageData;
	var evdExists = false;
	if(extraVillageData) {
		for(var r=0; r < extraVillageData.length; r++) {
			if(extraVillageData[r].villageId == villageId) {
				eval('extraVillageData[r].'+propName+' = newValue');
				evdExists = true;
				break;
			}
		}
	}
	if(!evdExists) {
		if(!extraVillageData)
			extraVillageData = new Array();
		var evd = new ExtraVillageData(villageId);
		eval('evd.'+propName+' = newValue');
		extraVillageData[extraVillageData.length] = evd;
	}
	
	// update the current village list as well
	eval('GetVillage(villageId).'+propName+' = newValue');
	
	ReportProcessorData.extraVillageData = extraVillageData;
	
	SaveReportProcData();
}

function ResolveVillageName(id) {
	var village = GetVillage(id);
	if(village) {
		return village.name;
	}
	
	return '?';
}

function Village(name, id, x, y, setUrl, showAsSender, ETA, tournamentSquareLevel) {
	this.name = name;
	this.id = id;
	this.x = x;
	this.y = y;
	this.setUrl = setUrl;
	this.showAsSender = showAsSender;
	this.ETA = ETA;
	this.tournamentSquareLevel = tournamentSquareLevel;
}

function ExtraVillageData(villageId) {
	this.villageId = villageId;
	this.ETA = "";
	this.tournamentSquareLevel = 0;
	this.showAsSender = false;
}

/*===================================== GET ETA =================================================*/

function TrackETAs() {
	var incomingAttackETA = GetFirstETA();
	
	if(incomingAttackETA == activeVillage.ETA) {
		return;
	}
	
	UpdateExtraVillageData(activeVillage.id, 'ETA', incomingAttackETA);
}

/*
att1 incoming attack
att3 incoming oasis attack
def1 returning troops
att2 outgoing attack
*/

function GetFirstETA() {
	var villageAttack = GetTminus(1);
	var oasisAttack = GetTminus(3);
	var firstETA;
	
	if(villageAttack != null){
		if(oasisAttack != null && oasisAttack < villageAttack) {
			firstETA = oasisAttack;
		}
		else {
			firstETA = villageAttack;
		}
	}
	else{
		if(oasisAttack != null) {
			firstETA = oasisAttack;
		}
	}
	
	if(firstETA != null) {
		//return new Date((new Date()).getTime() + (firstETA*1000));
		return (new Date()).getTime() + (firstETA*1000);
	}
}

/*
attackType = 1 (attack)  3 (oasis attack)
in seconds
*/
function GetTminus(attackType) {
	var node = xpathToFirstFound(".//img[@class='att"+attackType+"']", document.getElementById('movements'));
	while(node != null && node.tagName.toUpperCase() != 'TR') {
		node = node.parentNode;
	}
	if(node != null) {
		var countdown = xpathToFirstFound(".//span[contains(@id, 'timer')]", node);
		if(countdown != null) {
			var bits = countdown.textContent.split(':');
			return (bits[0]*60*60 + bits[1]*60 + bits[2]*1);
		}
	}
}




/* ===================================== SENDER HINTS ================================================= */

function ShowSenderSetup() {	
	var table = CreateTable('rptPrcTbl','sendersTbl');
	
	AddTableHeaderTextCell(table, 'Village');
	AddTableHeaderTextCell(table, 'Tournament Sq.');
	AddTableHeaderTextCell(table, 'Show');
	
	var tBody = table.tBodies[0];
	
	for(var i=0; i<villages.length; i++) {
		var row = document.createElement('tr');
		tBody.appendChild(row);
		
		var td = document.createElement('td');
		td.appendChild(document.createTextNode(villages[i].name));
		row.appendChild(td);
		
		var td = document.createElement('td');		
		var select = document.createElement('select');
		select.name = "villageTS_"+i;
		select.id = "villageTS_"+i;
		select.setAttribute('villageId', villages[i].id);
		for(var t=0; t<21; t++) {
			select.options[t] = new Option(t, t, false, (villages[i].tournamentSquareLevel==t));
		}
		select.addEventListener("change", UpdateTSLevel, true);		
		td.appendChild(select);
		row.appendChild(td);
		
		var td = document.createElement('td');		
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "senderVillage_"+i;
		checkbox.value = villages[i].id;
		checkbox.id = "senderVillage_"+i;
		checkbox.checked = villages[i].showAsSender;
		checkbox.addEventListener("change", ToggleShowAsSender, true);		
		td.appendChild(checkbox);
		row.appendChild(td);
	}
	
	// a container
	senderSetupDialogElement = document.createElement('div');
	senderSetupDialogElement.id = "rptPrcSenderSetup";
	senderSetupDialogElement.className = "rptPrcDialog";
	
	// close button
	var btn = document.createElement("button");
	btn.textContent = "Close";
	btn.addEventListener("click", HideSenderSetup, true);
	senderSetupDialogElement.appendChild(btn);
	
	// instructions
	var p = document.createElement('p');
	p.appendChild(document.createTextNode('Select your farming villages'));
	
	senderSetupDialogElement.appendChild(p);
	
	senderSetupDialogElement.appendChild(table);
	
	insertAfter(document.getElementById('side_info').lastChild, senderSetupDialogElement);
}

function HideSenderSetup() {
	if (senderSetupDialogElement) {
		senderSetupDialogElement.parentNode.removeChild(senderSetupDialogElement);
	}
}

function ToggleShowAsSender(e) {
	var cbx;
	if (!e) var e = window.event;
	if (e.target) cbx = e.target;
	else if (e.srcElement) cbx = e.srcElement;
	if (cbx.nodeType == 3) // defeat Safari bug
		cbx = cbx.parentNode;
	
	var villageId = cbx.value;
	
	UpdateExtraVillageData(villageId, 'showAsSender', cbx.checked);
}

function UpdateTSLevel(e) {
	var select;
	if (!e) var e = window.event;
	if (e.target) select = e.target;
	else if (e.srcElement) select = e.srcElement;
	if (select.nodeType == 3) // defeat Safari bug
		select = select.parentNode;
	
	var villageId = select.getAttribute('villageId');
	var tournamentSquareLevel = select.options[select.selectedIndex].value;
	
	UpdateExtraVillageData(villageId, 'tournamentSquareLevel', tournamentSquareLevel);
}

/* ===================================== SETTINGS ================================================= */

function SaveSettings(e) {
	var inputElement;
	if (!e) var e = window.event;
	if (e.target) inputElement = e.target;
	else if (e.srcElement) inputElement = e.srcElement;
	if (inputElement.nodeType == 3) // defeat Safari bug
		inputElement = inputElement.parentNode;
	
	var inputValue;
	
	if(inputElement.options) {
		inputValue = inputElement.options[inputElement.selectedIndex].value;
	}
	else {
		inputValue = inputElement.value;
	}
	
	var valueName = inputElement.getAttribute('valueName');
	
	LoadReportProcData(); // ensure that we get the latest data possible
	eval("ReportProcessorData." + valueName + " = inputValue");
	SaveReportProcData();
}

function ShowExportDialog() {
	var box = ShowImportExportDialog();
	var userId = GetUserId();
	var serverName = GetServerName();
	
	box.value = GM_getValue(serverName+userId+'ReportProcessorData');	
}
function ShowImportDialog() {	
	var box = ShowImportExportDialog();
	
	var btn = document.createElement("button");
	btn.textContent = "Import";
	btn.addEventListener("click", DoImport, true);
	importExportDialogElement.appendChild(btn);
}
function ShowImportExportDialog() {
	HideFarmSettings();

	importExportDialogElement = document.createElement('div');
	importExportDialogElement.id = 'importExportDialogElement';
	
	var box = document.createElement('textarea');	
	importExportDialogElement.appendChild(box);
	
	// close button
	var btn = document.createElement("button");
	btn.textContent = "Close";
	btn.addEventListener("click", HideImportExportDialog, true);
	importExportDialogElement.appendChild(btn);
	
	insertAfter(document.getElementById('side_info').lastChild, importExportDialogElement);
	
	return box;
}
function DoImport(e) {
	var btn;
	if (!e) var e = window.event;
	if (e.target) btn = e.target;
	else if (e.srcElement) btn = e.srcElement;
	if (btn.nodeType == 3) // defeat Safari bug
		btn = btn.parentNode;
	
	// get the textarea
	var textArea = xpathToFirstFound("textarea", btn.parentNode);
	
	// save changes
	if(confirm('This will replace all your current farms')) {
		try {
			ReportProcessorData = eval(textArea.value, 'new Object()');
			SaveReportProcData();
			HideImportExportDialog();
			alert("Import Complete!");
		}
		catch(e) {
			alert(e.message);
		}
	}
}
function HideImportExportDialog() {
	if (importExportDialogElement) {
		importExportDialogElement.parentNode.removeChild(importExportDialogElement);
	}
}

/* ===================================== TOOLS ================================================= */

function GoToPage(url, delay) {
	if(delay && !isNaN(delay)) {
		setTimeout("document.location.href = '"+url+"';", delay*1000);
	}
	else {
		document.location.href = url;
	}
}
function ClickButtonDelayed(buttonId, delay) {
	if(delay && !isNaN(delay)) {
		setTimeout("document.getElementById('"+buttonId+"').click();", delay*1000);
	}
	else {
		document.getElementById(buttonId).click();
	}
}

function insertAfter(node, referenceNode) {node.parentNode.insertBefore(referenceNode, node.nextSibling);};//insert a referenceNode after a specified node

function ParseQueryString(qstring) {	
	var queryStringValuePairs = new Array();
	
	var valuePairs = qstring.split('&');
	
	for(var i = 0; i<valuePairs.length; i++) {
		var valuePair = valuePairs[i].split('=');
		queryStringValuePairs[queryStringValuePairs.length] = new ValuePair(valuePair[0], valuePair[1]);
	}
	return queryStringValuePairs;
}

function ValuePair(key, value) {
	this.key = key;
	this.value = value;
}

// locates a value in a parsed querystring. If no qstring is passed we check the global querystring array
function GetQueryStringValue(key, qstring) {
	if(!qstring) {
		qstring = queryStringValuePairs;
	}
	
	key = key.toLowerCase();
	
	for(var i=0; i<qstring.length; i++) {
		if(qstring[i].key.toLowerCase() == key) {
			return qstring[i].value;
		}
	}
	return null;
}

function FilterString(str, allowedChars) {
	var clean = "";
	for(var i=0; i<str.length; i++) {
		if(allowedChars.indexOf(str[i]) > -1) {
			clean += str[i];
		}
	}
	return clean;
}

function GetUserId() {
	var profileLink = xpathToFirstFound("//div[@id='side_navi']//a[contains(@href, 'spieler.php')]") + "";  
	
	if (profileLink) {
		return GetQueryStringValue('uid', ParseQueryString(profileLink.substring(profileLink.indexOf('?')+1)));
	}
	return;
}
function GetServerName() {
	var serverName = window.location.href;
	serverName = serverName.substring(serverName.indexOf('/')+2);
	serverName = serverName.substring(0, serverName.indexOf('/'));
	return serverName;
}
	
function xpathToList(query, startNode) {
	if (!startNode) startNode = document;
    return document.evaluate(query, startNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathToFirstFound(query, startNode) {
	if (!startNode) startNode = document;
    return document.evaluate(query, startNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


// Convert XY to a cell/village id
function xy2id(x, y) {
	return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
}
// Convert villagedId to XY
function id2xy(villagedId) {
	var arrXY = new Array; 
	var ivid = parseInt(villagedId); 
	arrXY[0] = (ivid%801?(ivid%801)-401:400); 
	arrXY[1] = 400 - (ivid - 401 - arrXY[0]) / 801; 
	return arrXY;
}

// calculates the distance between 2 villages
function getDistance(sx1, sy1, sx2, sy2) {
	var x1 = parseInt(sx1); var y1 = parseInt(sy1); var x2 = parseInt(sx2); var y2 = parseInt(sy2);
	dX = Math.min(Math.abs(x2 - x1), Math.abs(801 - Math.abs(x2 - x1)));
	dY = Math.min(Math.abs(y2 - y1), Math.abs(801 - Math.abs(y2 - y1)));
	dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
	return dist;
};

// troopType = troop type 1-11
// raceNumber =  parseInt(ReportProcessorData.race) 0, 1  or 2
// baseDistance = go figure
// tournamentLvl = leave empty or set to 0 if no tournament present
function getTravelTime(troopType, raceNumber, distance, tournamentLvl) {
	var raceAdd = (raceNumber*10);
	var speed = troopStats[raceAdd + troopType][1];
	
	var baseDistance = distance;
	var tournamentDistance = 0;
	var serverType = (isSpeedServer) ? 2 : 1;
	
	if(tournamentLvl != null && tournamentLvl > 0 && distance > 30) {
		tournamentDistance = distance - 30;
		baseDistance = 30;
	}
	
	return Math.round(baseDistance * 3600 / speed / serverType + tournamentDistance * 3600 / speed / serverType / (1 + tournamentLvl/10));
}

// load and speed
var troopStats = new Array();
//Romans
troopStats[1] = [50,6];//Legionnaire
troopStats[2] = [20,5];//Praetorian
troopStats[3] = [50,7];//Imperian
troopStats[4] = [0,16];//Equites legati
troopStats[5] = [100,14];//Equites imperatoris
troopStats[6] = [70,10];//Equites cesaris
//Teutons
troopStats[11] = [60,7];//Club swinger
troopStats[12] = [40,7];//Spearman
troopStats[13] = [50,6];//Axeman
troopStats[14] = [0,9];//Scout
troopStats[15] = [110,10];//Paladin
troopStats[16] = [80,9];//Teutonic knight
//Gauls
troopStats[21] = [35,7];//Phalanx
troopStats[22] = [45,6];//Swordsman
troopStats[23] = [0,17];//Pathfinder
troopStats[24] = [75,19];//Theutates thunder
troopStats[25] = [35,16];//Druidrider
troopStats[26] = [65,13];//Haeduan

function formatTime(sec, aFormat){
		//aFormat: 0 = h:mm:ss (h = 0->... can be more than 24); 1 = days, h:mm:ss; 2 = h:mm:ss (h = 0->23:59:59 = only time)
		if (sec > -1) {
			var h = Math.floor(sec/3600);
			var m = Math.floor(sec/60) % 60;
			var s = parseInt(sec % 60);
			var ht = "";
			switch (aFormat) {
				case 1: var d = Math.floor(h/24); h = h - d * 24; ht += d + ", "; break;
				case 2: h = h % 24; break;
			};
			ht += h + ":" + (m > 9 ? m: '0' + m) + ":" + (s > 9 ? s : '0' + s);
		} else ht = "0:00:0?";
		h = null; m = null; s = null; d = null;
		return ht;
	};
	

/* update script, inspired by Travian Beyond */
function AutoUpdate() {
	var scriptUrl = 'http://userscripts.org/scripts/source/65944.user.js'
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: scriptUrl + '?source',
		onload: function(result) {
			if (result.status != 200)
				return;
			if (!result.responseText.match(/@version\s+([\d.]+)/))
				return;
			var latestVersion = RegExp.$1;
			if (latestVersion == scriptVersion) {
				alert('You already have the latest version installed!');
				return;
			} 
			else {
				if (latestVersion < scriptVersion) {
					alert('You have a later version than available. You must have been into the future! Who will win the Superball this year? Is everyone wearing silver tights in the future?');
					return;
				} 
				else {
					if (window.confirm('There is a new version available, would you like to update?')) {
						window.location.href = scriptUrl;
					}
				}
			}
		}
	});
};


// cookies are used when running script in Chrome
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else {
		var expires = "";
	}
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name,defaultvalue) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1,c.length);
		}
		if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length,c.length);
		}
	}
	return defaultvalue;
}


function CreateTable(className, id) {
	var table = document.createElement("TABLE"); 
	table.className = className;
	table.id = id;
	var tHead = document.createElement("THEAD");
	var tBody = document.createElement("TBODY");
	
	table.appendChild(tHead);
	table.appendChild(tBody);
	
	table.tHead.appendChild(document.createElement('tr'));
	
	return table;
}

function AddTableHeaderTextCell(table, cellContent) {
	return AddTableHeaderCell(table, document.createTextNode(cellContent));
}
function AddTableHeaderCell(table, cellContent) {
	var th = document.createElement('th')
	th.appendChild(cellContent);
	table.tHead.rows[0].appendChild(th);
	
	return table;
}
function CreateTableCell(cellContent) {
	var td = document.createElement('td');
	td.appendChild(document.createTextNode(cellContent));
	return td
}

function CreateLink(href, title) {
	var a = document.createElement('a')
	a.href = href;
	a.appendChild(document.createTextNode(title));
	
	return a;
}

function CreateInput(elementId, value, caption, eventType, eventHandler, valueName) {
	var txt = document.createElement('input');
	txt.name = elementId;
	txt.id = elementId;
	txt.value = value;
	txt.setAttribute('valueName', valueName);
	txt.addEventListener(eventType, eventHandler, true);
	
	var container = document.createElement('div');
	container.appendChild(document.createTextNode(caption + ': '));
	container.appendChild(txt);
	
	return container;
}
function CreateImage(imgUrl, className) {
	var img = document.createElement('img')
	img.src = imgUrl;
	if(className)
		img.className = className;
	return img;
}

function AmendFarmList() {
	DebugAlert('Updating Farm List')
		
	LoadReportProcData(); // ensure that we get the latest data possible
	
	var farms = ReportProcessorData.farms;
	for(var i=0; i<farms.length; i++) {
		farms[i].autoAdjustEnabled = farms[i].autoIncreaseEnabled;
		farms[i].autoIncreaseEnabled = null;
		if(farms[i].attackType == null) {
			farms[i].attackType = 2;
		}
	}
	
	SaveReportProcData();
}

function DebugAlert(msg) {
	if(debugAlerts)
		alert(msg);
}

/* ===================================== BIG TEXTS ================================================= */

function GetFarmHelpText() {

	var helpText = document.createElement('div');
	helpText.id = "farmSettingsHelp";

	var text = new Array();
	text[0] = 'These villages are marked as farms and when you click the "Start Process" button, only reports of attacks to these villages will be resent.\n\n'
	text[1] = 'Auto adjust : Enable this to have the number of attackers auto adjusted. If they came back from a raid with full bounty, their numbers will be increased with 50%. However, if they come back empty handed, their numbers will decrease with 20%.\n\n';
	text[1] = 'Raid : Disable this checkbox to run normal attack instead of raids.\n\n';
	text[2] = 'To remove a farm from the list, click the village name and use the link on the village page.\n\n';
	
	for( var t=0; t<text.length; t++) {
		var paragraph = document.createElement('p');
		paragraph.appendChild(document.createTextNode(text[t]));
		helpText.appendChild(paragraph);
	}
	
    return helpText;
}


/* ===================================== IMAGES ================================================= */


function GetImage(imageName) {
	var img_src;
	switch (imageName) {
		case 'bandit':
			img_src = 'data:image/gif;base64,' +
				'R0lGODlhDwAPAPcAAAsLCw0NDRISEhQUFBUVFRYWFhoaGiAeFScjFyEhISIiIicnJygoKCsrKzExMTIy' +
				'MkdFPnFeH29fLWBUMHNfIXpnKHxpK39rKn9rLX1sNk5OTlJSUltYUVxcXHJsV350U2JiYnp6eo94MJN8' +
				'MYZ8XYF6ZK2ROa6SObKVN4GAf4qHf7Gic7aoesekNsGhOc6rPNGtONKuOtm0P+O7Oue9OfLGO/7RQf7Z' +
				'Yv7aaYGBgYODg4SEhIqKip6dl5mZmaGhoaenp6ysrLm0qLCwsLOzs729vcTEwsTExMXFxcnJyc7OztLQ' +
				'ytDQ0N7e3v723uDg4OXl5e7u7u/v7/767/Hx8fT09PX19fj4+P7+/v///wAAAAAAAAAAAAAAAAAAAAAA' +
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
				'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
				'ACwAAAAADwAPAAAIyQCzCJRCBMQDAA86AIkisCGUHQMMKACgwMCAHVAaXtHxIIBEigYCOAhhRWASBww8' +
				'TqwYYEGDI1iq8BCwQCXIlgJyUHmygaZNlgsEaGjCZAECEShYCFkhhAUKEQgSKClSYESNFxCMcEgxBUeN' +
				'EQSK/CBggYYMD0tK9HByg4YFAj/GHpBwgYSKDypIXJBwAO5Ynx+BCvBLQMCJGjNiwIgxo4aJwT+CFG5h' +
				'w0WGyy5stBg8BEnhCRQqYIiAoQKFCYOT/K0ZOGRQAj4CAgA7';
			break;
		default:
			return null;
	}
	var img_node = document.createElement('img');
	img_node.src = img_src;
	return img_node;
}



/* ===================================== STARTUP ================================================= */

// only works in FF, calling functionmain directly works in both Chrome and FF
if(isChrome) {
	functionMain();
}
else {
	window.addEventListener('load', function(e){ functionMain(e); }, false);
}
