// ==UserScript==
// @name           ikariam.GameStats.org
// @version        045.4
// @icon           http://s3.amazonaws.com/uso_ss/icon/112852/large.png
// @namespace      http://ikariam.gamestats.org
// @description    This Plugin saves Battle Reports to Gamestats and searches on gamestats, ika-world or ikascore. 
// @include        http://m*.ikariam.com/index.php*
// @include        http://s*.ikariam.com/index.php*
// @include        http://m*.ikariam.com/pillory.php*
// @include        http://s*.ikariam.com/pillory.php*
// @include        http://ikariam.gamestats.org/*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

var GS_VERSION = 2.3;
var server;
var lang = 'de';
var cityname = '';
var islandX = '';
var islandY = '';
var spyReportID = '';
var apikey = '';
var playerURL = 'http://www.google.com/search?q=';
var playerURLTitle = 'google';

// update part 
var scriptName = "GameStats+"
var scriptID = 112852;
var thisVersion="045.4";
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


var language = {
	'de':	{	optionsheader: 'GameStats.org Einstellungen', apitext: 'API-Key', apibutton: 'Speichere API-Key!', apisaved: 'API wurde gespeichert.', text_townhall: 'Speichere Stadt', text_buildings: 'Speichere Gebäude', text_island: ' Automatisch Inseln einlesen', text_troops: 'Speichere Truppen', text_fleet: 'Speichere Flotte', text_espionage: 'Speichere Spionagebericht', text_combat: 'Speichere Kampfbericht', text_stats: ' Automatisch Stats einlesen', searchbutton_title: 'Suche', unknown: 'Unbekannt' }, 
	'org':	{	optionsheader: 'GameStats.org Settings', apitext: 'API-Key', apibutton: 'Save API-Key!', apisaved: 'API was saved.', text_townhall: 'Save town', text_buildings: 'Save buildings', text_island: ' Save island', text_troops: 'Save troops', text_fleet: 'Save fleet', text_espionage: 'Save espionage report', text_combat: 'Save combat report', text_stats: 'Save stats', searchbutton_title: 'Search', unknown: 'Unknown' }, 
	'com':	{	optionsheader: 'GameStats.org Settings', apitext: 'API-Key', apibutton: 'Save API-Key!', apisaved: 'API was saved.', text_townhall: 'Save town', text_buildings: 'Save buildings', text_island: ' Save island', text_troops: 'Save troops', text_fleet: 'Save fleet', text_espionage: 'Save espionage report', text_combat: 'Save combat report', text_stats: 'Save stats', searchbutton_title: 'Search', unknown: 'Unknown' } 
}[lang];

function getPlayerURL() {
	probe = GM_getValue('searchurl_'+server, 'ika-world');
	if (probe=='ika-world') {
		return 'http://www.ika-world.de/search.php?view=player_details&land='+lang+'&welt='+server+'&spieler=';
	}
	if (probe=='ikascore') {
		return 'http://ikascore.com/index.php?country=Germany&server=s'+server+'.'+lang+'.ikariam.com&player=';
	}
	return 'http://ikariam.gamestats.org/'+server+'/details/player/';
}


function searchButtonFor(href, className, name) {
	var li = document.createElement('li');
	var span = document.createElement('span');
	var a = document.createElement('a');
	a.href = href;
	a.title = name;
	a.target = '_blank';
	//span.setAttribute('class', 'textLabel');
	span.innerHTML=name;
	a.appendChild(span);
	li.appendChild(a);
	li.setAttribute('class', className);
	return li;
}

function ownerFrom(node) {
	var tr = node.getElementsByTagName("tr");
	if (tr.length==0) { return null; }
	var string = tr[2].getElementsByTagName("td")[1].textContent;
	string = string.replace(/&nbsp;/gi, " ");
	string = string.replace(/^\s+/, "");
	string = string.replace(/\s+$/, "");
	string = string.replace(/\s/gi, "+");
	return string;
}

function addSeachButtons() {
	// new feature: shows GS favicon instead of spy-image
	var i,j, link;
	var title = playerURL.split(/\/+/g)[1];
	for (i=0; i<17; i++) {
		var li = document.getElementById('cityLocation'+i);
		var player = ownerFrom(li);
		if (player != null) {
			var ul = li.getElementsByTagName("ul");
			for (j=0; j<ul.length; j++) {
				if (ul[j].className == 'cityactions') {
					ul[j].appendChild(searchButtonFor(playerURL+player, 'playersearch',title));
					link = document.createElement("span");
					link.innerHTML=linkForUpdate();
					ul[j].insertBefore(link,ul[j].firstChild);
				}
			}
		}
	}
	//height: 18px width: 60px paddingTop: 36px 
	GM_addStyle('#island #actions .playersearch { background: url("http://'+title+'/favicon.ico") no-repeat scroll center top transparent; background-size: 30px; }');
	
}

function getInfos() {
	var url = document.location.href;
	var matches = /s(\d+)\.([a-z]+)\..*?\.com\//i.exec(url);
	if (matches != null) {
		server = matches[1];
		lang = matches[2];
	} else { 
		var mw = document.getElementById('inner_mw');
		if (mw) {
			var a = mw.getElementsByTagName('a')[0];
			server = /\/(\d+)\//.exec(a.href)[1];
			GM_setValue('lastServer', server);
		} else {
			server = GM_getValue('lastServer', "1");
		}
	}
	playerURL=getPlayerURL();
	playerURLTitle = language.searchbutton_title;
	apikey = GM_getValue('API_'+lang+'_'+server, '');
	var breadcrumbs = document.getElementById('breadcrumbs');
	if (breadcrumbs) {
		matches = /islandX=(\d+)&amp;islandY=(\d+)/.exec(breadcrumbs.innerHTML);
		if (matches != null) {
			islandX = matches[1];
			islandY = matches[2];
		} 
		matches = /city.*?>(.*?)</.exec(breadcrumbs.innerHTML);
		if (matches != null) {
			cityname = matches[1];
		}
	}
}

function spyTextFrom(element) {
	if (element.className=="reportText") { 
		var tbody = element.getElementsByTagName("tbody")[0].cloneNode(true);
		var tr = tbody.getElementsByTagName("tr");
		tbody.removeChild(tr[tr.length-1]);
		var result = '<tr><td class="job">';
		result += document.getElementById("espionageReports").getElementsByTagName("th")[3].innerHTML;
		result += ':</td><td>';
		result += document.getElementById('message'+element.parentNode.id.substring(8)).getElementsByTagName("td")[3].innerHTML;
		result += '</td></tr>';
		result += tbody.innerHTML;
		return result;
	} else { return spyTextFrom(element.parentNode); }
}

function checkAction(event) {
	spyReportID = event.target.getAttribute('spyReportNumber' );
	if (spyReportID) {
		var url = document.domain+'/index.php?view=safehouseReports';
		var html = spyTextFrom(event.target);
		sendRequest("er", url, html );
		return;
	}
	var id = event.target.getAttribute("id");
	switch (id) {
		case "gamestats-save-combat":
			sendRequest("cr", document.location.href, getMainView());
			break;
	}
}

function getMainView() {
	var text = document.getElementById('mainview').innerHTML;
	return text;
}

function createSpyReportButton(spyReportNumber){
	 // a click on any button class element will trigger a reload on the spy reports page :(
	var div =  document.createElement("div");
	var title = document.createElement("div");
	var a = document.createElement("a");
	var tn = document.createTextNode("GameStats.org");
	a.href = 'http://ikariam.gamestats.org';
	a.label = 'GameStats.org';
	a.target = '_blank';
	a.setAttribute('style', 'color:#b03937;');
	a.appendChild(tn);
	title.appendChild(a);
	title.setAttribute('style', "color:#b03937;text-align:right;font-size:9px;");
	div.appendChild(title);
	var button = document.createElement("div");
	button.className="noReport";
	button.appendChild(div);
	a = document.createElement("a");
	a.innerHTML = language.text_espionage;
	a.id="gamestats-save-espionage"+spyReportNumber;
	a.setAttribute('spyReportNumber', spyReportNumber);
	a.addEventListener('click', checkAction , false);
	button.appendChild(a);
	return button;
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
	if (position=='block')
		{ style.nodeValue = "-moz-border-radius:5px;margin:2px auto;padding:1px;width:"+width+"px;position: block;right: "+right+"px;"+position+": "+top+"px;"; }
		else { style.nodeValue = "-moz-border-radius:5px;margin:2px auto;padding:1px;width:"+width+"px;position: absolute;right: "+right+"px;"+position+": "+top+"px;"; }
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
	title.innerHTML+='<br>'+linkForUpdate();
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

function addMySettings() {
	var mainview = document.getElementById('mainview');
	if (mainview != null) {
		addSettingsHTML(mainview);
		
		var button = document.getElementById('gsapibutton');
		button.addEventListener('click', saveAPI, true);
	}
}

function saveAPI() {
	var newValue = document.getElementById('gamestatsapi').value;
	document.getElementById('apireturnbox').innerHTML='';
	if (newValue != null) {
		GM_setValue('API_'+lang+'_'+server, newValue);
		newValue = GM_getValue('API_'+lang+'_'+server, '');
		document.getElementById('apireturnbox').innerHTML += language.apisaved;
	}
	newValue = document.getElementById('searchurl').value;
	
	if (newValue != null) {
		//GM_getValue('searchurl_'+server, 'ika-world')
		GM_setValue('searchurl_'+server, newValue);
		newValue = GM_getValue('searchurl_'+server, '');
		document.getElementById('apireturnbox').innerHTML += 'URL:' + newValue;
	}
}

function addOptionToSelected(optionName, input, selected) {
	var option;
	option = document.createElement('option');
	option.selected=(selected==optionName);
	option.innerHTML=optionName;
	input.appendChild(option);
	input.appendChild(option);

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
		th.innerHTML= '<a href="http://ikariam.gamestats.org/settings" target="_blank">'+language.apitext+'</a> <a href="http://ikariam.gamestats.org/plugin" target="_blank">(?)</a>';
		
		var td = document.createElement('td');
		td.appendChild(input);
		
		tr.appendChild(th);
		tr.appendChild(td);
		table.appendChild(tr);

		input = document.createElement('select');
		//input.setAttribute('type', 'text');
		//input.setAttribute('class', 'textfield');
		input.setAttribute('id', 'searchurl');
		//input.setAttribute('size', '3');
		//input.setAttribute('value', );
		var selected = GM_getValue('searchurl_'+server, 'ika-world');
		addOptionToSelected('gamestats', input, selected);
		addOptionToSelected('ika-world', input, selected);
		addOptionToSelected('ikascore', input, selected);

		var tr = document.createElement('tr');
		
		var th = document.createElement('th');
		th.innerHTML= language.searchbutton_title;
		
		var td = document.createElement('td');
		td.appendChild(input);
		
		tr.appendChild(th);
		tr.appendChild(td);
		table.appendChild(tr);
		
		var footer = document.createElement('div');
		footer.setAttribute('class', 'footer')

		content.appendChild(table);
		content.appendChild(apibuttondiv);
		content.appendChild(apireturnbox);
		content.appendChild(footer);
		span.appendChild(document.createTextNode(language.optionsheader));
		h3.appendChild(span);
		options.appendChild(h3);
		options.appendChild(content);
	
		mainview.appendChild(options);
}

function sendRequest(mode, url, string) {
	if (string.length > 0) {
		var parameters;
		parameters = "v="+GS_VERSION+"&api="+apikey+"&lang="+lang+"&server="+server;
		parameters += "&cityname="+cityname+"&islandx="+islandX+"&islandy="+islandY+"&m="+mode+"&url="+escape(url)+"&s="+escape(string);
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://ikariam.gamestats.org/backend.cgi',
			headers: {
				'Content-type' : 'application/x-www-form-urlencoded',
				'User-agent': navigator.userAgent,
				'Accept': 'application/atom+xml,application/xml,text/xml,text/html'
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
		style = document.createAttribute("style");
		style.nodeValue = "border-top:1px solid #808080;padding:2px;";
		text.setAttributeNode(style);
		if (spyReportID) {
			document.getElementById("gamestats-save-espionage"+spyReportID).parentNode.innerHTML=string;
		} else {
			id = document.createAttribute("id");
			id.nodeValue = "gamestats-options-informations";
			text.setAttributeNode(id);
			document.getElementById("gamestats-options-content").appendChild(text);
		}
	}		
	document.getElementById("gamestats-options-informations").innerHTML += string;
}

function addLinksToTable(tr, playerColumn) {
	var td;
	var name;
	var i;
	for (i=0; i<tr.length; i++) {
		td = tr[i].getElementsByTagName("td");
		if (td.length>0) {
			name = td[playerColumn].textContent;
			var a  = document.createElement("a");
			a.href = playerURL+name;
			a.title = playerURLTitle;
			a.target = 'target="_blank">';
			a.innerHTML += name;
			td[playerColumn].replaceChild(a, td[playerColumn].firstChild);
		}
	}
	var table = tr[0].parentNode.parentNode;
	var link = document.createElement("p");
	link.innerHTML='links by ' + linkForUpdate();
	table.parentNode.insertBefore(link,table);
}

function addLinksToBR(troopsReport) {
	var div = troopsReport.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div");
	var regex = /\s*(.*)(\s+aus\s+<b>.+<\/b>\s*)/;
	var match;
	var i,j;
	for (i=0; i<2; i++) {
		var span = div[i].getElementsByTagName("span")[0];
		var html = span.innerHTML.split(",");
		if ((/<a/).exec(html[0])) { return; }
		var out = '';
		for (j=0; j<html.length; j++) {
			match = regex.exec(html[j]);
			if (j>0) { out += ", "; }
			if (match) {
				out += '<a href="' + serachURL() + match[1] + '" title="' + playerURLTitle + '" target="_blank">' + match[1] + '</a>' + match[2];
			} else { out += html[j]; }
		}
		span.innerHTML=out;
	}
}

function upgadeFleetReports() {
	var unchanged = true;
	var troopsReport = document.getElementById("troopsReport");
	var table = troopsReport.getElementsByTagName('table')[0];
	var thead = table.getElementsByTagName('thead');
	var loss = new Array ( new Array( 0, 0, 0), new Array( 0, 0, 0));
	var rest = new Array ( new Array( 0, 0, 0), new Array( 0, 0, 0));
	for (var t=0; t<thead.length; t++) {
		var th = thead[t].getElementsByTagName('th');
		for (var i=1; i<th.length; i++) {
			var unitCost = null;
			var unitType;
			var div = th[i].getElementsByTagName('div');
			if (div.length>0) { unitType = div[0].className.toString(); }
			switch (unitType) {
				case "fleet s210":
					unitCost = new Array(250, 0, 0); // ram
					break;
				case "fleet s211":
					unitCost = new Array(80, 0, 230); // fire
					break;
				case "fleet s212":
					unitCost = new Array(160, 750, 100); //sub
					break;
				case "fleet s213":
					unitCost = new Array(180, 0, 160); // bal
					break;
				case "fleet s214":
					unitCost = new Array(180, 0, 140); // cat
					break;
				case "fleet s215":
					unitCost = new Array(220, 0, 900); // mortar
					break;
				case "fleet s216":
					unitCost = new Array(400, 0, 800); // steam
					break;
				case "fleet s217":
					unitCost = new Array(200, 0, 1200); // rocket
					break;
				case "fleet s218":
					unitCost = new Array(40, 0, 280); // air def
					break;
				case "fleet s219":
					unitCost = new Array(700, 0, 700); // air att
					break;
				case "fleet s220":
					unitCost = new Array(300, 250, 250) ; // support
					break;
			}
			if (unitCost) {
				unchanged = false;
				var tr = table.getElementsByTagName('tbody')[t].getElementsByTagName('tr');
				var side = 0;
				for (var j=0; j<tr.length; j++) {
					var td = tr[j].getElementsByTagName('td');
					if (td.length<=i) { side = 1; }
					else {
						var regex = /(\d+)\D+(\d+)/.exec(td[i].innerHTML);
						if (regex) {
							var r = parseInt(regex[1]);
							var l = parseInt(regex[2]);
							for (var res = 0; res <3; res++) {
								rest[side][res]+=r*unitCost[res];
								loss[side][res]+=l*unitCost[res];
							}
						}
					}
				}
			}
		}
	}
	if (unchanged) { return; }
	GM_addStyle('#troopsReport table.overview th div.fleet { background-image: url("http://s1.ikariam.com/skin/characters/fleet/buttons_sprite.png");}');
	GM_addStyle('.s217{background-position: -550px 0px}');
	GM_addStyle('.s218{background-position: -500px 0px}');
	GM_addStyle('.s219{background-position: -450px 0px}');
	GM_addStyle('.s220{background-position: -400px 0px}');
	GM_addStyle('.s220{background-position: -400px 0px}');
	var overview = troopsReport.getElementsByTagName('table')[1];
	var td = overview.getElementsByTagName('td');
	for (var side=0; side<2; side++) {
		var r=0;
		var l=0;
		for (var res = 0; res <3; res++) {
			r += rest[side][res];
			l += loss[side][res];
		}
		td[side].innerHTML = r/50+' (-'+l/50+')';
		td[side+2].innerHTML = 
			'<img alt="Baumaterial" src="/img/kbicons/res1.png"> -' + loss[side][0] +
			' <img alt="Kristallglas" src="/img/kbicons/res4.png"> -' + loss[side][1] +
			' <img alt="Schwefel" src="/img/kbicons/res5.png"> -' + loss[side][2];
	}
	var link = document.createElement("p");
	link.innerHTML = 'patched with ' + linkForUpdate();
	var center = document.getElementById('body').getElementsByTagName('center')[0];
	center.insertBefore(link,center.firstChild);
	
}

function getCurrentPageDetails() {
	if ((/http\:\/\/ikariam\.gamestats\.org.*/).exec(document.location.href))
	{	if (document.getElementById("troopsReport")) { return "troopsReport"; }
		else { return null; }
	}
	var	view = document.getElementsByTagName("body")[0].id;
	if (view=="militaryAdvisorReportView") { return 'combat'; }
	if (view=="highscore") { return 'stats'; }
	if (view=="museum") { return 'museum'; }
	if (view=="island") { return 'island'; }
	if (view=="options") { return 'options'; }
	if (view=="safehouse") {
		if (document.getElementById("espionageReports")) { return 'espionage'; }
	}
	if (view=="no-login-umod") { return 'pillory'; }
	return null;
}

function main() {
	getInfos();
	var page = getCurrentPageDetails();
	var box;
	var i;
	if (page == null) { return; }
	if (page == 'island') {
		addSeachButtons();
	} else if (page == 'espionage-disabled') { // I'll try to find out what to do here...
		var tr = document.getElementById('espionageReports').getElementsByTagName("tr");
		for (i=0; i < tr.length; i++) {
			if (tr[i].className=="report") {
				box = createSpyReportButton(i);
				var td = tr[i].getElementsByTagName("td");
				td[td.length-1].appendChild(box);
			}
		}
	} else if (page == 'combat') {
		box = createOptionsLayer('bottom', 160, 24, 0);

		box.firstChild.appendChild(createButton('gamestats-save-'+page, language.text_combat));
		document.getElementById('mainview').appendChild(box);
		box.addEventListener('click', checkAction, false);
	} else if (page == 'stats') {
		addLinksToTable(document.getElementById('mainview').getElementsByTagName("table")[1].getElementsByTagName("tr"),1);
	} else if (page == 'options') {
		addMySettings();
	} else if (page == 'pillory') {
		addLinksToTable(document.getElementById('pilloryTable').getElementsByTagName("tr"),1);
	} else if (page == 'museum') {
		addLinksToTable(document.getElementById('mainview').getElementsByTagName("tr"),1);
	} else if (page == 'troopsReport') {
		upgadeFleetReports();
		addLinksToBR(document.getElementById('troopsReport'));
	}
}

main();