// ==UserScript==// @name          FogBugz 5 Open In Tabs+// @namespace     http://www.japaninyourpalm.com// @description	  Adds a "Tabs" link to the top and bottom of case list pages, when clicked it opens each case in a new tab each. Also changes the Firefox tab title so it starts with the Fogbugz case number.
// @include       https://*.fogbugz.com/*
// ==/UserScript==

// IMPORTANT: set the @include to your FogBugz url

// Based on a script for FogBugz 6 written by Samuel Neff of Atellislabs. 
// His script can be found at http://userscripts.org/scripts/show/14968
// I've altered that script to work with FogBugz5 and to set the tab label
// to start with the case #, so you can quickly tell which tab is which.
// Al N, December 2007
(function() {

    var xpath = "/html/body[@id='www-fogcreek-com-fogbugz']/div[@id='mainArea']/div[@id='pgListContainer']/p";

    var container = document.evaluate(xpath,
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Add new Tabs button at top and bottom of case list    if (container) {
    	    // bottom        var child = container.firstChild;    var tabs = document.createElement('a');	var ca = function(name, value) {		var attr = document.createAttribute(name);		attr.value = value;		tabs.attributes.setNamedItem(attr);	}    var fogBugzOpenInTabs = function(e) {		var ids = unsafeWindow.getBugValues(false).split(",");		if (ids.length == 0) {			window.status = "No cases selected to open in tabs.";					return;		}		var loc = window.location;		var rootUrl = loc.protocol + "//" + loc.host + loc.pathname + "?";				for(var i = 0; i<ids.length; i++) {			GM_openInTab(rootUrl + ids[i]);		}		window.status = "Opened " + ids.length + " cases in tabs.";		return false;	}		    ca("id", "openInTabs");    ca("onmouseout", "window.status='';return true;");    ca("onmouseover", "window.status='Open in Tabs';return true;");    ca("href", "#");    ca("class", "actionButton");        tabs.appendChild(document.createTextNode("Tabs"));    container.insertBefore(tabs, child);        tabs.addEventListener("click", fogBugzOpenInTabs, false);

    
    // top    	
    if (document.getElementById('groupTitle_1') || document.getElementById('groupTitle_All') ) {
    	var groupTitleElem;

        if (document.getElementById('groupTitle_1')) {    	
            groupTitleElem = document.getElementById('groupTitle_1');
        }
        else if (document.getElementById('groupTitle_All')) {
            groupTitleElem = document.getElementById('groupTitle_All');
        }        	
        
        // left this code here as it seems this was the top id once
        // if (document.getElementById('groupTitle_prototype')) {    	
        // groupTitleElem = document.getElementById('groupTitle_prototype');
        //}

        var groupTdElem = groupTitleElem.getElementsByTagName('td')[0];
        var tabs2 = tabs.cloneNode(true);
        var tabTd = document.createElement('td');
        tabTd.setAttribute('colspan','2');
        tabTd.appendChild(tabs2);
        groupTitleElem.insertBefore(tabTd, groupTitleElem.firstChild);
        tabs2.addEventListener("click", fogBugzOpenInTabs, false);        
    }
    
    
    } else if (document.getElementById('idAndTitleView')) {
    	
    // make the case # the first text in each tab title
    var caseTitlePattern = /FogBugz\s(\d+)/;
    var fogbugzTitle = document.title;
    if (caseTitlePattern.test(fogbugzTitle)) {        fogbugzTitle = fogbugzTitle.replace(/FogBugz\s/, '');
        document.title = fogbugzTitle + ' FogBugz';    }


    } else { 
	    return;
    } 

        })();