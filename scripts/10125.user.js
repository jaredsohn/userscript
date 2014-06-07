// OWA 2007 Light Print
// version 0.4
// 2007-06-24
// Copyright (c) 2007, Ron Ridley
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
// ==UserScript==
// @name            OWA 2007 Light Print
// @namespace       http://www.gristlepit.com/ron/owa2007lightprint.user.js
// @description     This applies to the spartan Outlook Web Access "Light" version that comes with Exchange 2007.  This script adds a print button to the message view.  When pressed it removes unecessary elements (folder list, search bar, etc), launches the print dialog and puts the page back the way it was.
// @include         https://mail.domain.com/owa/*
// ==/UserScript==

(

function()
{
	var thisElement;
	var elementsToHide;
	elementsToHide=["//td[@class='nvtd']","//td[@class='spc']","//table[@class='tbhd']","//img[@id='imgLogo']",
	"//table[@id='tblSch']","//table[@class='ob']","//table[@class='nvwh100']","//td[@class='nvft']",
	"//td[@valign='bottom']","//td[@class='tdLogoB']"];
	function xpath(query) {
	    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}


	function setElements(value){
		for (i in elementsToHide) {
			thisElement = xpath(elementsToHide[i]);
			for (x = 0; x < thisElement.snapshotLength; x++) {
		    	currElement = thisElement.snapshotItem(x);
		    	currElement.style.display = value;
		    }
		}
	}
        function resetElements(){
		setElements("");
	}
	function printEmail(){
		setElements("none");
		window.print();
		window.setTimeout(resetElements, 1000);
	}

	var link;
	link = document.createElement("td");
	link.setAttribute("nowrap", "");
	link.innerHTML = '<a id="lnkHdrprint" title="Print" class="btn" href="#">Print</a>';
	closeBtn = document.getElementById("lnkHdrclose");
	if (closeBtn != undefined){
		closeBtnTd = closeBtn.parentNode;
		parentElement = closeBtnTd.parentNode;
		parentElement.insertBefore(link, closeBtnTd);
		divider = document.createElement("td");
		divider.setAttribute("class", "dv");
		divider.innerHTML = '<img alt="" src="8.0.685.24/themes/base/tbdv.gif"/>';
		printBtn = document.getElementById("lnkHdrprint");
		printBtnTd = printBtn.parentNode;
		parentElement.insertBefore(divider, printBtnTd.nextSibling);
		printBtn.addEventListener("click", printEmail, true);
	}
	
}
)();
//END FILE