// ==UserScript==
// @name           Cat4view
// @namespace      http://userscripts.org/users/69486
// @description    Fixes the modaon display
// @include        http://gadash.no-ip.org:8081/*
// ==/UserScript==

unsafeWindow.openfullscreen = function (page) {
unsafeWindow.open(page,"demo","width=640, height=480");
}

function fixBorders() {
var tableCells=document.getElementsByTagName("td");
for (i=0;i<tableCells.length;i++) {
	if (tableCells[i].style.borderStyle.indexOf("solid")!=-1) {
		if (tableCells[i].style.borderBottomWidth=="1px")
			tableCells[i].style.borderRightWidth=tableCells[i].style.borderLeftWidth=tableCells[i].style.borderTopWidth="0px";
		else if (tableCells[i].style.borderBottomWidth=="0pt")
			tableCells[i].style.borderRightWidth=tableCells[i].style.borderLeftWidth="1px";
		else if (tableCells[i].style.borderTopWidth=="1px") 
			tableCells[i].style.borderLeftWidth=tableCells[i].style.borderBottomWidth="0px";
		else if (tableCells[i].style.borderTopWidth=="0pt")
			tableCells[i].style.borderRightWidth=tableCells[i].style.borderLeftWidth=tableCells[i].style.borderBottomWidth="1px";
		else if (tableCells[i].style.borderLeftWidth=="1px")
			tableCells[i].style.borderRightWidth=tableCells[i].style.borderBottomWidth=tableCells[i].style.borderTopWidth="0px";
		else
			tableCells[i].style.borderWidth="1px";
	}		
}
}

fixBorders();