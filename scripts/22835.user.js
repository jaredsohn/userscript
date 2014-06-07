// Copyright (c) 2008, Tummblr
// ==UserScript==
// @name           Sphinn Redirect
// @namespace      http://www.tummblr.com/
// @description    Sphinn (www.sphinn.com) pages that are opened in a new tab/window redirect automatically to the source article. Useful when browsing Sphinn through an RSS reader.
// @include        http://*sphinn.com/story/*
// ==/UserScript==

BINQ = {};

BINQ.linkJumper = {
    jumpToFirstValidLink: function() {
        var that=this; //For the private fuctions below.
        function findValidLink(links) {
            if (typeof that.isValidLink == "undefined") { return links.iterateNext(); }
            while (link = links.iterateNext()) {
                if (that.isValidLink(link)) { return link; }
            }
            return null;
        }
        function getRedirectUrl(link) {
            if (typeof that.parseUrlFromLink == "undefined") { return link.href; }
            return that.parseUrlFromLink(link);
        }

        var links = document.evaluate(this.searchPath, document, null, 0, null);
        var link = findValidLink(links);
        if (link) { window.location = getRedirectUrl(link); }
    }
}

BINQ.sphinnLinkJumper = {
    init: function() {
        this.jumpToFirstValidLink = BINQ.linkJumper.jumpToFirstValidLink;
        return this;
    },
    searchPath: "//*[@id='ls_thetitle-0']/a[1]",
}

if (history.length == 1) { BINQ.sphinnLinkJumper.init().jumpToFirstValidLink(); }


// Script Auto Updater
// http://userscripts.org/scripts/show/20145
var version_scriptURL = "http://userscripts.org/scripts/source/22835.user.js"; // Change this URL to point to a permanent copy of your own script.
var version_timestamp = 1202998701; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.

if (parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime())) // Checks once a day (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
{
    GM_xmlhttpRequest(
    {
        method: "GET",
        url: version_scriptURL + "?" + new Date().getTime(),
        headers: {'Cache-Control': 'no-cache'},
        onload: function(xhrResponse)
        {
            GM_setValue("lastUpdate", new Date().getTime() + "");
            if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(xhrResponse.responseText)[1]) > version_timestamp)
            {
                if (confirm("There is an update available for the Greasemonkey script \"" + xhrResponse.responseText.split("@name")[1].split("\n")[0].replace(/^\s+|\s+$/g, "") + ".\"\nWould you like to go to the install page now?"))
                    {GM_openInTab(version_scriptURL);}
            }
        }
    });
}