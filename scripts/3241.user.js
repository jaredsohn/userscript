// Last.fm Journal Collapse
// version 0.1a
// 2006-02-16
// Copyright (c) 2006, Gregory Krohne [2006-01-19]
// Adapted for Last.fm by Sarra Facey [2006-02-16]
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Last.fm Journal Collapse", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         Last.fm Journal Collapse
// @description	 Collapses journal entry text on overview pages.  See userscripts.org page for friendly description.
// @namespace    http://userscripts.org/scripts/show/3241
// @include      http://*.last.fm/*
// @exclude      http://*.last.fm/*entryid*
// @exclude      http://*.last.fm/*journal/2*      
// ==/UserScript==

function Collapse_Toggle() {
	var entry = document.getElementById(this.getAttribute('entry_id'));
	if (entry.style.display != 'none') {
		entry.style.display = 'none';
		this.innerHTML = '[+]';
	} else {
		entry.style.display = 'block';
		this.innerHTML = '[-]';
	}
}

/*
    == getElementsByClassName ==
    Written by Jonathan Snook, http://www.snook.ca/jonathan
    Add-ons by Robert Nyman, http://www.robertnyman.com
	
Some ways to call it

To get all a elements in the document with a "info-links" class.
    getElementsByClassName(document, "a", "info-links");
To get all div elements within the element named "container", with a "col" class.
    getElementsByClassName(document.getElementById("container"), "div", "col"); 
To get all elements within in the document with a "click-me" class.
    getElementsByClassName(document, "*", "click-me"); 
*/

function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && document.all)? document.all : 
    oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}

function toggleDisplay(e) {
	if (!GM_getValue) return;
	GM_setValue(
		'displaySetting', 
		GM_getValue('displaySetting', 'none') == 'none' ? 'display' : 'none');
}

//================================
//	INIT
//================================

// Get the entries collection - journalBody is last.fm specific 
var entries = getElementsByClassName(document, "*", "journalBody")

if (GM_getValue) {
	var displaySetting = GM_getValue('displaySetting', 'none');
	}
else {
	var displaySetting = 'none';
}

var iconSetting = (displaySetting == 'none') ? "[+]" : "[-]";

if (GM_registerMenuCommand)
	GM_registerMenuCommand(
		"Toggle journal entries (collapsed/expanded)",
		toggleDisplay);

for (var i = 0; i < entries.length; i++) {
	var entry = entries[i];
	if (!entry.id) {
		entry.id = 'collapse_entry_' + i;
	}
	var btn = document.createElement('a');
	btn.id = 'collapse_btn_' + i;
	btn.innerHTML = iconSetting;
	var title = entry.innerHTML;
	title = title.replace(/\r|\n/gm, ' ');
	title = title.replace(/\<[^\>]+\>/gm, ' ');
	btn.title = title.substr(0, 100);
	btn.href = "javascript:void(0)";
	btn.setAttribute('entry_id', entry.id);
	btn.addEventListener("click", Collapse_Toggle, false);
	entry.parentNode.insertBefore(btn, entry);
	entry.style.display = displaySetting;
}
