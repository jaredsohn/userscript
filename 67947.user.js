// ==UserScript==
// @name Ikariam Wine Tracker
// @version	25.0
// @namespace	IkaTW
// @description	know your wine reserve when shipping goods
// @include	http://s*.ikariam.*/index.php*
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
var scriptID = 64280;
var thisVersion="25.0";
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
				/\bversion\b\s*(\d+)\.(\d+)s*/.exec(response.responseText);
				newestVersion = RegExp.$1+"."+RegExp.$2;
				GM_setValue("lastUpdateCheck", time);
				GM_setValue("newestVersion", newestVersion);
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
function wtGetCityId() {
// find out the id of the current city
	var cities=document.getElementById("citySelect").options;
	var id = (cities[cities.selectedIndex].value);
	return id;
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
function wtScanWine(cityId)
{// how much wine is consumed in this city
	var wine = document.getElementById("value_wine").innerHTML.replace(/\./g,"");
	wtSetInt("wine", cityId, wine);
	wtSetInt("time",cityId, new Date().getTime());
}

//-----------------------------------------------------------------------------
function wtScanTavern(cityId)
{// how much wine is consumed in this city
	wtScanWine(cityId);
	var select = document.getElementById("wineAmount");
	var index = select.options.selectedIndex;
	var consumed = 0;
	if (index > 0) { 
		consumed = parseInt(/\d+/.exec(select.options[index].text)) };
	wtSetInt("tavern", cityId, consumed);
}

//-----------------------------------------------------------------------------
function wtScanTradegood(cityId)
{// how much wine is produced in this city
	wtScanWine(cityId);
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

//-----------------------------------------------------------------------------
function wtExtendPort()
{// extend the port view
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
			{	var innerHTML = transportLink[i].innerHTML;
				match = innerHTML.match(/(\d+)\:(\d+)/);
				var x = parseInt(pos[1])-(parseInt(match[1]));
				var y = parseInt(pos[2])-(parseInt(match[2]));
				var d = Math.sqrt(x*x+y*y);
				if (d==0) { d=10 } else { d=Math.round(d*20) };
				innerHTML += ' (';
				if (d>=60) { innerHTML += parseInt(d/60)+unsafeWindow.LocalizationStrings['timeunits']['short']['hour']+' ' };
				innerHTML += parseInt(d%60)+unsafeWindow.LocalizationStrings['timeunits']['short']['minute']+')';
				transportLink[i].innerHTML = innerHTML;
			};
			var timeLeft = wtTimeLeft(cityId);
			if (timeLeft != "") 
			{ 	var node = document.createElement('p');
				var text="("+language["duration"]+timeLeft+")";
				node.innerHTML=text;
				node.title= wtNormIntString(wtWineNow(cityId), false) + " " + wineStr;
				transportLink[i].parentNode.appendChild(node);
			}
		}
	};
	parent.innerHTML = '<p align="right">'+linkForUpdate()+"</p>"+parent.innerHTML ;
}

function wtToggleView()
{	var val = 24;
	if (GM_getValue('interval', 1)==24) { val = 1 };
	GM_setValue('interval', val);
}


//-----------------------------------------------------------------------------
function wtMain() {
	var	view = document.getElementsByTagName("body")[0].id;
	// scan infos
	if (view == 'city')	{ wtScanWine(wtGetCityId()) };
	if (view == 'tavern') { wtScanTavern(wtGetCityId()) };
	if (view == 'tradegood') { wtScanTradegood(wtGetCityId()) };
	// extend
	if (view == 'port')	{ wtExtendPort() };
	if (view == 'merchantNavy')	{ wtOverview() };
}

//-----------------------------------------------------------------------------
wtMain();