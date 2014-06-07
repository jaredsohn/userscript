// ==UserScript==
// @name           Torn Crime History
// @namespace      Torn Crime History
// @description    Torn Crime History
// @include        *torn.com*
//
// @author 	       AquaRegia
// @version 	   2012-09-06
// ==/UserScript==

if(!window.chrome)
{
	var storage = unsafeWindow.localStorage;
}
else
{
	var storage = localStorage;
}

if(storage && !/\/js\//.test(document.location.href))
{
	var myName;
	
	if(document.getElementById("tblInfo"))
	{
		myName = document.getElementById("tblInfo").getElementsByTagName("tr")[0].getElementsByTagName("a")[0].innerHTML;
	}
	else
	{
		myName = document.getElementsByTagName("font")[1].innerHTML;
	}

	if(/docrime/.test(document.location.href))
	{
		if(document.body.innerHTML.split("Result: ").length == 2)
		{
			var crimeData = getCrimeData();
			
			var id = crimeData.crimes.length + 1;
		
			var dateObject = new Date();
			dateObject.setHours(dateObject.getHours() + 1);
			
			var dateString = toDateString(dateObject);
		
			var myLevel;
			
			if(document.getElementById("level"))
			{
				myLevel = parseInt(document.getElementById("level").innerHTML);
			}
			else
			{
				myLevel = parseInt(document.body.innerHTML.split("Level:</td>")[1].split("</td>")[0].split("<td>")[1]);
			}
			
			var myTotalNerve;
			
			if(document.getElementById("crimes"))
			{
				myTotalNerve = parseInt(document.getElementById("crimes").parentNode.innerHTML.split("</span>/")[1]);
			}
			else
			{
				myTotalNerve = parseInt(document.body.innerHTML.split("Nerve:</td>")[1].split("</td>")[0].split("/")[1]);
			}
			
			var nerveTake = parseInt(document.getElementsByName("nervetake")[0].value);
			var crimeName = document.getElementsByName("crime")[0].value;
			
			var result = 0;
			var money = 0;
			
			var allFonts = document.getElementsByTagName("font");
			
			for(var i = 0; i < allFonts.length; i++)
			{
				if(/Result: /.test(allFonts[i].innerHTML))
				{
					if(allFonts[i].color == "#006600")
					{
						result = 1;
					}
					else if(allFonts[i].color == "#AA0000")
					{
						result = -1;
					}
					
					if(allFonts[i].innerHTML.split("$").length == 2)
					{
						money = parseInt(allFonts[i].innerHTML.split("$")[1].replace(/#[0-9A-f]{3,6}/g, "").replace(/[^0-9]/g, ""));
					}
				}
			}
			
			money *= result;
			
			var newCrime = 
			{
				id: id, 
				time: dateString, 
				level: myLevel, 
				totalNerve: myTotalNerve, 
				nerve: nerveTake, 
				name: crimeName, 
				result: result, 
				money: money
			};
			
			crimeData.crimes.splice(0, 0, newCrime);
			
			storage["crimeData:" + myName] = JSON.stringify(crimeData);
		}
	}
	
	window.addEventListener("keyup", function(e)
	{
		if(e.target.localName != "textarea" && e.target.localName != "input")
		{
			if(e.shiftKey)
			{
				if(!document.getElementById("crimeHistoryOverlay"))
				{
					if(e.keyCode == 67)
					{
						viewCrimeHistory();
					}
				}
				else
				{
					removeCrimeHistory();
				}
			}
		}
	}, false);
}

function twoDigits(s)
{
	s = s + "";
	if(s.length == 1)
	{
		s = "0" + s;
	}
	
	return s;
}

function getCrimeData()
{
	var myName;
	
	if(document.getElementById("tblInfo"))
	{
		myName = document.getElementById("tblInfo").getElementsByTagName("tr")[0].getElementsByTagName("a")[0].innerHTML;
	}
	else
	{
		myName = document.getElementsByTagName("font")[1].innerHTML
	}

	var oldJson = storage["crimeData"];
	var json = storage["crimeData:" + myName];
	var crimeData;
	
	if(json)
	{
		crimeData = eval("(" + json + ")");
	}
	else if(oldJson)
	{
		crimeData = eval("(" + oldJson + ")");
		storage.removeItem("crimeData");
		storage["crimeData:" + myName] = oldJson;
	}
	else
	{
		crimeData = 
		{
			crimes: []
		};
	}
	
	return crimeData;
}

function toDateString(date)
{
	var dateString = date.getUTCFullYear() + "-";
	dateString += twoDigits(date.getUTCMonth() + 1) + "-";
	dateString += twoDigits(date.getUTCDate()) + " ";
	dateString += twoDigits(date.getUTCHours()) + ":";
	dateString += twoDigits(date.getUTCMinutes()) + ":";
	dateString += twoDigits(date.getUTCSeconds());
	
	return dateString;
}

function viewCrimeHistory()
{
	var darkOverlay = document.createElement("div");
	darkOverlay.id = "crimeHistoryOverlay";
	darkOverlay.style.width = "100%";
	darkOverlay.style.height = "100%";
	darkOverlay.style.position = "fixed";
	darkOverlay.style.left = "0px";
	darkOverlay.style.top = "0px";
	darkOverlay.style.opacity = 0.8;
	darkOverlay.style.background = "#000";
	darkOverlay.style.zIndex = 100;
	
	darkOverlay.addEventListener("click", function()
	{
		removeCrimeHistory();
	}, false);
	
	var information = document.createElement("div");
	information.id = "crimeHistoryInformation";
	information.style.overflow = "auto";
	information.style.padding = "8px";
	information.style.width = "60%";
	information.style.height = "80%";
	information.style.position = "fixed";
	information.style.top = "5%";
	information.style.left = "20%";
	information.style.background = "#CCC";
	information.style.zIndex = 101;
	
	document.body.appendChild(darkOverlay);
	document.body.appendChild(information);
	
	loadHistory();
}

function removeCrimeHistory()
{
	document.body.removeChild(document.getElementById("crimeHistoryOverlay"));
	document.body.removeChild(document.getElementById("crimeHistoryInformation"));
}

function dateTimeToDate(dateTime)
{
	var result = dateTime.split(" ")[0];
	return (/[0-9]{4}\-[0-1]{1}[0-9]{1}\-[0-3]{1}[0-9]{1}/.test(result)) ? result : "";
}

function getFilterObject(crimeData)
{
	var json = storage["crimeHistoryFilter"];
	var filters;
	
	if(!json)
	{
		filters = 
		{
			from: dateTimeToDate(crimeData.crimes.length > 0 ? crimeData.crimes[crimeData.crimes.length - 1].time : ""), 
			to: dateTimeToDate(crimeData.crimes.length > 0 ? crimeData.crimes[0].time : ""), 
			type: "All"
		};
	}
	else
	{
		filters = eval("(" + json + ")");
	}
	
	return filters;
}

function removeDuplicates(list)
{
	list = list.sort();
	var objectList = {};
	var result = [];
	
	for(var i = 0; i < list.length; i++)
	{
		objectList[list[i]] = 0;
	}
	
	for(var i in objectList)
	{
		result.push(i);
	}
	
	return result;
}

function updateFilterTD(crimeData)
{
	var filterValues = getFilterObject(crimeData);
	
	var filterFieldset = document.createElement("fieldset");
	filterFieldset.style.height = "110px";
	filterFieldset.style.padding = "4px";
	filterFieldset.style.margin = "0px";
	filterFieldset.style.background = "#BBB";
	
	var filterLegend = document.createElement("legend");
	filterLegend.style.textAlign = "center";
	filterLegend.innerHTML = "Filters";
	
	filterFieldset.appendChild(filterLegend);
	
	var filter = document.createElement("div");

	var fromDate = document.createElement("input");
	fromDate.type = "date";
	fromDate.id = "fromDate";
	fromDate.style.width = "150px";
	fromDate.value = filterValues.from;
	
	fromDate.addEventListener("change", saveFilters, false);
	
	var toDate = document.createElement("input");
	toDate.type = "date";
	toDate.id = "toDate";
	toDate.style.width = "150px";
	toDate.value = filterValues.to;
	
	toDate.addEventListener("change", saveFilters, false);
	
	var typeFilter = document.createElement("select");
	typeFilter.id = "crimeType";
	typeFilter.style.width = "150px";
	
	var nameArray = [];
	for(var i = 0; i < crimeData.crimes.length; i++)
	{
		nameArray.push(crimeData.crimes[i].name);
	}
	nameArray = ["All"].concat(removeDuplicates(nameArray));
	
	for(var i = 0; i < nameArray.length; i++)
	{
		var option = document.createElement("option");
		option.value = nameArray[i];
		option.innerHTML = nameArray[i] == "All" ? "All" : getCrimeName(nameArray[i]);
		typeFilter.appendChild(option);
	}
	
	typeFilter.value = filterValues.type;
	
	typeFilter.addEventListener("change", saveFilters, false);
	
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	
	var fromTR = tr.cloneNode(true);
	var fromTDName = td.cloneNode(true);
	var fromTDOption = td.cloneNode(true);
	
	var toTR = tr.cloneNode(true);
	var toTDName = td.cloneNode(true);
	var toTDOption = td.cloneNode(true);
	
	var typeTR = tr.cloneNode(true);
	var typeTDName = td.cloneNode(true);
	var typeTDOption = td.cloneNode(true);
	
	fromTDName.appendChild(document.createTextNode("From: "));
	fromTDOption.appendChild(fromDate);
	fromTR.appendChild(fromTDName);
	fromTR.appendChild(fromTDOption);
	
	toTDName.appendChild(document.createTextNode("To: "));
	toTDOption.appendChild(toDate);
	toTR.appendChild(toTDName);
	toTR.appendChild(toTDOption);
	
	typeTDName.appendChild(document.createTextNode("Type: "));
	typeTDOption.appendChild(typeFilter);
	typeTR.appendChild(typeTDName);
	typeTR.appendChild(typeTDOption);
	
	table.appendChild(fromTR);
	table.appendChild(toTR);
	table.appendChild(typeTR);
	
	filter.appendChild(table);
	
	filterFieldset.appendChild(filter);
	
	document.getElementById("crimeHistoryFilterTD").innerHTML = "";
	document.getElementById("crimeHistoryFilterTD").appendChild(filterFieldset);
}

function saveFilters()
{
	storage["crimeHistoryFilter"] = JSON.stringify(
	{
		from: document.getElementById("fromDate").value, 
		to: document.getElementById("toDate").value, 
		type: document.getElementById("crimeType").value
	});
	
	updateTableAndSummaryTD();
}

function updateTitleTD()
{
	var titleDiv = document.createElement("div");
	titleDiv.style.width = "100%";
	titleDiv.style.textAlign = "center";
	
	var title = document.createElement("font");
	title.style.fontSize = "24px";
	title.appendChild(document.createTextNode("Crime History"));
	
	titleDiv.appendChild(title);
	
	document.getElementById("crimeHistoryTitleTD").innerHTML = "";
	document.getElementById("crimeHistoryTitleTD").appendChild(titleDiv);
}

function updateTableAndSummaryTD()
{
	var crimeData = getCrimeData();

	var tableFieldset = document.createElement("fieldset");
	tableFieldset.style.padding = "4px";
	tableFieldset.style.margin = "0px";
	
	var tableLegend = document.createElement("legend");
	tableLegend.style.textAlign = "center";
	tableLegend.innerHTML = "History";
	
	tableFieldset.appendChild(tableLegend);

	var table = document.createElement("table");
	table.style.border = "0px";
	table.style.width = "100%";
	table.style.borderCollapse = "collapse";

	var tr = document.createElement("tr");
	var th = document.createElement("th");
	th.style.background = "#999";
	
	tr.appendChild(th.cloneNode(true));
	tr.lastChild.appendChild(document.createTextNode("ID"));
	tr.appendChild(th.cloneNode(true));
	tr.lastChild.appendChild(document.createTextNode("Time"));
	tr.appendChild(th.cloneNode(true));
	tr.lastChild.appendChild(document.createTextNode("Level"));
	tr.appendChild(th.cloneNode(true));
	tr.lastChild.appendChild(document.createTextNode("Nerve used"));
	tr.appendChild(th.cloneNode(true));
	tr.lastChild.appendChild(document.createTextNode("Crime title"));
	tr.appendChild(th.cloneNode(true));
	tr.lastChild.appendChild(document.createTextNode("Result"));
	tr.appendChild(th.cloneNode(true));
	tr.lastChild.appendChild(document.createTextNode("Money gained"));
	
	table.appendChild(tr);
	
	var newTR;
	
	var greens = 0;
	var browns = 0;
	var reds = 0;
	var totalNerve = 0;
	var totalMoney = 0;
	
	var filter = getFilterObject(crimeData);
	
	var filterFrom = new Date(filter.from);
	var filterTo = new Date(filter.to);
	var filterType = filter.type;
	
	var currentDate;
	
	var colorToggler = true;
	
	for(var i = 0; i < crimeData.crimes.length; i++)
	{
		currentDate = new Date(dateTimeToDate(crimeData.crimes[i].time));
	
		if(currentDate < filterFrom || currentDate > filterTo)
		{
			continue;
		}
		
		if(filterType != "All" && crimeData.crimes[i].name != filterType)
		{
			continue;
		}
	
		switch(crimeData.crimes[i].result)
		{
			case 1:
				greens++;
				break;
			case -1:
				reds++;
				break;
			default:
				browns++;
				break;
		}
		
		totalNerve += crimeData.crimes[i].nerve;
		totalMoney += crimeData.crimes[i].money;
	
		newTR = document.createElement("tr");
		
		if(colorToggler)
		{
			newTR.style.background = "#AAA";
			colorToggler = !colorToggler;
		}
		else
		{
			newTR.style.background = "#BBB";
			colorToggler = !colorToggler;
		}
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(document.createTextNode(commatize(crimeData.crimes[i].id)));
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(document.createTextNode(crimeData.crimes[i].time));
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(document.createTextNode(crimeData.crimes[i].level));
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(document.createTextNode(crimeData.crimes[i].nerve + " / " + crimeData.crimes[i].totalNerve));
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(document.createTextNode(getCrimeName(crimeData.crimes[i].name)));
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(getResultNameSpan(crimeData.crimes[i].result));
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(getMoneySpan(crimeData.crimes[i].money));
		
		table.appendChild(newTR);
	}
	
	var summaryFieldset = document.createElement("fieldset");
	summaryFieldset.style.height = "110px";
	summaryFieldset.style.padding = "4px";
	summaryFieldset.style.margin = "0px";
	summaryFieldset.style.background = "#BBB";
	
	var summaryLegend = document.createElement("legend");
	summaryLegend.style.textAlign = "center";
	summaryLegend.innerHTML = "Summary";
	
	summaryFieldset.appendChild(summaryLegend);
	
	var summary = document.createElement("div");

	summary.appendChild(document.createTextNode("Crime count: " + commatize(greens+browns+reds)));
	
	summary.appendChild(document.createElement("br"));
	summary.appendChild(document.createTextNode("Money made: $" + commatize(totalMoney) + " ($" + commatize((parseFloat(totalMoney)/(greens+browns+reds)).toFixed(2)) + " per crime)"));
	
	summary.appendChild(document.createElement("br"));
	summary.appendChild(document.createTextNode("Nerve used: " + commatize(totalNerve) + " (" + commatize((parseFloat(totalNerve)/(greens+browns+reds)).toFixed(2)) + " per crime)"));
	
	summary.appendChild(document.createElement("br"));
	summary.appendChild(document.createTextNode("Greens: " + commatize(greens) + " (" + (parseFloat(greens*100)/(greens+browns+reds)).toFixed(2) + "%)"));
	
	summary.appendChild(document.createElement("br"));
	summary.appendChild(document.createTextNode("Reds: " + commatize(reds) + " (" + (parseFloat(reds*100)/(greens+browns+reds)).toFixed(2) + "%)"));
	
	summary.appendChild(document.createElement("br"));
	summary.appendChild(document.createTextNode("Browns: " + commatize(browns) + " (" + (parseFloat(browns*100)/(greens+browns+reds)).toFixed(2) + "%)"));
	
	tableFieldset.appendChild(table);
	
	document.getElementById("crimeHistoryTableTD").innerHTML = "";
	document.getElementById("crimeHistoryTableTD").appendChild(tableFieldset);
	
	summaryFieldset.appendChild(summary);
	
	document.getElementById("crimeHistorySummaryTD").innerHTML = "";
	document.getElementById("crimeHistorySummaryTD").appendChild(summaryFieldset);
}

function updateSettingsTD()
{
	var settingsFieldset = document.createElement("fieldset");
	settingsFieldset.style.height = "110px";
	settingsFieldset.style.padding = "4px";
	settingsFieldset.style.margin = "0px";
	settingsFieldset.style.background = "#BBB";
	
	var settingsLegend = document.createElement("legend");
	settingsLegend.style.textAlign = "center";
	settingsLegend.innerHTML = "Settings";
	
	settingsFieldset.appendChild(settingsLegend);

	var settings = document.createElement("div");

	var resetHistoryLink = document.createElement("span");
	resetHistoryLink.style.textDecoration = "underline";
	resetHistoryLink.style.cursor = "pointer";
	resetHistoryLink.style.color = "#911";
	resetHistoryLink.appendChild(document.createTextNode("Reset history"));
	
	resetHistoryLink.addEventListener("click", function()
	{
		requestHistoryReset();
	}, false);
	
	var resetFilterLink = document.createElement("span");
	resetFilterLink.style.textDecoration = "underline";
	resetFilterLink.style.cursor = "pointer";
	resetFilterLink.style.color = "#911";
	resetFilterLink.appendChild(document.createTextNode("Reset filter"));
	
	resetFilterLink.addEventListener("click", function()
	{
		requestFilterReset();
	}, false);
	
	settings.appendChild(resetHistoryLink);
	settings.appendChild(document.createElement("br"));
	settings.appendChild(resetFilterLink);
	
	settingsFieldset.appendChild(settings);
	
	document.getElementById("crimeHistorySettingsTD").innerHTML = "";
	document.getElementById("crimeHistorySettingsTD").appendChild(settingsFieldset);
}

function loadHistory()
{
	crimeData = getCrimeData();

	var root = document.getElementById("crimeHistoryInformation");
	
	var layoutTable = document.createElement("table");
	layoutTable.style.width = "100%";
	layoutTable.style.cellSpacing = "0px";
	layoutTable.style.cellPadding = "0px";
	
	var titleTR = document.createElement("tr");
	var titleTD = document.createElement("td");
	titleTD.colSpan = "3";
	titleTD.id = "crimeHistoryTitleTD";
	
	titleTR.appendChild(titleTD);
	
	var infoTR = document.createElement("tr");
	var filterTD = document.createElement("td");
	filterTD.id = "crimeHistoryFilterTD";
	filterTD.style.width = "30%";
	var summaryTD = document.createElement("td");
	summaryTD.id = "crimeHistorySummaryTD";
	summaryTD.style.width = "40%";
	var settingsTD = document.createElement("td");
	settingsTD.id = "crimeHistorySettingsTD";
	settingsTD.style.width = "30%";
	
	infoTR.appendChild(filterTD);
	infoTR.appendChild(summaryTD);
	infoTR.appendChild(settingsTD);
	
	var tableTR = document.createElement("tr");
	var tableTD = document.createElement("td");
	tableTD.colSpan = "3";
	tableTD.id = "crimeHistoryTableTD";
	
	tableTR.appendChild(tableTD);
	
	layoutTable.appendChild(titleTR);
	layoutTable.appendChild(infoTR);
	layoutTable.appendChild(tableTR);
	
	root.innerHTML = "";
	root.appendChild(layoutTable);
	
	updateTitleTD();
	updateSettingsTD();
	updateFilterTD(crimeData);
	updateTableAndSummaryTD();
}

function commatize(nStr)
{
	var x;
	var x1;
	var x2;
	var rgx;

	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1))
	{
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function getResultNameSpan(i)
{
	var result = document.createElement("span");

	if(i == 1)
	{
		result.style.color = "#060";
		result.appendChild(document.createTextNode("Green"));
	}
	else if(i == -1)
	{
		result.style.color = "#A00";
		result.appendChild(document.createTextNode("Red"));
	}
	else
	{
		result.style.color = "#5a461e";
		result.appendChild(document.createTextNode("Brown"));
	}
	
	return result;
}

function getMoneySpan(amount)
{
	amount = parseInt(amount);
	
	var result = document.createElement("span");
	var color;
	
	if(amount > 0)
	{
		color = "#060";
	}
	else if(amount < 0)
	{
		color = "#600";
	}
	else
	{
		color = "#5a461e";
	}
	
	result.style.color = color;
	result.appendChild(document.createTextNode("$" + commatize(amount)));
	
	return result;
}

function requestHistoryReset()
{
	if(confirm("This will delete all your crime history.\n\nAre you sure?"))
	{
		storage["crimeData:" + myName] = "{crimes:[]}";
		updateTableAndSummaryTD();
	}
}

function requestFilterReset()
{
	if(confirm("This will reset your filter.\n\nAre you sure?"))
	{
		var crimeData = getCrimeData();
	
		storage["crimeHistoryFilter"] = JSON.stringify(
		{
				from: dateTimeToDate(crimeData.crimes.length > 0 ? crimeData.crimes[crimeData.crimes.length - 1].time : ""), 
				to: dateTimeToDate(crimeData.crimes.length > 0 ? crimeData.crimes[0].time : ""), 
				type: "All"
		});
		
		updateFilterTD();
		updateTableAndSummaryTD();
	}
}

function getCrimeName(shortName)
{
	switch(shortName)
	{
		case "searchtrainstation": return "Search the train station";
		case "searchbridge": return "Search under the old bridge";
		case "searchbins": return "Search the bins";
		case "searchfountain": return "Search the water fountain";
		case "searchdumpster": return "Search the dumpsters";
		case "searchmovie": return "Search movie theater";
		
		case "cdrock": return "Rock CDs";
		case "cdheavymetal": return "Heavy Metal CDs";
		case "cdpop": return "Pop CDs";
		case "cdrap": return "Rap CDs";
		case "cdreggae": return "Reggae CDs";
		case "dvdhorror": return "Horror DVDs";
		case "dvdaction": return "Action DVDs";
		case "dvdromance": return "Romance DVDs";
		case "dvdsci": return "Sci Fi DVDs";
		case "dvdthriller": return "Thriller DVDs";
		
		case "chocolatebars": return "A few chocolate bars";
		case "bonbons": return "A few bags of bonbons";
		case "extrastrongmints": return "A box of extra strong mints";
		
		case "musicstall": return "Music stall";
		case "electronicsstall": return "Electronics stall";
		case "computerstall": return "Computer stall";
		
		case "tanktop": return "Tank top";
		case "trainers": return "Trainers";
		case "jacket": return "Jacket";
		
		case "watch": return "Watch";
		case "necklace": return "Necklace";
		case "ring": return "Ring";
		
		case "hobo": return "Hobo";
		case "kid": return "Kid";
		case "oldwoman": return "Old woman";
		case "businessman": return "Businessman";
		case "lawyer": return "Lawyer";
		case "tim": return "Loan shark";
		
		case "apartment": return "Apartment";
		case "house": return "Detached house";
		case "mansion": return "Mansion";
		case "cartheft": return "Cars";
		case "office": return "Office";
		
		case "swiftrobbery": return "Swift robbery";
		case "thoroughrobbery": return "Thorough robbery";
		case "swiftconvenient": return "Swift Convenience";
		case "thoroughconvenient": return "Thorough Convenience";
		case "swiftbank": return "Swift Bank";
		case "thoroughbank": return "Thorough Bank";
		case "swiftcar": return "Swift Armored Car";
		case "thoroughcar": return "Thorough Armored Car";
		
		case "cannabis": return "Transport Cannabis";
		case "amphetamines": return "Transport Amphetamines";
		case "cocaine": return "Transport Cocaine";
		case "drugspills": return "Sell Pills";
		case "drugscanabis": return "Sell Cannabis";
		case "drugscocaine": return "Sell Cocaine";
		
		case "simplevirus": return "Simple virus";
		case "polymorphicvirus": return "Polymorphic virus";
		case "tunnelingvirus": return "Tunneling Virus";
		case "armoredvirus": return "Armored Virus";
		case "stealthvirus": return "Stealth virus";
		
		case "assasination": return "Assassinate a target";
		case "driveby": return "Drive by Shooting";
		case "carbomb": return "Car Bomb";
		case "murdermobboss": return "Mob Boss";
		
		case "home": return "Home";
		case "Carlot": return "Car Lot";
		case "OfficeBuilding": return "Office Building";
		case "aptbuilding": return "Apartment Building";
		case "warehouse": return "Warehouse";
		case "motel": return "Motel";
		case "govbuilding": return "Government Building";
		
		case "parkedcar": return "Steal a parked car";
		case "movingcar": return "Hijack a car";
		case "carshop": return "Steal car from showroom";
		
		case "pawnshop": return "Side Door";
		case "pawnshopcash": return "Rear Door";
		
		case "makemoney2": return "Money";
		case "maketokens2": return "Casino tokens";
		case "makecard": return "Credit card";
		
		case "napkid": return "Kid";
		case "napwomen": return "Woman";
		case "napcop": return "Undercover cop";
		case "napmayor": return "Mayor";
		
		case "trafficbomb": return "Explosives";
		case "trafficarms": return "Firearms";
		
		case "bombfactory": return "Bomb a factory";
		case "bombbuilding": return "Bomb a government building";
		
		case "hackbank": return "Hack into a Bank Mainframe";
		case "hackfbi": return "Hack the F.B.I Mainframe";
		
		default: return "unknown";
	}
}