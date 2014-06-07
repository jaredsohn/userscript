// ==UserScript==
// @name           Wer kennt wen? PeopleRelinker
// @namespace      http://felix-kloft.invalid/werkenntwenpeoplerelinker
// @description    Erweitert Personenlisten in "Wer kennt wen?"
// @include        http://www.wer-kennt-wen.de/people.php?*
// @include        http://www.wer-kennt-wen.de/people*
// @include        http://www.wer-kennt-wen.de/search.php?*
// @include        http://www.wer-kennt-wen.de/club_people.php?*
// @include        http://www.wer-kennt-wen.de/club/peopleList/*
// @include        http://www.wer-kennt-wen.de/users/*
// ==/UserScript==

function scanText(text, start, end)
{
	var pos1 = text.indexOf(start);
	if(pos1 == -1)
		return false;
	
	var pos2 = text.indexOf(end, pos1 + start.length);
	if(pos2 == -1)
		return false;
	
	return text.substring(pos1 + start.length, pos2);
}


function scanRow(id, row)
{
	id = id.substr(0, 8);
	var td = row.insertCell(0);
	td.className = "profilOptions";
	
	var callback = function(response)
	{
		var text = response.responseText;
		var start = 'id="profilOptions">';
		var end = '</ul>';
		var list = scanText(text, start, end);
		
		if(list === false)
			return;
		
		var img = td.appendChild(document.createElement("img"));
		img.src = "http://static.werkenntwen.de/images/icon_user_message.gif";
		
		var ul = td.appendChild(document.createElement("ul"));
		ul.innerHTML = list;
		
		row.addEventListener("contextmenu", handlerOn, false);
		row.context = ul;
	}
	
	var ignoreEvent = true;
	var handlerOff = function(e)
	{
		if(e.ctrlKey)
			return;
		
		if(ignoreEvent)
		{
			ignoreEvent = false;
			return;
		}
		ignoreEvent = true;
		
		
		with(row.context.style)
		{
			display = left = top = position = "";
		}
		
		document.removeEventListener("mouseup", handlerOff, false);
		return false;
	}
	
	var handlerOn = function(e)
	{
		if(e.ctrlKey)
			return;
		
		ignoreEvent = false;
		handlerOff({});
		ignoreEvent = true;
		
		with(row.context.style)
		{
			display = "block";
			position = "fixed";
			left = e.clientX + "px";
			top  = e.clientY + "px";
		}
		document.addEventListener("mouseup", handlerOff, false);
		
		e.preventDefault();
		return false;
	}
	
	var url = 'http://www.wer-kennt-wen.de/person/' + id;
	GM_xmlhttpRequest(
	{
		method: 'GET',
		id: id,
		url: url,
		onload: callback
	});
}

function scanTable(rows)
{
	for(var i = 0; i < rows.length; i++)
	{
		var row = rows[i];
		
		if(!row.getElementsByTagName("img")[0])
			continue;
		
		if(row.getElementsByTagName("img")[0].src.match(/\/([a-zA-Z0-9]{2})\/([a-zA-Z0-9]+)\.jpg$/))
		{
			var id = RegExp.$2;
			scanRow(id, row);
		}
	}
}


var tables = document.getElementsByTagName("table");
for(var i = 0; i < tables.length; i++)
{
	if(tables[i].className.match(/\bpeople\b/) && tables[i].parentNode.id != "friends_invited")
		scanTable(tables[i].rows);
}

/*
td.profilOptions
{
	width:16px!important;
}
td.profilOptions ul li
{
	padding:3px 0 3px 25px!important;
	background-position:0 0!important;
	list-style-type:none!important;
}
td.profilOptions ul
{
	display:none;
	padding:3px!important;
	position:absolute;
	background:white;
	border:1px solid #CDDDED;
	z-index:1!important;
}
td.profilOptions img:hover + ul, td.profilOptions ul:hover
{
	display:block;
}





*/
var css = "td.profilOptions{width:16px!important;}td.profilOptions ul li{padding:3px 0 3px 25px!important;background-position:0 0!important;list-style-type:none!important;}td.profilOptions ul{display:none;padding:3px!important;position:absolute;background:white;border:1px solid #CDDDED;z-index:1!important;}td.profilOptions img:hover + ul, td.profilOptions ul:hover{display:block;}";
if(GM_addStyle)
	GM_addStyle(css);
else
{
	var head = document.getElementsByTagName('head')[0];
	if(head)
	{
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}
