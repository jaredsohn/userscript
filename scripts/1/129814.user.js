// ==UserScript==
// @name           Nord Invasion Script
// @namespace      http://nordinvasion.com
// @author         Tennenoth & Jikuu_Ryuu
// @description    Adds user created menus to the website
// @include        http://nordinvasion.com/*
// @include        http://www.nordinvasion.com/*
// ==/UserScript==

// For testing purposes delete the "//" from the following line;
// alert("I'm working!");

/////////////////////
// Start of Script //
/////////////////////

checkDomain();

var auctionArr = [];
var craftingArr = [];
var otherArr = [];
var menu = '';
var divLineBreak = '<div style="clear:both;height: 10px;border-bottom:1px dotted #ccc; margin-bottom:10px;"></div>';

if (localStorage.NI != '1') {
	resetVariables();
}

// Initialise the script output.

outputSearch();
outputAH();
outputCrafting();
outputOther();
outputSettings();
outputMenu(); // Always last.

// Styling and menu creation.

function outputMenu() {
	
	if (menu != '') {
	  menuobj = document.createElement('ul');
	  menuobj.style.position = 'fixed';
	  menuobj.style.top = '0px';
	  menuobj.style.left = '10px';
	  menuobj.style.padding = '20px';
	  menuobj.style.backgroundColor = '#eee';
	  menuobj.style.border = 'double';
	  menuobj.innerHTML = menu;
	  body = document.getElementsByTagName('body')[0];
	  body.appendChild(menuobj);
	}
	
// Add EventListeners

	if (unsafeWindow.localStorage.delButtons == 'true') {
		for (var i = 0; i < auctionArr.length; i++) {
			addEventListenersAH(i);
		}
		for (var i = 0; i < craftingArr.length; i++) {
			addEventListenersCraft('C',i);
		}
		
		for (var i = 0; i < otherArr.length; i++) {
			addEventListenersOther('O',i);
		}
	}
	document.getElementById('btnAdd').addEventListener('click', addAHLink, false);
	document.getElementById('btnCAdd').addEventListener('click', addCLink, false);
	document.getElementById('btnAHSearch').addEventListener('click', searchAH, false);
	document.getElementById('btnToggleSettings').addEventListener('click', hideToggle, false);
	document.getElementById('btnToggle').addEventListener('click', toggleDelete, false);
	document.getElementById('frmAH').addEventListener('submit', searchAH, false);
	document.getElementById('btnReset').addEventListener('click', resetVariables, false);
	document.getElementById('btnOAdd').addEventListener('click', addOtherLink, false);
}

// Output functions - Display the menu bar content.

function searchAH() {
	var textBoxOutput = document.getElementById("searchAHBox").value;
	var searchURL = 'http://www.nordinvasion.com/auction_hall.php?q=' + textBoxOutput;
	window.location.href = searchURL;
}

function outputSearch() {
	menu += '<form action="JavaScript:searchAH()" id="frmAH"><p><center><strong>Quick AH Search</strong><br /><input style="margin-top:3px;" type="text" id="searchAHBox" size="15" /><br />';
	menu += '<input type="button" id="btnAHSearch" value="Search" /></center></p></form>';
	menu += divLineBreak;
}

function outputAH() {
	  if (unsafeWindow.localStorage.list != "") {
		menu += '<p><center><img style="display:inline;vertical-align:middle;margin-bott: 0 3px;" src="/images/house.png"><strong> Auction Hall</strong></center></p>';
		auctionArr = unsafeWindow.localStorage.list.split(",");
		
		if (unsafeWindow.localStorage.delButtons == "true") {
			for (i in auctionArr) {
				menu += auctionArr[i] + ' <img style="vertical-align:middle;" align="right" id="' + i + '" src="http://i107.photobucket.com/albums/m295/Tennenoth/cross-icon.gif"><br />';
			}
		} else {
			for (i in auctionArr) {
				menu += auctionArr[i] + '<br />';
			}
		}
		menu += divLineBreak;
	}	
}

function outputCrafting() {
	if (unsafeWindow.localStorage.craftlist != "") {
		menu += '<p><center><img style="display:inline;vertical-align: top;margin: 0 3px;" src="/images/wrench.png"><strong>Crafting</strong></center></p>';
		craftingArr = unsafeWindow.localStorage.craftlist.split(",");
		
		if (unsafeWindow.localStorage.delButtons == 'true') {
			for (i in craftingArr) {
				menu += craftingArr[i] + ' <img style="vertical-align:middle;" align="right" id="C' + i + '" src="http://i107.photobucket.com/albums/m295/Tennenoth/cross-icon.gif"><br />';
			}
		} else {
			for (i in craftingArr) {
				menu += craftingArr[i] + '<br />';
			}
		}
		menu += divLineBreak;
	}
}

function outputOther() {
	if (unsafeWindow.localStorage.otherlist != "") {
		menu += '<p><center><img class="ico" src="/images/page_white_text.png"><strong>Other</strong></center></p>';
		otherArr = unsafeWindow.localStorage.otherlist.split(",");
		
		if (unsafeWindow.localStorage.delButtons == 'true') {
			for (i in otherArr) {
				menu += otherArr[i] + ' <img style="vertical-align:middle;" align="right" id="O' + i + '" src="http://i107.photobucket.com/albums/m295/Tennenoth/cross-icon.gif"><br />';
			}
		} else {
			for (i in otherArr) {
				menu += otherArr[i] + '<br />';
			}
		}
		menu += divLineBreak;
	}
}

function outputSettings() {
	if (unsafeWindow.localStorage.hsbuttonVisible == "block") {
		var hsvar = '<img class="ico" src="/images/monitor_go.png"><strong>Settings <a id="btnToggleSettings">[-]</a></strong>';
	} else {
		var hsvar = '<img class="ico" src="/images/monitor_go.png"><strong>Settings <a id="btnToggleSettings">[+]</a></strong>';
	}

	menu += '<center><p>' + hsvar; + '</p>';
	menu += '<div id="hsbutton" style="display:' + localStorage.hsbuttonVisible + '">';
	menu += '<br /><img style="vertical-align:middle;" height="15" width="15" src="http://i107.photobucket.com/albums/m295/Tennenoth/plusButton3.png"> <a href="#" id="btnAdd" style="text-decoration:none">Add Auction Hall Item</a>';
	menu += '<br /><img style="vertical-align:middle;" height="15" width="15" src="http://i107.photobucket.com/albums/m295/Tennenoth/plusButton3.png"> <a href="#" id="btnCAdd" style="text-decoration:none">Add Crafting Item</a>';
	menu += '<br /><img style="vertical-align:middle;" height="15" width="15" src="http://i107.photobucket.com/albums/m295/Tennenoth/plusButton3.png"> <a href="#" id="btnOAdd" style="text-decoration:none">Add "Other" Link</a>';
	menu += '<br /><img style="vertical-align:middle;" src="http://i107.photobucket.com/albums/m295/Tennenoth/cross-icon.gif"> <a href="#" id="btnToggle" style="text-decoration:none">Toggle Remove Buttons</a>';
	menu += divLineBreak;
	menu += '<p><a href="#" id="btnReset" style="text-decoration:none">Reset Links</a></center></p>';
}

// Add a link to the list

function addAHLink() {
	var itemName = prompt("Add item","Enter the item name:");
	auctionArr.push('<a href="http://www.nordinvasion.com/auction_hall.php?q=' + itemName.replace(" ", "+") + '" style="text-decoration:none">&raquo; ' + itemName + '</a>');	
	unsafeWindow.localStorage.list = auctionArr.join();
	location.reload(true);
}

function addCLink() {
	if (location.href.indexOf('http://www.nordinvasion.com/crafting.php?b') == -1) {
		var craftName = prompt("Add Craft Name", "Enter the Craft Name:");
		var craftURL = prompt("Add Craft URL", "Enter the Crafting URL:");
		if (craftName != null && craftURL != null) {
			craftingArr.push('<a href="' + craftURL + '" style="text-decoration:none">&raquo; ' + craftName + '</a>');
		}
	} else {
		var craftName = prompt("Add Craft Name", document.getElementsByClassName('rightContent')[0].getElementsByTagName('h2')[0].innerHTML.replace('Crafting: ', ''));
		var craftURL = location.href;
		craftingArr.push('<a style="text-decoration:none;" href="' + craftURL + '">&raquo; ' + craftName + '</a>');
	}
	if (craftName) {
		unsafeWindow.localStorage.craftlist = craftingArr.join();
		location.reload(true);
	} else {
		location.reload(true);
	}
}

function addOtherLink() {
	var linkName = prompt("Add Other Link", "Enter the Link Name.");
	var linkURL = prompt("Link URL", "Enter the Link URL.");
	if (linkName != null && linkURL != null) {
		otherArr.push('<a style="text-decoration:none;" href="' + linkURL + '">&raquo; ' + linkName + '</a>');
		unsafeWindow.localStorage.otherlist = otherArr.join();
		location.reload(true);
	} else {
		location.reload(true);
	}
}

function toggleDelete() {
	if (unsafeWindow.localStorage.delButtons == 'true') {
		unsafeWindow.localStorage.delButtons = 'false';
	} else {
		unsafeWindow.localStorage.delButtons = 'true';
	}
	location.reload(true);
}

// Remove a link from the list and set EventListeners

function addEventListenersAH(id) {
    document.getElementById(id).addEventListener("click", function(){removeAHLink(id)}, false);
}

function removeAHLink(id) {
	auctionArr.splice(id, 1);
	unsafeWindow.localStorage.list = auctionArr.join();
	location.reload(true);
}

function addEventListenersCraft(l,id) {
	document.getElementById(l+id).addEventListener("click", function(){removeCLink(id)}, false);
}

function removeCLink(id) {
	craftingArr.splice(id, 1);
	unsafeWindow.localStorage.craftlist = craftingArr.join();
	location.reload(true);
}

function addEventListenersOther(l,id) {
	document.getElementById(l+id).addEventListener("click", function(){removeOtherLink(id)}, false);
}

function removeOtherLink(id) {
	otherArr.splice(id, 1);
	unsafeWindow.localStorage.otherlist = otherArr.join();
	location.reload(true);
}

////////////////
// Other code //
////////////////

// Domain checker.

function checkDomain() {
	var url = window.location.href;

	if (url.indexOf('http://nordinvasion') > -1)
	{
		window.location.href = 'http://www.nordinvasion.com';
	}
}

// Hide section toggle.

function hideToggle() {
	if (localStorage.hsbuttonVisible == 'none') {
		document.getElementById('hsbutton').style.display = 'block';localStorage.hsbuttonVisible = 'block';
		document.getElementById('btnToggleSettings').innerHTML = '[-]';
	} else {
		document.getElementById('hsbutton').style.display = 'none';localStorage.hsbuttonVisible = 'none';
		document.getElementById('btnToggleSettings').innerHTML = '[+]';
	}
}

// Reset script function

function resetVariables() {
	unsafeWindow.localStorage.hsbuttonVisible = "block";
	unsafeWindow.localStorage.list = "";
	unsafeWindow.localStorage.craftlist = "";
	unsafeWindow.localStorage.otherlist = "";
	unsafeWindow.localStorage.delButtons = 'true';
	localStorage.NI = '1';
	location.reload(true);
}

/////////////////////////////////
// NI EXP Le Lazy - Jikuu_Ryuu //
/////////////////////////////////

if (location.href == "http://www.nordinvasion.com/" || location.href == "www.nordinvasion.com") {
	var obj = document.getElementsByClassName('halfpane')[0].getElementsByClassName('assist_list')[0];
	for (var i = 2; i < obj.getElementsByTagName('li').length-1; i++)
	{
		var temp = obj.getElementsByTagName('li')[i].getElementsByTagName('span')[0];
		temp.innerHTML = '<a class="a' + i + '">' + temp.innerHTML + '</a>';
	}
	addEvents();
}
function getAssistValue() {
	return obj.getElementsByTagName('li')[0].innerHTML.split('</span>')[1].replace(' xp', '').replace(' ', '');
}
function addEvents() {
	obj.getElementsByClassName('a2')[0].addEventListener('click', function(){inputEXP('assist_ranged')}, false);
	obj.getElementsByClassName('a3')[0].addEventListener('click', function(){inputEXP('assist_melee')}, false);
	obj.getElementsByClassName('a4')[0].addEventListener('click', function(){inputEXP('assist_mounted')}, false);
	obj.getElementsByClassName('a5')[0].addEventListener('click', function(){inputEXP('assist_gold')}, false);
}
function inputEXP(name) {
	var assist = getAssistValue();
	if (name == 'assist_ranged' || name == 'assist_gold') {
		assist -= (assist % 5);
	}
	else if (name == 'assist_melee') {
		assist -= (assist % 2);
	}
	else if (name == 'assist_mounted') {
		assist -= (assist % 10);
	}
	document.getElementsByName(name)[0].value = assist;
}

if (location.href == "http://www.nordinvasion.com/crafting.php" || location.href == "www.nordinvasion.com/crafting.php") {
	var area = document.getElementsByClassName('rightContent')[0].getElementsByClassName('value')[1];
var text = area.innerHTML.replace('','').replace('(','').replace(')', '');
var values = text.split('/');
var remaining = values[1] - values[0];

area.innerHTML = '(' + text + ')<br />Remaining XP &nbsp;&nbsp;&nbsp;&nbsp; (' + remaining + ')';
}