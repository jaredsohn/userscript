// copyright 2007 Billy wenge-murphy
// Started: July 22, 2007
// Originally released: July 25, 2007

// ==UserScript==
// @name Ok Cupid stalker counter
// @version	1.0
// @namespace	http://doorknobsoft.com/greasemonkey/scripts/
// @description	Counts stalkers on Ok Cupid
// @include	http://*.okcupid.com/stalker*
// ==/UserScript==

( function() {

	// get the HTML of the whole page
	stalkersHTML = document.getElementsByTagName("HTML")[0].innerHTML;
	stalkerArray = stalkersHTML.match(/<!-- STALKER -->/g);
	stalkerCount = stalkerArray.length;
	
		/*
		#stalkerInfo {
	width:630px; height:32px;
	padding:14px 15px 0px 15px;
	text-align:center;
	background:url("http://is2.okcupid.com/_img/layout2/other/bkg_660_blueround.png") no-repeat;
	font-weight:bold; color:#444; font-size:10pt;
	margin-bottom:15px; */
	
		// make a box to display the info in
		infoBox = document.createElement("DIV");
		infoBox.setAttribute("ID","stalkerCount");
		infoBox.style.display = "block";
		infoBox.style.width = "630px";
		infoBox.style.height = "32px";
		infoBox.style.zIndex = 12456789;
		infoBox.style.textAlign = "center";
		infoBox.style.padding = "14px 15px 0px 15px";
		infoBox.style.backgroundImage = "url(http://is2.okcupid.com/_img/layout2/other/bkg_660_blueround.png)";
		infoBox.style.marginBottom = "15px";
		infoBox.style.fontSize = "10pt";
		infoBox.innerHTML = "Stalker count goes here. If you're seeing this, it didn't work";
		
		stalkerInfo = document.getElementById("stalkerInfo");
		parentDiv = stalkerInfo.parentNode;
		
		parentDiv.insertBefore(infoBox, stalkerInfo);
		
		document.getElementById("stalkerCount").firstChild.nodeValue = "Total Stalkers: " + stalkerCount;

}

)();
