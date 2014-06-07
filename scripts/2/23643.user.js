// ==UserScript==
// @name           Wowhead FunkyPoints
// @namespace      wowhead
// @description    Give weights to item properties to better see their actual value!
// @include        http://www.wowhead.com/?item*
// ==/UserScript==

function ge(_1) { return document.getElementById(_1); }
function gE(_1, _2) { return _1.getElementsByTagName(_2); }
function ce(_1) { return document.createElement(_1); }
function ac(_1, _2) { _1.appendChild(_2); }
function iH(_1, _2) { _1.innerHTML = _2; }

var updatedItems = [];
var itemValues = [];

function setItemValue(id, value) { item = new Object; item.id = id; item.value = value; itemValues.push(item); }

// Capture items before they are cached and modify the tooltips.
function hookRegisterItem() {
	if (unsafeWindow.$WowheadPower) {

		unsafeWindow.$WowheadPower._registerItem = unsafeWindow.$WowheadPower.registerItem;
		
		unsafeWindow.$WowheadPower.registerItem = function(itemid, data) {
				window.setTimeout(loadWeightList, 0);
				data.tooltip = patchTooltip(itemid, data.tooltip);
				unsafeWindow.$WowheadPower._registerItem(itemid, data);
		}
	}
}

function patchTooltip(itemId, toolTip) {

	if ( toolTip.match(/points\)/) ) return toolTip;
	var patterns = [/>[(+-]?[0-9]+[^)][^><]+/g, /(Equip|Use|Set|Chance on hit): (<a[^>]+)?[^<]+/gi ];
	var itemValue = 0;
	
	toolTip = toolTip.replace(/&nbsp;/g," ");	
	
	patterns.forEach( function( pat ) {
			
			matches = toolTip.match(pat);
	
			if ( matches ) matches.forEach( function( row ) {
			
					// Remove some unwanted markup, links etc.
					row = row.replace(/<[^>]*|>|[()+:]|\.$/gi,"");

					// Get text from row, strip excessive whitespaces from it and put it in rowText. Get numbers from row and put in rowNumbers.
					var rowText = row.replace(/[^a-zA-Z: ]+|((Increases|improves) (?:your)?)|by/gi, "").replace(/\s{2,}/g, " ").replace(/^\s|(?:\s|\.)$/,"");
					var rowNumbers = row.match(/-?\d+\.?\d*/g);
					
					var rowValue = getValue(rowText, rowNumbers);

					
					if (rowValue > 0) {
					
						strMyReg = row.replace(/Equip|Use|Set|Chance on hit/gi, "");
					
						toolTip = toolTip.replace(new RegExp(strMyReg, "gi"), strMyReg + " (<span class='q3'>" + rowValue + "</span> points)");	
						
						itemValue += rowValue;
					}
				});
		});

	if (itemValue > 0) toolTip += "<br /><span class='q'>Total Value: " + Math.round(itemValue * 100)/100 + "</span>";
	
	setItemValue(itemId, itemValue);

	return toolTip;
}

function getValue(text, value) {

	var statWeight = 0, rowVal = 0;
	
	if (!unsafeWindow.fp_wList) window.setTimeout(loadWeightList, 0);
	
	weightList = (unsafeWindow.fp_wList) ? unsafeWindow.fp_wList : 0;
	
	weightList.forEach( function (row) {

		statPattern = (row.match) ? row.match : row.name;
		
		if (text == statPattern) {
			statWeight = row.weight;
			rowVal = value[ (row.name == "Maxdamage") ? 1:0 ];
		}
	});
	
	return Math.round(statWeight * rowVal * 100) / 100; 
}

function updateMainTooltip() {

	var itemUrl = document.location.href.match(/(\?item=){1}\d+/);
	
	if (itemUrl) var cItem = itemUrl[0].match(/\d+/g);
	
	if (cItem) var startNode = ge('tt' + cItem);
	
	if (startNode) {
		var mainTip = document.evaluate("//div[@class='tooltip']/table[1]/tbody/tr[1]/td[1]", 
			startNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			
		if (mainTip) iH(mainTip, patchTooltip(cItem, mainTip.innerHTML));
		
		return 1;
	}	
	
	return 0;
}

function addConfigLinks() {
	var linkParent = ge('main-precontents');
	
	if (linkParent) {
		linkParent = linkParent.firstChild;
	
		var cfgLink = ce("a");
		cfgLink.id = "funkyPointConfigButton";
		cfgLink.href = "javascript:;";
		cfgLink.style.margin = "0 20px";
		iH(cfgLink, "Modify FunkyPoint Weights");
		cfgLink.addEventListener("click", toggleWeightForm, false);
		
		linkParent.insertBefore(cfgLink, linkParent.lastChild);
	}
}

function toggleWeightForm() {
	var linkParent	= ge('main-contents');		
	var funkyCfgForm = ge('funkyPointsCoolConfigForm');
	
	if ( funkyCfgForm ) funkyCfgForm.style.display = (!funkyCfgForm.style.display) ? "none":"";
	else if (linkParent) {
		cfgFormDiv = ce("div");
		cfgFormDiv.id = "funkyPointsCoolConfigForm";
			
		cfgForm = ce("form");
		cfgFormHTML = ce("div");
		
		var formHTML = "<div style='margin: 0 0 20px 0;'>FunkyPoints Weight Config</div><table style='width: 70%;'>" + 
				"<thead><th>Name</th><th>Value</th><th>Match</th></thead><tbody id='funkyPoints_weightTable'>";
		
		unsafeWindow.fp_wList.forEach( function( r ) { 
			formHTML += "<tr><td><input type='text' value='" + r.name + 
				"' size='20'/></td><td><input type='value' size='4' value='" + r.weight + 
					"'/></td><td><input type='text' size='70' value='" + ((r.match) ? r.match:"") + "'/></td></tr>";
		});
		
		function addButton(id, value) { return "<input id='funkyPointButton_" + id + "' type='button' value='" + value + "'/>"; }

		formHTML += "</tbody></table><br/><div style='margin: 0 0 20px 0;'>" + addButton("cfgSave", "Save and reload") + 
			addButton("cfgAdd", "Add New Property") + addButton("cfgReset", "Reset to default") + 
				"<a id='funkyPoints_cfgHide' href='javascript:;' style='margin: 0 0 0 20px;'>Hide Config</a></div>";
		
		iH(cfgFormHTML, formHTML);
		
		ac(cfgForm, cfgFormHTML);
		ac(cfgFormDiv, cfgForm);
		
		linkParent.insertBefore(cfgFormDiv, linkParent.childNodes[1]);
		
		var saveButton = ge('funkyPointButton_cfgSave');
		var resetButton = ge('funkyPointButton_cfgReset');
		var hideButton = ge('funkyPoints_cfgHide');
		var addButton = ge('funkyPointButton_cfgAdd');
		
		addButton.addEventListener("click", function(e) {
		
			var weightTable = ge('funkyPoints_weightTable');
			var newRow = ce("tr");
			var sizes = [20, 4, 40];
			for(var i=0; i < 3; i++) {
				var newCell =ce("td");
				
				iH(newCell, "<input type='text' size='" + sizes[i] + "' value=''/>");
				
				ac(newRow, newCell);
			}
			
			ac(weightTable, newRow);
		}, false);
		
		saveButton.addEventListener("click", function(e) { 
		
			var weightTable = ge('funkyPoints_weightTable');		
			var weightList = [];
			
			tableRows = gE(weightTable,'tr');
			
			for(var i = 0; i < tableRows.length; i++ ) {
			
				var textFields = gE(tableRows[i],'input');
				var newRow = new Object;
				
				newRow.name = (textFields[0].value) ? textFields[0].value : 0;
				newRow.weight = (textFields[1].value) ? textFields[1].value : 0;
				newRow.match = (textFields[2].value) ? textFields[2].value : 0;
				
				if (newRow.name != 0)
					weightList.push(newRow);
			}
				
			saveWeightList(weightList);
			history.go(0);
		} , false);
		
		hideButton.addEventListener("click", function(e) { ge('funkyPointsCoolConfigForm').style.display = "none"; } , false);
		resetButton.addEventListener("click", function(e) { resetWeightList(); } , false);
	}
}

function resetWeightList() {
	var weightList = [	{ name:"Agility", weight: 10},  		{ name:"Armor", weight: 0.06},
						{ name:"Strength", weight: 2}, 			{ name:"Stamina", weight: 5},
						{ name:"Spirit", weight: 0.1}, 			{ name:"Intellect", weight: 1},
						{ name:"Fire Resistance", weight: 1},	{ name:"Frost Resistance", weight: 1},
						{ name:"Nature Resistance", weight: 1},	{ name:"Shadow Resistance", weight: 1},
						{ name:"Maxdamage", match: " - , Damage", weight: 0},
						{ name:"DPS", match: "damage per second", weight: 1},
						{ name:"+Healing", match: "Equip healing done up to and damage done up to for all magical spells and effects", weight: 5 },
						{ name:"+Damage", match: "Equip damage and healing done magical spells and effects up to", weight: 5 },
						{ name:"Spell Crit. Rating", match:"Equip spell critical strike rating", weight: 2},
						{ name:"Spell Hit Rating", match:"Equip spell hit rating", weight: 2},
						{ name:"Spell Penetration", match:"Equip spell penetration", weight: 2},
						{ name:"Spell Haste", match:"Equip spell haste", weight: 2},
						{ name:"Resilience", match:"Equip resilience rating", weight: 3},
						{ name:"Mp5", match:"Equip Restores mana per sec", weight: 3},
						{ name:"Expertise", match:"Equip expertise rating", weight: 2},
						{ name:"Haste rating", match:"Equip haste rating", weight: 3},
						{ name:"Armor piercing", match:"Equip Your attacks ignore of your opponents armor", weight: 3},
						{ name:"Attack Power", match:"Equip attack power", weight: 2},
						{ name:"Ranged Attack Power", match:"Equip ranged attack power", weight: 2},
						{ name:"Crit. Rating", match:"Equip critical strike rating", weight: 2},
						{ name:"Ranged Crit. Rating", match:"Equip ranged critical strike rating", weight: 2},
						{ name:"Defense Rating", match:"Equip defense rating", weight: 5},
						{ name:"Hit Rating", match:"Equip hit rating", weight: 5}];
						
	saveWeightList(weightList);
}

function saveWeightList(wTable) {
	
	unsafeWindow.fp_wList = wTable;

	var wTableNames= [];
	var wTableWeights= [];
	var wTableMatches= [];
	
	wTable.forEach(function(wNode) { 

		var elementName = (wNode.name) ? wNode.name : 0;

		if (elementName) {
			wTableNames.push(elementName);
			wTableWeights.push((wNode.weight) ? wNode.weight : 0);
			wTableMatches.push((wNode.match) ? wNode.match : 0);
		}
	});
	
	GM_setValue("FunkyPoints_wListNames", wTableNames.join(';;'));
	GM_setValue("FunkyPoints_wListWeights", wTableWeights.join(';;'));
	GM_setValue("FunkyPoints_wListMatches", wTableMatches.join(';;'));
	
	// Clear cache so that all item tooltips are updated. Not that pretty but I'm lazy :<
	// TODO: accomplish this without reloading the page...
	history.go(0);
}

function loadWeightList() {
	
	var weightList = [];
	
	var wListNames = GM_getValue("FunkyPoints_wListNames").split(';;');
	var wListWeights = GM_getValue("FunkyPoints_wListWeights").split(';;');
	var wListMatches = GM_getValue("FunkyPoints_wListMatches").split(';;');
	
	for (var i = 0; i < wListNames.length; i++) {
	
		var listNode = new Object;
		
		listNode.name = wListNames[i];
		listNode.weight = wListWeights[i];
		if (wListMatches[i] != 0) listNode.match = wListMatches[i];
		
		weightList.push(listNode);
	}
	
	unsafeWindow.fp_wList = weightList;
}
	
function addPointColumn() {

	var itemList = ge('lv-items');
	
	if (itemList) {
		var itemTable = gE(itemList,'table')[0];
		
		if (itemTable) {
			newTH = ce("th");
			newTH.style.width = "10%";
			iH(newTH, "<div><a href=\"javascript:;\"><span><span>Points</span></span></a></div>");
			
			var itemTH = gE(itemTable,'thead')[0].firstChild;
			ac(itemTH, newTH);
		}

		var itemRows = gE(itemList,'tr');

		if (itemRows) {
			for(var i = 0; i < itemRows.length; i++) {
					row = itemRows[i];
					
					var itemLink = gE(row,'a')[0];
					var linkHref = itemLink.href.match(/(?:\?item=).*/i);
					
					if (linkHref) {
						var evObj = document.createEvent('MouseEvents');
					
						evObj.initEvent( 'mouseover', true, false );
						itemLink.dispatchEvent(evObj);
						
						evObj.initEvent( 'mouseout', true, false );
						itemLink.dispatchEvent(evObj);
						
						linkItemID = linkHref[0].match(/\d+/);
						
						newTD = ce("td");
						newTD.id = linkItemID + "_value_td";
						ac(row, newTD);
					
						updatedItems.push(linkItemID);

					}
			}
		}
	}
}

function updateItemList() {
	addPointColumn();
	
	unsafeWindow.setTimeout(function() { 
		itemValues.forEach( function(item) {

			var newTD = ge(item.id + "_value_td");	
			
			if (newTD) iH(newTD, Math.round(item.value * 100) / 100);
		});	 
	}, 3000);
}


hookRegisterItem();

addConfigLinks();

if ( GM_getValue("FunkyPoints_wListNames") ) loadWeightList(); 
	else resetWeightList();

if ( !updateMainTooltip() ) updateItemList(); 
	