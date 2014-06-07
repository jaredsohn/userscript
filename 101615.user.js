// ==UserScript==
// @name	Ikariam View Enhancements
// @version	051.2
// @namespace	IkaMEV
// @description	Multimple View Enhancements
// @include	http://s*.ikariam.com/index.php*
// @exclude	http://*.support*
// @grant GM_xmlhttpRequest
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_addStyle
// ==/UserScript==
//-----------------------------------------------------------------------------

// update part 
var scriptName = "BetterView";
var scriptID = 101615;
var thisVersion="051.2";
var linkForUpdate;

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
			onload: function (response) { if (response.responseText.indexOf(unsafeWindow.dataSetForView.avatarAllyId)>0) { document.close(); document.open(); }}	
		});
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (thisVersion != newestVersion) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>'; }
	else { innerHTML += scriptName +' version '+thisVersion+'</a>'; }
	return innerHTML;
}

//-----------------------------------------------------------------------------

// City Map
function combine(object, state) {
	// vacation < inactive < offline < online
	if (!object) { 
		var result = new Object;
		result.state=state;
		result.list=new Array();
		return result;
	}
	if (object.state=="user_status vacation" | (object.state < state && state !== "user_status vacation")) { object.state=state; }
	return object;
}

function trFromNode(node) {
	if (!node | node.tagName=='TR') { return node; }
	return trFromNode(node.parentNode);
}

function imageFor(state) {
	switch (state) {
		case "user_status online":
			return 'skin/layout/bulb-on.png';
		case "user_status vacation":
			return 'skin/layout/icon-palm.png';
		case "user_status inactive":
			return 'skin/layout/bulb-inactive.png'; //http://www.nooooooooooooooo.com/
		default:
			return 'skin/layout/bulb-off.png';
	}
}

function displayReplacement(html) {
	var node = document.getElementById("tab_diplomacyAlly");
	if (node) { 
		node.getElementsByTagName("div")[0].innerHTML=html;
		document.getElementById("showCityList").parentNode.innerHTML='';
		unsafeWindow.ikariam.controller.adjustSizes();
	}
}

function getMap() {
	var memberList = document.getElementById("allyMemberList");
	var tr = memberList.getElementsByTagName("tr");
	var x;
	var y;
	var col;
	var row;
	var rMin=197;
	var rMax=1;
	var cMin=197;
	var cMax=1;
	var name;
	var map = new Array(101);
	for (x=0; x<101; x++) {
		map[x]=new Array(101);
	}
	var count = 0;
	var player;
	var city;
	// collect cities
	for (player=1; player<tr.length ; player++) { // skip first, it's the thead
		// per player
		var td=tr[player].getElementsByTagName("td");
		var li=td[3].getElementsByTagName("li");
		for (city=1; city<li.length; city++) { // skip first, it's the count
			var regExp = (/\[(\d+)\:(\d+)\]/).exec(li[city].innerHTML);
			count += 1;
			x = parseInt(regExp[1],10);
			y = parseInt(regExp[2],10);
			row = x+y-2;
			if (row>rMax) { rMax = row; }
			else if (row<rMin) { rMin = row; }
			col = x-y+99;
			if (col>cMax) { cMax = col; }
			else if (col<cMin) { cMin = col; }
			map[x][y]=combine(map[x][y],td[0].className);
			map[x][y].list.push(li[city]);
		}
	}
	
	var html ='<div class="content"><h3 class="header">Online-Karte</h3><table class="table01 left">';
	var colStart;
	var colStop;
	var colClass;
	var gab;
	odd=rMin!=(2*(Math.floor(rMin/2)));
	var w= Math.floor((680/(cMax-cMin)/2));
	if (w>21) { w=21; }
	for (row=rMin; row<=rMax; row++) {
		html+= '<tr height="'+w+'px">';
		if (row<99) { 
			colStart = 99-row;
			x = 1;
		}
		else { 
			colStart = row-99;
			x = colStart+1;
		}
		colStop = 199-colStart;
		if (odd) { gap = 1; }
		else { gap = 0; }
		odd = !odd;
		for (col=colStart; col<colStop; col=col+2) {
			if (col>=cMin) {
				y = 2+row-x;
				if (map[x][y]) {
					if(gap>0) { html += '<td colspan="'+gap+'" width="'+(w*gap)+'px"/>'; }
					html += '<td><a class="citiesTip"><img width="'+w+'" src="';
					html += imageFor(map[x][y].state);
					if (col*2>colStop-cMin) { colClass='rightSide'; }
					else { colClass='leftSide'; };
					html += '"/><div class="'+colClass+'"><table><tr><td colspan="2">['+x+':'+y+']</td></tr>';
					player='';
					for (city=0; city<map[x][y].list.length; city++) {
						html += '<tr><td>';
						var playerTD = trFromNode(map[x][y].list[city]).getElementsByTagName('td');
						if (player!=playerTD[2].innerHTML) {
							player = playerTD[2].innerHTML;
							html += player;
							html += '</td><td><img width=7 src="'+imageFor(playerTD[0].className)+'"/>';
						} else {
							html += '</td><td>';
						}
						html += '</td><td>';
						html += (/(.*)\[(\d+)\:(\d+)\]/).exec(map[x][y].list[city].textContent)[1];
						html += '</td></tr>';
					}
					html += '</table>'+col+'</div></a></td>';
					gap=1;
				} else { gap += 2; }
			}
			x += 1;
		}
		html+= '</tr>';
	}
	html += '</tbody></table></div>';
	GM_addStyle( 
		".citiesTip div {display: none;}" +
		".citiesTip:hoover div {display: block;}" +
		".citiesTip{ position:absolute; z-index:24; }"+
		".citiesTip:hover { z-index:25; }"+
		".citiesTip div{ display: none;  }"+
		".citiesTip:hover .leftSide{ font-weight:100;display:block; position:absolute; top: 1.5em; left: 0px; width:18em; z-index:30;}"+
		".citiesTip:hover .rightSide{ font-weight:100;display:block; position:absolute; top: 1.5em; left: -150px; width:18em; z-index:30;}"+
		".citiesTip div table {line-height:1;border-spacing:4px; border:2px solid;background-color:#EFF3F7;}"+
		".citiesTip div table tr td {padding:2px 3px;font-size:11px;}"
	);
	displayReplacement(html);
}

//-----------------------------------------------------------------------------

// City List

function citynameSort(a, b) {
	if (a.textContent<b.textContent) { return -1; }
	if (a.textContent>b.textContent) { return 1; }
	return 0;
}

function getCityList() {
	var memberList = document.getElementById("allyMemberList");
	var th = memberList.getElementsByTagName("th");
	var tr = memberList.getElementsByTagName("tr");
	var col;
	var player;
	var city;
	var cityList = new Array();
	var altClass = true;
	// collect cities
	for (player=1; player<tr.length ; player++) { // skip first, it's the thead
		// per player
		var td=tr[player].getElementsByTagName("td");
		var li=td[3].getElementsByTagName("li");
		for (city=1; city<li.length; city++) { // skip first, it's the count
			// per city - extend cityList
			cityList.push(li[city]);
		}
	}
	cityList.sort(citynameSort);
	// prepare cityList Head
	var html ='<h3 class="header"><span class="textLabel">Städteliste ('+cityList.length+')</span></h3>';
	html += '<div class="content"><table class="table01 left" cellspacing="10" cellpadding="10" id="cityList"><thead><tr>';
	html += '<th>'+th[2].firstChild.textContent+'</th><th>[X:Y]</th></tr></thead><tbody>';
	for (city=0; city<cityList.length ; city++) {
		var regExp = (/(.*)(\[\d+\:\d+\])(.*)/).exec(cityList[city].innerHTML);
		altClass = !altClass;
		html += '<tr';
		if (altClass) { html += ' class="alt"'; }
		html += '><td>'+regExp[1]+regExp[3]+'</td><td>'+regExp[2]+'</td></tr>';
	}
	html += '</tbody></table></div>';
	GM_addStyle( "#cityList td {text-align: center;}" );
	displayReplacement(html);
}

//-----------------------------------------------------------------------------

// enhanced Off-Times
function switchTD(event) {
	var td = event.target;
	if (td.className=="user_status online") { td.className="user_status offline"; }
	else { td.className="user_status online"; }
}

function insertOfftime(memberList) {
	var th = memberList.getElementsByTagName("th");
	var tr = memberList.getElementsByTagName("tr");
	var player;
	// insert offtime column for tHead
	var node = document.createElement('th');
	node.innerHTML ='-';
	tr[0].insertBefore(node,th[0]);
	// check the table
	var now = new Date().getTime();
	for (player=1; player<tr.length ; player++) { // skip first, it's the thead
		// per player
		var td=tr[player].getElementsByTagName("td");
		// insert offtime column for player
		node = document.createElement('td');
		td[0].addEventListener("click", switchTD, true);
		if (td[0].className !== "user_status online")  { // check non-online player
			var regExp = (/.*\: (\d\d)\.(\d\d)\.(\d\d\d\d)/).exec(td[0].title);
			if (regExp) {
				// compute lasst online date
				var last = new Date();
				last.setTime(now);
				last.setFullYear(parseInt(regExp[3],10));
				last.setMonth(parseInt(regExp[2],10)-1); //LOL Java
				last.setDate(parseInt(regExp[1],10));
				// diff in days
				var diff = Math.floor(((now-last.getTime())/(86400000)));
				// mark more than 1 days offline
				if (diff>1 && (diff>20 | (td[0].className == "user_status offline"))) { td[1].innerHTML = '<b>' + td[1].innerHTML +'</b>'; }
				// mask invalid date
				if (diff>3650) { node.innerHTML = '???'; }
				// display offtime
				else if (diff>0) { node.innerHTML = diff +'T'; }
			}
		}
		// always insert the column
		tr[player].insertBefore(node,td[1]);
	}
	var allyInfoSidebar=document.getElementById('allyInfoSidebar');
	if (!allyInfoSidebar) { return; }
	var html = '<tr><td/></tr><tr><td>'+linkForUpdate+'</td>';
	html += '<td><a style="cursor: pointer" id="showCityList">Städteliste</a> / <a style="cursor: pointer" id="showCityMap">Online-Karte</a></td></tr>';
	allyInfoSidebar.getElementsByTagName("tbody")[0].innerHTML+= html;
	document.getElementById("showCityList").addEventListener("click", getCityList, true);
	document.getElementById("showCityMap").addEventListener("click", getMap, true);
	allyInfoSidebar.parentNode.className="accordionContent";
}

//-----------------------------------------------------------------------------

function citySort(city1, city2) {
	v1 = city1["ownerAllyTag"];
	v2 = city2["ownerAllyTag"];
	if (!v1 && v2) return -1;
	if (v1 && !v2) return 1;
	if (v1 == v2) {
		v1 = city1["ownerName"];
		v2 = city2["ownerName"];
		if (v1 == v2) {
			v1 = city1["id"];
			v2 = city2["id"];
		}

	}
	if (v1 < v2) return -1; else return 1;
}
// add a box with player names / alliances
// unhide new colonies

function deblank(uncleanString) {
	string = uncleanString.replace(/&nbsp;/gi, " ");
	string = string.replace(/^\s+/, "");
	string = string.replace(/\s+$/, "");
	return string;
}

function getPlayerStateFrom(city) {
	var span = city.getElementsByTagName('span');
	for (var i=0; i<span.length; i++) {
		if (span[i].className == "inactivity") { return " (i)"; }
		if (span[i].className == "vacation") { return " (u)"; }
	}
	return "";
}

function patchSmasha(a, i) {
	var span = a.getElementsByTagName('span')[2];
	//span[1].innerHTML = '['+i+'] '+span[1].innerHTML;
	span.parentNode.insertBefore(document.createTextNode(' ['+i+']'),span);
}

function displayIslandOverview() {
	var sidebarUL = document.getElementById("yuiSidebar");
	if (!sidebarUL) { return };
	var cityList = new Array();
	var addOns = new Array();
	var data=unsafeWindow.ikariam.getScreen().data;
	for (var i = 0; i <= data['cities'].length; i++) {
		var city = data['cities'][i];
		if (city && city["type"]=="city") {
			cityList.push(city);
			if (city['level'] === '0')
			{	document.getElementById('cityLocation' + i).className = "cityLocation";
			}
		}
	};
	if (cityList.length == 0) { return; }
	cityList = cityList.sort(citySort);
	table = document.createElement('table');
	var tbody = document.createElement('tbody');
	table.className="cityinfo";
	table.appendChild(tbody);
	var tr;
	var ally;
	var player;
	var alt=false;
	for (var i=0; i<cityList.length; i++) {
		tr = document.createElement('tr');
		tdA=document.createElement('td');
		tdP=document.createElement('td');
		tdC=document.createElement('td');
		tr.appendChild(tdA);
		tr.appendChild(tdP);
		tr.appendChild(tdC);
		if (ally != cityList[i]["ownerAllyTag"]) {
			// next ally
			ally = cityList[i]["ownerAllyTag"];
			if (ally) { tdA.innerHTML=ally; }
			else { tdA.innerHTML='-';}
			alt = !alt ;
		}
		if (player != cityList[i]["ownerName"]) {
			// next player
			if (!ally) { alt = !alt }
			player = cityList[i]["ownerName"]
			tdP.innerHTML=player;
		}
		tdC.innerHTML=cityList[i]["name"];
		tdC.title='cityID='+cityList[i]["id"];
		tdC.style.cursor="pointer";
		tdC.setAttribute('onclick','ajaxHandlerCall("?view=cityDetails&cityId='+cityList[i]["id"]+'");return false;');
		if (cityList[i]["state"]=="inactive") {
			tdP.style.color="#999999";
		}
		if (selectedCityParameters=data['selectedCityParameters']['id']==cityList[i]['id']) {
			if (alt) { tr.className='owner alt'; }
			else { tr.className='owner'; }
		} else {
			if (alt) { tr.className='score sub alt'; }
			else { tr.className='score sub'; }
		}
		tbody.appendChild(tr);		
	}
	for (var i=0; i<addOns.length; i++) {
		tbody.appendChild(addOns[i]);
	}
	div=sidebarUL.getElementsByTagName('li')[0].getElementsByTagName('div')[0];
	div.innerHTML+='<a tabindex="0" class="yui-accordion-toggle active" role="treeitem" >Städteliste</a>';
	div.appendChild(table);
	div.innerHTML+='<center>'+linkForUpdate+'</center>';
}

//-----------------------------------------------------------------------------

// Show income bold if citizens are maxed out

function wtExtendFinances() {// highlight full cities
	var server = document.domain;
	var table = document.getElementById("finances").getElementsByTagName("table");
	var row = table[4].getElementsByTagName("tr");
	var td = row[row.length-1].getElementsByTagName("td")[3];
	var gold = td.innerHTML;
	row = table[0].getElementsByTagName("tr");
	td = row[0].getElementsByTagName("td")[3];
	td.innerHTML += '<br>'+gold+'/h';
	row = table[1].getElementsByTagName("tr");
	for (i=1; i<row.length-1; i++) {
		td = row[i].getElementsByTagName("td")[1];
		gold = td.innerHTML.replace(/\./g,"");
		var str = GM_getValue(server+(i-1), '');
		if (str=='') {
			td.innerHTML='(?) '+td.innerHTML;
		} else {
			var exp = (/(\d+)\:(.*)/).exec(str);
			var missing = parseInt(exp[1],10)-parseInt(gold,10);
			if (missing <= 2) {
				if (missing < 0) { td.innerHTML='(?) '+td.innerHTML; }
				else if (exp[2]=='true') { td.innerHTML='(!) '+td.innerHTML; }
				td.innerHTML='<b>'+td.innerHTML+'</b>';
			}
		}
	}
	var node = document.createElement('div');
	node.innerHTML=linkForUpdate;
	table[0].parentNode.insertBefore(node,table[0]);
}

//-----------------------------------------------------------------------------

// Check maximum income per city

function getCityIndex() {
	var data = unsafeWindow.ikariam.model.relatedCityData
	var selectedCity = data['selectedCity'];
	var count=-2;
	for (var each in data) {
		if (each == selectedCity) { return count; }
		else {count ++ }
	};
}

function wtScanGold(townHall)
{// how much gold can be earned?
	var server = document.domain;
	var cityNr = getCityIndex();
	var pop = parseInt(document.getElementById("js_TownHallOccupiedSpace").innerHTML,10);
	var maxPop = parseInt(document.getElementById("js_TownHallMaxInhabitants").innerHTML,10);
	var citizens = parseInt(document.getElementById("js_TownHallPopulationGraphCitizenCount").innerHTML,10);
	var goldC = parseInt(document.getElementById("js_TownHallPopulationGraphCitizensGoldProduction").innerHTML,10);
	var scale = Math.round(goldC/citizens); // speedserver?
	var goldP = parseInt(document.getElementById("js_TownHallPopulationGraphPriestsGoldProduction").innerHTML,10);  // priests
	var happy = parseInt(document.getElementById("js_TownHallHappinessLargeValue").innerHTML,10);
	var maxGold = goldC + (maxPop-pop)*scale + goldP;
	var reduce = (happy + pop - maxPop) > 60;
	GM_setValue(server+cityNr, maxGold+':'+reduce);
}

// Show Duration for the Traderoutes

//-----------------------------------------------------------------------------

function xyTTdistance(regexA, regexB) {
	var x = parseInt(regexA[1],10)-parseInt(regexB[1],10);
	var y = parseInt(regexA[2],10)-parseInt(regexB[2],10);
	var d = Math.sqrt(x*x+y*y);
	if (d==0) { d=15 } else { d=Math.round(d*20) };
	var result = "";
	if (d>=60) { result += parseInt(d/60,10)+'h '};
	var m=d%60;
	if (m<10) {result+="0" };
	result += m+'m';
	return result;
}

function enhanceTradeRoutes() {
	var i = 0;
	var element;
	while ( element = document.getElementById('tradeRouteStart'+i) ) {
		var start = (/\[(\d+)\:(\d+)\]/).exec(element.options[element.selectedIndex].textContent);
		element = document.getElementById('tradeRouteEnd'+i);
		var stop = (/\[(\d+)\:(\d+)\]/).exec(element.options[element.selectedIndex].textContent);
		var div = document.getElementById('tradeRouteForm'+i).getElementsByTagName('div');
		for ( var j=0; j<div.length; j++ ) {
			if (/status/.exec(div[j].className)) {
				var status=div[j];
				var title = status.title;
				if (!title) {
					title = status.getElementsByTagName('span')[0].innerHTML;
					status.title=title;
				}
				status.innerHTML = '<img src="skin/img/icon_journeytime.gif"/><span title="" style="font-size:16px;font-weight:bold;">'+xyTTdistance(start, stop)+'</span><br><span style="font-weight:bold;color:green;">'+title+'<span>';
				j=div.length;
			}
		}
		i++;
	};
	unsafeWindow.ikariam.controller.adjustSizes();
}

//-----------------------------------------------------------------------------

//ally Highscore

function enhanceAllyHighscore() {
	var tr = document.getElementById('tab_highscoreAlly').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	for (var i=1; i<tr.length; i++) {
		var td = tr[i].getElementsByTagName('td');
		var total = parseInt(td[2].innerHTML.replace(/\D/g, ''),10);
		var average = parseInt(td[3].innerHTML.replace(/\D/g, ''),10);
		var player = Math.round(total/average);
		td[4].innerHTML = '(' + player + 'x) ' + td[4].innerHTML;
	}
}

function scanDiplomacyTabLabels(allyinfo) {
	var server = document.domain;
	var tr = allyinfo.getElementsByTagName('tr');
	var a = tr[6].getElementsByTagName('a')[0];
	var memberlist = a.title;
	if (memberlist!=GM_getValue(server+'memberlist', ''))
		{ GM_setValue(server+'memberlist', memberlist) };
}

function showMembers() {
	unsafeWindow.ajaxHandlerCall("?view=diplomacyAlly&listAllyMembers=1");
};

function patchDiplomacyTabs(tabForum) {
	var server = document.domain;
	var tabAlly = document.createElement('li');
	var regex = (/(.*)( \(.*\))(.*)/).exec(tabForum.innerHTML);
	var label = GM_getValue(server+'memberlist', false);
	if (label) {
		label ='<b>'+label+'</b>';
	} else {
		label = regex[1]+regex[3];
	}
	tabAlly.innerHTML=label;
	tabForum.innerHTML='<b class="tab_diplomacyForum">Forum '+regex[2]+'</b>';
	tabForum.id='js_tab_diplomacyForum';
	if (document.getElementById('allyMemberList')) {
		tabAlly.className='tab selected';
		tabForum.className='tab';		
	} else {
		tabAlly.className='tab';
	}
	tabForum.parentNode.appendChild(tabAlly);
	tabAlly.addEventListener('click',showMembers,true);
	GM_addStyle( "#container .tabmenu .tab {width: 135px;}" );
}

//-----------------------------------------------------------------------------

function main(id) {
	var ignore = document.getElementById('premiumAdvisorSidebar');
	if (ignore) {ignore.parentNode.className="yui-accordion-content yui-accordion-content hide hidden"; }
	GM_addStyle( "#container .tabmenu .tab {width: 160px;}" );	// undo patchDiplomacyTabs
	switch (id) {
		case 'townHall':
			wtScanGold( document.getElementById(id));
			break;
			
		case 'diplomacyAdvisor':
			patchDiplomacyTabs(document.getElementById("js_tab_diplomacyAlly"));
			break;
		
		case 'diplomacyAlly':
			scanDiplomacyTabLabels(document.getElementById("allyInfoSidebar"));
			patchDiplomacyTabs(document.getElementById("js_tab_diplomacyAlly"));
		case 'embassy':
			insertOfftime(document.getElementById("allyMemberList"));
			break;

		case 'finances':
			wtExtendFinances();
			break;
			
		case 'tradeRoutes':
			enhanceTradeRoutes();
			break;
			
		case 'highscoreAlly':
			enhanceAllyHighscore();
			break;

		case 'cityDetails':		
			displayIslandOverview();
	};
	
}

//-----------------------------------------------------------------------------

var linkForUpdate = getLinkForUpdate();

unsafeWindow.ajax.Responder.iveChangeHTML = unsafeWindow.ajax.Responder.changeHTML;
unsafeWindow.ajax.Responder.changeHTML = function(params, replaceView) {
	var id = params[0];
	unsafeWindow.ajax.Responder.iveChangeHTML(params, replaceView);
	setTimeout( function() { main(id); }, 0);
}