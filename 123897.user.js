// ==UserScript==
// @name Ikariam SpyDef Helper
// @version 45.2
// @icon http://s3.amazonaws.com/uso_ss/icon/63347/thumb.png
// @namespace SpyDefHelper
// @description Helpful Informations about your protection against spy attacks
// @include http://m*.ikariam.*/index.php*
// @history 45.2 Added support for mobile version of the game
// @history 45.1 fix for skript detection (GF has dynamic skripts in send spy screen)
// @history 44.2 fix for detection risk below 5%
// @history 44.1 enhanced for malus/bonus by selected government
// @history 33.4 island layout had to be adapted, again
// @history 33.3 lint fixes / cursor above buttons
// @history 33.2 CR/LN code fixed
// @history 33.2 send spy screen: show target city name
// @history 33.2 send spy screen: non-send missions can not be clicked
// @history 33.2 send spy screen: uses send icons
// @history 33.1 fixed: updater
// @history 33.0 fix: calculation precision - looks good now :P
// @history 33.0 fix: adapted to silent update of island layout
// @history 32.2 fix: calculation for inactive player
// @history 32.2 fix: spy mission from occupied city
// @history 32.1 send spy view fix
// @history 32.0 layout-fix to work with thin views (http://userscripts.org/scripts/show/46868)
// @history 32.0 removed all language stuff 
// @history 31.0 math-fix
// @history 30.0 own defence preview
// @history 29.0 changes for ika update, klickable agents
// @history 28.0 redesign for ika 0.4.2
// @history 27.0 show info-box in city-view only if your action is needed
// @history 26.0 updater can handle downtimes of userscripts.org
// @history 25.0 notify events
// @history 24.0 update number of defending spyies on "send spy"
// @history 22.0 displays "<=" or ">=" instead of "="
// @history 21.0 fixed updatelink
// @history 2.0 changed updater - no more nags for language-only updates
// @history 1.0 overview info-box: added links to each city view
// @history 0.17 send spy: know more before you send your spy
// @history 0.17 overview info-box: separate own cities from occupied/allied cities
// @history 0.8 overview info-box for trade/city advisor
// @history 0.7 Info Box also displayed inside the hideout
// @history 0.5 added ScriptUpdater (57756)
// @history 0.3 broken - do not use
// @history 0.2 only own cites know defending spies
// @history 0.1 initial release
// ==/UserScript==

// update part 
var scriptName = "SpyDef Helper"
var scriptID = 123897;
var thisVersion="45.2";
var update = "all";

//-----------------------------------------------------------------------------
function linkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	var time="";
	if (thisVersion == GM_getValue("thisVersion","")) { time += new Date().getDate() }
	else { GM_setValue("thisVersion",thisVersion) };
	if (lastUpdateCheck != time)
	{	GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response) {
				var regex = (/\bversion\b\s*(\d+)\.(\d+)s*/).exec(response.responseText);
				if (regex) {
					newestVersion = regex[1]+"."+regex[2];
					GM_setValue("lastUpdateCheck", time);
					GM_setValue("newestVersion", newestVersion);
				}
			}	
		});
	};
	var needsUpdate;
	if (update == "system") { needsUpdate = (thisVersion.split(".")[0]) != (newestVersion.split(".")[0]) }
	else { needsUpdate = thisVersion != newestVersion }
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (needsUpdate) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>' }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>' };
	return innerHTML;
};

//-----------------------------------------------------------------------------
var cache = {	};
var server = document.domain;

//-----------------------------------------------------------------------------
function spyAVKey(name, cityId) {
// one key to save or load a value
	return "SpyAdv@"+server+'_'+name+'_'+cityId
}

//-----------------------------------------------------------------------------
function spyAVsetInt(name, cityId, value) {
// store a value for a name in a city
	GM_setValue(spyAVKey(name, cityId), ''+value);
}

//-----------------------------------------------------------------------------
function spyAVgetInt(name, cityId, defaultValue) {
// load a value for name in a city, try to use the cache and use defaultValue if needed
	var value;
	value = cache[name+cityId];
	if (typeof(value) == "undefined") { value = GM_getValue(spyAVKey(name, cityId), defaultValue)}
	return	parseInt(value);
}

//-----------------------------------------------------------------------------
function spyAVbestTimeByScript(time, script) {
	var regex = (/enddate\:\s*(\d+)\D*/).exec(script.text);
	if (!regex) { return time };
	var endDate = parseInt(regex[1]);
	if (time==0 || time>endDate) { return endDate }
	else { return time }
}

//-----------------------------------------------------------------------------
function spyAVgetSecondsNow() {
	return Math.floor( new Date().getTime() / 1000);
}

function spyAVgetHideoutString() {
	return GM_getValue('hideout',"Hideout");
}

function spyAVsetHideoutString(hideoutString) {
	GM_setValue('hideout', hideoutString);
}

function spyAVgetHomiesString() {
	return GM_getValue('homies',"0 Homies");
}

function spyAVsetHomiesString(homiesString) {
	GM_setValue('homies', homiesString);
}

//-----------------------------------------------------------------------------
function spyAVgetInfosFromHideout(cityId) {
// parse and store the number of spies working in defence for the given cityId
// check the time of the next event (spy return, arrival or traning)
	var defenseInfo = document.getElementById("reportInboxLeft").getElementsByTagName("li");
	var mainview = document.getElementById("mainview");
	var hideout = mainview.getElementsByTagName("h1")[0].innerHTML;
	if (hideout!=spyAVgetHideoutString()) { spyAVsetHideoutString(hideout) };
	var regex = (/(\D*)(\d+)(\D*)/).exec(defenseInfo[1].firstChild.nodeValue);
	var homiesString = regex[1]+'0'+regex[3];
	if (homiesString!=spyAVgetHomiesString()) { spyAVsetHomiesString(homiesString) };
	var homies = parseInt(regex[2]);
	spyAVsetInt("homies", cityId, homies);
	var next=0;
	var countdown = mainview.getElementsByTagName("script");
	for (var i=0; i < countdown.length; i++) {
		next=spyAVbestTimeByScript(next, (countdown[i]));
	}
	var buildCountDown=document.getElementById("buildCountDown");
	if (buildCountDown) {
		next=spyAVbestTimeByScript(next, (buildCountDown.parentNode.getElementsByTagName("script")[0]));
	}
	if (next==0) {
		var apply = parseInt((/\d+/).exec(defenseInfo[0].firstChild.nodeValue));
		if (apply>0) { next=spyAVgetSecondsNow() }; // spy to train? check NOW!
	};
	spyAVsetInt('next', cityId, next); // when to check next time
}

//-----------------------------------------------------------------------------
function spyAVisOwnCity(cityId) {
// check if the city in view is one of the own cities (including any city where troops are)
	var cities=document.getElementById("citySelect").getElementsByTagName("option");
	for (var i=0; i<cities.length; i++)
		{ if (cityId == cities[i].value) { return true }}
	return false;
}

//-----------------------------------------------------------------------------
function spyAVSaveFromBuilding(name, cityId, building) {
// parse the building level and cache the value, store those values of own cities
	if (building.className.toLowerCase() == name.toLowerCase()) //toLowerCase() since "townHall" and "townhall" may occur
	{	var substr = building.getElementsByTagName("a")[0].title.split(" ");
		var level = parseInt(substr[substr.length-1]);
		cache[name+cityId]=level;
	}
}

//-----------------------------------------------------------------------------
function spyAVgetInfosFromCity(cityId) {
// load building levels of relevant buildings
	cache["townHall"+cityId]=0;
	cache["safehouse"+cityId]=0;
	for (var i=0; i<=14; i++)
	{	var building = document.getElementById('position'+i);
		spyAVSaveFromBuilding("townHall", cityId, building);
		spyAVSaveFromBuilding("safehouse", cityId, building);
	};
	spyAVsetInt("townHall", cityId, cache["townHall"+cityId]);
	spyAVsetInt("safehouse", cityId, cache["safehouse"+cityId]);
}

//-----------------------------------------------------------------------------
function spyAVnotifyCity(cityId) {
	var time = spyAVgetInt('next', cityId, -1); // when to check next time
	if (time==0) { return "" };
	if (time==-1) { return " (?)" };
	var now = spyAVgetSecondsNow();
	if (time>now) { 
		var string= " (";
		var seconds = time-now;
		var minutes = Math.floor(seconds / 60);
		if (minutes > 60) {
			var hours = Math.floor(minutes / 60);
			minutes = minutes % 60;
			string += + hours + unsafeWindow.LocalizationStrings['timeunits']['short']['hour'] + " ";
			
		};
		string += minutes + unsafeWindow.LocalizationStrings['timeunits']['short']['minute']+")";
		return string
	}
	else { return " (!)" };
}

//-----------------------------------------------------------------------------
function spyAVappendSpyQuickInfoTo(elementId, cityId) {
// city-view: put a box under element with elementId, show all relevant values for cityId
	var safehouse = spyAVgetInt('safehouse', cityId, 0);
	var homies = spyAVgetInt('homies', cityId, -1);
	var innerHTML = '<h3 class="header">'+spyAVgetHideoutString();
	if (homies == -1) { innerHTML += ' ?' }
	else innerHTML += " " + homies + '/' + safehouse;
	innerHTML+=' <a id="showFullSpydef">[+]</a>';
	innerHTML+='</h3><div class="footer"></div>';
	var	box = document.createElement('div');
	box.className='dynamic';
	box.id='SpyAdvisor';
	box.innerHTML = innerHTML;
	var element = document.getElementById(elementId);
	element.parentNode.insertBefore(box, element.nextSibling);
	document.getElementById("showFullSpydef").addEventListener("click", expandInfo, true);
}

function expandInfo() {
	spyAVappendSpyInfoTo('information', spyAVgetCityId())
}

function dangerAt(agents, decoys, chance, townHall, homies, mission, value, targetGovFactor) {
	var risk = detectionRiskFor(agents, decoys, townHall, homies, mission[value], targetGovFactor, 1, 5);
	var result = '<img height="16" src="skin/characters/40h/spy_r.gif">';
	result += agents;
	result += ' <img height="16" src="skin/characters/40h/citizen_r.gif">';
	result += decoys + ': <a title="';
	result += chance+"% (@"+risk+"%)";
	var fullRisk = chance*(100-risk)/100;
	if (value>1) { 
		fullRisk = fullRisk * intrusionRisk(agents+decoys, townHall, homies, mission[1], targetGovFactor);
		result += ' + ' + (agents+decoys) + "x " + mission[1]["name"];
	};
	result += '">'+Math.round(fullRisk)+'%</a>';
	return result;
}

function intrusionRisk(targetAgents, townHall, homies, mission, targetGovFactor) {
	var agents = initialAgents(mission);
	var decoys = optDecoyFor(agents, townHall, homies, mission, targetGovFactor, 1);
	var chance = spyChance(agents, decoys, townHall, homies, mission, targetGovFactor, 1);
	var newDecoys = optDecoyFor(agents+1, townHall, homies, mission, targetGovFactor, 1);
	var newChance = spyChance(agents+1, newDecoys, townHall, homies, mission, targetGovFactor, 1);
	while (newChance>chance) {
		agents = agents + 1;
		decoys = newDecoys;
		chance = newChance;
		newDecoys = optDecoyFor(agents+1, townHall, homies, mission, targetGovFactor, 1);
		newChance = spyChance(agents+1, newDecoys, townHall, homies, mission, targetGovFactor, 1);
	};
	var risk = detectionRiskFor(agents, decoys, townHall, homies, mission, targetGovFactor, 1, 5);
	var count = Math.round(targetAgents/agents+0.499);
	return Math.pow((chance/100*(100-risk)/100), count);
}

function dangerVal(townHall, homies, mission, targetGovFactor, value) {
	var agents = initialAgents(mission[value]);
	var decoys = optDecoyFor(agents, townHall, homies, mission[value], targetGovFactor, 1);
	var chance = spyChance(agents, decoys, townHall, homies, mission[value], targetGovFactor, 1);
	var result = "<b>"+mission[value]["name"]+"</b><br>";
	result += dangerAt(agents, decoys, chance, townHall, homies, mission, value, targetGovFactor);
	var	changed = false;
	var newDecoys = optDecoyFor(agents+1, townHall, homies, mission[value], targetGovFactor, 1);
	var newChance = spyChance(agents+1, newDecoys, townHall, homies, mission[value], targetGovFactor, 1);
	while (newChance>chance) {
		changed = true;
		agents = agents + 1;
		decoys = newDecoys;
		chance = newChance;
		newDecoys = optDecoyFor(agents+1, townHall, homies, mission[value], targetGovFactor, 1);
		newChance = spyChance(agents+1, newDecoys, townHall, homies, mission[value], targetGovFactor, 1);
	};
	if (changed) {
		result += '<br>';
		result += dangerAt(agents, decoys, chance, townHall, homies, mission, value, targetGovFactor);
	};
	return result;
}

function spyAVgetCityName() {
	var breadcrumbs = document.getElementById('breadcrumbs');
	var elem = breadcrumbs.getElementsByTagName('a');
	if (elem.length<3) { elem = breadcrumbs.getElementsByTagName('span') };
	return elem[2].innerHTML;
}

function addOptionToSelected(optionName, input, isSelected) {
	var option;
	option = document.createElement('option');
	option.selected=isSelected;
	option.innerHTML=optionName;
	input.appendChild(option);
	input.appendChild(option);
}

function innerHTMLForInfoBox(elementId, targetGovFactor, cityId) {
	var safehouse = spyAVgetInt('safehouse', cityId, 0);
	var townHall = spyAVgetInt('townHall', cityId, 1);
	var homies = spyAVgetInt('homies', cityId, -1);
	var hasSeenHideout = homies >= 0;
	if (homies == -1) { homies = safehouse };
	GM_addStyle( "#SpyAdvisor img { display: inline !important;}" )
	var mission =  JSON.parse(getMissionData());
	var innerHTML = '<h3 class="header">'+spyAVgetHideoutString()+spyAVnotifyCity(cityId)+'</h3>';
	innerHTML += '<div class="content" id="spydefHelper">';
	innerHTML += '<p><img height="16" src="skin/characters/40h/spy_r.gif"> (';
	innerHTML += spyAVgetCityName();
	if ( hasSeenHideout ) { innerHTML += '): '+homies+'/'+safehouse+'</p>';} 
	else { innerHTML += '): &le; '+homies+'</p>' };
	innerHTML += '<p>'+dangerVal(townHall, homies, mission, targetGovFactor, 1)+'<br>'; // sendspy
	innerHTML += dangerVal(townHall, homies, mission, targetGovFactor, 5)+'<br>'; // wares
	innerHTML += dangerVal(townHall, homies, mission, targetGovFactor, 6)+'<br>'; // troops
	innerHTML += dangerVal(townHall, homies, mission, targetGovFactor, 21)+'<br>'; // online
	innerHTML += '<br>'+linkForUpdate()+'</p>';
	innerHTML += '</div><div class="footer"></div>';
	return innerHTML;
}

function spyAVappendSpyInfoTo(elementId, cityId) {
	var targetGovFactor = spyAVgetInt('ownGovFactor', '', 0);
	var box = document.createElement('div');
	box.className='dynamic';
	box.id='SpyAdvisor';
	box.innerHTML = innerHTMLForInfoBox(elementId, targetGovFactor, cityId);
	var element = document.getElementById(elementId);
	element.parentNode.insertBefore(box, element.nextSibling);
	"choose gov bonus/malus"
	element = document.getElementById("reportInboxLeft").getElementsByTagName('ul')[0];
	var input = document.createElement('select');
	input.id='ownGovFactor';
	addOptionToSelected('+20%', input, targetGovFactor==20);
	addOptionToSelected('±0', input, targetGovFactor==0);
	addOptionToSelected('-20%', input, targetGovFactor==-20);
	element.appendChild(input);
	"update on change"
	input.addEventListener('mouseup',
			function () {
				var value = document.getElementById('ownGovFactor').value;
				if (value[0]=='+') { targetGovFactor = 20; }
				else if (value[0]=='-') { targetGovFactor = -20; }
				else { targetGovFactor = 0; }
				spyAVsetInt('ownGovFactor', '', targetGovFactor); 
				document.getElementById('SpyAdvisor').innerHTML = innerHTMLForInfoBox(elementId, targetGovFactor, cityId);
			},
			false );}

//-----------------------------------------------------------------------------
function spyAVappendSpyOverviewTo() {
// tradeAdvisor-view: show a box giving intruder values for all your cities
	var cities=document.getElementById("citySelect").getElementsByTagName("option");
	var element = document.getElementById("viewCityImperium");
	var box = document.createElement('div');
	var innerHTML = '<div class="dynamic" id="SpyAdvisor">';
	innerHTML += '<h3 class="header">'+spyAVgetHideoutString()+'</h3>';
	innerHTML += '<div class="content">';
	innerHTML += '<p>';
	var isOwnCity = true;
	for (var i=0; i<cities.length; i++)
	{	
		var city = cities[i];
		var cityId=city.value;
		if ((isOwnCity == true) && !(city.className == "coords"))
		{	isOwnCity = false;
			innerHTML += "<br>";
		}
		innerHTML += '<a href="http://';
		innerHTML += server;
		innerHTML += "/index.php?view=city&id=";
		innerHTML += cityId;
		innerHTML += '">';
		innerHTML += city.innerHTML;
		var safehouse = spyAVgetInt('safehouse', cityId, -1);
		if (safehouse<0) { innerHTML += ' ?<br>' }
		else {
			var homies = spyAVgetInt('homies', cityId, -1);
			if (homies == -1) { innerHTML += ' ?/' + safehouse }
			else {innerHTML += ' ' + homies + '/' + safehouse };
			if (isOwnCity) { innerHTML += spyAVnotifyCity(cityId) };
			innerHTML += '</a><br>';
		}
	}
	innerHTML += '<br>'+linkForUpdate()+'</p>';
	innerHTML += '</p>';
	innerHTML += '</div><div class="footer"></div></div>';
	box.innerHTML = innerHTML;
	element.parentNode.insertBefore(box, element.nextSibling);
}
//-----------------------------------------------------------------------------

function getMissionData(){
	"on change this will be updated on next send spy screen"
	return GM_getValue("missionData", '{\"11\":{\"gold\":150,\"crystal\":80,\"completionTime\":900,\"completionTimePercent\":5},\"1\":{\"gold\":30,\"riskBefore\":30,\"riskAfter\":5,\"riskPerSpy\":3,\"successChance\":60,\"301\":{\"1\":60},\"name\":\"Spion senden\",\"image\":\"spy\\/mission_invasion.jpg\",\"decoyImage\":\"spy\\/decoy_wine.jpg\",\"executableMission\":true},\"20\":{\"gold\":0,\"riskBefore\":0,\"riskAfter\":0},\"6\":{\"gold\":120,\"riskBefore\":70,\"riskAfter\":20,\"riskPerSpy\":6,\"successChance\":55,\"301\":{\"1\":70},\"name\":\"Garnison aussp\\u00e4hen\",\"description\":\"Wenn wir uns w\\u00e4hrend des Morgenappells an der richtigen Stelle verstecken, k\\u00f6nnen wir feststellen, wie viele Soldaten in dieser Garnison stationiert sind. Damit lie\\u00dfe sich ein Angriff genauer planen!\",\"decoyDescription\":\"Eine schwere R\\u00fcstung, ein st\\u00e4hlerner Helm und dr\\u00fcckende Sonne. Da kommt vielen Wachen ein k\\u00fchler Krug Wein sehr gelegen. Ebenso gelegen wird unseren Agenten die verminderte Aufmerksamkeit der tief schlafenden Wachen kommen.\",\"image\":\"spy\\/mission_garrison.jpg\",\"decoyImage\":\"spy\\/decoy_wine.jpg\",\"executableMission\":true},\"4\":{\"gold\":45,\"riskBefore\":24,\"riskAfter\":12,\"name\":\"Schatzkammer aussp\\u00e4hen\",\"description\":\"Es wird nicht leicht sein, einen Blick in die Schatzkammer der Stadt zu erhaschen. Daf\\u00fcr wissen wir danach aber, wie viel Gold dort lagert.\"},\"5\":{\"gold\":150,\"riskBefore\":60,\"riskAfter\":15,\"riskPerSpy\":6,\"successChance\":30,\"301\":{\"5\":100},\"name\":\"Lagerstand inspizieren\",\"description\":\"Im Lager der Stadt k\\u00f6nnen wir herausfinden, welche Rohstoffe dort aufbewahrt werden. Danach werden wir wissen, ob sich vielleicht ein Angriff lohnt.\",\"decoyDescription\":\"Die Beamten deiner Gegner leben gerne ein wenig im Luxus. Eine angemessene Menge Gold an der richtigen Stelle kann daf\\u00fcr sorgen, dass auch ein sonst wachsames Auge mal etwas \\u00fcbersieht. Dies wird deinen Agenten die Arbeit erheblich erleichtern.\",\"image\":\"spy\\/mission_storage.jpg\",\"decoyImage\":\"spy\\/decoy_gold.jpg\",\"executableMission\":true},\"3\":{\"gold\":75,\"riskBefore\":35,\"riskAfter\":10,\"riskPerSpy\":4,\"successChance\":50,\"301\":{\"5\":200},\"name\":\"Forschungsstand aussp\\u00e4hen\",\"description\":\"Unser Spion ist klug genug, um auch als Forscher arbeiten zu k\\u00f6nnen. Auf diese Weise kann er in Erfahrung bringen, wie weit die Wissenschaft in der Stadt ist.\",\"decoyDescription\":\"Die Beamten deiner Gegner leben gerne ein wenig im Luxus. Eine angemessene Menge Gold an der richtigen Stelle kann daf\\u00fcr sorgen, dass auch ein sonst wachsames Auge mal etwas \\u00fcbersieht. Dies wird deinen Agenten die Arbeit erheblich erleichtern.\",\"image\":\"spy\\/mission_research.jpg\",\"decoyImage\":\"spy\\/decoy_gold.jpg\",\"executableMission\":true},\"10\":{\"gold\":90,\"riskBefore\":90,\"riskAfter\":26,\"riskPerSpy\":5,\"successChance\":40,\"301\":{\"5\":100},\"name\":\"Nachrichtenverkehr \\u00fcberwachen\",\"description\":\"Wenn sich unser Spion als Bote anstellen l\\u00e4sst, kann er uns berichten, mit wem Nachrichten ausgetauscht und Vertr\\u00e4ge geschlossen werden!\",\"decoyDescription\":\"Die Beamten deiner Gegner leben gerne ein wenig im Luxus. Eine angemessene Menge Gold an der richtigen Stelle kann daf\\u00fcr sorgen, dass auch ein sonst wachsames Auge mal etwas \\u00fcbersieht. Dies wird deinen Agenten die Arbeit erheblich erleichtern.\",\"image\":\"spy\\/mission_messages.jpg\",\"decoyImage\":\"spy\\/decoy_gold.jpg\",\"executableMission\":true},\"7\":{\"gold\":50,\"riskBefore\":50,\"riskAfter\":22,\"riskPerSpy\":2,\"successChance\":20,\"301\":{\"4\":100},\"name\":\"Flotten- und Truppenbewegungen \\u00fcberwachen\",\"description\":\"Wenn wir ein Auge auf das Stadttor und das andere auf den Hafen werfen, k\\u00f6nnen wir herausfinden, was die Bewohner dort so treiben - zum Beispiel mit wem sie Krieg f\\u00fchren und mit wem sie handeln.\",\"decoyDescription\":\"Ein wenig L\\u00e4rm sollte ausreichend viele Wachen abziehen, um die Gefahr f\\u00fcr unsere Agenten zu reduzieren. Wie bei allen chemischen Reaktionen gilt auch hier: Viel hilft viel!\",\"image\":\"spy\\/mission_military_movements.jpg\",\"decoyImage\":\"spy\\/decoy_sulfur.jpg\",\"executableMission\":true},\"12\":{\"gold\":500,\"riskBefore\":120,\"riskAfter\":60,\"name\":\"Allianz\\u00e4mter ausspionieren\"},\"21\":{\"gold\":100,\"riskBefore\":40,\"riskAfter\":25,\"riskPerSpy\":7,\"successChance\":50,\"301\":{\"4\":80},\"name\":\"Online-Status\",\"description\":\"Mit etwas Geschick k\\u00f6nnen wir heraus finden, ob der Herrscher zurzeit ein Auge auf sein Volk hat.\",\"decoyDescription\":\"Ein wenig L\\u00e4rm sollte ausreichend viele Wachen abziehen, um die Gefahr f\\u00fcr unsere Agenten zu reduzieren. Wie bei allen chemischen Reaktionen gilt auch hier: Viel hilft viel!\",\"image\":\"spy\\/mission_onlinestatus.jpg\",\"decoyImage\":\"spy\\/decoy_sulfur.jpg\",\"executableMission\":true},\"8\":{\"gold\":0,\"riskBefore\":0,\"riskAfter\":0,\"riskPerSpy\":1,\"successChance\":95,\"301\":{\"4\":40},\"name\":\"Spion zur\\u00fcckziehen\",\"description\":\"Wir k\\u00f6nnen den Spion jederzeit zur\\u00fcckrufen. Seine Heimkehr sollte kaum f\\u00fcr Aufregung in der Stadt sorgen.\",\"decoyDescription\":\"Ein wenig L\\u00e4rm sollte ausreichend viele Wachen abziehen, um die Gefahr f\\u00fcr unsere Agenten zu reduzieren. Wie bei allen chemischen Reaktionen gilt auch hier: Viel hilft viel!\",\"image\":\"spy\\/mission_retreat.jpg\",\"decoyImage\":\"spy\\/decoy_sulfur.jpg\",\"executableMission\":true}}');
}

function riskWithinLimits(value, min, max) {
	if (value>max) return max
	else if (value<min) return min
	else return value
}
function detectionRiskFor(agents, decoys, townHall, homies, mission, targetGovFactor, stateDiv, min) {
	var missionRisk = (mission['riskBefore'] + 5*homies - 2*townHall);
	var minimum = (agents*mission['riskPerSpy']/stateDiv);
	var risk = Math.round(10*(missionRisk/stateDiv-(10*decoys)))/10;
	if (risk<minimum) { risk = minimum };
	risk += targetGovFactor;
	return riskWithinLimits(risk,min,95);
};

function spyChance(agents, decoys, townHall, homies, mission, targetGovFactor, stateDiv) {
	var base = 1.0-(mission['successChance']/100.0);
	var powered = 1.0-Math.round(100.0*Math.pow(base,agents))/100;
	if (powered >= 1) { powered = 0.99 };
	var detectionFactor = 100-detectionRiskFor(agents, decoys, townHall, homies, mission, targetGovFactor, stateDiv, 5/stateDiv);
	var chance = Math.round(powered * detectionFactor);
	return riskWithinLimits(chance,5,95);
};

function optDecoyFor(agents, townHall, homies, mission, targetGovFactor, stateDiv) {
	var m = targetGovFactor + (mission['riskBefore'] + 5*homies - 2*townHall) / stateDiv;
	var decoys = Math.round((m - agents*mission['riskPerSpy']/stateDiv)*0.1+0.4999);
	if (decoys > 0) return decoys
	else return 0
};

function setSpyTo(spyCount, div) {
	var elem = div.getElementsByTagName('div');
	if (elem.length==0) { return spyCount };
	if (elem[0].className!="spycount") { return spyCount };
	var reg = (/(\d+)/).exec(elem[0].innerHTML);
	if (!reg) { return spyCount };
	var count = 1*reg[1];
	if (count>spyCount) { count= spyCount };
	var input=div.getElementsByTagName('input')[0];
	input.value=count;
	var evt = document.createEvent("KeyEvents");
	evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
	input.dispatchEvent(evt);
	return spyCount - count;
}

function infoTDTo(tr, agents, decoys, townHall, homies, mission, value, chance, targetGovFactor, stateDiv, enabled) {
	var info = "";
	if ( value == 1 ) { info += '<img style="cursor:pointer;" height="20" src="/skin/actions/espionage.gif"> '; }
	else if (enabled) { info += '<img style="cursor:pointer;" height="20" src="skin/layout/icon-mission.gif"> '; }
	else { info += '<img style="cursor:not-allowed; opacity: 0.5;" height="20" src="skin/layout/icon-mission.gif"> '; }
	info += agents;
	info += '<img height="20" src="skin/characters/40h/spy_r.gif">';
	info += " " + decoys;
	info += '<img height="20" src="skin/characters/40h/citizen_r.gif"><br>';
	info += document.getElementById("textfield_chance").innerHTML;
	info += ': ' + chance + "%<br>";
	info += document.getElementById("textfield_risk").innerHTML;
	info += ': ' + detectionRiskFor(agents, decoys, townHall, homies, mission[value], targetGovFactor, stateDiv, 5) + "%<br>";
	var td = document.createElement('td');
	td.innerHTML=info;
	var img = td.getElementsByTagName('img')[0];
	tr.appendChild(td);
	if (enabled) {
		img.addEventListener('click', // add spy decrease on button click
			function () {
				var missionSelect = document.getElementById("missionSelect");
				if(missionSelect) { missionSelect.value=value };
				var div = document.getElementById("missionForm").getElementsByTagName('div'); 
				var todoA = agents;
				var todoD = decoys;
				var i;
				for (i=0; i<div.length; i++) {
					setSpyTo(0, div[i]);
				};
				for (i=0; i<div.length; i++) {
					if (div[i].className=="decoyMission"){
						todoD=setSpyTo(todoD, div[i]) 
					} else {
						todoA=setSpyTo(todoA, div[i])
					};
				};
			},
			false );
	}
}

function initialAgents(mission) {
	var agents = Math.round(mission["riskPerSpy"]/5-0.5);
	if (agents<1) { return 1 }
	else return agents
}

function fullInfoTo(table, townHall, homies, mission, value, targetGovFactor, stateDiv, maxSpies, enabled) {
	var agents = initialAgents(mission[value]);
	var tr=table.getElementsByTagName('tr');
	if (agents>maxSpies) { agents = maxSpies };
	var decoys = optDecoyFor(agents, townHall, homies, mission[value], targetGovFactor, stateDiv);
	if (agents+decoys>maxSpies) { decoys = maxSpies - agents };
	var chance = spyChance(agents, decoys, townHall, homies, mission[value], targetGovFactor, stateDiv);
	var td = document.createElement('td');
	td.innerHTML = '<b>'+mission[value]["name"]+'</b><br>';
	tr[0].appendChild(td);
	infoTDTo(tr[1], agents, decoys, townHall, homies, mission, value, chance, targetGovFactor, stateDiv, enabled);
	var changed = false;
	if (agents<maxSpies) {
		var newAgents = agents + 1;
		var newDecoys = optDecoyFor(newAgents, townHall, homies, mission[value], targetGovFactor, stateDiv);
		if (newAgents+newDecoys>maxSpies) { newDecoys=maxSpies-newAgents};
		var newChance = spyChance(newAgents, newDecoys, townHall, homies, mission[value], targetGovFactor, stateDiv);
		while (newAgents<=maxSpies && newChance>chance) {
			changed = true;
			agents = newAgents;
			decoys = newDecoys;
			chance = newChance;
			newAgents = agents + 1;
			newDecoys = optDecoyFor(newAgents, townHall, homies, mission[value], targetGovFactor, stateDiv);
			if (newAgents+newDecoys>maxSpies) { newDecoys=maxSpies-newAgents};
			newChance = spyChance(newAgents, newDecoys, townHall, homies, mission[value], targetGovFactor, stateDiv);
		};
	}
	if (changed) { infoTDTo(tr[2], agents, decoys, townHall, homies, mission, value, chance, targetGovFactor, stateDiv, enabled)
	} else {tr[2].appendChild(document.createElement('td'));}
}

function getStateDiv(script) {
	if (((/isTargetInactive\s*=\s*(\d+);/).exec(script.textContent)[1])=="1") { return 10}
	else if (((/targetSafehouseLevel\s*=\s*(\d+);/).exec(script.textContent)[1])=="0") { return 2}
	else return 1
}

function getTargetName() {
	var missionSummary = document.getElementById("missionSummary");
	var span = missionSummary.getElementsByTagName('span');
	if (span.length==0) { return ""; }
	var node = span[0].nextSibling
	var text = "";
	while (node) {
		text += node.textContent;
		node=node.nextSibling;
	}
	return text + ": ";
}

function sDisplayScript() {
	var script = document.getElementById("container2").getElementsByTagName("script");
	var i=0;
	while (!(/isTargetInactive\s*=\s*(\d+);/).exec(script[i].textContent)) { i++; }
	return script[i];
}

function spyAVappendSpypPeviewTo(cityId) {
	// sendSpy-view: show a box giving further infos about the victim
	var mainview = document.getElementById("mainview");
	var script = sDisplayScript();
	var stateDiv = getStateDiv(script);
	var targetGovFactor = 1 * (/targetGovFactor\s*=\s*(-?\d+);/).exec(script.textContent)[1];
	var homies = 1 * (/targetFreeSpies\s*=\s*(\d+);/).exec(script.textContent)[1];
	var townHall = 1 * (/targetCityLevel\s*=\s*(\d+);/).exec(script.textContent)[1];
	var regex = (/that\.missionData\s*=\s*JSON\.parse\(('.*')\);/).exec(script.textContent);
	var div = document.getElementById("missionForm").getElementsByTagName('div'); 
	var maxSpies = 0;
	for (i=0; i<div.length;i++) { 
		if (div[i].className=="spycount") { maxSpies += (1*(/(\d+)/).exec(div[i].innerHTML)[1])}
	};
	maxSpies = maxSpies / 2;
	if (regex) {
		missionData=eval(regex[1]);
		if (GM_getValue("missionData","")!=missionData) { GM_setValue("missionData",missionData) };
	}
	else missionData = getMissionData();
	var mission = JSON.parse(missionData);
	var elem = document.getElementById("missionDescription").parentNode;
	if (cityId) {
		var button = document.getElementById("plunderbutton");
		button.addEventListener('click', // add spy decrease on button click
			function () {
				var totalAgents = (/(\d+)/).exec(document.getElementById("totalAgents"))[1]
				var totalDecoys = (/(\d+)/).exec(document.getElementById("totalDecoys"))[1]
				spyAVsetInt('homies', cityId, spyAVgetInt('homies', cityId, 1)-totalAgents-totalDecoys );
				spyAVsetInt('next', cityId, -1 );
			},
			false )
		};
	document.getElementById("mainview").getElementsByTagName("h3")[0].innerHTML+=' - '+linkForUpdate();
	var homiesString = "";
	if (stateDiv==2) {
		homiesString = "0(<b>!</b>)"
	}
	else {
		homiesString += homies; 
		if (stateDiv==10) { homiesString += " (i)" }
	}
	var govString = '';
	if (targetGovFactor !== 0) {
		govString += '('; 
		if (targetGovFactor > 0) { govString += '+'; }
		govString += targetGovFactor + '%)'; 
	}
	elem.innerHTML = elem.innerHTML + getTargetName() + spyAVgetHomiesString().replace(/0/, homiesString) + govString + '<br>';
	table = document.createElement('table');
	for (var i=0; i<3; i++) {
		table.appendChild(document.createElement('tr'));
	};
	elem.appendChild(table);
	if(cityId) {
		fullInfoTo(table, townHall, homies, mission, 1, targetGovFactor, stateDiv, maxSpies, true);
	};
	fullInfoTo(table, townHall, homies, mission, 5, targetGovFactor, stateDiv, maxSpies, cityId==null);
	fullInfoTo(table, townHall, homies, mission, 6, targetGovFactor, stateDiv, maxSpies, cityId==null);
	if (stateDiv!=10) {
		fullInfoTo(table, townHall, homies, mission, 21, targetGovFactor, stateDiv, maxSpies, cityId==null);
	};
}

//-----------------------------------------------------------------------------
function spyAVgetCityId() {
// find out the id of the current city
	var match = document.location.toString().match(/id=(\d+)/);
	if (match)	{ return match[1] };
	var cities=document.getElementById("citySelect").getElementsByTagName("option");
	for (var i=0; i<cities.length; i++)
		{ if (cities[i].selected  ) { return cities[i].value }}
	return 0;
}


function augmentIslandCity(li, tr) {
	var spyTR;
	for (var i=0;i<tr.length; i++) {
		if (tr[i].className=="spy") { spyTR = tr[i]; }
	}
	if (!spyTR) { return; }
	var cityId= (/city_(\d+)/).exec(li.getElementsByTagName("a")[0].id)[1];
	var li2 = li.getElementsByTagName("li");
	for (var j=0; j<li2.length; j++) {
		if ((/espionage/).exec(li2[j].className)) {
			var spyMission = document.createElement('li');
			spyMission.className = "missionButton";
			var a = document.createElement('a');
			a.innerHTML=spyTR.textContent;
			a.href="index.php?view=spyMissions&id="+cityId;
			spyMission.appendChild(a)
			li2[j].parentNode.appendChild(spyMission);
			return;
		}
	}
}

//-----------------------------------------------------------------------------
function spyAVaugmentIsland() {
	for (var i=0; i<17; i++) {
		var li = document.getElementById('cityLocation'+i);
		var tr = li.getElementsByTagName("tr");
		augmentIslandCity(li, tr);
	}
	GM_addStyle('#island #actions .missionButton { background: url("skin/layout/icon-mission.gif") no-repeat scroll center top transparent;');
}

//-----------------------------------------------------------------------------
function spyAVmain() {
// check which view - do what is needed
	var cityId 
	var	view = document.getElementsByTagName("body")[0].id;
	switch (view) {

	case "island":
		spyAVaugmentIsland();
		break;

	case "tradeAdvisor":
		spyAVappendSpyOverviewTo();
		break;

	case "safehouse":
		cityId = spyAVgetCityId();
		spyAVgetInfosFromHideout(cityId);
		spyAVappendSpyInfoTo('reportInboxLeft', cityId); 
		break;

	case "city":
		cityId = spyAVgetCityId();
		if (spyAVisOwnCity(cityId)) { 
			spyAVgetInfosFromCity(cityId);
			if ((spyAVgetInt('next', cityId, -1) == 0))
			{ spyAVappendSpyQuickInfoTo('information', cityId) } 
			else { spyAVappendSpyInfoTo('information', cityId) };
		}
		break;

	case "sendSpy":
		cityId = spyAVgetCityId();
	case "spyMissions":
		spyAVappendSpypPeviewTo(cityId);
		break;

	}
}


//-----------------------------------------------------------------------------
spyAVmain();