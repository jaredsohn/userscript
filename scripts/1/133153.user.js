// ==UserScript==
// @name mIkariam Wine Tracker
// @version	m045.1
// @namespace	mIkaTW
// @description	know your wine reserve when shipping goods
// @include	http://m*.ikariam.*/index.php*
// @history 45.0 minimal style change for 0.4.51
// @history 32.0 modified for 0.4.1
// @history 31.0 updater can handle downtimes of userscripts.org
// @history	30.2 added "hu" translation
// @history	30.1 added "ru" translation
// @history	30.0 fix: scan initial wine
// @history	29.2 added "pl" translation
// @history	29.1 added "sk" translation
// @history	29.0 fix: scan wine consuption after apply, again
// @history	28.1 added "ee" translation
// @history	28.0 fix: id of current city for wine yard
// @history	27.0 fix: id of current city is different for tavern and wine depot when displaying tavern of other citys
// @history	27.0 enhanced: allways scan current wine & display remaining time
// @history	26.1 added "lt" translation
// @history	26.0 per day-view: fix for cities without tavern
// @history	25.0 layout fixed
// @history	24.1 added "bg" translation
// @history	24.0 Fixed port view: wine amount  displayed now the current value, not the last seen value
// @history	23.0 travel times added to port view
// @history	22.0 big numbers are displayed with thousand separator
// @history	22.0 added Wine per Day overview (toggle  between Day and Hour witg Link in Headline)
// @history	21.0 overview layout redone
// @history	2.0 changed updater - no more nags for language-only updates
// @history	1.1 added "pt" translation
// @history	1.1 added "lv" translation
// @history	1.0 added wine production/consumption overview to merchant overview
// @history	1.0 added "fr" translation
// @history	0.6 added "nl" translation
// @history	0.5 added "gr" translation
// @history	0.4 added "dk" translation
// @history	0.4 added "es" translation
// @history	0.3 take own wine production into account
// @history	0.2 added "it" translation
// @history	0.1 initial release
// ==/UserScript==

// update part 
var scriptName = "Wine Tracker"
var scriptID = 133153;
var thisVersion="m045.1";
var update = "system" // change this if minor updates should be notified

function linkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	var time = "";
	if (thisVersion == GM_getValue("thisVersion","")) { time += new Date().getDate() }
	else { GM_setValue("thisVersion",thisVersion) };
	if (lastUpdateCheck != time)
	{	GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response) {
				var regex = /\bversion\b\s*(\d+)\.(\d+)s*/.exec(response.responseText);
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

var languages = {
	"org": {
		"duration"	: "Wine will last for:"
	},
	"hu": { // csubi8
		"duration" : "időtartam:"
	},
	"ru": { // Zeratull
		"duration" : "Вино закончится через:"
	},
	"pl": { // krwq
		"duration"	: "Wina wystarczy na:"
	},
	"sk": { // TmsK
		"duration" : "Víno vydrží ešte:"
	},
	"ee": { // nightwisher
		"duration" : "Veini jagub veel:"
	},
	"lt": { // kavinukas 
		"duration"	: "Vyno trūks už:"
	}, 
	"bg": { // manniakk
		"duration"	: "Виното ще ви стигне за:"
	},
	"pt": { // MarceloCC
		"duration" : "O teu vinho restará por mais:"
	},
	"lv": { // jasa2009
		"duration" : "Vins vel pietiks:"
	}, 
	"fr": { // randalph
		"duration"	: "Stock de vin restant pour:"
	},
	"nl": { // julianboekhout
		"duration"	: "er is nog wijn over voor:"
	},
	"gr": { // Napoleon I
		"duration"	: "Αποθέματα κρασιού για:"
	},
	"es": { // ftmhs
		"duration"	: "El vino durará hasta:"
	},
	"dk": { // lovebug
		"duration"	: "Vin vil vare til:"
	},
	"it": { // Phate72
		"duration"	: "Il vino basterà per:"
	},
	"de": {
		"duration"	: "Wein reicht für:"
	}
};

var server = document.domain;
var parts=server.split(".");
var language = languages[parts[parts.length-1]];

if (typeof(language) == "undefined") { language = languages[parts[1]]; // for sn,lang.ikariam.com
	if (typeof(language) == "undefined") { update = "all"; language = languages["org"] }}

//-----------------------------------------------------------------------------
function wtKey(name, cityId) {
// one key to save or load a value
	return server+'_'+name+'_'+cityId
}

//-----------------------------------------------------------------------------
function wtSetInt(name, cityId, value) {
// store a value for a name in a city
	GM_setValue(wtKey(name, cityId), ''+value);
}

//-----------------------------------------------------------------------------
function wtGetInt(name, cityId, defaultValue) {
// load a value for name in a city, try to use the cache and use defaultValue if needed
	var value = GM_getValue(wtKey(name, cityId), defaultValue);
	return parseInt(value);
}

//-----------------------------------------------------------------------------
function wtGetRessourcesCityId() {
// find out the id of the current city (displaying ressources)
	var cities=document.getElementById("citySelect").options;
	var id = (cities[cities.selectedIndex].value);
	return id;
}

function wtGetCityId() {
// find out the id of the current city (displaying buildings)
	var match = document.location.toString().match(/id=(\d+)/);
	if (match)	{ return match[1] };
	return wtGetRessourcesCityId(view);
}

//-----------------------------------------------------------------------------
function wtGetCityPos() {
// find out the id of the current city
	var ref=document.getElementById("breadcrumbs").getElementsByTagName("a");
	for (var i=0; i<ref.length; i++)
	{	var match = ref[i].innerHTML.match(/(\d+)\:(\d+)/);
		if (match) { return match }}
	return false;
}

//-----------------------------------------------------------------------------
function wtExtendWine(cityId)
{// tooltip wine duration
	var wineNode = document.getElementById("value_wine");
	var timeLeft=wtTimeLeft(cityId);
	if (timeLeft!="") { wineNode.parentNode.getElementsByTagName("div")[0].innerHTML+='<br>'+language["duration"]+timeLeft };
}

//-----------------------------------------------------------------------------
function wtScanWine(cityId)
{// how much wine is available in this city
	var wineNode = document.getElementById("value_wine");
	var wine = wineNode.innerHTML.replace(/\./g,"");
	wtSetInt("wine", cityId, wine);
	wtSetInt("time",cityId, new Date().getTime());
}

//-----------------------------------------------------------------------------
function wtScanTavernInitial(useInitialValue)
{// how much wine is consumed in this city
	var cityId = wtGetCityId();
	var select = document.getElementById("wineAmount");
	var units = document.getElementById("units");
	var script = units.getElementsByTagName("script")[0];
	var index = select.options.selectedIndex;
	if (useInitialValue) { index = parseInt(/iniValue : (\d+)/.exec(script.text)[1])}; // the selectedIndex is delayed :(
	var consumed = 0;
	if (index > 0) { consumed = parseInt(/\d+/.exec(select.options[index].text)) };
	wtSetInt("tavern", cityId, consumed);
	var button = units.getElementsByTagName("input")[0];
	button.addEventListener('click', function () { wtScanTavern()}, false );
}

function wtScanTavern()
{// read selection, NOT the initial value from script
	wtScanTavernInitial(false);
}

//-----------------------------------------------------------------------------
function wtScanTradegood(cityId)
{// how much wine is produced in this city
	var img = document.getElementById("resUpgrade").getElementsByTagName('img')[0];
	var produced = 0;
	if (img.getAttributeNode("src").value=="skin/resources/img_wine.jpg")
	{	var span = document.getElementById("valueResource");
		produced = parseInt(/\d+/.exec(span.innerHTML));
		wtSetInt("produced", cityId, produced);	
	};
}

//-----------------------------------------------------------------------------
function wtTimeLeft(cityId)
{// how long does the wine last? result is a human readable string
	var old = wtGetInt("wine", cityId, -1);
	var time = wtGetInt("time",cityId, -1);
	var change = wtGetInt("tavern", cityId, 0)-wtGetInt("produced", cityId, 0);
	var string = "";
	if (change <= 0) { return string };
	var hoursPassed = (new Date().getTime() - time) / 3600000;
	var hoursLeft = ( old / change ) - hoursPassed;
	var days = parseInt( hoursLeft / 24);
	var hours = parseInt( hoursLeft - days*24 );
	if (days>0) { string += " " + days + unsafeWindow.LocalizationStrings['timeunits']['short']['day'] };
	string += " " + hours + unsafeWindow.LocalizationStrings['timeunits']['short']['hour'];
	return string;
}

//-----------------------------------------------------------------------------
function wtWineNow(cityId)
{// how much wine is now in this city
	var old = wtGetInt("wine", cityId, -1);
	if (old == -1) { return 0 };
	var time = wtGetInt("time",cityId, -1);
	if (time == -1) { return 0 };
	var change = wtGetInt("tavern", cityId, 0) - wtGetInt("produced", cityId, 0);
	if (change < 0) { return 0 };
	hoursPassed = (new Date().getTime() - time) / 3600000;
	return Math.round( old - change * hoursPassed);
}

function wtExtendPort()
{// extend the port view
	GM_addStyle( "#port #container #mainview .contentBox01h .content ul.cities .cityBox {height:170px;}" );
	GM_addStyle( '#port #container #mainview .contentBox01h .content ul.cities li {background:url("");}' );
	var wineStr = unsafeWindow.LocalizationStrings['resources']['wine'];
	var transportLink = document.getElementById("mainview").getElementsByTagName("a");
	var pos = wtGetCityPos();
	var parent;
	for (var i = 0; i < transportLink.length; i++) 
	{	var match = transportLink[i].href.match(/destinationCityId=(\d+)/);
		if (match)	
		{	var cityId = match[1];
			parent = transportLink[i].parentNode.parentNode;
			if (pos)
			{	match = transportLink[i].innerHTML.match(/(\d+)\:(\d+)/);
				var x = parseInt(pos[1])-(parseInt(match[1]));
				var y = parseInt(pos[2])-(parseInt(match[2]));
				var d = Math.sqrt(x*x+y*y);
				if (d==0) { d=10 } else { d=Math.round(d*20) };
				var innerHTML = '(';
				if (d>=60) { innerHTML += parseInt(d/60)+unsafeWindow.LocalizationStrings['timeunits']['short']['hour']+' ' };
				innerHTML += parseInt(d%60)+unsafeWindow.LocalizationStrings['timeunits']['short']['minute']+')';
				transportLink[i].parentNode.innerHTML = innerHTML+transportLink[i].parentNode.innerHTML;
			};
			var timeLeft = wtTimeLeft(cityId);
			if (timeLeft != "") 
			{ 	var node = document.createElement('p');
				var text=language["duration"]+'<br>'+timeLeft;
				node.innerHTML=text;
				node.title= wtNormIntString(wtWineNow(cityId), false) + " " + wineStr;
				transportLink[i].parentNode.appendChild(node);
			}
		}
	};
	parent.innerHTML = '<p align="right">'+linkForUpdate()+"</p>"+parent.innerHTML ;
}

function wtNormIntString(intVal, forcePlus)
{ // add separators to printString
	if (intVal<0) { return '-' + wtNormIntString(-intVal, false) };
	var string = '0';
	var todo = intVal;
	while (todo > 0)
	{	var min = todo % 1000.
		todo = ( todo - min ) / 1000;
		if (todo > 0) 
		{	if (min < 10) { min = '00'+min }
			else { if (min < 100) { min = '0'+min }};
		}
		if (string == '0') { string = min }
		else {string = min + unsafeWindow.LocalizationStrings['thousandSeperator'] + string }
	}
	if (forcePlus) { string = '+'+string };
	return string;
}

function wtToggleView()
{	var val = 24;
	if (GM_getValue('interval', 1)==24) { val = 1 };
	GM_setValue('interval', val);
}

function wtOverview() {
// tradeAdvisor-view: show a box giving wine change values for all your cities
	var wineStr = unsafeWindow.LocalizationStrings['resources']['wine'];
	var timeStr;
	var toggleStr;
	if ( GM_getValue('interval', 24)==24 ) { var toggleStr = 'hour'; timeStr = 'day'; factor = 24 }
	else { toggleStr = 'day'; timeStr = 'hour'; factor = 1 };
	timeStr = unsafeWindow.LocalizationStrings['timeunits']['short'][timeStr];
	toggleStr = unsafeWindow.LocalizationStrings['timeunits']['short'][toggleStr];	
	toggleStr = '<a id= "wtToggle" href="'+document.URL+'">(±/'+toggleStr+')</a>';
	var cities=document.getElementById("citySelect").options;
	var sum = 0;
	var element = document.getElementById("backTo");
	var box = document.createElement('div');
	var innerHTML = '<div class="dynamic" id="WineTracker">';
	innerHTML += '<h3 class="header">'+wineStr+' ±/'+timeStr + ' '+ toggleStr + '</h3>';
	innerHTML += '<div class="content"><table style="margin:8px;border:none;">';
	for (var i=0; i<cities.length; i++)
	{	var cityId = cities[i].value;
		var wine = wtGetInt("wine", cityId, -1);
		if (wine!=-1)
		{	var title = "";
			var change = factor*wtGetInt("tavern", cityId, -1);
			if (change < 0) {change = "?"}
			else 
			{	change = factor*wtGetInt("produced", cityId, 0) - change;
				sum += change;
				if (change<0) {	title="("+language["duration"]+(wtTimeLeft(cityId))+")" }
			}
			innerHTML += '<tr><td align="right">' + wtNormIntString(change, true) + '&nbsp;</td><td><a href="http://';
			innerHTML += document.domain;
			innerHTML += "/index.php?view=city&id=";
			innerHTML += cityId;
			innerHTML += '"';
			if (title!="") { innerHTML += ' title="'+title+'"' };
			innerHTML += '>';
			innerHTML += cities[i].innerHTML + '</a></td></tr>';
		}
	}
	innerHTML += '<tr><td align="right"><b>' + wtNormIntString(sum, true) + '&nbsp;</b></td><td><b>Σ</b></td></tr></table>';
	innerHTML += "<p>"+linkForUpdate()+"</p>";
	innerHTML += '</div><div class="footer"></div></div>';
	box.innerHTML = innerHTML;
	element.parentNode.insertBefore(box, element.nextSibling);
	document.getElementById("wtToggle").addEventListener("click", wtToggleView, true);
}

//-----------------------------------------------------------------------------
function wtMain() {
	var	view = document.getElementsByTagName("body")[0].id;
	// scan infos
	alert(view);
	var resCityId=wtGetRessourcesCityId();
	wtScanWine(resCityId);
	if (view == 'tavern') { wtScanTavernInitial(true) };
	if (view == 'tradegood') { wtScanTradegood(resCityId) };
	// extend
	if (view == 'port')	{ wtExtendPort() };
	if (view == 'merchantNavy')	{ wtOverview() };
	wtExtendWine(resCityId)
}

//-----------------------------------------------------------------------------
wtMain();