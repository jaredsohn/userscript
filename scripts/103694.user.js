//
// CharazayMonkey
// @author  Lukasz Wachowicz
// @mail    vachacz@gmail.com
// @version 1.0.2
//
// Copyright 2010, Lukasz Wachowicz
//
// ==UserScript==
// @name           CharazayMonkey
// @namespace      http://charazay.com/cbmmonkey
// @description    Add new features to Charazay basketball manager.
// @include        http://charazay.com/*
// @include        http://*.charazay.com/*
// ==/UserScript==

var version = "1.0.0";

CBM_insertCbmMonkeyLogo();
CBM_showAvarages();
CBM_showAlternativePlayerLink();
CBM_modifyLeagueTable();
CBM_modifyPlayersPage();
CBM_modifyTeamPage();
CBM_modifyTeamStatistics();

// ------------------------------------------------------------
// CharazayMonkey LOGO
// ------------------------------------------------------------

function CBM_insertCbmMonkeyLogo() {
	var cbmMonkeyLogo = document.createElement('div');
	cbmMonkeyLogo.style.bottom = "0px";
	cbmMonkeyLogo.style.position = "fixed";
	cbmMonkeyLogo.style.width = "100%";
	cbmMonkeyLogo.style.background = "white";
	cbmMonkeyLogo.style.padding = "2px";
	cbmMonkeyLogo.style.borderTop = "1px solid black";
	cbmMonkeyLogo.innerHTML = "<b>CharazayMonkey</b> by vachacz, version: " + version + nbsp(6) + "check the lastest version : <a href='http://userscripts.org/scripts/show/67081'>click me</a>";

	var wrap = xPathFirstResult("//div[@id='wrap']");
	if (wrap) {
		wrap.parentNode.appendChild(cbmMonkeyLogo);
	}
}

// ------------------------------------------------------------
// Alternative Players Link
// ------------------------------------------------------------

function CBM_showAlternativePlayerLink() {
	var teamMenu = xPathFirstResult("//div[@id='lc']//ul[1]");
	if (!teamMenu) return;

	var teamLinkLi = xPathFirstResult("//div[@id='lc']//ul[1]/li[3]");

	var teamLinkAdvancedLi = document.createElement("li");
	teamLinkAdvancedLi.innerHTML = "<a href='?act=player&code=4' style='color:green;'>Advanced Players</a>";

	teamMenu.insertBefore(teamLinkAdvancedLi, teamLinkLi);
}

// ------------------------------------------------------------
// Players page modifications
// ------------------------------------------------------------

function CBM_modifyPlayersPage() {
	var playerDivs = xPath("//div[@id='mc']/div[@class='mc-fs center']/div[@class='center']");
	if (!playerDivs) return;

	for (var i = 0; i < playerDivs.snapshotLength; i++) {
		var playerDiv = playerDivs.snapshotItem(i);

		// add new links
		addExtraLinks(playerDiv);

		// add BMI and height
		addHeightAndBMI(playerDiv);
	}
}

function addExtraLinks(playerDiv) {
	var pNode = xPathFirstResult(".//p", playerDiv);
	var playerLink = xPathFirstResult(".//p/strong/a[1]", playerDiv).href;

	var playerId = extractPlayerIdFromLink(playerLink);
	var links = document.createElement("span");

	links.innerHTML  = getPlayerTransferHistoryLink(playerId);
	links.innerHTML += getPlayerStatisticsLink(playerId)

	pNode.appendChild(links);
}

function addHeightAndBMI(playerDiv) {
	var skillTable = xPathFirstResult(".//table", playerDiv);
	var height = xPathFirstResult(".//tr[3]/td[2]/p", skillTable).innerHTML;
	var weight = xPathFirstResult(".//tr[3]/td[5]/p", skillTable).innerHTML;

	var row = skillTable.insertRow(3);

	var heightHeadCell = row.insertCell(0);
	var heightCell     = row.insertCell(1);
	var separator      = row.insertCell(2);
	var bmiHeadCell    = row.insertCell(3);
	var bmiCell        = row.insertCell(4);

	heightHeadCell.innerHTML = "<p>Height:</p>";
	heightCell.innerHTML     = "<p>" + countHeightInFootsAndInches(height) + "</p>";
	bmiHeadCell.innerHTML    = "<p>BMI:</p>";
	bmiCell.innerHTML        = "<p>" + countBMI(height, weight) + "</p>";

	setLeftCellStyle(heightHeadCell);
	setLeftCellStyle(bmiHeadCell);

	setRightCellStyle(heightCell);
	setRightCellStyle(bmiCell);
}

function setLeftCellStyle(cell) {
	cell.style.width = "8em"; 
	cell.style.color = "green"; 
	cell.style.textAlign = "left"; 
}

function setRightCellStyle(cell) {
	cell.style.width = "5em"; 
	cell.style.color = "green"; 
	cell.style.textAlign = "right";
	cell.style.fontWeight = "bold";
}

// ------------------------------------------------------------
// Team page modifications
// ------------------------------------------------------------

function CBM_modifyTeamPage() {
	var playerTable = xPathFirstResult("//div[@id='mc']/div[@class='mc-ls']//table");

	if (!playerTable) return;

	for (i = 0; i < playerTable.rows.length; i++) {
		var playerCell = playerTable.rows[i].cells[ playerTable.rows[i].cells.length - 1 ].childNodes[0];

		// xPath query is very poor, thus we check how many cells has row
		if (playerTable.rows[0].cells.length != 1) return;

		var totalElements = playerCell.childNodes.length;

		// bigger player name
		playerCell.childNodes[0].style.fontSize = "13px";

		// remove breakline between age and SI
		playerCell.removeChild(playerCell.childNodes[totalElements - 4]);

		// add comma between age and SI
		playerCell.childNodes[totalElements - 5].data += ", ";

		// parse player id
		var playerId = playerCell.childNodes[1].data.split("(")[1].split(")")[0];

		// add navigation links
		var linksSpan = document.createElement("span");
		linksSpan.innerHTML  = getPlayerStatisticsLink(playerId);
		linksSpan.innerHTML += getPlayerTransferHistoryLink(playerId);

		// BMI
		var heightWeight = playerCell.childNodes[totalElements - 2].data;
		var split = heightWeight.split(",");
		var height = split[0].split(":")[1];
		var weight = split[1].split(":")[1] + "." + split[2];

		var bmi = countBMI(height, weight);

		var bmiElement = createGreenSpan();
		bmiElement.innerHTML = nbsp(4) + "BMI:" + nbsp(1) + "<b>" + bmi + "</b>";

		// height in foots and inches
		var heightElement = createGreenSpan();
		heightElement.innerHTML = nbsp(4) + "Height:" + nbsp(1) + "<b>" + countHeightInFootsAndInches(height) + "</b>";

		// DOM modifications
		playerCell.insertBefore(linksSpan, playerCell.childNodes[totalElements - 6]);

		playerCell.appendChild(heightElement);
		playerCell.appendChild(bmiElement);
	}
}

function createGreenSpan() {
	var greenSpan = document.createElement("span");
		greenSpan.style.color = "green";
	return greenSpan;
}

function countBMI(height, weight) {
	var heightFloat = parseFloat(height);
	var weightFloat = parseFloat(weight);
	var bmi = 10000 * weightFloat / (heightFloat * heightFloat);
	return round(bmi, 1);
}

function countHeightInFootsAndInches(height) {
	var heightFloat = parseFloat(height);
	var foots  = Math.floor(heightFloat / 30.48);
	var inches = Math.floor((heightFloat - (foots * 30.48)) / 2.54);
	return foots + "'" + inches + "''";
}

function extractPlayerIdFromLink(playerLink) {
	var split = playerLink.split("=");
	return split[split.length - 1];
}

// ------------------------------------------------------------
// Player statistics modifications
// ------------------------------------------------------------

function CBM_showAvarages() {
	var tableDiv   = xPathFirstResult("//div[@id='mc']/div[@class='mc-fs']");
	var table      = xPathFirstResult("//table[@id='career_totals']");

	if (!table) return;

	var statTable = table.cloneNode(true);

	var tableRows = xPathOrdered("//tbody/tr", statTable);
	for (var i = 0; i < tableRows.snapshotLength; i++) {
		var row = tableRows.snapshotItem(i);

		var nextRow = tableRows.snapshotItem(i + 1);
		var showBottomBorder = false;
		if (nextRow && (row.cells[0].innerHTML != nextRow.cells[0].innerHTML)) {
			showBottomBorder = true;
		}

		var matchCount = row.cells[3].innerHTML;

		setBottomBorder(row.cells[0], showBottomBorder);
		setBottomBorder(row.cells[1], showBottomBorder);
		setBottomBorder(row.cells[2], showBottomBorder);
		setBottomBorder(row.cells[3], showBottomBorder);

		setAvarageValue(row.cells[4], matchCount, showBottomBorder);

		setShotEfficiency(row.cells[5], showBottomBorder);
		setShotEfficiency(row.cells[6], showBottomBorder);
		setShotEfficiency(row.cells[7], showBottomBorder);

		for (var column = 8; column < 17; column++) {
			setAvarageValue(row.cells[column], matchCount, showBottomBorder);
		}

		boldColumn(row.cells[5]);
		boldColumn(row.cells[15]);
	}
	statTable.deleteRow(statTable.rows.length - 1)
	statTable.style.width = "100%";

	var br = document.createElement("br");
	var careerAvarage = document.createElement("p");
	careerAvarage.innerHTML = "Career avarages";
	careerAvarage.setAttribute("class", "heading");

	tableDiv.insertBefore(statTable, tableDiv.childNodes[4]);
	tableDiv.insertBefore(careerAvarage, statTable);
	tableDiv.insertBefore(br, careerAvarage);
}

function setShotEfficiency(sourceCell, showBottomBorder) {
	sourceCell.innerHTML = countEfficiency(sourceCell.innerHTML);
	setStyle(sourceCell, showBottomBorder);
}

function setAvarageValue(sourceCell, matchCount, showBottomBorder) {
	var value = sourceCell.innerHTML;
	value = value.replace(/\./, "");
	sourceCell.innerHTML = round(parseInt(value) / parseInt(matchCount), 1);
	setStyle(sourceCell, showBottomBorder);
}

function setStyle(sourceCell, showBottomBorder) {
	sourceCell.style.textAlign = "right";
	sourceCell.style.borderLeft = "1px solid #C0C0C0";
	setBottomBorder(sourceCell, showBottomBorder);
}

function setBottomBorder(sourceCell, showBottomBorder) {
	if (showBottomBorder == true) {
		sourceCell.style.borderBottom = "1px solid #606060";
	}
	sourceCell.style.paddingTop = "3px";
}

function boldColumn(sourceCell) {
	sourceCell.style.color = "green";
	sourceCell.style.fontWeight = "bold";
}

function countEfficiency(text) {
	var split = text.split("-");
	if (split[1] == "0") {
		return "-";
	}
	var efficiency = 100 * (split[0] / split[1]);

	return round(efficiency, 1) + "%";
}

// ------------------------------------------------------------
// League table modifications
// ------------------------------------------------------------

function CBM_modifyLeagueTable() {
	var tableHead = xPathFirstResult("//table[@id='standings']/thead/tr");
	if (!tableHead) return;

	var columnPoints = xPathFirstResult("//table[@id='standings']/thead/tr/th[10]");

	var columnScoredHead = document.createElement("th");
	columnScoredHead.innerHTML = "+PG";

	var columnLostHead = document.createElement("th");
	columnLostHead.innerHTML = "-PG";

	tableHead.insertBefore(columnScoredHead, columnPoints);
	tableHead.insertBefore(columnLostHead, columnPoints);

	var tableRows = xPathOrdered("//table[@id='standings']/tbody/tr");
	for (var i = 0; i < tableRows.snapshotLength; i++) {
		var row = tableRows.snapshotItem(i);

		var gamesPlayed  = row.cells[3];
		var pointsScored = row.cells[6];
		var pointsLost   = row.cells[7];
		var totalPoints  = row.cells[9];

		var scoredPPGTd = createCellElement();
		scoredPPGTd.innerHTML = round(pointsScored.innerHTML / gamesPlayed.innerHTML, 1);

		var lostPPGTd = createCellElement();
		lostPPGTd.innerHTML = round(pointsLost.innerHTML / gamesPlayed.innerHTML, 1);

		row.insertBefore(scoredPPGTd, totalPoints);
		row.insertBefore(lostPPGTd, totalPoints);
	}
}

function createCellElement() {
	var cell = document.createElement("td");
		cell.style.color = "green";
		cell.style.textAlign = "right";
		cell.style.fontWeight = "bold";
	return cell;
}

// ------------------------------------------------------------
// Team statistics
// ------------------------------------------------------------

function CBM_modifyTeamStatistics() {
	var tableDiv   = xPathFirstResult("//div[@id='mc']/div[@class='mc-fs']");
	var table      = xPathFirstResult("//table[@id='players']", tableDiv);

	var rowsCount    = xPath(".//tbody/tr", table).snapshotLength;
	var columnsCount = xPath(".//thead/tr/th", table).snapshotLength;
	if (columnsCount != 18) return;

	var statTable = table.cloneNode(true);

	// delete all rows
	for (var i = statTable.rows.length - 1; i > 0; i--) {
		statTable.deleteRow(i);
	}

	var minRow = statTable.insertRow(1);
	var maxRow = statTable.insertRow(2);
	var avgRow = statTable.insertRow(3);

	maxRow.setAttribute("class", "odd");

	var firstCell = minRow.insertCell(0);
	firstCell.innerHTML = "<b>MIN</b>";

	firstCell = maxRow.insertCell(0);
	firstCell.innerHTML = "<b>MAX</b>";

	firstCell = avgRow.insertCell(0);
	firstCell.innerHTML = "<b>AVARAGE</b>";

	for (var column = 1; column < 18; column++) {
	
		var minCell = minRow.insertCell(column);
		var maxCell = maxRow.insertCell(column);
		var avgCell = avgRow.insertCell(column);

		minCell.setAttribute("class", "center");
		maxCell.setAttribute("class", "center");
		avgCell.setAttribute("class", "center");

		minCell.innerHTML = countTableColumnMinimum(table, column, rowsCount);
		maxCell.innerHTML = countTableColumnMaximum(table, column, rowsCount);
		avgCell.innerHTML = round(countTableColumnSum(table, column, rowsCount) / rowsCount, 1);

		// avgCell.innerHTML = countTableColumnSum(table, column, rowsCount);
	}

	var careerAvarage = document.createElement("p");
	careerAvarage.innerHTML = "Extra stats";
	careerAvarage.setAttribute("class", "heading");

	var br = document.createElement("br");

	tableDiv.insertBefore(statTable, tableDiv.childNodes[ tableDiv.childNodes.length - 5 ]);
	tableDiv.insertBefore(careerAvarage, statTable);
	tableDiv.insertBefore(br, tableDiv.childNodes[ tableDiv.childNodes.length - 5 ]);
}

function countTableColumnSum(table, column, rowsCount) {
	var sum = 0;
	for (var row = 1; row <= rowsCount; row++) {
		sum += parseFloat(table.rows[row].cells[column].innerHTML.replace(/,/, "."));
	}
	return sum;
}

function countTableColumnMinimum(table, column, rowsCount) {
	var min = 9999999;
	for (var row = 1; row <= rowsCount; row++) {
		var value = parseFloat(table.rows[row].cells[column].innerHTML.replace(/,/, "."))
		if (value < min) {
			min = value;
		}
	}
	return min;
}

function countTableColumnMaximum(table, column, rowsCount) {
	var max = 0;
	for (var row = 1; row <= rowsCount; row++) {
		var value = parseFloat(table.rows[row].cells[column].innerHTML.replace(/,/, "."))
		if (value > max) {
			max = value;
		}
	}
	return max;
}

// ------------------------------------------------------------
// Links UTILS
// ------------------------------------------------------------

function getPlayerTransferHistoryLink(playerId) {
	return "<a href='?act=player&code=3&id=" + playerId + "'><img style='vertical-align: middle;' src=" + getStatsImage() + "></a>";
}

function getPlayerStatisticsLink(playerId) {
	return "<a href='?act=player&code=2&id=" + playerId + "'><img style='vertical-align: middle;' src=" + getHistoryImage() + "></a>";
}

function getHistoryImage() {
	return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U%2FgAAAA51BMVEX%2F%2F%2F8AegAAcwAAZgAAegAAaQBwgqdBhmEAcwAAegAAcwAAaQAikjP%2F%2F%2F%2F3%2B%2F31%2FPX2%2Bv3w%2B%2FDv9%2Fzr9u7p9Pro9Pvk9Onk8%2FHk8frg8uja7fjg6PDT5eKf%2F2mK9lzG1tWD8Ve7xNdu5kqM0oy0vNBc3D2rtcamt8SmtcGesracq8CKrp9Gwy9EwS1VtleMmbRKuEmJmaxFtUhep25AtD06tyaDk7Q7szyAj68xtCAxsTN6iat3iKwxqDEqqxw4pDgspTBwgqdGlGBwgJ9vf6Inni1rfJsgnhZneZcamRIZmBIjkSsKfAcbODpcAAAATXRSTlMAERERIiJVd3eIiIiq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fn06G8AAAAJcEhZcwAACvAAAArwAUKsNJgAAAArdEVYdENyZWF0aW9uIFRpbWUATW8gMTUgQXVnIDIwMDUgMTE6MzE6MTQgKzAxMDDZ%2Fhl6AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1MzmNZGAwAAAL5JREFUGJVlz8cWgjAQBdDYEQ1iDIodUaxg7AJiiQVQ%2Bf%2FvMViOC95q5i7emQEgEkI2pkPTiVzqB5CFmmku4P8gUEqTnpV9gxmCWL%2FEPe0R%2B4Igip1O%2B6CuMyHsYHlaRqS71xXjmWfgFG1lWyHCrNVs3QYMhis2LcawsFXsxoXB8mgo%2BukMYWlaRS6D%2FmStHkY91owQDgHE7poXdyDbkfQGkLW85BUijCXZ%2FxzLBxyBGMty7QsglZu7YXw3%2BvwLmpIYhJ7cXFcAAAAASUVORK5CYII%3D";
}

function getStatsImage() {
	return "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%03%00PLTE%F7%FC%F6%FF%F6%F6%FF%F3%F3%F9%F4%F5%F2%F5%FB%F5%F2%F6%FA%F0%EE%F6%EF%EB%E8%F1%F1%E2%F4%DF%EC%EF%F5%E0%EB%F7%DA%F0%D5%FD%DF%E0%D8%E6%F6%FD%DD%DD%FD%DB%DC%CB%EA%CE%FC%D9%DA%C8%E8%CA%FB%D7%D9%FB%D6%D7%D1%E2%D0%FB%D5%D6%C3%E7%BC%C7%DA%F2%BC%E3%B6%C8%D9%F0%BD%E1%BD%C3%D9%F3%BA%E0%B9%B9%E0%BB%FB%CA%CB%B4%E1%B8%B7%DF%B9%B0%E0%B5%FC%C6%C6%B6%DC%B3%B4%DA%B2%B4%D3%F3%AC%D9%AF%B1%D1%F2%AA%D9%AE%A8%D9%AC%A2%DA%A7%B0%D6%AB%B4%D3%B1%9F%DA%A6%B3%D3%B0%AB%CC%F0%A7%D5%9F%BD%C8%DD%99%D8%A1%AE%D1%AA%A9%C9%F0%A8%C8%EF%96%D6%9D%9B%D4%92%A5%CE%A3%A2%CE%A2%FC%B1%B1%A9%CA%A6%A4%C4%EC%94%D3%89%88%D4%93%B3%BF%D7%88%D2%91%9D%C1%EB%FC%AA%A9%9A%C8%95%8E%CC%84%FC%A6%A6%EE%A9%A4%87%CCz%9D%C1%9A%EF%A7%A2%97%BA%E9%ED%A4%9Fo%CE%7Ct%CC%7Fr%CD~%95%C0%92n%CCz%88%C5%7F%8C%B8%EB%92%BE%8Fl%CCy%92%B6%E7%93%BE%91%9A%B3%DC%8D%B4%E6%8E%B2%E7%8D%B3%E7%5E%CAla%CAme%C8q_%C9mx%C2k%83%B0%E9%F2%98%94%EB%99%96%8A%B7%88%8A%AF%E4%EB%98%93%87%AE%E3%87%AC%E6%82%AB%E1W%C5eX%C5e%85%B3%82%7C%AB%E3p%BCd%F5%8E%92%83%A7%E7u%B5n%80%A7%E1%E9%90%8Cn%B9c~%A5%E6~%A3%E6v%A5%E7r%A5%E6p%A5%E5r%A4%E1%89%9E%C6h%B3_%8A%9E%C4x%A0%DEr%A1%DD%F4%84%83l%9B%E3o%9B%D8l%A7g%E6%80z%F3%7D%7B%EE~%7Co%98%DBh%A7bf%9A%E2j%96%D4%5D%A7Ve%97%E2l%96%DAf%95%E2c%91%E0_%93%D9%5C%8F%E0a%8D%D6d%8D%CD%5B%8D%DET%9BNY%8C%D3%E7lk%F8ffZ%88%DE%F9ee%5B%86%D0%F8cc%5D%85%C5%F3aa%F8%60aS%84%DDS%85%CDM%94GZ%80%C1V%7F%CBW%7D%C0%F4WX%EBUWKx%D9Qv%B7%F3MQ%F1KN%EEJPLo%B1Io%BDKm%ACLl%A8Gj%A9%EF%3FCBe%B79e%AF%EC6%3A7Z%9B1Z%A6%E9%2C20T%A5%26M%94%E8%14%1C%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%000v%8B%D6%00%00%00%F9IDAT(Sc%D8%0B%04%12%96%89%F9%C1%BA%20%D6%DE%BD%0C%7B%F7r%DA%AB%CA%2B%0AZ%B9%CA%E6%F1%81%05x%8C%E4%F4%FD%FC4z8%AA%9D%1B%A4%81%02%0C%9E2%0Eqq%16%81%06v1%EA%3E%8BX%F62H%A9%99%C4f%FB%5BwrO%D4%0C1k%8E%DC%CB%E0%A6%14%96%13%AF%D3%22%96%15eX%95%94%B1d%2FC%A9r%90%93vj%AE%E4t%F3%CA%AE%AE%E8%AD%7B%19j%85%B5%22%16%7B1%B3v%87WL%9A%94%B9c%2FCQ%E84%5Bv%9B%05%BCS%D2%9A%16%F6%F7m%D8%CB%60%AA%C7%E62%B7m9%FF%BC%E2%09%2B%0B%D7%D7%ECe%60t%9F%DD%E8%ED%BBF%60Y%FD%AC%B29%BB%B9%F620%CDL%F6hM%D9%2C%B4%AA%A3%7C%E9.G%90KU%E6%B7%A7%97l%13Y7y%CBvc%88_%14V%AF%98%B1St%D3%C6%3A%98%E7%F6%EE-X%BBG%1C%E2W%B0%0AT%00%00W%B0v%D4%F3%05%92t%00%00%00%00IEND%AEB%60%82";
}

// ------------------------------------------------------------
// UTILS
// ------------------------------------------------------------

function nbsp(count) {
	var nbsp = "";
	for (var i = 0; i < count; i++) {
		nbsp += "&nbsp;";
	}
	return nbsp;
}

function round(number, precision) {
	var round = Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
	return round.toFixed(1);
}

function xPath(xPathExpression, element) {
	if (!element) {
		element = document;
	}
	return document.evaluate(xPathExpression, element, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xPathOrdered(xPathExpression, element) {
	if (!element) {
		element = document;
	}
	return document.evaluate(xPathExpression, element, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xPathFirstResult(xPathExpression, element) {
	return xPath(xPathExpression, element).snapshotItem(0);
}