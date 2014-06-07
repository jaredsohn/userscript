// ==UserScript==
// @name		Travian: Village Manager
// @version	1.1
// @description	Travian: Village Manager 1.1
// @author		dbKiller
// @email		user9999@gmail.com
// @namespace	travian
// @include	http://*.travian*.*/*
// @exclude	http://forum.travian*.*
// @exclude	http://www.travian*.*/*
// @exclude	http://*.travian*.*/index.php*
// @exclude	http://*.travian*.*/login.php*
// @exclude	http://*.travian*.*/logout.php*
// @exclude	http://*.travian*.*/anmelden.php*
// @exclude	http://*.travian*.*/activate.php*
// @exclude	http://*.travian*.*/support.php*
// @exclude	http://*.travian*.*/manual.php*
// ==/UserScript==


/*******
* TODO:
* type of village (15/9 crops etc.) divs f6=15crops f1=9crops f3=normal f5=wood f4=clay f2=iron
* type of player (race)
* "types" column (farms, abandoned areas, oases, safehouses, myvillages, targets, reinforcements etc.)
* filter list by "type"
* Options to add:
*       "column width" option
*       "check for updates" option
*       "add/delete types" option
*       "save/load list" option
* only one GM store for options (42px_4px||true||true||,,none,none,none,none||15, 165, 165, 165, 100, 20)
* column with editable notes (with working links)
* update village/ally names if changed
*******/


//set global variables
var loc = document.location.href;
var suffix;
var langFile = new Array();
var image = new Array();
var colsWidth = [15, 165, 165, 165, 100, 20, 20];
var colsVisibility = ',,none,none,none,none,none';
var listPos = '42px_4px'; //top_left
var listMinWidth = colsWidth[0]+colsWidth[1];
var activeVillageCoords = '';
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPOList = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;




//launch main function after doc is loaded
window.addEventListener('DOMContentLoaded', onLoad, false);
if (document.body) onLoad();

//new
var attackurl2 =  document.location.href.split('/')[0] + "//" + document.location.href.split('/')[2] + "/a2b.php";
var DID2 = getActiveDid2();

//main function
function onLoad()
{
	var html = document.body.innerHTML;
	if (html.indexOf(' <!-- ERROR ITEM CONTAINER') != -1) window.location.reload();
	
	//get suffix
	suffix = getSuffix();
	
	//get language
	var langExt = getLanguage();
	if (!loadLanguage(langExt)) return;
	
	//load images
	loadImages();
	
	//get  page
	var url = document.URL;
	url = url.substring(url.lastIndexOf('/')+1);
	if (url.indexOf('karte.php?d=') != -1) villageOption();
	villageList();
	
	//add listeners for dragndrop
	document.addEventListener('mousemove', mouseMove, false);
	document.addEventListener('mousedown', mouseDown, false);
	document.addEventListener('mouseup', mouseUp, false);
}


//create option to add villages to list
function villageOption()
{
	var tbody = xpathEvaluate('//div[@class="map_details_actions"]/table/tbody', XPFirst);
	if (!tbody) return;
	var addOption = document.createElement('a');
	addOption.href = 'javascript:void(0)';
	addOption.innerHTML = '\u00BB '+langFile['ADD_VILLAGE'];
	addOption.addEventListener('click', addToVillageList, true);
	var row = document.createElement('tr');
	var cell = document.createElement('td');
	cell.appendChild(addOption);
	row.appendChild(cell);
	tbody.appendChild(row);
}


//create the list
function villageList()
{
	//get columns visibility array
	var columns = getColumnStatus();
	
	//get list width
	var listWidth = getListWidth();
	
	//create list-wrapper div
	var listDiv = document.createElement('div');
	listDiv.id = 'listDiv_'+suffix;
	listDiv.style.zIndex = 666;
	listDiv.style.clear = 'both';
	listDiv.style.position = 'relative';
	listDiv.style.width = listWidth+'px';
	listDiv.style.backgroundColor = '#FFFFFF';
	listDiv.style.border = '1px solid #C0C0C0';
	
	//create show/hide options div
	var optionsDiv = document.createElement('div');
	optionsDiv.style.height = '18px';
	optionsDiv.style.width = '20px';
	optionsDiv.style.cssFloat = 'left';
	optionsDiv.style.borderBottom = '1px solid #C0C0C0';
	optionsDiv.style.backgroundColor = '#FFFFFF';
	optionsDiv.style.backgroundImage = 'url(img/un/a/c2.gif)';
	
	//create title div
	var titleDiv = document.createElement('div');
	titleDiv.style.height = '18px';
	titleDiv.style.width = ((listWidth-20)-12)+'px'; //-20px optionsDiv width / -12px minDiv width
	titleDiv.style.cssFloat = 'left';
	titleDiv.style.fontWeight = 'bold';
	titleDiv.style.fontSize = '10';
	titleDiv.style.textAlign = 'center';
	titleDiv.style.borderBottom = '1px solid #C0C0C0';
	titleDiv.style.backgroundColor = '#FFFFFF';
	titleDiv.style.backgroundImage = 'url(img/un/a/c2.gif)';
	titleDiv.title = langFile['DRAG'];
	titleDiv.style.cursor = 'move';
	titleDiv.style.MozUserSelect = 'none';
	titleDiv.appendChild(document.createTextNode( langFile['VILLAGE_MANAGER'] ));
	makeDraggable(listDiv, titleDiv);
	
	//create minimize/maximize list div
	var minDiv = document.createElement('div');
	minDiv.style.height = '18px';
	minDiv.style.width = '12px';
	minDiv.style.cssFloat = 'left';
	minDiv.style.borderBottom = '1px solid #C0C0C0';
	minDiv.style.backgroundColor = '#FFFFFF';
	minDiv.style.backgroundImage = 'url(img/un/a/c2.gif)';
	
	//append bar divs
	listDiv.appendChild(optionsDiv);
	listDiv.appendChild(titleDiv);
	listDiv.appendChild(minDiv);
	
	//create table
	var listTable = document.createElement('table');
	listTable.id = 'listTable';
	listTable.setAttribute('cellspacing', 1);
	listTable.setAttribute('cellpadding', 1);
	listTable.style.borderCollapse = 'collapse';
	listTable.style.width = '100%';
	listTable.style.cssFloat = 'left';
	listTable.style.clear = 'both';
	listTable.style.position = 'relative'; 
	listDiv.appendChild(listTable);
	
	//get list data
	var villageList = getListData();
	
	//create list
	if (villageList == '') {
	
		//EMPTY LIST
		var listIsEmpty = true;
		
		//create tbody
		var tableBody = document.createElement('tbody');
		var tbodyRow = document.createElement('tr');
		var tbodyCell = document.createElement('td');
		tbodyCell.setAttribute('colspan', colsWidth.length);
		var cell = document.createElement('div');
		cell.style.textAlign = 'center';
		cell.style.color = '#C0C0C0';
		cell.appendChild(document.createTextNode( langFile['NO_VILLAGES'] ));
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		tableBody.appendChild(tbodyRow);
		
		//append tbody
		listTable.appendChild(tableBody);
		
	} else {
	
		//NORMAL LIST
		var listIsEmpty = false;
		
		//create thead
		var tableHead = createTableHeader(columns);
		//append thead
		listTable.appendChild(tableHead);
		
		//create tbody
		var tableBody = createTableBody(columns, villageList);
		//append tbody
		listTable.appendChild(tableBody);
		
		//create tfoot
		var tableFoot = createTableFooter(columns, listTable);
		//append tfoot
		listTable.appendChild(tableFoot);
	}
	
	//update list position
	var listCoords = GM_getValue(listDiv.id, listPos).split('_');
	listDiv.style.top = listCoords[0];
	listDiv.style.left = listCoords[1];
	listDiv.style.position = 'absolute';
	listDiv.style.zIndex = 666;
	
	//minimize/maximize list
	var listIsMinimized = GM_getValue('minimize_'+suffix);
	if (!listIsMinimized) {
		listIsMinimized = false; //default value
		GM_setValue('minimize_'+suffix, listIsMinimized);
	}
	if (listIsMinimized) {
		listTable.style.display = 'none';
		var img = makeEventMaximize(titleDiv);
		minDiv.appendChild(img);
		resizeList(listTable, true);
		//remove bar bottom border
		optionsDiv.style.borderBottom = 'none';
		titleDiv.style.borderBottom = 'none';
		minDiv.style.borderBottom = 'none';
	} else {
		listTable.style.display = '';
		var img = makeEventMinimize(titleDiv);
		minDiv.appendChild(img);
		resizeList(listTable, false);
	}
	
	//show/hide options
	var optionsAreVisible = GM_getValue('options_'+suffix);
	if (!optionsAreVisible) {
		optionsAreVisible = false; //default value
		GM_setValue('options_'+suffix, optionsAreVisible);
	}
	if (!listIsEmpty) {
		if (optionsAreVisible) {
			tableFoot.style.display = '';
			var img = makeEventHideOptions();
		} else {
			tableFoot.style.display = 'none';
			if (!listIsMinimized) listDiv.style.borderBottom = 'none';
			var img = makeEventShowOptions();
		}
		img.src = 'data:image/png;base64,' + image['options'];
		img.style.width = '18px';
		img.style.height = '14px';
		img.style.paddingTop = '2px';
		img.style.paddingLeft = '1px';
		img.style.cursor = 'pointer';
		optionsDiv.appendChild(img);
	}
	
	//add list to page
	document.body.appendChild(listDiv);
	
	//sort table
	if (!listIsEmpty) {
		//make list sortable
		ts_makeSortable(listTable);
		//read sort data
		var sorting = GM_getValue('sort_'+suffix);
		if (!sorting) {
			sorting = '1_down'; //default value
			GM_setValue('sort_'+suffix, sorting);
		}
		var sortingArray = sorting.split('_');
		var sortCol = sortingArray[0];
		var sortDir = sortingArray[1];
		//sort
		var lnk = xpathEvaluate('//table[@id="listTable"]//a[@column="'+sortCol+'"]', XPFirst);
		ts_resortTable(lnk, sortCol, sortDir);
	}
}


//create table header
function createTableHeader(columns)
{
	//create thead
	var tableHead = document.createElement('thead');
	
	//create headers row
	var theadRow = document.createElement('tr');
	
	//column 0: delete
	var theadCell0 = document.createElement('td');
	theadCell0.setAttribute('align', 'center');
	theadCell0.style.borderBottom = '1px solid #C0C0C0';
	theadCell0.width = colsWidth[0]+'px';
	theadCell0.style.display = (columns[0]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell0);
	
	//column 1: village name
	var theadCell1 = document.createElement('td');
	theadCell1.setAttribute('align', 'center');
	theadCell1.style.borderBottom = '1px solid #C0C0C0';
	theadCell1.width = colsWidth[1]+'px';
	theadCell1.title = langFile['SORT_BY']+' '+langFile['VILLAGE'];
	theadCell1.appendChild(document.createTextNode( langFile['VILLAGE'] ));
	theadCell1.style.display = (columns[1]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell1);
	
	//column 2: player name
	var theadCell2 = document.createElement('td');
	theadCell2.setAttribute('align', 'center');
	theadCell2.style.borderBottom = '1px solid #C0C0C0';
	theadCell2.width = colsWidth[2]+'px';
	theadCell2.title = langFile['SORT_BY']+' '+langFile['PLAYER'];
	theadCell2.appendChild(document.createTextNode( langFile['PLAYER'] ));
	theadCell2.style.display = (columns[2]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell2);
	
	//column 3: ally name
	var theadCell3 = document.createElement('td');
	theadCell3.setAttribute('align', 'center');
	theadCell3.style.borderBottom = '1px solid #C0C0C0';
	theadCell3.width = colsWidth[3]+'px';
	theadCell3.title = langFile['SORT_BY']+' '+langFile['ALLY'];
	theadCell3.appendChild(document.createTextNode( langFile['ALLY'] ));
	theadCell3.style.display = (columns[3]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell3);
	

	//Troops
	var celltroops = document.createElement('td');
	celltroops.setAttribute('align', 'center');
	celltroops.style.borderBottom = '1px solid #C0C0C0';
	celltroops.width='100px';
	celltroops.appendChild(document.createTextNode("Troops"));
	theadRow.appendChild(celltroops);
	
	
	//column 4: distance
	var theadCell4 = document.createElement('td');
	theadCell4.setAttribute('align', 'center');
	theadCell4.style.borderBottom = '1px solid #C0C0C0';
	theadCell4.width = colsWidth[4]+'px';
	theadCell4.title = langFile['SORT_BY']+' '+langFile['DISTANCE'];
	theadCell4.appendChild(document.createTextNode( langFile['DISTANCE'] ));
	theadCell4.style.display = (columns[4]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell4);
	

	//column 5: send troops
	var theadCell5 = document.createElement('td');
	theadCell5.setAttribute('align', 'center');
	theadCell5.style.borderBottom = '1px solid #C0C0C0';
	theadCell5.width = colsWidth[5]+'px';
	theadCell5.style.display = (columns[5]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell5);
	
	//column 6: send resources
	var theadCell6 = document.createElement('td');
	theadCell6.setAttribute('align', 'center');
	theadCell6.style.borderBottom = '1px solid #C0C0C0';
	theadCell6.width = colsWidth[6]+'px';
	theadCell6.style.display = (columns[6]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell6);
	
	//append headers row
	tableHead.appendChild(theadRow);
	
	return tableHead;
}


//create table body
function createTableBody(columns, villageList)
{
	//get active village name
	var activeVillageName = getActiveVillageName();
	if (!activeVillageName||activeVillageName=='') activeVillageName = langFile['YOUR_VILLAGE'];
	
	//get active village coords
	getActiveVillageCoords();
	if (!activeVillageCoords||activeVillageCoords==''||activeVillageCoords==',') {
		var activeX = '';
		var activeY = '';
	} else {
		var activeX = activeVillageCoords.split(',')[0];
		var activeY = activeVillageCoords.split(',')[1];
	}
	
	//create tbody
	var tableBody = document.createElement('tbody');
	
	//populate tbody (iterate over village entries)
	for (i=1; i<=villageList.length-1; i++)
	{
		//get data
		villageList[i] = villageList[i].split('||');
		villageName = villageList[i][0];
		villageId = villageList[i][1];
		coordsArray = villageList[i][2];
		coordX = coordsArray.split(',')[0];
		coordY = coordsArray.split(',')[1];
		playerName = villageList[i][3];
		playerId = villageList[i][4];
		allyName = villageList[i][5];
		allyId = villageList[i][6];
		cValue = villageList[i][7];
		
		//create row
		var tbodyRow = document.createElement('tr');
		
		//column 0: delete
		var tbodyCell0 = document.createElement('td');
		tbodyCell0.setAttribute('align', 'center');
		tbodyCell0.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell0.style.display = (columns[0]=='none') ? 'none' : '';
		var cell0 = document.createElement('div');
		cell0.style.width = colsWidth[0]+'px';
		cell0.appendChild( makeEventDelete(villageId) );
		tbodyCell0.appendChild(cell0);
		tbodyRow.appendChild(tbodyCell0);
		
		//column 1: village name
		var tbodyCell1 = document.createElement('td');
		tbodyCell1.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell1.style.display = (columns[1]=='none') ? 'none' : '';
		var cell1 = document.createElement('div');
		cell1.style.width = colsWidth[1]+'px';
		//map icon
		var cell1a = document.createElement('div');
		cell1a.appendChild( makeEventShowMap(villageId, coordX, coordY) );
		cell1a.style.width = '16px';
		cell1a.style.cssFloat = 'left';
		cell1.appendChild(cell1a);
		//village page
		var cell1b = document.createElement('div');
		var cell1txt = document.createElement('a');
		cell1txt.href = 'karte.php?qplinks=false&d='+villageId+'&c='+cValue;
		cell1txt.title = langFile['VILLAGE_PROFILE'];
		cell1txt.innerHTML = villageName;
		cell1b.appendChild(cell1txt);
		cell1b.style.textAlign = 'center';
		cell1b.style.paddingTop = '3px';
		cell1.appendChild(cell1b);
		tbodyCell1.appendChild(cell1);
		tbodyRow.appendChild(tbodyCell1);
		
		//column 2: player name
		var tbodyCell2 = document.createElement('td');
		tbodyCell2.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell2.style.display = (columns[2]=='none') ? 'none' : '';
		var cell2 = document.createElement('div');
		cell2.style.width = colsWidth[2]+'px';
		cell2.style.textAlign = 'center';
		if (playerName == '') {
			cell2.innerHTML = '---';
			cell2.style.color = '#C0C0C0';
		} else {
			var cell2txt = document.createElement('a');
			cell2txt.href = 'spieler.php?uid='+playerId;
			cell2txt.title = langFile['PLAYER_PROFILE'];
			cell2txt.innerHTML = playerName;
			cell2.appendChild(cell2txt);
		}
		tbodyCell2.appendChild(cell2);
		tbodyRow.appendChild(tbodyCell2);
		
		//column 3: ally name
		var tbodyCell3 = document.createElement('td');
		tbodyCell3.setAttribute('align', 'center');
		tbodyCell3.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell3.style.display = (columns[3]=='none') ? 'none' : '';
		var cell3 = document.createElement('div');
		cell3.style.width = colsWidth[3]+'px';
		if (allyName == '') {
			cell3.innerHTML = '---';
			cell3.style.color = '#C0C0C0';
		} else {
			var cell3txt = document.createElement('a');
			cell3txt.href = 'allianz.php?aid='+allyId;
			cell3txt.title = langFile['ALLY_PROFILE'];
			cell3txt.innerHTML = allyName;
			cell3.appendChild(cell3txt);
		}
		tbodyCell3.appendChild(cell3);
		tbodyRow.appendChild(tbodyCell3);
		


		//Troops
		var celltroops = document.createElement('td');
		celltroops.setAttribute('align', 'center');
		celltroops.style.width='110px';
		celltroops.style.borderBottom = '1px solid #C0C0C0';		
		celltroops.appendChild( makeTroopsInput(villageId));
		celltroops.appendChild( makeTroopsButton('S', '#', villageId));
		tbodyRow.appendChild(celltroops);


		//column 4: distance
		var tbodyCell4 = document.createElement('td');
		tbodyCell4.style.color = '#C0C0C0';
		tbodyCell4.setAttribute('align', 'center');
		tbodyCell4.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell4.style.display = (columns[4]=='none') ? 'none' : '';
		var cell4 = document.createElement('div');
		cell4.style.width = colsWidth[4]+'px';
		var strDistance = (activeX==''||activeY=='') ? '---' : coordDistXYtoXY(activeX, activeY, coordX, coordY);
		var cell4txt = document.createElement('span');
		cell4txt.title = langFile['DISTANCE_VILLAGE']+' '+activeVillageName;
		cell4txt.innerHTML = strDistance;
		cell4.appendChild(cell4txt);
		tbodyCell4.appendChild(cell4);
		tbodyRow.appendChild(tbodyCell4);
		
		//column 5: send troops
		var tbodyCell5 = document.createElement('td');
		tbodyCell5.setAttribute('align', 'center');
		tbodyCell5.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell5.style.display = (columns[5]=='none') ? 'none' : '';
		var cell5 = document.createElement('div');
		cell5.style.width = colsWidth[5]+'px';
		cell5.appendChild( makeEventSendTroops(villageId) );
		tbodyCell5.appendChild(cell5);
		tbodyRow.appendChild(tbodyCell5);
		
		//column 6: send resources
		var tbodyCell6 = document.createElement('td');
		tbodyCell6.setAttribute('align', 'center');
		tbodyCell6.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell6.style.display = (columns[6]=='none') ? 'none' : '';
		var cell6 = document.createElement('div');
		cell6.style.width = colsWidth[6]+'px';
		cell6.appendChild( makeEventSendResources(villageId) );
		tbodyCell6.appendChild(cell6);
		tbodyRow.appendChild(tbodyCell6);
		
		//append row
		tableBody.appendChild(tbodyRow);
	}
	
	return tableBody;
}


//create table footer
function createTableFooter(columns, listTable)
{
	//create tfoot element
	var tableFoot = document.createElement('tfoot');
	tableFoot.style.backgroundColor = '#F5F5F5';
	tableFoot.style.color = '#5C5C5C';
	var tfootRow = document.createElement('tr');
	var tfootCell = document.createElement('td');
	tfootCell.setAttribute('colspan', colsWidth.length);
	tfootCell.setAttribute('align', 'left');
	tfootCell.style.fontSize = '8pt';
	
	//create COLUMNS section
	var fieldset1 = document.createElement('fieldset');
	fieldset1.style.MozBorderRadius = '10px';
	fieldset1.style.border = '1px solid #C0C0C0';
	fieldset1legend = document.createElement('legend');
	fieldset1legend.appendChild(document.createTextNode( langFile['SHOW']+'/'+langFile['HIDE']+' '+langFile['COLUMNS'] ));
	fieldset1.appendChild(fieldset1legend);
	//create visibility checkboxes
	for (var i=0; i<columns.length; i++) {
		switch(i) {
			//case 0:	//delete
			//break;
			//case 1:	//village
			//break;
			case 2:	//player
				if (columns[i] == 'none') fieldset1.appendChild( makeEventShowCol(i) );
				else fieldset1.appendChild( makeEventHideCol(i) );
				fieldset1.appendChild(document.createTextNode( langFile['PLAYER'] ));
				fieldset1.appendChild(document.createElement('br'));
			break;
			case 3:	//ally
				if (columns[i] == 'none') fieldset1.appendChild( makeEventShowCol(i) );
				else fieldset1.appendChild( makeEventHideCol(i) );
				fieldset1.appendChild(document.createTextNode( langFile['ALLY'] ));
				fieldset1.appendChild(document.createElement('br'));
			break;
			case 4:	//distance
				if (columns[i] == 'none') fieldset1.appendChild( makeEventShowCol(i) );
				else fieldset1.appendChild( makeEventHideCol(i) );
				fieldset1.appendChild(document.createTextNode( langFile['DISTANCE'] ));
				fieldset1.appendChild(document.createElement('br'));
			break;
			case 5:	//send troops
				if (columns[i] == 'none') fieldset1.appendChild( makeEventShowCol(i) );
				else fieldset1.appendChild( makeEventHideCol(i) );
				fieldset1.appendChild(document.createTextNode( langFile['SEND_TROOPS'] ));
				fieldset1.appendChild(document.createElement('br'));
			break;
			case 6:	//send resources
				if (columns[i] == 'none') fieldset1.appendChild( makeEventShowCol(i) );
				else fieldset1.appendChild( makeEventHideCol(i) );
				fieldset1.appendChild(document.createTextNode( langFile['SEND_RESOURCES'] ));
				fieldset1.appendChild(document.createElement('br'));
			break;
		}
	}
	
	//create OTHER OPTIONS section
	var fieldset2 = document.createElement('fieldset');
	fieldset2.style.MozBorderRadius = '10px';
	fieldset2.style.border = '1px solid #C0C0C0';
	fieldset2legend = document.createElement('legend');
	fieldset2legend.appendChild(document.createTextNode( langFile['OTHER_OPTIONS'] ));
	fieldset2.appendChild(fieldset2legend);
	//delete all villages
	opt1 = document.createElement('a');
	opt1.href = 'javascript:void(0)';
	opt1.appendChild(document.createTextNode('\u00BB ' + langFile['DELETE_ALL']));
	opt1.addEventListener('click', foo=function(){ delAllVillages(); }, false);
	fieldset2.appendChild(opt1);
	fieldset2.appendChild(document.createElement('br'));
	//restore default position
	opt2 = document.createElement('a');
	opt2.href = 'javascript:void(0)';
	opt2.appendChild(document.createTextNode('\u00BB ' + langFile['RESTORE_POS']));
	opt2.addEventListener('click', foo=function(){ restorePos(); }, false);
	fieldset2.appendChild(opt2);
	
	//append sections
	tfootCell.appendChild(fieldset1);
	tfootCell.appendChild(fieldset2);
	tfootRow.appendChild(tfootCell);
	tableFoot.appendChild(tfootRow);
	
	return tableFoot;
}


//resize listDiv & titleDiv
function resizeList(listTable, listIsMinimized)
{
	if (listIsMinimized) {
		listTable.parentNode.style.width = (listMinWidth+4)+'px'; //+4px for missing borders
		listTable.parentNode.childNodes[1].style.width = ((listMinWidth-20-12)+4)+'px'; //-20px options icon, -12px minimize icon, +4px for missing borders
	} else {
		var listWidth = getListWidth();
		listTable.parentNode.style.width = listWidth+'px';
		listTable.parentNode.childNodes[1].style.width = (listWidth-20-12)+'px'; //-20px options icon, -12px minimize icon
	}
}


//get list data
function getListData()
{
	var listData = new Array();
	listData = GM_getValue('villages_'+suffix, '').split('\n');
	listData.sort(); //initial sort by village name
	return listData;
}


//retrieve owner id
function getOwnerId()
{
	var user = xpathEvaluate('//table[@id="navi_table"]//a[starts-with(@href, "spieler.php?uid=")]', XPFirst);
	var id = (user) ? getParamFromUrl(user.href, 'uid') : '';
	return id;
}


//retrieve name of the active village
function getActiveVillageName()
{
	var z = xpathEvaluate('//a[@class="active_vl"]', XPFirst);
	if (!z || z.snapshotLength == 0) return false;
	activeVillageName = z.textContent;
	activeVillageName = cleanStr(activeVillageName);
	return activeVillageName;
}


//retrieve coordinates of your active village
function getActiveVillageCoords()
{
	var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td', XPOList);
	if (activeVillageLink.snapshotLength > 0) {
		//multi village account
		var x = parseInt(activeVillageLink.snapshotItem(0).innerHTML.replace("(", ""));
		var y = parseInt(activeVillageLink.snapshotItem(2).innerHTML.replace(")", ""));
		activeVillageCoords = x+','+y;
	} else {
		//single village account
		var singleVillageCoords = GM_getValue('singleVillageCoords_'+suffix, '');
		if (!singleVillageCoords||singleVillageCoords==''||singleVillageCoords==',') {
			//grab coordinates for the first time
			getSingleVillageCoords();
		} else {
			activeVillageCoords = singleVillageCoords;
		}
	}
} 


//retrieve coordinates for single village account
function getSingleVillageCoords()
{
	var url = document.URL;
	url = url.substring(0, url.lastIndexOf('/')+1);
	url = url+'karte.php';
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function (responseDetails)
				{
					var div = document.createElement('div');
					div.innerHTML = responseDetails.responseText; 
					var ansDoc = document.implementation.createDocument('', '', null);
					ansDoc.appendChild(div);
					var x = ansDoc.getElementById('x').firstChild.nodeValue;
					var y = ansDoc.getElementById('y').firstChild.nodeValue;
					var singleVillageCoords = x+','+y;
					GM_setValue('singleVillageCoords_'+suffix, singleVillageCoords);
					activeVillageCoords = singleVillageCoords;
				}
	});
}


//retrieve village id
function getVillageId()
{
	var html = xpathEvaluate('//div[@class="map_details_actions"]//a[starts-with(@href, "karte.php?z=")]', XPFirst);
	var villageId = (html) ? getParamFromUrl(html.href, 'z') : '';
	return villageId;
}


//retrieve village c value
function getVillageCvalue()
{
	var url = document.location.href;
	var cValue = getParamFromUrl(url, 'c');
	return cValue;
}


//retrieve village coordinates
function getVillageCoords()
{
	var title = xpathEvaluate('//div[@id="lmid2"]//h1', XPFirst).innerHTML;
	coords = title.substring(title.lastIndexOf('('));
	coords = coords.replace(/[\(\)]/g, '').split('|').join(',');
	coords=coords.replace("&nbsp;","").replace("</div>","").replace(/^\s+/,"");
	//alert(coords);
	return coords;
}


//retrieve village name
function getVillageName()
{
	var title = xpathEvaluate('//div[@id="lmid2"]//h1', XPFirst).innerHTML;
	var villageName = title.substring(0, title.lastIndexOf('(')).replace(/^\s+|\s+$/g,'');
	villageName = cleanStr(villageName);
	//villageName = villageName.replace("<div class=",'').replace("</div>","").replace("&nbsp;","").replace('>',"").replace("<div class=",'').replace('>',"");
	
	//villageName = villageName.substring(0,5).replace(/(<).*/);

	villageName = villageName.replace(/<?div .*?>/gi,"").replace(/<\/div>/,"").replace("&nbsp;","");

//villageName = villageName.replace(/<(\S+).*>/gi,"").replace(/<\/\1>/,"");
	
	//alert(villageName);
	return villageName;
}


//retrieve player's name
function getPlayerName()
{
	var user = xpathEvaluate('//div[@id="lmid2"]/div[@class="map_details_right"]//a[starts-with(@href, "spieler.php?uid=")]', XPFirst);
	var playerName = (user) ? user.innerHTML.replace(/\<\/?b>/gi, '') : '';
	playerName = cleanStr(playerName);
	return playerName;
}


//retrieve player's ID
function getPlayerId()
{
	var user = xpathEvaluate('//div[@id="lmid2"]/div[@class="map_details_right"]//a[starts-with(@href, "spieler.php?uid=")]', XPFirst);
	var playerId = (user) ? getParamFromUrl(user.href, 'uid') : '';
	return playerId;
}


//retrieve ally name
function getAllyName()
{
	var ally = xpathEvaluate('//div[@id="lmid2"]/div[@class="map_details_right"]//a[starts-with(@href, "allianz.php?aid=")]', XPFirst);
	allyName = (ally) ? ally.innerHTML.replace(/\<\/?b>/gi, '') : '' ;
	allyName = cleanStr(allyName);
	return allyName;
}


//retrieve ally ID
function getAllyId()
{
	var ally = xpathEvaluate('//div[@id="lmid2"]/div[@class="map_details_right"]//a[starts-with(@href, "allianz.php?aid=")]', XPFirst);
	var allyId = (ally) ? getParamFromUrl(ally.href, 'aid') : '';
	return allyId;
} 


//add village to the list
function addToVillageList()
{
	var playerId = getPlayerId();
	var playerName = strToHtmlCode(getPlayerName());
	var allyId = getAllyId();
	var allyName = strToHtmlCode(getAllyName());
	var villageCoords = getVillageCoords();
	var villageName = getVillageName();
	var villageId = getVillageId();
	var cValue = getVillageCvalue();
	var villageAtroops = "0|500|0|0";
	
	if (checkVillageId(villageId) == false) {
		villageName = strToHtmlCode(villageName);
		setVillage(villageName+'||'+villageId+'||'+villageCoords+'||'+playerName+'||'+playerId+'||'+allyName+'||'+allyId+'||'+cValue+'||'+villageAtroops);
		reloadVillageList();
	} else {
		alert(villageName+' '+langFile['ALREADY_LIST']+'!');
	}
}


//insert village into Firefox preference store 
function setVillage(data)
{
	var villageList = GM_getValue('villages_'+suffix, '');
	villageList = villageList+'\n'+data;
	GM_setValue('villages_'+suffix, villageList);
}


//check if village is already in the list
function checkVillageId(id)
{
	var villageList = new Array();
	villageList = GM_getValue('villages_'+suffix, '').split('\n');
	for (i=1; i<=villageList.length-1; i++)
	{
		villageList[i] = villageList[i].split('||');
		villageId = villageList[i][1];
		if (villageId == id) return true;
	}
	return false;
}




//update troops to send to farm
function setFarmTroops(id)
{

	var ex = "id('Farms_"+ id +"')";
	result = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
	farmtroops = result.snapshotItem(0).value;

	var villageListAfter = '';
	var villageListBefore = new Array();
	villageListBefore = GM_getValue('villages_'+suffix, '').split('\n');
	villageListBefore.sort();

	for (i=1; i<=villageListBefore.length-1; i++)
	{
		villageListBefore[i] = villageListBefore[i].split('||');
		villageName = villageListBefore[i][0];
		villageId = villageListBefore[i][1];
		villageCoords = villageListBefore[i][2];
		playerName = villageListBefore[i][3];
		playerId = villageListBefore[i][4];
		allyName = villageListBefore[i][5];
		allyId = villageListBefore[i][6];
		cValue = villageListBefore[i][7];
		villageAtroops = villageListBefore[i][8];

		if (villageId != id) {
			villageListAfter = villageListAfter+'\n'+villageName+'||'+villageId+'||'+villageCoords+'||'+playerName+'||'+playerId+'||'+allyName+'||'+allyId+'||'+cValue+'||'+villageAtroops;
		}else if(villageId == id){
			villageListAfter = villageListAfter+'\n'+villageName+'||'+villageId+'||'+villageCoords+'||'+playerName+'||'+playerId+'||'+allyName+'||'+allyId+'||'+cValue+'||'+farmtroops;
		}
	}
	GM_setValue('villages_'+suffix, villageListAfter);
	alert("Troops: "+ farmtroops + "Saved for id: "+ id);
	var villageList = getListData();
	if (villageList == '') {
		var columns = colsVisibility;
		GM_setValue('columns_'+suffix, columns);
	}
	//refresh list
	reloadVillageList();
}

//remove village from list
function delVillage(id)
{
	var villageListAfter = '';
	var villageListBefore = new Array();
	villageListBefore = GM_getValue('villages_'+suffix, '').split('\n');
	villageListBefore.sort();
	for (i=1; i<=villageListBefore.length-1; i++)
	{
		villageListBefore[i] = villageListBefore[i].split('||');
		villageName = villageListBefore[i][0];
		villageId = villageListBefore[i][1];
		villageCoords = villageListBefore[i][2];
		playerName = villageListBefore[i][3];
		playerId = villageListBefore[i][4];
		allyName = villageListBefore[i][5];
		allyId = villageListBefore[i][6];
		cValue = villageListBefore[i][7];
		villageAtroops = villageListBefore[i][8];

		if (villageId != id) {
			villageListAfter = villageListAfter+'\n'+villageName+'||'+villageId+'||'+villageCoords+'||'+playerName+'||'+playerId+'||'+allyName+'||'+allyId+'||'+cValue+'||'+villageAtroops;
		}
	}
	GM_setValue('villages_'+suffix, villageListAfter);
	//if list is empty, restore column visibility to default
	var villageList = getListData();
	if (villageList == '') {
		var columns = colsVisibility;
		GM_setValue('columns_'+suffix, columns);
	}
	//refresh list
	reloadVillageList();
}

//get the troops to send to farm
function getFarmTroops(id)
{
	var farmList = new Array();
	farmList = GM_getValue('villages_'+suffix, '').split('\n');
	for (i=1; i <= farmList.length-1; i++)
	{
		farmList[i] = farmList[i].split("||");
		farmId = farmList[i][1];
		if (farmId == id) {
			return farmList[i][8];
		}
      }
}
//Alternate getcoords
function getFarmCoordsNew(id)
{
	var farmList = new Array();
	farmList = GM_getValue('villages_'+suffix, '').split('\n');
	for (i=1; i <= farmList.length-1; i++)
	{
		farmList[i] = farmList[i].split("||");
		farmId = farmList[i][1];
		if (farmId == id) {
			return farmList[i][2];
		}
	}
	return 0;
}
	

//auto-attack farms
function attackFarm(farmId)
{
	var troopsA = getFarmTroops(farmId).split("|");
	var coords = getFarmCoordsNew(farmId).split(",");
	var url = attackurl2 + '?' + DID2;
	//alert(url);
	postvar = 'b=1&t1='+ troopsA[0] +'&t2='+ 0 +'&t3='+ troopsA[1] +'&t4='+ 0 +'&t5='+ troopsA[2] +'&t6='+ troopsA[3] +'&t7='+ 0 +'&t8='+ 0 +'&t9='+ 0 +'&t10='+ 0 +'&t11='+ 0 +'&c='+ 3 +'&dname=&x='+coords[0]+'&y='+coords[1]+'&s1=ok';
	//alert(postvar);
	postn(url, postvar);
	//window.location = "a2b.php?z="+farmId;
}

//delete all villages
function delAllVillages()
{
	//delete
	GM_setValue('villages_'+suffix, '');
	//list is empty, restore column visibility to default
	var columns = colsVisibility;
	GM_setValue('columns_'+suffix, columns);
	//refresh list
	reloadVillageList();
}


//reload list
function reloadVillageList()
{
	var oldTable = document.getElementById('listDiv_'+suffix);
	if (oldTable) {
		oldTable.parentNode.removeChild(oldTable);
	}
	villageList();
}


//restore default position
function restorePos()
{
	GM_setValue('listDiv_'+suffix, listPos);
	//refresh list
	reloadVillageList();
}


//get list width
function getListWidth()
{
	var columns = getColumnStatus();
	var listWidth = 0;
	for (var i=0; i<columns.length; i++) {
		if (columns[i] != 'none') {
			listWidth = listWidth + colsWidth[i] + 2; //+2px cell borders width
		}
	}
        listWidth = listWidth+110;
	return listWidth;
}


//set list width
function setListWidth(listTable, isMinWidth)
{
	if (isMinWidth) {
		
	} else {
		
	}
}


//load columns visibility status
function getColumnStatus()
{
	var columns = GM_getValue('columns_'+suffix, '');
	if (!columns || columns == '' || columns.split(',').length<colsWidth.length) {
		columns = colsVisibility; //default values
		GM_setValue('columns_'+suffix, columns);
	}
	columns = columns.split(',');
	return columns;
}


//calculate globe distance
function globeDistance(a, b)
{
	var dist1 = (a > b) ? Math.abs(a-b) : Math.abs(b-a);
	var dist2 = (a > b) ? (Math.abs(400-a)+Math.abs(-400-b)) : (Math.abs(400-b)+Math.abs(-400-a));
	var distFinal = (dist1 < dist2) ? dist1 : dist2;
	return distFinal;
}


//calculate distance between two villages
function coordDistXYtoXY(x1, y1, x2, y2)
{
	var distX = globeDistance(x1, x2);
	var distY = globeDistance(y1, y2);
	var dist = Math.sqrt((distX*distX) + (distY*distY));
	dist = trimNumber(dist, 2);
	return dist;
}


//xpath helper
function xpathEvaluate(xpath, xpres)
{
  var ret = document.evaluate(xpath, document, null, xpres, null);
  return  xpres == XPFirst ? ret.singleNodeValue : ret;
}


//retrieve travian language
function getLanguage()
{
	var langExt = loc.match(/travian(\.[a-zA-Z]{2,3})+/);
	if (!langExt) {
		langExt = loc.match(/travian3(\.[a-zA-Z]{2,3})+/).pop(); 
	} else {
		langExt = loc.match(/travian(\.[a-zA-Z]{2,3})+/).pop();
	}
	return langExt;
}


//change characters to html code
function strToHtmlCode(str)
{
	var strCode = '';
	for (i=0; i<str.length; i++) {
		var character = str.charCodeAt(i);
		if (character > 127) {
			strCode += '&#' + character + ';';
		} else {
			strCode += str.charAt(i);
		}
	}
	return strCode;
}


//create unique suffix based on server & player
function getSuffix()
{
	var textFullUrl = document.URL;
	var textServerUrl = textFullUrl.substring(textFullUrl.indexOf('://')+3, textFullUrl.lastIndexOf('/'));
	var str = textServerUrl+'_'+getOwnerId();
	return str;
}


//create show options event
function makeEventShowOptions(tableFoot)
{
	var img = document.createElement('img');
	img.title = langFile['SHOW']+' '+langFile['OPTIONS'];
	img.style.opacity = '0.5';
	img.addEventListener('click', foo=function(){showOptions();}, false);
	return img;
}

//New
function makeTroopsInput(farmId)
{
	var troopsBox = document.createElement( 'input' );
	troopsBox.id = "Farms_" + farmId;
	troopsBox.style.width = "90px";
	troopsBox.style.height = "14px";
	troopsBox.style.border = "1px";
	troopsBox.value = getFarmTroops(farmId);
	return troopsBox;
}

function makeTroopsButton(text, href, farmId)
{
	var troopsBut = document.createElement( 'a' );
	troopsBut.href = href;
	troopsBut.value = getFarmTroops(farmId);
	troopsBut.style.color = "green";
	troopsBut.appendChild(  document.createTextNode(  text ) );
	troopsBut.addEventListener('click', bar=function(){setFarmTroops(farmId);}, false);
	return troopsBut;
}


//create hide options event
function makeEventHideOptions(tableFoot)
{
	var img = document.createElement('img');
	img.title = langFile['HIDE']+' '+langFile['OPTIONS'];
	img.style.opacity = '1.0';
	img.addEventListener('click', foo=function(){hideOptions();}, false);
	return img;
}


//hide options
function hideOptions()
{
	GM_setValue('options_'+suffix, false);
	reloadVillageList();
}


//show options
function showOptions()
{
	GM_setValue('options_'+suffix, true);
	reloadVillageList();
}


//create minimize event
function makeEventMinimize(titleDiv)
{
	var img = document.createElement('img');
	img.title = langFile['MINIMIZE'];
	img.style.width = '12px';
	img.style.height = '12px';
	img.style.paddingTop = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,' + image['minimize'];
	img.addEventListener('click', foo=function(){minimizeList();}, false);
	titleDiv.addEventListener('dblclick', bar=function(){minimizeList();}, false);
	return img;
}


//create maximize event
function makeEventMaximize(titleDiv)
{
	var img = document.createElement('img');
	img.title = langFile['MAXIMIZE'];
	img.style.width = '12px';
	img.style.height = '12px';
	img.style.paddingTop = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,' + image['maximize'];
	img.addEventListener('click', foo=function(){maximizeList();}, false);
	titleDiv.addEventListener('dblclick', bar=function(){maximizeList();}, false);
	return img;
}


//minimize list
function minimizeList()
{
	GM_setValue('minimize_'+suffix, true);
	reloadVillageList();
}


//maximize list
function maximizeList()
{
	GM_setValue('minimize_'+suffix, false);
	reloadVillageList();
}


//create send troops event
function makeEventSendTroops(villageId)
{
	var img = document.createElement( 'img' );
	img.title = "Send troops";
	img.style.width = "14px";
	img.style.height = "14px";
	img.src = "img/un/a/att1.gif";
	img.addEventListener('click', bar=function(){attackFarm(villageId);}, false);
	img.style.cursor = 'pointer';
	return img;
}


//go to send troops page
function sendTroopsPage(villageId)
{
	window.location = 'a2b.php?z='+villageId;
}


//create show map page event
function makeEventShowMap(villageId, coordX, coordY)
{
	var img = document.createElement('img');
	img.title = langFile['MAP']+' ('+coordX+'|'+coordY+')';
	img.style.width = '16px';
	img.style.height = '16px';
	img.style.paddingTop = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,' + image['map'];
	img.addEventListener('click', bar=function(){showMapPage(villageId);}, false);
	return img;
}


//go to map page
function showMapPage(villageId)
{
	window.location = 'karte.php?z='+villageId;
}


//create send resources event
function makeEventSendResources(villageId)
{
	var img = document.createElement('img');
	img.title = langFile['SEND_RESOURCES'];
	img.style.width = '14px';
	img.style.height = '14px';
	img.style.paddingTop = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,' + image['market'];
	img.addEventListener('click', bar=function(){sendResourcesPage(villageId);}, false);
	return img;
}


//go to send resources page
function sendResourcesPage(villageId)
{
	window.location = 'build.php?z='+villageId+'&gid=17';
}


//create delete event
function makeEventDelete(villageId)
{
	var img = document.createElement('img');
	img.title = langFile['DELETE'];
	img.style.width = '12px';
	img.style.height = '12px';
	img.style.paddingTop = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,' + image['delete'];
	img.addEventListener('click', bar=function(){delVillage(villageId);}, false);
	return img;
}


//create hide column event
function makeEventHideCol(colIndex)
{
	var inputElem = document.createElement('input');
	inputElem.type = 'checkbox';
	inputElem.checked = true;
	inputElem.title = langFile['HIDE'];
	inputElem.addEventListener('click', foo=function(){ hideColumn(colIndex); }, false);
	return inputElem;
}


//create show column event
function makeEventShowCol(colIndex)
{
	var inputElem = document.createElement('input');
	inputElem.type = 'checkbox';
	inputElem.checked = false;
	inputElem.title = langFile['SHOW'];
	inputElem.addEventListener('click', foo=function(){ showColumn(colIndex); }, false);
	return inputElem;
}


//hide a column
function hideColumn(colIndex)
{
	setColumnVisibility(colIndex, 'none');
	reloadVillageList();
}


//show a column
function showColumn(colIndex)
{
	setColumnVisibility(colIndex, '');
	reloadVillageList();
}


//update column array in Firefox preference store
function setColumnVisibility(index, value)
{
	var columns = getColumnStatus();
	columns.splice(index, 1, value);
	var columnsAfter = new Array;
	for (i=0; i<=columns.length-1; i++) {
		columnsAfter = (i==columns.length-1) ? columnsAfter+columns[i] : columnsAfter+columns[i]+",";
	}
	GM_setValue('columns_'+suffix, columnsAfter);
}


//replace "|" char with "¦"
function cleanStr(str)
{
	str = str.replace(/\|/g, '│');
	str = trim(str);
	return str;
}


//load images
function loadImages()
{
	image['troops'] = 'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAACaklEQVQokW2Rz0uTARjHP+9c7J2/' +
					  'MjWc6fyxQtNCplEZKWWWJ0VohzYPQdqtURf/gIIgkEAIEekaHqz0ooK8NihbgjlNbUtUmKyczop8' +
					  'Jy0nok+H0ND63J7D9/t8n++j+Hw+CYfD6LqOxWKhrq5O4T/oui6apgGQmpqKYWBgAJvNhsPhIDMz' +
					  'k4WFBTkoikajMjY2RkNDA9XV1YRCIQwtLS1omkYgEKC0tJRgMMji4uI+8cjICFVVVUQiETweDzab' +
					  'DUSESCQira2tEggEZGtrSzRNk4mJCVlfX5f29nZZW1uTlZUV6ezslI6ODhERFJE/5lNTU9Lf34/T' +
					  '6SQvLw+Px4OqqtjtdkQEr9dLLBajqalJATDsxrHb7UpjYyPj4+MsLy9TU1OD3+9nZ2eH6elp4vE4' +
					  'LpdrL/7exl2Gh4dlbm6O+vp6TCYTPT09GI1G3G73vrYNHCAajWK1WhkdHWV7exu3201iYuI/71FW' +
					  'lz+LPtPNt81U1JxKMBgpPllCx5N2cnJzqa29higJ+N6PospPSszzbFrqMCrbMeZ9Q+hrOmlHB6l1' +
					  '3CE4/gmr5QgFecfwe19ypqyIcnWSt4PPmElLJ/9K8d8bX/V1ydXjUVZn3xBeCjGzXkCy2YSi+zlX' +
					  'nIH1dC2vP/7grLONpKRkRRERel88FyYfknXYSGKFm7JLN7jruojF8IXbj4Y4ZE6h9/FNLhfG6Fuq' +
					  '4N79LpTutmY5lRIitjpHpOgB113NCkA8viG/YjHSMzIVgNBiUN49dXE+6ysfNsoxJmx+Jy1bxZRU' +
					  'yQXnrb3WVNWsqKp5b84vtCmz2Sck4XAa2aqB3zOsEfFtFdmBAAAAAElFTkSuQmCC';
	
	image['delete'] = 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABSklEQVQokXWSwUoCYRSFv98JIZnZ' +
					  'BiMEQfBDCzf6ND6A+QDzANYD+AL/Ph/AeYB0r+4VoiCcoSgSZwqShtOmGRTpwl2cw/0u58JFEpL4' +
					  'Xq/1cnenn+1WpVf223isZa+nz+VSJwDvcazn4ZAiz9lMJljnKP3EOXZpStBu07DW1HZJovc4pshz' +
					  'ALLFgtfRSLsk0dPtLbs05dRaLodDAIwkABLnlP5t9nyfhrVkiwWe79OKY7wgMAcAwEMUaTOdVtrz' +
					  'faxzNKw1pVdjry5ubvB8v9JBp3MwfAR4QWAa1lZ6M52Szef6F0icU5l7LyZFlukI2Ewm1dHnUUQ9' +
					  'DAEo8pxlv19BRhJfq5VW19cUeU49DGnFscnmc636/f0AtMZjakWWVcNBu815FJUHm7NuF4B6GHI1' +
					  'GlFvNg0f9/d6HAy0nc2OXkIS29ns4F1+AXRj1R+Rb6hBAAAAAElFTkSuQmCC';
	
	image["minimize"]='R0lGODlhDAAMAIAAAGBgYP///yH5BAEAAAEALAAAAAAMAAwAAAINjI+py+0PG5hU0RrzKwA7';
	
	image["maximize"]='R0lGODlhDAAMAIAAAGBgYP///yH5BAEAAAEALAAAAAAMAAwAAAIVjI+pCe2N3osKUHZzsPhwLTnL' +
					  'SBoFADs%3D';
	
	image["options"] ='R0lGODlhEgAOANUkAP///2ZmZtra2jU1Nezs7Ovr6zIyMuTk5GdnZ8nJyTQ0NGVlZT4+PtXV1Tg4' +
					  'OEdHR+jo6Dw8PFZWVklJSVxcXOnp6UhISGNjY9TU1DMzM8HBwUxMTFRUVOXl5V1dXVNTU01NTcrK' +
					  'yldXV2JiYv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACQALAAAAAASAA4AAAZ3QJJw' +
					  'SCwWA0gkIoBYBowXgHRKJYyKHyoASeUUKVsIYBGAVAwGgKco2QbIgkPncACIihMpUiPoKwYAFkUg' +
					  'AH19SIYAG0UPWw0CSA0YGWkPRQxuiIYCAAxFEXoBfQkJIQkFEUUOUgQFrQSwrg5GA38Dt7h/Rru8' +
					  'QkEAOw%3D%3D';
	
	image['market'] = 'R0lGODlhEAAQAOYAAAAAAP///xx6BESSLEyWNFyiRJTChDSGFJzGjCx+BFyePESOHGSiRDyKDESS' +
					  'FDyGDIS2ZJzChKTKjEySHFSaJHSqTIy6bKTGjKzOlFyaLGSeNHyuVKzKlISyXGSeLGyiNHSmPLTO' +
					  'lPz+9Pz65Pz21PTu1Pz23PTmtPzuvPzyzNy2TNSyVNy+ZPzehNS6dOTKhPzinPzmpNzKlOzapPzq' +
					  'tPTmvPzuxPzy1Pz25PS+POy+TNSqRNSuTNy2VPzWdNy+dOTGfOzOhPTWjPzelOzSlOzWnPzqvOze' +
					  'vPzuzOSyROy6TPTCVNyyVNSuVPTKbOS+bPzWfNy6bPTOfPzajOzOjPTWlPTerPzmtPTq1OSyTNyu' +
					  'VNSqVPTOhOTCfOzKhPzalNzCjOTKlPzirMyaPNSmVNyyZNy2dOzGhNy6fPzanOzWrOzexMyOLMSK' +
					  'LMySNMyWPNSmXOzavPzqzNSiXMyORP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
					  'BAEAAHUALAAAAAAQABAAAAffgHWCg3UvXTeEiYJFPUUvTUSKgyxEODhWJz8raolAQCUiIkhaUGJV' +
					  'ZWWCRCozWEcyYC5RVVJpYl5kaCsjckRBT0xuSCZGQz4xLW49IzdXXFJSWWI0MD45SUJvPTg3N0ZT' +
					  'TllTUyAaOkpUbkw4JClIRl9LSzkfGxlZXm483CkoNCAfPnjYgKGCgzNsdowwYcNIjA8hMHDgYEEC' +
					  'gwNtfqCpwTCGBgwWLEDoACGCggSCtnRBkiKDBAkXEEAwwGABoTBjulCY4KCBApoDJKFhQ8UMnQcF' +
					  'CEgStAbOnDgHBBAKBAA7';
	
	image['map']   =  'R0lGODlhEAAQAKIGAN3d3aqqqnRoVsWzl////wAAAP///wAAACH5BAEAAAYALAAAAAAQABAAAANH' +
					  'aLpWznAVQkaJbFZxcaMD531bIUZOEZpC0GUCxw6AC5lWSA+EnVWAXcX3Ew4GxGIFafJMji6B08GU' +
					  'Ykyu6KgQsDRHDYcVkgAAOw%3D%3D';
}


//load language
function loadLanguage(langExt)
{
	if (!langExt) return false;
	
	langFile['VILLAGE_MANAGER'] = 'Village Manager';

	//English (default)
	langFile['VILLAGE'] = 'Village';
	langFile['ALREADY_LIST'] = 'is already in the list';
	langFile['ADD_VILLAGE']  = 'Add village';
	langFile['NO_VILLAGES'] = 'No villages in the list!';
	langFile['MAP'] = 'Map';
	langFile['PLAYER'] = 'Player';
	langFile['PLAYER_PROFILE'] = 'Player profile';
	langFile['ALLY'] = 'Ally';
	langFile['ALLY_PROFILE'] = 'Ally profile';
	langFile['DISTANCE'] = 'Distance';
	langFile['DISTANCE_VILLAGE'] = 'Distance from';
	langFile['DELETE'] = 'Delete';
	langFile['SEND_TROOPS'] = 'Send troops';
	langFile['DRAG'] = 'Drag';
	langFile['HIDE'] = 'Hide';
	langFile['SHOW'] = 'Show';
	langFile['SORT_BY'] = 'Sort by';
	langFile['MINIMIZE'] = 'Minimize';
	langFile['MAXIMIZE'] = 'Maximize';
	langFile['YOUR_VILLAGE'] = 'your village';
	langFile['COLUMNS'] = 'columns';
	langFile['OPTIONS'] = 'options';
	langFile['SEND_RESOURCES'] = 'Send resources';
	langFile['VILLAGE_PROFILE'] = 'Village profile';
	langFile['OTHER_OPTIONS'] = 'Other options';
	langFile['DELETE_ALL'] = 'Delete all villages';
	langFile['RESTORE_POS'] = 'Restore list position';
	
	switch(langExt) {
		/*
		case '.XX':		// Replace XX for your server: travian.XX and translate from english
			langFile['VILLAGE'] = 'Village';
			langFile['ALREADY_LIST'] = 'is already in the list';
			langFile['ADD_VILLAGE']  = 'Add village';
			langFile['NO_VILLAGES'] = 'No villages in the list!';
			langFile['MAP'] = 'Map';
			langFile['PLAYER'] = 'Player';
			langFile['PLAYER_PROFILE'] = 'Player profile';
			langFile['ALLY'] = 'Ally';
			langFile['ALLY_PROFILE'] = 'Ally profile';
			langFile['DISTANCE'] = 'Distance';
			langFile['DISTANCE_VILLAGE'] = 'Distance from';
			langFile['DELETE'] = 'Delete';
			langFile['SEND_TROOPS'] = 'Send troops';
			langFile['DRAG'] = 'Drag';
			langFile['HIDE'] = 'Hide';
			langFile['SHOW'] = 'Show';
			langFile['SORT_BY'] = 'Sort by';
			langFile['MINIMIZE'] = 'Minimize';
			langFile['MAXIMIZE'] = 'Maximize';
			langFile['YOUR_VILLAGE'] = 'your village';
			langFile['COLUMNS'] = 'columns';
			langFile['OPTIONS'] = 'options';
			langFile['SEND_RESOURCES'] = 'Send resources';
			langFile['VILLAGE_PROFILE'] = 'Village profile';
			langFile['OTHER_OPTIONS'] = 'Other options';
			langFile['DELETE_ALL'] = 'Delete all villages';
			langFile['RESTORE_POS'] = 'Restore list position';
			break;
		*/
		case '.it':		//Italian
			langFile['VILLAGE'] = 'Villaggio';
			langFile['ALREADY_LIST'] = 'è già nella lista';
			langFile['ADD_VILLAGE'] = 'Aggiungi villaggio';
			langFile['NO_VILLAGES'] = 'Nessun villaggio nella lista!';
			langFile['MAP'] = 'Mappa';
			langFile['PLAYER'] = 'Giocatore';
			langFile['PLAYER_PROFILE'] = 'Profilo giocatore';
			langFile['ALLY'] = 'Alleanza';
			langFile['ALLY_PROFILE'] = 'Profilo alleanza';
			langFile['DISTANCE'] = 'Distanza';
			langFile['DISTANCE_VILLAGE'] = 'Distanza dal';
			langFile['DELETE'] = 'Cancella';
			langFile['SEND_TROOPS'] = 'Invia truppe';
			langFile['DRAG'] = 'Trascina';
			langFile['HIDE'] = 'Nascondi';
			langFile['SHOW'] = 'Mostra';
			langFile['SORT_BY'] = 'Ordina per';
			langFile['MINIMIZE'] = 'Riduci';
			langFile['MAXIMIZE'] = 'Ingrandisci';
			langFile['YOUR_VILLAGE'] = 'tuo villaggio';
			langFile['COLUMNS'] = 'colonne';
			langFile['OPTIONS'] = 'opzioni';
			langFile['SEND_RESOURCES'] = 'Invia risorse';
			langFile['VILLAGE_PROFILE'] = 'Profilo villaggio';
			langFile['OTHER_OPTIONS'] = 'Altre opzioni';
			langFile['DELETE_ALL'] = 'Cancella tutti i villaggi';
			langFile['RESTORE_POS'] = 'Ripristina posizione';
		break;
		 case '.pl':	//Polish
			langFile['VILLAGE'] = 'Wioska';
			langFile['ALREADY_LIST'] = 'już jest na liście';
			langFile['ADD_VILLAGE'] = 'Dodaj osadę';
			langFile['NO_VILLAGES'] = 'Brak osad na liście!';
			langFile['MAP'] = 'Mapa';
			langFile['PLAYER'] = 'Gracz';
			langFile['PLAYER_PROFILE'] = 'Profil gracza';
			langFile['ALLY'] = 'Sojusz';
			langFile['ALLY_PROFILE'] = 'Strona sojuszu';
			langFile['DISTANCE'] = 'Dystans';
			langFile['DISTANCE_VILLAGE'] = 'Dystans z';
			langFile['DELETE'] = 'Usuń';
			langFile['SEND_TROOPS'] = 'Wyślij jednostki';
			langFile['DRAG'] = 'Przesuń';
			langFile['HIDE'] = 'Ukryj';
			langFile['SHOW'] = 'Pokaż';
			langFile['SORT_BY'] = 'Sortuj według';
		break;
		case '.ru':		//Russian
			langFile['VILLAGE'] = 'Деревня';
			langFile['ALREADY_LIST'] = 'уже в списке';
			langFile['ADD_VILLAGE'] = 'Добавить в список';
			langFile['NO_VILLAGES'] = 'Список пуст!!!';
			langFile['MAP'] = 'Карта';
			langFile['PLAYER'] = 'Игрок';
			langFile['PLAYER_PROFILE'] = 'Профиль игрока';
			langFile['ALLY'] = 'Альянс';
			langFile['ALLY_PROFILE'] = 'Профиль альянса';
			langFile['DISTANCE'] = 'Расстояние';
			langFile['DISTANCE_VILLAGE'] = 'Расстояние от';
			langFile['DELETE'] = 'Удалить';
			langFile['SEND_TROOPS'] = 'Отправка войск';
			langFile['DRAG'] = 'Перетащить';
			langFile['HIDE'] = 'Скрыть';
			langFile['SHOW'] = 'Показать';
			langFile['SORT_BY'] = 'Сортировать по';
		break;
		case '.net':	//Spanish (Spain)
		case '.ar':		//Spanish (Argentina)
			langFile['VILLAGE'] = 'Aldea';
			langFile['ALREADY_LIST'] = 'Ya está en la lista!!!';
			langFile['ADD_VILLAGE']  = 'Agregar Granja';
			langFile['NO_VILLAGES'] = 'No hay Aldeas!!!';
			langFile['MAP'] = 'Mapa';
			langFile['PLAYER'] = 'Jugador';
			langFile['PLAYER_PROFILE'] = 'Perfil jugador';
			langFile['ALLY'] = 'Alianza';
			langFile['ALLY_PROFILE'] = 'Perfil alianza';
			langFile['DISTANCE'] = 'Distancia';
			langFile['DISTANCE_VILLAGE'] = 'Distancia de';
			langFile['DELETE'] = 'Borrar';
			langFile['SEND_TROOPS'] = 'Enviar Tropas';
			langFile['DRAG'] = 'Mover';
			langFile['SHOW'] = 'Mostrar';
		break;
		case '.si':		//Slovenian
			langFile['VILLAGE'] = 'Vas';
			langFile['ALREADY_LIST'] = 'je že na seznamu';
			langFile['ADD_VILLAGE'] = 'Dodaj farmo';
			langFile['NO_VILLAGES'] = 'Ni farm!!!';
			langFile['MAP'] = 'Mapa';
			langFile['PLAYER'] = 'Igralca';
			langFile['PLAYER_PROFILE'] = 'Profil igralca';
			langFile['ALLY'] = 'Zavezništva';
			langFile['ALLY_PROFILE'] = 'Profil zavezništva';
			langFile['DISTANCE'] = 'Razdalja';
			langFile['DISTANCE_VILLAGE'] = 'Razdalja do';
			langFile['DELETE'] = 'Izbriši';
			langFile['SEND_TROOPS'] = 'Pošlji enote';
			langFile['DRAG'] = 'Premakni';
		break;
		case '.pt':		//Portuguese (Portugal)
		case '.br':		//Portuguese (Brazil)
			langFile['VILLAGE'] = 'Aldeia';
			langFile['ALREADY_LIST'] = 'A aldeia já esta adicionada';
			langFile['ADD_VILLAGE'] = 'Adicionar aldeia';
			langFile['NO_VILLAGES'] = 'Nenhum aldeias!!!';
			langFile['MAP'] = 'Mapa';
			langFile['PLAYER'] = 'Jogador';
			langFile['PLAYER_PROFILE'] = 'Perfil do jogador';
			langFile['ALLY'] = 'Aliança';
			langFile['ALLY_PROFILE'] = 'Perfil da aliança';
			langFile['DISTANCE'] = 'Distância';
			langFile['DISTANCE_VILLAGE'] = 'Distância da';
			langFile['DELETE'] = 'Apagar';
			langFile['SEND_TROOPS'] = 'Enviar Tropas';
			langFile['DRAG'] = 'Mover';
		break;
		case '.nl':		//Dutch
			langFile['VILLAGE'] = 'Dorp';
			langFile['ALREADY_LIST'] = 'staat al op de lijst';
			langFile['ADD_VILLAGE'] = 'Voeg toe aan farmlijst';
			langFile['NO_VILLAGES'] = 'Geen farms!!!';
			langFile['MAP'] = 'Kaart';
			langFile['DELETE'] = 'Verwijder';
			langFile['SEND_TROOPS'] = 'Stuur troepen';
			langFile['DRAG'] = 'Sleep';
		break;
		case '.de':		//German
			langFile['VILLAGE'] = 'Dorf';
			langFile['ALREADY_LIST'] = 'ist bereits in der Liste';
			langFile['ADD_VILLAGE'] = 'Farm hinzufügen';
			langFile['NO_VILLAGES'] = 'Keine Farmen!!!';
			langFile['MAP'] = 'Karte';
			langFile['DELETE'] = 'Löschen';
			langFile['SEND_TROOPS'] = 'Truppen schicken';
			langFile['DRAG'] = 'verschieben';
		break;
		case '.ae':		//Arabic
			langFile['VILLAGE'] = 'قرية';
			langFile['ALREADY_LIST'] = 'تم اضافة هذه القرية الى القائمة';
			langFile['ADD_VILLAGE'] = 'اضافة الى القرى المستهدفه';
			langFile['NO_VILLAGES'] = 'لا يوجد قرى مستهدفه';
			langFile['MAP'] = 'الخريطة';
			langFile['DELETE'] = 'ازالة';
			langFile['SEND_TROOPS'] = 'ارسال الجنود';
			langFile['DRAG'] = 'صيد';
		break;
		case '.lt':		//Lithuanian
			langFile['VILLAGE'] = 'Miestas';
			langFile['ALREADY_LIST'] = 'jau saraše';
			langFile['ADD_VILLAGE'] = 'Įtraukti fermą';
			langFile['NO_VILLAGES'] = 'Fermų nėra!!!';
			langFile['MAP'] = 'Žemėlapis';
			langFile['DELETE'] = 'Trinti';
			langFile['SEND_TROOPS'] = 'Siųsti karius';
			langFile['DRAG'] = 'Perkelti';
		break;
	}
	
	return true;
}


//trim number
function trimNumber(number, pos)
{
	var factor = Math.pow(10, pos)
	return Math.round(number*factor)/factor
}


/**
*  Javascript trim, ltrim, rtrim
*  http://www.webtoolkit.info/
* Without the second parameter, they will trim these characters:
* 	" " (ASCII 32 (0x20)), an ordinary space.
* 	"\t" (ASCII 9 (0x09)), a tab.
* 	"\n" (ASCII 10 (0x0A)), a new line (line feed).
* 	"\r" (ASCII 13 (0x0D)), a carriage return.
* 	"\0" (ASCII 0 (0x00)), the NUL-byte.
* 	"\x0B" (ASCII 11 (0x0B)), a vertical tab.
**/
function trim(str, chars)
{
	return trimL(trimR(str, chars), chars);
}
function trimL(str, chars)
{
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
function trimR(str, chars)
{
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}


/************************ Drag n drop*******************************/
// from Risi of http://userscripts.org/
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;
function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}
function getMouseOffset(target, ev){
	var docPos  = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}
function getPosition(e){
	var left = 0;
	var top = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e   = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}
function mouseMove(ev){
	var target = ev.target;
	var mousePos = mouseCoords(ev);
	if (dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top  = (mousePos.y - mouseOffset.y) +'px';
		dragObject.style.left   = (mousePos.x - mouseOffset.x) +'px';
	}
	lMouseState = iMouseDown;
	return false;
}
function mouseUp(ev){
	if (dragObject) {
		setOption(dragObject.id, dragObject.style.top +'_'+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}

function mouseDown(ev){
	var target = ev.target;
	iMouseDown = true;
	if (target.getAttribute('DragObj')){
		return false;
	}
}
function makeDraggable(parent, item){
	if (!parent||!item) return;
	item.addEventListener('mousedown',function(ev){
		dragObject  = parent;
		mouseOffset = getMouseOffset(parent, ev);
		return false;
	}, false);
}
function setOption(key, value) {
	GM_setValue(key, value);
}
/************************ End Drag n drop*******************************/


/************************ Sort table*******************************/
//modified version from http://greasemonkey.nakohdo.de/

function ts_makeSortable (table)
{
	//get header
	headersRow = table.tHead.rows[0];
	if (!headersRow) return;
	//make headers content clickable (but first and last 2 columns)
	for (var i=1; i<headersRow.cells.length-2; i++)
	{
		var cell = headersRow.cells[i];
		var txt = ts_getInnerText(cell);
		// The number of the column is safed as a custom attribute for later reference when calling the ts_resortTabel function.
		cell.innerHTML = '<a class="sortheader" column="'+i+'" style="cursor: pointer;">'+
						 txt+'<span class="sortarrow">&nbsp;&nbsp;</span></a>';
		// Get link as object and addEventListener
		elmLinks = cell.getElementsByTagName("a")
		elmLinks[0].addEventListener('click', 
									foo=function(event){
										var lnk = event.target;
										var col = lnk.getAttribute('column');
										ts_resortTable(lnk, col);	// the call to the original function
									}, false)
	}
}


function ts_resortTable(lnk, col, order) 
{
	// get the span
	var span;
	for (var ci=0; ci<lnk.childNodes.length; ci++) {
		if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span')
			span = lnk.childNodes[ci];
	}
	var spantext =  ts_getInnerText(span);
	var td = lnk.parentNode;
	var column = td.cellIndex;
	var table = getParent(td, 'table');
	var tableBody = table.tBodies[0];
	if (tableBody.rows.length <= 1) return;
	
	//sort type
	if (col == '4') {
		sortfn = ts_sort_numeric; //distance column
	} else {
		sortfn = ts_sort_caseinsensitive; //all other columns
	}
	
	// Work out a type for the column
	//var itm = ts_getInnerText(tableBody.rows[0].cells[column]);
	//if (itm.match(/[\d\.]+/g)) sortfn = ts_sort_numeric;
	// if (itm.match(/[€]/g)) sortfn = ts_sort_currency;
	// if (itm.match(/\d\d[\/-]\d\d[\/-]\d\d\d\d/g)) sortfn = ts_sort_date;
	// if (itm.match(/\d\d[\/-]\d\d[\/-]\d\d/g)) sortfn = ts_sort_date;
	SORT_COLUMN_INDEX = column;
	
	//create and populate a new array
	var newRows = new Array();
	for (j=0; j<tableBody.rows.length; j++) {
		newRows[j] = tableBody.rows[j];
	}
	
	//sort the array
	newRows.sort(sortfn);
	
	//set arrow symbol and update stored value
	if (order) {
		//called by script
		if (order == 'up') {
			ARROW = '&nbsp;&uarr;';
			span.setAttribute('sortdir', 'up');
			GM_setValue('sort_'+suffix, col+'_up');
			newRows.reverse();
		} else {
			ARROW = '&nbsp;&darr;';
			span.setAttribute('sortdir', 'down');
			GM_setValue('sort_'+suffix, col+'_down');
		}
	} else {
		//called by user
		if (span.getAttribute("sortdir") == 'down') {
			ARROW = '&nbsp;&uarr;';
			span.setAttribute('sortdir', 'up');
			GM_setValue('sort_'+suffix, col+'_up');
			newRows.reverse();
		} else {
			ARROW = '&nbsp;&darr;';
			span.setAttribute('sortdir','down');
			GM_setValue('sort_'+suffix, col+'_down');
		}
	}
	
	// We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
	for (i=0; i<newRows.length; i++) {
		tableBody.appendChild(newRows[i]);
	}
	
	// Delete any other arrows there may be showing
	var allspans = document.getElementsByTagName("span");
	for (var ci=0;ci<allspans.length;ci++) {
		if (allspans[ci].className == 'sortarrow') {
			if ( getParent(allspans[ci],"table") == getParent(lnk, "table")) { // in the same table as us?
				allspans[ci].innerHTML = '&nbsp;&nbsp;';
			}
		}
	}
	
	//add the arrow
	span.innerHTML = ARROW;
}


function ts_getInnerText(el)
{
	if (typeof el == "string") return el;
	if (typeof el == "undefined") { return el };
	if (el.innerText) return el.innerText;	//Not needed but it is faster
	var str = "";
	
	var cs = el.childNodes;
	var l = cs.length;
	for (var i = 0; i < l; i++) {
		switch (cs[i].nodeType) {
			case 1: //ELEMENT_NODE
				str += ts_getInnerText(cs[i]);
				break;
			case 3:	//TEXT_NODE
				str += cs[i].nodeValue;
				break;
		}
	}
	return str;
}


function getParent (el, pTagName)
{
	if (el == null) return null;
	else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())	// Gecko bug, supposed to be uppercase
		return el;
	else
		return  getParent(el.parentNode, pTagName);
}


function ts_sort_date(a,b)
{
	// y2k notes: two digit years less than 20 are treated as 20XX, greater than 20 are treated as 19XX
	aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
	aa = aa.replace(/\s/g, '');
	if (aa.length == 10) {
		yr = aa.substr(6,4);
	} else {
		yr = aa.substr(6,2);
		if (parseInt(yr) < 20) { yr = '20'+yr; } else { yr = '19'+yr; }
	}
	day = aa.substr(0,2);
	month = aa.substr(3,2);
	dt1 = yr+month+day;

	bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
	bb = bb.replace(/\s/g, '');
	if (bb.length == 10) {
		yr = bb.substr(6,4);
	} else {
		yr = bb.substr(6,2);
		if (parseInt(yr) < 20) { yr = '20'+yr; } else { yr = '19'+yr; }
	}
	day = aa.substr(0,2);
	month = aa.substr(3,2);
	dt2 = yr+month+day;

	if (dt1==dt2) return 0;
	if (dt1<dt2) return -1;
	return 1;
}


function ts_sort_currency(a,b)
{ 
	aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
	bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
	return parseFloat(aa) - parseFloat(bb);
}


function ts_sort_numeric(a,b)
{ 
	aa = parseFloat(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));
	if (isNaN(aa)) aa = 0;
	bb = parseFloat(ts_getInnerText(b.cells[SORT_COLUMN_INDEX])); 
	if (isNaN(bb)) bb = 0;
	return aa-bb;
}


function ts_sort_caseinsensitive(a,b)
{
	aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
	bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
	if (aa==bb) return 0;
	if (aa<bb) return -1;
	return 1;
}


function ts_sort_default(a,b)
{
	aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
	bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
	if (aa==bb) return 0;
	if (aa<bb) return -1;
	return 1;
}
/************************ End Sort table*******************************/


/************************ From QP Targets*****************************/
// from QP of http://userscripts.org/

/**
* getParamFromUrl
* @param {String} url The string of the URL
* @param {String} urlParam The param being searched in the URL
*/
function getParamFromUrl(url, urlParam) {
	var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that
	var searchStr = "&" + urlParam + "=";
	var pos = res.indexOf(searchStr);
	if (pos != -1) {
		res = res.substring(res.indexOf(searchStr) + searchStr.length);
		var endPos = (res.indexOf("&") > res.indexOf("#")) ? res.indexOf("&") : res.indexOf("#");
		if (endPos != -1) {
			res = res.substring(0, endPos);
		}
		return res;
	} else {
		return;
	}
}

/**
* addMenuCommand_scriptUpdate
*/
function addMenuCommand_scriptUpdate() {
	var DEF_SCRIPT_NAME = "QP Targets";
	var DEF_SCRIPT_ID = "13471";
	var DEF_SCRIPT_VERSION = "3.1.0";
	GM_registerMenuCommand(DEF_SCRIPT_NAME + " v" + DEF_SCRIPT_VERSION, function(e) {
		var scriptPresentationUrl = "http://userscripts.org/scripts/show/" + DEF_SCRIPT_ID;
		var scriptDownloadUrl = "http://userscripts.org/scripts/source/" + DEF_SCRIPT_ID + ".user.js";
		GM_xmlhttpRequest({
			method: 'GET',
			url: scriptDownloadUrl,
			headers: {	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'application/atom+xml,application/xml,text/xml'
			},
			onload: function(responseDetails) {	// Matches the version in a script - numbers and dots
				var uploadedVersion = /^\/\/\s+@version\s+(\d+(\.\d+)*)$/m.exec(responseDetails.responseText)[1];
				if (uploadedVersion != DEF_SCRIPT_VERSION) {
					window.open(scriptDownloadUrl, "_blank").close();
				} else {
					alert("GreaseMonkey - " + DEF_SCRIPT_NAME + " v" + DEF_SCRIPT_VERSION + "\n"
						+ scriptPresentationUrl + " - " + DEF_SCRIPT_NAME + " v" + uploadedVersion);
				}
			}
		});
	});
}
/************************ End QP Targets *****************************/

function postn(url, data) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) 
      {
	pulled = document.createElement('div');
  	pulled.innerHTML = responseDetails.responseText; 
	idValue = getValue(pulled, 'id');
	aValue = getValue(pulled, 'a');
	cValue = getValue(pulled, 'c');
	kidValue = getValue(pulled, 'kid');
	t1Value = getValue(pulled, 't1');
	t2Value = getValue(pulled, 't2');
	t3Value = getValue(pulled, 't3');
	t4Value = getValue(pulled, 't4');
	t5Value = getValue(pulled, 't5');
	t6Value = getValue(pulled, 't6');
	t7Value = getValue(pulled, 't7');
	t8Value = getValue(pulled, 't8');
	t9Value = getValue(pulled, 't9');
	t10Value = getValue(pulled, 't10');
	t11Value = getValue(pulled, 't11');
	
if (!idValue && !aValue && !cValue && !kidValue)
{
alert('id:'+idValue + 'a:'+ aValue + 'c'+ cValue + 'kid'+ kidValue);
//errorMsg("(" + xcord +',' + ycord + ") Probably bad cords."  );
return true;
}

//alert('id:'+idValue + 'a:'+ aValue + 'c'+ cValue + 'kid'+ kidValue);

var postData = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1='+t1Value+'&t2='+t2Value+'&t3='+t3Value+'&t4='+t4Value+'&t5='+t5Value+'&t6='+t6Value+'&t7='+t7Value+'&t8='+t8Value+'&t9='+t9Value+'&t10='+t10Value+'&t11='+t11Value;

postData = postData + '&s1=ok&attacks=&cords=';


postn2(url, postData);
    }
  });
}


function postn2(url, data) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) {
	alert("Attack send");
  
  }
  });
}



function getActiveDid2()
{

var ex = "//a[contains(@href,'newdid')][@class='active_vl']";
	tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

if (tag.snapshotLength)
{
		temp = tag.snapshotItem(0).href.split("?")[1].split('&');
	return temp[0];
	}else{
	errorMsg("Unable to get active village.");
  return "";
    }
}

function getValue(doc, name)
{
var ex = ".//input[@type='hidden'][@name='" + name + "']";
tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (tag.snapshotLength)
  {
	aTag = tag.snapshotItem(0);
	return(aTag.value);
	}else{
  return 0;
  }

  }
