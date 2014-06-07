// ==UserScript==
// @name        OSM History Viewer / Relation Blame sidebar link
// @namespace   http://jpol.net.pl/greasemonkey/scripts/
// @description Adds link to OSM History Viewer / Relation Blame on OpenStreetMap changeset/relation page's sidebar.
// @include     http://www.openstreetmap.org/*
// @run-at      document-end
// @version     1.4.1
// @grant       none
// ==/UserScript==

var defaultLang = "en";
// link label for History Viewer link
var changesetLinkLabel = {
    "en" : "View in OSM History Viewer",
    "pl" : "Zobacz w OSM History Viewer"
};
// link label for Relation Blame link
var blameLinkLabel = {
    "en" : "View OSM Relation Blame",
    "pl" : "Zobacz OSM Relation Blame"
};

// Location polling, from example by Brock Adams:
// http://stackoverflow.com/a/18997637
/*--- Note, gmMain () will fire under all these conditions:
    1) The page initially loads or does an HTML reload (F5, etc.).
    2) The scheme, host, or port change.  These all cause the browser to
       load a fresh page.
    3) AJAX changes the URL (even if it does not trigger a new HTML load).
*/
var fireOnHashChangesToo    = false;
var pageURLCheckTimer       = setInterval (
    function () {
        if (   this.lastPathStr  !== location.pathname
            || this.lastQueryStr !== location.search
            || (fireOnHashChangesToo && this.lastHashStr !== location.hash)
        ) {
            this.lastPathStr  = location.pathname;
            this.lastQueryStr = location.search;
            this.lastHashStr  = location.hash;
            gmMain ();
        }
    }
    , 222
);

// waitForKeyElements() by BrockA on GitHub Gist: https://gist.github.com/BrockA
/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.

    Usage example:

        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );

        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }

    IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}


// main implementation of link generator - for changeset
function generateHistoryLinkDiv() {
    // set type of link (FIXME, left after splitting functions for history/relation link)
    var linkType = "changeset";

    // get page language from HTML element
    var pageLang = document.getElementsByTagName('html')[0].getAttribute("lang");

    // get changeset/relation ID from URL
    if (linkType === "changeset") {
        var linkedId = location.pathname.match(/^\/changeset\/(\d+)/)[1];
    }
    else if (linkType === "blame") {
        var linkedId = location.pathname.match(/^\/relation\/(\d+)/)[1];
    }

    // create link to OSM History Viewer/Relation Blame
    var osmhvLink = document.createElement('a');
    osmhvLink.href = "http://osmhv.openstreetmap.de/" + linkType + ".jsp?id=" + encodeURIComponent(linkedId);
    if (linkType === "changeset") {
        osmhvLink.appendChild(document.createTextNode(changesetLinkLabel[pageLang] == null ? changesetLinkLabel[defaultLang] : changesetLinkLabel[pageLang]));
    }
    else if (linkType === "blame") {
        osmhvLink.appendChild(document.createTextNode(blameLinkLabel[pageLang] == null ? blameLinkLabel[defaultLang] : blameLinkLabel[pageLang]));
    }

    // create subDIV in sidebar for our link and append link to it
    var linkDiv = document.createElement('div');
    linkDiv.className = 'secondary-actions';
    linkDiv.appendChild(osmhvLink);


    // get first child of sidebar DIV (changeset/relation title label)
    var sidebarDiv = document.getElementById('sidebar_content').firstChild.nextSibling;
    // append osmhvlink DIV as next sibling
    sidebarDiv.parentNode.insertBefore(linkDiv, sidebarDiv.nextSibling);
};

// main implementation of link generator - for changeset
function generateBlameLinkDiv() {
    // set type of link (FIXME, left after splitting functions for history/relation link)
    var linkType = "blame";

    // get page language from HTML element
    var pageLang = document.getElementsByTagName('html')[0].getAttribute("lang");

    // get changeset/relation ID from URL
    if (linkType === "changeset") {
        var linkedId = location.pathname.match(/^\/changeset\/(\d+)/)[1];
    }
    else if (linkType === "blame") {
        var linkedId = location.pathname.match(/^\/relation\/(\d+)/)[1];
    }

    // create link to OSM History Viewer/Relation Blame
    var osmhvLink = document.createElement('a');
    osmhvLink.href = "http://osmhv.openstreetmap.de/" + linkType + ".jsp?id=" + encodeURIComponent(linkedId);
    if (linkType === "changeset") {
        osmhvLink.appendChild(document.createTextNode(changesetLinkLabel[pageLang] == null ? changesetLinkLabel[defaultLang] : changesetLinkLabel[pageLang]));
    }
    else if (linkType === "blame") {
        osmhvLink.appendChild(document.createTextNode(blameLinkLabel[pageLang] == null ? blameLinkLabel[defaultLang] : blameLinkLabel[pageLang]));
    }

    // create subDIV in sidebar for our link and append link to it
    var linkDiv = document.createElement('div');
    linkDiv.className = 'secondary-actions';
    linkDiv.appendChild(osmhvLink);


    // get first child of sidebar DIV (changeset/relation title label)
    var sidebarDiv = document.getElementById('sidebar_content').firstChild.nextSibling;
    // append osmhvlink DIV as next sibling
    sidebarDiv.parentNode.insertBefore(linkDiv, sidebarDiv.nextSibling);
};



// main execution
function gmMain () {
    if (window.self === window.top) {
        if (location.pathname.startsWith("/changeset/") === true) {
            waitForKeyElements("#sidebar_content h2", generateHistoryLinkDiv, true);
        }
        else if (location.pathname.startsWith("/relation/") === true) {
            waitForKeyElements("#sidebar_content h2", generateBlameLinkDiv, true);
        }
    }
}
