// ==UserScript==
// @name           Priority Group Sort
// @namespace      pgs@kwierso.com
// @description    Prioritize certain groups in the sorting order!
// @include        http://*.roosterteeth.com/*
// @include        https://*.roosterteeth.com/*
// @include        http://roosterteeth.com/*
// @include        https://roosterteeth.com/*
// ==/UserScript==


(function() {
    // Priority order of groups
    // (Put the group id numbers in this variable's brackets,
    //  separated by commas)
    var priority = [];

    // The original order of group elements and their group IDs
    var tCells = [];
    var tIDs = [];

    // The newly reordered list of group elements
    var newOrder = [];

    // Reused variable to store index of specified groups
    var theIndex;

    try {
        var x = document.getElementById("Groups").firstChild
                    .getElementsByTagName("table")[0].firstChild;
    } catch(e) {
        try {
            var x = document.getElementById("My Group Memberships")
                    .firstChild.getElementsByTagName("table")[0].firstChild;
        } catch(er) { 
            // There is no list of groups on this page. 
            // Exit script now before errors occur.
            return;
        }
    }

    for(i in x.childNodes) {
        for(j in x.childNodes[i].childNodes) {
            try {
                tIDs.push(x.childNodes[i].childNodes[j].getElementsByTagName("a")[0].href);
                tCells.push(x.childNodes[i].childNodes[j]);
            } catch(e) {
            
            }
        }
    }

    for(i in tIDs) {
        tIDs[i] = tIDs[i].split("?id=")[1];
    }

    for(i in priority) {
        // Find array index of prioritized groups
        theIndex = tIDs.indexOf(priority[i].toString());

        // Group ID found in tIDs, time to push the group to the front
        // and remove it from the original array
        if(theIndex >= 0) {
            newOrder.push(tCells[theIndex]);
            tCells[theIndex] = undefined;
        }
        else {
            console.log("GroupID " + priority[i] + " not found in array.");
        }
    }

    // Add the rest of the groups to the new order
    for(i in tCells) {
        if(tCells[i] != undefined)
            newOrder.push(tCells[i]);
    }

    // Wipe the original groups from the page
    x.innerHTML = "";

    // Put the newly reordered groups onto the page
    var newRowCheck = 2;
    for(i in newOrder) {
        if(newRowCheck == 2) {
            x.appendChild(document.createElement("tr"));
            newRowCheck = 0;
        }
        x.childNodes[x.childNodes.length -1].appendChild(newOrder[i]);
        newRowCheck++;
    }
})();