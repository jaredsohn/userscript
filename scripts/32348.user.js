// ==UserScript==
// @name           KumudamEasyNavigate
// @namespace      http://saravan.blogspot.com
// @description    Adds easier Navigation for Kumudam Magazine websites
// @include        http://www.kumudam.com/*
// ==/UserScript==

/****************************************************************************
* KumudamEasyNavigate - Adds easier Navigation for Kumudam Magazine websites
* Copyright (C) 2008, Saravana Kumar <saravanannkl@gmail.com>
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
* 02110-1301  USA
****************************************************************************/

function trim (str) {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
}
	
function getLocation(action) {
	if(!action) return;
	var first = action.indexOf("'");
	 var last = action.indexOf("'", first+1);
	if(first == -1 || last == -1) return action;
	return action.substring(first+1, last);
}

function checkForHash(href) {
	if(!href || href.indexOf('#')==0) return;
	else return href;
}

function getMainMenuObject(mouseover) {
	if(!mouseover) return;
	mouseover = mouseover.replace('window.', '');
	var menuStart = mouseover.indexOf('(')+1;
	if(menuStart==0) return;
	var menuEnd = mouseover.indexOf(',', menuStart);
	if(menuEnd==-1) return;
	var menuObjName = trim(mouseover.substring(menuStart, menuEnd));
	try {
		return eval('unsafeWindow.' + menuObjName);
	}
	catch(ex) {
		GM_log('Exception for ' + menuObjName + ' - ' + ex);
		return ;
	}
}

function btnDeselectAll_Click() {
    var selectedLinks = document.evaluate("//input[contains(@id, '__gmChk')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(selectedLinks.snapshotLength==0) {
	 return;
	}
	for(var i=0; i<selectedLinks.snapshotLength; i++) {
	    var chk = selectedLinks.snapshotItem(i);
		chk.checked = false;
	}
}

function btnSelectAll_Click() {
    var selectedLinks = document.evaluate("//input[contains(@id, '__gmChk')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(selectedLinks.snapshotLength==0) {
	 return;
	}
	for(var i=0; i<selectedLinks.snapshotLength; i++) {
	    var chk = selectedLinks.snapshotItem(i);
		chk.checked = true;
	}
}

function btnOpenInTab_Click() {
    var urlIndex = -1;
    urlIndex = document.baseURI.lastIndexOf('/');
    var urlInitialPart = document.baseURI.substring(0, urlIndex+1);

    var selectedLinks = document.evaluate("//input[contains(@id, '__gmChk')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(selectedLinks.snapshotLength==0) {
	 return;
	}
	var lnkCnt = 0;
	for(var i=0; i<selectedLinks.snapshotLength; i++) {
	    var chk = selectedLinks.snapshotItem(i);
	    if(chk.checked) {
		var u = chk.value;
	        if(u.indexOf(":")==-1)
	            u = urlInitialPart + u;
	        
	        window.setTimeout(GM_openInTab, (lnkCnt++)*2000, u);
	    }
	}
}

function createElm(tag, value) {
	var elm = document.createElement(tag);
	elm.innerHTML = trim(value);
	return elm;
}

function createCheckbox(id, link) {
	var chk = document.createElement("input");
	chk.id = id;
	chk.type = "checkbox";
	chk.value = link;
	return chk;
}

function createLink(link, linkText) {
	var a = createElm("a", linkText);
	a.href = link;
	return a;
}

function createButton(id, value, clickhandler) {
	var btn = document.createElement("input");
	btn.id = id;
	btn.type = "button";
	btn.value = value;
	btn.addEventListener("click", clickhandler, true);
	return btn;
}

function findAndAddMenuItems() {
	var mainMenuItems = document.evaluate("//a[contains(@class, 'tamilfontblue2p')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(mainMenuItems.snapshotLength==0) return;

	var menuDiv = document.createElement('div');
	menuDiv.className = "__gmMenu";
	var linkCount = 0;
	for(var i=0; i<mainMenuItems.snapshotLength; i++) {
	    var currMainMenuItem = mainMenuItems.snapshotItem(i);
		var mainMenuObj = getMainMenuObject(currMainMenuItem.getAttribute('onmouseover'));
		var mainMenuLink = checkForHash(currMainMenuItem.getAttribute('href'));
		if(mainMenuLink) {
			var heading = document.createElement("h2");
			heading.appendChild(createCheckbox("__gmChk" + (linkCount++), mainMenuLink));
			heading.appendChild(createLink(mainMenuLink, currMainMenuItem.innerHTML));
			menuDiv.appendChild(heading);
		}
		else {
			menuDiv.appendChild(createElm("h2", currMainMenuItem.innerHTML));
		}
		
		if(mainMenuObj) {
			var ul = document.createElement("<ul>");
			for(var j=0; j<mainMenuObj.items.length; j++) {
				var linkText = mainMenuObj.items[j];
				var link = getLocation(mainMenuObj.actions[j]);
				var li = document.createElement("li");
				li.appendChild(createCheckbox("__gmChk" + (linkCount++), link));
				li.appendChild(createLink(link, linkText));
				ul.appendChild(li);
			}
			menuDiv.appendChild(ul);
		}
	}
	menuDiv.appendChild(document.createElement("br"));

	menuDiv.appendChild(createButton("btnSelectAll", "Select All", btnSelectAll_Click));
	menuDiv.appendChild(createButton("btnDeselectAll", "Select None", btnDeselectAll_Click));
	menuDiv.appendChild(createButton("btnOpenInTab", "Open Selected Links", btnOpenInTab_Click));
	
	var prevIssuesTableResult = document.evaluate("//table[contains(@class, 'previousissuetableborder')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(prevIssuesTableResult.snapshotLength>0) {
		var prevIssuesTable = prevIssuesTableResult.snapshotItem(0);
		prevIssuesTable.parentNode.appendChild(menuDiv);
	}
	else {
		document.body.appendChild(menuDiv);
	}

	GM_addStyle('.__gmMainContent { float: left; }  .__gmMenu { float: right; background-color: #fff; color: #000000; font-family: Vikatan_TAM, Latha,Arial Unicode MS,"trebuchet ms",sans-serif; padding-bottom: 10px;} .__gmMenu h2 { font-size: small; text-align: left; font-weight: bold; margin-top: 10px; margin-bottom: 5px; } .__gmMenu ul { padding-left: 0px; margin: 0px; margin-bottom: 0px; } .__gmMenu li { 	margin-top:5px; margin-left: 20px; font-size: x-small; text-align: left; list-style-type: none; } .__gmMenu a:link, a:visited,  a:active  { color: #346784; } .__gmMenu a:hover { color: #999999; }');
}

findAndAddMenuItems();

