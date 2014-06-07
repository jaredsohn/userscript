// ==UserScript==
// @name       Findings logger
// @version    0.1
// @description  Tracks findings in MineThings.
// @match      *.minethings.com/mines/check_mines
// @match      *.minethings.com/mines/explode_mine/*
// @copyright  2013+, Hotrootsoup
// ==/UserScript==

var i = 0;

if (window.location.href.indexOf("explode_mine") === -1) { //If it's a find and not an explosion

    var tables = document.body.getElementsByClassName("things-table"); //Should be two long, with [0] being new, and [1] being old
    
    if ( (tables.length !== 2) || (tables[0].getElementsByTagName("a").length === 0)) { //Report findings and exit
        var listVals = GM_listValues();
        console.log("No new findings");
        for (i = 0; i<listVals.length; i++) {
            console.log(listVals[i] + " : " + GM_getValue(listVals[i]));
        }
        return;
    }
    
    var items = tables[0].getElementsByTagName("td");
    
    var tempObject = {};
    var tempString = "";
    
    for (i=0; i<items.length; i++) {
        tempString = items[i].innerText.slice(5); //To prevent excess slow GM storage calls, we create the table beforehand. Slice to remove 'New: '
        if (!tempObject[tempString]) {
            tempObject[tempString] = 1;
        }
        else {
            tempObject[tempString]++;
        }
    }
   
}

else {
    var tables = document.body.getElementsByClassName("things-table");
    if (tables.length !== 1) {
        var listVals = GM_listValues();

		for (i = 0; i<listVals.length; i++) {
    		console.log(listVals[i] + " : " + GM_getValue(listVals[i]));
		}
        return;
    }
    
    else {
        var items = tables[0].getElementsByTagName("a");
        var tempObject = {};
        var tempString = "";
        
        for (i=0; i<items.length; i++) {
            tempString = items[i].innerText; //To prevent excess slow GM storage calls, we create the table beforehand.
            if (!tempObject[tempString]) {
                tempObject[tempString] = 1;
            }
            else {
                tempObject[tempString]++;
            }
        }
    }
}

for (var key in tempObject) {
	if (!GM_getValue(key)) {
		GM_setValue(key, tempObject[key]);
	}
	else {
		GM_setValue(key, (GM_getValue(key) + tempObject[key]));
	}
}
        
var listVals = GM_listValues();

for (i = 0; i<listVals.length; i++) {
    console.log(listVals[i] + " : " + GM_getValue(listVals[i]));
}