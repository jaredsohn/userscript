// ==UserScript==

// @name           Farming Machine Export

// @author         pixelgeek

// @namespace	   FMExp

// @description    Exports Farms found by Traviantoolbox

// @include        http://www.traviantoolbox.com/*

// @email          felix@pixelgeek.ch

// @version        0.0.1

// ==/UserScript==



var dom = new DOMUtils();


var defaultTroops = "0,0,0,0,10,0,0,0,0,0,0";

var expType = 1;


function main() {

	var url=document.URL;

	var language=url.split('/')[3];

	

	var urlString;

	if(language=='de') {

		urlString = "Farmsuche";

	} else if (language=='en') {
		urlString = "farms_search"
	}

	if(url.indexOf(urlString)>0) {

		insertExportLink();

		insertCheckButtons();

		// alert("end of main");

	}

}

function insertExportLink() {

	var exExcelLink = "//a[contains(@href,'csv.traviantoolbox.com')]";

	var ExcelLink = dom.xs(exExcelLink);

	
	// create add link

	var LinkButtonAdd = createLinkButton('Add to Export List','Add to Export List',addToList);

	LinkButtonAdd.setAttribute("style","margin-left:10px;");
	
	// create export link

	var LinkButtonExport = createLinkButton('Export to Farming Machine','Export to Farming Machine',exportList);

	LinkButtonExport.setAttribute("style","margin-left:10px;");
	
	// create clear link
	var LinkClearList = createLinkButton('Clear Export List','Clear Export List',clearExportList);
	LinkClearList.setAttribute("style","margin-left:10px;");
	
	// add links to node
	ExcelLink.parentNode.insertBefore(LinkClearList,ExcelLink.nextSibling);

	ExcelLink.parentNode.insertBefore(LinkButtonExport,ExcelLink.nextSibling);

	ExcelLink.parentNode.insertBefore(LinkButtonAdd,ExcelLink.nextSibling);

}

function insertCheckButtons() {
	var exTopRow = "//input[contains(@src,'up.png')]/parent::th/parent::tr";
	var exTableRows = exTopRow + "/parent::tbody/tr";
	
	// insert title field

	var TopRow = dom.xs(exTopRow);

	var titleField = dom.cn('th');

	titleField.textContent = "Exp.";

	TopRow.insertBefore(titleField,TopRow.firstChild);
	
	var allRows = dom.xo(exTableRows);
	for(i = 1; i < allRows.snapshotLength; i++)
	{
		// get Row
		var tempRow = allRows.snapshotItem(i);
		
		// create new field
		var tempField = dom.cn('td');
		
		// create new checkbox
		var tempCB = dom.cn('input');
		tempCB.type = "checkbox";
		tempCB.id = "line_"+i;
                tempCB.checked = "true";
		
		// add checkbox to field
		tempField.insertBefore(tempCB,tempField.firstChild);
		
		// add field to row
		tempRow.insertBefore(tempField,tempRow.firstChild);
	}
	
	

}

function addToList() {
	// reset rowCounter
	var rowCounter = 0;
	

	// get old GM-value
	var expList = GM_getValue('FMexport','');
	
	// create temporary list for rowValues
	var rowList = "";
	
	// add divider if exportType is add_to_list (2) and not create_new_list (1)
	if(expType!=1 && expList=="")
	{
		rowList += ">:)";
	}
	
	// get rows
	var exTableRows = "//input[contains(@src,'up.png')]/parent::th/parent::tr/parent::tbody/tr";
	var allRows = dom.xo(exTableRows);
		
	// get if it is extended value or not
	var nrCells = allRows.snapshotItem(1).getElementsByTagName('td').length;
	if (nrCells>11) {
		extended = true;
	} else {
		extended = false;
	}
	
	// extract values for all selected rows	
	for(i = 1; i < allRows.snapshotLength; i++)
	{
				
		// getCheckbox
		var tempCB = dom.get("line_"+i);
		if(tempCB.checked)
		{
			// add separator if list is not empty
			if(rowList!="") rowList += ">:)";
			
			// get row
			tempRow = allRows.snapshotItem(i).getElementsByTagName('td');
			
			//xy
			t1 = (extended==true) ? 14 : 9;
			xyURL = tempRow[t1].getElementsByTagName('a');
			xy = getParamFromUrl(xyURL[0].href,'x')+","+getParamFromUrl(xyURL[0].href,'y');
			
			rowList += xy+"|";
			
			//troops
			if(defaultTroops.split(',').length!=11) defaultTroops = "0,0,0,0,0,0,0,0,0,0,0";
			
			rowList += defaultTroops+"|";
					
			//tribe
			t2 = (extended==true) ? 7 : 5;
			tribeImg = tempRow[t2].getElementsByTagName('img');
			tribeSrc = tribeImg[0].src;
			
			if(tribeSrc.indexOf('units/29.gif')>0) {
				tribe = "gauls"; //gaul
			} else if (tribeSrc.indexOf('units/19.gif')>0) {
				tribe = "teutons"; //teuton
			} else if (tribeSrc.indexOf('units/9.gif')>0) {
				tribe = "romans"; //roman
			} else {
				tribe = "unknown"; // error
			}
			
			rowList += tribe+"|";
			
			//Fplayername
			t3 = 2;
			playerLink = tempRow[t3].getElementsByTagName('a');
			playerName = playerLink[playerLink.length-1].textContent;
			
			rowList += playerName+"|";
			
			//Fplayerid
			playerURL = playerLink[playerLink.length-1].href;
			playerId = getParamFromUrl(playerURL,'id');
			
			rowList += playerId+"|";
			
			//FVillagename
			t4 = (extended==true) ? 8 : 6;
			villageLink = tempRow[t4].getElementsByTagName('a');
			villageName = villageLink[villageLink.length-1].textContent;
			
			rowList += villageName+"|";
			
			//C_value
			cVal = "$";
			
			rowList += cVal+"|";
			
			//activeBool
			
			rowList += "true|";
			
			//attackType
			attType = (tribe=="gauls") ? 3 : 4;
			
			rowList += attType;
			
			rowCounter++;			
		}
	}
	
	// add rowList to exportList and save it again
	expList += rowList;
	
	GM_setValue('FMexport',expList);
	alert("Added "+rowCounter+" rows to the export list");	

}

function exportList() {
	exportData = GM_getValue('FMexport','');
	prompt("Copy Export Data", exportData);

}
function clearExportList() {
	GM_setValue('FMexport','');
	alert("Export list cleared");f
}

function createLinkButton(text, title, jsFunction) {

	var button = dom.cn("a");

	button.href = "javascript:void(0)";

	button.innerHTML = text;

	button.title = title;

	if (jsFunction != null) {

		button.addEventListener('click', jsFunction, false);

	}

	return button;

}
function getParamFromUrl(url, urlParam) {

	var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that

	var searchStr = "&" + urlParam + "=";

	var pos = res.indexOf(searchStr);

	if (pos != -1) {

		res = res.substring(res.indexOf(searchStr) + searchStr.length);

		var endPos = (res.indexOf("&") > res.indexOf("#"))

				? res.indexOf("&")

				: res.indexOf("#");

		if (endPos != -1) {

			res = res.substring(0, endPos);

		}

		return res;

	} else {

		return null;

	}

}

function DOMUtils(doc, ctxt, html) { // from FranMod

	this.cn = function(tag, html) {

		var elem = this.document.createElement(tag);

		if (html)

			elem.innerHTML = html;

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

		var res = this.document.evaluate(xpath, this.context, null,

				XPathResult.FIRST_ORDERED_NODE_TYPE, null);

		return res.singleNodeValue;

	}



	this.xa = function(xpath) {

		var arr = [];

		var xpr = this.document.evaluate(xpath, this.context, null,

				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i = 0; item = xpr.snapshotItem(i); i++)

			arr.push(item);

		return arr.length == 0 ? null : arr;

	}



	this.xo = function(xpath) {

		var ret = this.document.evaluate(xpath, this.context, null,

				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		return ret; //no snapshot

	}

	this.find = function(xpath, xpres, doc) {

		if (!doc)

			doc = document;

		else if (typeof doc == 'string')

			doc = cn('div', doc);

		var ret = document.evaluate(xpath, doc, null, xpres, null);



		return xpres == XPFirst ? ret.singleNodeValue : ret;

	}

	this.get = function(id, doc) {

		if (!doc)

			doc = document;

		return doc.getElementById(id);

	}

	if (!doc)

		doc = document;

	if (!ctxt)

		ctxt = doc;

	if (html) {

		this.document = doc.implementation.createDocument('', '', null);

		this.context = doc.createElement('div');

		this.context.innerHTML = html;

		ansDoc.appendChild(this.context);

	} else {

		this.document = doc;

		this.context = ctxt;

	}

}

if (document.body) {

 	main();

}