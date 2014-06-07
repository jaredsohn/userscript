// ==UserScript==
// @name           Pardus QuickList Manager
// @namespace      .pardus.at
// @description    Allows users to save and load quicklists
// @include        http://*.pardus.at/ambush.php*
// @author         Rhindon
// @version        1.1
// ==/UserScript==



// PREFERENCES -- There's probably no reason for these to change.

var CookieName = "QLMList";
var CookiePrefix = "QLMItem_";
var delimeter = '~';

var MoveButtons = true;


// ////////////////////////////////////////////////////////////////////////
// Imported -- Rhindon's Standard Cookie Code 
//          -- Stores GreaseMonkey Values instead of actual Cookies
// ////////////////////////////////////////////////////////////////////////

function createCookie(name,value) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	GM_setValue(subdomain + '-' + name,value);

}

function readCookie(name) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	try {
		var temp = GM_getValue(subdomain + '-' + name);
		if(temp != '~~~DELETED~~~') return temp;
		return null;
       	} catch(err) {
       		return null;
	}
}

function eraseCookie(name) {
	GM_deleteValue(name);
}

// ////////////////////////////////////////////////////////////////////////
// End imported code
// ////////////////////////////////////////////////////////////////////////


function initQLManager() {

	var options = getOptions();

	var html = "<td>";
	
	html += "<br /><table width='100%'>";
	
	html += "<tr><th colspan='3'>Quicklist Manager</th></tr>";
	html += "<tr>";
	html += " <td colspan='3' align='center'><select id='qllist'>" + options + "</select></td>"
	html += "</tr>";
	
	html += "<tr>";
	html += " <td align='center'><input type='button' id='saveBtn' value='Save'></td>"
	html += " <td align='center'><input type='button' id='saveasBtn' value='Save As...'></td>";
	html += " <td align='center'><input type='button' id='deleteBtn' value='Delete'></td>";
	html += "</tr>";
	
	html += "</table>";


	var table = document.getElementById('readlist');
	
	var newRow = table.insertRow(table.rows.length);
	newRow.innerHTML = html;


	if(MoveButtons) moveButtons();
	
    document.getElementById("saveBtn").addEventListener('click',save, false);
	document.getElementById("saveasBtn").addEventListener('click',saveAs, false);
	document.getElementById("deleteBtn").addEventListener('click',del, true);
	document.getElementById("qllist").addEventListener('change',setQLtextarea, true);

}

function moveButtons() {

	var html = "<tr><th>Quick Buttons</th></tr>";
	html += "<tr><td><input type='submit' name='confirm' value='Lay Ambush'></td></tr>";

// Seems to be a problem doing the QL...  I'll see if I can fix it later.
//	html += "<tr><td><table class='messagestyle' style='background:url(http://static.pardus.at/img/stdhq/bgd.gif)' cellpadding='0' id='readlist'><tr><td align='center'><textarea name='readlist' cols='75' rows='1' style='font-family:Arial, Verdana;background-color:#00001C; color:#D0D1D9; font-size:12px;'></textarea><br><input type='submit' name='apply_ql' value='Apply Quicklist'></td></tr></table><br><br></td></tr></table></td></tr>";

	var ths = document.getElementsByTagName('th');
	var table = null;
	
	for(var i = 0; i < ths.length; i++) {
		if(ths[i].innerHTML.indexOf('Ambush mode') >= 0) {
			table = ths[i].parentNode.parentNode;
			break;
		}
	}

	table.innerHTML = html + table.innerHTML;
	
}

function setQLtextarea() {

	if(document.getElementById('qllist').value == "Select a QL:") {
		document.getElementsByName('readlist')[0].value = "";
		return;
	}

	document.getElementsByName('readlist')[0].value = document.getElementById('qllist').value;
}

function save(e) {

	var name = document.getElementById('qllist').options[document.getElementById('qllist').selectedIndex].text;
	
	if(value == "") {
		alert("No QL Value to save");
		return false;
	}

	if(name == "" || name == "Select a QL:" || name == "No saved QLs")
		name = prompt("Please enter a name for your quicklist");
	
	var value = document.getElementsByName('readlist')[0].value;
	
	addQL(name, value);

	resetOptions();

}

function saveAs(e) {

	e.stopPropagation();

	if(value == "") {
		alert("No QL Value to save");
	}
	
	var name = prompt("Please enter a name for your quicklist");
	var value = document.getElementsByName('readlist')[0].value;
	
	addQL(name, value);

	resetOptions();
}

function del() {
	var name = document.getElementById('qllist').options[document.getElementById('qllist').selectedIndex].text;

	deleteQL(name);
	
	resetOptions();
	
}


function resetOptions() {

	document.getElementById('qllist').innerHTML = getOptions();

}

function addQL(name, qlValue) {
	
	var nameList = readCookie(CookieName);
	
	if(nameList == null) nameList = "";
	
	if(nameList.indexOf(delimeter + name + delimeter) < 0) {
		nameList += delimeter + name + delimeter;
	}
	
	createCookie(CookieName, nameList);
	
	createCookie(CookiePrefix + name, qlValue);
}

function getOptions() {

	var nameList = readCookie(CookieName);

	if(nameList == null) return;

	nameList = nameList.replace(/~~/g, '~');
	
	var names = nameList.split(delimeter);
	
	
	var opts = "";
	
	for(var i = 0; i < names.length; i++) {
		if(!names[i]) continue;
		var ql = readCookie(CookiePrefix + names[i]);
		opts += "<option value='" + ql + "'> " + names[i] + " </option>";
	}
	
	if(opts.length > 0) {
		opts = "<option>Select a QL:</option>" + opts;
	} else {
		opts = "<option>No saved QLs</option>";
	}

	return opts;
	
}

function deleteQL(name) {

	var nameList = readCookie(CookieName);

	if(nameList == null) return;

	if(confirm("Are you sure you want to delete the QL: " + name)) {
	
		nameList = nameList.replace(delimeter + name + delimeter, "");

		createCookie(CookieName, nameList);
		
		eraseCookie(CookiePrefix + name);
	}
	
}

initQLManager();