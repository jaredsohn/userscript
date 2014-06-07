// ==UserScript==
// @name           Aadsas Status
// @namespace      http://userscripts.org
// @description    Shows iFrames of all statuses on first page.
// @include        https://aadsas.adea.org/aadsas08/emptyframe.cgi*
// ==/UserScript==

var usefuldummy;
for (var x in document.links){
	var href = document.links[x].href;
	if (href!=null){
		var sIdx = href.indexOf('usefuldummy');
		if (sIdx>-1){	
			var eIdx = href.indexOf('&', sIdx+1);
			usefuldummy = href.substring(sIdx,eIdx);
			break;
		}
	}
}

var td = document.createElement("td");

// AADSAS GPAS
/* 
var gpaFrame = document.createElement("iframe");
gpaFrame.width=800;
gpaFrame.height=150;
gpaFrame.src="menu.cgi?"+usefuldummy+"&formname=evaluation&procedure=displayGPA";
td.appendChild(gpaFrame);
*/

// Transcripts
/*
var transFrame = document.createElement("iframe");
transFrame.width=800;
transFrame.height=150;
transFrame.src="menu.cgi?"+usefuldummy+"&formname=evaluation&procedure=studentTranscripts";
td.appendChild(transFrame);
*/

// Designations
/*
var desigFrame = document.createElement("iframe");
desigFrame.width=800;
desigFrame.height=150;
desigFrame.src="menu.cgi?"+usefuldummy+"&formname=evaluation&procedure=desigPaymentStatus";
td.appendChild(desigFrame);
*/

// Supplemental Materials
var suppFrame = document.createElement("iframe");
suppFrame.width=800;
suppFrame.height=150;
suppFrame.src="menu.cgi?"+usefuldummy+"&formname=evaluation&procedure=displaySupp";
td.appendChild(suppFrame);

// At Designated Schools
var statusFrame = document.createElement("iframe");
statusFrame.width=800;
statusFrame.height=300;
statusFrame.src="menu.cgi?"+usefuldummy+"&formname=evaluation&procedure=displayStatus";
td.appendChild(statusFrame);


var tr = document.createElement("tr");
tr.appendChild(td);

var table = document.createElement("table");
table.appendChild(tr);

var tables = document.getElementsByTagName("table");

var parent = tables[7].parentNode;
parent.appendChild(table);
parent.removeChild(tables[7]);

for (var x in document.images){
	if (document.images[x].src=='https://aadsas.adea.org/aadsas2008/images/checklisttt.gif'){
		document.images[x].src = '/aadsas2008/images/statusss.gif';
	}
}


