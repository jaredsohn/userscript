// ==UserScript==
// @name          AllMusic Table Expander
// @namespace     http://cobblepot.com
// @description   Fixes (non) expandable tables at allmusic.com
// @include       http://www.allmusic.com/*
// @include       http://allmusic.com/*
// ==/UserScript==


if (document.getElementById("ExpansionTable1")) {
    window.cobblepot_showTimer;
    window.cobblepot_hideTimer;
    window.cobblepot_last;
    
    var rows = document.evaluate("//tr[@class='visible']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for (var i = 0, row, nextRow; i < rows.snapshotLength; i++) {
        row = rows.snapshotItem(i);
        
        // In discography tables, 'expand' rows directly follow 'visible' rows,
        //   but in album overview tables, text elements come between them.
        nextRow = row.nextSibling;
        if (nextRow && nextRow.nodeType == 3) nextRow = nextRow.nextSibling;

        // Some visible rows don't have matching details.
        if (nextRow && nextRow.nodeType == 1 && nextRow.getAttribute("id") == "trlink"
                && nextRow.getAttribute("class") == "expand")
        {
            row.addEventListener('mouseover', function() { timerShowDetails(this) }, false)
            row.addEventListener('mouseout', function() { timerHideDetails(this) }, false)

            nextRow.addEventListener('mouseover', function() { timerShow(this) }, false)
            nextRow.addEventListener('mouseout', function() { timerHide(this) }, false)

            // give rows unique and mappable id's
            nextRow.setAttribute("id", "cobblepot_details_" + i);
            row.setAttribute("id", "cobblepot_visible_" + i);

            // hide row containing details
            nextRow.style.display = "none";
        }
    }
}


// clears previous timers and sets timer to hide given details
window.timerHide = function(e) {    
    clearTimeout(window.cobblepot_showTimer);
    clearTimeout(window.cobblepot_hideTimer);
    
    cobblepot_hideTimer = window.setTimeout(function() { hide(e) } , 700);
}


// hides details corresponding to visible row after a delay
window.timerHideDetails = function(e) {
    var node = findMatch(e, "cobblepot_visible_", "cobblepot_details_");
    if (node) window.timerHide(node);
}


// hides given details
window.hide = function(e) {

    clearTimeout(window.cobblepot_showTimer);
    clearTimeout(window.cobblepot_hideTimer);
        
    if (e.getAttribute("class") == "expand") {
        e.style.display = "none";
        var node = findMatch(e, "cobblepot_details_", "cobblepot_visible_");
        if (node) node.setAttribute("class", "visible");
    }
    
    // hide last shown details
    if (window.cobblepot_last) {
        var temp = window.cobblepot_last;
        window.cobblepot_last = null;
        hide(temp);
    }
}


// shows details corresponding to visible row
window.timerShowDetails = function(e) {
    
    var node = findMatch(e, "cobblepot_visible_", "cobblepot_details_");
    if (node) window.timerShow(node);
}


// clears previous timers and sets timer to show particular details
window.timerShow = function(e) {

    clearTimeout(window.cobblepot_showTimer);
    clearTimeout(window.cobblepot_hideTimer);
    if (e) cobblepot_showTimer = window.setTimeout(function() { show(e) } , 700);
}


// shows particular details
window.show = function(e) {
    clearTimeout(window.cobblepot_showTimer);
    clearTimeout(window.cobblepot_hideTimer);
        
    e.style.display = "table-row";

    // hide last (and only) shown details if they aren't
    //   what we want to display
    if (window.cobblepot_last && e != window.cobblepot_last) {        
        window.hide(window.cobblepot_last);
    }
    
    // adding 'highlight' to class of 'visible' row keeps it highlighted
    //   even while the mouse is over its details
    var node = findMatch(e, "cobblepot_details_", "cobblepot_visible_");
    if (node) node.setAttribute("class", "highlight visible");

    // remember currently displayed details
    window.cobblepot_last = e;
}


// Given a node and two patterns, this function attempts
//    to find the given node's partner based on their ids.
window.findMatch = function(node, pattern1, pattern2) {
    var attr = node.getAttribute("id");
    
    // concatenates pattern2 with the remainder of node's id
    //   after pattern1 has been removed from it
    //   Then returns the element with this id.
    if (attr && attr.length >= pattern1.length && attr.substring(0, pattern1.length) == pattern1) {
        var id = pattern2 + attr.substring(pattern1.length, attr.length);
        return document.getElementById(id);
    }
    
    return null;
}