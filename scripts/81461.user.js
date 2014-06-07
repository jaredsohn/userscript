// ==UserScript==
// @name           iTycoon2 VerkaufsLog
// @namespace      http://www.itycoon2.de/
// @include        http://www.itycoon2.de/sale/* 
// @include        http://www.itycoon2.de/building*
// ==/UserScript==

var version = "1.5";

/**************************************************************/
Array.prototype.contains = function (element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i].id == element.id) {
			return true;
		}
	}
	return false;
}

/**************************************************************/
Array.prototype.removeByElement = function(element){
	for(var i=0; i<this.length;i++ ){ 
		if(this[i].id == element.id){
			this.splice(i,1); 
		}
	} 
}


var savedValues = getValues();

/**************************************************************/
if(location.href.indexOf("http://www.itycoon2.de/sale/index/") >-1){
	var forms = document.forms[0];
	var table = document.forms[0].getElementsByTagName("table")[0];
	var allRows = document.forms[0].getElementsByTagName("table")[0].rows;
	var buildingID = location.href.split("/")[5];
	var buildingName = document.getElementsByTagName("h2")[0].innerHTML.split("(")[0];
		
		
	for(var i=1; i < allRows.length; i++){	
		var cells = allRows[i].cells;
		var prodName = cells[0].firstChild.firstChild.innerHTML;
		var prodID = cells[0].lastChild.getAttribute("href").split("/")[3];
		var prodMarke = cells[1].firstChild.firstChild.innerHTML;
		var prodVK = cells[7].innerHTML;
		
		
		var produkt ={
			id:prodID + "-" + buildingID, 
			name:cells[0].firstChild.firstChild.innerHTML,
			patent:cells[0].firstChild.firstChild.getAttribute("href"),
			markeName:cells[1].firstChild.firstChild.innerHTML,
			markeLinik:cells[1].firstChild.firstChild.getAttribute("onclick"),
			markeClass:cells[1].firstChild.firstChild.getAttribute("class"),
			building:{buildingID:buildingID, buildingName:buildingName},
			date: now(),
			count:prodVK
		};

		//if(savedValues.contains(produkt))
		updateValue(produkt);
		
		var cbTD = document.createElement("td");		
		var okBox = document.createElement("img");
		cbTD.className = "tight";
		
		if(savedValues.contains(produkt)) {
			okBox.src = "/images/icons/delete.png";
		}else{
			okBox.src = "/images/icons/add.png";
		}		
		okBox.name = produkt.id + "_cb";
		addEvent(okBox, "click", updateValueFunc(produkt, false), false);	
		cbTD.appendChild(okBox);
		allRows[i].appendChild(cbTD);
	}
	savedValues = getValues();
}

/**************************************************************/
if(location.href.indexOf("http://www.itycoon2.de/building") >-1){
	var nav = document.getElementById("subnavigation");
	var liLog = document.createElement("li");	
	liLog.innerHTML = '<img border="false" title="" src="/images/icons/coins.png?1252610018" class="icon" alt="Building_add"><a id="log-button" href="#">Verkaufszahlen</a>';
	
	/*
	var liExport = document.createElement("li");	
	liExport.innerHTML = '<img border="false" title="" src="/images/icons/arrow_right.png" class="icon" alt="Building_add"><a id="export-button" href="#">Export</a>';
	
	addEvent(liExport, "click", function(){alert("export");}, false);
	addEvent(liLog, "click", function(){alert("log");, false);
	
	
	nav.firstElementChild.appendChild(liExport);
	*/
	nav.firstElementChild.appendChild(liLog);
	
	var dialogScript = document.createElement("script");
	dialogScript.type="text/javascript";
	dialogScript.text = '$(function() {$("#logDialog").dialog({bgiframe: true,autoOpen: false,modal: true,height: 650,title: "Verkaufszahlen",width: 850,resizable: false,closeOnEscape: true,open: function() {$(this).dialog("moveToTop")}});}); $("#log-button").click(function() {$("#logDialog").dialog("open");});$("#export-button").click(function() {$("#logDialog").dialog("open");});'
	document.getElementsByTagName("head")[0].appendChild(dialogScript);
	
	
	// Verkaufs log
	
	
	var logDialog =  document.createElement("div");
	logDialog.setAttribute("id", "logDialog");
	
	
	
	var resetButton = document.createElement("button");
	resetButton.setAttribute("type", "button");	
	resetButton.setAttribute("class", "ui-state-default ui-corner-all");	
	resetButton.setAttribute("id", "resetButton");
	resetButton.innerHTML = "Zur&uuml;cksetzen";
	
	var exportButton = document.createElement("button");
	exportButton.setAttribute("type", "button");	
	exportButton.setAttribute("class", "ui-state-default ui-corner-all");	
	exportButton.setAttribute("id", "exportButton");
	exportButton.innerHTML = "Export";
	
	addEvent(resetButton, "click", removeAllValues, false);
	addEvent(exportButton, "click", getExportTable, false);
	
	
	var btnDiv = document.createElement("div");
	btnDiv.setAttribute("style", 'border:1px solid #A6C9E2;color:#222222;display:block;border-width:0 0 1px;margin:0.5em 0 0;padding:0.3em 1em 0.5em 0.4em;text-align:left;');	
	
	btnDiv.appendChild(resetButton);
	btnDiv.appendChild(exportButton);
	
	var exportLogDiv = document.createElement("div");
	exportLogDiv.setAttribute("id", "exportLogDiv");
	exportLogDiv.setAttribute("style", "float:right;");
	btnDiv.appendChild(exportLogDiv);

	
	logDialog.appendChild(btnDiv);	
	
	logDialog.appendChild(getLogTableBody(savedValues, false));	
	
	var groupedValues = groupByName();
	logDialog.appendChild(getLogTableBody(groupedValues, true));	
	
	
	
	var footer = document.getElementById("footer");
	footer.parentNode.appendChild(logDialog);
}

function getExportTable(){
	var logTable = document.getElementById("logTable");
	var exportTable = document.getElementById("exportTable");

	if(logTable.getAttribute("style")=="display: none;"){		
		logTable.setAttribute("style", "display:block;");
		exportTable.setAttribute("style", "display:none;");
	}else{
		logTable.setAttribute("style", "display:none;");
		exportTable.setAttribute("style", "display:block;");
	}
}

function getLogTableBody(values, isExport){
	var logTable = document.getElementById("logTable");
	
	if(logTable == null)
		logTable = document.createElement("table");
	
	logTable.innerHTML = "";
	
	if(isExport){
		logTable.innerHTML= "<thead><tr><th>Produkt</th><th>Menge</th><th>V</th></tr></thead>";
		logTable.setAttribute("id", "exportTable");
		logTable.setAttribute("style", "display:none;");
	}else{
		logTable.innerHTML= "<thead><tr><th>Produkt</th><th>Marke</th><th>Geb&auml;ude</th><th>Aktualisiert am</th><th>Menge</th><th>X</th></tr></thead>";
		logTable.setAttribute("id", "logTable");
		logTable.setAttribute("style", "display:block;");
	}
	
	var logBody = document.createElement("tbody");
	
	for(var i = 0; i < values.length; i++){
		var className = i % 2 == 0 ? "odd" : "even";
		
		var row = document.createElement("tr");
		row.setAttribute("id", values[i].id);
		
		var nameTd = document.createElement("td");
		nameTd.innerHTML = '<span class="pred"><a title="Patent" href="'+values[i].patent+'">'+values[i].name+'</a></span>';
		row.appendChild(nameTd);

		if(!isExport){
			var markeTd = document.createElement("td");
			markeTd.setAttribute("class", "small");		
			markeTd.innerHTML ='<span class="tt help"><span onclick="'+values[i].markeLinik+'" class="'+values[i].markeClass+'">'+values[i].markeName+'</span></span>';
			row.appendChild(markeTd);
			
			var gebTd = document.createElement("td");
			gebTd.setAttribute("class", "unbekannt small");
			gebTd.innerHTML = values[i].building.buildingName;
			row.appendChild(gebTd);
			
			var dateTd = document.createElement("td");
			dateTd.setAttribute("class", "unbekannt small");
			dateTd.innerHTML = values[i].date;
			row.appendChild(dateTd);
		}
		
		var countTd = document.createElement("td");
		countTd.setAttribute("class", "tight");
		countTd.innerHTML = values[i].count;
		
		var delTd = document.createElement("td");
		delTd.setAttribute("class", "tight ra");
		row.appendChild(countTd);
	
		if(!isExport){
			var delImage = document.createElement("img");
			addEvent(delImage, "click", updateValueFunc(values[i], true), false);
			delImage.setAttribute("src", "/images/icons/delete.png");
			delImage.setAttribute("class", "icon");
			delImage.setAttribute("style", "border:none;cursor:pointer;");
			delImage.setAttribute("border", "false");
			delTd.appendChild(delImage);
			row.appendChild(delTd);
		}else{
			var exportTd = document.createElement("td");
			exportTd.setAttribute("class", "tight ra");
			
			var exportImage = document.createElement("img");
			
			addEvent(exportImage, "click", addExportFunc(values[i].name, values[i].patent.split("/")[3], values[i].count), false);
			exportImage.setAttribute("src", "/images/icons/arrow_right.png");
			exportImage.setAttribute("class", "icon");
			exportImage.setAttribute("style", "border:none;cursor:pointer;");
			exportImage.setAttribute("border", "false");
			exportImage.setAttribute("id", values[i].patent.split("/")[3] + "_export");
			exportTd.appendChild(exportImage);
			row.appendChild(exportTd);
		}
		
		row.setAttribute("class",className);
		logBody.appendChild(row);
	}
	
	if(values.length<=0){
		logTable.innerHTML="keine Eintr&auml;ge";
	}
	
	logTable.appendChild(logBody);
	
	return logTable;
}

/**************************************************************/
function addExportFunc(produktName,wareId, count) {
	return function() { 
		exportValue(produktName,wareId, count);
	};
}


var loader = "data:image/gif,GIF89a%10%00%10%00%84%00%00%1Cr%A4%94%BA%D4T%96%BC%CC%DE%EC%EC%F2%F4t%AA%CC%3C%86%B4%DC%EA%F4%2C~%ACd%A2%C4%F4%FA%FC%24v%AC%5C%9A%BC%D4%E6%EC%FC%FA%FC%1Cr%AC%AC%CE%E4%D4%E2%EC%7C%AA%CC%E4%EE%F4%5C%9A%C4%FC%FE%FC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%06%00%15%00%2C%00%00%00%00%10%00%10%00%00%05%3A%60%25%8E%0E%F3%18R3%AE%E3%04%BC%C0S8%EC%0A%05%C9%F2%0At%BD%12%94X%C1%C7r%04%01%11%E2O7T%8E%12'%E7(%10%93%8A%06%0F%84U%149l%BF%E0%B0x%3C%0A%01%00!%F9%04%09%06%00%15%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%94%BA%D4%5C%9A%C4%D4%E6%EC%84%B2%D4%EC%F2%F4%F4%FA%FC%3C%86%B4t%AA%CC%24v%AC%AC%CA%DCl%A2%C4%EC%F6%FC%FC%FA%FC%1Cr%ACd%A2%C4%8C%BA%D4%EC%F2%FCT%96%BC%7C%AA%CC%B4%CE%E4%FC%FE%FC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%05%3B%60%25%8E%23E%0Cd%3A2%09%00%20%8DJ6H%0BH%B1%3C%16%02%E0%20%BAY%0F%80%0A%8A%22-%A0Q%F4%00%1C%96%A2%80%03%00%AD%40%7C%D5%85%B3%8AxU%23%8AHuL.%ABB%00!%F9%04%09%06%00%15%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%94%BA%D4%5C%9A%C4%D4%E2%EC%84%B2%CC%EC%F2%F4%3C%86%B4t%AA%CC%F4%FA%FC%24v%AC%C4%DA%E4d%A2%C4%E4%EE%F4%FC%FA%FC%1Cr%AC%9C%C2%DCd%9E%C4%D4%E6%EC%8C%BA%D4T%96%BC%7C%AA%CC%FC%FE%FC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%05%3B%60%25%8Edi%9AO%D0%9C%E5%E0%00%D3%CA%8A%08%048%C7L%0A%000%E8%A2B%02%90%03V%20%0E%83%B1%12%B8-%25N%A3M%09d%BC%8A%3A%C2%EB%07%24%10%97%08%05bI6%85%00%00!%F9%04%09%06%00%15%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%94%BA%D4%5C%9A%C4%7C%AE%CC%D4%E6%EC%EC%F2%F4t%AA%CC%3C%86%B4d%A2%C4%F4%FA%FC%24v%AC%8C%BA%D4%E4%EE%F4%FC%FA%FC%1Cr%ACd%9E%C4%84%B2%CC%D4%E6%F4%7C%AA%CCT%92%BCl%A6%C4%FC%FE%FC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%05%3B%60%25%8Edi%9EhZ%A4%E5%E0%40%ECh%00%0E%11W%85%02%18w%F5%00%87%5E%C0%01%E8-h%BD_0%C6%20%F2b%13%00%C0%C6%12%D0%0C%0DVD%3AI%C4%1A%06C%22%FB%25%85%00%00!%F9%04%09%06%00%11%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%94%BA%D4%5C%9A%C4%D4%E6%EC%84%B2%D4%F4%FA%FC%3C%86%B4t%AA%CCl%A2%C4%E4%EE%F4%FC%FA%FCL%92%BC%1Cr%ACd%9E%C4%DC%E6%F4%8C%BA%D4%7C%AA%CC%FC%FE%FCT%92%BC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%058%60%24%8Edi%9Eh%AA%AEk1(l%D40O%8C%00F%FC%00L%1C%F0%B1%06%8E%95%60%00%0E%2C%09o%A0r%2Cx%08%15%01%40%5D%C0PE%DE%A1p%3D)%20%87%D7(%04%00!%F9%04%09%06%00%13%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%AC%CE%E4%5C%9A%BC%DC%E6%F4%3C%86%B4%F4%FA%FC%7C%AE%CC%C4%DE%EC%2Cz%ACt%AA%CC%E4%EE%F4L%92%BC%FC%FA%FC%D4%E2%EC%1Cr%ACd%9E%C4%DC%EA%F4%8C%BA%D4T%92%BC%FC%FE%FC%D4%E6%EC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%05%3A%E0%24%8Edi%9Eh%AA%AEl%EB%96%8A%1B%00B%1B9N%FB%00%04%AB8%80%04K%02%004T%83%05%C0!%3C%1D%0C%12%20%40R%60%98(%D2b%A2zR%20%1C%84D%C3*%0A%01%00!%F9%04%09%06%00%14%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%AC%CA%DCT%92%BC%DC%E6%F4t%A6%CC%EC%F6%FC%3C%86%B4%7C%AE%CC%FC%FA%FC%24v%AC%D4%E6%EC%E4%EE%F4%7C%AA%CC%1Cr%AC%AC%CE%E4%5C%9A%BCt%AA%CC%F4%FA%FCL%92%BC%84%B2%CC%FC%FE%FC%EC%F2%F4%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%057%20%25%8Edi%9Eh%AA%AEl%EB%BE%B0Y%B9D%E2%B0K%02L%AC%00%00%0A%D5%40%02h%10J%11%C2%83q%104~%92H)P%AC%FE%08%D2R%05b(%1A%08%C1Q%08%00!%F9%04%09%06%00%12%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%94%BE%D4t%AA%CC%CC%DE%EC%3C%86%B4%F4%FA%FCL%92%BC%8C%BA%D4%DC%E6%F4%7C%AA%CC%D4%E6%EC%FC%FA%FCT%92%BC%1Cr%AC%C4%DA%E4%CC%E2%ECL%8E%BC%7C%AE%CC%FC%FE%FCT%96%BC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%059%A0%24%8Edi%9Eh%AA%AEl%EB%BEp%2CK%C5%E02M0%16Q%F2%90%08%03%00p%189%1A%80%06%24%12a%0C%95%8B%D1B0%AC%22%01%82%82I!%20%20%09%02ET%14%02%00!%F9%04%09%06%00%15%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%CC%DE%ECT%92%BC%EC%F2%F4t%A6%CC%3C%86%B4%F4%FA%FC%7C%AE%CC%DC%E6%F4%D4%E6%EC%5C%9A%C4%7C%AA%CCL%8E%BC%FC%FA%FC%1Cr%AC%CC%E2%EC%F4%F6%FCt%AA%CCD%8A%B4%84%B2%CCd%9E%C4%FC%FE%FC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%056%60%25%8Edi%9Eh%AA%AEl%EB%BEp%8CB%81K%01%02%C4.%0E%20%3D%24%04%85%402%08%00%3D%C6%E1p%04%00%06E%82%B3G%05%1C%1A%A6%04%A1%80%2C%10%12%A4%10%00!%F9%04%09%06%00%09%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%CC%E2%ECt%AA%CC%F4%F6%FC%3C%86%B4%8C%BA%D4T%92%BC%DC%EA%F4%84%B2%CC%FC%FE%FC%D4%E2%EC%7C%AA%CC%FC%FA%FCL%8E%BC%1Cr%AC%F4%FA%FCD%8A%B4T%96%BC%D4%E6%EC%7C%AE%CC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%056%60%22%8Edi%9Eh%AA%AEl%EB%BE%E9%E1%0A%0E%D2.%00%A0%B0%12%E0%40%03%96%20%07%09%AC%06%06%87%AF%B1%98D%22%0C%D3c%98%F3%F9v'%85%80%A0%24%14%A2%A3%10%00!%F9%04%09%06%00%08%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%AC%CA%DC%DC%EA%F4T%92%BC%3C%86%B4%F4%F6%FC%C4%DE%ECt%AA%CC%FC%FE%FC%D4%E2%EC%2Cz%ACL%8E%BC%FC%FA%FC%1Cr%AC%E4%EE%F4%5C%9A%BCD%8A%B4%F4%FA%FC%CC%E2%EC%7C%AA%CC%D4%E6%EC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%058%20%22%8Edi%9Eh%AA%AEl%5B%3A%89%AB4R%DB%00GK%00K%7B%00%80%D8*q%83%14X%BF%06%A4%A6%8A%0C%80%8D%C5%24%90%8A%FC%80%80%86C%958%10%1A%8F%88)%04%00!%F9%04%09%06%00%16%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%A4%CA%DCT%92%BC%D4%E2%ECl%A6%C4%EC%F2%F4%3C%86%B4%7C%AA%CC%F4%FA%FC%24v%AC%CC%E2%EC%5C%9A%C4%F4%F6%FCL%8E%BC%84%B2%CC%1Cr%AC%AC%CE%E4%D4%E6%ECt%AA%CC%EC%F2%FCD%8A%B4%7C%AE%CC%FC%FE%FCd%9E%C4%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%057%A0%25%8Edi%9Eh%AA%A6%13T%AC%E2%01%10%B0e%00K%FD%00G%0D%3C%92%DA%ADQ%93%00%00%03%D8%E0Ga%C0%8C%00%8Ab%85%10%EC%1E%17*%F4%F1Z%0D%1C%90T%08%00!%F9%04%09%06%00%08%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%94%BA%D4%D4%E2%ECT%92%BC%EC%F6%FC%3C%86%B4%BC%D6%E4t%AA%CC%FC%FE%FC%DC%EA%F4%F4%F6%FCL%8E%BC%7C%AA%CC%1Cr%AC%9C%C2%DC%D4%E6%ECD%8A%B4%C4%DE%EC%F4%FA%FC%7C%AE%CC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%059%20%22%8Edi%9E%A6%A1%A0%25%D3%1C%EC%F8%00%00%13%8B.%90%DCH%01%2C%3CD%030%09%02%5EA%1F%90w%A0%09x%82%23duk%02%20%84%9Bd0%8C%F0%24%81%40p%1C%02%00!%F9%04%09%06%00%14%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%CC%E2%ECT%92%BCt%AA%CC%EC%F6%FC%3C%86%B4%5C%9A%BC%84%B2%CC%DC%EA%F4%FC%FA%FC%24z%AC%D4%E2%EC%5C%96%BC%7C%AA%CC%1Cr%ACT%96%BC%F4%FA%FCL%8E%BC%5C%9A%C4%84%B2%D4%FC%FE%FC%D4%E6%EC%7C%AE%CC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%05%3B%20%25%8Ed9%26%16%03%99%A6%E0%00%01K6%00%20%25%B2X%BD%11%9ES%03%80%03%F1%13%15%00%91%A2%E8eQR%84%0D%E71%A9%0C%02%16%CA%85%F0%E1%9C(%0E%CE%04%C1%E7%2C%9BC%00!%F9%04%09%06%00%0E%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%D4%E6%EC%5C%96%BC%F4%FA%FCt%AA%CC%3C%86%B4%8C%B6%D4%E4%EE%F4%FC%FA%FC%7C%AA%CCT%92%BC%1Cr%AC%DC%EA%F4%8C%BA%D4%FC%FE%FC%7C%AE%CCT%96%BC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%05%3B%A0%23%3AAB%20c%3A%22%C4%02%00%8C%AA*%EFb%C8i%E2*1.%06%BB%81o%94x%05%86%A3%02%40%81%1C%B9%08M%11%60%91%88%3A%94%CCh%03%00%B1%22%02B%ABxL.%3BB%00!%F9%04%09%06%00%14%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%AC%CA%DC%5C%9A%BC%DC%EA%F4%3C%86%B4%7C%AE%CC%F4%FA%FC%CC%DE%ECt%AA%CC%2Cz%ACT%92%BC%FC%FA%FC%D4%E6%EC%1Cr%ACd%9E%C4%E4%EE%F4%8C%BA%D4%D4%E2%EC%7C%AA%CCT%96%BC%FC%FE%FC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%058%20%25R%8CD4%C90%AE%D4%824%40%DCD%EC%A8%C8%0Et%D4%A2%04%2B*%9E%88%F13%08G%92%18%E38%22%00%14%CC%11%0C%11%15%09%1A%81j%EB%A1%EDz%BF%E008%04%00!%F9%04%09%06%00%19%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%94%BA%D4d%9E%C4%D4%E6%EC%EC%F2%F4%84%B2%D4%3C%86%B4t%A6%CC%F4%FA%FC%24v%AC%B4%CE%E4l%A6%C4%E4%EE%F4%EC%F6%FCT%92%BC%7C%AA%CC%FC%FA%FC%1Cr%AC%A4%C6%DCd%A2%C4%DC%EA%F4%EC%F2%FC%8C%BA%D4t%AA%CCT%96%BC%FC%FE%FC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%057%60%26f%C3cD%89%F1%10%E3%08%5D%11%20%CFR%2B%3Ar%24%14%C1%B2T%B6G%CCA%B1%D9%06C%84%D1V%90%0D%966%05%40%0056%AA%D8%ACv%CB%EDz%BF%E0e%08%00!%F9%04%09%06%00%18%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%94%BA%D4d%9E%C4%CC%E2%EC%EC%F2%F4%7C%AE%CC%3C%86%B4%F4%FA%FC%B4%D2%E4t%AA%CC%24v%AC%A4%C6%DC%E4%EE%F4%8C%BA%D4T%92%BC%FC%FA%FC%1Cr%AC%94%BE%D4d%A2%C4%D4%E6%EC%F4%F6%FC%84%B2%D4%7C%AA%CCT%96%BC%FC%FE%FC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%05%3B%20%26b%93e%40%8AaM%E3%F8%24%10%20%CF%40%F2%B4%8E%0C%09U%20%C4%10%C4(%12s0n%22B%A5%40%19-%00%8Efk*z%0C%A4%D4%ACv%CB%EDz%BF%E0%B0xL%06%87%00%00!%F9%04%09%06%00%17%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%94%BA%D4%5C%9A%C4%7C%AE%CC%D4%E6%EC%EC%F2%F4t%A6%CC%3C%86%B4%F4%FA%FCl%A2%C4%24v%ACd%A2%C4%8C%BA%D4%E4%EE%F4%7C%AA%CC%FC%FA%FC%1Cr%ACd%9E%C4%84%B2%CC%DC%EA%F4%F4%F6%FCt%AA%CCT%96%BC%FC%FE%FC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%05%3A%E0%25%5E%84s%40%CA%E1%10c%2BA%40%2C%03%D5%D3R%0A%00%09%0C%13%E5%10%8Bm%C4HLD%B6%82%20%E6h9G%8F%04%24%F2%AC%5E%26%08%ABv%CB%EDz%BF%E0%B0x%3C%0E%01%00!%F9%04%09%06%00%11%00%2C%00%00%00%00%10%00%10%00%84%1Cr%A4%94%BA%D4%5C%9A%C4%D4%E6%EC%8C%BA%D4%EC%F2%F4%3C%86%B4t%AA%CC%F4%FA%FC%24v%ACd%A2%C4%FC%FA%FC%1Cr%ACd%9E%C4%E4%EE%F4T%96%BC%7C%AA%CC%FC%FE%FC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%05%3B%60%24%8A%84%91%00%064%8Cl40%40%0C%03%C7%D2F%8B%D0%10Ds2%0F%DB%0D'*%08b%87a%2B%07%60%AC%94%A3%C2)%09%1D%11%18%90*%CB!%D4z%BF%E0%B0xL%AE%86%00%00%3B";
/**************************************************************/
function exportValue(produktName, wareId, count){
	var exportImage = document.getElementById(wareId + "_export");
	exportImage.setAttribute("src", loader);
	var exportLogDiv = document.getElementById("exportLogDiv");
	
	var message="";
	
	GM_xmlhttpRequest ({
		method: 'POST',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },

		url: "http://itycoon.dyndns.org/php/verkauf-monkeyimport.php",
		data: "ware=" + wareId + "&menge=" + count,
		onload: function(response) {
			if(response.responseText =="OK"){	
				exportImage.setAttribute("src", "/images/icons/accept.png");
				exportLogDiv.innerHTML = "Produkt: " + produktName + ", Menge:" + count + " gespeichert";
			}else if(response.responseText =="FEHLER"){
				exportImage.setAttribute("src", "/images/icons/exclamation.png");
				exportLogDiv.innerHTML = "Fehler! Vielleicht ist das Produkt nicht in der Datenbank der Konzernseite eingetragen...";
			}else{
				exportImage.setAttribute("src", "/images/icons/exclamation.png");
				exportLogDiv.innerHTML = "Fehler! Vielleicht bist du auf der Konzernseite nicht eingeloggt?...";
			}
		}, 
		onerror: function(response) {
			exportImage.setAttribute("src", "/images/icons/exclamation.png");
			exportLogDiv.innerHTML="Fehler! Wahrscheinlich besteht keine Verbindung zu dem Konzernserver...";
		}
	});
};


/**************************************************************/
function updateValueFunc(produkt, isView) {
	return function() { 
		storeValue(produkt, isView);
	};
}

/**************************************************************/
function updateValue(prod){
	var altProd = eval(GM_getValue(prod.id));
	if(typeof altProd != "undefined" ){
		if( parseInt(altProd.count)<parseInt(prod.count) ){
			GM_setValue(prod.id,prod.toSource());
		}
	}
}

/**************************************************************/
function addEvent(obj, eventType, func, useCaption) {
	obj.addEventListener(eventType, func, !!useCaption);
}

/**************************************************************/
function getValues(){
	var vals = [];
	for each (var val in GM_listValues()) {
		vals.push(eval(GM_getValue(val)));
	}
	
	if(vals.length >0){
		vals.sort(sortByName);
	}
	return vals;
}

/**************************************************************/
 function removeAllValues(){
	for each (var val in GM_listValues()) {
		GM_deleteValue(val);
	}
	document.getElementById("logDialog").getElementsByTagName("table")[0].innerHTML = "Alles weg... gel&ouml;scht...";
}

/**************************************************************/
function toTwoLetter(number) {
	return ("" + (number + 100)).substring(1,3);
}

/**************************************************************/
function storeValue(prod, isView){
	if(!isView){
		var box = document.getElementsByName(prod.id+"_cb")[0];
		
		if(savedValues.contains(prod)){
			box.setAttribute("src","/images/icons/add.png");
			GM_deleteValue(prod.id);
			savedValues.removeByElement(prod);
		}
		else{
			box.setAttribute("src","/images/icons/delete.png");
			savedValues.push(prod);
			savedValues.sort(sortByName);
			GM_setValue(prod.id,prod.toSource());
		}
	}else{
		var row = document.getElementById(prod.id);
		row.parentNode.removeChild(row);
		GM_deleteValue(prod.id);
		savedValues.removeByElement(prod);
	}
}

/**************************************************************/
function sortByName(a, b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

/**************************************************************/
function sortByName(a, b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

/**************************************************************/
function groupByName(){
	savedValues.sort(sortByName);
	var groupedValues = new Array();
	var lastProd = {name:"0"};
	for(var i = 0; i < savedValues.length; i++){
		if(i == 0){
			lastProd = savedValues[i];
			groupedValues.push(lastProd);
		}else{
			if(lastProd.name == savedValues[i].name){
				lastProd.count = parseInt(lastProd.count) + parseInt(savedValues[i].count);
			}else{
				lastProd = savedValues[i];
				groupedValues.push(lastProd);
				
				//alert(lastProd.name +" -- "+ lastProd.patent +" -- "+ lastProd.count);
			}
		}
	}
	
	return groupedValues;
}
/**************************************************************/
function now(){
	var d = new Date();
	var s = toTwoLetter(d.getDate()) + "." + toTwoLetter(d.getMonth()+1) + "." + d.getFullYear() + " " + toTwoLetter(d.getHours()) + ":" + toTwoLetter(d.getMinutes());
	return s;
}
