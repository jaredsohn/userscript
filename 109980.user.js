// ==UserScript==
// @name           Torn Hunt History
// @namespace      Torn Hunt History
// @description    Torn Hunt History
// @include        *torn.com*
//
// @author 	   AquaRegia
// @version 	   2011-08-21
// ==/UserScript==

if(!window.chrome)
{
	var storage = unsafeWindow.localStorage;
}
else
{
	var storage = localStorage;
}

if(storage)
{
	if(/page=hunting&hunt=[1-3]$/.test(document.location.href))
	{
		if(document.body.innerHTML.split("You sell the carcases").length == 2)
		{
			var huntData = getHuntData();
			
			var id = huntData.hunts.length + 1;
		
			var dateObject = new Date();
			dateObject.setHours(dateObject.getHours() + 1);
			
			var dateString = toDateString(dateObject);

			var skillGain = fourDecimals(parseFloat(document.body.innerHTML.split("You also gain")[1].split("</b>")[0].split("<b>")[1]));
			
			var huntType = getTypeFromURL(document.location.href);
			
			var killList = Array.prototype.slice.call(document.getElementsByTagName("center")[1].getElementsByTagName("b"), 0, -2);
			var kills = 0;
			for(var i = 0; i < killList.length; i++)
			{
				kills += parseInt(killList[i].innerHTML);
			}
			
			var money = parseInt(document.body.innerHTML.split("$")[1].split("<")[0].replace(/[^0-9\-]/g, "")) - 500;
			
			var newHunt = 
			{
				id: id, 
				time: dateString, 
				skill: huntData.skill, 
				skillGain: skillGain, 
				type: huntType, 
				kills: kills, 
				money: money
			};
			
			huntData.hunts.splice(0, 0, newHunt);
			
			if(huntData.skill != "unknown")
			{
				huntData.skill = parseFloat(fourDecimals(parseFloat(huntData.skill) + parseFloat(skillGain)));
			}
			
			storage["huntData"] = JSON.stringify(huntData);
		}
	}
	else if(/page=hunting$/.test(document.location.href))
	{
		var huntSkill = parseFloat(document.body.innerHTML.split("Your hunting skill is")[1].split(" /")[0].split("<b>")[1]);
		
		huntData = getHuntData();
		huntData.skill = huntSkill;
		
		storage["huntData"] = JSON.stringify(huntData);
	}
	
	window.addEventListener("keyup", function(e)
	{
		if(e.target.localName != "textarea" && e.target.localName != "input")
		{
			if(e.shiftKey)
			{
				if(!document.getElementById("huntHistoryOverlay"))
				{
					if(e.keyCode == 72)
					{
						viewHuntHistory();
					}
				}
				else
				{
					removeHuntHistory();
				}
			}
		}
	}, false);
}
else
{
	alert("I'm afraid your browser doesn't support the script \"Torn Hunt History\" =(");
}

function getHuntData()
{
	var json = storage["huntData"];
	var huntData;
	
	if(!json)
	{
		huntData = 
		{
			skill: "unknown", 
			hunts: []
		};
	}
	else
	{
		huntData = eval("(" + json + ")");
	}
	
	return huntData;
}

function viewHuntHistory()
{
	var darkOverlay = document.createElement("div");
	darkOverlay.id = "huntHistoryOverlay";
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
		removeHuntHistory();
	}, false);
	
	var information = document.createElement("div");
	information.id = "huntHistoryInformation";
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

function removeHuntHistory()
{
	document.body.removeChild(document.getElementById("huntHistoryOverlay"));
	document.body.removeChild(document.getElementById("huntHistoryInformation"));
}

function updateTitleTD()
{
	var titleDiv = document.createElement("div");
	titleDiv.style.width = "100%";
	titleDiv.style.textAlign = "center";
	
	var title = document.createElement("font");
	title.style.fontSize = "24px";
	title.appendChild(document.createTextNode("Hunt History"));
	
	titleDiv.appendChild(title);
	
	document.getElementById("huntHistoryTitleTD").innerHTML = "";
	document.getElementById("huntHistoryTitleTD").appendChild(titleDiv);
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
	
	document.getElementById("huntHistorySettingsTD").innerHTML = "";
	document.getElementById("huntHistorySettingsTD").appendChild(settingsFieldset);
}

function requestHistoryReset()
{
	if(confirm("This will delete all your hunt history.\n\nAre you sure?"))
	{
		var huntData = getHuntData();
		huntData.hunts = [];
		storage["huntData"] = JSON.stringify(huntData);
		updateTableAndSummaryTD();
	}
}

function requestFilterReset()
{
	if(confirm("This will reset your filter.\n\nAre you sure?"))
	{
		var huntData = getHuntData();
	
		storage["huntHistoryDates"] = JSON.stringify(
		{
				from: dateTimeToDate(huntData.hunts.length > 0 ? huntData.hunts[huntData.hunts.length - 1].time : ""), 
				to: dateTimeToDate(huntData.hunts.length > 0 ? huntData.hunts[0].time : "")
		});
		
		updateFilterTD();
		updateTableAndSummaryTD();
	}
}

function dateTimeToDate(dateTime)
{
	var result = dateTime.split(" ")[0];
	return (/[0-9]{4}\-[0-1]{1}[0-9]{1}\-[0-3]{1}[0-9]{1}/.test(result)) ? result : "";
}

function getDateFilterObject(huntData)
{
	var json = storage["huntHistoryDates"];
	var dates;
	
	if(!json)
	{
		dates = 
		{
			from: dateTimeToDate(huntData.hunts.length > 0 ? huntData.hunts[huntData.hunts.length - 1].time : ""), 
			to: dateTimeToDate(huntData.hunts.length > 0 ? huntData.hunts[0].time : "")
		};
	}
	else
	{
		dates = eval("(" + json + ")");
	}
	
	return dates;
}

function updateFilterTD(huntData)
{
	
	var dates = getDateFilterObject(huntData);
	
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
	fromDate.value = dates.from;
	
	fromDate.addEventListener("change", function()
	{
		storage["huntHistoryDates"] = JSON.stringify(
		{
			from: document.getElementById("fromDate").value, 
			to: document.getElementById("toDate").value
		});
		
		updateTableAndSummaryTD();
	}, false);
	
	var toDate = document.createElement("input");
	toDate.type = "date";
	toDate.id = "toDate";
	toDate.value = dates.to;
	
	toDate.addEventListener("change", function()
	{
		storage["huntHistoryDates"] = JSON.stringify(
		{
			from: document.getElementById("fromDate").value, 
			to: document.getElementById("toDate").value
		});
		
		updateTableAndSummaryTD();
	}, false);
	
	filter.appendChild(document.createTextNode("From: "));
	filter.appendChild(document.createElement("br"));
	filter.appendChild(fromDate);
	filter.appendChild(document.createElement("br"));
	filter.appendChild(document.createTextNode("To: "));
	filter.appendChild(document.createElement("br"));
	filter.appendChild(toDate);
	
	filterFieldset.appendChild(filter);
	
	document.getElementById("huntHistoryFilterTD").innerHTML = "";
	document.getElementById("huntHistoryFilterTD").appendChild(filterFieldset);
}

function updateTableAndSummaryTD()
{
	var huntData = getHuntData();

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
	tr.lastChild.appendChild(document.createTextNode("Skill"));
	tr.appendChild(th.cloneNode(true));
	tr.lastChild.appendChild(document.createTextNode("Skill gained"));
	tr.appendChild(th.cloneNode(true));
	tr.lastChild.appendChild(document.createTextNode("Type"));
	tr.appendChild(th.cloneNode(true));
	tr.lastChild.appendChild(document.createTextNode("Animals killed"));
	tr.appendChild(th.cloneNode(true));
	tr.lastChild.appendChild(document.createTextNode("Money gained"));
	
	table.appendChild(tr);
	
	var newTR;
	
	var successes = 0;
	var fails = 0;
	var totalMoney = 0;
	var totalKills = 0;
	var skillGained = 0;
	
	var dates = getDateFilterObject(huntData);
	
	var filterFrom = new Date(dates.from);
	var filterTo = new Date(dates.to);
	
	var currentDate;
	
	for(var i = 0; i < huntData.hunts.length; i++)
	{
		currentDate = new Date(dateTimeToDate(huntData.hunts[i].time));
	
		if(currentDate < filterFrom || currentDate > filterTo)
		{
			continue;
		}
		
		if(huntData.hunts[i].money > 0)
		{
			successes += 1;
		}
		else
		{
			fails += 1;
		}
		
		totalMoney += huntData.hunts[i].money;
		totalKills += huntData.hunts[i].kills;
		skillGained += huntData.hunts[i].skillGain;
	
		newTR = document.createElement("tr");
		
		if(i%2)
		{
			newTR.style.background = "#AAA";
		}
		else
		{
			newTR.style.background = "#BBB";
		}
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(document.createTextNode(commatize(huntData.hunts[i].id)));
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(document.createTextNode(huntData.hunts[i].time));
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(document.createTextNode(huntData.hunts[i].skill.toFixed(4)));
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(document.createTextNode(huntData.hunts[i].skillGain.toFixed(4)));
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(document.createTextNode(huntData.hunts[i].type));
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(document.createTextNode(huntData.hunts[i].kills));
		
		newTR.appendChild(document.createElement("td"));
		newTR.lastChild.appendChild(getMoneySpan(huntData.hunts[i].money));
		
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

	summary.appendChild(document.createTextNode("Total hunts: " + commatize(successes + fails)));
	
	summary.appendChild(document.createElement("br"));
	summary.appendChild(document.createTextNode("Money made: $" + commatize(totalMoney) + " ($" + commatize((parseFloat(totalMoney)/(successes + fails)).toFixed(2)) + " per hunt)"));
	
	summary.appendChild(document.createElement("br"));
	summary.appendChild(document.createTextNode("Skill gained: " + commatize(skillGained.toFixed(4)) + " (" + (parseFloat(skillGained)/(successes + fails)).toFixed(5) + " per hunt)"));
	
	summary.appendChild(document.createElement("br"));
	summary.appendChild(document.createTextNode("Animals killed: " + commatize(totalKills) + " (" + commatize((parseFloat(totalKills)/(successes + fails)).toFixed(2)) + " per hunt)"));
	
	summary.appendChild(document.createElement("br"));
	summary.appendChild(document.createTextNode("Hunts succeeded: " + commatize(successes) + " (" + (parseFloat(successes*100)/(successes + fails)).toFixed(2) + "%)"));
	
	summary.appendChild(document.createElement("br"));
	summary.appendChild(document.createTextNode("Hunts failed: " + commatize(fails) + " (" + (parseFloat(fails*100)/(successes + fails)).toFixed(2) + "%)"));
	
	tableFieldset.appendChild(table);
	
	document.getElementById("huntHistoryTableTD").innerHTML = "";
	document.getElementById("huntHistoryTableTD").appendChild(tableFieldset);
	
	summaryFieldset.appendChild(summary);
	
	document.getElementById("huntHistorySummaryTD").innerHTML = "";
	document.getElementById("huntHistorySummaryTD").appendChild(summaryFieldset);
}

function loadHistory()
{
	huntData = getHuntData();

	var root = document.getElementById("huntHistoryInformation");
	
	var layoutTable = document.createElement("table");
	layoutTable.style.width = "100%";
	layoutTable.style.cellSpacing = "0px";
	layoutTable.style.cellPadding = "0px";
	
	var titleTR = document.createElement("tr");
	var titleTD = document.createElement("td");
	titleTD.colSpan = "3";
	titleTD.id = "huntHistoryTitleTD";
	
	titleTR.appendChild(titleTD);
	
	var infoTR = document.createElement("tr");
	var filterTD = document.createElement("td");
	filterTD.id = "huntHistoryFilterTD";
	filterTD.style.width = "30%";
	var summaryTD = document.createElement("td");
	summaryTD.id = "huntHistorySummaryTD";
	summaryTD.style.width = "40%";
	var settingsTD = document.createElement("td");
	settingsTD.id = "huntHistorySettingsTD";
	settingsTD.style.width = "30%";
	
	infoTR.appendChild(filterTD);
	infoTR.appendChild(summaryTD);
	infoTR.appendChild(settingsTD);
	
	var tableTR = document.createElement("tr");
	var tableTD = document.createElement("td");
	tableTD.colSpan = "3";
	tableTD.id = "huntHistoryTableTD";
	
	tableTR.appendChild(tableTD);
	
	layoutTable.appendChild(titleTR);
	layoutTable.appendChild(infoTR);
	layoutTable.appendChild(tableTR);
	
	root.innerHTML = "";
	root.appendChild(layoutTable);
	
	updateTitleTD();
	updateSettingsTD();
	updateFilterTD(huntData);
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

function getTypeFromURL(url)
{
	var result;
	var type = url.split("&hunt=")[1];
	
	if(type == "1")
	{
		result = "Beginner";
	}
	else if(type == "2")
	{
		result = "Standard";
	}
	else if(type == "3")
	{
		result = "Advanced";
	}
	
	return result;
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

function fourDecimals(n)
{
	return parseFloat(n.toFixed(4));
}