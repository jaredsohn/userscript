// ==UserScript==
// @name           Bots4 Statistics
// @namespace      Bots4 Statistics
// @description    Bots4 Statistics
// @include        http://*bots4.net*
//
// @author         AquaRegia
// @version 	   2011-05-05
// ==/UserScript==

if(!window.chrome)
{
	storage = unsafeWindow.localStorage;
	var browser = "firefox";
}
else
{
	storage = localStorage;
}

if(storage)
{
	var setValue = function(key, value)
	{
		key += "";
		value += "";
		
		storage[key] = value;
	};
	
	var getValue = function(key, defaultValue)
	{
		key += "";
		defaultValue += "";
		
		var value = storage[key];
		
		return (value ? value : defaultValue);
	};
	
	var addStyle = function(css)
	{
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
}
else if(GM_getValue)
{
	var setValue = GM_setValue;
	var getValue = GM_getValue;
	var addStyle = GM_addStyle;
}
else
{
	alert("I'm afraid the script 'Bots4 Statistics' won't work in your browser =(");
	return;
}

isOnline = document.getElementById("experience-bar-wrap-header") ? true : false;

var styles = "\
	#statsDiv\
	{\
		margin-left: 250px !important;\
		width: 500px !important;\
		height: 130px !important;\
	}\
	#statsTable\
	{\
		font-size: 11px !important;\
		font-family: Verdana, Geneva, Arial, sans-serif !important;\
		background: #181818 !important;\
		position: absolute !important;\
		width: 300px !important;\
	}\
	.statsTableTabs\
	{\
		border: 0px !important;\
		padding: 0px !important;\
		margin: 1px !important;\
		width: 68px !important;\
	}\
	.statsTD\
	{\
		border: 0px !important;\
		text-align: left !important;\
		padding: 2px !important;\
	}\
	.statsTH\
	{\
		background: #202020 !important;\
		border: 0px !important;\
		text-align: auto !important;\
		font-size: 10px !important;\
	}\
	.statsTableTabs a\
	{\
		outline: none;\
		display: inline-block !important;\
		color: #dddddd !important;\
		border: 1px solid #808080 !important;\
		background: #202020 !important;\
		text-decoration: none !important;\
		padding: 1px !important;\
	}\
	#highlightedTab\
	{\
		background-color: #303030 !important;\
		color: #00cc00 !important;\
		border-color: #00cc00 !important;\
	}\
	#settingsTable\
	{\
		width: 750px !important;\
		margin-left: 0px !important;\
	}\
	.addRemoveButton\
	{\
		outline: none !important;\
		text-decoration: none !important;\
	}\
	";
	
addStyle(styles);

//This function was written by Ender
//"Commatizes" numbers to display "12,345" intead of "12345"
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

//Returns the unix time in seconds
function time()
{
	return parseInt(new Date().getTime().toString().substring(0, 10));
}

//Will turn number of seconds into a string in the format: "1h 2m 3s"
function createTime(timeInSeconds)
{
	hour = parseInt(timeInSeconds/3600);
	minute = parseInt(timeInSeconds/60)-hour*60;
	second = timeInSeconds-((hour*3600)+(minute*60));

	return hour + "h " + minute + "m " + second + "s";
}

//Remove the logo and replace it with a div containing
//a table with the statistics
function replaceLogo()
{
	logoLink = document.getElementById("logo").parentNode;
	logoDiv = logoLink.parentNode;
	
	buildStatsDiv();
	
	logoDiv.replaceChild(statsDiv, logoLink);
}

function buildStatsDiv()
{
	statsDiv = document.createElement("div");
	statsDiv.id = "statsDiv";

	statsTable = document.createElement("table");
	statsTable.id = "statsTable";
	statsTable.style.marginTop = settings["tableY"];
	statsTable.style.marginLeft = settings["tableX"];
	statsTable.addEventListener("mousedown", mouseDown, false);
	
	statsTableHeaderRow = document.createElement("tr");
	statsTableHeader = document.createElement("th");
	statsTableHeader.className = "statsTH";
	statsTableHeader.colSpan = "2";
	statsTableHeader.appendChild(document.createTextNode("BOTS4 Statistics - "+username));
	
	statsTableHeaderRow.appendChild(statsTableHeader);
	
	updateStatsTableTabs();

	statsDiv.appendChild(statsTable);

	updateStatsTable();
}

function updateStatsTableTabs()
{
	statsTableTabRow = document.createElement("tr");
	statsTableTabs = document.createElement("td");
	statsTableTabs.className = "statsTableTabs";
	statsTableTabs.colSpan = "2";
	statsTableTabButtons = [];
	categories = ["tab1","tab2","tab3","tab4"];
	activeTab = settings["activeTab"];
	for(i = 0; i < categories.length; i++)
	{
		catTitle = settings[categories[i]].split(":")[0];
	
		statsTableTabButtons[i] = document.createElement("a");
		if(categories[i] == activeTab)
		{
			statsTableTabButtons[i].id = "highlightedTab";
		}
		statsTableTabButtons[i].className = "statsTableTabs";
		statsTableTabButtons[i].name = categories[i];
		statsTableTabButtons[i].href = "#";
		statsTableTabButtons[i].appendChild(document.createTextNode(catTitle));
		statsTableTabButtons[i].addEventListener("click", tabClick, false);
		statsTableTabs.appendChild(statsTableTabButtons[i]);
	}
	
	statsTableTabRow.appendChild(statsTableTabs);
}

function updateStatsTable()
{
	while(statsTable.hasChildNodes())
	{
		statsTable.removeChild(statsTable.firstChild);
	}

	loadStats();
	
	statsTable.appendChild(statsTableHeaderRow);
	statsTable.appendChild(statsTableTabRow);
	
	tabStats = settings[settings["activeTab"]].split(":")[1].split(",");
	
	for(tabStatIndex in tabStats)
	{
		tabStat = tabStats[tabStatIndex];
		statValue = stats[tabStat] || extrastats[tabStat];
		if(!statValue)
		{
			statValue = 0;
		}
		suffix = textlabels[tabStat][1];
		if(suffix == "time")
		{
			statValue = createTime(statValue);
			suffix = "";
		}
		else if(suffix == "ms")
		{
			statValue = createTime(parseInt(statValue/1000));
			suffix = "";
		}

		statsTable.appendChild(statToTR(textlabels[tabStat][0], statValue, suffix));
	}
}

function tabClick(e)
{
	setValue(username+"-activetab", e.target.name);
	settings["activeTab"] = e.target.name;
	updateStatsTableTabs();
	updateStatsTable();
}

function getStat(name, defaultValue)
{
	return parseInt(getValue(username+"-"+name, defaultValue));
}

function loadStats()
{
	var headerLinks = document.getElementById('header').getElementsByTagName('a');
	for(var i = 0; i < headerLinks.length; i++)
	{
		if(headerLinks[i].href.match('/profile'))
		{
			username = headerLinks[i].innerHTML;
			break;
		}
	}
	
	//timeStart will be set to time() if and only if it has no value already
	setValue(username+"-timestart", getValue(username+"-timestart", time()));

	stats = [];
	extrastats = [];
	settings = [];
	textlabels = [];

	settings["tableX"] = getValue(username+"-tableX", "150px");
	settings["tableY"] = getValue(username+"-tableY", "20px");
	settings["activeTab"] = getValue(username+"-activetab", "tab1");
	settings["tab1"] = getValue(username+"-tab1", "Overview:sessionTime,totaltrains,totalfights,xprate,timetolevel");
	settings["tab2"] = getValue(username+"-tab2", "Trains:totaltrains,trainwinpercent,trainavglength,trainwinmaxxp,trainavgdamage");
	settings["tab3"] = getValue(username+"-tab3", "Fights:totalfights,fightwinpercent,fightavglength,fightwinmaxxp,fightavgdamage");
	settings["tab4"] = getValue(username+"-tab4", "Experience:totalxp,xprate,trainwinmaxxp,fightwinmaxxp,xpleft");
	
	stats["trainxp"] = getStat("trainxp", 0);
	stats["trainkudos"] = getStat("trainkudos", 0);
	stats["trainwins"] = getStat("trainwins", 0);
	stats["trainlosses"] = getStat("trainlosses", 0);
	stats["trainattempts"] = getStat("trainattempts", 0);
	stats["trainlength"] = getStat("trainlength", 0);
	stats["trainmaxdamage"] = getStat("trainmaxdamage", 0);
	stats["trainblocks"] = getStat("trainblocks", 0);
	stats["trainmisses"] = getStat("trainmisses", 0);
	stats["traindamage"] = getStat("traindamage", 0);
	stats["trainwinmaxxp"] = getStat("trainwinmaxxp", 0);
	stats["trainlossmaxxp"] = getStat("trainlossmaxxp", 0);
	stats["dtrainattempts"] = getStat("dtrainattempts", 0);
	stats["dtrainmaxdamage"] = getStat("dtrainmaxdamage", 0);
	stats["dtrainblocks"] = getStat("dtrainblocks", 0);
	stats["dtrainmisses"] = getStat("dtrainmisses", 0);
	stats["dtraindamage"] = getStat("dtraindamage", 0);
	stats["trainwinmaxkudos"] = getStat("trainwinmaxkudos", 0);
	stats["trainlossmaxkudos"] = getStat("trainlossmaxkudos", 0);
	stats["xpleft"] = getStat("xpleft", 0);
	stats["trainmaxlength"] = parseFloat(getStat("trainmaxlength", 0)/1000).toFixed(1);
	stats["fightlength"] = getStat("fightlength", 0);
	stats["fightdamage"] = getStat("fightdamage", 0);
	stats["fightwins"] = getStat("fightwins", 0);
	stats["fightlosses"] = getStat("fightlosses", 0);
	stats["fightattempts"] = getStat("fightattempts", 0);
	stats["fightmisses"] = getStat("fightmisses", 0);
	stats["dfightblocks"] = getStat("dfightblocks", 0);
	stats["fightwinmaxxp"] = getStat("fightwinmaxxp", 0);
	stats["fightxp"] = getStat("fightxp", 0);
	stats["fightkudos"] = getStat("fightkudos", 0);
	stats["fightmaxlength"] = parseFloat(getStat("fightmaxlength", 0)/1000).toFixed(1);
	stats["levelsgained"] = getStat("levelsgained", 0);
	stats["energygained"] = getStat("energygained", 0);
	
	extrastats["sessionTime"] = parseInt(time() - getValue(username+"-timestart", time()));
	extrastats["totalxp"] = stats["trainxp"] + stats["fightxp"];
	extrastats["totalkudos"] = stats["trainkudos"] + stats["fightkudos"];
	extrastats["xprate"] = parseInt((extrastats["totalxp"]/extrastats["sessionTime"])*3600);
	extrastats["kudosrate"] = parseInt((extrastats["totalkudos"]/extrastats["sessionTime"])*3600);
	extrastats["timetolevel"] = parseInt(stats["xpleft"]/(extrastats["xprate"]/3600));
	extrastats["totaltrains"] = stats["trainwins"] + stats["trainlosses"];
	extrastats["trainhits"] = stats["trainattempts"] - stats["trainmisses"];
	extrastats["trainblockpercent"] = parseFloat((stats["trainblocks"]/(stats["dtrainattempts"] - stats["dtrainmisses"]))*100).toFixed(3);
	extrastats["trainevasionpercent"] = parseFloat((stats["dtrainmisses"]/stats["dtrainattempts"])*100).toFixed(3);
	extrastats["trainhitpercent"] = parseFloat((extrastats["trainhits"]/stats["trainattempts"])*100).toFixed(3);
	extrastats["trainavgdamage"] = parseFloat(stats["traindamage"]/(stats["trainattempts"]-stats["trainmisses"]-stats["dtrainblocks"])).toFixed(3);
	extrastats["trainwinpercent"] = parseFloat((stats["trainwins"]/extrastats["totaltrains"])*100).toFixed(3);
	extrastats["trainlosspercent"] = parseFloat(100 - extrastats["trainwinpercent"]).toFixed(3);
	extrastats["trainavglength"] = parseFloat((stats["trainlength"]/extrastats["totaltrains"])/1000).toFixed(3);
	extrastats["totalfights"] = stats["fightwins"] + stats["fightlosses"];
	extrastats["fightwinpercent"] = parseFloat((stats["fightwins"]/extrastats["totalfights"])*100).toFixed(3);
	extrastats["fightavglength"] = parseFloat((stats["fightlength"]/extrastats["totalfights"])/1000).toFixed(3);
	extrastats["fightavgdamage"] = parseFloat(stats["fightdamage"]/(stats["fightattempts"]-stats["fightmisses"]-stats["dfightblocks"])).toFixed(3);
	extrastats["trainrate"] = parseFloat((extrastats["totaltrains"]/extrastats["sessionTime"])*3600).toFixed(1);
	extrastats["fightrate"] = parseFloat((extrastats["totalfights"]/extrastats["sessionTime"])*3600).toFixed(1);
	extrastats["trainavgxp"] = parseInt(stats["trainxp"]/extrastats["totaltrains"]);
	extrastats["fightavgxp"] = parseInt(stats["fightxp"]/extrastats["totalfights"]);
	extrastats["trainstolevel"] = parseFloat(stats["xpleft"]/extrastats["trainavgxp"]).toFixed(1);
	extrastats["fightstolevel"] = parseFloat(stats["xpleft"]/extrastats["fightavgxp"]).toFixed(1);
	extrastats["fightwinpercent"] = parseFloat((stats["fightwins"]/extrastats["totalfights"])*100).toFixed(3);
	extrastats["fightlosspercent"] = parseFloat(100 - extrastats["fightwinpercent"]).toFixed(3);
	extrastats["timewasted"] = Math.max(parseInt(extrastats["sessionTime"] - (stats["trainlength"]/1000) - (stats["fightlength"]/1000)), 0);
	extrastats["energyrate"] = parseInt((stats["energygained"]/extrastats["sessionTime"])*3600);
	extrastats["fightavgenergy"] = parseFloat(stats["energygained"]/extrastats["totalfights"]).toFixed(1);
	
	textlabels["sessionTime"] = ["Log time", "time"];
	textlabels["trainxp"] = ["Train xp", ""];
	textlabels["trainkudos"] = ["Train kudos", ""];
	textlabels["fightkudos"] = ["Fight kudos", ""];
	textlabels["trainwins"] = ["Train wins", ""];
	textlabels["trainlosses"] = ["Train losses", ""];
	textlabels["trainattempts"] = ["Train attempts", ""];
	textlabels["trainlength"] = ["Train time", "ms"];
	textlabels["trainmaxdamage"] = ["Train max dmg", ""];
	textlabels["trainblocks"] = ["Train blocks", ""];
	textlabels["trainmisses"] = ["Train misses", ""];
	textlabels["traindamage"] = ["Train damage", ""];
	textlabels["trainwinmaxxp"] = ["Train win max xp", ""];
	textlabels["trainlossmaxxp"] = ["Train loss max xp", ""];
	textlabels["dtrainattempts"] = ["Trainbot attempts", ""];
	textlabels["dtrainmaxdmg"] = ["Trainbot max damage", ""];
	textlabels["dtrainblocks"] = ["Trainbot blocks", ""];
	textlabels["dtrainmisses"] = ["Trainbot misses", ""];
	textlabels["dtraindamage"] = ["Trainbot damage", ""];
	textlabels["trainwinmaxkudos"] = ["Train win max kudos", ""];
	textlabels["trainlossmaxkudos"] = ["Train loss max kudos", ""];
	textlabels["xpleft"] = ["Xp to level", ""];
	textlabels["trainmaxlength"] = ["Longest train", " seconds"];
	textlabels["fightmaxlength"] = ["Longest fight", " seconds"];
	textlabels["fightwins"] = ["Fight wins", ""];
	textlabels["fightlosses"] = ["Fight losses", ""];
	textlabels["totalxp"] = ["Total xp", ""];
	textlabels["totalkudos"] = ["Total kudos", ""];
	textlabels["xprate"] = ["Xp rate", "/h"];
	textlabels["kudosrate"] = ["Kudos rate", "/h"];
	textlabels["timetolevel"] = ["Time to level", "time"];
	textlabels["totaltrains"] = ["Total trains", ""];
	textlabels["trainhits"] = ["Train hits", ""];
	textlabels["trainblockpercent"] = ["Train block rate", "%"];
	textlabels["trainevasionpercent"] = ["Train evasion rate", "%"];
	textlabels["trainhitpercent"] = ["Train hit rate", "%"];
	textlabels["trainavgdamage"] = ["Train avg damage", ""];
	textlabels["trainwinpercent"] = ["Train win rate", "%"];
	textlabels["trainlosspercent"] = ["Train loss rate", "%"];
	textlabels["trainavglength"] = ["Train avg length", " seconds"];
	textlabels["totalfights"] = ["Total fights", ""];
	textlabels["fightlength"] = ["Fight time", "ms"];
	textlabels["fightdamage"] = ["Fight damage", ""];
	textlabels["fightmisses"] = ["Fight misses", ""];
	textlabels["dfightblocks"] = ["Opponent blocks", ""];
	textlabels["fightwinmaxxp"] = ["Fight win max xp", ""];
	textlabels["fightwinpercent"] = ["Fight win rate", "%"];
	textlabels["fightavglength"] = ["Fight avg length", " seconds"];
	textlabels["fightavgdamage"] = ["Fight avg damage", ""];
	textlabels["trainrate"] = ["Train rate", "/h"];
	textlabels["fightrate"] = ["Fight rate", "/h"];
	textlabels["trainavgxp"] = ["Train avg xp", ""];
	textlabels["fightavgxp"] = ["Fight avg xp", ""];
	textlabels["trainstolevel"] = ["Trains to level", ""];
	textlabels["fightstolevel"] = ["Fights to level", ""];
	textlabels["fightwinpercent"] = ["Fight win rate", "%"];
	textlabels["fightlosspercent"] = ["Fight loss rate", "%"];
	textlabels["timewasted"] = ["Time \"wasted\"", "time"];
	textlabels["levelsgained"] = ["Levels gained", ""];
	textlabels["energygained"] = ["Energy gained", ""];
	textlabels["energyrate"] = ["Energy rate", "/h"];
	textlabels["fightavgenergy"] = ["Avg energy gain", ""];
	
	sortTextLabels();
}

function sortTextLabels()
{
	reversed = [];

	for(i in textlabels)
	{
		reversed[textlabels[i][0]] = i;
	}

	sortBy = [];

	for(i in reversed)
	{
		sortBy.push(i);
	}

	sortBy.sort();

	sorted = [];

	for(i in sortBy)
	{
		sorted[reversed[sortBy[i]]] = [sortBy[i], textlabels[reversed[sortBy[i]]][1]];
	}
	
	textlabels = sorted;
}

function addStatisticsButton()
{
	newLink = document.createElement("a");
	newLink.href = "/statistics";
	newLink.appendChild(document.createTextNode("statistics"));
	
	newListItem = document.createElement("li");
	newListItem.appendChild(newLink);
	
	navBar = document.getElementById("left-nav");
	listBlock = navBar.childNodes[1];
	listBlock.appendChild(newListItem);
}

//Will return a tr-tag
//Example:
//statToTR("hello","world","!")
//will return:
//<tr><td>hello:</td><td></td><td>world!</td></tr>
//Note the extra column in the middle.
function statToTR(text, stat, suffix)
{
	suffix = suffix || "";

	newRow = document.createElement("tr");
	textCol = document.createElement("td");
	textCol.className = "statsTD";
	textCol.style.width = "50%";
	valueCol = document.createElement("td");
	valueCol.className = "statsTD";
	textNode = document.createTextNode(text + ": ");
	valueNode = document.createTextNode(commatize(stat) + suffix);
	
	newRow.appendChild(textCol);
	newRow.appendChild(valueCol);
	textCol.appendChild(textNode);
	valueCol.appendChild(valueNode);
	
	return newRow;
}

function mouseDown(e)
{
	if(e.button == 2)
	{
		target = document.getElementById("statsTable");
		targetStyle = getComputedStyle(target, '');

		unsafeWindow.addEventListener("mousemove", mouseMove, false);
		unsafeWindow.addEventListener("mouseup", mouseUp, false);
		
		cursorStartX = e.clientX;
		cursorStartY = e.clientY;
		tableStartY = parseInt(targetStyle.marginTop);
		tableStartX = parseInt(targetStyle.marginLeft);
		
		document.body.focus();
	}

	return false;
}

function mouseMove(e)
{
	//26 is just a random number that happens to stop the table from moving above the screen
	if(tableStartY + (e.clientY - cursorStartY) >= -26)
	{
		target.style.marginTop = tableStartY + (e.clientY - cursorStartY) + "px";
	}
	target.style.marginLeft = tableStartX + (e.clientX - cursorStartX) + "px";
	
	return false;
}

function mouseUp(e)
{
	targetStyle = getComputedStyle(target, '');

	unsafeWindow.removeEventListener("mousemove", mouseMove, false);
	unsafeWindow.removeEventListener("mouseup", mouseUp, false);
	
	setValue(username+"-tableX", targetStyle.marginLeft);
	setValue(username+"-tableY", targetStyle.marginTop);
	
	return false;
}

function rightClick(e)
{
	return !["statsTD","statsTH","statsTableTabs"].some(function(element){return element == e.target.className;});
}

function modifyTabEventBuilder(tab, tabField)
{
	return function()
	{
		tabValues = settings[tab].split(":")[1].split(",");
	
		newString = tabField.value + ":" + tabValues;
		setValue(username+"-"+tab, newString);
		settings[tab] = newString;
		updateStatsTableTabs();
		updateStatsTable();
	};
}

function resetData()
{
	if(confirm("Are you sure you want to reset your data?"))
	{
		setValue(username+"-timestart", time());
		for(stat in stats)
		{
			setValue(username+"-"+stat, "0");
		}
		document.location = "/statistics";
	}
}

function resetSettings()
{
	if(confirm("Are you sure you want to reset your settings?"))
	{
		setValue(username+"-tableX", "150px");
		setValue(username+"-tableY", "20px");
		setValue(username+"-activetab", "tab1");
		setValue(username+"-tab1", "Overview:sessionTime,totaltrains,totalfights,xprate,timetolevel");
		setValue(username+"-tab2", "Trains:totaltrains,trainwinpercent,trainavglength,trainwinmaxxp,trainavgdamage");
		setValue(username+"-tab3", "Fights:totalfights,fightwinpercent,fightavglength,fightwinmaxxp,fightavgdamage");
		setValue(username+"-tab4", "Experience:totalxp,xprate,trainwinmaxxp,fightwinmaxxp,xpleft");
		document.location = "/statistics";
	}
}

function changeTabStringEventBuilder(tabName, element)
{
	return function()
	{
		re = new RegExp("(:|,)" + element + "(,)?");
		if(re.test(settings[tabName]))
		{
			newString = settings[tabName].replace(element, "");
			newString = newString.replace(",,", ",");
			newString = newString.replace(/,$/, "");
			newString = newString.replace(":,", ":");
			newButtonText = "Add";
		}
		else
		{
			if(settings[tabName].split(":")[1].length > 0)
			{
				newString = settings[tabName] + "," + element;
			}
			else
			{
				newString = settings[tabName] + element;
			}
			newButtonText = "Remove";
		}
		
		button = document.getElementById(element+"_"+tabName);
		button.removeChild(button.firstChild);
		button.appendChild(document.createTextNode(newButtonText));
		
		setValue(username+"-"+tabName, newString);
		settings[tabName] = newString;
		updateStatsTableTabs();
		updateStatsTable();
	};
}

if(isOnline)
{
	if(browser == "firefox")
	{
		document.wrappedJSObject.oncontextmenu = rightClick;
	}
	else
	{
		document.oncontextmenu = rightClick;
	}

	loadStats();
	replaceLogo();
	addStatisticsButton();
	
	//Will run if the user is on a training page, but not in the train index
	if(/(bots4\.net\/train\/)[0-9]+(\/)[0-9]/.test(document.location))
	{
		if(/(BOTS4.battle.init)/.test(document.body.innerHTML) && !document.getElementById("battle-countdown"))
		{
			var data = eval("(" + document.body.innerHTML.split("BOTS4.battle.init('")[1].split("'.evalJSON()")[0] + ")");
			
			var rewards = data.rewards;
			var summary = data.summary;
			var attackerStats = summary.attacker;
			var defenderStats = summary.defender;

			var xpGain = parseInt(rewards.xpGain);
			var kudosGain = parseInt(rewards.kudosGain);
			var levelGain = parseInt(rewards.levelGain);
			var winner = summary.winner;
			var xpleft = parseInt(rewards.xptnl);

			var Aattempts = parseInt(attackerStats.attempts);
			var Amaxdamage = parseInt(attackerStats.maxHit);
			var Ablocks = parseInt(attackerStats.blocks);
			var Amisses = parseInt(attackerStats.misses);
			var Adamage = parseInt(attackerStats.inflicted);
			
			var Dattempts = parseInt(defenderStats.attempts);
			var Dmaxdamage = parseInt(defenderStats.maxHit);
			var Dblocks = parseInt(defenderStats.blocks);
			var Dmisses = parseInt(defenderStats.misses);
			var Ddamage = parseInt(defenderStats.inflicted);
			
			length = parseInt(Aattempts + Dattempts)*800;
			
			setValue(username+"-trainxp", String(stats["trainxp"]+xpGain));
			setValue(username+"-trainkudos", String(stats["trainkudos"]+kudosGain));
			setValue(username+"-levelsgained", String(stats["levelsgained"]+levelGain));
			setValue(username+"-trainattempts", String(stats["trainattempts"]+Aattempts));
			setValue(username+"-trainlength", String(stats["trainlength"]+length));
			setValue(username+"-trainblocks", String(stats["trainblocks"]+Ablocks));
			setValue(username+"-trainmisses", String(stats["trainmisses"]+Amisses));
			setValue(username+"-traindamage", String(stats["traindamage"]+Adamage));
			setValue(username+"-dtrainattempts", String(stats["dtrainattempts"]+Dattempts));
			setValue(username+"-dtrainblocks", String(stats["dtrainblocks"]+Dblocks));
			setValue(username+"-dtrainmisses", String(stats["dtrainmisses"]+Dmisses));
			setValue(username+"-dtraindamage", String(stats["dtraindamage"]+Ddamage));
			setValue(username+"-xpleft", String(xpleft));
			
			if(winner == data.bots.attacker.name)
			{
				setValue(username+"-trainwins", String(stats["trainwins"]+1));
				
				if(xpGain > stats["trainwinmaxxp"])
				{
					setValue(username+"-trainwinmaxxp", String(xpGain));
				}
				if(kudosGain > stats["trainwinmaxkudos"])
				{
					setValue(username+"-trainwinmaxkudos", String(kudosGain));
				}
			}
			else
			{
				setValue(username+"-trainlosses", String(stats["trainlosses"]+1));
				
				if(xpGain > stats["trainlossmaxxp"])
				{
					setValue(username+"-trainlossmaxxp", String(xpGain));
				}
				if(kudosGain > stats["trainlossmaxkudos"])
				{
					setValue(username+"-trainlossmaxkudos", String(kudosGain));
				}
			}
			
			if(Amaxdamage > stats["trainmaxdamage"])
			{
				setValue(username+"-trainmaxdamage", String(Amaxdamage));
			}
			
			if(Dmaxdamage > stats["dtrainmaxdamage"])
			{
				setValue(username+"-dtrainmaxdamage", String(Dmaxdamage));
			}
			
			if(length > stats["trainmaxlength"]*1000)
			{
				setValue(username+"-trainmaxlength", String(length));
			}
		}
	}
	else if(/(bots4\.net\/fight\/)[0-9]+(\/)[0-9]/.test(document.location))
	{
		if(/(BOTS4.battle.init)/.test(document.body.innerHTML) && !document.getElementById("battle-countdown"))
		{
			var data = eval("(" + document.body.innerHTML.split("BOTS4.battle.init('")[1].split("'.evalJSON()")[0] + ")");
			
			var rewards = data.rewards;
			var summary = data.summary;
			var attackerStats = summary.attacker;
			var defenderStats = summary.defender;

			var xpGain = parseInt(rewards.xpGain);
			var kudosGain = parseInt(rewards.kudosGain);
			var levelGain = parseInt(rewards.levelGain);
			var winner = summary.winner;
			var xpleft = parseInt(rewards.xptnl);
			var energyGain = data.energy ? parseInt(data.energy) : 0;

			var Aattempts = parseInt(attackerStats.attempts);
			var Amaxdamage = parseInt(attackerStats.maxHit);
			var Ablocks = parseInt(attackerStats.blocks);
			var Amisses = parseInt(attackerStats.misses);
			var Adamage = parseInt(attackerStats.inflicted);
			
			var Dattempts = parseInt(defenderStats.attempts);
			var Dmaxdamage = parseInt(defenderStats.maxHit);
			var Dblocks = parseInt(defenderStats.blocks);
			var Dmisses = parseInt(defenderStats.misses);
			var Ddamage = parseInt(defenderStats.inflicted);
			
			length = parseInt(Aattempts + Dattempts)*800;
			
			setValue(username+"-fightxp", String(stats["fightxp"]+xpGain));
			setValue(username+"-fightkudos", String(stats["fightkudos"]+kudosGain));
			setValue(username+"-levelsgained", String(stats["levelsgained"]+levelGain));
			setValue(username+"-fightattempts", String(stats["fightattempts"]+Aattempts));
			setValue(username+"-fightlength", String(stats["fightlength"]+length));
			setValue(username+"-fightblocks", String(stats["fightblocks"]+Ablocks));
			setValue(username+"-fightmisses", String(stats["fightmisses"]+Amisses));
			setValue(username+"-fightdamage", String(stats["fightdamage"]+Adamage));
			setValue(username+"-dfightattempts", String(stats["dfightattempts"]+Dattempts));
			setValue(username+"-dfightblocks", String(stats["dfightblocks"]+Dblocks));
			setValue(username+"-dfightmisses", String(stats["dfightmisses"]+Dmisses));
			setValue(username+"-dfightdamage", String(stats["dfightdamage"]+Ddamage));
			setValue(username+"-xpleft", String(xpleft));
			setValue(username+"-energygained", String(stats["energygained"]+energyGain));
			
			if(winner == data.bots.attacker.name)
			{
				setValue(username+"-fightwins", String(stats["fightwins"]+1));
				
				if(xpGain > stats["fightwinmaxxp"])
				{
					setValue(username+"-fightwinmaxxp", String(xpGain));
				}
			}
			else
			{
				setValue(username+"-fightlosses", String(stats["fightlosses"]+1));
				
				if(xpGain > stats["fightlossmaxxp"])
				{
					setValue(username+"-fightlossmaxxp", String(xpGain));
				}
			}
			
			if(Amaxdamage > stats["fightmaxdamage"])
			{
				setValue(username+"-fightmaxdamage", String(Amaxdamage));
			}
			
			if(Dmaxdamage > stats["dfightmaxdamage"])
			{
				setValue(username+"-dfightmaxdamage", String(Dmaxdamage));
			}
			
			if(length > stats["fightmaxlength"]*1000)
			{
				setValue(username+"-fightmaxlength", String(length));
			}
		}
	}
	else if(/(bots4\.net\/statistics)/.test(document.location))
	{
		document.getElementById("content").childNodes[1].innerHTML = "statistics";
		document.title = "bots4 :: statistics";
		
		fightHistory = document.createElement("a");
		fightHistory.href = "http://bots4.net/fight/history";
		fightHistory.appendChild(document.createTextNode("View attacks from the past 7 days"));

		dataReset = document.createElement("a");
		dataReset.href = "#";
		dataReset.appendChild(document.createTextNode("Click here to reset your data."));
		dataReset.addEventListener("click", resetData, false);
		
		settingsReset = document.createElement("a");
		settingsReset.href = "#";
		settingsReset.appendChild(document.createTextNode("Click here to reset your settings."));
		settingsReset.addEventListener("click", resetSettings, false);
		
		pageContent = document.getElementById("content");
		pageContent.appendChild(fightHistory);
		pageContent.appendChild(document.createElement("br"));
		pageContent.appendChild(document.createElement("br"));
		pageContent.appendChild(dataReset);
		pageContent.appendChild(document.createElement("br"));
		pageContent.appendChild(settingsReset);
		pageContent.appendChild(document.createElement("br"));
		pageContent.appendChild(document.createElement("br"));
		
		settingsTable = document.createElement("table");
		settingsTable.id = "settingsTable";
		
		settingsTableTR = document.createElement("tr");
		settingsTable.appendChild(settingsTableTR);
		
		settingsTableTH = document.createElement("th");
		settingsTableTH.appendChild(document.createTextNode("Information"));
		settingsTableTR.appendChild(settingsTableTH);
		
		for(i = 0; i < 4; i++)
		{
			tabId = "tab"+(i+1);
			tabName = settings[tabId].split(":")[0];
			
			tabTH = document.createElement("th");
			
			tabField = document.createElement("input");
			tabField.type = "text";
			tabField.value = tabName;
			tabField.size = "10";
			tabField.addEventListener("keyup", modifyTabEventBuilder(tabId, tabField), true);
			
			tabTH.appendChild(tabField);
			
			settingsTableTR.appendChild(tabTH);
		}
		
		for(statName in textlabels)
		{
			statTR = document.createElement("tr");
			
			statTD = document.createElement("td");
			statTD.style.textAlign = "left";
			statTD.appendChild(document.createTextNode(textlabels[statName][0]));
			statTR.appendChild(statTD);
			
			for(i = 0; i < 4; i++)
			{
				tabId = "tab"+(i+1);
				tabName = settings[tabId].split(":")[0];
				tabValues = settings[tabId].split(":")[1].split(",");
			
				tabTD = document.createElement("td");
				
				changeButton = document.createElement("a");
				changeButton.id = statName+"_"+tabId;
				changeButton.className = "addRemoveButton";
				changeButton.href = "javascript:void();";
				changeButton.addEventListener("click", changeTabStringEventBuilder(tabId, statName), false);
				
				if(tabValues.some(function(element){return element == statName;}))
				{
					changeButton.appendChild(document.createTextNode("Remove"));
				}
				else
				{
					changeButton.appendChild(document.createTextNode("Add"));
				}
				
				tabTD.appendChild(changeButton);

				statTR.appendChild(tabTD);
			}
			
			settingsTable.appendChild(statTR);
		}
		
		pageContent.appendChild(settingsTable);
	}
}