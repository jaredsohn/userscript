// ==UserScript==
// @name           RT - Cycle Through Groups
// @namespace      rtctg@kwierso.com
// @include        http://*.roosterteeth.com/*
// @include        https://*.roosterteeth.com/*
// @include        http://roosterteeth.com/*
// @include        https://roosterteeth.com/*
// ==/UserScript==

var rowsVisible = 5;  // Number of rows to be displayed at any time
                      // Can be changed by user

var clonedX;          // Copy of all groups
var currentRange = 0; // Initial row for groups
var groupsLimit;      // Total number of rows of groups

(function() {
    try {
        var x = document.getElementById("My Group Memberships")
                .firstChild.getElementsByTagName("table")[0].firstChild;
        var buttonHolder = document.getElementById("My Group Memberships")
                .previousSibling.getElementsByTagName("table")[0]
                .getElementsByTagName("tr")[0].lastChild;
    } catch(er) { 
        // There is no list of groups on this page. 
        // Exit script now before errors occur.
        return;
    }

    // Make a copy of the entire groups list for use later.
    clonedX = x.cloneNode(true);

    // Add the "Previous" button
    var prevButton = document.createElement("a");
    prevButton.innerHTML = "<b>Previous</b>";
    prevButton.addEventListener("click", prevGroups, true);
    buttonHolder.style.textAlign = "right";
    buttonHolder.style.paddingRight = "20px";
    buttonHolder.appendChild(document.createTextNode(" [ "));
    buttonHolder.appendChild(prevButton);
    buttonHolder.appendChild(document.createTextNode(" ] "));

    // Add the "Next" button
    var nextButton = document.createElement("a");
    nextButton.innerHTML = "<b>Next</b>";
    nextButton.addEventListener("click", nextGroups, true);
    buttonHolder.style.textAlign = "right";
    buttonHolder.style.paddingRight = "20px";
    buttonHolder.appendChild(document.createTextNode(" [ "));
    buttonHolder.appendChild(nextButton);
    buttonHolder.appendChild(document.createTextNode(" ] "));

    // Add the "Show/Hide" button
    var showHideButton = document.createElement("a");
    showHideButton.innerHTML = "<b>Show</b>";
    showHideButton.addEventListener("click", showAllgroups, true);
    buttonHolder.style.textAlign = "right";
    buttonHolder.style.paddingRight = "20px";
    buttonHolder.appendChild(document.createTextNode(" [ "));
    buttonHolder.appendChild(showHideButton);
    buttonHolder.appendChild(document.createTextNode(" ] "));

    // How many rows of groups are on the page
    groupsLimit = x.childNodes.length;

    // Make sure the number of rows to be displayed at a 
    // single time is within the valid range of rows
    if(rowsVisible < 1)
        rowsVisible = 1;
    if(rowsVisible > groupsLimit)
        rowsvisible = groupsLimit;

    var z = [];

    //Initialize group holder element with rowsVisible number of rows
    for(i =0; i< groupsLimit;i++) {
        z.push(x.childNodes[i]);
    }

    for(i =0; i< groupsLimit;i++) {
        x.removeChild(x.firstChild);
    }

    for(i = 0; i < rowsVisible && i < groupsLimit; i++) {
        x.appendChild(z[i]);
    }
})();

// Cycle through the next rowsVisible number of rows
function nextGroups() {
    var reClone = clonedX.cloneNode(true);
    var x = document.getElementById("My Group Memberships").firstChild
                    .getElementsByTagName("table")[0].firstChild;

    var z = [];

    currentRange = currentRange + rowsVisible;

    for(i = 0; i < rowsVisible; i++) {
        try {
            z.push(reClone.childNodes[(currentRange + i) % groupsLimit]);
        } catch(e) { break; }
    }

    while(x.hasChildNodes()) {
        x.removeChild(x.lastChild);
    }

    for(i in z) {
        x.appendChild(z[i]);
    }

    delete reClone;
    delete z;
    delete x;
}

// Cycle back to the rowsVisible number of rows
function prevGroups() {

    var reClone = clonedX.cloneNode(true);
    var x = document.getElementById("My Group Memberships").firstChild
                    .getElementsByTagName("table")[0].firstChild;

    var z = [];

    if(currentRange - rowsVisible < 0) {
        currentRange = groupsLimit - Math.abs(currentRange - rowsVisible);
    }
    else
        currentRange = (currentRange - rowsVisible ) % groupsLimit;

    for(i = 0; i < rowsVisible; i++) {
        try {
            z.push(reClone.childNodes[(currentRange + i) % groupsLimit]);
        } catch(e) { break; }

    }

    while(x.hasChildNodes()) {
        x.removeChild(x.lastChild);
    }

    for(i in z) {
        x.appendChild(z[i]);
    }

    delete reClone;
    delete z;
    delete x;
}

// Toggle visibility of all rows. When "hide"
// is clicked, it restores the list of rows
// to the initial rowsVisible number of rows
function showAllgroups() {
    var reClone = clonedX.cloneNode(true);
    var x = document.getElementById("My Group Memberships").firstChild
                    .getElementsByTagName("table")[0].firstChild;

    if(this.firstChild.innerHTML == "Show") {
        x.innerHTML = reClone.innerHTML;

        this.firstChild.innerHTML = "Hide";
    } else {
        var z = [];

        for(i =0; i< groupsLimit;i++) {
            z.push(reClone.childNodes[i]);
        }

        while(x.hasChildNodes()) {
            x.removeChild(x.lastChild);
        }

        for(i = 0; i < rowsVisible && i < groupsLimit; i++) {
            x.appendChild(z[i]);
        }

        delete z;

        this.firstChild.innerHTML = "Show";
    }

    delete reClone;
    delete x;
}