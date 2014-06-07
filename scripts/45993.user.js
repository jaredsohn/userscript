/**
* @Author ANDERSON-BR
* @Copyright 2009
*/


// ==UserScript==
// @name           VCDQuality GoodQuality Only
// @include      http://*vcdq.com/*
// @description    Removes TELESYNC, CAM, WORKPRINT and UNKNOWN types of videos from the list
// ==/UserScript==

table = document.getElementById('content').getElementsByTagName('table')[0];
lines = table.getElementsByTagName("tr");

//TD
for (var i=1;i<lines.length;i++) { 
	line=lines[i];

	if (line.getElementsByTagName("a")[0].innerHTML == "TELESYNC" || line.getElementsByTagName("a")[0].innerHTML == "CAM" || line.getElementsByTagName("a")[0].innerHTML == "WORKPRINT"|| line.getElementsByTagName("a")[0].innerHTML == "UNKNOWN") {
		
		line.parentNode.deleteRow(i);
		i=i-1;
		continue;
	};
}