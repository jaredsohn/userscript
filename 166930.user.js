// ==UserScript==
// @name	Friendlist Sorter (mobile version)
// @Codified	SHAB_RO
// @namespace	http://userscripts.org/scripts/show/166930
// @include	http://m*.ikariam.com/*
// @exclude	http://support*.ikariam.com/*
// ==/UserScript==

// Lokalisierung
var languages = {
	en: {
		"options": "Options",
		"settings_header": "Friendlist Sorter",
		"settings_show": "Order:",
		"empty": "Empty Slot",
		"save": "Save!",
		"saved": "Order saved.",
	},
	ir: {
		"options": "تنظيمات",
		"settings_header": "مرتب كننده ليست دوستى",
		"settings_show": "ترتيب:",
		"empty": "خالى",
		"save": "ذخير!",
		"saved": "ترتيب ذخيره شد.",
	},
};
var href = document.location.href;
var server = getServer(href);
var lang = getLanguage(href);

var language = languages[lang];
if(language == null)
	language = languages['en'];
	
var page = getPage(href);

var store = server+'-'+lang+'-friendlistsorter';
var order = loadArray(GM_getValue(store+'-order',''));

var friendlist = document.getElementById('friends');
if(friendlist) {
	friendlist = friendlist.getElementsByTagName('ul')[0];
	var friends = friendlist.getElementsByTagName('li');
	var oldfriends = new Array();
	var oldclass = new Array();
	
	for(var i=0; i<friends.length; i++) {
		oldfriends[i] = friends[i].innerHTML;
		oldclass[i] = friends[i].getAttribute('class');
	}
	
	for(var i=0; i<friends.length; i++) {
		friends[i].setAttribute('class', oldclass[order[i]]);
		friends[i].innerHTML = oldfriends[order[i]].replace(/<div class=\"slotnum\">\d+<\/div>/, "<div class=\"slotnum\">"+(i+1)+"</div>");
	}
}


if(page=="options") {
	var div = document.createElement('div');
	div.setAttribute('class', 'contentBox01h');
	div.setAttribute('id', 'sorterOptions');
	var friends = friendlist.getElementsByTagName('li');
	
	var openimg = "data:image/gif;base64,R0lGODlhCgALANUlABMTExQUFB4eHlZWVmpqakFBQVlZWZ2dnTw8PFRUVBsbGz09PTs7O4eHhxYWFg8PD5iYmDc3NxISEhkZGU5OTh8fHx0dHTAwMI+Pj3d3d5qamhgYGCIiIhUVFTMzM01NTVNTUzIyMmJiYhERERcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAAKAAsAAAY7wJJwSCwahwvRsRS4HCkAAMFYmXQ8RYNEoHBgiByFRRAoIB8bknrUKGkKEQYCwQgRIAcDKDEYJD4ZB0EAOw%3D%3D";
	var closeimg = "data:image/gif;base64,R0lGODlhCgALANUlABMTExQUFB4eHlZWVmpqakFBQVlZWZ2dnTw8PFRUVBsbGz09PTs7O4eHhxYWFg8PD5iYmDc3NxISEhkZGU5OTh8fHx0dHTAwMI+Pj3d3d5qamhgYGCIiIhUVFTMzM01NTVNTUzIyMmJiYhERERcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAAKAAsAAAY9wEPmkxgMEiDDAUIIMRAIRqSgKTVGpOzmsSh5CwGBRcHxejEOhUBiMHs9nUnF7SUAABS69xLQe0VdfoKCQQA7";

	div.innerHTML  = "<h3 class=header><span class=textLabel>"+language['settings_header']+"</span></h3>";
	div.innerHTML += "<div class=content>";
	div.innerHTML += "<table>"
				+"<tr>"
					+"<th valign=top>"+language["settings_show"]+"</th><td><select id=sorterOrder size=16 style='width:150px; height: 20em'>"
						+"<option id=sorterSlot0 value='"+order[0]+"'>"+getName(friends[0])+"</option>"
						+"<option id=sorterSlot1 value='"+order[1]+"'>"+getName(friends[1])+"</option>"
						+"<option id=sorterSlot2 value='"+order[2]+"'>"+getName(friends[2])+"</option>"
						+"<option id=sorterSlot3 value='"+order[3]+"'>"+getName(friends[3])+"</option>"
						+"<option id=sorterSlot4 value='"+order[4]+"'>"+getName(friends[4])+"</option>"
						+"<option id=sorterSlot5 value='"+order[5]+"'>"+getName(friends[5])+"</option>"
						+"<option id=sorterSlot6 value='"+order[6]+"'>"+getName(friends[6])+"</option>"
						+"<option id=sorterSlot7 value='"+order[7]+"'>"+getName(friends[7])+"</option>"
						+"<option id=sorterSlot8 value='"+order[8]+"'>"+getName(friends[8])+"</option>"
						+"<option id=sorterSlot9 value='"+order[9]+"'>"+getName(friends[9])+"</option>"
						+"<option id=sorterSlot10 value='"+order[10]+"'>"+getName(friends[10])+"</option>"
						+"<option id=sorterSlot11 value='"+order[11]+"'>"+getName(friends[11])+"</option>"
					+"</select><img id=sorterUp style='vertical-align:top' src='"+openimg+"'><img id=sorterDown style='margin-left:-10px;vertical-align:bottom' src='"+closeimg+"'></td>"
				+"</tr>"
			+"</table>"
			+"<div class=centerButton>"
			+"<input value="+language['save']+" id=sorterbutton class=button type=submit>"
			+"</div>"
			+"<div style='text-align: center;' id=sorterreturnbox></div>"
			+"</div>"
			+"<div class=footer>"
			+"</div>";
			
	document.getElementById('mainview').appendChild(div);
	
	document.getElementById('sorterbutton').addEventListener('click', saveSorter, true);
	document.getElementById('sorterUp').addEventListener('click', sortUp, true);
	document.getElementById('sorterDown').addEventListener('click', sortDown, true);
}

function sortUp() {
	if(document.getElementById('sorterOrder').selectedIndex > 0) {
		var oldval = document.getElementById('sorterSlot'+(document.getElementById('sorterOrder').selectedIndex-1)).value;
		var oldname = document.getElementById('sorterSlot'+(document.getElementById('sorterOrder').selectedIndex-1)).innerHTML;
		document.getElementById('sorterSlot'+(document.getElementById('sorterOrder').selectedIndex-1)).value = document.getElementById('sorterSlot'+document.getElementById('sorterOrder').selectedIndex).value;
		document.getElementById('sorterSlot'+(document.getElementById('sorterOrder').selectedIndex-1)).innerHTML = document.getElementById('sorterSlot'+document.getElementById('sorterOrder').selectedIndex).innerHTML;
		document.getElementById('sorterSlot'+document.getElementById('sorterOrder').selectedIndex).value = oldval;
		document.getElementById('sorterSlot'+document.getElementById('sorterOrder').selectedIndex).innerHTML = oldname;
		document.getElementById('sorterOrder').selectedIndex -= 1;
	}
}

function sortDown() {
	if(document.getElementById('sorterOrder').selectedIndex != -1 && document.getElementById('sorterOrder').selectedIndex < 11) {
		var oldval = document.getElementById('sorterSlot'+(document.getElementById('sorterOrder').selectedIndex+1)).value;
		var oldname = document.getElementById('sorterSlot'+(document.getElementById('sorterOrder').selectedIndex+1)).innerHTML;
		document.getElementById('sorterSlot'+(document.getElementById('sorterOrder').selectedIndex+1)).value = document.getElementById('sorterSlot'+document.getElementById('sorterOrder').selectedIndex).value;
		document.getElementById('sorterSlot'+(document.getElementById('sorterOrder').selectedIndex+1)).innerHTML = document.getElementById('sorterSlot'+document.getElementById('sorterOrder').selectedIndex).innerHTML;
		document.getElementById('sorterSlot'+document.getElementById('sorterOrder').selectedIndex).value = oldval;
		document.getElementById('sorterSlot'+document.getElementById('sorterOrder').selectedIndex).innerHTML = oldname;
		document.getElementById('sorterOrder').selectedIndex += 1;
	}
}

function saveSorter() {
	for(var i=0; i<order.length; i++)
		order[i] = parseInt(document.getElementById('sorterSlot'+i).value);

	GM_setValue(store+'-order', storeArray(order));
	document.getElementById('sorterreturnbox').innerHTML = language['saved'];
	document.getElementById('sorterbutton').blur();
}

function getName(friend) {
	var a = friend.getElementsByTagName('a');
	if(a.length > 1)
		return a[0].innerHTML;
	else
		return language['empty'];
}

// Hilfs-Funktionen
function getServer(href) {
	var server = href.replace(/........(\d+).*/,"$1");
	return server;
}

function getLanguage(href) {
	var language = href.replace(/........\d+.(\w+).*/,"$1");
	return language ;
}

function getPage(href) {
	if(href.indexOf("view=options")>=0)
		return "options";
	else if(getPageByContent() == language['options'])
		return "options";
	else
		return "";
}

function getPageByContent() {
	var mainview = document.getElementById('mainview');
	var header = mainview.getElementsByTagName('h1');
	if(header.length < 1)
		return "";
	else 
		return header[0].innerHTML;
}

function storeArray(array) {
	return array.toSource();
}

function loadArray(string) {
	if(string=="")
		return [0,1,2,3,4,5,6,7,8,9,10,11];
	else
		return eval(string);
}