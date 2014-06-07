// ==UserScript==
// @name           Village Manager المعرب
// @version        1.8
// @description    test
// @description    Jack Krauser تم التعريب بواسطة 
// @date           2008-06-20
// @namespace      travian
// @source         http://userscripts.org/scripts/source/32674.user.js
// @identifier     http://userscripts.org/scripts/source/32674.user.js
// @include        http://*.travian*.*/*
// @exclude        http://board.travian*.*
// @exclude        http://forum.travian*.*
// @exclude        http://help.travian*.*/*
// @exclude        http://shop.travian*.*
// @exclude        http://www.travian*.*/*
// @exclude        http://*.travian*.*/activate.php*
// @exclude        http://*.travian*.*/ad/*
// @exclude        http://*.travian*.*/ajax.php*
// @exclude        http://*.travian*.*/anleitung.php*
// @exclude        http://*.travian*.*/anmelden.php*
// @exclude        http://*.travian*.*/chat/*
// @exclude        http://*.travian*.*/geschichte.php*
// @exclude        http://*.travian*.*/gutscheine.php*
// @exclude        http://*.travian*.*/hilfe.php*
// @exclude        http://*.travian*.*/impressum.php*
// @exclude        http://*.travian*.*/index.php*
// @exclude        http://*.travian*.*/links.php*
// @exclude        http://*.travian*.*/log*.php*
// @exclude        http://*.travian*.*/manual.php*
// @exclude        http://*.travian*.*/spielregeln.php*
// @exclude        http://*.travian*.*/support.php*
// @exclude        http://*.travian*.*/tutorial.php*
// ==/UserScript==


//set global variables
var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/32674.user.js',
	version: '1.8'
};
var server = location.hostname;
var suffix;
var lang = new Array();
var image = new Array();
var colsNumber = 11;
var colsDefaultWidth = '20, 180, 140, 140, 140, 80, 50, 50, 20, 20, 20';
var colsDefaultVisibility = ',,none,none,none,none,none,none,none,none,none';
var listDefaultPosition = '42px_4px';  //top_left
var activeVillageCoords = '';
var defaultTags = ',All,Enemy,Friend';
var defaultFilterTag = '';
var mymousePos = null;
var reload = false;
var dom = new DOMUtils();

var isKarte = location.pathname == '/karte.php';
var isLandPage = isKarte && (location.search.indexOf('d=') != -1);
var isMap = isKarte && !isLandPage;


//launch main function after doc is loaded
window.addEventListener('load', main, false);


//main function
function main()
{
	var html = document.body.innerHTML;
	if (html.indexOf(' <!-- ERROR ITEM CONTAINER') != -1) window.location.reload();
	
	//create unique suffix
	var ownerId = getOwnerId();
	if (ownerId) suffix = server+'_'+ownerId;
	else return;
	
	//get language
	loadLanguage();
	
	//load images
	loadImage();
	
	//create "add village" option
	if (isLandPage) {
		createVMLink();
	}
	
	//create list
	createVMList();
}


//create option to add villages to list
function createVMLink()
{
	var tbody = dom.xs('//div[@class="map_details_actions"]/table/tbody');
	if (!tbody) return;
	
	var addOption = dom.cn('a', '\u00BB ' + lang['ADD_VILLAGE']+' '+lang['VILLAGE_MANAGER']);
	addOption.href = 'javascript:void(0)';
	addOption.addEventListener('click', addToVillageList, true);
	
	var row = dom.cn('tr');
	var cell = dom.cn('td');
	cell.appendChild(addOption);
	row.appendChild(cell);
	tbody.appendChild(row);
}


//create the list
function createVMList()
{
	//get current list width
	var listWidth = getListVisibleWidth();
	
	//create list-wrapper div
	var listDiv = dom.cn('div');
	listDiv.id = 'listDiv_'+suffix;
	listDiv.style.zIndex = 666;
	listDiv.style.clear = 'both';
	listDiv.style.position = 'relative';
	listDiv.style.width = listWidth+'px';
	listDiv.style.backgroundColor = '#FFFFFF';
	listDiv.style.border = '1px solid #C0C0C0';
	
	//create title div
	var titleDiv = dom.cn('div');
	titleDiv.style.height = '18px';
	titleDiv.style.width = (listWidth-12)+'px'; //-12px minDiv width
	titleDiv.style.cssFloat = 'left';
	titleDiv.style.fontWeight = 'bold';
	titleDiv.style.fontSize = '10';
	titleDiv.style.textAlign = 'center';
	titleDiv.style.borderBottom = '1px solid #C0C0C0';
	titleDiv.style.backgroundColor = '#FFFFFF';
	titleDiv.style.backgroundImage = 'url(img/un/a/c2.gif)';
	titleDiv.title = lang['DRAG'];
	titleDiv.style.cursor = 'move';
	titleDiv.style.MozUserSelect = 'none';
	titleDiv.appendChild(dom.ct( lang['VILLAGE_MANAGER'] ));
	makeDraggable(listDiv, titleDiv);
	
	//create minimize/maximize list div
	var minDiv = dom.cn('div');
	minDiv.style.height = '18px';
	minDiv.style.width = '12px';
	minDiv.style.cssFloat = 'left';
	minDiv.style.borderBottom = '1px solid #C0C0C0';
	minDiv.style.backgroundColor = '#FFFFFF';
	minDiv.style.backgroundImage = 'url(img/un/a/c2.gif)';
	
	//append bar divs
	listDiv.appendChild(titleDiv);
	listDiv.appendChild(minDiv);
	
	//create table
	var listTable = dom.cn('table');
	listTable.id = 'listTable';
	listTable.setAttribute('cellspacing', '1');
	listTable.setAttribute('cellpadding', '1');
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
		var tableBody = dom.cn('tbody');
		var tbodyRow = dom.cn('tr');
		var tbodyCell = dom.cn('td');
		tbodyCell.setAttribute('colspan', colsNumber);
		var cell = dom.cn('div', lang['NO_VILLAGES']);
		cell.style.textAlign = 'center';
		cell.style.color = '#C0C0C0';
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		tableBody.appendChild(tbodyRow);
		
		//append tbody
		listTable.appendChild(tableBody);
		
	} else {
	
		//NORMAL LIST
		var listIsEmpty = false;
		
		//create thead
		var tableHead = createTableHeader();
		//append thead
		listTable.appendChild(tableHead);
		
		//create tbody
		var tableBody = createTableBody(villageList);
		//append tbody
		listTable.appendChild(tableBody);
		
		//create tfoot
		var tableFoot = createTableFooter(listTable);
		//append tfoot
		listTable.appendChild(tableFoot);
	}
	
	//update list position
	var listCoords = GM_getValue(listDiv.id, listDefaultPosition).split('_');
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
			tableFoot.childNodes[1].style.display = '';
			var img = makeEventHideOptions();
		} else {
			tableFoot.childNodes[1].style.display = 'none';
			if (!listIsMinimized) listDiv.style.borderBottom = 'none';
			var img = makeEventShowOptions();
		}
		img.src = 'data:image/png;base64,'+image['options'];
		img.style.width = '18px';
		img.style.height = '14px';
		img.style.paddingTop = '6px';
		img.style.paddingLeft = '2px';
		img.style.cursor = 'pointer';
		//append img to optionsDiv
		tableFoot.childNodes[0].firstChild.firstChild.appendChild(img);
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
		var lnk = dom.xs('//table[@id="listTable"]//a[@column="'+sortCol+'"]');
		ts_resortTable(lnk, sortCol, sortDir);
	}
	
	//reload list if necessary (for compatibility with v<1.6)
	if (reload==true) {
		reload = false;
		reloadVillageList();
	}
}


//create table header
function createTableHeader()
{
	//get columns visibility and width arrays
	var colsVis = getColsVisibility();
	var colsWidth = getColsWidth();
	
	//create thead
	var tableHead = dom.cn('thead');
	
	//create headers row
	var theadRow = dom.cn('tr');
	
	//column 0: delete
	var theadCell = dom.cn('td');
	theadCell.setAttribute('align', 'center');
	theadCell.style.borderBottom = '1px solid #C0C0C0';
	theadCell.width = colsWidth[0]+'px';
	theadCell.style.display = (colsVis[0]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell);
	
	//column 1: village
	var theadCell = dom.cn('td', lang['VILLAGE']);
	theadCell.setAttribute('align', 'center');
	theadCell.style.borderBottom = '1px solid #C0C0C0';
	theadCell.width = colsWidth[1]+'px';
	theadCell.title = lang['SORT_BY']+' '+lang['VILLAGE'].toLowerCase();
	theadCell.style.display = (colsVis[1]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell);
	
	//column 2: player
	var theadCell = dom.cn('td', lang['PLAYER']);
	theadCell.setAttribute('align', 'center');
	theadCell.style.borderBottom = '1px solid #C0C0C0';
	theadCell.width = colsWidth[2]+'px';
	theadCell.title = lang['SORT_BY']+' '+lang['PLAYER'].toLowerCase();
	theadCell.style.display = (colsVis[2]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell);
	
	//column 3: ally
	var theadCell = dom.cn('td', lang['ALLY']);
	theadCell.setAttribute('align', 'center');
	theadCell.style.borderBottom = '1px solid #C0C0C0';
	theadCell.width = colsWidth[3]+'px';
	theadCell.title = lang['SORT_BY']+' '+lang['ALLY'].toLowerCase();
	theadCell.style.display = (colsVis[3]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell);
	
	//column 4: tag
	var theadCell = dom.cn('td', lang['TAG']);
	theadCell.setAttribute('align', 'center');
	theadCell.style.borderBottom = '1px solid #C0C0C0';
	theadCell.width = colsWidth[4]+'px';
	theadCell.title = lang['SORT_BY']+' '+lang['TAG'].toLowerCase();
	theadCell.style.display = (colsVis[4]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell);
	
	//column 5: distance
	var theadCell = dom.cn('td', lang['DISTANCE']);
	theadCell.setAttribute('align', 'center');
	theadCell.style.borderBottom = '1px solid #C0C0C0';
	theadCell.width = colsWidth[5]+'px';
	theadCell.title = lang['SORT_BY']+' '+lang['DISTANCE'].toLowerCase();
	theadCell.style.display = (colsVis[5]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell);
	
	//column 6: village type
	var theadCell = dom.cn('td', lang['TYPE']);
	theadCell.setAttribute('align', 'center');
	theadCell.style.borderBottom = '1px solid #C0C0C0';
	theadCell.width = colsWidth[6]+'px';
	theadCell.title = lang['SORT_BY']+' '+lang['VILLAGE_TYPE'].toLowerCase();
	theadCell.style.display = (colsVis[6]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell);
	
	//column 7: tribe
	var theadCell = dom.cn('td', lang['TRIBE']);
	theadCell.setAttribute('align', 'center');
	theadCell.style.borderBottom = '1px solid #C0C0C0';
	theadCell.width = colsWidth[7]+'px';
	theadCell.title = lang['SORT_BY']+' '+lang['TRIBE'].toLowerCase();
	theadCell.style.display = (colsVis[7]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell);
	
	//column 8: send troops
	var theadCell = dom.cn('td');
	theadCell.setAttribute('align', 'center');
	theadCell.style.borderBottom = '1px solid #C0C0C0';
	theadCell.width = colsWidth[8]+'px';
	theadCell.style.display = (colsVis[8]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell);
	
	//column 9: send resources
	var theadCell = dom.cn('td');
	theadCell.setAttribute('align', 'center');
	theadCell.style.borderBottom = '1px solid #C0C0C0';
	theadCell.width = colsWidth[9]+'px';
	theadCell.style.display = (colsVis[9]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell);
	
	//column 10: notes
	var theadCell = dom.cn('td');
	theadCell.setAttribute('align', 'center');
	theadCell.style.borderBottom = '1px solid #C0C0C0';
	theadCell.width = colsWidth[10]+'px';
	theadCell.style.display = (colsVis[10]=='none') ? 'none' : '';
	theadRow.appendChild(theadCell);
	
	//append headers row
	tableHead.appendChild(theadRow);
	
	return tableHead;
}


//create table body
function createTableBody(villageList)
{
	//get filtering tag
	var filterByTag = GM_getValue('tagfilter_'+suffix);
	if (!filterByTag) {
		filterByTag = defaultFilterTag; //default value
		GM_setValue('tagfilter_'+suffix, filterByTag);
	}
	
	//get columns visibility and width arrays
	var colsVis = getColsVisibility();
	var colsWidth = getColsWidth();
	
	//get active village name
	var activeVillageName = getActiveVillageName();
	if (!activeVillageName||activeVillageName=='') activeVillageName = lang['YOUR_VILLAGE'];
	
	//get active village coords
	getActiveVillageCoords();
	var activeX = activeVillageCoords.split(',')[0];
	var activeY = activeVillageCoords.split(',')[1];
	
	//create tbody
	var tableBody = dom.cn('tbody');
	
	//populate tbody (iterate over village entries)
	var counter = 0;
	for (i=1; i<=villageList.length-1; i++)
	{
		//get data
		villageList[i] = villageList[i].split('||');
		var villageName = villageList[i][0];
		var villageId = villageList[i][1];
		var coordsArray = villageList[i][2];
		var coordX = coordsArray.split(',')[0];
		var coordY = coordsArray.split(',')[1];
		var playerName = villageList[i][3];
		var playerId = villageList[i][4];
		var allyName = villageList[i][5];
		var allyId = villageList[i][6];
		var cValue = villageList[i][7];
		var playerTribe = villageList[i][8];
		var villageType = villageList[i][9];
		var villageTag = villageList[i][10];
		var villageNote = villageList[i][11];
		//for compatibility with v<1.6
		if (typeof(villageNote)=='undefined' || villageNote=='undefined') {
			villageNote = '';
			updateNote(villageNote, villageId);
			reload = true;
		}
		
		//filter by tag
		if (filterByTag!='') {
			if (villageTag != filterByTag) continue;
		}
		
		//create row
		var tbodyRow = dom.cn('tr');
		//add background highlighting
		tbodyRow.addEventListener('mouseover',bar=function(){this.style.backgroundColor='lightYellow';this.childNodes[4].firstChild.childNodes[1].style.backgroundColor='lightYellow';}, false);
		tbodyRow.addEventListener('mouseout', foo=function(){this.style.backgroundColor='#FFF';this.childNodes[4].firstChild.childNodes[1].style.backgroundColor='#FFF';}, false);
		
		//column 0: delete
		var tbodyCell = dom.cn('td');
		tbodyCell.setAttribute('align', 'center');
		tbodyCell.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell.style.display = (colsVis[0]=='none') ? 'none' : '';
		var cell = dom.cn('div');
		cell.style.cssFloat = 'left';
		cell.style.width = colsWidth[0]+'px';
		cell.style.height = '20px'; //height of row!
		cell.appendChild( makeEventDelete(villageId, villageName) );
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		
		//column 1: village
		var tbodyCell = dom.cn('td');
		tbodyCell.setAttribute('align', 'center');
		tbodyCell.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell.style.display = (colsVis[1]=='none') ? 'none' : '';
		var cell = dom.cn('div');
		cell.style.width = colsWidth[1]+'px';
		if (villageName == '') {
			cell.innerHTML = '---';
			cell.style.color = '#C0C0C0';
		} else {
			cell.appendChild( makeEventVillageStats(villageName, villageId, cValue, coordX, coordY) );
		}
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		
		//column 2: player
		var tbodyCell = dom.cn('td');
		tbodyCell.setAttribute('align', 'center');
		tbodyCell.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell.style.display = (colsVis[2]=='none') ? 'none' : '';
		var cell = dom.cn('div');
		cell.style.width = colsWidth[2]+'px';
		if (playerName == '') {
			cell.innerHTML = '---';
			cell.style.color = '#C0C0C0';
		} else {
			cell.appendChild( makeEventPlayerStats(playerName, playerId) );
		}
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		
		//column 3: ally
		var tbodyCell = dom.cn('td');
		tbodyCell.setAttribute('align', 'center');
		tbodyCell.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell.style.display = (colsVis[3]=='none') ? 'none' : '';
		var cell = dom.cn('div');
		cell.style.width = colsWidth[3]+'px';
		if (allyName == '') {
			cell.innerHTML = '---';
			cell.style.color = '#C0C0C0';
		} else {
			cell.appendChild( makeEventAllyStats(allyName, allyId) );
		}
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		
		//column 4: tag
		var tbodyCell = dom.cn('td');
		tbodyCell.setAttribute('align', 'center');
		tbodyCell.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell.style.display = (colsVis[4]=='none') ? 'none' : '';
		var cell = dom.cn('div');
		cell.style.width = colsWidth[4]+'px';
		if (!villageTag||villageTag=='') {
			//hidden span for sorting
			var celltxt = dom.cn('span', '_');
			celltxt.style.display = 'none';
			cell.appendChild(celltxt);
			//select
			cell.appendChild( makeEventChangeTag('', villageId) );
		} else {
			//hidden span for sorting
			var celltxt = dom.cn('span', villageTag);
			celltxt.style.display = 'none';
			cell.appendChild(celltxt);
			//select
			cell.appendChild( makeEventChangeTag(villageTag, villageId) );
		}
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		
		//column 5: distance
		var tbodyCell = dom.cn('td');
		tbodyCell.setAttribute('align', 'center');
		tbodyCell.style.color = '#C0C0C0';
		tbodyCell.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell.style.display = (colsVis[5]=='none') ? 'none' : '';
		var cell = dom.cn('div');
		cell.style.width = colsWidth[5]+'px';
		if (!activeX||!activeY||activeX=='NaN'||activeY=='NaN') {
			var celltxt = dom.cn('span', '---');
			cell.appendChild(celltxt);
		} else {
			var strDistance = coordDistXYtoXY(activeX, activeY, coordX, coordY);
			cell.appendChild( makeEventTimeOfTravel(strDistance, activeVillageName) );
		}
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		
		//column 6: village type
		var tbodyCell = dom.cn('td');
		tbodyCell.setAttribute('align', 'center');
		tbodyCell.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell.style.display = (colsVis[6]=='none') ? 'none' : '';
		var cell = dom.cn('div');
		cell.style.width = colsWidth[6]+'px';
		//hidden span for sorting
		switch (villageType) {
			case 'f1'://f1 = 9crops
				var celltxt = dom.cn('span', 'a5');
				break;
			case 'f2'://f2 = +iron
				var celltxt = dom.cn('span', 'a4');
				break;
			case 'f3'://f3 = normal
				var celltxt = dom.cn('span', 'a1');
				break;
			case 'f4'://f4 = +clay
				var celltxt = dom.cn('span', 'a2');
				break;
			case 'f5'://f5 = +lumber
				var celltxt = dom.cn('span', 'a3');
				break;
			case 'f6'://f6 = 15crops
				var celltxt = dom.cn('span', 'a6');
				break;
			default:
				var celltxt = dom.cn('span', villageType);
				break;
		}
		celltxt.style.display = 'none';
		cell.appendChild(celltxt);
		cell.appendChild( makeEventVillageType(villageType, villageId) );
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		
		//column 7: tribe
		var tbodyCell = dom.cn('td');
		tbodyCell.setAttribute('align', 'center');
		tbodyCell.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell.style.display = (colsVis[7]=='none') ? 'none' : '';
		var cell = dom.cn('div');
		cell.style.width = colsWidth[7]+'px';
		if (playerTribe) {
			//hidden span for sorting
			var celltxt = dom.cn('span', String(playerTribe));
			celltxt.style.display = 'none';
			cell.appendChild(celltxt);
			cell.appendChild( makeEventPlayerTribe(playerId, playerTribe) );
		} else {
			cell.innerHTML = '--';
			cell.style.color = '#C0C0C0';
		}
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		
		//column 8: send troops
		var tbodyCell = dom.cn('td');
		tbodyCell.setAttribute('align', 'center');
		tbodyCell.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell.style.display = (colsVis[8]=='none') ? 'none' : '';
		var cell = dom.cn('div');
		cell.style.width = colsWidth[8]+'px';
		cell.appendChild( makeEventSendTroops(villageId) );
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		
		//column 9: send resources
		var tbodyCell = dom.cn('td');
		tbodyCell.setAttribute('align', 'center');
		tbodyCell.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell.style.display = (colsVis[9]=='none') ? 'none' : '';
		var cell = dom.cn('div');
		cell.style.width = colsWidth[9]+'px';
		cell.appendChild( makeEventSendResources(villageId) );
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		
		//column 10: notes
		var tbodyCell = dom.cn('td');
		tbodyCell.setAttribute('align', 'center');
		tbodyCell.style.borderBottom = '1px solid #C0C0C0';
		tbodyCell.style.display = (colsVis[10]=='none') ? 'none' : '';
		var cell = dom.cn('div');
		cell.style.width = colsWidth[10]+'px';
		cell.appendChild( makeEventShowNote(villageNote, villageId, villageName) );
		tbodyCell.appendChild(cell);
		tbodyRow.appendChild(tbodyCell);
		
		//append row
		tableBody.appendChild(tbodyRow);
		
		counter++;
	}
	
	//if list is empty because of filtering
	if (counter==0) {
		var tbodyRow = dom.cn('tr');
		var tbodyCell = dom.cn('td', lang['NO_TAG']+' "'+filterByTag+'"');
		tbodyCell.setAttribute('colspan', colsNumber);
		tbodyCell.setAttribute('align', 'center');
		tbodyCell.style.color = '#C0C0C0';
		tbodyCell.style.borderBottom = '1px solid #C0C0C0';
		tbodyRow.appendChild(tbodyCell);
		tableBody.appendChild(tbodyRow);
	}
	
	return tableBody;
}


function removeHTMLTags(strInputCode)
{
	var re = /(<([^>]+)>)/gi;
	return strInputCode.replace(re, '');
}


//display note
function displayNotePopup(villageId, villageName)
{
	//if notediv editor exists, return
	var noteDiv = dom.id('noteDiv');
	if (noteDiv) return;
	
	//remove old noteDiv
	hideNotePopup();
	
	//create shadow div
	var noteDiv = dom.cn('div');
	noteDiv.id = 'noteDivPopup';
	noteDiv.style.zIndex = 999;
	noteDiv.style.width = '350px';
	noteDiv.style.position = 'absolute';
	noteDiv.style.top = (mymousePos.y+40)+'px';
	winX = window.innerWidth;
	if (mymousePos.x > winX-334) noteDiv.style.left = (mymousePos.x-314)+'px';
	else noteDiv.style.left = (mymousePos.x)+'px';
	noteDiv.style.background = 'transparent url(data:image/png;base64,'+image['shadow']+') repeat scroll 0% 50%';
	noteDiv.style.margin = '4px 0px 0px 5px';
	document.body.appendChild(noteDiv);
	
	//create inner div
	var innerDiv = dom.cn('div');
	innerDiv.style.position = 'relative';
	innerDiv.style.left = '-5px';
	innerDiv.style.top = '-5px';
	innerDiv.style.backgroundColor = '#F5F5F5';
	innerDiv.style.border = '2px solid green';
	noteDiv.appendChild(innerDiv);
	
	//create note
	var table = dom.cn('table');
	table.style.width = '346px';
	//village name
	var tr = dom.cn('tr');
	var td = dom.cn('td');
	td.style.height = '10px';
	td.style.backgroundColor = 'green';
	var div0 = dom.cn('div', villageName);
	div0.style.width = '340px';
	div0.style.cssFloat = 'left';
	div0.style.textAlign = 'center';
	div0.style.fontWeight = 'bold';
	div0.style.fontSize = '8pt';
	div0.style.color = 'lightYellow';
	div0.style.cursor = 'move';
	div0.style.paddingBottom = '2px';
	makeDraggable(noteDiv, div0);
	td.appendChild(div0);
	
	//append
	tr.appendChild(td);
	table.appendChild(tr);
	
	//note body
	var tr = dom.cn('tr');
	var td = dom.cn('td');
	var div = dom.cn('div', getNote(villageId));
	div.style.width = '338px';
	div.style.border = '1px solid #71D000';
	div.style.backgroundColor = '#FFF';
	td.appendChild(div);
	tr.appendChild(td);
	table.appendChild(tr);
	//append
	innerDiv.appendChild(table);
}


//display note with editor
function displayNoteEditor(villageId, villageName)
{
	//remove old noteDivs
	hideNote();
	hideNotePopup();
	
	//create shadow div
	var noteDiv = dom.cn('div');
	noteDiv.id = 'noteDiv';
	noteDiv.style.zIndex = 999;
	noteDiv.style.width = '350px';
	noteDiv.style.position = 'absolute';
	noteDiv.style.top = (mymousePos.y+40)+'px';
	winX = window.innerWidth;
	if (mymousePos.x > winX-334) noteDiv.style.left = (mymousePos.x-314)+'px';
	else noteDiv.style.left = (mymousePos.x)+'px';
	noteDiv.style.background = 'transparent url(data:image/png;base64,'+image['shadow']+') repeat scroll 0% 50%';
	noteDiv.style.margin = '4px 0px 0px 5px';
	document.body.appendChild(noteDiv);
	
	//create inner div
	var innerDiv = dom.cn('div');
	innerDiv.style.position = 'relative';
	innerDiv.style.left = '-5px';
	innerDiv.style.top = '-5px';
	innerDiv.style.backgroundColor = '#F5F5F5';
	innerDiv.style.border = '2px solid green';
	noteDiv.appendChild(innerDiv);
	
	//create iFrame
	var table = dom.cn('table');
	table.style.width = '346px';
	//village name
	var tr = dom.cn('tr');
	var td = dom.cn('td');
	td.style.height = '10px';
	td.style.backgroundColor = 'green';
	var div0 = dom.cn('div', villageName);
	div0.style.width = '325px';
	div0.style.cssFloat = 'left';
	div0.style.textAlign = 'center';
	div0.style.fontWeight = 'bold';
	div0.style.fontSize = '8pt';
	div0.style.color = 'lightYellow';
	div0.style.cursor = 'move';
	div0.style.paddingBottom = '2px';
	makeDraggable(noteDiv, div0);
	td.appendChild(div0);
	//close X
	var div1 = dom.cn('div', 'X');
	div1.style.width = '15px';
	div1.style.cssFloat = 'right';
	div1.title = lang['CLOSE'];
	div1.style.textAlign = 'center';
	div1.style.fontWeight = 'bold';
	div1.style.fontSize = '8pt';
	div1.style.color = 'lightYellow';
	div1.style.cursor = 'pointer';
	div1.style.paddingBottom = '2px';
	div1.addEventListener('mouseover', foo=function(){div1.style.color = 'red';}, false);
	div1.addEventListener('mouseout', foo=function(){div1.style.color = 'lightYellow';}, false);
	div1.addEventListener('click', foo=function(){hideNote();}, false);
	td.appendChild(div1);
	tr.appendChild(td);
	table.appendChild(tr);
	
	//NOTE TOOLS
	var tr = dom.cn('tr');
	var td = dom.cn('td');
	td.style.width = '338px';
	td.style.backgroundColor = 'lightgray';
	//start/stop editing tool
	var img = document.createElement('img');
	img.id = 'startStopEditing';
	img.title = lang['EDIT'];
	img.style.cssFloat = 'left';
	img.style.width = '16px';
	img.style.height = '16px';
	img.style.padding = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['note'];
	img.addEventListener('click', foo=function(){editableNote();}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//save tool
	var img = dom.cn('img');
	img.title = lang['SAVE'];
	img.style.cssFloat = 'left';
	img.style.width = '14px';
	img.style.height = '14px';
	img.style.padding = '3px 3px 4px 3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['save'];
	img.addEventListener('click', foo=function(){saveNote(villageId);}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//delete tool
	var img = dom.cn('img');
	img.title = lang['DELETE'];
	img.style.cssFloat = 'left';
	img.style.width = '12px';
	img.style.height = '12px';
	img.style.padding = '4px 7px 5px 3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['delete'];
	img.addEventListener('click', bar2=function(){delNote(villageId);}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//undo tool
	var img = dom.cn('img');
	img.title = 'Undo';
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.paddingLeft = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['undo'];
	img.addEventListener('click', foo=function(){execCmdNote('undo');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//redo tool
	var img = dom.cn('img');
	img.title = 'Redo';
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['redo'];
	img.addEventListener('click', foo=function(){execCmdNote('redo');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//link tool
	var img = dom.cn('img');
	img.title = lang['ADD']+' '+lang['LINK'].toLowerCase();
	img.style.cssFloat = 'left';
	img.style.width = '22px';
	img.style.height = '22px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['link'];
	img.addEventListener('click', foo=function(){addNoteLink();}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//unlink tool
	var img = dom.cn('img');
	img.title = lang['REMOVE']+' '+lang['LINK'].toLowerCase();
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.paddingLeft = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['unlink'];
	img.addEventListener('click', foo=function(){execCmdNote('unlink');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//image tool
	var img = dom.cn('img');
	img.title = lang['ADD']+' '+lang['IMAGE'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['image'];
	img.addEventListener('click', foo=function(){execCmdNote('insertimage');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//bold tool
	var img = dom.cn('img');
	img.title = lang['BOLD'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['bold'];
	img.addEventListener('click', foo=function(){execCmdNote('bold');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//italic tool
	var img = dom.cn('img');
	img.title = lang['ITALIC'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['italic'];
	img.addEventListener('click', foo=function(){execCmdNote('italic');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//underline tool
	var img = dom.cn('img');
	img.title = lang['UNDERLINE'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['underline'];
	img.addEventListener('click', foo=function(){execCmdNote('underline');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//justify left tool
	var img = dom.cn('img');
	img.title = lang['JLEFT'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['left'];
	img.addEventListener('click', foo=function(){execCmdNote('justifyleft');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//justify center tool
	var img = dom.cn('img');
	img.title = lang['JCENTER'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['center'];
	img.addEventListener('click', foo=function(){execCmdNote('justifycenter');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//justify right tool
	var img = dom.cn('img');
	img.title = lang['JRIGHT'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['right'];
	img.addEventListener('click', foo=function(){execCmdNote('justifyright');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//justify full tool
	var img = dom.cn('img');
	img.title = lang['JFULL'];
	//img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['full'];
	img.addEventListener('click', foo=function(){execCmdNote('justifyfull');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//strikethrough tool
	var img = dom.cn('img');
	img.title = lang['STRIKET'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['striket'];
	img.addEventListener('click', foo=function(){execCmdNote('strikethrough');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//superscript tool
	var img = dom.cn('img');
	img.title = lang['SUPERS'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['supers'];
	img.addEventListener('click', foo=function(){execCmdNote('superscript');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//subscript tool
	var img = dom.cn('img');
	img.title = lang['SUBS'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['subs'];
	img.addEventListener('click', foo=function(){execCmdNote('subscript');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//ordered list tool
	var img = dom.cn('img');
	img.title = lang['OLIST'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['olist'];
	img.addEventListener('click', foo=function(){execCmdNote('insertorderedlist');}, false);
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	td.appendChild(img);
	//unordered list tool
	var img = dom.cn('img');
	img.title = lang['ULIST'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['ulist'];
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	img.addEventListener('click', foo=function(){execCmdNote('insertunorderedlist');}, false);
	td.appendChild(img);
	//horizontal rule tool
	var img = dom.cn('img');
	img.title = lang['HRULE'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['hrule'];
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	img.addEventListener('click', foo=function(){execCmdNote('inserthorizontalrule');}, false);
	td.appendChild(img);
	//indent tool
	var img = dom.cn('img');
	img.title = lang['INDENT'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['indent'];
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	img.addEventListener('click', foo=function(){execCmdNote('indent');}, false);
	td.appendChild(img);
	//outdent tool
	var img = dom.cn('img');
	img.title = lang['OUTDENT'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['outdent'];
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	img.addEventListener('click', foo=function(){execCmdNote('outdent');}, false);
	td.appendChild(img);
	//remove format tool
	var img = dom.cn('img');
	img.title = lang['UNFORMAT'];
	img.style.cssFloat = 'left';
	img.style.width = '21px';
	img.style.height = '21px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/gif;base64,'+image['unformat'];
	img.addEventListener('mouseover', foo=function(){this.style.backgroundColor = '#F5F5F5';}, false);
	img.addEventListener('mouseout', foo=function(){this.style.backgroundColor = 'lightgray';}, false);
	img.addEventListener('click', foo=function(){execCmdNote('removeformat');}, false);
	td.appendChild(img);
	//text color tool
	var colors = ['black','darkslategrey','grey','maroon','red','deeppink','purple','violet','darkblue','blue','aqua','skyblue','teal','green','lime','springgreen','olive','orange','yellow','darkgoldenrod'];
	var select = dom.cn('select');
	select.title = lang['COLOR'];
	select.style.cssFloat = 'left';
	select.style.backgroundColor = 'black';
	select.style.width = '40px';
	select.style.height = '17px';
	select.style.marginTop = '2px';
	for (var i=0; i<colors.length; i++) {
		var option = dom.cn('option');
		option.style.backgroundColor = colors[i];
		option.value = colors[i];
		option.title = colors[i];
		select.appendChild(option);
	}
	select.addEventListener('change', bar=function(){execCmdNote('forecolor',this.options[this.selectedIndex].value);}, false);
	td.appendChild(select);

	
	//saving message
	var span = dom.cn('span', 'saving...');
	span.id = 'spanSaving';
	span.style.color = '#000000';
	span.style.cssFloat = 'right';
	span.style.backgroundColor = '#FAD163';
	span.style.padding = '0px 4px 2px 4px';
	span.style.margin = '4px 2px 0px 4px';
	span.style.fontSize = '8pt';
	span.style.display = 'none';
	td.appendChild(span);
	
	//append
	tr.appendChild(td);
	table.appendChild(tr);
	//note body
	var tr = dom.cn('tr');
	var td = dom.cn('td');
	var iframe = dom.cn('iframe');
	iframe.id = 'noteIframe';
	iframe.style.width = '338px';
	iframe.style.height = '200px';
	iframe.style.border = '1px solid #71D000';
	iframe.style.backgroundColor = '#FFF';
	td.appendChild(iframe);
	tr.appendChild(td);
	table.appendChild(tr);
	//append
	innerDiv.appendChild(table);
	
	//get note data from store
	var noteTxt = getNote(villageId);
	//add note to iframe
	var iframeDoc = dom.id('noteIframe');
	iframeDoc.contentDocument.open();
	iframeDoc.contentDocument.write(noteTxt);
	iframeDoc.contentDocument.close();
	//set key shortcuts
	iframeDoc.contentDocument.addEventListener("keypress", rteHandler, false);
	
	//start editing mode
	// iframeDoc.contentDocument.designMode = 'on';
	// iframeDoc.contentWindow.focus();
}


//from http://forums.delphiforums.com/GoFirefox
function rteHandler(event) {
	if (event.type == "keypress" && event.ctrlKey) {
		var sel = null;
		var range = null;
		var key = String.fromCharCode(event.charCode).toLowerCase();
		var cmd = null;
		var value = null;
		switch (key) {
			// simple key commands follow
		    case 'a': cmd = "selectall"; break;
		    case 'b': cmd = "bold"; break;
		    case 'i': cmd = "italic"; break;
		    case 'u': cmd = "underline"; break;
		    case 's': cmd = "strikethrough"; break;
		    case 'z': cmd = "undo"; break;
		    case 'y': cmd = "redo"; break;
		    case 'v': cmd = "paste"; break;
		}
		if (cmd) {
			// execute simple command
			this.execCommand(cmd, false, value);
			event.preventDefault();
			event.stopPropagation();
		}
	}
}


//execute command in editor
function execCmdNote(cmd, value)
{
	var iframeDoc = dom.id('noteIframe');
	if (iframeDoc.contentDocument.designMode != 'on') {
		alert(lang['START_EDITING']);
	} else {
		if (cmd == 'insertimage') {
			var myLink = prompt("URL:","http://");
			if (myLink != null) {
				iframeDoc.contentWindow.document.execCommand(cmd, false, myLink); 
			}
		} else {
			iframeDoc.contentWindow.document.execCommand(cmd, false, value);
		}
		//set focus
		iframeDoc.contentWindow.focus();
	}
}


//create show note event
function makeEventShowNote(villageNote, villageId, villageName)
{
	var img = dom.cn('img');
	img.id = villageId;
	img.name = villageName;
	img.style.width = '16px';
	img.style.height = '16px';
	img.style.paddingTop = '1px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['note'];
	img.addEventListener('mouseover', foo1=function(ev){mymousePos=mouseCoords(ev);}, false);
	img.addEventListener('click', foo2=function(){displayNoteEditor(this.id, this.name);}, false);
	if (villageNote == '' || villageNote=='<br>' || villageNote=='<br/>') {
		img.style.opacity = '0.3';
		img.title = lang['ADD']+' '+lang['NOTE'].toLowerCase();
	} else {
		img.style.opacity = '1';
		var hidePopups = getHidePopups();
		if (hidePopups==false) {
			img.addEventListener('mouseover', bar1=function(){displayNotePopup(this.id, this.name);}, false);
			img.addEventListener('mouseout', bar2=function(){hideNotePopup();}, false);
		} else {
			img.title = removeHTMLTags(villageNote);
		}
	}
	return img;
}


//get hidePopups value from store
function getHidePopups()
{
	var hidePopups = GM_getValue('hidepopups_'+suffix);
	if (!hidePopups) {
		hidePopups = false; //default value
		GM_setValue('hidepopups_'+suffix, hidePopups);
	}
	return hidePopups;
}

//get village note
function getNote(id)
{
	var villageList = new Array();
	villageList = GM_getValue('villages_'+suffix, '').split('_@_');
	for (i=1; i<=villageList.length-1; i++)
	{
		villageList[i] = villageList[i].split('||');
		villageId = villageList[i][1];
		if (villageId == id) {
			var villageNote = villageList[i][11];
			if (!villageNote||villageNote=='') villageNote = '';
		}
	}
	return villageNote;
}


//set village note
function saveNote(villageId)
{
	var iframeDoc = dom.id('noteIframe');
	if (iframeDoc.contentDocument.designMode != 'on') {
		alert(lang['START_EDITING']);
	} else {
		//show saving message
		dom.id('spanSaving').style.display = '';
		setTimeout( "document.getElementById('spanSaving').style.display = 'none'", 1500);
		//stop editing
		iframeDoc.contentDocument.designMode = 'off';
		//save into store
		var noteTxt = iframeDoc.contentDocument.body.innerHTML;
		noteTxt = transformGeneric_replaceAllCoordsByLink(noteTxt);
		noteTxt = cleanStr(noteTxt);
		updateNote(noteTxt, villageId);
		//enable edit button
		dom.id('startStopEditing').style.opacity = '1';
		//refresh
		reloadVillageList();
		//iframeDoc.contentWindow.focus();
	}
}


//create web link
function addNoteLink()
{
	var iframeDoc = dom.id('noteIframe');
	if (iframeDoc.contentDocument.designMode != 'on') {
		alert(lang['START_EDITING']);
	} else {
		var url = prompt('URL', 'http://');
		if (!url.match('(^(http|https|ftp|ftps)://)')) { 
			url = 'http://'+url;
		}
		var sel = iframeDoc.contentWindow.getSelection();
		if (sel.toString().length > 0) {
			iframeDoc.contentWindow.document.execCommand('inserthtml', false, '<a href="' + url + '" target="_blank">' + sel + '</a>');
		} else {
			iframeDoc.contentWindow.document.execCommand('inserthtml', false, '<a href="' + url + '" target="_blank">' + url + '</a>');
		}
		iframeDoc.contentWindow.focus();
	}
}


//delete village note
function delNote(villageId)
{
	var iframeDoc = dom.id('noteIframe');
	if (iframeDoc.contentDocument.designMode != 'on') {
		alert(lang['START_EDITING']);
	} else {
		iframeDoc.contentDocument.open();
		iframeDoc.contentDocument.write('');
		iframeDoc.contentDocument.close();
		editableNote();
	}
}


//replace functions (mod from QP)
function transformGeneric_replaceUriByLink(str) {
	var res = str.replace(/\w+:\/\/[^\s<]+/g, replaceUriByLink);
	return res;
}
function replaceUriByLink(match)
{
	return '<a href="' + match + '" target="_blank">' + match + '</a>';
}
function transformGeneric_replaceAllCoordsByLink(str) {
	var res = str.replace(/-?\d+\|-?\d+/g, replaceCoordsByLink);
	return res;
}
function replaceCoordsByLink(match) {
	var arrMatch = match.split("|", 2);
	var coord = coordsXYToZ(parseInt(arrMatch[0]), parseInt(arrMatch[1]));
	return '<a href="karte.php?z=' + coord + '" target="_blank">' + match + '</a>';
}
function coordsXYToZ(x, y) {
	var coordZ = (x + 401) + ((400 - y) * 801);
	return coordZ;
}


//set village note as editable
function editableNote()
{
	var iframeDoc = dom.id('noteIframe');
	iframeDoc.contentDocument.designMode = 'on';
	iframeDoc.contentWindow.focus();
	//gray-out edit button
	dom.id('startStopEditing').style.opacity = '0.3';
}


//set village note as uneditable
function uneditableNote()
{
	var iframeDoc = dom.id('noteIframe');
	iframeDoc.contentDocument.designMode = 'off';
	iframeDoc.contentWindow.focus();
}


//update village note in firefox store
function updateNote(newNote, id)
{
	var villageListAfter = '';
	var villageListBefore = new Array();
	villageListBefore = GM_getValue('villages_'+suffix, '').split('_@_');
	villageListBefore.sort();
	for (i=1; i<=villageListBefore.length-1; i++)
	{
		villageListBefore[i] = villageListBefore[i].split('||');
		var villageName = villageListBefore[i][0];
		var villageId = villageListBefore[i][1];
		var villageCoords = villageListBefore[i][2];
		var playerName = villageListBefore[i][3];
		var playerId = villageListBefore[i][4];
		var allyName = villageListBefore[i][5];
		var allyId = villageListBefore[i][6];
		var cValue = villageListBefore[i][7];
		var playerTribe = villageListBefore[i][8];
		var villageType = villageListBefore[i][9];
		var villageTag = villageListBefore[i][10];
		var villageNote = villageListBefore[i][11];
		
		if (villageId != id) {
			villageListAfter = villageListAfter+'_@_'+villageName+'||'+villageId+'||'+villageCoords+'||'+playerName+'||'+playerId+'||'+allyName+'||'+allyId+'||'+cValue+'||'+playerTribe+'||'+villageType+'||'+villageTag+'||'+villageNote;
		} else {
			villageListAfter = villageListAfter+'_@_'+villageName+'||'+villageId+'||'+villageCoords+'||'+playerName+'||'+playerId+'||'+allyName+'||'+allyId+'||'+cValue+'||'+playerTribe+'||'+villageType+'||'+villageTag+'||'+newNote;
		}
	}
	GM_setValue('villages_'+suffix, villageListAfter);
}


//hide note popup
function hideNotePopup()
{
	var noteDiv = dom.id('noteDivPopup');
	if (noteDiv) {
		noteDiv.parentNode.removeChild(noteDiv);
	}
}


//hide note
function hideNote()
{
	var noteDiv = dom.id('noteDiv');
	if (noteDiv) {
		noteDiv.parentNode.removeChild(noteDiv);
	}
}


//create table footer
function createTableFooter(listTable)
{
	//get columns visibility and width arrays
	var colsVis = getColsVisibility();
	var colsWidth = getColsWidth();
	
	//create tfoot element
	var tableFoot = dom.cn('tfoot');
	tableFoot.style.backgroundColor = '#F5F5F5';
	tableFoot.style.color = '#5C5C5C';
	
	//CREATE FILTER+SHOW/HIDE OPTIONS ROW
	var tfootRow = dom.cn('tr');
	tfootRow.id = 'VMfilter_'+suffix;
	var tfootCell = dom.cn('td');
	tfootCell.setAttribute('colspan', colsNumber);
	tfootCell.setAttribute('align', 'left');
	tfootCell.style.fontSize = '8pt';
	tfootCell.style.borderBottom = '1px solid #C0C0C0';
	//create show/hide options div
	var optionsDiv = dom.cn('div');
	optionsDiv.id = 'VMoptionsDiv';
	optionsDiv.style.height = '18px';
	optionsDiv.style.width = '20px';
	optionsDiv.style.cssFloat = 'right';
	optionsDiv.style.backgroundColor = '#F5F5F5';
	tfootCell.appendChild(optionsDiv);
	//filter list by tags
	var filterDiv = dom.cn('div', lang['FILTER']);
	filterDiv.style.cssFloat = 'left';
	filterDiv.style.marginLeft = '2px';
	filterDiv.style.paddingTop = '5px';
	filterDiv.style.cursor = 'default';
	tfootCell.appendChild(filterDiv);
	//get tags from store
	var tagsList = GM_getValue('tags_'+suffix);
	tagsList = tagsList.split(',');
	//get current filtering tag
	var filterByTag = GM_getValue('tagfilter_'+suffix);
	//create select field
	var select = dom.cn('select');
	select.style.border = '1px solid #71D000';
	select.style.color = '#71D000';
	select.style.width = '120px';
	select.style.margin = '2px';
	for (var i=0; i<tagsList.length; i++) {
		var option = dom.cn('option', tagsList[i]);
		option.style.color = '#71D000';
		option.value = tagsList[i];
		select.appendChild(option);
		if (tagsList[i]==filterByTag) select.selectedIndex = i;
	}
	select.addEventListener('change', bar=function(){GM_setValue('tagfilter_'+suffix, this.options[this.selectedIndex].value);reloadVillageList();}, false);
	tfootCell.appendChild(select);
	//append first row
	tfootRow.appendChild(tfootCell);
	tableFoot.appendChild(tfootRow);
	
	//CREATE OPTIONS ROW
	var tfootRow = dom.cn('tr');
	tfootRow.id = 'VMoptions_'+suffix;
	var tfootCell = dom.cn('td');
	tfootCell.setAttribute('colspan', colsNumber);
	tfootCell.setAttribute('align', 'left');
	tfootCell.style.fontSize = '8pt';
	
	//create TAGS section
	var fieldset = dom.cn('fieldset');
	fieldset.style.MozBorderRadius = '10px';
	fieldset.style.border = '1px solid #C0C0C0';
	fieldsetlegend = dom.cn('legend', lang['TAG']);
	fieldsetlegend.style.cursor = 'default';
	fieldset.appendChild(fieldsetlegend);
	//tags label | X
	for (var i=1; i<tagsList.length; i++) {
		var div = dom.cn('div');
		div.style.cssFloat = 'left';
		div.style.border = '1px solid #71D000';
		div.style.backgroundColor = '#71D000';
		div.style.MozBorderRadiusTopleft = '4px';
		div.style.MozBorderRadiusBottomleft = '3px';
		div.style.MozBorderRadiusTopright = '2px';
		div.style.MozBorderRadiusBottomright = '2px';
		div.style.marginTop = '3px';
		div.style.marginRight = '3px';
		div.style.marginBottom = '3px';
		var span = dom.cn('span', tagsList[i]);
		span.style.color = '#FFF';
		span.style.display = 'inline';
		span.style.margin = '4px';
		span.style.cursor = 'default';
		div.appendChild(span);
		var span = dom.cn('span', '|');
		span.style.color = '#FFF';
		span.style.display = 'inline';
		span.style.cursor = 'default';
		div.appendChild(span);
		var span = dom.cn('span', 'X');
		span.style.color = '#FFF';
		span.style.display = 'inline';
		span.style.margin = '4px';
		span.style.cursor = 'pointer';
		span.title = lang['DELETE']+' '+lang['TAG'].toLowerCase()+' "'+tagsList[i]+'"';
		span.id = tagsList[i];
		span.addEventListener('mouseover', foo1=function(){this.style.color = 'red';}, false);
		span.addEventListener('mouseout', foo2=function(){this.style.color = '#FFF';}, false);
		span.addEventListener('click', bar=function(){delTag(this.id);}, false);
		div.appendChild(span);
		fieldset.appendChild(div);
	}
	//add new tags
	var table = dom.cn('table');
	table.style.cssFloat = 'left';
	table.style.clear = 'both';
	table.setAttribute('cellspacing', '0');
	table.setAttribute('cellpadding', '0');
	var tr = dom.cn('tr');
	var td = dom.cn('td');
	var textbox = dom.cn('input');
	textbox.type = 'text';
	textbox.setAttribute('size', '15');
	textbox.setAttribute('maxlength', '25');
	textbox.id = 'newTag_'+suffix;
	textbox.value = '';
	textbox.addEventListener('keypress', foo=function(e){if(e.keyCode==13||e.which==13)makeEventSaveTag();}, false);
	td.appendChild(textbox);
	tr.appendChild(td);
	var td = dom.cn('td');
	//save
	var img = document.createElement('img');
	img.title = lang['SAVE'];
	img.style.width = '14px';
	img.style.height = '14px';
	img.style.paddingTop = '3px';
	img.style.paddingLeft = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['save'];
	img.addEventListener('click', bar=function(){makeEventSaveTag();}, false);
	td.appendChild(img);
	tr.appendChild(td);
	table.appendChild(tr);
	fieldset.appendChild(table);
	//append fieldset
	tfootCell.appendChild(fieldset);
	
	//create COLUMNS VISIBILITY section
	var fieldset = dom.cn('fieldset');
	fieldset.style.MozBorderRadius = '10px';
	fieldset.style.border = '1px solid #C0C0C0';
	fieldsetlegend = dom.cn('legend', lang['SHOW']+'/'+lang['HIDE']+' '+lang['COLUMNS']);
	fieldsetlegend.style.cursor = 'default';
	fieldset.appendChild(fieldsetlegend);
	//create visibility checkboxes
	for (var i=0; i<colsVis.length; i++) {
		switch(i) {
			//case 0:	//delete
				//break;
			//case 1:	//village
				//break;
			case 2:	//player
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				if (colsVis[i] == 'none') div.appendChild( makeEventShowCol(i) );
				else div.appendChild( makeEventHideCol(i) );
				var textnode = dom.ct( lang['PLAYER'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			case 3:	//ally
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				if (colsVis[i] == 'none') div.appendChild( makeEventShowCol(i) );
				else div.appendChild( makeEventHideCol(i) );
				var textnode = dom.ct( lang['ALLY'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			case 4:	//tag
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				if (colsVis[i] == 'none') div.appendChild( makeEventShowCol(i) );
				else div.appendChild( makeEventHideCol(i) );
				var textnode = dom.ct( lang['TAG'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			case 5:	//distance
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				if (colsVis[i] == 'none') div.appendChild( makeEventShowCol(i) );
				else div.appendChild( makeEventHideCol(i) );
				var textnode = dom.ct( lang['DISTANCE'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			case 6:	//village type
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				if (colsVis[i] == 'none') div.appendChild( makeEventShowCol(i) );
				else div.appendChild( makeEventHideCol(i) );
				var textnode = dom.ct( lang['VILLAGE_TYPE'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			case 7:	//tribe
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				if (colsVis[i] == 'none') div.appendChild( makeEventShowCol(i) );
				else div.appendChild( makeEventHideCol(i) );
				var textnode = dom.ct( lang['TRIBE'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			case 8:	//send troops
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				if (colsVis[i] == 'none') div.appendChild( makeEventShowCol(i) );
				else div.appendChild( makeEventHideCol(i) );
				var textnode = dom.ct( lang['SEND_TROOPS'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			case 9:	//send resources
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				if (colsVis[i] == 'none') div.appendChild( makeEventShowCol(i) );
				else div.appendChild( makeEventHideCol(i) );
				var textnode = dom.ct( lang['SEND_RESOURCES'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			case 10:	//notes
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				if (colsVis[i] == 'none') div.appendChild( makeEventShowCol(i) );
				else div.appendChild( makeEventHideCol(i) );
				var textnode = dom.ct( lang['NOTE'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
		}
	}
	//append fieldset
	tfootCell.appendChild(fieldset);
	
	//create COLUMNS WIDTH section
	var fieldset = dom.cn('fieldset');
	fieldset.style.MozBorderRadius = '10px';
	fieldset.style.border = '1px solid #C0C0C0';
	fieldsetlegend = dom.cn('legend', lang['WIDTH']+' '+lang['COLUMNS']);
	fieldsetlegend.style.cursor = 'default';
	fieldset.appendChild(fieldsetlegend);
	//create width textboxes
	for (var i=0; i<colsWidth.length; i++) {
		switch(i) {
			//case 0:	//delete
				//break;
			case 1:	//village
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				var textbox = dom.cn('input');
				textbox.type = 'text';
				textbox.size = '2';
				textbox.maxlength = '4';
				textbox.id = 'village_'+suffix;
				textbox.value = colsWidth[1];
				textbox.style.margin = '2px';
				textbox.addEventListener('change', bar=function(){makeEventSaveColsWidth();}, false);
				div.appendChild(textbox);
				var textnode = dom.ct( lang['VILLAGE'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			case 2:	//player
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				var textbox = dom.cn('input');
				textbox.type = 'text';
				textbox.size = '2';
				textbox.maxlength = '4';
				textbox.id = 'player_'+suffix;
				textbox.value = colsWidth[2];
				textbox.style.margin = '2px';
				textbox.addEventListener('change', bar=function(){makeEventSaveColsWidth();}, false);
				div.appendChild(textbox);
				var textnode = dom.ct( lang['PLAYER'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			case 3:	//ally
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				var textbox = dom.cn('input');
				textbox.type = 'text';
				textbox.size = '2';
				textbox.maxlength = '4';
				textbox.id = 'ally_'+suffix;
				textbox.value = colsWidth[3];
				textbox.style.margin = '2px';
				textbox.addEventListener('change', bar=function(){makeEventSaveColsWidth();}, false);
				div.appendChild(textbox);
				var textnode = dom.ct( lang['ALLY'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			case 4:	//tag
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				var textbox = dom.cn('input');
				textbox.type = 'text';
				textbox.size = '2';
				textbox.maxlength = '4';
				textbox.id = 'tag_'+suffix;
				textbox.value = colsWidth[4];
				textbox.style.margin = '2px';
				textbox.addEventListener('change', bar=function(){makeEventSaveColsWidth();}, false);
				div.appendChild(textbox);
				var textnode = dom.ct( lang['TAG'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			case 5:	//distance
				var div = dom.cn('div');
				div.style.cssFloat = 'left';
				div.style.width = '120px';
				var textbox = dom.cn('input');
				textbox.type = 'text';
				textbox.size = '2';
				textbox.maxlength = '4';
				textbox.id = 'distance_'+suffix;
				textbox.value = colsWidth[5];
				textbox.style.margin = '2px';
				textbox.addEventListener('change', bar=function(){makeEventSaveColsWidth();}, false);
				div.appendChild(textbox);
				var textnode = dom.ct( lang['DISTANCE'] );
				div.appendChild(textnode);
				div.style.cursor = 'default';
				fieldset.appendChild(div);
				break;
			// case 6:	//village type
				// break;
			// case 7:	//tribe
				// break;
			// case 8:	//send troops
				// break;
			// case 9:	//send resources
				// break;
			// case 10:	//notes
				// break;
		}
	}
	tfootCell.appendChild(fieldset);
	
	//create TIME OF TRAVEL section
	//get player's tribe from store
	var playerTribe = GM_getValue('tribe_'+suffix);
	if (!playerTribe) {
		playerTribe = 'romans'; //default value
		GM_setValue('tribe_'+suffix, playerTribe);
	}
	//create fieldset
	var fieldset = dom.cn('fieldset');
	fieldset.style.MozBorderRadius = '10px';
	fieldset.style.border = '1px solid #C0C0C0';
	fieldsetlegend = dom.cn('legend', lang['TOT']);
	fieldsetlegend.style.cursor = 'default';
	fieldset.appendChild(fieldsetlegend);
	//gauls
	var div = dom.cn('div');
	div.style.cssFloat = 'left';
	div.style.paddingBottom = '5px';
	var radio = dom.cn('input');
	radio.type = 'radio';
	radio.name = 'radioTribe';
	if (playerTribe == 'gauls') radio.checked = 'checked';
	else radio.checked = ''
	radio.addEventListener('click', bar=function(){GM_setValue('tribe_'+suffix, 'gauls');reloadVillageList();}, false);
	var label = dom.cn('label');
	label.style.display = 'inline';
	label.style.cssFloat = 'none';
	label.style.padding = '0px';
	var textnode = dom.ct( lang['GAULS'] );
	label.appendChild(radio);
	label.appendChild(textnode);
	div.appendChild(label);
	fieldset.appendChild(div);
	//romans
	var div = dom.cn('div');
	div.style.cssFloat = 'left';
	div.style.paddingBottom = '5px';
	var radio = dom.cn('input');
	radio.type = 'radio';
	radio.name = 'radioTribe';
	if (playerTribe == 'romans') radio.checked = 'checked';
	else radio.checked = ''
	radio.addEventListener('click', bar=function(){GM_setValue('tribe_'+suffix, 'romans');reloadVillageList();}, false);
	var label = dom.cn('label');
	label.style.display = 'inline';
	label.style.cssFloat = 'none';
	label.style.padding = '0px';
	var textnode = dom.ct( lang['ROMANS'] );
	label.appendChild(radio);
	label.appendChild(textnode);
	div.appendChild(label);
	fieldset.appendChild(div);
	//teutons
	var div = dom.cn('div');
	div.style.cssFloat = 'left';
	div.style.paddingBottom = '5px';
	var radio = dom.cn('input');
	radio.type = 'radio';
	radio.name = 'radioTribe';
	if (playerTribe == 'teutons') radio.checked = 'checked';
	else radio.checked = ''
	radio.addEventListener('click', bar=function(){GM_setValue('tribe_'+suffix, 'teutons');reloadVillageList();}, false);
	var label = dom.cn('label');
	label.style.display = 'inline';
	label.style.cssFloat = 'none';
	label.style.padding = '0px';
	var textnode = dom.ct( lang['TEUTONS'] );
	label.appendChild(radio);
	label.appendChild(textnode);
	div.appendChild(label);
	fieldset.appendChild(div);
	//get tournament square level from store
	var tournamentLevel = GM_getValue('tournament_'+suffix);
	if (!tournamentLevel) {
		tournamentLevel = 0; //default value
		GM_setValue('tournament_'+suffix, tournamentLevel);
	}
	//create select field
	var div = dom.cn('div');
	div.style.cssFloat = 'left';
	div.style.width = '150px';
	div.style.paddingBottom = '5px';
	var select = dom.cn('select');
	select.style.marginLeft = '5px';
	select.style.paddingLeft = '5px';
	for (i=0; i<=20; i++) {
		var option = dom.cn('option', String(i));
		option.value = i;
		select.appendChild(option);
	}
	select.selectedIndex = tournamentLevel;
	select.addEventListener('change', bar=function(){GM_setValue('tournament_'+suffix, this.options[this.selectedIndex].value);reloadVillageList();}, false);
	div.appendChild(select);
	var span = dom.cn('span', lang['TOURNAMENT']);
	span.style.paddingLeft = '5px';
	span.style.cursor = 'default';
	div.appendChild(span);
	fieldset.appendChild(div);
	//get speed value from store
	var speed = GM_getValue('speed_'+suffix);
	if (!speed) {
		speed = false; //default value
		GM_setValue('speed_'+suffix, speed);
	}
	//create speed option
	var div = dom.cn('div');
	div.style.cssFloat = 'left';
	div.style.width = '120px';
	div.style.paddingLeft = '1px';
	var input = dom.cn('input');
	input.type = 'checkbox';
	input.checked = speed;
	input.addEventListener('click', foo=function(){GM_setValue('speed_'+suffix, this.checked);reloadVillageList();}, false);
	div.appendChild(input);
	var span = dom.cn('span', lang['SPEED']);
	span.style.paddingLeft = '5px';
	span.style.cursor = 'default';
	div.appendChild(span);
	fieldset.appendChild(div);
	//append fieldset
	tfootCell.appendChild(fieldset);
	
	//create OTHER OPTIONS section
	var fieldset = dom.cn('fieldset');
	fieldset.style.MozBorderRadius = '10px';
	fieldset.style.border = '1px solid #C0C0C0';
	fieldsetlegend = dom.cn('legend', lang['OTHER_OPTIONS']);
	fieldsetlegend.style.cursor = 'default';
	fieldset.appendChild(fieldsetlegend);
	//delete all villages
	var opt = dom.cn('a', '\u00BB ' + lang['DELETE_ALL']);
	opt.href = 'javascript:void(0)';
	opt.addEventListener('click', foo1=function(){delAllVillages();this.blur();}, false);
	fieldset.appendChild(opt);
	fieldset.appendChild(dom.cn('br'));
	//restore defaults
	var opt = dom.cn('a', '\u00BB ' + lang['RESTORE']);
	opt.href = 'javascript:void(0)';
	opt.addEventListener('click', foo2=function(){restoreDefaultPosition();
												  restoreDefaultWidth();
												  restoreDefaultVisibility();
												  hideOptions();
												  this.blur();}, false);
	fieldset.appendChild(opt);
	fieldset.appendChild(dom.cn('br'));
	//check for updates
	var opt = dom.cn('a', '\u00BB ' + lang['UPDATE_CHECK']);
	opt.href = 'javascript:void(0)';
	opt.addEventListener('click', foo3=function(){updateScript(SCRIPT);this.blur();}, false);
	fieldset.appendChild(opt);
	fieldset.appendChild(dom.cn('br'));
	//hide/show popups
	var hidePopups = GM_getValue('hidepopups_'+suffix);
	if (!hidePopups) {
		hidePopups = false; //default value
		GM_setValue('hidepopups_'+suffix, hidePopups);
	}
	if (hidePopups==false) {
		var opt = dom.cn('a', '\u00BB '+lang['HIDE']+' '+lang['POPUPS'].toLowerCase());
		opt.href = 'javascript:void(0)';
		opt.addEventListener('click', foo4=function(){GM_setValue('hidepopups_'+suffix, true);reloadVillageList();}, false);
	} else {
		var opt = dom.cn('a', '\u00BB '+lang['SHOW']+' '+lang['POPUPS'].toLowerCase());
		opt.href = 'javascript:void(0)';
		opt.addEventListener('click', foo5=function(){GM_setValue('hidepopups_'+suffix, false);reloadVillageList();}, false);
	}
	fieldset.appendChild(opt);
	fieldset.appendChild(dom.cn('br'));
	
	//import/export list data
	var opt = dom.cn('a', '\u00BB ' + lang['IE_DATA']);
	opt.href = 'javascript:void(0)';
	opt.addEventListener('click', foo3 = function(){showImportExportTable();this.blur();}, false);
	fieldset.appendChild(opt);
	fieldset.appendChild(dom.cn('br'));
	//'تعريب : Jack Krauser'
	var opt = dom.cn('a', '\u00BB ' + lang['IE']);
	opt.href = 'javascript:void(0)';
	opt.addEventListener('click', foo3 = function(){DoNotShow();this.blur();}, false);
	fieldset.appendChild(opt);
	fieldset.appendChild(dom.cn('br'));
	//create hidden textarea
	var table = dom.cn('table');
	table.id = 'importExportTable';
	table.width = '100%';
	table.style.display = 'none';
	var tr = dom.cn('tr');
	var td = dom.cn('td');
	var textArea = dom.cn('textarea', GM_getValue('villages_'+suffix));
	textArea.id = 'txtArea';
	textArea.setAttribute('cols', '999');
	textArea.setAttribute('rows', '8');
	textArea.style.width = '100%';
	textArea.style.color = '#C0C0C0';
	textArea.style.border = '1px solid #71D000';
	textArea.addEventListener('keydown', foo4 = function(){resize_textarea(this);}, false);
	textArea.addEventListener('keyup', foo5 = function(){resize_textarea(this);}, false);
	textArea.addEventListener('change', foo6 = function(){resize_textarea(this);}, false);
	td.appendChild(textArea);
	tr.appendChild(td);
	var td = dom.cn('td');
	var img = document.createElement('img');
	img.title = lang['SAVE'];
	img.style.width = '14px';
	img.style.height = '14px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['save'];
	img.addEventListener('click', bar2=function(){setListData();}, false);
	td.appendChild(img);
	tr.appendChild(td);
	table.appendChild(tr);
	fieldset.appendChild(table);
	
	//append fieldset
	tfootCell.appendChild(fieldset);
	
	//append row
	tfootRow.appendChild(tfootCell);
	tableFoot.appendChild(tfootRow);
	
	return tableFoot;
}


//show import/export textarea
function showImportExportTable()
{
	var ieTable = dom.id('importExportTable');
	if (ieTable.style.display == 'none') {
		ieTable.style.display = '';
		var txtArea = dom.id('txtArea');
		resize_textarea(txtArea);
		txtArea.focus();
		txtArea.select();
	} else {
		ieTable.style.display = 'none';
	}
}


//resize import/export textarea automatically
function resize_textarea(txtBox)
{
	nCols = txtBox.cols;
	sVal = txtBox.value;
	nVal = sVal.length;
	nRowCnt = 1;
	for (var i=0; i<nVal; i++) {
		if (sVal.charAt(i).charCodeAt(0) == 10) {
			nRowCnt += 1;
		}
	}
	if (nRowCnt < (nVal / nCols)) {
		nRowCnt = 1 + (nVal / nCols);
	}
	if (nRowCnt<5) nRowCnt=5;
	txtBox.rows = nRowCnt;
}


//resize listDiv & titleDiv
function resizeList(listTable, listIsMinimized)
{
	if (listIsMinimized) {
		//get minimum width
		var colsWidth = getColsWidth();
		var listMinWidth = parseInt(colsWidth[0])+parseInt(colsWidth[1]);
		//resize
		listTable.parentNode.style.width = (listMinWidth+4)+'px'; //+4px for missing borders
		listTable.parentNode.firstChild.style.width = ((listMinWidth-12)+2)+'px'; //-12px minimize icon, +2px for missing borders
	} else {
		//get current width
		var listWidth = getListVisibleWidth();
		//resize
		listTable.parentNode.style.width = listWidth+'px';
		listTable.parentNode.firstChild.style.width = (listWidth-12)+'px'; //-12px minimize icon
	}
}


//get list data
function getListData()
{
	listDataStr = GM_getValue('villages_'+suffix, '');
	//for compatibility with v<1.6
	if (listDataStr.indexOf('\n') == 0) {
		listDataStr = listDataStr.replace('\n', '_@_', 'g');
		GM_setValue('villages_'+suffix, listDataStr);
	}
	//create array
	var listData = new Array();
	listData = listDataStr.split('_@_');
	//initial sort by village name
	listData.sort();
	return listData;
}


//retrieve owner id
function getOwnerId()
{
	var user = dom.xs('//table[@id="navi_table"]//a[starts-with(@href, "spieler.php?uid=")]');
	var id = (user) ? getParamFromUrl(user.href, 'uid') : '';
	return id;
}


//retrieve name of the active village
function getActiveVillageName()
{
	var z = dom.xs('//a[@class="active_vl"]');
	if (!z || z.snapshotLength == 0) return false;
	activeVillageName = z.textContent;
	activeVillageName = cleanStr(activeVillageName);
	return activeVillageName;
}


//retrieve coordinates of your active village
function getActiveVillageCoords()
{
	var activeVillageLink = dom.xo('//a[@class="active_vl"]/../../td/table/tbody/tr/td');
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
					if (responseDetails.status != 200) return;
					var div = dom.cn('div', responseDetails.responseText);
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
	var html = dom.xs('//div[@class="map_details_actions"]//a[starts-with(@href, "karte.php?z=")]');
	var villageId = (html) ? getParamFromUrl(html.href, 'z') : '';
	return villageId;
}


//retrieve village type
function getVillageType()
{
	var typeObject = dom.xs('//div[@id="lmid2"]//div[starts-with(@id, "f")]');
	if (typeObject) {
		var villageType = typeObject.id;
	} else {
		var typeObject = dom.xs('//img[@id="resfeld"]');
		var villageType = typeObject.src;
		villageType = villageType.substring(villageType.lastIndexOf('/')+1, villageType.lastIndexOf('.'));
	}
	return villageType;
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
	var mapDetailsRight = dom.xs('//div[@id="lmid2"]/div[@class="map_details_right"]');
	if (mapDetailsRight.id == "pr") {
		//abandoned area/empty oasis
		var title = dom.xs('//div[@id="lmid2"]//h1').innerHTML;
	} else {
		//normal village or occupied oasis
		var coordsObject = dom.xo('//div[@id="lmid2"]//div[@class="ddb"]');
		if (coordsObject.snapshotLength > 0) {
			//normal village
			var title = coordsObject.snapshotItem(1).textContent;
		} else {
			//occupied oasis
			var title = dom.xs('//div[@id="lmid2"]//h1').innerHTML;
		}
	}
	title = title.replace(/^[\s(&nbsp;)]+/g,'').replace(/[\s(&nbsp;)]+$/g,'');
	coords = title.substring(title.lastIndexOf('('));
	coords = coords.replace(/[\(\)]/g, '').split('|').join(',');
	return coords;
}


//retrieve village name
function getVillageName()
{
	var mapDetailsRight = dom.xs('//div[@id="lmid2"]/div[@class="map_details_right"]');
	if (mapDetailsRight.id == "pr") {
		//abandoned area/empty oasis
		var title = dom.xs('//div[@id="lmid2"]//h1').innerHTML;
		var villageName = title.substring(0, title.lastIndexOf('(')).replace(/^\s+|\s+$/g,'');
	} else {
		//normal village or occupied oasis
		var villageNameObject = dom.xo('//div[@id="lmid2"]//div[@class="ddb"]');
		if (villageNameObject.snapshotLength > 0) {
			//normal village
			var villageName = villageNameObject.snapshotItem(0).textContent;
		} else {
			//occupied oasis
			var title = dom.xs('//div[@id="lmid2"]//h1').innerHTML;
			var villageName = title.substring(0, title.lastIndexOf('(')).replace(/^\s+|\s+$/g,'');
		}
	}
	villageName = cleanStr(villageName);
	villageName = C2E(villageName);
	return villageName;
}


//retrieve player's name
function getPlayerName()
{
	var user = dom.xs('//div[@id="lmid2"]/div[@class="map_details_right"]//a[starts-with(@href, "spieler.php?uid=")]');
	var playerName = (user) ? user.innerHTML.replace(/\<\/?b>/gi, '') : '';
	playerName = C2E(cleanStr(playerName));
	return playerName;
}


//retrieve player's tribe
function getPlayerTribe()
{
	var mapDetailsRight = dom.xs('//div[@id="lmid2"]/div[@class="map_details_right"]');
	if (mapDetailsRight.id == "pr") { //abandoned area/empty oasis
		var playerTribe = '';
	} else {
		var playerTribe = dom.xs('//div[@id="lmid2"]/div[@class="map_details_right"]/table/tbody/tr/td[3]/b').textContent;
	}
	playerTribe = cleanStr(playerTribe.toLowerCase());
	playerTribe = C2E(playerTribe);
	return playerTribe;
}


//retrieve player's ID
function getPlayerId()
{
	var user = dom.xs('//div[@id="lmid2"]/div[@class="map_details_right"]//a[starts-with(@href, "spieler.php?uid=")]');
	var playerId = (user) ? getParamFromUrl(user.href, 'uid') : '';
	return playerId;
}


//retrieve ally name
function getAllyName()
{
	var ally = dom.xs('//div[@id="lmid2"]/div[@class="map_details_right"]//a[starts-with(@href, "allianz.php?aid=")]');
	var allyName = (ally) ? ally.innerHTML.replace(/\<\/?b>/gi, '') : '' ;
	allyName = C2E(cleanStr(allyName));
	return allyName;
}


//retrieve ally ID
function getAllyId()
{
	var ally = dom.xs('//div[@id="lmid2"]/div[@class="map_details_right"]//a[starts-with(@href, "allianz.php?aid=")]');
	var allyId = (ally) ? getParamFromUrl(ally.href, 'aid') : '';
	return allyId;
} 


//add village to the list
function addToVillageList()
{
	var villageName = getVillageName();
	var villageId = getVillageId();
	var villageCoords = getVillageCoords();
	var playerName = getPlayerName();
	var playerId = getPlayerId();
	var allyName = getAllyName();
	var allyId = getAllyId();
	var cValue = getVillageCvalue();
	var playerTribe = getPlayerTribe();
	var villageType = getVillageType();
	var villageTag = '';
	var villageNote = '';
	
	if (checkVillageId(villageId) == false) {
		setVillage(villageName+'||'+villageId+'||'+villageCoords+'||'+playerName+'||'+playerId+'||'+allyName+'||'+allyId+'||'+cValue+'||'+playerTribe+'||'+villageType+'||'+villageTag+'||'+villageNote);
		reloadVillageList();
	} else {
		if (confirm(capFirst(E2C(getVillageName()))+' '+lang['ALREADY_LIST']+'!\n\n'+lang['UPDATE_NOW']+'?\n'))
		{
			delVillage(villageId);
			addToVillageList();
		}
	}
}


//insert new tag into Firefox preference store 
function setTag(newTag)
{
	var tagsList = GM_getValue('tags_'+suffix);
	tagsList = tagsList+','+newTag;
	GM_setValue('tags_'+suffix, tagsList);
}


//insert village into Firefox preference store 
function setVillage(data)
{
	var villageList = GM_getValue('villages_'+suffix, '');
	villageList = villageList+'_@_'+data;
	GM_setValue('villages_'+suffix, villageList);
}


//import list data
function setListData()
{
	var txtArea = document.getElementById('txtArea');
	var data = txtArea.value;
	if (confirm('This will overwrite your old data.\n\nProceed?\n'))
	{
		GM_setValue('villages_'+suffix, data);
		reloadVillageList();
	}
}


//check if village is already in the list
function checkVillageId(id)
{
	var villageList = new Array();
	villageList = GM_getValue('villages_'+suffix, '').split('_@_');
	for (i=1; i<=villageList.length-1; i++)
	{
		villageList[i] = villageList[i].split('||');
		villageId = villageList[i][1];
		if (villageId == id) return true;
	}
	return false;
}


//remove village from list
function delVillage(id)
{
	var villageListAfter = '';
	var villageListBefore = new Array();
	villageListBefore = GM_getValue('villages_'+suffix, '').split('_@_');
	villageListBefore.sort();
	for (i=1; i<=villageListBefore.length-1; i++)
	{
		villageListBefore[i] = villageListBefore[i].split('||');
		var villageName = villageListBefore[i][0];
		var villageId = villageListBefore[i][1];
		var villageCoords = villageListBefore[i][2];
		var playerName = villageListBefore[i][3];
		var playerId = villageListBefore[i][4];
		var allyName = villageListBefore[i][5];
		var allyId = villageListBefore[i][6];
		var cValue = villageListBefore[i][7];
		var playerTribe = villageListBefore[i][8];
		var villageType = villageListBefore[i][9];
		var villageTag = villageListBefore[i][10];
		var villageNote = villageListBefore[i][11];
		
		if (villageId != id) {
			villageListAfter = villageListAfter+'_@_'+villageName+'||'+villageId+'||'+villageCoords+'||'+playerName+'||'+playerId+'||'+allyName+'||'+allyId+'||'+cValue+'||'+playerTribe+'||'+villageType+'||'+villageTag+'||'+villageNote;
		}
	}
	GM_setValue('villages_'+suffix, villageListAfter);
	//if list is empty, restore column visibility to default
	var villageList = getListData();
	if (villageList == '') {
		restoreDefaultVisibility();
	}
	//refresh list
	reloadVillageList();
}


//delete all villages
function delAllVillages()
{
	if (confirm(lang['CONFIRM'])) {
		//delete
		GM_setValue('villages_'+suffix, '');
		//list is empty, restore column visibility to default
		restoreDefaultVisibility();
	}
}


//delete tag
function delTag(tagName)
{
	var tagListAfter = '';
	var tagListBefore = new Array();
	tagListBefore = GM_getValue('tags_'+suffix).split(',');
	for (var i=1; i<tagListBefore.length; i++) {
		if (tagListBefore[i] != tagName) tagListAfter = tagListAfter+','+tagListBefore[i];
	}
	GM_setValue('tags_'+suffix, tagListAfter);
	//refresh list
	reloadVillageList();
}


//reload list
function reloadVillageList()
{
	var oldList = dom.id('listDiv_'+suffix);
	if (oldList) {
		oldList.parentNode.removeChild(oldList);
	}
	createVMList();
}


//restore default visibility
function restoreDefaultVisibility()
{
	GM_setValue('colsVis_'+suffix, colsDefaultVisibility);
	//refresh list
	reloadVillageList();
}


//restore default position
function restoreDefaultPosition()
{
	GM_setValue('listDiv_'+suffix, listDefaultPosition);
	//refresh list
	reloadVillageList();
}


//restore default width
function restoreDefaultWidth()
{
	GM_setValue('colsWidth_'+suffix, colsDefaultWidth);
	//refresh list
	reloadVillageList();
}


//get list width
function getListVisibleWidth()
{
	var colsVis = getColsVisibility();
	var colsWidth = getColsWidth();
	var listWidth = 0;
	for (var i=0; i<colsVis.length; i++) {
		if (colsVis[i] != 'none') {
			listWidth = listWidth + parseInt(colsWidth[i]) + 2; //+2px cell borders width
		}
	}
	return listWidth;
}


//load columns visibility array
function getColsVisibility()
{
	var colsVis = GM_getValue('colsVis_'+suffix, '');
	if (!colsVis || colsVis=='' || colsVis.split(',').length<colsNumber) {
		colsVis = colsDefaultVisibility; //default values
		GM_setValue('colsVis_'+suffix, colsVis);
	}
	colsVis = colsVis.split(',');
	return colsVis;
}


//load columns width array
function getColsWidth()
{
	var colsWidth = GM_getValue('colsWidth_'+suffix, '');
	if (!colsWidth || colsWidth=='' || colsWidth.split(',').length<colsNumber) {
		colsWidth = colsDefaultWidth; //default values
		GM_setValue('colsWidth_'+suffix, colsWidth);
	}
	colsWidth = colsWidth.split(',');
	return colsWidth;
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


//encode characters to HTML safe code (by Alberto Biamino)
function C2E(str)
{
	str = str.replace(/&/g, '&#38;');
	str = str.replace(/'/g, '&#39;');
	str = str.replace(/"/g, '&#34;');
	str = str.replace(/\\/g, '&#92;');
	var acc = '';
	for (var i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 31 && str.charCodeAt(i) < 127) acc += str.charAt(i) 
		else acc += '&#' + str.charCodeAt(i) + ';';
	}
	return acc;
}


//decode HTML safe code to characters (by Alberto Biamino)
function E2C(str)
{
	str = str.replace(/(&#[0-9]+;)/g, '\n$1\n');
	str = str.replace(/\n\n/g, '\n');
	spl = str.split('\n');
	for (var i = 0; i < spl.length; i++) {
		if (spl[i].charAt(0) == '&') {
			spl[i] = spl[i].replace(/&#([0-9]+);/g, '$1');
			spl[i] = String.fromCharCode(spl[i]);
		}
	} 
	str = spl.join('');
	return str;
}


//capitalize first char
function capFirst(str)
{
	str = str.substr(0, 1).toUpperCase() + str.substr(1);
	return str;
}


//create show options event
function makeEventShowOptions()
{
	var img = dom.cn('img');
	img.title = lang['SHOW']+' '+lang['OPTIONS'];
	img.style.opacity = '0.5';
	img.addEventListener('click', foo=function(){showOptions();}, false);
	return img;
}


//create hide options event
function makeEventHideOptions()
{
	var img = dom.cn('img');
	img.title = lang['HIDE']+' '+lang['OPTIONS'];
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
	var img = dom.cn('img');
	img.title = lang['MINIMIZE'];
	img.style.width = '12px';
	img.style.height = '12px';
	img.style.paddingTop = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['minimize'];
	img.addEventListener('click', foo=function(){minimizeList();}, false);
	titleDiv.addEventListener('dblclick', bar=function(){minimizeList();}, false);
	return img;
}


//create maximize event
function makeEventMaximize(titleDiv)
{
	var img = dom.cn('img');
	img.title = lang['MAXIMIZE'];
	img.style.width = '12px';
	img.style.height = '12px';
	img.style.paddingTop = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['maximize'];
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


//create delete event
function makeEventDelete(villageId, villageName)
{
	var img = dom.cn('img');
	img.title = lang['DELETE']+' '+E2C(villageName);
	img.style.width = '12px';
	img.style.height = '12px';
	img.style.paddingTop = '4px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['delete'];
	img.addEventListener('click', bar=function(){delVillage(villageId);}, false);
	return img;
}


//create send troops event
function makeEventSendTroops(villageId)
{
	var img = dom.cn('img');
	img.title = lang['SEND_TROOPS'];
	img.style.width = '14px';
	img.style.height = '14px';
	img.style.paddingTop = '3px';
	img.style.paddingRight = '2px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['troops'];
	img.addEventListener('click', bar=function(){sendTroopsPage(villageId);}, false);
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
	var img = dom.cn('img');
	img.title = lang['MAP']+' ('+coordX+'|'+coordY+')';
	img.style.width = '25px';
	img.style.height = '14px';
	img.style.paddingTop = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['map'];
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
	var img = dom.cn('img');
	img.title = lang['SEND_RESOURCES'];
	img.style.width = '16px';
	img.style.height = '16px';
	img.style.paddingTop = '1px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['market'];
	img.addEventListener('click', bar=function(){sendResourcesPage(villageId);}, false);
	return img;
}


//go to send resources page
function sendResourcesPage(villageId)
{
	window.location = 'build.php?z='+villageId+'&gid=17';
}


//create village stats event
function makeEventVillageStats(villageName, villageId, cValue, coordX, coordY)
{
	var celltxt = dom.cn('a', villageName);
	celltxt.href = 'karte.php?qplinks=false&d='+villageId+'&c='+cValue;
	celltxt.title = lang['VILLAGE_PROFILE']+' ('+coordX+'|'+coordY+')';
	var hidePopups = getHidePopups();
	if (hidePopups==false) {
		//add stats popup
		celltxt.addEventListener('mouseover', bar=function(ev){mymousePos = mouseCoords(ev);}, false);
		celltxt.addEventListener('mouseover', bar1=function(){showStats('village', villageId);}, false);
		celltxt.addEventListener('mouseout', foo=function(){hideStats();}, false);
	}
	return celltxt;
}


//create player stats event
function makeEventPlayerStats(playerName, playerId)
{
	var celltxt = dom.cn('a', playerName);
	celltxt.href = 'spieler.php?uid='+playerId;
	celltxt.title = lang['PLAYER_PROFILE'];
	var hidePopups = getHidePopups();
	if (hidePopups==false) {
		//add stats popup
		celltxt.addEventListener('mouseover', bar=function(ev){mymousePos = mouseCoords(ev);}, false);
		celltxt.addEventListener('mouseover', bar1=function(){showStats('player', playerId);}, false);
		celltxt.addEventListener('mouseout', foo=function(){hideStats();}, false);
	}
	return celltxt;
}


//create ally stats event
function makeEventAllyStats(allyName, allyId)
{
	var celltxt = dom.cn('a', allyName);
	celltxt.href = 'allianz.php?aid='+allyId;
	celltxt.title = lang['ALLY_PROFILE'];
	var hidePopups = getHidePopups();
	if (hidePopups==false) {
		//add stats popup
		celltxt.addEventListener('mouseover', bar=function(ev){mymousePos = mouseCoords(ev);}, false);
		celltxt.addEventListener('mouseover', bar1=function(){showStats('ally', allyId);}, false);
		celltxt.addEventListener('mouseout', foo=function(){hideStats();}, false);
	}
	return celltxt;
}


//create change Tag event
function makeEventChangeTag(villageTag, villageId)
{
	//get tags from store
	var tagsList = GM_getValue('tags_'+suffix);
	if (!tagsList) {
		tagsList = defaultTags; //default value
		GM_setValue('tags_'+suffix, tagsList);
	}
	tagsList = tagsList.split(',');
	//create select field
	var select = dom.cn('select');
	select.style.border = '1px solid #71D000';
	select.style.color = '#71D000';
	select.style.width = '120px';
	for (var i=0; i<tagsList.length; i++) {
		var option = dom.cn('option', tagsList[i]);
		option.style.color = '#71D000';
		option.value = tagsList[i];
		select.appendChild(option);
		if (tagsList[i]==villageTag) select.selectedIndex = i;
	}
	select.addEventListener('change', bar=function(){updateVillageTag(this.options[this.selectedIndex].value, villageId);this.blur();}, false);
	return select;
}


//update village tag in firefox store
function updateVillageTag(newVillageTag, id)
{
	var villageListAfter = '';
	var villageListBefore = new Array();
	villageListBefore = GM_getValue('villages_'+suffix, '').split('_@_');
	villageListBefore.sort();
	for (i=1; i<=villageListBefore.length-1; i++)
	{
		villageListBefore[i] = villageListBefore[i].split('||');
		var villageName = villageListBefore[i][0];
		var villageId = villageListBefore[i][1];
		var villageCoords = villageListBefore[i][2];
		var playerName = villageListBefore[i][3];
		var playerId = villageListBefore[i][4];
		var allyName = villageListBefore[i][5];
		var allyId = villageListBefore[i][6];
		var cValue = villageListBefore[i][7];
		var playerTribe = villageListBefore[i][8];
		var villageType = villageListBefore[i][9];
		var villageTag = villageListBefore[i][10];
		var villageNote = villageListBefore[i][11];
		
		if (villageId != id) {
			villageListAfter = villageListAfter+'_@_'+villageName+'||'+villageId+'||'+villageCoords+'||'+playerName+'||'+playerId+'||'+allyName+'||'+allyId+'||'+cValue+'||'+playerTribe+'||'+villageType+'||'+villageTag+'||'+villageNote;
		} else {
			villageListAfter = villageListAfter+'_@_'+villageName+'||'+villageId+'||'+villageCoords+'||'+playerName+'||'+playerId+'||'+allyName+'||'+allyId+'||'+cValue+'||'+playerTribe+'||'+villageType+'||'+newVillageTag+'||'+villageNote;
		}
	}
	GM_setValue('villages_'+suffix, villageListAfter);
}


//create Time of travel event
function makeEventTimeOfTravel(strDistance, activeVillageName)
{
	var celltxt = dom.cn('span', strDistance);
	celltxt.title = lang['DISTANCE_VILLAGE']+' '+activeVillageName;
	var hidePopups = getHidePopups();
	if (hidePopups==false) {
		celltxt.addEventListener('mouseover', bar=function(ev){mymousePos = mouseCoords(ev);}, false);
		celltxt.addEventListener('mouseover', bar1=function(){showTimeOfTravel(strDistance);}, false);
		celltxt.addEventListener('mouseout', foo=function(){hideTimeOfTravel();}, false);
	}
	return celltxt;
}

//create tribe event
function makeEventPlayerTribe(playerId, playerTribe)
{
	var img = dom.cn('img');
	img.style.width = '16px';
	img.style.height = '16px';
	img.style.paddingTop = '1px';
	img.style.cursor = 'pointer';
	
	var romans = lang['ROMANS'].toLowerCase();
	var teutons = lang['TEUTONS'].toLowerCase();
	var gauls = lang['GAULS'].toLowerCase();
	playerTribe = E2C(playerTribe);
	
	switch (playerTribe) {
		case romans:
			img.title = lang['ROMANS'];
			img.src = 'data:image/png;base64,'+image['romans'];
			img.addEventListener('click', foo1=function(){return location.href="javascript:void(Popup(1, 2))";}, false);
			break;
		case teutons:
			img.title = lang['TEUTONS'];
			img.src = 'data:image/png;base64,'+image['teutons'];
			img.addEventListener('click', foo2=function(){return location.href="javascript:void(Popup(2, 2))";}, false);
			break;
		case gauls:
			img.title = lang['GAULS'];
			img.src = 'data:image/png;base64,'+image['gauls'];
			img.addEventListener('click', foo3=function(){return location.href="javascript:void(Popup(3, 2))";}, false);
			break;
		default:
			img.title = 'Nataren???';
			img.src = 'data:image/png;base64,'+image['natar'];
			return img;
			break;
	}
	return img;
}


//show statistics (modified from Travissimo)
function showStats(type, id)
{
	//remove old statsDiv
	hideStats();
	
	//create wrapper div
	var statsDiv = dom.cn('div');
	statsDiv.id = 'VMstats';
	statsDiv.style.zIndex = 666;
	statsDiv.style.width = '198px';
	statsDiv.style.position = 'absolute';
	statsDiv.style.top = (mymousePos.y+40)+'px';
	winX = window.innerWidth;
	if (mymousePos.x > winX-234) statsDiv.style.left = (mymousePos.x-214)+'px';
	else statsDiv.style.left = (mymousePos.x)+'px';
	statsDiv.style.background = 'transparent url(data:image/png;base64,'+image['shadow']+') repeat scroll 0% 50%';
	statsDiv.style.margin = '4px 0px 0px 5px';
	document.body.appendChild(statsDiv);
	
	//create wait image div
	var innerDiv = dom.cn('div');
	innerDiv.id = 'waitImage';
	innerDiv.style.position = 'relative';
	innerDiv.style.left = '-5px';
	innerDiv.style.top = '-5px';
	innerDiv.style.color = '#C0C0C0'
	innerDiv.style.fontSize = '8pt';
	innerDiv.style.backgroundColor = '#F5F5F5';
	innerDiv.style.border = '2px solid green';
	innerDiv.style.height = '22px';
	var img = dom.cn('img');
	img.src = 'data:image/png;base64,'+image['wait'];
	img.style.cssFloat = 'left';
	img.style.paddingLeft = '5px';
	var span = dom.cn('span', 'travian.ping-timeout.de');
	span.style.cssFloat = 'left';
	span.style.paddingTop = '4px';
	span.style.paddingLeft = '5px';
	innerDiv.appendChild(img);
	innerDiv.appendChild(span);
	statsDiv.appendChild(innerDiv);
	
	//get data from travian.ping-timeout.de
	switch(type) {
		case 'village':
			var href = 'http://travian.ping-timeout.de/travissimo/dorf.php?domain='+server+'&d='+id
			break;
		case 'player':
			var href = 'http://travian.ping-timeout.de/travissimo/travissimo.php?domain='+server+'&uid='+id;
			break;
		case 'ally':
			var href = 'http://travian.ping-timeout.de/travissimo/allianzen.php?domain='+server+'&aid='+id;
			break;
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: href,
		onload: function (responseDetails)
				{
					if (responseDetails.status != 200) return;
					
					//remove wait image div
					var innerDiv = dom.id('waitImage');
					if (innerDiv) innerDiv.parentNode.removeChild(innerDiv);
					else return;
					
					//get values from xml
					var parser = new DOMParser();
					var doc = parser.parseFromString(responseDetails.responseText, "text/xml");
					var stats = doc.getElementsByTagName('stats')[0];
					if (!stats) {
						//create inner div with 'server down' message
						var innerDiv = dom.cn('div', lang['SERVER_DOWN']);
						innerDiv.style.position = 'relative';
						innerDiv.style.left = '-5px';
						innerDiv.style.top = '-5px';
						innerDiv.style.fontSize = '8pt';
						innerDiv.style.color = '#C0C0C0'
						innerDiv.style.backgroundColor = '#F5F5F5';
						innerDiv.style.border = '2px solid green';
						innerDiv.style.padding = '5px'
						innerDiv.style.paddingLeft = '10px'
						statsDiv.appendChild(innerDiv);
						return;
					}
					switch(type) {
						case 'village':
							var spielerinfos = doc.getElementsByTagName('spielerinfos')[0];
							var name = spielerinfos.getElementsByTagName('dorf')[0].firstChild.data;
							break;
						case 'player':
							var spielerinfos = doc.getElementsByTagName('spielerinfos')[0];
							var name = spielerinfos.getElementsByTagName('username')[0].firstChild.data;
							break;
						case 'ally':
							var allianzinfos = doc.getElementsByTagName('allianzinfos')[0];
							var name = allianzinfos.getElementsByTagName('allianz')[0].firstChild.data;
							break;
					}
					var historie = doc.getElementsByTagName('historie')[0];
					var dbInfos = historie.getElementsByTagName('DBInfo');
					var calc = doc.getElementsByTagName('Calc')[0].firstChild.data;
					calc = calc.substring(0, calc.indexOf(' '));
					var values = new Array();
					var dates = new Array();
					for (var i=0; i<dbInfos.length; i++){
						var einwohner = dbInfos[i].getElementsByTagName('einwohner')[0];
						if (!einwohner.firstChild) values[i] = '0';
						else values[i] = parseInt(einwohner.firstChild.data);
						var datum = dbInfos[i].getElementsByTagName('datum')[0];
						if (!datum.firstChild) dates[i] = '0000-00-00';
						else dates[i] = datum.firstChild.data;
					}
					//get max & min
					var min = 5000000;
					var max = 0;
					for (var i=0; i<values.length; i++){
						var anz = values[i];
						if (anz > max) max = anz;
						if (anz < min) min = anz;
					}
					if (max == min) var factor = 150;
					else var factor = 150/(max-min);
					
					//create inner div
					var innerDiv = dom.cn('div');
					innerDiv.style.position = 'relative';
					innerDiv.style.left = '-5px';
					innerDiv.style.top = '-5px';
					innerDiv.style.backgroundColor = '#F5F5F5';
					innerDiv.style.border = '2px solid green';
					statsDiv.appendChild(innerDiv);
					
					//create table
					var boxTable = dom.cn('table');
					boxTable.id = 'vboxTable';
					boxTable.style.border = 'collapse';
					innerDiv.appendChild(boxTable);
					
					//create headers
					//username
					var tr = dom.cn('tr');
					var td = dom.cn('td');
					td.setAttribute('colspan', '2');
					td.style.height = '10px';
					td.style.backgroundColor = 'green';
					var div0 = dom.cn('div', name);
					div0.style.textAlign = 'center';
					div0.style.fontWeight = 'bold';
					div0.style.fontSize = '8pt';
					div0.style.color = 'lightYellow';
					div0.style.paddingBottom = '2px';
					td.appendChild(div0);
					tr.appendChild(td);
					boxTable.appendChild(tr);
					//date
					var tr = dom.cn('tr');
					var td = dom.cn('td');
					td.style.width = '30px';
					td.style.height = '10px';
					var div1 = dom.cn('div', lang['DATE']);
					div1.style.textAlign = 'center';
					div1.style.fontWeight = 'bold';
					div1.style.fontSize = '8pt';
					div1.style.color = 'green';
					td.appendChild(div1);
					tr.appendChild(td);
					//population
					var td = dom.cn('td');
					td.style.width = '140px';
					td.style.height = '10px';
					var div2 = dom.cn('div', lang['POPULATION']);
					div2.style.textAlign = 'center';
					div2.style.fontWeight = 'bold';
					div2.style.fontSize = '8pt';
					div2.style.color = 'green';
					td.appendChild(div2);
					tr.appendChild(td);
					//append headers
					boxTable.appendChild(tr);
					
					//create chart
					for (var i=0; i<values.length; i++)
					{
						var date = dates[i].substring(dates[i].indexOf('-')+1, dates[i].length);
						var width = Math.round((max-values[i])*factor);
						var mywidth = 150-width; //totbarwidth=150px
						var label = String(values[i]);
						
						//create row
						var tr = dom.cn('tr');
						//create date
						var td = dom.cn('td');
						td.style.height = '10px';
						var div = dom.cn('div');
						div.style.textAlign = 'center';
						div.style.fontWeight = 'bold';
						div.style.fontSize = '6pt';
						//append date
						div.appendChild(dom.ct(date));
						td.appendChild(div);
						tr.appendChild(td);
						//create population
						var td = dom.cn('td');
						td.setAttribute('colspan', '2');
						td.style.height = '10px';
						var div = dom.cn('div');
						div.style.backgroundColor = 'lightYellow';
						div.style.fontWeight = 'bold';
						div.style.border = '1px solid #B1D632';
						div.style.padding = '1px';
						var span = dom.cn('span');
						span.style.display = 'block';
						span.style.textAlign = 'center';
						span.style.fontSize = '6pt';
						span.style.width = String(mywidth)+'px';
						//bars color
						if (i < values.length-1 && values[i] < values[i+1]) {
							span.style.backgroundColor = 'red';
							if (mywidth == 0) span.style.color = 'red';
						} else if (i < values.length-1 && values[i] > values[i+1]) {
							span.style.backgroundColor = 'green';
						} else if (i < values.length-1 && values[i] == values[i+1]) {
							span.style.backgroundColor = 'yellow';
						} else {
							span.style.backgroundColor = 'green';
							if (mywidth == 0) span.style.color = 'green';
						}
						//append population
						span.appendChild(dom.ct(label));
						div.appendChild(span);
						td.appendChild(div);
						tr.appendChild(td);
						//append row
						boxTable.appendChild(tr);
					}
					//travian.ping-timeout.de
					var tr = dom.cn('tr');
					var td = dom.cn('td');
					td.setAttribute('colspan', '2');
					td.style.height = '8px';
					var div = dom.cn('div', 'travian.ping-timeout.de ('+calc+'s)');
					div.style.paddingLeft = '1px';
					div.style.fontSize = '6pt';
					div.style.fontWeight = 'bold';
					div.style.color = '#5d5d5d'
					td.appendChild(div);
					tr.appendChild(td);
					boxTable.appendChild(tr);
				}
	});
}


//hide statistics
function hideStats()
{
	var statsDiv = dom.id('VMstats');
	if (statsDiv) {
		statsDiv.parentNode.removeChild(statsDiv);
	}
}


//show troops time
function showTimeOfTravel(strDistance)
{
	//remove old troopsTimeDiv
	hideTimeOfTravel();
	
	//create shadow div
	var troopsTimeDiv = dom.cn('div');
	troopsTimeDiv.id = 'troopsTimeDiv';
	troopsTimeDiv.style.zIndex = 666;
	troopsTimeDiv.style.width = '236px';
	troopsTimeDiv.style.position = 'absolute';
	troopsTimeDiv.style.top = (mymousePos.y+40)+'px';
	winX = window.innerWidth;
	if (mymousePos.x > winX-234) troopsTimeDiv.style.left = (mymousePos.x-214)+'px';
	else troopsTimeDiv.style.left = (mymousePos.x)+'px';
	troopsTimeDiv.style.background = 'transparent url(data:image/png;base64,'+image['shadow']+') repeat scroll 0% 50%';
	troopsTimeDiv.style.margin = '4px 0px 0px 5px';
	document.body.appendChild(troopsTimeDiv);
	
	//create inner div
	var innerDiv = dom.cn('div');
	innerDiv.style.position = 'relative';
	innerDiv.style.left = '-5px';
	innerDiv.style.top = '-5px';
	innerDiv.style.backgroundColor = '#F5F5F5';
	innerDiv.style.border = '2px solid green';
	troopsTimeDiv.appendChild(innerDiv);
	
	//create table
	var troopsTimeTable = dom.cn('table');
	troopsTimeTable.id = 'troopsTimeTable';
	troopsTimeTable.style.border = 'collapse';
	innerDiv.appendChild(troopsTimeTable);
	
	//create headers
	//troops type
	var tr = dom.cn('tr');
	var td = dom.cn('td');
	td.style.width = '40px';
	td.style.height = '10px';
	var div = dom.cn('div', lang['TROOPS']);
	div.style.textAlign = 'center';
	div.style.fontWeight = 'bold';
	div.style.fontSize = '8pt';
	div.style.color = 'green';
	td.appendChild(div);
	tr.appendChild(td);
	//time of travel
	var td = dom.cn('td');
	td.style.width = '70px';
	td.style.height = '10px';
	var div = dom.cn('div', lang['TIME']);
	div.style.textAlign = 'center';
	div.style.fontWeight = 'bold';
	div.style.fontSize = '8pt';
	div.style.color = 'green';
	td.appendChild(div);
	tr.appendChild(td);
	//arrival time
	var td = dom.cn('td');
	td.style.width = '120px';
	td.style.height = '10px';
	var div = dom.cn('div', lang['ARRIVAL']);
	div.style.textAlign = 'center';
	div.style.fontWeight = 'bold';
	div.style.fontSize = '8pt';
	div.style.color = 'green';
	td.appendChild(div);
	tr.appendChild(td);
	//append headers
	troopsTimeTable.appendChild(tr);
	
	
	//troops velocity
	//get player's tribe from store
	var playerTribe = GM_getValue('tribe_'+suffix);
	if (playerTribe == 'gauls') {
		var velocityMap = {'g01':7, 'g02':6, 'g03':17, 'g04':19, 'g05':16, 'g06':13, 'g07':4, 'g08':3, 'g09':5, 'g10':5};
	} else if (playerTribe == 'romans') {
		var velocityMap = {'r01':6, 'r02':5, 'r03':7, 'r04':16, 'r05':14, 'r06':10, 'r07':4, 'r08':3, 'r09':4, 'r10':5};
	} else if (playerTribe == 'teutons') {
		var velocityMap = {'t01':7, 't02':7, 't03':6, 't04':9, 't05':10, 't06':9, 't07':4, 't08':3, 't09':4, 't10':5};
	}
	//get tournament square level from store
	var tournamentLevel = GM_getValue('tournament_'+suffix);
	
	//get speed server option from store
	var speed = GM_getValue('speed_'+suffix);
	if (speed==false) var speedFactor = 1;
	else var speedFactor = 2;
	
	for (var key in velocityMap) {
		//create row
		var tr = dom.cn('tr');
		//troop type
		var td = dom.cn('td');
		var img = dom.cn('img');
		img.src = 'data:image/gif;base64,'+image[key];
		img.style.paddingLeft = '12px';
		td.appendChild(img);
		tr.appendChild(td);
		//time of travel
		var td = dom.cn('td');
		var timeOfTravel = seconds_to_string(time_quotient_tournament(parseFloat(strDistance),velocityMap[key]*speedFactor, tournamentLevel));
		var div = dom.cn('div', timeOfTravel);
		div.style.textAlign = 'center';
		div.style.fontSize = '8pt';
		div.style.color = 'gray';
		td.appendChild(div);
		tr.appendChild(td);
		//arrival time
		var td = dom.cn('td');
		var arrivalTime = time_noyear(addsubtime(getDateTime(), time_quotient_tournament(parseFloat(strDistance),velocityMap[key]*speedFactor, tournamentLevel)/3600, 1));
		var div = dom.cn('div', arrivalTime);
		div.style.textAlign = 'center';
		div.style.fontSize = '8pt';
		div.style.color = 'gray';
		td.appendChild(div);
		tr.appendChild(td);
		//append row
		troopsTimeTable.appendChild(tr);
	}
	
	/************************** from http://www.javaschubla.de/2006/travian/wegerechner/wegerechner-t3i.html *****************************/
	function zeropad(num)
	{
		return num<10?"0"+num:num;
	}
	//time of travel functions
	function seconds_to_string(time_in_seconds)
	{
		var h = Math.floor(time_in_seconds/3600);
		time_in_seconds = time_in_seconds - h*3600;
		var m = Math.floor(time_in_seconds/60);
		time_in_seconds = time_in_seconds - m*60;
		var s = Math.round(time_in_seconds);
		return h+":"+zeropad(m)+":"+zeropad(s);
	}
	function time_quotient(distance, speed)
	{
		var q = Math.round(distance * 3600 / speed); // time in seconds
		return q;
	}
	function time_quotient_tournament(distance, speed, tournament_level)
	{
		var limit = 30;
		if (distance <= limit || tournament_level == 0) return time_quotient(distance, speed);
		var time_to_limit_in_seconds = Math.round(limit * 3600/speed);
		var restaway = distance - limit;
		var tournament_speed = speed * (1 + tournament_level / 10);
		var time = Math.round(3600 * restaway / tournament_speed);
		var totaltime = time_to_limit_in_seconds + time;
		return totaltime;
	}
	//arrival time functions
	function addsubtime(startendzeit, zeitspanne_in_stunden, plusminus)
	{
		return new Date(startendzeit.getTime() + plusminus * zeitspanne_in_stunden * 3600000);
	}
	function time_noyear(date)
	{
		var now = new Date();
		var today = zeropad(now.getDate());
		if (zeropad(date.getDate())==today) return zeropad(date.getHours())+":"+zeropad(date.getMinutes())+":"+zeropad(date.getSeconds());
		else return zeropad(date.getDate())+"."+zeropad(date.getMonth()+1)+". "+zeropad(date.getHours())+":"+zeropad(date.getMinutes())+":"+zeropad(date.getSeconds());
	}
	function getDateTime()
	{
		var now = new Date();
		var day = zeropad(now.getDate());
		var month = zeropad(now.getMonth()+1);
		var year = now.getFullYear();
		var hours = zeropad(now.getHours());
		var minutes = zeropad(now.getMinutes());
		var seconds = zeropad(now.getSeconds());
		
		var startendzeit = new Date(year, month-1, day, hours, minutes, seconds);
		
		return startendzeit;
	}	
	/************************** end http://www.javaschubla.de/2006/travian/wegerechner/wegerechner-t3i.html *****************************/
	
}


//hide troops time
function hideTimeOfTravel()
{
	var troopsTimeDiv = dom.id('troopsTimeDiv');
	if (troopsTimeDiv) {
		troopsTimeDiv.parentNode.removeChild(troopsTimeDiv);
	}
}


//create village type icon + show map event
function makeEventVillageType(vt, vid)
{
	var img = dom.cn('img');
	img.style.width = '18px';
	img.style.height = '16px';
	img.style.paddingTop = '1px';
	img.style.cursor = 'pointer';
	img.addEventListener('click', bar=function(){showMapPage(vid);}, false);
	
	switch(vt) {
		//VILLAGES
		case 'f1': //f1 = 9crops
			img.title = lang['F1'];
			img.src = 'data:image/png;base64,'+image['f1'];
			break;
		case 'f2': //f2 = +iron
			img.title = lang['F2'];
			img.src = 'data:image/png;base64,'+image['f2'];
			img.style.height = '12px';
			img.style.paddingTop = '4px';
			break;
		case 'f3': //f3 = normal
			img.title = lang['F3'];
			img.src = 'data:image/png;base64,'+image['map'];
			img.style.height = '14px';
			img.style.width = '25px';
			break;
		case 'f4': //f4 = +clay
			img.title = lang['F4'];
			img.src = 'data:image/png;base64,'+image['f4'];
			img.style.height = '12px';
			img.style.paddingTop = '4px';
			break;
		case 'f5': //f5 = +lumber
			img.title = lang['F5'];
			img.src = 'data:image/png;base64,'+image['f5'];
			img.style.height = '12px';
			img.style.paddingTop = '4px';
			break;
		case 'f6': //f6 = 15crops
			img.title = lang['F6'];
			img.src = 'data:image/png;base64,'+image['f6'];
			break;
		//OASES
		case 'w1': //w1 = +25% lumber per hour
			img.title = lang['W1'];
			img.src = 'data:image/png;base64,'+image['w1'];
			break;
		case 'w2': //w2 = +25% lumber per hour
			img.title = lang['W2'];
			img.src = 'data:image/png;base64,'+image['w2'];
			break;
		case 'w3': //w3 = +25% lumber per hour, +25% crop per hour
			img.title = lang['W3'];
			img.src = 'data:image/png;base64,'+image['w3'];
			break;
		case 'w4': //w4 = +25% clay per hour
			img.title = lang['W4'];
			img.src = 'data:image/png;base64,'+image['w4'];
			break;
		case 'w5': //w5 = +25% clay per hour
			img.title = lang['W5'];
			img.src = 'data:image/png;base64,'+image['w5'];
			break;
		case 'w6': //w6 = +25% clay per hour, +25% crop per hour
			img.title = lang['W6'];
			img.src = 'data:image/png;base64,'+image['w6'];
			break;
		case 'w7': //w7 = +25% iron per hour
			img.title = lang['W7'];
			img.src = 'data:image/png;base64,'+image['w7'];
			break;
		case 'w8': //w8 = +25% iron per hour
			img.title = lang['W8'];
			img.src = 'data:image/png;base64,'+image['w8'];
			break;
		case 'w9': //w9 = +25% iron per hour, +25% crop per hour
			img.title = lang['W9'];
			img.src = 'data:image/png;base64,'+image['w9'];
			break;
		case 'w10': //w10 = +25% crop per hour
			img.title = lang['W10'];
			img.src = 'data:image/png;base64,'+image['w10'];
			break;
		case 'w11': //w11 = +25% crop per hour
			img.title = lang['W11'];
			img.src = 'data:image/png;base64,'+image['w11'];
			break;
		case 'w12': //w12 = +50% crop per hour
			img.title = lang['W12'];
			img.src = 'data:image/png;base64,'+image['w12'];
			break;
	}
	return img;
}


//create hide column event
function makeEventHideCol(colIndex)
{
	var inputElem = dom.cn('input');
	inputElem.type = 'checkbox';
	inputElem.checked = true;
	inputElem.title = lang['HIDE'];
	inputElem.addEventListener('click', foo=function(){ hideColumn(colIndex); }, false);
	return inputElem;
}


//create show column event
function makeEventShowCol(colIndex)
{
	var inputElem = dom.cn('input');
	inputElem.type = 'checkbox';
	inputElem.checked = false;
	inputElem.title = lang['SHOW'];
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


//update column visibility value in Firefox preference store
function setColumnVisibility(index, value)
{
	var colsVis = getColsVisibility();
	colsVis.splice(index, 1, value);
	var columnsAfter = new Array;
	for (i=0; i<=colsVis.length-1; i++) {
		columnsAfter = (i==colsVis.length-1) ? columnsAfter+colsVis[i] : columnsAfter+colsVis[i]+",";
	}
	GM_setValue('colsVis_'+suffix, columnsAfter);
}


//create save tag event
function makeEventSaveTag()
{
	//checks
	var newTag = dom.id('newTag_'+suffix).value;
	if (newTag == '') return;
	tagList = GM_getValue('tags_'+suffix).split(',');
	for (var i=1; i<tagList.length; i++) {
		if (tagList[i] == newTag) return;
	}
	//save
	setTag(newTag);
	//refresh list
	reloadVillageList();
}


//create save column width event
function makeEventSaveColsWidth()
{
	var villageColWidth = dom.id('village_'+suffix).value;
	if (parseInt(villageColWidth)<170) setColumnWidth(1, '170');
	else setColumnWidth(1, villageColWidth);
	
	var playerColWidth = dom.id('player_'+suffix).value;
	if (parseInt(playerColWidth)<80) setColumnWidth(2, '80');
	else setColumnWidth(2, playerColWidth);
	
	var allyColWidth = dom.id('ally_'+suffix).value;
	if (parseInt(allyColWidth)<80) setColumnWidth(3, '80');
	else setColumnWidth(3, allyColWidth);
	
	var tagColWidth = dom.id('tag_'+suffix).value;
	if (parseInt(tagColWidth)<120) setColumnWidth(4, '120');
	else setColumnWidth(4, tagColWidth);
	
	var distanceColWidth = dom.id('distance_'+suffix).value;
	if (parseInt(distanceColWidth)<70) setColumnWidth(5, '70');
	else setColumnWidth(5, distanceColWidth);
	
	reloadVillageList();
}


//update column width value in Firefox preference store
function setColumnWidth(index, value)
{
	var colsWidth = getColsWidth();
	colsWidth.splice(index, 1, value);
	var columnsAfter = new Array;
	for (i=0; i<=colsWidth.length-1; i++) {
		columnsAfter = (i==colsWidth.length-1) ? columnsAfter+colsWidth[i] : columnsAfter+colsWidth[i]+",";
	}
	GM_setValue('colsWidth_'+suffix, columnsAfter);
}


//clean string
function cleanStr(str)
{
	//replace special chars
	str = str.replace(/\|/g, '│').replace('_@_', '_ @ _', 'g');
	//remove white spaces
	str = trim(str);
	return str;
}


//load images
function loadImage()
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
	
	image['minimize']='R0lGODlhDAAMAIAAAGBgYP///yH5BAEAAAEALAAAAAAMAAwAAAINjI+py+0PG5hU0RrzKwA7';
	
	image['maximize']='R0lGODlhDAAMAIAAAGBgYP///yH5BAEAAAEALAAAAAAMAAwAAAIVjI+pCe2N3osKUHZzsPhwLTnL' +
					  'SBoFADs%3D';
	
	image['options']= 'R0lGODlhEgAOANUkAP///2ZmZtra2jU1Nezs7Ovr6zIyMuTk5GdnZ8nJyTQ0NGVlZT4+PtXV1Tg4' +
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
	
	image['map']	= 'R0lGODlhGQAOAPcAAAAAAP////qyuv7Dyf2+yP/B1P7B1P3a5/ru9P/T6vzZ7vzi/vr0+/f5//X/' +
					  '/+b/+KO9s+P/8+n/9LL61ND749n/6anFs7Llw5nCp7/yz7ncw6a7rLLfvrHcvIqdj+/z8LPLuOT/' +
					  '6a/StN3/4pe9m9H/1rz1vsf1xarJqeH/4K/Jqqm/paPglrvpsK3Xo5i4kcLnuo2ficT4tqPHmpvL' +
					  'irvYsZS1h6DBlNjn0rfoo7DaneTy3tz/y/j+9f3//JW4gt3m17fansbqq/X88Pn99rfbm6XGjOX4' +
					  '1vj99MDfpOn33anAkNbgzMDHufT77fb78fn99f7//f3+/NTvstDqr8PTr+n12tHtqtLtq9TqtsTc' +
					  'n6Syj93txczmoNHmrd7vwsLgitDopN3qwt7rxMTdieP1ucvdmOn6tq25hbrGkrzPcr3PesjZiM7c' +
					  'lcTUfcLSfMvYkczWmLfDaL/Ld8fRgM/YhaOof5KWT77EbsLId77DZr/EZ7/CZqOmbrS2gsTGd7Gw' +
					  'dO7sq+vqyaynVsrHkLyyJtjOU4KAZK6mWcGxN9PDWX13SsW7dse+gMG5gdrZ0tTHeMK2buXhycqq' +
					  'D8muJ8agAPvgc8e0Zci3cr+xcsecAMScDOXERdG1TL+YLZeBRMy2eM24ft7Vu8CMAserYsqxcJGF' +
					  'Z8alWLmbW8iqaruPNKOBQNG6jcynZsmnaNOgVMubVOjNpKN9S6+JV9Grd9exgNe2idGjafLiz8uX' +
					  'XOXJquvg1dyyjtWccN+tiOnUxei3mZ47AOXFstR1Q+ajf9+iieqwmeKnkee7qvHHt/Cyo+a7su6m' +
					  'muzW0/CzrfGtqfbIxvm4uP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANIALAAAAAAZAA4A' +
					  'AAj/AAMIHEjQSRtYYXwQXMiQ4JVSzBToOoWlocUAXxgV+5DiBA4EwCIduThwDJ5aySBpqXHDhgsm' +
					  'uF6tGWLxiRpeBCosUQUIQ6FKd4wYEtTsFhgiBJHsASXggQwUKhBNStRJUaM0q/xQeOQs1RSBc3ol' +
					  'cDAiCwwQOupw8sQqVpVBlLZoELKDgbBcZvKQ+nUgQhIaEH6csRTIUbBZfUbZ6UAlRAMDw+QIjIOp' +
					  'ABAWM5pk0rRp0SFUhGShMSHhGS03PQhC4WNrQJkiHmJ8MmVhw4ogPJAdI6PEohU9vpZNuCCCxAsO' +
					  'GUQRe8OFpEAxf5TtKpGjhSRjrbw4XwgnVLQF0C51DImynaETOq7YSCEZEAA7';
	
	image['romans'] = 'R0lGODlhEAAQAPeVAP7+/vz8/Pb39quRf4YvL0hcKYVBJ0lbJO7Boa+DcqmQf6EcHeKtlePi4IkT' +
					  'GHpGL404O8CbhvLy8dGdhXdOLfr6+rGNeKqQgc+agfb19MKSfYNfPe2zm+mxlu/x7+3w6ktiMffT' +
					  'tJ4aHY4gHOHk4dmli9qhir+9usvFwN3Z2cqVgIQaHryvpqmhl6GnlHhzRfL09LAXHNbTz9fHxqJl' +
					  'Zb3DtJMbHribi9TT1qg3Nk1lJKOBedSsl9K9rlZqONKLObEkIHZMMefl37vAwYNmY4x9cY1iQf/F' +
					  'Rebp6HwzH2h2QuXp4auBbY+cgvn5+eCslf39/b61rq+UgvGzmL/AvOaul3QmJoosL8jHxz5XKfS2' +
					  'nPz8+7rCuHtgVYcREqQbHadEP9LCwrBlZaeVhcmfiN3f3YaUjNyjh6IjHdvS0sKZgsPKvLyzrqxb' +
					  'W7aNfPj5+Ku1l6+Fg4CJdpSDZY4SGKYYGbuciMaNes3EvLWFN72NdZwTFLunocqjjHhbTtOfPnOB' +
					  'X3SAc9Wiitaiia+HdNSfiUJZH6wWFoZVPNqmjb2CN7OSgcS5tPDw8cnOx9/Ry5RAOcLHvKgaG2Jz' +
					  'Vn5ZPP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJUALAAAAAAQABAA' +
					  'AAjKACsJHEiwoEGBADy4gLMkwMEPkUg08WFIhxyHBtdMKnAAhJI5WHAAMFgjUJYXF/gkGIPEIABH' +
					  'Zlr4KcLIgoI3BhsB4vKICZlBep4IOVjmBIxFU0xgKMTiYCUqKAhpOVNCUBSnQ26o4DChCh4BBbdA' +
					  'qSRggAY3DOxIMCimzYwMUhKp6cPGCcEKYSDs8bKDR4cIRK7QaDAwjQ1JX+isuIMgRI8ch6ykENjl' +
					  'ASIKin4kIQAJDBARDuIIDGKE0oY8R/6MiFFnARoDMgQGBAA7';
	
	image['teutons']= 'R0lGODlhEAAQAPewAPT19v///52dnW5tbSgoKDM4PTk9Pjs8Pp6cnePj43F8hJGFfjlDS7u7uebm' +
					  '5ebm5hkaG7u6uZGaoZCbokJDQ7O/yVJQUNvc3Pf4+ZmZm5iYmUhLT9zc23J3eXBsand2d2BsdfHx' +
					  '8Ts6OdDQz+rs7k9WW05RVurd0evu70RJTmFVU4SEg1JUVllgZjg+Qz4/QtvPwS8uL5+nsyYpLu7t' +
					  '7N3e3lFSU+zu77i5uGVlZ9rZ2O3v8fv7/FBTWNTU0/Hw7jVARoiFgu/w8Xx7epKcphMQD7i4t/Xx' +
					  '7bOztFVaYTQ2O2pvc6KipJidp6yrqENMV5CQj5ahqeHj5dXV1UM2LtHR0llZWDxJUr3H09PU1G5t' +
					  'bvn6+5ydnXaEjDU1NTI4PSIiIllYWDs9QHB8gvX19Z6rtfn6+vLy8r++vpCRkE5PUkpLUUNFSkdH' +
					  'SFFUWGhxd66tq2t0ezlCR4qKiYiIiouLi1VXXu7p5YiTmmJnbr/Av1lcXbG3u2hmZa+yua+5wnl5' +
					  'eZiYlqmmpNjW1oeHhjg7QYqKiiopKTI1N7nEyqq1vCImKztFTJKQkFlcYCQmJvb4+DA4Q399e8vG' +
					  'wVxaWIuXnkpMUWBiacbHxqKhoZ6dnV9hY4iQlh0dH2BpcWBlajQ+RURBQBcaH8zMzMHBxQ4RFB0d' +
					  'Hr29vF9fYqampxISFPz8/J6QgywrLF9eXXF0eP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALAALAAAAAAQABAA' +
					  'AAjoAGHBUuQmhRwglSAJXLiQU6kBmB5IajTGDEOBfFRB0ZNhEJcGXhLBEgJgoZ0VZxxMWQMI1Z4o' +
					  'nlwUUoACViRXqU5RIAXLT5IZFnT8oMRohwlNAThYYSKQjZMLaWqg6dMFiY05OCIooZMDgpEQZESE' +
					  'gQMKAwNBhFoZuNSpzqhACEq8KSIK1gQCGywtaYLIR4Ash/DAugICgKNPMrD8kSAmk4YPMZ6s2iLw' +
					  'CAxWWohUYDGiiqEDX25chEUjyKYeQwS0AbOIxGiBk0Ll6aDmUQEerwXeUVHmlak4uReeoNLihZTg' +
					  'Cxd4SMAwIAA7';
	
	image['gauls']  = 'R0lGODlhEAAQAPfCAP7+/v+OAP39/fHx8f+PADqNItV2CLS9x5BfK8G1pO18ANd2BHp2b7J6NqZl' +
					  'FrEAF91zAOp9Af/Xoty1io2FfjMzM/2IAYiFfy0jFzokDb6BOG40HrSjj+7GmZ1fGLiiey9zHP//' +
					  '/4YoLYBOFN93AJyEZtF0C5NQAJxqL/+KAJF/auCUO//ToPeCAJd/ZIh0Wp0AHK2rqv2HAJ+kqLFa' +
					  'ALuceGxLIMFwE5sMI9avhaIAHLfDzlRUVNZuAP/Tnvr6+nxbCZiDaON4AaJ7Xi2XI7+bdJaboJ2d' +
					  'nbSXdZ99Wd64j6F6S5KTln9hQfuFAJyHbZiCZsCQWaWlpYl/cJmFao57YnIwHmFTKaGVh/fy63sD' +
					  'HJyHa6d0OKaPc46TmOjo6K+xtHYuHqpcAqdjGzo7PMjIyNV3CmZmZvz8/IRtU0JfFN+3iv/bpcip' +
					  'f6NzPP/YpKBaB//Uoih7HL2hfMXM0oeHiJRmMf+KAzefJZF7XzKWIurq6oOJj11dXct1FNrb2rAA' +
					  'HLqyp9GcYP3Qo5qFanJjUcC/vcF6KK+vr/3Wp9Swh29hTea/kx1FEriegP/nrzdnFSFsGKKTf6lb' +
					  'AbB6Oo2NjZpaE2VjYv7NnJyCZcvLy/Dw8DmPI2NLE/z7+fvPm7rH1YOCgf+IAPiCAIluT8BlANzC' +
					  'kmVIH6F8UjBzHIJDBMjIybq6utnZ2pOPisida2NVQ4wmN4GGjD+CJZV2T87OzcCGRPf29s1tAqdZ' +
					  'A957CmxeRntMF62KYoBqUOnq6KuGWuaBDf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMIALAAAAAAQABAA' +
					  'AAj3AIUJ7HNGgMCDCA+WqXBECphVXwAkPFiJRwhNRuh4YTIgoUQ0ZBDVkgVqx4wLrAwK3BOKwiU+' +
					  'BwK94rIFQx2EsOCQKPUEiyUnBl4s6niQV4QUKxi18dUjWI0pPxCisiBKQyEoS0bpQhIkwS+JwsQE' +
					  'WOCmRJVDAfw4UvQpB4c/wk44SJNoDZUbQqIIsjWIhY8ihjLs+vBoQq9cI7rgMqEkDiYJLrTgEDHE' +
					  'FDAaKCjJaGGnwxs2eWDoAPQgFoJJpMwQuEPL1ZxMMTbYOGUljCoPSRRAaCDJU6tNwiLJwaOHCJBO' +
					  'V8Y0YZAFYapGIApwUgNpFiEVtxIGBAA7';
	
	image['natar']  = 'R0lGODlhEAAQAOZnADQeAFwkANq2Jdm3Ji4cBrBzAI1mTaiHWmg+AG5NBrB2AOrm1mhLDHNHAG8z' +
					  'AEctCuLbvH1HAI1eEfDDkUYjAPj111QxAF0xAO/WOnxgFyUfE5+HHuzXjNSzOryeaPDjxce7svzz' +
					  'zdCyfLeOEf/lOZ19EebLmt1yAK+HHWo5ALuohvXpxqh7EbqQTP/tnPWFNOm8GueAJffrsigeDP/l' +
					  '5TMaAEMtFC0bAM6cE144CVQrAP8RA+rOkXNgGlNAD/XXLZlcDKqHV9dmDVgtApuATkooBfzyx/PV' +
					  'ae3m3NijEeTMf9/LpP+VLPWVULiEJlkjANmwNPXgfeFwK6B6Is6wdu/it+zRNlchAJFuGOvWl/fv' +
					  '1+rLveHCjtmoTEcuBL+TYfgrFuzNreyyk8KbHevk1/nrpt+kF////wAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
					  'BAEAAGcALAAAAAAQABAAAAeFgGeCg4SCVWFbNIWLJmYvYGKLhV0RTFITkoNkVgkWUzyLRi4yFRg4' +
					  'XkQqi2VRPyRNSQ8gkhAZAwInOzESmSsXWCM3QhsomWcFFDYlPR1KmUstAUU+LGMcklxfDlc1OQwG' +
					  'IYtHHilPAFrGZwowOgRI6SJDQFAf6VRBDTNOWekHCBoL0gkKBAA7';
	
	image['crop']   = 'R0lGODlhEgAMAOYAAIhNJfn05+LHqcyogumqOqKFYuGRKvvlxLp3Jt+ybP///+DEicSISODQwPHp' +
					  '3+GqY+vGj821ncORQ/j39OGfT+CpUPHIdu7Xr/HavNx7GujHnPPo1cWgbtezjfG6W6JSFtvBpvfw' +
					  '6NiBKv778LiQZ+zdw/DXs96+oPKWI+urUOjUtuy8Qfvq0//13ujRhPjIbOW2ctS1g//mxfzx4d7F' +
					  'n8mMWuzRn82NNvbbqfrt0vHNgObYvNq9jP/89uiULvTZvOfNlv/55vz59ezgtv/x5evbzPbq2Y1V' +
					  'Jfjsxt7FlPfm3vLGefTAXd69pfCyVeTKivG3dvvo0f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
					  'BAUUAFIALAAAAAASAAwAAAeCgFKCUkIhg4KFh4obMTlGIBsbJyo9ij0BQTQ8NkkcAxdAFwIHAYMB' +
					  'Q0gLC086LzAQHT8CKqWDPTsRGC4eK0wWF0QNIFGHMyVFRjhOBChLI4rQUgESCB8k0dATBUcANZXY' +
					  'gyMPIhk+LeCDQlApBhQs6IINCRU3DBrf4A4HJiYltYeBAAA7';
	
	image['wait']   =  'R0lGODlhFgAWAPfoAP39/fz8/Pv7+/r6+vDw8Pb29vn5+fHx8fj4+Pf39/T09PPz8/Ly8u/v7+Xl' +
					  '5ebm5vX19e3t7e7u7uvr6+fn5+jo6NbW1tPT09TU1OTk5Nvb29XV1ezs7MTExOPj4+np6dzc3AAA' +
					  'AOrq6t3d3djY2OLi4sjIyNfX18nJyc7OzsrKyt/f39LS0tDQ0Lq6uoiIiMPDw729vcXFxdra2s/P' +
					  'z9nZ2ba2tqysrMvLy97e3r+/v76+voyMjMfHx3Fxcc3NzczMzNHR0bi4uLW1tbKyspKSkoqKiqCg' +
					  'oOHh4XR0dMHBwZOTk4mJieDg4IuLi8DAwLS0tLu7u5WVlbm5uWhoaHp6eqSkpLGxsZeXl8bGxpub' +
					  'm7Ozs5aWlpSUlG9vb3JycpCQkHNzc4KCgllZWW1tbWBgYE9PTzs7O4eHh4+Pj7y8vGtra8LCwmlp' +
					  'aTc3N3BwcJiYmIaGhmpqalhYWGNjY6amplxcXHl5eVRUVH5+fnx8fKioqEFBQUZGRjw8PLe3t4SE' +
					  'hHV1dYWFhZmZmV1dXVVVVVtbW42NjVdXV1FRUYODg5qamktLS0BAQKGhoS4uLoGBgUVFRbCwsD4+' +
					  'PpGRkUJCQq2trRwcHCcnJ6Kioqurqx8fH5ycnE5OTmxsbGRkZFZWVqOjox0dHWFhYSsrK1NTUzU1' +
					  'NSgoKJ6engEBAWZmZp+fnwwMDEdHR6qqqjIyMoCAgB4eHiAgIBkZGS8vLzg4OCQkJEpKSo6OjiIi' +
					  'ImVlZZ2dnSUlJXt7exUVFUlJST8/PykpKaWlpW5ubjo6Ojk5OX19fampqa6urqenp15eXnZ2dgUF' +
					  'Ba+vrz09PURERBoaGgkJCTMzMyYmJgQEBBAQEFJSUkNDQxEREWdnZzExMX9/f3h4eFBQUBISEiws' +
					  'LAcHB01NTUxMTDAwMCMjIyEhIf7+/v///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEA' +
					  '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' +
					  'wv8QBQQAOw==';
	//f1 = 9crops
	image['f1']   =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAM2SURBVHjaVJPLb9t0' +
					  'AMd/tn9O4iRu4iVum8Z5rk4f65q2abuyajBBL9ukAtIQhx05bBND/AW7cUAIECdOvHYbQkLisU0g' +
					  'YB1DRdnaLF27NEnjPpKmeTlx4iR27DzMoQiV7+V7+Xxu3y+iaRo4Ebl+gGm1zYL4fG/7zZlpDWDG' +
					  'U9NoT8Wh7iSGHGtqF6wn18dsFaDEZQWIzcOyDLz9/gEKiWQKH/94X+al2+98Pnd28VhDj6tRzx8m' +
					  'vhFzd+tNpYeRLis22d+FWDublX5/+kdTS996+8qND1/+5M7tk1pLrq68vjDp9pxBOwc2bIcweRsd' +
					  'sqyq0bx+zHNt0bmMN065bM4Hj8KFvAwAQGpl4fFP73nHPQYTXSunCHMgmd9xDRiC7GvxZG3zzxUh' +
					  'szZx/ipvdbjoMbTd6iLaXOgC2pQyeqNcazaPcruKoqFQJ8Lp7WyrpDY6+/G+h3cdJmKCNXkRUcZx' +
					  'Z7+yl1lbjYSRFv+1niQ6HQS2EsA435bzBQGuJ/VSesXuDxLFLFJNW84ux3MlwxCtk9jw1oPAuBmq' +
					  '0n6lNCjyQrweYQbxEZqMhFO0M9Tz+fnqoTIURHwjQk+GdoZL7gQDLOudwPEimqgwYuHvtszZLR4n' +
					  'WWw1OBm6TBTjD13yuk67Db1ENjYT6OLgybPdpEn3YmmByJaPkNTePcYQbsNRc58IpHquOoTjjeSB' +
					  '8iJdTu3GzCQzFfIBVN3ewjGqx9iaOf6p0hlEMQ1WhBphIKtFgSu2dQbVTjdytY37sXvBmcAPT776' +
					  '/pdf05yRdRQuj0qI1k0eaW+cvwlN1pcS0d8OhEfckVGIrVOU2Tl+IZKCRrJ6cWpqNRrICPo5j2PC' +
					  'XSQsvmFqa/b0u353EKUpkmZvba7B7rd3qEZ5xLuA5HFeLSf2uWufXbfhs0tCtbL7HTEwxlf41S3e' +
					  'Zjnz70pGGPdby1dZ3yBDWWcZGNv7ALryX974op9y+LHSuUmfsp3hYuE4Fx0Yft9icQIA4PHGrN7Q' +
					  '9Ed/pX7+NJWWZf+SlI4+60VLfEFj7JOLr8DD4SoWHJ0/R/dR/3vAf2kC0FHEjcjK442HtM02zwbt' +
					  'mp6cetWCwJPYPwMAUFSFEtYm3DUAAAAASUVORK5CYII=';
	//f2 = +iron
	image['f2']   =   'R0lGODlhEgAMAOYAAA4SDOvhzaaOdXZrXM/EtFJKPv///7Ozqj05NIR5aPDu62VXT+jeyTAkFYZu' +
					  'XKWXkV9JM5yEb9nSynZuaCQiG8y/r+3n45N8bGlUQ6OSgVZTTd/f3Ec4MYtzZPr38q6bkSEbGMK1' +
					  'pW5XSD8xItvOxIuFepmGeOXXvH5zcHpnVGZWRkxBMrWjlK+bj2lkVOTe1/LlyF1JOYBxXMO2raCL' +
					  'cz0rGCkhGUM5Mt3TyaORe3VwZurl4HxtXPn49/bx7JRzY0dEPYt7amZfUpaCbsvGv7+3sDInHJqF' +
					  'cR4hH3JVQ1NRUK6gmpmJfHZjUPDmzVlLRYFzZEJCMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
					  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
					  'BAUUAAYALAAAAAASAAwAAAeFgAaCg4SFhocWPoeLGxo6BAEMAYceOEsPSkgALicwToUKFSEVHxw2' +
					  'FFEFMzgHhAoJPBAtLCkqIUcrQAVChEUYTTEdOQIXDwsNHAMjhDNJPEFQCUMiIDc1ND8OhDsdHSso' +
					  'CAMZRkwXIYczDilPICsyQjMkiwoZESYTJUQ9PYuCPS8S+PULBAA7';
	//f3 = normal
	image['f3']   =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAANASURBVHjaXJNLbNN2' +
					  'AMb/duy8m9jNo0uTNGnzapWlKYWGrNq6TZsmHoKhje2wXXgctkoTEgcOSNyQJg0kmIS4IFUIcULT' +
					  'HmIDwcQGW7cKaGmSkrrJErdJk5AmTuwkjp26JvYO1bZq3+X7Dr/v9n2QLMtgh6r1+uPEbJurAV33' +
					  'QDgiSUDXuwuSBSWi2okh/yYZiCe/PLB3KCh1+SsPrl86dkYtaRGYiy3/ePH2Xb7KnTtxNTo2tQ3D' +
					  '2xZLrM7FFlCpm0z/oTa1D0Y+CjmHmgJdpcRf5n/l5cKpTw5PX3jzq5mzQP6nVim3cGWRpdYm/IdN' +
					  '+uHkCvj4tROtXCcxm1jakIOeY6873kdZ3G113Z+d3yhzAACoI0h34t+qpAy5Tq/Va8ePnMbypTrx' +
					  'nSXgZYn6Istw5efB6IcU9orTPKwQBRFIkT1TSKNJug3xTIEesGNHo2MySAov2zyRKsBYnwXDf76p' +
					  'C/iCXm2u1mRRNICzjxYTW5AS4irXlLCE6HGwuQKgUUGkczSUy2mgjRiw+zSVItwoGEOHUi8otd2i' +
					  '7PifJO95h7VId7NI8bZWmkyxcYdNFejVpxdXMeceqb+PYQpi/ygYHGakDmJ1kplM2O/zu19F0Qqc' +
					  'YRzNypzIZ809LruuyrfJjsJu7LEFxvcNOjwOFUiVlsf9Mio/WcymtCjxblRTrJeg7NpPDs1TUTGi' +
					  'NzQBx5Zb/SjS/isvEAWaJAmdwRkedwN4k0iiCCY7LFy5ttDZssIKGaHppkatZ6oMSYlKlWA2s+XW' +
					  '0h3ibmi3/4enM9/fv5fP6rw2av8ID6RuuiQdmZxGtMbJ9NqDfOM38oWusfwMw3X24BuxrEKjp98K' +
					  'j/4Z864zyojbFhqoqg1uH768e+hzj2sMtvb2mH1fPJ9HpFs3jG3K74rCZSUl1NK57Kdff2ZCJt5r' +
					  'tOjVb9R9I3SDmVuizIYgtL2SEafr6KEPvC7rAIZPOFFi9bzCWZ2ZnrFi/R6kFg0Nba0USWKeyCxY' +
					  'fKcwfOC/KeODE+GLs+Tty+Q6z3ne6eTjcSlO1SuywxKanFKUPA3FaCASsRpN2zz0v+NwAIhCc+nZ' +
					  'o98TD82m3qhvzAzUPeG3jTC6E/t7AGGggry6qvqHAAAAAElFTkSuQmCC';
	//f4 = +clay
	image['f4']   =   'R0lGODlhEgAMAOYAAJBcMPHWwMahh7R4VMdQHP727ci6sNt6VqtlPsltT+rl48JrQtivpbaIZ96F' +
					  'XI9YSOjGr+m1iNphNrxqPvPr3dGomc14VOVsSZxxSeCeduPHvPB8S9u+sqFWLubhwLteNP///8iw' +
					  'lNJpRcmKacldMNdrNeSJY9JuS6VkT+17U9CCWt62l92HTcl5Wvjz8PjdxeDEvLxwUfTQsKZhPNep' +
					  'hfHg2JNhROrYz9jCs8OWduFpKtW3pZtzWu/mz8xvS/B+W8lyQOzMsfR+Q+qDVqxmTPDHp/fy6+Zr' +
					  'QMyZZrdtS+R1U86betSunNh9WeaWaNFgK9uzo7+Pcei0kp5bOtdxOeR6S869tNBZF//69o9jVu6B' +
					  'PqVbN8SRZvKQYOJ2SeHRx61jQeTPvfDh29a2qs1ySs2DYNh+Uu6GVMxyQpNaOPLWxdBrP7eLdOa1' +
					  'jORmN+ZzSr9jNNCslNyynMOAXfb19PTjyaRmQevYzqN1V+aLVb1rSv///wAAAAAAAAAAAAAAACH5' +
					  'BAUUAHsALAAAAAASAAwAAAeygHuCglhYg4eIg3Q5RWFhAS8FiYcKAxF4KAlmQZOCODtsNHMnKV1F' +
					  'nXsCMhQhZSYZEVxxapKDYndLIzwDJGQ2aWA+DhCHVnUQIxNUWiwICwcpVSuHBh49UWhvZ05JTUpK' +
					  'XipyhntWGA0qJVMAM3pAWw9EC2ZSRntfHXAlQjN2FiJVwGRp8WNDnhp7bnwgcEUHmglrJLghE+PJ' +
					  'kQtDEGIZU4EJkzAcGDBgogEGFCgMOLgIBAA7';
	//f5 = +lumber
	image['f5']   =   'R0lGODlhEgAMAOYAAP/////+/v/++/38+/369/v6+fHt6e/p4+7n4u/f1OPc1tjUz9rTy9zRyNrQ' +
					  'xfzIi/fEnvTEkdLGvfa/i+/BcO6+btK9pPSzgOe1g9e4lu+0b+u1dvGxiNe4ht60eOqwdeSxd/qr' +
					  'adCxguinb+WnatOnh9+mdOGked6jfuCmU9CnZrSqnuWgcNyicdija+aeYrukkdqgVNGbctGadeOX' +
					  'ZM+afNibVuOXXLeeitGaXNWaVLWcjtKUd9qXSKmckK+bibWYfr+UedCUSN6OWteSQbWVft2NRdqJ' +
					  'RtyKOsSLV6qPbMWKRL6HZ8GKRZ6MgbuJU8qDTKiJb72CVNZ+NLaBadt7OcF8T8l5SMZ1W8Z4Qq96' +
					  'UsdyPqx1UrB3PbB1P7BxTLtpMaNnPKRkO3tiTptQKHpYM5BSLoxOOGNRSIBJNoFIOHNKKnk7Kmw7' +
					  'LGc7H10zGk4yJ0M0KEUzJ1YsIlArFEUuH0wlEjgiGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5' +
					  'BAUUAAAALAAAAAASAAwAAAeRgACCg4SCChYIAYqFgytOPzUnTFRDVg6MAAtRJRA5ZW0xWGoEjEVa' +
					  'LDdgb2wbPHMGjDMtLhdpcF80WXE7jEo9HSAyZ1wjV2hAhQVjKFVINlBiEVtudweDA0EmE09hdHY6' +
					  'Lw9mcoUJRykfFV51FBgqQms+hQ1TRhxNTRJEIRokMJg4kpDxwABABildRAjAxLBhIAA7';
	//f6 = 15crops
	image['f6']  =    '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';
	//w1 = +25% lumber per hour
	image['w1']   =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMcSURBVHjaVJNdbFNl' +
					  'HId/73vec3rWrittN+e0oEJkCRcG3FSiwtwCBmQjRDKFxIwLkuEM8TMYP4hoTPTCC2KIIUG50Ghw' +
					  'KMaQgHxEMWPgwDWjZSvb2AbLVunWr21tT09Pz3v+XmgWeK6f393vYUSEe5nNJGKTQ7GpG40rH18V' +
					  'qleFy+WqBLtXoru4NtbfN/L7xdgp9izwMN4/9hYRne4/fvrqz0RkFs1FUyzu/+z/revLva3rtgR0' +
					  'P1mADsdG31DPJ99/Ueev0QRveazFNBzdXQFAAChb1kL+nzd/2Dc8MJFe+NGturVHNF7kzpzc81VX' +
					  'NBJDBQuPRve0dWxbu3VV6AmmcA5A1cTl2KVIeAgrkJxPJmhGz+nBQDB2aySairElCnSaik/v3/9Z' +
					  'JD7AFA5AxCYGPT47m87xInMqmbhflJ2yaqipRObU2FnxgGYXLJjgIeGo9sFvj6gFrblxi+JZXfnu' +
					  '4Q+mZxMZ17xMmghwWYIsSils5lHEAn/tpV3bG5uGRkfMoJyejP/UfZI8pLAV/Hrv4ATdNlFkJgvJ' +
					  'gCp4QSuRJgkOpenTzvc6Wt++cft6uGfA9aAu5+2SanOjaKIGcOAvuIPL78vDMsmq1WseqlimMdWp' +
					  'cg4e/xqAvQRUBhkELwwYfO3S1cjC5/N92NL1aO3SdGEuj5J0pNfSFTC4UOX3RsIXu8/9guWwUiVY' +
					  '2PHMVkzdubVt95oDh1/Nl1IX/u6ubw+xFo5mKJuUp99o6Ni3sXf8TN/AH3geaELdBv83xz6yrTyI' +
					  'KDJ8/ma8p0Az5UKq4fU1WA80c2zEKx+/eOLXQxveeW48NXjg6N6mnfUnrxw15Ky0CURUKlvjqWsG' +
					  'xXv7z/DNKtqAp1Ddpn939siOz3eiCp2HdpPM3py8cMcYzsyl/z+XJlS3UzOTSvprqzY1rPsrfOnl' +
					  '9vbWlU82rd+ckwtjL1yp9XlL3PFWL0Ne91cHALDFAjLZtC2M0eGr0ejl7bs6vcKfzCU8QpvPzmou' +
					  'n1niAb0uGKj+T2Z3hyPLjmHlijJnmnnicBxbcM3rDlCZV1b4VE1ZNP8dAIcLlNu3u2RsAAAAAElF' +
					  'TkSuQmCC';
	//w2 = +25% lumber per hour
	image['w2']   =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMySURBVHjaTJNLbBtV' +
					  'GIXveF6djD22x66fTe0aaJyEiDzaNCHCoiiFPkAqLKDApmIJCzawAIRYdM8CxKqV2EBVsWkpLZVo' +
					  'kQKpCm4UGhJsxaS2Y9eOOx577BnPy565c1lEKjmbcxbf0b/5D4YQAntkDyBB4Wtbfzwo3WVoJjN1' +
					  'OkBFLQjdbvdejHiSTKMv682+rX959dO7lescGbCAUdHWPz75dafXaNZrcf4QzdC7sGvXdE2vSYUh' +
					  'D1lWHywVbhAq+4w6GqOS3y9d/OLyhwDRgZBHVlvA2XvNAaL8yOfxeajI0ubNQ7G02VLaZkEVCBpy' +
					  'N7OXSKL61vMXNozf5A393ZlP9nlxDCGUL5VuCRdkRzhozN258/NhNrjlqm+4ZbELj4LAmeOot++x' +
					  'UUqu6cVHpHiGO/f5ye8Io73+69rbV7bzwA2GPfdpI9RtwW1cN3nKaWlqHK7cazsAMHxNLCAPGw0f' +
					  'SzkI4rOnwE8rt+j2mF10ysuw0R4s4/UarTkFZdamKhpxdvyDIc2TVYtRLtLXNZ8nOhKfIG78Xd/o' +
					  '8OMcFWbp+cVBp+O6fTs42KYW513vn+jfb/DjsRE5bDZFZBWqslnPS9mOLOKvv/oiY+M8hKOLO09N' +
					  'qjZwQRlN8rNTPtgLwgRr1ct/1jurmYM+vxrqxQ162qQQSRwZWZg8uhDrPr6c+/bHX8p2D8OQlnpW' +
					  'WTdRtaonCe+YUk0kcEG53mDCW9ogd0048EIRkwypIm8Wr3xFJWd/KF7LCff8+LBklGMT4ciwr886' +
					  '9kOHXJZjoRmWMhjfaK0hvHPuI8JL+dr1xg5DTh2IzaBMbeX3MaplpV/2Wkkpvy4qpS4pzyVOv5E5' +
					  'H5qfzq1eTe+kjk0uEC4XNjdyIpp8OuLnQ+kpqlLxl3P/jgZ70Xw4xyVap+j9ocNjqX/E7HE9zg5F' +
					  'E0eeAwBgu68stgXRKAeDgX7P+ubie0tkFg4B2Aeved/87PwlyWq2ewLQ0TA/wXm4/2sAgE5XUvqi' +
					  'qGyXa/lmU9pczfrTyVcyZ6N8GFoYBViO2u/387swtnc49gCqpkKyNDTaD/9aTk2/hFxIkRWG5ALe' +
					  'CE5iT8j/BgD2QplKmDyYIAAAAABJRU5ErkJggg==';
	//w3 = +25% lumber per hour, +25% crop per hour
	image['w3']   =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAANJSURBVHjaXJNfbBN1' +
					  'AMd/96+96/Xvtb2Wtavtev2z/tmaMTe2SQqxjEXCvwR9MfIiEXnxhcQHE+ODiQ+gIYEXiCY6EkOC' +
					  'M+oURBZDXJg43dYWxsIqo7Su4+7W23pt6b/d9XyAyOL37Zt8vvm+fL+Qoihgm1pSc37pD6neEMps' +
					  'JNjPdIQBDCRJRjFkO4ZuN2JJfPvinr/5lA1xqOyyZz0srat6ArFE5HUdbjGSNE6on5HQs7aSzF75' +
					  '69NCtpBaTuoUCnFXq66MFjHMTPKPZ8DVM5cOvHIkt5rrMPkNesPzWIktv3d5b5JYkFdBr3W4AW9W' +
					  'aptOJMhVMjTuTnS/Fezf6fQwkpgTN+seS5TUalEAwFcrpx9uLehzHVajrbftnK2yoQa+yxhh6Zi/' +
					  'd2h07xvT507WaSvz5vskVFgTs148jOb55OXpLyg/RlvNp8fG7flkcOPlBqqul7hYdCgW8rOlOzRD' +
					  'CGsPWuJDAlZLalWzKSGe3fqpid/dSvDU6AXp/t1fv/+EJLw6Zl9ibIR/MFvL/xywFIgdto5wF7a+' +
					  'aITWko9m8kIF6dvv44s5q2urp5+srsM1WQsZsM7uMCqmPGSmyNfaAJhNehTCYQlMFme/fjoOwwja' +
					  'EptYV51HS5/fPhOyuo6+M2XX2mviY34F8kQj5qeZTPaJo9OFYEBot7+7n04J9VAAwKRTx/FNyyNm' +
					  '/ibILmv4ny6tTpzvovzFtu7Lm9e8bkNiKCoURUgpEzDrzxoS3NF99An0UM8JYeKbIKwZiX8Ue21w' +
					  '/MJJI+7Opcw/Vs6yGmHpt+wp30GPTX8vncwKlpH4u6W1Je9LXrSPGVjoeXVx/tsPj13/5Z8riypJ' +
					  'q/Cpax8YtRalqflBmHM8cQ0HurlWXzh+WIY277aauEoPKYqS5wr3lm/Edx+6OPkZl14AGokZOjKw' +
					  '5b89dz0U3wNXOYrZtcPhkBobFbHspXeiCPJ8XA2lnS38CRlNcvpWafqW/fjHHLeo1OqBgeHVlaTV' +
					  'FdmS6rVyjVJ32mnniynjEGwjfTCBz7DsePoqPJUk2la3PmzZ8FGd0Yq4gci4XeunTOb/P4AymYEM' +
					  'ugePD+rglfyc1+Bzmr2YQmJNlRl3UzoawaD/4H8HADMQb3Dmz/46AAAAAElFTkSuQmCC';
	//w4 = +25% clay per hour
	image['w4']   =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAALeSURBVHjaXJPLbxtV' +
					  'GMW/+5iZ63n4EXvsxiVx4ySt0waSBVRdUQRCYsGCHf8eqy5ZI2VRqaJqKiht0wCBunkpDrHj2ON5' +
					  '+M7jPlhQRRVnczbnJ53FOUhrDR8oVzpOZyIPhcoIMUERkzCHeaZpfRhD11hWiEl8EfSfqZNXppgT' +
					  'LXK/yT75UpOKFtqmlQWvdQ3T/yxKwqvJq9FPP4T7b9aXbqRRUAA1hwupJKUH3yJCUhmcTcKmt+w6' +
					  'ZQDAAJDw+DI6NEhYXazfXFmaxunPe/0Xb89RLhSf8yQDQAhjaulhfDznyfuSO092sJX31ltYRnh6' +
					  'EL89/HPnSbu30tm6M/M3X/bl3Y/XSjaTSlFCdE6XGrdp/3w/MU4/8jpapAAoDHIAemuzhwzS3/+7' +
					  'fo896PpKDUDdNFUKfFTkWWyW6CwaZTBqNzcIVoPdx+Onu5str85YEszDs0EWFcjxnppXJ03je2PD' +
					  'jmKVz8M2R0fnr5mNIf0n+P23wY+PfL8VJfPp4J2mVm/7M69Ei7SYEvzH+Ko8HDFVGG6tuvUFLZQm' +
					  'WhlKO1W7+83XZDA0Z9HZLCuE0EpFXLjMaGlUctwXxZRbtptE+ekROr44UJRjLSkSVnFRnO3lg8vg' +
					  '+a/zTHRW1zhPTWoYFAPSidBKahtlcu0hNTGLiykz7Vzik6HddG97G3Vbg4iTieV4iBzgOcPQPo9V' +
					  'GisNQ9tpb39F65XF+HIiQBFCE57/NSttbX9eaj90j3bFqA+NLjPLmSrkipLHbwgzSWV94cZdpLW+' +
					  'Ci7H/ISVGEaIIMRnF+Lgl/rhayHUNOHJ/e8Cp3Ont4h0KtK8VlqteA0KAPWqL2URpkPKTKx59vjR' +
					  '9OXeaTJr+E3v0/vV9W7Nqikhixx7xnLFa7wfFwA0623fuaU44oKy1a1Ks8GpixzX7N4zyi1QSqbY' +
					  't5dbC4v/fwAASKnCJIj5WIzfGcClYelyxyCObZXLTo0QfJ38dwDmF43HaQvrfgAAAABJRU5ErkJg' +
					  'gg==';
	//w5 = +25% clay per hour
	image['w5']   =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAL8SURBVHjaXJNBbNtU' +
					  'HIf/z+/Zju0Xx0lTmiZZ13XqmnUwJLZVCA0khJiEhLRJ3HdCXBF3TtwRSNxASDtwASGQyoWxjkpo' +
					  'HR1jFWMrm1jEQpqmsKZxbMd+fs/Oe9ymjd/5+27fDyml4ImxOIl4rHRNEiVBEamjHCgxbcd6EkOP' +
					  'Nc7Eo2AnkWOkS5J29GQfFJnQEtAGj20LOzOlpmmZT2lRFO76bc2CgmWY0f1k4/J4665t6iOR2S+c' +
					  'qJy7GGTlyZg3vGOu6wKABgBJwvpB23SRTiwdE0vjFOHuzsHNrQe0WMHYmORgmdQuGb3RvTiOAYBM' +
					  'JOzzgVfzBMuwhjv/CC1vnnxlZUFH0Tg78sZLSeHEkFcxj5WUtGJIYACOBpxt3v30/S/fOYiHnkOT' +
					  'v37eWft64+NLpSBvKHlv436ieYRgUHnBQMN+eunqJ3e6m2Swu3Ho+g9vDqKp2rqfPTzcvjw/GCSA' +
					  'yyzECt+68l00MVvn3x1LaTvuH/3VW521lcXT6NfNz8wfvzpCin2/E7oV1/Sa1VK7P1hbXV1cPna0' +
					  'Utrzg6UPPiK1ZznnmUo87GoJJvmD9nD7t4PG8e/Xt+erpbcuvB7lOeeCTbWoVSzMLaetKv/lW2T9' +
					  'ZIFepq44+XLqHEJ/rn6IbnxBphY60WTONesEejErmDrb6xUON9PTLxqzM9GVdb7dZv4OZ6nz/HP0' +
					  '1bc1++yFg6VW7gfLlrQtdc0R0kb7POlGXdFq1VcuCnL8hnuG1ZuTlIdCwe2bbqohpdSdrc+Ta9/U' +
					  'Mn1vYfb3Oj1jLNW9oj07E4hppdEojnI2nGYP9Ud9ItkgK82/9h5SSoXxqPvvVQtLYpZNo2FWnun0' +
					  'elHAFo/W2NjXCTENO8dYYBEG4VzllIcQAQDX8aar50bib9CVpmk4DUQ4SvwgF1TXTSUVE0kmc8Hk' +
					  'TGHOQ+iplP3RaJjsChUhDMUiNQw9HnOEQGRCcGEArdJm2av8/wEAMMmUH+2zLMxBEIInMlcSETAs' +
					  'wy3Taayjx+R/AwAykY0CTY6IIQAAAABJRU5ErkJggg==';
	//w6 = +25% clay per hour, +25% crop per hour
	image['w6']   =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMNSURBVHjaXJO/bxt1' +
					  'AMW/v+6+9v3w+YfOOTshjtuSJikNrdQOIUiIIeqSii5FQmJhQGz8AZU6szKgLkjMVNAtEKiISFCr' +
					  'REBSiTitYqekdlP7fNi+8519Z9+vL0OjqvCWt7yP3vIeZIyB1xRHUd9zgHco0L7vEwB5RFRIzwkJ' +
					  '/HoMvsLGI9+wGs1et2sPlrQNkbPtsQqZJyXZINQseE1VF1KJU4y8NNvuG4MjD8D9w2Yh1ZEEKQ5I' +
					  'LpP3Q0CxQ1EPDO4ZjUegsJqSldM21/PckRUn0djZT4X7MhnZnkhwaDuDpKilhGHoDxkgcTR0PEWe' +
					  '/EwQZAQAqOuVuwdf/P5sx2nUFFpDigyxGEbYNDscMCALwjAmBGG+IFLDaX8XRAC1rX6rXTFaNYwd' +
					  'E85+c7fdelpV8naS65eKYuD1EInEYi7woygYEk7LCDUONWH9722Sjofjs77XyZeVysGzzuF9KT32' +
					  'Qx5heeiDJLIWi4NyuRSHUhR7w271xHkbf76Ao/2NnZZNBDpR1Kbyxewbc3vf/6xazpvKhAZpx+Kr' +
					  'fbHbPclSUyyeefD1vcqvj0nlcU3TK5dmTooXPrWfOJ3N9XSSX3i+k1dEVRgLwMe6eTyzPJr94P6j' +
					  'zeral2KhvPLeJ6S4slp/WFs6fzGkGbi7JTaewFR6cXlZb57o1V0z5nLT86O1r6btp7mPbgW18yCM' +
					  '0nOXiHr1hpFPCBdXtra/5fc2L2jnUAL2B6O1h5XG4fPyWXVVnbp85YquH2Pz6ObSx9u7P3m2DcOI' +
					  '6a4uS9IP67eVrfV30fwv9YP5xXmRSn+8sK5OiTyFwZnL/PJ1LyYsdDHjC/IswggkAmz3muW5dzam' +
					  '2R3uT0lLqimualRyez/6lA7e/9B7aynks4iFju1IcILjuNNNtv55waB30P3rN33ruivGRvuBY64m' +
					  'JtPXbriK5hh1ZWLGtfpZOq3lJ/8z5a7ZYSigBFnQgcw7PurR0mQpzQ+6ZhgyMI5VuZTN5P7/AABA' +
					  'FDDTNtzYZRhgGPn+CDDIQZrkUhlZxRx8lfx3AFiEjF34k/R2AAAAAElFTkSuQmCC';
	//w7 = +25% iron per hour
	image['w7']   =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMUSURBVHjaXJPJbxtV' +
					  'AIffm832LB6Pxx574rhZWqdx2qSqQEJNG1RA3EBIgNRDJW5ceuTEH8ANLhw4U4Q4ISFOHKBlV1tC' +
					  'aKkJOImTuPHS8T6exW/2eRxAVeF3/r7b94MYY/DUHORazpRkoghHYRATgCAhzSVElmOfxuATLQ7A' +
					  'aKphyosTqFY7IEiiurboOR4EpOfEHJ1RxHIylfiPNrPQ7uMf0znu7sHX68oWS2ZJSGUVHjkoiAKB' +
					  '5wzTjD04l1kR0yIAgAAA2LY9nLXGQefjn97b3X/ARJnyYsEiuphyu039/p2TMAgFThRzXM9qWJYF' +
					  'AKCiMNamTT4PL/JXrMdYEpcHmq0UAgfoO79awUjJsOXJwFk8kzo+GhEUHs1abLJKGPaYSbvjgXn7' +
					  'q9oZ+aUkrfg+7PSbKrWCtHQildq4UMW+0O70EJoZU4fmw1mgUyHhtDvde98dFsVzhmlmxXzEP2oZ' +
					  '9d/uSOcql4QMDSCemaDXsK9cXZHFzL5W180WvLvzi2H4yPYstycUw8lwdtytldTiMvsaL6QkOWM7' +
					  '+mDYVZWFcVxneLtfE3lBoBKUlOYxl/TtR05veP/zbz7cvLzZt9DB3kdL82sVWAlZDcmjabL3yc/v' +
					  'j3XtWvmDslQg37rxervbsq0pRcPlpfmNi2eFhPrwj4fbjS8Wqpm19XIArb7bLublPKdEPlBV4dKF' +
					  'LdjU/uzoDTW3IGW5oWa2TyaRlwQxieiD0xvpm5/dHA0m79x496ihKVJRzvKGgc6WnqVOydUI+gkB' +
					  '/7V7VNseri4+oxREP/TXxef2Dm8pc8qbL7x9SjzvpAWaoNXCXIpELCNCjLHj2r83f/j21k6OWY05' +
					  'HQN8ee3llt38cvvT66+8+uLqGyeTeoplMBENexNVqMhS/t+4RpPBYa/mIBeyTuSS9/ZvG2yz5F7d' +
					  '2ni+tCR5XhDjCNmOxMyryjwAgPonzVxW4dhN3WtDiNOcdGw8qO99f36FUAvFmTPyUETiZJGrZCX5' +
					  '/w8AAEQBmJh9FBoSL7d7xxGDStJp20JsQswKCknDJ+TfAwAS/pXt2bIF7AAAAABJRU5ErkJggg==';
	//w8 = +25% iron per hour
	image['w8']   =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMFSURBVHjaXJNLc9tU' +
					  'AIXvvbIkS7L1sK0oqWOSJiGZ0jYJTsuUaQoLWHSm6bY7FvwE/gK/gDUL9izYkEynTGb6mgHaacmb' +
					  'unk0dhw/Jct6WZb1vCzaoYWzPt+czXcgxhh8kDAKDFNPUIhxQpIkACAJYIYRWY79sAb/xaIoOKpW' +
					  'RrGlTApDLyBJ0h26Iy8QsnwUADYlKEKJZui3ZfSOSdyT5kGzbekqOj+1JF4kaeLB81/bDUPgxYxA' +
					  'B4SpOXXHGbxfi5Pgt6cbDD1xZaF8dHzUbqlZKVy8Nh1FcZwkaZoiUMr2zEP1eYlZnJNXGJZBOAE7' +
					  'e7sMmgJ+1ug5oiCUSuN6Cz15/Od2/REvZKy+12g2QYLMFgqxN0haAADY6h9vHb7IM/P7r16OKTlF' +
					  'WNBV2xv63fDZobmp1by1m9/OT5VdC3C05CVGz67dKn+ZUodVoFT7rllagoDsGK590Nvf2PxFFLN3' +
					  '1+5oEBKhAuI0RRGjyPd9eHYQ5emzlNPKDGxZnoZZRorCJGa80px0K7jOM7ksOfbZF7cHfaJysiUr' +
					  'vMQrjjXAcmPz/GEqdCj38GJN39gx16+Iq+WFGzyXm535BLM+6hZrjj41U5ynlmEqCHBvZXU609W0' +
					  'Hof4Qpwe1yxfZ2lp4cLnu6/3Qh98Kq+92P7r9/r9FEC1WpWkKa3rnNfVv48qxczlOyvfwL7d7gVV' +
					  'EJMslHKSXOk8Y0juknLtVHu1dfLHBFwOfBIjkE5TXbXN8mEmD2cKy4ijcsBPF+S8NTTuP1xn3blh' +
					  'R3rTq8zIsxAzx+1OLj8ucHnb9EY2sbdz3m0bSmEyRdFUjpnsqXWSS870nbPOydLVstEc6HrjtHlQ' +
					  'NZr8hJ31i6f2dpoWGRYtXVxFCL5zsqO1zKBBcdj29Cwrjhz884Mf+QJ1eXbRHlpqt3/96k2JLfLw' +
					  'wsTYR/9RuW/optdFVILIBEfE1v7ux/OTPz353h153339AwHpYm6WZbn/PwAAEIfYcFQ3sCLsE5AW' +
					  'MuLT1+skSn916R5NkYB4f5x/BgDBsY+vp1TMfgAAAABJRU5ErkJggg==';
	//w9 = +25% iron per hour, +25% crop per hour
	image['w9']   =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMKSURBVHjaVJNLbxtV' +
					  'AIXvnYd95z0ee+yJm2TsummerZpASUJBSCxQiwpSV12Vv8FfYM0GhISoxC8AhASolAgoUmgbKoSx' +
					  'HQc7HVup67E7nqfn4ZlhQQThrM7ik77NOTBNU3AmluEePvu94x5cXXyzxM+P7AFPCzydwzDyLEac' +
					  '6bFuPD3sa/cffllg8Ab9owNXcrTwZ6c787HzVVURqwR5ysN/bJZlfXR3q6BIr17/sP5oX/Lsr729' +
					  'NxbeK5JLUSgzLMKZHkXBsrDOMhwAAAMApEn8Vf1junCFhtf1RmZZvvEEM9bk18RwaaTT07BXkNH0' +
					  'hdJqngzsVhRFp7bH9QfauLtS2Ykt2nIsjADjwcRP+himUoSuu7dhXBGpT+ZKF8JMU1HEqnKJONa0' +
					  'nuYquZdtPUGCGXtmXzNIyHSfdcWi7+kHxihB/NSW71NKhFj74PhhBrBEb+iZRixQHkeyvp1YVtpz' +
					  'HsfI3mt8P3rQevedO5n+zfKltc0b2wOtHqLIj4J2t4Pf3lFmVMIo+cbJfr19uFgsnVtMxZy+oMyV' +
					  '1ctbV9YrtfkExyIYzWaJ2RZzyUsiV4A/3fuMX1mxTBfgQzZpqHxCQhGHFJXDHnX8n9tetSYd/dX4' +
					  'rvNpTdi9Bt7nikiSETG/sRbo35zD2bJIZQURhFHo0ziWAX5/Q5B+cKX9J81br9yM8TCDCDIYx1k8' +
					  'X67B0PoVM+8CdDGOgjSdZelMmlKD4ZCheAxSkCVeJKXpdNnuMRHZC9DYGp9cXb9GALRlGb/ksAku' +
					  'FcHMGGp9Y2KDJOXVGlOQQdR0tHYzBgEWdo/qS6sLyxc2BVSBaZr6rjY+/qD/POjrCOfUfKEaR6PU' +
					  '6ZrxkesIJLx4eXcbiRIOE9eM5rhVgeMJAABiFifwzt4fX6ir2zuv71r+UxJuzKZvnbS+ZUsLFTGP' +
					  'iBiHyDFMKTsvcPx/mwQAeGEycTtu5Nz77XOVKm9uvk2z+SCYOL4X+DEWQplTpVz+f1M+vUCUjq1B' +
					  'DMDzQQsxWU6UoyAkQBaRXI6TcRL+S/49AEw6efZwFG6nAAAAAElFTkSuQmCC';
	//w10 = +25% crop per hour
	image['w10']  =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMGSURBVHjaXJNbb9tk' +
					  'HIf/r89ObMdxTs15LVmzdQe6rZo2xBXsHq4Q04S0r8CH2FfYBeJ62g2TJigCUSYNwRBdOw1Gmx4S' +
					  'qiRL0jSp48SH2K/t11yApsHv+nnunh+KogjemmM7tjsLwGNYikIMCQghIAtaLC6+jaE3mjfHx0bb' +
					  'I5YqJRGPbNtvjl7EOGFl4fpQ74l0IqdWeJH7jzadTfv6vpxKAhtsHT5hHJfFHEY4oomkpldqHwTu' +
					  'fHo6LWnnEkoCACgAcN15V99LLCi+0361uf7qtw3XYBZSl1V5DZFCp9l6tvHFeNLOlUpdfce2LABA' +
					  'oR/+0XyeLAiBRz3deHT12qery3UPAAF4AAQgwDDsbf25u546U1qu3sRTcia7QjmOQyGk8MnD4XbL' +
					  'GC4v1XdH/c2Dv8wQZIC5A8MJAWltDJmvfvlSEVQf2RNzjJ42Hk9I+9Y7dwbOwb2Hn2uw+P71SzhE' +
					  '+kldZrAzP9IYQhFbrSRpvpZPX6CZGe1L9Mef3WoMtleKa5pYWq2tHXReTAZRuZzLkucZ2Kpn8eUK' +
					  'e6UWWyoyZcbqjU5lrRoGIWoP9mUlhsE/dV6/Hh1eyn+oW4Fv7V0Qf2SrZ8GgMcYcRza395aKEmKl' +
					  'A3yjlF+kgsh3wMTOrNVofvf9+lHrZV6NWKnwzU7myddbrtXnYoE5swSBjxDdGkuMIDERg0xr9tPh' +
					  'w0Zj972Ld69dfHdsTR88uK/EuY8+ufv7y5+No/XVslepnhWKebez/+vwavXcFcEVUOiTve5m09iJ' +
					  'MJcQys+Ovs0w6Rvnb6az2bisNbv9buOHFH3CwNTC/MLqbZGWi0oNRVE0NQ3d7XAi0vWR5ViL5TrD' +
					  '8n7gQkjFRcUKyaDXGfWaaq6QVBIZvqIlM//GNRz3dbcbV8QYr3ie5+H5ybERMjYw/mLmPLCI5njb' +
					  'MMUwkc+WAQHzT5q5dIE1+NNZz0bHLE9znMDzrBmEFAq9YO5aLk3EtFTS0qn/PwAAQj+azE6cwAwj' +
					  'HIvzCNHEB8/DcU5NyhmaRW/IvwcAoCGKmPbarn0AAAAASUVORK5CYII=';
	//w11 = +25% crop per hour
	image['w11']  =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMMSURBVHjaXJNLb9xU' +
					  'AEbvvX6MH/Frxs5M40ymoSEJpALaRohKtJQKqQhYtCsWiA1ISGz4JfwC1lVBQogFAoEUVQ0BWgXl' +
					  '1YRMmLRNmmkynbHHj7E9tse+vuyqlm99zu58kBACnluWkSC1/dBSZT1J4gIXLOJEThFE4XkMPtNG' +
					  'aRbkdj70V7Z/+XHph4/f/ezi5UsUEZ7220UOJFavaY0Sx76ghVFw7Dz4feXOEPc+uPYlXbCO5XS9' +
					  'ez7fv7JwQ+HVvt8NvGhCeVlVNQAAAgB4A7cfPZE1cbo+3QuCP5oroqi5pY5PhXxG37n37e3VWx27' +
					  'pdbkbnwYhREAABY5edTZfZLu1JT6rL6we7LZOTmWK+X7/y6dKc/Pm5f+OdrqRT4LMgEV9ZkzE/q5' +
					  'Cl+l+35XFJmN1tr0OEoGuqidvrp4eal5y/XQW1c/H0LwnjmbAeDE4Phoe3311zV09/23P4FHVsvL' +
					  'wjx8qjJW6ASqJgtaNRwyfzfD2+3vERVev/jV4swVXAAegZ4bHbTuTlWnYOukmQarDeZAGstIAQlk' +
					  '4gSL0pg3Un5uedt7tj08+OKjr2VWgWw+V9XbBbBOHsCl1d8W9HUJhuu79ptvVBGjjvAYRzlUaQiE' +
					  'CwNXcaLRN8vfNSpzhjDNYm25e5OlYtg83u8c/nTO6A1SVC4bWRIRxMsSwqMQAYpmKFjCfx1a6sSn' +
					  'CiXs7G/yPJKYU3Rdn9x7aCTZ46mzc9jjaFJwMAEsolmapGycUQLrvCbNPk65DWfFNOt1bZbBMi3Q' +
					  'XMOc/3N35yVrTZOVfbe73N17lXv9/KlxQ0eVcW5749Bm5qVGv0QEU53pO+5p3YSEkCgOt9qbnvWQ' +
					  'yrIBDdwMn508T1L3/t5NZcTw6uKFdz7kIcYg71kdU3qlUjYgIQQQ4Pi2D2xGYKts9ZG15YcDOtPR' +
					  'GMQJMnSVodNhHCXDtFKaqo1PvpCy6zl20AYMtqJ2kQO1VDOqZQJIGA3iYcIhuSKaZa3y/wcAAHAG' +
					  '+oMOARijFFEkG+U5LmjA8oysSQbFwGfkfwMAgcyOomwoRfcAAAAASUVORK5CYII=';
	//w12 = +50% crop per hour
	image['w12']  =   'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAIAAACUZLgLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
					  'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMPSURBVHjaXJPNb9Nm' +
					  'AMbf1/br13YSO2kap3U6UgpdYYgxgpCYRBFoh0p8bENC2oFpl104oJ124B9AnOCOBEjjhMRpp607' +
					  'FBBVUYvogH4IWgipk9VNXNv5cPwR+827A1L5eC7P5fe7PQ+klIKP0nKp13mNmS1AexAwLMIB+SKZ' +
					  '1CSJ/xiDO5rXAzXL6Xdm8miWYSBiC4ihsL9aDk74wskRScwO5Hc07n1ZraBhPkhivTBYZ0SNuOL0' +
					  'i2nTrv1w+JSWhVsAPDOfUqM5deDnD5rbdfz67YLYFTgcRwgSwiZShh4YjTY5Nib07CL+eyt4d39x' +
					  'acMxfzl+WQAIUkpt/Y4EF/vsfpaNGOD5fk/ODxhvHEIYdddYFLYTw1akew/ffnfrz0tjB3df/fUf' +
					  'rtNax8wy5EYhiEjkY0lAOTkyNpUUQVhEnMELZGF6ZbVRmDxXvD5884m+0HRb8N69i+NqpXTqUmCY' +
					  'gpIAwebs/LuKnWOxwsMuJB0KYY/dU5o8PZSTQ7s7t3K/zUBurdbzTbV0yBbUfm1leWUj2U6c2XdE' +
					  '1mS71Qk2Ny1RyU+UvjettuFyqLw8f/tGYuoifLQ498fsNaX974niVAPKLZo7uufoyW9egk47ZgY5' +
					  '3geo70e51xvI8+KM9lXZ0XV9iRMi/uvxgyHdq2kXhodTT2buCM4MCQa7HhfBSIaYem0Eq4eGJD/w' +
					  '47icHj22K/MTLFfXOSFWswU79kNjYbRQAxD2TN4PDNjvykMDgBAQMt0AMiwWVWfuoaMUr8A4it80' +
					  'ngtJDsJ0eekv3Hw09uUIifqNbS8GCS8gmRTVBlE2PwTY6NnTpZe1w+fP/gYppZbdqPvltJLcquqv' +
					  '1izTe6yI4oj6bSY/wXNo9dW8WVkr5lyMfcMf//HM74qIIKUUUGA0qs3oPx4zSEh3glDCiYKsPli8' +
					  'K6ZzR3ZPres1o17BiC1NTKYl6ZMpW/Z2M6jHTJfHSJRSVrWyVnuuFidGs+NR7POMnMaaJIqfPwAA' +
					  'EPeI09kOiRv3wxiE6WSOEuB6bhJnBlIqi+AO+f8AR/GJ1vfx6CgAAAAASUVORK5CYII=';
	
	image['save']  =  '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' +
					  'QmCC';
	
	image['note']  =  'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0' +
					  'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK5SURBVBgZBcFPaJZ1HADwz+95n3e6uTnR' +
					  'EGdljRKtGCYiHTLxkIUmQeeCOnXzVnQIoi5BQV08TMo6GIiHiKI6ZEWgszzEmtpqSDP7s9ycm9NN' +
					  '977vnuf37fNJEWH/G6df6l676vki2YXVSCAhEpFVOU8uzMX36daNV88MH+oApIhw8O2zZz45vOuh' +
					  'okjrgoYAIALC7NKKEz8vmP67fee3XyfWjwwfakMJRSNt6yob68avaRQpkYhMHVlVheWV2r6tffYP' +
					  'jNi4eLyncWCodf7jI1Jr6sUSUkq9EdHoajQkIZALZOpEIWlPf27r4jndQy/oH9xp4c9tJk4de7eE' +
					  'IEGBlAgJREqKRP/yKXVcsH7r4+Ynf9eVOvrWbtK7YUt/CRBB2SBJIiW5Doqkd3nEllWj+gef1r56' +
					  'UldP8tfYhJt3UhTtuR0FRBAoU6FISYFGkaxePG1LfKv/gYNa/30oNW9o9vbpzvOOXj+wsvvwZ5cK' +
					  'CGSkRJGSIiWtK19af/uU/gef1ZoaVjRXdG7db+bMed173zJVD2QoIFdEkBG4fflrPYs/2vjIMzrT' +
					  'xzS6QvvWfWZGRs3tGZY2bFdnoICcQ0QQTI+e1L3wk5W82dWLR2Qtt+fvNnNuwuLeo1LvgNXNpK4C' +
					  'FFBn6iAysxc/8vCel636Z8SlL84a+2be+Hdjlh57R9WzWaDZKFSdCpSQq5AjvPlLx9DkrM74VwZ3' +
					  'POHm7JzJsUk/7PvU9Sv3yipwYlPTSjuDEqqqVtcMrG0a/+Oa9z8Ytnv7oOXNOyw9edyjffeIIIIL' +
					  '1yqRw0qrAiVU7ZyrnKNTS+te/9flFCYlkJdIS5UcRJEUOSnLlKs6V1DCSqueWdPVuOu1oc6aiCgE' +
					  'GdDfXYIIuptJSnKzkRbrKk9BCSnFe0+9cvq5lNLOED0AgkAIIEAr5zxaFk7A/5IUWNTkV3l/AAAA' +
					  'AElFTkSuQmCC';
	
	image['shadow'] = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAABGdBTUEAAK/INwWK6QAAABl0RVh0' +
					  'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAlSURBVHjaYmRgYHBgQAMAAcSITRAggLAK' +
					  'AgQQVkGAAMIqCBBgAEtkAUah+HSWAAAAAElFTkSuQmCC';
	
	//gauls
	image['g01']   =  'R0lGODlhEAAQAOZ6APr6+vb29vv7/Hx/Z8nJyfT09Pz8/PLy8urq6urr63x8fPX19L/Bvnp9bIWGd1RXSlJTTHl5bFVWSW1vaKWllfj59/Pz8zs8OvLy866uq62trfz8/enp6oKCeWlraYGEcbGwsd3d3czMzLe5tnBwcaSln7e3uM/RurCxoWRmV4SId9jY2M7O0Nrb2IeHh7q6u1lZWby8r5aXl9rdzsjIyCEhIGJkWvLy8cvLzENGQNLVyMDApmptZQsLCYGFcPj4+aGhoVhbUbi6ooyMjJeXhIuMiX5+f9HR0YCBf4OGc15eVN3e3d/f37S1scHDwH+CdXV1YqOlnWhrXJCQf7CxmsXGqLm6opGRkZiXmoCAb56gmPHy8NfX11tbUKWql/j4+KCgoNTU1O/v76enp36AfNbW156ei5OUkpubiWlqYpqej+Pj5KutrP39/Xd6aZKWg9nZ28/Pz6Kho7S0n9fX02FhYPHx8YyNdPv7+6anmv///wAAAAAAAAAAAAAAAAAAACH5BAEAAHoALAAAAAAQABAAAAejgHqCg4IGbRklhIQCFTpOLCB5M4qCAWsraVlCVBRRCZRiNGNGEURmcycoWi2EFgRDdVM7VVYdMU1bhAFxLl1KDR8OZHAbigciVzA5SU9oZwcAigVhYCQQbjJ0C5R6ACEaHileZRjcel9HWCpSDAIG5ggvSBJqP+bdXHI8PiP3eggmJgwIsuReARxFHkB5w8EcHiZALtwZwOaeHQIKavSwceNeIAA7';
	image['g02']   =  'R0lGODlhEAAQAOZuAN/f3/j4+KGhoZubm1JSUlFRUWlpaYwVAISEhJmZmdHQ0OTj4piYmP///owaAJeXl/Ly8vr29O3t7e/t7ZgsAMGwlbOzssLCwMDAwJaWlsaaQLmgadOrWc7O0r3AycWbRJ+fn+Hg4Lqqh/Dw8ZyIWJtcKfv39ebg062trbGztM7Fwqqpqcyzfurq6qFrUMmpbIsXAOHk6tza2UtLS8rQ1caPH9TV19PT04wXAGpqapNUNd/LosTExNrJwfHy9mFhYePl5svN0PPz852dnfv685JQLpAbAJMrBqiprqKiocqcQtvEk/7//8fO0PT29rZwEoWFhUhMVH1+fvTx6cnJyaers3FxcdHR0YqKiqdXLnFxclRUVMKiYdC+mbSfhrx/GsTHyvv48mNjY7JtSOfn55qampeBT7zDxpNUNtDU1W5ubpU8FZGRkfr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAG4ALAAAAAAQABAAQAeSgG6Cg4SDbUIQZEEiNS8eUjNqQ4WUhAoCYlZlglcoRUY4a14aSkuVp4M3AlAggiM+TII8bAQGA4QBAGBVJU9mSECVTS5HYyZObidEqMxuCysWzRgZCAmoVAxbPw+DuR1dOzEXWAU5t4QtNhUbHyRRWkmVE2kpaA4UXywSUw2FZzoHYGRRQYMLhzCUQsjoEaGZm0AAOw%3D%3D';
	image['g03']   =  'R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
	image['g04']   =  'R0lGODlhEAAQAOZZAP//AKuiffr5/v/+ANzXAL+9Ffn5AOvp9Oro8bu4CPr4ALu4Adva5pyUUc3MB8jEuN3dfMrKAqKYPsjAS6CcNMO9gbW0Tujn8Pf2+J+cWPPz+7SwkLW0F9DPzurqAPz7+f39/+fn7tbU5Oro38XCveDgv9fWncPBAK6qVbGxarm3PZ2WgtbQP+fn8Pj4AL+8E7+8rdnXAOjn78W9ApiVVb+5ct7d5fHv9aWjPL69A/f3/rmxB/Lx6ezp5bq2cN3fANnVC8XCDq6lINPTCeTh3/v7/720JMTEF8nCvp6aHvn4+uDfAH1zZvr6952bctjW1ezsAMfGqv7+/7y8VpWGQvr5//38/MzLuq+lPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFkALAAAAAAQABAAQAd5gFmCg4QBNYSIWVcnKSCJiURCCgAGQRMVI4RFGxFJIo+JGBIxLzMuGS2gVj1RDg1GK6BZTzkoArJKTlA/MLKIHyYlCEg7EL4MWAMAAEtHUw+JN1QsQx4ETFKyGioFFzxNsjoWCR2+WVU+CyTmNhwAOCG+MjRAFAeygQA7';
	image['g05']   =  'R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
	image['g06']   =  'R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
	image['g07']   =  'R0lGODlhEAAQANUwAPPy8+PBrMWHXOPJt/jfy8uWdP76+reAYE4/RWA/NBQGDm9RTOzq6/zy6atXJ+/Xx9O3qQAAAJlmZsxmM/vu5pmZZmYzM00wLf339vjm1N/a2syZZjMzM/v7+2ZmZszMzH5oY5kzM8yZma2qsP///rGoqfr7/P/9+/39/vPUvuewhPHKrO3AnPjq3NWpjpmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAQABAAAAaXQJhwSCwahQbD8dhoZQgto6FFJRBYqhRFulKtCKeCi9U4DsYpUiGwwphdgQdMMGBRGqnoMABJPVoCLi4qGxspQgAAgl0TDg5rGW4wDAsLCRMHKgcOdSkAQwwIFyEiBCsrBQMCFhwjQxULAgEVCQUqLBIKFh4oiC8uBwoKHAIHCREXJUYvERIgEBofLy8mRqEIGktFHZ9LQQA7';
	image['g08']   =  'R0lGODlhEAAQAPfHAIl6YGxjSpGKbevWsqGVeLq0o6GRdtrIp9DEo62Wd5uDY7OacdHEosa3mYZ5XoV7XLKac5uOdbesl3pwXJ6Yf4JoSbmljbaigbCgg8q1kZOCabSggMa4l+/hwLqihKOSbqeUbqSUeLijh5eGabSfhc26nLeph5WHaNLDo4FwWoZpSZiPbFpPOsi9pIRyWbqoip6GZLusiLGlir2ujbuvkZyNb52ObN3GpMWxi8Gke+LOrOXYvNW9laGPbIh4XXt0VWpcR7WjfNO7lJ+RddfEoZCAYZOGZbqqh6uUbrGigZ2Pesq6lK6igGdeRa6PZcKsiqWHX8aofsavjop/Y97LqaqZeKubf7Cdedm7lYBsUqaYgX9oSbOihNzWxZOLdLemjJ2LctG9m6eXf8Gzj5KEbm1hSZGFb6OUfqiVePHiwHxvWObVsrerlYt7YcS3mX1yWquVd5GDZ5yKZJyHa6KFXZZ5V7eulpSHa9LBoIN0XNjFodHCnlZHMr6xlt7Sr5V6WKefgJmJaZV/X4+FaL2tia2acdK+l+DTsp6Rc4x/ZKOYd72oiMCujHx1ZcOwk5OFaKeTdp+Oda+cf3dsS5yDX7ymgKKQdYh6YJKLbtnJp7ajeqyghsetgZmEat/Rrm1hRpmOd7+wkbqee6eNaLypkJqQb9rQtp6PbZ6Mb62khsG0kZeKaMCxl9XGpbmojK6chL2mh9PAm62adpqDYWVeTqeVe8izkNvLo9/UtXJgSJ+XdqSScXRpUJ+KZtXGosy9ntrSvZuNcH5uWK6nisa5osKph7ugegAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMcALAAAAAAQABAAQAj5AI8JFFhMhagSFgYOhPSnSBJPikr1yCXoRS0NBsC8Elhn1AE9fnyFmkEk0w0RZwTKsYHoUpk4BIJZ6pRlAq0CCo0tyKCDWBdgLRJEUjgripA1YxgMcYOCiiRYi6Sw+QAiiIlHS26dCFQJVQofI+BIEJhq1Yofk4xMyUNGyyaFA51AyfGkT4MLrOAeg4HkSIdWv3aYwhPG0RyFdHrxuEKIhgwEaQZgIeFKYAVKhg7h2oMjli0MVjZw8SAGAidZMap80vWAzxYFQIS1QUNql6ZCqt7UYOQgEYcvLlioASWQyalBAZrwugMgQggzShrpPUZhGCABmLzYURgQADs%3D';
	image['g09']   =  'R0lGODlhEAAQAPfCAP7+/v+OAP39/fHx8f+PADqNItV2CLS9x5BfK8G1pO18ANd2BHp2b7J6NqZlFrEAF91zAOp9Af/Xoty1io2FfjMzM/2IAYiFfy0jFzokDb6BOG40HrSjj+7GmZ1fGLiiey9zHP///4YoLYBOFN93AJyEZtF0C5NQAJxqL/+KAJF/auCUO//ToPeCAJd/ZIh0Wp0AHK2rqv2HAJ+kqLFaALuceGxLIMFwE5sMI9avhaIAHLfDzlRUVNZuAP/Tnvr6+nxbCZiDaON4AaJ7Xi2XI7+bdJaboJ2dnbSXdZ99Wd64j6F6S5KTln9hQfuFAJyHbZiCZsCQWaWlpYl/cJmFao57YnIwHmFTKaGVh/fy63sDHJyHa6d0OKaPc46TmOjo6K+xtHYuHqpcAqdjGzo7PMjIyNV3CmZmZvz8/IRtU0JfFN+3iv/bpcipf6NzPP/YpKBaB//Uoih7HL2hfMXM0oeHiJRmMf+KAzefJZF7XzKWIurq6oOJj11dXct1FNrb2rAAHLqyp9GcYP3Qo5qFanJjUcC/vcF6KK+vr/3Wp9Swh29hTea/kx1FEriegP/nrzdnFSFsGKKTf6lbAbB6Oo2NjZpaE2VjYv7NnJyCZcvLy/Dw8DmPI2NLE/z7+fvPm7rH1YOCgf+IAPiCAIluT8BlANzCkmVIH6F8UjBzHIJDBMjIybq6utnZ2pOPisida2NVQ4wmN4GGjD+CJZV2T87OzcCGRPf29s1tAqdZA957CmxeRntMF62KYoBqUOnq6KuGWuaBDf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAMIALAAAAAAQABAAAAj3AIUJ7HNGgMCDCA+WqXBECphVXwAkPFiJRwhNRuh4YTIgoUQ0ZBDVkgVqx4wLrAwK3BOKwiU+BwK94rIFQx2EsOCQKPUEiyUnBl4s6niQV4QUKxi18dUjWI0pPxCisiBKQyEoS0bpQhIkwS+JwsQEWOCmRJVDAfw4UvQpB4c/wk44SJNoDZUbQqIIsjWIhY8ihjLs+vBoQq9cI7rgMqEkDiYJLrTgEDHEFDAaKCjJaGGnwxs2eWDoAPQgFoJJpMwQuEPL1ZxMMTbYOGUljCoPSRRAaCDJU6tNwiLJwaOHCJBOV8Y0YZAFYapGIApwUgNpFiEVtxIGBAA7';
	image['g10']   =  'R0lGODlhEAAQAPexAIYbAH8eAMQwBXscANPM2HYYAIdHTsUsAKQlAK0lAH4YAJIkAIseAKglAKUmAO9NHu5OH/Hz+IceAJohA5sjAHomFKojAKQ2ImwXAngkEaaKnaE1IpdseZEmCMgtALwrAL8oANY7D87S5q4mAPpiPIQdALsrAMXN4684IYQqGnQbAMopAHwcAJZMSIkYAIMgAJQyIrYqALIoAKxTS31ZbtY4CI4gAL64zdNEIO5pU28wKZMdAJMiAODf5+zr8qkpBKs4IqAkANjd6uXh56aVqrFPRI5FSK1OTIZFRaIvDN9BEotibXsVAK6FkupIGIggALG1zt06CIldaLYsA5iQpdxOLeFaP5wwD/tqT/b3+uPl74tUWasiAI4hAH8YAIEaAKCRqXUYAIIhB5MnDKguEIkfALstA7gnAH0YALomAMssALgqAWIVAH4dANMxAaE+L9EzA768zZhLQvr7/WkqI/hcM/NaNv7+/rezyaMhALu81dra594+D6tIQcQpAOLm8+zv9+rv+MEsAOlVM602Hak3Ip8oAnE7PIMbAHQYAMQzC4UgAKMlAMYuAMYsALgkAJZcXddOL8bO5YMdAPz8/urv95UoD8UtALYnAHsZAPhWJ3cYAKomANk6C88xAtk6Cu3v94siAnxfa7SlspU6LZ6Wq9hCHuZhSrgpAJNZX2gTAG4zMsCktp4oCpuPp3dIU34aAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALEALAAAAAAQABAAAAjoAGMJHEhQoCQaR/oULBgBzJs1IOQsHHhiywg/K1oImUgJD6lHjtQU2TPxDhVLaTy4MTNqYiwirc4c6BSFTJyCWoaUGoOpEZ8HcCBlGfjH1So6YhII+qTJiQVRcwRCOVRAVSIEHzxBqBOCi44eAl+hYdGmjIlLSkgMEhAEgxQfsYwM6BKDB6cadrCYQmWDTZgllQwEeMHIwRQcp6woavBExaYMBDR0QCSBwY9IOaoIkEEhQKYKBEBxmABgUolQV5IYWrBoABMkgGIFYkUozw4AXhTA+gLARYobBEU0mYECSKELG2Ck0iMwIAA7';
	//romans
	image['r01']   =  'R0lGODlhEAAQAIcAACAtITJONTNVNzpUOz9UQEJHQkxbTERoS0tnUFVqWGdsaGZwZnl8eVmCXmeEaGaPamiAbHCFcXWXeI2ajouTlI6YmJCPj5icnIKhh4qkjZujo5+uoKWwsKywsLK2trW5ubq+vrbItrnAubvIvLzAwL7Gxr/Hx8PLy8PMzMbMzcbNzcnWy83V1c/U1NDR0tDW1tXf1dDY2NHZ2dLZ2dTZ2dne3t3i4uHm4eru7uzy7Ozw8PDz8/fz9/T4+PX4+Pj5+fv9/fz//P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAEIALAAAAAAQABAAAAh6AIUIHEhwIA4bNQoqFHKwBoeFBHHIUMGBB0SBPVio0ODiohAdMUpU8OARCA0TFEh49DEDBQUQHoW8OEGhg8cfLVx+WLhjA4wfNVJQuADxRgICEDBYIOpxxYMDAiKI8BgiwIQgBgpAzJFhAIOYIyQ0ABBTyAIHCBSUDQgAOw%3D%3D';
	image['r02']   =  'R0lGODlhEAAQAOZYAP7//+SVnurb3rRQXbqMkuvb3eCiqeKiq/v7+9jBxIlTWfj395FLU7FRXeScpZtPWOOutK2Ymua+xMRdaa13fvnz9OaRm7KQlL2sruKnrtzV1uepsbqys6een8uKk9h+iYw1P40vO7hUYd2kq+KGkebi4uWPmemMl+HFydOaoc5WZfv5+dFmdMK3uPDe4N2mrcelqLyKkOSXoKiYmtezuLpBUM5mc6+MkPj09N3GyaJlbWRMT/Hm59mts+vt7ZwyP6xWYNxwfeKkq9Fmc8g7TZVpb6BGUKxeZ/v//+vN0JAqN/z7+9mgp5mLjaWBhr2jprFKVq1KVrVocfb29olZXs5pdeTb3OKSm////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFgALAAAAAAQABAAAAd6gFiCg4SCODFANIWLKz0bJx6LhEsSBxZGLZKCAEkGJCIcmlgAKEImUU2iWC4ZARMzqgUvASwXqjwjV0NOqgJMMjY3kiUECT4QDkFFCJJWDyBHH1UUqgA5KjU/OhiiSClKTxUMO5oaUiEdggtTkjADRAqqglRQDRHyWIEAOw%3D%3D';
	image['r03']   =  'R0lGODlhEAAQAOZWAP3///X29/7//4IRDIQQDejp6G8QC+TFt3pQUHZqSa6Sk9uGbMaimIEIBO7x8bFuauXk4764n/v8/cS+tbm5m9vS0oIWE95/Zu7w8LqtgfT49bKunvz9/saflZUvKuDFuaeXYItjY+/u6+WMcrdHOc2Oh9ivpN1nVZBkZNR8a7m5p76mp/z9+7CIiff6+unp6IUNCbW1rKCDYtqIbfz+/+HCtPf39fv+/nVsS4c2KJSRc/zy8IIvIeeaf5VDNtnJy6CSc/n49fXbz+/z6vr+/peRdXl1R+/Z0duOc5NzcmxAN9S3qvf5+tnY1Obh4nUPCbRUS6B4eLOcgIMTDuZwWodjY////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFYALAAAAAAQABAAAAd4gFaCg4SEOyWFiVYSRykPioQ0HzMeFZCCHEJITwqXVgFLPQZJApcCNQtTVUSXDgcjBC0AiS8QVkwdFwNRkE0bNyZUMCiziiwUDCcNCC6XQ1IkFiEYnioZOUoanj8yRgk6ESKQTlA+MQUBQTaKRUA8K56COCAT8YKBADs%3D';
	image['r04']   =  'R0lGODlhEAAQAPe6AP/+/ry8vP39/V9fX/T09Ka8zUZJUGNjY19fXsrY3iMsPPHx8TM8QSUrNQQFCtbX1v7//MfS2kNDQzA+SOLi4p2qs5KSlEdGRmuKm8/U2t/l532KjzhHS8jHxzJBR4GBgf///nRzdJCPj32er7e3uHl4d6ysrFJpfFdvfeHh4vz9/JOerXKUoFF0jo2jq2uHkcvLy6Cgn2l8hmd8j3SMlXOIkd/g39TT1e3x8ZeYmszR04WEhOjp5klMTf39+8PExW6DjIqktri0sIaGgZ2dnbG/wnGIj72/wIefrlhYV8C+vrrHyouLi46eor+/v2yIj7K/x32Unebm5WhoaGFqbtXf5M3Ly+/z9vv8+7y6uAoHBUVbbyMoKa2urURJUY6OjoKCgsC/v9bW1V5eXvX09Hx8fPDw8OPj42+Qrebl5r29vWyKnoCeunmbr7a6vXCPmf7+/n6JjHN2erXH01d4lN7e3fz8/HaUn2iHlevt8rCurWiFjDw8O+Ln5G+Oovv7+3Z4el5mbOnp6a26vpyprp2yv4yMjH+MmYmMirO+v2JiYuzs7GeLsY+Pj////crKypmYl7CwsG+FjldmbePp63KRqZSUlIaeuUlaYoKctsrNzra+x2iDjfr6+b/N17nDxZqip6Kos0xMTPn5+fj4+HGQmvz9/TU1Ne7u7nOMlPf396urq3x8ds7OzqKion5+fXSOnG2Gk+bt8LfGzfv9/amsrunq7cLJzgAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALoALAAAAAAQABAAAAj/AHUJHCjQRy4sm67k+kOwoS4cgVbkStNJlyobP9zkKMFqCCIqCkABCiWwVRcLBhzgarClBZ1DXmbIAqArUZEomCacQHOJDaMEtjJAoLlhkgcUbSoVuNEnk6dcWXgIxIWLAaw1UHLpEZJn0AMrO+zo0sJhBIYKjkCASZHLDIIYhgjo4vLCDxIyucQwycX3SK0wqHRxYoFnFt9IX3LRyhVhTp0Auu6UekMpl4AFA0ioyFUoiBRIo2g8cWEKQK4ABxQlkSMpVhUlBFLtWZILDqlTJnSJ6BGHkKYyMGoY0cD3jARBAl/xCdFhygcgMm7xDTBgoBNRF1wRWfWpiQ6+j8YICRi4yFIjNRQCAgA7';
	image['r05']   =  'R0lGODlhEAAQAPcAAP////7+/qCJYgAAAKeRbc6/pf7+/aOMZquWdaSNabGefq2Zd7Gdfa+be6aQbK+bektALfz8+6mSbYl7Y4t7YqCUgauVc6uVdJiNelxSQKqVcndsWHdtW6SOaqeci/v6+Lijgp2HY56JaL6rjMKymb2ulIyGe6yXdLSeez0zI4NwUltQQKiSbnNkS66aeqmUcqqUcfHu55aDZKSMZzswH/Xx7qGLZf79/JiIbqyWdHFlUmZUNqeRbNDEsvTx62laQ8i+rbScdXptWLqxoayVcOzo4HJoWv/8+KWTdIR7bI2Cb6iRbrGnk725sY6IfaWPa+fk33tsUi8oHY1+Y7mmiKeRbqWQb5mGZ5OFbpqFY19QNsu+qdHIuPb08KWPbJB9XJ2Vh21jU6eYf7Kefa+aeLemiczCsZiHbZWCZK6YdraliQwIAZyGZPDt5qWOaYB7cq6ZeJ2Mb6aSc5+HYaSOacKyl7Gef2BROZWBX7SdeKiSb/39/IRzWaCYipGEcLCcfI5/Z66ZeZuJa6CReqeQbKSVfa2YdaiRbbqumgkHBaqbgV9PNbWjhLKiiHhvX414VvDs5rKdfZSMgLGdfp6McK2YdqeQa6mSb6KLZMTAuaSNaJ+Mbq6Zd6+ZePv7+byqjfj49fr49u7q5NPHs/n49qeQba+kkbOefqWOaLKde6mTcHFhRufi2GFSOaCJY6iTbrCadVBFM6ybfriigIB6cdnRwVxRP1FELqWQbEc+LXtyY6qUbqiTcNbPwuHZyrKfgLCZdId3W6OUeqCOcKWOagAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AAEIBBBgYAQAR8x0AXBQSpZdhBIQsIKDAbFIgiiNqQGgQAEkPyBEAYaCzIk6o3wZEIhpjhdVh4jcaXIDzA46D2QF60WKFZctHmi9MSFpQwomSRAVHDAg15NXDy5tGkZFzS85GPYAkKApgQMXcCS0ODMLxB8FkxR5EiCAV4NOV3QRBJCp1aJBcYYM3CvQhxFTAIp8AFCLhBgtawbQWPXoizBbgCAJdKIDgoogsGAEstNgAYMSbQQmipWHh4MlOSjgYpEqzBQ/oADgsXSgiptTaCqM0PAizScEPQIccNWhVCVDbCZwyCAkBCoFjUIJsEHAgh4EK0QJVHJLRhk+WBjND7iwgJMIRysFxuhTCAiUgAA7';
	image['r06']   =  'R0lGODlhEAAQAPcAAP///wAAANOsauXCivDQmfDOmNqzdtixcf//29+6feK7fenHjuzKlOzKk924e0MxESwbAOTAhXZdNv/ks9qzdK+Uatq1eMmlbP/lsYRpO//xx9+4fZSFbNu4exQIANCxguzauv///efCifXMiuzJj72lfrGnlNu9ie7JioduQ+S/fufKmY+AZeXAh8KibrOggGVMIE04EunFitu4gPDfvb+xnY59XvPQmd27h///8/3dquvFjPjbrLWqmP/w1V5MMfHOlNCsdMCgbv//4riYYP/xxKSUe4RvT4V0XbWbc+vHkZR7T/vWndq1dsqseeK/hfbYpOTKn/DOmdOsbGBNL+vHjj0tEcWpfZ2ThOC9gtGpafvYoOvHj+C7ftu1duK7gPHWqtGxfigWAKyUbPHOmNO1gvXOj457Wd/Mr+K9guXAiaSHW9+4e+fAgv//+9+4ebqkgs6xgP//6c6pbOfEiZN9Wdqxc+vJk/DQm+zHj7OPVvHRnX1sUcenc3FTIJ2UhdO6k/HQmNavbv//8eC7gMynbu7HieC6ft+6ftu2e2BPMdu2ecWqft/Fm8CfZfrdrKmOXtrAmNWvb+nFjGlPJeC6fWdNJf//8P/rye7Mlt+6e9u1ePXQlOS/hLOZbOC9fs7AqdO/n9i/k0w5G6KCT//98NPFrsWzk2VKHv/rv9u1dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAjxAAEIHEgQwCWCHi6oYGMgwQxGBTaRcfIhkEAECE5IeLDEECcSdIrkIChIS6I0ldpYKgUAlJ8mDVZAGuhmCBosf0zUOAOBhhFMAgMEsLLoU4MvYcro4LEHxymBCigYcHCHi4IUV5hsyURAShQAAgRkYZCnD4eBISihAhTHR8GCSEAU1NAIhlAxGfQQEUUlycAeRx6QGoGikxI8DBYUSDUwwCgzmhwcElGhQxcgfDzBEejozQFEXm4ICYUhwpMdEwYMAnBgioUNk2QUGmNDUZ05qgiAASspQQtCA34MfBHDxaM1JaDYUbOgShAWBU1FkgMgIAA7';
	image['r07']   =  'R0lGODlhEAAQANUwAPPy8+PBrMWHXOPJt/jfy8uWdP76+reAYE4/RWA/NBQGDm9RTOzq6/zy6atXJ+/Xx9O3qQAAAJlmZsxmM/vu5pmZZmYzM00wLf339vjm1N/a2syZZjMzM/v7+2ZmZszMzH5oY5kzM8yZma2qsP///rGoqfr7/P/9+/39/vPUvuewhPHKrO3AnPjq3NWpjpmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAQABAAAAaXQJhwSCwahQbD8dhoZQgto6FFJRBYqhRFulKtCKeCi9U4DsYpUiGwwphdgQdMMGBRGqnoMABJPVoCLi4qGxspQgAAgl0TDg5rGW4wDAsLCRMHKgcOdSkAQwwIFyEiBCsrBQMCFhwjQxULAgEVCQUqLBIKFh4oiC8uBwoKHAIHCREXJUYvERIgEBofLy8mRqEIGktFHZ9LQQA7';
	image['r08']   =  'R0lGODlhEAAQAOZRAP/EAP/OAP/KAP+sAP/AAP/FAP/JAP+zAP++AP+5AP/TAP/PAP+QAP+1AP+ZAP+rAP+NAP+0AP/GAP/CAP/kAP/QAP/dAP/nAP+eAP/UAP+gAP+cAP/BAP+uAP+bAP+pAP+3AP/jAP+IAP+9AP/DAP/HAP+PAP+fAP9UAP/mAP9bAP+kAP+DAP/bAP+jAP+BAP/IAP/XAP+hAP+WAP+7AP/lAP9gAP/fAP+yAP+EAP+6AP/RAP/cAP+2AP/LAP+SAP+CAP/NAP+TAP+/AP/VAP/pAP+nAP9cAP+LAP+4AP/ZAP/MAP+UAP/WAP+aAP+vAP+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFEALAAAAAAQABAAQAe5gFGCg4SFggICJQ1COTYoEEgyICQBgxg7PDFGHg0jBCQAAIUmOh0OMwgTAC1KhlEXFDUVJidODYUGPgsTGhs/QCIeBBISMIIOHxwECQcPAy7IBRWVhSEpQRkUIa6DRRcLCAEJ3BYUCgYIT809JYQbAwpEBxpQDxE4NAX6ggaIBEwMVBxhAWFFBAACBC2RAGDEAQgvRGBgMCBAgAWDOgzhkCRCghMMJgQwoMAQiAwABlS40cQCt5eDAgEAOw%3D%3D';
	image['r09']   =  'R0lGODlhEAAQAPeVAP7+/vz8/Pb39quRf4YvL0hcKYVBJ0lbJO7Boa+DcqmQf6EcHeKtlePi4IkTGHpGL404O8CbhvLy8dGdhXdOLfr6+rGNeKqQgc+agfb19MKSfYNfPe2zm+mxlu/x7+3w6ktiMffTtJ4aHY4gHOHk4dmli9qhir+9usvFwN3Z2cqVgIQaHryvpqmhl6GnlHhzRfL09LAXHNbTz9fHxqJlZb3DtJMbHribi9TT1qg3Nk1lJKOBedSsl9K9rlZqONKLObEkIHZMMefl37vAwYNmY4x9cY1iQf/FRebp6HwzH2h2QuXp4auBbY+cgvn5+eCslf39/b61rq+UgvGzmL/AvOaul3QmJoosL8jHxz5XKfS2nPz8+7rCuHtgVYcREqQbHadEP9LCwrBlZaeVhcmfiN3f3YaUjNyjh6IjHdvS0sKZgsPKvLyzrqxbW7aNfPj5+Ku1l6+Fg4CJdpSDZY4SGKYYGbuciMaNes3EvLWFN72NdZwTFLunocqjjHhbTtOfPnOBX3SAc9Wiitaiia+HdNSfiUJZH6wWFoZVPNqmjb2CN7OSgcS5tPDw8cnOx9/Ry5RAOcLHvKgaG2JzVn5ZPP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJUALAAAAAAQABAAAAjKACsJHEiwoEGBADy4gLMkwMEPkUg08WFIhxyHBtdMKnAAhJI5WHAAMFgjUJYXF/gkGIPEIABHZlr4KcLIgoI3BhsB4vKICZlBep4IOVjmBIxFU0xgKMTiYCUqKAhpOVNCUBSnQ26o4DChCh4BBbdAqSRggAY3DOxIMCimzYwMUhKp6cPGCcEKYSDs8bKDR4cIRK7QaDAwjQ1JX+isuIMgRI8ch6ykENjlASIKin4kIQAJDBARDuIIDGKE0oY8R/6MiFFnARoDMgQGBAA7';
	image['r10']   =  'R0lGODlhEAAQAPebAD09PTk5OUVFRTU1NVhYWFtbWzc3N4mSoLnD0lJSUkJCQjw8PDc6QEFOYjk4OFdXV0VEQzU1NGdnZ5+tw0ZGRkdQXDIxL39/fzg3NHJyciYqMEBDSF5eXlFOSWFhYeft905bcEpSXebt9snU5MrV5WxsbDE3Py0zPVNgdMzW5FVgcEBAQENCQFppfzk4N01TXT4+Pj49PJGguKazyDMyMikpKK+80TAyM8PM2rTC1lRTUTMyMVBccEhGRVpaWuHp9GR1jYCAgG5ubnx8fDc3NsXQ4HBwcEVRYsfR4igtNEFAP4CMnqi0xzIxMXmGmTA2QSopJzMxMCooJ0lHRktLSysrKklRXjo6OneDlE9PT1lZWTEwLIeRnkpKSjI4QFFQUNni7d/n8kRCQD9KW0NOXqe1ykVTZ9Xe7UxMTHt7eycmJKWyw05NS+bs9bvI3khJSn5+frjBzuPq9lBQT1ZWVoGBgTU0M0NMWYqVpjEwMDIxLjk9RDQ0NE5OTmNjYsfR4V5rf3h4eFNSUXOBlignJTg+RoaQnT5AQ0JIUo6dtElJSUhISDExMDk6OlVVVb/K2U1QVXNzczQ9S0pYbGZmZnZ2dtff7TU0MoiXro+Pj11cWv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJsALAAAAAAQABAAAAjbADcJHEhwoBsEcQoqHOEkBKQKCgnKuAOhA6I1ETf9GMSAjY4XMzIWaaBAEIE3eDIiISPmSwE/GyYobPNoDIsEHIxoUvGBYBkQkrwomVOgUqQePAaKAKJBDZQYfRyVqENpypMUAm2Y0HNlAJoEHoLA0SKgxhEwmxDssdOFwgoCgTIJyQKjCiEzYXIUugRAgCIJF4b4WASAj4UkODYB2kIkAAA6aTI8oKJgQJQTfzaRQNEIgwMDARYsCGAggpQWBDFZOeSCRpM8jHbcmGSp4BkmSw4c4GIISyI5AgMCADs%3D';
	//teutons
	image['t01']   =  'R0lGODlhEAAQAOZgAP39/TElMTAmMoJ5eF1VYIJ4eTUlMDEiLhgaJ9jY2eTg3jIgH0gzPCwcD0AsNEE9QsjAv8G3tNDIxx4WIy4fLbCpqCYbJaugnVhOV/Hv725iZlFLU0gtGlE4Hvby8tvT0ZSLikI4QkIwPN3W1MS4uT4zOmdaXD8yQGNRVyMUEE9BTff19Ly0s0s2NNjNtpSGhjosOpF5ZUo1PjUfJSYjM2E/TEAyP0k8RDMkKv38/KSSi4R6ekQ2PVNNT1A2ISobIf79/cK9vTYtL2tbWxgPFkw2QYNvXTQtPOjg3VVCSDYjGyUhMTAsNuTg3yIhMHBjYMjAwO3q6ezo5+rm5aOWmUUqMSMgMEInLjcnMzIiJVQ6RU49Q5SPkTkrM5eOj8DAwP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGAALAAAAAAQABAAAAeFgGCCg2AALF8PIE2EjABcMw48XVkjjINBOF8oW183O5aCFTJFBCoiGBCgYBFfNl8hAV6qUk8CRxtMJVOqCkIITktfJlGqH0RWNBYSqoIvFCcTUMxgSAsMBwUAzBlGHT4tHtM6HEoNMUDTVFgwKS7TJFdaBkM50z1VNT8X02AJGkkDVjALBAA7';
	image['t02']   =  'R0lGODlhEAAQAOZkAP38/fr3+O7m6piJlaaVsP37/PXw8qWVsu7s7Pbx86ubpe/q7X51hvn4+cTD0qqZoXxsfp2Lm6qUnpiLmKSVn1FNYHxrfN7Q16iUpf79/ZeRl3FgfWBAS5qIksO1vOrl6MOxvZN/izo1PUI2SV48R8q2wMSyvNzP1s/Ey8nAwtbI0IeMk5+Pp49+jINuioN0gp2Zpenh5bOdpn5zg5COoJmJloBrilI3Qv38/JWCkINud9PIzcq6wbats/fy9XxwfLurs5OCmfDp7FVTXvf09XdleYeDk4qAmV5CSbWlroh2gu3m6oJthnpnfcK2u6aUrse4wMu5xZ2NkqWToGZaavv6+ry9yY58mIRuhsCttt7T2nhofOXa4f7+/pSJlot/h0gxP8S1vX5pdpSFlP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGQALAAAAAAQABAAAAeJgGSCg4SFhoJZPIeHEjoAGQWLgkQyUk4BIUk+izsaXjlkCjQvBodCY1cgMVhHVhSGFw9hNkxbBCwONThkAFxRGEMVIy5PUy0bBxFkJUpUTRYQRR4oRlBkA0FaZAIJVQBdgx8ME2QnKpJkDTMwC+iDPytA7oJfIh3zZD1gYvgpJBxL5iFAcsPEoEAAOw%3D%3D';
	image['t03']   =  'R0lGODlhEAAQAOZqAIeFi4iKm2RojT0/SPv8/IF/gG5tdYB/gnp8kXp/kGlBEYaFi19fblpfaeHh4m5tfWY7Bujp68jIyMrKy5KRlqagmI18ZVY2EHVzfv79/Zh1TP38/JpzQOfd1Ww+BaysrIWHh6uqraiqsVtjX/Hx8ff4+Jyep5eOq7W1td3Z1Mm/s354enFwclVXb29EE+7p45OTiHZnUMHBw66pqG9uclUpAG9xhWVod2Zlc/v8/VVWZXF0jT84LXFxfnN2imk+DYCAk6+vtd7e4fLw7tTJvKuQb4JdMn9/fu/s6WtSM9LS0Y+PlXRZO8nBxWNlb7q7xXBWOj0/TFxaYpaHd9TSz4OFkYyRnpCQneno6FVZW7GZe/z8+VJVZ5CPk6KmroWJmv///ot2YHl5fcq3oPv7/Ly5vnFLH3N3e2dmdWhrf////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGoALAAAAAAQABAAAAeOgGqCg2obTSdbhIqCGWUgWSszZIuDH1VAA1EtS08RQopYIzoIOFwMNg89GIo5MEk8TmgCO1cLBoodHB4xPjdpASJHXYQvGjUWagkNX14ULEqDREZmKgRqVmcmAFIFg2MuFxWDQWIHNCgkakNaP1BUhBIhMhODRQpTJYpgixBhDpSLmCABuCgFwYMIEyoKBAA7';
	image['t04']   =  'R0lGODlhEAAQANU/AOrz5FuGPoKtZGqYSlN8OYyyc/H06vT58qjEk1qEPYWvaPj49E1zNYKla4coK+Tv3v7//pEqLlB0OHCYVXqnXPn8+ExuNFF3N5G9c3GiUJaNWdjUwb6miX2rXlaAOqlSTbJVTm1SMsXatcfcuIClZvLs5tnozqZdU4ivbaPAj5q9gevv4nu0X71vZmyRUnViOZnAflJ5OMrivJm+f8BKTpoxM7KNertMTFqAQZa7fGZFLbLOnn5JM6RuX1qNQP///yH5BAEAAD8ALAAAAAAQABAAAAaBwJ9wSCwaj8aNrXf6tBbIH8jhiNRuq2grQo3QSlEOTxd6aQxRmY9B8LEAUcDAcgkIHtEDhXFJUEZRFQIXMR4dM3hHggwSCQMYOSIAEEUVCgQXBAkZGDAoBSmJPxAqjDgJFx4DCgUoAkQ7FxY4CCkkExMFCIBDJiQuDWgQBweUUVFBADs%3D';
	image['t05']   =  'R0lGODlhEAAQAPcAAP///////P///v//9v/+/P///f/++YVsPP/++u3cnu3dne3cnf//+v//9+/gqPPovPDirqyYV+7eo45lJOrdlO7founele7hou7fpI9xO56NVdPIeKWRVe3dn8GjUe/gpmtPHYNdKtPKeKJ6N8e9c7SZXvDirayLTm9MGIJmMd3ajV5FFZJrMYBjOcGkVE43EHNOG4pyQ0A1DJ99O5uETntcJ+7fpZBoJeTYhYBgMpVtOO3doPXryJZ6PtjQgMaycLKaVcS0Z9LCmKyFPMWwaH9gM8+/csq0YIJZJcixYb+xa6eRYfPovsaoU4hkKuHap7ebXbWdWNTSjaGBQvPowMevXYZdKWVGF4hsQqqTWO/ux8mzjYpwO+ffwJ53NqJ+PPLot7aVR+zdlrmmXurbkdzSrZJoLqGFWM/Fderaj2JIFfDlrT0wC9rQdYx0RNbOpmVIGopxPrygUsmzaObjotHFfKeTV/TqxfTpwphwMca/eJR8Se7ipXdTHeDYg31XHn1UJOjcj6+TUe/iqV5TLJmCTu7jpfHktFBEFPHkserin8i+cuXek6uFOohuP+3gm5Z9RMasWcGuXI9mJqB+ScOzdevhoufkosu3l+LWf56LUo55RaR9NZxzNDowC4NlL4tyPvHlte/gp5lyMPDjr2ZIGtrPdaWPUqmRU5J/Spl7OpN7QnZOHaWBRoRsN8u0ZLyfVPXtzK2JRe3fnsvBioJmP6mNVox1P8i0adTDbvHlsW9NF52FVY98S5d+Q8K8fsewY+ffmpyFS6iCPIphItrNdtXTf596Qo5mJtLGe5duNPPpvvbw0KqEPufcjrGRUczFg5h+XJF7Q3BKGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAQAj/AA0gIFCAgQABAAYkrAQmIYAXoPacmiXKVKMECxIckfPqEYA3tJYUAfGJRhY7hYxR8NEgAIAYB/Q8ODRoF6wAzf7MALJBWTJmWrqU2UIpj5cvTlYIYlHCpScZV3xBCmLDQxMyktrkGtEAQK9N0oKRciBmQiQFEsZEcCZLV60W0O7gIYIEgEtcrKY9OwFFIMGDBwHwCWGLiaJlAJ4IwRSNECI1NVxxmdIngyWXZ3LASaFJmJJiOFCh+VAlEAAAbEppWBUFQwVOmRakuRFm2AUAB1LdImHCgYshHRTsELHID7AAbuJwCJUIQhJkk4iNUtVDxZw1WBzRofKAEQwLpzuhFzBjxIqOX7ykxOJRBxCD0wAMtTr241JAADs%3D';
	image['t06']   =  'R0lGODlhEAAQAPeyAM7a2gAAAI2VlTw/P8PPzyswMCktMwMCAT5CQkxnboSYoJGYmGBmZjs+PsrY2EdhbUpjakVibFVaWc7a2czY2JGXl1NYWJqxuFFVVI6Wlklrhm1ycXN6eSg8TXV8fK+6uxEVFll2jzVVbh0eHlx4kld4k5ukpD1JTEJYak1pdiYpKUZleI2TkSkrKxsjJ2B+j7vGxrXAv7jEx1Rud77O0a27vaawr01QUcfT01F1iE5ueZ2kpFNYU19nZW58gLW/wI6YmWNpaX6FhZOip4ugo7fDwLXHy7zMzDY5OU1nb4KHhsrS0YiQkUJmikNhZ7C4un+TlztFSsTPzzVNWbrHzcvY12N4fFVkZ7m+v2d4hhonLG+Ch5ers2Vqaj9DQxklLVhdXX2EhElhaV15hzFRaUpqc2tydFR4iFxhXaavrqSsrktsgnuFh5CmsJyqrL3IyJqjo2J9hGRqalZnc5qmp7C7vEZjakNib3B3d6+/wVtgYFleXkVldSEjI3CLmExjbGhubkRYYYmNiTVFS5CYmFRlap+ts4KJiQEBA3WBjBEYIzw/Ps3Z2U5VVxIXHis7QqW5vkprdB8sL0NfaLPDxbG8vElpfK24t7/Ly3mVpoifpkhfZzJIWLjDw4eXoM7a2LO9vSctNMDMzJigoGdtbktuekNHR7/FxXCDjLHBvi0wMKuwr87Z2YqcnsvY2ExTV4agrGFnZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALIALAAAAAAQABAAQAj+AGUJHEhQlicaA0FEsDRGCoA0DABIBMJmwRtZH2rMePSFkwYSJZpckGFoYAInRAAwwjFCiKwuBa5soWPBhKwlWJ6YwcADTY8Tinw0SiQwQAAXKVYoAKBEEBUoNnboEagjUhlKACiIGsCkCgA/L2JskLUp0BCJAgYMJKSqhQc8YQoSPBIlC4AfAk+tImUAUQBHHciImBMKhRGBhQZpmZJjTSY1qUK0AcCiiMADks7wQfVpwp46ADAt4hCLgKxJpe5okngoCAAHALjAuiRAVhI7cVyxAiDACwIkr8Q8gFSBwB8IeSSCUtFJoIQ+N0aZAtPKihuJcBoQhAFIToZKAQEAOw%3D%3D';
	image['t07']   =  'R0lGODlhEAAQANUwAPPy8+PBrMWHXOPJt/jfy8uWdP76+reAYE4/RWA/NBQGDm9RTOzq6/zy6atXJ+/Xx9O3qQAAAJlmZsxmM/vu5pmZZmYzM00wLf339vjm1N/a2syZZjMzM/v7+2ZmZszMzH5oY5kzM8yZma2qsP///rGoqfr7/P/9+/39/vPUvuewhPHKrO3AnPjq3NWpjpmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADAALAAAAAAQABAAAAaXQJhwSCwahQbD8dhoZQgto6FFJRBYqhRFulKtCKeCi9U4DsYpUiGwwphdgQdMMGBRGqnoMABJPVoCLi4qGxspQgAAgl0TDg5rGW4wDAsLCRMHKgcOdSkAQwwIFyEiBCsrBQMCFhwjQxULAgEVCQUqLBIKFh4oiC8uBwoKHAIHCREXJUYvERIgEBofLy8mRqEIGktFHZ9LQQA7';
	image['t08']   =  'R0lGODlhEAAQAOZgAD8/PxMTEzY2NiQkJDMzMx0dHS0tLRQUFBcXF3JyciEhISwsLDs7O2xsbFdXVxwcHGdnZxUVFSkpKRISEkdHRyYmJkFBQYSEhGBgYH5+fmFhYVZWVoqKimNjYx4eHhgYGCAgIDk5OTAwMCoqKhYWFm9vb5GRkXh4eHl5eZaWljU1NYmJibS0tJqammtra2hoaCgoKA8PD62trXR0dKWlpYCAgCMjIzc3Nzg4OEVFRUJCQn9/f46OjltbW5+fnzIyMmpqaoiIiIyMjKKiolFRUWVlZRoaGouLi4WFhZSUlJOTk2RkZENDQw0NDS8vLzo6OkRERCUlJUhISH19fVxcXHd3d1paWo+PjysrKz4+PnV1dVVVVU5OTh8fHz09PaampgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGAALAAAAAAQABAAQAfHgGCCg4SFggQbHChQKStUVls2TQo5D4MJJQk8JhcXIRYUAAMBByIdEgEICwIGByQPFYaCXFdJQEIlAlEwHoMLGlkzWjsQEAYVIkYRB14tGTIJDhYjAA4TBgAgE4UHHlgEA7KyBqA/CBEBhg0mRzQuHBA6A04ggyNDJ1M+QUo1RE8bmERAAAZHjwwJbgBogEIDhgcxCghQheRElRcdMFyQIkDCBwZFJIBR0YDFFwoMlihwECJAgQoMBn2YUKAACQUEwHURx5NQIAA7';
	image['t09']   =  'R0lGODlhEAAQAPewAPT19v///52dnW5tbSgoKDM4PTk9Pjs8Pp6cnePj43F8hJGFfjlDS7u7uebm5ebm5hkaG7u6uZGaoZCbokJDQ7O/yVJQUNvc3Pf4+ZmZm5iYmUhLT9zc23J3eXBsand2d2BsdfHx8Ts6OdDQz+rs7k9WW05RVurd0evu70RJTmFVU4SEg1JUVllgZjg+Qz4/QtvPwS8uL5+nsyYpLu7t7N3e3lFSU+zu77i5uGVlZ9rZ2O3v8fv7/FBTWNTU0/Hw7jVARoiFgu/w8Xx7epKcphMQD7i4t/Xx7bOztFVaYTQ2O2pvc6KipJidp6yrqENMV5CQj5ahqeHj5dXV1UM2LtHR0llZWDxJUr3H09PU1G5tbvn6+5ydnXaEjDU1NTI4PSIiIllYWDs9QHB8gvX19Z6rtfn6+vLy8r++vpCRkE5PUkpLUUNFSkdHSFFUWGhxd66tq2t0ezlCR4qKiYiIiouLi1VXXu7p5YiTmmJnbr/Av1lcXbG3u2hmZa+yua+5wnl5eZiYlqmmpNjW1oeHhjg7QYqKiiopKTI1N7nEyqq1vCImKztFTJKQkFlcYCQmJvb4+DA4Q399e8vGwVxaWIuXnkpMUWBiacbHxqKhoZ6dnV9hY4iQlh0dH2BpcWBlajQ+RURBQBcaH8zMzMHBxQ4RFB0dHr29vF9fYqampxISFPz8/J6QgywrLF9eXXF0eP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALAALAAAAAAQABAAAAjoAGHBUuQmhRwglSAJXLiQU6kBmB5IajTGDEOBfFRB0ZNhEJcGXhLBEgJgoZ0VZxxMWQMI1Z4onlwUUoACViRXqU5RIAXLT5IZFnT8oMRohwlNAThYYSKQjZMLaWqg6dMFiY05OCIooZMDgpEQZESEgQMKAwNBhFoZuNSpzqhACEq8KSIK1gQCGywtaYLIR4Ash/DAugICgKNPMrD8kSAmk4YPMZ6s2iLwCAxWWohUYDGiiqEDX25chEUjyKYeQwS0AbOIxGiBk0Ll6aDmUQEerwXeUVHmlak4uReeoNLihZTgCxd4SMAwIAA7';
	image['t10']   =  'R0lGODlhEgASAPfUAC5jKDBlLfr8/j+FO06iSUSQQDFnLkSRQDl5NjFoLi9lKUKNPkOOP0iaQy5hKylWJihUJi5iK0OPP0maQ02iSEqfRUGIPTp6Ni1eKkeLXS9iLD14VEeJVVawUStdJUWSPkSQPkF/UEF9VkB/V3KfoD6EOtvm81GiTNzm8vv8/ixdKTx9OkCEPi9kLEeAcUqRRkGOOEGNOzJpL0GKOTVwLUiYQ1GoTEONPj6DOWiIjj6DOj2COWC3W0V0ckd9aD2AObnK3EV7e1SwTtnk7Z+1xE6BdGa4YkaIVEJ3YS1ZOHehqjl3NUCJOyxYM0J8Wtjj7EmcRWGsXcHV36C71fn7/TdqTkCHPDl7MEORPC9gMi1fJitbJ8jX6EqEctjk5rzN4EGCTypXKPD0+DBnLTyBMjNkPDBpJvf6/TZnUDNtK0KKPSVOHyVOHi1eKS5lK+Lr9E6DhUCKOT1/OD6BQi9mLC9jKkqeRC9lKzdzMzBnLkB9UDBmKy9cOp67z1OrTjVvMl61WarAyUeLVVixU0KOOjZzM9Lf6UWVPEKLPTd1LkGKPdXk7D6GNbrM2kqdRUNzZzVxMuvx+H6rqEaUQU19dy1fKjVoQz1sXWG5XE2NcJi4xS1bKDp4PEiaRO3z+CtZKDJqLDRuLS9jLEWFUyxfKT1+OTBnKCtdJHSeoECJPJ27x87c58bW6idTHzt9N2K0XUKBV0N2fdrm70aYQWm6ZGy+Zzd4LipaIDFpJ1WHe5Wyxa/Gyzd0NC5gKz53VqXB1cXV3TFmLlisU3uhqpCyw0qNY1+dikueRlavUeLp7jd1NC1gKFaZfjBlLjh4LUOJSTVwMbTI2USEU0CHO////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANQALAAAAAASABIAAAj/AKkJHEhw4JkpQZhlKsiQGisSYAbM0NNwIBVdTsjEgDECSEVqYoZxYsQAS4ZoH7lQWhHnwIdnuz6uQuKMSYEahzYkq2jIx5VUEqBQIJQrUkEUwBo9SjStwDEhduYEIviG2CU+TULhWDBhEDIQWYgM/NJjU6s1dX4ommQDEwE1oHIMjLVsC4YHFywwqMAD0KwSd5JoEuiikgM5haDdaNChlp8Frj6xKaNKQJdeDhDo+LOjgRFajqzgCQPhFponcJpFMKBsSSdhrwggKsVLhgoPlrxIEWEmQDADkF5EOXFgAIIWpE5VGZKiDywae/IkoONmTIIAojS00YJKgMBFxljYHkqjAIB5AApM4Soii6CnX5KKCeJwZJS0EL6UmBAYEAA7';
	
	//button bar
	image['undo']  =  'R0lGODlhFgAWAJECAAAAmQAAAP%2F%2F%2FwAAACH5BAEAAAIALAAAAAAWABYAAAIllI%2Bpy%2B0Po5yUgXsfOJnvln2JuGAk55hlqiJd9VbyTNf2jedPAQA7';
	image['redo']  =  'R0lGODlhFgAWAJECAAAAmQAAAP%2F%2F%2FwAAACH5BAEAAAIALAAAAAAWABYAAAImlI%2Bpy%2B0Po5z0gHtptsC6rnQbAyZYuaDcmKqnGsLVTNf2jec6VQAAOw%3D%3D';
	image['link']  =  'R0lGODlhFgAWALMBAP%2F%2F%2F%2F%2F%2F%2F39%2FfwAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAEALAAAAAAWABYAAAQ%2BMMhJq7046827%2F2AoZsJjmtJpClcJAJP5xmz1wGr%2BpNa93zBJKfDrpXQnXmU4KT1qKSjFmSSqpKOsdsvteiMAOw%3D%3D';
	image['unlink']=  'R0lGODlhFQAUAPcEAAAAAJCdsszMzP%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAQALAAAAAAVABQAAAhcAAkIHEiwoMGDCBMqXDjwX8OHDB0SkCiRocWC%2FzJqFKixIkYBA0BSBCnS4D%2BRGTl2LEnw3wCPJgXAPPmyo0qaMCeSfMlxZ86bFDv%2BvLiQIkeLFZMSXcq0qVODAQEAOw%3D%3D';
	image['image'] =  'R0lGODlhEgASAKIAAP%2F%2FAAD%2F%2F4CAgICAAACAAIAAAAAAAP%2F%2F%2FyH5BAUUAAcALAAAAAASABIAAANZeLrc%2FlAZQaulhokyuO9gtgiDYZ5oISpbFhwvIB%2BlVr74ASiq1r8CmLA2uh2ClECwN%2BoFWUgiq%2FQ8HilMVqF6Ia2OA8JBTB63fIS0ei0Ff96dL2o%2Bj9jvkAQAOw%3D%3D';
	image['table'] =  'R0lGODlhEgASAKIAAP%2F%2F%2F8zMzAAzmQAAAP%2F%2F%2FwAAAAAAAAAAACH5BAUUAAQALAAAAAASABIAAAM%2BSLrc%2FpCMSasdaojNe8eSJ3LgAARAiqrpWZ7tCqtlYN84%2Fsp8vMdAWiZHvP1YSFdmxuTVisTSZTqJWK%2FYbAIAOw%3D%3D';
	image['bold']  =  'R0lGODlhFQAUAIABAAAAAP///yH5BAEAAAEALAAAAAAVABQAAAIkjI+py+0Po1Sg2iqt0ZDz52HdJY7AVjrhaaKsSqbTTNf2jR8FADs=';
	image['italic']=  'R0lGODlhFQAUAJECAICAgAAAAP///wAAACH5BAEAAAIALAAAAAAVABQAAAIglI+py+0Po3Sh1mkqwAJcrnFewAkhNpanZFnlC8fyDBUAOw==';
	image['underline']='R0lGODlhFQAUAJECAICAgAAAAP///wAAACH5BAEAAAIALAAAAAAVABQAAAIplI+py+0Po1ShBmEvrIdHj2mbCD5g6ZyiSa5pAAgA+lrTjWQ6zvf+XQAAOw==';
	image['striket']= 'R0lGODlhFQAUAJECAAAAMwAAAAAAAAAAACH5BAEAAAIALAAAAAAVABQAAAIllI%2Bpy%2B0Po2Sh2hAr0pAf3HmTcEnXWZpiA36tI64UOtb2jedCAQA7';
	image['supers']=  'R0lGODlhFQAVAJEAAIAAAAAAAP%2F%2F%2FwAAACH5BAEAAAIALAAAAAAVABUAAAIhlI%2Bpy%2B0Po4wATGWvyZr3%2BgSBIV5iqaHmuZKjBsfyTGsFADs%3D';
	image['subs']  =  'R0lGODlhFQAVAJEAAAAAgAAAAP%2F%2F%2FwAAACH5BAEAAAIALAAAAAAVABUAAAIglI%2Bpy%2B0Po5y0hmAuvdpi30mdBgAVYp5ptbLlCcfy7BQAOw%3D%3D';
	image['left']  =  'R0lGODlhFQAUAIABAAAAAP///yH5BAEAAAEALAAAAAAVABQAAAIfjI+py+0PGZi01oiDtbnrDXoPSIkYuZkNCqjuC8dIAQA7';
	image['center']=  'R0lGODlhFQAUAIABAAAAAP///yH5BAEAAAEALAAAAAAVABQAAAIejI+py+0PGZi01oiPtTnvD3QYOIkRyZkPqrbuCy8FADs=';
	image['right'] =  'R0lGODlhFQAUAIABAAAAAP///yH5BAEAAAEALAAAAAAVABQAAAIejI+py+0PGZi01oiTtTnuD3QdOIkPyZkeqbbuCycFADs=';
	image['full']  =  'R0lGODlhFQAVAPcAAMDAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAVABUAQAg4AAEIHEiwoMGB%2FxIqXLjwoMOHBBlKVHhw4kSIGDNqRGiRYcWODQ2CDLmxpMmTKFOqXMmypUuXAQEAOw%3D%3D';
	image['olist'] =  'R0lGODlhFQAUAJECAAAAgAAAAP///wAAACH5BAEAAAIALAAAAAAVABQAAAImlI+py+0PHgPRhIvxlItWDjpUqFTZuZGGp7YI235n1nzh6Oa6WwAAOw==';
	image['ulist'] =  'R0lGODlhFQAUAJECAAAAgAAAAP///wAAACH5BAEAAAIALAAAAAAVABQAAAIklI+py+0O4lsRmIBzpnL6DyZVaIyChnIWybZiF5qoprr2jX8FADs=';
	image['hrule'] =  'R0lGODlhFQAUAPcDAIiNnYCAgAAAAP%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAMALAAAAAAVABQAAAhIAAcIHEiwoMGDCBMqXMhQYYCGBh8%2BHBCgosWKCC1CJChR4EWNG0OKFPivpMmTJw%2BiXGly5MKJIjtS%2FIjxIMiQMmnCdMmzp8GAADs%3D';
	image['indent']=  'R0lGODlhFQAUAJECAAAAgAAAAP///wAAACH5BAEAAAIALAAAAAAVABQAAAIrlI+py63hojyhQovr3AKgjC2AZ4BWMqbcMVKZQ5bvuoWmRjs2lPelDwxGCgA7';
	image['outdent']= 'R0lGODlhFQAUAJECAAAAgAAAAP///wAAACH5BAEAAAIALAAAAAAVABQAAAIrlI+py63hojyhQovr3AKgjCmAR4EaMqacMX6ZQxrgyoXmSTc2lPeyDwxGCgA7';
	image['unformat']='R0lGODlhFQAUAPcFAJSetcDAwAAAAICAgP%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAUALAAAAAAVABQAAAhdAAsIHEiwoMGDCBMqXMiw4cAB%2FyL%2BGzCg4b8ABDAGCPCP4cWMICEu%2FKiRwMSOCUmCnEgxZUmMLFEeVAmTokyDEDfqjKnwos6NJ0f%2BBHoTIUSJESs6XMq0qdOnSwMCADs%3D';
}


//load language
function loadLanguage()
{
	var ext = server.substring(server.lastIndexOf('.')+1);
	
		
	//English (default)
	lang['VILLAGE_MANAGER'] = 'Village Manager';
	lang['VILLAGE'] = 'Village';
	lang['ALREADY_LIST'] = 'is already in the list';
	lang['ADD_VILLAGE']  = 'Add to';
	lang['NO_VILLAGES'] = 'No villages in the list!';
	lang['MAP'] = 'Map';
	lang['PLAYER'] = 'Player';
	lang['PLAYER_PROFILE'] = 'Player profile';
	lang['ALLY'] = 'Ally';
	lang['ALLY_PROFILE'] = 'Ally profile';
	lang['DISTANCE'] = 'Distance';
	lang['DISTANCE_VILLAGE'] = 'Distance from';
	lang['DELETE'] = 'Delete';
	lang['SEND_TROOPS'] = 'Send troops';
	lang['DRAG'] = 'Drag';
	lang['HIDE'] = 'Hide';
	lang['SHOW'] = 'Show';
	lang['SORT_BY'] = 'Sort by';
	lang['MINIMIZE'] = 'Minimize';
	lang['MAXIMIZE'] = 'Maximize';
	lang['YOUR_VILLAGE'] = 'your village';
	lang['COLUMNS'] = 'columns';
	lang['OPTIONS'] = 'options';
	lang['SEND_RESOURCES'] = 'Send resources';
	lang['VILLAGE_PROFILE'] = 'Village profile';
	lang['OTHER_OPTIONS'] = 'Other options';
	lang['DELETE_ALL'] = 'Delete all villages';
	lang['RESTORE'] = 'Default settings';
	lang['CONFIRM'] = 'Are you sure?';
	lang['LUMBER'] = 'lumber';
	lang['CLAY'] = 'clay';
	lang['IRON'] = 'iron';
	lang['CROP'] = 'crop';
	lang['TRIBE'] = 'Tribe';
	lang['ROMANS'] = 'Romans';
	lang['GAULS'] = 'Gauls';
	lang['TEUTONS'] = 'Teutons';
	lang['UPDATE_CHECK'] = 'Check for updates';
	lang['LAST_VERSION'] = 'You have the last version available';
	lang['NEW_VERSION'] = 'A new version is available';
	lang['UPDATE_NOW'] = 'Update now';
	lang['DATE'] = 'Date';
	lang['POPULATION'] = 'Population';
	lang['SERVER_DOWN'] = 'Stats server is not responding, please retry later...';
	lang['CLOSE'] = 'Close';
	lang['TYPE'] = 'Type';
	lang['VILLAGE_TYPE'] = 'Type of village';
	lang['F1'] = '9 crop (3-3-3-9)';
	lang['F2'] = '+iron (3-4-5-6)';
	lang['F3'] = 'normal (4-4-4-6)';
	lang['F4'] = '+clay (4-5-3-6)';
	lang['F5'] = '+lumber (5-3-4-6)';
	lang['F6'] = '15 crop (1-1-1-15)';
	lang['W1'] = '+25% lumber per hour';
	lang['W2'] = '+25% lumber per hour';
	lang['W3'] = '+25% lumber & +25% crop per hour';
	lang['W4'] = '+25% clay per hour';
	lang['W5'] = '+25% clay per hour';
	lang['W6'] = '+25% clay & +25% crop per hour';
	lang['W7'] = '+25% iron per hour';
	lang['W8'] = '+25% iron per hour';
	lang['W9'] = '+25% iron & +25% crop per hour';
	lang['W10'] = '+25% crop per hour';
	lang['W11'] = '+25% crop per hour';
	lang['W12'] = '+50% crop per hour';
	lang['WIDTH'] = 'Width of';
	lang['SAVE'] = 'Save';
	lang['TROOPS'] = 'Troops';
	lang['TIME'] = 'Time';
	lang['ARRIVAL'] = 'Arrival';
	lang['TOT'] = 'Time of travel';
	lang['TOURNAMENT'] = 'Arena level';
	lang['SPEED'] = 'Speed server';
	lang['POPUPS'] = 'Popups';
	lang['TAG'] = 'Tag';
	lang['NO_TAG'] = 'No villages with tag';
	lang['FILTER'] = 'Filter by: ';
	lang['ADD'] = 'Add';
	lang['REMOVE'] = 'Remove';
	lang['NOTE'] = 'Note';
	lang['EDIT'] = 'Edit';
	lang['START_EDITING'] = 'Start editing first!';
	lang['LINK'] = 'Link';
	lang['IMAGE'] = 'Image';
	lang['BOLD'] = 'Bold';
	lang['ITALIC'] = 'Italic';
	lang['UNDERLINE'] = 'Underline';
	lang['STRIKET'] = 'Strikethrough';
	lang['SUPERS'] = 'Superscript';
	lang['SUBS'] = 'Subscript';
	lang['JLEFT'] = 'Justify left';
	lang['JCENTER'] = 'Justify center';
	lang['JRIGHT'] = 'Justify right';
	lang['JFULL'] = 'Justify full';
	lang['OLIST'] = 'Ordered list';
	lang['ULIST'] = 'Unordered list';
	lang['HRULE'] = 'Horizontal rule';
	lang['INDENT'] = 'Indent';
	lang['OUTDENT'] = 'Outdent';
	lang['UNFORMAT'] = 'Remove format';
	lang['COLOR'] = 'Text color';
	lang['IE_DATA'] = 'Import/Export data';
        lang['IE'] = 'تعريب : Jack Krauser';
	
	switch(ext) {
		case 'it': //Italian, translation by dbKiller
			lang['VILLAGE'] = 'Villaggio';
			lang['ALREADY_LIST'] = 'è già nella lista';
			lang['ADD_VILLAGE'] = 'Aggiungi a';
			lang['NO_VILLAGES'] = 'Nessun villaggio nella lista!';
			lang['MAP'] = 'Mappa';
			lang['PLAYER'] = 'Giocatore';
			lang['PLAYER_PROFILE'] = 'Profilo giocatore';
			lang['ALLY'] = 'Alleanza';
			lang['ALLY_PROFILE'] = 'Profilo alleanza';
			lang['DISTANCE'] = 'Distanza';
			lang['DISTANCE_VILLAGE'] = 'Distanza da';
			lang['DELETE'] = 'Cancella';
			lang['SEND_TROOPS'] = 'Invia truppe';
			lang['DRAG'] = 'Trascina';
			lang['HIDE'] = 'Nascondi';
			lang['SHOW'] = 'Mostra';
			lang['SORT_BY'] = 'Ordina per';
			lang['MINIMIZE'] = 'Riduci';
			lang['MAXIMIZE'] = 'Ingrandisci';
			lang['YOUR_VILLAGE'] = 'tuo villaggio';
			lang['COLUMNS'] = 'colonne';
			lang['OPTIONS'] = 'opzioni';
			lang['SEND_RESOURCES'] = 'Invia risorse';
			lang['VILLAGE_PROFILE'] = 'Profilo villaggio';
			lang['OTHER_OPTIONS'] = 'Altre opzioni';
			lang['DELETE_ALL'] = 'Cancella tutti i villaggi';
			lang['RESTORE'] = 'Impostazioni di default';
			lang['CONFIRM'] = 'Sei sicuro?';
			lang['LUMBER'] = 'legno';
			lang['CLAY'] = 'argilla';
			lang['IRON'] = 'ferro';
			lang['CROP'] = 'grano';
			lang['TRIBE'] = 'Tribù';
			lang['ROMANS'] = 'Romani';
			lang['GAULS'] = 'Galli';
			lang['TEUTONS'] = 'Teutoni';
			lang['UPDATE_CHECK'] = 'Cerca aggiornamenti';
			lang['LAST_VERSION'] = 'Hai l\'ultima versione disponibile';
			lang['NEW_VERSION'] = 'E\' disponibile una nuova versione';
			lang['UPDATE_NOW'] = 'Aggiornare adesso';
			lang['DATE'] = 'Data';
			lang['POPULATION'] = 'Popolazione';
			lang['SERVER_DOWN'] = 'Il server delle statistiche non è disponibile, riprova più tardi...';
			lang['CLOSE'] = 'Chiudi';
			lang['TYPE'] = 'Tipo';
			lang['VILLAGE_TYPE'] = 'Tipo di villaggio';
			lang['F1'] = 'pulcino (3-3-3-9)';
			lang['F2'] = '+ferro (3-4-5-6)';
			lang['F3'] = 'normale (4-4-4-6)';
			lang['F4'] = '+argilla (4-5-3-6)';
			lang['F5'] = '+legno (5-3-4-6)';
			lang['F6'] = 'canarino (1-1-1-15)';
			lang['W1'] = '+25% legno ogni ora';
			lang['W2'] = '+25% legno ogni ora';
			lang['W3'] = '+25% legno & +25% grano ogni ora';
			lang['W4'] = '+25% argilla ogni ora';
			lang['W5'] = '+25% argilla ogni ora';
			lang['W6'] = '+25% argilla & +25% grano ogni ora';
			lang['W7'] = '+25% ferro ogni ora';
			lang['W8'] = '+25% ferro ogni ora';
			lang['W9'] = '+25% ferro & +25% grano ogni ora';
			lang['W10'] = '+25% grano ogni ora';
			lang['W11'] = '+25% grano ogni ora';
			lang['W12'] = '+50% grano ogni ora';
			lang['WIDTH'] = 'Larghezza';
			lang['SAVE'] = 'Salva';
			lang['TROOPS'] = 'Truppe';
			lang['TIME'] = 'Tempo';
			lang['ARRIVAL'] = 'Arrivo';
			lang['TOT'] = 'Tempo di percorrenza';
			lang['TOURNAMENT'] = 'Livello arena';
			lang['SPEED'] = 'Speed server';
			lang['POPUPS'] = 'Popups';
			lang['TAG'] = 'Tag';
			lang['NO_TAG'] = 'Nessun villaggio ha il tag';
			lang['FILTER'] = 'Filtra per: ';
			lang['ADD'] = 'Aggiungi';
			lang['REMOVE'] = 'Rimuovi';
			lang['NOTE'] = 'Nota';
			lang['EDIT'] = 'Avvia modalità editor';
			lang['START_EDITING'] = 'Devi avviare la modalità editor!';
			lang['LINK'] = 'Link';
			lang['IMAGE'] = 'Immagine';
			lang['BOLD'] = 'Grassetto';
			lang['ITALIC'] = 'Corsivo';
			lang['UNDERLINE'] = 'Sottolineato';
			lang['STRIKET'] = 'Barrato';
			lang['SUPERS'] = 'Apice';
			lang['SUBS'] = 'Pedice';
			lang['JLEFT'] = 'Allinea a sinistra';
			lang['JCENTER'] = 'Allinea al centro';
			lang['JRIGHT'] = 'Allinea a destra';
			lang['JFULL'] = 'Giustificato';
			lang['OLIST'] = 'Elenco numerato';
			lang['ULIST'] = 'Elenco puntato';
			lang['HRULE'] = 'Riga orizzontale';
			lang['INDENT'] = 'Aumenta rientro';
			lang['OUTDENT'] = 'Riduci rientro';
			lang['UNFORMAT'] = 'Rimuovi formattazione';
			lang['COLOR'] = 'Colore del testo';
			lang['IE_DATA'] = 'Import/Export dati';
                        lang['IE'] = 'تعريب : Jack Krauser';
			break;
		case 'ae': //Arabic by Jack Krauser
                        lang['VILLAGE_MANAGER'] = 'مدير القرى';
			lang['VILLAGE'] = ' القرية ';
			lang['ALREADY_LIST'] = 'في القائمة';
			lang['ADD_VILLAGE']  = 'إضافة قرية';
			lang['NO_VILLAGES'] = 'لا يوجد قرى في القائمة';
			lang['MAP'] = 'الخريطة';
			lang['PLAYER'] = 'اللاعب';
			lang['PLAYER_PROFILE'] = 'وصف اللاعب';
			lang['ALLY'] = ' التحالف';
			lang['ALLY_PROFILE'] = 'وصف التحالف';
			lang['DISTANCE'] = 'المسافة';
			lang['DISTANCE_VILLAGE'] = 'المسافة من';
			lang['DELETE'] = 'مسح';
			lang['SEND_TROOPS'] = ' إرسال قوات';
			lang['DRAG'] = 'تحريك';
			lang['HIDE'] = 'إخفاء';
			lang['SHOW'] = 'إظهار';
			lang['SORT_BY'] = ' ';
			lang['MINIMIZE'] = 'تصغير';
			lang['MAXIMIZE'] = 'تكبير';
			lang['YOUR_VILLAGE'] = 'قريتك';
			lang['COLUMNS'] = 'الأعمدة';
			lang['OPTIONS'] = 'الخيارات ';
			lang['SEND_RESOURCES'] = 'إرسال موارد';
			lang['VILLAGE_PROFILE'] = 'ملف القرية';
			lang['OTHER_OPTIONS'] = ' خيارات أخرى ';
			lang['DELETE_ALL'] = 'مسح كافة القرى';
			lang['RESTORE'] = 'الخيارات الأساسية';
			lang['CONFIRM'] = 'أنت متأكد ؟';
			lang['LUMBER'] = 'الخشب';
			lang['CLAY'] = 'الطين';
			lang['IRON'] = 'الحديد';
			lang['CROP'] = 'القمح';
			lang['TRIBE'] = 'القبيلة';
			lang['ROMANS'] = 'الرومان';
			lang['GAULS'] = 'الإغريق';
			lang['TEUTONS'] = 'الجرمان';
			lang['UPDATE_CHECK'] = 'بحث عن تحديثات';
			lang['LAST_VERSION'] = 'النسخة الأخيرة متوفرة لديك';
			lang['NEW_VERSION'] = 'النسخة الجديدة متوفرة';
			lang['UPDATE_NOW'] = 'تحديث الآن';
			lang['DATE'] = 'التاريخ';
			lang['POPULATION'] = 'السكان';
			lang['SERVER_DOWN'] = 'خادم الإحصائيات لايرد ... حاول مرة أخرى لاحقاً ...';
			lang['CLOSE'] = 'إغلاق';
			lang['TYPE'] = 'النوع';
			lang['VILLAGE_TYPE'] = 'نوع القرية';
			lang['F1'] = '9 crop (3-3-3-9)';
			lang['F2'] = '+iron (3-4-5-6)';
			lang['F3'] = 'normal (4-4-4-6)';
			lang['F4'] = '+clay (4-5-3-6)';
			lang['F5'] = '+lumber (5-3-4-6)';
			lang['F6'] = '15 crop (1-1-1-15)';
			lang['W1'] = '+25% في الساعة';
			lang['W2'] = '+25% في الساعة';
			lang['W3'] = '+25% lumber & +25% crop per hour';
			lang['W4'] = '+25% clay per hour';
			lang['W5'] = '+25% clay per hour';
			lang['W6'] = '+25% clay & +25% crop per hour';
			lang['W7'] = '+25% iron per hour';
			lang['W8'] = '+25% iron per hour';
			lang['W9'] = '+25% iron & +25% crop per hour';
			lang['W10'] = '+25% crop per hour';
			lang['W11'] = '+25% crop per hour';
			lang['W12'] = '+50% crop per hour';
			lang['WIDTH'] = 'عرض';
			lang['SAVE'] = 'حفظ';
			lang['TROOPS'] = 'الوحدات';
			lang['TIME'] = 'الوقت';
			lang['ARRIVAL'] = 'الوصول';
			lang['TOT'] = 'وقت الوصول';
			lang['TOURNAMENT'] = 'مستوى ساحة المعركة';
			lang['SPEED'] = 'سيرفر سريع';
			lang['POPUPS'] = 'السكان';
			lang['TAG'] = 'المجموعة';
			lang['NO_TAG'] = 'لايوجد قرى في المجموعة';
			lang['FILTER'] = 'اختر قائمة: ';
			lang['ADD'] = 'إضافة';
			lang['REMOVE'] = 'إزالة';
			lang['NOTE'] = 'المفكرة';
			lang['EDIT'] = 'تعديل';
			lang['START_EDITING'] = 'اضغط على تعديل أولاً!';
			lang['LINK'] = 'رابط';
			lang['IMAGE'] = 'صورة';
			lang['BOLD'] = 'عريض';
			lang['ITALIC'] = 'مائل';
			lang['UNDERLINE'] = 'تسطير';
			lang['STRIKET'] = 'Strikethrough';
			lang['SUPERS'] = 'Superscript';
			lang['SUBS'] = 'Subscript';
			lang['JLEFT'] = 'محاذاة لليسار';
			lang['JCENTER'] = 'توسيط';
			lang['JRIGHT'] = 'محاذاة لليمين';
			lang['JFULL'] = 'ضبط';
			lang['OLIST'] = 'ترقيم';
			lang['ULIST'] = 'ترقيم';
			lang['HRULE'] = 'Horizontal rule';
			lang['INDENT'] = 'Indent';
			lang['OUTDENT'] = 'Outdent';
			lang['UNFORMAT'] = 'إزالة التنسيق';
			lang['COLOR'] = 'لون الخط';
			lang['IE_DATA'] = 'استيراد/تصدير بيانات';
                        lang['IE'] = 'تعريب : Jack Krauser';
			break;
	}
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


//update the script (by Richard Gibson)
function updateScript(SCRIPT) {
	try {
		if (!GM_getValue) return;
		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT.url + '?source', // don't increase the 'installed' count just for checking
			onload: function(result) {
				if (result.status != 200) return;
				if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
				var theOtherVersion = parseFloat(RegExp.$1);
				if (theOtherVersion == parseFloat(SCRIPT.version)) {
					alert(lang['LAST_VERSION']+' (v'+SCRIPT.version+')');
					return;
				} else if (theOtherVersion < parseFloat(SCRIPT.version)) {
					alert('You have a beta version (v'+SCRIPT.version+' beta)');
					return;
				} else {
					if (window.confirm(lang['NEW_VERSION']+' (v'+theOtherVersion+')!\n\n'+lang['UPDATE_NOW']+'?\n')) {
						GM_openInTab(SCRIPT.url);
					}
				}
			}
		});
	} catch (ex) {
	}
}


/************************ from Drag n drop******************************/
// by Risi http://userscripts.org/
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
	document.addEventListener('mousemove', mouseMove, false);
	document.addEventListener('mousedown', mouseDown, false);
	document.addEventListener('mouseup', mouseUp, false);
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
/************************ end Drag n drop*******************************/


/************************ from Sort table*******************************/
//modified from http://greasemonkey.nakohdo.de/

function ts_makeSortable(table)
{
	//get header
	headersRow = table.tHead.rows[0];
	if (!headersRow) return;
	//make headers content clickable (only for columns 1,2,3,4,5,6,7)
	for (var i=0; i<headersRow.cells.length; i++)
	{
		if (i==1 || i==2 || i==3 || i==4 || i==5 || i==6 || i==7) {
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
	if (col == '5') {
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
function getParent(el, pTagName)
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
/************************ end Sort table*******************************/


/************************ from QP Targets*****************************/
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
/************************ end QP Targets *****************************/


/*********************** from Resources++ ****************************/
// get time from the page or use java time
function getTime(){
	//the time on the page server
	var pagetime;
	// is the pagetime 24 or 12 based clock
	var military=true; 
	var servertime = dom.id('tp1').textContent;
	if(!servertime) {
		var digital = new Date();
		pagetime = [digital.getHours(), digital.getMinutes(), digital.getSeconds()];
		if (pagetime[0]>12) military=true;
		return;
	}
	pagetime = timeField(servertime);
	servertime = pagetime;
	if (servertime == -1) {
		var digital = new Date();
		pagetime = [digital.getHours(), digital.getMinutes(), digital.getSeconds()];
	} 
	if (pagetime[0]>12) military=true;
	return pagetime;
	
	// convert a hh:mm:ss time stamp to seconds
	function timeField(time) { 
		var limit = time.split(':');
		return (limit.length == 3) ? ([parseInt(limit[0]) , parseInt(limit[1]) , parseInt(limit[2])]) : -1;
	}
}
/************************ end Resources++ ****************************/


/************************* from FranMod *****************************/
function DOMUtils(doc, ctxt, html) {
	this.cn = function(tag, html) {
		var elem = this.document.createElement(tag);
		if (html) elem.innerHTML = html;
		return elem;
	}

	this.ct = function(text) {
		return this.document.createTextNode(text);
	}

	this.id = function(id) {
		return this.document.getElementById(id);
	}

	this.tag = function(tag) {
		return this.document.getElementsByTagName(tag);
	}

	this.xs = function(xpath) {
		var res = this.document.evaluate(xpath, this.context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return res.singleNodeValue;
	}

	this.xa = function(xpath) {
		var arr = [];
		var xpr = this.document.evaluate(xpath, this.context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr.length == 0? null: arr;
	}

	this.xo = function(xpath) {
		var ret = this.document.evaluate(xpath, this.context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		return ret; //no snapshot
	}

	if (!doc) doc = document;
	if (!ctxt) ctxt = doc;
	if (html) {
		this.document = doc.implementation.createDocument('', '', null);
		this.context = doc.createElement('div');
		this.context.innerHTML = html;
	        ansDoc.appendChild(this.context);
	}
	else {
		this.document = doc;
		this.context = ctxt;
	}
}
/************************** end FranMod *****************************/