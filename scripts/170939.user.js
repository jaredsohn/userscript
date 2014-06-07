// ==UserScript==
// @name       MapStatus
// @namespace  http://alx0id.tmweb.ru/
// @version    0.1
// @description  Shows status for map sectors
// @match      http://www.heroeswm.ru/map.php*
// @copyright  2013, AlX0id
// ==/UserScript==

trackClan = {};
trackClan["15"] = 1;
//trackClan["41"] = 1;

trackTerr = {};
trackTerr["19"] = 1;
trackTerr["20"] = 1;
trackTerr["21"] = 1;
trackTerr["22"] = 1;

if (true) // территории
{
// 0-15 = ист (2)
// 16-31 = тайгерс (3)
// 32-47 = рогус (4)
// 48-63 = вульф (5)
// 64-79 = писфул (6)
// 80-95 = лизард (7)
// 96-111 = гринвуд (8)
// 112-127 = иглс (9)
// 128-143 = портал (10)
// 144-159 = драконы (11)
// 160-175 = родник (12)
// 176-191 = сансити (13)
// 192-207 = магма (14)
// 208-223 = мишки (15)
// 224-239 = фейри (16)
// 240-255 = порт (17)
// 256-271 = мифрил (18)
// 272-287 = стена (19)
// 288-303 = титаны (20)
// 304-319 = село (21)
// 320-335 = замок (22)
// 336-351 = степь (23)
// 352-367 = сад (24)

terr = [];
pushed = terr.push(new Object);
terr[pushed-1].num = 2;
terr[pushed-1].name = 'East River';

pushed = terr.push(new Object);
terr[pushed-1].num = 3;
terr[pushed-1].name = 'Tiger Lake';

pushed = terr.push(new Object);
terr[pushed-1].num = 4;
terr[pushed-1].name = 'Rogues\' Wood';

pushed = terr.push(new Object);
terr[pushed-1].num = 5;
terr[pushed-1].name = 'Wolf Dale';

pushed = terr.push(new Object);
terr[pushed-1].num = 6;
terr[pushed-1].name = 'Peaceful Camp';

pushed = terr.push(new Object);
terr[pushed-1].num = 7;
terr[pushed-1].name = 'Lizard Lowland';

pushed = terr.push(new Object);
terr[pushed-1].num = 8;
terr[pushed-1].name = 'Green Wood';

pushed = terr.push(new Object);
terr[pushed-1].num = 9;
terr[pushed-1].name = 'Eagle Nest';

pushed = terr.push(new Object);
terr[pushed-1].num = 10;
terr[pushed-1].name = 'Portal Ruins';

pushed = terr.push(new Object);
terr[pushed-1].num = 11;
terr[pushed-1].name = 'Dragons\' Caves';

pushed = terr.push(new Object);
terr[pushed-1].num = 12;
terr[pushed-1].name = 'Shining Spring';

pushed = terr.push(new Object);
terr[pushed-1].num = 13;
terr[pushed-1].name = 'Sunny City';

pushed = terr.push(new Object);
terr[pushed-1].num = 14;
terr[pushed-1].name = 'Magma Mines';

pushed = terr.push(new Object);
terr[pushed-1].num = 15;
terr[pushed-1].name = 'Bear Mountain';

pushed = terr.push(new Object);
terr[pushed-1].num = 16;
terr[pushed-1].name = 'Fairy Trees';

pushed = terr.push(new Object);
terr[pushed-1].num = 17;
terr[pushed-1].name = 'Port City';

pushed = terr.push(new Object);
terr[pushed-1].num = 18;
terr[pushed-1].name = 'Mithril Coast';

pushed = terr.push(new Object);
terr[pushed-1].num = 19;
terr[pushed-1].name = 'Great Wall';

pushed = terr.push(new Object);
terr[pushed-1].num = 20;
terr[pushed-1].name = 'Titans\' Valley';

pushed = terr.push(new Object);
terr[pushed-1].num = 21;
terr[pushed-1].name = 'Fishing Village';

pushed = terr.push(new Object);
terr[pushed-1].num = 22;
terr[pushed-1].name = 'Kingdom Castle';

pushed = terr.push(new Object);
terr[pushed-1].num = 23;
terr[pushed-1].name = 'Ungovernable Steppe';

pushed = terr.push(new Object);
terr[pushed-1].num = 24;
terr[pushed-1].name = 'Crystal Garden';
}

subsectors = [];

sides = [];
sides.push('С');
sides.push('В');
sides.push('Ю');
sides.push('З');

e0 = getI("//OBJECT[contains(@data, \"http://dcdn.heroeswm.ru/swffiles/map.swf\")]");

//data="http://dcdn.heroeswm.ru/swffiles/map.swf?ver=654556080";

//alert(e0.snapshotLength);

//alert(e0.snapshotItem(0).innerHTML);
//alert(e0.snapshotItem(0).childNodes[1].value);
par = e0.snapshotItem(0).childNodes[1].value;

arr = par.split(':');

par = arr[arr.length-1];
arr2 = par.split('|');

for (var i in arr2) {
    
	if(arr2[i]=="")
	{
		continue;
	}
	sub_state = new Object;
	state = arr2[i].split('~');
	sub_state.num = state[0];
	sub_state.unknownParam = state[1];
	sub_state.occupied = state[2];
	sub_state.owner = state[3];
	sub_state.ownerIcon = state[4];
	
	num = String(sub_state.num); 
	terrNum = num.substring(0, num.length-2)-0;
	subNum = num.substring(num.length-2);
	sideNum = subNum.substring(0,1);
	subSubNum = subNum.substring(1,2) - 1 + 2;
	sub_state.regionName = terr[terrNum-2].name+'-<b>'+sides[sideNum]+'</b>'+subSubNum;
	
	sub_state.region = terrNum;
	
	subsectors.push(sub_state);
	
}

e2 = getI("//A[@href=\"ecostat.php\"]");
parent = e2.snapshotItem(0).parentNode;

// Наши
table = document.createElement('TABLE');
tbody = document.createElement('TBODY');

tr = document.createElement('TR');
tr.innerHTML = "<TD><B>Наши сектора</B></TD>";
tbody.appendChild(tr);

tr = document.createElement('TR');
tr.innerHTML = "<TD class=\"wbwhite\">Клан</TD><TD class=\"wbwhite\">Регион</TD><TD class=\"wbwhite\">Влияние (%)</TD>";
tbody.appendChild(tr);

for (var i in subsectors) 
{
	if(subsectors[i].owner in trackClan)
	{
		tr = document.createElement('TR');
		perc = 100 - subsectors[i].occupied;
		tr.innerHTML = "<TD class=\"wblight\" align=\"center\"><a href=\"clan_info.php?id=" + subsectors[i].owner + "\"><img src=\"http://dcdn.heroeswm.ru/i_clans/l_" + subsectors[i].owner + 
						".gif\" width=\"20\" height=\"15\" border=\"0\" align=\"absmiddle\"></a></TD><TD class=\"wblight\" align=\"center\">" + 
						subsectors[i].regionName + "</TD><TD class=\"wblight\" align=\"center\">" + perc + "</TD>";
		
		tbody.appendChild(tr);
	}
}
table.appendChild(tbody);
parent.appendChild(table);

// Свободные
table = document.createElement('TABLE');
tbody = document.createElement('TBODY');

tr = document.createElement('TR');
tr.innerHTML = "<TD><A HREF=\"http://www.heroeswm.ru/mwlog.php\"><B>Свободные сектора</B></A></TD>";
tbody.appendChild(tr);

tr = document.createElement('TR');
tr.innerHTML = "<TD class=\"wbwhite\">Клан</TD><TD class=\"wbwhite\">Регион</TD><TD class=\"wbwhite\">Влияние (%)</TD>";
tbody.appendChild(tr);

for (var i in subsectors) 
{
	if(subsectors[i].owner == "0")
	{
		tr = document.createElement('TR');
		perc = 100 - subsectors[i].occupied;
		color = getColor(perc);
		tr.innerHTML = "<TD class=\"wblight\" align=\"center\"><a href=\"clan_info.php?id=" + subsectors[i].owner + "\"><img src=\"http://dcdn.heroeswm.ru/i_clans/l_" + subsectors[i].owner + 
						".gif\" width=\"20\" height=\"15\" border=\"0\" align=\"absmiddle\"></a></TD><TD class=\"wblight\" align=\"center\">" + 
						subsectors[i].regionName + "</TD><TD class=\"wblight\" align=\"center\"> <font color=\"" + color + "\">" + perc + "</font></TD>";
		
		tbody.appendChild(tr);
	}
}

table.appendChild(tbody);
parent.appendChild(table);

// Отслеживаемые
table = document.createElement('TABLE');
tbody = document.createElement('TBODY');

tr = document.createElement('TR');
tr.innerHTML = "<TD><B>Отслеживаемые сектора</B></TD>";
tbody.appendChild(tr);

tr = document.createElement('TR');
tr.innerHTML = "<TD class=\"wbwhite\">Клан</TD><TD class=\"wbwhite\">Регион</TD><TD class=\"wbwhite\">Влияние (%)</TD>";
tbody.appendChild(tr);

for (var i in subsectors) 
{
	if(subsectors[i].region in trackTerr)
	{
		tr = document.createElement('TR');
		perc = 100 - subsectors[i].occupied;
		color = getColor(perc);
		tr.innerHTML = "<TD class=\"wblight\" align=\"center\"><a href=\"clan_info.php?id=" + subsectors[i].owner + "\"><img src=\"http://dcdn.heroeswm.ru/i_clans/l_" + subsectors[i].owner + 
						".gif\" width=\"20\" height=\"15\" border=\"0\" align=\"absmiddle\"></a></TD><TD class=\"wblight\" align=\"center\">" + 
						subsectors[i].regionName + "</TD><TD class=\"wblight\" align=\"center\"> <font color=\"" + color + "\">" + perc + "</font></TD>";
		
		tbody.appendChild(tr);
	}
}

table.appendChild(tbody);
parent.appendChild(table);

// par = arr2.join(' ');

// a = document.createElement('TEXTAREA');
// a.title = "Параметры карты";
// a.cols = 150;
// a.rows = 40;
// a.innerHTML = par;

//document.body.appendChild(a);

function getI( xpath )
{
    return document.evaluate( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
}

function getColor(percent)
{
	col = "black";
	if(percent > 60 && percent<100)
	{
		col = "gray";
	}
	if(percent < 60)
	{
		col = "red";
	}
	return col;
}