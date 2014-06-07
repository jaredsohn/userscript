// ==UserScript==
// @name           Better GPX
// @namespace      com.sigmajargon.gpxplus.utils
// @version        3.8
// @date           2009-03-19
// @author         SigmaJargon <jibberjabberjunk@gmail.com>
// @description    Many small tweaks to improve GPX
// @include        http://*gpxplus.net*
// ==/UserScript==

// Things for Chrome support
var chrome = false;
if (window.google)
{
	chrome = true;
	unsafeWindow = window;
	
	GM_getValue = function(name, defaultValue)
	{
		return localStorage.getItem(name) || defaultValue;
	}

	GM_setValue = function(name, value)
	{
		localStorage.setItem(name, value);
	}
}
	
// Variables set by the user
var useTabCloser = !!GM_getValue("useTabCloser", true);
var showMaturityLeft =  !!GM_getValue("showMaturityToHatch", true);
var hideLabText =  !GM_getValue("showLabText", true);
var defaultShopTab =  GM_getValue("defaultShopTab", 0);
var sortOnlineList = GM_getValue("sortOnlineList", 0);
var moveBerriesAndWarming = !!GM_getValue("moveBerriesAndWarming", 1);
var highlightColor = GM_getValue("highlightColor", "#9000A1");

// Variables you can change if you know what you are doing
// None currently!

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
		function columnValuer(col, number)
		{
			return function(row)
			{
				var val = trim(row.cells[col].innerHTML);
				return number ? parseInt(val.replace(/,/g, "")) : val;
			}
		}
		
		function sigmaValuer()
		{
			return function(row)
			{
				var interWith = parseInt(trim(row.cells[3].innerHTML.replace(/,/g, "")));
				var interFrom = parseInt(trim(row.cells[4].innerHTML.replace(/,/g, "")));
				return interFrom - interWith + (interWith + interFrom) / 1000;
			}
		}
		
		function sort(table, valuer, start, order)
		{
			var rows = new Array();
			for (var i = start; i < table.rows.length; i++)
			{
				rows.push({row: table.rows[i], value: valuer(table.rows[i])});
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
				sort(table, columnValuer(3, true), 2, false);
				break;
			case 2: // Int. With Desc
				sort(table, columnValuer(3, true), 2, true);
				break;
			case 3: // Int. From Asc
				sort(table, columnValuer(4, true), 2, false);
				break;
			case 4: // Int. From Desc
				sort(table, columnValuer(4, true), 2, true);
				break;
			case 5: // Sigma's Mix
				sort(table, sigmaValuer(), 2, true);
				break;
			default:
				GM_log("modifyUserList: invalid sort specified");
				break;
		}
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

function closeTabs()
{
    if (document.referrer.indexOf("/user/") > -1)
        return;
    if (document.referrer.indexOf("/pc") > -1)
        return;
    var interactsDiv = document.getElementById("InteractsDiv");
    if (interactsDiv && interactsDiv.getElementsByTagName("form").length == 0 && useTabCloser)
        self.close();
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
		try { modifyDaycare(); } catch (e) { GM_log("modifyDaycare: " + e); }
		try { addHatchAllLink(); } catch (e) { GM_log("addHatchAllLink: " + e); }
	}
	
	function modifySettings()
	{
		if (!chrome)
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
				sortOptions.push({text: "Sigma's Mix", value: 5});
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
	
	function refereshInteractions()
	{
		unsafeWindow.UpdateTab('interactions');
	}
	
	var hatching = 0;
	function hatchEgg(fname)
	{
		unsafeWindow.$.ajax
		({
			url: "http://gpxplus.net/AJAX/OptionDialog", 
			data: {option: "hatch", fname: fname, confirm: true}, 
			cache: false, 
			dataType: "json", 
			type: "POST", 
			success: function (r)
			{
				if (!(hatching-1))
				{
					unsafeWindow.ajaxing = false;
					unsafeWindow.ReloadParty();
				}
				hatching--;
			}, 
			error: function (r)
			{
				window.alert("There was a problem hatching one of your eggs!");
				if (!(hatching-1))
				{
					unsafeWindow.ajaxing = false;
					unsafeWindow.ReloadParty();
				}
				hatching--;
			}, 
			complete: function (r)
			{
				// Do they actually use this function?
			}
		});
	}
	
	function hatchAll()
	{
		if (!hatching)
		{
			var partyOptions = document.getElementsByClassName("party_options");
			var toHatch = new Array();
			for (var i = 0; i < partyOptions.length; i++)
			{
				var options = partyOptions[i].getElementsByTagName("option");
				for (var j = 0; j < options.length; j++)
				{
					if (options[j].value == "hatch")
					{
						toHatch.push(options[j].parentNode.getAttribute("name"));
					}
				}
			}
			
			hatching = toHatch.length;
			for (var i = 0; i < toHatch.length; i++)
			{
				unsafeWindow.ajaxing = false;
				hatchEgg(toHatch[i]);
			}
		}
	}
	
	function addHatchAllLink()
	{
		var party = document.getElementById("PartyDiv");
		if (party)
		{
			var link = party.firstElementChild.firstElementChild.firstElementChild;
			if (link)
			{
				if (!link.getAttribute("modified"))
				{
					var hatchLink = document.createElement("a");
					hatchLink.href = "javascript:{}";
					hatchLink.innerHTML = "Hatch All";
					hatchLink.addEventListener("click", hatchAll, false);
					party.firstElementChild.appendChild(hatchLink);
					link.setAttribute("modified", "1");
				}
				//else
				//	log("Already addHatchAllLink");
			}
		}
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
			header = header.parentNode;
			header.innerHTML = header.innerHTML.substring(header.innerHTML.indexOf("<div style=\"clear: both;\">"));
		}
	}
}

function highlightStats()
{
	var username = document.getElementById("topbar").getElementsByTagName("a")[0].innerHTML;
	var ownedByUser = username + "'s";
	var headers = document.getElementsByClassName("header");
	for (var i = 1; i < headers.length; i++)
	{
		var stats = headers[i].parentNode.getElementsByTagName("a");
		for (var j = 0; j < stats.length; j++)
		{
			if (stats[j].innerHTML == username || stats[j].innerHTML == ownedByUser)
			{
				//log(stats[j].innerHTML);
				stats[j].style.color = highlightColor;
			}
		}
	}
}

function moveInteractionForm()
{
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
	var welcome = document.getElementById("topbar");
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
	// Tab Closer
	try
	{
		closeTabs();
	}
	catch (e)
	{
		log("Error in Tab Closer: " + e);
	}
	
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
	// The location.href sometimes throws errors.  And they really, really annoy me.
	//GM_log("Error in Modify Lab: " + e);
}


