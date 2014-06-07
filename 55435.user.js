// ==UserScript==
// @name           Greasemungo Arrest Helper - tr-TR edition
// @namespace      kenmooda@gmail.com
// @include        http://www*.popmundo.com/Common/CharacterDetails.asp*
// @include        http://www*.popmundo.com/Common/Charts.asp?action=MostCriminal
// @include        http://www*.popmundo.com/Common/CharacterDiary.asp?action=view&CharacterID=*
// @include        http://www*.popmundo.com/Common/CharacterDiary.asp?action=Interrogate&CharacterID=*
// @description    Popmundo: A helper for police officers and special agents. Remembers the lists of most wanted criminals and the last known location of a criminal. (2009-08-04)
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Arrest Helper
//    Copyright (C) 2008-2009  Tommi Rautava
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
////////////////////////////////////////////////////////////////////////////////

const TRACK_CRIMINALS                = true;
const FILL_ARREST_FORM               = true;
const ADD_VIEW_DETAILS_LINK_TO_DIARY = true;
const REPORT_TEXT_FOR_SINGLE_CASE    = "1 [crime] suçundan aranıyor. [city].\n\n";
const REPORT_TEXT_FOR_MULTIPLE_CASES = "[count] [crime] suçundan aranıyor. [city].\n\n";

////////////////////////////////////////////////////////////////////////////////

const MOST_WANTED_ROW_XPATH = "/html/body/table[3]/tbody/tr/td[1]/table[2]/tbody/tr";
const WANTED_FOR_ROW_XPATH = "/html/body/table[3]/tbody/tr/td[1]/div[2]/table/tbody/tr[2]/td/table/tbody/tr[2]";
const CHARACTER_CITY_XPATH = "/html/body/table[3]/tbody/tr/td[1]/table[1]/tbody/tr/td[2]/table/tbody/tr[2]/td/a[contains(@href, 'CityID')]";
const CHARACTER_STATE_XPATH = "/html/body/table[3]/tbody/tr/td[1]/div[2]/table/tbody/tr/td[1]/table/tbody/tr[5]/td";
const CHARACTER_WANTED_IN_XPATH = "/html/body/table[3]/tbody/tr/td[1]/table[1]/tbody/tr/td[2]/table/tbody/tr[3]/td";
const CHARACTER_NAME_ON_DIARY_XPATH = "/html/body/table[3]/tbody/tr/td[1]/div";

const CRIME_TYPE_INPUT_NAME = "CrimeTypeID";
const CRIME_TEXT_INPUT_NAME = "CrimeText";
const CITY_ID_INPUT_NAME = "CityID";

const MOST_WANTED_PREF = "MostWanted";
const CITY_NAMES_PREF = "CityNames";
const CHAR_STATES_PREF = "CharacterStates";
const CHAR_DATA_PREF = "CharacterData";
const CITIES_PREF = "Cities";

const CHAR_ID_REGEXP = /[?&]characterid=(\d+)/i;
const CITY_ID_REGEXP = /[?&]cityid=(\d+)/i;
const CHAR_STATE_REGEXP = /:\s+(.+)/i;

const CHARACTER_DETAILS_PATHNAME = "/Common/CharacterDetails.asp";

const CRIME_ID_TO_NAME_MAP = {
       1:        "hırsızlık",
       3:        "dolandırıcılık",
       5:        "meskene tecavüz",
       7:        "civil disobedience",
       8:        "borç",
       9:        "cinayet",
       10:        "vandalizm",
       12:        "zimmete para geçirme",
       13:        "çalıntı eşya alım satımı",
       14:        "ayaklanmaya teşvik",
       15:        "kundakçılık",
       16:        "kaçakçılık",
       18:        "hapisten kaçma",
       19:        "yolsuzluk",
       20:        "hainlik",
       21:        "saldırı",
       23:        "poligami"
};

////////////////////////////////////////////////////////////////////////////////

var page = document.location.pathname.toLowerCase();
var actionMatch = document.location.search.match(/[?&]action=(\w+)/i);
var action = actionMatch ? actionMatch[1].toLowerCase() : "";
GM_log("page="+ page +", action="+ action);

if (page == "/common/charts.asp") {
	if (action == "mostcriminal") {
		if (TRACK_CRIMINALS) StoreMostWantedList();
	}
}
else if (page == "/common/characterdetails.asp") {
	if (action == "capture") {
		if (FILL_ARREST_FORM) AutoFillArrestForm();
	}
	else {
		if (TRACK_CRIMINALS) CheckCharacter();
	}
}
else if (page == "/common/characterdiary.asp")
{
	if (action == "view" ||
		action == "interrogate")
	{
		if (ADD_VIEW_DETAILS_LINK_TO_DIARY) AddViewCharacterLink();
	}
}


function xpathNode(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


function xpathNodes(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}


function AutoFillArrestForm() {
	// 18.03.2008  	Debt x 2  	Helsinki
	var wantedForRow = xpathNode(WANTED_FOR_ROW_XPATH);

	if (!wantedForRow) {
		GM_log("Unable to locate 'Wanted for'.");
		return;
	}
	
	var crimeTypeInput = document.getElementsByName(CRIME_TYPE_INPUT_NAME)[0];
	var crimeTextInput = document.getElementsByName(CRIME_TEXT_INPUT_NAME)[0];
	
	
	var cells = wantedForRow.getElementsByTagName("td");
	if (cells.length < 3) {
		GM_log("Not enough table cells: "+ cells +", "+ cells.length);
		return;
	}
	
	var dateCell = cells[0];
	var reasonCell = cells[1];
	var cityCell = cells[2];
	
	var reasonMatch = reasonCell.textContent.match(/(.*?) x (\d+)/);
	var crimeType = "";
	var crimeCount = 0;
	var crimeTypeId = 0;
	
	if (!reasonMatch) {
		crimeType = reasonCell.textContent;
		crimeCount = 1;
	}
	else {	
		crimeType = reasonMatch[1];
		crimeCount = reasonMatch[2];
	}
	
	// Select the crime type.
	for (var i = 0; i < crimeTypeInput.length; i++) {
		if (crimeTypeInput.options.item(i).text == crimeType) {
			crimeTypeInput.selectedIndex = i;
			crimeTypeId = crimeTypeInput.options.item(i).value;
		}
	}
	
	// Fill in the description.
	var reportText = crimeCount == 1 ? REPORT_TEXT_FOR_SINGLE_CASE : REPORT_TEXT_FOR_MULTIPLE_CASES;
	var crimeTypeText = CRIME_ID_TO_NAME_MAP[crimeTypeId] || crimeType.toLowerCase();
	crimeTextInput.value = reportText.
		replace("[crime]", crimeTypeText).
		replace("[count]", crimeCount).
		replace("[city]", cityCell.textContent);
	
	GM_log("Arrest form filled in.");
}


function StoreMostWantedList() {
	var cityId = GetCityIdOnMostWantedPage();
	var cityNames = GetSavedCityNames();
	var charStateNames = GetSavedCharacterStates();
	var savedMostWantedList = GetSavedMostWantedList(cityId);
	var charData = GetSavedCharacterData();
	var currentMostWantedList = {};
	var rowNodes = xpathNodes(MOST_WANTED_ROW_XPATH);

	for (var i=0; i<rowNodes.snapshotLength; i++) {
		var rowNode = rowNodes.snapshotItem(i);
		var nameCell = rowNode.cells.item(1);
		var charLink = nameCell.getElementsByTagName("a")[0];
		var charIdMatch = charLink.search.match(CHAR_ID_REGEXP);
		
		if (charIdMatch) {
			var charId = parseInt(charIdMatch[1]);
			currentMostWantedList[charId] = 1;
			
			if (charData[charId]) {
				var charCity = charData[charId][0];
				var charState = charData[charId][1];
				
				if (charCity == 0) {
					nameCell.appendChild(document.createTextNode(" (-)"));
				}
				else {
					var cityName = cityNames[charCity];
					var stateName = charStateNames[charState];
					
					if (cityName) {
						nameCell.appendChild(document.createTextNode(" ("+ cityName +", "+ stateName +")"));
					} else {
						nameCell.appendChild(document.createTextNode(" (#"+ charCity +", "+ stateName +")"));
					}
				}				
			}
			else {
				nameCell.appendChild(document.createTextNode(" (?)"));
			}			
		}
	}
	
	var d = 0;
	for (var n in savedMostWantedList) {
		if (!currentMostWantedList[n]) {
			delete charData[n];
			d++;
		}
	}
	
	if (d > 0) {
		GM_log(d +" characters captured since the last update");
		SaveCharacterData(charData);
	}
	
	AddCity(cityId);
	SaveMostWantedList(cityId, currentMostWantedList);
}


function CheckCharacter() {
	var charIdMatch = document.location.search.match(CHAR_ID_REGEXP);
	if (!charIdMatch) {
		GM_log("Cannot determine character ID: "+ document.location.href);
		return;
	}

	var charId = parseInt(charIdMatch[1]);
	var charData = GetSavedCharacterData();

	if (!IsWanted()) {
		if (charData[charId]) {
			GM_log("Not wanted anymore");
			delete charData[charId];
			SaveCharacterData(charData);
		}
		else {
			GM_log("Not wanted");
		}
		
		return;
	}

	GM_log("Wanted: #"+ charId);

	var cityNames = GetSavedCityNames();
	var cities = GetCities();
		
	var charCityNode = xpathNode(CHARACTER_CITY_XPATH);
	var charStateNode = xpathNode(CHARACTER_STATE_XPATH);
			
	if (charCityNode) {
		var charCityIdMatch = charCityNode.search.match(CITY_ID_REGEXP);
		var charCityId = parseInt(charCityIdMatch[1]);
		
		var charStateMatch = charStateNode.textContent.match(CHAR_STATE_REGEXP);
		var charState = charStateMatch[1].replace(/\s+$/, "");			
		var charStateId = GetCharacterStateByName(charState);
		
		charData[charId] = [charCityId, charStateId];
		SaveCharacterData(charData);

		cityNames[charCityId] = charCityNode.textContent;
		SaveCityNames(cityNames);

		GM_log("Character #"+ charId +" is "+ charState +" in "+ cityNames[charCityId]);
	}
	else {
		charData[charId] = [0, 0];
		SaveCharacterData(charData);
		GM_log("Location of character #"+ charId +" is unknown");
	}
}

function AddViewCharacterLink() {
	var titleNode = xpathNode(CHARACTER_NAME_ON_DIARY_XPATH);
	var link1 = document.createElement("a");
	link1.href = document.location.href;
	link1.search = link1.search.replace(/action\=.*\&/i, "action=view&");
	link1.pathname = CHARACTER_DETAILS_PATHNAME;
	
	while (titleNode.childNodes.length > 0) {
		var node1 = titleNode.childNodes.item(0);
		titleNode.removeChild(node1);
		link1.appendChild(node1);
	}
	
	titleNode.appendChild(link1);
}

function IsWanted() {
	var wantedInNode = xpathNode(CHARACTER_WANTED_IN_XPATH);
	return (wantedInNode != null);
}

function GetSavedMostWantedList(cityId) {
	var pref = MOST_WANTED_PREF +"."+ cityId;
	var value = GM_getValue(pref, "({})");
	//GM_log("Get most wanted in #"+ cityId +": "+ value);
	//GM_log("Get most wanted in #"+ cityId);
	return eval(value);
}	


function SaveMostWantedList(cityId, mostWantedList) {
	var pref = MOST_WANTED_PREF +"."+ cityId;
	var value = mostWantedList.toSource();
	//GM_log("Set most wanted in #"+ cityId +": "+ value);
	//GM_log("Set most wanted in #"+ cityId);
	GM_setValue(pref, value);
}	


function GetSavedCharacterData() {
	var value = GM_getValue(CHAR_DATA_PREF, "({})");
	return eval(value);
}	


function SaveCharacterData(characterData) {
	var value = characterData.toSource();
	GM_setValue(CHAR_DATA_PREF, value);
}	


function GetCityIdOnMostWantedPage() {
	return document.getElementsByName(CITY_ID_INPUT_NAME)[0].value;
}


function GetSavedCityNames() {
	var value = GM_getValue(CITY_NAMES_PREF, "({})");
	//GM_log("Get city names: "+ value);
	//GM_log("Get city names");
	return eval(value);
}


function SaveCityNames(cityNames) {
	var value = cityNames.toSource();
	//GM_log("Set city names: "+ value);
	//GM_log("Set city names");
	GM_setValue(CITY_NAMES_PREF, value);
}


function GetSavedCharacterStates() {
	var value = GM_getValue(CHAR_STATES_PREF, "({})");
	//GM_log("Get character states: "+ value);
	//GM_log("Get character states");
	return eval(value);
}


function SaveCharacterStates(characterStates) {
	var value = characterStates.toSource();
	//GM_log("Set character states: "+ value);
	//GM_log("Set character states");
	GM_setValue(CHAR_STATES_PREF, value);
}


function GetCharacterStateByName(stateName) {
	var states = GetSavedCharacterStates();
	var maxN = 0;

	for (var n in states) {
		n = parseInt(n);		
		if (states[n] == stateName) return n;
		maxN = Math.max(maxN, n); 
	}

	maxN++;
	states[maxN] = stateName;
	SaveCharacterStates(states);

	return maxN;
}


function GetCities() {
	var value = GM_getValue(CITIES_PREF, "({})");
	return eval(value);
}


function AddCity(cityId) {
	var cities = GetCities();
	cities[cityId] = 1;
	GM_setValue(CITIES_PREF, cities.toSource());	
}

//EOF