// ==UserScript==
// @name STP Linker
// @namespace stp
// @description adds some useful links to the menu
// @include http://universe*.strivetopower.de/*
// @version 0.50
// ==/UserScript==

(function() {
	// get menu container
    var navlin2 = document.getElementById("navlin2");

    if (navlin2) {
        // generate resource link
    	var expr = /universe(.*?)\.strive/;
    	expr.exec(document.location);
    	var uni = RegExp.$1;
    	
    	var table = navlin2.getElementsByTagName("table")[0];
    	var trs = table.getElementsByTagName('tr');

    	var link = document.createElement("a");
    	link.innerHTML = "Res.&uuml;bersicht";
    	link.href = "http://universe" + uni + ".strivetopower.de/account.php?show=resources";    	

    	var newTd = document.createElement("td");
    	newTd.className = "butlin";
    	newTd.height = "18";
    	newTd.align = "center";
    	newTd.appendChild(link);
    	
    	var newTr = document.createElement("tr");
    	newTr.appendChild(newTd);

    	var spaceTr = trs[1].cloneNode(true);

    	table.tBodies[0].insertBefore(spaceTr, trs[4]);
    	table.tBodies[0].insertBefore(newTr, trs[4]);
    }
})();