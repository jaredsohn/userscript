// ==UserScript==
// @name           Java API enhancer
// @namespace      http://userscripts.org/users/125666
// @description	 	 User script to add class search/filter functionality on Java APIs pages
// @include				 http://java.sun.com/j2se/1.5.0/docs/api/ 
// ==/UserScript==



//init the Search on page load
window.addEventListener(
    'load', 
    addSearch, 
		true)

function doSearch() {
	
	var f = document.getElementsByName("packageFrame");
	var fDoc = f[0].contentDocument;
	
	var sVal = fDoc.getElementById("tbSearch").value;
	
	//show all if blank
	if (sVal.length == 0) {
		fDoc.getElementById("allClasses").style.display = 'block';
		fDoc.getElementById("resultTable").style.display = 'none';
		return;
	}
	
	var rTr = fDoc.getElementById("searchResult");
	
	//clear the result table	
	while (rTr.hasChildNodes()) {
		rTr.removeChild(rTr.firstChild);
	}
	
	//xpath to find all class anchors that matches criteria (case insensitive)	
	var nss = fDoc.evaluate("//a[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'" + sVal.toLowerCase() + "')]", fDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	
	for ( var i=0 ; i < nss.snapshotLength; i++ )
	{
	 	rTr.appendChild(nss.snapshotItem(i).cloneNode(true));
	 	rTr.appendChild(fDoc.createElement('br'));
	} 
  
	fDoc.getElementById("allClasses").style.display = 'none';
	fDoc.getElementById("resultTable").style.display = 'block';	
}

function addSearch() {
	
	var f = document.getElementsByName("packageFrame");
	var fDoc = f[0].contentDocument;
	
	var dSearch = fDoc.createElement('div');
	dSearch.setAttribute("style", "margin-bottom:7px;font-family:Arial;font-size:10pt;padding:3px;width:220px;");
	
	
	//create search textfield
	var iSearch = fDoc.createElement('input');
	iSearch.setAttribute("type", "text");
	iSearch.setAttribute("id", "tbSearch");
	iSearch.setAttribute("style", "border-style:solid;border-width:2px;");
	iSearch.addEventListener(
			'keyup',
			keyListen,
			true);
	
	//create search button
	var bSearch = fDoc.createElement('input');
	bSearch.setAttribute("type", "button");
	bSearch.setAttribute("value", "Search");
	bSearch.setAttribute("style", "margin-left:3px;border-style:solid;border-width:2px;cursor:pointer;");	
	bSearch.addEventListener(
			'click',
			doSearch,
			true);
	
	dSearch.appendChild(iSearch);
	dSearch.appendChild(bSearch);
	fDoc.body.insertBefore(dSearch, fDoc.body.firstChild);

	//give the original table an ID..
	var tbNode = fDoc.evaluate("//table", fDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	tbNode.singleNodeValue.setAttribute("id", "allClasses");
	
	//create the table to hold the filtered results
	var tSearch = fDoc.createElement('div');
	tSearch.innerHTML = '<font class="FrameItemFont"><table id="resultTable" border="0" width="100%" style="display: none;"><tbody><tr><td id="searchResult"></td></tr></tbody></table></font>';
	fDoc.body.appendChild(tSearch.firstChild);
	
}

//perform search on enter key pressed
function keyListen(e) {
	if (e.which == 13) {
		doSearch();
	}
}
