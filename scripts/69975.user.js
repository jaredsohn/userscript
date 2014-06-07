// ==UserScript==
// @name           GePeExTestPhase!
// @version        xX.x
// @author         SigmaJargon; Ninpok; Locke;
// @description    A better improvement...test!
// @include        http://*gpxplus.net*
// ==/UserScript==

// Variables set by the user
var maxTabs = GM_getValue("maxTabs", 100) - 5; // It's actually maxTabs + finish the user, so at maximum 5 extra
var useTabCloser = !!GM_getValue("useTabCloser", true);
var showMaturityLeft =  !!GM_getValue("showMaturityToHatch", true);
var hideLabText =  !GM_getValue("showLabText", true);
var defaultShopTab =  GM_getValue("defaultShopTab", 0);
var sortOnlineList = GM_getValue("sortOnlineList", 0);
var moveBerriesAndWarming = !!GM_getValue("moveBerriesAndWarming", 1);
var highlightColor = GM_getValue("highlightColor", "#9000A1");

// Variables you can change if you know what you are doing
var walkerXpPerStep = 145; //GM_getValue("walkerXpPerStep", 150);

/////////////////////////////////////////////////////////////////////////////

// Convenience method for development outside of Greasemonkey
function log(text)
{
	GM_log(text);
}

function trim(str)
{
	return str.replace(/^\s+|\s+$/g,"");
}

function substring(text, start, end, index)
{
	var startIndex = text.indexOf(start, index);
	if (startIndex > -1)
	{
		startIndex += start.length;
		var endIndex = text.indexOf(end, startIndex);
		if (endIndex > -1)
			return {"start": startIndex, "end": endIndex, "text": text.substring(startIndex, endIndex)};
	}
}

// I stole this method from somewhere.  Don't remember where, though...
function addCommas(number)
{
	number += '';
	var split = number.split('.');
	var integer = split[0];
	var decimal = split.length > 1 ? '.' + split[1] : '';
	var regex = /(\d+)(\d{3})/;
	while (regex.test(integer))
	{
		integer = integer.replace(regex, '$1' + ',' + '$2');
	}
	return integer + decimal;
}

function refresh()
{
	location.href = location.href;
}

function fits()
{
	try
	{
		for (var i = 0; i < arguments.length; i++)
			if (location.href.indexOf(arguments[i]) > -1)
				return true;
	}
	catch (e)
	{
		// For some reason, sometimes using location.href throws an error
		// Something about a bad pointer reference?  I have no idea. :/
	}
	return false;
}

function insertAfter(oldNode, newNode)
{
	oldNode.parentNode.insertBefore(newNode, oldNode.nextSibling);
}

/////////////////////////////////////////////////////////////////////////////

function makeRefreshLink(refreshFunc, nowRefreshing)
{
	var refreshLink = document.createElement("a");
	refreshLink.href = "javascript:{}";
	refreshLink.innerHTML = " (refresh?)";
	refreshLink.addEventListener
	(
		"click",
		function(evt)
		{
			if (nowRefreshing)
				refreshLink.innerHTML = " ... now refreshing";
			refreshFunc();
		},
		false
	);
	return refreshLink;
}

function eggDexChart()
{
	var rarityNames = new Array("COMMON", "UNCOMMON", "RARE", "NOVELTY", "VERY_RARE");
	var rarityLabels = new Array("Common", "Uncommon", "Rare", "Novelty", "Very Rare");
	var eggsByRarity = new Object();
	for (var i = 0; i < rarityNames.length; i++)
	{
		eggsByRarity[rarityNames[i]] = 0;
		eggsByRarity[rarityNames[i] + "name"] = "None";
		eggsByRarity[rarityNames[i] + "max"] = 0;
	}
	
	var Dex = unsafeWindow.Dex;
	var DexData = unsafeWindow.DexData;
	for (var poke in Dex.egg)
	{
		var egg = Dex.egg[poke];
		var info = DexData[poke];
		if (info)
		{
			var obtained = parseInt(egg.times);
			eggsByRarity[info.rarity] += obtained;
			if (obtained > eggsByRarity[info.rarity + "max"])
			{
				eggsByRarity[info.rarity + "max"] = obtained;
				eggsByRarity[info.rarity + "name"] = info.name;
			}
		}
	}

	var max = eggsByRarity["COMMON"];
	for (var i = 0; i < rarityNames.length; i++)
	{
		if (eggsByRarity[rarityNames[i]] > max)
			max = eggsByRarity[rarityNames[i]];
	}
	
	if (max == 0)
		return;
	
	var tableDiv = document.createElement("div");
	tableDiv.id = "temp";
	tableDiv.className = "light ui-corner-all";
	tableDiv.style.width = "734px";
	tableDiv.style.marginLeft = "auto";
	tableDiv.style.marginRight = "auto";
	var pageTable = document.createElement("table");
	pageTable.style.marginLeft = "auto";
	pageTable.style.marginRight = "auto";
	var chartRow = document.createElement("tr");
	var chartCol = document.createElement("th");
	chartRow.appendChild(chartCol);
	var chartImg = document.createElement("img");
	chartImg.src = "http://chart.apis.google.com/chart?cht=p3&chtt=Eggs+Obtained&chd=t:";
	var rarityString = "";
	for (var i = 0; i < rarityNames.length; i++)
		rarityString += "," + eggsByRarity[rarityNames[i]];
	var rarityLabelString = "";
	for (var i = 0; i < rarityLabels.length; i++)
		rarityLabelString += "|" + rarityLabels[i].replace(/ /g, "+");
	chartImg.src += rarityString.substring(1) + "&chds=0," + max + "&chs=360x180&chl=" + rarityLabelString.substring(1) + "&chf=bg,s,D1D1D2&chco=860000";
	chartCol.appendChild(chartImg);
	var numbersCol = document.createElement("th");
	chartRow.appendChild(numbersCol);
	var numbersTable = document.createElement("table");
	numbersCol.appendChild(numbersTable);
	var headerRow = document.createElement("tr");
	var obtainedCol = document.createElement("td");
	obtainedCol.innerHTML = "Eggs Obtained";
	obtainedCol.colSpan = 2;
	headerRow.appendChild(obtainedCol);
	var mostAcquiredSpeciesCol = document.createElement("td");
	mostAcquiredSpeciesCol.innerHTML = "Most Acquired Species";
	mostAcquiredSpeciesCol.colSpan = 2;
	headerRow.appendChild(mostAcquiredSpeciesCol);
	numbersTable.appendChild(headerRow);
	for (var i = 0; i < rarityNames.length; i++)
	{
		var rarityRow = document.createElement("tr");
		numbersTable.appendChild(rarityRow);
		var rarityCol = document.createElement("td");
		rarityCol.innerHTML = rarityLabels[i];
		rarityRow.appendChild(rarityCol);
		var quantityCol = document.createElement("td");
		quantityCol.innerHTML = eggsByRarity[rarityNames[i]];
		quantityCol.style.paddingRight = "20px";
		quantityCol.style.fontWeight = "normal";
		rarityRow.appendChild(quantityCol);
		var nameCol = document.createElement("td");
		var maxName = eggsByRarity[rarityNames[i] + "name"];
		var index = maxName.indexOf(" [");
		if (index > -1)
			maxName = maxName.substring(0, index);
		nameCol.innerHTML = maxName;
		rarityRow.appendChild(nameCol);
		var maxCol = document.createElement("td");
		maxCol.style.fzontWeight = "normal";
		maxCol.innerHTML =  eggsByRarity[rarityNames[i] + "max"];
		rarityRow.appendChild(maxCol);
	}
	pageTable.appendChild(chartRow);
	tableDiv.appendChild(pageTable);
	document.getElementById("content").appendChild(tableDiv);
}

function modifyUserList()
{
	var table = document.getElementsByTagName("table")[0];
	if (sortOnlineList)
	{
		function sort(table, col, start, number, order)
		{
			var rows = new Array();
			for (var i = start; i < table.rows.length; i++)
			{
				var val = trim(table.rows[i].cells[col].innerHTML);
				rows.push({row: table.rows[i], value: number ? parseInt(val.replace(/,/g, "")) : val});
			}
			rows.sort
			(
				function(a, b)
				{
					if ((b.value < a.value) ^ order)
						return 1;
					else if ((b.value > a.value) ^ order)
						return -1;
					return 0;
				}
			);
			for (var i = 0; i < rows.length; i++)
				table.appendChild(rows[i].row);
		}
		
		switch(sortOnlineList)
		{
			case 1: // Int. With Asc
				sort(table, 3, 2, true, false);
				break;
			case 2: // Int. With Desc
				sort(table, 3, 2, true, true);
				break;
			case 3: // Int. From Asc
				sort(table, 4, 2, true, false);
				break;
			case 4: // Int. From Desc
				sort(table, 4, 2, true, true);
				break;
			default:
				GM_log("modifyUserList: invalid sort specified");
				break; 
		}
	}

	var link = document.getElementsByClassName("ClickedRowNote")[0].parentNode;
	var pokes = new Array();
	for (var i = 2; i < table.rows.length && pokes.length < maxTabs; i++)
	{
		var interactions = table.rows[i].cells[4];
		var links = table.rows[i].getElementsByTagName("a");
		for (var j = 0; j < links.length; j++)
		{
			if (links[j].href.indexOf("/info/") > -1)
				pokes.push(links[j].href);
		}
	}
	var openLink = document.createElement("a");
	openLink.id = "open-tabs";
	openLink.href = "javascript:{}";
	openLink.innerHTML = " (open the first " + pokes.length + " in tabs)";
	openLink.addEventListener
	(
		"click",
		function(evt)
		{
			for (var i = 0; i < pokes.length; i++)
			{
				unsafeWindow.open(pokes[i]);
			}
			openLink.style.display = "none";
			insertAfter(openLink, makeRefreshLink(refresh, true));
		},
		false
	);
	insertAfter(link, openLink);
}

function modifyPC()
{
	function click(element)
	{
		var event = document.createEvent("MouseEvents");
		event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		element.dispatchEvent(event);
	}

	function findOpenBox()
	{
		var i = 1;
		var box = document.getElementById("box" + i + "_pokes");
		while (box)
		{
			if (box.childNodes.length < 24)
				return box;
			box = document.getElementById("box" + ++i + "_pokes");
		}
		return false;
	}

	function inParty(poke)
	{
		return poke.parentNode.id == "party";
	}

	function addDoubleClickFunction(poke)
	{
		poke.addEventListener
		(
			"dblclick",
			function(evt)
			{
				var current = unsafeWindow.cur_poke;
				if (current != "")
					click(current);
				click(poke);
				if (inParty(poke))
				{
					click(findOpenBox());
				}
				else
				{
					click(party);
				}
			},
			false
		);
	}

	var party = document.getElementById("party");
	var pokes = document.getElementsByClassName("poke_type");
	for (var i = 0; i < pokes.length; i++)
	{
		addDoubleClickFunction(pokes[i]);
	}
}

function pointsOnSale()
{
	var fields = document.getElementById("inventory-items");
	if (fields)
	{
		var points = document.getElementById("mypoints");
		if (points)
		{
			var total = parseInt(points.innerHTML.replace(/,/g, ""));
			var links = fields.getElementsByTagName("a");
			for (var i = 0; i < links.length; i++)
			{
				var quantity = parseInt(links[i].parentNode.getElementsByClassName("quantity")[0].innerHTML);
				if (quantity)
				{
					total += quantity * parseInt(links[i].innerHTML.substring(9).replace(/,/g, ""));
				}
			}
			points.innerHTML += " (" + addCommas(total) + ")";
		}
	}
}


	function loadEggButton()
	{
		onload = document.getElementById("InteractForm");
		alert ("alert");
	}






function modifyPoketch()
{
	var _$ajax = unsafeWindow.$.ajax;
	function ajaxCall(params)
	{
		//log("ajaxCall");
		var request = _$ajax(params);
		request.addEventListener
		(
			"load",
			function(evt)
			{
				ajaxResponse(request);
			},
			false
		);
	}

	function ajaxResponse(request)
	{
		modify();
	}

	function modify()
	{
		try { modifySettings(); } catch (e) { GM_log("modifySettings: " + e); }
		try { modifyUserParty(); } catch (e) { GM_log("modifyUserParty: " + e); }
		try { modifyWalker(); } catch (e) { GM_log("modifyWalker: " + e); }
		try { modifyInteractions(); } catch (e) { GM_log("modifyInteractions: " + e); }
		try { modifyDaycare(); } catch (e) { GM_log("modifyDaycare: " + e); }
	}
	
	function modifySettings()
	{
		var settings = document.getElementById("settings_form");
		if (!settings.getAttribute("modified"))
		{
			var scriptSettingsDiv = document.createElement("div");
			scriptSettingsDiv.style.marginTop = "15px";
			scriptSettingsDiv.style.textAlign = "center";
			settings.appendChild(scriptSettingsDiv);
			scriptSettingsDiv.innerHTML = "<label><u>Better GPX Settings</u></label>";
			var settingsTable = document.createElement("table");
			settingsTable.style.width = "100%"
			settingsTable.innerHTML = "<colgroup><col style=\"width: 50%;\"><col style=\"width: 50%;\"></colgroup>";
			scriptSettingsDiv.appendChild(settingsTable);

			function createSettingsRow(table, text)
			{
				var settingsRow = document.createElement("tr");
				var nameCol = document.createElement("td");
				nameCol.innerHTML = text;
				nameCol.style.fontWeight = "bold";
				nameCol.style.textAlign = "right";
				settingsRow.appendChild(nameCol);
				table.appendChild(settingsRow);
				return settingsRow;
			}

			function addSelectRow(table, text, name, defaultValue, options)
			{
				var selectRow = createSettingsRow(table, text);
				var selectCol = document.createElement("td");
				var select = document.createElement("select");
				select.style.width = "140px";
				var value = GM_getValue(name, defaultValue);
				for (var i = 0; i < options.length; i++)
				{
					var option = document.createElement("option");
					option.innerHTML = options[i].text;
					option.value = options[i].value;
					if (options[i].value == value)
						option.selected = "selected";
					select.appendChild(option);
				}
				select.addEventListener
				(
					"change",
					function(evt)
					{
						var selected = select.item(select.selectedIndex);
						if (selected)
							GM_setValue(name, parseInt(selected.value));
						else
							GM_setValue(name, defaultValue);
					},
					false
				);
				selectCol.appendChild(select);
				selectRow.appendChild(selectCol);
			}

			function addTextRow(table, text, name, defaultValue, number)
			{
				var textRow = createSettingsRow(table, text);
				var textCol = document.createElement("td");
				var text = document.createElement("input");
				text.type = "text";
				text.value = GM_getValue(name, defaultValue);
				text.addEventListener
				(
					"change",
					function(evt)
					{
						if (number)
							GM_setValue(name, parseInt(text.value));
						else
							GM_setValue(name, text.value);
					},
					false
				);
				text.style.width = "140px";
				textCol.appendChild(text);
				textRow.appendChild(textCol);
			}

			var options = new Array();
			options.push({text: "Yes", value: 1});
			options.push({text: "No", value: 0});
			//addTextRow(settingsTable, "... Walker XP Per Step", "walkerXpPerStep", 150, true);
			addTextRow(settingsTable, "... Maximum Tabs To Open", "maxTabs", 100, true);
			addTextRow(settingsTable, "... Highlight Color", "highlightColor", "#9000A1", false);
			addSelectRow(settingsTable, "... Use Tab Closer", "useTabCloser", 1, options);
			addSelectRow(settingsTable, "... Show Maturity To Hatch", "showMaturityToHatch", 1, options);
			addSelectRow(settingsTable, "... Move Berries and Warming Up", "moveBerriesAndWarming", 1, options);
			addSelectRow(settingsTable, "... Show Lab Text", "showLabText", 1, options);
			var sortOptions = new Array();
			sortOptions.push({text: "None", value: 0});
			sortOptions.push({text: "Int. With Asc", value: 1});
			sortOptions.push({text: "Int. With Desc", value: 2});
			sortOptions.push({text: "Int. From Asc", value: 3});
			sortOptions.push({text: "Int. From Desc", value: 4});
			addSelectRow(settingsTable, "... Sort Online List", "sortOnlineList", 0, sortOptions);
			var shopOptions = new Array();
			shopOptions.push({text: "Main Store", value: 0});
			shopOptions.push({text: "Fashion", value: 1});
			shopOptions.push({text: "Backroom", value: 2});
			addSelectRow(settingsTable, "... Default Shop Tab", "defaultShopTab", 0, shopOptions);
			settings.setAttribute("modified", "1");
		}
		//else
		//	log("Already modifySettings");
	}
	
	function modifyDaycare()
	{
		var daycareImages = unsafeWindow.daycare_egg_images;
		if (daycareImages)
		{
			var eggs = document.getElementsByClassName("DaycareEggImage");
			for (var i = 0; i < eggs.length; i++)
				eggs[i].src = daycareImages[eggs[i].getAttribute("name")];
			document.getElementById("SilphScopeContainer").style.display = "none";
		}
	}

	function modifyUserParty()
	{
		var party = document.getElementById("UserParty");
		if (!party.getAttribute("modified"))
		{
			var xps = party.getElementsByClassName("light2");
			for (var i = 0; i < xps.length; i++)
			{
				var xp = xps[i].firstElementChild.firstChild;
				if (xp.nodeValue)
				{
					var split = xp.nodeValue.split("/");
					var max = parseInt(split[1].replace(/,/g, ""));
					var min = parseInt(split[0].replace(/,/g, ""));
					var percent = Math.floor(min/max*1000)/10 + "%";
					if (showMaturityLeft)
						xp.nodeValue = addCommas(max - min);
					xp.nodeValue += " (" + percent + ")";
				}
			}
			party.setAttribute("modified", "1");
		}
		//else
		//	log("Already modifyUserParty");
	}

	function modifyWalker()
	{
		var walker = document.getElementById("WalkerPoke");
		if (walker)
		{
			if (!walker.getAttribute("modified"))
			{
				var info = unsafeWindow.walker_poke; //unsafeunsafeWindow.walker_poke;
				if (info)
				{
					var points = document.getElementById("WalkerPoints");
					var steps = parseInt(points.innerHTML.replace(/,/g, ""));
					var stepsLeft = Math.ceil((parseInt(info.total_exp) - parseInt(info.exp_total))/walkerXpPerStep);
					var level = Math.min(100, Math.floor(100 * (parseInt(info.exp_total) + walkerXpPerStep*steps) / parseInt(info.total_exp)));
					points.innerHTML += " / " + addCommas(stepsLeft) + " [Level " + level + "]";
				}
				walker.setAttribute("modified", "1");
			}
			//else
			//	log("Already modifyWalker");
		}
	}
	
	function refereshInteractions()
	{
		unsafeWindow.UpdateTab('interactions');
	}

	function modifyInteractionCategory(categoryName)
	{
		var category = document.getElementsByClassName(categoryName);
		if (category.length != 0)
		{
			var link = category[0].parentNode;
			var users = category[2].getElementsByTagName("fieldset");
			//log(categoryName + ": " + users.length);
			var pokes = new Array();
			for (var i = 0; i < users.length && pokes.length < maxTabs; i++)
			{
				var clicks = users[i].getElementsByTagName("legend")[0].lastChild;
				var links = users[i].getElementsByTagName("a");
				for (var j = 0; j < links.length; j++)
				{
					if (links[j].href.indexOf("/info/") > -1)
						pokes.push(links[j].href);
				}
			}
			if (pokes.length != 0)
			{
				var openLink = document.createElement("a");
				openLink.id = "open-" + categoryName + "-tabs";
				openLink.href = "javascript:{}";
				openLink.innerHTML = " (open the first " + pokes.length + " in tabs)";
				openLink.addEventListener
				(
					"click",
					function(evt)
					{
						for (var i = 0; i < pokes.length; i++)
						{
							unsafeWindow.open(pokes[i]);
						}
						openLink.style.display = "none";
						insertAfter(openLink, makeRefreshLink(refereshInteractions, true));
					},
					false
				);
				insertAfter(link, openLink);
			}
		}
	}

	function modifyInteractions()
	{
		var interactions = document.getElementById("tabs-interactions").getElementsByTagName("a")[0];
		if (!interactions)
			setTimeout(modifyInteractions, 500);
		else if (!interactions.getAttribute("modified"))
		{
			modifyInteractionCategory("NeedToClick");
			modifyInteractionCategory("ClickAgain");
			//modifyInteractionCategory("AlreadyClicked");
			modifyInteractionCategory("FriendsList");
			modifyInteractionCategory("FriendsAdded");
			interactions.setAttribute("modified", "1");
		}
		//else
		//	log("Already modifyInteractions");
	}

	unsafeWindow.$.ajax = ajaxCall;
	modify();
}

function modifyLab()
{
	if (hideLabText)
	{
		var header = document.getElementsByClassName("header")[0];
		if (header)
		{
			header.parentNode.removeChild(header.nextElementSibling);
			header = header.nextElementSibling;
			header.innerHTML = header.innerHTML.substring(header.innerHTML.indexOf("<div style=\"text-align: center;\">"));
		}
	}
}

function highlightStats()
{
	var username = document.getElementById("welcomebar").getElementsByTagName("a")[0].innerHTML;
	var ownedByUser = username + "'s";
	var headers = document.getElementsByClassName("header");
	for (var i = 1; i < headers.length; i++)
	{
		var stats = headers[i].parentNode.getElementsByTagName("a");
		for (var j = 0; j < stats.length; j++)
		{
			if (stats[j].innerHTML == username || stats[j].innerHTML == ownedByUser)
			{
				log(stats[j].innerHTML);
				stats[j].style.color = highlightColor;
			}
		}
	}
}

function moveInteractionForm()
{
	loadEggButton();
	if (moveBerriesAndWarming)
	{
		var form = document.getElementById("InteractForm");
		if (form)
		{
			var label = form.getElementsByTagName("label")[0];
			if (label)
			{
				form.removeChild(label);
				form.removeChild(form.firstElementChild);
			}
			form.parentNode.insertBefore(document.createElement("br"), form.parentNode.firstChild);
			form.parentNode.insertBefore(form, form.parentNode.firstChild);
		}
	}
}

function highlightPrivateMessages()
{
	var welcome = document.getElementById("welcomebar");
	var pms = welcome.getElementsByTagName("a")[2];
	if (parseInt(pms.innerHTML))
		pms.style.color = highlightColor;
}

function changeShopLink()
{
	if (defaultShopTab)
	{
		var navLinks = document.getElementById("mainnav").getElementsByTagName("a");
		switch(defaultShopTab)
		{
			case 1:
				navLinks[5].href += "#accessories";
				break;
			case 2:
				navLinks[5].href += "#backroom";
				break;
			default:
				GM_log("Change Shop Link: Invalid shop tab specified " + defaultShopTab);
				break;
		}
	}
}

try
{
	// Highlight PMs
	highlightPrivateMessages();
}
catch (e)
{
	log("Error in Highlight PMs: " + e);
}

try
{
	// Change Shop Link
	changeShopLink();
}
catch (e)
{
	log("Change Shop Link: " + e);
}

try
{
	// Poketch Modifier
	if (fits("/poketch"))
		modifyPoketch();
}
catch (e)
{
	log("Error in Poketch Modifier: " + e);
}

if (fits("/info/"))
{
	
	// Interaction Mover
	try
	{
		moveInteractionForm();
	}
	catch (e)
	{
		log("Error in Interaction Mover: " + e);
	}
}

if (fits("/shop"))
{
	// Points on Sale
	try
	{
		pointsOnSale();
	}
	catch (e)
	{
		GM_log("Error in Points on Sale: " + e);
	}
}

try
{
	// Stats Highlighter
	if (fits("/stats"))
		highlightStats();
}
catch (e)
{
	GM_log("Error in Stats Highlighter: " + e);
}

try
{
	// Egg Dex Chart
	if (fits("/dex") && !fits("/dex/list"))
		eggDexChart();
}
catch (e)
{
	GM_log("Error in Egg Dex Chart: " + e);
}

try
{
	// Modify User List
	if (fits("/online"))
		modifyUserList();
}
catch (e)
{
	GM_log("Error in Modify User List: " + e);
}

try
{
	// Modify Lab
	if (fits("/lab") || location.href == "http://gpxplus.net/")
		modifyLab();
}
catch (e)
{
	GM_log("Error in Modify Lab: " + e);
}

try
{
	// Modify PC
	if (fits("/pc"))
		modifyPC();
}
catch (e)
{
	GM_log("Error in Modify PC: " + e);
}



