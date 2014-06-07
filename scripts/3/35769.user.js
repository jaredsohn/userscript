// ==UserScript==
// @name           delicious bundle names
// @namespace      http://community.livejournal.com/deliciouslymad
// @description    display full bundle names in the sidebar
// @include        http://delicious.com/*
// ==/UserScript==


(function() {
    /* this makes the sidebar wider and otherwise deals with the css necessary to
    handle longer bundle names. you can safely up this to 21em, i think, but if you
    up it much more, it's going to run into the body and require more tweaking. */
    
    var css = "@namespace url(http://www.w3.org/1999/xhtml); /**/ div#sidebar {width: 20em;} ul#actions-list {width: 17.5em; float: right;} /**/";
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node); 
        }
    }
    
    
    /* this pulls the full bundle names from the markup, unescapes them, and then
    replaces the link name (innerHTML) with that text. this should get display
    the full name of the bundle in the sidebar. */
    
    var sidebar= document.getElementById("sidebar");
    var bundle_names = document.evaluate("//h4[contains(@class, 'bundle')]", 
        sidebar, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for (var i = 0; i < bundle_names.snapshotLength; i++) {
        var bun = bundle_names.snapshotItem(i);
        var child = bun.firstChild;
        while (child != null && child.nodeName != "A") {
            child = child.nextSibling;
        }
        
        var url = child.getAttribute("href");
        if (url) {
            var re = /(.*\/bundle:)(.*)/;
            var newName = url.replace(re, "$2");
            var betterName = unescape(newName)
            
            child.innerHTML = betterName;
        }
    }
})();