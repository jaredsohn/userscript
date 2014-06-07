// ==UserScript==
// @name           Show Remaining Building Space
// @namespace      apache1990.dod.net
// @description    Shows how many build spots are left at your colony in the colony overview.
// @include        *.war-facts.com/view_colony.php*
// ==/UserScript==


unsafeWindow.loadXMLDoc = function(url){
	req = new XMLHttpRequest();
	req.onreadystatechange = unsafeWindow.processReqChange();
	req.open("GET", url, true);
	req.send(null);
}


unsafeWindow.processReqChange = function(){
	// only if req shows "complete"
	GM_log(req.readyState);
	if (req.readyState == 4){
	        // only if "OK"
        	if (req.status == 200) {
			var mainTables = document.getElementsByTagName('tbody')[0];
			var topMainTableStart = mainTables.rows[0];
        		pages = req.responseText;
			pages = pages.substring(pages.indexOf("This colony has room for"), pages.lastIndexOf("more.")+5);
			// Write Output
			var nnrow1 = document.createElement('tr');
			var nncol1 = document.createElement('td');
			nncol1.setAttribute("colspan", "4");
			nncol1.setAttribute("style", "background-color: #000000");
			nncol1.appendChild(document.createTextNode(pages));
			nnrow1.appendChild(nncol1);
			GM_log(mainTables);
			mainTables.insertBefore(nnrow1, topMainTableStart);
	        } else {
			alert("There was a problem retrieving the XML data:\n" + req.statusText);
	        }
	}else{
		setTimeout("processReqChange()", 1000);
	}
}

unsafeWindow.setVariables = function(){
	var req;
	
	// Stop and grab colony ID and planet ID for later
	var colony1 = window.location;
	colony1 = colony1.toString();
	colony1 = colony1.split("=")[1];
	var pages;
	unsafeWindow.loadXMLDoc("http://" + window.location.hostname + "/build_facility.php?colony=" + colony1);
	GM_log("http://" + window.location.hostname + "/build_facility.php?colony=" + colony1);
}

unsafeWindow.setVariables();