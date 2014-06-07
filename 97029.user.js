// ==UserScript==
// @name           ikariam.GameStats.org
// @namespace      http://ikariam.gamestats.org
// @description    This Plugin helps Users updating their Ikariam data und reports for GameStats.org. 
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

const GS_VERSION = 2.2;
var server = 1;
var lang = 'de';
var cityname = '';
var islandX = '';
var islandY = '';

getInfos();

var apikey = GM_getValue('API_'+lang+'_'+server, '');

const language = {
	'de':	{	optionsheader: 'GameStats.org Einstellungen', apitext: 'API-Key', apibutton: 'Speichere API-Key!', apisaved: 'API wurde gespeichert.', text_townhall: 'Speichere Stadt', text_buildings: 'Speichere Gebäude', text_island: ' Automatisch Inseln einlesen', text_troops: 'Speichere Truppen', text_fleet: 'Speichere Flotte', text_espionage: 'Speichere Spionagebericht', text_combat: 'Speichere Kampfbericht', text_stats: ' Automatisch Stats einlesen', searchbutton_title: 'GameStats Suche', unknown: 'Unbekannt' }, 
	'org':	{	optionsheader: 'GameStats.org Settings', apitext: 'API-Key', apibutton: 'Save API-Key!', apisaved: 'API was saved.', text_townhall: 'Save town', text_buildings: 'Save buildings', text_island: ' Save island', text_troops: 'Save troops', text_fleet: 'Save fleet', text_espionage: 'Save espionage report', text_combat: 'Save combat report', text_stats: 'Save stats', searchbutton_title: 'GameStats search', unknown: 'Unknown' }, 
	'com':	{	optionsheader: 'GameStats.org Settings', apitext: 'API-Key', apibutton: 'Save API-Key!', apisaved: 'API was saved.', text_townhall: 'Save town', text_buildings: 'Save buildings', text_island: ' Save island', text_troops: 'Save troops', text_fleet: 'Save fleet', text_espionage: 'Save espionage report', text_combat: 'Save combat report', text_stats: 'Save stats', searchbutton_title: 'GameStats search', unknown: 'Unknown' }, 
}[lang];

function onPageLoad() {
	var href = document.location.href;

	var page = getCurrentPageDetails(href);
	// determine the page if the page was posted and there is no query appended
	if (page == null) {
		page = getCurrentPageByContent(document.getElementById('mainview').innerHTML);
	}
	
	if (page != null) {
		if (page == 'townhall') {
			var box = createOptionsLayer('bottom', 160, 24, 0);

			box.firstChild.appendChild(createButton('gamestats-save-'+page, language.text_townhall));
			document.getElementById('mainview').appendChild(box);
			addEventListener('click', checkAction, false);
		} else if (page == 'buildings') {
			var box = createOptionsLayer('bottom', 130, 2, 0);

			box.firstChild.appendChild(createButton('gamestats-save-'+page, language.text_buildings));
			document.getElementById('mainview').appendChild(box);
			addEventListener('click', checkAction, false);
		} else if (page == 'island') {
			var box = createOptionsLayer('bottom', 160, 2, 0);
			
			if (lang == 'de') {
				var checkbox = document.createElement("input");
				id = document.createAttribute("id");
				var type = document.createAttribute("type");
				id.nodeValue = "gamestats-activate-auto-islands";
				type.nodeValue = "checkbox";
				checkbox.setAttributeNode(id);
				checkbox.setAttributeNode(type);
				if (GM_getValue('auto-islands_'+lang+'_'+server, '')) {
					var checked = document.createAttribute("checked");
					checked.nodeValue = "checked";
					checkbox.setAttributeNode(checked);
				}
				box.firstChild.appendChild(checkbox);
							
				var label =  document.createElement("label");
				var for_id = document.createAttribute("for");		
				for_id.nodeValue = "gamestats-activate-auto-galaxy";
				label.setAttributeNode(for_id);
				label.appendChild(document.createTextNode(language.text_island));
				box.firstChild.appendChild(label);
				
				document.getElementById('mainview').appendChild(box);
				addEventListener('click', checkAction, false);
				
				if (GM_getValue('auto-islands_'+lang+'_'+server, '') && document.getElementById("gamestats-options-informations") == null) {
					sendRequest("il", location.href, getIslandView());
					displayInformation("&nbsp;");
				}
			} else {
				box.firstChild.appendChild(createButton('gamestats-save-'+page, language.text_island));
				document.getElementById('mainview').appendChild(box);
				addEventListener('click', checkAction, false);
			}
			addSeachButtons();
		} else if (page == 'troops') {
			var box = createOptionsLayer('bottom', 160, 24, 0);

			box.firstChild.appendChild(createButton('gamestats-save-'+page, language.text_troops));
			document.getElementById('mainview').appendChild(box);
			addEventListener('click', checkAction, false);
		} else if (page == 'fleet') {
			var box = createOptionsLayer('bottom', 160, 24, 0);

			box.firstChild.appendChild(createButton('gamestats-save-'+page, language.text_fleet));
			document.getElementById('mainview').appendChild(box);
			addEventListener('click', checkAction, false);
		} else if (page == 'espionage') {
			var box = createOptionsLayer('bottom', 200, 24, 0);

			box.firstChild.appendChild(createButton('gamestats-save-'+page, language.text_espionage));
			document.getElementById('mainview').appendChild(box);
			addEventListener('click', checkAction, false);
		} else if (page == 'combat') {
			var box = createOptionsLayer('bottom', 160, 24, 0);

			box.firstChild.appendChild(createButton('gamestats-save-'+page, language.text_combat));
			document.getElementById('mainview').appendChild(box);
			addEventListener('click', checkAction, false);
		} else if (page == 'stats') {
			var box = createOptionsLayer('top', 160, 30, 180);
			
			if (lang == 'de') {
				var checkbox = document.createElement("input");
				id = document.createAttribute("id");
				var type = document.createAttribute("type");
				id.nodeValue = "gamestats-activate-auto-stats";
				type.nodeValue = "checkbox";
				checkbox.setAttributeNode(id);
				checkbox.setAttributeNode(type);
				if (GM_getValue('auto-stats_'+lang+'_'+server, '')) {
					var checked = document.createAttribute("checked");
					checked.nodeValue = "checked";
					checkbox.setAttributeNode(checked);
				}
				box.firstChild.appendChild(checkbox);
							
				var label =  document.createElement("label");
				var for_id = document.createAttribute("for");		
				for_id.nodeValue = "gamestats-activate-auto-stats";
				label.setAttributeNode(for_id);
				label.appendChild(document.createTextNode(language.text_stats));
				box.firstChild.appendChild(label);
				
				document.getElementById('mainview').appendChild(box);
				addEventListener('click', checkAction, false);
				
				if (GM_getValue('auto-stats_'+lang+'_'+server, '') && document.getElementById("gamestats-options-informations") == null) {
					sendRequest("st", location.href, getMainView());
					displayInformation("&nbsp;");
				}
			} else {
				box.firstChild.appendChild(createButton('gamestats-save-'+page, language.text_stats));
				document.getElementById('mainview').appendChild(box);
				addEventListener('click', checkAction, false);
			}	
		} else if (page == 'options') {
			addMySettings();
		}
	}
}

function addSeachButtons() {
	for (var i=0; i<17; i++) {
		var li = document.getElementById('cityLocation'+i);
		var match = /<li class="owner"><span class="textLabel">.*?<\/span>(.*?)\s*<a/.exec(li.innerHTML);
		if (match != null) {
			var ul = null;
			var player = match[1];
			player = player.replace(/&nbsp;/gi, " ");
			var allTags = li.getElementsByTagName("*");
			for (var j=0; j<allTags.length; j++) {
				if (allTags[j].className == 'cityactions') {
					ul = allTags[j];
				}
			}
			if (ul != null) {
				var gsli = document.createElement('li');
				var gsspan = document.createElement('span');
				var gsa = document.createElement('a');
				gsa.href = 'http://ikariam.gamestats.org/'+server+'/details/player/'+player;
				gsa.title = language.searchbutton_title;
				gsa.target = '_blank';
				gsspan.setAttribute('class', 'textLabel');
				gsspan.innerHTML = language.searchbutton_title;
				gsa.appendChild(gsspan);
				gsli.appendChild(gsa);
				gsli.setAttribute('class', 'espionage');
				gsli.setAttribute('title', language.searchbutton_title);
				ul.appendChild(gsli);
			}
		}
	}
}

function getInfos() {
	var url = document.location.href;
	var matches = /s(\d+)\.([a-z]+)\..*?\.com\//i.exec(url);
	if (matches != null) {
		server = matches[1];
		lang = matches[2];
	}
	var breadcrumbs = document.getElementById('breadcrumbs').innerHTML;
	matches = /islandX=(\d+)&amp;islandY=(\d+)/.exec(breadcrumbs);
	if (matches != null) {
		islandX = matches[1];
		islandY = matches[2];
	} 
	matches = /city.*?>(.*?)</.exec(breadcrumbs);
	if (matches != null) {
		cityname = matches[1];
	}
}

function checkAction(event) {
	switch (event.target.getAttribute("id")) {
		case "gamestats-save-townhall":
			sendRequest("th", document.location.href, getTownhall());
			break;
		
		case "gamestats-save-buildings":
			sendRequest("bu", document.location.href, getBuildings());
			break;
			
		case "gamestats-save-troops":
			sendRequest("tr", document.location.href, getTroops());
			break;
			
		case "gamestats-save-fleet":
			sendRequest("fl", document.location.href, getFleet());
			break;
			
		case "gamestats-save-combat":
			sendRequest("cr", document.location.href, getMainView());
			break;
			
		case "gamestats-save-espionage":
			sendRequest("er", document.location.href, getMainView());
			break;
		
		case "gamestats-save-island":
			sendRequest("il", document.location.href, getIslandView());
			break;
		
		case "gamestats-save-stats":
			sendRequest("st", document.location.href, getMainView());
			break;
		
		case "gamestats-activate-auto-islands":
			GM_setValue('auto-islands_'+lang+'_'+server, event.target.checked);
			break;
		
		case "gamestats-activate-auto-stats":
			GM_setValue('auto-stats_'+lang+'_'+server, event.target.checked);
			break;
	}
}

function getIslandView() {
	var text = document.getElementById('mainview').innerHTML;
	
	text = text.replace(/\n*/g,'');
	text = text.replace(/<ul class="cityactions">.*?<\/ul>/g,'');

	return text;
}

function getTownhall() {
	var text = document.getElementById('CityOverview').innerHTML;
	
	text = text.replace(/<.*?>/g,'');
	text = text.replace(/".*?"/g,'');
	var numbers = text.match(/[\d\.,-]+/g);
	numbers = numbers.join('#');
	
	var info = document.getElementById('SatisfactionOverview').innerHTML;
	var wine = [0, 0];
	if (info.search(/<div class="serving"/) > -1) {
		wine = /<div class="serving".*?><span.*?([\d\.,]+)</.exec(info);
	}
	
	return numbers+'|'+wine[1];
}

function getBuildings() {
	var text = document.getElementById('mainview').innerHTML;
	var buildings = text.match(/"textLabel">(.*?)</g);
	buildings = buildings.join('#');
	
	var info = document.getElementById('information').innerHTML;
	var owner = ['', ''];
	if (info.search(/<li class="owner">/) > -1) {
		owner = /<li class="owner">\n*\s*<span class="textLabel">.*?<\/span>(.*?)\n*\s*<\/li>/.exec(info);
	} else if (info.search(/<div class="occupation_warning">/) > -1) {
		owner[1] = language.unknown;
	}
	
	return owner[1]+'|'+buildings;
}

function getTroops() {
	var text = document.getElementById('mainview').innerHTML;
	
	var firstrow = /<tr class="count">\n*\s*<td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td>\n*\s*<\/tr>/.exec(text);
	text = text.replace(/<tr class="count">/,'');
	firstrow.shift();
	firstrow = firstrow.join("#");
	var secondrow = /<tr class="count">\n*\s*<td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td>\n*\s*<\/tr>/.exec(text);
	secondrow.shift();
	secondrow = secondrow.join("#");
	
	return firstrow+'#'+secondrow;
}

function getFleet() {
	var text = document.getElementById('mainview').innerHTML;
	
	var firstrow = /<tr class="count">\n*\s*<td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td>\n*\s*<\/tr>/.exec(text);
	text = text.replace(/<tr class="count">/,'');
	firstrow.shift();
	firstrow = firstrow.join("#");
	var secondrow = /<tr class="count">\n*\s*<td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td><td>([\d\.,\-]+)<\/td>\n*\s*<\/tr>/.exec(text);
	secondrow.shift();
	secondrow = secondrow.join("#");
	
	return firstrow+'#'+secondrow;
}

function getMainView() {
	var text = document.getElementById('mainview').innerHTML;
	return text;
}

function createButton(id_value, text) {
	var button = document.createElement("button");
	var id = document.createAttribute("id");
	var style = document.createAttribute("style");
	id.nodeValue = id_value;
	style.nodeValue = "display:inline;width:auto;white-space:nowrap;border:3px double #5d4c2f;border-top-color:#c9a584;border-left-color:#c9a584;background:#eccf8e url(input/button.gif) repeat-x;font-weight:bold;font-size:9px;align:center;color:#542c0f;white-space:nowrap;width:auto";
	button.setAttributeNode(id);
	button.setAttributeNode(style);
	button.appendChild(document.createTextNode(text));
	return button;
}
 
function createOptionsLayer(position, width, right, top) {	
	var layer = document.createElement("div");
	var id = document.createAttribute("id");
	var style = document.createAttribute("style");
	id.nodeValue = "gamestats-options";
	style.nodeValue = "-moz-border-radius:5px;margin:2px auto;padding:1px;width:"+width+"px;position: absolute;right: "+right+"px;"+position+": "+top+"px;";
	layer.setAttributeNode(id);
	layer.setAttributeNode(style);
	
	
	var title = document.createElement("div");
	var a = document.createElement("a");
	var tn = document.createTextNode("GameStats.org");
	a.href = 'http://ikariam.gamestats.org';
	a.label = 'GameStats.org';
	a.target = '_blank';
	a.setAttribute('style', 'color:#b03937;');
	a.appendChild(tn);
	title.appendChild(a);
	style = document.createAttribute("style");
	style.nodeValue = "color:#b03937;text-align:right;font-size:9px;";
	title.setAttributeNode(style);

	var content = document.createElement("div");
	id = document.createAttribute("id");
	style = document.createAttribute("style");
	id.nodeValue = "gamestats-options-content";
	style.nodeValue = "color:#542c0f;text-align:center;-moz-border-radius:2px;padding:2px;border:1px solid #e4b873;background-color:#faeac6;font-size:9px;opacity: .9;";
	content.setAttributeNode(id);
	content.setAttributeNode(style);

	content.appendChild(title);
	layer.appendChild(content);
	
	return layer;
}

function getCurrentPageDetails(href) {
	// These are currently the only pages where gs adds a button
	if (href.search(/\?view=townHall/i) > -1) {
		return 'townhall';
	} else if (href.search(/\?view=island&/i) > -1) {
		return 'island';
	} else if (href.search(/\?view=militaryAdvisorReportView&combatId/i) > -1) {
		return 'combat';
	} else if (href.search(/\?view=cityMilitary-army/i) > -1) {
		return 'troops';
	} else if (href.search(/\?view=cityMilitary-fleet/i) > -1) {
		return 'fleet';
	} else if (href.search(/\?view=safehouseReports/i) > -1 || href.search(/\?action=Espionage&function=executeMission/i) > -1) {
		return 'espionage';
	} else if (href.search(/\?view=city/i) > -1 || href.search(/\?action=loginAvatar&function=login/i) > -1) {
		return 'buildings';
	} else if (href.search(/\?view=highscore/i) > -1) {
		return 'stats';
	} else if (href.search(/\?view=options/i) > -1) {
		return 'options';
	}
	return null;
}

function getCurrentPageByContent(body) {
	if (body.search(/<ul id="locations">/) > -1) {
		return 'buildings';
	} else if (body.search(/<div id="CityOverview" class="contentBox">/) > -1) {
		return 'townhall';
	} else if (body.search(/\/\s*Troops\*\//) > -1) {
		return 'troops';
	} else if (body.search(/\/\s*Fleets\*\//) > -1) {
		return 'fleet';
	} else if (body.search(/<select name="highscoreType">/) > -1) {
		return 'stats';
	}
	return null;
}

function addMySettings() {
	var mainview = document.getElementById('mainview');
	if (mainview != null) {
		addSettingsHTML(mainview);
		
		var button = document.getElementById('gsapibutton');
		button.addEventListener('click', saveAPI, true);
	}
}

function saveAPI() {
	var apikey = document.getElementById('gamestatsapi').value;
	
	if (apikey != null) {
		GM_setValue('API_'+lang+'_'+server, apikey);
		
		document.getElementById('apireturnbox').innerHTML = language.apisaved;
		document.getElementById('gsapibutton').blur();
	}
}

function addSettingsHTML(mainview) {
		
		var options = document.createElement('div');
		options.setAttribute('class', 'contentBox01h');
		options.setAttribute('id', 'gamestatsOptions');
		
		var h3 = document.createElement('h3');
		h3.setAttribute('class', 'header');
		
		var span = document.createElement('span');
		span.setAttribute('class', 'textLabel');
		
		var content = document.createElement('div');
		content.setAttribute('class', 'content');
		
		var input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('class', 'textfield');
		input.setAttribute('id', 'gamestatsapi');
		input.setAttribute('size', '30');
		input.setAttribute('value', apikey);
		
		var apibuttondiv = document.createElement('div');
		apibuttondiv.setAttribute('class', 'centerButton');
		
		var apireturnbox = document.createElement('div');
		apireturnbox.setAttribute('id', 'apireturnbox');
		apireturnbox.setAttribute('style', 'text-align: center');
		
		var apiinput = document.createElement('input');
		apiinput.setAttribute('type', 'submit');
		apiinput.setAttribute('class', 'button');
		apiinput.setAttribute('id', 'gsapibutton');
		apiinput.setAttribute('value', language.apibutton);
		
		apibuttondiv.appendChild(apiinput);
		
		var table = document.createElement('table');
		var tr = document.createElement('tr');
		
		var th = document.createElement('th');
		th.appendChild(document.createTextNode(language.apitext));
		var td = document.createElement('td');
		td.appendChild(input);
		
		tr.appendChild(th);
		tr.appendChild(td);
		table.appendChild(tr);

		content.appendChild(table);
		content.appendChild(apibuttondiv);
		content.appendChild(apireturnbox);
		span.appendChild(document.createTextNode(language.optionsheader));
		h3.appendChild(span);
		options.appendChild(h3);
		options.appendChild(content);
	
		mainview.appendChild(options);
}

function sendRequest(mode, url, string) {
	if (string.length > 0) {
		var parameters = "v="+GS_VERSION+"&api="+apikey+"&lang="+lang+"&server="+server+"&cityname="+cityname+"&islandx="+islandX+"&islandy="+islandY+"&m="+mode+"&url="+escape(url)+"&s="+escape(string);
		GM_xmlhttpRequest({
    		method: 'POST',
   			url: 'http://ikariam.gamestats.org/backend.cgi',
    		headers: {
				'Content-type' : 'application/x-www-form-urlencoded',
        		'User-agent': navigator.userAgent,
        		'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
    		},
			data: parameters,
			onload: function(r) {
				extensionStatus(r);
			}
		});
	}
}
	
function extensionStatus(r) {
	if (r.readyState == 4) {
	    if (r.status == 200) {
	    	displayInformation(r.responseText);
		} else {
	        alert("There was a problem with the request. Please try again! ("+r.status+")");
		}
  	}
}

function displayInformation(string) {
	var main = document.getElementById("gamestats-options-informations");

	if (main == null) {
		var text = document.createElement("div");
		id = document.createAttribute("id");
		style = document.createAttribute("style");
		id.nodeValue = "gamestats-options-informations";
		style.nodeValue = "border-top:1px solid #808080;padding:2px;";
		text.setAttributeNode(id);
		text.setAttributeNode(style);
		document.getElementById("gamestats-options-content").appendChild(text);
	}		
	document.getElementById("gamestats-options-informations").innerHTML += string;
}

window.addEventListener('load', onPageLoad, true);