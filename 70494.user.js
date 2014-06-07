// ==UserScript==
// @name WMD ForumTool
// @version	1.2
// @namespace	wmdFT
// @description	WMD Forums Tool
// @include	http://bund-der-antike.board-log.com*
// @include	http://wmd-epsilon.forumieren.de*
// @include	http://s5.de.ikariam.com*
// @include http://ikariam.gamestats.org*
// @include http://www.ika-world.de/search.php?view=player_details*
// @exclude	http://wmd-epsilon.forumieren.de/*stadteliste*
// @history	1.2 exclude fixed
// @history	1.1 show bDays in WMD Calendar
// @history	1.0 extended for ika.world
// @history	0.9 no need to run with coordinates in your cities dropdown
// @history	0.8 extended, again
// @history	0.7 extended
// @history	0.6 fix for new ikariam url
// @history	0.4 fix for x?x:y?y
// @history	0.3 fix for xx:yy - damm it
// @history	0.2 fix for x:y foo zK bar
// @history	0.1 initial release
// ==/UserScript==


//-----------------------------------------------------------------------------

var cities;
var limit=90; // bold if closer


//-----------------------------------------------------------------------------
function xyTTdistance(xText, yText, regexCity) {
	var x = parseInt(xText)-parseInt(regexCity[1]);
	var y = parseInt(yText)-parseInt(regexCity[2]);
	var d = Math.sqrt(x*x+y*y);
	if (d==0) { d=15 } else { d=Math.round(d*20) };
	var result = "";
	if (d<limit) { result += '<b>'};
	if (d>=60) { result += parseInt(d/60)+'h '};
	var m=d%60;
	if (m<10) {result+="0" };
	result += m+'m';
	if (d<limit) { result += '</b>'};
	return result;
}

//-----------------------------------------------------------------------------
function xyTTnodeFor(regexText,node) {
	var newNode;
	newNode = document.createElement("a");
	var text = '<b>'+regexText[2]+':'+regexText[3]+'</b>';
	text += "<span><table>";
	for (var i=0; i<cities.length; i++) {
		distance = xyTTdistance(regexText[2], regexText[3], /(\d\d?)\:(\d\d?)/.exec(cities[i]));
		text += '<tr><td align="right">' + distance + '</td><td align="left">' + cities[i] + '</td></tr>';
	};
	text += "</table></span>"
	newNode.innerHTML = text
	newNode.className='Coordinates';
	node.parentNode.insertBefore(newNode,node);
}

//-----------------------------------------------------------------------------
function xyTTexpandWith(node, regex) {
	var textNode = document.createTextNode(regex[1]);
	node.parentNode.insertBefore(textNode,node);
	xyTTnodeFor(regex,node);
	node.nodeValue=regex[4];
}

//-----------------------------------------------------------------------------
function xyTTscan(node) {
	if (node.firstChild && node.className!='Coordinates' ) { xyTTscan(node.firstChild) };
	if (node.nextSibling) { xyTTscan(node.nextSibling) };
	if (node.nodeType == 3) 
	{	var regex =/(.*\[)(\d?\d)\:(\d\d?)(\].*)/.exec(node.nodeValue);
		if (regex) { 
			xyTTexpandWith(node, regex);
			xyTTscan(node);
		}
	};
}

function xyTTstoredCities() {
	if (!cities) {
		var count = parseInt(GM_getValue("count", "0"));
		cities = new Array();
		for (var i=0; i<count; i++) { cities[i]=GM_getValue("city_"+i, "") }
	};
	return cities
}

function xyTTExtendTable(regex, table) {
	var tr = table.getElementsByTagName('tr');
	var node;
	for (var i=0; i<cities.length; i++) {
		distance = xyTTdistance(regex[2], regex[3], /(\d\d?)\:(\d\d?)/.exec(cities[i]));
		if (i<tr.length) { node = tr[i] } 
		else { 
			node = document.createElement('tr');
			table.appendChild(node);
		};
		node.innerHTML = '<td align="right">' + distance + '</td><td>' + cities[i] + '</td>';
	}
}
//-----------------------------------------------------------------------------

function xyTTExtendMap() {
	var infos = document.getElementById("information");
	var tbody = infos.getElementsByTagName('tbody')[1];
	if (!tbody) {
		tbody = document.createElement('tbody');
		var table = document.createElement('table');
		table.className = 'distanceTable';
		table.appendChild(tbody);
		var div = document.createElement('div');
		div.className = 'content';
		div.appendChild(table);
		infos.insertBefore(div , infos.lastElementChild);
	};
	var crumps = document.getElementById("islandBread");
	var regex =/(.*\[)(\d?\d)\:(\d\d?)(\].*)/.exec(crumps.textContent);
	xyTTExtendTable(regex, tbody);
}
//-----------------------------------------------------------------------------
function xyTTexpandIsland() {
	var mainview = document.getElementById("mainview");
	var div = document.createElement('div');
	var header = document.createElement('h3');
	var content = document.createElement('div');
	var table = document.createElement('table');
	var tbody = document.createElement('tbody');
	div.className = 'dynamic';
	header.className = 'header';
	header.innerHTML = 'Entfernungen';
	content.className = 'content';
	table.className = 'distanceTable';
	div.appendChild(header);
	table.appendChild(tbody);
	content.appendChild(table);
	div.appendChild(content);
	mainview.parentNode.insertBefore(div,mainview);
	var crumps = document.getElementById("breadcrumbs");
	var regex =/(.*\[)(\d?\d)\:(\d\d?)(\].*)/.exec(crumps.textContent);
	xyTTExtendTable(regex, tbody);
}

function xyTTscanCities() {
// scan your ikariam locations and store them
	GM_addStyle( ".distanceTable tr td { margin: 2px 2px; padding: 2px 2px; } !important" );
	if (msi=document.getElementById("island")) { return xyTTexpandIsland() }
	var msi=document.getElementById("mapShortcutInput");
	if (!msi) { return };
	var shortcuts=msi.getElementsByTagName('option');
	var count=shortcuts.length;
	if (count==0) { return; };
	if (count!=cities.length) { cities = new Array(); GM_setValue("count", count) };
	for (var i=0; i<shortcuts.length; i++) {
		var string = shortcuts[i].textContent;
		if (cities[i]!=string) { cities[i]=string; GM_setValue("city_"+i, string) };
	};
	var bread = document.evaluate("//div[@id='islandBread']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	bread.snapshotItem(0).addEventListener('DOMSubtreeModified', xyTTExtendMap, true);
	xyTTExtendMap();
}
//-----------------------------------------------------------------------------

function xyTTExtendForum(headlineTag, divName) {
	if (cities.length==0) { return };
	GM_addStyle( 
		"div.post-entry{ overflow:visible; }"+
		"#content-container div#main{ overflow:visible; }"+
		"a.Coordinates{ position:relative; z-index:24; }"+
		"a.Coordinates:hover { z-index:25; }"+
		"a.Coordinates span{ display: none;  }"+
		"a.Coordinates:hover span{ font-weight:100;display:block; position:absolute; top: 1.5em; left: 3em; width:18em; z-index:30;}"+
		"a.Coordinates span table {line-height:1;border-spacing:4px; border:2px solid;background-color:#EFF3F7;}"+
		"a.Coordinates span table tr td {padding:0px;font-size:11px;}");
	var heads = document.getElementsByTagName(headlineTag);
	for (var i=0; i < heads.length; i++)
	{ xyTTscan(heads[i].firstChild) };
	var div = document.getElementsByTagName("div");
	for (var i=0; i < div.length; i++)
		{ if (div[i].className==divName) { xyTTscan(div[i].firstChild) }};	
	var a = document.getElementsByTagName("a");
	for (var i=0; i < a.length; i++)
	{ if (a[i].className=='topictitle') { xyTTscan(a[i].firstChild) }};
	
}

//-----------------------------------------------------------------------------
function xyTTExtendStats() {
	if (cities.length==0) { return };
	GM_addStyle( 
		"div.post-entry{ overflow:visible; }"+
		"#content-container div#main{ overflow:visible; }"+
		"a.Coordinates{ position:relative; z-index:24; }"+
		"a.Coordinates:hover { z-index:25; }"+
		"a.Coordinates span{ display: none;  }"+
		"a.Coordinates:hover span{ font-weight:100;display:block; position:absolute; top: 1.5em; left: 3em; width:18em; z-index:30;}"+
		"a.Coordinates span table {line-height:1;border-spacing:4px; border:2px solid;background-color:#F7E5AF;}"+
		"a.Coordinates span table tr td {padding:2px;font-size:12px;}");
	var tr = document.getElementsByTagName("tr");
	for (var i=0; i < tr.length; i++)
	{ var td=tr[i].getElementsByTagName("td");
		if (td.length>1)
		{	if(td[0].className.match(/k row/))
				{ xyTTscan(td[0]) }};
		}
	
}

//-----------------------------------------------------------------------------
function xyTTExtendIkaWorld() {
	if (cities.length==0) { return };
	GM_addStyle( 
		"div.post-entry{ overflow:visible; }"+
		"#content-container div#main{ overflow:visible; }"+
		"a.Coordinates{ position:relative; z-index:24; }"+
		"a.Coordinates:hover { z-index:25; }"+
		"a.Coordinates span{ display: none;  }"+
		"a.Coordinates:hover span{ font-weight:100;display:block; position:absolute; top: -10em; left: 3em; width:18em; z-index:30;}"+
		"a.Coordinates span table {line-height:1;border-spacing:4px; border:2px solid;background-color:#F7E5AF;}"+
		"a.Coordinates span table tr td {padding:2px;font-size:11px;}");
	var tr = document.getElementsByTagName("tbody")[2].getElementsByTagName("tr");
	for (var i=tr.length-2; i > 0; i--)
	{ 	var td = tr[i].getElementsByTagName("td");
		var text = "<span><table>";
		for (var j=0; j<cities.length; j++) {
			var distance = xyTTdistance(td[2].innerHTML, td[3].innerHTML, /(\d\d?)\:(\d\d?)/.exec(cities[j]));
			text += '<tr><td align="right">' + distance + '</td><td align="left">' + cities[j] + '</td></tr>';
		};
		text += "</table></span>"
		var newNode = td[0].getElementsByTagName("a")[0];
		newNode.innerHTML += text
		newNode.className='Coordinates';
	};
	
}

function extendCalendar() {
	var event = document.getElementById("calendar").getElementsByTagName("a");
	var image = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMGB//EACQQAAEEAQMDBQAAAAAAAAAAAAECAwQRBhIhMQAHIgUTI0JS/8QAFQEBAQAAAAAAAAAAAAAAAAAABAX/xAAgEQEAAAQHAQAAAAAAAAAAAAABAAMT8AIEERIhQaHR/9oADAMBAAIRAxEAPwCwyLunj0ZbsGA/Ilv1QdjJHt6tVadZI5/SQaBsWdul4x3LxtbqYD634Tq1cvIAZQslI0JIJoWbsgDZRNXXWUeo4wqC442/PisTGmgXI0l0IdS99k8gUbJSrg+PIOroh4wZs5caNNiS33Gvgbiuha3XSD40SaAO5UeAL23IC4FnE1OQ0sti7QylHb738j//2Q==';
	var lastCheck = GM_getValue("lastBDayCheck");
	var date = new Date().getDate();
	var day = 0;
	if (lastCheck != date) {
		var lastCheck = GM_setValue("lastBDayCheck", date);
		day = new Date().getDate();
	}
	for (var i=0; i<event.length; i++) {
		if ((/Geburtstag/).exec(event[i].title)) {
			if (event[i].textContent==day) {
				alert('Jemand hat Geburtstag');
			}
			event[i].innerHTML='<img src="'+image+'">';
		}
	}
}

function xyTTmain() {
	var server = document.domain;
	xyTTstoredCities();
	switch (document.domain) {

		case "s5.de.ikariam.com":
			xyTTscanCities();
			break;

		case "bund-der-antike.board-log.com":
			xyTTExtendForum('h1', 'postbody');
			break;

			case "wmd-epsilon.forumieren.de":
			xyTTExtendForum('h3', 'post-entry');
			extendCalendar();
			break;

		case "www.ika-world.de":
			xyTTExtendIkaWorld();
			break;
			
		case "ikariam.gamestats.org":
			xyTTExtendStats();
			break;
	};
}
//-----------------------------------------------------------------------------
xyTTmain();