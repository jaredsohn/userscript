// ==UserScript==
// @name           Pardus Hack Helper
// @namespace      pardus.at
// @description    Allows pilot names to be saved and later retrieved on the Hack screen
// @include        http://*.pardus.at/hack.php*
// @version        1.3
// @author         Rhindon

// ==/UserScript==

// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////

var cookieName = "HackHelperNames";

// ////////////////////////////////////////////////////////////////////////
// Imported -- Rhindon's Standard Cookie Code 
//          -- Stores GreaseMonkey Values instead of actual Cookies
// ////////////////////////////////////////////////////////////////////////

function createCookie(name,value,days) {

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
	createCookie(name,"~~~DELETED~~~");
}

function getUniverse() {
	return window.location.host.substr(0, window.location.host.indexOf('.'));
}

// ////////////////////////////////////////////////////////////////////////
// End imported code
// ////////////////////////////////////////////////////////////////////////



// ////////////////////////////////////////////////////////////////////////
// Beginning of Code
// ////////////////////////////////////////////////////////////////////////

function hackHelperInit() {


    var child = document.createElement("div")
    child.setAttribute("id", "hackHelperNameListDiv");

	btns = document.getElementsByTagName('button');

	var table;
	
	for(var i = 0; i < btns.length; i++) {
		if(btns[i].innerHTML == "Hack") {
			table = btns[i].parentNode.parentNode.parentNode;
		}
	}
	
	var row = table.insertRow(-1);

	var cell = row.insertCell(-1);
	cell.colSpan = 2;
	cell.align = "center";
	cell.appendChild(child);
	
	writeNameList();
}


function writeNameList() {

	var nameList = '<a id="saveName">Save Name in Textbox</a>';

	var namesHtml = getNamesHtml();

	nameList += "" + namesHtml;
	

	document.getElementById("hackHelperNameListDiv").innerHTML = nameList;

	
    document.getElementById("saveName").addEventListener('click', addName, true);

	createDeleteActions();

}




function addName() {

	var name = document.getElementsByName("lookup_name")[0].value;

	var nameStr = readCookie(cookieName);
	
	if(nameStr == null) {
		nameStr = name;
	} else {
		nameStr += "~" + name;
	}
	
	nameStr = cleanNameStr(nameStr);
	
	createCookie(cookieName, nameStr);
	
	writeNameList();
	
}

function deleteName(e) {
	
	var deleteName = '~' + e.target.id + '~';
	var nameStr = '~' + readCookie(cookieName) + '~';
	
	var newNameStr = nameStr.substr(0, nameStr.indexOf(deleteName)) + '~'
	newNameStr += nameStr.substr(nameStr.indexOf(deleteName) + deleteName.length);
	
	newNameStr = cleanNameStr(newNameStr);
	
//	alert(deleteName + '\n' + nameStr + '\n' + newNameStr);
	
	createCookie(cookieName, newNameStr);
	
	writeNameList();
}

function getNamesHtml() {

	var nameStr = readCookie(cookieName);
	
	nameStr = cleanNameStr(nameStr);
	
	if(nameStr == null || nameStr == "") return "";
	
	names = nameStr.split('~');
	
	
	var html = "";
	for(var i = 0; i < names.length; i++) {
	
		if(names[i] == "") return;
	
		if(i % 5 == 0) html += '<br>';
	
		html += "<a href=\"javascript:document.name_lookup.lookup_name.value = '" + names[i] + "'; document.name_lookup.method.value = document.hacking.method.value; document.name_lookup.submit();\">" + names[i] + "</a> <a name=\"deleteName\" id=\"" + names[i] + "\">X</a>";
		if(i < names.length - 1) html += " | ";
	}
	
	return html;
}

function createDeleteActions() {
	as = document.getElementsByName("deleteName");
	
	for(var i = 0; i < as.length; i++) {
		as[i].addEventListener('click', deleteName, true);
	}
}

function cleanNameStr(newNameStr) {

	if(newNameStr == null) return "";
	
	if(newNameStr.indexOf('~~') >= 0) {
		newNameStr = newNameStr.replace(/~~/g, '~');
	}

	if(newNameStr.indexOf('~') == 0) {
		newNameStr = newNameStr.substr(1);
	}

	if(newNameStr.lastIndexOf('~') == newNameStr.length - 1) {
		newNameStr = newNameStr.substr(0, newNameStr.length - 1);
	}
	
	return newNameStr;

}

hackHelperInit();
