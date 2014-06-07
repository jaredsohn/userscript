// ==UserScript==
// @name           TravianReportCleaner
// @description    Clean all report
// @include        http://*.travian.com.vn/berichte.php*
// @include        http://*.travian.com.vn/nachrichten.php*

// ==/UserScript==


function Initialize()
{
	if (document.URL.indexOf('berichte.php') > -1 ) {
		// Add on Delete all button
		var menulist = document.getElementById("textmenu");  	
		menulist.innerHTML = menulist.innerHTML + " | ";
		var button = this.document.createElement("a");
		button.href = "javascript:void(0)";
		button.innerHTML = "Clean Reports";
		button.title = "Clean Reports";
		button.addEventListener('click', deleteallReport, false);
		menulist.appendChild(button);

		// Check if the 

		ProcessReportList();
		if (GM_getValue("DELETEALL", false)) {
			deleteallReport();
		}
	}
	if (document.URL.indexOf('nachrichten.php') > -1 ) {
		var inputlist = document.getElementsByTagName("input");  	
		for (i = 0; i < inputlist.length; i++) {
			if ( inputlist[i].getAttribute("type") == 'checkbox' ) {
				if (inputlist[i].checked)	inputlist[i].checked = false
				else inputlist[i].checked = true;
			}
		}
	}
}

function deleteallReport() {
	GM_setValue("DELETEALL", true);

	var rptTable = document.getElementById('overview');
	var lastCell = rptTable.rows[rptTable.rows.length-1].cells[2];

	if(lastCell.childNodes.length > 1) {
		var previousUrl = lastCell.childNodes[0].href;
		var nextUrl = lastCell.childNodes[1].href;
	}


	if (!GM_getValue("ISEMPTY")) {
		setTimeout(document.getElementById("btn_delete").click(), 5000);		
	} else {
		if (nextUrl) {
			window.location.replace(nextUrl);
		} 
		else /*nothing left*/
		{
			GM_setValue("DELETEALL", false);
		}
	}


}

// Check if any other page left
function isNextPage() {
	var rptTable = document.getElementById('overview');
	var lastCell = rptTable.rows[rptTable.rows.length-1].cells[2];
	if(lastCell.childNodes.length > 1) {
		var previousUrl = lastCell.childNodes[0].href;
		var nextUrl = lastCell.childNodes[1].href;
		if (nextUrl) return true;
	}
	return false;
}


function ProcessReportList() {

	var rptTable = document.getElementById('overview');
	
	// get the previous and next links 
	var rows = document.getElementById("overview").rows;


	GM_setValue("ISEMPTY", true);

    	for(var i=1; i<rows.length-1; i++) {

		var td = rows[i].cells[1];		
		var td0 = rows[i].cells[0];		
		
		// GM_log("Row" + i + " out of " + rows.length + " -->" + td0.innerHTML);
		

		var img = xpathToFirstFound("img", td);
		var rowcheck = xpathToFirstFound("input[@type='checkbox']", td0);
		

			/* Checked unneccessary items*/
			if ( 	(img.className.indexOf('iReport1') > -1 && img.className.length == 16) || 
				img.className.indexOf('iReport11') > -1 || 
				img.className.indexOf('iReport12') > -1 || 
				img.className.indexOf('iReport13') > -1 || 
				img.className.indexOf('iReport14') > -1	)
			{
				if (rowcheck.getAttribute("type") == 'checkbox') {
					rowcheck.checked = true;
					GM_setValue("ISEMPTY", false);
				}
			}
			
	}
	//		window.location.replace(rootPath + "berichte.php");//ToDo: reload



}

function xpathToList(query, startNode) {
	if (!startNode) startNode = document;
    return document.evaluate(query, startNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathToFirstFound(query, startNode) {
	if (!startNode) startNode = document;
    return document.evaluate(query, startNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


Initialize();
 
       

