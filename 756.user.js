/*
    Add one-press access keys to Google search results. Search results
    are numbered in red and pressing its corresponding number  selects 
    that search result.
    A Firefox Greasemonkey script,
    Version 0.2
    Adam Langley <agl@imperialviolet.org>
    
    Blame Martin Davidsson <martin.davidsson@gmail.com> for issues 
    concerning double-digit support and deactivating the script while 
    the query box is active.

    Public Domain
*/

// ==UserScript==
// @name            Google Searchkeys
// @namespace       http://www.imperialviolet.org
// @description     Adds one-press access keys to Google search results
// @include         http://www.google.*/search*
// ==/UserScript==

(function() {
    // Search results are in p elements with a class of 'g'
    // This uses XPath to find all such elements and returns a 
    // snapshot. (A snapshot doesnt become invalid after changing
    // the DOM
    
    var results = document.evaluate("//p[@class='g']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var counter = 1;
    var index;
    var delay;
    
    // We store the links in this array which is used by the keypress
    // handler function
    var links = new Array();
    
    for (var i = 0; i < results.snapshotLength; ++i) {
        var result = results.snapshotItem(i);
        // the first child of the paragraph is a comment element
        // this is a little fragile, maybe should be an XPath lookup
        links.push(result.firstChild.nextSibling.getAttribute("href"));

        // We put the result number in a small-caps red span
        var newspan = document.createElement("span");
        newspan.setAttribute("style", "color:red; font-variant: small-caps;");
        newspan.appendChild(document.createTextNode( counter++ + " "));
        result.insertBefore(newspan, result.firstChild);
    }


    function keypress_handler(e) {
        // e.which contains the ASCII char code of the
        // key which was pressed
        // see: http://web.archive.org/web/20040214161257/devedge.netscape.com/
        // library/manuals/2000/javascript/1.3/reference/
        // handlers.html#1120313

        var keypressed = String.fromCharCode(e.which);
        if (keypressed < '0' || keypressed > '9') {
            clearTimeout( delay );
            return false;
        }

        var resnum = e.which - "0".charCodeAt(0);

        // if a numeric key was recently pressed, multiply that key by base-10
        // and add on this key's value
        if( delay ) {
            clearTimeout( delay );
            document.location = links[index*10 + resnum - 1];
        }
        // 
        else {
            index = resnum;
            // wait 800ms in case followed by another digit
            delay = setTimeout( "document.location = '" + links[resnum-1] + "';", 800 );
        }

        return false;
    }

    if (document.layers) document.captureEvents(Event.FOCUS | Event.BLUR);
    document.onkeydown = keypress_handler; // handle 1..0
    document.gs.q.onfocus  = function() { document.onkeydown = null; } // deactivate script
    document.gs.q.onblur  = function() { document.onkeydown = keypress_handler; } // activate script

})();



