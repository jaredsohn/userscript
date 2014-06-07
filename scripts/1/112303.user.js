// ==UserScript==
// @name           Update Salesforce Session
// @include        https://*.salesforce.com/*
// @author         Alberto Aresca
// @require        http://code.jquery.com/jquery-1.5.1.min.js
// ==/UserScript==

function keep_alive() {
    var http_request = new XMLHttpRequest();
    http_request.open('GET', "https://na6.salesforce.com/500/o",false);
    http_request.send(null);
    log.console("Trying to inhibit salesforce session from expire");
};

setInterval(keep_alive,60000);