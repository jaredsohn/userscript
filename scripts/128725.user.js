// ==UserScript==
// @name           Travian ally monitor agent
// @namespace      http://userscripts.org/scripts/show/128725
// @description    Ally monitor agent - updates user data 
// @author         Vladimir Jossifov
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// @include        http*://*.travian.*
// @include        http*://*/*.travian.*
// @include        http*://www.vfthis.net/*/*
// @exclude     http*://*.travian*.*/hilfe.php*
// @exclude     http*://*.travian*.*/log*.php*
// @exclude     http*://*.travian*.*/index.php*
// @exclude     http*://*.travian*.*/anleitung.php*
// @exclude     http*://*.travian*.*/impressum.php*
// @exclude     http*://*.travian*.*/anmelden.php*
// @exclude     http*://*.travian*.*/gutscheine.php*
// @exclude     http*://*.travian*.*/spielregeln.php*
// @exclude     http*://*.travian*.*/links.php*
// @exclude     http*://*.travian*.*/geschichte.php*
// @exclude     http*://*.travian*.*/tutorial.php*
// @exclude     http*://*.travian*.*/manual.php*
// @exclude     http*://*.travian*.*/manual.php*
// @exclude     http*://*.travian*.*/ajax.php*
// @exclude     http*://*.travian*.*/ad/*
// @exclude     http*://*.travian*.*/chat/*
// @exclude     http*://forum.travian*.*
// @exclude     http*://board.travian*.*
// @exclude     http*://shop.travian*.*
// @exclude     http*://*.travian*.*/activate.php*
// @exclude     http*://*.travian*.*/support.php*
// @exclude     http*://help.travian*.*
// @exclude     *.css
// @exclude     *.js

// @version        0.2
// ==/UserScript==

function debug(str)
{
	var div = extract(document, "div", "class", "sideInfoPlayer");
	div.innerHTML = div.innerHTML.concat("|", str);
}

function httpGet(url)
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", url, false);
	xhttp.send();
	return xhttp.responseText;
}

function extract(doc, tag, attribute, value)
{
	var i,divs = doc.getElementsByTagName(tag);
	//window.alert(divs.length);
	for (i in divs)
	{
		if(divs[i].hasAttribute(attribute))
		{
			if(value==divs[i].getAttribute(attribute))
			{
				return divs[i];
			}
		}
	}
	return "";
}

function blinkName()
{
	var div = extract(document, "span", "class", "wrap");
	div.style.textDecoration = 'blink';
	div.style.color = 'red';
}

/* --------------------------------------------------------- */

function getUser()
{
	var result = [];
	var server = path.substring(path.indexOf('/')+2,path.lastIndexOf('/'));
	server = server.replace("travian","");
	server = server.replace(/\./g,"");
	
	var div = extract(document, "div", "class", "sideInfoPlayer");
	
	var href = div.getElementsByTagName("a")[0].href;
	var userid = href.substring(href.indexOf("=")+1);
	
	var username = div.getElementsByTagName("span")[0].innerHTML;
	
	result[0] = userid;
	result[1] = username;
	result[2] = server;
	
	return result;
}

function checkUser()
{
	var userid, username, server, result = [];
	result = getUser();
	userid   = result[0];
	username = result[1];
	server   = result[2];
	
	var url = check.concat("user&user=", username, "&userid=", userid, "&server=", server);
	
	return httpGet(url);
}

function checkVillages()
{
	
	if (/spieler.php/.test(path))
	{
		if (/uid=$/.test(path.replace(id,"")))
		{
			
		}
	}
	else
	{
		var div = document.getElementById("villageList");
		var list = div.getElementsByTagName("ul")[0].getElementsByTagName("a");
		
		var url = check.concat("villages&list=");
		var current = "";
		for (i in list)
		{
			current = current.concat(list[i].href.substring(list[i].href.indexOf("=")+1), ",");
		}
		
		current = current.substring(0,current.length-1);
		url = url.concat(current);
		
		var stored = httpGet(url);
		
		var array_current = current.split(',').sort();
		var array_stored = stored.split(',').sort();
		if (array_current != array_stored)
		{
			blinkName();
		}
	}
	return 0;
}

/* --------------------------------------------------------- */

try
{
	var path = window.location.href;
	var main_div = extract(document, "div", "class", "data");
	var check = "http://ender.byethost18.com/check.php?type=";
	var id = getUser()[0];
	if (/dorf1.php/.test(path))
	{
		checkUser();
	}
	
	checkVillages();
	//blinkName();
	//loadPages();
	//colorTroops();
}
catch (err)
{
window.alert(err);
}