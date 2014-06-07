// ==UserScript==
// @name           GLB Compare Roster Players
// @namespace      GLB
// @description    Compare players by picking players and attributes you want to compare
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

/****
Version 1.4
****/
var CACHE = {};

function PlayerCompare(){
	// apply css
	var css = document.createElement('STYLE');
	css.setAttribute('type','text/css');
	$(css).text('a img {border: 0;}table.sortable {	border-spacing: 0;	border: 1px solid #000;	border-collapse: collapse;}table.sortable th, table.sortable td {	text-align: left;	padding: 2px 4px 2px 4px;	width: 100px;	border-style: solid;	border-color: #444;}table.sortable th {	border-width: 0px 1px 1px 1px;	background-color: #ccc;}table.sortable td {	border-width: 0px 1px 0px 1px;}table.sortable tr.odd td {	background-color: #ddd;}table.sortable tr.even td {	background-color: #fff;}table.sortable tr.sortbottom td {	border-top: 1px solid #444;	background-color: #ccc;	font-weight: bold;} table.sortable th a { color:#000000; text-decoration:none; font-weight:bold;}');	
	document.getElementsByTagName("HEAD")[0].appendChild(css);
	
	// variables
	this.playerCheckboxes = [];
	this.attCheckboxes = [];
	
	// start functions
	this.addCheckBoxes();
	this.addAttributes();
	this.addButton();
	this.addGroupings();
};
PlayerCompare.prototype = {};

PlayerCompare.prototype.addGroupings = function(){
	var that = this;
	var areas = $('DIV#content DIV.medium_head');
	
	// offense
	var link = document.createElement('A');
	link.href = 'javascript:void(0);';
	$(link).bind('click',function(){
		that.selectBoxes(0);
	});
	$(link).text('Select all offense for player compare');
	areas[2].appendChild(link);
	
	// defense
	link = document.createElement('A');
	link.href = 'javascript:void(0);';
	$(link).bind('click',function(){
		that.selectBoxes(1);
	});
	$(link).text('Select all defense for player compare');
	areas[3].appendChild(link);
	
	// kicker
	var link = document.createElement('A');
	link.href = 'javascript:void(0);';
	$(link).bind('click',function(){
		that.selectBoxes(2);
	});
	$(link).text('Select all kickers for player compare');
	areas[4].appendChild(link);
};

PlayerCompare.prototype.selectBoxes = function(idx){
	//  playerCompareChkBox
	var table = $('DIV#content table.players')[idx];
	jQuery.each($('INPUT.playerCompareChkBox',table),function(){
		this.checked = true;
	});
};

PlayerCompare.prototype.addButton = function(){
	var btn = document.createElement('INPUT');
	btn.setAttribute('type','button');
	var that = this;
	$(btn).bind('click',function(){
		that.startCompare();
	});
	btn.value = 'Start Compare';
	this.attsHolder.appendChild(btn);
	this.tableHolder = document.createElement('DIV');
	this.attsHolder.appendChild(this.tableHolder);
};

PlayerCompare.prototype.startCompare = function(){
	if(!this.validateFields()){
		return;
	}
	
	this.resultsDiv.innerHTML = '<img height="100" width="100" src="http://www.shougun.it/images/loading.gif"></img>';
	this.usedPlayers = [];
	this.usedAtts = [];
	this.grabUsedInfo();
	this.totalPlayers = this.usedPlayers.length;
	this.calledPlayers = 0;
	this.startPlayerCalls();
};

PlayerCompare.prototype.startPlayerCalls = function(){
	for(var i=0;i<this.usedPlayers.length;i++){
		this.makeAjaxCall(this.usedPlayers[i].link,i);
	}
};

PlayerCompare.prototype.makeAjaxCall = function(link,i){
	if(CACHE[link]){
		console.log('From cache ' + link);
		this.postAjaxCall(CACHE[link],i);
		return;
	}
	that = this;
	$.ajax({
		url:link,
		success: function(html){
			console.log('Success on ' + link);
			CACHE[link] = html;
			that.postAjaxCall(html,i);
		}
	});
};

PlayerCompare.prototype.postAjaxCall = function(html,i){
	this.processPlayerInfo(html,i);
	this.calledPlayers++;
	if(this.calledPlayers == this.totalPlayers){
		this.buildTable();
	}
};

PlayerCompare.prototype.buildTable = function(){
	this.resultsDiv.innerHTML = '';
	this.table = document.createElement('TABLE');
	$(this.table).css({
		'width':'95%',
		'margin-left':'auto',
		'margin-right':'auto'
	});
	this.table.setAttribute('cellPadding','1px');
	this.table.setAttribute('border','1');
	this.table.setAttribute('class','sortable');
	this.table.setAttribute('id','someid');
	this.resultsDiv.appendChild(this.table);
	this.tbody = document.createElement('TBODY');
	this.table.appendChild(this.tbody);
	var row = document.createElement('TR');
	this.tbody.appendChild(row);
	
	// player name
	var th = document.createElement('TH');
	$(th).text('Player Name');
	row.appendChild(th);
	
	// level
	th = document.createElement('TH');
	$(th).text('Level');
	row.appendChild(th);
	
	// position
	th = document.createElement('TH');
	$(th).text('Position');
	row.appendChild(th);
	
	// atts we want
	for(var i=0;i<this.usedAtts.length;i++){
		th = document.createElement('TH');
		$(th).text(this.usedAtts[i]);
		row.appendChild(th);
	}
	
	this.closedBuilds = [];
	this.addPlayersToTable();
	this.addClosedBuilds();
};

PlayerCompare.prototype.addClosedBuilds = function(){
	if(this.closedBuilds.length == 0){
		return;
	}
	
	var text = 'The following builds are closed: ';
	for(var i=0;i<this.closedBuilds.length;i++){
		if(i != 0){
			text += ', ';
		}
		text += '<a target="_blank" href="' + this.closedBuilds[i].link + '">' + this.closedBuilds[i].name + '</a>';
	}
	var textDoc = document.createElement('textNode');
	textDoc.innerHTML = text;
	this.resultsDiv.appendChild(textDoc);
};

PlayerCompare.prototype.addPlayersToTable = function(){
	for(var i=0;i<this.usedPlayers.length;i++){
		var player = this.usedPlayers[i];
		if(!player.isClosed){
			var row = document.createElement('TR');
			this.tbody.appendChild(row);
			
			// player name
			var td = document.createElement('TD');
			td.innerHTML = '<a target="_blank" href="' + player.link + '">' + player.name + '</a>';
			row.appendChild(td);
			
			// level
			td = document.createElement('TD');
			$(td).text(player.level);
			row.appendChild(td);
			
			// position
			td = document.createElement('TD');
			$(td).text(player.position);
			row.appendChild(td);
			
			// the atts
			for(var j=0;j<this.usedAtts.length;j++){
				td = document.createElement('TD');
				$(td).text(player.stats[this.usedAtts[j].toUpperCase()]);
				row.appendChild(td);
			}
		}else{
			this.closedBuilds.push(player);
		}
	}
	sortables_init();
};

PlayerCompare.prototype.processPlayerInfo = function(html,idx){
	var openTest = $('DIV#player_stats',html);
	if(openTest.length < 1){
		this.usedPlayers[idx].isClosed = true;
		return;
	}
	var divs = $('DIV#player_stats DIV.stat_container',html);
	this.usedPlayers[idx].stats = {};
	for(var i=0;i<divs.length;i++){
		var vals = $('DIV',divs[i]);
		if(vals.length > 2){
			var stat = vals[3].innerHTML;
			var att = vals[2].innerHTML;
		}else{
			var stat = vals[1].innerHTML;
			var att = vals[0].innerHTML;
		}
		if(stat.indexOf(' ') != -1){
			stat = stat.split(' ')[0];
		}
		this.usedPlayers[idx].stats[att.replace(/:/,'').toUpperCase()] = stat;
	}
};

PlayerCompare.prototype.grabUsedInfo = function(){
	var players = [];
	// grab all the checked players
	for(var i=0;i<this.playerCheckboxes.length;i++){
		if(this.playerCheckboxes[i].checked){
			players.push(this.playerCheckboxes[i]);
		}
	}
	
	// grab all the checked attributes
	for(i=0;i<this.attCheckboxes.length;i++){
		if(this.attCheckboxes[i].checked){
			this.usedAtts.push(this.attCheckboxes[i].getAttribute('theAtt'));
		}
	}
	
	// get useful info about the players
	for(i=0;i<players.length;i++){
		var playerObj = {};
		playerObj.tr = this.getParentNode(players[i],'TR');
		var a = $('TD.player_name_short SPAN A, TD.player_name SPAN A',playerObj.tr)[0];
		playerObj.name = a.innerHTML;
		playerObj.link = 'http://goallineblitz.com' + a.getAttribute('href');
		playerObj.id = a.getAttribute('href').split('=')[1];
		playerObj.position = $('TD.player_position DIV',playerObj.tr)[0].innerHTML;
		playerObj.level = $('TD.player_level',playerObj.tr)[0].innerHTML;
		this.usedPlayers.push(playerObj);
	}
};

PlayerCompare.prototype.getParentNode = function(elm,nodeName){
	var result = false;
	while(elm.parentNode){
		elm = elm.parentNode;
		if(elm.tagName.toUpperCase() == nodeName.toUpperCase()){
			result = elm;
			break;
		}
	}
	return result;
};

PlayerCompare.prototype.validateFields = function(){
	//cycle through players to make sure at least 1 player is chosen
	var good = false;
	for(var i=0;i<this.playerCheckboxes.length;i++){
		if(this.playerCheckboxes[i].checked){
			good = true;
			break;
		}
	}
	if(!good){
		alert('You must select at least 1 player');
		return false;
	}

	// cycle through attributes to make sure at least 1 is checked
	good = false;
	for(i=0;i<this.attCheckboxes.length;i++){
		if(this.attCheckboxes[i].checked){
			good = true;
			break;
		}
	}
	if(!good){
		alert('You must select at least 1 attribute');
		return false;
	}
	return true;
};

PlayerCompare.prototype.addAttributes = function(){
	var atts = ['strength','speed','agility','jumping','stamina','vision','confidence',
		'blocking','tackling','throwing','catching','carrying','kicking','punting']
	var area = $('DIV#content > DIV.medium_head')[0];
	this.attsHolder = document.createElement('Fieldset');
	$(this.attsHolder).css({'border':'1px solid black','margin-top':'15px'});
	var legend = document.createElement('legend');
	$(legend).text('Player Compare Attributes');
	this.attsHolder.appendChild(legend);
	$(area).before(this.attsHolder);
	this.addAttsCheckboxes(atts);
};

PlayerCompare.prototype.addAttsCheckboxes = function(atts){
	var table = document.createElement('TABLE');
	var tbody = document.createElement('TBODY');
	table.appendChild(tbody);
	
	var row = document.createElement('TR');
	tbody.appendChild(row);
	for(var i=0;i<7;i++){
		row.appendChild(this.createAttCheckbox(i,atts))
	}
	
	row = document.createElement('TR');
	tbody.appendChild(row);
	for(var i=7;i<atts.length;i++){
		row.appendChild(this.createAttCheckbox(i,atts))
	}
	this.attsHolder.appendChild(table);
	this.resultsDiv = document.createElement('DIV');
	$(this.resultsDiv).css({'text-align':'center'});
	this.attsHolder.appendChild(this.resultsDiv);
};

PlayerCompare.prototype.createAttCheckbox = function(i,atts){
	var td = document.createElement('TD');
	var textnode = document.createElement('TextNode');
	$(textnode).text(atts[i] + ':');
	var checkbox = document.createElement('INPUT');
	checkbox.setAttribute('type','checkbox');
	checkbox.setAttribute('theAtt',atts[i]);
	td.appendChild(textnode);
	td.appendChild(checkbox);
	$(td).css('width',100);
	this.attCheckboxes.push(checkbox);
	return td;
};

PlayerCompare.prototype.addCheckBoxes = function(){
	var that = this;
	var headers = $('TABLE.players TR.nonalternating_color');
	jQuery.each(headers,function(){
		var newTD = document.createElement('TD');
		$(newTD).text('Player Compare');
		var td = this.children[0];
		$(td).before(newTD);
	});
	var rows = $('TABLE.players TR.alternating_color1, TABLE.players TR.alternating_color2');
	jQuery.each(rows,function(){
		var newTD = document.createElement('TD');
		var checkbox = document.createElement('INPUT');
		checkbox.setAttribute('class','playerCompareChkBox');
		checkbox.setAttribute('type','checkbox');
		newTD.appendChild(checkbox);
		var td = this.children[0];
		$(td).before(newTD);
		that.playerCheckboxes.push(checkbox);
	});
};

window.setTimeout(function(){
	new PlayerCompare();
},0);


/***
had to add the code below to modify it to work better in greasemonkey
html documents can't have an onclick assigned to them without level 1 event handling
****/
/*
Table sorting script  by Joost de Valk, check it out at http://www.joostdevalk.nl/code/sortable-table/.
Based on a script from http://www.kryogenix.org/code/browser/sorttable/.
Distributed under the MIT license: http://www.kryogenix.org/code/browser/licence.html .

Copyright (c) 1997-2007 Stuart Langridge, Joost de Valk.

Version 1.5.7
*/

/* You can change these values */
//var image_path = "http://www.joostdevalk.nl/code/sortable-table/";
var image_path = "http://netdna.yoast.com/sortable/";
//var image_up = "arrow-up.gif";
var image_up = "arrowup.gif";
//var image_down = "arrow-down.gif";
var image_down = "arrowdown.gif";
//var image_none = "arrow-none.gif";
var image_none = "arrownone.gif";
var europeandate = true;
var alternate_row_colors = true;

/* Don't change anything below this unless you know what you're doing */
addEvent(window, "load", sortables_init);

var SORT_COLUMN_INDEX;
var thead = false;

function sortables_init() {
	// Find all tables with class sortable and make them sortable
	if (!document.getElementsByTagName) return;
	tbls = document.getElementsByTagName("table");
	for (ti=0;ti<tbls.length;ti++) {
		thisTbl = tbls[ti];
		if (((' '+thisTbl.className+' ').indexOf("sortable") != -1) && (thisTbl.id)) {
			ts_makeSortable(thisTbl);
		}
	}
}

function ts_makeSortable(t) {
	if (t.rows && t.rows.length > 0) {
		if (t.tHead && t.tHead.rows.length > 0) {
			var firstRow = t.tHead.rows[t.tHead.rows.length-1];
			thead = true;
		} else {
			var firstRow = t.rows[0];
		}
	}
	if (!firstRow) return;
	
	// We have a first row: assume it's the header, and make its contents clickable links
	for (var i=0;i<firstRow.cells.length;i++) {
		var cell = firstRow.cells[i];
		var txt = ts_getInnerText(cell);
		if (cell.className != "unsortable" && cell.className.indexOf("unsortable") == -1) {
			cell.innerHTML = '';
			var a = document.createElement('A');
			a.href = '#';
			a.setAttribute('class','sortheader');
			$(a).bind('click',function(){
				ts_resortTable(this,i);
				return false;
			});
			a.innerHTML = txt + '<span class="sortarrow">&nbsp;&nbsp;<img src="'+ image_path + image_none + '" alt="&darr;"/></span>';
			cell.appendChild(a);
			
		}
	}
	if (alternate_row_colors) {
		alternate(t);
	}
}

function ts_getInnerText(el) {
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

function ts_resortTable(lnk, clid) {
	var span;
	for (var ci=0;ci<lnk.childNodes.length;ci++) {
		if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') span = lnk.childNodes[ci];
	}
	var spantext = ts_getInnerText(span);
	var td = lnk.parentNode;
	var column = td.cellIndex;
	var t = getParent(td,'TABLE');
	// Work out a type for the column
	if (t.rows.length <= 1) return;
	var itm = "";
	var i = 0;
	while (itm == "" && i < t.tBodies[0].rows.length) {
		var itm = ts_getInnerText(t.tBodies[0].rows[i].cells[column]);
		itm = trim(itm);
		if (itm.substr(0,4) == "<!--" || itm.length == 0) {
			itm = "";
		}
		i++;
	}
	if (itm == "") return; 
	sortfn = ts_sort_caseinsensitive;
	if (itm.match(/^\d\d[\/\.-][a-zA-z][a-zA-Z][a-zA-Z][\/\.-]\d\d\d\d$/)) sortfn = ts_sort_date;
	if (itm.match(/^\d\d[\/\.-]\d\d[\/\.-]\d\d\d{2}?$/)) sortfn = ts_sort_date;
	if (itm.match(/^-?[£$€Û¢´]\d/)) sortfn = ts_sort_numeric;
	if (itm.match(/^-?(\d+[,\.]?)+(E[-+][\d]+)?%?$/)) sortfn = ts_sort_numeric;
	if (itm == 'strength' || itm == 'speed' || itm == 'agility' || itm == 'jumping' ||
		itm == 'stamina' || itm == 'vision' || itm == 'confidence' || itm == 'blocking' ||
		itm == 'tackling' || itm == 'throwing' || itm == 'catching' || itm == 'carrying' ||
		itm == 'kicking' || itm == 'punting' || itm == 'Level') sortfn = ts_sort_numeric;
	SORT_COLUMN_INDEX = column;
	var firstRow = new Array();
	var newRows = new Array();
	for (k=0;k<t.tBodies.length;k++) {
		for (i=0;i<t.tBodies[k].rows[0].length;i++) { 
			firstRow[i] = t.tBodies[k].rows[0][i]; 
		}
	}
	for (k=0;k<t.tBodies.length;k++) {
		if (!thead) {
			// Skip the first row
			for (j=1;j<t.tBodies[k].rows.length;j++) { 
				newRows[j-1] = t.tBodies[k].rows[j];
			}
		} else {
			// Do NOT skip the first row
			for (j=0;j<t.tBodies[k].rows.length;j++) { 
				newRows[j] = t.tBodies[k].rows[j];
			}
		}
	}
	newRows.sort(sortfn);
	if (span.getAttribute("sortdir") == 'down') {
			ARROW = '&nbsp;&nbsp;<img src="'+ image_path + image_down + '" alt="&darr;"/>';
			newRows.reverse();
			span.setAttribute('sortdir','up');
	} else {
			ARROW = '&nbsp;&nbsp;<img src="'+ image_path + image_up + '" alt="&uarr;"/>';
			span.setAttribute('sortdir','down');
	} 
    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
    // don't do sortbottom rows
    for (i=0; i<newRows.length; i++) { 
		if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))) {
			t.tBodies[0].appendChild(newRows[i]);
		}
	}
    // do sortbottom rows only
    for (i=0; i<newRows.length; i++) {
		if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1)) 
			t.tBodies[0].appendChild(newRows[i]);
	}
	// Delete any other arrows there may be showing
	var allspans = document.getElementsByTagName("span");
	for (var ci=0;ci<allspans.length;ci++) {
		if (allspans[ci].className == 'sortarrow') {
			if (getParent(allspans[ci],"table") == getParent(lnk,"table")) { // in the same table as us?
				allspans[ci].innerHTML = '&nbsp;&nbsp;<img src="'+ image_path + image_none + '" alt="&darr;"/>';
			}
		}
	}		
	span.innerHTML = ARROW;
	alternate(t);
}

function getParent(el, pTagName) {
	if (el == null) {
		return null;
	} else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase()) {
		return el;
	} else {
		return getParent(el.parentNode, pTagName);
	}
}

function sort_date(date) {	
	// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
	dt = "00000000";
	if (date.length == 11) {
		mtstr = date.substr(3,3);
		mtstr = mtstr.toLowerCase();
		switch(mtstr) {
			case "jan": var mt = "01"; break;
			case "feb": var mt = "02"; break;
			case "mar": var mt = "03"; break;
			case "apr": var mt = "04"; break;
			case "may": var mt = "05"; break;
			case "jun": var mt = "06"; break;
			case "jul": var mt = "07"; break;
			case "aug": var mt = "08"; break;
			case "sep": var mt = "09"; break;
			case "oct": var mt = "10"; break;
			case "nov": var mt = "11"; break;
			case "dec": var mt = "12"; break;
			// default: var mt = "00";
		}
		dt = date.substr(7,4)+mt+date.substr(0,2);
		return dt;
	} else if (date.length == 10) {
		if (europeandate == false) {
			dt = date.substr(6,4)+date.substr(0,2)+date.substr(3,2);
			return dt;
		} else {
			dt = date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
			return dt;
		}
	} else if (date.length == 8) {
		yr = date.substr(6,2);
		if (parseInt(yr) < 50) { 
			yr = '20'+yr; 
		} else { 
			yr = '19'+yr; 
		}
		if (europeandate == true) {
			dt = yr+date.substr(3,2)+date.substr(0,2);
			return dt;
		} else {
			dt = yr+date.substr(0,2)+date.substr(3,2);
			return dt;
		}
	}
	return dt;
}

function ts_sort_date(a,b) {
	dt1 = sort_date(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));
	dt2 = sort_date(ts_getInnerText(b.cells[SORT_COLUMN_INDEX]));
	
	if (dt1==dt2) {
		return 0;
	}
	if (dt1<dt2) { 
		return -1;
	}
	return 1;
}
function ts_sort_numeric(a,b) {
	var aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
	aa = clean_num(aa);
	var bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
	bb = clean_num(bb);
	return compare_numeric(aa,bb);
}
function compare_numeric(a,b) {
	var a = parseFloat(a);
	a = (isNaN(a) ? 0 : a);
	var b = parseFloat(b);
	b = (isNaN(b) ? 0 : b);
	return a - b;
}
function ts_sort_caseinsensitive(a,b) {
	aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
	bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
	if (aa==bb) {
		return 0;
	}
	if (aa<bb) {
		return -1;
	}
	return 1;
}
function ts_sort_default(a,b) {
	aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
	bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
	if (aa==bb) {
		return 0;
	}
	if (aa<bb) {
		return -1;
	}
	return 1;
}
function addEvent(elm, evType, fn, useCapture)
// addEvent and removeEvent
// cross-browser event handling for IE5+,	NS6 and Mozilla
// By Scott Andrew
{
	if (elm.addEventListener){
		elm.addEventListener(evType, fn, useCapture);
		return true;
	} else if (elm.attachEvent){
		var r = elm.attachEvent("on"+evType, fn);
		return r;
	} else {
		alert("Handler could not be removed");
	}
}
function clean_num(str) {
	str = str.replace(new RegExp(/[^-?0-9.]/g),"");
	return str;
}
function trim(s) {
	return s.replace(/^\s+|\s+$/g, "");
}
function alternate(table) {
	// Take object table and get all it's tbodies.
	var tableBodies = table.getElementsByTagName("tbody");
	// Loop through these tbodies
	for (var i = 0; i < tableBodies.length; i++) {
		// Take the tbody, and get all it's rows
		var tableRows = tableBodies[i].getElementsByTagName("tr");
		// Loop through these rows
		// Start at 1 because we want to leave the heading row untouched
		for (var j = 0; j < tableRows.length; j++) {
			// Check if j is even, and apply classes for both possible results
			if ( (j % 2) == 0  ) {
				if ( !(tableRows[j].className.indexOf('odd') == -1) ) {
					tableRows[j].className = tableRows[j].className.replace('odd', 'even');
				} else {
					if ( tableRows[j].className.indexOf('even') == -1 ) {
						tableRows[j].className += " even";
					}
				}
			} else {
				if ( !(tableRows[j].className.indexOf('even') == -1) ) {
					tableRows[j].className = tableRows[j].className.replace('even', 'odd');
				} else {
					if ( tableRows[j].className.indexOf('odd') == -1 ) {
						tableRows[j].className += " odd";
					}
				}
			} 
		}
	}
}