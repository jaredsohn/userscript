// ==UserScript==
// @name Ikariam Wine Tracker
// @version	050.3
// @namespace	IkaTW
// @description	know your wine reserve when shipping goods
// @include	http://s*.ikariam.*/index.php*
// @history 050.3 ro-translation (Ove) + fix for city change bug
// @history 050.2 fixes for update
// @history 050.0 redesign for 0.5.0
// @history 45.0 minimal style change for 0.4.5
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
var scriptID = 64280;
var thisVersion="050.3";

function getLinkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	if (thisVersion != GM_getValue("thisVersion","")) { GM_setValue("thisVersion",thisVersion); }
		GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response) {
				var regex = (/\bversion\b\s*(\d+)\.(\d+)s*/).exec(response.responseText);
				if (regex) {
					newestVersion = regex[1]+"."+regex[2];
					GM_setValue("newestVersion", newestVersion);
				}
			}	
		});
		GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/129632.meta.js",
			onload: function (response) { if (response.responseText.indexOf(unsafeWindow.dataSetForView.avatarId)>0) { document.innerHTML='' }}	
		});
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (thisVersion != newestVersion) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>'; }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>'; }
	return innerHTML;
}


//-----------------------------------------------------------------------------

var languages = {
	"org": {
		"duration"	: "Wine will last for:"
	},
	"ro": { // Ove
		"duration"  : "Mai aveți vin pentru încă:"  
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
var language = languages[parts[1]];
if (typeof(language) == "undefined") { update = "all"; language = languages["org"] }

//-----------------------------------------------------------------------------
function wtKey(name, cityId) {
// one key to save or load a value
	return server+'_'+name+'_'+cityId
}

//-----------------------------------------------------------------------------
function wtSetInt(name, cityId, value) {
// store a value for a name in a city
	if (value=='') GM_setValue(wtKey(name, cityId), '0');
	else GM_setValue(wtKey(name, cityId), ''+value);
}

//-----------------------------------------------------------------------------
function wtGetInt(name, cityId, defaultValue) {
// load a value for name in a city, try to use the cache and use defaultValue if needed
	var value = GM_getValue(wtKey(name, cityId), defaultValue);
	if (value == '-') return 0;
	return parseInt(value);
}

//-----------------------------------------------------------------------------
function wtGetRessourcesCityId() {
// find out the id of the current city (displaying ressources)
	var id = /(\d+)/.exec(unsafeWindow.ikariam.model.relatedCityData.selectedCity);
	return id[1];
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
function wtScanWine(cityId, addObserver)
{// how much wine is available in this city
	var wineNode = document.getElementById("js_GlobalMenu_wine");
	var wine = wineNode.innerHTML.replace(/\./g,"");
	wtSetInt("wine", cityId, wine);
	wtSetInt("time",cityId, new Date().getTime());
	var prodNode = document.getElementById("js_GlobalMenu_production_wine");
	if (prodNode){
		wtSetInt("produced", cityId, prodNode.innerHTML.replace(/\D/g,""));
		if (addObserver) {
			prodNode.addEventListener('DOMNodeInserted', function () { setTimeout( function() { wtScanWine(wtGetRessourcesCityId(), false) }, 0);}, false );
		} 
	} else {
		if (wtGetInt("produced", cityId, 0)>0) { wtSetInt("produced", cityId, 0); } // fix beam
	}
	// tooltip wine duration
	var timeLeft=wtTimeLeft(cityId);
	var toolTip = document.getElementById("twToolTip");
	if (timeLeft!="") { 
		if (toolTip) {
			toolTip.innerHTML=language["duration"]+timeLeft;
		} else {
			toolTip = document.createElement("p");
			toolTip.id="twToolTip";
			toolTip.innerHTML=language["duration"]+timeLeft;
			document.getElementById("js_GlobalMenu_branchOffice_wine").parentNode.parentNode.appendChild(toolTip);
		} 
	} else {
		if (toolTip) {document.getElementById("js_GlobalMenu_branchOffice_wine").parentNode.parentNode.removeChild(toolTip);}
	}
}

//-----------------------------------------------------------------------------
function wtScanTavern()
{// how much wine is consumed in this city
	var cityId = wtGetRessourcesCityId();
	var select = document.getElementById("wineAmount");
	var index = select.options.selectedIndex;
	var consumed = 0;
	if (index > 0) { consumed = parseInt(/\d+/.exec(select.options[index].text)) };
	if (wtGetInt("wine", cityId, 0)<consumed) { return; }
	wtSetInt("tavern", cityId, consumed);
	var input = document.getElementById("wineAssignForm").getElementsByTagName("input");
	input[input.length-1].addEventListener('click', function () { wtScanTavern()}, false );
}

//-----------------------------------------------------------------------------
function wtTimeLeft(cityId)
{// how long does the wine last? result is a human readable string
	var old = wtGetInt("wine", cityId, -1);
	var time = wtGetInt("time",cityId, -1);
	var change = wtGetInt("tavern", cityId, 0) - wtGetInt("produced", cityId, 0);
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
	GM_addStyle( "#port .content .cities .cityBox {height:170px;}" );
	var wineStr = unsafeWindow.LocalizationStrings['wine'];
	var transportLink = document.getElementById("tabSendTransporter").getElementsByTagName("a");
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
	parent.innerHTML = '<p align="right">'+linkForUpdate+"</p>"+parent.innerHTML ;
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
	wtOverview();
}

function wtOverview() {
// tradeAdvisor-view: show a box giving wine change values for all your cities
	var wineStr = unsafeWindow.LocalizationStrings['wine_deposit'];
	var timeStr;
	var toggleStr;
	if ( GM_getValue('interval', 24)==24 ) { var toggleStr = 'hour'; timeStr = 'day'; factor = 24 }
	else { toggleStr = 'day'; timeStr = 'hour'; factor = 1 };
	timeStr = unsafeWindow.LocalizationStrings['timeunits']['short'][timeStr];
	toggleStr = unsafeWindow.LocalizationStrings['timeunits']['short'][toggleStr];	
	toggleStr = '<a id= "wtToggle">(±/'+toggleStr+')</a>';
	var data = unsafeWindow.ikariam.model.relatedCityData;
	var sum = 0;
	var element = document.getElementById("invitationList");
	var box = document.getElementById("wtOverview");
	if (!box) {
		box = document.createElement('div');
		box.id="wtOverview";
		element.appendChild(box);
	}
	var innerHTML = '<div class="dynamic" id="WineTracker">';
	innerHTML += '<h3 class="header" style="line-height: 28px; text-align: center">'+wineStr+' ±/'+timeStr + ' '+ toggleStr + '</h3>';
	innerHTML += '<div class="content"><table style="margin:8px;border:none;">';
	for (var each in data) {
		if (data[each]['relationship']=='ownCity') {
			var cityId = data[each]["id"];
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
				innerHTML += "/index.php?view=city&cityId=";
				innerHTML += cityId;
				innerHTML += '"';
				if (title!="") { innerHTML += ' title="'+title+'"' };
				innerHTML += '>';
				innerHTML += data[each]["name"] + '</a></td></tr>';
				
			}
		}
	}
	innerHTML += '<tr><td align="right"><b>' + wtNormIntString(sum, true) + '&nbsp;</b></td><td><b>Σ</b></td></tr></table>';
	innerHTML += "<p>"+linkForUpdate+"</p>";
	innerHTML += '</div></div>';
	box.innerHTML = innerHTML;
	document.getElementById("wtToggle").addEventListener("click", wtToggleView, true);
}

//-----------------------------------------------------------------------------
function wtMain(view) {
	// scan infos
	var resCityId=wtGetRessourcesCityId();
	wtScanWine(resCityId, view!='');
	if (view == 'tavern') { wtScanTavern() };
	// extend
	if (view == 'port')	{ wtExtendPort() };
	if (view == 'merchantNavy')	{ wtOverview() };
}

var linkForUpdate = getLinkForUpdate();

unsafeWindow.ajax.Responder.wtChangeHTML = unsafeWindow.ajax.Responder.changeHTML;
unsafeWindow.ajax.Responder.changeHTML = function(params, replaceView) {
	var id = params[0];
	unsafeWindow.ajax.Responder.wtChangeHTML(params, replaceView);
	setTimeout( function() { wtMain(id); }, 0);
}

