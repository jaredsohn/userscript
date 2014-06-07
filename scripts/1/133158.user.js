// ==UserScript==
// @name	mIkariam View Enhancements
// @version	m045.2
// @namespace	mIkaMEV
// @description	Multimple View Enhancements
// @include	http://m*.ikariam.com/index.php*
// @exclude	http://*.support*
// ==/UserScript==
//-----------------------------------------------------------------------------

// update part 
var scriptName = "BetterView";
var scriptID = 133158;
var thisVersion="045.2";
var update = "all";

function linkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	var time="";
	if (thisVersion == GM_getValue("thisVersion","")) { time += new Date().getDate(); }
	else { GM_setValue("thisVersion",thisVersion); }
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
	}
	var needsUpdate;
	if (update == "system") { needsUpdate = (thisVersion.split(".")[0]) != (newestVersion.split(".")[0]); }
	else { needsUpdate = thisVersion != newestVersion; }
	var innerHTML = '<a href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (needsUpdate) { innerHTML += scriptName + ' <b>new version '+newestVersion+'!</b></a>'; }
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
	if (object.state=="vacation" | (object.state < state && state !== "vacation")) { object.state=state; }
	return object;
}

function trFromNode(node) {
	if (!node | node.tagName=='TR') { return node; }
	return trFromNode(node.parentNode);
}

function imageFor(state) {
	switch (state) {
		case "online":
			return 'skin/layout/bulb-on.gif';
		case "vacation":
			return 'skin/layout/icon-palm.gif';
		case "inactive":
			return 'skin/layout/bulb-inactive.gif'; //http://www.nooooooooooooooo.com/
		default:
			return 'skin/layout/bulb-off.gif';
	}
}

function displayReplacement(html) {
	var node = document.getElementById("tab4");
	if (node) { 
		node.innerHTML=html;
		return;
	}
	node = document.getElementById("mainview");
	node.innerHTML='<div>'+node.getElementsByTagName("div")[0].innerHTML+'</div><div>'+html+'</div>';
}

function getMap() {
	var memberList = document.getElementById("memberList");
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
	var html = '<table><tbod>';
	var colStart;
	var colStop;
	odd=rMin!=(2*(Math.floor(rMin/2)));
	var w= Math.ceil((680/(cMax-cMin)));
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
					html += '"/><div><table><tr><td colspan="2">['+x+':'+y+']</td></tr>';
					player='';
					for (city=0; city<map[x][y].list.length; city++) {
						html += '<tr><td>';
						var playerTD = trFromNode(map[x][y].list[city]).getElementsByTagName('td');
						if (player!=playerTD[2].innerHTML) {
							player = playerTD[2].innerHTML;
							html += player;
							html += '</td><td><img width="'+w+'" src="'+imageFor(playerTD[0].className)+'"/>';
						} else {
							html += '</td><td>';
						}
						html += '</td><td>';
						html += (/(.*)\[(\d+)\:(\d+)\]/).exec(map[x][y].list[city].textContent)[1];
						html += '</td></tr>';
					}
					html += '</table></div></a></td>';
					gap=1;
				} else { gap += 2; }
			}
			x += 1;
		}
		html+= '</tr>';
	}
	html += '</tbody></table>';
	GM_addStyle( 
		"#friends {display: none;}" +
		".citiesTip div {display: none;}" +
		".citiesTip:hoover div {display: block;}" +
		".citiesTip{ position:relative; z-index:24; }"+
		".citiesTip:hover { z-index:25; }"+
		".citiesTip div{ display: none;  }"+
		".citiesTip:hover  div{ font-weight:100;display:block; position:absolute; top: 1.5em; left: 3em; width:18em; z-index:30;}"+
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
	var memberList = document.getElementById("memberList");
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
	var html ='<div class="contentBox01h"><h3 class="header"><span class="textLabel">Städteliste ('+cityList.length+')</span></h3>';
	html += '<table cellspacing="10" cellpadding="10" id="cityList"><thead><tr>';
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
	if (td.className=="online") { td.className="offline"; }
	else { td.className="online"; }
}

function insertOfftime(allyBox) {
	var memberList = document.getElementById("memberList");
	var th = memberList.getElementsByTagName("th");
	var tr = memberList.getElementsByTagName("tr");
	var player;
	// insert offtime column for tHead
	var node = document.createElement('th');
	node.innerHTML ='-';
	tr[0].insertBefore(node,th[1]);

	// check the table
	var now = new Date().getTime();
	for (player=1; player<tr.length ; player++) { // skip first, it's the thead
		// per player
		var td=tr[player].getElementsByTagName("td");
		// insert offtime column for player
		node = document.createElement('td');
		td[0].addEventListener("click", switchTD, true);
		if (td[0].className !== "online")  { // check non-online player
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
				if (diff>1 && (diff>20 | (td[0].className == "offline"))) { td[1].innerHTML = '<b>' + td[1].innerHTML +'</b>'; }
				// mask invalid date
				if (diff>3650) { node.innerHTML = '???'; }
				// display offtime
				else if (diff>0) { node.innerHTML = diff +'T'; }
			}
		}
		// always insert the column
		tr[player].insertBefore(node,td[1]);
	}
	var html = '<tr><td/></tr><tr><td>'+linkForUpdate()+'</td>';
	html += '<td><a style="cursor: pointer" id="showCityList">Städteliste</a> / <a style="cursor: pointer" id="showCityMap">Online-Karte</a></td></tr>';
	allyBox.getElementsByTagName("tbody")[0].innerHTML+= html;
	document.getElementById("showCityList").addEventListener("click", getCityList, true);
	document.getElementById("showCityMap").addEventListener("click", getMap, true);
}

//-----------------------------------------------------------------------------

function cityTRSort(a, b) {
	if (a.childNodes[0].textContent == b.childNodes[0].textContent) {
		return citynameSort(a.childNodes[1],b.childNodes[1]);
	} else {
		if (a.childNodes[0].textContent < b.childNodes[0].textContent) { 
			return -1; }
		else { 
			return 1; 
		}
	}
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
	var mainview = document.getElementById("mainview");
	var crumps = document.getElementById("breadcrumbs");
	var div = document.getElementById("infocontainer");
	var content = document.getElementById("information");
	var table = document.createElement('table');
	var tbody = document.createElement('tbody');
	table.className="cityinfo";
	table.appendChild(tbody);
	var cityList = new Array();
	var addOns = new Array();
	for (var i=0; i<17; i++)
	{	var city = document.getElementById("cityLocation"+i);
		if (city.className == "cityLocation city level0")
		{	var reportLink = city.getElementsByTagName("a")[1];
			var cityId = parseInt((/\d+/).exec(reportLink.href.split("&target=")[1]),10);
			var playerId = parseInt((/\d+/).exec(reportLink.href.split("&avatarId=")[1]),10);
			var patch = document.createElement('patch');
			var onClick = "selectCity("+i+", "+cityId+", 0); selectGroup.activate(this, 'cities'); return false;";
			var innerHTML = '<a href="#" id="city_'+cityId+'" onclick="'+onClick+'">';
			innerHTML += '<span class="textLabel"><span class="before"></span>Polis<span class="after"></span></span></a>';
			patch.innerHTML = innerHTML;
			city.insertBefore(patch.firstChild, city.getElementsByTagName("ul")[0]);
			patch.innerHTML = '<a href="?view=sendIKMessage&receiverId='+playerId+'" class="messageSend" title="Nachricht schicken"><img src="skin/interface/icon_message_write.gif" alt="Nachricht schicken"/></a>';
			node = city.getElementsByTagName("li")[2].getElementsByTagName("a")[0];
			node.innerHTML = patch.firstChild.innerHTML;
		}
		var div = city.getElementsByTagName("div");
		for (var j=0; j<div.length; j++) {
			var title = div[j].title;
			if (title) {
				var tr = document.createElement('tr');
				tr.innerHTML='<td colspan="3">'+title+'</td>';
				addOns.push(tr);
			}
		}
		var td = city.getElementsByTagName("td");
		if (td.length>1) {
			var tr = document.createElement('tr');
			tr.innerHTML='<td><b>'+deblank(td[10].textContent)+'</b></td><td>'+deblank(td[7].textContent)+getPlayerStateFrom(city)+'</td><td></td>'
			cityList.push(tr);
		}
	}
	if (cityList.length == 0) { return; }
	var tr = document.createElement('tr');
	tr.innerHTML='<td></td><td>'+linkForUpdate()+'</td><td></td>';
	tbody.appendChild(tr);
	cityList.sort(cityTRSort);
	var ally;
	var player;
	var alt=false;
	var lastInsert;
	for (var i=0; i<cityList.length; i++) {
		if (ally == cityList[i].childNodes[0].textContent) {
			// same ally
			if (player == cityList[i].childNodes[1].textContent) {
				// same player
				cityList[lastInsert].childNodes[2].textContent = '('+(1+i-lastInsert)+'x)';
			} else {
				// new player
				if (ally=='-') { alt = !alt }
				else { cityList[i].childNodes[0].textContent=''; };
				if (alt) { cityList[i].className='alt'; }
				lastInsert = i;
				tbody.appendChild(cityList[i]);
			}
		} else {
			alt = !alt ;
			if (alt) { cityList[i].className='alt'; }
			ally = cityList[i].childNodes[0].textContent;
			lastInsert = i;
			tbody.appendChild(cityList[i]);
		}
		player = cityList[i].childNodes[1].textContent;
	}
	for (var i=0; i<addOns.length; i++) {
		tbody.appendChild(addOns[i]);
	}
	content.appendChild(table);
	patchSmasha(document.getElementById("city_196449"),'1');
	patchSmasha(document.getElementById("city_91413"),'2');
	patchSmasha(document.getElementById("city_157300"),'3');
	patchSmasha(document.getElementById("city_65964"),'4');
	patchSmasha(document.getElementById("city_217066"),'5');
}

//-----------------------------------------------------------------------------

// Show income bold if citizens are maxed out

function wtExtendFinances() {// highlight full cities
	var server = document.domain;
	var table = document.getElementById("mainview").getElementsByTagName("table");
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
	node.innerHTML=linkForUpdate();
	document.getElementById("mainview").insertBefore(node,table[0]);
}

//-----------------------------------------------------------------------------

// Check maximum income per city

function incomeFrom(div) {
	var img = div.getElementsByTagName("img");
	if (img.length>1) { return parseInt(img[img.length-1].nextSibling.nodeValue,10); }
	else { return 0; } // kein Gold
}

function wtScanGold()
{// how much gold can be earned?
	var server = document.domain;
	var cityNr = document.getElementById("citySelect").options.selectedIndex;
	var popG = document.getElementById("PopulationGraph");
	var cov = document.getElementById("CityOverview");
	var space = cov.getElementsByTagName("li")[0].getElementsByTagName("span");
	var pop = parseInt(space[1].innerHTML,10);
	var maxPop = parseInt(space[2].innerHTML,10);
	var citizens = parseInt(popG.getElementsByTagName("div")[0].getElementsByTagName("span")[1].innerHTML,10);
	var goldC = incomeFrom(popG.getElementsByTagName("div")[0]);
	var scale = Math.round(goldC/citizens); // speedserver?
	var goldP = incomeFrom(popG.getElementsByTagName("div")[4]); // priests
	var sat = document.getElementById("happinessLarge").getElementsByTagName("div")[1]; 
	var happy = parseInt(sat.innerHTML,10);
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
		var li = document.getElementById('tradeRouteForm'+i).getElementsByTagName('li');
		for ( var j=0; j<li.length; j++ ) {
			if (li[j].className=="status") {
				var status=li[j];
				var title = status.title;
				if (!title) {
					title = status.getElementsByTagName('span')[0].innerHTML;
					status.title=title;
				}
				status.innerHTML = '<img src="skin/img/icon_journeytime.gif"/><span title="" style="font-size:16px;font-weight:bold;">'+xyTTdistance(start, stop)+'</span><br><span style="font-weight:bold;color:green;">'+title+'<span>';
				return;
			}
		}
		i++;
	};
}

//-----------------------------------------------------------------------------

//ally Highscore

function enhanceAllyHighscore() {
	var tr = document.getElementById('mainview').getElementsByTagName('tbody')[1].getElementsByTagName('tr');
	for (var i=1; i<tr.length; i++) {
		var td = tr[i].getElementsByTagName('td');
		var total = parseInt(td[2].innerHTML.replace(/\D/g, ''),10);
		var average = parseInt(td[3].innerHTML.replace(/\D/g, ''),10);
		var player = Math.round(total/average);
		td[3].innerHTML += ' (' + player + 'x)';
	}
}

function scanDiplomacyTabLabels() {
	var server = document.domain;
	var tr = document.getElementById('allyinfo').getElementsByTagName('tr');
	var a = tr[6].getElementsByTagName('a')[0];
	var memberlist = a.title;
	if (memberlist!=GM_getValue(server+'memberlist', ''))
		{ GM_setValue(server+'memberlist', memberlist) };
	var div = document.getElementById('mainview').getElementsByTagName('div');
	var h = div[2].getElementsByTagName('h3')[0];
	var forum = h.innerHTML;
	if ((memberlist!=forum)&&(forum!=GM_getValue(server+'forum', '')))
		{ GM_setValue(server+'forum', forum) };
}

function patchDiplomacyTabs() {
	var server = document.domain;
	var td = document.getElementById('tabz').getElementsByTagName('td');
	var a = td[3].getElementsByTagName('a')[0];
	var regex = (/(\(.*\))/).exec(a.innerHTML);
	a.innerHTML = '<em>'+ (GM_getValue(server+'forum', 'Forum'))+' '+regex[1]+'</em>';
	var isList = (/listAllyMembers/).exec(document.location.href);
	if (isList) { td[3].className = ""; }
	td[3].parentNode.appendChild(td[3].cloneNode(true));
	if (isList) { td[3].className = "selected"; }
	else {  td[3].className = ""; }
	GM_addStyle( "div.diplomacyAdvisorTabs table#tabz td {text-align: centered; width: 20%;}" );
	GM_addStyle( 'div.diplomacyAdvisorTabs #tabz td.selected a, div.diplomacyAdvisorTabs #tabz td a:hover {background-size: 90% 100%}' );
	a.innerHTML = '<em>'+(GM_getValue(server+'memberlist', 'List'))+'</em>';
	a.href += '&listAllyMembers=1';
}


function hideGFbar() {
	var bar = document.getElementById('mmonetbar');
	if (bar) {
		bar.style.display="none";
		GM_addStyle( "#extraDiv1 {top: 0px;}" );
		GM_addStyle( "#extraDiv2 {top: 147px;}" );
		GM_addStyle( "#container {top: 0px !important;}" );
		GM_addStyle( "#GF_toolbar {top: 2px !important;}" );
	}
}

//-----------------------------------------------------------------------------

function main() {
	hideGFbar();
	var	view = document.getElementsByTagName("body")[0].id;
	switch (view) {
		case 'embassy':
			insertOfftime(document.getElementById("mainview").getElementsByTagName("table")[0]);
			break;

		case 'diplomacyAdvisor':
		case 'diplomacyAdvisorOutBox':
		case 'diplomacyAdvisorTreaty':
			patchDiplomacyTabs();
			break;

		case 'diplomacyAdvisorAlly':
			scanDiplomacyTabLabels();
			patchDiplomacyTabs();
			insertOfftime(document.getElementById("allyinfo"));
			break;

		case 'townHall':
			wtScanGold();
			break;

		case 'island':
			displayIslandOverview();
			break;

		case 'finances':
			wtExtendFinances();
			break;
			
		case 'tradeAdvisorTradeRoute':
			enhanceTradeRoutes();
			break;
			
		case 'allyHighscore':
			enhanceAllyHighscore();
			break;
	}
}

//-----------------------------------------------------------------------------

main();