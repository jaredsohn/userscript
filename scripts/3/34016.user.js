// Google Scholar Citations to My Library in CiteULike
// version 0.1 BETA!
// 2008-09-18
// Copyright (c) 2008, Jong-Do Park. dlibrary(at)gmail(dot)com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// http://www.citeulike.org/user/gimmebob
// -----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5.3 or later: http://greasemonkey.mozdev.org/
// This script was tested with Greasemonkey 0.8.2008.06.09.0 and FirFox 3.0.1
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item "Greasemonkey". 
// To "Install User Script" manually, go to "Greasemonkey" and hit "New User Script".
// Then, fill out the form: name, namespace, description, and include fields 
// as the following information. When done, hit OK button, and copy & paste this script.
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "Google Scholar Citations to MyLibrary in CiteULike", 
// and click Uninstall.
//
// -----------------------------------------------------------------------------

// ==UserScript==
// @name          Google Scholar Citations to My Library in CiteULike
// @namespace     http://userscripts.org/users/67069
// @description   Post Google Scholar citations to My Library in CiteULike with one click.
// @include       http://scholar.google.com/*
// @include       http://www.citeulike.org/*
// ==/UserScript==

function gm_xpath(expression,contextNode){ 
	return document.evaluate(expression,contextNode,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}

function getParameter(url, parameter){
	if (url != null && url.indexOf('?') != -1){ 
		var vars = url.split('?')[1].split('&');
		for (var i=0; i < vars.length; i++){ 
			if (vars[i].split('=')[0] == parameter){ 
				return vars[i].split('=')[1];
			}
		}
	}
	return null;
}

function setUserName(){
    var username = prompt("Set your username of CiteULike:");
    GM_setValue("username",username);
}

function renderPage(){
    GM_registerMenuCommand('Set Username for CiteULike', setUserName);
    
	if (document.location.href.indexOf("scholar.google.com/scholar?") != -1){ 
		var query = getParameter(document.location.href,"q");
		GM_setValue("Q",query);

		var allElements, thisElement;
		allElements = document.evaluate("//a", document, null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < allElements.snapshotLength; i++){ 
			thisElement = allElements.snapshotItem(i);
			var text = thisElement.innerHTML;
			if (text.indexOf("BibTeX") != -1){
				thisElement.setAttribute("target","_new");
				var mycul = "<font color='red'> My</font>CiteULike"; 
				thisElement.innerHTML = text.replace("BibTeX",mycul);
			}
		} 
	}
	if (document.location.href.indexOf("scholar.google.com/scholar.bib") != -1 ){
		GM_setValue("B","");
		var bibtex = document.body.innerHTML;
		bibtex = bibtex.replace("<pre>","");
		bibtex = bibtex.replace("</pre>","");
		if (!GM_getValue){ 
			alert("You need the newest version of Greasemonkey to run this script. Please upgrade."); 
			return;
		}
      
		var username = GM_getValue("username","");
		if (username == ""){ 
			username = prompt('Please set your username to access CiteULike');
			GM_setValue("username", username);
		} 
		GM_setValue("B",bibtex);
        
		document.location = "http://www.citeulike.org/profile/" + username + "/import_go"; 
	}

	if (document.location.href.split('?')[0] == "http://www.citeulike.org/login"){ 
	    var username = GM_getValue("username","");

	    var inputUsername = document.getElementById("username");
	    if (inputUsername){
	        inputUsername.value = username;
	    }
		
		var allElements, thisElement;
		allElements = document.evaluate("//input[@name='from']", document, null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < allElements.snapshotLength; i++){ 
			thisElement = allElements.snapshotItem(i);
			thisElement.value = "/profile/" + username + "/import_go"; 
		}
	}
  
	if (document.location.href.indexOf("http://www.citeulike.org/profile/" 
	+ GM_getValue("username","") + "/import_go") != -1){ 
		var B = GM_getValue("B","");
		var allElements, thisElement;

		allElements = document.evaluate("//textarea[@name='pasted']", document, null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < allElements.snapshotLength; i++) {
			thisElement = allElements.snapshotItem(i);
			thisElement.value = B;
		}

		allElements = document.evaluate("//input[@name='btn_ris']", document, null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < allElements.snapshotLength; i++) {
			thisElement = allElements.snapshotItem(i);
			thisElement.parentNode.removeChild(thisElement);
		}
    
		allElements = document.evaluate("//input[@name='tag']", document, null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < allElements.snapshotLength; i++) {
			thisElement = allElements.snapshotItem(i);
			thisElement.value = GM_getValue("Q","").replace("+"," ");
			thisElement.setAttribute("style", "height:40px;color:red;font-face:tahoma;font-size:20px");
		}
	}
}

window.addEventListener("load", renderPage, false);