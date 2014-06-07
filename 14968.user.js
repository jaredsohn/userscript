// ==UserScript==
// @name          FogBugz 6 Open In Tabs
// @namespace     http://atellis.com/ns/userscripts
// @description	  Adds a "Tabs" link to the actions at the bottom of list pages to open checked cases in a new tab each
// @include       https://*.fogbugz.com/*
// ==/UserScript==

(function() {
	
    var container;
    container = document.getElementById('idActionP');
    if (!container) { 
    	window.status = "FogBugz Open In Tabs failed:  idActionP not found";
    	return; 
    }
    
    var child = container.firstChild;
    var tabs = document.createElement('a');

	var ca = function(name, value) {
		var attr = document.createAttribute(name);
		attr.value = value;
		tabs.attributes.setNamedItem(attr);
	}

    var fogBugzOpenInTabs = function(e) {
		var ids = unsafeWindow.getBugValues(false).split(",");
		if (ids.length == 0) {
			window.status = "No cases selected to open in tabs.";		
			return;
		}
		var loc = window.location;
		var rootUrl = loc.protocol + "//" + loc.host + loc.pathname + "?";
		
		for(var i = 0; i<ids.length; i++) {
			GM_openInTab(rootUrl + ids[i]);
		}
		window.status = "Opened " + ids.length + " cases in tabs.";
		return false;
	}
		
    ca("id", "openInTabs");
    ca("onmouseout", "window.status='';return true;");
    ca("onmouseover", "window.status='Open in Tabs';return true;");
    ca("href", "#");
    ca("class", "actionButton");
    
    tabs.appendChild(document.createTextNode("Tabs"));
    container.insertBefore(tabs, child);
    
    tabs.addEventListener("click", fogBugzOpenInTabs, false);
})();


