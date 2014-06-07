// ==UserScript==
// @name           Trackmaster Highlight
// @namespace      http://greasemonkey.jaredmcateer.com
// @description    Highlights statuses of sub-tasks in trackmaster
// @include        http*://trackmaster.*.com/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
        document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    // Edit these for colors of the various statuses
    var COLOR = {
        UNASSIGNED: '#FF9696',
        DEV_UNASSIGNED: '#FFB2B2',
        DEV_ASSIGNED: '#E2FBAF',
        QA_REQUIRED: null,
        QA_REVIEW: null,
        VERIFIED: null,
        CLOSED: null,
        MERGE_REQUESTED: null
    };
    
    // Unassigned
    if (COLOR.UNASSIGNED) {
        $('.nav.status:contains("Unassigned")').parent().css('background-color', COLOR.UNASSIGNED);
    }
    
    // Assigend - Dev, unassasigned
    if (COLOR.DEV_UNASSIGNED) {
        $('.nav.status:contains("Dev")').parent().children().filter('.nav.assignee:contains("Unassigned")').parent().css('background-color', COLOR.DEV_UNASSIGNED);
    }
    
    // Assigned - Dev, assigned to someone
    if (COLOR.DEV_ASSIGNED) {
        $('.nav.status:contains("Dev")').parent().children().filter('.nav.assignee:not(:contains("Unassigned"))').parent().css('background-color', COLOR.DEV_ASSIGNED);
    }
    
    // Pending QA
    if (COLOR.QA_REQUIRED) {
        $('.nav.status:contains("QA Required")').parent().css('background-color', COLOR.QA_REQUIRED);
    }
    
    // QA Review
    if (COLOR.QA_REVIEW) {
        $('.nav.status:contains("QA Review")').parent().css('background-color', COLOR.QA_REVIEW);
    }
    
    // Verified
    if (COLOR.VERIFIED) {
        $('.nav.status:contains("Verified")').parent().css('background-color', COLOR.VERIFIED);
    }
    
    // Closed
    if (COLOR.CLOSED) {
        $('.nav.status:contains("Closed")').parent().css('background-color', COLOR.CLOSED);
    }
    
    // Merge Requested
    if (COLOR.MERGE_REQUESTED) {
        $('.nav.status:contains("Merge Requested")').parent().css('background-color', COLOR.MERGE_REQUESTED);
    }
}

// load jQuery and execute the main function
addJQuery(main);
